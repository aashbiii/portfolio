"""
All portfolio content lives here.
Edit this file to update the website — no HTML changes needed.
"""

PROFILE = {
    "name": "Ashbi Saju",
    "first_name": "Ashbi",
    "last_name": "Saju",
    "initials": "AS",
    "title": "MCA Student & Software Developer",
    "roles": [
        "Software Developer",
        "Full-Stack Builder",
        "AI / ML Engineer",
        "Backend Developer",
        "IoT Tinkerer",
    ],
    "headline": "I build web platforms, AI systems and connected devices that solve real campus-scale problems.",
    "summary": (
        "MCA student and software developer experienced in web development, artificial "
        "intelligence and database systems, with a software development internship and "
        "9 academic projects. Proficient in Python, Java, C#, PHP, Django, Flask and "
        "JavaScript, with an interest in web, backend, full-stack and AI roles."
    ),
    "about": [
        "I'm Ashbi — a Master of Computer Applications student at Rajagiri College of Social "
        "Sciences, Kalamassery, and a developer who enjoys taking an idea all the way from a "
        "database schema to a polished, deployed product.",
        "My work spans Django and Flask platforms, deep-learning models built with PyTorch and "
        "TensorFlow, Android apps, .NET desktop software and ESP32-powered IoT systems. During my "
        "internship at RLabz I was the primary developer of Mentrix, a mentoring platform used "
        "across eight user roles at my college.",
        "Outside code, I've served as President of the Computer Science Students' Association, "
        "won first prizes at inter-collegiate coding competitions and was named Best Outgoing "
        "Student of the Computer Science Department during my BCA.",
    ],
    "email": "ashbi1404@gmail.com",
    "phone": "+91 9656270150",
    "phone_link": "+919656270150",
    "location": "Kerala, India",
    "github": "https://github.com/aashbiii",
    "github_handle": "aashbiii",
    "linkedin": "https://linkedin.com/in/ashbi-saju",
    "linkedin_handle": "ashbi-saju",
    "resume": "files/Ashbi_Saju_Resume.pdf",
    "available": True,
    "availability": "Open to internships & full-time roles",
    "interests": ["Web Development", "Backend Engineering", "Full-Stack", "Artificial Intelligence"],
}

STATS = [
    {"value": 10, "suffix": "", "label": "Projects shipped"},
    {"value": 8, "suffix": "", "label": "User roles in Mentrix"},
    {"value": 87.11, "suffix": "%", "label": "Best model accuracy", "decimals": 2},
    {"value": 25, "suffix": "+", "label": "Technologies used"},
]

EXPERIENCE = [
    {
        "company": "RLabz",
        "role": "Software Development Intern",
        "period": "April 2026 – May 2026",
        "duration": "2 months",
        "location": "Kerala, India",
        "points": [
            "Led development of Mentrix, a Django-based Mentor–Mentee Management System for "
            "Rajagiri College of Social Sciences, as the primary developer in a team project.",
            "Delivered the complete Faculty / Mentor module and made major contributions across "
            "the platform's other modules during the 2-month internship.",
            "Integrated domain-locked Google OAuth2, single-session enforcement, digitally signed "
            "PDF reports and an on-premise Llama 3.2 assistant via Ollama.",
        ],
        "stack": ["Django", "Python", "MySQL", "Ollama", "Google OAuth2"],
    },
]

