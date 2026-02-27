# cosmospostman.github.io

Personal portfolio website for Mitchell Jeffrey — science communicator and software engineer based in Cairns, Australia. Live at **hello-mlj.net**.

## Overview

A static site built with [Nunjucks](https://mozilla.github.io/nunjucks/) templates, compiled to plain HTML under `docs/` and served via GitHub Pages.

### Content

**Projects** (8 interactive/educational science programs):
- Sound Show, Foldable Flight, Magnets, Security, Market, Mushroom, Election campaign (2022), Radio

**Writing** (5 published articles):
- Wonky Holes, Lightship Basket Weaving, Psychedelic Psychotherapy, Queer Nuns, Guinea Worm

## Project Structure

```
src/              # Nunjucks templates (.njk)
  base.njk        # HTML base layout
  index.njk       # Homepage
  projects/       # One template per project
  writing/        # One template per article
docs/             # Generated static HTML (committed, served by GitHub Pages)
  css/            # Compiled CSS
  img/            # Images
  audio/          # Audio files
  content/        # PDFs (resume, papers)
style.scss        # SCSS stylesheet (uses Pico CSS framework)
render.js         # Build script — renders all templates to docs/
```

## Development

**Install dependencies** (includes Sass — no separate Homebrew install needed):
```sh
npm install
```

**Watch mode + local server** (recommended during development):
```sh
npm run dev
```
This builds once, then watches `.njk` and `.scss` files for changes and serves the site at `http://localhost:8000`.

**One-off build:**
```sh
npm run build
```

**Individual commands:**
```sh
npm run build:css    # compile SCSS → docs/css/style.css
npm run build:html   # render templates → docs/**/*.html
npm run serve        # serve docs/ at localhost:8000
```

## Deployment

The site is hosted on GitHub Pages from the `docs/` folder on `main`.

To deploy:
1. `npm run build` — regenerates all HTML and CSS into `docs/`
2. Commit the changes (including `docs/`)
3. `git push origin main` — GitHub Pages picks up the update automatically

The custom domain (hello-mlj.net) is configured via the `CNAME` file.

## Stack

| Tool | Purpose |
|---|---|
| [Nunjucks 3.2.4](https://mozilla.github.io/nunjucks/) | Template engine |
| [Pico CSS v2](https://picocss.com) | CSS framework |
| [Sass](https://sass-lang.com) | SCSS compilation |
| [concurrently](https://github.com/open-cli-tools/concurrently) | Parallel watch tasks in dev |
| GitHub Pages | Hosting (`docs/` on `main`) |

## Adding content

To add a new page:
1. Create a template in `src/projects/` or `src/writing/`
2. Add a `renderProject('projects/yourpage')` call in `render.js`
3. Run `npm run build` to generate the HTML
