const API_BASE_URL = "https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api";
export const API_IMG_BASE = "https://work-test-web-2024-eze6j4scpq-lz.a.run.app";

export interface ApiRestaurant {
  id: string;
  name: string;
  rating: number;
  filter_ids: string[];
  image_url: string;
  delivery_time_minutes: number;
  price_range_id: string;
}

export interface ApiFilter {
  id: string;
  name: string;
  image_url: string;
}

export interface RestaurantsResponse {
  restaurants: ApiRestaurant[];
}

export interface OpenStatus {
  restaurant_id: string;
  is_currently_open: boolean;
}

export interface PriceRange {
  id: string;
  range: string;
}

export async function getRestaurants(): Promise<ApiRestaurant[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/restaurants`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data: RestaurantsResponse = await response.json();
    return data.restaurants;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
}

export async function getFilters(): Promise<ApiFilter[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/filter`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return Array.isArray(data.filters) ? data.filters : [];
  } catch (error) {
    console.error("Error fetching filters:", error);
    return [];
  }
}

export async function getOpenStatus(id: string): Promise<OpenStatus | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/open/${id}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching open status:", error);
    return null;
  }
}

export async function getPriceRange(id: string): Promise<PriceRange | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/price-range/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching price range:", error);
    return null;
  }
}

export async function getRestaurant(id: string): Promise<ApiRestaurant | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/restaurants/${id}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.restaurant ?? data;
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return null;
  }
}

export async function getFilter(id: string): Promise<ApiFilter | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/filter/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.filter ?? data;
  } catch (error) {
    console.error("Error fetching filter:", error);
    return null;
  }
}
