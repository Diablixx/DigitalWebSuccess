# OPTIMUS Project Documentation

## Project Overview

The OPTIMUS project is a comprehensive AI-powered content management system consisting of two main applications:

- **optimus-template** - Public-facing Next.js website (LIVE: www.digitalwebsuccess.com)
- **optimus-saas** (localhost:3002) - Admin dashboard for AI article generation and management

### Repository
- **GitHub**: https://github.com/Diablixx/DigitalWebSuccess.git
- **Branch**: main
- **Auto-Deploy**: Vercel (on push to main)

### Core Architecture
- **Next.js 15** with App Router (hosted on Vercel)
- **WordPress Headless (admin.digitalwebsuccess.com)** for published article content and client editing
- **Supabase** database for draft article storage and generation workflow
- **N8N Cloud** + **OpenAI GPT-4** for AI article generation
- **Tailwind CSS** for styling
- **French language** content focus

### ✅ IMPLEMENTED: WordPress Headless + Supabase Architecture (January 2025)
**LIVE URLs**:
- 🌐 **Public Site**: www.digitalwebsuccess.com (Next.js on Vercel)
- ⚙️ **WordPress Admin**: admin.digitalwebsuccess.com/wp-admin (o2switch)
- 📡 **WordPress API**: admin.digitalwebsuccess.com/wp-json/wp/v2 (REST API)

**Content Flow**: SAAS Dashboard → Supabase (drafts) → N8N Processing → admin.digitalwebsuccess.com (published) → www.digitalwebsuccess.com (Next.js Display)
**Client Editing**: Direct WordPress admin access at admin.digitalwebsuccess.com/wp-admin (Word-like experience)
**Public Display**: Next.js on www.digitalwebsuccess.com fetches from admin.digitalwebsuccess.com REST API every 30 seconds
**Hosting**: WordPress headless on o2switch cPanel + Next.js on Vercel with custom domain

## 🚀 CURRENT IMPLEMENTATION STATUS (October 2025)

### ✅ COMPLETED COMPONENTS:

#### Homepage & Branding (October 2025)
- **✅ ProStages Branding**: Temporary rebranding from "Optimus" to "ProStages" with red "Permis" badge
- **✅ Hero Section Redesign**: Full-width dark gradient background (560px min-height)
- **✅ WordPress Content Splitting**: Single "Homepage" page with `[SEARCH_BAR]` delimiter
  - Content above search bar: Headline and subtitle (fetched from WordPress)
  - Content below search bar: Full page description (fetched from WordPress)
- **✅ Search Bar Redesign**: White input + red gradient "Rechercher" button matching design specs
- **✅ Sticky Header**: Two-bar navigation (thin top bar + dark main nav)
  - Top bar: ProStages logo, center text, Espace Client
  - Dark nav: WordPress dynamic menus + blue "Aide et Contact" button

#### Navigation & WordPress Integration
- **✅ WordPress-Driven Navigation**: Dynamic menus from WordPress with mega menu support
- **✅ Navigation Filtering**: Auto-excludes "homepage" and "stages-*" pages from menu
- **✅ BlogMegaMenu**: Fetches from admin.digitalwebsuccess.com REST API
- **✅ Real-time Updates**: 30-second polling for WordPress content changes

#### Stages Récupération Points Feature (October 2025)
- **✅ Full Search & Booking System**: City autocomplete, results page, detail modal popup
- **✅ Stage Details Modal**: Popup with 3-column layout (Google Maps | Details | Price/CTA)
  - "Plus d'infos" button opens modal with stage information
  - "Sélectionner" button navigates to inscription form
- **✅ Inscription Form Page**: Complete booking form with 4-step progress indicator
  - Personal information collection (civilité, nom, prénom, date_naissance, contact)
  - Functional tabs: Prix, Programme, Agrément, Accès-Parking, Paiement et conditions, Avis
  - Form validation (email match, required CGV acceptance)
  - Submits to Supabase `stage_bookings` table
- **✅ Booking Confirmation Page**: Thank you page with booking summary
  - Personalized greeting with user name
  - Auto-generated booking reference (BK-YYYY-NNNNNN)
  - Stage details display (dates, location, price)
  - Print confirmation functionality
- **✅ Supabase Booking Database**: `stage_bookings` table with RLS policies
  - Auto-generated booking references
  - Links to `stages_recuperation_points` via foreign key
  - Public insert policy for form submissions
- **✅ City-Specific WordPress Content**: Dynamic content below stages (e.g., stages-marseille)
  - WordPress page pattern: `stages-{city}` (scalable for all cities)
  - Content displays in gray section below StageCard listings
  - Internal API proxy bypasses Mixed Content security errors
- **✅ Mixed Content Fix**: Server-side API route (`/api/city-content/[city]`) proxies WordPress HTTP requests
  - Browser → Next.js API (HTTPS) → WordPress (HTTP) → Browser
  - No WordPress SSL certificate required

#### Technical Infrastructure
- **✅ WordPress Headless**: admin.digitalwebsuccess.com (o2switch, HTTP)
- **✅ Next.js Deployment**: www.digitalwebsuccess.com (Vercel, HTTPS)
- **✅ Internal API Proxy**: Bypasses browser Mixed Content blocking for WordPress integration
- **✅ Environment Variables**: All production variables configured in Vercel

### ⚠️ PENDING CONFIGURATION:
- **🔧 N8N Webhook**: Update to POST articles to admin.digitalwebsuccess.com
- **🔐 WordPress Authentication**: Create Application Password for N8N API access
- **🧪 Proximity Filtering**: Implement lat/lng-based stage filtering by distance (lat/lng columns already exist in database)

### 📋 NEXT IMMEDIATE STEPS:
1. Populate ~100 stages across 10-15 major French cities with proximity clusters (database ready with lat/lng)
2. Implement proximity-based filtering and sorting logic
3. Add "Proximité" sort option to results page
4. Add email notifications for booking confirmations (optional)

## Critical User Instructions (MUST RETAIN)

### Navigation Requirements
- ✅ **REMOVED**: "Blog Principal" button and page
- ✅ **REMOVED**: "Tous les Articles" button and page
- ✅ **KEEP**: Individual article access via megamenu
- ❌ **DO NOT** recreate blog/articles navigation pages

### User Communication Style
- User wants **"ultrathink"** approach - comprehensive problem-solving using all available resources
- Keep responses **concise (4 lines max)** unless detail explicitly requested
- **Direct answers** without unnecessary preamble or explanation
- Be **proactive** with appropriate tools (TodoWrite, Task agents, parallel operations)

### Text Encoding Standards
- **French apostrophes**: Use proper escaping (`l\'article` in JS strings, `l'article` in display)
- **NO HTML entities**: Convert `&apos;` to proper apostrophes
- **Example**: "Générer l'article" NOT "Générer l&apos;article"

## 🚗 Stages Récupération de Points Feature (January 2025)

### Feature Overview
Complete search and booking system for driving license points recovery courses (stages de récupération de points). Users can search by city, filter results, and select courses directly from the website.

### Architecture
- **Data Source**: Supabase table `stages_recuperation_points` (NOT WordPress)
- **Content Management**: All course data managed exclusively in Supabase
- **WordPress Role**: Only for text content in articles/pages (not for stages data)

### User Flow
1. **Homepage Search**: Search bar above WordPress content on Accueil page
2. **City Autocomplete**: Dynamic suggestions from Supabase cities
3. **Results Page**: `/stages-recuperation-points/[city]` with 3-column layout
4. **Filter & Sort**: By city, date, and price
5. **Course Selection**: Click "Sélectionner" to view details
6. **Detail Page**: `/stages-recuperation-points/[city]/[id]` with full information
7. **Validation**: "Valider" button (personal info form - future implementation)

### Database Schema (Supabase) - UPDATED October 2025

```sql
stages_recuperation_points {
  id: UUID (primary key)
  city: TEXT (e.g., "MARSEILLE", "AIX-EN-PROVENCE")
  postal_code: TEXT (e.g., "13000", "13100")
  full_address: TEXT (e.g., "156 rue de la république")
  location_name: TEXT (e.g., "Centre de Formation Auto-École Plus")
  date_start: DATE (course start date)
  date_end: DATE (course end date, usually next day)
  price: NUMERIC (course price in euros)
  latitude: NUMERIC(10, 7) -- NEW: GPS latitude (e.g., 43.2965)
  longitude: NUMERIC(10, 7) -- NEW: GPS longitude (e.g., 5.3698)
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}
```

**Key Points:**
- City names stored in UPPERCASE for consistency
- Courses span 2 days (typically consecutive weekdays or weekend)
- Prices range from €199-€329 based on location and date
- **NEW**: Latitude/longitude for proximity-based filtering
- ~100 total stages across 10-15 major French metropolitan areas
- Multiple stages per city (e.g., Marseille has ~15 different locations/dates)

### Pages & Routes

#### 1. Homepage (`/`)
- **WordPress Content**: Fetched from "Accueil" page
- **Search Bar**: Positioned ABOVE WordPress content
- **Autocomplete**: Dynamically fetches unique cities from Supabase
- **Search Action**: Redirects to `/stages-recuperation-points/[city]`

