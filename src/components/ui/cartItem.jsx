import useCartStore from "../../store/cartStore.js";

export default function CartItem({ id, name, imageUrl, unitPrice, quantity }) {
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  return (
    <>
      <div>
        <img src={imageUrl} alt="" width="200" height="200" />
        <h1>{name}</h1>
        <p>Price: {unitPrice}</p>
        <p>Quantity: {quantity}</p>
        <p>Total: {unitPrice * quantity}</p>
      </div>
      <div>
        <span>Remove one</span>
        <button type="button" onClick={() => updateQuantity(id, -1)}>
          -
        </button>
        <span>Add one</span>
        <button type="button" onClick={() => updateQuantity(id, 1)}>
          +
        </button>
        <span>Remove all</span>
        <button type="button" onClick={() => removeItem(id)}>
          X
        </button>
      </div>
    </>
  );
}
