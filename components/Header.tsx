"use client";

import AuthButton from "./AuthButton";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center px-18 py-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      {/* Left Side: Logo Link with Left Padding */}
      <div className="flex-1">
        <a
          href="/feed"
          className="text-black dark:text-white text-2xl font-semibold ml-8"
        >
          Sokalink
        </a>
      </div>

      {/* Right Side: Links & Auth */}
      <div className="flex items-center gap-6 px-4">
        <a
          className="text-gray-600 dark:text-gray-300 text-sm hover:underline"
          href="https://chrome.google.com/webstore/detail/sokalink"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chrome Extension
        </a>
        <AuthButton />
      </div>
    </header>
  );
}
