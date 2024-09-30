'use client'

import { useState } from 'react';

interface ShortLink {
  originalUrl: string;
  shortUrl: string;
  id: string; // Add an id field for each link
}

export default function ShortenPage() {
  const [url, setUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [history, setHistory] = useState<ShortLink[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setShortUrl('');
    setCopiedId(null);

    // Add validation for custom slug
    if (customSlug && !/^[a-zA-Z0-9]+$/.test(customSlug)) {
      setError('Custom short link can only contain letters and numbers');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, customSlug }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create short link');
      }

      setShortUrl(data.link);
      setHistory(prevHistory => [{
        originalUrl: url,
        shortUrl: data.link,
        id: Date.now().toString() // Use timestamp as a simple unique id
      }, ...prevHistory]);
      
      // Clear input fields
      setUrl('');
      setCustomSlug('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating short link, please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (textToCopy: string, id: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const handleClear = () => {
    setUrl('');
  };

  const handleClearCustomSlug = () => {
    setCustomSlug('');
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <main className="flex flex-col items-center gap-4 w-full">
      <div className="text-center mb-4 w-full">
        <h1 className="text-2xl sm:text-4xl font-bold">Free URL Shortener</h1>
        <p className="text-base pt-4">Shorten your URLs with our free and easy-to-use tool for URL shortening. 100% automatically and free.</p>
      </div>
      <div className="w-full max-w-3xl bg-[#F1F0E2] p-6 rounded-2xl mt-4">
        <h2 className="text-xl font-bold mb-4">Create Short URL</h2>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4 relative">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              Type the URL you want to shorten
            </label>
            <div className="relative">
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://example.com"
              />
              {url && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          <div className="mb-4 relative">
            <label htmlFor="customSlug" className="block text-sm font-medium text-gray-700 mb-2">
              Custom Slug (Optional)
            </label>
            <div className="relative">
              <input
                type="text"
                id="customSlug"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="my-custom-slug"
              />
              {customSlug && (
                <button
                  type="button"
                  onClick={handleClearCustomSlug}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
            <div className="mt-1 text-sm text-gray-500">
              Custom short link can only contain letters and numbers
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full py-4 bg-neutral-800 hover:bg-neutral-950 transition duration-300 text-white rounded-2xl"
          >
            {isLoading ? 'Generating...' : 'Generate Short Link'}
          </button>
        </form>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {shortUrl && (
          <div className="bg-[#DAD9C4] border border-gray-200 rounded-lg p-4 mb-4">
            <p className="font-bold mb-2">Generated Short URL:</p>
            <div className="flex items-center justify-between">
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">
                {shortUrl}
              </a>
              <button
                onClick={() => handleCopy(shortUrl, 'current')}
                className="ml-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-950 text-white rounded-md transition duration-300"
              >
                {copiedId === 'current' ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        )}
        {history.length > 0 && (
          <div className="mt-8 w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">History</h3>
              <button
                onClick={handleClearHistory}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Clear History
              </button>
            </div>
            <ul className="space-y-2">
              {history.map((link) => (
                <li key={link.id} className="bg-[#DAD9C4] p-3 rounded-lg shadow-sm flex justify-between items-center">
                  <a href={link.shortUrl} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">
                    {link.shortUrl}
                  </a>
                  <button
                    onClick={() => handleCopy(link.shortUrl, link.id)}
                    className="ml-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-950 text-white rounded-md transition duration-300"
                  >
                    {copiedId === link.id ? 'Copied' : 'Copy'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}