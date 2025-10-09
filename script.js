// ==========================
// The Functional Fork - script.js
// ==========================

// ======== NAVIGATION MENU TOGGLE ========
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');

  // Toggle accessibility attributes
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true' || false;
  menuBtn.setAttribute('aria-expanded', !expanded);

  // Toggle icon
  menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// ======== CLOSE MENU ON LINK CLICK (MOBILE) ========
document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      menuBtn.textContent = '☰';
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
});

// ======== HEADER SCROLL EFFECT ========
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// ======== SMOOTH SCROLLING ========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// ======== ACTIVE LINK HIGHLIGHT ========
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('#navLinks a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// ======== CONTACT FORM VALIDATION ========
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    const name = contactForm.querySelector('#name').value.trim();
    const email = contactForm.querySelector('#email').value.trim();
    const message = contactForm.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      e.preventDefault();
      showToast('Please fill in all fields 💬');
    } else {
      showToast('Message sent successfully 🌿');
    }
  });
}

// ======== TOAST NOTIFICATION (Organic Style) ========
function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.className = 'toast';
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('visible'), 50);
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 600);
  }, 2500);
}

// ======== ORGANIC SCROLL REVEAL ANIMATIONS ========
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.blog-card, .service-card, .faq-container details, .contact-form, .contact-image img').forEach((el) => {
  observer.observe(el);
});
// ========== FETCH BLOGS FROM SANITY ==========
import { createClient } from "https://cdn.jsdelivr.net/npm/@sanity/client@7.12.0/+esm";

document.addEventListener("DOMContentLoaded", async () => {
  const blogContainer = document.getElementById("blogcontainer");

  const client = createClient({
    projectId: "bf7a28t9",      // ✅ your Sanity project ID
    dataset: "production",
    apiVersion: "2025-10-09",
    useCdn: true,                // faster, cached reads
  });

  try {
    const blogs = await client.fetch(`*[_type == "post"]{_id, title, slug, mainImage{asset->{url}}, excerpt}`);

    blogContainer.innerHTML = ""; // clear placeholder blogs

    if (blogs.length === 0) {
      blogContainer.innerHTML = "<p>No blog posts found yet.</p>";
      return;
    }

    blogs.forEach((post) => {
      const card = document.createElement("article");
      card.classList.add("blog-card");

      card.innerHTML = `
        <img src="${post.mainImage?.asset?.url || "images/default.jpg"}" alt="${post.title}" loading="lazy" />
        <h3>${post.title}</h3>
        <p>${post.excerpt || "Read more about this topic."}</p>
        <a href="blog/${post.slug?.current || "#"}" class="learn-btn">Learn More</a>
      `;

      blogContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    blogContainer.innerHTML = "<p>Failed to load blogs. Please try again later.</p>";
  }
});
