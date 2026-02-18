# MBPO Community Mapping Form

A simple map-based survey form for collecting map based survey responses for the 2026 Manhattan Borough President convention. Built with Mapbox GL JS and Google Apps Script.

## Files

- `index.html` - The form page with Mapbox map and survey questions
- `apps-script.js` - Google Apps Script code for the backend

## Setup

### 1. Google Sheets + Apps Script Backend

1. Create a new Google Sheet
2. Add these headers in Row 1:
   - A: `Timestamp`
   - B: `Latitude`
   - C: `Longitude`
   - D: `Map Type`
   - E: `Pin Type`
   - F: `Story`
   - G: `Name`
   - H: `Email`

3. Go to **Extensions → Apps Script**
4. Delete any existing code and paste the contents of `apps-script.js`
5. Click **Deploy → New deployment**
6. Select **Web app** as the type
7. Set:
   - Execute as: **Me**
   - Who has access: **Anyone**
8. Click **Deploy** and authorize when prompted
9. Copy the **Web app URL**

### 2. Configure the HTML Form

Open `index.html` and update these two values near the top of the `<script>` section:

```javascript
// Replace with your Mapbox access token
const MAPBOX_TOKEN = 'YOUR_MAPBOX_ACCESS_TOKEN';

// Replace with your Google Apps Script web app URL
const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL';
```

### 3. Get a Mapbox Access Token

1. Log in to Beta's Mapbox account at [https://account.mapbox.com/](https://account.mapbox.com/)
2. Navigate to the Account → Tokens
3. Copy the default public token (or create a new one)

### 4. Host the Form via Github Pages

1. Push `index.html` plus any other assets to a GitHub repo
2. In the repo settings, enable GitHub Pages (choose the branch and folder where `index.html` is located)
3. Your form will be live at [https://betanyc.github.io/mbp-convention-form/](https://betanyc.github.io/mbp-convention-form/)

## Customization

### Map Bounds

The map is currently bounded to Manhattan. To change this, edit the `manhattanBounds` array:

```javascript
const manhattanBounds = [
  [-74.0479, 40.6829], // Southwest corner [lng, lat]
  [-73.9067, 40.8820]  // Northeast corner [lng, lat]
];
```

### Modify Questions

The dropdown options are defined in the `pinTypeOptions` object. Add, remove, or modify as needed.

### Styling

The form uses CSS custom properties (variables) at the top of the `<style>` block. Adjust colors, fonts, etc. there.

## Notes

- The form uses `mode: 'no-cors'` for the fetch request because Google Apps Script requires this. This means we can't read the response, but submissions still work.
- Responses are stored in Eastern Time (America/New_York). Change the timezone in `apps-script.js` if needed.
- If you update the Apps Script code, you must create a **new deployment** for changes to take effect.
