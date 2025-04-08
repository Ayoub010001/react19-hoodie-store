import { useState } from "react";

import ProductList from "./components/ProductList";
import { Product, CartItem } from "./types/Product";
import Header from "./components/Header";

function App() {

  const mockProducts: Product[] = [
    {
      id: "1",
      category: "Anime",
      name: "Spirited Away Hoodie",
      description: "This hoodie features iconic artwork from the beloved Studio Ghibli film 'Spirited Away'. Made from premium material for ultimate comfort and style.",
      price: 39.99,
      imageUrl: "https://cyber-techwear.com/cdn/shop/products/JAPANESE_ANIME_HOODIE_summer.jpg?crop=center&height=1200&v=1649082578&width=1200",
    },
    {
      id: "2",
      category: "Anime",
      name: "Hunter x Hunter Hoodie",
      description: "Show off your love for 'Hunter x Hunter' with this detailed hoodie. Perfect for fans of Gon and Killua, it features bold graphics and a cozy fit.",
      price: 44.99,
      imageUrl: "https://images.meesho.com/images/products/63929792/lamu5_512.webp",
    },
    {
      id: "3",
      category: "Anime",
      name: "Boku no Hero Hoodie",
      description: "Gear up for action with this 'Boku no Hero Academia' hoodie. Featuring the heroes of Class 1-A, it's perfect for anyone looking to unleash their inner hero.",
      price: 42.99,
      imageUrl: "https://img.joomcdn.net/307bdebf50fd681ae655acaa9749da36a2f52b67_original.jpeg",
    },
    {
      id: "4",
      category: "Anime",
      name: "Chainsaw Man Hoodie",
      description: "This hoodie brings the gritty world of 'Chainsaw Man' to life with striking graphics and a comfortable fit, perfect for fans of Denji and his wild adventures.",
      price: 49.99,
      imageUrl: "https://img.joomcdn.net/6b76a41c140e6df31cca29cb222a6e6682529a1e_original.jpeg",
    },
    {
      id: "5",
      category: "Anime",
      name: "Hunter x Hunter White Hoodie",
      description: "A sleek white version of the 'Hunter x Hunter' hoodie, offering fans a minimalistic design while still paying tribute to the iconic characters of the anime.",
      price: 46.99,
      imageUrl: "https://img.joomcdn.net/f57f9020bba83a38455dc8fe2e34414184c8c6d0_original.jpeg",
    },
    {
      id: "6",
      category: "Anime",
      name: "Gojo Satoru Jujutsu Kaisen Hoodie",
      description: "This hoodie features Gojo Satoru, the powerful and enigmatic sorcerer from 'Jujutsu Kaisen'. With its bold design, it’s the perfect hoodie for fans of the series.",
      price: 48.99,
      imageUrl: "https://s.alicdn.com/@sc04/kf/Hcfe8a16feb344821a36154f2b0a11e3bq.jpg_720x720q50.jpg",
    }
  ];

  const [products, setProducts] = useState<Product[]>(mockProducts);

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
      , 1500);
    }else{
      setUserFeedback(`Already in cart`);
      setTimeout(() => {
        setUserFeedback(null);
      }
      , 1500);
    }
  }

  return (
    <main className="mx-auto container bg-gray-900 text-sky-50 min-h-screen">
      <Header cartCount={cart.length}/>
      <ProductList products={products} onAddToCart={handleAddToCart} cart={cart}/>
      {userFeedback && (<div className="fixed bottom-0 left-0 right-0 bg-sky-800/80 text-center p-2">
        <p className="text-sky-50">{userFeedback}</p>
      </div>)}
    </main>
  );
}

export default App;
