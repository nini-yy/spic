# USAGE

1. Clone the repository at:
> `git clone https://github.com/nini-yy/spic.git`

To launch
> `npm run build` -- typechecks and builds for production
> `npm run lint` -- runs ESLint

## File Structure and Information about Navigating files.

```
src/
├── main.tsx              # App entry point, mounts <App /> into #root
├── App.tsx                # Top-level layout + view/page routing (all state lives here)
├── App.css                # All app styling (sidebar, feed, chat, profile, forms, etc.)
├── index.css               # Global resets and CSS variables (light/dark theme tokens)
│
├── components/
│   ├── Sidebar.tsx          # Left nav: channel list, Direct Messages list, profile footer
│   ├── Composer.tsx          # "+ Add Post" bar at the top of the feed
│   ├── PostCard.tsx           # Single post preview shown in the feed
│   ├── PostDetail.tsx          # Full post + Discord-style comment thread (click into a post)
│   ├── NewPostPage.tsx          # Full-page form for creating a new post
│   ├── DMChat.tsx                # Discord-style direct message thread with a contact
│   ├── ProfilePage.tsx            # Your profile: post history, DND/notification/privacy settings
│   └── RightPanel.tsx              # Right column: upcoming events, interns w/ DMs open, stats
│
└── data/
    ├── posts.ts              # Mock posts, channels, post types, upcoming events, intern list
    ├── dms.ts                 # Mock DM contacts + conversation history (built from posts.ts interns)
    └── me.ts                    # The current logged-in user (name, avatar, role) — single source
                                   # of truth so "you" render consistently across every component
```

**How navigation works:** `App.tsx` holds two pieces of state that control what's on screen —
`page` (`'home' | 'new-post' | 'profile'`, full-page takeovers) and `view` (`'feed' | 'dm' | 'post'`,
what renders inside the main column when `page === 'home'`). To change what a component can
navigate to, add a handler in `App.tsx` and pass it down as a prop — components don't manage
routing themselves.

**Adding mock content:** edit the arrays in `data/posts.ts` (posts, channels, events, interns) or
`data/dms.ts` (DM conversations). Everything on screen is derived from those files, so no component
code needs to change to add a new post, channel, or intern.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
