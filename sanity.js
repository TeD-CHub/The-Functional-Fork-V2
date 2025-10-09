import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "bf7a28t9", // 👈 actual Sanity project ID
  dataset: "production",
  apiVersion: "2025-10-09", 
  useCdn: true, // use cached content for faster load
});
