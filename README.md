# Ashbi Saju – Personal Portfolio

A professional personal portfolio website built with **Python Flask**, featuring:

- 🎨 Glassmorphism UI with Dark/Light theme toggle
- ✨ Smooth animations & typing effect
- 📱 Fully mobile responsive
- 🖱️ Custom cursor
- 💬 Contact form with AJAX submission
- 📊 Animated skill progress bars

## Project Structure

```
portfolio/
├── app.py                  # Flask routes & data
├── requirements.txt
├── static/
│   ├── css/main.css        # All styles (glassmorphism + themes)
│   ├── js/main.js          # Interactions, cursor, typing, form
│   └── images/             # Add your images here
└── templates/
    ├── base.html           # Navbar, footer, cursor (shared layout)
    ├── home.html
    ├── about.html
    ├── skills.html
    ├── projects.html
    ├── education.html
    ├── achievements.html
    └── contact.html
```

## Quick Start

```bash
# 1. Navigate to project folder
cd portfolio

# 2. (Optional) Create virtual environment
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run the app
python app.py

# 5. Open browser
# http://localhost:5000
```

## Adding a Resume

Place your `resume.pdf` in `static/files/` and the download button will work automatically.

## Production Deployment

For production, use Gunicorn:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```
