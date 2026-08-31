/* ── Fountainhead Schools — main.js ── */

/* ── SCROLL REVEAL ── */
(function () {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-up, .stat-ois, .campus-ois, .accolade-ois, .news-ois, .person-ois, .value-ois'
  ).forEach((el) => io.observe(el));
})();

/* ── COUNTER ANIMATION ── */
function animateCounter(el) {
  const target = parseFloat(el.dataset.target || el.textContent.replace(/[^0-9.]/g, ''));
  const isFloat = el.dataset.target && el.dataset.target.includes('.');
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    el.textContent = (isFloat ? current.toFixed(2) : Math.floor(current)) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('[data-counter]').forEach((el) => {
  el.dataset.target = el.textContent.replace(/[^0-9.]/g, '');
  counterObs.observe(el);
});

/* ── STAGGER CHILDREN ── */
document.querySelectorAll('[data-stagger]').forEach((parent) => {
  Array.from(parent.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 80}ms`;
    child.classList.add('reveal-up');
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          Array.from(e.target.children).forEach((child) =>
            child.classList.add('revealed')
          );
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  io.observe(parent);
});

/* ── HEADER SCROLL SHADOW ── */
const header = document.getElementById('navbar');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ── SMOOTH CLOSE MOBILE NAV ON LINK CLICK ── */
document.querySelectorAll('#site-nav a').forEach((a) => {
  a.addEventListener('click', () => {
    const panel = document.getElementById('site-nav');
    if (panel && panel.hidePopover) panel.hidePopover();
  });
});
