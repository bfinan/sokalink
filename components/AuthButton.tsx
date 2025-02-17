"use client";

import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"; // Import the modal

export default function AuthButton() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const getSession = async () => {
      const { data : {session}} = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, newSession) => {
      setSession(newSession);
    });

    return () => {
      authListener.subscription.unsubscribe();
    }
  }, []);

  async function handleLogin() {
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Check your email for the login link.");
    }
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(null);
  }

  return (
    <div>
      {session ? (
        // Show Logout Button if User is Logged In
        <button
          onClick={handleLogout}
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-8 sm:h-8 px-4 sm:px-5 sm:min-w-22"
        >
          Logout
        </button>
      ) : (
        // Show Login Button if User is Not Logged In
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button className="rounded-full bg-[#088F8F] dark:bg-[#0e6f9e] text-white transition-colors flex items-center justify-center hover:bg-[#0056b3] dark:hover:bg-[#0e6f9e] h-8 sm:h-8 px-4 sm:px-5 sm:min-w-22">
              Login
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Login to Sokalink</DialogTitle>
            </DialogHeader>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#088F8F] text-white p-2 rounded-md mt-4"
            >
              {loading ? "Sending..." : "Send Magic Link"}
            </button>

            {message && <p className="text-sm text-gray-500 mt-2">{message}</p>}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