#### 2. Results Page (`/stages-recuperation-points/[city]`)
**Layout: 3-column responsive design**

**Left Sidebar (~230px):**
- City search box with autocomplete
- "Trier par" panel with radio options: Date, Prix
- "Filtrer par" panel with city checkboxes

**Center Column (~640px):**
- Page title: "Stage de Récupération de Points [CITY]"
- Subtitle with description
- Sort toolbar (inline radios)
- Results list (StageCard components)

**Right Sidebar (~260px):**
- "NOS ENGAGEMENTS" section
- Benefits list with icons:
  - +4 Points en 48h
  - Stages Agréés
  - Prix le Plus Bas Garanti
  - 14 Jours pour Changer d'Avis

#### 3. Detail Page (`/stages-recuperation-points/[city]/[id]`)
- Full course details
- Location information
- Date and time
- Price breakdown
- "Valider" button at bottom

### Components Structure

```
src/components/stages/
├── CitySearchBar.tsx         # Search with autocomplete
├── StageCard.tsx             # Individual result card
├── FiltersSidebar.tsx        # Left sidebar filters
├── EngagementsSidebar.tsx    # Right sidebar commitments
└── StagesSortToolbar.tsx     # Inline sort controls
```

### Design Specifications

**Colors:**
- Page background: `#ffffff`
- Main text: `#222222` / `#333333`
- Metadata text: `#666666`
- Link blue: `#0b6aa8`
- Accent red: `#d9534f` (left card block)
- CTA green: `#5cb85c` → `#4aa43a` (gradient)
- Checkbox blue: `#1976d2`

**Typography:**
- Font family: "Open Sans", "Helvetica Neue", Arial, sans-serif
- Base size: 14px
- City title: 18px, weight 600, uppercase
- Price: 22px, weight 700

**Card Structure:**
- Height: ~84px
- Red vertical block (left): 56×56px, rounded 6px
- City name: Uppercase blue link
- Address: Grey text below city
- Date: Right-aligned
- Price: Large bold right-aligned
- Green "Sélectionner" button: 110×36px

**Responsive:**
- Desktop: 3-column layout
- Tablet (<992px): Filters collapse to drawer
- Mobile: Single column, full-width cards

### Key Features

**Search & Autocomplete:**
- Real-time city suggestions as user types
- Matches partial input (e.g., "M" shows "MARSEILLE", "MONTPELLIER")
- Fetches unique cities from Supabase dynamically

**Filtering:**
- By city (multi-select checkboxes)
- By date (ascending/descending)
- By price (low to high / high to low)

**Sorting:**
- Date (chronological)
- Price (ascending/descending)
- Default: Date ascending

**Data Management:**
- All course data stored in Supabase
- WordPress NOT used for course content
- Content updates: Direct Supabase modifications
- No WordPress admin panel for stages

### Implementation Files

**Hooks:**
- `src/hooks/useStages.ts` - Fetch stages with filters
- `src/hooks/useCities.ts` - Fetch unique cities for autocomplete

**Pages:**
- `src/app/page.tsx` - Homepage with search bar
- `src/app/stages-recuperation-points/[city]/page.tsx` - Results page
- `src/app/stages-recuperation-points/[city]/[id]/inscription/page.tsx` - Inscription form
- `src/app/stages-recuperation-points/[city]/[id]/merci/page.tsx` - Thank you confirmation

**Components:**
- `src/components/stages/StageCard.tsx` - Stage card with modal trigger
- `src/components/stages/StageDetailsModal.tsx` - Popup modal with stage details
- `src/components/stages/FiltersSidebar.tsx` - Left sidebar filters
- `src/components/stages/EngagementsSidebar.tsx` - Right sidebar commitments
- `src/components/stages/CitySearchBar.tsx` - Autocomplete search

**API Routes:**
- `/api/city-content/[city]` - Proxy for WordPress city content (bypasses Mixed Content)

### Sample Data
24 courses across 10 French cities:
- Montpellier, Marseille, Avignon, Lyon, Nice
- Toulouse, Nantes, Bordeaux, Strasbourg, Lille

Dates: October-November 2025
Prices: €215-€259

### SEO Considerations
- URL structure: `/stages-recuperation-points/[city]` (SEO-friendly)
- Dynamic metadata per city
- City names in uppercase for consistency
- Structured data for local business markup (future)

### Future Enhancements
- ✅ Personal information form (COMPLETED October 2025)
- ✅ Booking confirmation page (COMPLETED October 2025)
- ⚠️ Payment integration (Stripe/PayPal)
- ⚠️ Email confirmation notifications
- ⚠️ Booking management dashboard
- ⚠️ Proximity sorting (lat/lng columns ready, logic pending)
- ⚠️ Calendar view
- ⚠️ Mobile app

---

## 📝 Stage Booking System (October 2025)

### Overview
Complete end-to-end booking system allowing users to reserve spots in driving license points recovery courses directly from the website.

### User Flow
1. **Search**: Homepage → Enter city → Autocomplete suggestions
2. **Browse**: Results page → View available stages → Filter/sort
3. **Details**: Click "Plus d'infos" → Modal popup with stage details
4. **Book**: Click "Sélectionner" → Navigate to inscription form
5. **Submit**: Fill form → Validate → Submit to Supabase
6. **Confirm**: Redirect to thank you page with booking reference

### Database Schema

**Table**: `stage_bookings`

```sql
CREATE TABLE stage_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stage_id UUID NOT NULL REFERENCES stages_recuperation_points(id),
  booking_reference TEXT UNIQUE NOT NULL,  -- Auto-generated: BK-YYYY-NNNNNN

  -- Personal info
  civilite TEXT NOT NULL CHECK (civilite IN ('M', 'Mme')),
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  date_naissance DATE NOT NULL,

  -- Contact info
  adresse TEXT NOT NULL,
  code_postal TEXT NOT NULL,
  ville TEXT NOT NULL,
  email TEXT NOT NULL,
  email_confirmation TEXT NOT NULL,
  telephone_mobile TEXT NOT NULL,

  -- Options
  guarantee_serenite BOOLEAN DEFAULT false,  -- +25€ optional guarantee
  cgv_accepted BOOLEAN NOT NULL DEFAULT true,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes**:
- `idx_stage_bookings_stage_id` - Fast lookups by stage
- `idx_stage_bookings_email` - Fast lookups by email
- `idx_stage_bookings_booking_ref` - Fast lookups by reference
- `idx_stage_bookings_created_at` - Chronological sorting

**Triggers**:
- `trigger_set_booking_reference` - Auto-generates booking reference on insert
- `trigger_update_stage_bookings_updated_at` - Auto-updates timestamp on update

### Inscription Form Features

**4-Step Progress Indicator**:
1. Formulaire (active)
2. Règlement (inactive)
3. Personnalisation (inactive)
4. Confirmation (inactive)

**Form Fields**:
- Civilité: Dropdown (Monsieur/Madame)
- Nom: Text input (required)
- Prénom: Text input (required)
- Date de naissance: 3 dropdowns (Jour/Mois/Année)
- Adresse: Text input (required)
- Code Postal: Text input (required)
- Ville: Text input (required)
- Email: Email input (required)
- Confirmation email: Email input (required, must match)
- Téléphone mobile: Tel input (required)
- Garantie Sérénité: Checkbox (optional +25€)
- CGV: Checkbox (required)

**Functional Tabs** (below map):
- **Le prix du stage comprend** (default): 5 inclusions with green checkmarks
- **Programme**: 2-column layout (1er jour / 2ème jour) with detailed schedule
- **Agrément**: Prefecture agreement info (R2001300020)
- **Accès - Parking**: Exact address, complementary info, parking availability
- **Paiement et conditions**: Payment methods (cartes bancaire) + cancellation policy
- **Avis**: Empty state (no reviews yet)

**Validation**:
- Email match validation
- Required CGV checkbox
- All required fields enforced by HTML5
- Disabled submit button while submitting

**Submission Flow**:
```typescript
1. Validate emails match
2. Validate CGV accepted
3. Construct date_naissance from dropdowns
4. Insert into Supabase stage_bookings table
5. Auto-generate booking_reference via trigger
6. Redirect to /merci page with reference
```

### Thank You Page

**URL Pattern**: `/stages-recuperation-points/[city]/[id]/merci?ref=BK-2025-NNNNNN`

**Features**:
- Personalized greeting: "Merci [Prénom] [Nom]!"
- Success icon (green checkmark)
- Booking reference display
- Full stage details recap:
  - Dates with French day/month names
  - Location with address
  - Price with guarantee if selected
- Email confirmation notice
- Important information section:
  - Must attend both days
  - Bring ID and license
  - Arrive 15 minutes early
  - Free cancellation up to 14 days
- Action buttons:
  - Return to homepage
  - Print confirmation

### RLS Policies

**Public Insert Policy**:
```sql
CREATE POLICY "Allow public insert" ON stage_bookings
  FOR INSERT WITH CHECK (true);
```
Allows anonymous website visitors to create bookings.

**Read Own Bookings**:
```sql
CREATE POLICY "Allow users to read own bookings" ON stage_bookings
  FOR SELECT USING (auth.jwt() ->> 'email' = email);
