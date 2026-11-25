// Add real destinations here. A missing URL stays readable, without a dead link.
const content = {
  currentProjects: [
    { statement: 'Better context management for AI agents', name: 'CustomerMemory', url: 'https://customermemory.dev' },
    { statement: 'Existing APIs, turned into approved MCP tools', name: 'agentifyapi', github: 'https://github.com/SomilAgg123/agentifyapi' },
    { statement: 'A guide to choosing the right model for each task and budget', name: 'Jagged', github: 'https://github.com/SomilAgg123/jagged' },
    { statement: 'A new chapter for local newspaper owners', name: 'Sell My Newspaper', url: 'https://www.sellmynewspaper.com/' },
  ],
  pastProjects: [
    { statement: 'A dating app for friends to set their friends up', name: 'Mutual', url: 'https://somilagg123.github.io/mutual/', github: 'https://github.com/SomilAgg123/mutual' },
    { statement: 'A data tracking tool for farmers in the field', name: 'Agcess', url: 'https://somilagg123.github.io/agcess/', github: 'https://github.com/SomilAgg123/agcess' },
    { statement: 'A social platform for watch collectors', name: 'Horlo', url: 'https://somilagg123.github.io/horlo/', github: 'https://github.com/SomilAgg123/horlo' },
  ],
  articles: readingArticles,
  games: [
    { id: 'happyhour', name: 'For Happy Hour', category: 'party', title: 'Custom games that bring people together', mark: '✷', description: 'Made for a good night with friends.', url: 'https://forhappyhour.com', action: 'Explore Happy Hour', cover: { theme: 'party', title: ['FOR', 'HAPPY', 'HOUR'], kicker: 'Party games', caption: 'Made for your people' } },
    { id: 'french', name: 'French Poker', category: 'poker', title: 'French Poker', bridge: 'Like…', mark: '♧', description: 'A new variation of poker.', url: 'https://frenchpoker.onrender.com', action: 'Play French Poker', cover: { theme: 'french', title: ['FRENCH', 'POKER'], kicker: 'A different deal', caption: 'A new variation of poker' } },
    { id: 'flux', name: 'Flux Poker', category: 'poker', description: 'Build ten poker hands on a grid, with two swaps and an AI rival.', url: 'https://somilaggarwal.com/poker-muse/', action: 'Play Flux Poker', cover: { theme: 'flux', title: ['FLUX', 'POKER'], kicker: 'Every card counts', caption: '25 cards · 10 hands' } },
    { id: 'river', name: 'River Market', category: 'poker', description: 'Draft three poker hands from a shared, face-up card market.', url: 'https://somilaggarwal.com/poker-instinct/', action: 'Play River Market', cover: { theme: 'river', title: ['RIVER', 'MARKET'], kicker: 'Make your pick', caption: 'One shared market' } },
    { id: 'dots', name: 'Poker Dots', category: 'poker', projectOnly: true, description: 'A poker puzzle where every card belongs to two hands.', url: 'https://github.com/SomilAgg123/poker-dots', action: 'View project', cover: { theme: 'dots', title: ['POKER', 'DOTS'], kicker: 'Find the connection', caption: 'Every card. Two possibilities.' } },
    { id: 'tell', name: 'Tell Hold’em', category: 'poker', description: 'A twist on Hold’em where everyone must reveal one card.', url: 'https://somilaggarwal.com/poker-grok-bot/', action: 'Play Tell Hold’em', cover: { theme: 'tell', title: ['TELL', 'HOLD’EM'], kicker: 'Show just enough', caption: 'One card. Out in the open.' } },
  ],
  writing: [
    { name: 'the bar gets higher', publication: 'X', url: 'https://x.com/Somil_Agg/status/2120989847082979722' },
    { name: 'winning games with agents', publication: 'X', url: 'https://x.com/Somil_Agg/status/2115888000605343911' },
    { name: 'The Right to Remember', publication: 'foundAItion · Substack', url: 'https://foundaition.substack.com/p/the-right-to-remember' },
    { name: 'The Gordian Knot of AI Control', publication: 'foundAItion · Substack', url: 'https://foundaition.substack.com/p/the-gordian-knot-of-ai-control' },
    { name: 'Why the Real GenAI Risk Is What Happens After You Deploy', publication: 'foundAItion · Substack', url: 'https://foundaition.substack.com/p/why-the-real-genai-risk-is-what-happens' },
    { name: 'What Is an Eval?', publication: 'foundAItion · Substack', url: 'https://foundaition.substack.com/p/what-is-an-eval' },
    { name: 'Observations', publication: 'foundAItion · Substack', url: 'https://foundaition.substack.com/p/observations' },
  ],
  investingThesis: [
    { name: 'Corridor', note: 'Acquired by Cognition', noteUrl: 'https://cognition.com/blog/corridor-joining-cognition', url: 'https://www.corridor.dev/' },
    { name: 'Pangram Labs', url: 'https://www.pangram.com/' },
    { name: 'Lucid Computing', url: 'https://lucidcomputing.ai/' },
  ],
  aiInsurance: [
    { name: 'AIUC', url: 'https://www.aiuc.com/' },
    { name: 'Testudo', url: 'https://www.testudo.co/' },
    { name: 'Armilla AI', url: 'https://www.armilla.ai/' },
  ],
  elementalInvestments: [
    { name: 'Symbium', url: 'https://symbium.com/' },
    { name: 'Cambium', url: 'https://www.cambium.com/' },
    { name: 'Gradient', url: 'https://gradientcomfort.com/' },
  ],
  // Roles, dates, and highlights supplied by Somil from LinkedIn, November 2026.
  experience: [
    {
      company: 'Decagon',
      title: 'Agent Hillclimbing',
      dates: 'Oct 2025 – Present',
      highlights: [
        'Hillclimbing large enterprise deployments.',
        'Autopilot.',
        'Co-founded the agent deployment engineering (ADE) team.',
      ],
    },
    {
      company: 'Schmidt Futures',
      title: 'Fellow – Product Manager',
      dates: 'Sep 2023 – Oct 2025',
      summary: 'A two-year rotational program run by Eric Schmidt, modeled after Google’s Associate Product Manager program, to build cool things with high impact.',
      highlights: [
        'Ran AI security investments in the Office of Eric Schmidt.',
        'Built and ran a technology program to study the frontier of multi-agent failures at Schmidt Sciences.',
        'Designed and delivered the 0-to-1 on an internal IP dashboard for the Schmidt Hub for IP.',
        'Invested in climate tech solutions at Elemental Impact.',
        'Led product strategy at SparkCharge.',
      ],
    },
    {
      company: 'CleanTechies',
      title: 'Show Co-Host',
      dates: 'Jul 2023 – Sep 2025',
      summary: 'An excuse to talk to the best climate tech founders and investors about what they do best.',
    },
    {
      company: 'Armory Square Ventures',
      title: 'Investor',
      dates: 'Mar 2023 – Sep 2023',
      summary: 'Sourced 60%+ of the fund’s dealflow and developed its AI investing strategy. Learned everything I know about how to invest in venture for the right reasons.',
      investments: [
        { name: 'Machinery Partner', stage: 'Series A', url: 'https://www.machinerypartner.com/' },
        { name: 'Multiplayer', stage: 'Seed', url: 'https://www.multiplayer.app/' },
        { name: 'Heretto', stage: 'Series B', url: 'https://www.heretto.com/' },
      ],
    },
    {
      company: 'Agcess',
      title: 'Founder & CEO',
      dates: 'Feb 2022 – Jan 2023',
      summary: 'Founded a data management tool to deliver agricultural insights to high cash-value farmers, including vineyards and orchards.',
      highlights: [
        'Sold the tool to three agricultural conglomerates and realized it wasn’t the right go-to-market approach for me.',
        'Moved on after college graduation to take a venture investing role.',
      ],
    },
    {
      company: 'PayPal',
      title: 'Software Engineer · Internship',
      dates: 'May 2021 – Aug 2021',
    },
  ],
};

