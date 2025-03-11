"use client";

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <main className="p-8 pb-20  flex flex-col items-center justify-center gap-8">
        <h2 className="text-2xl font-bold">Privacy Policy</h2>
        <p className="text-center">
          Your privacy is important to us. This privacy policy explains what personal data we collect and how we use it.
        </p>
        <p>Because this website is at the beginning of its development, this policy will likely change over time.</p>
        <section className="text-left max-w-2xl">
          <h3 className="text-xl font-semibold mt-4">Information Collected by the Website</h3>
          <p>
            We try to avoid collecting your info. Right now Sokalink only collects this:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>The email you sign up with and your display name.</li>
          </ul>
          <p>Sokalink.com uses Vercel Analytics to understand how users use the site. You can view their privacy policy <Link href="https://vercel.com/docs/analytics/privacy-policy" className="text-blue-500 hover:underline">here</Link>.</p>
          <p>
            As of 2025-03-10, we do not collect the IP addresses of users.
          </p>
          <h3 className="text-xl font-semibold mt-4">Information Collected by the Extension</h3>
          <p>
            When you click the Sokalink extension, it accesses this information:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>The title of the current tab.</li>
            <li>The URL of the current tab.</li>
          </ul>
          <p>That&apos;s it. We don&apos;t track your browsing or any other information from your browser.</p>
          <h3 className="text-xl font-semibold mt-4">Contact Us</h3>
          <p>
            If you have any questions about this privacy policy, please contact us at <Link href="mailto:teamsokalink@gmail.com" className="text-blue-500 hover:underline">teamsokalink@gmail.com</Link>.
          </p>
        </section>
      </main>
    </div>
  );
}
