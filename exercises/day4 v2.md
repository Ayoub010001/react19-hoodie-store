# Day 4 Exercise: Routing, Context API, State manager

## Goal

Implement client-side routing to create separate views for your products and shopping cart. Use the Context API to manage global state and avoid prop drilling. As an advanced challenge, implement Redux Toolkit for more robust state management.

## Requirements

### 1. Setup Routing

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

### 2. Create Page Components

- Create a `pages` directory in your `src` folder
- Create the following page components:
  - `ProductsPage.tsx`: Move your product listing logic here
  - `CartPage.tsx`: Create a new component to display cart items

### 3. Set Up Routes

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

### 4. Navigation Links

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

### 6. Wrap Your App with the Context Provider

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

### 4. Implement Redux Toolkit

For an advanced challenge, replace Context API with Redux Toolkit:

- Install Redux Toolkit and React-Redux:

  ```bash
  npm install @reduxjs/toolkit react-redux
  ```

- Create a store directory structure:

  ```
  src/
  └── store/
      ├── index.ts
      ├── hooks.ts
      └── cartSlice.ts
  ```

- Implement the cart slice (`src/store/cartSlice.ts`):

  ```tsx
  import { createSlice, PayloadAction } from "@reduxjs/toolkit";
  import { Product } from "../types/Product";

  interface CartState {
    items: Product[];
  }

  const initialState: CartState = {
    items: [],
  };

  export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      addToCart: (state, action: PayloadAction<Product>) => {
        const existingItem = state.items.find(
          (item) => item.id === action.payload.id
        );
        if (!existingItem) {
          state.items.push(action.payload);
        }
      },
      removeFromCart: (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      },
      clearCart: (state) => {
        state.items = [];
      },
    },
  });

  export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

  export const selectCartItems = (state: { cart: CartState }) =>
    state.cart.items;
  export const selectCartTotal = (state: { cart: CartState }) =>
    state.cart.items.reduce((total, item) => total + item.price, 0);
  export const selectCartItemCount = (state: { cart: CartState }) =>
    state.cart.items.length;

  export default cartSlice.reducer;
  ```

- Set up the Redux store (`src/store/index.ts`):

  ```tsx
  import { configureStore } from "@reduxjs/toolkit";
  import cartReducer from "./cartSlice";

  export const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  ```

- Create typed hooks (`src/store/hooks.ts`):

  ```tsx
  import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
  import type { RootState, AppDispatch } from "./index";

  export const useAppDispatch = () => useDispatch<AppDispatch>();
  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  ```

- Replace the Context Provider with Redux Provider in `main.tsx`:

  ```tsx
  import { Provider as ReduxProvider } from "react-redux";
  import { store } from "./store";

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <BrowserRouter>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
  ```

- Update your components to use Redux:

  - In `Header.tsx`:

    ```tsx
    import { useAppSelector } from "../store/hooks";
    import { selectCartItemCount } from "../store/cartSlice";

    function Header() {
      const cartCount = useAppSelector(selectCartItemCount);
      // Rest of your component
    }
    ```

  - In `ProductsPage.tsx`:

    ```tsx
    import { useAppDispatch } from "../store/hooks";
    import { addToCart } from "../store/cartSlice";

    const ProductsPage = () => {
      const dispatch = useAppDispatch();

      const handleAddToCart = (product: Product) => {
        dispatch(addToCart(product));
      };
      // Rest of your component
    };
    ```

  - In `CartPage.tsx`:

    ```tsx
    import { useAppSelector, useAppDispatch } from "../store/hooks";
    import {
      selectCartItems,
      selectCartTotal,
      removeFromCart,
    } from "../store/cartSlice";

    const CartPage = () => {
      const cart = useAppSelector(selectCartItems);
      const total = useAppSelector(selectCartTotal);
      const dispatch = useAppDispatch();

      const handleRemoveFromCart = (id: string) => {
        dispatch(removeFromCart(id));
      };
      // Rest of your component
    };
    ```

## Testing Your Implementation

- Test your implementation by:
  - Navigating between the home page and cart page
  - Adding products to the cart from the home page
  - Verifying that the cart page displays the correct items
  - Checking that the cart count updates across all components

Good luck implementing routing and context in your application!