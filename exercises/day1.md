# Day 1 Exercise: Building a Product Display Page

## Goal

Apply what you've learned today by building a product display page that shows a list of products using React components, TypeScript, and Tailwind CSS.

## Requirements

### 1. Project Setup ✅

- Initialize a new Vite project with React and TypeScript
- Configure Tailwind CSS
- Create the necessary directory structure (`components`, `types`, etc.)

### 2. Types ✅

- Create a `Product` interface in a `src/types/Product.ts` file with the following properties:
  - `id`: string
  - `name`: string
  - `description`: string
  - `price`: number
  - `imageUrl`: string
  - `category`: string (optional)

### 3. Components ✅

Create the following components:

#### ProductCard Component  ✅

- Create a `ProductCard.tsx` component that:
  - Accepts a `product` prop of type `Product`
  - Displays the product image, name, price, and description
  - Uses Tailwind CSS for styling (cards should look professional)
  - Shows the price formatted to 2 decimal places

#### ProductList Component✅

- Create a `ProductList.tsx` component that:
  - Accepts an array of `products` as a prop
  - Maps through the products array and renders a `ProductCard` for each product
  - Uses a grid layout with responsive columns (1 column on mobile, 2-4 columns on larger screens)
  - Handles the empty state (displays a message when no products exist)

#### Header Component (Optional) ✅

- Create a simple `Header.tsx` component with:
  - The store name/logo
  - A placeholder for a cart icon (we'll implement this later)

### 4. App Component ✅

- In your `App.tsx`:
  - Create mock product data (at least 6 products with different images)
  - Use the `useState` hook to initialize your products state with the mock data
  - Render the Header and ProductList components
  - Properly pass your products state to the ProductList

### 5. Styling ✅

- Use Tailwind CSS for styling
- Your page should be responsive
- Products should be displayed in a visually appealing way
- Include transitions or hover effects for a better user experience

## Optional Bonus Ideas 

If you finish early or want an extra challenge, try one of these simpler bonus tasks:

### 1. Add Hover Effects ✅

- Add hover effects to the product cards (like scaling, shadow change, or color shift)
- You can use Tailwind's transition utilities and group hover features

### 2. Show/Hide Product Description ✅

- Initially show just a truncated description
- Add a "Read more" button that expands to show the full description

### 3. Simple Category Display ✅

- Add a category badge or tag to each product card
- Style it differently based on the category

## Testing Your Implementation

- Run the unit tests in the `test` folder to validate your implementation
- Make sure all tests pass to confirm your components are working correctly

Good luck and have fun building your first React shop page!
