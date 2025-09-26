# OPTIMUS Project Documentation

## Project Overview

The OPTIMUS project is a comprehensive AI-powered content management system consisting of two main applications:

- **optimus-template** - Public-facing Next.js website (LIVE: www.digitalwebsuccess.com)
- **optimus-saas** (localhost:3002) - Admin dashboard for AI article generation and management

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

## 🚀 CURRENT IMPLEMENTATION STATUS (January 2025)

### ✅ COMPLETED COMPONENTS:
- **✅ WordPress Headless Setup**: admin.digitalwebsuccess.com fully configured and working
- **✅ Next.js Deployment**: www.digitalwebsuccess.com live on Vercel with custom domain
- **✅ WordPress API Integration**: BlogMegaMenu fetches from admin.digitalwebsuccess.com/wp-json/wp/v2
- **✅ Environment Variables**: All production variables configured in Vercel
- **✅ DNS Configuration**: Custom domains properly routed
- **✅ Real-time Article Display**: WordPress posts appear in BlogMegaMenu within 30 seconds

### ⚠️ PENDING CONFIGURATION:
- **🔧 N8N Webhook**: Update to POST articles to admin.digitalwebsuccess.com (currently posts to old WordPress.com)
- **🔐 WordPress Authentication**: Create Application Password for N8N API access
- **🧪 End-to-End Testing**: Test complete workflow from optimus-saas publish → WordPress → live site

### 📋 NEXT IMMEDIATE STEPS:
1. Create WordPress Application Password in admin.digitalwebsuccess.com/wp-admin
2. Update N8N publication webhook to target admin.digitalwebsuccess.com/wp-json/wp/v2/posts
3. Test publish workflow: optimus-saas → N8N → WordPress → www.digitalwebsuccess.com

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