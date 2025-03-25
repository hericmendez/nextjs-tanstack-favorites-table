
"use client";
import Link from "next/link";


export default function Navbar() {


  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div className="flex row-span-4">
        <Link href="/" className="text-white hover:underline text-2xl ml-2">
          HOME
        </Link>
        <Link
          href="/games/finished"
          className="text-white hover:underline text-2xl ml-10"
        >
          FINISHED
        </Link>
        <Link
          href="/games/favorites"
          className="text-white hover:underline text-2xl ml-10"
        >
          FAVORITES
        </Link>
        <Link
          href="/games/backlog"
          className="text-white hover:underline text-2xl ml-10"
        >
            BACKLOG
        </Link>

      </div>

    </nav>
  );
}