function externalLink(url) {
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  return link;
}

function label(className, value) {
  const element = document.createElement('span');
  element.className = className;
  element.textContent = value;
  return element;
}

function appendDestinationLinks(parent, item) {
  const links = document.createElement('div');
  links.className = 'row-links';
  [['Website', item.url], ['GitHub', item.github]].forEach(([title, url]) => {
    if (!url) return;
    const link = externalLink(url);
    link.className = 'destination-link';
    link.textContent = title;
    link.setAttribute('aria-label', `${item.name} ${title} (opens in a new tab)`);
    links.append(link);
  });
  if (links.childElementCount) parent.append(links);
}

function renderProjects(id, projects) {
  const list = document.getElementById(id);
  projects.forEach(project => {
    const row = document.createElement('li');
    row.className = 'project-row';
    const copy = document.createElement('div');
    copy.className = 'row-copy';
    copy.append(label('story-statement', project.statement), label('story-source', project.name));
    row.append(copy);
    appendDestinationLinks(row, project);
    list.append(row);
  });
}

renderProjects('current-projects', content.currentProjects);
renderProjects('past-projects', content.pastProjects);
renderBooks('writing-links', content.writing, 2);

function renderBooks(id, articles, previewCount = Infinity) {
  const list = document.getElementById(id);
  list.replaceChildren();
  articles.forEach((article, index) => {
    const li = document.createElement('li');
    if (index >= previewCount) li.dataset.detailOnly = '';
    const card = externalLink(article.url);
    card.className = 'book-card';
    card.setAttribute('aria-label', `${article.name} (opens in a new tab)`);
    const title = label('book-title', article.name);
    card.append(title, label('book-author', article.detail || article.publication));
    if (id === 'writing-links') attachWritingInk(card, title, article.name);
    if (id === 'article-links' && article.favorite) {
      card.classList.add('is-favorite');
      card.append(label('catalogue-favorite', 'Favorite'));
    }
    li.append(card);
    list.append(li);
  });
}

