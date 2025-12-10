# Vercel Deployment Guide

## Step 1: Push to GitHub

If you haven't already, push your code to GitHub:

```bash
# Check if you have a remote repository
git remote -v

# If no remote, add one:
git remote add origin https://github.com/your-username/dfwkurds.git

# Push your code
git push -u origin main
```

## Step 2: Import to Vercel

1. **Go to Vercel Dashboard:**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account (recommended)

2. **Import Project:**
   - Click **"Add New..."** → **"Project"**
   - Select **"Import Git Repository"**
   - Find and select your `dfwkurds` repository
   - Click **"Import"**

3. **Configure Project:**
   - **Framework Preset:** Next.js (should auto-detect)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

## Step 3: Add Environment Variables

In the Vercel project settings, add these environment variables:

### Required:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Usually `production`

### Optional:
- `NEXT_PUBLIC_SITE_URL` - Your production domain (for sitemap)
- `SANITY_API_TOKEN` - If you need authenticated requests

**How to add:**
1. Go to your project in Vercel
2. Click **Settings** → **Environment Variables**
3. Add each variable for **Production**, **Preview**, and **Development**
4. Click **Save**

## Step 4: Deploy

1. Click **"Deploy"** button
2. Wait for the build to complete (usually 2-3 minutes)
3. Your site will be live at `https://your-project-name.vercel.app`

## Troubleshooting

### Project Not Showing in Vercel

**Issue:** Can't see the project after importing

**Solutions:**
1. **Check GitHub Connection:**
   - Go to Vercel Dashboard → Settings → Git
   - Ensure your GitHub account is connected
   - Re-authorize if needed

2. **Check Repository Access:**
   - Make sure the repository is public, or
   - Grant Vercel access to private repositories in GitHub settings

3. **Refresh the Dashboard:**
   - Sometimes projects take a moment to appear
   - Try refreshing the page

4. **Check Different Account:**
   - Make sure you're logged into the correct Vercel account
   - Check if the project was imported to a team instead of personal

### Build Errors

If the build fails, check:

1. **Environment Variables:**
   - Ensure all required variables are set
   - Check for typos in variable names

2. **Node Version:**
   - Vercel should auto-detect Node.js 18+
   - If issues, add `.nvmrc` file with `18` or `20`

3. **Build Logs:**
   - Check the build logs in Vercel dashboard
   - Look for specific error messages

### Common Issues

**PWA Build Warnings:**
- These are normal and won't prevent deployment
- Service worker files are generated during build

**Missing Icons:**
- PWA icons are optional for initial deployment
- Site will work without them
- Generate icons later using `scripts/generate-icons.js`

## Post-Deployment

1. **Update Domain References:**
   - Update `src/app/sitemap.ts` with your actual domain
   - Update `public/robots.txt` with your actual domain
   - Or set `NEXT_PUBLIC_SITE_URL` environment variable

2. **Test the Site:**
   - Visit your deployed URL
   - Test all language switches
   - Verify all pages load correctly
   - Test mobile navigation

3. **Custom Domain (Optional):**
   - Go to Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## Quick Deploy via CLI (Alternative)

If you prefer command line:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

