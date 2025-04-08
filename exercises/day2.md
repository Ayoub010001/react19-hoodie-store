# Day 2 Exercise: Adding Interactivity & Cart Functionality

## Goal

Enhance your product display page by adding interactivity with state management. Implement a shopping cart feature that allows users to add products to their cart and see the cart count update.

## Requirements

### 1. Cart State ✅

- In your `App.tsx` file, add state for the shopping cart using the `useState` hook:
  ```tsx
  const [cart, setCart] = useState<Product[]>([]);
  ```
- Implement a `handleAddToCart` function in `App.tsx` that:
  - Takes a product as a parameter
  - Adds the product to the cart state
  - Prevents duplicate products (check if product already exists in cart by ID)
  - Uses proper immutable state updates

### 2. Add to Cart Button ✅

- Update your `ProductCard.tsx` component to:
  - Accept a new prop `onAddToCart` with type `(product: Product) => void`
  - Add an "Add to Cart" button with appropriate styling
  - Call the `onAddToCart` prop when the button is clicked, passing the current product

### 3. Pass Props Down ✅

- Update your `ProductList.tsx` component to:
  - Accept the `onAddToCart` prop
  - Pass it down to each `ProductCard` component
- In `App.tsx`, pass the `handleAddToCart` function to the `ProductList` component

### 4. Header Component ✅

- Create (or update) a `Header.tsx` component that:
  - Accepts a `cartCount` prop with the number of items in the cart
  - Displays the store name/logo
  - Shows the cart count prominently (e.g., "Cart (3)")
  - Uses appropriate styling
- In `App.tsx`, calculate the `cartCount` and pass it to the `Header` component

### 5. User Feedback ✅

- Add visual feedback when a product is added to the cart
- Show a message if a product is already in the cart

## Optional Bonus Ideas

If you finish early or want an extra challenge, try one of these:

### 1. Button Styling ✅

- Add a disable state to the "Add to Cart" button for items already in the cart
- Change the button color or text for items in cart (e.g., "Added to Cart")
- Add a subtle animation when the button is clicked ❌

### 2. Cart Badge ✅

- Add a small badge to the cart icon in the header showing the number of items
- Style it as a small circle with a contrasting color

### 3. Cart Item Quantity ✅

- Instead of preventing duplicates, update your cart state to handle quantities
- Define a new type `CartItem` that extends `Product` with a `quantity` property
- Increment the quantity when adding the same product multiple times
- Update the cart count to show the total quantity, not just the number of unique items

## Testing Your Implementation ✅

- Test your implementation by:
  - Adding various products to your cart
  - Trying to add the same product twice
  - Verifying that the cart count updates correctly
  - Checking that the UI provides appropriate feedback

Good luck implementing your shopping cart functionality!