const favoriteArticles = content.articles.filter(article => article.favorite);
document.getElementById('other-reading').hidden = false;
document.getElementById('other-reading-count').textContent = content.articles.length;
renderBooks('article-links', content.articles);

function renderPaperStack() {
  const stack = document.getElementById('favorite-paper-stack');
  const stage = document.getElementById('favorite-reading');
  const sheets = document.getElementById('paper-sheets');
  const edges = document.getElementById('paper-edges');
  const position = document.getElementById('paper-position');
  const status = document.getElementById('paper-status');
  const offsets = [-1, 1, -1.5, .5, 1.5, -1, .5, 0];
  const choices = [];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let selected = 0;
  let motion;
  let lastActive = -1;
  let lastRequested = -1;
  let lastPhase;
  let lastCleared;
  let geometry;
  let renderedState;
  let nativeAnimations = [];
  let resetTimer;
  let hoverTimer;
  let hoverIndex = -1;
  let lastPointer;

  function clearHover() {
    clearTimeout(hoverTimer);
    hoverIndex = -1;
  }

  function renderMotion(state) {
    const phaseChanged = lastPhase !== state.phase;
    // The native fall already includes contact and its small landing recovery.
    const continuingFall = lastPhase === 'falling' && state.phase === 'landing';
    const activeChanged = lastActive !== state.active;
    const reducedLayoutChanged = reducedMotion.matches && renderedState?.settle !== state.settle;
    renderedState = state;
    const cleared = state.pull === 1 && state.active > 0;
    if (lastCleared !== cleared) {
      stack.classList.toggle('is-cleared', cleared);
      lastCleared = cleared;
    }
    if (lastPhase !== state.phase) {
      stack.dataset.motion = state.phase;
      lastPhase = state.phase;
    }
    if (lastActive !== state.active) {
      stack.classList.toggle('is-browsing', state.active > 0);
      stack.dataset.extracted = state.active;
      choices.forEach(({ sheet, edge, link }, i) => {
        const active = i === state.active;
        const exposed = i === 0;
        const pulled = active && state.active > 0;
        sheet.classList.toggle('is-selected', active);
        sheet.classList.toggle('is-exposed', exposed);
        sheet.classList.toggle('is-pulled', pulled);
        edge.classList.toggle('is-pulled', pulled);
        sheet.classList.toggle('is-above-gap', i < state.active);
        edge.classList.toggle('is-above-gap', i < state.active);
        sheet.setAttribute('aria-hidden', String(!active && !exposed));
        sheet.inert = !active && !exposed;
        link.tabIndex = active || exposed ? 0 : -1;
      });
      lastActive = state.active;
    }
    if (lastRequested !== state.requested) {
      choices.forEach(({ edge }, i) => edge.setAttribute('aria-pressed', String(i === state.requested)));
      position.textContent = `${state.requested + 1} / ${choices.length}`;
      lastRequested = state.requested;
    }
    if (geometry && ((phaseChanged && !continuingFall) || activeChanged || reducedLayoutChanged)) {
      animatePhase(state, { reset: activeChanged });
    }
  }

  function transforms(index, pull, settle) {
    const x = index === renderedState.active ? geometry.pull * pull : 0;
    const y = index < renderedState.active ? geometry.step * settle : 0;
    return {
      sheet: `translate3d(${offsets[index % offsets.length] + x}px, ${index * geometry.step + y}px, 0)`,
      edge: `translate3d(${x}px, ${y}px, 0) matrix(${geometry.c}, ${geometry.d}, 0, 1, 0, 0)`,
    };
  }

  function applyPose(pull, settle) {
    choices.forEach(({ sheet, edge }, index) => {
      const pose = transforms(index, pull, settle);
      sheet.style.transform = pose.sheet;
      edge.style.transform = pose.edge;
    });
  }

  function capturePose() {
    if (!geometry || !renderedState.active) return { pull: 0, settle: 0 };
    const extracted = new DOMMatrixReadOnly(getComputedStyle(choices[renderedState.active].sheet).transform);
    const top = new DOMMatrixReadOnly(getComputedStyle(choices[0].sheet).transform);
    return {
      pull: Math.max(0, Math.min(1, (extracted.m41 - offsets[renderedState.active % offsets.length]) / geometry.pull)),
      settle: Math.max(0, Math.min(1, top.m42 / geometry.step)),
    };
  }

  function cancelAnimations() {
    nativeAnimations.forEach(animation => animation.cancel());
    nativeAnimations = [];
  }

  function animatePhase(state, { reset = false, pose = null } = {}) {
    // Read the visible pose before canceling. Retargeting never snaps to a stored frame.
    const start = pose || (reset ? { pull: 0, settle: 0 } : capturePose());
    cancelAnimations();
    if (reducedMotion.matches || state.phase === 'rest' || state.phase === 'open') {
      applyPose(state.active ? 1 : 0, state.phase === 'open' ? 1 : 0);
      return;
    }
    applyPose(start.pull, start.settle);
    const startTime = document.timeline.currentTime;
    function animate(element, keyframes, duration, easing = 'linear') {
      if (!duration) return;
      const animation = element.animate(keyframes, { duration, easing, fill: 'forwards' });
      animation.startTime = startTime;
      nativeAnimations.push(animation);
    }
    if (state.phase === 'pulling') {
      const choice = choices[state.active];
      const from = transforms(state.active, start.pull, 0);
      const to = transforms(state.active, 1, 0);
      const remaining = PAPER_PULL_DURATION * Math.cbrt(1 - start.pull);
      for (const part of ['sheet', 'edge']) {
        animate(choice[part], [{ transform: from[part] }, { transform: to[part] }], remaining,
          'cubic-bezier(0.333333, 1, 0.666667, 1)');
      }
    } else {
      const plan = paperVerticalKeyframes(start.settle, state.velocity, state.phase);
      choices.slice(0, state.active).forEach((choice, index) => {
        for (const part of ['sheet', 'edge']) {
          animate(choice[part], plan.values.map((value, frame) => ({
            transform: transforms(index, start.pull, value)[part],
            offset: plan.offsets[frame],
          })), plan.duration);
        }
      });
    }
  }

  function select(index, { pull = true, announce = false } = {}) {
    clearTimeout(resetTimer);
    clearHover();
    selected = pull ? index : 0;
    motion.select(selected);
    if (announce) status.textContent = `${favoriteArticles[selected].name}, favorite ${selected + 1} of ${choices.length}`;
  }

  favoriteArticles.forEach((article, index) => {
    const sheet = document.createElement('div');
    sheet.className = 'paper-sheet';
    sheet.id = `favorite-paper-${index}`;
    sheet.style.setProperty('--paper-index', index);
    sheet.style.setProperty('--paper-offset', `${offsets[index % offsets.length]}px`);
    sheet.style.setProperty('--paper-depth', favoriteArticles.length - index);
    const face = document.createElement('div');
    face.className = 'paper-face';
    const link = externalLink(article.url);
    link.className = 'paper-content';
    link.setAttribute('aria-label', `${article.name} — ${article.source.toLowerCase()} (opens in a new tab)`);
    const heading = label('paper-title', article.name);
    const metadata = document.createElement('span');
    metadata.className = 'paper-metadata';
    metadata.append(label('paper-byline', article.detail));
    if (article.publishedDate) {
      const date = document.createElement('time');
      date.className = 'paper-date';
      date.dateTime = article.publishedDate;
      const monthOnly = article.publishedDate.length === 7;
      date.textContent = new Intl.DateTimeFormat('en-US', {
        month: 'short', year: 'numeric', timeZone: 'UTC',
        ...(monthOnly ? {} : { day: 'numeric' }),
      }).format(new Date(`${article.publishedDate}${monthOnly ? '-01' : ''}T00:00:00Z`));
      metadata.append(date);
    }
    const footer = document.createElement('span');
    footer.className = 'paper-footer';
    footer.append(label('paper-action', article.source));
    link.append(heading, metadata, footer);
    face.append(link);
    // The face, rim, and matching pointer target share the same displacement.
    const rim = document.createElement('span');
    rim.className = 'paper-rim';
    rim.setAttribute('aria-hidden', 'true');
    rim.append(label('paper-edge-title', article.name));
    const end = document.createElement('span');
    end.className = 'paper-end';
    end.setAttribute('aria-hidden', 'true');
    sheet.append(face, end, rim);
    sheets.append(sheet);

    // One button covers both visible edges; its end target shares the same motion.
    const edge = document.createElement('button');
    edge.type = 'button';
    edge.className = 'paper-edge';
    edge.style.setProperty('--paper-index', index);
    edge.style.setProperty('--paper-offset', `${offsets[index % offsets.length]}px`);
    edge.setAttribute('aria-controls', sheet.id);
    edge.setAttribute('aria-label', `Preview ${article.name}`);
    const endTarget = document.createElement('span');
    endTarget.className = 'paper-end-target';
    endTarget.setAttribute('aria-hidden', 'true');
    edge.append(endTarget);
    edge.addEventListener('focus', () => select(index));
    edge.addEventListener('click', () => select(index, { announce: true }));
    edge.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % choices.length;
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + choices.length) % choices.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = choices.length - 1;
      if (event.key === 'Enter') {
        event.preventDefault();
        choices[index].link.click();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        select(0, { pull: false });
      } else if (next !== undefined) {
        event.preventDefault();
        choices[next].edge.focus({ preventScroll: true });
      }
    });
    edges.append(edge);
    choices.push({ sheet, edge, link });
  });

  motion = createPaperStackMotion({ count: choices.length, onChange: renderMotion, reducedMotion: reducedMotion.matches });
  reducedMotion.addEventListener('change', event => motion.setReducedMotion(event.matches));
  document.getElementById('previous-paper').addEventListener('click', () => select((selected - 1 + choices.length) % choices.length, { announce: true }));
  document.getElementById('next-paper').addEventListener('click', () => select((selected + 1) % choices.length, { announce: true }));
  stage.addEventListener('pointerenter', () => clearTimeout(resetTimer));
  stage.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    if (lastPointer?.x === event.clientX && lastPointer?.y === event.clientY) return;
    lastPointer = { x: event.clientX, y: event.clientY };
    const target = event.target.closest('.paper-edge');
    const index = choices.findIndex(({ edge }) => edge === target);
    if (index < 0 || index === selected) return clearHover();
    if (index === hoverIndex) return;
    clearHover();
    hoverIndex = index;
    hoverTimer = setTimeout(() => select(index), 65);
  });
  stage.addEventListener('pointerleave', event => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    clearHover();
    lastPointer = null;
    if (stage.querySelector(':focus-visible')) return;
    resetTimer = setTimeout(() => select(0, { pull: false }), 280);
  });

  function layout() {
    const width = stack.clientWidth;
    if (!width) return;
    const savedPose = geometry ? capturePose() : { pull: 0, settle: 0 };
    const compact = width < 700;
    const narrow = width < 420;
    const paperHeight = narrow ? 340 : 360;
    // View the long left spine from the top-left, with the page receding to the right.
    const a = narrow ? .8 : .84;
    const b = narrow ? -.2 : -.28;
    const c = narrow ? .3 : .55;
    const d = narrow ? .78 : .62;
    const step = narrow ? 36 : compact ? 26 : 24;
    // Preserve readable letter shapes along the projected spine. The paper rim
    // retains its perspective, while its label compensates for the shear.
    const spineScale = Math.hypot(c, d);
    const labelHeightScale = narrow ? .8 : 1;
    const labelTransform = `matrix(${1 / spineScale}, 0, ${-d * labelHeightScale / (c * spineScale)}, ${spineScale * labelHeightScale / c}, 0, 0)`;
    const depth = step * (choices.length - 1);
    const slope = c / d;
    const clearance = 20;
    const compactPull = narrow ? 16 : 40;
    const fittedWidth = compact
      ? (width - 32 - c * paperHeight - compactPull) / a
      : (width - 32 - c * paperHeight - slope * depth - clearance) / (2 * a - slope * b);
    const paperWidth = Math.min(narrow ? 250 : 300, fittedWidth);
    const projectedWidth = a * paperWidth + c * paperHeight;
    const pull = compact ? compactPull : (a - slope * b) * paperWidth + slope * depth + clearance;
    const left = (width - projectedWidth - pull) / 2;
    const top = -b * paperWidth;
    const projectedHeight = top + d * paperHeight;
    geometry = { pull, step, c, d };
    stack.classList.toggle('is-compact', compact);
    stack.classList.toggle('is-narrow', narrow);
    const vars = {
      '--page-width': `${paperWidth}px`, '--page-height': `${paperHeight}px`,
      '--pile-left': `${left}px`, '--pile-top': `${top}px`, '--paper-pull': `${pull}px`,
      '--pile-step': `${step}px`, '--paper-width-scale': a, '--paper-tilt': b,
      '--paper-skew': c, '--paper-flatten': d,
      '--edge-left': `${left}px`, '--edge-top': `${top}px`, '--edge-height': `${step}px`,
      '--spine-label-width': `${paperHeight * spineScale - 24}px`, '--spine-label-transform': labelTransform,
      '--face-end-left': `${c * paperHeight}px`, '--face-end-top': `${d * paperHeight}px`,
      // Undo the button's spine projection, then project its child along the short edge.
      '--end-target-scale': a / c, '--end-target-tilt': b - d * a / c,
      '--shadow-width': `${projectedWidth + 24}px`,
      '--scene-height': `${projectedHeight + step * choices.length + 16}px`,
      '--paper-title-size': `${narrow ? 22 : paperWidth < 250 ? 24 : 27}px`,
    };
    Object.entries(vars).forEach(([key, value]) => stack.style.setProperty(key, value));
    if (renderedState) animatePhase(renderedState, { pose: savedPose });
  }
  new ResizeObserver(layout).observe(stack);
  window.addEventListener('resize', layout, { passive: true });
  select(0, { pull: false });
  layout();
}
renderPaperStack();

