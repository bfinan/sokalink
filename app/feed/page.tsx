"use client";

import { useEffect, useState } from 'react';
import LinkTable from '../../components/LinkTable';

export default function FeedPage() {
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    const firstVisit = localStorage.getItem('firstVisit');
    if (!firstVisit) {
      setIsFirstVisit(true);
      localStorage.setItem('firstVisit', 'false');
    }
  }, []);

  return (
    <div className="min-h-screen">
      <div style={{ padding: '2rem' }}>
        {isFirstVisit && (
          <div className="bg-green-100  text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Welcome to the feed! </strong>
            <span className="block sm:inline">Here you can explore and see what other people are sharing.</span>
          </div>
        )}
        <LinkTable limit={100} /> {/* Use the updated LinkTable component */}
      </div>
    </div>
  );
}
