import CartItem from "../components/ui/cartItem.jsx";

import useCartStore from "../store/cartStore.js";

export default function Cart() {
  const cartItems = useCartStore((state) => state.items);

  return (
    <div>
      <h1>Cart Page</h1>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          imageUrl={item.imageUrl}
          unitPrice={item.price}
          quantity={item.quantity}
        />
      ))}
    </div>
  );
}
