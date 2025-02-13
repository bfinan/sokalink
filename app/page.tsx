import { supabase } from '../lib/supabaseClient';
import LinkTable from '../components/LinkTable';

export default async function Home() {

  const { data: links, error } = await supabase
    .from('links')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching links:', error);
  }

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] flex items-center justify-center">
      <main className="grid grid-cols-1 sm:grid-cols-2 gap-16 w-full max-w-6xl items-start">

        {/* Left Side: Title, Description, and Buttons */}
        <div className="flex flex-col gap-6 items-start">
          <h1 className="text-4xl sm:text-5xl font-bold">Sokalink</h1>
          <h2 className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            One-click social link sharing
          </h2>

          <div className="flex gap-4 flex-col sm:flex-row">
            <a
              className="rounded-full bg-[#088F8F] dark:bg-[#0e6f9e] text-white transition-colors flex items-center justify-center hover:bg-[#0056b3] dark:hover:bg-[#0e6f9e] h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
              href="/feed"
            >
              Go to Feed
            </a>

            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
              href="https://github.com/bfinan/sokalink"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source code
            </a>
          </div>
        </div>

        {/* Right Side: Link Table */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg w-full">
          <h2 className="text-xl font-semibold mb-4">Newest Links</h2>
          {links ? <LinkTable links={links} limit={10} /> : <p>No links to display.</p>}
        </div>

      </main>
    </div>
  );
}
