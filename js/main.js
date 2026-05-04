// ============================================================
// ENGFORCE — main.js
// ============================================================

// ----- NAV scroll effect -----
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
});

// ----- Active nav link on scroll -----
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => a.classList.remove("active"));
        const active = document.querySelector(
          `.nav-link[href="#${entry.target.id}"]`,
        );
        if (active) active.classList.add("active");
      }
    });
  },
  { threshold: 0.35 },
);

sections.forEach((s) => observer.observe(s));

// ----- Mobile menu toggle -----
const menuToggle = document.getElementById("menuToggle");
const navLinksEl = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinksEl.classList.toggle("open");
});

// Close menu on link click (mobile)
navLinksEl.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinksEl.classList.remove("open");
  });
});

// ----- Scroll reveal -----
const revealEls = document.querySelectorAll(
  ".svc-card, .proj-card, .about-card-highlight, .about-badge-row, .contact-form-wrap, .contact-left",
);

revealEls.forEach((el, i) => {
  el.classList.add("reveal");
  if (i % 3 === 1) el.classList.add("reveal-delay-1");
  if (i % 3 === 2) el.classList.add("reveal-delay-2");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

revealEls.forEach((el) => revealObserver.observe(el));

// ----- Contact form -----
function submitContact(e) {
  e.preventDefault();
  const successEl = document.getElementById("formSuccess");
  successEl.style.display = "block";
  e.target.reset();
  setTimeout(() => {
    successEl.style.display = "none";
  }, 6000);
}
