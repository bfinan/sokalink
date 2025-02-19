import Link from 'next/link';

export default async function About() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="p-8 text-4xl font-bold flex items-center justify-center">
        THE TWO RULES
      </header>
      <main className="p-8 flex flex-col items-center justify-center gap-6">
        <h2 className="text-lg sm:text-3xl text-gray-900 dark:text-gray-200 font-bold">
          No NSFW
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl text-center">
          Links should be appropriate for a general audience. No nudity, sexual content, or violence.
        </p>

        <h2 className="text-lg sm:text-3xl text-gray-900 dark:text-gray-200 font-bold">
          Avoid Promoting 
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl text-center">
          Please don&apos;t use Sokalink primarily for promotion. It&apos;s ok to post your own stuff part of the time, but the primary use of the site should be for curiosity.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl text-center">
          You shouldn&apos;t post something because you want the viewer to like your post, subscribe to your channel, sign your petition, or buy your product.
        </p>
        
        <Link href="/feed">
          <button className="mt-8 bg-[#088F8F] dark:bg-[#0e6f9e] text-white py-2 px-4 rounded-full hover:bg-[#0056b3] dark:hover:bg-[#0e6f9e]">
            Go to the Feed
          </button>
        </Link>
      </main>
    </div>
  );
}