document.getElementById('browse-reading').addEventListener('click', () => {
  const catalogue = document.getElementById('other-reading');
  document.getElementById('other-reading-title').focus({ preventScroll: true });
  catalogue.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
});

const readingCategories = ['All', 'Agents', 'Knowledge factories', 'Engineering', 'Game design', 'Business'];
const readingFilters = document.getElementById('reading-filters');
readingCategories.forEach(category => {
  const button = document.createElement('button');
  button.type = 'button';
  button.dataset.readingCategory = category;
  button.setAttribute('aria-controls', 'article-links');
  button.setAttribute('aria-pressed', String(category === 'All'));
  const count = category === 'All' ? content.articles.length : content.articles.filter(article => article.category === category).length;
  button.append(document.createTextNode(category), label('filter-count', count));
  button.addEventListener('click', () => {
    const filtered = category === 'All' ? content.articles : content.articles.filter(article => article.category === category);
    [...readingFilters.children].forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    document.getElementById('other-reading-count').textContent = filtered.length;
    renderBooks('article-links', filtered);
    document.getElementById('reading-status').textContent = `${filtered.length} ${filtered.length === 1 ? 'item' : 'items'}${category === 'All' ? '' : ` in ${category}`}`;
  });
  readingFilters.append(button);
});

function appendInvestments(parent, investments) {
  const heading = document.createElement('h4');
  heading.className = 'investment-list-heading';
  heading.textContent = 'Investments I led or supported';
  const list = document.createElement('ul');
  list.className = 'investment-list';
  investments.forEach(investment => {
    const item = document.createElement('li');
    const copy = document.createElement('div');
    copy.className = 'row-copy';
    copy.append(label('investment-name', investment.name), label('investment-stage', investment.stage));
    item.append(copy);
    appendDestinationLinks(item, investment);
    list.append(item);
  });
  parent.append(heading, list);
}