PROJECTS = [
    {
        "slug": "mentrix",
        "title": "Mentrix",
        "subtitle": "Mentor–Mentee Management Platform",
        "category": "web",
        "featured": True,
        "year": "2026",
        "icon": "users",
        "accent": "#8b5cf6",
        "stack": ["Django", "Python", "Ollama", "Llama 3.2", "MySQL", "OAuth2"],
        "summary": "A college-wide mentoring platform serving 8 user roles, with private on-premise AI.",
        "points": [
            "Led development of a college mentoring platform serving 8 user roles across students, "
            "faculty, department heads and administration.",
            "Implemented domain-locked Google OAuth2 login, single-session enforcement and digitally "
            "signed PDF reports.",
            "Integrated on-premise AI (Ollama, Llama 3.2) for session suggestions with 0% cloud data "
            "exposure.",
            "Built WHO 10 core life-skills wellness tracking for mentees.",
        ],
        "metrics": [("8", "user roles"), ("0%", "cloud data exposure"), ("10", "life skills tracked")],
        "github": "https://github.com/aashbiii",
    },
    {
        "slug": "smart-traffic",
        "title": "Smart Traffic Control",
        "subtitle": "AI-Based Traffic Light System with Emergency Preemption",
        "category": "ai",
        "featured": True,
        "year": "2025",
        "icon": "traffic",
        "accent": "#f97316",
        "stack": ["Python", "YOLOv5", "Arduino", "Java", "Android", "Flask API"],
        "summary": "Signals that adapt to live YOLOv5 vehicle counts and clear the way for ambulances.",
        "points": [
            "Designed a traffic controller that adjusts signals from live YOLOv5 vehicle counts and "
            "gives immediate green to detected emergency vehicles (ambulance, fire truck, police).",
            "Connected an Arduino UNO to physical LED signals over a 9600-baud serial link using "
            "compact 2-character commands.",
            "Built an Android app for remote monitoring and manual override, backed by a "
            "multithreaded Flask REST API.",
            "Supervisory desktop simulator shows road state, countdown timers and vehicle tallies.",
        ],
        "metrics": [("9600", "baud serial link"), ("3", "emergency classes"), ("4", "system tiers")],
        "github": "https://github.com/aashbiii/AI-Traffic-Controller-Emergency-Preemption",
    },
    {
        "slug": "micro-grid",
        "title": "Campus Micro-Grid",
        "subtitle": "IoT Energy Monitoring & Optimization System",
        "category": "iot",
        "featured": True,
        "year": "2026",
        "icon": "bolt",
        "accent": "#22c55e",
        "stack": ["Python", "Flask", "MQTT", "ESP32", "Scikit-Learn", "Streamlit", "Chart.js"],
        "summary": "Live telemetry from 4 labs, automatic idle cut-off and 6-hour ML demand forecasts.",
        "points": [
            "Architected an IoT power-monitoring system for 4 campus laboratories, streaming voltage, "
            "current, power factor and frequency over MQTT every 5 seconds.",
            "Automated a 30-second idle relay cut-off below 150 W with one-click remote restore.",
            "Trained per-lab Gradient Boosting models for rolling 6-hour demand forecasts.",
            "Shipped dual dashboards: a real-time Flask + Chart.js console and a Streamlit / Plotly "
            "analytics view with energy and CO₂ savings audit trails.",
        ],
        "metrics": [("4", "labs monitored"), ("150 W", "idle threshold"), ("6 h", "forecast horizon")],
        "github": "https://github.com/aashbiii/Campus-Microgrid-IoT-Optimization",
    },
    {
        "slug": "fake-vs-real",
        "title": "Fake vs Real Image Detection",
        "subtitle": "Transfer Learning with EfficientNetB0",
        "category": "ai",
        "featured": True,
        "year": "2025",
        "icon": "eye",
        "accent": "#06b6d4",
        "stack": ["TensorFlow", "Keras", "EfficientNetB0", "Python"],
        "summary": "Spotting AI-generated images with a fine-tuned EfficientNetB0 — 87.11% accuracy.",
        "points": [
            "Fine-tuned EfficientNetB0 on the 120,000-image CIFAKE dataset with a two-phase "
            "training strategy.",
            "Reached 87.11% accuracy and a 0.87 F1-score on 20,000 unseen images.",
            "Completed training in under 30 minutes of GPU time.",
        ],
        "metrics": [("87.11%", "accuracy"), ("0.87", "F1-score"), ("120K", "training images")],
        "github": "https://github.com/aashbiii/Fake-vs-Real-Image-Detection",
    },
    {
        "slug": "exam-engine",
        "title": "Networked Exam Engine",
        "subtitle": "Examination & Assessment Desktop Platform",
        "category": "desktop",
        "featured": False,
        "year": "2026",
        "icon": "check",
        "accent": "#3b82f6",
        "stack": ["C#", ".NET Framework 4.8", "WinForms", "SQL Server"],
        "summary": "Timed exams with auto-submit, SHA-256 security and question-wise scorecards.",
        "points": [
            "Engineered a desktop exam platform with 2 user roles (administrator and student).",
            "SHA-256 password hashing, parameterised queries and atomic SQL transactions.",
            "Timed tests with a colour-coded question palette and automatic submission at zero.",
            "Single-attempt guarantee enforced in both the app and a database constraint, with "
            "instant question-wise scorecards.",
        ],
        "metrics": [("2", "user roles"), ("SHA-256", "hashing"), ("40", "seeded MCA questions")],
        "github": "https://github.com/aashbiii/Networked-Exam-Engine",
    },
    {
        "slug": "hall-booking",
        "title": "RCSS Hall Booking",
        "subtitle": "Android Venue Reservation App",
        "category": "mobile",
        "featured": False,
        "year": "2026",
        "icon": "calendar",
        "accent": "#eab308",
        "stack": ["Java", "Android SDK", "SQLite", "Material 3"],
        "summary": "Digitises hall requests for 5 auditoriums and 11 departments — no double-bookings.",
        "points": [
            "Created an Android app digitising hall requests for 5 auditoriums and 11 departments.",
            "Prevents double-booking across 3 daily time slots with SQL conflict checks.",
            "Role-based workflows: requesters track PENDING / APPROVED / REJECTED status, managers "
            "review requests and edit hall details.",
        ],
        "metrics": [("5", "auditoriums"), ("11", "departments"), ("3", "daily slots")],
        "github": "https://github.com/aashbiii/HallBookingSystem",
    },
    {
        "slug": "bookify",
        "title": "BOOKIFY",
        "subtitle": "Online Trip Booking Hub",
        "category": "web",
        "featured": False,
        "year": "2024",
        "icon": "plane",
        "accent": "#14b8a6",
        "stack": ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
        "summary": "One travel portal for hotels, flights and trains — with payments and admin reports.",
        "points": [
            "Implemented a travel portal unifying 3 booking services: hotel, flight and train.",
            "Authentication, payments and cancellations for travellers.",
            "Admin panel with booking management and revenue reports.",
        ],
        "metrics": [("3", "booking services"), ("Admin", "revenue reports"), ("Full", "booking lifecycle")],
        "github": "https://github.com/aashbiii",
    },
    {
        "slug": "placement-prediction",
        "title": "Placement Prediction",
        "subtitle": "Campus Placement & Package Estimation",
        "category": "ai",
        "featured": False,
        "year": "2026",
        "icon": "chart",
        "accent": "#a855f7",
        "stack": ["Python", "Scikit-Learn", "XGBoost", "Pandas"],
        "summary": "Predicts placement probability and salary package (LPA) from student profiles.",
        "points": [
            "Compared Scikit-Learn and XGBoost models for 2 prediction tasks.",
            "Classification: placement probability with stratified 5-fold CV and GridSearchCV.",
            "Regression: salary package in LPA evaluated with MAE, MSE and R².",
        ],
        "metrics": [("2", "prediction tasks"), ("3,000", "student records"), ("5-fold", "cross-validation")],
        "github": "https://github.com/aashbiii/Campus-Placement-Prediction-ML",
    },
    {
        "slug": "kuttystories",
        "title": "KuttyStories",
        "subtitle": "Photographer Portfolio & Booking Platform",
        "category": "web",
        "featured": False,
        "year": "2026",
        "icon": "camera",
        "accent": "#f43f5e",
        "stack": ["Python", "Flask", "SQLite", "DB-API 2.0"],
        "summary": "A Flask studio site with bookings, gallery management and ACID-safe data access.",
        "points": [
            "Public site to browse portfolio categories, packages and submit date-validated bookings.",
            "Studio dashboard to filter bookings, update statuses and manage the gallery.",
            "Pure DB-API 2.0 data layer with parameterised queries, commits and rollbacks.",
        ],
        "metrics": [("CRUD", "bookings & gallery"), ("ACID", "transactions"), ("4", "booking states")],
        "github": "https://github.com/aashbiii/photobooking",
    },
    {
        "slug": "java-ecommerce",
        "title": "E-Commerce System",
        "subtitle": "Java Swing Desktop Store with Oracle",
        "category": "desktop",
        "featured": False,
        "year": "2025",
        "icon": "cart",
        "accent": "#0ea5e9",
        "stack": ["Java", "Swing", "Oracle 21c", "JDBC"],
        "summary": "Catalogue, cart, checkout, inventory and order tracking on an Oracle database.",
        "points": [
            "Customer registration, product catalogue with search and category filters.",
            "Cart with live subtotal / tax / total and atomic order creation.",
            "Admin inventory control and detailed order history with delivery status.",
        ],
        "metrics": [("Oracle", "21c database"), ("6+", "app modules"), ("Swing", "Nimbus UI")],
        "github": "https://github.com/aashbiii/ECommerceSystem",
    },
]

