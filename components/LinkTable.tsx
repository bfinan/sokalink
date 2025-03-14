"use client";

import { formatDistanceToNow } from 'date-fns';
import { supabase } from '../lib/supabaseClient'; 
import { useEffect, useState } from 'react'; 
import Link from 'next/link';

interface Profile {
  display_name: string | null;
}

interface Link {
  id: string;
  url: string;
  title?: string;
  created_at: string;
  submitter?: string; // UUID referencing the profile
  profiles?: Profile; // Contains the submitter's display_name
  anon_submitter?: string; // randomly generated username for anon submitters
}

interface LinkTableProps {
  userId?: string;
  limit?: number;
  anonSubmitter?: string | string[];
}

export default function LinkTable({ userId, limit, anonSubmitter }: LinkTableProps) {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        console.log("Error retrieving session or user not logged in:", error);
        return;
      }
      setCurrentUserId(session.user.id);
    };

    const fetchLinks = async () => {
      let query = supabase
        .from("links")
        .select("*, profiles!links_submitter_fkey(display_name)")
        .order("created_at", { ascending: false })
        .limit(150);

        //TODO pagination

      if (userId) {
        query = query.eq('submitter', userId);
      } else if (anonSubmitter) {
        query = query.eq('anon_submitter', anonSubmitter);
      }

      const { data: links, error } = await query;

      if (error) {
        console.error("Error fetching links:", error);
        setError("Error loading links.");
      } else {
        setLinks(links);
      }
    };

    fetchUser();
    fetchLinks();
  }, [userId, anonSubmitter]);

  // If a limit is provided, slice the array to show only the first N links.
  const displayedLinks = limit ? links.slice(0, limit) : links;

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Failed to delete link:", error);
      } else {
        console.log("Link deleted successfully");
        // Optionally, you can refresh the links list here
        setLinks(links.filter(link => link.id !== id));
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const getDomain = (url: string) => {
    const { hostname } = new URL(url);
    return hostname.replace('www.', '');
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className=" p-8 pb-20 font-[family-name:var(--font-geist-sans)] flex">
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {displayedLinks.map((link) => (
          <li key={link.id} style={{ marginBottom: '1rem' }}>
            <a 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: '#0070f3' }}
            >
              {link.title ? link.title : link.url}
            </a>
            <small style={{ color: "darkgray", marginLeft: "8px" }}>
              ({getDomain(link.url)})
            </small>
            <br />
            <small style={{ color: "darkgray", marginLeft: "8px" }}>
              from <Link href={`/${link.profiles?.display_name || link.anon_submitter}`} className="hover:underline">{link.profiles?.display_name || link.anon_submitter || "anonymous"}</Link>
            </small>
            <small style={{ color: "darkgray", marginLeft: "4px" }}>
              {formatDistanceToNow(new Date(link.created_at))} ago
            </small>
            {currentUserId === link.submitter && link.submitter && (
              <button
                onClick={() => handleDelete(link.id)} 
                style={{ marginLeft: '8px', color: 'red' }}
              >
                <small>delete</small>
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
