"use client";

import { useState } from "react";

export type Filters = {
  categories: string[];
  deliveryTimes: string[];
  priceRanges: string[];
};

export function useFilters() {
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    deliveryTimes: [],
    priceRanges: [],
  });

  const toggleFilter = (type: keyof Filters, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[type];
      if (currentValues.includes(value)) {
        return { ...prev, [type]: currentValues.filter((v) => v !== value) };
      } else {
        return { ...prev, [type]: [...currentValues, value] };
      }
    });
  };

  return { filters, toggleFilter };
}