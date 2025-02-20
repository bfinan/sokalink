"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from 'next/link';
import { useAuth } from './auth-context'; // Import useAuth

export default function AuthButton() {
  const { session, setSession } = useAuth(); // Use the auth context
  const [dropdownOpen, setDropdownOpen] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(null);
    setDropdownOpen(false);
  }

  return (
    <div className="relative">
      {session ? (
        <div>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="block w-full text-gray-600 dark:text-gray-300 text-sm hover:underline"
          >
            My Profile
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
              <Link href="/profile" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <Link href="/register">
            <button className="rounded-full bg-[#088F8F] dark:bg-[#0e6f9e] text-white transition-colors flex items-center justify-center hover:bg-[#0056b3] dark:hover:bg-[#0e6f9e] h-8 sm:h-8 px-4 sm:px-5 sm:min-w-22">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
