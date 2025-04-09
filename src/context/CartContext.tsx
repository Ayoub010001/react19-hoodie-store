import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem, Product } from "../types/Product";

// Define the shape of your context
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  userFeedback: string | null;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a provider component
export function CartProvider({ children }: { children: ReactNode }) {
  //const [cart, setCart] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userFeedback, setUserFeedback] = useState<string | null>(null);


  const addToCart = (product: Product) => {
    // Add to cart implementation
    const existingProduct = cart.find(item => item.id === product.id);
    if (!existingProduct) {
      setCart((prevCart: CartItem[]) => [...prevCart, { ...product, quantity: 1 }]);
      
      setUserFeedback(`Added ${product.name} to cart`);
        setTimeout(() => {
          setUserFeedback(null);
        }
        , 2000);
  
    }else{
      setCart((prevCart: CartItem[]) => prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
       
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
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, userFeedback }}>
      {children}
    </CartContext.Provider>
  );
}

// Create a custom hook for using the context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}