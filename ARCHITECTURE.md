# ARCHITECTURE.md

## System Overview

Client-only single-page application. No server, no API, no database.

```
┌──────────────────────────────────────────────────────────────┐
│                        Browser                                │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                    React App                             │  │
│  │                                                          │  │
│  │  ┌──────────┐   ┌──────────┐   ┌────────────────────┐  │  │
│  │  │  Header   │   │  Pages   │   │     Footer         │  │  │
│  │  │ (layout)  │   │ (routes) │   │     (layout)       │  │  │
│  │  └────┬─────┘   └────┬─────┘   └────────────────────┘  │  │
│  │       │               │                                  │  │
│  │       └───────┬───────┘                                  │  │
│  │               │                                          │  │
│  │       ┌───────▼───────┐                                  │  │
│  │       │  Zustand Store │──── localStorage (persist)     │  │
│  │       │  (cartStore)   │                                  │  │
│  │       └────────────────┘                                  │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │              Static Data (products.js)                   │  │
│  └─────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

**Data flow is unidirectional:** User action → Component calls store action → Zustand updates state → Selectors trigger re-render → UI updates.

---

## Component Hierarchy

```
<App>                                  src/App.jsx
├── <Suspense>                         (loading boundary)
│   ├── <Header />                     src/components/layout/Header.jsx
│   │   └── Cart badge (count)         ← reads useCartStore(s => s.items)
│   │
│   ├── <Route "/" element={}>         src/pages/home.jsx
│   │   └── <ProductCard />[]          src/components/ui/ProductCard.jsx
│   │       └── Add to Cart button     → calls useCartStore(s => s.addItem)
│   │
│   ├── <Route "/cart" element={}>     src/pages/cart.jsx
│   │   ├── <CartItem />[]             src/components/ui/CartItem.jsx
│   │   │   ├── Quantity controls (+/-) → calls useCartStore(s => s.updateQuantity)
│   │   │   └── Remove button          → calls useCartStore(s => s.removeItem)
│   │   │
│   │   └── Cart summary               ← reads useCartStore(s => s.totalCount)
│   │                                     reads useCartStore(s => s.totalPrice)
│   │
│   ├── <Route "*" element={}>         src/pages/error.jsx
│   │   └── 404 message + link home
│   │
│   └── <Footer />                     src/components/layout/Footer.jsx
```

---

## Data Model

### Product (static)

Defined in `src/data/products.js`. Never changes at runtime.

```js
{
  id: 1,              // number, unique
  name: "Product",    // string
  price: 9.99,        // number, USD
  image: "/url.jpg",  // string, path or URL
  description: ""     // string
}
```

### Cart Item (runtime, Zustand state)

Stored in `src/store/cartStore.js`. Derived from product + user actions.

```js
{
  id: 1,              // number, matches product.id
  name: "Product",    // string, copied from product
  price: 9.99,        // number, copied from product
  image: "/url.jpg",  // string, copied from product
  quantity: 1         // number, managed by cart actions
}
```

Cart items are **denormalized copies** of product data. If a product were ever updated, cart items would retain their snapshot. For this practice app this is acceptable.

---

## Zustand Store Design

### State Shape

```
cartStore
├── items: CartItem[]              # Array of cart items
├── addItem(product)               # Add new item or increment quantity
├── removeItem(productId)          # Remove item entirely
├── updateQuantity(productId, n)   # Set absolute quantity
├── clearCart()                    # Empty the cart
├── totalCount()                   # Derived: sum of all quantities
└── totalPrice()                   # Derived: sum of (price × quantity)
```

### Actions Detail

| Action | Input | Behavior |
|---|---|---|
| `addItem` | `product` | If item exists in cart → increment quantity by 1. Otherwise → append new item with quantity 1. |
| `removeItem` | `productId` | Filter out the item with matching id. |
| `updateQuantity` | `productId, qty` | Map items, set quantity for matching id. If qty ≤ 0 → remove item. |
| `clearCart` | none | Reset items to `[]`. |
| `totalCount` | none | `get().items.reduce((sum, i) => sum + i.quantity, 0)` |
| `totalPrice` | none | `get().items.reduce((sum, i) => sum + i.price * i.quantity, 0)` |

### Persistence

Zustand `persist` middleware serializes the entire `items` array to `localStorage` under the key `"cart-storage"`. On page load, Zustand rehydrates from localStorage before the first render.

### Selector Pattern

Every component that reads store state uses a **narrow selector**:

```jsx
// CORRECT - only re-renders when items array reference changes
const items = useCartStore((s) => s.items);
const addItem = useCartStore((s) => s.addItem);

