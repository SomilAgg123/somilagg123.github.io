# Somil's personal website

A small, dependency-free personal site. The player chooser opens on arrival. Selecting a player, sidebar item, or section heading opens a focused view of that section with an animated icon. Direct links such as `/#building` open the same view without the chooser. “Skip to content,” “Overview,” and `/?view=content` show the full index; the header button reopens the chooser. Browser back/forward restores the corresponding view. Icon animation respects reduced-motion preferences.

Website: https://somilaggarwal.com/

Repository: https://github.com/SomilAgg123/somilagg123.github.io

## Development

Run `npm run dev` and visit http://127.0.0.1:4173. Run `npm run check` to check JavaScript syntax.

Edit project, game, and writing URLs in `dist/app.js`. Projects are grouped into current and past work; writing entries use each post’s title and publication. Edit the introduction in `dist/index.html`; styles live in `dist/styles.css`.

Current Building entries are CustomerMemory, agentifyapi, Jagged, and Sell My Newspaper. French Poker and For Happy Hour appear only in Games. Sell My Newspaper and For Happy Hour link to their public websites; their repositories remain private and are not linked. At Somil's request, agentifyapi and Jagged are featured in Building with public GitHub links. The descriptions follow their READMEs: agentifyapi exposes existing APIs as approved MCP tools; Jagged is model-routing research, not a completed routing engine. Other GitHub projects reviewed for possible future inclusion are recommendations only until selected.

Project rows show right-aligned Website and GitHub links. Mutual, Agcess, and Horlo have public repositories, verified on 23 November 2026. CustomerMemory and French Poker show only their public websites. Keep repository links limited to public repositories. Investing companies have right-aligned Website links; “Insurance for AI” is a single thesis row with AIUC, Testudo, and Armilla AI linked inline in parentheses. These are thesis examples, not stated portfolio holdings. Armory company names use the same serif typography as the other investing rows, while the Work experience panel keeps its compact styling.

The About section uses Somil’s updated copy about tinkering, games, people-oriented problems, past startups, Decagon, agent knowledge factories, and reading. Project references link directly to their public websites. Sell My Newspaper's URL was confirmed against its repository's robots.txt and its public site at `https://www.sellmynewspaper.com/`. The reading link opens the focused Library view.

Writing begins with the two X articles supplied by Somil, in that order: “the bar gets higher” and “winning games with agents.” Both articles were read on X on 23 November 2026. Entries now display the actual titles with publication labels, and the links retain the exact supplied post URLs.

`dist/reading.js` contains a snapshot of all 30 articles marked `Read` in the Notion Reading Log on 23 November 2026. Four explicitly selected favorites appear on the overview. The focused Library adds the remaining 26 articles, filterable by Agents, Knowledge factories, Engineering, and Game design. Favorites use two columns; the remaining articles use three, adapting to smaller screens. The introduction identifies the articles as reading by other authors, not Somil’s writing. This is a static snapshot, not a live Notion integration. Only titles, public URLs, publication names, categories, and approved favorite flags are included; private notes are never published.

Project URLs for Mutual, Agcess, and Horlo come from their GitHub READMEs. X, Substack, French Poker, and Happy Hour use the URLs supplied by Somil. The investor and builder chooser cards have separate destinations.

Work history uses a company selector and detail panel, inspired by `gramliu.com`. The six roles, dates, and highlights in `content.experience` were supplied directly by Somil from LinkedIn in November 2026: Decagon, Schmidt Futures, CleanTechies, Armory Square Ventures, Agcess, and PayPal. Edit these records in `dist/app.js`; each has company, title, dates, and optional summary and highlights. Tabs support keyboard navigation and adapt to horizontal scrolling on mobile.

The Investing page follows Somil's supplied narrative: a 2024 AI security thesis featuring Corridor, Pangram Labs, and Lucid Computing, then climate tech investing at Elemental Impact and the differentiated geographic thesis learned at Armory Square Ventures. The thesis companies are not described as personal investments. Corridor's acquisition links to Cognition's announcement at `https://cognition.com/blog/corridor-joining-cognition`; the other company links use their official websites. Somil supplied Symbium, Cambium, and Gradient for the Elemental section. The three Armory Square deals share the work-history records and retain the qualification “led or supported” and their supplied funding rounds. The raw LinkedIn export, personal contact details, and profile-edit URLs are not part of the website.

The overview follows About, Experience, Investing, Building, Writing, Games, and Library. It shows the full About copy and previews of longer sections. Investing shows only the AI security thesis on the overview; “View all investing” opens the full section, including Elemental and Armory. The sidebar groups navigation into A bit about me, collapsible Work (Experience, Investing, Building, Writing), and collapsible Play (Games, Library). The name links to the overview from the top left. Native details/summary controls support keyboard use and reflow above the content on mobile.

Typography uses DM Sans for body copy and controls, and Source Serif 4 for display text. Section headings are larger and medium-weight; introductions and book titles retain italic accents. Investment company names share a consistent size across the thesis, Elemental, and Armory lists.

The `dist` directory is the complete static website. No build or application server is required. Typography uses Google Fonts with local system fallbacks.

## GitHub Pages

Every push to `main` runs the JavaScript checks and publishes `dist/` using `.github/workflows/pages.yml`. No dependency installation, build step, or deployment secret is needed. The workflow can also be run manually from GitHub Actions. Only the static website files are deployed.

Upload and deployment run in separate dependent jobs to avoid the artifact-discovery race in [actions/deploy-pages#451](https://github.com/actions/deploy-pages/issues/451). If deployment needs a retry, rerun only the failed deployment job so it reuses the existing artifact.

Before upload, the workflow adds content-hash query strings to JavaScript and stylesheet URLs in the deployed HTML. This prevents returning browsers from reusing outdated assets after a content update. Keep the source HTML's relative asset references unversioned; the workflow derives versions automatically.

The `.openai/hosting.json` file identifies the earlier private Sites preview. It is not used by GitHub Pages.

## Custom domain

`somilaggarwal.com` is configured in GitHub Pages with HTTPS enabled. DNS is managed in Spaceship. The steps below document the setup; no DNS changes are needed when publishing content updates.

1. Open this repository's **Settings → Pages**, enter `somilaggarwal.com` under **Custom domain**, and save.
2. In Spaceship, open the DNS settings for `somilaggarwal.com` and set these website records:

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | somilagg123.github.io |

Replace conflicting website/parking records for these hosts; keep unrelated email and verification records. No ChatGPT Sites DNS records are required for GitHub Pages.

3. After GitHub's DNS check and certificate provisioning complete, enable **Enforce HTTPS** in Pages settings.

GitHub recommends verifying domain ownership in your account's Pages settings. Follow the unique TXT record shown there if you enable verification.

Reference: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
