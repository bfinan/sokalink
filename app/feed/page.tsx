// app/feed/page.tsx
import { supabase } from '../../lib/supabaseClient';
import LinkTable from '../../components/LinkTable';
import Link from 'next/link';

export default async function FeedPage() {
  // Fetch links from Supabase
  const { data: links, error } = await supabase
    .from('links')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching links:', error);
    return <div>Error loading feed.</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>

    <Link href="/" className=" text-center sm:text-left font-bold" style={{ textDecoration: 'none', color: '#000' }}>← Home</Link>
      <h1 className="text-4xl sm:text-5xl text-center sm:text-left font-bold">Feed</h1>
      {links.length === 0 ? (
        <p>Unable to retrieve links.</p>
      ) : (
        <LinkTable links={links} limit={100} />
      )}
    </div>
  );
}
