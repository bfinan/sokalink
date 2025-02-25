"use client";

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function ExperimentPage() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!url) return;
    setLoading(true);
    const { error } = await supabase
      .from('links')
      .insert([{ url, title }]);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Link submitted successfully.');
      setUrl('');
      setTitle('');
    }
    setLoading(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <main className="p-8 pb-20 flex flex-col items-center justify-center gap-6">
        <h2 className="text-3xl font-bold">Submit a Link</h2>
        <div className="w-full max-w-xs mt-4">
          <input
            type="text"
            placeholder="Enter the URL"
            className="w-full p-2 border rounded-md"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <input
            type="text"
            placeholder="Enter the Title (optional)"
            className="w-full p-2 border rounded-md mt-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#088F8F] text-white p-2 rounded-md mt-4 hover:bg-[#0056b3]"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          {message && <p className="text-sm text-gray-500 mt-2">{message}</p>}
        </div>
      </main>
    </div>
  );
}
