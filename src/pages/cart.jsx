import { Link } from "react-router";
import CartItem from "../components/ui/CartItem.jsx";
import useCartStore from "../store/cartStore.js";

export default function Cart() {
  const cartItems = useCartStore((s) => s.items);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const getTotalQuantity = useCartStore((s) => s.getTotalQuantity);
  const clearCart = useCartStore((s) => s.clearCart);

  const totalPrice = getTotalPrice();
  const totalQuantity = getTotalQuantity();

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-12 text-center md:px-8">
        <div className="rounded-full bg-surface-2 p-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-ink-faint"
            aria-hidden="true"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold text-ink md:text-3xl">
          Your cart is empty
        </h1>
        <p className="mt-2 text-ink-muted">Add something to get started.</p>
        <Link
          to="/"
          className="mt-6 inline-flex min-h-11 min-w-11 items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-bold text-on-primary transition-colors hover:bg-primary-hover"
        >
          Browse Menu
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <section aria-label="Cart items">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="font-display text-2xl font-bold text-ink md:text-3xl">
              Your Cart
            </h1>
            <button
              type="button"
              onClick={clearCart}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-3 py-1.5 text-xs font-semibold text-ink-faint transition-colors hover:bg-surface-2 hover:text-ink-muted"
            >
              Clear All
            </button>
          </div>

          <ul className="flex flex-col gap-3">
            {cartItems.map((item) => (
              <li key={item.id}>
                <CartItem
                  id={item.id}
                  name={item.name}
                  imageUrl={item.imageUrl}
                  unitPrice={item.price}
                  quantity={item.quantity}
                />
              </li>
            ))}
          </ul>
        </section>

        <aside
          aria-label="Order summary"
          className="h-fit rounded-lg border border-border bg-surface-1 p-6 lg:sticky lg:top-24"
        >
          <h2 className="font-display text-lg font-semibold text-ink">
            Order Summary
          </h2>

          <dl className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <dt className="text-ink-muted">Items</dt>
              <dd className="font-semibold text-ink">{totalQuantity}</dd>
            </div>
            <div className="flex items-center justify-between text-sm">
              <dt className="text-ink-muted">Subtotal</dt>
              <dd className="font-semibold text-ink">
                ${totalPrice.toFixed(2)}
              </dd>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex items-center justify-between">
                <dt className="font-semibold text-ink">Total</dt>
                <dd className="font-display text-xl font-bold text-primary">
                  ${totalPrice.toFixed(2)}
                </dd>
              </div>
            </div>
          </dl>

          <button
            type="button"
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-bold text-on-primary transition-colors hover:bg-primary-hover"
          >
            Checkout
          </button>
        </aside>
      </div>
    </main>
  );
}
