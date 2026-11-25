const test = require('node:test');
const assert = require('node:assert/strict');
const { createWritingTouchController } = require('../dist/writing-ink.js');

function fixture({ touch = true, reduced = false } = {}) {
  const target = () => {
    const listeners = new Map();
    return {
      addEventListener(type, listener) {
        if (!listeners.has(type)) listeners.set(type, []);
        listeners.get(type).push(listener);
      },
      emit(type, event = {}) { listeners.get(type)?.forEach(listener => listener(event)); },
    };
  };
  const media = [{ ...target(), matches: touch }, { ...target(), matches: reduced }];
  const timers = new Map();
  let clock = 0, sequence = 0, intersection;
  const doc = { ...target(), hidden: false, modal: false, querySelector() { return this.modal; } };
  const view = {
    ...target(), innerHeight: 800, innerWidth: 390,
    matchMedia(query) { return media[query.includes('reduced-motion') ? 1 : 0]; },
    setTimeout(fn, delay) { const id = ++sequence; timers.set(id, { at: clock + delay, fn }); return id; },
    clearTimeout(id) { timers.delete(id); },
    IntersectionObserver: class {
      constructor(callback) { intersection = callback; }
      observe() {}
    },
  };
  const controller = createWritingTouchController({ view, doc });
  function advance(ms) {
    const end = clock + ms;
    while (true) {
      const next = [...timers].sort((a, b) => a[1].at - b[1].at)[0];
      if (!next || next[1].at > end) break;
      clock = next[1].at;
      timers.delete(next[0]);
      next[1].fn();
    }
    clock = end;
  }
  function add(top, height = 100) {
    const entry = {
      card: {}, state: 'idle', starts: 0, top, height,
      ready: () => true,
      start() { this.state = 'writing'; this.starts++; },
      finish() { this.state = 'complete'; },
      reset() { this.state = controller.enabled && controller.hasPlayed(this.card) ? 'complete' : 'idle'; },
    };
    entry.title = { getBoundingClientRect: () => ({ top: entry.top, bottom: entry.top + entry.height, height: entry.height, left: 20, right: 370, width: 350 }) };
    controller.add(entry);
    return entry;
  }
  return { view, doc, media, controller, advance, add, intersect: changes => intersection(changes), timers };
}

test('a half-second pause starts only the nearest readable title and never queues its neighbors', () => {
  const f = fixture();
  const upper = f.add(100), center = f.add(350), lower = f.add(610);
  f.advance(499);
  assert.equal(center.state, 'idle');
  f.advance(1);
  assert.equal(center.state, 'writing');
  center.finish();
  f.advance(10000);
  f.intersect([{ target: upper.title, isIntersecting: true }]);
  f.advance(500);
  assert.equal(center.starts, 1);
  assert.equal(upper.starts + lower.starts, 0);
});

test('continuous scrolling defers playback; moving on completes ink without replay on return', () => {
  const f = fixture();
  const first = f.add(350), second = f.add(650);
  for (let i = 0; i < 8; i++) { f.advance(200); f.view.emit('scroll'); }
  assert.equal(first.starts, 0);
  f.advance(500);
  assert.equal(first.starts, 1);
  first.top = -200;
  second.top = 350;
  f.view.emit('scroll');
  assert.equal(first.state, 'complete');
  f.advance(500);
  assert.equal(second.state, 'writing');
  first.top = 350;
  second.top = 650;
  f.view.emit('scroll');
  f.advance(500);
  assert.equal(first.starts, 1);
  assert.equal(second.state, 'complete');
});

test('a finger held down suppresses the dwell and never cancels native input', () => {
  const f = fixture(), entry = f.add(350);
  const input = { pointerType: 'touch', pointerId: 1, preventDefault() { assert.fail('Native touch must remain available'); } };
  f.doc.emit('pointerdown', input);
  f.advance(1000);
  assert.equal(entry.starts, 0);
  f.doc.emit('pointercancel', input);
  f.advance(500);
  assert.equal(entry.starts, 1);
});

test('partial titles, hidden sections, and modal overlays do not animate', () => {
  const f = fixture(), clipped = f.add(760), hidden = f.add(0, 0);
  f.advance(500);
  assert.equal(clipped.starts + hidden.starts, 0);
  const visible = f.add(350);
  f.doc.modal = true;
  f.advance(500);
  assert.equal(visible.starts, 0);
  f.doc.modal = false;
  f.doc.emit('close');
  f.advance(500);
  assert.equal(visible.starts, 1);
  visible.top = -200;
  f.intersect([{ target: visible.title, isIntersecting: false }]);
  assert.equal(visible.state, 'complete');
});

test('backgrounding cancels pending work and restores completed ink without replay', () => {
  const f = fixture(), entry = f.add(350);
  f.doc.hidden = true;
  f.doc.emit('visibilitychange');
  f.advance(2000);
  assert.equal(entry.starts, 0);
  f.doc.hidden = false;
  f.doc.emit('visibilitychange');
  f.advance(500);
  assert.equal(entry.starts, 1);
  f.view.emit('pagehide');
  assert.equal(entry.state, 'complete');
  assert.equal(f.timers.size, 0);
  f.view.emit('pageshow');
  f.advance(500);
  assert.equal(entry.starts, 1);
});

test('reduced motion finishes visible titles immediately and handles changes during playback', () => {
  const f = fixture({ reduced: true }), first = f.add(150), second = f.add(350);
  f.advance(0);
  assert.equal(first.state, 'complete');
  assert.equal(second.state, 'complete');
  assert.equal(first.starts + second.starts, 0);
  f.media[1].matches = false;
  f.media[1].emit('change');
  f.advance(500);
  assert.equal(second.starts, 0);
  first.top = -200;
  second.top = -100;
  const third = f.add(350);
  f.advance(500);
  assert.equal(third.state, 'writing');
  f.media[1].matches = true;
  f.media[1].emit('change');
  assert.equal(third.state, 'complete');
});

test('desktop does not autoplay; changing input capabilities enables a fresh dwell', () => {
  const f = fixture({ touch: false }), entry = f.add(350);
  f.advance(1000);
  assert.equal(entry.starts, 0);
  f.media[0].matches = true;
  f.media[0].emit('change');
  f.advance(500);
  assert.equal(entry.starts, 1);
  f.view.emit('resize');
  f.controller.layoutChanged();
  f.advance(500);
  assert.equal(entry.state, 'complete');
  assert.equal(entry.starts, 1);
  f.media[0].matches = false;
  f.media[0].emit('change');
  assert.equal(entry.state, 'idle');
  f.advance(1000);
  assert.equal(entry.starts, 1);
});
