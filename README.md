# Kurdish American Community Association of DFW

A high-performance, mobile-first, culturally sensitive multilingual website for the Kurdish American Community Association of Dallas-Fort Worth.

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
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

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
```

## 📁 Project Structure

```
dfwkurds/
├── messages/                    # Translation JSON files
│   ├── en.json                 # English translations
│   ├── ckb.json                # Sorani Kurdish translations
│   └── kmr.json                # Kurmanji Kurdish translations
├── public/                      # Static assets
├── sanity/                      # Sanity CMS configuration
│   ├── sanity.config.ts        # Studio configuration
│   └── schemas/                # Content type definitions
│       ├── event.ts            # Events schema
│       ├── newsPost.ts         # News articles schema
│       ├── teamMember.ts       # Team members schema
│       ├── resource.ts         # Resources schema
│       └── localeString.ts     # Localized string helper
├── src/
│   ├── app/
│   │   ├── [locale]/           # Localized pages
│   │   │   ├── layout.tsx      # Root layout with fonts & direction
│   │   │   ├── page.tsx        # Home page
│   │   │   ├── about/          # About page
│   │   │   ├── events/         # Events page
│   │   │   └── resources/      # Resources page
│   │   ├── globals.css         # Global styles & design tokens
│   │   └── favicon.ico
│   ├── components/
│   │   ├── layout/             # Header, Footer, MobileNav, LanguageSwitcher
│   │   ├── home/               # HeroSection, MissionSection, HistoricalFigures
│   │   ├── about/              # MissionSection, TeamSection
│   │   ├── events/             # EventsList, EventCard
│   │   └── resources/          # ResourcesList, ResourceCard
│   ├── i18n/
│   │   ├── config.ts           # Locale configuration
│   │   └── request.ts          # next-intl request config
│   ├── lib/
│   │   ├── sanity.ts           # Sanity client & helpers
│   │   └── design-tokens.ts    # Color & design constants
│   └── proxy.ts                # Locale detection proxy (Next.js 16)
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
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
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

4. **Deploy Sanity Studio (optional):**

```bash
# Run from project root (recommended)
sanity deploy
```

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
   node -e "require('./sanity.cli.js')"
   ```

3. **Restart your terminal** after creating/updating `.env.local`

4. **Ensure `sanity.cli.js` exists** in the project root: `./sanity.cli.js`

The `sanity.cli.js` file in the root automatically loads your project ID from `.env.local`.

**Note:** The `sanity.cli.js` file will automatically read your project ID from `.env.local`. Make sure you've created `.env.local` with your Sanity project ID before running Sanity CLI commands.

### Content Types

All content types support field-level localization (en, ckb, kmr):

| Type            | Fields                                                              |
| --------------- | ------------------------------------------------------------------- |
| **Event**       | title, description, date, location, address, image, registrationUrl |
| **News Post**   | title, body, mainImage, publishedAt, featured                       |
| **Team Member** | name, role, photo, bio, email, linkedin, order                      |
| **Resource**    | name, url, description, logo, category, order                       |

## 📱 Progressive Web App (PWA)

This website is a Progressive Web App, allowing users to install it on their devices and use it offline.

### Features

- **Installable** — Add to home screen on mobile and desktop
- **Offline Support** — Cached pages work without internet
- **Fast Performance** — Service worker caches assets
- **App-like Experience** — Standalone mode with custom theme

### Generating PWA Icons

Before deploying, you need to generate PWA icons:

1. **Create a source image:**
   - Create a 512x512px PNG image with the Kurdish Sun symbol
   - Save it as `public/icon-source.png`

2. **Generate icons:**

   ```bash
   # Install sharp (if not already installed)
   npm install --save-dev sharp

   # Generate all icon sizes
   node scripts/generate-icons.js
   ```

3. **Verify icons:**
   - Check that all icons are in `public/icons/` directory
   - Sizes: 72, 96, 128, 144, 152, 192, 384, 512 pixels

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

See `VERCEL_DEPLOYMENT.md` for detailed deployment instructions.

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

| Variable                        | Required | Description                             |
| ------------------------------- | -------- | --------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes      | Sanity project ID from sanity.io/manage |
| `NEXT_PUBLIC_SANITY_DATASET`    | Yes      | Dataset name (usually `production`)     |
| `NEXT_PUBLIC_SITE_URL`          | No       | Production site URL for sitemap/SEO     |
| `SANITY_API_TOKEN`              | No       | Token for authenticated Sanity requests |

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

## 📄 License

Copyright © 2024 Kurdish American Community Association of DFW. All rights reserved.

---

Built with ❤️ for the Kurdish community in Dallas-Fort Worth
