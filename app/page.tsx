import Image from "next/image";
import { supabase } from '../lib/supabaseClient';
import LinkTable from '../components/LinkTable';

export default async function Home() {

  // do the same selection again, but join the submitter field on its foreign key from the profiles table
  const { data: links, error } = await supabase
    .from('links')
    .select('*')
    .order('created_at', { ascending: false });


  if (error) {
    console.error('Error fetching links:', error);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <h1 className="text-4xl sm:text-5xl text-center sm:text-left font-bold">
          Sokalink
        </h1>
        <h2 className="text-lg sm:text-xl text-center sm:text-left text-gray-600 dark:text-gray-400">
          One-click social link sharing
        </h2>
        

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          

          <a
            className="rounded-full bg-[#088F8F] dark:bg-[#0e6f9e] text-white dark:text-white transition-colors flex items-center justify-center hover:bg-[#0056b3] dark:hover:bg-[#0e6f9e] h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/feed"
          >
            Go to Feed
          </a>
          

          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://https://github.com/bfinan/sokalink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code
          </a>
        </div>

        <div style={{ padding: '2rem' }}>
      <h2>Newest  Links</h2><br></br>
      {links ? <LinkTable links={links} limit={10} /> : <p>No links to display.</p>}
    </div>

      </main>
      
    </div>
  );
}
