import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex items-center gap-3 px-6 py-4 bg-gray-50">
      <Link href="/">
        <img src="/icons/logo.svg" alt="Munchies Logo" className="h-10 w-auto" />
      </Link>
    </header>
  );
}