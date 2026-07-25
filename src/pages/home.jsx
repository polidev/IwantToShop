import products from "../data/products.js";
import ProductCard from "../components/ui/ProductCard.jsx";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
      <section className="mb-8 md:mb-12">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">
          Our Menu
        </h1>
        <p className="mt-2 text-base text-ink-muted md:text-lg">
          Handcrafted drinks, made to order.
        </p>
      </section>

      <section
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        aria-label="Product catalog"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            imageUrl={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </section>
    </main>
  );
}