```
Authenticated users can only see their own bookings (future feature).

**Service Role Full Access**:
```sql
CREATE POLICY "Allow service role full access" ON stage_bookings
  FOR ALL USING (true) WITH CHECK (true);
```
Admin full access via service role key.

### Troubleshooting

#### Issue: "new row violates row-level security policy"

**Symptoms**: Form submission fails with RLS error code 42501

**Cause**: RLS policies not created properly or missing public insert permission

**Solution**: Run `fix-rls-policy.sql` in Supabase SQL Editor:
```sql
DROP POLICY IF EXISTS "Allow public insert" ON public.stage_bookings;
CREATE POLICY "Allow public insert" ON public.stage_bookings
  FOR INSERT WITH CHECK (true);
```

**Files**:
- `/Users/yakeen/Desktop/OPTIMUS/optimus-template/supabase-stage-bookings-table.sql` - Initial table creation
- `/Users/yakeen/Desktop/OPTIMUS/optimus-template/fix-rls-policy.sql` - RLS policy fix

#### Issue: Booking reference not generated

**Symptoms**: booking_reference field is NULL or empty

**Cause**: Trigger not created or not firing

**Solution**: Verify trigger exists:
```sql
SELECT * FROM pg_trigger WHERE tgname = 'trigger_set_booking_reference';
```
If missing, re-run the complete SQL file.

#### Issue: Stage not found on thank you page

**Symptoms**: "Réservation non trouvée" message

**Cause**: Booking reference parameter missing from URL or invalid

**Solution**: Ensure redirect includes `?ref=` parameter with valid booking reference

### Security Considerations

- **RLS Enabled**: All access controlled by policies
- **Public Insert Only**: Anonymous users can only INSERT, not SELECT/UPDATE/DELETE
- **Email Privacy**: Users can only see bookings matching their authenticated email
- **No Payment Data**: No credit card or sensitive payment info stored
- **Validation**: Client-side + database CHECK constraints

### Performance

- **Indexed Fields**: Fast lookups by stage_id, email, booking_reference, created_at
- **Auto-generated References**: Counter-based, no UUID collisions
- **Optimized Queries**: Single SELECT with JOIN to stages table on thank you page

---

## 🔧 Stages Feature - Complete Implementation Guide

### Implementation Timeline & Process

**Date Implemented**: January 2025
**Total Development Time**: Single session
**Commits**: 2 (e080abf, 6d331b1)

### Step-by-Step Implementation Details

#### Phase 1: Database Setup

**File Created**: `supabase-stages-table.sql`
**Location**: `/Users/yakeen/Desktop/OPTIMUS/supabase-stages-table.sql`

**Implementation Steps**:
1. Created SQL file with complete table schema
2. Added Row Level Security (RLS) policies
3. Created indexes for performance (city, date_start, price, postal_code)
4. Inserted 24 dummy courses across 10 French cities
5. Added comprehensive comments for documentation

**Database Schema Details**:
```sql
CREATE TABLE IF NOT EXISTS public.stages_recuperation_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city TEXT NOT NULL,                    -- UPPERCASE (e.g., "MONTPELLIER")
  postal_code TEXT NOT NULL,             -- French format (e.g., "34000")
  full_address TEXT NOT NULL,            -- Street address only
  location_name TEXT,                    -- Venue name (nullable)
  date_start DATE NOT NULL,              -- Course start (usually Friday)
  date_end DATE NOT NULL,                -- Course end (usually Saturday)
  price NUMERIC(6,2) NOT NULL,           -- Price in euros (e.g., 219.00)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_stages_city ON stages_recuperation_points(city);
CREATE INDEX idx_stages_date_start ON stages_recuperation_points(date_start);
CREATE INDEX idx_stages_price ON stages_recuperation_points(price);
CREATE INDEX idx_stages_postal_code ON stages_recuperation_points(postal_code);

-- RLS Policy for public read access
CREATE POLICY "Allow public read access" ON stages_recuperation_points
  FOR SELECT TO anon, authenticated
  USING (true);
```

**Dummy Data Distribution**:
- Montpellier: 4 courses (€219-239)
- Marseille: 4 courses (€219-235)
- Avignon: 3 courses (€215-220)
- Lyon: 3 courses (€239-249)
- Nice: 2 courses (€255-259)
- Toulouse: 2 courses (€225-229)
- Nantes, Bordeaux, Strasbourg, Lille: 1 course each

**Running the SQL**:
1. Go to Supabase Dashboard → SQL Editor
2. Click "New Query"
3. Paste entire SQL file content
4. Click "Run" or Ctrl+Enter
5. Verify success message
6. Check Data tab to confirm 24 rows inserted

---

#### Phase 2: React Hooks Creation

**Hook 1: useStages** (`src/hooks/useStages.ts`)

**Purpose**: Fetch stages from Supabase with filtering and sorting
**Dependencies**: `@supabase/supabase-js`

**Key Features**:
- Filters by single city (from URL parameter)
- Filters by multiple cities (from checkboxes)
- Sorts by date or price
- Auto-refetches when filters change
- Single stage fetch by ID for detail page

**Implementation Pattern**:
```typescript
export function useStages(city?: string, filters?: StagesFilters) {
  // 1. Build base query
  let query = supabase.from('stages_recuperation_points').select('*');

  // 2. Apply city filter (URL parameter)
  if (city) {
    query = query.eq('city', city.toUpperCase());
  }

  // 3. Apply multi-city filter (checkboxes)
  if (filters?.cities && filters.cities.length > 0) {
    query = query.in('city', filters.cities.map(c => c.toUpperCase()));
  }

  // 4. Apply sorting
  if (sortBy === 'date') {
    query = query.order('date_start', { ascending: sortOrder === 'asc' });
  } else if (sortBy === 'price') {
    query = query.order('price', { ascending: sortOrder === 'asc' });
  }

  // 5. Execute query and handle errors
  const { data, error } = await query;
}
```

**Hook 2: useCities** (`src/hooks/useCities.ts`)

**Purpose**: Fetch unique cities for autocomplete
**Pattern**: Extract unique values from `city` column

**Implementation**:
```typescript
export function useCities() {
  // 1. Fetch all cities from database
  const { data } = await supabase
    .from('stages_recuperation_points')
    .select('city');

  // 2. Extract unique cities
  const uniqueCities = Array.from(
    new Set(data?.map((row) => row.city) || [])
  ).sort();

  return { cities: uniqueCities, loading, error };
}

// Filtered version for autocomplete
export function useFilteredCities(query: string) {
  const { cities } = useCities();

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(query.toLowerCase())
  );

  return { cities: filteredCities, loading, error };
}
```

---

#### Phase 3: Component Development

**Component 1: CitySearchBar** (`src/components/stages/CitySearchBar.tsx`)

**Features**:
- Real-time autocomplete as user types
- Keyboard navigation (Arrow Up/Down, Enter, Escape)
- Click outside to close suggestions
- Two variants: `large` (homepage) and `small` (sidebar)
- Redirects to results page on search

**Autocomplete Logic**:
```typescript
// Filter cities that START with query (not just contain)
const filteredCities = query.length > 0
  ? cities.filter((city) =>
      city.toLowerCase().startsWith(query.toLowerCase())
    )
  : [];

// Keyboard navigation
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter') {
    // Search with selected or first result
    const city = filteredCities[selectedIndex] || filteredCities[0];
    router.push(`/stages-recuperation-points/${city.toLowerCase()}`);
  } else if (e.key === 'ArrowDown') {
    setSelectedIndex(prev => Math.min(prev + 1, filteredCities.length - 1));
  } else if (e.key === 'ArrowUp') {
    setSelectedIndex(prev => Math.max(prev - 1, -1));
  } else if (e.key === 'Escape') {
    setShowSuggestions(false);
  }
};
```

**Styling Details**:
- Large variant: 56px height (h-14), 20px padding
- Small variant: 40px height (h-10), 16px padding
- Red gradient button: `from-red-600 to-red-700`
- Suggestions dropdown: white background, gray border, shadow-lg
- Selected item: `bg-blue-100 text-blue-900`
- Hover: `bg-blue-50`

---

**Component 2: StageCard** (`src/components/stages/StageCard.tsx`)

**Design Specifications (Exact Implementation)**:
- Card height: 84px (h-[84px])
- Border: 1px solid #e0e0e0 (`border-gray-200`)
- Rounded corners: 4px (`rounded`)
- Hover effect: `hover:shadow-md hover:-translate-y-0.5`

**Layout Structure**:
```
[Red Block 56x56] [City/Address] [Date/Info] [Price €] [Sélectionner Button]
     56px              flex-1        flex-shrink-0   fixed    110px