function renderExperience() {
  if (!content.experience.length) return;
  const currentJob = content.experience[0];
  const preview = document.getElementById('work-preview');
  const company = document.createElement('h3');
  company.textContent = currentJob.company;
  preview.append(company, label('work-preview-title', currentJob.title), label('experience-dates', currentJob.dates));
  if (currentJob.highlights?.length) {
    const highlights = document.createElement('ul');
    currentJob.highlights.forEach(highlight => {
      const item = document.createElement('li');
      item.textContent = highlight;
      highlights.append(item);
    });
    preview.append(highlights);
  }
  document.getElementById('experience-layout').hidden = false;
  document.getElementById('experience-link').hidden = true;
  const tabs = document.getElementById('experience-tabs');
  const panels = document.getElementById('experience-panels');
  content.experience.forEach((job, index) => {
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.id = `job-tab-${index}`;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', `job-panel-${index}`);
    tab.textContent = job.company;
    const panel = document.createElement('div');
    panel.className = 'experience-panel';
    panel.id = `job-panel-${index}`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    panel.tabIndex = 0;
    const title = document.createElement('h3');
    title.textContent = job.title;
    panel.append(title, label('experience-dates', job.dates));
    if (job.summary) {
      const description = document.createElement('p');
      description.textContent = job.summary;
      panel.append(description);
    }
    if (job.highlights?.length) {
      const list = document.createElement('ul');
      job.highlights.forEach(text => {
        const li = document.createElement('li');
        li.textContent = text;
        list.append(li);
      });
      panel.append(list);
    }
    if (job.investments) appendInvestments(panel, job.investments);
    tabs.append(tab);
    panels.append(panel);
    tab.addEventListener('click', () => selectJob(index));
  });
  function selectJob(index, focus = false) {
    [...tabs.children].forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels.children[i].hidden = i !== index;
    });
    if (focus) tabs.children[index].focus();
  }
  tabs.addEventListener('keydown', event => {
    const index = [...tabs.children].indexOf(event.target);
    if (index < 0) return;
    let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.children.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + tabs.children.length) % tabs.children.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.children.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectJob(next, true);
    }
  });
  const mobileTabs = matchMedia('(max-width: 760px)');
  function updateOrientation() {
    tabs.setAttribute('aria-orientation', mobileTabs.matches ? 'horizontal' : 'vertical');
  }
  mobileTabs.addEventListener('change', updateOrientation);
  updateOrientation();
  selectJob(0);
}
renderExperience();

