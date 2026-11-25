// Shared Writing lettering, drawn as ordered pen strokes rather than font outlines.
const WRITING_INK_GLYPHS = {
  t: { advance: 18, d: 'M0 48 C5 44 10 31 13 11 C12 23 8 38 8 44 C8 52 13 51 18 48', marks: ['M4 29 Q11 27 18 27'] },
  h: { advance: 28, d: 'M0 48 C6 39 16 12 12 4 C8 -2 3 8 4 18 C5 34 5 43 3 48 C8 34 14 25 19 29 C24 32 17 43 19 48 C21 52 25 50 28 48' },
  e: { advance: 22, d: 'M0 48 C8 44 19 35 13 29 C8 24 2 31 4 40 C6 51 14 55 22 48' },
  b: { advance: 26, d: 'M0 48 C7 37 17 10 12 4 C7 -2 3 9 4 21 C5 33 4 44 7 49 C16 57 25 46 21 36 C18 27 12 30 11 36 C10 43 20 49 26 48' },
  a: { advance: 26, d: 'M0 48 C5 46 9 42 14 31 C9 26 3 31 3 40 C3 50 12 55 18 34 L20 29 C17 38 15 47 19 49 C21 51 24 49 26 48' },
  r: { advance: 21, d: 'M0 48 C5 43 9 34 9 28 C9 24 13 25 13 30 C13 34 17 35 19 30 C14 35 12 44 13 48 C15 52 18 50 21 48' },
  g: { advance: 27, d: 'M0 48 C6 44 13 33 16 30 C9 25 3 31 3 40 C3 51 13 54 19 32 C17 43 15 61 10 71 C7 79 -1 77 1 70 C3 62 15 57 27 48' },
  s: { advance: 22, d: 'M0 48 C8 43 13 34 13 28 C10 33 9 36 14 40 C23 46 18 54 10 51 C5 49 7 44 11 44 C13 51 18 51 22 48' },
  i: { advance: 13, d: 'M0 48 C4 44 6 35 7 29 C5 38 3 47 7 49 C9 51 11 49 13 48', marks: ['M6.5 20 L9.5 20'] },
  c: { advance: 23, d: 'M0 48 C6 43 19 36 17 30 C14 24 5 29 4 39 C2 51 14 55 23 48' },
  d: { advance: 28, d: 'M0 48 C6 43 12 34 17 30 C9 25 3 31 3 40 C3 52 13 53 19 33 C23 20 28 3 24 3 C20 3 17 34 17 43 C17 53 24 51 28 48' },
  f: { advance: 22, d: 'M0 48 C9 37 22 9 16 3 C10 -2 7 12 7 29 C7 50 6 71 2 75 C-4 80 -4 66 2 59 C8 52 17 52 22 48', marks: ['M0 31 Q10 29 20 29'] },
  k: { advance: 27, d: 'M0 48 C6 38 18 10 13 3 C8 -2 4 8 4 21 C4 34 5 43 3 48 C8 36 22 22 22 31 C22 38 10 40 10 39 C19 37 15 49 21 50 C23 51 25 49 27 48' },
  l: { advance: 17, d: 'M0 48 C7 38 18 9 12 3 C7 -2 3 9 4 22 C5 33 3 46 8 49 C11 52 14 50 17 48' },
  m: { advance: 39, d: 'M0 48 C5 41 7 34 7 29 L3 48 C8 35 13 25 17 29 C21 33 13 44 15 48 C20 35 26 25 29 29 C34 33 26 44 29 49 C32 53 36 50 39 48' },
  n: { advance: 28, d: 'M0 48 C5 41 7 34 7 29 L3 48 C8 35 15 25 19 29 C24 33 17 43 19 48 C21 52 25 50 28 48' },
  o: { advance: 25, d: 'M0 48 C6 42 15 34 16 29 C8 24 3 31 3 40 C3 52 15 54 19 41 C22 32 17 26 13 30 C10 35 19 48 25 48' },
  p: { advance: 27, d: 'M0 48 C7 40 10 31 10 28 C9 40 4 67 2 74 C5 60 12 33 18 29 C26 24 28 38 22 46 C16 55 9 50 12 45 C15 48 22 50 27 48' },
  u: { advance: 28, d: 'M0 48 C5 42 8 34 8 29 C5 39 2 49 8 50 C15 52 20 35 21 29 C18 40 16 47 20 49 C23 51 26 49 28 48' },
  v: { advance: 25, d: 'M0 48 C6 42 9 34 8 29 C8 38 6 48 12 50 C18 51 24 34 22 29 C18 24 16 32 20 37 C22 40 25 42 25 48' },
  w: { advance: 39, d: 'M0 48 C5 42 8 34 8 29 C5 39 3 49 9 50 C16 51 20 36 20 29 C17 39 16 49 22 50 C29 52 37 35 34 29 C30 24 28 33 33 39 C36 42 37 46 39 48' },
  y: { advance: 28, d: 'M0 48 C5 42 8 34 8 29 C5 39 2 49 8 50 C15 52 21 35 22 29 C19 44 15 64 9 73 C4 80 -3 76 1 68 C6 60 20 54 28 48' },
  A: { advance: 36, d: 'M0 48 C9 42 21 12 27 4 C24 19 19 41 23 48 C26 54 32 50 36 48', marks: ['M8 34 Q19 31 30 33'] },
  C: { advance: 36, d: 'M26 16 C42 -1 15 -4 6 20 C-3 46 10 58 36 48' },
  D: { advance: 39, d: 'M0 48 C8 36 14 15 13 6 C11 18 6 41 4 48 C27 58 44 34 34 13 C29 1 11 -1 4 11 C0 19 7 23 13 20 C22 18 19 43 39 48' },
  E: { advance: 31, d: 'M25 12 C38 -1 12 -4 7 13 C3 24 15 29 23 24 C10 23 -2 32 2 44 C7 57 22 54 31 48' },
  G: { advance: 37, d: 'M27 15 C39 -1 16 -5 6 18 C-4 42 8 58 23 47 C32 40 29 29 20 33 C16 36 22 39 28 34 C25 50 21 66 12 66 C3 65 17 48 37 48' },
  H: { advance: 42, d: 'M0 17 C11 2 19 -2 16 13 C13 25 8 40 5 49 C11 36 20 32 29 31 C34 17 39 1 35 3 C30 7 25 36 27 45 C29 54 37 51 42 48' },
  I: { advance: 23, d: 'M0 12 C9 2 24 0 21 9 C17 22 11 43 5 49 C-2 55 -4 44 5 42 C12 41 16 50 23 48' },
  K: { advance: 39, d: 'M0 16 C11 1 20 0 16 13 C12 27 8 41 5 49 C9 36 19 17 33 6 C42 -1 42 9 31 17 L16 29 C28 25 24 43 30 49 C33 53 37 50 39 48' },
  O: { advance: 38, d: 'M21 9 C7 -1 -4 28 3 43 C10 61 29 50 33 30 C37 11 25 -2 15 8 C4 20 17 45 38 48' },
  R: { advance: 39, d: 'M0 48 C8 34 14 13 12 6 C10 17 8 38 5 48 C9 36 8 16 16 7 C26 -5 42 7 33 21 C29 28 17 30 12 26 C27 23 24 43 31 49 C34 52 37 49 39 48' },
  T: { advance: 32, d: 'M0 15 C7 -1 21 9 34 4 C26 6 22 8 19 18 C16 30 14 49 6 51 C-2 54 -2 44 6 43 C14 42 23 52 32 48' },
  W: { advance: 49, d: 'M0 16 C6 3 15 1 12 14 C8 28 4 48 11 50 C20 52 28 16 27 6 C23 23 19 48 27 50 C37 53 49 14 45 6 C42 0 36 7 40 15 C44 24 42 42 49 48' },
  Y: { advance: 36, d: 'M0 15 C8 3 14 1 11 15 C7 27 7 39 15 37 C25 35 32 10 31 5 C27 25 21 55 10 67 C0 77 -5 64 3 59 C12 53 25 51 36 48' },
  '?': { advance: 23, detached: true, d: 'M3 12 C6 0 25 2 23 15 C21 24 11 24 10 34', marks: ['M8 47 L11 47'] },
};

