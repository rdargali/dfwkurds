# Changelog

## [Unreleased] - News Section Implementation

### ✨ Added

#### News Section
- **News List Page** (`/[locale]/news`)
  - Displays all news posts sorted by publication date
  - Featured posts section at the top
  - All posts section below
  - Empty state when no posts available
  - Fully multilingual (English, Sorani, Kurmanji)

- **News Detail Page** (`/[locale]/news/[slug]`)
  - Individual news post pages with full content
  - PortableText rendering for rich content
  - Featured badge display
  - Publication date with localized formatting
  - Back to news navigation
  - Responsive image display

- **News Components**
  - `NewsList` - Main list component with featured/all posts sections
  - `NewsCard` - Individual news post card component
  - Both components support all three languages

- **Navigation Updates**
  - Added "News" link to desktop header navigation
  - Added "News" link to mobile bottom navigation with icon
  - News appears between Events and Resources

- **Translations**
  - Added news translations in English (`messages/en.json`)
  - Added news translations in Sorani (`messages/ckb.json`)
  - Added news translations in Kurmanji (`messages/kmr.json`)
  - Includes: title, subtitle, featured, all_posts, no_posts, read_more, back_to_news

- **Sample News Posts**
  - 5 placeholder news posts with full content in all languages
  - 2 featured posts (Newroz Celebration, Cultural Exhibition)
  - 3 regular posts (Language Classes, Health Fair, Board Members)
  - All posts include PortableText body content

- **Revalidation Support**
  - Updated `/api/revalidate` route to handle `newsPost` content type
  - Automatic cache clearing when news posts are published/updated
  - Supports both static and dynamic routes

#### Resources Section Updates
- **New "News" Category**
  - Added "News" category to resource schema
  - Added 7 news source resources (Rudaw, Kurdistan 24, Bas News, etc.)
  - Unique color scheme for each resource category
  - Updated category colors to be unique:
    - Government: Kurd Red
    - Legal: Kurd Green
    - Education: Kurd Gold
    - Healthcare: Blue
    - Community: Indigo
    - Cultural: Amber
    - Employment: Teal
    - News: Cyan
    - Other: Slate

- **Restored Original Resources**
  - Kept original 6 community resources (USCIS, Texas Workforce, etc.)
  - Added news sources as separate category

#### Historical Figures
- **Sanity Integration**
  - Created `historicalFigure` schema in Sanity
  - Updated component to fetch from Sanity with fallback
  - Added to revalidation route
  - Supports localized name, role, description, photo, color, and order

### 🔧 Changed

- **Resource Category Colors**
  - Made each category color unique for better visual distinction
  - Updated both `ResourcesList` and `ResourceCard` components

- **Navigation Structure**
  - Updated header navigation to include News
  - Updated mobile navigation to include News with icon

- **Revalidation Route**
  - Added news post revalidation
  - Updated to handle all content types properly

### 📝 Documentation

- **README.md Updates**
  - Added News page to Pages section
  - Updated file structure to include news pages and components
  - Updated content types table to include slug for News Post
  - Added news components to components section

- **Translation Files**
  - Recreated `messages/en.json` with all translations including news section
  - Updated `messages/ckb.json` with news translations
  - Updated `messages/kmr.json` with news translations

### 🐛 Fixed

- **404 Errors on News Posts**
  - Fixed `generateStaticParams` to use correct URL paths (en, sorani, kurmanji)
  - Added placeholder slugs to static params generation
  - Added fallback to placeholder posts in detail page
  - Added `dynamicParams = true` to allow dynamic routes

### 📦 Files Changed

**New Files:**
- `src/app/[locale]/news/page.tsx` - News list page
- `src/app/[locale]/news/[slug]/page.tsx` - News detail page
- `src/components/news/NewsList.tsx` - News list component
- `src/components/news/NewsCard.tsx` - News card component
- `sanity/schemas/historicalFigure.ts` - Historical figures schema

**Modified Files:**
- `src/components/layout/Header.tsx` - Added News navigation
- `src/components/layout/MobileNav.tsx` - Added News navigation
- `src/components/resources/ResourcesList.tsx` - Added News category, unique colors
- `src/components/resources/ResourceCard.tsx` - Added News category, unique colors
- `src/app/[locale]/resources/page.tsx` - Added news resources, restored originals
- `src/app/api/revalidate/route.ts` - Added news post revalidation
- `sanity/schemas/resource.ts` - Added News category
- `sanity/schemas/index.ts` - Added historicalFigure export
- `messages/en.json` - Added news translations (recreated)
- `messages/ckb.json` - Added news translations
- `messages/kmr.json` - Added news translations
- `README.md` - Updated documentation

---

## Previous Changes

### Historical Figures Integration
- Migrated historical figures from hardcoded to Sanity CMS
- Added fallback data for when Sanity is unavailable
- Created Sanity schema with localized fields

### Resource Category Updates
- Added unique colors for each resource category
- Improved visual distinction between categories

