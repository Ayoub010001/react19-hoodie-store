import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Notification from "./components/Notification";

function App() {


  return (
    <div className="app relative">
      <Header />
    <main>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </main>
    <Notification />
  </div>
  );
}

export default App;
