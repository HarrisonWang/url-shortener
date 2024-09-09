'use client'

import { useState } from 'react';

export default function ShortenPage() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setShortUrl('');
    setCopySuccess(false);

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('创建短链接失败');
      }

      const data = await response.json();
      setShortUrl(data.link);
    } catch (err) {
      setError('创建短链接时出错，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
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
        <div className="mb-4">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            Type the URL you want to shorten
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://xiaowangye.org"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 w-full py-4 bg-neutral-800 hover:bg-neutral-950 transition duration-300 text-white rounded-2xl"
        >
          {isLoading ? 'Generating...' : 'Generate'}
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
              onClick={handleCopy}
              className="ml-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-950 text-white rounded-md transition duration-300"
            >
              {copySuccess ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
    </main>
  );
}