# ---------------------------------------------------------------------------
# README summaries and screenshots, taken from each project's GitHub repository.
# Screenshots live in public/static/img/projects/<slug>-N.webp.
# "github": None hides the repo button (the code isn't public).
# ---------------------------------------------------------------------------
PROJECT_DETAILS = {
    "mentrix": {
        "github": None,
        "repo_note": "Built during the RLabz internship — source code is private.",
        "readme": (
            "Mentrix is Rajagiri College's mentor–mentee management system. Students, mentors, "
            "department heads and administrators each get their own dashboard, sign in with a "
            "college-only Google account, and keep every mentoring session, report and wellness "
            "check in one place. An on-premise Llama 3.2 model suggests session topics without "
            "any student data leaving the campus."
        ),
        "shots": [],
    },
    "smart-traffic": {
        "readme": (
            "A two-road smart traffic signal. A YOLOv5 model counts the vehicles waiting on each "
            "road and the controller adjusts the green-light timer. When an emergency vehicle is "
            "detected, the opposite road's green is cut to 5 seconds so it can pass. A PyQt5 "
            "desktop app drives six LEDs on an Arduino UNO over serial, and a Flask REST API lets "
            "a mobile app monitor and override the lights."
        ),
        "shots": [
            ("smart-traffic-1.webp", "YOLOv5 counting mixed traffic"),
            ("smart-traffic-2.webp", "Ambulance detected — emergency preemption"),
            ("smart-traffic-3.webp", "Arduino LED signal hardware"),
            ("smart-traffic-4.webp", "Android companion app (light & dark)"),
        ],
    },
    "micro-grid": {
        "readme": (
            "An IoT energy-monitoring system for four computer labs at Rajagiri College, built by "
            "Team PIXEL. ESP32 nodes stream voltage, current and power over MQTT; a Python core "
            "stores the telemetry in SQLite, automatically trips a lab's relay when it sits idle "
            "below 150 W, and forecasts the next 6 hours of demand with Gradient Boosting models."
        ),
        "shots": [
            ("micro-grid-1.webp", "Live Flask dashboard for all four labs"),
            ("micro-grid-2.webp", "Telemetry and 6-hour demand forecast"),
        ],
    },
    "fake-vs-real": {
        "readme": (
            "A research project that detects AI-generated images (Stable Diffusion / GANs) versus "
            "real camera photos. An ImageNet-pretrained EfficientNetB0 backbone is fine-tuned on "
            "the 120,000-image CIFAKE benchmark with real-time augmentation, reaching 87.11% "
            "accuracy on 20,000 unseen test images."
        ),
        "shots": [
            ("fake-vs-real-1.webp", "Sample predictions on unseen images"),
            ("fake-vs-real-2.webp", "Training and validation accuracy"),
            ("fake-vs-real-3.webp", "Confusion matrix on the test set"),
        ],
    },
    "exam-engine": {
        "readme": (
            "A Windows desktop exam platform: admins build MCQ exams and question banks, students "
            "take timed tests that auto-submit when time runs out, and both sides get "
            "question-by-question scorecards. Built with C# WinForms on .NET Framework 4.8 and "
            "SQL Server, with SHA-256 passwords and one attempt per exam enforced in the database."
        ),
        "shots": [
            ("exam-engine-1.webp", "Administrator dashboard"),
            ("exam-engine-2.webp", "Sign-in for students and administrators"),
            ("exam-engine-3.webp", "Student exam catalogue"),
        ],
    },
    "hall-booking": {
        "readme": (
            "A native Android app that replaces paper requisition letters for booking halls at "
            "Rajagiri College. Students and staff pick a hall, date and slot; clashes with pending "
            "or approved bookings are rejected instantly, and hall managers approve or reject "
            "requests from their own dashboard with a receipt number."
        ),
        "shots": [
            ("hall-booking-1.webp", "Auditorium photos shown in the app"),
            ("hall-booking-2.webp", "Seminar hall listing"),
            ("hall-booking-3.webp", "Conference hall listing"),
        ],
    },
    "bookify": {
        "github": None,
        "repo_note": "Academic project — source code not published.",
        "readme": (
            "BOOKIFY brings hotel, flight and train bookings into one PHP and MySQL travel portal. "
            "Travellers sign in, book, pay and cancel in one place, while administrators manage "
            "every booking and see revenue reports."
        ),
        "shots": [],
    },
    "placement-prediction": {
        "readme": (
            "A dual-objective machine-learning system built on 3,000 student profiles. It "
            "classifies whether a student will be placed (XGBoost: 84.33% accuracy, ROC-AUC "
            "0.925) and predicts the offered package in LPA (Ridge regression: R² 0.938), and "
            "highlights which factors — CGPA, coding scores, internships — matter most."
        ),
        "metrics": [("84.33%", "placement accuracy"), ("0.925", "ROC-AUC"), ("0.938", "R² for package")],
        "shots": [
            ("placement-prediction-1.webp", "ROC curves — Random Forest vs XGBoost"),
            ("placement-prediction-2.webp", "Actual vs predicted package"),
            ("placement-prediction-3.webp", "Most important features"),
        ],
    },
    "kuttystories": {
        "readme": (
            "KuttyStories is a Kerala photographer's portfolio and booking site built with Flask "
            "and SQLite. Visitors browse a filterable gallery, check session pricing and request a "
            "booking; the photographer manages bookings and the portfolio from a "
            "password-protected studio dashboard. All data access follows Python's DB-API 2.0."
        ),
        "shots": [
            ("kuttystories-1.webp", "Home page"),
            ("kuttystories-2.webp", "Filterable portfolio gallery"),
            ("kuttystories-3.webp", "Booking form"),
            ("kuttystories-4.webp", "Studio admin dashboard"),
        ],
    },
    "java-ecommerce": {
        "readme": (
            "A desktop shopping and inventory app built with Java Swing and Oracle Database 21c "
            "over JDBC. Admins manage products, customers and orders; customers browse the "
            "catalogue, fill a cart and track orders from pending to delivered. Checkout writes "
            "the order, its items and the stock update in one transaction."
        ),
        "shots": [
            ("java-ecommerce-1.webp", "Admin dashboard"),
            ("java-ecommerce-2.webp", "Shop and cart"),
            ("java-ecommerce-3.webp", "Product management"),
            ("java-ecommerce-4.webp", "Order management"),
        ],
    },
}

