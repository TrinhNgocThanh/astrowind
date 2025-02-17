import type { APIRoute } from 'astro';

export const get: APIRoute = async () => {
  return new Response(JSON.stringify({ message: "Hello, world!" }), {
    headers: { 'Content-Type': 'application/json' },
  });
};