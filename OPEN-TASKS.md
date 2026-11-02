# Open tasks

This list reflects the remaining work identified for the root static website. The temporary `source/` app is not the implementation target.

## Open

- [ ] **Normal — Formspree live verification:** Submit a test message from the deployed contact page and confirm Formspree accepts it and delivers the notification. The HTML form is wired to the supplied endpoint; a live delivery cannot be confirmed from local code validation.
- [ ] **Normal — Alternate-domain canonical redirect:** Configure `alexgaming.dev` and `www.alexgaming.dev` to redirect to `https://alexgaming.is-a.dev/`. The primary domain resolves to GitHub Pages; the alternate currently redirects to `www.alexgaming.dev` instead.
- [ ] **Normal — Cloudflare Worker deployment:** Set the public Turnstile site key, deploy `cloudflare/contact-verification-worker.js`, add the `TURNSTILE_SECRET` secret, create and bind the `PROFILE_ACCESS` KV namespace, route `alexgaming.is-a.dev/api/*` to the Worker, configure rate limiting, and manually verify requesters before issuing/revoking profile tokens.

## Completed in this change

- [x] Fix the smoke canvas stacking so it renders above the black page background and below page content.
- [x] Tune the cursor smoke for stronger visibility and fewer, broader gaps; visually check it in the browser.
- [x] Hide and pause the smoke in accessibility mode, and switch to a high-contrast navy-and-orange palette.
- [x] Add an accessible, bilingual HTML contact form connected to Formspree.
- [x] Use English as the initial language and keep German available with `?lang=de`.
- [x] No existing `TODO`, `FIXME`, or `XXX` markers were found during the task scan.
- [x] Update profile URLs, add the legacy GitHub and second Mastodon profile, and retain profile badges and other existing profile information.
- [x] Add a bilingual privacy page and display obfuscated contact details as page text rather than metadata.
- [x] Add a bilingual imprint page with the confirmed address and obfuscated contact details.
- [x] Align all page-level person and website structured data under the canonical `alexgaming.is-a.dev` identity.
- [x] Verify that the primary domain and provisional alternate resolve.
- [x] Add an accessible Turnstile verification flow and server-side Cloudflare Worker token verification for readable contact details.
- [x] Remove the temporary `probe` parameter from URL and saved navigation state.
- [x] Keep URL settings in the query string and local storage across internal navigation.
- [x] Use the existing logo asset and restore the original image references.
- [x] Replace public Markdown/JSON/JSON-LD page links with a bilingual portfolio documentation page.
- [x] Add a reversible keyboard-sequence arcade palette Easter egg and document it.
- [x] Add a manually approved, token-protected JSON/Markdown profile API limited to curated public data.
