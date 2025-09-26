const API_BASE_URL = "https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api";

export interface ApiRestaurant {
  id: string;
  name: string;
  rating: number;
  filterIds: string[];
  image_url: string;
  delivery_time_minutes: number;
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
    const response = await fetch(`${API_BASE_URL}/restaurants`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: RestaurantsResponse = await response.json();
    return data.restaurants;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
}

export async function getFilters(): Promise<ApiFilter[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/filter`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    console.log("🔍 getFilters raw response:", data);
    
    // API returns { filters: [...] }, not direct array
    if (data && Array.isArray(data.filters)) {
      return data.filters;
    } else {
      console.warn("🔍 Unexpected filter API response format:", data);
      return [];
    }
    
  } catch (error) {
    console.error("Error fetching filters:", error);
    return [];
  }
}

export async function getRestaurant(id: string): Promise<ApiRestaurant | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/restaurants/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiRestaurant = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return null;
  }
}

export async function getOpenStatus(id: string): Promise<OpenStatus | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/open/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: OpenStatus = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching open status:", error);
    return null;
  }
}

export async function getPriceRange(id: string): Promise<PriceRange | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/price-range/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: PriceRange = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching price range:", error);
    return null;
  }
}