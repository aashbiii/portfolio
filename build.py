"""
Build a static copy of the portfolio for GitHub Pages (or any static host).

    python build.py                                   # -> dist/ for https://aashbiii.github.io/portfolio/
    python build.py --site-url https://example.com/   # different address

Flask renders each page exactly as it does locally; the HTML is written to dist/
together with public/static. Links get the right base path (e.g. /portfolio/).
"""

import argparse
import shutil
from pathlib import Path

from app import app

ROOT = Path(__file__).resolve().parent
DEFAULT_SITE_URL = "https://aashbiii.github.io/portfolio/"

# Unused master copies of the avatars — not needed on the live site.
SKIP_STATIC = {"img/hero.png", "img/about.png"}


def build(site_url: str, out: Path) -> None:
    site_url = site_url.rstrip("/") + "/"
    app.config["STATIC_BUILD"] = True

    # Empty the output folder's contents (keeping the folder itself, which may be open elsewhere).
    out.mkdir(parents=True, exist_ok=True)
    for child in out.iterdir():
        shutil.rmtree(child) if child.is_dir() else child.unlink()

    pages = {
        "/": "index.html",
        "/sitemap.xml": "sitemap.xml",
        "/robots.txt": "robots.txt",
        "/__not-found__": "404.html",
    }
    with app.test_client() as client:
        for route, filename in pages.items():
            res = client.get(route, base_url=site_url)
            expected = 404 if filename == "404.html" else 200
            if res.status_code != expected:
                raise SystemExit(f"{route} returned {res.status_code}")
            (out / filename).write_bytes(res.data)
            print(f"  {filename:<12} {len(res.data):>8,} bytes")

    static_src = ROOT / "public" / "static"
    for f in static_src.rglob("*"):
        rel = f.relative_to(static_src).as_posix()
        if f.is_file() and rel not in SKIP_STATIC:
            dest = out / "static" / rel
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(f, dest)

    # Tell GitHub Pages not to run Jekyll over the files.
    (out / ".nojekyll").write_text("")
    print(f"Built {out} for {site_url}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--site-url", default=DEFAULT_SITE_URL)
    parser.add_argument("--out", default=str(ROOT / "dist"))
    args = parser.parse_args()
    build(args.site_url, Path(args.out))
