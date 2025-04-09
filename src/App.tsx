import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { CartItem } from "./types/Product";
import { useCart } from "./context/CartContext";
function App() {

  const { cart } = useCart();
  

  function countProductsInCart(cart: CartItem[]) {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  return (
    <div className="app">
      <Header cartCount={countProductsInCart(cart)}/>
    <main>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </main>
  </div>
  );
}

export default App;
