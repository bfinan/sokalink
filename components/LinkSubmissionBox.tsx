"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';

export default function LinkSubmissionBox() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isValidUrl = (userSubmittedString: string | URL) => { 
    try {
        const url = new URL(userSubmittedString);
        console.log("URL: ", url);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {  // eslint-disable-line @typescript-eslint/no-unused-vars
      return false;
    }
  };

  async function ipToUUID(ip: string) {
    // Hash the IP address using SHA-256
    const encoder = new TextEncoder();
    const data = encoder.encode(ip);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // Generate UUID format (xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx)
    const uuid = [
        ...hashArray.slice(0, 4), "-",
        ...hashArray.slice(4, 6), "-",
        (hashArray[6] & 0x0f | 0x40).toString(16), // Set UUID version to 4 (random)
        ...hashArray.slice(7, 8), "-",
        (hashArray[8] & 0x3f | 0x80).toString(16), // Set UUID variant
        ...hashArray.slice(9, 10), "-",
        ...hashArray.slice(10, 16)
    ].map(byte => (typeof byte === "string" ? byte : byte.toString(16).padStart(2, "0"))).join("");

    console.log("UUID: ", uuid);
    return uuid;
  }

  const handleSubmit = async () => {
    if (!url || !isValidUrl(url)) {
      setMessage('Please enter a valid URL.');
      return;
    }
    if (!title.trim()) {
      setMessage('Title is required.');
      return;
    }
    setLoading(true);
    const submitter = await ipToUUID("123.45.65.73");
    const { error } = await supabase
      .from('links')
      .insert([{ url, title, submitter: submitter || null }]);

    console.log('Submitted link with params:', { url, title, submitter });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Link submitted!');
      setUrl('');
      setTitle('');
      router.push('/feed'); // Redirect to the feed page
    }
    setLoading(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
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
        placeholder="Enter the Title (required)"
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
  );
}