for _p in PROJECTS:
    _d = PROJECT_DETAILS.get(_p["slug"], {})
    _p.update(_d)
    _p["shots"] = [{"src": f"img/projects/{f}", "caption": c} for f, c in _d.get("shots", [])]
    _p.setdefault("repo_note", "")
    _p.setdefault("live", None)

PROJECT_FILTERS = [
    ("all", "All"),
    ("web", "Web"),
    ("ai", "AI / ML"),
    ("iot", "IoT"),
    ("mobile", "Mobile"),
    ("desktop", "Desktop"),
]

SKILLS = [
    {
        "group": "Programming",
        "icon": "code",
        "items": ["Python", "Java", "C++", "C#", "C", "PHP", "JavaScript", "SQL"],
    },
    {
        "group": "Web Development",
        "icon": "globe",
        "items": ["Django", "Flask", "HTML", "CSS", "JavaScript", "PHP"],
    },
    {
        "group": "Tools",
        "icon": "tool",
        "items": ["VS Code", "Android Studio", "Git", "GitHub", "XAMPP", "Postman", "Arduino IDE", "Linux"],
    },
    {
        "group": "Core Concepts",
        "icon": "brain",
        "items": ["Artificial Intelligence", "Machine Learning"],
    },
    {
        "group": "Databases",
        "icon": "db",
        "items": ["MySQL", "Oracle", "SQLite", "SQL Server"],
    },
    {
        "group": "IoT / Embedded",
        "icon": "chip",
        "items": ["MQTT", "ESP32", "Arduino", "REST APIs"],
    },
    {
        "group": "Deployment",
        "icon": "cloud",
        "items": ["Render", "Vercel", "Netlify", "GitHub Pages", "AWS"],
    },
]

