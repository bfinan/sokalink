"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';

export default function BackPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };

    checkSession();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        window.close();
      }, 15000); // Close the page after 15 seconds

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <main className="p-8 pb-20 flex flex-col items-center justify-center gap-6">
        {isLoggedIn ? (
          <>
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-center">
              Your Sokalink browser extension is now re-connected to your account. Enjoy!
            </p>
            <p>
              This page will close in 15 seconds.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-center">
              You were directed to this page because your extension got disconnected from your account. Please log in to re-connect.
            </p>
            <Link
              href="/login"
              className="mt-8 bg-blue-500 text-white text-4xl py-20 px-40 rounded-md hover:bg-blue-600"
            >
              Log In
            </Link>

            <h3 className="pt-20">Why did this happen?</h3>
            <ul className="list-disc list-inside mt-2">
              <li>You uninstalled the extension and re-installed it.</li>
            </ul>
            <div className="flex items-center px-5 mt-8">
              You can also  
              <Link
                href="/contact"
                className=" text-black px-2 hover:underline"
              >
                contact us here
              </Link>
              or 
              <Link
                href="https://chrome.google.com/webstore/detail/sokalink"
                target="_blank"
                rel="noopener noreferrer"
                className=" text-black px-2  hover:underline"
              >
                click here to uninstall Sokalink.
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
