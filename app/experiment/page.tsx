"use client";

import LinkSubmissionBox from '../../components/LinkSubmissionBox';
import Link from 'next/link';

export default function ExperimentPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <main className="p-8 pb-20 flex flex-col items-center justify-center gap-8">
        <h2 className="text-3xl font-bold">Submit a Link</h2>
        <h3> or install <Link href="https://chrome.google.com/webstore/detail/sokalink" className="font-bold text-blue-500">the extension</Link> to instantly share links as you browse the web</h3>
        <LinkSubmissionBox />
      </main>
    </div>
  );
}
