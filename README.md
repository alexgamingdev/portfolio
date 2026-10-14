# alexgamingdev Portfolio

A bilingual (German and American English) portfolio website for Alexander Dennhoven, known online as **alexgamingdev**. The site presents his software development work, technical content, and public profiles in a responsive, accessible static website.

## Features

- German and English page content with language selection
- Separate Home, About, Channels, and Contact pages
- Responsive layout, reduced-motion support, accessibility mode, and keyboard focus styles
- SEO metadata, structured data, sitemap, robots file, web app manifest, and favicon
- Markdown and JSON representations through URL query parameters:
  - `?type=md`
  - `?type=json`
- Language and accessibility preferences that carry across internal page navigation
- GitHub Pages deployment through GitHub Actions

## Pages

| Page | Path |
| --- | --- |
| Home | [`index.html`](./index.html) |
| About | [`about/index.html`](./about/index.html) |
| Channels | [`channels/index.html`](./channels/index.html) |
| Contact | [`contact/index.html`](./contact/index.html) |

## Run locally

This is a static website and does not require a build step or package installation. Open `index.html` in a browser to view it locally. For the complete site experience, publish the repository to GitHub Pages.

## Deploy to GitHub Pages

The workflow in [`.github/workflows/pages.yml`](./.github/workflows/pages.yml) publishes the repository root whenever changes are pushed to the `main` branch. To enable deployment:

1. Push this project to a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Set **Build and deployment → Source** to **GitHub Actions**.
4. Push to `main` or run the **Deploy static portfolio to GitHub Pages** workflow from the **Actions** tab.

The published URL depends on the repository name and any custom domain configured in GitHub Pages. Update the canonical URLs, Open Graph URLs, sitemap, and robots file if the production domain changes.

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
│   └── js/
│       └── site.js
├── channels/
│   └── index.html
├── contact/
│   └── index.html
├── index.html
├── robots.txt
├── site.webmanifest
└── sitemap.xml
```

## Official profiles

- [GitHub](https://github.com/alexgamingdev)
- [YouTube](https://www.youtube.com/@alexgamingdev)
- [BlueSky](https://bsky.app/profile/alexgamingdev.de)
- [LinkedIn](https://www.linkedin.com/in/alexander-dennhoven/)

## License

No license has been specified. Unless a license is added, the source code remains under its default copyright; permission to reuse, modify, or redistribute it is not granted.
