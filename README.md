# Somil's personal website

A small, dependency-free personal site. The player chooser opens on arrival. Selecting a player, sidebar item, or section heading opens a focused view of that section with an animated icon. Direct links such as `/#building` open the same view without the chooser. “Skip to content,” “All content,” and `/?view=content` show the full index; the header button reopens the chooser. Browser back/forward restores the corresponding view. Icon animation respects reduced-motion preferences.

Website: https://somilaggarwal.com/

Repository: https://github.com/SomilAgg123/somilagg123.github.io

## Development

Run `npm run dev` and visit http://127.0.0.1:4173. Run `npm run check` to check JavaScript syntax.

Edit project, game, and writing URLs in `dist/app.js`. Projects are grouped into current and past work; the writing statements link to individual essays. Edit the introduction in `dist/index.html`; styles live in `dist/styles.css`.

`dist/reading.js` contains a snapshot of all 30 articles marked `Read` in the Notion Reading Log on 23 November 2026. Six book-style cards display initially in three columns; the remaining 24 expand inline. The grid adapts to two or one column on narrower screens. This is a static snapshot, not a live Notion integration. Only titles, public URLs, and publication names are included.

Project URLs for Mutual, Agcess, and Horlo come from their GitHub READMEs. The harness links to `SomilAgg123/agent-shape` from the opening “A bit about me” section. X, Substack, French Poker, and Happy Hour use the URLs supplied by Somil. The investor and builder chooser cards have separate destinations.

Work history uses a company selector and detail panel, inspired by `gramliu.com`. Add confirmed roles to `content.experience` in `dist/app.js` (company, title, dates, optional summary and highlights). LinkedIn's public profile did not expose a complete timeline, so the live section links to LinkedIn until those details are supplied. Investing details are also pending; no portfolio holdings or employment dates are inferred.

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
