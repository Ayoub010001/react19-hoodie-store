import { Product } from "../types/Product";
import ProductCard from "./ProductCard";

interface ProductListProps {
    products: Product[],
    onAddToCart: (product: Product) => void,
    cart: Product[]
}

function ProductList({products,onAddToCart,cart}: ProductListProps) {
    return (
        <div className="container mx-auto p-4" >
            <h1 className="text-3xl font-bold text-center text-sky-50">Product List</h1>
            {products.length > 0 ? <div data-testid="product-list-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center mt-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} cart={cart}/>
                ))}
            </div> : <p>no products found</p>}

        </div>
    )
}

export default ProductList