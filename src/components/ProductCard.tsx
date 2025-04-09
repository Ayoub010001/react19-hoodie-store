import { Product } from "../types/Product"
import { useState } from "react"
import { memo } from "react"
import { useCart } from "../context/CartContext"

interface ProductProps {
  product: Product,
  onAddToCart: (product: Product) => void,
  cart: Product[]
}
function ProductCard({ product, onAddToCart, cart }: ProductProps) {

  const [showMore, setShowMore] = useState(false);
  const { removeFromCart } = useCart();

  function reduceDescription(description: string, maxLength: number) {
    if (description.length > maxLength)
      return description.slice(0, maxLength) + "...";
    return description;
  }

  function isProductInCart(product: Product) {
    return cart.some((item) => item.id === product.id);
  }

  return (
    <div className="relative rounded-lg bg-gray-800 hover:bg-sky-950 hover:scale-95 hover:shadow-2xl hover:shadow-blue-500/30  p-2 text-sky-50 max-w-[400px] m-auto cursor-pointer transition-all duration-300 overflow-hidden">
      <p className={`text-sm absolute bg-sky-600/80 hover:bg-sky-600/95 rounded px-4 py-2 right-2 m-2`}>{product.category || "Coding"}</p>
      <img src={product.imageUrl} className="w-100 rounded" alt={product.name}></img>
      <h2 className="font-medium text-white text-2xl my-2">{product.name}</h2>
      <p className="text-gray-300">{showMore ? product.description : reduceDescription(product.description, 26)}</p>
      <button
        className="text-sm text-sky-400 italic hover:underline"
        onClick={() => setShowMore(!showMore)}>{showMore ? "Read less" : "Read more"}</button>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sky-50 font-bold text-2xl">${product.price}</p>
        <button className={`${isProductInCart(product) ? "bg-green-600" : "bg-sky-600 hover:bg-sky-700"} py-2 px-4 rounded-lg cursor-pointer transition-all duration-300 flex items-center gap-2 text-sky-50`}
          onClick={() => onAddToCart(product)}>
          Add to Cart
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
        </button>
      </div>
      <div className={`${isProductInCart(product)?"flex justify-end items-center mt-4":" hidden"}`} >
        <button 
        onClick={() => removeFromCart(product)}
        className="text-sm font-medium px-2 py-1 outline-2 rounded hover:bg-red-600/50"
        >
          Remove from cart
        </button>
      </div>
    </div>
  )
}

export default memo(ProductCard)