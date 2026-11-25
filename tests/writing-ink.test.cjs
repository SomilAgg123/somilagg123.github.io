const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { buildWritingTimeline, sampleWritingTimeline, layoutWritingStrokes } = require('../dist/writing-ink.js');

const writingData = readFileSync(require.resolve('../dist/app.js'), 'utf8').match(/writing: \[([\s\S]*?)\n  \]/)[1];
const titles = [...writingData.matchAll(/name: '([^']+)'/g)].map(match => match[1]);

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

test('every published Writing title has complete lettering at desktop and phone widths', () => {
  assert.equal(titles.length, 7);
  for (const title of titles) {
    for (const width of [180, 231, 273, 328]) {
      const plan = layoutWritingStrokes(title, width);
      assert.ok(plan, `Missing artwork for ${title}`);
      assert.ok(plan.strokes.length >= title.replaceAll(' ', '').length);
      assert.ok(plan.strokes.every(stroke => stroke.x >= 0 && stroke.x < width && stroke.y >= 0 && stroke.y < plan.height));
      const timeline = buildWritingTimeline(plan.strokes.map(stroke => ({ ...stroke, length: 100 })), plan.duration);
      assert.ok(Math.abs(timeline.duration - plan.duration) < 1e-8);
      assert.ok(timeline.duration >= 2400 && timeline.duration <= 5000);
    }
  }
});

test('capital letters and punctuation retain their own strokes and pen lifts', () => {
  assert.notEqual(layoutWritingStrokes('The', 300).strokes[0].d, layoutWritingStrokes('the', 300).strokes[0].d);
  const question = layoutWritingStrokes('What Is an Eval?', 300);
  const dot = question.strokes.at(-1);
  assert.equal(dot.d, 'M8 47 L11 47');
  assert.equal(dot.liftBefore, true);
  assert.ok(question.strokes.some(stroke => stroke.d.startsWith('M3 12') && stroke.liftBefore));
  assert.equal(layoutWritingStrokes('the bar gets higher', 300).duration, 2400);
  assert.ok(layoutWritingStrokes(titles[4], 300).duration > 4000);
});

test('narrow layouts wrap before a word and unsupported text keeps the printed fallback', () => {
  const narrow = layoutWritingStrokes('The Right to Remember', 180);
  const wide = layoutWritingStrokes('The Right to Remember', 600);
  assert.ok(narrow.height > wide.height);
  narrow.strokes.forEach((stroke, index) => {
    if (index && stroke.line !== narrow.strokes[index - 1].line) {
      assert.equal(stroke.x, 0);
      assert.equal(stroke.liftBefore, true);
    }
  });
  const longWord = layoutWritingStrokes('Observations', 120);
  assert.ok(longWord.strokes.every(stroke => stroke.scale < .68 && stroke.x < 120));
  assert.equal(layoutWritingStrokes('An unsupported 🖋', 300), null);
  assert.equal(layoutWritingStrokes('', 300), null);
  assert.equal(layoutWritingStrokes('The', 0), null);
});
