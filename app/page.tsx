import LinkTable from "../components/LinkTable"; // Import the updated LinkTable

export default async function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="p-8 pb-20 flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 w-full max-w-6xl items-start">
          {/* Left Side: Title, Description, and Buttons */}
          <div className="flex flex-col gap-6 items-start">
            <h2 className="pt-32 text-lg sm:text-3xl text-gray-900 dark:text-gray-200 font-bold">
              One-click social link sharing
            </h2>
            <h3 className="text-gray-600 dark:text-gray-300">
              Share your discoveries instantly without overthinking.
            </h3>
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
            <LinkTable limit={10} /> {}
          </div>
        </div>
      </main>
    </div>
  );
}
