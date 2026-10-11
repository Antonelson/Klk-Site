/* ==========================================================================
   main.js — shared across all pages
   - Sticky navbar shrink-on-scroll
   - Mobile hamburger menu
   ========================================================================== */
(function () {
  "use strict";

  var navbar = document.querySelector(".navbar");
  var toggle = document.querySelector(".navbar__toggle");
  var mobileMenu = document.querySelector(".navbar__mobile");

  /* ---- Shrink navbar on scroll ---- */
  var SHRINK_AT = 40;
  function onScroll() {
    if (!navbar) return;
    if (window.scrollY > SHRINK_AT) {
      navbar.classList.add("is-shrunk");
    } else {
      navbar.classList.remove("is-shrunk");
    }
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile hamburger ---- */
  function closeMenu() {
    toggle.classList.remove("is-open");
    mobileMenu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  function openMenu() {
    toggle.classList.add("is-open");
    mobileMenu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  if (toggle && mobileMenu) {
    toggle.addEventListener("click", function () {
      var isOpen = toggle.classList.contains("is-open");
      isOpen ? closeMenu() : openMenu();
    });
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1024) closeMenu();
    });
  }
})();