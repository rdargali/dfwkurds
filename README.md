# Kurdish American Community Association of DFW

A high-performance, mobile-first, culturally sensitive multilingual website for the Kurdish American Community Association of Dallas-Fort Worth.

**Version:** 1.0.0 (Initial Release)  
**Release Date:** December 2025

## 🌟 Features

### Trilingual Support

- **English (en)** — Default language, LTR layout
- **Sorani Kurdish (ckb)** — Full RTL support with Arabic script fonts (کوردی سۆرانی)
- **Kurmanji Kurdish (kmr)** — Latin script, LTR layout (Kurmancî)

### Cultural Design

- **Kurdish Flag Colors** — Authentic red (#ED2024), green (#278E43), and gold (#FEBD11) palette
- **21-Ray Sun Emblem** — Custom SVG component representing Newroz (March 21st)
- **RTL/LTR Support** — Automatic layout direction based on language
- **Typography** — Outfit for Latin text, Noto Naskh Arabic for Kurdish script

### Mobile-First Design

- Sticky bottom navigation on mobile devices
- Touch-friendly button sizes (min 44px tap targets)
- Responsive card layouts
- Optimized for older users and children alike

### Progressive Web App (PWA)

- **Installable** — Users can install the app on their devices
- **Offline Support** — Cached content available when offline
- **Fast Loading** — Service worker caches assets for instant loading
- **App-like Experience** — Standalone mode with custom theme colors

### Pages

| Page          | Description                                                                      |
| ------------- | -------------------------------------------------------------------------------- |
| **Home**      | Hero section with Kurdish sun, mission overview, historical figures              |
| **About**     | Mission statement, team members grid                                             |
| **Events**    | Community events with date localization, Google Maps links, calendar integration |
| **News**      | News posts and updates with featured posts, full article pages, and rich content |
| **Resources** | Categorized community resources with external links                              |

## 🛠 Tech Stack

| Technology   | Version | Purpose                         |
| ------------ | ------- | ------------------------------- |
| Next.js      | 16.0.8  | React framework with App Router |
| React        | 19.2.1  | UI library                      |
| Tailwind CSS | 4.x     | Utility-first styling           |
| next-intl    | 4.5.8   | Internationalization            |
| Sanity.io    | 4.x     | Headless CMS                    |
| TypeScript   | 5.x     | Type safety                     |
| next-pwa     | 5.6.0   | Progressive Web App support     |

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-org/dfwkurds.git
cd dfwkurds
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Copy the sample environment file and update with your values:

```bash
cp .env.sample .env.local
```

Then edit `.env.local` with your Sanity project credentials:

```env
# For Sanity Studio (automatically loaded by Sanity)
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production

# For Next.js website (also required)
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

**Note:** Sanity Studio automatically loads `.env` files and exposes variables with the `SANITY_STUDIO_` prefix. The `NEXT_PUBLIC_` variables are used by your Next.js website.

**Where to get your Sanity Project ID:**

- Go to [sanity.io/manage](https://www.sanity.io/manage)
- Create a new project or select an existing one
- Copy the Project ID from the project settings

4. **Run the development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev          # Start development server (Turbopack)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run sanity:deploy # Deploy Sanity Studio
```

### Icon Generation Scripts

```bash
# Generate source icon (512x512) from Kurdish Sun logo
node scripts/generate-source-icon.js

# Generate all PWA icon sizes from source icon
node scripts/generate-icons.js
```

## 📁 Project Structure

```
dfwkurds/
├── messages/                    # Translation JSON files
│   ├── en.json                 # English translations
│   ├── ckb.json                # Sorani Kurdish translations
│   └── kmr.json                # Kurmanji Kurdish translations
├── public/                      # Static assets
│   └── icons/                  # PWA icons (generated)
├── sanity/                      # Sanity CMS configuration
│   └── schemas/                # Content type definitions
│       ├── event.ts            # Events schema
│       ├── newsPost.ts         # News articles schema
│       ├── historicalFigure.ts # Historical figures schema
│       ├── teamMember.ts       # Team members schema
│       ├── resource.ts         # Resources schema
│       └── localeString.ts     # Localized string helper
├── scripts/                     # Build and utility scripts
│   ├── generate-icons.js       # Generate PWA icons
│   └── generate-source-icon.js # Generate source icon
├── src/
│   ├── app/
│   │   ├── [locale]/           # Localized pages
│   │   │   ├── layout.tsx      # Root layout with fonts & direction
│   │   │   ├── page.tsx        # Home page
│   │   │   ├── about/          # About page
│   │   │   ├── events/         # Events listing page
│   │   │   ├── news/           # News section
│   │   │   │   ├── page.tsx    # News listing page
│   │   │   │   └── [slug]/     # Individual news post pages
│   │   │   └── resources/      # Resources page
│   │   ├── api/
│   │   │   └── revalidate/     # On-demand cache revalidation
│   │   └── offline/            # Offline page for PWA
│   ├── components/             # React components
│   │   ├── about/              # About page components
│   │   ├── events/             # Events components
│   │   ├── home/               # Homepage components
│   │   ├── layout/             # Layout components (Header, Footer, Nav)
│   │   ├── news/               # News components
│   │   └── resources/          # Resources components
│   ├── data/                   # Placeholder/fallback data
│   │   ├── placeholderEvents.ts
│   │   ├── placeholderNewsPosts.ts
│   │   └── placeholderResources.ts
│   ├── i18n/                   # Internationalization
│   │   ├── config.ts          # Locale configuration
│   │   └── request.ts         # Request configuration
│   └── lib/                    # Shared utilities
│       ├── design-tokens.ts    # Design system tokens
│       ├── page-utils.ts       # Reusable page utilities
│       └── sanity.ts           # Sanity client and helpers
│   │   │   ├── about/          # About page
│   │   │   ├── events/         # Events page
│   │   │   ├── news/           # News pages
│   │   │   │   ├── page.tsx    # News list page
│   │   │   │   └── [slug]/     # Individual news post pages
│   │   │   └── resources/      # Resources page
│   │   ├── globals.css         # Global styles & design tokens
│   │   └── favicon.ico
│   ├── components/
│   │   ├── layout/             # Header, Footer, MobileNav, LanguageSwitcher
│   │   ├── home/               # HeroSection, MissionSection, HistoricalFigures
│   │   ├── about/              # MissionSection, TeamSection
│   │   ├── events/             # EventsList, EventCard
│   │   ├── news/               # NewsList, NewsCard
│   │   └── resources/          # ResourcesList, ResourceCard
│   ├── i18n/
│   │   ├── config.ts           # Locale configuration
│   │   └── request.ts          # next-intl request config
│   ├── data/                   # Placeholder/fallback data
│   │   ├── placeholderEvents.ts
│   │   ├── placeholderNewsPosts.ts
│   │   └── placeholderResources.ts
│   ├── lib/                    # Shared utilities
│   │   ├── design-tokens.ts    # Color & design constants
│   │   ├── page-utils.ts       # Reusable page utilities (locale, metadata, data fetching)
│   │   └── sanity.ts           # Sanity client & helpers
│   └── proxy.ts                # Locale detection proxy (Next.js 16)
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
├── sanity.cli.js               # Sanity CLI configuration (reads from .env.local)
├── .env.sample                 # Environment variables template
└── package.json
```

## 🎨 Design System

### Color Palette

| Name          | CSS Variable   | Hex       | Usage                      |
| ------------- | -------------- | --------- | -------------------------- |
| Kurdish Red   | `--kurd-red`   | `#ED2024` | Primary actions, accents   |
| Kurdish Green | `--kurd-green` | `#278E43` | Success, secondary accents |
| Kurdish Gold  | `--kurd-gold`  | `#FEBD11` | Highlights, sun emblem     |
| Slate 900     | `--slate-900`  | `#1E293B` | Dark backgrounds, text     |
| Slate 50      | `--slate-50`   | `#F8FAFC` | Light backgrounds          |

### Typography

- **Headings:** Outfit (geometric sans-serif)
- **Body:** Outfit
- **Arabic Script:** Noto Naskh Arabic
- **Accent:** Playfair Display (serif)

### RTL Support

The site automatically switches layout direction based on locale:

- Uses `dir="rtl"` on `<html>` for Sorani Kurdish (ckb)
- Tailwind logical properties: `ms-`, `me-`, `ps-`, `pe-`, `start`, `end`
- Mirrored navigation and content flow

## 🗄️ Sanity CMS Setup

### Creating a Sanity Project

1. **Create a new project at [sanity.io/manage](https://www.sanity.io/manage)**
   - Sign in or create a Sanity account
   - Click "Create new project"
   - Choose a project name (e.g., "DFW Kurds")
   - Select a dataset name (usually `production`)

2. **Get your Project ID:**
   - In your project dashboard, go to Settings → API
   - Copy your Project ID (looks like: `abc123xyz`)

3. **Configure environment variables:**

   ```bash
   cp .env.sample .env.local
   ```

   Then edit `.env.local` and add your Project ID:

   ```env
   # For Sanity Studio (automatically loaded by Sanity)
   SANITY_STUDIO_PROJECT_ID=your-actual-project-id
   SANITY_STUDIO_DATASET=production

   # For Next.js (also needed for the website)
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

   **Note:** Sanity Studio automatically loads `.env` files and exposes variables with the `SANITY_STUDIO_` prefix. The `NEXT_PUBLIC_` variables are used by your Next.js website.

4. **Deploy Sanity Studio (optional):**

```bash
# Run from project root
sanity deploy
# Or use the npm script
npm run sanity:deploy
```

**Sanity CLI Configuration:**

The project includes `sanity.cli.js` in the root directory that:

- Automatically loads your project ID from `.env.local`
- Supports optional `SANITY_APP_ID` to prevent deployment prompts
- Works with all Sanity CLI commands (`deploy`, `schema`, etc.)

**Optional: Add App ID to prevent deployment prompts**

After your first `sanity deploy`, you'll get an app ID. Add it to `.env.local`:

```env
SANITY_APP_ID=your-app-id-here
```

This prevents Sanity from prompting for the application ID on future deploys.

**Troubleshooting Sanity CLI Errors:**

If you get an error: `"sanity.cli.js does not contain a project identifier"`:

1. **Ensure `.env.local` exists** in the project root with your Sanity project ID:

   ```bash
   cp .env.sample .env.local
   # Then edit .env.local and add your actual project ID
   ```

2. **Verify your project ID is set:**

   ```bash
   # Check if the config can read your project ID
   node -e "const config = require('./sanity.cli.js'); console.log('Project ID:', config.api.projectId);"
   ```

3. **Restart your terminal** after creating/updating `.env.local`

4. **Ensure `sanity.cli.js` exists** in the project root: `./sanity.cli.js`

The `sanity.cli.js` file automatically loads your project ID and dataset from `.env.local`.

### Content Types

All content types support field-level localization (en, ckb, kmr):

| Type                  | Fields                                                              |
| --------------------- | ------------------------------------------------------------------- |
| **Event**             | title, description, date, location, address, image, registrationUrl |
| **News Post**         | title, body, mainImage, publishedAt, featured, slug                 |
| **Team Member**       | name, role, photo, bio, email, linkedin, order                      |
| **Resource**          | name, url, description, logo, category, order                       |
| **Historical Figure** | name, role, description, photo, color, order                        |

## 📱 Progressive Web App (PWA)

This website is a Progressive Web App, allowing users to install it on their devices and use it offline.

### Features

- **Installable** — Add to home screen on mobile and desktop
- **Offline Support** — Cached pages work without internet
- **Fast Performance** — Service worker caches assets
- **App-like Experience** — Standalone mode with custom theme

### Generating PWA Icons

Before deploying, you need to generate PWA icons:

1. **Generate the source icon:**

   The source icon is automatically generated from the Kurdish Sun logo:

   ```bash
   # Generate 512x512 source icon (red background, gold sun)
   node scripts/generate-source-icon.js
   ```

   This creates `public/icon-source.png` with the Kurdish Sun emblem on a red background.

2. **Generate all PWA icon sizes:**

   ```bash
   # Generate all required icon sizes (72, 96, 128, 144, 152, 192, 384, 512)
   node scripts/generate-icons.js
   ```

3. **Verify icons:**
   - Check that all icons are in `public/icons/` directory
   - Sizes: 72, 96, 128, 144, 152, 192, 384, 512 pixels

**Note:** `icon-source.png` is gitignored and won't be committed. The generated icons in `public/icons/` are tracked.

### Testing PWA

1. **Build the app:**

   ```bash
   npm run build
   npm run start
   ```

2. **Test installation:**
   - Open the site in Chrome/Edge
   - Look for the install prompt in the address bar
   - Or use Chrome DevTools → Application → Manifest

3. **Test offline:**
   - Open Chrome DevTools → Network
   - Enable "Offline" mode
   - Navigate to previously visited pages

### PWA Configuration

- **Manifest:** `/public/manifest.json`
- **Service Worker:** Auto-generated by next-pwa in production
- **Theme Color:** `#ED2024` (Kurdish red)
- **Background Color:** `#0F172A` (slate-900)

**Note:** PWA features are disabled in development mode. Test in production build.

## 🚀 Deployment

### Vercel (Recommended)

**Quick Start:**

1. **Ensure your code is pushed to GitHub:**

   ```bash
   git push origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Sign in with your **GitHub account** (important!)
   - Click **"Import Git Repository"**
   - Find and select `hanatgit/dfwkurds` repository
   - Click **"Import"**

3. **Configure Project Settings:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)

4. **Add Environment Variables:**
   Click **"Environment Variables"** and add:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` — Your Sanity project ID
   - `NEXT_PUBLIC_SANITY_DATASET` — Usually `production`
   - `NEXT_PUBLIC_SITE_URL` — (Optional) Your production URL

5. **Deploy:**
   - Click **"Deploy"** button
   - Wait 2-3 minutes for build to complete
   - Your site will be live!

**Troubleshooting:**

- **Can't see the project?** Make sure you're signed in with the GitHub account that owns the repository
- **Repository not showing?** Check that Vercel has access to your GitHub repositories (Settings → Git → GitHub)
- **Build fails?** Check the build logs in Vercel dashboard for specific errors

**Quick Deploy via CLI (Alternative):**

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

### Other Platforms

The site can be deployed to any platform supporting Next.js 16:

- **Netlify** — Use the Next.js plugin
- **AWS Amplify** — Next.js SSR support
- **Docker** — Use `next build && next start`
- **Node.js Server** — Run `npm run build && npm run start`

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm run start

# Or use a process manager like PM2
pm2 start npm --name "dfwkurds" -- start
```

## 🔧 Configuration

### Environment Variables

| Variable                        | Required | Description                                                  |
| ------------------------------- | -------- | ------------------------------------------------------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes      | Sanity project ID from sanity.io/manage                      |
| `NEXT_PUBLIC_SANITY_DATASET`    | Yes      | Dataset name (usually `production`)                          |
| `NEXT_PUBLIC_SITE_URL`          | No       | Production site URL for sitemap/SEO                          |
| `SANITY_API_TOKEN`              | No       | Token for authenticated Sanity requests                      |
| `SANITY_APP_ID`                 | No       | Sanity Studio deployment app ID (prevents prompts on deploy) |
| `REVALIDATE_SECRET`             | No       | Secret token for on-demand cache revalidation (see below)    |

### Customization

**Adding a new language:**

1. Add locale to `src/i18n/config.ts`
2. Create translation file in `messages/`
3. Add to `sanity/schemas/localeString.ts`
4. Update middleware matcher if needed

**Changing colors:**
Edit CSS variables in `src/app/globals.css`

**Adding new pages:**
Create folder in `src/app/[locale]/` with `page.tsx`

### On-Demand Cache Revalidation

By default, the website caches Sanity content for 30 seconds in production. To see new content immediately after publishing in Sanity Studio, set up on-demand revalidation:

1. **Generate a secret token:**

   ```bash
   openssl rand -hex 32
   ```

2. **Add to Vercel environment variables:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add `REVALIDATE_SECRET` with the generated token
   - Apply to **Production**, **Preview**, and **Development** environments

3. **Set up Sanity webhook:**
   - Go to [sanity.io/manage](https://www.sanity.io/manage)
   - Select your project → **API** → **Webhooks**
   - Click **Create webhook**
   - **Name:** `Revalidate Next.js Cache`
   - **URL:** `https://your-domain.com/api/revalidate`
   - **Dataset:** `production` (or your dataset name)
   - **Trigger on:** ✅ Create, ✅ Update, ✅ Delete
   - **HTTP method:** `POST`
   - **API version:** `v2021-06-07` or latest
   - **Secret:** (same value as `REVALIDATE_SECRET`)
   - **Filter:** Leave empty (or use `_type == "event" || _type == "newsPost"` to limit)
   - **Projections:** Leave empty
   - Click **Save**

4. **Test the webhook:**
   - Publish or update content in Sanity Studio
   - Check Vercel function logs to see if revalidation was triggered
   - Your website should update within seconds

**Note:** Without the webhook, new content will appear after the cache expires (30 seconds) or when you manually redeploy.

## 🐛 Troubleshooting

### ⚠️ CRITICAL: Environment Variables Not Set

**This is the #1 most common issue!** If you see this error:

```
Dataset "production" not found for project ID "your-project-id"
```

**This means `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are not set in Vercel!**

#### Quick Fix: Add Environment Variables to Vercel

1. **Get your Sanity Project ID:**
   - Go to [sanity.io/manage](https://www.sanity.io/manage)
   - Select your project
   - Copy the **Project ID** (looks like: `5d0aj8a7`)

2. **Add to Vercel (REQUIRED):**
   - Go to **Vercel Dashboard** → Your Project
   - Click **Settings** → **Environment Variables**
   - Click **"Add New"**
   - Add these **two required variables**:
     - **Key:** `NEXT_PUBLIC_SANITY_PROJECT_ID` | **Value:** Your actual Sanity Project ID
     - **Key:** `NEXT_PUBLIC_SANITY_DATASET` | **Value:** `production`
     - **Environment:** Select **Production**, **Preview**, and **Development** (or "All")
   - Click **Save**

3. **Redeploy (REQUIRED):**
   - After adding variables, go to **Deployments** tab
   - Click the **"..."** menu on the latest deployment
   - Click **"Redeploy"**
   - ⚠️ **Important:** Environment variables only take effect after redeploy!

### Content Not Appearing on Production Site

If you've added content in Sanity Studio but it's not showing on your Vercel production site:

#### Step 1: Verify Content Requirements

- **Content Must Be Published** - In Sanity Studio, make sure you clicked **"Publish"** (not just "Save")
- **Required Fields Must Be Filled** - Check that all required fields are completed
- **Event Date Must Be in the Future** - For events, the date must be `>= now()`

#### Step 2: Check Cache Status

The site caches content for 30 seconds. After publishing:

- Wait 30 seconds and refresh the page
- Or manually trigger revalidation (see below)

#### Step 3: Manual Cache Revalidation

**Option A: Via API Endpoint (Recommended)**

1. **Get your revalidation secret:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Copy the value of `REVALIDATE_SECRET`

2. **Trigger revalidation:**

   ```bash
   # Replace YOUR_SECRET and YOUR_DOMAIN with actual values
   curl "https://YOUR_DOMAIN.vercel.app/api/revalidate?secret=YOUR_SECRET&path=/en/events"
   ```

3. **Revalidate all locales:**
   ```bash
   curl "https://YOUR_DOMAIN.vercel.app/api/revalidate?secret=YOUR_SECRET&path=/en/events"
   curl "https://YOUR_DOMAIN.vercel.app/api/revalidate?secret=YOUR_SECRET&path=/sorani/events"
   curl "https://YOUR_DOMAIN.vercel.app/api/revalidate?secret=YOUR_SECRET&path=/kurmanji/events"
   ```

**Option B: Redeploy on Vercel**

1. Go to Vercel Dashboard → Your Project
2. Click **"Redeploy"** → **"Redeploy"** (latest deployment)
3. Wait for deployment to complete

#### Step 4: Set Up Automatic Revalidation (Webhook)

To automatically update the site when you publish content, set up a webhook (see "On-Demand Cache Revalidation" section above).

#### Step 5: Debug in Production

**Check Vercel function logs:**

1. Go to Vercel Dashboard → Your Project
2. Click **"Functions"** tab
3. Find `/api/revalidate` function
4. Check **"Logs"** for any errors

**Check browser console:**

1. Open your production site
2. Open Developer Tools (F12)
3. Check Console for any errors
4. Look for `[Events] Fetched X events from Sanity` log message

**Test the Sanity query directly:**

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
4. Verify your content appears in the results

### Common Issues

**Issue:** Content has past date (for events)

- **Solution:** Update the date to a future date in Sanity Studio

**Issue:** Content is a draft

- **Solution:** Click "Publish" button in Sanity Studio

**Issue:** Cache not refreshing

- **Solution:** Set up webhook (see "On-Demand Cache Revalidation" section) or manually revalidate

**Issue:** Webhook not working

- **Solution:**
  - Verify `REVALIDATE_SECRET` is set in Vercel
  - Check webhook secret matches Vercel secret
  - Check Vercel function logs for errors
  - Verify webhook URL is correct (no trailing slash)

**Issue:** Build errors

- **Solution:**
  - Ensure all required environment variables are set
  - Check for typos in variable names
  - Check build logs in Vercel dashboard for specific errors

**Issue:** PWA build warnings

- **Solution:** These are normal and won't prevent deployment. Service worker files are generated during build.

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

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 90+
- Safari 14+
- iOS Safari 14+
- Chrome for Android 90+

## 🔍 SEO & Performance

- **Sitemap:** Auto-generated at `/sitemap.xml`
- **Robots.txt:** Configured at `/robots.txt`
- **Open Graph:** Full metadata for social sharing
- **Twitter Cards:** Optimized for Twitter sharing
- **PWA:** Installable with offline support
- **Image Optimization:** Next.js Image component with Sanity CDN

**Note:** Update the domain in `src/app/sitemap.ts` and `public/robots.txt` before deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add my feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Open a Pull Request

## 📋 Release Information

**Current Version:** 1.0.0 (Initial Release)  
**Release Date:** December 10, 2025

For version history, see [`CHANGELOG.md`](./CHANGELOG.md).

## 📄 License

Copyright © 2025 Kurdish American Community Association of DFW. All rights reserved.

---

**Version 1.0.0** - Built with ❤️ for the Kurdish community in Dallas-Fort Worth
