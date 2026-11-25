(function (factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else api.mount(document.getElementById('pocket-cards'));
})(function () {
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const suits = [
    { symbol: '♠', name: 'spades', red: false },
    { symbol: '♥', name: 'hearts', red: true },
    { symbol: '♣', name: 'clubs', red: false },
    { symbol: '♦', name: 'diamonds', red: true }
  ];

  function dealPair(random = Math.random) {
    const first = Math.floor(random() * 52);
    const second = Math.floor(random() * 51);
    return [first, second >= first ? second + 1 : second];
  }

  function overlaps(a, b, gap = 8) {
    return Boolean(b && b.right > b.left && b.bottom > b.top &&
      a.left < b.right + gap && a.right > b.left - gap &&
      a.top < b.bottom + gap && a.bottom > b.top - gap);
  }

  function shouldYield({ desktop, hidden, modal, libraryPage, library, viewportHeight, dock, obstacles }) {
    return !desktop || hidden || modal || libraryPage ||
      Boolean(library && library.bottom > 0 && library.top < viewportHeight) ||
      obstacles.some(rect => overlaps(dock, rect));
  }

  function choosePlacement(candidates, obstacles, width, height) {
    return candidates.find(({ rect }) => rect.left >= 12 && rect.right <= width - 12 &&
      rect.top >= 12 && rect.bottom <= height - 12 && !obstacles.some(other => overlaps(rect, other)))?.name;
  }

  function mount(root) {
    if (!root) return;
    const canvas = root.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const deal = root.querySelector('.pocket-cards-deal');
    const hand = root.querySelector('.pocket-cards-hand');
    const caption = root.querySelector('.pocket-cards-caption');
    const restore = root.querySelector('.pocket-cards-restore');
    const status = root.querySelector('[role="status"]');
    const note = root.querySelector('.pocket-reaction');
    const reactions = window.PocketReactions;
    const library = document.getElementById('library');
    const desktop = matchMedia('(min-width: 1280px) and (hover: hover) and (pointer: fine)');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const storageKey = 'somil-pocket-cards';
    let state = { cards: dealPair(), faceUp: false, tucked: false };
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey));
      if (Array.isArray(saved?.cards) && saved.cards.length === 2 && saved.cards[0] !== saved.cards[1] &&
          saved.cards.every(id => Number.isInteger(id) && id >= 0 && id < 52)) {
        state = { cards: saved.cards, faceUp: Boolean(saved.faceUp), tucked: Boolean(saved.tucked) };
      }
    } catch { /* Storage is optional; navigation still preserves the mounted hand. */ }

    const style = getComputedStyle(root);
    const colors = { paper: style.getPropertyValue('--paper').trim(), ink: '#45483e', green: '#62725a', red: '#9b655e' };
    let face = state.faceUp ? 1 : 0;
    let hover = 0, hoverTarget = 0, arrival = 1, busy = false;
    let frame = 0, visibilityFrame = 0, running = null;
    const clamp = value => Math.max(0, Math.min(1, value));
    const ease = t => 1 - Math.pow(1 - t, 3);
    const sequence = reactions.createSequence({
      show(reaction) {
        if (root.dataset.available !== 'true' || state.tucked || !state.faceUp) return false;
        note.dataset.tier = reaction.tier;
        note.querySelector('.pocket-reaction-text').textContent = reaction.text;
        if (!placeReaction()) return false;
        note.dataset.visible = 'true';
        return true;
      },
      hide() { note.dataset.visible = 'false'; },
      announce(text) { status.textContent = text; }
    });

    function sceneObstacles() {
      return [...document.querySelectorAll('[data-pocket-cards-avoid], .writing-ink-title, .section-blob, .game-cover')]
        .map(element => element.getBoundingClientRect());
    }

    function placeReaction() {
      // Keep the note away from controls and other illustrations. It never
      // expands the dock's layout box or pushes the page around.
      const obstacles = sceneObstacles().concat([...document.querySelectorAll('a, button, input, select, textarea')]
        .filter(element => !root.contains(element)).map(element => element.getBoundingClientRect()));
      const candidates = ['right', 'above'].map(name => {
        note.dataset.placement = name;
        const rect = note.getBoundingClientRect();
        return { name, rect };
      });
      const placement = choosePlacement(candidates, obstacles, innerWidth, innerHeight);
      if (!placement) return false;
      note.dataset.placement = placement;
      return true;
    }

    function cardAt(index) {
      const id = state.cards[index];
      return { rank: ranks[id % 13], ...suits[Math.floor(id / 13)] };
    }

    function describe(card) {
      const names = { A: 'Ace', J: 'Jack', Q: 'Queen', K: 'King' };
      return `${names[card.rank] || card.rank} of ${card.name}`;
    }

    function save() {
      try { sessionStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* Optional. */ }
    }

    function labels() {
      root.dataset.faceUp = String(state.faceUp);
      caption.textContent = state.faceUp ? 'another hand?' : 'a little luck?';
      deal.setAttribute('aria-label', state.faceUp
        ? `${describe(cardAt(0))} and ${describe(cardAt(1))}. Deal another hand`
        : 'Flip your two cards face up');
      hand.hidden = state.tucked;
      restore.hidden = !state.tucked;
    }

    function stroke(path, color = colors.ink, width = 1.25, fill = false) {
      const shape = new Path2D(path);
      ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      if (fill) { ctx.fillStyle = colors.paper; ctx.fill(shape); }
      ctx.stroke(shape);
      ctx.save(); ctx.globalAlpha *= .16; ctx.translate(.56, -.52); ctx.lineWidth = .6;
      ctx.stroke(shape); ctx.restore();
    }

    function drawCard(which) {
      const delay = which * .17;
      const progress = clamp((face - delay) / (1 - delay));
      const settle = clamp((arrival - which * .13) / .87);
      ctx.save();
      ctx.translate((which ? 104 : 70) + (which ? 3 : -3) * hover,
        68 - 5 * hover + (1 - ease(settle)) * 48 - 8 * Math.sin(progress * Math.PI));
      ctx.rotate(((which ? 10 : -13) + (which ? 3 : -3) * hover + (1 - settle) * (which ? 8 : -8)) * Math.PI / 180);
      ctx.scale(Math.max(.045, Math.abs(Math.cos(progress * Math.PI))), 1);
      ctx.globalAlpha = settle;
      stroke('M-25 -43 Q-29 -43 -29 -38 L-28 36 Q-29 42 -23 42 L24 41 Q29 41 28 35 L29 -37 Q29 -43 23 -42 Z', colors.ink, 1.35, true);
      if (progress < .5) {
        stroke('M-21 -35 L21 -35 L21 33 L-20 34 Z', colors.green, .85);
        ctx.save(); ctx.beginPath(); ctx.rect(-18, -32, 36, 63); ctx.clip();
        for (let line = -70; line < 72; line += 8) stroke(`M-21 ${line} Q0 ${line + 19.6} 22 ${line + 43}`, colors.green, .6);
        for (let line = -70; line < 72; line += 11) stroke(`M-21 ${line} Q1 ${line - 20.3} 22 ${line - 43}`, colors.green, .35);
        ctx.restore();
        ctx.fillStyle = colors.paper; ctx.beginPath(); ctx.ellipse(0, -1, 12, 16, -.05, 0, Math.PI * 2); ctx.fill();
        stroke('M0 -12 Q5 -7 8 -1 Q3 3 0 10 Q-4 4 -8 -1 Q-3 -7 0 -12', colors.green, 1.05);
      } else {
        const card = cardAt(which);
        ctx.fillStyle = card.red ? colors.red : colors.ink; ctx.textAlign = 'center';
        ctx.font = `${card.rank === '10' ? 14 : 17}px Georgia,serif`; ctx.fillText(card.rank, -17, -23);
        ctx.font = '12px Georgia,serif'; ctx.fillText(card.symbol, -17, -10);
        ctx.font = '30px Georgia,serif'; ctx.fillText(card.symbol, 1, 10);
        ctx.save(); ctx.translate(17, 25); ctx.rotate(Math.PI);
        ctx.font = '13px Georgia,serif'; ctx.fillText(card.rank, 0, 0);
        ctx.font = '10px Georgia,serif'; ctx.fillText(card.symbol, 0, 11); ctx.restore();
      }
      ctx.restore();
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.save(); ctx.scale(2, 2);
      drawCard(0); drawCard(1); ctx.restore();
    }

    function settleAnimation() {
      cancelAnimationFrame(frame);
      const pending = running;
      running = null;
      pending?.();
    }

    function animate(duration, update, finish = () => {}) {
      settleAnimation();
      const complete = () => { update(1); finish(); draw(); };
      if (reduced.matches || root.dataset.available !== 'true') return complete();
      running = complete;
      let start;
      function tick(now) {
        start ??= now;
        const t = clamp((now - start) / duration);
        update(t); draw();
        if (t < 1) frame = requestAnimationFrame(tick);
        else { running = null; finish(); draw(); }
      }
      frame = requestAnimationFrame(tick);
    }

    function interact() {
      if (busy) return;
      settleAnimation();
      sequence.cancel(); status.textContent = '';
      busy = true;
      const redeal = state.faceUp;
      let dealt = false;
      function update(t) {
        if (!redeal) face = t;
        else if (t < .28) arrival = 1 - t / .28;
        else {
          if (!dealt) { state.cards = dealPair(); dealt = true; }
          face = 0; arrival = (t - .28) / .72;
        }
      }
      animate(redeal ? 680 : 750, update, () => {
        state.faceUp = !redeal; busy = false; hover = hoverTarget;
        labels(); save();
        if (root.dataset.available !== 'true' || state.tucked) return;
        if (state.faceUp) sequence.reveal(reactions.reactionFor(state.cards),
          `Your hand: ${describe(cardAt(0))} and ${describe(cardAt(1))}.`);
        else status.textContent = 'Two new cards, face down.';
      });
    }

    function setHover(target) {
      hoverTarget = target;
      if (busy) return;
      settleAnimation();
      const from = hover;
      animate(180, t => { hover = from + (target - from) * ease(t); });
    }

    function refreshVisibility() {
      visibilityFrame = 0;
      const shell = document.querySelector('.site-shell');
      const gutter = shell.getBoundingClientRect().left + parseFloat(getComputedStyle(shell).paddingLeft);
      const nav = document.querySelector('.index-nav a');
      const navVisible = nav.getClientRects().length > 0;
      const sidebarBottom = document.querySelector('.index-sidebar').getBoundingClientRect().bottom;
      const size = navVisible ? Math.min(144, Math.max(96, Math.floor((innerHeight - sidebarBottom - 72) * 180 / 132)))
        : Math.min(144, Math.max(96, gutter - 24));
      // The canvas has transparent margins: align the drawn cards with the
      // navigation icons. Detail pages reclaim that column, so use their gutter.
      const left = navVisible ? nav.getBoundingClientRect().left + parseFloat(getComputedStyle(nav).paddingLeft) - size / 6 : 12;
      root.style.setProperty('--pocket-size', `${size}px`);
      root.style.setProperty('--pocket-left', `${left}px`);
      root.style.setProperty('--pocket-note-bottom', `${Math.min(30, Math.max(0, size * 132 / 180 - 75))}px`);
      const dock = { left, right: left + root.offsetWidth, bottom: innerHeight - 20,
        top: innerHeight - 20 - root.offsetHeight - 14 };
      const libraryVisible = !library.hidden && library.getClientRects().length > 0;
      const unavailable = shouldYield({
        desktop: desktop.matches, hidden: document.hidden, modal: Boolean(document.querySelector('dialog[open]')),
        libraryPage: document.body.classList.contains('section-view') && libraryVisible,
        library: libraryVisible ? library.getBoundingClientRect() : null, viewportHeight: innerHeight, dock,
        // New scenes can reserve their footprint with data-pocket-cards-avoid.
        obstacles: sceneObstacles()
      });
      root.dataset.available = String(!unavailable);
      if (unavailable) {
        if (root.contains(document.activeElement)) document.getElementById('main').focus({ preventScroll: true });
        settleAnimation(); hover = 0; hoverTarget = 0; draw();
        sequence.cancel();
      }
      root.inert = unavailable;
      if (!unavailable && note.dataset.visible === 'true' && !placeReaction()) sequence.cancel();
    }

    function queueVisibility() {
      if (!visibilityFrame) visibilityFrame = requestAnimationFrame(refreshVisibility);
    }

    deal.addEventListener('click', interact);
    caption.addEventListener('click', interact);
    deal.addEventListener('pointerenter', () => setHover(1));
    deal.addEventListener('pointerleave', () => setHover(0));
    deal.addEventListener('focus', () => setHover(1));
    deal.addEventListener('blur', () => setHover(0));
    root.querySelector('.pocket-cards-hide').addEventListener('click', () => {
      settleAnimation(); sequence.cancel(); state.tucked = true; labels(); save(); restore.focus(); queueVisibility();
    });
    restore.addEventListener('click', () => {
      state.tucked = false; labels(); save(); refreshVisibility();
      if (!root.inert) deal.focus();
    });
    window.addEventListener('scroll', () => { if (desktop.matches) queueVisibility(); }, { passive: true });
    window.addEventListener('resize', queueVisibility);
    window.addEventListener('site:viewchange', () => { settleAnimation(); sequence.cancel(); refreshVisibility(); });
    document.addEventListener('visibilitychange', refreshVisibility);
    document.addEventListener('animationstart', queueVisibility, true);
    document.addEventListener('transitionrun', queueVisibility, true);
    desktop.addEventListener('change', refreshVisibility);
    reduced.addEventListener('change', () => { settleAnimation(); hover = hoverTarget = 0; draw(); });
    const dialogObserver = new MutationObserver(queueVisibility);
    document.querySelectorAll('dialog').forEach(dialog => dialogObserver.observe(dialog, { attributes: true, attributeFilter: ['open'] }));
    const resizeObserver = new ResizeObserver(queueVisibility);
    [root, document.getElementById('main'), document.querySelector('.index-sidebar')].forEach(element => resizeObserver.observe(element));
    document.fonts?.ready.then(queueVisibility);
    labels(); draw(); root.dataset.ready = 'true'; refreshVisibility();
  }

  return { dealPair, overlaps, shouldYield, choosePlacement, mount };
});
