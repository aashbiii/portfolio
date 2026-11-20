/* ==========================================================================
   Ashbi Saju — Portfolio interactions
   GSAP + ScrollTrigger + Flip + Lenis. Everything degrades gracefully if a
   library fails to load or the visitor prefers reduced motion.
   ========================================================================== */
(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const G = window.gsap;
  const ST = window.ScrollTrigger;
  const Flip = window.Flip;
  const motion = !!G && !reduce;

  if (G && ST) G.registerPlugin(ST);
  if (G && Flip) G.registerPlugin(Flip);

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  /* ---------- Text splitting ---------- */
  function splitChars(el) {
    if (el.dataset.splitDone) return $$(".char", el);
    const text = el.textContent.trim();
    el.textContent = "";
    el.setAttribute("aria-label", text);
    const chars = [];
    text.split(/(\s+)/).forEach((chunk) => {
      if (/^\s+$/.test(chunk)) { el.appendChild(document.createTextNode(" ")); return; }
      const word = document.createElement("span");
      word.style.display = "inline-block";
      word.style.whiteSpace = "nowrap";
      word.setAttribute("aria-hidden", "true");
      for (const c of chunk) {
        const s = document.createElement("span");
        s.className = "char";
        s.textContent = c;
        word.appendChild(s);
        chars.push(s);
      }
      el.appendChild(word);
    });
    el.dataset.splitDone = "1";
    return chars;
  }

  function splitWords(el) {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w) => `<span class="word">${w}</span>`).join(" ");
    return $$(".word", el);
  }

  /* ---------- Smooth scroll (Lenis) ---------- */
  let lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new window.Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    if (G && ST) {
      lenis.on("scroll", ST.update);
      G.ticker.add((t) => lenis.raf(t * 1000));
      G.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  function scrollToTarget(target) {
    const el = typeof target === "string" ? (target === "#top" ? 0 : $(target)) : target;
    if (el === null || el === undefined) return;
    if (lenis) lenis.scrollTo(el, { offset: el === 0 ? 0 : -20, duration: 1.4 });
    else if (el === 0) window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute("href");
    if (href.length < 2) return;
    e.preventDefault();
    closeMenu();
    scrollToTarget(href);
  });
  $$("[data-to-top]").forEach((b) => b.addEventListener("click", () => scrollToTarget("#top")));

  /* ---------- Preloader + hero intro ---------- */
  const loader = $("[data-loader]");
  function heroIntro() {
    const chars = $$("[data-hero-split]").flatMap(splitChars);
    if (!motion) return;
    const tl = G.timeline({ defaults: { ease: "expo.out" } });
    tl.from(chars, { yPercent: 120, rotate: 8, duration: 1.4, stagger: 0.045 })
      .from("[data-hero-fade]", { y: 30, opacity: 0, duration: 1.1, stagger: 0.08 }, "-=1.05")
      .from(".hero__blob", { scale: 0.4, opacity: 0, duration: 1.6 }, 0.1)
      .from(".hero__img", { yPercent: 18, opacity: 0, duration: 1.6 }, 0.25)
      .from(".hero__orbit", { scale: 0.6, opacity: 0, duration: 1.4, stagger: 0.1 }, 0.3)
      .from(".chip, .hero__badge", { scale: 0, opacity: 0, duration: 1, stagger: 0.1, ease: "back.out(1.8)" }, 0.8)
      .from(".nav", { y: -40, opacity: 0, duration: 1 }, 0.4)
      .from(".hero__scroll", { opacity: 0, duration: 1 }, 1);
  }

  function runLoader() {
    if (!loader) { heroIntro(); return; }
    if (!motion) { loader.remove(); heroIntro(); return; }
    document.body.classList.add("is-loading");
    if (lenis) lenis.stop();
    const seen = sessionStorage.getItem("ashbi-seen");
    const count = { v: 0 };
    const out = $("[data-loader-count]");
    const tl = G.timeline({
      onComplete() {
        loader.remove();
        document.body.classList.remove("is-loading");
        if (lenis) lenis.start();
        try { sessionStorage.setItem("ashbi-seen", "1"); } catch (e) {}
        ST && ST.refresh();
      },
    });
    tl.from(".loader__name > *", { yPercent: 110, duration: 0.9, stagger: 0.08, ease: "expo.out" })
      .to(count, { v: 100, duration: seen ? 0.5 : 1.5, ease: "power2.inOut", onUpdate: () => { out.textContent = Math.round(count.v); } }, 0.1)
      .to("[data-loader-bar]", { scaleX: 1, duration: seen ? 0.5 : 1.5, ease: "power2.inOut" }, 0.1)
      .to(".loader__inner", { yPercent: -40, opacity: 0, duration: 0.6, ease: "power3.in" })
      .to(".loader__panel", { yPercent: -100, duration: 1, ease: "expo.inOut" }, "-=0.2")
      .add(heroIntro, "-=0.55");
  }

  /* ---------- Theme switching ---------- */
  const dock = $("[data-theme-dock]");
  const dockToggle = $("[data-theme-toggle]");
  function markTheme() {
    const t = root.getAttribute("data-theme");
    $$("[data-set-theme]").forEach((b) => {
      const on = b.dataset.setTheme === t;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-checked", on ? "true" : "false");
    });
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", getComputedStyle(root).getPropertyValue("--bg").trim());
    window.dispatchEvent(new CustomEvent("themechange"));
  }
  function applyTheme(theme, x, y) {
    if (theme === root.getAttribute("data-theme")) return;
    const swap = () => { root.setAttribute("data-theme", theme); store.set("ashbi-theme", theme); markTheme(); };
    if (!document.startViewTransition || reduce) { swap(); return; }
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = document.startViewTransition(swap);
    vt.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 900, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  }
  if (dock) {
    dockToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = dock.classList.toggle("is-open");
      dockToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $$("[data-set-theme]").forEach((b) =>
      b.addEventListener("click", (e) => {
        const rect = b.getBoundingClientRect();
        const x = e.clientX || rect.left + rect.width / 2;
        const y = e.clientY || rect.top + rect.height / 2;
        applyTheme(b.dataset.setTheme, x, y);
        setTimeout(() => dock.classList.remove("is-open"), 250);
      })
    );
    document.addEventListener("click", (e) => { if (!dock.contains(e.target)) dock.classList.remove("is-open"); });
    markTheme();
  }

  /* ---------- Custom cursor ---------- */
  const cursor = $(".cursor");
  if (cursor && finePointer && G && !reduce) {
    root.classList.add("has-cursor");
    const dot = $(".cursor__dot"), ring = $(".cursor__ring"), label = $(".cursor__label");
    const dx = G.quickTo(dot, "x", { duration: 0.08 }), dy = G.quickTo(dot, "y", { duration: 0.08 });
    const rx = G.quickTo(ring, "x", { duration: 0.45, ease: "power3" }), ry = G.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
    window.addEventListener("pointermove", (e) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); }, { passive: true });
    window.addEventListener("pointerdown", () => cursor.classList.add("is-down"));
    window.addEventListener("pointerup", () => cursor.classList.remove("is-down"));
    document.addEventListener("pointerover", (e) => {
      const t = e.target.closest("[data-cursor], a, button, [role='button'], .tag");
      cursor.classList.remove("is-hover", "is-label");
      if (!t) return;
      if (t.dataset.cursor) { label.textContent = t.dataset.cursor; cursor.classList.add("is-label"); }
      else cursor.classList.add("is-hover");
    });
    document.addEventListener("pointerleave", () => G.to([dot, ring], { opacity: 0, duration: 0.3 }));
    document.addEventListener("pointerenter", () => G.to([dot, ring], { opacity: 1, duration: 0.3 }));
  }

  /* ---------- Magnetic elements & button fill origin ---------- */
  if (G && finePointer && !reduce) {
    $$(".magnetic").forEach((el) => {
      const xTo = G.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
      const yTo = G.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const strength = el.classList.contains("btn") ? 0.25 : 0.4;
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      });
      el.addEventListener("pointerleave", () => { xTo(0); yTo(0); });
    });
  }
  document.addEventListener("pointerover", (e) => {
    const b = e.target.closest(".btn--primary");
    if (!b) return;
    const r = b.getBoundingClientRect();
    b.style.setProperty("--mx", `${e.clientX - r.left}px`);
    b.style.setProperty("--my", `${e.clientY - r.top}px`);
  });

  /* ---------- Spotlight cards ---------- */
  document.addEventListener("pointermove", (e) => {
    const el = e.target.closest(".spotlight");
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - r.left}px`);
    el.style.setProperty("--sy", `${e.clientY - r.top}px`);
  }, { passive: true });

  /* ---------- 3D tilt ---------- */
  if (G && finePointer && !reduce) {
    $$("[data-tilt]").forEach((el) => {
      G.set(el, { transformPerspective: 900 });
      const rX = G.quickTo(el, "rotationX", { duration: 0.6, ease: "power3" });
      const rY = G.quickTo(el, "rotationY", { duration: 0.6, ease: "power3" });
      const max = el.classList.contains("card") ? 7 : 10;
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        rY((px - 0.5) * max * 2);
        rX(-(py - 0.5) * max * 2);
        el.style.setProperty("--gx", `${px * 100}%`);
        el.style.setProperty("--gy", `${py * 100}%`);
      });
      el.addEventListener("pointerleave", () => { rX(0); rY(0); });
    });
  }

  /* ---------- Navigation ---------- */
  const nav = $("[data-nav]");
  const pill = $("[data-nav-pill]");
  const navLinks = $$("[data-nav-link]");
  let lastY = 0;
  function onScroll() {
    const y = window.scrollY;
    if (!nav) return;
    nav.classList.toggle("is-scrolled", y > 40);
    const menuOpen = root.classList.contains("menu-open");
    nav.classList.toggle("is-hidden", !menuOpen && y > lastY && y > 400);
    lastY = y;
    const bar = $(".progress span");
    const max = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function movePill(link) {
    if (!pill) return;
    if (!link) { pill.style.opacity = "0"; return; }
    const parent = link.parentElement.getBoundingClientRect();
    const r = link.getBoundingClientRect();
    if (G) G.to(pill, { x: r.left - parent.left, width: r.width, opacity: 1, duration: 0.6, ease: "expo.out" });
    else { pill.style.transform = `translateX(${r.left - parent.left}px)`; pill.style.width = `${r.width}px`; pill.style.opacity = "1"; }
  }
  const sections = navLinks.map((l) => $("#" + l.dataset.navLink)).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        navLinks.forEach((l) => l.classList.toggle("is-active", l.dataset.navLink === en.target.id));
        movePill(navLinks.find((l) => l.dataset.navLink === en.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => io.observe(s));
    const hero = $("[data-hero]");
    if (hero) new IntersectionObserver(([en]) => { if (en.isIntersecting) { navLinks.forEach((l) => l.classList.remove("is-active")); movePill(null); } }, { rootMargin: "-45% 0px -50% 0px" }).observe(hero);
  }

  /* ---------- Mobile menu ---------- */
  const burger = $("[data-burger]");
  const menu = $("[data-menu]");
  let menuTl = null;
  if (menu && G) {
    menuTl = G.timeline({ paused: true, defaults: { ease: "expo.inOut" } })
      .set(menu, { visibility: "visible" })
      .to(".menu__bg", { clipPath: "circle(150% at calc(100% - 50px) 45px)", duration: 1 })
      .from(".menu__txt", { yPercent: 110, duration: 0.9, stagger: 0.05, ease: "expo.out" }, "-=0.55")
      .from(".menu__num", { opacity: 0, duration: 0.5, stagger: 0.05 }, "<")
      .to(".menu__foot", { opacity: 1, duration: 0.5 }, "-=0.5");
  }
  function openMenu() {
    root.classList.add("menu-open");
    burger.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
    if (lenis) lenis.stop();
    if (menuTl) menuTl.timeScale(1).play(); else menu.style.visibility = "visible";
  }
  function closeMenu() {
    if (!root.classList.contains("menu-open")) return;
    root.classList.remove("menu-open");
    burger.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
    if (lenis) lenis.start();
    if (menuTl) menuTl.timeScale(1.6).reverse(); else menu.style.visibility = "hidden";
  }
  if (burger) burger.addEventListener("click", () => (root.classList.contains("menu-open") ? closeMenu() : openMenu()));

  /* ---------- Rotating roles ---------- */
  const rot = $("[data-rotator]");
  if (rot) {
    const items = $$(".rotator__item", rot);
    // size rotator to widest item so layout never jumps
    const sizeRot = () => { rot.style.width = Math.max(...items.map((i) => i.scrollWidth)) + "px"; };
    sizeRot();
    document.fonts && document.fonts.ready.then(sizeRot);
    let i = 0;
    setInterval(() => {
      const cur = items[i];
      i = (i + 1) % items.length;
      const nxt = items[i];
      if (G && !reduce) {
        G.to(cur, { yPercent: -100, opacity: 0, duration: 0.7, ease: "expo.inOut", onComplete: () => cur.classList.remove("is-active") });
        G.fromTo(nxt, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, ease: "expo.inOut", onStart: () => nxt.classList.add("is-active") });
      } else {
        cur.classList.remove("is-active");
        nxt.classList.add("is-active");
      }
    }, 2400);
  }

  /* ---------- Interactive particle field (hero) ---------- */
  function particleField(canvas) {
    const ctx = canvas.getContext("2d");
    let w, h, dpr, pts = [], colA = "#8b5cf6", colB = "#22d3ee", running = true;
    const mouse = { x: -9999, y: -9999 };
    const readColors = () => {
      const cs = getComputedStyle(root);
      colA = cs.getPropertyValue("--accent").trim() || colA;
      colB = cs.getPropertyValue("--accent-2").trim() || colB;
    };
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(90, (w * h) / 16000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6, c: Math.random() > 0.5,
      }));
    };
    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const mdx = p.x - mouse.x, mdy = p.y - mouse.y, md = Math.hypot(mdx, mdy);
        if (md < 140) { p.x += (mdx / md) * 1.4; p.y += (mdy / md) * 1.4; }
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 120) {
            ctx.globalAlpha = (1 - d / 120) * 0.22;
            ctx.strokeStyle = p.c ? colA : colB;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        ctx.globalAlpha = 0.75;
        ctx.fillStyle = p.c ? colA : colB;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    };
    readColors(); resize();
    window.addEventListener("resize", resize);
    window.addEventListener("themechange", readColors);
    canvas.parentElement.addEventListener("pointermove", (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    canvas.parentElement.addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });
    new IntersectionObserver(([en]) => {
      const was = running; running = en.isIntersecting;
      if (running && !was) requestAnimationFrame(draw);
    }).observe(canvas);
    if (!reduce) requestAnimationFrame(draw); else { running = false; }
  }
  $$("[data-field]").forEach(particleField);

  /* ---------- Hero pointer parallax ---------- */
  const heroEl = $("[data-hero]");
  if (heroEl && G && finePointer && !reduce) {
    const layers = $$("[data-depth]", heroEl).map((el) => ({
      d: parseFloat(el.dataset.depth),
      x: G.quickTo(el, "x", { duration: 1, ease: "power3" }),
      y: G.quickTo(el, "y", { duration: 1, ease: "power3" }),
    }));
    heroEl.addEventListener("pointermove", (e) => {
      const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
      layers.forEach((l) => { l.x(nx * 40 * l.d); l.y(ny * 40 * l.d); });
    });
  }

  /* ---------- Marquee (velocity-reactive) ---------- */
  if (G && !reduce) {
    $$("[data-marquee]").forEach((row) => {
      const dir = parseFloat(row.dataset.marquee);
      const track = $(".marquee__track", row);
      const tween = G.fromTo(track, { xPercent: dir > 0 ? 0 : -50 }, { xPercent: dir > 0 ? -50 : 0, duration: 40, ease: "none", repeat: -1 });
      if (ST) {
        ST.create({
          trigger: row, start: "top bottom", end: "bottom top",
          onUpdate(self) {
            const v = Math.min(Math.abs(self.getVelocity()) / 300, 6);
            G.to(tween, { timeScale: 1 + v, duration: 0.2, overwrite: true });
            G.to(tween, { timeScale: 1, duration: 1.2, delay: 0.2, ease: "power2.out" });
          },
        });
      }
    });
  }

  /* ---------- Scroll-driven reveals ---------- */
  function setupReveals() {
    if (!motion || !ST) {
      // No motion: still fill meters/counters at their final value.
      $$("[data-count]").forEach((el) => { el.textContent = (+el.dataset.count).toFixed(+el.dataset.decimals || 0); });
      $$("[data-meter]").forEach((el) => { el.style.width = el.dataset.meter + "%"; });
      $$("[data-split]").forEach(splitChars);
      $$(".statement .word").forEach((w) => (w.style.opacity = 1));
      return;
    }

    // Section titles: wrap in a line mask and rise up char by char
    $$(".reveal-title").forEach((el) => {
      const html = el.innerHTML;
      el.innerHTML = `<span class="line"><span class="rt">${html}</span></span>`;
      G.from($(".rt", el), { yPercent: 110, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } });
    });

    $$("[data-split]").forEach((el) => {
      const chars = splitChars(el);
      G.from(chars, { yPercent: 120, rotate: 6, duration: 1.2, stagger: 0.03, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } });
    });

    $$(".reveal").forEach((el) => {
      G.from(el, { y: 40, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%" } });
    });

    $$(".reveal-stagger").forEach((el) => {
      G.from(el.children, { y: 30, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } });
    });

    ST.batch(".reveal-card, .stat", {
      start: "top 90%",
      onEnter: (els) => G.fromTo(els, { y: 60, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 1.1, stagger: 0.09, ease: "expo.out", overwrite: true }),
    });
    G.set(".reveal-card, .stat", { opacity: 0 });

    ST.batch(".card", {
      start: "top 92%",
      onEnter: (els) => G.fromTo(els, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.08, ease: "expo.out", clearProps: "y,opacity" }),
    });
    G.set(".card", { opacity: 0 });

    $$(".reveal-side").forEach((el, i) => {
      const fromX = window.innerWidth > 860 ? (i % 2 === 0 ? 60 : -60) : 40;
      G.from(el.querySelector(".timeline__card"), { x: fromX, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      G.from(el.querySelector(".timeline__node"), { scale: 0, duration: 0.8, ease: "back.out(2)", scrollTrigger: { trigger: el, start: "top 80%" } });
    });

    // Statement: words light up as you scroll
    $$("[data-words]").forEach((el) => {
      const words = splitWords(el);
      G.to(words, { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.6 } });
    });

    // Counters
    $$("[data-count]").forEach((el) => {
      const end = parseFloat(el.dataset.count), dec = +el.dataset.decimals || 0, o = { v: 0 };
      G.to(o, { v: end, duration: 2.2, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" }, onUpdate: () => { el.textContent = o.v.toFixed(dec); } });
    });

    // Language meters
    $$("[data-meter]").forEach((el) => {
      G.to(el, { width: el.dataset.meter + "%", duration: 1.8, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 92%" } });
    });

    // Timeline line draws with scroll
    const fill = $("[data-timeline-fill]");
    if (fill) G.to(fill, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-timeline]", start: "top 70%", end: "bottom 60%", scrub: 0.5 } });

    // Parallax images
    $$("[data-parallax]").forEach((el) => {
      G.to(el, { yPercent: parseFloat(el.dataset.parallax) * -100, ease: "none", scrollTrigger: { trigger: el.closest("section"), start: "top top", end: "bottom top", scrub: true } });
    });
    if ($(".about__photo")) G.fromTo(".about__photo img", { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: ".about__photo", start: "top bottom", end: "bottom top", scrub: true } });

    // Experience watermark drift
    if ($(".xp")) G.fromTo(".xp__mark", { xPercent: 20 }, { xPercent: -10, ease: "none", scrollTrigger: { trigger: ".xp", start: "top bottom", end: "bottom top", scrub: true } });

    // Footer name slides in
    const big = $("[data-footer-big]");
    if (big) G.fromTo(big, { xPercent: 12, opacity: 0.2 }, { xPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom bottom", scrub: 0.6 } });

    // Hero fades/scales out as you leave it
    if ($(".hero__grid")) G.to(".hero__grid", { yPercent: 14, opacity: 0.2, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  }

  /* ---------- Project filter (Flip layout animation) ---------- */
  const filterBtns = $$("[data-filter]");
  const filterPill = $("[data-filter-pill]");
  const cards = $$("[data-project]");
  function moveFilterPill(btn, instant) {
    if (!filterPill || !btn) return;
    const pr = btn.parentElement.getBoundingClientRect(), r = btn.getBoundingClientRect();
    const x = r.left - pr.left, top = r.top - pr.top;
    if (G && !instant) G.to(filterPill, { x, y: top - 5, width: r.width, height: r.height, duration: 0.7, ease: "expo.out" });
    else { filterPill.style.transform = `translate(${x}px, ${top - 5}px)`; filterPill.style.width = r.width + "px"; filterPill.style.height = r.height + "px"; }
  }
  filterBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      filterBtns.forEach((b) => { b.classList.toggle("is-active", b === btn); b.setAttribute("aria-selected", b === btn ? "true" : "false"); });
      moveFilterPill(btn);
      // Cards not yet scroll-revealed would otherwise stay invisible after re-layout.
      if (G) { G.killTweensOf(cards); G.set(cards, { clearProps: "opacity,y" }); }
      const state = Flip && motion ? Flip.getState(cards) : null;
      cards.forEach((c) => c.classList.toggle("is-hidden", f !== "all" && c.dataset.cat !== f));
      if (state) {
        Flip.from(state, {
          duration: 0.8, ease: "expo.inOut", scale: true, absolute: true, nested: true,
          onEnter: (els) => G.fromTo(els, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.7, ease: "expo.out" }),
          onLeave: (els) => G.to(els, { opacity: 0, scale: 0.85, duration: 0.5, ease: "expo.in" }),
          onComplete: () => ST && ST.refresh(),
        });
      } else if (ST) ST.refresh();
    })
  );
  const placePill = () => moveFilterPill($(".filters__btn.is-active"), true);
  window.addEventListener("resize", placePill);
  document.fonts ? document.fonts.ready.then(placePill) : placePill();

  /* ---------- Project modal ---------- */
  const modal = $("[data-modal]");
  let projects = [];
  try { projects = JSON.parse($("#projects-data").textContent); } catch (e) {}
  const iconBank = $("#icon-bank");
  let current = -1, lastFocus = null;

  function visibleSlugs() { return cards.filter((c) => !c.classList.contains("is-hidden")).map((c) => c.dataset.project); }

  function fillModal(p) {
    const panel = $(".modal__panel", modal);
    panel.style.setProperty("--accent-m", p.accent);
    const ic = iconBank && iconBank.content.querySelector(`[data-icon="${p.slug}"]`);
    $("[data-m-icon]", modal).innerHTML = ic ? ic.innerHTML : "";
    $("[data-m-sub]", modal).textContent = `${p.subtitle} · ${p.year}`;
    $("[data-m-title]", modal).textContent = p.title;
    $("[data-m-metrics]", modal).innerHTML = (p.metrics || []).map((m) => `<div class="metric"><strong>${m[0]}</strong><span>${m[1]}</span></div>`).join("");
    const ul = $("[data-m-points]", modal);
    ul.innerHTML = "";
    p.points.forEach((t) => { const li = document.createElement("li"); li.textContent = t; ul.appendChild(li); });
    $("[data-m-stack]", modal).innerHTML = p.stack.map((s) => `<span class="tag">${s}</span>`).join("");
    $("[data-m-github]", modal).href = p.github;
    panel.scrollTop = 0;
  }

  function openModal(slug) {
    const idx = projects.findIndex((p) => p.slug === slug);
    if (idx < 0) return;
    const wasOpen = current >= 0;
    current = idx;
    fillModal(projects[idx]);
    if (wasOpen) {
      if (motion) G.fromTo(".modal__panel > *:not(.modal__close)", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.03, ease: "expo.out" });
      return;
    }
    lastFocus = document.activeElement;
    modal.style.visibility = "visible";
    modal.setAttribute("aria-hidden", "false");
    root.classList.add("modal-open");
    if (lenis) lenis.stop();
    if (motion) {
      G.timeline({ defaults: { ease: "expo.out" } })
        .to(".modal__backdrop", { opacity: 1, duration: 0.5 })
        .fromTo(".modal__panel", { y: 80, scale: 0.94, opacity: 0, rotationX: 8, transformPerspective: 1000 }, { y: 0, scale: 1, opacity: 1, rotationX: 0, duration: 0.9 }, 0)
        .fromTo(".modal__panel > *:not(.modal__close)", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.05 }, 0.15);
    } else {
      $(".modal__backdrop").style.opacity = 1;
    }
    setTimeout(() => $(".modal__close", modal).focus(), 50);
  }

  function closeModal() {
    if (current < 0) return;
    current = -1;
    const done = () => {
      modal.style.visibility = "hidden";
      modal.setAttribute("aria-hidden", "true");
      root.classList.remove("modal-open");
      if (lenis) lenis.start();
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    };
    if (motion) {
      G.timeline({ onComplete: done })
        .to(".modal__panel", { y: 60, scale: 0.96, opacity: 0, duration: 0.45, ease: "expo.in" })
        .to(".modal__backdrop", { opacity: 0, duration: 0.35 }, "-=0.2");
    } else { $(".modal__backdrop").style.opacity = 0; done(); }
  }

  function step(dir) {
    const list = visibleSlugs();
    const pos = list.indexOf(projects[current].slug);
    openModal(list[(pos + dir + list.length) % list.length]);
  }

  if (modal) {
    cards.forEach((c) => {
      c.addEventListener("click", () => openModal(c.dataset.project));
      c.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(c.dataset.project); } });
    });
    $$("[data-modal-close]", modal).forEach((b) => b.addEventListener("click", closeModal));
    $("[data-m-prev]", modal).addEventListener("click", () => step(-1));
    $("[data-m-next]", modal).addEventListener("click", () => step(1));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { closeModal(); closeMenu(); dock && dock.classList.remove("is-open"); }
      if (current >= 0 && e.key === "ArrowRight") step(1);
      if (current >= 0 && e.key === "ArrowLeft") step(-1);
      if (current >= 0 && e.key === "Tab") {
        const f = $$("button, a[href]", modal).filter((el) => el.offsetParent !== null);
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
  }

  /* ---------- Toast ---------- */
  const toastEl = $(".toast");
  let toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 3200);
  }

  /* ---------- Copy to clipboard ---------- */
  $$("[data-copy]").forEach((b) =>
    b.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(b.dataset.copy); toast("Email copied to clipboard ✓"); }
      catch (e) { window.location.href = "mailto:" + b.dataset.copy; }
    })
  );

  /* ---------- Contact form ----------
     With a server (Flask/Vercel) the form posts to data-endpoint.
     On a static host (GitHub Pages) there is no endpoint, so it validates in the
     browser and opens the visitor's mail app with the message filled in. */
  const form = $("[data-form]");
  if (form) {
    const endpoint = form.dataset.endpoint || "";
    const to = form.dataset.email || "";
    const showErrors = (errors) => {
      Object.entries(errors).forEach(([k, v]) => {
        const s = $(`[data-err="${k}"]`, form);
        if (s) { s.textContent = v; s.closest(".field").classList.add("has-error"); }
      });
      if (G && !reduce) G.fromTo(form, { x: -8 }, { x: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
      toast("Please check the highlighted fields.");
    };
    const validate = (d) => {
      const e = {};
      if ((d.name || "").trim().length < 2) e.name = "Please tell me your name.";
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test((d.email || "").trim())) e.email = "That email doesn't look right.";
      if ((d.message || "").trim().length < 10) e.message = "A few more words, please (10+ characters).";
      return e;
    };
    const openMail = (d) => {
      const body = `${d.message}\n\n— ${d.name} (${d.email})`;
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(d.subject || "Hello from your portfolio")}&body=${encodeURIComponent(body)}`;
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = $("button[type=submit]", form), txt = $("[data-submit-txt]", form);
      const data = Object.fromEntries(new FormData(form).entries());
      $$(".field", form).forEach((f) => f.classList.remove("has-error"));
      $$("[data-err]", form).forEach((s) => (s.textContent = ""));
      if (data.company) return; // honeypot

      const errors = validate(data);
      if (Object.keys(errors).length) { showErrors(errors); return; }

      if (!endpoint) {
        toast("Opening your mail app to send the message…");
        openMail(data);
        form.reset();
        return;
      }

      btn.disabled = true; txt.textContent = "Sending…";
      try {
        const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        const json = await res.json();
        if (!json.ok) { showErrors(json.errors || {}); }
        else {
          toast(json.message);
          if (json.fallback) openMail(data);
          form.reset();
        }
      } catch (err) {
        toast("Network error — opening your mail app instead.");
        openMail(data);
      } finally {
        btn.disabled = false; txt.textContent = "Send message";
      }
    });
  }

  /* ---------- Local time (IST) ---------- */
  const clock = $("[data-clock]");
  if (clock) {
    const tick = () => {
      clock.textContent = new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" }).format(new Date());
    };
    tick(); setInterval(tick, 30000);
  }

  /* ---------- Boot ---------- */
  setupReveals();
  runLoader();
  window.addEventListener("load", () => ST && ST.refresh());
})();
