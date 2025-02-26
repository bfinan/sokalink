"use client";

import UserMenu from "./UserMenu"; // Import the renamed component
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center px-18 py-2
    font-[family-name:var(--font-geist-sans)] border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      {/* Left Side: Logo Link with Left Padding */}
      <div className="flex-1">
        <Link
          href="/feed"
          className="text-teal-900 font-bold dark:text-white text-2xl ml-8"
        >
          Sokalink
        </Link>
      </div>

      {/* Right Side: Links & Auth */}
      <div className="flex items-center gap-10 px-8 text-gray-600 dark:text-gray-300 font-bold text-sm ">
        <Link href="/about"
          className="hover:underline"
        >
            About
        </Link>
        <Link
          className="hover:underline"
          href="https://chrome.google.com/webstore/detail/sokalink"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chrome Extension
        </Link>
        <UserMenu /> 
      </div>
    </header>
  );
}
