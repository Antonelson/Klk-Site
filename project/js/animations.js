/* ==========================================================================
   animations.js — shared across all pages
   - Initializes AOS (scroll reveal)
   - Count-up animation for project status stats
   ========================================================================== */
(function () {
  "use strict";

  /* ---- AOS init ---- */
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }

  /* ---- Count-up stats (e.g. "100+ Ongoing Projects") ---- */
  var statNums = document.querySelectorAll(".stat__num[data-count-to]");
  if (!statNums.length) return;

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count-to"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1400;
    var startTime = null;

    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); /* ease-out-cubic */
      var current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
        el.classList.add("is-done");
      }
    }
    window.requestAnimationFrame(step);
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNums.forEach(function (el) {
    observer.observe(el);
  });
})();