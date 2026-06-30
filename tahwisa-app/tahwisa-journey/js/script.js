/**
 * TAHWISA — Main Application Script
 * SPA routing, parallax, particles, forms, ripple, coords
 */
(function () {
  'use strict';

  /* ============================================================
     Data — Experiences
     ============================================================ */
  const EXPERIENCES = [
    { id: 1, category: 'Heritage', title: 'Ghardaïa & the Mzab Valley', subtitle: 'UNESCO World Heritage', description: 'Wander through five ancient ksar cities where Mozabite architecture has stood unchanged for a millennium.', duration: '3 Days', from: '$420', rating: 4.9, tag: 'Most Popular', tagColor: '#C86A2C', image: 'https://media.base44.com/images/public/6a411f90eda36fb29a101c80/d46205f36_generated_image.png' },
    { id: 2, category: 'Luxury Stay', title: 'Desert Camp Under Stars', subtitle: 'Grand Erg Occidental', description: 'Sleep in handcrafted Berber tents adorned with silk and lanterns, surrounded by an ocean of golden dunes.', duration: '2 Nights', from: '$680', rating: 5.0, tag: 'Exclusive', tagColor: '#00843D', image: 'https://media.base44.com/images/public/6a411f90eda36fb29a101c80/4d1e99da0_generated_image.png' },
    { id: 3, category: 'Adventure', title: "Tassili n'Ajjer Expedition", subtitle: 'Ancient Rock Art Trek', description: "Discover 10,000-year-old cave paintings in one of the world's most spectacular rock formations.", duration: '5 Days', from: '$890', rating: 4.8, tag: 'Expert Guide', tagColor: '#1A6B8A', image: 'https://media.base44.com/images/public/6a411f90eda36fb29a101c80/9df6c4f8d_generated_image.png' },
    { id: 4, category: 'Coastal', title: 'Kabylie Mediterranean Cove', subtitle: 'Turquoise Sea & Cliffs', description: 'Sail hidden coves of emerald waters along the rugged coastline where Berber villages meet the sea.', duration: '4 Days', from: '$550', rating: 4.7, tag: 'New Route', tagColor: '#8B4EC8', image: 'https://media.base44.com/images/public/6a411f90eda36fb29a101c80/4f621d82b_generated_image.png' },
    { id: 5, category: 'Wellness', title: 'Traditional Hammam Ritual', subtitle: 'Algiers Old Quarter', description: 'A half-day immersion in centuries-old hammam culture with argan scrubs, rose water, and mint tea.', duration: '1 Day', from: '$180', rating: 4.9, tag: 'Signature', tagColor: '#B8860B', image: 'https://media.base44.com/images/public/6a411f90eda36fb29a101c80/a59279d45_generated_image.png' },
    { id: 6, category: 'Desert', title: 'Camel Caravan at Sunset', subtitle: 'Grand Erg Oriental', description: 'Follow ancient trade routes by camelback as the Sahara blazes in shades of amber, gold, and crimson.', duration: '2 Days', from: '$320', rating: 4.8, tag: 'Iconic', tagColor: '#C86A2C', image: 'https://media.base44.com/images/public/6a411f90eda36fb29a101c80/08d5312fc_generated_image.png' }
  ];

  const CATEGORIES = ['All', 'Desert', 'Heritage', 'Coastal', 'Adventure', 'Wellness', 'Luxury Stay'];

  const BASE_LAT = 23.4162;
  const BASE_LNG = 5.3093;

  let activeFilter = 'All';
  let mousePos = { x: 0, y: 0 };
  let logoVisible = true;
  let coordsOpen = false;
  let rafId = null;

  /* ============================================================
     DOM References
     ============================================================ */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const pageHome = $('#pageHome');
  const pageExperiences = $('#pageExperiences');
  const bgPhotoLayer = $('#bgPhotoLayer');
  const desertVessel = $('#desertVessel');
  const sandContainer = $('#sandParticles');
  const cursorGlow = $('#cursorGlow');
  const brandName = $('#brandName');
  const logoHint = $('#logoHint');
  const logoBlock = $('#logoBlock');
  const loginForm = $('#loginForm');
  const signupForm = $('#signupForm');
  const expFilters = $('#expFilters');
  const expGrid = $('#expGrid');
  const coordsToggle = $('#coordsToggle');
  const coordsBox = $('#coordsBox');
  const coordsBtnDot = $('#coordsBtnDot');
  const coordsBtnLabel = $('#coordsBtnLabel');
  const coordsChevron = $('#coordsChevron');
  const coordLat = $('#coordLat');
  const coordLng = $('#coordLng');
  const coordAlt = $('#coordAlt');

  /* ============================================================
     SPA Router — no page refresh
     ============================================================ */
  function getRoute() {
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    if (path === '/experiences') return 'experiences';
    return 'home';
  }

  function navigate(route, push = true) {
    const path = route === 'experiences' ? '/experiences' : '/';
    if (push) history.pushState({ route }, '', path);
    showPage(route);
    document.title = route === 'experiences' ? 'Experiences | TAHWISA' : 'TAHWISA';
  }

  function showPage(route) {
    pageHome.classList.toggle('is-active', route === 'home');
    pageExperiences.classList.toggle('is-active', route === 'experiences');
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    if (route === 'experiences') renderExperiences();
  }

  function initRouter() {
    $$('[data-nav]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        navigate(el.dataset.nav);
      });
    });
    window.addEventListener('popstate', () => showPage(getRoute()));
    showPage(getRoute());
  }

  /* ============================================================
     Sand Particles
     ============================================================ */
  function initParticles() {
    if (!sandContainer) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 40; i++) {
      const p = document.createElement('span');
      p.className = 'sand-particle';
      const size = Math.random() * 3 + 1;
      p.style.cssText = `
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        width:${size}px;height:${size}px;
        animation-delay:${Math.random() * 8}s;
        animation-duration:${Math.random() * 6 + 6}s;
        opacity:${Math.random() * 0.4 + 0.1};
      `;
      frag.appendChild(p);
    }
    sandContainer.appendChild(frag);
  }

  /* ============================================================
     Parallax & Cursor Glow
     ============================================================ */
  function onMouseMove(e) {
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    mousePos = { x: nx, y: ny };

    if (cursorGlow) {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    }

    if (rafId) return;
    rafId = requestAnimationFrame(updateParallax);
  }

  function updateParallax() {
    rafId = null;
    if (bgPhotoLayer) {
      bgPhotoLayer.style.transform = `translate(${mousePos.x * -8}px, ${mousePos.y * -5}px) scale(1.08)`;
    }
    if (desertVessel) {
      desertVessel.style.transform = `translateX(${mousePos.x * -3}px)`;
    }
    // Particles react subtly to cursor
    $$('.sand-particle').forEach((p, i) => {
      if (i % 5 === 0) {
        p.style.transform = `translate(${mousePos.x * 2}px, ${mousePos.y * 1.5}px)`;
      }
    });
  }

  /* ============================================================
     Logo Blur Reveal Toggle
     ============================================================ */
  function toggleLogo() {
    logoVisible = !logoVisible;
    brandName.classList.toggle('is-veiled', !logoVisible);
    logoHint.textContent = logoVisible ? 'Click to veil' : 'Click to reveal';
  }

  if (logoBlock) {
    logoBlock.addEventListener('click', toggleLogo);
    logoBlock.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleLogo(); }
    });
  }

  /* ============================================================
     Live Coordinates
     ============================================================ */
  function formatCoord(n, pos, neg) {
    const deg = Math.floor(Math.abs(n));
    const min = ((Math.abs(n) - deg) * 60).toFixed(3);
    return `${deg}° ${min}' ${n >= 0 ? pos : neg}`;
  }

  function updateCoords() {
    const lat = BASE_LAT + Math.sin(Date.now() / 18000) * 0.0008;
    const lng = BASE_LNG + Math.cos(Date.now() / 22000) * 0.0006;
    if (coordLat) coordLat.textContent = formatCoord(lat, 'N', 'S');
    if (coordLng) coordLng.textContent = formatCoord(lng, 'E', 'W');
    if (coordAlt) {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      coordAlt.textContent = `ALT 412 m · ${time}`;
    }
  }

  function toggleCoords() {
    coordsOpen = !coordsOpen;
    coordsBox.classList.toggle('is-hidden', !coordsOpen);
    coordsToggle.classList.toggle('coords-toggle-active', coordsOpen);
    coordsToggle.setAttribute('aria-expanded', coordsOpen);
    coordsBtnDot.classList.toggle('active', coordsOpen);
    coordsChevron.classList.toggle('open', coordsOpen);
    coordsBtnLabel.textContent = coordsOpen ? 'Hide Location' : 'Live Location';
    coordsToggle.setAttribute('aria-label', coordsOpen ? 'Hide location' : 'Show live location');
  }

  if (coordsToggle) coordsToggle.addEventListener('click', toggleCoords);

  /* ============================================================
     Floating Labels
     ============================================================ */
  function initFloatingInputs() {
    $$('.floating-input-group input').forEach(input => {
      const group = input.closest('.floating-input-group');
      const sync = () => {
        group.classList.toggle('has-value', input.value.length > 0);
      };
      input.addEventListener('focus', () => group.classList.add('focused'));
      input.addEventListener('blur', () => {
        group.classList.remove('focused');
        sync();
      });
      input.addEventListener('input', () => {
        group.classList.remove('is-invalid');
        sync();
      });
      sync();
    });
  }

  /* ============================================================
     Form Validation
     ============================================================ */
  function validateEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function setFieldError(group, msg) {
    group.classList.add('is-invalid');
    group.classList.remove('is-valid');
    const err = group.querySelector('.input-error');
    if (err) err.textContent = msg;
  }

  function setFieldValid(group) {
    group.classList.remove('is-invalid');
    group.classList.add('is-valid');
    const err = group.querySelector('.input-error');
    if (err) err.textContent = '';
  }

  function validateLoginForm(e) {
    e.preventDefault();
    let valid = true;
    const emailGroup = $('#loginEmail').closest('.floating-input-group');
    const passGroup = $('#loginPassword').closest('.floating-input-group');
    const email = $('#loginEmail').value.trim();
    const pass = $('#loginPassword').value;

    if (!email || !validateEmail(email)) {
      setFieldError(emailGroup, 'Please enter a valid email address');
      valid = false;
    } else setFieldValid(emailGroup);

    if (!pass || pass.length < 6) {
      setFieldError(passGroup, 'Password must be at least 6 characters');
      valid = false;
    } else setFieldValid(passGroup);

    if (valid) {
      const btn = e.target.querySelector('.btn-primary-auth');
      btn.textContent = 'Welcome to the Oasis ✦';
      setTimeout(() => { btn.textContent = 'Enter the Oasis'; }, 2000);
    }
  }

  function validateSignupForm(e) {
    e.preventDefault();
    let valid = true;
    const fields = [
      { id: 'firstName', check: v => v.length >= 2, msg: 'First name required' },
      { id: 'lastName', check: v => v.length >= 2, msg: 'Last name required' },
      { id: 'signupEmail', check: validateEmail, msg: 'Valid email required' },
      { id: 'signupPassword', check: v => v.length >= 8, msg: 'Min 8 characters' },
      { id: 'confirmPassword', check: v => v === $('#signupPassword').value, msg: 'Passwords must match' }
    ];

    fields.forEach(({ id, check, msg }) => {
      const input = $(`#${id}`);
      const group = input.closest('.floating-input-group');
      if (!check(input.value.trim())) {
        setFieldError(group, msg);
        valid = false;
      } else setFieldValid(group);
    });

    if (!$('#agreeTerms').checked) valid = false;

    if (valid) {
      const btn = e.target.querySelector('.btn-primary-auth');
      btn.textContent = 'Account Created ✦';
      setTimeout(() => { btn.textContent = 'Join TAHWISA'; }, 2000);
    }
  }

  /* ============================================================
     Auth Form Switch
     ============================================================ */
  function switchAuth(mode) {
    const showLogin = mode === 'login';
    const out = showLogin ? signupForm : loginForm;
    const inn = showLogin ? loginForm : signupForm;

    out.classList.add('is-switching-out');
    setTimeout(() => {
      out.classList.add('is-hidden');
      out.classList.remove('is-switching-out');
      inn.classList.remove('is-hidden');
      inn.classList.add('is-switching-in');
      setTimeout(() => inn.classList.remove('is-switching-in'), 500);
    }, 350);
  }

  $$('[data-switch]').forEach(btn => {
    btn.addEventListener('click', () => switchAuth(btn.dataset.switch));
  });

  /* ============================================================
     Ripple Effect
     ============================================================ */
  function initRipple() {
    document.addEventListener('click', e => {
      const btn = e.target.closest('.ripple-btn');
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
      ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  }

  /* ============================================================
     Experiences Page
     ============================================================ */
  function renderFilters() {
    expFilters.innerHTML = CATEGORIES.map(cat =>
      `<button type="button" class="exp-filter-btn${cat === activeFilter ? ' active' : ''}" data-cat="${cat}" aria-pressed="${cat === activeFilter}">${cat}</button>`
    ).join('');

    $$('.exp-filter-btn', expFilters).forEach(btn => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.cat;
        renderFilters();
        renderExperienceCards();
      });
    });
  }

  function starRating(rating) {
    return '★'.repeat(Math.floor(rating)) + `<span class="exp-rating-num">${rating.toFixed(1)}</span>`;
  }

  function renderExperienceCards() {
    const filtered = activeFilter === 'All'
      ? EXPERIENCES
      : EXPERIENCES.filter(e => e.category === activeFilter);

    expGrid.innerHTML = filtered.map((exp, i) => `
      <article class="exp-card" style="animation-delay:${i * 0.08}s" aria-label="${exp.title}">
        <div class="exp-card-image-wrap">
          <img src="${exp.image}" alt="${exp.title}" class="exp-card-image" loading="lazy" />
          <div class="exp-card-overlay"></div>
          <span class="exp-tag" style="background:${exp.tagColor}">${exp.tag}</span>
          <span class="exp-category">${exp.category}</span>
        </div>
        <div class="exp-card-body">
          <h3 class="exp-card-title">${exp.title}</h3>
          <p class="exp-card-subtitle">${exp.subtitle}</p>
          <p class="exp-card-desc">${exp.description}</p>
          <div class="exp-card-meta">
            <span class="exp-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ${exp.duration}
            </span>
            <span class="exp-stars">${starRating(exp.rating)}</span>
          </div>
          <div class="exp-card-footer">
            <div class="exp-price">
              <span class="exp-from">From</span>
              <span class="exp-amount">${exp.from}</span>
              <span class="exp-per">/ person</span>
            </div>
            <button type="button" class="exp-cta-btn ripple-btn" aria-label="Explore ${exp.title}">
              Explore
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </article>
    `).join('');
  }

  function renderExperiences() {
    renderFilters();
    renderExperienceCards();
  }

  /* ============================================================
     Lazy Animation — Intersection Observer
     ============================================================ */
  function initLazyAnimations() {
    if (!('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '-40px' });

    $$('.exp-card').forEach(el => obs.observe(el));
  }

  /* ============================================================
     Init
     ============================================================ */
  function init() {
    document.body.classList.add('is-ready');
    initRouter();
    initParticles();
    initFloatingInputs();
    initRipple();

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    $('#loginFormEl')?.addEventListener('submit', validateLoginForm);
    $('#signupFormEl')?.addEventListener('submit', validateSignupForm);

    updateCoords();
    setInterval(updateCoords, 1800);

    renderExperiences();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
