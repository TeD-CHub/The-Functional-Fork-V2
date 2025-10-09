// schemas/index.js

import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import blog from './blogSchema'  // Added Blog schema

export const schemaTypes = [
  post,
  author,
  category,
  blockContent,
  blog // Include Blog in the schemaTypes array
]
