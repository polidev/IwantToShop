import useCartStore from "../../store/cartStore.js";

const addToCart = (product) => {
  useCartStore.getState().addItem(product);
};

export default function ProductCard({
  id,
  imageUrl,
  name = "Product",
  price = 0,
}) {
  return (
    <>
      <div>
        <img src={imageUrl} alt="" width="200" height="200" />
        <h1>{name}</h1>
        <p>{price}</p>
      </div>
      <button
        type="button"
        onClick={() => addToCart({ id, name, imageUrl, price })}
      >
        Add to cart
      </button>
    </>
  );
}
