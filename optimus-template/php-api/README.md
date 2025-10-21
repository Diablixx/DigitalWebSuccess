# PHP MySQL API - Upload Instructions

## Files to Upload to o2switch

Upload these files via cPanel File Manager to your public_html directory:

```
public_html/
  └── api/                    (create this folder)
      ├── config.php
      ├── stages.php
      ├── bookings.php
      └── .htaccess
```

## Upload Steps:

1. **Go to cPanel → File Manager**
2. **Navigate to `public_html`**
3. **Create new folder**: Click "New Folder" → Name it `api`
4. **Enter the `api` folder**
5. **Upload files**: Click "Upload" → Select all 4 files from `/php-api/` folder
6. **Verify**: You should see all 4 files in `public_html/api/`

## API Endpoints:

After upload, your API will be accessible at:

- **Get all stages**: `https://digitalwebsuccess.com/api/stages.php`
- **Get cities**: `https://digitalwebsuccess.com/api/stages.php?action=cities`
- **Get single stage**: `https://digitalwebsuccess.com/api/stages.php?id=xxx`
- **Create booking**: `POST https://digitalwebsuccess.com/api/bookings.php`
- **Get booking**: `https://digitalwebsuccess.com/api/bookings.php?ref=BK-2025-000001`

## Test After Upload:

Visit: `https://digitalwebsuccess.com/api/stages.php?action=cities`

You should see JSON response with list of cities.

## Security:

- `config.php` is protected by .htaccess (cannot be accessed directly)
- CORS enabled for Vercel requests
- Prepared statements prevent SQL injection
