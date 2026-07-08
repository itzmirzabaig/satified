/* Satified static pages: scroll reveal animations. Tiny, dependency free. */
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  var targets = document.querySelectorAll(
    '.pg-hero > *, main section > h2, main section > h3, main section > p, ' +
    '.patterns > *, .grid-links > a, .faq > div, .traps > li, .facts > li, ' +
    '.worked, .cta-band, .cta-row, .related, main section > ul > li, main section > div'
  );

  var seen = [];
  targets.forEach(function (el) {
    if (el.classList.contains('rv')) return;
    el.classList.add('rv');
    seen.push(el);
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('rv-in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

  seen.forEach(function (el) { io.observe(el); });
})();
