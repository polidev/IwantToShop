# I Want To Shop

A client-side shopping cart practice application built with React 19 and Zustand. Browse a coffee menu, add items to your cart, adjust quantities, and see totals update in real time — all persisted to localStorage. No backend, no API, no database. Just clean, focused frontend architecture.

## 🚀 Features

- **Product catalog** — Grid of coffee drinks with images, names, and prices
- **Add to cart** — One-click add from product cards with instant feedback
- **Quantity controls** — Increment, decrement, or remove items from the cart
- **Live totals** — Item count and total price update as you shop
- **Cart persistence** — Zustand `persist` middleware saves your cart to localStorage across sessions
- **Responsive design** — Mobile-first layout with CSS Grid, adapts from single-column to 4-column grid
- **Dark mode** — Adobe-inspired dark theme with accessible contrast ratios
- **Sticky header** — Navigation stays visible while scrolling, with cart badge showing item count
- **Empty state** — Friendly message and CTA when cart is empty
- **Lazy-loaded pages** — Code-split routes for faster initial load

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | 19 | UI framework |
| [Vite](https://vite.dev) | 8 | Build tool + dev server |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Utility-first styling |
| [React Router](https://reactrouter.com) | 8 | Client-side routing |
| [Zustand](https://zustand.pmnd.rs) | 5 | Global state management |
| [React Compiler](https://react.dev/learn/react-compiler) | — | Auto-memoization via Babel |
| [OxLint](https://oxc.rs) | — | Linting |

## 📦 Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- npm (comes with Node)

## 🔧 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/i-want-to-shop.git
   cd i-want-to-shop
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

## 💻 Usage

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run OxLint to check for issues |

## 📁 Project Structure

```
src/
├── main.jsx                       # Entry point
├── App.jsx                        # Route definitions with lazy loading
├── index.css                      # Tailwind import + CSS variables
├── store/
│   └── cartStore.js               # Zustand store (items, actions, persist)
├── data/
│   └── products.js                # Static product catalog
├── pages/
│   ├── home.jsx                   # Product grid
│   ├── cart.jsx                   # Cart page with order summary
│   └── error.jsx                  # 404 page
└── components/
    ├── layout/
    │   ├── Header.jsx             # Sticky nav + mobile burger menu
    │   └── Footer.jsx             # Footer
    └── ui/
        ├── ProductCard.jsx        # Product card with add-to-cart
        └── CartItem.jsx           # Cart line item with quantity controls
```

## 🤝 Contributing

Contributions are welcome. This is a practice project — feel free to fork it, experiment, and make it your own.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Make your changes
4. Run `npm run lint` and `npm run build` to verify
5. Commit and push
6. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