function layoutWritingStrokes(text, width) {
  if (width <= 0 || !text.trim() || [...text].some(letter => letter !== ' ' && !WRITING_INK_GLYPHS[letter])) return null;
  const words = text.trim().split(/ +/);
  const wordWidths = words.map(word => [...word].reduce((sum, letter) => sum + WRITING_INK_GLYPHS[letter].advance, 0));
  const scale = Math.min(.68, Math.max(1, width - 12) / Math.max(...wordWidths));
  const wordGap = 18 * scale, lineHeight = 88 * scale;
  const strokes = [];
  let x = 0, y = 0, line = 0;
  words.forEach((word, wordIndex) => {
    const wordWidth = wordWidths[wordIndex] * scale;
    if (x && x + wordWidth > width - 4) { x = 0; y += lineHeight; line++; }
    let letterX = x;
    const marks = [];
    const appendStroke = (d, originX, liftBefore) => strokes.push({ d, x: originX, y, scale, line, liftBefore });
    [...word].forEach((letter, index) => {
      const glyph = WRITING_INK_GLYPHS[letter];
      const previous = WRITING_INK_GLYPHS[word[index - 1]];
      // Capitals with a raised entrance and punctuation need a real pen lift.
      const liftedEntrance = !glyph.d.startsWith('M0 48');
      appendStroke(glyph.d, letterX, strokes.length > 0 && (index === 0 || glyph.detached || previous?.detached || liftedEntrance));
      glyph.marks?.forEach(d => marks.push({ d, x: letterX }));
      letterX += glyph.advance * scale;
    });
    marks.forEach(mark => appendStroke(mark.d, mark.x, true));
    x += wordWidth + wordGap;
  });
  return { strokes, height: y + 81 * scale, duration: Math.min(5000, Math.max(2400, 2400 + (text.length - 19) * 65)) };
}

