(function (factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else window.PocketReactions = api;
})(function () {
  // Heads-up preflop equity vs one uniformly random hand, rounded to 0.1%.
  // Source: https://pokermathcoach.com/tools/preflop-odds-chart/ (2026-11-25).
  // Rows/columns: AKQJT98765432; pairs diagonal, suited above, offsuit below.
  // Equal published equities share a rank. Percentiles are approximate and
  // weighted by all 1,326 deals, NOT a probability of winning the next hand.
  const equity = [
    [85.2,67.0,66.2,65.4,64.6,62.8,61.9,61.0,59.9,59.9,59.0,58.2,57.4],
    [65.3,82.4,63.4,62.6,61.8,60.0,58.3,57.5,56.6,55.8,54.9,54.1,53.2],
    [64.4,61.5,79.9,60.3,59.5,57.7,56.0,54.3,53.6,52.8,51.9,51.0,50.2],
    [63.6,60.6,58.1,77.5,57.5,55.7,54.0,52.3,50.6,50.0,49.1,48.2,47.4],
    [62.7,59.7,57.3,55.2,75.0,54.0,52.3,50.6,48.9,47.2,46.5,45.7,44.8],
    [60.8,57.8,55.4,53.3,51.5,72.1,50.8,49.1,47.4,45.7,43.9,43.3,42.4],
    [59.9,56.0,53.6,51.5,49.7,48.1,69.2,47.9,46.2,44.5,42.7,40.9,40.3],
    [58.8,55.2,51.8,49.7,47.9,46.3,45.1,66.2,45.4,43.7,41.8,40.0,38.2],
    [57.7,54.2,51.0,47.8,46.1,44.5,43.2,42.3,63.3,43.1,41.3,39.5,37.7],
    [57.7,53.3,50.1,47.2,44.3,42.7,41.4,40.5,39.9,60.3,41.5,39.7,37.8],
    [56.7,52.3,49.1,46.2,43.5,40.7,39.4,38.5,38.0,38.2,57.0,38.6,36.8],
    [55.8,51.4,48.2,45.3,42.6,40.0,37.5,36.6,36.1,36.3,35.1,53.7,36.0],
    [54.9,50.5,47.3,44.3,41.7,39.1,36.8,34.6,34.1,34.3,33.2,32.3,50.3]
  ];
  const ranks = 'AKQJT98765432';
  const hands = equity.flatMap((row, i) => row.map((value, j) => ({
    key: i === j ? ranks[i] + ranks[j] : ranks[Math.min(i, j)] + ranks[Math.max(i, j)] + (i < j ? 's' : 'o'),
    equity: value, combinations: i === j ? 6 : i < j ? 4 : 12
  })));
  const ranking = Object.fromEntries(hands.map(hand => {
    const below = hands.reduce((sum, other) => sum + (other.equity < hand.equity ? other.combinations : 0), 0);
    return [hand.key, { ...hand, percentile: below / 1326 * 100, top: (1326 - below) / 1326 * 100 }];
  }));

  function handKey(cards) {
    const indices = cards.map(id => id % 13 === 0 ? 0 : 13 - id % 13).sort((a, b) => a - b);
    return ranks[indices[0]] + ranks[indices[1]] + (indices[0] === indices[1] ? '' :
      Math.floor(cards[0] / 13) === Math.floor(cards[1] / 13) ? 's' : 'o');
  }

  function tierFor(percentile) {
    return percentile < 20 ? 'rough' : percentile < 60 ? 'ordinary' : percentile < 85 ? 'good' : percentile < 97 ? 'great' : 'premium';
  }

  function reactionFor(cards) {
    const rank = ranking[handKey(cards)];
    const tier = tierFor(rank.percentile);
    const ahead = rank.percentile.toFixed(1).replace(/\.0$/, '');
    // Round the upper tail upward so "Top X%" never overstates the rank.
    const top = (Math.ceil(rank.top * 10) / 10).toFixed(1).replace(/\.0$/, '');
    const text = {
      rough: rank.percentile === 0 ? 'Oof. Nowhere to go but up!' : `Oof. Ahead of only ${ahead}% of hands.`,
      ordinary: `We can work with this. Ahead of ${ahead}% of hands.`,
      good: `Hey, pretty good! Ahead of ${ahead}% of hands.`,
      great: `Now we’re talking. Top ${top}%.`,
      premium: `Top ${top}%. The price is going up!`
    }[tier];
    return { ...rank, tier, text };
  }

  // One reveal owns its timers. Cancellation also invalidates callbacks that
  // were queued before navigation, a redeal, or hiding the cards.
  function createSequence({ show, hide, announce, setTimer = setTimeout, clearTimer = clearTimeout }) {
    let generation = 0, timers = [];
    function cancel() {
      generation++;
      timers.forEach(clearTimer); timers = []; hide();
    }
    function reveal(reaction, label) {
      cancel();
      const current = generation;
      timers.push(setTimer(() => {
        if (current !== generation) return;
        const shown = show(reaction);
        announce(shown ? `${label} ${reaction.text} Approximate starting-hand rank.` : label);
        if (shown) timers.push(setTimer(() => {
          if (current === generation) hide();
        }, 4250));
      }, 150));
    }
    return { reveal, cancel };
  }

  return { ranking, handKey, tierFor, reactionFor, createSequence };
});
