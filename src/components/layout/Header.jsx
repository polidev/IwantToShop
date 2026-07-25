import { useState } from "react";
import { Link } from "react-router";
import useCartStore from "../../store/cartStore.js";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const totalQuantity = useCartStore((s) => s.getTotalQuantity());

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface-1/80 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          className="min-h-11 min-w-11 rounded-md px-1 py-1 font-display text-lg font-bold tracking-tight text-ink transition-colors hover:text-primary md:text-xl"
        >
          I Want To Shop
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          <li>
            <Link
              to="/"
              className="inline-flex min-h-11 min-w-11 items-center rounded-md px-4 py-2 text-sm font-semibold text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="inline-flex min-h-11 min-w-11 items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
            >
              <span>Cart</span>
              {totalQuantity > 0 && (
                <span className="inline-flex min-h-6 min-w-6 items-center justify-center rounded-full bg-primary px-2 text-xs font-bold text-on-primary">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </li>
        </ul>

        <Link
          to="/cart"
          className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-md transition-colors hover:bg-surface-2 md:hidden"
          aria-label={`Shopping cart, ${totalQuantity} items`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          {totalQuantity > 0 && (
            <span className="absolute -right-0.5 -top-0.5 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-on-primary">
              {totalQuantity}
            </span>
          )}
        </Link>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md transition-colors hover:bg-surface-2 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          )}
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-surface-1 px-4 pb-4 pt-2 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="inline-flex min-h-11 w-full items-center rounded-md px-4 py-2 text-sm font-semibold text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="inline-flex min-h-11 w-full items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
              >
                <span>Cart</span>
                {totalQuantity > 0 && (
                  <span className="inline-flex min-h-6 min-w-6 items-center justify-center rounded-full bg-primary px-2 text-xs font-bold text-on-primary">
                    {totalQuantity}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
