"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import RestaurantCard from "@/components/RestaurantCard";
import FilterSidebar from "@/components/filters/FilterSidebar";
import TopbarFilters from "@/components/filters/TopbarFilters";
import { useFilters } from "@/hooks/useFilters";
import { getRestaurants, getFilters } from "@/lib/api";

function getCategoryFromFilterIds(filterIds: string[], availableFilters: any[]) {
  if (!filterIds || !availableFilters || filterIds.length === 0) return "Unknown";
  
  const matchingFilter = availableFilters.find(filter => 
    filterIds.includes(filter.id)
  );
  
  return matchingFilter ? matchingFilter.name : "Unknown";
}

function getDeliveryTimeRange(minutes: number): string {
  if (minutes <= 10) return "0-10 min";
  if (minutes <= 30) return "10-30 min";
  if (minutes <= 60) return "30-60 min";
  return "1 hour+";
}

function getPriceRangeFromId(priceRangeId: string): string {
  const ranges = ["$", "$$", "$$$", "$$$$"];
  return ranges[Math.floor(Math.random() * ranges.length)];
}

function transformRestaurant(apiRestaurant: any, isOpen: boolean = true, availableFilters: any[] = []) {

  const category = getCategoryFromFilterIds(apiRestaurant.filter_ids, availableFilters);
  return {
    id: apiRestaurant.id,
    name: apiRestaurant.name,
    status: isOpen ? "open" as const : "closed" as const,
    category: getCategoryFromFilterIds(apiRestaurant.filter_ids, availableFilters),
    filterIds: apiRestaurant.filter_ids, 
    deliveryTime: getDeliveryTimeRange(apiRestaurant.delivery_time_minutes),
    image: `https://work-test-web-2024-eze6j4scpq-lz.a.run.app${apiRestaurant.image_url}`,
    priceRange: getPriceRangeFromId(apiRestaurant.price_range_id),
    reopen: !isOpen ? "Opens tomorrow at 12 pm" : undefined,
  };
}

export default function HomePage() {
  const { filters, toggleFilter } = useFilters();
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [filtersData, setFiltersData] = useState<any[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        const filtersData = await getFilters();
        const restaurantsData = await getRestaurants();
        setFiltersData(filtersData); 
        
        const transformedRestaurants = restaurantsData.map((restaurant: any) => 
          transformRestaurant(restaurant, Math.random() > 0.3, filtersData)
        );
        
        setRestaurants(transformedRestaurants);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load restaurants");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredRestaurants = useMemo(() => {
  if (restaurants.length === 0) return [];
  
  return restaurants.filter((r) => {
    const matchCategory =
      filters.categories.length === 0 ||
      //filters.categories.includes(r.category);
      filters.categories.some(filterCategory => {
        const matchesCategory = r.category === filterCategory;
        const filterObj = filtersData.find(f => f.name === filterCategory);
        const matchesFilterId = filterObj && r.filterIds && r.filterIds.includes(filterObj.id);
        if (r.name === "Davids Deli" && filterCategory === "Fries") {
          console.log(`Davids Deli: matchesCategory=${matchesCategory}, matchesFilterId=${matchesFilterId}`);
        }
        
        return matchesCategory || matchesFilterId;
      });

    const matchDelivery =
      filters.deliveryTimes.length === 0 ||
      (r.deliveryTime && filters.deliveryTimes.includes(r.deliveryTime));

    const matchPrice =
      filters.priceRanges.length === 0 ||
      filters.priceRanges.includes(r.priceRange);

    return matchCategory && matchDelivery && matchPrice;
  }); 
  }, [filters, restaurants, filtersData]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex min-h-screen bg-gray-50 gap-6">
          <div className="w-64 flex-shrink-0 m-6 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Filter</h2>
            <p className="text-gray-500">Loading filters...</p>
          </div>
          <section className="flex-1 min-w-0 p-6">
            <div className="overflow-x-auto mb-6">
              <div className="flex gap-4 pb-2">
                <div className="w-32 h-16 bg-gray-200 rounded-xl animate-pulse"></div>
                <div className="w-32 h-16 bg-gray-200 rounded-xl animate-pulse"></div>
                <div className="w-32 h-16 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            </div>
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">Loading restaurants...</p>
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex min-h-screen bg-gray-50 gap-6">
          <div className="w-64 flex-shrink-0 m-6 p-6 bg-white rounded-2xl border border-red-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Filter</h2>
            <p className="text-red-500">Error loading filters</p>
          </div>
          <section className="flex-1 min-w-0 p-6">
            <div className="flex items-center justify-center h-64">
              <p className="text-red-500">{error}</p>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex min-h-screen bg-gray-50 gap-6">
      <div className="hidden lg:block w-64 flex-shrink-0">
        <FilterSidebar filters={filters} toggleFilter={toggleFilter} />
      </div>

      <section className="flex-1 min-w-0 p-3 lg:p-6">
        <div className="lg:hidden mb-4">
          <button 
            onClick={() => setShowMobileFilters(true)}
            className="w-full bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-between shadow-sm"
          >
            <span className="font-medium">Filters</span>
            <span className="text-gray-500">▼</span>
          </button>
        </div>

        <TopbarFilters filters={filters} toggleFilter={toggleFilter} />

        <h2 className="text-2xl lg:text-3xl font-semibold mb-4">Restaurant's</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((res) => (
              <RestaurantCard key={res.id} restaurant={res} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500 text-lg">No restaurants match the filters.</p>
              <p className="text-gray-400 text-sm mt-2">
                Try removing some filters to see more results.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>

    {showMobileFilters && (
      <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex items-center justify-between shadow-sm z-10">
            <h3 className="text-lg font-semibold">Filters</h3>
            <button 
              onClick={() => setShowMobileFilters(false)}
              className="text-gray-500 text-xl p-1 hover:bg-gray-100 rounded-full"
            >
              ✕
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <FilterSidebar filters={filters} toggleFilter={toggleFilter} />
          </div>
        </div>
      </div>
    )}
  </div>
);

}