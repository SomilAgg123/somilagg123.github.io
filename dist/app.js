// Add real destinations here. A missing URL stays readable, without a dead link.
const content = {
  projects: [
    { name: 'customermemory.dev', mark: 'cm', url: 'https://customermemory.dev', color: '#edf0e9' },
    { name: 'Temba', mark: 't', url: null, color: '#f0e9e4', status: 'No public link' },
    { name: 'Mutual', mark: 'm', url: 'https://somilagg123.github.io/mutual/', color: '#e8eaf3', detail: 'A matchmaking prototype where friends make the introduction.' },
    { name: 'Agcess', mark: 'a', url: 'https://somilagg123.github.io/agcess/', color: '#e8eee3', detail: 'Agricultural field data, captured through SMS.' },
    { name: 'Horlo', mark: '◷', url: 'https://somilagg123.github.io/horlo/', color: '#eeece6', detail: 'A watch collection and discovery app.' },
  ],
  articles: readingArticles,
  harness: 'https://github.com/SomilAgg123/agent-shape',
  games: [
    { name: 'frenchpoker', mark: '♧', url: 'https://frenchpoker.onrender.com', action: 'Play French Poker' },
    { name: 'forhappyhour', mark: '✷', url: 'https://forhappyhour.com', action: 'Explore Happy Hour' },
  ],
  writing: [
    { name: 'X', mark: '𝕏', detail: 'The short version', url: 'https://x.com/Somil_Agg' },
    { name: 'Substack', mark: '≡', detail: 'A little more room to think', url: 'https://foundaition.substack.com' },
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
    const copy = label('item-copy', '');
    copy.append(label('item-name', item.name));
    if (item.detail) copy.append(label('item-detail', item.detail));
    main.append(copy);
    row.append(main, label(item.url ? 'visit-label' : 'pending-label', item.url ? (item.source || 'Visit site') : (item.status || 'Link coming soon')));
    if (item.url) row.setAttribute('aria-label', `${item.name} (opens in a new tab)`);
    li.append(row);
    list.append(li);
  });
}

renderList('project-links', content.projects);
renderList('writing-links', content.writing);

if (content.articles.length) {
  document.querySelector('.library-shelf').hidden = true;
  document.getElementById('article-links').hidden = false;
  renderList('article-links', content.articles.slice(0, 5));
  if (content.articles.length > 5) {
    document.getElementById('more-reading').hidden = false;
    document.getElementById('more-reading-label').textContent = `Explore ${content.articles.length - 5} more reads`;
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

function openPlayers() {
  if (!dialog.open) dialog.showModal();
}

openButton.addEventListener('click', openPlayers);
document.querySelector('.close-player').addEventListener('click', () => dialog.close());
document.querySelector('.skip-player').addEventListener('click', () => {
  dialog.close();
  history.replaceState(null, '', '#work');
  navigateTo('work');
});

dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  }
});

function navigateTo(id) {
  const section = document.getElementById(id);
  if (!section) return;
  section.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  section.querySelector('h2')?.focus({ preventScroll: true });
  setActive(id);
}

document.querySelectorAll('.player-card').forEach(card => {
  card.addEventListener('click', event => {
    event.preventDefault();
    dialog.close();
    history.pushState(null, '', card.hash);
    navigateTo(card.hash.slice(1));
  });
});

const navLinks = [...document.querySelectorAll('.index-nav a')];
function setActive(id) {
  navLinks.forEach(link => {
    if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

navLinks.forEach(link => link.addEventListener('click', () => setActive(link.hash.slice(1))));
const sections = [...document.querySelectorAll('.content-section')];
let scrollPending = false;
window.addEventListener('scroll', () => {
  if (scrollPending) return;
  scrollPending = true;
  requestAnimationFrame(() => {
    const offset = window.innerWidth <= 760 ? 150 : 160;
    const current = sections.filter(section => section.getBoundingClientRect().top <= offset).at(-1);
    if (current) setActive(current.id);
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) setActive('writing');
    scrollPending = false;
  });
}, { passive: true });

// The content view is the default. /?view=players opens the optional entry screen.
if (new URLSearchParams(location.search).get('view') === 'players') openPlayers();
if (location.hash) setActive(location.hash.slice(1));

window.addEventListener('hashchange', () => {
  if (location.hash) setActive(location.hash.slice(1));
});
