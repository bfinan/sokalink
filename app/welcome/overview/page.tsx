"use client";

import Link from 'next/link';
import LinkTable from '../../../components/LinkTable'; // Import the LinkTable component
import { ArrowUp, Puzzle } from 'lucide-react';

const FloatingArrow = () => {
  return (
    <div className="fixed top-7 right-11 transform -translate-x-1/2 flex flex-col items-center">
      <Puzzle className="text-[#088F8F] rounded-md mb-2" />
      <ArrowUp className="text-[#088F8F]" />
      <span className="text-sm text-gray-700 dark:text-gray-300 mt-2">Pin Sokalink for easy access!</span>
    </div>
  );
};

export default function OverviewPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="p-8 pb-20 flex flex-col items-center justify-center gap-6">
        <h2 className="text-3xl font-bold">Let&apos;s Go</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl text-center">
          Click the extension on any website (besides this one) to share it to the feed!
        </p>

        <FloatingArrow />

        <LinkTable limit={5} /> {/* Add the LinkTable component */}

        <Link href="/feed" className="mt-4 bg-[#088F8F] text-white py-2 px-4 rounded-md hover:bg-[#0056b3]">
          See more of the feed
        </Link>
      </main>
    </div>
  );
}
