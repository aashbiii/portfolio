"""
Ashbi Saju - Personal Portfolio
Flask Application Entry Point

Run Instructions:
1. Install dependencies: pip install flask
2. Run: python app.py
3. Visit: http://localhost:5000
"""

from flask import Flask, render_template, request, jsonify, send_from_directory
import os

app = Flask(__name__)
app.secret_key = "ashbi_portfolio_2025"

# ─── Portfolio Data ─────────────────────────────────────────────────────────

PROFILE = {
    "name": "Ashbi Saju",
    "title": "MCA Student | Software Developer",
    "email": "ashbi404@gmail.com",
    "location": "Kerala, India",
    "github": "https://github.com/ashbisaju",
    "linkedin": "https://linkedin.com/in/ashbisaju",
    "taglines": [
        "Software Developer",
        "MCA Student",
        "Python Enthusiast",
        "AI & ML Explorer",
        "Full Stack Builder",
    ],
    "about": (
        "I am a passionate Master of Computer Applications student with a strong interest "
        "in software development, artificial intelligence, and modern web technologies. "
        "I enjoy building efficient, scalable, and user-friendly applications that solve "
        "real-world problems. My technical expertise includes Python, Flask, Django, and "
        "database systems, along with experience in integrating hardware and AI solutions."
    ),
}

SKILLS = [
    {"name": "Python",     "level": 90, "icon": "fab fa-python",     "category": "language"},
    {"name": "Flask",      "level": 85, "icon": "fas fa-flask",      "category": "framework"},
    {"name": "Django",     "level": 75, "icon": "fab fa-python",     "category": "framework"},
    {"name": "Java",       "level": 70, "icon": "fab fa-java",       "category": "language"},
    {"name": "C++",        "level": 65, "icon": "fas fa-code",       "category": "language"},
    {"name": "C",          "level": 65, "icon": "fas fa-code",       "category": "language"},
    {"name": "HTML",       "level": 90, "icon": "fab fa-html5",      "category": "web"},
    {"name": "CSS",        "level": 85, "icon": "fab fa-css3-alt",   "category": "web"},
    {"name": "JavaScript", "level": 75, "icon": "fab fa-js",         "category": "web"},
    {"name": "MySQL",      "level": 80, "icon": "fas fa-database",   "category": "database"},
]

PROJECTS = [
    {
        "id": 1,
        "title": "Bookify – Online Trip Booking Hub",
        "short": "Centralized travel booking platform with hotels, flights & trains.",
        "description": (
            "Bookify is a centralized travel booking web application that allows users to "
            "book hotels, flights, and trains from one platform. It provides secure login, "
            "booking management, payment integration, and an admin dashboard."
        ),
        "tech": ["PHP", "MySQL"],
        "icon": "fas fa-plane-departure",
        "color": "#00d4ff",
        "github": "#",
        "demo": "#",
        "featured": True,
    },
    {
        "id": 2,
        "title": "AI-Based Smart Traffic Light Control System",
        "short": "Intelligent traffic management with YOLOv5 & real-time detection.",
        "description": (
            "An intelligent traffic management system using YOLOv5, Arduino UNO, and Android "
            "app to dynamically control traffic lights based on real-time vehicle detection."
        ),
        "tech": ["Python", "Arduino", "YOLOv5", "Java"],
        "icon": "fas fa-traffic-light",
        "color": "#ff6b35",
        "github": "#",
        "demo": "#",
        "featured": True,
    },
]

EDUCATION = [
    {
        "degree": "Master of Computer Applications (MCA)",
        "institution": "Rajagiri College of Social Sciences",
        "period": "2025 – 2027",
        "description": "Pursuing advanced studies in computer applications, AI, and software engineering.",
        "icon": "fas fa-graduation-cap",
        "color": "#00d4ff",
        "current": True,
    },
    {
        "degree": "Bachelor of Computer Applications (BCA)",
        "institution": "De Paul Institute of Science & Technology",
        "period": "2022 – 2025",
        "description": "Completed undergraduate studies with focus on programming, databases, and web technologies.",
        "icon": "fas fa-university",
        "color": "#7c3aed",
        "current": False,
    },
]

ACHIEVEMENTS = [
    {
        "title": "AI Hardware Integration",
        "description": "Successfully integrated YOLOv5 computer vision with Arduino hardware for real-time traffic control.",
        "icon": "fas fa-robot",
        "color": "#00d4ff",
    },
    {
        "title": "Full-Stack Development",
        "description": "Built a complete multi-module travel booking platform handling hotels, flights, and trains.",
        "icon": "fas fa-layer-group",
        "color": "#ff6b35",
    },
    {
        "title": "Cross-Platform Development",
        "description": "Developed Android mobile app that communicates with IoT hardware for traffic management.",
        "icon": "fab fa-android",
        "color": "#22c55e",
    },
    {
        "title": "Database Design",
        "description": "Designed and optimized relational database schemas for large-scale booking and management systems.",
        "icon": "fas fa-database",
        "color": "#f59e0b",
    },
]

# ─── Routes ─────────────────────────────────────────────────────────────────

@app.route("/")
def home():
    return render_template("home.html", profile=PROFILE, active="home")

@app.route("/about")
def about():
    return render_template("about.html", profile=PROFILE, active="about")

@app.route("/skills")
def skills():
    return render_template("skills.html", profile=PROFILE, skills=SKILLS, active="skills")

@app.route("/projects")
def projects():
    return render_template("projects.html", profile=PROFILE, projects=PROJECTS, active="projects")

@app.route("/education")
def education():
    return render_template("education.html", profile=PROFILE, education=EDUCATION, active="education")

@app.route("/achievements")
def achievements():
    return render_template("achievements.html", profile=PROFILE, achievements=ACHIEVEMENTS, active="achievements")

@app.route("/contact")
def contact():
    return render_template("contact.html", profile=PROFILE, active="contact")

@app.route("/send-message", methods=["POST"])
def send_message():
    """Handle contact form submission."""
    data = request.get_json()
    name    = data.get("name", "").strip()
    email   = data.get("email", "").strip()
    subject = data.get("subject", "").strip()
    message = data.get("message", "").strip()

    if not all([name, email, message]):
        return jsonify({"success": False, "message": "Please fill all required fields."}), 400

    # In production, integrate an SMTP / email service here.
    print(f"[Contact] From: {name} <{email}> | Subject: {subject}\n{message}")
    return jsonify({"success": True, "message": "Message sent successfully! I'll get back to you soon."})

@app.route("/download-resume")
def download_resume():
    """Serve resume PDF if available, else return 404 message."""
    resume_path = os.path.join(app.static_folder, "files")
    if os.path.exists(os.path.join(resume_path, "resume.pdf")):
        return send_from_directory(resume_path, "resume.pdf", as_attachment=True)
    return jsonify({"message": "Resume will be available soon!"}), 404

# ─── Run ────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
