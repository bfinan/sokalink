"use client";

import Link from 'next/link';

export default function TutorialPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="p-8 pb-20 flex flex-col items-center justify-center gap-6">
        <h2 className="text-3xl font-bold">Welcome to Sokalink!</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl text-center">
          You have successfully installed the sharing extension. Next up, we will allow the extension to publish links.
        </p>
        <Link href="/welcome/permissions" className="mt-4 bg-[#088F8F] text-white py-2 font-bold px-4 rounded-md hover:bg-[#0056b3]">
          NEXT
        </Link>
      </main>
    </div>
  );
}
