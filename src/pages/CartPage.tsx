import { useCart } from "../context/CartContext";

function CartPage() {
  const { cart } = useCart();
  return (
    <div>CartPage</div>
  )
}

export default CartPage