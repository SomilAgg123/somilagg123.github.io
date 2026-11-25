const test = require('node:test');
const assert = require('node:assert/strict');
const { createPaperStackMotion, paperSettleKeyframes, PAPER_PULL_DURATION } = require('../dist/paper-motion.js');

function harness(reducedMotion = false) {
  let now = 0;
  let id = 0;
  const frames = new Map();
  const history = [];
  const motion = createPaperStackMotion({
    count: 9, reducedMotion,
    onChange: state => history.push({ ...state, time: now }),
    requestFrame: callback => { frames.set(++id, callback); return id; },
    cancelFrame: token => frames.delete(token),
  });
  function step(delta = 16) {
    now += delta;
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach(callback => callback(now));
    assert.ok(frames.size <= 1, 'Only one animation frame may be pending');
  }
  function advance(milliseconds) {
    for (let elapsed = 0; elapsed < milliseconds; elapsed += 16) step();
  }
  function finish() {
    let remaining = 400;
    while (frames.size && remaining-- > 0) step();
    assert.equal(frames.size, 0, 'Motion must finish without an idle loop');
  }
  return { motion, frames, history, step, advance, finish };
}

const y = (state, index) => index * 12 + (index < state.active ? state.settle * 12 : 0);

function assertStableStack(history) {
  history.forEach((state, n) => {
    assert.ok(state.pull >= 0 && state.pull <= 1);
    assert.ok(state.settle >= 0 && state.settle <= 1);
    for (let i = 0; i < 9; i++) {
      assert.ok(y(state, i) <= 96, 'No paper moves below the original bottom baseline');
      if (i >= state.active) assert.equal(y(state, i), i * 12, 'The extracted sheet and sheets below keep their height');
      if (n && history[n - 1].time === state.time) {
        assert.ok(Math.abs(y(state, i) - y(history[n - 1], i)) < .02, 'A new request cannot teleport the stack');
      }
      if (n && state.time - history[n - 1].time === 16) {
        assert.ok(Math.abs(y(state, i) - y(history[n - 1], i)) < 4, 'Vertical motion must remain continuous between frames');
      }
    }
  });
}

test('a middle sheet clears its original slot before only the upper group settles', () => {
  const h = harness();
  h.motion.select(4);
  h.finish();
  for (const state of h.history) if (state.pull < 1) assert.equal(state.settle, 0);
  const state = h.motion.getState();
  assert.equal(state.phase, 'open');
  assert.equal(state.active, 4);
  assert.equal(state.settle, 1);
  assert.equal(y(state, 3), 48);
  assert.equal(y(state, 4), 48);
  assert.equal(y(state, 8), 96);
  assertStableStack(h.history);
});

test('removing the bottom sheet closes the gap at the original base without overshoot', () => {
  const h = harness();
  h.motion.select(8);
  h.finish();
  assert.equal(y(h.motion.getState(), 7), 96);
  assertStableStack(h.history);
});

test('returning lifts the upper group before the paper is restored instantly', () => {
  const h = harness();
  h.motion.select(8);
  h.finish();
  h.history.length = 0;
  h.motion.select(0);
  h.finish();
  assert.ok(h.history.some(state => state.phase === 'lifting' && state.settle > 0 && state.settle < 1));
  for (const state of h.history) {
    if (state.active === 8) assert.equal(state.pull, 1, 'No reverse slide is introduced');
    else assert.equal(state.settle, 0, 'The gap must be open before reinsertion');
  }
  assert.equal(h.motion.getState().phase, 'rest');
  assertStableStack(h.history);
});

test('rapid requests during lifting launch only the latest requested paper', () => {
  const h = harness();
  h.motion.select(8);
  h.finish();
  h.history.length = 0;
  h.motion.select(2);
  h.advance(64);
  h.motion.select(5);
  h.advance(48);
  h.motion.select(3);
  h.finish();
  assert.deepEqual([...new Set(h.history.map(s => s.active))], [8, 3]);
  assert.equal(h.motion.getState().phase, 'open');
  assertStableStack(h.history);
});

