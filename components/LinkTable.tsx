"use client";

// components/LinkTable.tsx
import { formatDistanceToNow } from 'date-fns';
import { supabase } from '../lib/supabaseClient'; // Import supabase client
import { useEffect, useState } from 'react'; // Import useEffect and useState

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
}

interface LinkTableProps {
  links: Link[];
  limit?: number;
}

export default function LinkTable({ links, limit }: LinkTableProps) {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        console.log("Error retrieving session or user not logged in:", error);
        return;
      }
      setUserId(session.user.id);
    };

    fetchUser();
  }, []);

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
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)] flex">
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
            <br />
            <small style={{ color: "darkgray", marginLeft: "8px" }}>
              from {link.profiles?.display_name || "anonymous"}
            </small>
            <small style={{ color: "darkgray", marginLeft: "4px" }}>
              {formatDistanceToNow(new Date(link.created_at))} ago
            </small>
            {userId === link.submitter && link.submitter && (
              <button
                onClick={() => handleDelete(link.id)} 
                style={{ marginLeft: '8px', color: 'red' }}
              >
                delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
