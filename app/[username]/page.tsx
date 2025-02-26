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

      const { data: user, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('display_name', username)
        .single();

      if (error) {
        console.log("Error fetching user ID:", error);
        setUserId(null);
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
        <LinkTable userId={userId} limit={50} />
      </main>
    </div>
  );
}
