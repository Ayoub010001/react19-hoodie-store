import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";

function App() {

  return (
    <div className="app">
      <Header />
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
