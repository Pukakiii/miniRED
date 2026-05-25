# Minired

A lightweight Reddit-style feed reader built as a personal front-end project. Browse popular and subreddit posts, save favorites locally, jump through long feeds with anchors, and search subreddits with live suggestions powered by the Reddit API.

## Features

- **Popular feed** — View posts from `r/popular` with New, Hot, and Best sorting
- **Subreddit feed** — Explore any public subreddit with flair-based filtering
- **Subreddit search** — Debounced autocomplete using Reddit’s subreddit search API, with in-memory caching to limit requests
- **Infinite scroll** — Automatically loads more posts when you reach the bottom of the feed
- **Saved posts** — Save and unsave posts; data persists in `localStorage` across sessions
- **Jump-to anchors** — Navigate every fifth post via the category bar; active checkpoint highlights while scrolling
- **Responsive layout** — Optimized for mobile, tablet, and desktop screen sizes
- **Expanded post view** — Open a post in a larger overlay to read content and media

## Requirements

- **Node.js** 18 or later (20+ recommended)
- **npm** 9 or later
- A modern browser with JavaScript enabled
- Internet connection (posts are fetched from Reddit via a CORS proxy)

No API keys or backend server are required.

## Installation

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd minired
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## How to Run the App

**Development** (with hot reload):

```bash
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

**Production preview** (after building):

```bash
npm run build
npm run preview
```

**Type check:**

```bash
npm run tsc
```

**Lint:**

```bash
npm run lint
```

## Folder Structure

```text
minired/
├── index.html              # App entry HTML
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── public/                 # Static assets served as-is
└── src/
    ├── main.tsx            # React root and Redux Provider
    ├── App.tsx             # Route definitions
    ├── App.css             # Global style imports
    ├── api/                # Reddit fetch helpers
    │   ├── popPostsAPI.ts
    │   ├── subPostsAPI.ts
    │   └── subredditSearchAPI.ts
    ├── app/                # Redux store and typed hooks
    │   ├── store.ts
    │   └── hooks.ts
    ├── assets/             # Icons, logo, SVGs
    ├── components/         # UI components
    │   ├── header.tsx
    │   ├── navbar.tsx
    │   ├── posts.tsx
    │   ├── postCard.tsx
    │   ├── categoryLine.tsx
    │   ├── subredditSearch.tsx
    │   └── pageShell.tsx
    ├── features/           # Redux slices
    │   ├── popularPost/
    │   ├── subredditPost/
    │   └── savedPosts/
    ├── hooks/              # Reusable React hooks
    │   ├── useDebouncedValue.ts
    │   ├── useSubredditSuggestions.ts
    │   └── useActivePostAnchor.ts
    ├── pages/              # Route-level page layouts
    │   ├── Start.tsx
    │   ├── Popular.tsx
    │   ├── SubReddit.tsx
    │   └── Saved.tsx
    ├── styles/             # CSS modules per feature
    ├── types/              # Shared TypeScript types
    └── utils/              # Helpers and small UI utilities
```

## Technologies Used

| Technology | Purpose |
|------------|---------|
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Static typing |
| [Vite](https://vitejs.dev/) | Dev server and build tool |
| [Redux Toolkit](https://redux-toolkit.js.org/) | State management and async thunks |
| [React Router](https://reactrouter.com/) | Client-side routing |
| [Reddit JSON API](https://www.reddit.com/dev/api/) | Post and subreddit data |
| [corsproxy.io](https://corsproxy.io/) | CORS proxy for browser requests |

## Additional Notes

- **Data source:** The app reads public Reddit JSON endpoints. Rate limits and availability depend on Reddit and the proxy service.
- **Saved posts:** Up to 50 posts are stored locally. Clearing browser storage removes saved items.
- **CORS:** All API calls go through `corsproxy.io`. If requests fail, try again later or check proxy availability.
- **No authentication:** This is a read-only client; voting and commenting are visual placeholders only.

## Build Output

Running `npm run build` generates a static production bundle:

```text
dist/
├── index.html
└── assets/
    ├── index-[hash].js
    ├── index-[hash].css
    └── [other hashed assets]
```

Deploy the contents of `dist/` to any static host (Netlify, Vercel, GitHub Pages, etc.).

## Future Improvements

- Offline support with service workers and cached feed snapshots
- User settings (theme, default sort, posts per page)
- Share and copy-link actions on posts
- Improved error boundaries and retry UI for failed fetches
- Replace third-party CORS proxy with a small self-hosted proxy for reliability
