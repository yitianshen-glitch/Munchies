import { describe, it, expect } from "vitest";
import { filterRestaurants } from "@/utils/filterRestaurants";
import type { Restaurant } from "@/types/restaurant";
import type { ApiFilter } from "@/lib/api";

const availableFilters: ApiFilter[] = [
  { id: "filter-pizza", name: "Pizza", image_url: "/pizza.png" },
  { id: "filter-burger", name: "Hamburger", image_url: "/burger.png" },
  { id: "filter-coffee", name: "Coffee", image_url: "/coffee.png" },
];

const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Pizza Palace",
    status: "open",
    filterIds: ["filter-pizza"],
    deliveryTime: "10-30 min",
    image: "/pizza.jpg",
    priceRange: "$$",
    rating: 4.5,
  },
  {
    id: "2",
    name: "Burger Joint",
    status: "open",
    filterIds: ["filter-burger"],
    deliveryTime: "0-10 min",
    image: "/burger.jpg",
    priceRange: "$",
    rating: 4.0,
  },
  {
    id: "3",
    name: "Coffee Corner",
    status: "closed",
    filterIds: ["filter-coffee"],
    deliveryTime: "30-60 min",
    image: "/coffee.jpg",
    priceRange: "$$$",
    rating: 4.8,
  },
  {
    id: "4",
    name: "Quick Slice",
    status: "open",
    filterIds: ["filter-pizza"],
    deliveryTime: "0-10 min",
    image: "/pizza2.jpg",
    priceRange: "$",
    rating: 3.9,
  },
];

// --- tests ---

describe("filterRestaurants", () => {
  describe("no filters selected", () => {
    it("returns all restaurants when no filters are selected", () => {
      const result = filterRestaurants(restaurants, availableFilters, [], [], []);
      expect(result).toHaveLength(4);
    });
  });

  describe("category filter", () => {
    it("returns only Pizza restaurants when Pizza is selected", () => {
      const result = filterRestaurants(restaurants, availableFilters, ["Pizza"], [], []);
      expect(result).toHaveLength(2);
      expect(result.every((r) => r.filterIds?.includes("filter-pizza"))).toBe(true);
    });

    it("returns matching restaurants by filterIds when category matches by ID", () => {
      const result = filterRestaurants(restaurants, availableFilters, ["Coffee"], [], []);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Coffee Corner");
    });

    it("returns restaurants matching any of multiple categories (OR logic)", () => {
      const result = filterRestaurants(
        restaurants,
        availableFilters,
        ["Pizza", "Coffee"],
        [],
        []
      );
      expect(result).toHaveLength(3);
      expect(result.map((r) => r.name)).toContain("Pizza Palace");
      expect(result.map((r) => r.name)).toContain("Quick Slice");
      expect(result.map((r) => r.name)).toContain("Coffee Corner");
    });

    it("returns empty array when no restaurants match the category", () => {
      const result = filterRestaurants(restaurants, availableFilters, ["Tacos"], [], []);
      expect(result).toHaveLength(0);
    });
  });

  describe("delivery time filter", () => {
    it("returns only fast-delivery restaurants when '0-10 min' is selected", () => {
      const result = filterRestaurants(restaurants, availableFilters, [], ["0-10 min"], []);
      expect(result).toHaveLength(2);
      expect(result.every((r) => r.deliveryTime === "0-10 min")).toBe(true);
    });

    it("returns restaurants matching any of multiple delivery times (OR logic)", () => {
      const result = filterRestaurants(
        restaurants,
        availableFilters,
        [],
        ["0-10 min", "10-30 min"],
        []
      );
      expect(result).toHaveLength(3);
    });
  });

  describe("price range filter", () => {
    it("returns only $ restaurants when $ is selected", () => {
      const result = filterRestaurants(restaurants, availableFilters, [], [], ["$"]);
      expect(result).toHaveLength(2);
      expect(result.every((r) => r.priceRange === "$")).toBe(true);
    });
  });

  describe("combined filters (AND across types)", () => {
    it("applies AND logic across different filter types", () => {
      const result = filterRestaurants(
        restaurants,
        availableFilters,
        ["Pizza"],
        ["0-10 min"],
        []
      );
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Quick Slice");
    });

    it("returns empty when no restaurant satisfies all filter types", () => {
      const result = filterRestaurants(
        restaurants,
        availableFilters,
        ["Coffee"],
        ["0-10 min"],
        []
      );
      expect(result).toHaveLength(0);
    });

    it("combines all three filter types correctly", () => {
      const result = filterRestaurants(
        restaurants,
        availableFilters,
        ["Pizza"],
        ["0-10 min"],
        ["$"]
      );
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Quick Slice");
    });
  });
});
