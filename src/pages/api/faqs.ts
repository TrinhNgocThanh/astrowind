import type { APIRoute } from 'astro';

const apiUrl = import.meta.env.DIRECTUS_API_URL;

if (!apiUrl) {
  throw new Error("DIRECTUS_API_URL is not defined");
}

export const get: APIRoute = async () => {
  try {
    console.log(`Fetching FAQs from ${apiUrl}/items/faqs`);
    const response = await fetch(`${apiUrl}/items/faqs`);
    if (!response.ok) {
      console.error(`Failed to fetch FAQs: ${response.statusText}`);
      throw new Error("Failed to fetch FAQs");
    }
    const data = await response.json();
    console.log("Fetched FAQs data:", data);
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch FAQs" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};