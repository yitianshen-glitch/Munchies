import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RestaurantCard from "@/components/RestaurantCard";
import type { Restaurant } from "@/types/restaurant";

const base: Restaurant = {
  id: "1",
  name: "Pizza Palace",
  status: "open",
  deliveryTime: "10-30 min",
  image: "/pizza.jpg",
  priceRange: "$$",
  rating: 4.5,
  filterIds: [],
};

describe("RestaurantCard", () => {
  it("renders the restaurant name", () => {
    render(<RestaurantCard restaurant={base} />);
    expect(screen.getByText("Pizza Palace")).toBeInTheDocument();
  });

  it("shows Open badge when status is open", () => {
    render(<RestaurantCard restaurant={base} />);
    expect(screen.getByText("Open")).toBeInTheDocument();
  });

  it("shows Closed badge when status is closed", () => {
    render(<RestaurantCard restaurant={{ ...base, status: "closed" }} />);
    expect(screen.getByText("Closed")).toBeInTheDocument();
  });

  it("renders the delivery time", () => {
    render(<RestaurantCard restaurant={base} />);
    expect(screen.getByText("10-30 min")).toBeInTheDocument();
  });

  it("card links to the restaurant detail page", () => {
    render(<RestaurantCard restaurant={base} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/restaurants/1");
  });

  it("arrow indicator is green when open and gray when closed", () => {
    const { rerender } = render(<RestaurantCard restaurant={base} />);
    expect(screen.getByText("→").className).toContain("bg-[#00703A]");
    rerender(<RestaurantCard restaurant={{ ...base, status: "closed" }} />);
    expect(screen.getByText("→").className).toContain("bg-gray-300");
  });

});
