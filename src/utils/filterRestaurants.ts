import type { Restaurant } from "@/types/restaurant";
import type { ApiFilter } from "@/lib/api";

export function filterRestaurants(
  restaurants: Restaurant[],
  availableFilters: ApiFilter[],
  selectedCategories: string[],
  selectedDeliveryTimes: string[],
  selectedPriceRanges: string[]
): Restaurant[] {
  return restaurants.filter((r) => {
    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some((cat) => {
        const filterObj = availableFilters.find((f) => f.name === cat);
        return filterObj ? r.filterIds?.includes(filterObj.id) : false;
      });

    const matchDelivery =
      selectedDeliveryTimes.length === 0 ||
      selectedDeliveryTimes.includes(r.deliveryTime);

    const matchPrice =
      selectedPriceRanges.length === 0 ||
      selectedPriceRanges.includes(r.priceRange ?? "");

    return matchCategory && matchDelivery && matchPrice;
  });
}
