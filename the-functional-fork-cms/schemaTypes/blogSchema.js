export default {
  name: 'blog',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'body', type: 'blockContent' },
    // etc
  ]
}
