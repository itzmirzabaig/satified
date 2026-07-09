/* Google Analytics 4, loaded here so every static page gets it from one file. */
(function () {
  var ID = 'G-HZ19REXM8B';
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', ID);
  /* Count clicks from these SEO pages into the study app. */
  document.addEventListener('click', function (e) {
    var a = (e.target && e.target.closest) ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href === '/study/' || href.indexOf('/study/') === 0) {
      try {
        gtag('event', 'tutor_cta_clicked', {
          source_page: location.pathname,
          cta_text: (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60),
          destination: href
        });
      } catch (err) {}
    }
  }, true);
})();

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
