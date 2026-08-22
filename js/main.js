/* ============================================================
   LoopStack Technologies — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── Preloader ── */
  window.addEventListener('load', () => {
    setTimeout(() => {
      const pl = document.getElementById('preloader');
      if (pl) pl.classList.add('done');
    }, 900);
  });

  document.addEventListener('DOMContentLoaded', () => {

    /* ── Sticky Header ── */
    const header = document.querySelector('.site-header');
    const onScroll = () => {
      if (!header) return;
      header.classList.toggle('scrolled', window.scrollY > 60);

      // Back to Top
      const btt = document.querySelector('.back-top');
      if (btt) btt.classList.toggle('show', window.scrollY > 350);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ── Back to Top ── */
    const btt = document.querySelector('.back-top');
    if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* ── Mobile Menu ── */
    const hamburger   = document.querySelector('.hamburger');
    const mobMenu     = document.querySelector('.mob-menu');
    const mobOverlay  = document.querySelector('.mob-overlay');
    const mobClose    = document.querySelector('.mob-close');

    function openMenu() {
      mobMenu?.classList.add('open');
      mobOverlay?.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      mobMenu?.classList.remove('open');
      mobOverlay?.classList.remove('show');
      document.body.style.overflow = '';
    }

    hamburger?.addEventListener('click', openMenu);
    mobClose?.addEventListener('click', closeMenu);
    mobOverlay?.addEventListener('click', closeMenu);

    /* Mobile accordion dropdowns */
    document.querySelectorAll('.mob-nav-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.mob-nav-item');
        item?.classList.toggle('open');
      });
    });

    /* ── Active Nav Link ── */
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .mob-nav-link').forEach(a => {
      const href = (a.getAttribute('href') || '').split('/').pop();
      if (href === current || (current === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });

    /* ── AOS (Animate on Scroll) ── */
    const aosEls = document.querySelectorAll('[data-aos]');
    if (aosEls.length) {
      const aosObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const delay = e.target.dataset.aosDelay || 0;
            setTimeout(() => e.target.classList.add('aos-animate'), +delay);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

      aosEls.forEach(el => aosObs.observe(el));
    }

    /* ── Counter Animation ── */
    function runCounter(el) {
      if (el.dataset.counted) return;
      el.dataset.counted = '1';
      const target   = +el.dataset.target;
      const suffix   = el.dataset.suffix || '';
      const prefix   = el.dataset.prefix || '';
      const duration = 2200;
      const fps      = 60;
      const steps    = Math.floor(duration / (1000 / fps));
      const inc      = target / steps;
      let current    = 0;
      const timer    = setInterval(() => {
        current += inc;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
      }, 1000 / fps);
    }

    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) runCounter(e.target); });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

    /* ── Hero Particle Generator ── */
    const particleWrap = document.querySelector('.hero-particles');
    if (particleWrap) {
      for (let i = 0; i < 22; i++) {
        const s = document.createElement('span');
        s.style.left   = Math.random() * 100 + '%';
        s.style.top    = Math.random() * 100 + '%';
        s.style.setProperty('--dur',   (5 + Math.random() * 6) + 's');
        s.style.setProperty('--delay', (Math.random() * 5) + 's');
        particleWrap.appendChild(s);
      }
    }

    /* ── Smooth Scroll for Anchors ── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
    });

    /* ── Hero Scroll Hint ── */
    const scrollHint = document.querySelector('.hero-scroll-hint');
    if (scrollHint) {
      scrollHint.addEventListener('click', () => {
        const next = document.querySelector('.svc-strip, .about-section, .page-content');
        next?.scrollIntoView({ behavior: 'smooth' });
      });
    }

    /* ── Portfolio Filter ── */
    const filterBtns = document.querySelectorAll('.pf-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        portfolioCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
            setTimeout(() => { card.style.opacity = '1'; card.style.transform = ''; }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => { card.style.display = 'none'; }, 300);
          }
        });
      });
    });

    /* ── Contact Form ── */
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('[type="submit"]');
        const msg = form.querySelector('.form-msg');

        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending…';

        setTimeout(() => {
          if (msg) { msg.className = 'form-msg success'; msg.textContent = '✅ Thank you! Your message has been sent. We\'ll get back to you within 24 hours.'; }
          btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
          btn.style.background = 'linear-gradient(135deg,#00c87a,#008050)';
          form.reset();

          setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            btn.style.background = '';
            if (msg) msg.className = 'form-msg';
          }, 5000);
        }, 1600);
      });
    }

    /* ── Hamburger Animation ── */
    if (hamburger) {
      hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
      });
      mobClose?.addEventListener('click', () => hamburger.classList.remove('active'));
      mobOverlay?.addEventListener('click', () => hamburger.classList.remove('active'));
    }

  });
})();
