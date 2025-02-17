// app/feed/page.tsx
import { supabase } from '../../lib/supabaseClient';
import LinkTable from '../../components/LinkTable';
import Header from '../../components/Header'; // Import the new Header

export default async function FeedPage() {
  // Fetch links from Supabase
  const { data: links, error } = await supabase
  .from("links")
  .select("*, profiles!links_submitter_fkey(display_name)")
  .order("created_at", { ascending: false });


  console.log("Fetched links", links);
  if (error) {
    console.error('Error fetching links:', error);
    return <div>Error loading feed.</div>;
  }

  return (
    <div className="min-h-screen">
      <Header /> {/* Use the new Header component */}
      <div style={{ padding: '2rem' }}>
        {links.length === 0 ? (
          <p>Unable to retrieve links.</p>
        ) : (
          <LinkTable links={links} limit={100} />
        )}
      </div>
    </div>
  );
}
