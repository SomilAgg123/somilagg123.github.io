// Add real destinations here. A missing URL stays readable, without a dead link.
const content = {
  currentProjects: [
    { statement: '...better context management for AI agents', name: 'CustomerMemory', url: 'https://customermemory.dev' },
    { statement: '...a new variation of poker', name: 'French Poker', url: 'https://frenchpoker.onrender.com' },
  ],
  pastProjects: [
    { statement: '...a dating app for friends to set their friends up', name: 'Mutual', url: 'https://somilagg123.github.io/mutual/' },
    { statement: '...a data tracking tool for farmers in the field', name: 'Agcess', url: 'https://somilagg123.github.io/agcess/' },
    { statement: '...the social platform for watch collectors', name: 'Horlo', url: 'https://somilagg123.github.io/horlo/' },
  ],
  articles: readingArticles,
  harness: 'https://github.com/SomilAgg123/agent-shape',
  games: [
    { name: 'frenchpoker', mark: '♧', url: 'https://frenchpoker.onrender.com', action: 'Play French Poker' },
    { name: 'forhappyhour', mark: '✷', url: 'https://forhappyhour.com', action: 'Explore Happy Hour' },
  ],
  writing: [
    // Short editorial paraphrases, each grounded in the linked essay.
    { statement: '...that better memory makes for better AI agents', name: 'The Right to Remember', url: 'https://foundaition.substack.com/p/the-right-to-remember' },
    { statement: '...that AI safety is an engineering problem, too', name: 'The Gordian Knot of AI Control', url: 'https://foundaition.substack.com/p/the-gordian-knot-of-ai-control' },
    { statement: '...that AI oversight has to continue after deployment', name: 'Why the Real GenAI Risk Is What Happens After You Deploy', url: 'https://foundaition.substack.com/p/why-the-real-genai-risk-is-what-happens' },
    { statement: '...that evals should show us where systems break', name: 'What Is an Eval?', url: 'https://foundaition.substack.com/p/what-is-an-eval' },
    { statement: '...that reading is an act of creativity', name: 'Observations', url: 'https://foundaition.substack.com/p/observations' },
  ],
  experience: [],
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

function renderStoryList(id, items) {
  const list = document.getElementById(id);
  items.forEach(item => {
    const li = document.createElement('li');
    const row = item.url ? externalLink(item.url) : document.createElement('div');
    row.className = 'story-link';
    row.append(label('story-statement', item.statement), label('story-source', item.name));
    if (item.url) row.setAttribute('aria-label', `${item.statement} — ${item.name} (opens in a new tab)`);
    li.append(row);
    list.append(li);
  });
}

renderStoryList('current-projects', content.currentProjects);
renderStoryList('past-projects', content.pastProjects);
renderStoryList('writing-links', content.writing);

function renderBooks(id, articles) {
  const list = document.getElementById(id);
  articles.forEach(article => {
    const li = document.createElement('li');
    const card = externalLink(article.url);
    card.className = 'book-card';
    card.setAttribute('aria-label', `${article.name} (opens in a new tab)`);
    card.append(label('book-title', article.name), label('book-author', article.detail));
    li.append(card);
    list.append(li);
  });
}

if (content.articles.length) {
  document.getElementById('article-links').hidden = false;
  renderBooks('article-links', content.articles.slice(0, 6));
  if (content.articles.length > 6) {
    document.getElementById('more-reading').hidden = false;
    document.getElementById('more-reading-label').textContent = `Show ${content.articles.length - 6} more`;
    renderBooks('more-article-links', content.articles.slice(6));
  }
}

document.getElementById('harness-link').href = content.harness;

function renderExperience() {
  if (!content.experience.length) return;
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
  selectJob(0);
}
renderExperience();

content.games.forEach(game => {
  const li = document.createElement('li');
  const tile = game.url ? externalLink(game.url) : document.createElement('div');
  tile.className = 'game-tile';
  const mark = label('game-art', game.mark);
  mark.setAttribute('aria-hidden', 'true');
  tile.append(mark, label('game-name', game.name), label(game.url ? 'visit-label' : 'pending-label', game.url ? (game.action || 'Play the game') : 'Link coming soon'));
  if (game.url) tile.setAttribute('aria-label', `${game.name} (opens in a new tab)`);
  li.append(tile);
  document.getElementById('game-links').append(li);
});

const dialog = document.getElementById('player-dialog');
const openButton = document.querySelector('[data-open-players]');
const sections = [...document.querySelectorAll('.content-section')];
const navLinks = [...document.querySelectorAll('.index-nav a')];
const allContentLink = document.querySelector('.back-to-index');
const sidebar = document.querySelector('.index-sidebar');
let activeSection;

// Reuse each player's color and icon without duplicating the section's content.
sections.forEach(section => {
  const player = document.querySelector(`.player-card[href="#${section.id}"]`);
  const icon = player?.querySelector('svg') || document.querySelector(`.index-nav a[href="#${section.id}"] svg`);
  section.style.setProperty('--player-color', player?.style.getPropertyValue('--player-color') || '#e8edf0');
  const blob = document.createElement('span');
  blob.className = 'section-blob';
  blob.setAttribute('aria-hidden', 'true');
  blob.append(icon.cloneNode(true));
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

document.querySelectorAll('.player-card, .index-nav a, .section-link').forEach(link => {
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
