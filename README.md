# alexgamingdev Portfolio

A bilingual (German and American English) portfolio website for Alexander Dennhoven, known online as **alexgamingdev**. The site presents his software development work, technical content, and public profiles in a responsive, accessible static website.

## Features

- German and English page content with language selection
- Separate Home, About, Channels, Contact, Privacy, Imprint, and bilingual Documentation pages
- Responsive layout, reduced-motion support, accessibility mode, and keyboard focus styles
- SEO metadata, structured data, sitemap, robots file, web app manifest, and favicon
- A bilingual guide to the site, its settings, accessibility, privacy, and Easter egg
- A keyboard-sequence Easter egg that enables a reversible arcade color palette
- Individually approved JSON and Markdown profile exports through a Cloudflare Worker
- English is the default language; German remains available with `?lang=de`
- URL settings are saved in local storage and continue across internal navigation
- GitHub Pages deployment through GitHub Actions

The [documentation page](https://alexgaming.is-a.dev/docs/) is linked from every page. Public page-format links have been removed. The separate profile API serves JSON or Markdown only to manually approved requesters and contains curated public portfolio data, not private contact details or a home address.

When accessibility mode is enabled, Cloudflare Turnstile is intended to verify visitors before revealing readable email and phone details. The browser only contains the public site key; the Worker verifies Turnstile tokens server-side using the `TURNSTILE_SECRET` secret. Until configured, contact details remain obfuscated and the contact form remains available.

### Configure contact verification

1. In Cloudflare Turnstile, register `alexgaming.is-a.dev` and copy its public site key.
2. Set `siteKey` in [`assets/js/contact-verification-config.js`](./assets/js/contact-verification-config.js). This key is public; do not put a secret in that file.
3. Deploy [`cloudflare/contact-verification-worker.js`](./cloudflare/contact-verification-worker.js) as a Cloudflare Worker.
4. Add the Worker secret binding `TURNSTILE_SECRET` with the secret key from Turnstile.
5. Create a Cloudflare KV namespace and bind it to the Worker as `PROFILE_ACCESS`.
6. Route `alexgaming.is-a.dev/api/*` to the Worker. This covers contact verification and the profile API.
7. Publish the static site and test the human verification in accessibility mode.

### Manually approve profile API access

The Worker serves `https://alexgaming.is-a.dev/api/profile/<personal-token>.json` and `https://alexgaming.is-a.dev/api/profile/<personal-token>.md`. Verify a requester yourself before sharing a token. Generate a unique token and its SHA-256 KV key locally with Node.js:

```powershell
node -e "const c=require('node:crypto');const t=c.randomBytes(32).toString('base64url');console.log('TOKEN='+t);console.log('KV_KEY='+c.createHash('sha256').update(t).digest('hex'))"
```

In the Cloudflare dashboard, add the printed `KV_KEY` to the `PROFILE_ACCESS` namespace with the exact value `approved`. Privately send the `TOKEN` to the approved requester; the JSON and Markdown URLs use that token and the corresponding file extension. Do not publish or commit either value. The Worker stores only a hash lookup key, returns `no-store` responses, and exposes only curated public profile information. Treat the URL as a bearer credential and revoke access by deleting its KV entry. Cloudflare KV changes may take a short time to propagate. Apply a Cloudflare rate limit to `/api/profile/*` as an additional operational safeguard.

## Pages

| Page | Path |
| --- | --- |
| Home | [`index.html`](./index.html) |
| About | [`about/index.html`](./about/index.html) |
| Channels | [`channels/index.html`](./channels/index.html) |
| Contact | [`contact/index.html`](./contact/index.html) |
| Privacy | [`privacy/index.html`](./privacy/index.html) |
| Imprint | [`imprint/index.html`](./imprint/index.html) |
| Documentation | [`docs/index.html`](./docs/index.html) |

## Run locally

This is a static website and does not require a build step or package installation. Open `index.html` in a browser to view it locally. For the complete site experience, publish the repository to GitHub Pages.

## Deploy to GitHub Pages

The workflow in [`.github/workflows/pages.yml`](./.github/workflows/pages.yml) publishes the repository root whenever changes are pushed to the `main` branch. To enable deployment:

1. Push this project to a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Set **Build and deployment → Source** to **GitHub Actions**.
4. Push to `main` or run the **Deploy static portfolio to GitHub Pages** workflow from the **Actions** tab.

The canonical primary domain is `https://alexgaming.is-a.dev/`; the provisional alternate is `https://alexgaming.dev/`. The [`CNAME`](./CNAME) file configures the primary domain for GitHub Pages. The alternate currently redirects to `www.alexgaming.dev`; redirecting that host to the canonical primary domain requires account-side DNS/redirect configuration. Update the canonical URLs, Open Graph URLs, sitemap, and robots file if the primary domain changes.

## Project structure

```text
.
├── .github/
│   └── workflows/
│       └── pages.yml
├── .gitignore
├── .nojekyll
├── about/
│   └── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── icons.svg
│   └── js/
│       ├── contact-verification-config.js
│       ├── smoke-bg.js
│       └── site.js
├── channels/
│   └── index.html
├── cloudflare/
│   └── contact-verification-worker.js
├── contact/
│   └── index.html
├── docs/
│   └── index.html
├── imprint/
│   └── index.html
├── privacy/
│   └── index.html
├── CNAME
├── index.html
├── robots.txt
├── site.webmanifest
└── sitemap.xml
```

## Official profiles

- [GitHub](https://github.com/alexgamingdev)
- [YouTube](https://www.youtube.com/@alexgamingdev)
- [Legacy GitHub](https://github.com/alexgamingstudios)
- [Bluesky](https://bsky.app/profile/alexgaming.is-a.dev)
- [LinkedIn](https://www.linkedin.com/in/alexgamingdev)
- [X](https://x.com/alexgamingdev)
- [Instagram](https://www.instagram.com/alexgaming.dev/)
- [TikTok](https://www.tiktok.com/@alexgamingdev)
- [Twitch](https://www.twitch.tv/alexgamingdev)
- [Mastodon](https://mastodon.social/@alexgamingdev)
- [Mastodon on mstdn.social](https://mstdn.social/@alexgamingdev)
- [Pinterest](https://de.pinterest.com/alexgamingdev/)
- [npm](https://www.npmjs.com/~alexgamingdev)
- [Linktree](https://linktr.ee/alexgamingdev)
- [Wikidata](https://www.wikidata.org/wiki/Q138410440)
- [Google Knowledge Panel](https://www.google.com/search?kgmid=/g/11y_3fjgvj)

## License

No license has been specified. Unless a license is added, the source code remains under its default copyright; permission to reuse, modify, or redistribute it is not granted.
