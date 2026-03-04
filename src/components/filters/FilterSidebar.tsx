"use client";

import { useFilters } from "@/hooks/useFilters";
import { ApiFilter } from "@/lib/api";
import { DELIVERY_TIMES } from "@/utils/format";

type Props = {
  availableFilters: ApiFilter[];
  priceRanges: string[];
};

export default function FilterSidebar({ availableFilters, priceRanges }: Props) {
  const { filters, toggleFilter } = useFilters();

  return (
    <aside className="w-64 m-6 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Filter</h2>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">FOOD CATEGORY</h3>
        <div className="flex flex-col items-start gap-2 space-y-2">
          {availableFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => toggleFilter("categories", filter.name)}
              className={`rounded-lg border px-3 py-1 border border-gray-200 shadow-sm flex-shrink-0 hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95 ${
                filters.categories.includes(filter.name)
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">DELIVERY TIME</h3>
        <div className="flex flex-wrap gap-2">
          {DELIVERY_TIMES.map((dt) => (
            <button
              key={dt}
              onClick={() => toggleFilter("delivery", dt)}
              className={`rounded-lg border px-3 py-1 border border-gray-200 shadow-sm flex-shrink-0 hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95 ${
                filters.delivery.includes(dt)
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
        <h3 className="text-sm font-semibold text-gray-400 mb-2">PRICE RANGE</h3>
        <div className="flex flex-wrap gap-2">
          {priceRanges.map((p) => (
            <button
              key={p}
              onClick={() => toggleFilter("price", p)}
              className={`rounded-lg border px-3 py-1 border border-gray-200 shadow-sm flex-shrink-0 hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95 ${
                filters.price.includes(p)
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
