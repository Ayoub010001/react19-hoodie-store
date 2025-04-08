import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductList from "../components/ProductList.tsx";
import { Product } from "../types/Product";

describe("ProductList Component", () => {
  // Mock product data
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Product 1",
      description: "Description 1",
      price: 19.99,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      name: "Product 2",
      description: "Description 2",
      price: 29.99,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "3",
      name: "Product 3",
      description: "Description 3",
      price: 39.99,
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  // Mock function for onAddToCart prop
  const mockOnAddToCart = vi.fn();

  it("renders a list of products correctly", () => {
    render(
      <ProductList products={mockProducts} onAddToCart={mockOnAddToCart} />
    );

    // Check if all product names are rendered
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Product 3")).toBeInTheDocument();

    // Check if all prices are rendered
    expect(screen.getByText("$19.99")).toBeInTheDocument();
    expect(screen.getByText("$29.99")).toBeInTheDocument();
    expect(screen.getByText("$39.99")).toBeInTheDocument();

    // Check if all images are rendered
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3);
  });

  it("displays a message when no products are available", () => {
    render(<ProductList products={[]} onAddToCart={mockOnAddToCart} />);

    // Check if empty state message is displayed
    expect(screen.getByText(/no products found/i)).toBeInTheDocument();
  });

  it("renders a grid layout for products", () => {
    render(
      <ProductList products={mockProducts} onAddToCart={mockOnAddToCart} />
    );

    // Check if the container has the appropriate grid classes
    const container = screen.getByTestId("product-list-container");
    expect(container).toHaveClass("grid");

    // Check if we have the correct number of product cards
    const productCards = container.children;
    expect(productCards.length).toBe(3);
  });
});
