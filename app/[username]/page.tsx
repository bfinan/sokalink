"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import LinkTable from '../../components/LinkTable';

export default function UserFeedPage() {
  const { username } = useParams();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      if (!username) return;

      // First, try to fetch the user ID by display_name
      const { data: user, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('display_name', username)
        .single();

      if (error || !user) {
        // If no user is found, check if any link has the anon_submitter
        const { data: anonUser, error: anonError } = await supabase
          .from('links')
          .select('anon_submitter')
          .eq('anon_submitter', username)
          .single();

        if (anonError || !anonUser) {
          console.log("Error fetching user ID:", error || anonError);
          setUserId(null);
        } else {
          setUserId('anon'); // Set a placeholder value to indicate anon user exists
        }
      } else {
        setUserId(user.id);
      }
      setLoading(false);
    };

    fetchUserId();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userId) {
    return <div className="min-h-screen p-8 pb-20 flex flex-col items-center justify-center gap-6">User not found.</div>
  }

  return (
    <div className="min-h-screen">
      <main className="p-8 pb-20 flex flex-col font-[family-name:var(--font-geist-sans)] gap-6">
        <h2 className="text-2xl font-bold">{username}&apos;s Feed</h2>
        {userId === 'anon' && (
          <h3 className="">
            This user is an anonymous submitter.
            <ul className="list-disc list-inside mt-2">
              <li>Anonymously submitted links are deleted after two weeks</li>
            </ul>
          </h3>
        )}
        <LinkTable userId={userId === 'anon' ? undefined : userId} limit={50} anonSubmitter={userId === 'anon' ? username : undefined} />
      </main>
    </div>
  );
}