function renderInvesting() {
  [['thesis-companies', content.investingThesis], ['elemental-companies', content.elementalInvestments]].forEach(([id, companies]) => {
    const list = document.getElementById(id);
    companies.forEach(company => {
      const item = document.createElement('li');
      const copy = document.createElement('div');
      copy.className = 'row-copy';
      copy.append(label('thesis-company-name', company.name));
      if (company.note) {
        const note = company.noteUrl ? externalLink(company.noteUrl) : document.createElement('span');
        note.className = 'thesis-company-note';
        note.textContent = company.note;
        if (company.noteUrl) note.setAttribute('aria-label', `${company.name}: ${company.note} (opens in a new tab)`);
        copy.append(note);
      }
      item.append(copy);
      appendDestinationLinks(item, company);
      list.append(item);
    });
  });
  const insurance = document.createElement('li');
  insurance.className = 'insurance-row';
  const insuranceCopy = label('thesis-company-name', 'Insurance for AI (');
  content.aiInsurance.forEach((company, index) => {
    if (index) insuranceCopy.append(', ');
    const link = externalLink(company.url);
    link.className = 'inline-company-link';
    link.textContent = company.name;
    link.setAttribute('aria-label', `${company.name} website (opens in a new tab)`);
    insuranceCopy.append(link);
  });
  insuranceCopy.append(')');
  insurance.append(insuranceCopy);
  document.getElementById('thesis-companies').append(insurance);
  const armory = content.experience.find(job => job.company === 'Armory Square Ventures');
  if (armory?.investments) appendInvestments(document.getElementById('armory-investments'), armory.investments);
}
renderInvesting();

