/* Charles Cruz — Portfolio v2 interactions
   Scroll reveals · nav behavior · draggable before/after · lightbox · stat counters */

(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Nav: hide on scroll down, show on scroll up ---------- */
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');
  var lastY = window.scrollY;

  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    nav.classList.toggle('scrolled', y > 24);
    // Only auto-hide once past the hero, and never while the mobile menu is open
    if (!navMenu.classList.contains('open')) {
      nav.classList.toggle('hidden', y > 480 && y > lastY);
    }
    lastY = y;
  }, { passive: true });

  navToggle.addEventListener('click', function () {
    var open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  // Close the mobile menu after choosing a section
  navMenu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- Scroll reveals ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Stat counters ---------- */
  function animateCount(el) {
    var target = parseInt(el.dataset.count, 10);
    var suffix = el.dataset.suffix || '';
    if (prefersReduced) { el.textContent = target + suffix; return; }
    var start = null;
    var dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      // easeOutCubic for a satisfying settle
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var statEls = document.querySelectorAll('.stat__num');
  if ('IntersectionObserver' in window) {
    var statIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statEls.forEach(function (el) { statIO.observe(el); });
  } else {
    statEls.forEach(animateCount);
  }

  /* ---------- Before / After draggable sliders ---------- */
  document.querySelectorAll('[data-ba]').forEach(function (container) {
    var handle = container.querySelector('.ba__handle');

    function setSplit(pct) {
      pct = Math.max(2, Math.min(98, pct));
      container.style.setProperty('--split', pct + '%');
      handle.setAttribute('aria-valuenow', String(Math.round(pct)));
    }

    function pctFromEvent(e) {
      var rect = container.getBoundingClientRect();
      var x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      return (x / rect.width) * 100;
    }

    var dragging = false;

    container.addEventListener('pointerdown', function (e) {
      dragging = true;
      container.setPointerCapture(e.pointerId);
      setSplit(pctFromEvent(e));
    });
    container.addEventListener('pointermove', function (e) {
      if (dragging) setSplit(pctFromEvent(e));
    });
    container.addEventListener('pointerup', function () { dragging = false; });
    container.addEventListener('pointercancel', function () { dragging = false; });

    // Keyboard support on the handle
    handle.addEventListener('keydown', function (e) {
      var current = parseFloat(container.style.getPropertyValue('--split')) || 50;
      if (e.key === 'ArrowLeft') { setSplit(current - 4); e.preventDefault(); }
      if (e.key === 'ArrowRight') { setSplit(current + 4); e.preventDefault(); }
    });
  });

  /* ---------- Flatlay belts: duplicate content for a seamless loop ---------- */
  document.querySelectorAll('[data-belt] .flatline__track').forEach(function (track) {
    // The keyframe travels -50%, so the track must contain exactly two copies.
    // Clone nodes (not innerHTML) so loaded image state is preserved, and hide
    // the duplicates from assistive tech.
    Array.prototype.slice.call(track.children).forEach(function (node) {
      var clone = node.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  });

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var closeBtn = lightbox.querySelector('.lightbox__close');
  var lastFocused = null;

  function openLightbox(src, alt) {
    lastFocused = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('.tile:not(.tile--placeholder), .tile-zoom').forEach(function (tile) {
    var img = tile.querySelector('img');
    if (!img) return;
    tile.addEventListener('click', function () { openLightbox(img.src, img.alt); });
    tile.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(img.src, img.alt);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
})();