test('returning to the open paper reverses the lift from the current position', () => {
  const h = harness();
  h.motion.select(6);
  h.finish();
  h.motion.select(2);
  h.advance(96);
  const before = h.motion.getState();
  assert.ok(before.settle > 0 && before.settle < 1);
  h.motion.select(6);
  assert.equal(h.motion.getState().settle, before.settle);
  assert.equal(h.motion.getState().pull, before.pull);
  h.finish();
  assert.equal(h.motion.getState().active, 6);
  assert.equal(h.motion.getState().settle, 1);
  assertStableStack(h.history);
});

test('rapid changes halfway through pull-out never collapse a still-occupied slot', () => {
  const h = harness();
  for (const index of [1, 8, 2, 7, 4]) {
    h.motion.select(index);
    h.advance(96);
    assert.equal(h.motion.getState().settle, 0);
    assert.equal(h.motion.getState().active, index);
  }
  h.finish();
  assert.equal(h.motion.getState().active, 4);
  assertStableStack(h.history);
});

test('a long burst of pointer choices leaves no stale queued animation', () => {
  const h = harness();
  h.motion.select(8);
  h.finish();
  for (let i = 0; i < 100; i++) {
    h.motion.select((i * 7) % 9);
    h.advance(16 + (i % 5) * 16);
  }
  h.motion.select(7);
  h.finish();
  assert.equal(h.motion.getState().active, 7);
  assert.equal(h.motion.getState().requested, 7);
  assert.equal(h.motion.getState().phase, 'open');
  assertStableStack(h.history);
});

test('reduced motion applies the final arrangement immediately and cancels pending work', () => {
  const h = harness(true);
  h.motion.select(8);
  assert.equal(h.motion.getState().settle, 1);
  assert.equal(h.frames.size, 0);
  h.motion.setReducedMotion(false);
  h.motion.select(2);
  h.advance(64);
  h.motion.setReducedMotion(true);
  assert.equal(h.motion.getState().active, 2);
  assert.equal(h.motion.getState().phase, 'open');
  assert.equal(h.frames.size, 0);
  h.motion.select(0);
  assert.equal(h.motion.getState().phase, 'rest');
});

test('resuming an inactive tab does not jump to the end of the motion', () => {
  const h = harness();
  h.motion.select(3);
  h.step();
  h.step(10000);
  assert.ok(h.motion.getState().pull < .25);
  assert.equal(h.motion.getState().settle, 0);
  h.finish();
});

test('the top article never slides out and idle states schedule no frames', () => {
  const h = harness();
  h.motion.select(0);
  assert.equal(h.frames.size, 0);
  assert.equal(h.motion.getState().pull, 0);
  h.motion.select(4);
  h.advance(32);
  h.motion.select(0);
  assert.equal(h.motion.getState().active, 0);
  assert.equal(h.motion.getState().pull, 0);
  assert.equal(h.frames.size, 0);
});

// The compositor trajectory must preserve the same bounds and interrupted velocity.
test('native settling keyframes end exactly at the target without moving below the base', () => {
  for (const [position, velocity, target] of [[0, 0, 1], [1, 0, 0], [.45, -4, 1], [.55, 4, 0]]) {
    const { values, duration } = paperSettleKeyframes(position, velocity, target);
    assert.equal(values[0], position);
    assert.equal(values.at(-1), target);
    assert.ok(values.every(value => value >= 0 && value <= 1));
    assert.ok(duration > 0 && duration < 400);
    for (let i = 1; i < values.length; i++) assert.ok(Math.abs(values[i] - values[i - 1]) < .25);
  }
  const reversed = paperSettleKeyframes(.55, 4, 0).values;
  assert.ok(reversed[1] > paperSettleKeyframes(.55, 0, 0).values[1], 'Reversal retains momentum instead of restarting at zero velocity');
});

test('the outward slide completes within half a second before settling begins', () => {
  const h = harness();
  h.motion.select(3);
  h.step();
  h.advance(PAPER_PULL_DURATION);
  assert.equal(h.motion.getState().pull, 1);
  assert.equal(h.motion.getState().settle, 0);
  assert.ok(PAPER_PULL_DURATION <= 480);
  h.finish();
});
