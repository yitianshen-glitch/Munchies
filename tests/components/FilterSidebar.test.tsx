import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ApiFilter } from "@/lib/api";

const mockPush = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/",
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

import { useSearchParams } from "next/navigation";
import FilterSidebar from "@/components/filters/FilterSidebar";

const mockFilters: ApiFilter[] = [
  { id: "1", name: "Pizza", image_url: "/pizza.png" },
  { id: "2", name: "Hamburger", image_url: "/burger.png" },
  { id: "3", name: "Coffee", image_url: "/coffee.png" },
];

describe("FilterSidebar", () => {
  beforeEach(() => {
    mockPush.mockClear();
    vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as never);
  });

  describe("rendering", () => {
    it("renders all food category buttons from props", () => {
      render(<FilterSidebar availableFilters={mockFilters} />);
      expect(screen.getByRole("button", { name: "Pizza" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Hamburger" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Coffee" })).toBeInTheDocument();
    });

    it("renders all delivery time options", () => {
      render(<FilterSidebar availableFilters={mockFilters} />);
      expect(screen.getByRole("button", { name: "0-10 min" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "10-30 min" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "30-60 min" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "1 hour+" })).toBeInTheDocument();
    });

    it("renders all price range options", () => {
      render(<FilterSidebar availableFilters={mockFilters} />);
      expect(screen.getByRole("button", { name: "$" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "$$" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "$$$" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "$$$$" })).toBeInTheDocument();
    });

    it("renders empty category list when no filters passed", () => {
      render(<FilterSidebar availableFilters={[]} />);
      expect(screen.queryByRole("button", { name: "Pizza" })).not.toBeInTheDocument();
    });
  });

  describe("active state", () => {
    it("applies active styling to a selected category", () => {
      vi.mocked(useSearchParams).mockReturnValue(
        new URLSearchParams("categories=Pizza") as never
      );
      render(<FilterSidebar availableFilters={mockFilters} />);
      expect(screen.getByRole("button", { name: "Pizza" })).toHaveClass("bg-black");
    });

    it("does not apply active styling to unselected categories", () => {
      vi.mocked(useSearchParams).mockReturnValue(
        new URLSearchParams("categories=Pizza") as never
      );
      render(<FilterSidebar availableFilters={mockFilters} />);
      expect(screen.getByRole("button", { name: "Hamburger" })).not.toHaveClass("bg-black");
    });

    it("applies active styling to a selected delivery time", () => {
      vi.mocked(useSearchParams).mockReturnValue(
        new URLSearchParams("delivery=0-10+min") as never
      );
      render(<FilterSidebar availableFilters={mockFilters} />);
      expect(screen.getByRole("button", { name: "0-10 min" })).toHaveClass("bg-black");
    });

    it("applies active styling to a selected price range", () => {
      vi.mocked(useSearchParams).mockReturnValue(
        new URLSearchParams("price=$$") as never
      );
      render(<FilterSidebar availableFilters={mockFilters} />);
      expect(screen.getByRole("button", { name: "$$" })).toHaveClass("bg-black");
    });
  });

  describe("interactions", () => {
    it("calls router.push with category param when clicking a category", async () => {
      const user = userEvent.setup();
      render(<FilterSidebar availableFilters={mockFilters} />);
      await user.click(screen.getByRole("button", { name: "Pizza" }));
      expect(mockPush).toHaveBeenCalledWith("/?categories=Pizza");
    });

    it("calls router.push with delivery param when clicking a delivery time", async () => {
      const user = userEvent.setup();
      render(<FilterSidebar availableFilters={mockFilters} />);
      await user.click(screen.getByRole("button", { name: "0-10 min" }));
      expect(mockPush).toHaveBeenCalledWith("/?delivery=0-10+min");
    });

    it("calls router.push with price param when clicking a price range", async () => {
      const user = userEvent.setup();
      render(<FilterSidebar availableFilters={mockFilters} />);
      await user.click(screen.getByRole("button", { name: "$$" }));
      expect(mockPush).toHaveBeenCalledWith("/?price=%24%24");
    });

    it("removes a filter from the URL when clicking an already active filter", async () => {
      vi.mocked(useSearchParams).mockReturnValue(
        new URLSearchParams("categories=Pizza") as never
      );
      const user = userEvent.setup();
      render(<FilterSidebar availableFilters={mockFilters} />);
      await user.click(screen.getByRole("button", { name: "Pizza" }));
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});
