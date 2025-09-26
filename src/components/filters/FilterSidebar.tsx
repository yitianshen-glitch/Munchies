import { useState, useEffect } from "react";
import { useFilters } from "@/hooks/useFilters";
import { getFilters } from "@/lib/api";

type Props = {
  filters: ReturnType<typeof useFilters>["filters"];
  toggleFilter: ReturnType<typeof useFilters>["toggleFilter"];
};

export default function FilterSidebar({ filters, toggleFilter }: Props) {
  const [availableFilters, setAvailableFilters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFilters() {
      try {
        const filtersData = await getFilters();
        console.log("API filters:", filtersData);
        setAvailableFilters(filtersData);
      } catch (error) {
        console.error("Error fetching filters:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFilters();
  }, []);

  const categories = availableFilters.length > 0 
    ? availableFilters.map(f => f.name)
    : ["Hamburger", "Pizza", "Taco's", "Coffee", "Fries", "Mexican", "Breakfast"];
  
  const deliveryTimes = ["0-10 min", "10-30 min", "30-60 min", "1 hour+"];
  const priceRanges = ["$", "$$", "$$$", "$$$$"];

  return (
    <aside className="w-64 m-6 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">
        Filter 
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading filters...</p>
      ) : (
        <>
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">
              FOOD CATEGORY
            </h3>
            <div className="flex flex-col items-start gap-2 space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleFilter("categories", cat)}
                  className={`rounded-lg border px-3 py-1 border border-gray-200 shadow-sm flex-shrink-0 hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95 ${
                    filters.categories.includes(cat)
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">
              DELIVERY TIME
            </h3>
            <div className="flex flex-wrap gap-2">
              {deliveryTimes.map((dt) => (
                <button
                  key={dt}
                  onClick={() => toggleFilter("deliveryTimes", dt)}
                  className={`rounded-lg border px-3 py-1 border border-gray-200 shadow-sm flex-shrink-0 hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95 ${
                    filters.deliveryTimes.includes(dt)
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {dt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-2">
              PRICE RANGE
            </h3>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((p) => (
                <button
                  key={p}
                  onClick={() => toggleFilter("priceRanges", p)}
                  className={`rounded-lg border px-3 py-1 border border-gray-200 shadow-sm flex-shrink-0 hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95 ${
                    filters.priceRanges.includes(p)
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </aside>
  );
}