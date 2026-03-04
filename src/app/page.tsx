import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import RestaurantCard from "@/components/RestaurantCard";
import FilterSidebar from "@/components/filters/FilterSidebar";
import TopbarFilters from "@/components/filters/TopbarFilters";
import MobileFiltersModal from "@/components/MobileFiltersModal";
import { getRestaurants, getFilters, getPriceRange, getOpenStatus } from "@/lib/api";
import { filterRestaurants } from "@/utils/filterRestaurants";
import { transformRestaurant } from "@/utils/transformRestaurant";

type PageProps = {
  searchParams: Promise<{
    categories?: string;
    delivery?: string;
    price?: string;
  }>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;

  const [restaurantsData, availableFilters] = await Promise.all([
    getRestaurants(),
    getFilters(),
  ]);

  const priceRangeIds = [
    ...new Set(restaurantsData.map((r) => r.price_range_id).filter(Boolean)),
  ];//Removes duplicates
  const [openStatusResults, priceRangeResults] = await Promise.all([
    Promise.all(restaurantsData.map((r) => getOpenStatus(r.id))),
    Promise.all(priceRangeIds.map((id) => getPriceRange(id))),
  ]);

  const openStatusMap: Record<string, boolean> = {};
  restaurantsData.forEach((r, i) => {
    openStatusMap[r.id] = openStatusResults[i]?.is_open ?? false;
  });

  const priceRangeMap: Record<string, string> = {};
  priceRangeIds.forEach((id, i) => {
    const result = priceRangeResults[i];
    if (result) priceRangeMap[id] = result.range;
  });

  const priceRanges = Object.values(priceRangeMap);

  const restaurants = restaurantsData.map((r) =>
    transformRestaurant(r, openStatusMap[r.id] ?? false, priceRangeMap)
  );

  const selectedCategories = params.categories?.split(",").filter(Boolean) ?? [];
  const selectedDeliveryTimes = params.delivery?.split(",").filter(Boolean) ?? [];
  const selectedPriceRanges = params.price?.split(",").filter(Boolean) ?? [];

  const filteredRestaurants = filterRestaurants(
    restaurants,
    availableFilters,
    selectedCategories,
    selectedDeliveryTimes,
    selectedPriceRanges
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex min-h-screen bg-gray-50 gap-6">
        <div className="hidden lg:block w-64 flex-shrink-0">
          <Suspense fallback={<div className="w-64 m-6 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm" />}>
            <FilterSidebar availableFilters={availableFilters} priceRanges={priceRanges} />
          </Suspense>
        </div>

        <section className="flex-1 min-w-0 p-3 lg:p-6">
          <div className="lg:hidden mb-4">
            <Suspense fallback={null}>
              <MobileFiltersModal availableFilters={availableFilters} priceRanges={priceRanges} />
            </Suspense>
          </div>

          <Suspense
            fallback={
              <div className="overflow-x-auto mb-6">
                <div className="flex gap-4 pb-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-40 h-20 bg-gray-200 rounded-xl animate-pulse" />
                  ))}
                </div>
              </div>
            }
          >
            <TopbarFilters availableFilters={availableFilters} />
          </Suspense>

          <h2 className="text-2xl lg:text-3xl font-semibold mb-4">Restaurants</h2>

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
    </div>
  );
}
