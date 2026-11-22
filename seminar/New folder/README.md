# Mathematics Seminar Website

The talk programme is separated from the HTML.

## Updating talks

Edit **`talks.js`** only. Each talk looks like this:

```js
{
  date: "2026-10-08",          // YYYY-MM-DD
  time: "14:15",
  room: "Seminar Room 301",
  title: "Talk title",
  speaker: "Dr. Name",
  affiliation: "University",
  abstract: "Optional abstract",
  tags: ["Topic", "Another topic"]
}
```

The page automatically sorts talks by date, picks the next upcoming talk for the large featured card, builds the full schedule, and marks the next talk with a `Next` badge.

This uses `talks.js` rather than JSON so the site still works when `index.html` is opened directly from a computer without running a web server.

## Other files
- `index.html` — page structure and non-talk text
- `styles.css` — styling
- `script.js` — talk rendering and mobile navigation
- `pattern.png` — background image