// Reuse the collection's covers for a two-game overview preview.
content.games.slice(0, 2).forEach(game => {
  const li = document.createElement('li');
  const tile = externalLink(game.url);
  tile.className = 'game-choice';
  tile.setAttribute('aria-label', `${game.action} (opens in a new tab)`);
  tile.append(gameCover(game), label('shelf-title', game.name), label('shelf-kind', game.category === 'party' ? 'Party games' : 'Poker'));
  li.append(tile);
  document.getElementById('game-links').append(li);
});

function gameCover(game) {
  const cover = label(`game-cover cover-${game.cover.theme}`, '');
  cover.setAttribute('aria-hidden', 'true');
  const title = label('cover-title', '');
  game.cover.title.forEach(line => title.append(label('cover-title-line', line)));
  const art = label(`cover-art art-${game.id}`, '');
  if (game.id === 'happyhour') art.textContent = '✷';
  if (game.id === 'french') ['♠', '♧', '♥'].forEach(suit => art.append(label('playing-card', suit)));
  if (game.id === 'flux') Array.from({ length: 25 }, () => art.append(document.createElement('span')));
  if (game.id === 'river') ['♠', '♥', '♣', '♦'].forEach(suit => art.append(label('', suit)));
  if (game.id === 'tell') ['✦', 'A♥'].forEach(suit => art.append(label('playing-card', suit)));
  cover.append(label('cover-type', game.cover.kicker), title, art, label('cover-bottom', game.cover.caption));
  return cover;
}

function renderGameCollection() {
  const root = document.getElementById('game-collection');
  const shelf = document.getElementById('game-shelf');
  const filters = document.getElementById('game-filters');
  const search = document.getElementById('game-search');
  const detail = document.getElementById('game-detail');
  const detailTitle = document.getElementById('game-detail-title');
  const empty = document.getElementById('game-empty');
  const status = document.getElementById('game-status');
  const categoryNames = { all: 'All games', poker: 'Poker', party: 'Party games' };
  const state = { selected: 'french', category: 'all', query: '' };
  const choices = new Map();

  content.games.forEach(game => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'game-choice';
    button.dataset.game = game.id;
    button.setAttribute('aria-label', `Select ${game.name}`);
    button.setAttribute('aria-controls', detail.id);
    button.append(gameCover(game), label('shelf-title', game.name), label('shelf-kind', `${categoryNames[game.category]}${game.projectOnly ? ' · Project' : ''}`));
    button.addEventListener('click', () => {
      state.selected = game.id;
      update(true);
      // On small screens the details sit below the shelf, outside the viewport.
      if (root.getBoundingClientRect().width <= 560) {
        detailTitle.focus({ preventScroll: true });
        detail.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      }
    });
    choices.set(game.id, { item, button });
    item.append(button);
    shelf.append(item);
  });

  Object.entries(categoryNames).forEach(([category, name]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.category = category;
    button.setAttribute('aria-controls', shelf.id);
    const count = content.games.filter(game => category === 'all' || category === game.category).length;
    button.append(document.createTextNode(name), label('game-filter-count', String(count)));
    button.addEventListener('click', () => {
      state.category = category;
      update(true);
    });
    filters.append(button);
  });

  function update(announce = false) {
    const query = state.query.trim().toLocaleLowerCase();
    const matching = content.games.filter(game =>
      (state.category === 'all' || game.category === state.category) &&
      `${game.name} ${game.description} ${categoryNames[game.category]}`.toLocaleLowerCase().includes(query)
    );
    if (matching.length && !matching.some(game => game.id === state.selected)) state.selected = matching[0].id;
    const visible = new Set(matching.map(game => game.id));
    choices.forEach(({ item, button }, id) => {
      item.hidden = !visible.has(id);
      button.setAttribute('aria-pressed', String(id === state.selected));
    });
    [...filters.children].forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === state.category)));
    empty.hidden = matching.length > 0;
    detail.hidden = matching.length === 0;
    const game = content.games.find(game => game.id === state.selected);
    document.getElementById('game-detail-art').replaceChildren(gameCover(game));
    detailTitle.textContent = game.name;
    document.getElementById('game-detail-description').textContent = game.id === 'happyhour' ? `${game.title}. ${game.description}` : game.description;
    document.getElementById('game-detail-kind').textContent = `${categoryNames[game.category]}${game.projectOnly ? ' · Public project' : game.category === 'poker' ? ' · Browser game' : ''}`;
    const link = document.getElementById('game-play-link');
    link.href = game.url;
    link.textContent = game.action;
    link.setAttribute('aria-label', `${game.action}${game.projectOnly ? ': ' + game.name : ''} (opens in a new tab)`);
    if (announce) status.textContent = matching.length ? `${matching.length} ${matching.length === 1 ? 'game' : 'games'}. ${game.name} selected.` : 'No games found. Try another search or clear the filters.';
  }

  search.addEventListener('input', () => {
    state.query = search.value;
    update(true);
  });
  document.getElementById('game-clear-filters').addEventListener('click', () => {
    state.category = 'all';
    state.query = '';
    search.value = '';
    update(true);
    search.focus();
  });
  document.getElementById('game-back-to-shelf').addEventListener('click', () => {
    choices.get(state.selected).button.focus({ preventScroll: true });
    shelf.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  });
  update();
}
renderGameCollection();

