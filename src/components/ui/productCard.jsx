import useCartStore from "../../store/cartStore.js";

export default function ProductCard({ id, imageUrl, name = "Product", price = 0 }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface-1 transition-all duration-250 hover:border-surface-3 hover:shadow-elevated">
      <div className="relative aspect-square overflow-hidden bg-surface-2">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-250 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute right-3 bottom-3 rounded-full bg-primary/90 px-3 py-1 text-sm font-bold text-on-primary backdrop-blur-sm">
          ${price.toFixed(2)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-display text-lg font-semibold leading-tight text-ink">
          {name}
        </h3>

        <button
          type="button"
          onClick={() => addItem({ id, name, imageUrl, price })}
          className="mt-auto inline-flex min-h-11 min-w-11 items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-bold text-on-primary transition-all duration-130 hover:bg-primary-hover active:scale-[0.97]"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