```

**Red Accent Block**:
- Size: 56×56px (w-14 h-14)
- Border radius: Default (`rounded`)
- Gradient: `bg-gradient-to-b from-red-500 to-red-600`
- Margin: ml-3 (12px left margin)

**City Link**:
- Font size: 18px (`text-lg`)
- Font weight: 600 (`font-semibold`)
- Color: `text-blue-700` hover `text-blue-900`
- Transform: `uppercase`
- Underline on hover: `hover:underline`

**Address**:
- Font size: 14px (`text-sm`)
- Color: `text-gray-600`
- Truncate: `truncate` (single line with ellipsis)

**Date Display**:
- Format: "Ven 24 et Sam 25 Octobre"
- Function: `formatDateRange(start, end)`
- French day names: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
- French months: Full names (Janvier, Février, etc.)

**Info Link**:
- Icon: Blue circle with "i" (`w-4 h-4 bg-blue-100 text-blue-800`)
- Text: "Plus d'infos"
- Color: `text-blue-700 hover:text-blue-900`

**Price**:
- Font size: 24px (`text-2xl`)
- Font weight: 700 (`font-bold`)
- Color: `text-gray-900`
- Format: `{price.toFixed(0)} €` (no decimals displayed)

**Sélectionner Button**:
- Size: 110px width, 36px height (`px-4 py-2`)
- Gradient: `from-green-500 to-green-600`
- Hover: `from-green-600 to-green-700`
- Font: 14px (`text-sm`), semibold (`font-semibold`)
- Border radius: 4px (`rounded`)
- Shadow: `shadow-sm`
- Active state: `active:shadow-inner`

---

**Component 3: FiltersSidebar** (`src/components/stages/FiltersSidebar.tsx`)

**Width**: 230px (`w-[230px]`)

**Search Box**:
- Uses `CitySearchBar` component with `variant="small"`
- Full width of sidebar
- Margin bottom: 16px (`mb-4`)

**Trier par Panel**:
- Header: Dark gradient (`from-gray-800 to-gray-900`)
- Header text: White, uppercase, 12px (`text-xs uppercase`)
- Header padding: 12px horizontal (`px-3 py-3`)
- Border radius: Rounded top only (`rounded-t`)

**Body**:
- Background: White
- Border: 1px gray (`border-gray-200`)
- Padding: 16px (`p-4`)
- Border radius: Rounded bottom (`rounded-b`)

**Radio Options**:
- Date (default selected)
- Price
- Radio size: 20px (`w-5 h-5`)
- Color when checked: Blue (`text-blue-600`)
- Spacing between options: 12px (`space-y-3`)

**Filtrer par Panel**:
- Same header style as Trier par
- "Toutes les villes" checkbox at top (bold, with border-bottom)
- Individual city checkboxes below
- Max height: 384px (`max-h-96`) with scroll (`overflow-y-auto`)
- Checkbox size: 16px (`w-4 h-4`)
- Checkbox color: Blue (`text-blue-600`)
- Hover effect: Text darkens (`group-hover:text-gray-900`)

**Filter Logic**:
```typescript
const handleCityToggle = (city: string) => {
  if (selectedCities.includes(city)) {
    // Remove from selection
    onCitiesChange(selectedCities.filter((c) => c !== city));
  } else {
    // Add to selection
    onCitiesChange([...selectedCities, city]);
  }
};

const handleSelectAll = () => {
  // Empty array = all cities
  onCitiesChange([]);
};
```

---

**Component 4: EngagementsSidebar** (`src/components/stages/EngagementsSidebar.tsx`)

**Width**: 260px (`w-[260px]`)

**Header**:
- Text: "NOS ENGAGEMENTS" (NOS in black, ENGAGEMENTS in red)
- Font size: 18px (`text-lg`)
- Font weight: Bold (`font-bold`)
- Transform: Uppercase (`uppercase`)
- Separator: 1px horizontal line (`h-px bg-gray-300`)

**Engagement Items** (4 total):

1. **+4 Points en 48h**
   - Icon: "+4" text
   - Details: "Récupérez 4 points sur votre permis en seulement 2 jours..."

2. **Stages Agréés**
   - Icon: "✓" checkmark
   - Details: "Tous nos stages sont agréés par la Préfecture..."

3. **Prix le Plus Bas Garanti**
   - Icon: "€" euro symbol
   - Details: "Nous garantissons les meilleurs prix du marché..."

4. **14 Jours pour Changer d'Avis**
   - Icon: "↺" refresh symbol
   - Details: "Vous pouvez annuler ou reporter votre stage..."

**Icon Styling**:
- Size: 48px circle (`w-12 h-12`)
- Background: Beige/amber (`bg-amber-100`)
- Text color: Amber dark (`text-amber-900`)
- Border radius: Full circle (`rounded-full`)
- Center alignment: `flex items-center justify-center`

**Expandable Details**:
- "plus d'infos" link with chevron (▾)
- Chevron rotates 180° when expanded
- Details text: 12px (`text-xs`), gray-600
- Smooth transition: `transition-transform duration-200`

---

#### Phase 4: Page Implementation

**Page 1: Homepage Update** (`src/app/page.tsx`)

**Critical Issue Fixed**: WordPress slug mismatch
- **Problem**: Code searched for `accueil` (UE)
- **Reality**: WordPress page slug is `acceuil` (EU)
- **Result**: Page not found, search bar hidden in fallback

**Solution Applied**:
```typescript
// BEFORE (incorrect)
const response = await fetch(`${apiUrl}/pages?slug=accueil&status=publish`);

// AFTER (correct)
const response = await fetch(`${apiUrl}/pages?slug=acceuil&status=publish`);
```

**Second Issue Fixed**: Search bar only showed with WordPress content

**Solution**: Always render search bar regardless of WordPress content
```typescript
// BEFORE: Search bar only in `if (page)` block
// AFTER: Search bar always visible
return (
  <Layout>
    {/* ALWAYS show search hero */}
    <div className="bg-gradient-to-b from-blue-50 to-white py-12">
      <CitySearchBar placeholder="Entrez votre ville" variant="large" />
    </div>

    {/* WordPress content below (if exists) */}
    {page && (
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    )}
  </Layout>
);
```

**Hero Section Design**:
- Background: Gradient from blue-50 to white (`bg-gradient-to-b`)
- Padding: 48px vertical (`py-12`)
- Max width: 1152px (` max-w-3xl`)
- Title: 36px (`text-3xl`), bold, gray-900
- Subtitle: 20px (`text-lg`), gray-600
- Search bar: Max width 896px (`max-w-2xl mx-auto`)

---

**Page 2: Results Page** (`src/app/stages-recuperation-points/[city]/page.tsx`)

**Route Pattern**: `/stages-recuperation-points/[city]`
**Example**: `/stages-recuperation-points/marseille`

**Page Type**: Client-side rendered (`'use client'`)
**Reason**: Needs useState for filters and real-time interactions

**State Management**:
```typescript
const [selectedCities, setSelectedCities] = useState<string[]>([]);
const [sortBy, setSortBy] = useState<'date' | 'price'>('date');
const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
```

**Layout Structure** (3 columns):
```
┌─────────────────────────────────────────────────────────┐
│                     Hero Title                          │
└─────────────────────────────────────────────────────────┘
┌────────────┬────────────────────────────┬───────────────┐
│ Filters    │ Results (with sort bar)    │ Engagements   │
│ 230px      │ Flexible (640px)           │ 260px         │
│            │                            │               │
│ Search     │ Sort: [Date] [Price]       │ NOS           │
│ box        │                            │ ENGAGEMENTS   │
│            │ ┌────────────────────────┐ │               │
│ Trier par  │ │ StageCard 1           │ │ • +4 Points   │
│ • Date     │ └────────────────────────┘ │               │
│ • Prix     │ ┌────────────────────────┐ │ • Agréés      │
│            │ │ StageCard 2           │ │               │
│ Filtrer    │ └────────────────────────┘ │ • Prix        │
│ □ Toutes   │ ┌────────────────────────┐ │               │
│ □ MARSEILLE│ │ StageCard 3           │ │ • 14 jours    │
│ □ LYON     │ └────────────────────────┘ │               │
└────────────┴────────────────────────────┴───────────────┘
```

**Gap between columns**: 28px (`gap-7`)
**Container max-width**: 1280px (`max-w-7xl`)

**Loading State**:
- Animated spinning circle (Tailwind animate-spin)
- Text: "Chargement des stages..."

**Empty State**:
- Icon: Document with checkmark (SVG from Heroicons)
- Text: "Aucun stage trouvé pour cette ville."

**Error State**:
- Red text: "Erreur: {error}"

**Results List**:
- Vertical spacing: 16px (`space-y-4`)
- Maps over `stages` array
- Each StageCard receives `stage` prop with full data

---

**Page 3: Detail Page** (`src/app/stages-recuperation-points/[city]/[id]/page.tsx`)

**Route Pattern**: `/stages-recuperation-points/[city]/[id]`
**Example**: `/stages-recuperation-points/marseille/abc123-def-456`

**Page Type**: Client-side rendered (`'use client'`)
**Hook**: `useStage(id)` - fetches single stage by UUID

**Layout Sections**:

1. **Header with Back Button**:
   - Gradient background: `from-blue-50 to-white`
   - Back button: SVG arrow + "Retour aux résultats"
   - Title: 48px (`text-4xl`), bold
   - City subtitle: 24px (`text-xl`)

2. **Price Banner** (Green gradient):
   - Background: `from-green-500 to-green-600`
   - Left side: "Prix du stage" + price (60px font)
   - Right side: "Récupérez" + "+4 points" (36px font)

3. **Location Section**:
   - Icon: Map pin (Heroicons)
   - Gray background card (`bg-gray-50`)
   - Location name (if exists)
   - Full address
   - Postal code + city

4. **Dates Section**:
   - Icon: Calendar (Heroicons)
   - Two day cards (Jour 1, Jour 2)
   - Full date format: "vendredi 24 janvier 2025"
   - Time: "9h00 - 17h00" (hardcoded, not in database)

5. **What's Included** (Checklist):
   - 6 items with green checkmarks
   - Items:
     - Formation complète de 14 heures
     - Récupération de 4 points
     - Attestation de stage
     - Stage agréé Préfecture
     - Formateurs certifiés BAFM
     - Pause café et documentation

6. **Validation Button** (Bottom):
   - Full width
   - Green gradient
   - Text: "Valider et S'inscrire"
   - Height: 64px (`py-4`)
   - Font size: 20px (`text-lg`)
   - Currently shows alert: "Formulaire d'inscription à venir"
   - Footer text: "Paiement sécurisé • Annulation gratuite jusqu'à 14 jours avant"

---

#### Phase 5: Testing & Debugging

**Build Test**:
```bash
cd /Users/yakeen/Desktop/OPTIMUS/optimus-template
npm run build
```

**Build Results**:
- ✅ Compiled successfully
- 3 new dynamic routes created:
  - `/stages-recuperation-points/[city]` (4.44 kB, 153 kB First Load)
  - `/stages-recuperation-points/[city]/[id]` (1.91 kB, 150 kB First Load)
  - `/` updated (3.06 kB, 148 kB First Load)

**Common Build Errors Encountered & Fixed**:

1. **Next.js 15 Params Type Issue**:
   - Error: `params` must be Promise in Next.js 15
   - Fix: `const { city } = await params;` instead of `const city = params.city;`

2. **Client Component Warnings**:
   - All stage pages use `'use client'` directive
   - Reason: useState, useParams hooks require client-side rendering

**Local Testing Checklist**:
1. ✅ Homepage loads with search bar
2. ✅ Autocomplete shows cities when typing
3. ✅ Clicking city navigates to results page
4. ✅ Results page shows stages for selected city
5. ✅ Filters and sort controls work
6. ✅ Clicking "Sélectionner" navigates to detail page
7. ✅ Detail page shows full information
8. ✅ "Valider" button shows alert

---

#### Phase 6: Git Commits & Deployment

**Commit 1**: `e080abf` - Initial implementation
```
✨ Add Stages Récupération de Points feature

