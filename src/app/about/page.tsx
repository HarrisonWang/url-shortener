'use client'

import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center gap-4 w-full">
      <div className="text-center mb-4 w-full">
        <h1 className="text-2xl sm:text-4xl font-bold">About URL Shortener</h1>
      </div>
      <div className="w-full max-w-3xl bg-[#F1F0E2] p-6 rounded-2xl mt-4">
        <h2 className="text-xl font-bold mb-4">What is URL Shortener?</h2>
        <p className="mb-4">
          URL Shortener is a free tool designed to help users easily shorten long URLs. Our goal is to make URL shortening simple, fast, and efficient. Whether you're a marketer, developer, or anyone who needs to share links, URL Shortener can help you create concise, manageable links.
        </p>
        <h2 className="text-xl font-bold mb-4">Features</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Instant URL shortening</li>
          <li>Custom short links</li>
          <li>Analytics for link clicks</li>
          <li>Secure and reliable redirection</li>
          <li>Free to use</li>
        </ul>
        <h2 className="text-xl font-bold mb-4">How to Use</h2>
        <ol className="list-decimal list-inside mb-4">
          <li>Enter your long URL in the input field on the home page</li>
          <li>Optional: Enter your desired short link</li>
          <li>Click the "Generate Short Link" button</li>
          <li>Copy your shortened URL and share it</li>
        </ol>
        <h2 className="text-xl font-bold mb-4">About the Author</h2>
        <p className="mb-4">
          This website was developed by <a href="https://x.com/voywang" target="_blank" rel="noopener noreferrer" className="hover:underline">Harrison Wang</a>. While not a professional developer, I successfully created this tool with the help of AI. The entire project was developed using <a href="https://www.cursor.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Cursor</a> and Theme originally by <a href='https://x.com/decohack' title='Viggo' target='_blank'  rel="noopener noreferrer" className="hover:underline">Viggo</a>.
        </p>
        <div className="mt-6">
          <Link href="/" className="inline-block bg-neutral-800 text-white py-2 px-4 rounded-md hover:bg-neutral-900 transition duration-300">
            Try It Now
          </Link>
        </div>
      </div>
    </main>
  );
}