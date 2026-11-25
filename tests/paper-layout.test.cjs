const test = require('node:test');
const assert = require('node:assert/strict');
const { paperStackGeometry, paperStackDisplacement, paperStackPose } = require('../dist/paper-layout.js');

const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-8, `${actual} != ${expected}`);
const widths = [280, 320, 342, 382, 419, 420, 600, 699, 700, 800, 1000];

test('wide desktop retains its measured geometry and middle-sheet transforms', () => {
  const g = paperStackGeometry(1000, 9);
  assert.equal(g.compact, false);
  assert.equal(g.paperWidth, 300);
  assert.equal(g.paperHeight, 360);
  assert.equal(g.step, 24);
  near(g.left, 16.580645161290306);
  near(g.top, 84);
  near(g.pull, 516.8387096774194);
  near(g.sceneHeight, 539.2);
  assert.equal(g.openHeight, g.sceneHeight);
  for (let index = 0; index < 9; index++) {
    const { x, y } = paperStackDisplacement(g, index, 4, 1, 1);
    near(x, index === 4 ? 516.8387096774194 : 0);
    near(y, index < 4 ? 24 : 0);
  }
  assert.equal(paperStackGeometry(700, 9).compact, false);
  assert.equal(paperStackGeometry(699, 9).compact, true);
});

test('every mobile paper clears the entire settled pile and fits the expanded scene', () => {
  for (const width of widths.filter(width => width < 700)) {
    const g = paperStackGeometry(width, 9);
    // Include the irregular horizontal offsets, face, and visible edge thickness.
    assert.ok(g.left - 1.5 >= 0);
    assert.ok(g.left + g.projectedWidth + 1.5 <= width);
    for (let active = 1; active < 9; active++) {
      const pulled = paperStackDisplacement(g, active, active, 1, 1);
      assert.equal(pulled.x, 0);
      const paperTop = active * g.step + pulled.y;
      near(paperTop, g.readingTop);
      for (let index = 0; index < 9; index++) {
        if (index === active) continue;
        const { y } = paperStackDisplacement(g, index, active, 1, 1);
        const bottom = index * g.step + y + g.projectedHeight + g.step;
        assert.ok(paperTop - bottom >= 20, 'The page must clear all faces, spines, and end edges');
      }
      assert.ok(paperTop + g.projectedHeight + g.step < g.openHeight);
    }
  }
});

test('extraction and upper-group gravity stay independent on both axes', () => {
  for (const width of widths) {
    const g = paperStackGeometry(width, 9);
    for (const active of [1, 4, 8]) {
      for (const pull of [0, .2, .75, 1]) {
        for (const settle of [0, .3, .95, 1]) {
          for (let index = 0; index < 9; index++) {
            const { x, y } = paperStackDisplacement(g, index, active, pull, settle);
            if (index === active) {
              const withoutGravity = paperStackDisplacement(g, index, active, pull, 0);
              assert.deepEqual({ x, y }, withoutGravity);
            } else {
              assert.equal(x, 0);
              near(y, index < active ? settle * g.step : 0);
              assert.ok(index * g.step + y <= 8 * g.step, 'The pile retains its fixed bottom baseline');
            }
          }
        }
      }
    }
    assert.deepEqual(paperStackDisplacement(g, 0, 0, 1, 1), { x: 0, y: 0 });
  }
});

test('visible-pose capture preserves extraction and gravity progress across resize', () => {
  for (const width of widths) {
    const before = paperStackGeometry(width, 9);
    for (const active of [1, 4, 8]) {
      for (const [pull, settle] of [[0, 0], [.37, 0], [1, .6], [1, .97], [1, 1]]) {
        const pulled = paperStackDisplacement(before, active, active, pull, settle);
        const top = paperStackDisplacement(before, 0, active, pull, settle);
        const pose = paperStackPose(before, active, pulled.x, pulled.y, top.y);
        near(pose.pull, pull);
        near(pose.settle, settle);
        // Cross the mobile/desktop boundary in either direction mid-animation.
        const after = paperStackGeometry(before.compact ? 1000 : 342, 9);
        const resized = paperStackDisplacement(after, active, active, pose.pull, pose.settle);
        const resizedTop = paperStackDisplacement(after, 0, active, pose.pull, pose.settle);
        const resizedPose = paperStackPose(after, active, resized.x, resized.y, resizedTop.y);
        near(resizedPose.pull, pull);
        near(resizedPose.settle, settle);
      }
    }
  }
});

test('the mobile reading position is independent of stack size and original slot', () => {
  for (const count of [2, 5, 9, 12]) {
    const g = paperStackGeometry(342, count);
    for (let active = 1; active < count; active++) {
      const { y } = paperStackDisplacement(g, active, active, 1, 1);
      near(active * g.step + y, g.readingTop);
      assert.ok(g.readingTop >= g.projectedHeight + count * g.step + 20);
    }
  }
});