MARQUEE = [
    "Python", "Django", "Flask", "Java", "C#", ".NET", "PHP", "JavaScript",
    "MySQL", "Oracle", "SQL Server", "SQLite", "ESP32", "MQTT", "Arduino", "Android",
    "AI", "Machine Learning", "Git", "GitHub", "Vercel", "AWS",
]

EDUCATION = [
    {
        "course": "Master of Computer Applications (MCA)",
        "short": "MCA",
        "institute": "Rajagiri College of Social Sciences (Autonomous), Kalamassery",
        "board": "Autonomous, affiliated to Mahatma Gandhi University",
        "year": "2025 – 2027",
        "score": "CGPA 7.68 / 10",
        "note": "Currently pursuing",
        "current": True,
    },
    {
        "course": "Bachelor of Computer Applications (BCA)",
        "short": "BCA",
        "institute": "De Paul Institute of Science & Technology, Angamaly",
        "board": "Mahatma Gandhi University",
        "year": "2022 – 2025",
        "score": "CGPA 8.3 / 10",
        "note": "Best Outgoing Student, CS Department",
        "current": False,
    },
    {
        "course": "Higher Secondary (Class XII)",
        "short": "12th",
        "institute": "Sacred Heart English Medium School, Mookkannur, Angamaly",
        "board": "CBSE",
        "year": "2022",
        "score": "74.4%",
        "note": "",
        "current": False,
    },
    {
        "course": "Secondary School (Class X)",
        "short": "10th",
        "institute": "Sacred Heart English Medium School, Mookkannur, Angamaly",
        "board": "CBSE",
        "year": "2020",
        "score": "73.6%",
        "note": "",
        "current": False,
    },
]

