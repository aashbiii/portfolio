"""
Ashbi Saju — Portfolio
Flask application. Runs locally with `python app.py` and on Vercel via api/index.py.
"""

import os
import re
import smtplib
from datetime import datetime
from email.message import EmailMessage
from pathlib import Path

from flask import Flask, jsonify, render_template, request, send_from_directory, url_for

import portfolio_data as data

BASE_DIR = Path(__file__).resolve().parent

# Static assets live in public/static so Vercel's CDN serves them directly at /static/...
# while Flask serves the very same files during local development.
app = Flask(
    __name__,
    template_folder=str(BASE_DIR / "templates"),
    static_folder=str(BASE_DIR / "public" / "static"),
    static_url_path="/static",
)
app.config["JSON_SORT_KEYS"] = False

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


@app.context_processor
def inject_globals():
    return {
        "profile": data.PROFILE,
        "nav": data.NAV,
        "themes": data.THEMES,
        "year": datetime.now().year,
        # The resume is a plain static file so it also works on GitHub Pages.
        "resume_url": url_for("static", filename=data.PROFILE["resume"]),
        # No server on a static host: the contact form then opens the visitor's mail app.
        "contact_endpoint": "" if app.config.get("STATIC_BUILD") else url_for("api_contact"),
        "site_url": request.url_root,
    }


@app.route("/")
def index():
    return render_template(
        "index.html",
        stats=data.STATS,
        experience=data.EXPERIENCE,
        projects=data.PROJECTS,
        filters=data.PROJECT_FILTERS,
        skills=data.SKILLS,
        marquee=data.MARQUEE,
        education=data.EDUCATION,
        certifications=data.CERTIFICATIONS,
        achievements=data.ACHIEVEMENTS,
        leadership=data.LEADERSHIP,
        languages=data.LANGUAGES,
    )


@app.route("/resume")
def resume():
    """Opens the resume PDF in the browser (add ?download=1 to force a download)."""
    folder, filename = os.path.split(data.PROFILE["resume"])
    return send_from_directory(
        Path(app.static_folder) / folder,
        filename,
        as_attachment=request.args.get("download") == "1",
        download_name="Ashbi_Saju_Resume.pdf",
    )


@app.route("/api/profile")
def api_profile():
    """Public JSON of the portfolio — handy for other apps."""
    return jsonify(
        profile={k: v for k, v in data.PROFILE.items() if k not in ("phone", "phone_link")},
        projects=data.PROJECTS,
        skills=data.SKILLS,
        education=data.EDUCATION,
    )


def _send_email(name, email, subject, message):
    """Send the contact message via SMTP if SMTP_* env vars are configured.

    Returns True when sent, False when SMTP is not configured.
    """
    host = os.environ.get("SMTP_HOST")
    user = os.environ.get("SMTP_USER")
    password = os.environ.get("SMTP_PASS")
    if not (host and user and password):
        return False

    msg = EmailMessage()
    msg["Subject"] = f"[Portfolio] {subject or 'New message'} — {name}"
    msg["From"] = user
    msg["To"] = os.environ.get("CONTACT_TO", data.PROFILE["email"])
    msg["Reply-To"] = email
    msg.set_content(f"From: {name} <{email}>\n\n{message}")

    port = int(os.environ.get("SMTP_PORT", "465"))
    if port == 465:
        with smtplib.SMTP_SSL(host, port, timeout=10) as server:
            server.login(user, password)
            server.send_message(msg)
    else:
        with smtplib.SMTP(host, port, timeout=10) as server:
            server.starttls()
            server.login(user, password)
            server.send_message(msg)
    return True


@app.route("/api/contact", methods=["POST"])
def api_contact():
    payload = request.get_json(silent=True) or request.form
    name = (payload.get("name") or "").strip()[:120]
    email = (payload.get("email") or "").strip()[:200]
    subject = (payload.get("subject") or "").strip()[:200]
    message = (payload.get("message") or "").strip()[:5000]

    # Honeypot field: real visitors never fill it in.
    if (payload.get("company") or "").strip():
        return jsonify(ok=True, message="Thanks!")

    errors = {}
    if len(name) < 2:
        errors["name"] = "Please tell me your name."
    if not EMAIL_RE.match(email):
        errors["email"] = "That email doesn't look right."
    if len(message) < 10:
        errors["message"] = "A few more words, please (10+ characters)."
    if errors:
        return jsonify(ok=False, errors=errors), 400

    try:
        sent = _send_email(name, email, subject, message)
    except Exception as exc:  # pragma: no cover - network dependent
        app.logger.error("Contact email failed: %s", exc)
        sent = False

    if sent:
        return jsonify(ok=True, message="Message sent! I'll get back to you soon.")

    # No SMTP configured: let the browser open the visitor's mail app instead.
    return jsonify(
        ok=True,
        fallback=True,
        message="Opening your mail app to send the message…",
        to=data.PROFILE["email"],
    )


@app.route("/robots.txt")
def robots():
    body = f"User-agent: *\nAllow: /\nSitemap: {request.url_root}sitemap.xml\n"
    return body, 200, {"Content-Type": "text/plain"}


@app.route("/sitemap.xml")
def sitemap():
    home = url_for("index", _external=True)
    resume_pdf = url_for("static", filename=data.PROFILE["resume"], _external=True)
    body = (
        '<?xml version="1.0" encoding="UTF-8"?>'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        f"<url><loc>{home}</loc><priority>1.0</priority></url>"
        f"<url><loc>{resume_pdf}</loc><priority>0.6</priority></url>"
        "</urlset>"
    )
    return body, 200, {"Content-Type": "application/xml"}


@app.errorhandler(404)
def not_found(_e):
    return render_template("404.html"), 404


if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=int(os.environ.get("PORT", 5000)))
