import { useState, useEffect } from "react";
import products from "../data/products.js";
import ProductCard from "../components/ui/productCard.jsx";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      {products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            id={product.id}
            imageUrl={product.image}
            name={product.name}
            price={product.price}
          />
        );
      })}
      <ProductCard />
    </div>
  );
}