CERTIFICATIONS = [
    {"title": "AI and ML using Python", "issuer": "Cozmek Pvt Ltd", "detail": "Completed with 93% marks"},
    {"title": "Full Stack Java", "issuer": "Archon Solutions", "detail": "Course completion"},
]

ACHIEVEMENTS = [
    {"title": "Best Outgoing Student", "detail": "Computer Science Department during BCA.", "icon": "trophy"},
    {"title": "First Prize — Coding", "detail": "Coding competitions at inter-collegiate technical fests.", "icon": "medal"},
    {"title": "Paper Presentation", "detail": "Presented a technical paper on AI-Based Healthcare.", "icon": "paper"},
]

LEADERSHIP = [
    {"title": "President", "detail": "Computer Science Students' Association."},
    {"title": "Event Coordinator & Volunteer", "detail": "College fests and technical events."},
    {"title": "Class Representative", "detail": "Voice of the class to faculty and administration."},
]

LANGUAGES = [
    {"name": "English", "level": "Professional proficiency", "value": 85},
    {"name": "Malayalam", "level": "Native proficiency", "value": 100},
]

THEMES = [
    {"id": "obsidian", "name": "Obsidian", "swatch": ["#0b0b12", "#8b5cf6", "#22d3ee"]},
    {"id": "aurora", "name": "Aurora", "swatch": ["#05130f", "#34d399", "#a3e635"]},
    {"id": "ember", "name": "Ember", "swatch": ["#140b07", "#f97316", "#facc15"]},
    {"id": "ivory", "name": "Ivory", "swatch": ["#f7f5f0", "#4f46e5", "#e11d48"]},
]

NAV = [
    ("about", "About"),
    ("experience", "Experience"),
    ("projects", "Work"),
    ("skills", "Skills"),
    ("education", "Education"),
    ("contact", "Contact"),
]
