# Troubleshooting Guide

## ⚠️ CRITICAL: Environment Variables Not Set

**This is the #1 most common issue!** If you see this error:
```
Dataset "production" not found for project ID "your-project-id"
```

**This means `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are not set in Vercel!**

### Quick Fix: Add Environment Variables to Vercel

1. **Get your Sanity Project ID:**
   - Go to [sanity.io/manage](https://www.sanity.io/manage)
   - Select your project
   - Copy the **Project ID** (looks like: `5d0aj8a7`)

2. **Add to Vercel (REQUIRED):**
   - Go to **Vercel Dashboard** → Your Project
   - Click **Settings** → **Environment Variables**
   - Click **"Add New"**
   - Add these **two required variables**:

   **Variable 1:**
   - **Key:** `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - **Value:** Your actual Sanity Project ID (e.g., `5d0aj8a7`)
   - **Environment:** Select **Production**, **Preview**, and **Development** (or "All")
   - Click **Save**

   **Variable 2:**
   - **Key:** `NEXT_PUBLIC_SANITY_DATASET`
   - **Value:** `production`
   - **Environment:** Select **Production**, **Preview**, and **Development** (or "All")
   - Click **Save**

3. **Redeploy (REQUIRED):**
   - After adding variables, go to **Deployments** tab
   - Click the **"..."** menu on the latest deployment
   - Click **"Redeploy"**
   - ⚠️ **Important:** Environment variables only take effect after redeploy!

4. **Verify:**
   - After redeploy completes, check your site
   - The error should be gone
   - Events should now load from Sanity
   - Your new events should appear

**Note:** These variables are also needed in your local `.env.local` file for development. See `.env.sample` for the template.

---

## Events Not Appearing on Production Site

If you've added a new event in Sanity Studio but it's not showing on your Vercel production site, follow these steps:

### Step 1: Verify Event Requirements

Your event must meet these criteria to appear:

1. **Event Date Must Be in the Future**
   - The query filters: `eventDate >= now()`
   - Check your event's date in Sanity Studio
   - Make sure the date/time is set to a future date

2. **Event Must Be Published**
   - In Sanity Studio, make sure you clicked **"Publish"** (not just "Save")
   - Draft events won't appear on the website

3. **Required Fields Must Be Filled**
   - Title (at least in English)
   - Slug (auto-generated from title)
   - Event Date & Time

### Step 2: Check Cache Status

The site caches events for 30 seconds. After publishing:
- Wait 30 seconds and refresh the page
- Or manually trigger revalidation (see below)

### Step 3: Manual Cache Revalidation

#### Option A: Via API Endpoint (Recommended)

1. **Get your revalidation secret:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Copy the value of `REVALIDATE_SECRET`

2. **Trigger revalidation:**
   ```bash
   # Replace YOUR_SECRET and YOUR_DOMAIN with actual values
   curl "https://YOUR_DOMAIN.vercel.app/api/revalidate?secret=YOUR_SECRET&path=/en/events"
   ```

   Or visit in browser:
   ```
   https://YOUR_DOMAIN.vercel.app/api/revalidate?secret=YOUR_SECRET&path=/en/events
   ```

3. **Revalidate all locales:**
   ```bash
   curl "https://YOUR_DOMAIN.vercel.app/api/revalidate?secret=YOUR_SECRET&path=/en/events"
   curl "https://YOUR_DOMAIN.vercel.app/api/revalidate?secret=YOUR_SECRET&path=/sorani/events"
   curl "https://YOUR_DOMAIN.vercel.app/api/revalidate?secret=YOUR_SECRET&path=/kurmanji/events"
   ```

#### Option B: Redeploy on Vercel

1. Go to Vercel Dashboard → Your Project
2. Click **"Redeploy"** → **"Redeploy"** (latest deployment)
3. Wait for deployment to complete

### Step 4: Set Up Automatic Revalidation (Webhook)

To automatically update the site when you publish content:

1. **Generate a secret token:**
   ```bash
   openssl rand -hex 32
   ```

2. **Add to Vercel:**
   - Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add `REVALIDATE_SECRET` with the generated token
   - Apply to **Production**, **Preview**, and **Development**

3. **Create Sanity webhook:**
   - Go to [sanity.io/manage](https://www.sanity.io/manage)
   - Your Project → **API** → **Webhooks** → **Create webhook**
   - **Name:** `Revalidate Next.js Cache`
   - **URL:** `https://YOUR_DOMAIN.vercel.app/api/revalidate`
   - **Dataset:** `production`
   - **Trigger on:** ✅ Create, ✅ Update, ✅ Delete
   - **HTTP method:** `POST`
   - **API version:** `v2021-06-07` or latest
   - **Secret:** (same value as `REVALIDATE_SECRET`)
   - **Filter:** `_type == "event"` (optional, to limit to events only)
   - Click **Save**

4. **Test the webhook:**
   - Publish or update an event in Sanity Studio
   - Check Vercel function logs (Dashboard → Functions → `/api/revalidate`)
   - Your site should update within seconds

### Step 5: Debug in Production

Check Vercel function logs:

1. Go to Vercel Dashboard → Your Project
2. Click **"Functions"** tab
3. Find `/api/revalidate` function
4. Check **"Logs"** for any errors

Check browser console:
1. Open your production site
2. Open Developer Tools (F12)
3. Check Console for any errors
4. Look for `[Events] Fetched X events from Sanity` log message

### Step 6: Verify Event Data

Test the Sanity query directly:

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Your Project → **API** → **Vision** (GROQ query tool)
3. Run this query:
   ```groq
   *[_type == "event" && eventDate >= now()] | order(eventDate asc) {
     _id,
     title,
     eventDate,
     "isPublished": !(_id in path("drafts.**"))
   }
   ```
4. Verify your event appears in the results
5. Check that `isPublished` is `true`

### Common Issues

**Issue:** Event has past date
- **Solution:** Update the event date to a future date in Sanity Studio

**Issue:** Event is a draft
- **Solution:** Click "Publish" button in Sanity Studio

**Issue:** Cache not refreshing
- **Solution:** Set up webhook (Step 4) or manually revalidate (Step 3)

**Issue:** Webhook not working
- **Solution:** 
  - Verify `REVALIDATE_SECRET` is set in Vercel
  - Check webhook secret matches Vercel secret
  - Check Vercel function logs for errors
  - Verify webhook URL is correct (no trailing slash)

**Issue:** Event missing required fields
- **Solution:** Fill in Title, Slug, and Event Date in Sanity Studio

### Still Not Working?

1. **Check Sanity project ID:**
   - Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` in Vercel matches your Sanity project
   - Verify `NEXT_PUBLIC_SANITY_DATASET` is set to `production`

2. **Check build logs:**
   - Vercel Dashboard → Your Project → Deployments → Latest → Build Logs
   - Look for any errors during build

3. **Contact support:**
   - Check Vercel function logs for specific error messages
   - Check browser console for client-side errors
   - Verify all environment variables are set correctly