function buildWritingTimeline(strokes, duration = 2400) {
  const leadIn = 80;
  const liftDuration = (stroke, index) => index && stroke.liftBefore ? (stroke.line !== strokes[index - 1].line ? 150 : 90) : 0;
  const lifts = strokes.reduce((total, stroke, index) => total + liftDuration(stroke, index), 0);
  const weight = strokes.reduce((total, stroke) => total + Math.max(18, stroke.length), 0);
  const drawingTime = Math.max(600, duration - leadIn - lifts);
  const segments = [{ kind: 'lead-in', start: 0, end: leadIn, index: 0 }];
  let cursor = leadIn;
  strokes.forEach((stroke, index) => {
    const lift = liftDuration(stroke, index);
    if (lift) {
      segments.push({ kind: 'lift', start: cursor, end: cursor + lift, index });
      cursor += lift;
    }
    const time = drawingTime * Math.max(18, stroke.length) / weight;
    segments.push({ kind: 'write', start: cursor, end: cursor + time, index });
    cursor += time;
  });
  return { segments, duration: cursor };
}

function sampleWritingTimeline(timeline, elapsed) {
  if (elapsed >= timeline.duration) return { kind: 'done', progress: 1 };
  const time = Math.max(0, elapsed);
  const segment = timeline.segments.find(segment => time < segment.end);
  return { ...segment, progress: Math.max(0, (time - segment.start) / (segment.end - segment.start)) };
}

let writingInkSequence = 0;
const writingInkOutlineCache = new Map();
let writingTouchController;

