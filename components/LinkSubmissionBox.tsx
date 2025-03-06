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

  async function generateAnonUsername(ip: string) {
    const adjectives = ["Happy", "Brave", "Clever", "Mighty", "Quiet", "Swift", "Jolly", "Wise","Basic", "Mystery"];
    const nouns = ["Lantern", "Tiger", "Sparrow", "Mountain", "River", "Shield", "Comet", "Guy", "Mouse", "Eagle"];
    
    // Hash the IP address
    const encoder = new TextEncoder();
    const data = encoder.encode(ip);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    
    // Convert hash to a number
    const hashNum = hashArray.reduce((acc, val) => (acc * 256 + val) % 10000, 0);
    
    // Pick an adjective and noun based on the hash
    const adjective = adjectives[hashNum % adjectives.length];
    const noun = nouns[(hashNum / (hashNum % adjectives.length)) % nouns.length];
    const number = hashNum % 100; // Two-digit number for uniqueness
    
    console.log("Generated anon username:", `${adjective}${noun}${number}`);
    return `${adjective}${noun}${number}`;
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
    const anon_submitter_id = await generateAnonUsername("123.45.65.73");
    const { error } = await supabase
      .from('links')
      .insert([{ url, title, anon_submitter: anon_submitter_id || null }]);

    console.log('Submitted link with params:', { url, title, anon_submitter: anon_submitter_id });

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
