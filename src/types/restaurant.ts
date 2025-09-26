export type Restaurant = {
  id: string;
  name: string;
  status: "open" | "closed";
  deliveryTime: string; 
  reopen?: string;
  image: string;
  category?: string;
  priceRange?: string;
  rating: number;
};

export function transformApiRestaurant(
  apiRestaurant: import("@/lib/api").ApiRestaurant,
  openStatus?: import("@/lib/api").OpenStatus,
  filters?: import("@/lib/api").ApiFilter[]
): Restaurant {
  return {
    id: apiRestaurant.id,
    name: apiRestaurant.name,
    status: openStatus?.is_currently_open ? "open" : "closed",
    deliveryTime: `${apiRestaurant.delivery_time_minutes} min`,
    image: apiRestaurant.image_url,
    rating: apiRestaurant.rating,
    category: filters?.find(f => apiRestaurant.filterIds.includes(f.id))?.name,
  };
}