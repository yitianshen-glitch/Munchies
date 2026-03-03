"use client";

import { useFilters } from "@/hooks/useFilters";
import { ApiFilter, API_IMG_BASE } from "@/lib/api";

type Props = {
  availableFilters: ApiFilter[];
};

export default function TopbarFilters({ availableFilters }: Props) {
  const { filters, toggleFilter } = useFilters();

  return (
    <div className="overflow-x-auto mb-6">
      <div className="flex gap-4 pb-2" style={{ minWidth: "max-content" }}>
        {availableFilters.map((filter) => {
          const isActive = filters.categories.includes(filter.name);
          return (
            <button
              key={filter.id}
              onClick={() => toggleFilter("categories", filter.name)}
              className={`relative rounded-xl border border-gray-200 shadow-sm flex-shrink-0 ${
                isActive
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-800 border-gray-300 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95"
              }`}
              style={{ width: "160px", height: "80px" }}
            >
              <span className="absolute top-1 left-1 text-sm font-medium">
                {filter.name}
              </span>
              <img
                src={`${API_IMG_BASE}${filter.image_url}`}
                className="absolute top-0 -right-2 w-20 h-20"
                alt={filter.name}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
