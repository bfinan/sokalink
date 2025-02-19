"use client";

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  /*
  const handleLogin = async (/*provider: string) => {
    setLoading(true);
    //const { error } = await supabase.auth.signInWithOAuth({ provider });
    //if (error) {
    //  setMessage(`Error: ${error.message}`);
    //
    setLoading(false);
  };
  */

  const handleEmailLogin = async () => {
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Check your email for the login link.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <main className="p-8 pb-20 flex flex-col items-center justify-center gap-6">
        <h2 className="text-3xl font-bold ">Log In</h2>
        {/* 
        <button
          onClick={() => handleLogin()}
          className="w-full max-w-xs bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
        >
          Log in with Google
        </button>
        <button
          onClick={() => handleLogin()}
          className="w-full max-w-xs bg-black text-white py-2 rounded-md hover:bg-gray-800"
        >
          Log in with Apple
        </button>
        <button
          onClick={() => handleLogin()}
          className="w-full max-w-xs bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Log in with Facebook
        </button>
        */}
        <div className="w-full max-w-xs mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleEmailLogin}
            disabled={loading}
            className="w-full bg-[#088F8F] text-white p-2 rounded-md mt-4 hover:bg-[#0056b3]"
          >
            {loading ? 'Sending...' : 'Send Magic Link'}
          </button>
          {message && <p className="text-sm text-gray-500 mt-2">{message}</p>}
        </div>
        <p className="text-sm text-gray-800 mt-4">
          New here? <Link href="/register" className="text-teal-800 font-semibold dark:text-green-400">Create a New Account</Link>
        </p>
      </main>
    </div>
  );
}
