# AGENTS.md

## Project Overview

Shopping cart practice application. Client-only, no backend. Global state managed with Zustand.

## Commands

- `npm run dev` - Start Vite dev server
- `npm run build` - Production build (run this to verify changes)
- `npm run lint` - Run OxLint (run this before committing)
- `npm run preview` - Preview production build

Always run `npm run lint` and `npm run build` after making changes to verify correctness.

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 8 | Build tool + dev server |
| Tailwind CSS | 4 | Styling (utility classes, no component CSS files) |
| React Router | 8 | Client-side routing (lazy-loaded pages) |
| Zustand | latest | Global state management (cart store) |
| React Compiler | - | Auto-memoization via Babel plugin |
| OxLint | - | Linting (NOT ESLint) |

## Architecture

### State Management: Zustand

All global state lives in Zustand stores under `src/store/`. No React Context is used.

- Store files: `src/store/*.js`
- Select individual slices in components to avoid unnecessary re-renders:
  ```jsx
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  ```
- Never select the entire store object: `useCartStore()` without a selector is forbidden.
- Use Zustand `persist` middleware for localStorage persistence.
- Immutably update state in all actions (spread operators, no mutation).

### Routing

- Routes defined in `src/App.jsx` using React Router `<Routes>` and `<Route>`.
- Pages are lazy-loaded via `React.lazy()` with a `<Suspense>` boundary.
- Layout is applied at the root route level (not nested).

### Data

- Product catalog is a static JS array in `src/data/products.js`.
- Each product: `{ id, name, price, image, description }`.
- No external API calls. No fetch. No async data loading.

### Styling

- Tailwind CSS utility classes only. No CSS modules, no styled-components, no separate .css files per component.
- Global styles in `src/index.css` (Tailwind import only).
- Mobile-first responsive design.

## File Structure

```
src/
├── main.jsx                  # Entry point, BrowserRouter wraps App
├── App.jsx                   # Route definitions with lazy loading
├── index.css                 # Tailwind import
├── store/
│   └── cartStore.js          # Zustand cart store (items, actions, persist)
├── data/
│   └── products.js           # Static product catalog
├── pages/
│   ├── home.jsx              # Product list (default export)
│   ├── cart.jsx               # Cart page (default export)
│   └── error.jsx             # 404 page (default export)
├── components/
│   ├── layout/
│   │   ├── Header.jsx        # Nav + cart badge (default export)
│   │   └── Footer.jsx        # Footer (default export)
│   └── ui/
│       ├── ProductCard.jsx   # Product card (default export)
│       └── CartItem.jsx      # Cart line item (default export)
└── hooks/                    # Custom hooks (if needed)
```

Directories not used: `src/context/`, `src/api/`. Remove them if encountered.

## Conventions

### Component Rules

- Every component uses `export default function ComponentName()`.
- All components are function components. No class components.
- File names are lowercase (e.g., `home.jsx`, `cartStore.js`, `ProductCard.jsx`).
- One component per file. File name matches component name (lowercased).

### Code Style

- No comments in code unless explicitly requested.
- Use `const` over `let`. Never use `var`.
- Destructure props at the function signature level.
- Keep JSX simple. Extract sub-components only when they exceed ~40 lines.
- Prefer early returns over nested ternaries.

### Import Order

1. React / library imports
2. Component imports
3. Store imports
4. Data imports
5. Utility imports

### Zustand Store Pattern

```js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          }
          return { items: [...state.items, { ...product, quantity: 1 }] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== productId),
        })),
      clearCart: () => set({ items: [] }),
      totalCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: "cart-storage" },
  ),
);

export default useCartStore;
```

## Before Committing

1. Run `npm run lint` and fix all errors.
2. Run `npm run build` and ensure it succeeds.
3. Verify no console errors in dev server.
