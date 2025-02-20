"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function ProfilePage() {
  const [displayName, setDisplayName] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        console.log("Error retrieving session or user not logged in:", error);
        return;
      }
      setUserId(session.user.id);

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', session.user.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
      } else {
        setDisplayName(profile.display_name || '');
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!userId) {
      setMessage("User not logged in.");
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({ id: userId, display_name: displayName });

    if (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update display name to " + displayName + " for " + userId);
    } else {
      setMessage("Display name updated successfully.");
    }
  };

  return (
    <div className="min-h-screen">
      <main className="p-8 pb-20 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="displayName">
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
            />
          </div>
          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
          {message && <p className="mt-4 text-center">{message}</p>}
        </div>
      </main>
    </div>
  );
}
