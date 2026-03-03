import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { getRestaurants, getRestaurant, getOpenStatus, getPriceRange, getFilter, API_IMG_BASE } from "@/lib/api";
import { getDeliveryTimeRange } from "@/utils/format";

export const revalidate = 60;

export async function generateStaticParams() {
  const restaurants = await getRestaurants();
  return restaurants.map((r) => ({ id: r.id }));
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function RestaurantPage({ params }: PageProps) {
  const { id } = await params;

  const [restaurant, openStatus] = await Promise.all([
    getRestaurant(id),
    getOpenStatus(id),
  ]);

  if (!restaurant) notFound();

  const [priceRange, categoryFilter] = await Promise.all([
    getPriceRange(restaurant.price_range_id),
    restaurant.filter_ids?.[0] ? getFilter(restaurant.filter_ids[0]) : null,
  ]);

  const isOpen = openStatus?.is_currently_open ?? false;
  const deliveryTime = getDeliveryTimeRange(restaurant.delivery_time_minutes);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6"
          >
            ← Back
          </Link>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="relative h-64 bg-gray-100">
              <Image
                src={`${API_IMG_BASE}${restaurant.image_url}`}
                alt={restaurant.name}
                fill
                priority
                sizes="(max-width: 672px) 100vw, 672px"
                className="object-contain p-8"
              />
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-semibold">{restaurant.name}</h1>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 border border-gray-200 shrink-0 ${
                    isOpen ? "text-black" : "text-gray-500"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isOpen ? "bg-[#00703A]" : "bg-gray-400"
                    }`}
                  />
                  {isOpen ? "Open" : "Closed"}
                </div>
              </div>

              {categoryFilter && (
                <div className="flex items-center gap-2 mb-4">
                  <Image
                    src={`${API_IMG_BASE}${categoryFilter.image_url}`}
                    alt={categoryFilter.name}
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                  <span className="text-sm text-gray-600">{categoryFilter.name}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {deliveryTime && (
                  <span className="px-3 py-1.5 rounded-full text-sm border border-gray-200 text-gray-700">
                    {deliveryTime}
                  </span>
                )}
                {priceRange && (
                  <span className="px-3 py-1.5 rounded-full text-sm border border-gray-200 text-gray-700">
                    {priceRange.range}
                  </span>
                )}
                <span className="px-3 py-1.5 rounded-full text-sm border border-gray-200 text-gray-700">
                  ★ {restaurant.rating}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
