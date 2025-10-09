import { createClient } from "@sanity/client";

console.log("✅ testFetch.js is running..."); // should print immediately

const client = createClient({
  projectId: "bf7a28t9",
  dataset: "production",
  apiVersion: "2025-10-09",
  useCdn: true,
});

async function testFetch() {
  console.log("⏳ Fetching data from Sanity...");

  try {
    const data = await client.fetch('*[_type == "post"]{title, _id}');
    console.log("📦 Result:", data);
  } catch (error) {
    console.error("❌ Error fetching data:", error);
  }
}

testFetch();

