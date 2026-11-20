# Ashbi Saju — Portfolio

A premium, animated personal portfolio built with **Flask**, styled with hand-written CSS and animated with **GSAP (ScrollTrigger + Flip)** and **Lenis** smooth scrolling. Ready to deploy on **Vercel**.

## Features

- **4 themes**: Obsidian, Aurora, Ember and Ivory (light). Switching plays a circular "view transition" reveal, and your choice is remembered.
- **Animations**: preloader, split-text title reveals, a rotating role line, an interactive particle field, magnetic buttons, a custom cursor, 3D tilt cards with glare, mouse-follow spotlight borders, a scroll marquee that speeds up as you scroll, word-by-word scroll text, counters, a timeline that draws as you scroll, and Flip-animated project filtering
- **Project modals** with metrics, highlights and stack. Use the arrow keys to move between projects and Esc to close.
- **Contact form** with validation and a honeypot. It sends email through SMTP when configured, and otherwise opens the visitor's mail app.
- **SEO**: Open Graph image, JSON-LD Person schema, `robots.txt` and `sitemap.xml`
- **Accessible**: keyboard support, focus trap in the modal, and `prefers-reduced-motion` turns animations off. The content still shows if JavaScript is disabled.
- **Fully responsive**, with a full-screen animated mobile menu

## Edit your content

All text lives in **`portfolio_data.py`**: profile, stats, experience, projects, skills, education, certifications, achievements, leadership, languages and themes. Edit it and refresh the page. You don't need to change any HTML.

- Resume PDF: `public/static/files/Ashbi_Saju_Resume.pdf` (served at `/resume`, and `/resume?download=1` downloads it)
- Images: `public/static/img/` (`about.webp` = hero cut-out, `hero.webp` = about photo, `og.png` = social preview)
- Each project's `github` link currently points to the GitHub profile. Change it to the repo URL.

## Run locally

```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Then open http://127.0.0.1:5000

## Deploy to GitHub Pages (live site)

The live site is **https://aashbiii.github.io/portfolio/**. GitHub Pages can't run Python, so `build.py` uses Flask to render the site into plain HTML in `dist/`, and a GitHub Action publishes it.

- **Every push to `main` redeploys automatically** (`.github/workflows/pages.yml`). Edit `portfolio_data.py`, commit and push, and the site updates in about a minute.
- **One-time setup:** in the repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
- **Build locally (optional):** `python build.py` writes the static site to `dist/`.
- **Contact form:** with no server, it checks the fields and opens the visitor's mail app with the message filled in.

## Deploy to Vercel (alternative)

Vercel runs the full Flask app, so the contact form can send email directly (see SMTP below).

### Option A: GitHub + Vercel dashboard (recommended)

1. Push this folder to a new GitHub repository:
   ```powershell
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/aashbiii/<repo-name>.git
   git push -u origin main
   ```
2. Go to https://vercel.com/new, import the repository, keep the defaults (Framework preset: **Other**) and click **Deploy**.

### Option B: Vercel CLI

```powershell
npm i -g vercel
vercel          # first deploy (preview)
vercel --prod   # production
```

### How it works on Vercel

| File | Purpose |
| --- | --- |
| `api/index.py` | Serverless Python function that exposes the Flask `app` |
| `vercel.json` | Rewrites every route to the Flask function, adds cache and security headers |
| `public/static/**` | Served straight from Vercel's CDN at `/static/...` (Flask serves the same folder locally) |
| `requirements.txt` | Installed automatically by Vercel |

### Optional: real email from the contact form

In Vercel, go to **Project → Settings → Environment Variables** and add the variables from `.env.example` (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO`). For Gmail, use an [App Password](https://myaccount.google.com/apppasswords). Redeploy after adding them.

## Project structure

```
Ashbi_Portfolio/
├── app.py                 # Flask routes (/, /resume, /api/contact, /api/profile, sitemap, robots)
├── build.py               # static export for GitHub Pages -> dist/
├── .github/workflows/     # GitHub Pages deploy
├── portfolio_data.py      # ← all your content
├── api/index.py           # Vercel entry point
├── vercel.json
├── requirements.txt
├── templates/
│   ├── base.html          # <head>, cursor, theme dock, scripts
│   ├── index.html         # all sections
│   ├── 404.html
│   └── _icons.html        # inline SVG icon macro
└── public/static/
    ├── css/main.css       # themes, layout, components
    ├── js/main.js         # all animations and interactions
    ├── img/               # avatar, favicon, og image
    └── files/             # resume PDF
```