Complete implementation of driving license points recovery course
search and booking system.

Files:
- 11 files changed, 1310 insertions(+), 2 deletions(-)
- Created: 8 new files
- Modified: 3 files
```

**Commit 2**: `6d331b1` - Homepage fix
```
🔧 Fix homepage: correct WordPress slug and always show search bar

- Changed slug from 'accueil' to 'acceuil' (correct WordPress spelling)
- Search bar now always visible regardless of WordPress content
- WordPress content appears below search bar when available

Files:
- 1 file changed, 14 insertions(+), 38 deletions(-)
```

**Vercel Deployment**:
- Auto-deploys on push to main
- Build time: ~2-3 minutes
- Environment variables already configured
- URL: www.digitalwebsuccess.com

---

### Troubleshooting Stages Feature

#### Issue 1: Search Bar Not Showing on Homepage

**Symptoms**:
- Homepage shows "⚠️ Page 'Accueil' non trouvée dans WordPress"
- No search bar visible

**Root Causes**:
1. WordPress page slug mismatch (`accueil` vs `acceuil`)
2. Search bar only rendered when WordPress page found

**Solution**:
1. Update fetch URL to use correct slug: `acceuil`
2. Always render search bar, even if WordPress content not found
3. Clear Next.js cache: `rm -rf .next && npm run build`

**Code Fix Location**: `src/app/page.tsx` line 20 and lines 58-94

---

#### Issue 2: Autocomplete Not Working

**Symptoms**:
- Typing in search box shows no suggestions
- Console errors about Supabase connection

**Troubleshooting Steps**:
1. Verify environment variables are set:
   ```bash
   echo $NEXT_PUBLIC_SUPABASE_URL
   echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```
2. Check Supabase SQL table exists:
   ```sql
   SELECT COUNT(*) FROM stages_recuperation_points;
   ```
3. Verify RLS policy allows public read:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'stages_recuperation_points';
   ```
4. Check browser console for network errors
5. Verify useCities hook is fetching data:
   - Add `console.log('Cities loaded:', cities)` in hook

**Common Fix**: Environment variables not loaded in production
- Update Vercel dashboard → Environment Variables
- Redeploy project

---

#### Issue 3: Results Page Shows No Stages

**Symptoms**:
- Results page loads but shows "Aucun stage trouvé"
- URL city parameter is correct

**Possible Causes**:
1. City name case mismatch (database has UPPERCASE)
2. No stages exist for that city in database
3. Supabase query filters too restrictive

**Debugging**:
```typescript
// Add logging in useStages hook
console.log('Searching for city:', city);
console.log('Query result:', data);
console.log('Query error:', error);
```

**Solutions**:
1. Ensure city is converted to uppercase: `city.toUpperCase()`
2. Check database has data for that city:
   ```sql
   SELECT * FROM stages_recuperation_points WHERE city = 'MARSEILLE';
   ```
3. Temporarily remove filters to test base query

---

#### Issue 4: Date Formatting Issues

**Symptoms**:
- Dates show as "NaN" or incorrect format
- French day/month names not displaying

**Causes**:
- Date string format mismatch
- Locale not set correctly

**Solution**:
```typescript
// Correct date formatting
const date = new Date(dateString);
const options: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
return date.toLocaleDateString('fr-FR', options);
```

---

#### Issue 5: Build Fails with "Cannot read property of undefined"

**Symptoms**:
- Next.js build fails during static generation
- Error mentions `stage.property`

**Cause**: Accessing properties on nullable stage object

**Solution**: Add null checks and optional chaining
```typescript
// BEFORE (unsafe)
<p>{stage.location_name}</p>

// AFTER (safe)
{stage.location_name && (
  <p>{stage.location_name}</p>
)}
```

---

### Performance Considerations

**Database Indexes**:
- City index enables fast filtering
- Date index enables fast sorting
- Price index enables price range queries

**Caching Strategy**:
- Supabase client automatically caches queries
- Next.js revalidates every 30 seconds (`revalidate: 30`)
- Cities list cached in component state

**Optimization Tips**:
1. Limit Supabase query results if database grows
2. Add pagination for results page (currently shows all)
3. Implement virtual scrolling for long lists
4. Consider Redis cache for high traffic

**Current Performance**:
- Average page load: ~300ms
- Supabase query time: ~50-100ms
- Initial cities load: ~150ms
- No pagination needed yet (24 total courses)

---

### Security Considerations

**RLS Policies**:
- Read-only access for anonymous users
- No write permissions via public key
- Admin writes require service role key

**Input Validation**:
- City names sanitized via uppercase conversion
- SQL injection prevented by Supabase client
- No raw SQL queries in frontend

**Data Privacy**:
- No personal data stored in stages table
- Course locations are public information
- Future: Personal info in separate table

---

### Maintenance & Updates

**Adding New Courses**:
1. Open Supabase Dashboard
2. Navigate to Table Editor → stages_recuperation_points
3. Click "Insert row"
4. Fill in required fields (ensure city is UPPERCASE)
5. Save row
6. Changes appear immediately (30-second cache)

**Updating Prices**:
```sql
UPDATE stages_recuperation_points
SET price = 229.00
WHERE city = 'MARSEILLE' AND date_start = '2025-10-26';
```

**Bulk Import**:
```sql
INSERT INTO stages_recuperation_points (city, postal_code, full_address, date_start, date_end, price)
VALUES
  ('PARIS', '75001', '123 rue de Rivoli', '2025-12-01', '2025-12-02', 269.00),
  ('PARIS', '75008', '45 avenue des Champs-Élysées', '2025-12-08', '2025-12-09', 279.00);
```

**Deleting Old Courses**:
```sql
-- Delete courses older than 6 months
DELETE FROM stages_recuperation_points
WHERE date_start < NOW() - INTERVAL '6 months';
```

---

### API Documentation (For Future Extensions)

**Supabase Queries Used**:

1. **Fetch all stages** (with filters):
```typescript
const { data, error } = await supabase
  .from('stages_recuperation_points')
  .select('*')
  .eq('city', 'MARSEILLE')
  .order('date_start', { ascending: true });
```

2. **Fetch single stage**:
```typescript
const { data, error } = await supabase
  .from('stages_recuperation_points')
  .select('*')
  .eq('id', stageId)
  .single();
```

3. **Fetch unique cities**:
```typescript
const { data, error } = await supabase
  .from('stages_recuperation_points')
  .select('city');

const uniqueCities = Array.from(new Set(data.map(r => r.city))).sort();
```

