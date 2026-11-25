const test = require('node:test');
const assert = require('node:assert/strict');
const { dealPair, shouldYield } = require('../dist/pocket-cards.js');

test('every ordered two-card deal is possible, without repeating a card', () => {
  const pairs = new Set();
  for (let first = 0; first < 52; first++) {
    for (let second = 0; second < 51; second++) {
      const values = [(first + .5) / 52, (second + .5) / 51];
      const pair = dealPair(() => values.shift());
      assert.notEqual(pair[0], pair[1]);
      assert.ok(pair.every(card => Number.isInteger(card) && card >= 0 && card < 52));
      pairs.add(pair.join(','));
    }
  }
  assert.equal(pairs.size, 52 * 51);
});

const clear = {
  desktop: true, hidden: false, modal: false, libraryPage: false, library: null,
  viewportHeight: 800, dock: { left: 12, right: 156, top: 620, bottom: 780 }, obstacles: []
};

test('cards remain available across ordinary sections, but yield to the chooser and mobile', () => {
  assert.equal(shouldYield(clear), false);
  assert.equal(shouldYield({ ...clear, modal: true }), true);
  assert.equal(shouldYield({ ...clear, desktop: false }), true);
  assert.equal(shouldYield({ ...clear, hidden: true }), true);
});

test('Library entering the home viewport hides the cards; leaving restores them', () => {
  assert.equal(shouldYield({ ...clear, library: { top: 799, bottom: 1400 } }), true);
  assert.equal(shouldYield({ ...clear, library: { top: 801, bottom: 1400 } }), false);
  assert.equal(shouldYield({ ...clear, library: { top: -900, bottom: 0 } }), false);
  assert.equal(shouldYield({ ...clear, libraryPage: true }), true);
});

test('only obstacles near the actual corner suppress the cards; hidden scenes do not', () => {
  const obstruction = { left: 100, right: 350, top: 640, bottom: 740 };
  assert.equal(shouldYield({ ...clear, obstacles: [obstruction] }), true);
  assert.equal(shouldYield({ ...clear, obstacles: [{ ...obstruction, left: 200 }] }), false);
  assert.equal(shouldYield({ ...clear, obstacles: [{ ...obstruction, top: 500, bottom: 608 }] }), false);
  assert.equal(shouldYield({ ...clear, obstacles: [{ left: 0, right: 0, top: 0, bottom: 0 }] }), false);
});
