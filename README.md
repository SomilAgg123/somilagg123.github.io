# Somil's personal website

A small, dependency-free personal site. The player chooser opens on arrival. Selecting a player, sidebar item, or section heading opens a focused view of that section with an animated icon. Direct links such as `/#building` open the same view without the chooser. “Skip to content,” “All content,” and `/?view=content` show the full index; the header button reopens the chooser. Browser back/forward restores the corresponding view. Icon animation respects reduced-motion preferences.

Website: https://somilaggarwal.com/

Repository: https://github.com/SomilAgg123/somilagg123.github.io

## Development

Run `npm run dev` and visit http://127.0.0.1:4173. Run `npm run check` to check JavaScript syntax.

Edit project, game, and writing URLs in `dist/app.js`. Projects are grouped into current and past work; the writing statements link to individual essays. Edit the introduction in `dist/index.html`; styles live in `dist/styles.css`.

Current Building entries are CustomerMemory, Sell My Newspaper, For Happy Hour, and French Poker. Sell My Newspaper and For Happy Hour were added at Somil's request and link to their public websites; their repositories remain private and are not linked. Other GitHub projects reviewed for possible future inclusion are recommendations only until selected.

Project rows show right-aligned Website and GitHub links. Mutual, Agcess, and Horlo have public repositories, verified on 23 November 2026. CustomerMemory and French Poker show only their public websites. Keep repository links limited to public repositories. Investing companies have right-aligned Website links; “Insurance for AI” is a single thesis row with AIUC, Testudo, and Armilla AI linked inline in parentheses. These are thesis examples, not stated portfolio holdings. Armory company names use the same serif typography as the other investing rows, while the Work experience panel keeps its compact styling.

The About section uses Somil's supplied copy about building with AI, preserving past startups, software factories, reading, and games. Project references link directly to their public websites. Sell My Newspaper's URL was confirmed against its repository's robots.txt and its public site at `https://www.sellmynewspaper.com/`. The reading link opens the focused Library view.

Writing begins with the two X articles supplied by Somil, in that order: “the bar gets higher” and “winning games with agents.” Both articles were read on X on 23 November 2026; their “I believe...” lines are short editorial paraphrases, and the links retain the exact supplied post URLs.

`dist/reading.js` contains a snapshot of all 30 articles marked `Read` in the Notion Reading Log on 23 November 2026. Six book-style cards display initially in three columns; the remaining 24 expand inline. The grid adapts to two or one column on narrower screens. This is a static snapshot, not a live Notion integration. Only titles, public URLs, and publication names are included.

Project URLs for Mutual, Agcess, and Horlo come from their GitHub READMEs. The harness links to `SomilAgg123/agent-shape` from the opening “A bit about me” section. X, Substack, French Poker, and Happy Hour use the URLs supplied by Somil. The investor and builder chooser cards have separate destinations.

Work history uses a company selector and detail panel, inspired by `gramliu.com`. The six roles, dates, and highlights in `content.experience` were supplied directly by Somil from LinkedIn in November 2026: Decagon, Schmidt Futures, CleanTechies, Armory Square Ventures, Agcess, and PayPal. Edit these records in `dist/app.js`; each has company, title, dates, and optional summary and highlights. Tabs support keyboard navigation and adapt to horizontal scrolling on mobile.

The Investing page follows Somil's supplied narrative: a 2024 AI security thesis featuring Corridor, Pangram Labs, and Lucid Computing, then climate tech investing at Elemental Impact and the differentiated geographic thesis learned at Armory Square Ventures. The thesis companies are not described as personal investments. Corridor's acquisition links to Cognition's announcement at `https://cognition.com/blog/corridor-joining-cognition`; the other company links use their official websites. Somil supplied Symbium, Cambium, and Gradient for the Elemental section. The three Armory Square deals share the work-history records and retain the qualification “led or supported” and their supplied funding rounds. The raw LinkedIn export, personal contact details, and profile-edit URLs are not part of the website.

The “I believe...” lines are editorial paraphrases of Somil's essays, verified against the public foundAItion feed on 23 November 2026: “The Right to Remember,” “The Gordian Knot of AI Control,” “Why the Real GenAI Risk Is What Happens After You Deploy,” “What Is an Eval?,” and “Observations.” Each statement links to its source essay directly. The project sentences and software factory line use Somil's supplied wording.

The `dist` directory is the complete static website. No build or application server is required. Typography uses Google Fonts with local system fallbacks.

## GitHub Pages

Every push to `main` runs the JavaScript checks and publishes `dist/` using `.github/workflows/pages.yml`. No dependency installation, build step, or deployment secret is needed. The workflow can also be run manually from GitHub Actions. Only the static website files are deployed.

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
