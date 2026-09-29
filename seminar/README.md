# Mathematics Seminar Website

This version is designed for GitHub Pages.

## Updating talks

Edit **`talks.json`** only. You do not need to touch the HTML, CSS, or JavaScript.

Example:

```json
{
  "date": "2026-10-08",
  "time": "14:15",
  "room": "Seminar Room 301",
  "title": "Talk title",
  "speaker": "Dr. Name",
  "affiliation": "University",
  "abstract": "Optional abstract",
  "tags": ["Geometry", "Probability"]
}
```

The page automatically:
- sorts talks by date;
- finds the next upcoming talk;
- displays it in the large featured section;
- builds the full programme;
- marks the next talk with a `Next` badge.

## GitHub Pages

Commit all files in this folder to your GitHub Pages repository.

Because GitHub Pages serves the site over HTTP/HTTPS, `script.js` can load `talks.json` directly.

Note: if you double-click `index.html` locally and open it as a `file://` URL, browsers may block the JSON request. For local testing, run a small server, for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Files

- `index.html` — page structure
- `styles.css` — appearance
- `script.js` — loads and renders the talk data
- `talks.json` — **the file you edit for talks**
- `pattern.png` — background