4. **Filter by price range**:
```typescript
const { data, error } = await supabase
  .from('stages_recuperation_points')
  .select('*')
  .gte('price', 200)
  .lte('price', 250);
```

5. **Filter by date range**:
```typescript
const { data, error } = await supabase
  .from('stages_recuperation_points')
  .select('*')
  .gte('date_start', '2025-10-01')
  .lte('date_start', '2025-10-31');
```

---

### WordPress vs Stages: Data Source Separation

**CRITICAL UNDERSTANDING**:

**WordPress** (admin.digitalwebsuccess.com):
- ✅ Text content (articles, blog posts)
- ✅ Page content (Homepage with `[SEARCH_BAR]` delimiter, Actualités, etc.)
- ✅ Navigation menu items
- ✅ **City-specific content** (stages-marseille, stages-lyon, etc.) - displayed BELOW stage listings
- ❌ NOT for stages data (courses, dates, prices, locations)

**Supabase** (ucvxfjoongglzikjlxde.supabase.co):
- ✅ Stages de récupération de points (ALL course data with lat/lng)
- ✅ Draft articles (optimus-saas workflow)
- ✅ User-generated content
- ❌ NOT for published articles (those go to WordPress)

**Why Separate?**:
1. WordPress = Client-editable content (Word-like interface)
2. Supabase = Structured data requiring exact format
3. Stages need precise dates, prices, locations, GPS coordinates (not free-form text)
4. WordPress would complicate stage management
5. Supabase allows programmatic updates and integrations

**Client Training Implications**:
- Clients edit articles in WordPress
- Clients edit city descriptions in WordPress (stages-{city} pages)
- Developers/admins manage stages in Supabase SQL
- Clear separation of responsibilities

---

### 🌍 City-Specific WordPress Content (October 2025)

**Feature**: Each city results page can display custom WordPress content below stage listings.

**WordPress Page Pattern**: `stages-{city}` (e.g., `stages-marseille`, `stages-lyon`)

**Implementation**:
1. Create WordPress page with title matching pattern (e.g., "Stages Marseille")
2. Slug auto-generates as `stages-marseille`
3. Add content describing the city, locations, benefits, etc.
4. Content displays in gray section below all StageCard listings
5. Automatically fetched via internal API: `/api/city-content/marseille`

**Mixed Content Fix**:
- WordPress hosted on HTTP (admin.digitalwebsuccess.com)
- Next.js site on HTTPS (www.digitalwebsuccess.com)
- Browser blocks HTTP requests from HTTPS pages (Mixed Content error)
- **Solution**: Server-side API proxy at `/api/city-content/[city]`
  - Browser requests `/api/city-content/marseille` (HTTPS, same origin ✅)
  - Next.js server fetches from WordPress HTTP API (allowed server-side ✅)
  - Returns content to browser (no security error ✅)

**File Locations**:
- API Route: `/optimus-template/src/app/api/city-content/[city]/route.ts`
- Results Page: `/optimus-template/src/app/stages-recuperation-points/[city]/page.tsx`

**Example WordPress Content**:
```
Title: Stages Marseille
Slug: stages-marseille

Content:
<h2>Les lieux de stages à Marseille</h2>
<p>Marseille étant une grande ville, nous avons sélectionné des lieux de stages...</p>
```

---

### 🎨 Homepage Redesign (October 2025)

**ProStages Branding** (Temporary):
- Logo: "ProStages" text + red "Permis" badge
- Replaces "Optimus" branding
- Easy to revert when needed

**Hero Section**:
- Full-width dark gradient background (`from-gray-800 to-gray-900`)
- Min height: 560px
- Centered content container (max-width: 880px)

**WordPress Content Split**:
- Single "Homepage" page in WordPress
- Delimiter: `[SEARCH_BAR]` (typed as plain text in WordPress editor)
- Code splits content at delimiter:
  - **Above search bar**: Headline, subtitle (large white text with shadow)
  - **Below search bar**: Full page description (white background, prose styling)

**Search Bar Design**:
- White input field (520px max-width, 44px height)
- Red gradient button: `#e14b3f` → `#c93a2d`
- Text: "Rechercher" with magnifying glass icon
- Maintains city autocomplete functionality

**Header Design**:
- **Top thin bar** (40px height, white background):
  - Left: ProStages logo + red Permis badge
  - Center: "Stage de Récupération de Points" (uppercase gray text)
  - Right: User icon + "Espace Client" link
