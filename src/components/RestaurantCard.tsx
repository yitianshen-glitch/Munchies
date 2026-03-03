import Link from "next/link";
import Image from "next/image";
import { Restaurant } from '@/types/restaurant';

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const { id, name, status, deliveryTime, reopen, image } = restaurant;
  const isOpen = status === "open";

  return (
    <Link href={`/restaurants/${id}`} className="relative border border-gray-200 rounded-2xl bg-white p-4 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95 min-h-[200px] overflow-hidden block">
      <div className="flex items-center gap-2 mb-3">
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
            isOpen
              ? " text-black-700 border border-gray-200"
              : " text-gray-600 border border-gray-200"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isOpen ? "bg-[#00703A]" : "bg-gray-500"
            }`}
          />
          {isOpen ? "Open" : "Closed"}
        </div>

        {deliveryTime && (
          <div className="px-2 py-1 rounded-full text-xs font-medium text-gray-700 border border-gray-200">
            {deliveryTime}
          </div>
        )}
      </div>

      <div className="flex items-end flex-1">
        <h3
          className={`absolute bottom-2 left-5 right-14 text-lg font-normal truncate ${
            isOpen ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {name}
        </h3>
        <Image
          src={image}
          alt={name}
          width={144}
          height={144}
          className="absolute -top-7 -right-7 w-36 h-36 object-contain"
        />
      </div>

      <span
        className={`absolute bottom-2 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white ${
          isOpen
            ? "bg-[#00703A]"
            : "bg-gray-300"
        }`}
      >
        →
      </span>

      {!isOpen && reopen && (
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
          {reopen}
        </span>
      )}
    </Link>
  );
}
