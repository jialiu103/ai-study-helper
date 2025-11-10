# Cloudflare Workers Deployment Guide

This app uses Cloudflare Workers as a secure backend proxy to keep your OpenAI API key hidden.

## Quick Setup

### 1. Create Cloudflare Account
- Go to https://dash.cloudflare.com/sign-up
- Sign up (free tier includes 100,000 requests/day)

### 2. Create Worker
1. Go to Workers & Pages
2. Click "Create Application" → "Create Worker"
3. Name it (e.g., "ai-study-helper-proxy")
4. Click "Deploy"

### 3. Edit Worker Code
1. Click "Edit Code"
2. Replace all code with content from `worker.js`
3. **Important**: Replace `YOUR_OPENAI_API_KEY_HERE` with your actual OpenAI API key
4. Click "Save and Deploy"

### 4. Get Worker URL
- Copy your worker URL (e.g., `https://your-worker.username.workers.dev`)

### 5. Update Frontend
- In `script.js`, update line 2:
  ```javascript
  const API_ENDPOINT = 'https://your-worker.username.workers.dev';
  ```

## Cost Estimates

### Free Tier (Current Setup)
- Cloudflare: 100,000 requests/day FREE
- OpenAI API: Pay per use
  - GPT-4o-mini: $0.15/1M input tokens, $0.60/1M output tokens
  - Typical story generation: ~500 tokens = $0.0003

### Paid Tier (If needed)
- Cloudflare Workers Paid: $5/month for 10M requests
- Perfect for a paid app with thousands of users

## Security
- ✅ API key never exposed to users
- ✅ CORS properly configured
- ✅ Server-side validation
- ✅ Ready for paid app model