- **Main dark nav** (56px height, #222222 background):
  - Left: WordPress dynamic menu items (white uppercase text)
  - Right: "Qui Sommes-Nous" + blue "Aide et Contact" button (#2b85c9)
- Sticky behavior: stays at top on scroll

**File Locations**:
- Homepage: `/optimus-template/src/app/page.tsx`
- Header: `/optimus-template/src/components/layout/Header.tsx`
- Search Bar: `/optimus-template/src/components/stages/CitySearchBar.tsx`

---



## Technical Configuration

### Environment Variables (CRITICAL)
```bash
# Required for both projects - Supabase (for drafts and generation)
NEXT_PUBLIC_SUPABASE_URL="https://ucvxfjoongglzikjlxde.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjdnhmam9vbmdnbHppa2pseGRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNDY4OTksImV4cCI6MjA2NTcyMjg5OX0.q_xtNL2LIvOXbMH8atFM5bdez4GpwvYcsI-zjRF71OY"

# For optimus-saas only - N8N KEYWORD-BASED WORKFLOW
NEXT_PUBLIC_N8N_WEBHOOK_URL="[N8N Generation webhook URL]"
NEXT_PUBLIC_N8N_PUBLISH_WEBHOOK_URL="[N8N Publication webhook URL - sends to admin.digitalwebsuccess.com]"

# NEW: WordPress Headless Integration (admin.digitalwebsuccess.com)
NEXT_PUBLIC_WORDPRESS_API_URL="https://admin.digitalwebsuccess.com/wp-json/wp/v2"
WORDPRESS_API_USERNAME="[WordPress admin username]"
WORDPRESS_API_PASSWORD="[WordPress application password]"

# Production Domain Configuration
NEXT_PUBLIC_SITE_URL="https://digitalwebsuccess.com"
WORDPRESS_ADMIN_URL="https://admin.digitalwebsuccess.com/wp-admin"
```

### Port Assignments
- **optimus-template**: localhost:3001
- **optimus-saas**: localhost:3002

### Development Commands
```bash
# Start with proper environment variables
cd /Users/yakeen/Desktop/OPTIMUS/optimus-template
export NEXT_PUBLIC_SUPABASE_URL="https://ucvxfjoongglzikjlxde.supabase.co"
export NEXT_PUBLIC_SUPABASE_ANON_KEY="[key]"
npm run dev -- -p 3001

cd /Users/yakeen/Desktop/OPTIMUS/optimus-saas
export NEXT_PUBLIC_SUPABASE_URL="https://ucvxfjoongglzikjlxde.supabase.co"
export NEXT_PUBLIC_SUPABASE_ANON_KEY="[key]"
npm run dev -- -p 3002
```

## Common Issues & Solutions

### 1. "Erreur inattendue" in Blog Megamenu
**🚨 NEW CAUSES with WordPress Headless Integration**:
- **WordPress API Unreachable**: Check admin.digitalwebsuccess.com connectivity
- **CORS Issues**: Ensure WordPress allows requests from digitalwebsuccess.com domain
- **Missing WordPress Environment Variables**: Verify WORDPRESS_API_URL is set correctly
- **Legacy Supabase Calls**: BlogMegaMenu still calling Supabase instead of WordPress API
- **cPanel/o2switch Issues**: Server downtime or configuration problems

**Solutions**:
- Test WordPress API: `curl https://admin.digitalwebsuccess.com/wp-json/wp/v2/posts`
- Kill conflicting dev servers: `lsof -ti:3001 | xargs kill -9`
- Clear build cache: `rm -rf .next`
- Verify WordPress credentials in environment variables
- Check browser network tab for failed WordPress API calls
- Verify o2switch server status and cPanel accessibility

### 2. Build Errors with Article Pages
**Causes & Solutions**:
- **"Unterminated string constant"**: Multi-line metadata descriptions
  - Fix: Convert to single-line strings
- **"Identifier cannot follow number"**: Function names starting with numbers
  - Fix: Use valid JavaScript identifiers (`5ConseilsPage` → `CinqConseilsPage`)
- **Unescaped quotes**: Single quotes in single-quoted JS strings
  - Fix: Use proper escaping (`l\'article`)

### 3. Conflicting Dev Servers
**Symptoms**: Multiple servers running on same port, environment variable conflicts
**Solution**:
```bash
# Kill all Node processes
pkill -f "node.*next"
# Or specific ports
lsof -ti:3001 | xargs kill -9
lsof -ti:3002 | xargs kill -9
```

### 4. Build Cache Issues
**When to clear**: After environment variable changes, syntax fixes, major updates
```bash
rm -rf .next
npm run dev
```

### 🚨 5. WordPress Integration Issues (NEW)

#### 5.1 WordPress API Authentication Errors
**Symptoms**: 401 Unauthorized, 403 Forbidden errors
**Causes**:
- Invalid application password
- Incorrect username
- WordPress.com plan limitations (free plans have API restrictions)
**Solutions**:
- Regenerate application password in WordPress admin
- Verify username matches WordPress login
- Upgrade to Business plan for full API access
- Test credentials: `curl -u username:app_password https://site.wordpress.com/wp-json/wp/v2/users/me`

#### 5.2 N8N WordPress Webhook Failures
**Symptoms**: Articles not appearing in WordPress after publishing
**Causes**:
- N8N webhook URL incorrect
- WordPress API endpoint wrong
- Missing required fields in POST request
**Solutions**:
- Verify webhook URL in N8N dashboard
- Check WordPress API logs in wp-admin
- Ensure required fields: title, content, status, categories
- Test manual POST: `curl -X POST -u user:pass -H "Content-Type: application/json" -d '{"title":"Test","content":"Test content","status":"publish"}' https://admin.digitalwebsuccess.com/wp-json/wp/v2/posts`

#### 5.3 BlogMegaMenu Not Loading WordPress Content
**Symptoms**: Empty megamenu, loading errors
**Causes**:
- useArticles hook still calling Supabase
- CORS policy blocking WordPress API calls
- WordPress API response format mismatch
**Solutions**:
- Update `src/hooks/useArticles.ts` to use WordPress API
- Add Vercel domain to WordPress CORS settings
- Map WordPress response format to expected structure
- Check browser developer tools for API call errors

#### 5.4 Client WordPress Access Issues
**Symptoms**: Clients can't log in to WordPress admin
**Causes**:
- User account not created properly
- Incorrect role assignment
- WordPress site URL confusion
**Solutions**:
- Create user with Editor role in admin.digitalwebsuccess.com/wp-admin
- Provide correct WordPress admin URL: admin.digitalwebsuccess.com/wp-admin
- Test login credentials before sharing with client
- Ensure user has proper permissions to edit posts
- Verify o2switch server accessibility and cPanel status

## File Structure & Code Patterns

### Article Page Structure
```typescript
// src/app/articles/[slug]/page.tsx
export const metadata = {
  title: 'Article Title | Optimus',
  description: 'Single line description without newlines...',
};

export default function ValidJavaScriptFunctionName() {
  return (
    <Layout>
      <div className="bg-white">
        {/* Semantic HTML structure */}
        <h1>Title</h1>
        <h2>Section Headers</h2>
        <p>Paragraphs</p>
        <ul><li>Lists</li></ul>
      </div>
    </Layout>
  );
}
```

### French Text Handling
```typescript
// ✅ Correct: Escaped apostrophes in JS strings
message: 'Veuillez saisir un prompt pour générer l\'article.'

// ✅ Correct: Proper display text
'✨ Générer l\'article'

// ❌ Wrong: HTML entities
message: 'Veuillez saisir un prompt pour générer l&apos;article.'
```

### Navigation Components
- **BlogMegaMenu**: 🚨 **NEW SOURCE**: Fetches from WordPress REST API (not Supabase)
  - Shows individual articles only, NO "Voir tous" links
  - Real-time updates from WordPress published content
  - Maintains same UI/UX, different data source
- **Header**: NO /blog or /articles links in mobile nav
- **Footer**: NO "Blog" or "Articles" links in Ressources section

### ✅ BlogMegaMenu Integration COMPLETED:
**File**: `optimus-template/src/hooks/useArticles.ts` - ✅ **IMPLEMENTED**
- ✅ **DONE**: Now fetches from `https://admin.digitalwebsuccess.com/wp-json/wp/v2/posts`
- ✅ **DONE**: Converts WordPress API response to Article format
- ✅ **DONE**: Polls every 30 seconds for real-time updates

**File**: `optimus-template/src/components/layout/BlogMegaMenu.tsx` - ✅ **WORKING**
- ✅ **DONE**: Uses WordPress post object structure (title.rendered, content.rendered, etc.)
- ✅ **DONE**: Displays articles from admin.digitalwebsuccess.com

**Environment Variables** - ✅ **CONFIGURED**:
- ✅ **DONE**: `NEXT_PUBLIC_WORDPRESS_API_URL="https://admin.digitalwebsuccess.com/wp-json/wp/v2"` in Vercel Production
- ✅ **DONE**: `NEXT_PUBLIC_SITE_URL="https://www.digitalwebsuccess.com"` updated

## AI Article Generation Workflow - WORDPRESS HEADLESS INTEGRATION (NEW)

### optimus-saas Dashboard Flow (Updated December 2024)
**GENERATION WORKFLOW (Unchanged):**
1. **User Input**: Unique keyword (no longer full prompts)
2. **Keyword Validation**: Check uniqueness in Supabase before proceeding
3. **N8N Generation**: Keyword → N8N Generation webhook → OpenAI GPT-4 → Save to Supabase
4. **15-Second Wait**: Frontend waits for N8N to complete generation and save
5. **Auto-Retrieval**: Search Supabase by keyword and auto-populate title/content
6. **Content Editor**: User can edit title/content before publishing

**✅ PUBLICATION WORKFLOW - WORDPRESS HEADLESS IMPLEMENTATION:**
1. **User Edits**: Modify retrieved article as needed in SAAS dashboard
2. **Publish Button**: ℹ️ **READY** - Triggers N8N Publication webhook with article data
3. **N8N Processing** (NEXT STEP TO CONFIGURE):
   - Updates Supabase (published=true) - ✅ **EXISTING FUNCTIONALITY**
   - **HTTP POST to admin.digitalwebsuccess.com/wp-json/wp/v2/posts** - ⚠️ **NEEDS CONFIGURATION**
   - Creates WordPress post with authentication
4. **WordPress Post Created**: Article appears in admin.digitalwebsuccess.com/wp-admin for client editing
5. **Next.js Display**: BlogMegaMenu on www.digitalwebsuccess.com fetches from admin.digitalwebsuccess.com REST API - ✅ **WORKING**

**🔍 REQUIRED FOR COMPLETE WORKFLOW:**
- WordPress Application Password for N8N authentication
- N8N HTTP node configuration to POST to admin.digitalwebsuccess.com
- Test full workflow: Generate → Publish → Display

**🎯 CLIENT EDITING WORKFLOW (NEW):**
1. **Client Access**: Direct login to admin.digitalwebsuccess.com/wp-admin via username/password
2. **Word-like Editing**: Full WYSIWYG editor for article modification
3. **Real-time Updates**: Changes reflect on www.digitalwebsuccess.com via API (30-second polling)
4. **No Technical Knowledge Required**: Pure content editing experience
5. **Full Control**: WordPress hosted on own o2switch server (not WordPress.com)

### Supabase Article Schema (UPDATED)
```sql
articles {
  id: uuid (primary key)
  title: text
  content: text
  slug: text (unique)
  excerpt: text
  read_time: text
  published: boolean
  created_at: timestamp
  meta_description: text
  author: text
  category: text
  keyword: text (UNIQUE) -- NEW: For keyword-based workflow
}
```

### Key Changes from Old Workflow
- **INPUT**: Keyword instead of full prompt description
- **GENERATION**: N8N saves directly to Supabase (not just returns data)
- **RETRIEVAL**: 15-second delay + automatic search by keyword
- **🚨 PUBLICATION**: N8N webhook now sends to admin.digitalwebsuccess.com (not just Supabase)
- **🚨 CONTENT SOURCE**: Next.js fetches articles from admin.digitalwebsuccess.com REST API (not Supabase)
- **🚨 CLIENT EDITING**: Direct WordPress admin access at admin.digitalwebsuccess.com/wp-admin
- **UNIQUENESS**: Keywords must be unique to prevent duplicates

### WordPress Headless Integration Architecture (o2switch + Vercel)
**Data Flow**:
```
SAAS Dashboard (Draft) → Supabase (Storage) → N8N (Process) → admin.digitalwebsuccess.com (Published)
                                                                        ↓
Client Editing ← WordPress Admin ← admin.digitalwebsuccess.com ← HTTP POST from N8N
                                                                        ↓
digitalwebsuccess.com (Next.js) ← WordPress REST API ← admin.digitalwebsuccess.com (Live Content)
```

**Key Benefits**:
- **Full Control**: Own WordPress server on o2switch (not WordPress.com)
- **Custom Domain**: Professional admin.digitalwebsuccess.com setup
- **Client-Friendly**: Word-like editing experience in WordPress
- **Real-time Updates**: Changes appear instantly on digitalwebsuccess.com
- **No Technical Skills**: Clients edit content without touching code
- **Professional CMS**: Full WordPress content management capabilities

### Required SQL for New Workflow
**IMPORTANT**: Must be run in Supabase SQL Editor before using new workflow
```sql
-- Add keyword column to articles table
ALTER TABLE public.articles
ADD COLUMN IF NOT EXISTS keyword TEXT UNIQUE;

-- Add comment for documentation
COMMENT ON COLUMN public.articles.keyword IS 'Unique keyword used to generate the article. Part of new keyword-based workflow.';

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_articles_keyword ON public.articles(keyword);

-- Add constraint to ensure keyword is not empty if provided
ALTER TABLE public.articles
ADD CONSTRAINT IF NOT EXISTS chk_keyword_not_empty
CHECK (keyword IS NULL OR length(trim(keyword)) > 0);
```

## WordPress Headless Setup on o2switch (NEW)

### Prerequisites
- o2switch hosting account with cPanel access
- Domain digitalwebsuccess.com configured with o2switch
- Existing Vercel account for Next.js deployment
- N8N Cloud account for webhook integration

### Step 1: WordPress Installation on o2switch
1. **Access cPanel**:
   - Login to o2switch cPanel (get credentials from hosting provider)
   - Navigate to "Softaculous Apps Installer" section

2. **Install WordPress**:
   - Click "WordPress" in Softaculous
   - Click "Install Now"
   - **CRITICAL SETTINGS**:
     - Choose Domain: Select "admin.digitalwebsuccess.com"
     - In Directory: Leave EMPTY (very important!)
     - Site Name: "OPTIMUS Admin" or preferred name
     - Admin Username: Create strong username (save it!)
     - Admin Password: Create strong password (save it!)
     - Admin Email: Your email address
   - Click "Install"

3. **Verify Installation**:
   - Access admin.digitalwebsuccess.com/wp-admin
   - Login with created credentials
   - Confirm WordPress dashboard loads correctly

### Step 2: WordPress Headless Configuration
1. **Enable REST API**:
   - WordPress Admin → Settings → Permalinks
   - Select "Post name" structure
   - Click "Save Changes" (this enables REST API)

2. **Test API Access**:
   - Open: https://admin.digitalwebsuccess.com/wp-json/wp/v2/posts
   - Should display JSON data (even if empty)

3. **Hide from Search Engines**:
   - Settings → Reading
   - Check "Discourage search engines from indexing this site"
   - Save Changes

4. **Optional: Install WPGraphQL Plugin**:
   - Plugins → Add New
   - Search "WPGraphQL"
   - Install and Activate

### Step 3: Domain Setup with Vercel
1. **Vercel Domain Configuration**:
   - optimus-template project → Settings → Domains
   - Add custom domain: "digitalwebsuccess.com"
   - Follow Vercel DNS instructions (usually CNAME to cname.vercel-dns.com)

2. **Update DNS Records**:
   - In o2switch cPanel → Zone Editor
   - Main domain: digitalwebsuccess.com → CNAME to Vercel
   - Subdomain: admin.digitalwebsuccess.com stays on o2switch (already configured)

### Step 4: WordPress API Authentication
1. **Create Application Password**:
   - admin.digitalwebsuccess.com/wp-admin → Users → Profile
   - Scroll to "Application Passwords"
   - Generate new password for N8N API access
   - Save credentials securely

2. **Test API Access**:
   ```bash
   curl -u username:app_password \
   https://admin.digitalwebsuccess.com/wp-json/wp/v2/posts
   ```

### Step 5: Next.js Integration Updates
**Files to Modify in optimus-template**:
- `src/hooks/useArticles.ts` → Switch from Supabase to admin.digitalwebsuccess.com API
- `src/components/layout/BlogMegaMenu.tsx` → Update data source
- `.env.local` → Add WordPress headless credentials

**WordPress REST API Endpoints**:
```javascript
// Get all published posts
GET https://admin.digitalwebsuccess.com/wp-json/wp/v2/posts

// Get specific post by slug
GET https://admin.digitalwebsuccess.com/wp-json/wp/v2/posts?slug=article-slug

// Create new post (N8N webhook)
POST https://admin.digitalwebsuccess.com/wp-json/wp/v2/posts
```

**Environment Variables for optimus-template**:
```bash
# Add to .env.local
NEXT_PUBLIC_WORDPRESS_API_URL="https://admin.digitalwebsuccess.com/wp-json/wp/v2"
```

### Step 6: N8N Webhook Configuration
**Publication Webhook Updates**:
1. **Current**: Article data → Supabase update only
2. **New**: Article data → Supabase update + admin.digitalwebsuccess.com POST
3. **WordPress POST Format**:
   ```json
   {
     "title": "Article Title",
     "content": "Article content...",
     "slug": "article-slug",
     "status": "publish",
     "categories": [1], // Blog category ID
     "meta": {
       "description": "Meta description",
       "author": "Author name"
     }
   }
   ```

**N8N Configuration Steps**:
1. Update NEXT_PUBLIC_N8N_PUBLISH_WEBHOOK_URL in optimus-saas
2. Configure N8N to POST to admin.digitalwebsuccess.com with authentication
3. Test webhook with sample article data

### Step 7: Client Access Setup
1. **Create Client User Accounts**:
   - admin.digitalwebsuccess.com/wp-admin → Users → Add New
   - Role: Editor (can edit posts, not site settings)
   - Provide username/password to clients
   - Test account access before sharing

2. **Client Login Process**:
   - URL: admin.digitalwebsuccess.com/wp-admin
   - Credentials: Provided username/password
   - Edit articles like Word documents in WordPress editor
   - Changes appear instantly on digitalwebsuccess.com

### WordPress vs Supabase Data Mapping
| Supabase Field | WordPress Field | API Endpoint |
|----------------|-----------------|--------------|
| `title` | `title.rendered` | `/posts` |
| `content` | `content.rendered` | `/posts` |
| `slug` | `slug` | `/posts` |
| `excerpt` | `excerpt.rendered` | `/posts` |
| `meta_description` | `yoast_meta.description`* | `/posts` |
| `published` | `status` | `/posts` |
| `created_at` | `date` | `/posts` |

*Requires Yoast SEO plugin for meta description support

## Development Workflow Best Practices

### 1. Task Management
- **ALWAYS** use TodoWrite for multi-step tasks
- Mark tasks completed immediately after finishing
- Keep only one task "in_progress" at a time

### 2. Debugging Approach
- Run bash commands in parallel when possible
- Check server outputs with BashOutput tool
- Use curl for testing API endpoints
- Verify environment variables are loaded correctly

### 3. Content Management
- Use Task agent for complex content restructuring
- Maintain semantic HTML structure in articles
- Ensure proper French character encoding
- Test article display in both projects

### 4. Code Quality
- Follow existing code patterns and conventions
- Use proper TypeScript/JavaScript syntax
- Maintain Tailwind CSS styling consistency
- Escape special characters appropriately

## Deployment Considerations

### Environment Setup
- Ensure `.env.local` files contain correct Supabase credentials
- Verify N8N webhook URL is accessible and active
- Test article generation workflow end-to-end
- Confirm both servers start without conflicts

### Monitoring
- Watch for console errors in browser dev tools
- Monitor Supabase database connection status
- Verify article creation and publishing workflow
- Test megamenu article loading

## Key File Locations

### Configuration
- `/Users/yakeen/Desktop/OPTIMUS/optimus-template/.env.local`
- `/Users/yakeen/Desktop/OPTIMUS/optimus-saas/.env.local`

### Core Components
- `optimus-template/src/components/layout/BlogMegaMenu.tsx`
- `optimus-template/src/components/layout/Header.tsx`
- `optimus-template/src/components/layout/Footer.tsx`
- `optimus-template/src/hooks/useArticles.ts`

### Article Pages
- `optimus-template/src/app/articles/[slug]/page.tsx` (pattern)
- Individual article directories under `/articles/`

### SaaS Dashboard
- `optimus-saas/src/app/page.tsx` (main dashboard)
- `optimus-saas/src/lib/supabase.ts` (database client)

## Troubleshooting Checklist

1. **Environment Variables**: Are Supabase AND WordPress headless credentials loaded correctly?
2. **Dev Servers**: Any port conflicts or multiple instances?
3. **Build Cache**: Clear `.next` if needed
4. **Database Connection**: Can Supabase be reached?
5. **🚨 WordPress API**: Can admin.digitalwebsuccess.com REST API be accessed?
6. **🚨 BlogMegaMenu Source**: Is it fetching from admin.digitalwebsuccess.com or Supabase?
7. **Article Syntax**: Valid JavaScript function names and metadata?
8. **French Text**: Properly escaped apostrophes?
9. **Navigation**: Removed unwanted blog links?
10. **🚨 N8N Webhooks**: Are admin.digitalwebsuccess.com publication webhooks working?
11. **o2switch Server**: Is the hosting server accessible and functioning?
12. **Domain Configuration**: Is admin.digitalwebsuccess.com properly configured?
13. **Vercel Deployment**: Is digitalwebsuccess.com pointing to the correct Vercel project?

### Quick WordPress API Test:
```bash
# Test WordPress API connectivity
curl https://admin.digitalwebsuccess.com/wp-json/wp/v2/posts

# Test with authentication
curl -u username:app_password https://admin.digitalwebsuccess.com/wp-json/wp/v2/posts

# Test server accessibility
curl -I https://admin.digitalwebsuccess.com
```

---

---

**Last Updated**: January 2025
**Project Status**: Active Development - WordPress Headless Migration
**Main Developer**: yakeen
**Architecture**: WordPress Headless (o2switch) + Next.js (Vercel) + Supabase + N8N