# Day 3 Exercise: Fetching Data & Managing Effects

## Goal

Refactor your application to use the `useEffect` hook for data fetching. Implement proper loading and error states to enhance the user experience.

## Requirements

### 1. Data Fetching with useEffect ✅

- Refactor your `App.tsx` (or `ProductsPage.tsx` if you created it) to fetch products using the `useEffect` hook:
  ```tsx
  useEffect(() => {
    // Fetching logic here
  }, []); // Empty dependency array for mounting only
  ```
- Inside the `useEffect`, create an asynchronous function to fetch products from the API
- Call the API using the `fetch` API and handle the response
- Use proper error handling with try/catch

### 2. Loading State ✅

- Add a loading state to your component:
  ```tsx
  const [isLoading, setIsLoading] = useState(true);
  ```
- Set `isLoading` to `true` before the fetch request begins
- Set `isLoading` to `false` when the fetch request completes (whether successful or not)
- Add a loading indicator or message that displays when `isLoading` is true:
  ```tsx
  {
    isLoading && <div className="loading-spinner">Loading...</div>;
  }
  ```
- Only render the products when loading is complete

### 3. Error Handling ✅

- Add an error state to your component:
  ```tsx
  const [error, setError] = useState<string | null>(null);
  ```
- Set `error` to `null` before each fetch request begins
- Set `error` to an appropriate error message if the fetch fails
- Display an error message when `error` is not null:
  ```tsx
  {
    error && <div className="error-message">Error: {error}</div>;
  }
  ```
- Make sure both the try and catch blocks set `isLoading` to `false` (use a finally block)

### 4. Conditional Rendering ✅

- Use conditional rendering to show different UI states:
  - Show a loading indicator when `isLoading` is true
  - Show an error message when `error` is not null
  - Show the product list when neither loading nor error

### 5. Clean API Integration ✅

- Ensure your fetch URL matches your backend (e.g., `http://localhost:3001/products`)
- Check that the response is OK (`response.ok`) before processing it
- Use proper TypeScript typing for the API response (cast to `Product[]`)

## Optional Bonus Ideas

If you finish early or want an extra challenge, try one of these:

### 1. Custom Hook

- Create a reusable `useFetch` hook that encapsulates the fetching logic:

  ```tsx
  function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // useEffect implementation...

    return { data, isLoading, error };
  }
  ```

- Implement the hook in your component: `const { data: products, isLoading, error } = useFetch<Product[]>('/api/products');`

### 2. Retry Mechanism

- Add a "Retry" button that appears when there's an error
- Implement a function to retry the fetch operation when the button is clicked

### 3. Prettier Loading/Error UI

- Create a more visually appealing loading spinner using CSS or a library
- Style the error message with appropriate colors and icons
- Add animations to smooth the transition between loading and content

## Testing Your Implementation

- Test your implementation by:
  - Refreshing the page to see the loading state
  - Temporarily changing the API URL to an invalid one to see the error state
  - Checking that products display correctly when the API responds successfully
  - Verifying that all state transitions happen smoothly

Good luck implementing data fetching with useEffect!