const dialog = document.getElementById('player-dialog');
const openButton = document.querySelector('[data-open-players]');
const sections = [...document.querySelectorAll('.content-section')];
const navLinks = [...document.querySelectorAll('.index-nav a')];
const allContentLink = document.querySelector('.back-to-index');
const sidebar = document.querySelector('.index-sidebar');
let activeSection;

// Reuse the chooser artwork so each section has the same icon and motion.
sections.forEach(section => {
  const player = document.querySelector(`.player-card[href="#${section.id}"]`);
  const playerIcon = player?.querySelector('.player-icon');
  const icon = playerIcon ? playerIcon.cloneNode(true) : document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  if (!playerIcon) {
    const symbol = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    symbol.setAttribute('href', '#icon-factory');
    icon.append(symbol);
  }
  section.style.setProperty('--player-color', player?.style.getPropertyValue('--player-color') || '#e8edf0');
  const blob = document.createElement('span');
  blob.className = playerIcon ? 'section-blob has-player-icon' : 'section-blob';
  blob.setAttribute('aria-hidden', 'true');
  blob.append(icon);
  section.querySelector('.section-heading').prepend(blob);
});

function openPlayers() {
  if (!dialog.open) dialog.showModal();
}

openButton.addEventListener('click', openPlayers);
document.querySelector('.close-player').addEventListener('click', () => dialog.close());
document.querySelector('.skip-player').addEventListener('click', () => {
  dialog.close();
  navigateTo(null, { replace: true });
});

dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  }
});

function sectionFromUrl() {
  // Keep old Software factory bookmarks useful after moving it into About.
  if (location.hash === '#factory') return 'about';
  return sections.find(section => `#${section.id}` === location.hash)?.id || null;
}

function showSection(id, { focus = false } = {}) {
  activeSection = id;
  const focused = Boolean(id);
  document.body.classList.toggle('section-view', focused);
  sidebar.hidden = focused;
  allContentLink.hidden = !focused;
  sections.forEach(section => {
    section.hidden = focused && section.id !== id;
  });
  navLinks.forEach(link => {
    if (link.hash === `#${id}`) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  const heading = id ? document.getElementById(`${id}-title`) : document.getElementById('main');
  document.title = focused ? `${heading.textContent} — Somil Aggarwal` : 'Somil Aggarwal';
  if (focus) {
    window.scrollTo({ top: 0, behavior: 'instant' });
    heading.focus({ preventScroll: true });
  }
}

function navigateTo(id, { replace = false } = {}) {
  const url = new URL(location.href);
  url.searchParams.delete('view');
  url.hash = id || '';
  if (!id) url.searchParams.set('view', 'content');
  if (url.href !== location.href) history[replace ? 'replaceState' : 'pushState'](null, '', url);
  showSection(id, { focus: true });
}

function isPlainClick(event) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

document.querySelectorAll('.player-card, .index-nav a, .section-link, [data-section-link]').forEach(link => {
  link.addEventListener('click', event => {
    if (!isPlainClick(event)) return;
    event.preventDefault();
    if (dialog.open) dialog.close();
    navigateTo(link.hash.slice(1));
  });
});

document.querySelectorAll('[data-all-content]').forEach(link => {
  link.addEventListener('click', event => {
    if (!isPlainClick(event)) return;
    event.preventDefault();
    navigateTo(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
});

document.querySelectorAll('.a11y-skip, [data-back-to-top]').forEach(link => {
  link.addEventListener('click', event => {
    if (!isPlainClick(event)) return;
    event.preventDefault();
    document.getElementById('main').focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  });
});

function restoreView() {
  if (dialog.open) dialog.close();
  const id = sectionFromUrl();
  if (id !== activeSection) showSection(id, { focus: true });
}
window.addEventListener('popstate', restoreView);
window.addEventListener('hashchange', restoreView);

showSection(sectionFromUrl());
// A direct section link opens at the page controls, rather than a native anchor offset.
if (sectionFromUrl()) {
  window.addEventListener('load', () => {
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  }, { once: true });
}
// Open the chooser on arrival. Explicit content URLs and section links skip it.
const requestedView = new URLSearchParams(location.search).get('view');
if (requestedView === 'players' || (requestedView !== 'content' && !location.hash)) openPlayers();