// WRONG - re-renders on ANY store change
const store = useCartStore();
```

Derived values (`totalCount`, `totalPrice`) are called as functions from selectors:

```jsx
const total = useCartStore((s) => s.totalPrice());
```

---

## Routing Architecture

```
URL                  Component          Description
─────                ─────────          ───────────
/                    Home               Product grid
/cart                Cart               Cart page
/*                   Error              404 fallback
```

- All routes are top-level (no nested `<Outlet>` layouts).
- Each page is lazy-loaded with `React.lazy()` to enable code splitting.
- The `Suspense` boundary in `App.jsx` shows a fallback during chunk loading.

---

## File Responsibilities

| File | Responsibility | Dependencies |
|---|---|---|
| `src/main.jsx` | Entry point. Mounts `<App>` inside `<BrowserRouter>` and `<StrictMode>`. | react, react-dom, react-router |
| `src/App.jsx` | Defines all routes. Lazy-loads pages. Wraps in `<Suspense>`. | react-router, pages/* |
| `src/index.css` | Single Tailwind import. No other styles. | tailwindcss |
| `src/store/cartStore.js` | Zustand store. All cart state + actions + persist. | zustand |
| `src/data/products.js` | Static product array. Exported as named `products`. | none |
| `src/pages/home.jsx` | Renders product grid from static data. | ProductCard, products, cartStore |
| `src/pages/cart.jsx` | Renders cart items, quantity controls, summary. | CartItem, cartStore |
| `src/pages/error.jsx` | 404 page with link back to home. | react-router (Link) |
| `src/components/layout/Header.jsx` | Site nav + cart badge. Reads item count from store. | cartStore, react-router (Link) |
| `src/components/layout/Footer.jsx` | Static footer. | none |
| `src/components/ui/ProductCard.jsx` | Single product display + "Add to Cart" button. | cartStore |
| `src/components/ui/CartItem.jsx` | Single cart line: info, quantity +/-, remove. | cartStore |

---

## Dependency Graph

```
main.jsx
  └── App.jsx
        ├── cartStore.js
        ├── pages/home.jsx
        │     ├── products.js
        │     └── components/ui/ProductCard.jsx
        │           └── cartStore.js
        ├── pages/cart.jsx
        │     ├── cartStore.js
        │     └── components/ui/CartItem.jsx
        │           └── cartStore.js
        ├── pages/error.jsx
        └── components/layout/Header.jsx
              └── cartStore.js
```

`cartStore.js` is the single shared dependency consumed by 5 components.

---

## Persistence Strategy

```
Browser localStorage
┌──────────────────────────────────────┐
│ Key: "cart-storage"                  │
│ Value: { state: { items: [...] } }   │
└──────────────────────┬───────────────┘
                       │
          Zustand persist middleware
                       │
              ┌────────▼────────┐
              │  cartStore.js   │
              │  items: [...]   │
              └─────────────────┘
```

- **Hydration**: On page load, Zustand reads from localStorage before rendering.
- **Sync**: Every `set()` call automatically persists the new state.
- **Key**: `"cart-storage"` in localStorage.
- **Format**: JSON-serialized, includes `{ state, version }` wrapper.

---

## Layout Strategy

The layout is **not** rendered via React Router `<Outlet>`. Instead, `App.jsx` wraps all routes directly:

```
<Suspense>
  <Header />              ← always visible (outside Routes)
  <Routes>
    <Route "/" />
    <Route "/cart" />
    <Route "*" />
  </Routes>
  <Footer />              ← always visible (outside Routes)
</Suspense>
```

This keeps the layout simple. If nested layouts are needed later, migrate to `<Layout>` with `<Outlet>`.

---

## Future Considerations (Out of Scope)

These are NOT part of the current build. Documented here for reference only.

- **Backend / API**: Would require a server (Node/Express or Next.js API routes), a database (PostgreSQL, MongoDB), and async data fetching.
- **User authentication**: Would add login/register pages, JWT or session-based auth, protected routes.
- **Checkout flow**: Would add a `/checkout` page, order summary, mock payment form.
- **Wishlist (Likes page)**: Would require a second Zustand store (`likesStore.js`) following the same pattern as `cartStore.js`.
- **Search / filters**: Would add filter state to the store or a URL query param strategy.
