# Day 4 Exercise: Routing & Context API

## Goal

Implement client-side routing to create separate views for your products and shopping cart. Use the Context API to manage global state and avoid prop drilling.

## Requirements

### 1. Setup Routing ✅

- Install React Router DOM:
  ```bash
  npm install react-router-dom
  ```
- Set up the router in your application:

  - Wrap your `App` component with `BrowserRouter` in `main.tsx`

  ```tsx
  import { BrowserRouter } from "react-router-dom";

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
  ```

### 2. Create Page Components ✅

- Create a `pages` directory in your `src` folder
- Create the following page components:
  - `ProductsPage.tsx`: Move your product listing logic here
  - `CartPage.tsx`: Create a new component to display cart items

### 3. Set Up Routes ✅

- In your `App.tsx`, implement routes using React Router:

  ```tsx
  import { Routes, Route } from "react-router-dom";

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
        <Footer />
      </div>
    );
  }
  ```

### 4. Navigation Links ✅

- Update your `Header` component to use `Link` from React Router:

  ```tsx
  import { Link } from "react-router-dom";

  function Header() {
    return (
      <header>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
      </header>
    );
  }
  ```

### 5. Create a Context for Cart State

- Create a `context` directory in your `src` folder
- Create a `CartContext.tsx` file:

  ```tsx
  import { createContext, useContext, useState, ReactNode } from "react";
  import { Product } from "../types/Product";

  // Define the shape of your context
  interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
  }

  // Create the context
  const CartContext = createContext<CartContextType | undefined>(undefined);

  // Create a provider component
  export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
      // Add to cart implementation
    };

    return (
      <CartContext.Provider value={{ cart, addToCart }}>
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
  ```

### 6. Wrap Your App with the Context Provider ✅

- In `main.tsx`, add the `CartProvider` around your `App`:

  ```tsx
  import { CartProvider } from "./context/CartContext";

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
  ```

### 7. Use the Context in Components

- Update the components to use the context instead of props:
  - In `Header.tsx`, get the cart count from context:
    ```tsx
    const { cart } = useCart();
    const cartCount = cart.length;
    ```
  - In `ProductsPage.tsx`, get the `addToCart` function from context:
    ```tsx
    const { addToCart } = useCart();
    ```
  - In `CartPage.tsx`, display items from the cart context:
    ```tsx
    const { cart } = useCart();
    // Render cart items
    ```

## Optional Bonus Ideas

If you finish early or want an extra challenge, try one of these:

### 1. Add a "Remove from Cart" Feature

- Add a `removeFromCart` function to your context
- Add a "Remove" button next to each cart item
- Implement the removal logic

### 2. Style Your Cart Page

- Create a visually appealing cart page with Tailwind CSS
- Add a subtotal calculation at the bottom
- Create empty cart state with a "Continue Shopping" link

### 3. Add Animations

- Add transition animations when navigating between pages
- Animate the cart badge when items are added

## Testing Your Implementation

- Test your implementation by:
  - Navigating between the home page and cart page
  - Adding products to the cart from the home page
  - Verifying that the cart page displays the correct items
  - Checking that the cart count updates across all components

Good luck implementing routing and context in your application!
