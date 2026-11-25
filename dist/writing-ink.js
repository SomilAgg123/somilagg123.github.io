// A first handwriting study. The lettering is drawn as pen strokes, not font outlines.
const WRITING_INK_TITLE = 'the bar gets higher';
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
};

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

function attachWritingInk(card, title, text) {
  if (text !== WRITING_INK_TITLE) return;
  const ns = 'http://www.w3.org/2000/svg';
  const id = `writing-ink-${++writingInkSequence}`;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
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
  const outlineCache = new Map();

  // A pressure-shaped ribbon gives downward strokes more weight than hairline joins.
  function inkOutline(path, length) {
    const key = path.getAttribute('d');
    if (outlineCache.has(key)) return outlineCache.get(key);
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
    outlineCache.set(key, outline);
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
    cancelFrame();
    isActive = false;
    card.dataset.inkState = 'idle';
  }

  function finish() {
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
    if (!width) { currentWidth = 0; stop(); return; }
    if (Math.abs(width - currentWidth) < .5) return;
    currentWidth = width;
    stop();
    lettering.replaceChildren();
    defs.querySelectorAll('mask').forEach(mask => mask.remove());
    strokes = [];
    const scale = .68, wordGap = 18 * scale, lineHeight = 88 * scale;
    let x = 0, y = 0, line = 0;
    text.split(' ').forEach((word, wordIndex) => {
      const wordWidth = [...word].reduce((total, letter) => total + WRITING_INK_GLYPHS[letter].advance, 0) * scale;
      if (x && x + wordWidth > width - 4) { x = 0; y += lineHeight; line++; }
      let letterX = x;
      const marks = [];
      function appendStroke(d, originX, liftBefore) {
        const group = svgElement('g', { transform: `matrix(${scale} 0 ${-.16 * scale} ${scale} ${originX + .16 * 48 * scale} ${y})` });
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
        strokes.push({ path, length, x: originX, y, scale, line, liftBefore });
      }
      [...word].forEach((letter, index) => {
        const glyph = WRITING_INK_GLYPHS[letter];
        appendStroke(glyph.d, letterX, index === 0 && wordIndex > 0);
        glyph.marks?.forEach(d => marks.push({ d, x: letterX }));
        letterX += glyph.advance * scale;
      });
      marks.forEach(mark => appendStroke(mark.d, mark.x, true));
      x += wordWidth + wordGap;
    });
    const height = Math.max(printed.getBoundingClientRect().height, y + 81 * scale);
    title.style.minHeight = `${height}px`;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.style.height = `${height}px`;
    timeline = buildWritingTimeline(strokes);
  }

  card.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') start(); });
  card.addEventListener('pointerleave', () => { if (!card.matches(':focus-visible')) stop(); });
  card.addEventListener('focus', () => { if (card.matches(':focus-visible')) start(); });
  card.addEventListener('blur', () => { if (!card.matches(':hover')) stop(); });
  reducedMotion.addEventListener('change', () => { if (isActive) { cancelFrame(); finish(); } });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  new ResizeObserver(layout).observe(title);
}

if (typeof module !== 'undefined' && module.exports) module.exports = { buildWritingTimeline, sampleWritingTimeline };
