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

  const {data:products,isLoading,isError, retryFetch} = useFetch<Product>("http://localhost:5000/products");
  
  return (
    <main className="mx-auto container bg-gray-900 text-sky-50 min-h-screen">
      <Header cartCount={countProductsInCart(cart)}/>
      {isLoading && <div className="loading-spinner flex flex-col items-center justify-center h-screen"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="animate-spin lucide lucide-loader-circle-icon lucide-loader-circle"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg><p>Loading...</p></div>}
      {isError && <div className="error-message animate-wiggle  flex flex-col items-center justify-center h-screen">
        <div className="bg-red-500/30 rounded-xl p-4 w-[200px] flex-col flex items-center"><p className=" text-red-400"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="float-left me-2 ucide lucide-ban-icon lucide-ban"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>{isError}</p>
        <button onClick={retryFetch} className=" focus:outline-3 focus:outline-violet-500/50 my-4 rounded-lg font-bold py-2 px-4 bg-indigo-500 hover:bg-indigo-600 flex gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-rotate-ccw-icon lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg> <span>Retry</span>
        </button>
        </div>
      </div>}
      
      {(!isLoading&&!isError)&&
      <ProductList products={products} onAddToCart={handleAddToCart} cart={cart}/>}
      
      {userFeedback && (<div className="fixed bottom-0 left-0 right-0 bg-sky-800/80 text-center p-2">
        <p className="text-sky-50">{userFeedback}</p>
      </div>)}
    </main>
  );
}

export default App;
