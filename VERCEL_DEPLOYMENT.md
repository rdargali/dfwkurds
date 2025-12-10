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

⚠️ **CRITICAL:** These environment variables are **REQUIRED** for your site to work. Without them, you'll see errors like "Dataset not found for project ID 'your-project-id'".

### Required (MUST ADD):

1. **`NEXT_PUBLIC_SANITY_PROJECT_ID`**
   - **How to get:** Go to [sanity.io/manage](https://www.sanity.io/manage) → Select your project → Copy the Project ID
   - **Example value:** `5d0aj8a7` (your actual project ID)
   - **Where to add:** Vercel → Your Project → Settings → Environment Variables

2. **`NEXT_PUBLIC_SANITY_DATASET`**
   - **Value:** `production` (or your dataset name)
   - **Where to add:** Vercel → Your Project → Settings → Environment Variables

### Optional:

- `NEXT_PUBLIC_SITE_URL` - Your production domain (for sitemap and SEO)
- `SANITY_API_TOKEN` - If you need authenticated requests
- `SANITY_APP_ID` - Sanity Studio deployment app ID (prevents prompts on deploy)
- `REVALIDATE_SECRET` - Secret token for on-demand cache revalidation (see "On-Demand Revalidation" section below)

**How to add:**
1. Go to your project in Vercel
2. Click **Settings** → **Environment Variables**
3. Click **"Add New"**
4. For each variable:
   - **Key:** `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - **Value:** Your actual Sanity Project ID (e.g., `5d0aj8a7`)
   - **Environment:** Select **Production**, **Preview**, and **Development** (or use "All")
5. Repeat for `NEXT_PUBLIC_SANITY_DATASET` with value `production`
6. Click **Save**

**⚠️ Important:** After adding environment variables, you **MUST redeploy** for them to take effect:
- Go to **Deployments** tab
- Click **"..."** menu on latest deployment → **"Redeploy"**
- Or push a new commit to trigger a new deployment

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
- Generate icons later using the scripts in the main README

## Post-Deployment

1. **Update Domain References:**
   - Set `NEXT_PUBLIC_SITE_URL` environment variable in Vercel (recommended)
   - Or manually update `src/app/sitemap.ts` and `public/robots.txt` with your actual domain

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

## On-Demand Cache Revalidation

By default, your website caches Sanity content for 30 seconds. To see new content immediately after publishing in Sanity Studio, set up on-demand revalidation:

### Step 1: Generate Secret Token

```bash
openssl rand -hex 32
```

Copy the generated token.

### Step 2: Add to Vercel

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Add `REVALIDATE_SECRET` with the generated token
3. Apply to **Production**, **Preview**, and **Development**
4. Click **Save**

### Step 3: Set Up Sanity Webhook

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project → **API** → **Webhooks**
3. Click **Create webhook**
4. Configure:
   - **Name:** `Revalidate Next.js Cache`
   - **URL:** `https://your-domain.vercel.app/api/revalidate` (replace with your actual domain)
   - **Dataset:** `production` (or your dataset name)
   - **Trigger on:** ✅ Create, ✅ Update, ✅ Delete
   - **HTTP method:** `POST`
   - **API version:** `v2021-06-07` or latest
   - **Secret:** (paste the same token from Step 1)
   - **Filter:** Leave empty (or use `_type == "event" || _type == "newsPost"` to limit)
   - **Projections:** Leave empty
5. Click **Save**

### Step 4: Test

1. Publish or update content in Sanity Studio
2. Check Vercel function logs (Dashboard → Your Project → **Functions** → `/api/revalidate`)
3. Your website should update within seconds

**Note:** Without the webhook, new content will appear after 30 seconds or when you manually redeploy.

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

