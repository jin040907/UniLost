# Web Service Deployment Guide

This guide explains how to deploy UniLost to various cloud hosting platforms.

## Free Hosting Options

### 1. Render (Recommended ⭐)

- **Free Plan**: Free (may be slightly slow)
- **Pros**: Simple deployment, automatic HTTPS, SQLite support
- **URL**: https://render.com

**Deployment Method:**

1. Upload your code to GitHub
2. Select "New Web Service" in Render
3. Connect your GitHub repository
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. The PORT environment variable is automatically set

### 2. Railway

- **Free Plan**: $5 credits/month (sufficient)
- **Pros**: Very simple and fast deployment
- **URL**: https://railway.app

**Deployment Method:**

1. Upload your code to GitHub
2. In Railway, select "New Project" → "Deploy from GitHub"
3. Automatically detect and deploy

### 3. Fly.io

- **Free Plan**: Free (Limited)
- **Pros**: Global CDN, Fast
- **URL**: https://fly.io

### 4. Heroku

- **Status**: Paid, Not Recommended

---

## Pre-Deployment Preparations

### 1. Setting Environment Variables

Change the hardcoded secret in the server code to an environment variable:

```javascript
// In server.js
secret: process.env.SESSION_SECRET || 'demo-lost-and-found-secret'
```

### 2. Database

- ✅ PostgreSQL support complete
- Requires setting the `DATABASE_URL` environment variable
- We recommend using a free PostgreSQL service like Supabase or Neon

For detailed database setup instructions, see [DATABASE_SETUP.md](./DATABASE_SETUP.md).

### 3. Port Setting

The current code already uses `process.env.PORT`, so there's no problem. ✅

---

## Quick Deployment (Render Example)

### Step 1: Upload Your Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin [your-github-repo-url]
git push -u origin main
```

### Step 2: Deploy from Render

1. Go to render.com → Sign up
2. Click "New +" → "Web Service"
3. Connect to a GitHub repository
4. Configure settings:
   - **Name**: unilost (any name you want)
   - **Region**: Singapore (close to Korea)
   - **Branch**: main
   - **Root Directory**: (Leave blank)
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Click "Create Web Service"

### Step 3: Done!

- Automatically generates a `https://your-app.onrender.com` URL
- Accessible from anywhere in the world!

---

## Notes

### Free Plan Limitations

⚠️ **Important Considerations:**

- **Render**: Sleeps after 15 minutes of inactivity (first request is slow)
- **Railway**: $5 monthly credit limit
- **SQLite files**: May not be permanently stored on some services

### Solutions

💡 **Recommended Approaches:**

- Use a cloud database like PostgreSQL (free options like Supabase or Neon)
- Or use a paid plan ($7-$10/month)

For more information, see [DATABASE_SETUP.md](./DATABASE_SETUP.md).

---

## Additional Resources

- [README.md](../README.md) - Project overview and usage
- [DATABASE_SETUP.md](./DATABASE_SETUP.md) - Database configuration guide
- [COMPATIBILITY.md](./COMPATIBILITY.md) - Browser and system compatibility
