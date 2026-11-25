const test = require('node:test');
const assert = require('node:assert/strict');
const { buildWritingTimeline, sampleWritingTimeline } = require('../dist/writing-ink.js');

const strokes = [
  { length: 120, line: 0, liftBefore: false },
  { length: 180, line: 0, liftBefore: false },
  { length: 15, line: 0, liftBefore: true },
  { length: 100, line: 1, liftBefore: true },
  { length: 200, line: 1, liftBefore: false },
];

test('handwriting preserves connected strokes and lifts for marks and line breaks', () => {
  const plan = buildWritingTimeline(strokes);
  assert.deepEqual(plan.segments.filter(s => s.kind === 'write').map(s => s.index), [0, 1, 2, 3, 4]);
  assert.deepEqual(plan.segments.filter(s => s.kind === 'lift').map(s => [s.index, s.end - s.start]), [[2, 90], [3, 150]]);
  assert.ok(Math.abs(plan.duration - 2400) < 1e-8);
  plan.segments.forEach((segment, i) => {
    assert.ok(segment.end > segment.start);
    if (i) assert.equal(segment.start, plan.segments[i - 1].end);
  });
});

test('ink reveal and nib use the same stroke and normalized progress', () => {
  const plan = buildWritingTimeline(strokes);
  for (const segment of plan.segments) {
    const sample = sampleWritingTimeline(plan, (segment.start + segment.end) / 2);
    assert.equal(sample.kind, segment.kind);
    assert.equal(sample.index, segment.index);
    assert.ok(Math.abs(sample.progress - .5) < 1e-8);
  }
});

test('a restarted clock begins at the first stroke and delayed frames finish cleanly', () => {
  const plan = buildWritingTimeline(strokes);
  assert.equal(sampleWritingTimeline(plan, plan.duration + 10000).kind, 'done');
  assert.equal(sampleWritingTimeline(plan, 0).kind, 'lead-in');
  assert.equal(sampleWritingTimeline(plan, -10).progress, 0);
  for (let time = 0; time <= plan.duration + 100; time += 37) {
    const sample = sampleWritingTimeline(plan, time);
    assert.ok(sample.progress >= 0 && sample.progress <= 1);
  }
});
