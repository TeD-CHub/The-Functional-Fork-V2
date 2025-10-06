// script.js - Functional Fork interactions

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

 menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

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

// 📰 Dynamic Blog Loading
  const blogContainer = document.querySelector(".blog-container");
  if (blogContainer) {
    loadBlogPosts();
  }

  async function loadBlogPosts() {
    try {
      // 1. Get list of markdown files from the posts directory
      const response = await fetch("https://api.github.com/repos/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>/contents/posts");
      const files = await response.json();

      for (const file of files) {
        if (file.name.endsWith(".md")) {
          const postRes = await fetch(file.download_url);
          const postText = await postRes.text();

          const { frontmatter, body } = parseFrontmatter(postText);

          // Shorten body for preview
          const preview = body.split(" ").slice(0, 25).join(" ") + "...";

          // Create blog card
          const card = document.createElement("article");
          card.classList.add("blog-card");
          card.innerHTML = `
            <img src="${frontmatter.featured_image || 'images/default.jpg'}" alt="${frontmatter.title}" loading="lazy" />
            <h3>${frontmatter.title}</h3>
            <p>${preview}</p>
            <a href="/posts/${file.name.replace('.md', '.html')}" class="learn-btn">Read More</a>
          `;
          blogContainer.appendChild(card);
        }
      }
    } catch (error) {
      console.error("Error loading posts:", error);
      blogContainer.innerHTML = "<p>Failed to load blog posts. Please check back later.</p>";
    }
  }

  // Function to parse frontmatter (YAML) from Markdown
  function parseFrontmatter(text) {
    const match = /^---\n([\s\S]+?)\n---\n([\s\S]*)$/m.exec(text);
    if (!match) return { frontmatter: {}, body: text };

    const yaml = match[1];
    const body = match[2].trim();

    const frontmatter = {};
    yaml.split("\n").forEach(line => {
      const [key, ...rest] = line.split(":");
      frontmatter[key.trim()] = rest.join(":").trim().replace(/^"|"$/g, "");
    });

    return { frontmatter, body };
  }
