const test = require('node:test');
const assert = require('node:assert/strict');
const { ranking, handKey, tierFor, reactionFor, createSequence } = require('../dist/pocket-reactions.js');
const { choosePlacement } = require('../dist/pocket-cards.js');

test('all 1,326 physical deals map to 169 correctly weighted hand classes', () => {
  const counts = {};
  for (let first = 0; first < 52; first++) {
    for (let second = first + 1; second < 52; second++) {
      const key = handKey([first, second]);
      assert.equal(key, handKey([second, first]));
      counts[key] = (counts[key] || 0) + 1;
      assert.ok(Number.isFinite(reactionFor([first, second]).percentile));
    }
  }
  assert.equal(Object.keys(counts).length, 169);
  assert.equal(Object.values(counts).reduce((a, b) => a + b), 1326);
  for (const [key, count] of Object.entries(counts)) assert.equal(ranking[key].combinations, count);
  assert.equal(handKey([0, 12]), 'AKs');
  assert.equal(handKey([0, 25]), 'AKo');
  assert.equal(handKey([9, 22]), 'TT');
});

test('percentile uses weighted starting-hand strength, with conservative ties and tail rounding', () => {
  assert.equal(ranking.AA.top, 6 / 1326 * 100);
  assert.equal(ranking.AA.percentile, 1320 / 1326 * 100);
  assert.equal(ranking['32o'].percentile, 0);
  assert.equal(ranking.A5s.percentile, ranking.A6s.percentile);
  assert.ok(ranking.AKs.percentile > ranking.AKo.percentile);
  assert.equal(reactionFor([0, 13]).text, 'Top 0.5%. The price is going up!');
  assert.equal(reactionFor([8, 21]).text, 'Top 2.8%. The price is going up!');
  assert.equal(reactionFor([1, 15]).text, 'Oof. Nowhere to go but up!');
});

test('five reaction tiers have stable boundaries', () => {
  for (const [percentile, tier] of [[0, 'rough'], [19.99, 'rough'], [20, 'ordinary'], [59.99, 'ordinary'],
    [60, 'good'], [84.99, 'good'], [85, 'great'], [96.99, 'great'], [97, 'premium'], [99.5, 'premium']]) {
    assert.equal(tierFor(percentile), tier);
  }
});

function clock() {
  let time = 0, id = 0;
  const tasks = new Map();
  return {
    setTimer(fn, delay) { tasks.set(++id, { fn, at: time + delay }); return id; },
    clearTimer(key) { tasks.delete(key); },
    advance(duration) {
      const until = time + duration;
      while (true) {
        const next = [...tasks].filter(([, task]) => task.at <= until).sort((a, b) => a[1].at - b[1].at)[0];
        if (!next) break;
        tasks.delete(next[0]); time = next[1].at; next[1].fn();
      }
      time = until;
    }
  };
}

test('reaction starts after the flip pause, announces once, and leaves after four seconds plus entry', () => {
  const timer = clock(), announcements = [];
  let visible = false;
  const sequence = createSequence({ ...timer, show: () => (visible = true), hide: () => { visible = false; }, announce: text => announcements.push(text) });
  sequence.reveal({ text: 'Top 0.5%. The price is going up!' }, 'Two aces.');
  timer.advance(149); assert.equal(visible, false);
  timer.advance(1); assert.equal(visible, true); assert.equal(announcements.length, 1);
  assert.match(announcements[0], /Two aces\. Top 0.5%/);
  timer.advance(4249); assert.equal(visible, true);
  timer.advance(1); assert.equal(visible, false);
});

test('cancelling a pending or visible reaction prevents old notes and announcements from replaying', () => {
  const timer = clock(), shown = [], spoken = [];
  let visible = false;
  const sequence = createSequence({ ...timer, show: data => { shown.push(data.text); return (visible = true); }, hide: () => { visible = false; }, announce: text => spoken.push(text) });
  sequence.reveal({ text: 'old' }, 'old hand');
  sequence.cancel(); timer.advance(1000);
  assert.deepEqual(shown, []); assert.deepEqual(spoken, []);
  sequence.reveal({ text: 'new' }, 'new hand'); timer.advance(150);
  sequence.cancel(); assert.equal(visible, false);
  sequence.reveal({ text: 'latest' }, 'latest hand'); timer.advance(150);
  timer.advance(4100); assert.equal(visible, true); // old timer cannot dismiss latest
  timer.advance(150); assert.equal(visible, false);
  assert.deepEqual(shown, ['new', 'latest']); assert.equal(spoken.length, 2);
});

test('a suppressed note still announces the cards without claiming a visible reaction', () => {
  const timer = clock(), spoken = [];
  const sequence = createSequence({ ...timer, show: () => false, hide() {}, announce: text => spoken.push(text) });
  sequence.reveal({ text: 'hidden reaction' }, 'Your hand: two aces.'); timer.advance(150);
  assert.deepEqual(spoken, ['Your hand: two aces.']);
});

test('placement favors right, falls back above, and suppresses when both would overlap', () => {
  const right = { name: 'right', rect: { left: 300, right: 520, top: 620, bottom: 720 } };
  const above = { name: 'above', rect: { left: 150, right: 310, top: 450, bottom: 550 } };
  assert.equal(choosePlacement([right, above], [], 1280, 780), 'right');
  assert.equal(choosePlacement([right, above], [right.rect], 1280, 780), 'above');
  assert.equal(choosePlacement([right, above], [right.rect, above.rect], 1280, 780), undefined);
  assert.equal(choosePlacement([right, above], [], 500, 780), 'above');
  assert.equal(choosePlacement([right, above], [], 1280, 400), undefined);
});
