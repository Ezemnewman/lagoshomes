# LagosHomes — Frontend (Step 3 of the build)

This is your Stitch home page export, converted into a real, componentized
React project. It's a starting point you'll keep extending as you bring in
more Stitch screens.

## How to run this on your machine

You'll need [Node.js](https://nodejs.org) installed (v18 or newer).

```bash
cd lagoshomes
npm install
npm run dev
```

Then open the URL it prints (usually `http://localhost:5173`).

## What changed from the raw Stitch export

The Stitch export was one big HTML file with the same property-card
markup copy-pasted six times. This version is broken into pieces so that
each part only exists in one place:

```
src/
  components/       reusable pieces used across multiple pages
    Navbar.jsx
    Footer.jsx
    PropertyCard.jsx     <- the big one: was 6 copy-pasted blocks, now 1 component
    CategoryCard.jsx
    CityCard.jsx
    SearchBar.jsx
    WhatsAppFAB.jsx
    Icon.jsx
  pages/
    HomePage.jsx          assembles the components above into the home page
  data/
    properties.js          placeholder listing data, shaped like a future API response
    siteConfig.js           small shared values (e.g. WhatsApp number)
  hooks/                    (empty for now — custom React hooks go here later)
  utils/                    (empty for now — helper functions go here later)
```

## Why this matters for "maintainable, reusable" code

- Change the WhatsApp number once in `siteConfig.js` — it updates in both
  the footer and the floating button.
- Add a 7th property card by adding one object to `properties.js` — no
  JSX editing required.
- When the real backend exists, `HomePage.jsx` swaps the `properties.js`
  import for a `fetch('/api/listings')` call. `PropertyCard.jsx` itself
  doesn't change, because it already only cares about receiving a
  `property` object shaped a certain way.
- Every `// TODO:` comment in the code marks exactly where backend
  wiring will plug in later — search the codebase for `TODO` to see the
  full list of connection points.

## What's stubbed for now (expected — backend doesn't exist yet)

- Search button logs to the console instead of fetching real results
- "List Your Property" button logs to the console instead of opening
  agent signup
- Favorite (heart) button toggles visually but doesn't persist anywhere
- WhatsApp number is a placeholder — replace `2340000000000` in
  `src/data/siteConfig.js` with the real number
- Signup form collects input but doesn't create a real account yet
  (no backend to send it to)
- Facebook sign-in is a disabled placeholder; no OAuth setup decided yet

## Environment setup (Google Sign-In)

The signup page's Google button is real (uses Google's actual OAuth
SDK), but needs a Client ID only you can generate:

1. Copy `.env.example` to a new file named `.env`
2. Follow the instructions inside `.env.example` to get a Client ID
   from Google Cloud Console
3. Paste it in as `VITE_GOOGLE_CLIENT_ID=your-id-here`
4. Restart `npm run dev` (Vite only reads `.env` on startup)

Until this is set, the button shows as a labeled, disabled placeholder
instead of crashing or pretending to work.

## Next steps

Bring more Stitch screens (search results page, property detail page,
agent dashboard, etc.) and we'll convert them the same way — building
out `src/pages/` one screen at a time, reusing the components already
built here wherever they fit.
