"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

export type Filters = {
  categories: string[];
  deliveryTimes: string[];
  priceRanges: string[];
};

const PARAM_KEYS: Record<keyof Filters, string> = {
  categories: "categories",
  deliveryTimes: "delivery",
  priceRanges: "price",
};

export function useFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters: Filters = {
    categories: searchParams.get("categories")?.split(",").filter(Boolean) ?? [],
    deliveryTimes: searchParams.get("delivery")?.split(",").filter(Boolean) ?? [],
    priceRanges: searchParams.get("price")?.split(",").filter(Boolean) ?? [],
  };

  const toggleFilter = useCallback(
    (type: keyof Filters, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const key = PARAM_KEYS[type];
      const current = params.get(key)?.split(",").filter(Boolean) ?? [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      if (updated.length === 0) {
        params.delete(key);
      } else {
        params.set(key, updated.join(","));
      }

      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [router, pathname, searchParams]
  );

  return { filters, toggleFilter };
}
