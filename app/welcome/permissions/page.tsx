"use client";

import Link from 'next/link';

export default function PermissionsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="p-8 pb-20 flex flex-col items-center justify-center gap-6">
        <h2 className="text-3xl font-bold">Share Links Anywhere</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl text-center">
          Instantly publish links to the feed by allowing Sokalink to work on all websites.
        </p>
        <Link href="/welcome/overview" className="mt-4 text-sm font-bold bg-[#088F8F] text-gray-100 py-2 px-4 rounded-md hover:bg-[#0056b3]">
          ALLOW ACCESS
        </Link>
        <Link href="/feed" className="mt-4 text-sm font-bold text-gray-500 py-2 px-4 hover:underline">
          I&apos;ll do this later
        </Link>

        <h3 className="text-lg font-bold pt-20 text-teal-800">Your data is secure.</h3>
        <h4>The sharing extension can only view the title and URL of a page when you click to share.</h4>
        <h4>It will never collect your personal data, history, or browsing information.</h4>
        <h4> You can inspect the source code  <Link href="https://github.com/bfinan/sokalink" className="font-semibold text-teal-600"> on Github</Link>.</h4>
      </main>
    </div>
  );
}
