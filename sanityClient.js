// sanityClient.js
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'your_project_id',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true
});
