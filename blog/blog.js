// blog.js

// Define your blog posts here
const blogPosts = {
  "food-microbiology": {
    title: "Understanding Food Microbiology",
    date: "October 5, 2025",
    image: "images/blog1.jpg",
    content: `
      <p>Food microbiology explores the microorganisms that influence the safety, quality, and nutritional value of foods.</p>
      <h2>The Role of Microbes in Food</h2>
      <p>Some microbes help ferment foods like yogurt, while others can cause spoilage or foodborne illness.</p>
      <p>Understanding them ensures safe and high-quality food production.</p>
    `
  },

  "functional-foods": {
    title: "The Future of Functional Foods",
    date: "October 6, 2025",
    image: "images/blog2.jpg",
    content: `
      <p>Functional foods provide health benefits beyond basic nutrition — think probiotics, omega-3s, and plant sterols.</p>
      <h2>Why They Matter</h2>
      <p>They help manage health issues like digestion, heart function, and immunity naturally.</p>
    `
  },

  "quality-assurance": {
    title: "Quality Assurance in Food Production",
    date: "October 7, 2025",
    image: "images/blog3.jpg",
    content: `
      <p>Quality assurance ensures that every product meets safety, quality, and regulatory standards.</p>
      <h2>Importance</h2>
      <p>Implementing robust QA systems helps prevent contamination and protect consumer health.</p>
    `
  }
};

// Get the blog ID from the URL
const params = new URLSearchParams(window.location.search);
const blogId = params.get("id");
const container = document.getElementById("blog-content");

// Display the correct post or a 404 message
if (blogId && blogPosts[blogId]) {
  const post = blogPosts[blogId];
  container.innerHTML = `
    <article class="blog-post">
      <img src="${post.image}" alt="${post.title}" class="blog-hero-image" />
      <div class="blog-info">
        <h1>${post.title}</h1>
        <p class="blog-date">${post.date}</p>
        <div class="blog-text">${post.content}</div>
      </div>
      <a href="index.html#blog" class="back-btn">← Back to Blog</a>
    </article>
  `;
} else {
  container.innerHTML = `
    <div class="not-found">
      <h2>Blog Not Found</h2>
      <p>The article you're looking for doesn’t exist.</p>
      <a href="index.html#blog" class="back-btn">← Back to Blog</a>
    </div>
  `;
}
