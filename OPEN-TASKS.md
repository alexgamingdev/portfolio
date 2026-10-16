# Open tasks

This list reflects the remaining work identified for the root static website. The temporary `source/` app is not the implementation target.

## Open

- [ ] **Normal — Formspree live verification:** Submit a test message from the deployed contact page and confirm Formspree accepts it and delivers the notification. The HTML form is wired to the supplied endpoint; a live delivery cannot be confirmed from local code validation.

## Completed in this change

- [x] Fix the smoke canvas stacking so it renders above the black page background and below page content.
- [x] Tune the cursor smoke for stronger visibility and fewer, broader gaps; visually check it in the browser.
- [x] Hide and pause the smoke in accessibility mode, and switch to a high-contrast navy-and-orange palette.
- [x] Add an accessible, bilingual HTML contact form connected to Formspree.
- [x] Use English as the initial language and keep German available with `?lang=de`.
- [x] No existing `TODO`, `FIXME`, or `XXX` markers were found during the task scan.
