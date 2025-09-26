import { useState, useEffect, useMemo } from "react";
import { useFilters } from "@/hooks/useFilters";
import { getFilters } from "@/lib/api";

type Props = {
  filters: ReturnType<typeof useFilters>["filters"];
  toggleFilter: ReturnType<typeof useFilters>["toggleFilter"];
};

export default function TopbarFilters({ filters, toggleFilter }: Props) {
  const [availableFilters, setAvailableFilters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFilters() {
      try {
        const filtersData = await getFilters();
        setAvailableFilters(filtersData || []);
      } catch (error) {
        console.error("Error fetching filters:", error);
        setAvailableFilters([]);
      } finally {
        setLoading(false);
      }
    }

    fetchFilters();
  }, []);

  const topbarCategories = useMemo(() => {
    if (availableFilters.length > 0) {
      return availableFilters.map((filter) => ({
        label: filter.name,
        icon: `https://work-test-web-2024-eze6j4scpq-lz.a.run.app${filter.image_url}`,
      }));
    } else {
      return [
        { label: "Hamburgers", icon: "/icons/burger.svg" },
        { label: "Pizza", icon: "/icons/pizza.svg" },
        { label: "Taco", icon: "/icons/taco.svg" },
        { label: "Coffee", icon: "/icons/coffee.svg" },
        { label: "Fries", icon: "/icons/fries.svg" },
        { label: "Mexican", icon: "/icons/mexican.svg" },
        { label: "Breakfast", icon: "/icons/breakfast.svg" },
      ];
    }
  }, [availableFilters]);

  if (loading) {
    return (
      <div className="overflow-x-auto mb-6">
        <div className="flex gap-4 pb-2">
          <div className="w-32 h-16 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="w-32 h-16 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="w-32 h-16 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mb-6">
      <div className="flex gap-4 pb-2" style={{ minWidth: 'max-content' }}>
        {topbarCategories.map((item, index) => {
          const isActive = filters.categories.includes(item.label);
          
          return (
            <button
              key={`${item.label}-${index}`}
              onClick={() => toggleFilter("categories", item.label)}
              className={`relative rounded-xl border border-gray-200 shadow-sm flex-shrink-0 ${
                isActive
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-800 border-gray-300 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95"
              }`}
              style={{ width: '160px', height: '80px' }}
            >
              <span className="absolute top-1 left-1 text-sm font-medium">
                {item.label}
              </span>
              <img 
                src={item.icon} 
                className="absolute top-0 -right-2 w-20 h-20" 
                alt={item.label}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}