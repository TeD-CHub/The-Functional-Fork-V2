// script.js - Functional Fork interactions

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  // Mobile menu toggle
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Close menu when a link is clicked
  document.querySelectorAll("#navLinks a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("active"));
  });

  // Smooth scroll enhancement
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: "smooth"
        });
      }
    });
  });

  // Simple form submission alert (can be replaced with backend integration)
  const form = document.querySelector(".contact-form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("Thank you for reaching out! We'll get back to you soon.");
    form.reset();
  });
});
