import useCartStore from "../../store/cartStore.js";

export default function Header() {
  const totalQuantity = useCartStore((state) => state.getTotalQuantity());

  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            {totalQuantity >= 0 && (
              <span className="cart-quantity">{totalQuantity}</span>
            )}
          </li>

          <li>
            <a href="/cart">Cart</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
