import { client } from '../sanityClient.js';

// Get slug from URL query: blog.html?slug=your-post-slug
const params = new URLSearchParams(window.location.search);
const slug = params.get('slug');

const blogContainer = document.getElementById('blogPost');

if (!slug) {
  blogContainer.innerHTML = '<p>Blog not found.</p>';
} else {
  const query = `*[_type=="blog" && slug.current == $slug][0]{
    title,
    "image": mainImage.asset->url,
    body
  }`;

  client.fetch(query, { slug }).then((post) => {
    if (!post) {
      blogContainer.innerHTML = '<p>Blog not found.</p>';
      return;
    }

    document.getElementById('title').textContent = post.title;
    document.getElementById('image').src = post.image;
    document.getElementById('image').alt = post.title;

    // Assuming post.body is Portable Text from Sanity
    const contentEl = document.getElementById('content');
    post.body.forEach(block => {
      if (block._type === 'block') {
        const p = document.createElement('p');
        p.textContent = block.children.map(c => c.text).join('');
        contentEl.appendChild(p);
      }
    });
  }).catch(err => {
    console.error(err);
    blogContainer.innerHTML = '<p>Failed to load blog.</p>';
  });
}
