/**
 * Vision Digital - Landing Page
 * Scroll animations, sticky nav, counters, mobile menu, parallax, progress bar
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
     UTILITY FUNCTIONS
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
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }

  /* =============================================
     NAVBAR SCROLL EFFECT
     ============================================= */
  function handleNavScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  /* =============================================
     ACTIVE NAV LINK BASED ON SCROLL
     ============================================= */
  function updateActiveNav() {
    var scrollPos = window.scrollY + 120;
    var sections = document.querySelectorAll('section[id]');
    var currentId = '';

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
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
  function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  }

  function closeMobileMenu() {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  navToggle.addEventListener('click', toggleMobileMenu);

  navLinkItems.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMobileMenu();
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  /* =============================================
     SCROLL REVEAL (Intersection Observer)
     ============================================= */
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = getComputedStyle(el).getPropertyValue('--delay').trim();
          if (delay) {
            el.style.transitionDelay = delay;
          }
          el.classList.add('visible');
          revealObserver.unobserve(el);
        }
      });
    },
    {
      threshold: 0.10,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  // Observe all reveal elements (including variants)
  var allReveal = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  allReveal.forEach(function (el) {
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

      var duration = 2200;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var elapsed = timestamp - startTime;
        var progress = Math.min(elapsed / duration, 1);

        // Ease out quart
        var eased = 1 - Math.pow(1 - progress, 4);
        var current = Math.floor(eased * target);

        el.textContent = current;

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
  if (statsSection) {
    var statsObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    statsObserver.observe(statsSection);
  }

  /* =============================================
     HERO PARALLAX
     ============================================= */
  var heroGlow1 = document.querySelector('.hero-glow--1');
  var heroGlow2 = document.querySelector('.hero-glow--2');
  var heroRing1 = document.querySelector('.hero-ring--1');
  var heroRing2 = document.querySelector('.hero-ring--2');

  function updateParallax() {
    var scrollY = window.scrollY;
    if (scrollY > window.innerHeight) return;

    var factor = scrollY * 0.15;
    if (heroGlow1) heroGlow1.style.transform = 'translateY(' + factor + 'px)';
    if (heroGlow2) heroGlow2.style.transform = 'translateY(' + (-factor * 0.6) + 'px)';
    if (heroRing1) heroRing1.style.transform = 'translateY(' + (factor * 0.4) + 'px)';
    if (heroRing2) heroRing2.style.transform = 'translateY(' + (-factor * 0.3) + 'px)';
  }

  /* =============================================
     CARD TILT ON MOUSE MOVE (Desktop only)
     ============================================= */
  function initCardTilt() {
    if (window.innerWidth < 768) return;

    var cards = document.querySelectorAll('.propuesta-card, .servicio-card, .por-que-card');

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = ((y - centerY) / centerY) * -5;
        var rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = 'perspective(600px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateY(-4px)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  /* =============================================
     PARTICLES GENERATOR FOR SECTIONS
     ============================================= */
  function generateParticles() {
    var containers = document.querySelectorAll('.particles-bg');
    containers.forEach(function (container) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < 15; i++) {
        var span = document.createElement('span');
        span.style.left = (Math.random() * 95) + '%';
        span.style.animationDelay = (Math.random() * 8) + 's';
        span.style.animationDuration = (6 + Math.random() * 8) + 's';
        span.style.width = (2 + Math.random() * 3) + 'px';
        span.style.height = span.style.width;
        fragment.appendChild(span);
      }
      container.appendChild(fragment);
    });
  }

  /* =============================================
     SCROLL EVENT LISTENERS
     ============================================= */
  window.addEventListener('scroll', throttle(function () {
    handleNavScroll();
    updateActiveNav();
    updateProgressBar();
    updateParallax();
  }, 20), { passive: true });

  /* =============================================
     INITIAL STATE
     ============================================= */
  handleNavScroll();
  updateActiveNav();
  updateProgressBar();
  updateParallax();
  initCardTilt();
  generateParticles();

  /* =============================================
     RESIZE HANDLER
     ============================================= */
  var resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      initCardTilt();
    }, 200);
  });

  // Prevent body scroll when mobile menu is open
  var style = document.createElement('style');
  style.textContent = '.menu-open { overflow: hidden; }';
  document.head.appendChild(style);

})();
