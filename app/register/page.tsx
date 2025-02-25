"use client";

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailRegister = async () => {
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({       email });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Check your email for the registration link.');
    }
    setLoading(false);
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : 'https://sokalink.com',
      },
    });
    if (error) {
      setMessage(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleEmailRegister();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <main className="p-8 pb-20 flex flex-col items-center justify-center gap-6">
        <h2 className="text-3xl font-bold">Sign Up for Free</h2>
        <button
          onClick={handleGoogleRegister}
          className="w-full max-w-xs bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
        >
          Sign Up with Google
        </button>
        <div className="w-full max-w-xs mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={handleEmailRegister}
            disabled={loading}
            className="w-full bg-[#088F8F] text-white p-2 rounded-md mt-4 hover:bg-[#0056b3]"
          >
            {loading ? 'Sending...' : 'Send Magic Link'}
          </button>
          {message && <p className="text-sm text-gray-500 mt-2">{message}</p>}
        </div>
        <p className="text-sm text-gray-800 mt-4">
          Already a member? <Link href="/login" className="text-teal-800 font-semibold dark:text-green-400">Log in</Link>
        </p>
      </main>
    </div>
  );
}
