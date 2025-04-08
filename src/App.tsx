import { useState } from "react";
import useFetch from "./hooks/useFetch";

import ProductList from "./components/ProductList";
import { Product, CartItem } from "./types/Product";
import Header from "./components/Header";

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userFeedback, setUserFeedback] = useState<string | null>(null);
  
  function handleAddToCart(product: Product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (!existingProduct) {
      setCart((prevCart:CartItem[])=>[...prevCart, {...product,quantity:1}]);
      setUserFeedback(`Added ${product.name} to cart`);
      setTimeout(() => {
        setUserFeedback(null);
      }
      , 2000);
    }else{
      setCart((prevCart:CartItem[])=>prevCart.map(item=>item.id===product.id?{...item,quantity:item.quantity+1}:item));
      
      cart.forEach(item => {
        if (item.id === product.id) {
          setUserFeedback(`Added ${item.quantity} X ${product.name} in cart`);
        }
      })
      
      setTimeout(() => {
        setUserFeedback(null);
      }
      , 2000);
    }
  }
  
  function countProductsInCart(cart: CartItem[]) {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }


  const {data:products,isLoading,isError} = useFetch<Product[]>("http://localhost:5000/products");
  
  console.log({products,isLoading,isError});
  return (
    <main className="mx-auto container bg-gray-900 text-sky-50 min-h-screen">
      <Header cartCount={countProductsInCart(cart)}/>
      {isLoading && <div className="loading-spinner">Loading...</div>}
      {
    isError && <div className="error-message">{isError}</div>}
      {(!isLoading&&!isError)&&
      <ProductList products={products} onAddToCart={handleAddToCart} cart={cart}/>}
      
      {userFeedback && (<div className="fixed bottom-0 left-0 right-0 bg-sky-800/80 text-center p-2">
        <p className="text-sky-50">{userFeedback}</p>
      </div>)}
    </main>
  );
}

export default App;
