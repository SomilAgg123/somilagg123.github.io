# Somil's personal website

A small, dependency-free personal site. The content index is the default; the optional player chooser is accessible from the header or `/?view=players`.

Run `npm run dev` and visit http://127.0.0.1:4173. Run `npm run check` to check JavaScript syntax.

Edit project, game, and writing URLs in `dist/app.js`. Missing URLs render as text with a clear status. Temba intentionally has no public link. Edit the introduction and experience content in `dist/index.html`; styles live in `dist/styles.css`.

`dist/reading.js` contains a snapshot of all 30 articles marked `Read` in the Notion Reading Log on 23 November 2026. Five display initially; the rest expand inline. This is a static snapshot, not a live Notion integration. Only titles, public URLs, and publication names are included.

Project URLs for Mutual, Agcess, and Horlo come from their GitHub READMEs. The harness links to `SomilAgg123/agent-shape`. X, Substack, French Poker, and Happy Hour use the URLs supplied by Somil. Detailed work history remains to be added.

The `dist` directory is the complete static website. No build or application server is required. Typography uses Google Fonts with local system fallbacks.

The custom domain is intended to be `somilaggarwal.com`. Domain and DNS status must be verified before claiming it is connected.