// One shared dwell timer: a settled viewport chooses one title, never a queue.
function createWritingTouchController({ view = window, doc = document } = {}) {
  const touch = view.matchMedia('(hover: none), (pointer: coarse)');
  const reduced = view.matchMedia('(prefers-reduced-motion: reduce)');
  const entries = new Map();
  const played = new WeakSet();
  const pointers = new Set();
  let timer = null;
  let active = null;

  function finishActive() {
    if (active) active.finish();
    active = null;
  }

  function clearDwell() {
    if (timer !== null) view.clearTimeout(timer);
    timer = null;
  }

  function available() {
    return touch.matches && !doc.hidden && !doc.querySelector('dialog[open]') && !pointers.size;
  }

  function settle() {
    timer = null;
    if (!available()) return;
    const viewport = view.visualViewport;
    const top = (viewport?.offsetTop || 0) + 16;
    const bottom = top + (viewport?.height || view.innerHeight) - 32;
    const left = viewport?.offsetLeft || 0;
    const right = left + (viewport?.width || view.innerWidth);
    let nearest = null, distance = Infinity;
    entries.forEach(entry => {
      const rect = entry.title.getBoundingClientRect();
      if (!entry.ready() || !rect.width || !rect.height) return;
      const visibleHeight = Math.max(0, Math.min(rect.bottom, bottom) - Math.max(rect.top, top));
      const visibleWidth = Math.max(0, Math.min(rect.right, right) - Math.max(rect.left, left));
      if (visibleHeight < Math.min(rect.height, bottom - top) * .85 || visibleWidth < rect.width * .85) return;
      if (reduced.matches) {
        played.add(entry.card);
        entry.finish();
      }
      const nextDistance = Math.abs((rect.top + rect.bottom - top - bottom) / 2);
      if (nextDistance < distance) { nearest = entry; distance = nextDistance; }
    });
    if (active && active !== nearest) finishActive();
    if (!nearest || played.has(nearest.card)) return;
    played.add(nearest.card);
    active = nearest;
    nearest.start();
  }

  function schedule() {
    clearDwell();
    if (available()) timer = view.setTimeout(settle, reduced.matches ? 0 : 500);
  }

  function interrupt() {
    finishActive();
    schedule();
  }

  const observer = view.IntersectionObserver ? new view.IntersectionObserver(changes => {
    if (active && changes.some(change => change.target === active.title && !change.isIntersecting)) finishActive();
    schedule();
  }, { threshold: [0, .85, 1] }) : null;
  view.addEventListener('scroll', interrupt, { passive: true });
  view.addEventListener('resize', interrupt, { passive: true });
  view.visualViewport?.addEventListener('scroll', interrupt, { passive: true });
  view.visualViewport?.addEventListener('resize', interrupt, { passive: true });
  doc.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'touch') return;
    pointers.add(event.pointerId);
    clearDwell();
  }, { passive: true });
  const release = event => { pointers.delete(event.pointerId); schedule(); };
  doc.addEventListener('pointerup', release, { passive: true });
  doc.addEventListener('pointercancel', release, { passive: true });
  doc.addEventListener('visibilitychange', () => { pointers.clear(); interrupt(); });
  view.addEventListener('pagehide', () => { clearDwell(); finishActive(); });
  view.addEventListener('pageshow', schedule);
  // Routing and the chooser can hide a card without scrolling the document.
  doc.addEventListener('close', schedule, true);
  doc.addEventListener('toggle', interrupt, true);
  touch.addEventListener('change', () => {
    interrupt();
    entries.forEach(entry => entry.reset());
  });
  reduced.addEventListener('change', interrupt);

  return {
    get enabled() { return touch.matches; },
    hasPlayed(card) { return played.has(card); },
    layoutChanged: schedule,
    add(entry) {
      entries.set(entry.title, entry);
      observer?.observe(entry.title);
      schedule();
    },
  };
}

