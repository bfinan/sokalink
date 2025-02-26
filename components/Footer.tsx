"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex justify-between items-center px-18 py-20 border-t
    font-[family-name:var(--font-geist-sans)] border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 bottom-0 w-full">
      {/* Left Side: Logo Link with Left Padding */}
      <div className="flex-1">
        <Link
          href="/"
          className="text-teal-900 font-bold dark:text-white text-2xl ml-8"
        >
          Sokalink
        </Link>
      </div>

      {/* Right Side: Links & Auth */}
      <div className="flex items-center gap-12 px-12">
        <Link
          className="text-gray-600 dark:text-gray-300 text-sm hover:underline"
          href="https://chrome.google.com/webstore/detail/sokalink"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chrome Extension
        </Link>
      <Link className="text-gray-600 dark:text-gray-300 text-sm hover:underline" href="https://github.com/bfinan/sokalink">Github</Link>
      </div>
    </footer>
  );
}
