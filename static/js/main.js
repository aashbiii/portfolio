/* ═══════════════════════════════════════════════════════════════════════
   Ashbi Saju Portfolio – Main JavaScript
   ═══════════════════════════════════════════════════════════════════════ */

// ── Theme ──────────────────────────────────────────────────────────────
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle?.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ── Cursor ─────────────────────────────────────────────────────────────
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  if (cursorDot) {
    cursorDot.style.left  = mouseX + 'px';
    cursorDot.style.top   = mouseY + 'px';
  }
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  if (cursorRing) {
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
  }
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .glass-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing?.classList.add('expand'));
  el.addEventListener('mouseleave', () => cursorRing?.classList.remove('expand'));
});

// ── Navbar scroll effect ───────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 20);
  document.getElementById('scrollTop')?.classList.toggle('visible', window.scrollY > 300);
});

// ── Hamburger ─────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close nav when link clicked
navLinks?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Scroll-to-top ──────────────────────────────────────────────────────
document.getElementById('scrollTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Reveal on scroll ──────────────────────────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // Animate skill bars when visible
      e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.level + '%';
      });
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Also observe glass-cards
document.querySelectorAll('.glass-card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(24px)';
  card.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        // trigger skill bars inside
        card.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.level + '%';
        });
        obs.unobserve(card);
      }
    });
  }, { threshold: 0.1 });
  obs.observe(card);
});

// ── Typing effect ─────────────────────────────────────────────────────
const typedEl = document.getElementById('typedText');
if (typedEl) {
  const words = JSON.parse(typedEl.dataset.words || '[]');
  let wi = 0, ci = 0, deleting = false;

  function type() {
    const current = words[wi];
    typedEl.textContent = deleting ? current.slice(0, --ci) : current.slice(0, ++ci);

    let delay = deleting ? 60 : 110;
    if (!deleting && ci === current.length) { delay = 2000; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 300; }

    setTimeout(type, delay);
  }
  type();
}

// ── Contact form ───────────────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
const formStatus  = document.getElementById('formStatus');

contactForm?.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

  const payload = {
    name:    contactForm.name.value,
    email:   contactForm.email.value,
    subject: contactForm.subject?.value || '',
    message: contactForm.message.value,
  };

  try {
    const res  = await fetch('/send-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    showStatus(data.success ? 'success' : 'error', data.message);
    if (data.success) contactForm.reset();
  } catch {
    showStatus('error', 'Network error. Please try again.');
  }

  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
});

function showStatus(type, msg) {
  if (!formStatus) return;
  formStatus.textContent = msg;
  formStatus.className   = 'form-status ' + type;
  formStatus.style.display = 'block';
  setTimeout(() => formStatus.style.display = 'none', 5000);
}

// ── Particles (lightweight) ────────────────────────────────────────────
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  window.addEventListener('resize', () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; });

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 1.5 + 0.5,
    alpha: Math.random() * 0.4 + 0.1,
  }));

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? `rgba(0,212,255,${p.alpha})` : `rgba(0,100,200,${p.alpha * 0.5})`;
      ctx.fill();
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}
