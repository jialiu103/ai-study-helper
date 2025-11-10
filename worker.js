// Cloudflare Worker - Secure API Proxy
// This keeps your OpenAI API key secret on the server

// IMPORTANT: Replace this with your actual API key when deploying to Cloudflare Workers
// Set it as an environment variable in Cloudflare dashboard or wrangler.toml
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY_HERE';

// API Configuration - Easy to switch between endpoints
const USE_RESPONSES_API = true; // Using Responses API (now GA!)
const CHAT_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const RESPONSES_ENDPOINT = 'https://api.openai.com/v1/responses';

export default {
  async fetch(request, env, ctx) {
    // Handle CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      // Get the request body from your frontend
      const body = await request.json();

      // Choose API endpoint based on configuration
      const apiEndpoint = USE_RESPONSES_API ? RESPONSES_ENDPOINT : CHAT_ENDPOINT;

      // Forward to OpenAI API
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      // Return response to frontend
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }
  }
};