function attachWritingInk(card, title, text) {
  if (!layoutWritingStrokes(text, 300)) return;
  const ns = 'http://www.w3.org/2000/svg';
  const id = `writing-ink-${++writingInkSequence}`;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const touch = writingTouchController ||= createWritingTouchController();
  function svgElement(tag, attributes = {}) {
    const element = document.createElementNS(ns, tag);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
  }
  const printed = document.createElement('span');
  printed.className = 'writing-printed-title';
  printed.textContent = text;
  const svg = svgElement('svg', { class: 'writing-ink', 'aria-hidden': 'true', focusable: 'false' });
  const defs = svgElement('defs');
  const lettering = svgElement('g');
  const nib = svgElement('g', { class: 'writing-nib' });
  const nibAngle = svgElement('g', { transform: 'rotate(32)' });
  const gold = svgElement('linearGradient', { id: `${id}-gold`, x1: '0%', y1: '0%', x2: '100%', y2: '10%' });
  [['0%', '#8b692e'], ['24%', '#c6a469'], ['48%', '#f5e4ba'], ['65%', '#c4a16a'], ['100%', '#92713d']].forEach(([offset, color]) => {
    gold.append(svgElement('stop', { offset, 'stop-color': color }));
  });
  defs.append(gold);
  nibAngle.append(
    svgElement('path', { d: 'M-5 -29 L-5 -36 Q0 -38 5 -36 L5 -29Z', fill: '#303a35', stroke: '#202a25', 'stroke-width': '.6' }),
    svgElement('path', { d: 'M0 0 C-2 -8 -8 -14 -7 -23 L-5 -29 L5 -29 L7 -23 C8 -14 2 -8 0 0Z', fill: `url(#${id}-gold)`, stroke: '#86652f', 'stroke-width': '.65' }),
    svgElement('path', { d: 'M0 -1 V-18 M-4 -26 Q0 -23 4 -26', fill: 'none', stroke: '#745426', 'stroke-width': '.7' }),
    svgElement('circle', { cx: 0, cy: -19, r: 1.3, fill: '#3d3528' }),
    svgElement('path', { d: 'M-4 -25 Q-5 -16 -1 -9', fill: 'none', stroke: '#fff4d1', 'stroke-width': '.8', opacity: '.7' }),
  );
  nib.append(nibAngle);
  svg.append(defs, lettering, nib);
  title.classList.add('writing-ink-title');
  title.replaceChildren(printed, svg);
  card.classList.add('has-writing-ink');
  card.dataset.inkState = 'idle';

  let strokes = [];
  let timeline;
  let frame = null;
  let startedAt = null;
  let currentWidth = 0;
  let completed = -1;
  let isActive = false;

  // A pressure-shaped ribbon gives downward strokes more weight than hairline joins.
  function inkOutline(path, length) {
    const key = path.getAttribute('d');
    if (writingInkOutlineCache.has(key)) return writingInkOutlineCache.get(key);
    const left = [], right = [];
    const steps = Math.max(8, Math.ceil(length / .6));
    for (let i = 0; i <= steps; i++) {
      const distance = length * i / steps;
      const point = path.getPointAtLength(distance);
      const before = path.getPointAtLength(Math.max(0, distance - .3));
      const after = path.getPointAtLength(Math.min(length, distance + .3));
      const dx = after.x - before.x, dy = after.y - before.y;
      const tangent = Math.hypot(dx, dy) || 1;
      const half = (.95 + 1.8 * Math.max(0, dy / tangent)) / 2;
      left.push(`${(point.x - dy / tangent * half).toFixed(2)} ${(point.y + dx / tangent * half).toFixed(2)}`);
      right.push(`${(point.x + dy / tangent * half).toFixed(2)} ${(point.y - dx / tangent * half).toFixed(2)}`);
    }
    const outline = `M${left.join(' L')} L${right.reverse().join(' L')}Z`;
    writingInkOutlineCache.set(key, outline);
    return outline;
  }

  function pointOn(stroke, progress) {
    const point = stroke.path.getPointAtLength(stroke.length * progress);
    return { x: stroke.x + stroke.scale * (point.x + .16 * (48 - point.y)), y: stroke.y + stroke.scale * point.y };
  }

  function cancelFrame() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    startedAt = null;
  }

  function stop() {
    if (touch.enabled && touch.hasPlayed(card)) return finish();
    cancelFrame();
    isActive = false;
    card.dataset.inkState = 'idle';
  }

  function finish() {
    cancelFrame();
    strokes.forEach(stroke => { stroke.path.style.strokeDashoffset = '0'; });
    completed = strokes.length - 1;
    card.dataset.inkState = 'complete';
  }

  function tick(now) {
    frame = null;
    if (!isActive) return;
    if (startedAt === null) startedAt = now;
    const sample = sampleWritingTimeline(timeline, now - startedAt);
    if (sample.kind === 'done') return finish();
    const current = strokes[sample.index];
    while (completed < sample.index - 1) strokes[++completed].path.style.strokeDashoffset = '0';
    let point, lift = 0;
    if (sample.kind === 'write') {
      current.path.style.strokeDashoffset = String(current.length * (1 - sample.progress));
      point = pointOn(current, sample.progress);
    } else if (sample.kind === 'lift') {
      const from = pointOn(strokes[sample.index - 1], 1), to = pointOn(current, 0);
      const progress = sample.progress ** 2 * (3 - 2 * sample.progress);
      lift = Math.sin(sample.progress * Math.PI);
      point = { x: from.x + (to.x - from.x) * progress, y: from.y + (to.y - from.y) * progress - lift * 8 };
    } else {
      point = pointOn(current, 0);
    }
    nib.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${lift * 5}) scale(${1 + lift * .06})`);
    frame = requestAnimationFrame(tick);
  }

  function start() {
    if (isActive || !strokes.length) return;
    cancelFrame();
    isActive = true;
    completed = -1;
    if (reducedMotion.matches) return finish();
    strokes.forEach(stroke => { stroke.path.style.strokeDashoffset = String(stroke.length); });
    const point = pointOn(strokes[0], 0);
    nib.setAttribute('transform', `translate(${point.x} ${point.y})`);
    card.dataset.inkState = 'writing';
    frame = requestAnimationFrame(tick);
  }

  function layout() {
    const width = title.clientWidth;
    if (!width) { currentWidth = 0; stop(); touch.layoutChanged(); return; }
    if (Math.abs(width - currentWidth) < .5) return;
    currentWidth = width;
    stop();
    lettering.replaceChildren();
    defs.querySelectorAll('mask').forEach(mask => mask.remove());
    strokes = [];
    const plan = layoutWritingStrokes(text, width);
    plan.strokes.forEach(stroke => {
      const { d, x, y, scale } = stroke;
      const group = svgElement('g', { transform: `matrix(${scale} 0 ${-.16 * scale} ${scale} ${x + .16 * 48 * scale} ${y})` });
      const path = svgElement('path', { d, fill: 'none', stroke: 'white', 'stroke-width': 8, 'stroke-linecap': 'butt' });
      const maskId = `${id}-stroke-${strokes.length}`;
      const mask = svgElement('mask', { id: maskId, maskUnits: 'userSpaceOnUse', x: -12, y: -12, width: 70, height: 110 });
      mask.append(path);
      defs.append(mask);
      const length = path.getTotalLength();
      const outline = inkOutline(path, length);
      path.style.strokeDasharray = `${length} ${length}`;
      path.style.strokeDashoffset = String(length);
      group.append(svgElement('path', { d: outline, class: 'writing-guide' }), svgElement('path', { d: outline, class: 'writing-stroke', mask: `url(#${maskId})` }));
      lettering.append(group);
      strokes.push({ ...stroke, path, length });
    });
    const height = Math.max(printed.getBoundingClientRect().height, plan.height);
    title.style.minHeight = `${height}px`;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.style.height = `${height}px`;
    timeline = buildWritingTimeline(strokes, plan.duration);
    if (touch.enabled && (touch.hasPlayed(card) || reducedMotion.matches)) finish();
    touch.layoutChanged();
  }

  touch.add({ card, title, start, finish, reset: stop, ready: () => currentWidth > 0 && strokes.length > 0 });
  card.addEventListener('pointerenter', event => { if (!touch.enabled && event.pointerType !== 'touch') start(); });
  card.addEventListener('pointerleave', () => { if (!touch.enabled && !card.matches(':focus-visible')) stop(); });
  card.addEventListener('focus', () => { if (!touch.enabled && card.matches(':focus-visible')) start(); });
  card.addEventListener('blur', () => { if (!card.matches(':hover')) stop(); });
  reducedMotion.addEventListener('change', () => { if (isActive) { cancelFrame(); finish(); } });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  new ResizeObserver(layout).observe(title);
}

if (typeof module !== 'undefined' && module.exports) module.exports = { buildWritingTimeline, sampleWritingTimeline, layoutWritingStrokes, createWritingTouchController };
