import useCartStore from "../../store/cartStore.js";

export default function CartItem({ id, name, imageUrl, unitPrice, quantity }) {
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  return (
    <article className="flex flex-col gap-4 rounded-lg border border-border bg-surface-1 p-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-4 sm:flex-1">
        <img
          src={imageUrl}
          alt={name}
          className="h-20 w-20 shrink-0 rounded-md object-cover sm:h-24 sm:w-24"
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-base font-semibold text-ink sm:text-lg">
            {name}
          </h3>
          <p className="mt-0.5 text-sm text-ink-muted">
            ${unitPrice.toFixed(2)} each
          </p>
          <p className="mt-1 text-sm font-semibold text-primary">
            Total: ${(unitPrice * quantity).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:flex-col sm:items-end">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => updateQuantity(id, -1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-surface-2 text-lg font-bold text-ink transition-colors hover:bg-surface-3"
            aria-label={`Decrease quantity of ${name}`}
          >
            -
          </button>
          <span className="inline-flex h-11 min-w-[2.75rem] items-center justify-center rounded-md bg-surface-2 px-2 text-sm font-bold text-ink">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => updateQuantity(id, 1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-surface-2 text-lg font-bold text-ink transition-colors hover:bg-surface-3"
            aria-label={`Increase quantity of ${name}`}
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={() => removeItem(id)}
          className="inline-flex h-11 min-w-[4.5rem] items-center justify-center rounded-md border border-danger/30 bg-danger/10 px-3 text-xs font-bold text-danger transition-colors hover:bg-danger/20"
          aria-label={`Remove ${name} from cart`}
        >
          Remove
        </button>
      </div>
    </article>
  );
}
