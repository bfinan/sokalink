import Link from 'next/link';

export default async function About() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="p-8 text-4xl font-bold flex items-center justify-center">
        ABOUT
      </header>
      <main className="p-8 pb-20 flex flex-col items-center justify-center gap-6">
        <h2 className="text-lg sm:text-3xl text-gray-900 dark:text-gray-200 font-bold">
          Instant link sharing
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl text-center">
          Sokalink allows you to share what you find instantly, without slowing you down with unnecessary steps. No need to explain why the link is great!
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl text-center">
          Find a link, click on the extension, and share with the feed.
        </p>

        <h2 className="text-lg sm:text-3xl text-gray-900 dark:text-gray-200 font-bold">
          Free, private, and open-source
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl text-center">
          Sokalink is free to use.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl text-center">
          The extension does not spy on your browsing. It only reads the title and URL of links when you click share.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl text-center">
          The source code is available to inspect <Link href="https://github.com/bfinan/sokalink"><span className="text-teal-800 font-semibold dark:text-green-400">on Github</span></Link>.
        </p>

        <h2 className="text-lg sm:text-3xl text-gray-900 dark:text-gray-200 font-bold">
          See more of the web
        </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl text-center">
            Check out what other people think is interesting in the <Link href="/feed"><span className="text-teal-800 font-semibold dark:text-green-400">feed</span></Link>.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl text-center">
            Please familiarize yourself with the <Link href="/rules" className="text-teal-800 font-semibold dark:text-green-400">two rules</Link> before posting.
            </p>

      </main>
    </div>
  );
}