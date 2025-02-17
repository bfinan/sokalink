import { supabase } from "../lib/supabaseClient";
import LinkTable from "../components/LinkTable";
import Header from "../components/Header"; // Import the new Header

export default async function Home() {
  const { data: links, error } = await supabase
    .from("links")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching links:", error);
  }

  return (
    <div className="min-h-screen">
      {/* New Header Component */}
      <Header />

      <main className="p-8 pb-20 flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 w-full max-w-6xl items-start">
          {/* Left Side: Title, Description, and Buttons */}
          <div className="flex flex-col gap-6 items-start">
            
            <h2 className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
              One-click social link sharing
            </h2>

            <a
              className="rounded-full bg-[#088F8F] dark:bg-[#0e6f9e] text-white transition-colors flex items-center justify-center hover:bg-[#0056b3] dark:hover:bg-[#0e6f9e] h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
              href="/feed"
            >
              Go to Feed
            </a>
          </div>

          {/* Right Side: Link Table */}
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg w-full">
            <h2 className="text-xl font-semibold mb-4">Newest Links</h2>
            {links ? <LinkTable links={links} limit={10} /> : <p>No links to display.</p>}
          </div>
        </div>
      </main>
    </div>
  );
}
