"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-4">
      <h2 className="text-2xl font-semibold text-gray-800">Something went wrong</h2>
      <p className="text-gray-500">Could not load restaurants. Please try again.</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-black text-white rounded-xl hover:opacity-80 transition"
      >
        Retry
      </button>
    </div>
  );
}
