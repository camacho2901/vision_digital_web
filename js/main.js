/**
 * Vision Digital - Landing Page
 * Sticky nav, scroll progress, reveal animations, counters, mobile menu
 */
(function () {
  'use strict';

  /* =============================================
     DOM REFERENCES
     ============================================= */
  var navbar = document.getElementById('navbar');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  var navLinkItems = document.querySelectorAll('.nav-link');
  var statNumbers = document.querySelectorAll('.stat-number');

  var scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);

  /* =============================================
     UTILITIES
     ============================================= */
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

  /* =============================================
     SCROLL PROGRESS BAR
     ============================================= */
  function updateProgressBar() {
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }

  /* =============================================
     NAVBAR SCROLL EFFECT
     ============================================= */
  function handleNavScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  /* =============================================
     ACTIVE NAV LINK
     ============================================= */
  function updateActiveNav() {
    var scrollPos = window.scrollY + 130;
    var sections = document.querySelectorAll('section[id]');
    var currentId = '';

    sections.forEach(function (section) {
      var top = section.offsetTop;
      if (scrollPos >= top && scrollPos < top + section.offsetHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinkItems.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active');
      }
    });
  }

  /* =============================================
     MOBILE MENU
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
      if (e.target.closest('a')) {
        setMenuState(false);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        setMenuState(false);
        navToggle.focus();
      }
    });
  }

  /* =============================================
     SCROLL REVEAL
     ============================================= */
  var REVEAL_CLASSES = ['reveal', 'reveal-left', 'reveal-right', 'reveal-scale'];

  function getDelayMs(el) {
    var raw = getComputedStyle(el).getPropertyValue('--delay').trim();
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

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add('visible');
        revealObserver.unobserve(el);
        setTimeout(function () {
          cleanupReveal(el);
        }, 800 + getDelayMs(el));
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* =============================================
     COUNTER ANIMATION
     ============================================= */
  function animateCounters() {
    statNumbers.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      if (!target || el.dataset.animated === 'true') return;
      el.dataset.animated = 'true';

      var duration = 2000;
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

  var statsSection = document.querySelector('.por-que-stats');
  if (statsSection && statNumbers.length) {
    var statsObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    statsObserver.observe(statsSection);
  }

  /* =============================================
     SCROLL LISTENER + INITIAL STATE
     ============================================= */
  window.addEventListener('scroll', throttle(function () {
    handleNavScroll();
    updateActiveNav();
    updateProgressBar();
  }, 20), { passive: true });

  handleNavScroll();
  updateActiveNav();
  updateProgressBar();

})();
