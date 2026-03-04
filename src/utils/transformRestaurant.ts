import { ApiRestaurant, API_IMG_BASE } from "@/lib/api";
import { Restaurant } from "@/types/restaurant";
import { getDeliveryTimeRange } from "@/utils/format";

export function transformRestaurant(
  r: ApiRestaurant,
  isOpen: boolean,
  priceRangeMap: Record<string, string>
): Restaurant {
  return {
    id: r.id,
    name: r.name,
    status: isOpen ? "open" : "closed",
    filterIds: r.filter_ids ?? [],
    deliveryTime: getDeliveryTimeRange(r.delivery_time_minutes),
    image: `${API_IMG_BASE}${r.image_url}`,
    priceRange: priceRangeMap[r.price_range_id],
    rating: r.rating,
  };
}
