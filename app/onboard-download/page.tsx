"use client";

import Link from 'next/link';

export default function OnboardDownloadPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="p-8 pb-20 flex flex-col items-center justify-center gap-6">
        <h2 className="text-3xl font-bold">Almost done!</h2>
        <h3>Continue to the extension store to install Sokalink.</h3>
        <a
          href="https://play.google.com/store/apps/details?id=com.sokalink"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-s bg-[#088F8F] text-white py-2 rounded-md hover:bg-[#0056b3] text-center"
        >
          Install Sokalink
        </a>
        <Link href="/feed" className="text-gray-500 mt-4">
          Maybe later
        </Link>
      </main>
    </div>
  );
}
