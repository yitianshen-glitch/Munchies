export type Restaurant = {
  id: string;
  name: string;
  status: "open" | "closed";
  deliveryTime: string;
  image: string;
  priceRange?: string;
  rating: number;
  filterIds: string[];
};
