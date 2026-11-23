// Add real destinations here. A missing URL stays readable, without a dead link.
const content = {
  projects: [
    { name: 'customermemory.dev', mark: 'cm', url: 'https://customermemory.dev', color: '#edf0e9' },
    { name: 'Temba', mark: 't', url: null, color: '#f0e9e4', status: 'No public link' },
    { name: 'Mutual', mark: 'm', url: 'https://somilagg123.github.io/mutual/', color: '#e8eaf3' },
    { name: 'Agcess', mark: 'a', url: 'https://somilagg123.github.io/agcess/', color: '#e8eee3' },
    { name: 'Horlo', mark: '◷', url: 'https://somilagg123.github.io/horlo/', color: '#eeece6' },
  ],
  articles: readingArticles,
  harness: 'https://github.com/SomilAgg123/agent-shape',
  games: [
    { name: 'frenchpoker', mark: '♧', url: 'https://frenchpoker.onrender.com', action: 'Play French Poker' },
    { name: 'forhappyhour', mark: '✷', url: 'https://forhappyhour.com', action: 'Explore Happy Hour' },
  ],
  writing: [
    { name: 'X', mark: '𝕏', url: 'https://x.com/Somil_Agg' },
    { name: 'Substack', mark: '≡', url: 'https://foundaition.substack.com' },
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

function renderList(id, items) {
  const list = document.getElementById(id);
  items.forEach(item => {
    const li = document.createElement('li');
    const row = item.url ? externalLink(item.url) : document.createElement('div');
    row.className = 'item-row';
    const main = label('item-main', '');
    if (item.mark) {
      const mark = label('item-monogram', item.mark);
      mark.setAttribute('aria-hidden', 'true');
      if (item.color) mark.style.setProperty('--tile', item.color);
      main.append(mark);
    }
    main.append(label('item-name', item.name));
    row.append(main, label(item.url ? 'visit-label' : 'pending-label', item.url ? (item.source || 'Visit site') : (item.status || 'Link coming soon')));
    if (item.url) row.setAttribute('aria-label', `${item.name} (opens in a new tab)`);
    li.append(row);
    list.append(li);
  });
}

renderList('project-links', content.projects);
renderList('writing-links', content.writing);

if (content.articles.length) {
  document.getElementById('article-links').hidden = false;
  renderList('article-links', content.articles.slice(0, 5));
  if (content.articles.length > 5) {
    document.getElementById('more-reading').hidden = false;
    document.getElementById('more-reading-label').textContent = `Show ${content.articles.length - 5} more`;
    renderList('more-article-links', content.articles.slice(5));
  }
}

if (content.harness) {
  const link = externalLink(content.harness);
  link.className = 'visit-label';
  link.textContent = 'Explore the harness';
  document.getElementById('harness-link').replaceWith(link);
}

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
  section.style.setProperty('--player-color', player.style.getPropertyValue('--player-color'));
  const blob = document.createElement('span');
  blob.className = 'section-blob';
  blob.setAttribute('aria-hidden', 'true');
  blob.append(player.querySelector('svg').cloneNode(true));
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
// Open the chooser on arrival. Explicit content URLs and section links skip it.
const requestedView = new URLSearchParams(location.search).get('view');
if (requestedView === 'players' || (requestedView !== 'content' && !location.hash)) openPlayers();
