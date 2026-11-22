/**
 * Visión Digital — Landing Page
 * Navbar, progreso de scroll, menú móvil, reveal, contadores y spotlight.
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var navbar = document.getElementById('navbar');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  var navLinkItems = document.querySelectorAll('.nav-link[href^="#"]');
  var statNumbers = document.querySelectorAll('.stat-number');

  /* =============================================
     BARRA DE PROGRESO
     ============================================= */
  var scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  scrollProgress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(scrollProgress);

  function throttle(fn, delay) {
    var last = 0;
    return function () {
      var now = Date.now();
      if (now - last >= delay) {
        last = now;
        fn.apply(null, arguments);
      }
    };
  }

  function updateProgressBar() {
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }

  /* =============================================
     NAVBAR
     ============================================= */
  function handleNavScroll() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 24);
  }

  /* =============================================
     LINK ACTIVO
     ============================================= */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var visibleSections = new Set();

  function applyActiveLink(id) {
    navLinkItems.forEach(function (link) {
      var isActive = link.getAttribute('href') === '#' + id;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target.id);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        for (var i = 0; i < sections.length; i++) {
          if (visibleSections.has(sections[i].id)) {
            applyActiveLink(sections[i].id);
            return;
          }
        }
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* =============================================
     MENÚ MÓVIL
     ============================================= */
  function setMenuState(open) {
    if (!navToggle || !navLinks) return;
    navToggle.classList.toggle('active', open);
    navLinks.classList.toggle('active', open);
    document.body.classList.toggle('menu-open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      setMenuState(!navLinks.classList.contains('active'));
    });

    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenuState(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        setMenuState(false);
        navToggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1024 && navLinks.classList.contains('active')) {
        setMenuState(false);
      }
    });
  }

  /* =============================================
     REVEAL
     ============================================= */
  var REVEAL_SELECTOR = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
  var REVEAL_CLASSES = ['reveal', 'reveal-left', 'reveal-right', 'reveal-scale'];
  var revealItems = document.querySelectorAll(REVEAL_SELECTOR);

  function getDelayMs(el) {
    var raw = getComputedStyle(el).getPropertyValue('--delay').trim();
    if (!raw) return 0;
    var value = parseFloat(raw);
    if (isNaN(value)) return 0;
    return raw.indexOf('ms') > -1 ? value : value * 1000;
  }

  function cleanupReveal(el) {
    REVEAL_CLASSES.forEach(function (cls) {
      el.classList.remove(cls);
    });
    el.classList.remove('visible');
    el.style.willChange = 'auto';
  }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(cleanupReveal);
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          el.classList.add('visible');
          revealObserver.unobserve(el);
          window.setTimeout(function () {
            cleanupReveal(el);
          }, 700 + getDelayMs(el));
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    revealItems.forEach(function (el) {
      revealObserver.observe(el);
    });

    /* Red de seguridad: si el observer no dispara, revela lo que ya está a la vista. */
    window.addEventListener('load', function () {
      window.setTimeout(function () {
        document.querySelectorAll(REVEAL_SELECTOR).forEach(function (el) {
          if (el.getBoundingClientRect().top < window.innerHeight * 1.2) {
            cleanupReveal(el);
          }
        });
      }, 1500);
    });
  }

  /* =============================================
     CONTADORES
     ============================================= */
  function animateCounters() {
    statNumbers.forEach(function (el) {
      if (el.dataset.animated === 'true') return;
      var target = parseInt(el.getAttribute('data-count'), 10);
      if (isNaN(target)) return;
      el.dataset.animated = 'true';

      if (reduceMotion) {
        el.textContent = target;
        return;
      }

      var duration = 1600;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 4);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target;
        }
      }

      requestAnimationFrame(step);
    });
  }

  var statsSection = document.querySelector('.stats-bar');
  if (statsSection && statNumbers.length) {
    if ('IntersectionObserver' in window) {
      var statsObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounters();
              statsObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      statsObserver.observe(statsSection);
    } else {
      animateCounters();
    }
  }

  /* =============================================
     SPOTLIGHT EN TARJETAS
     ============================================= */
  if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
      });
    });
  }

  /* =============================================
     INIT
     ============================================= */
  window.addEventListener('scroll', throttle(function () {
    handleNavScroll();
    updateProgressBar();
  }, 16), { passive: true });

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Calculadora de inversión */
  var calcBudget = document.getElementById('calcBudget');
  var calcCpa = document.getElementById('calcCpa');
  var calcLeads = document.getElementById('calcLeads');
  var calcDaily = document.getElementById('calcDaily');

  function updateCalc() {
    if (!calcBudget || !calcCpa || !calcLeads || !calcDaily) return;
    var budget = parseFloat(calcBudget.value) || 0;
    var cpa = parseFloat(calcCpa.value) || 0;
    var leads = cpa > 0 ? budget / cpa : 0;
    calcLeads.textContent = Math.max(0, Math.round(leads)).toLocaleString('es-BO');
    calcDaily.textContent = Math.max(0, Math.round(budget / 30)).toLocaleString('es-BO');
  }

  if (calcBudget && calcCpa) {
    calcBudget.addEventListener('input', updateCalc);
    calcCpa.addEventListener('input', updateCalc);
    updateCalc();
  }

  handleNavScroll();
  updateProgressBar();
})();
