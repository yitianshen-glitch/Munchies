"use client";

import { useState } from "react";
import FilterSidebar from "@/components/filters/FilterSidebar";
import { ApiFilter } from "@/lib/api";

type Props = {
  availableFilters: ApiFilter[];
};

export default function MobileFiltersModal({ availableFilters }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-between shadow-sm"
      >
        <span className="font-medium">Filters</span>
        <span className="text-gray-500">▼</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex items-center justify-between shadow-sm z-10">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 text-xl p-1 hover:bg-gray-100 rounded-full"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <FilterSidebar availableFilters={availableFilters} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
