import type { Metadata } from 'next'
import './globals.css'
import HeaderNav from '../components/HeaderNav'

export const metadata: Metadata = {
  title: 'URL Shortener - Free URL Shortener',
  description: 'Shorten your URLs 100% automatically and for free with URL Shortener.',
  keywords: 'URL, URL Shortener, Free URL Shortener, Bulk URL Shortener, URL Shortener',
  openGraph: {
    title: 'URL Shortener - Free URL Shortener',
    description: 'Shorten your URLs 100% automatically and for free with URL Shortener.',
    images: [
      {
        url: '/og-image.webp', 
        width: 1200,
        height: 630,
        alt: 'URL Shortener - Free URL Shortener',
      },
    ],
    url: 'https://url.xiaowangye.org', 
    siteName: 'URL Shortener',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'URL Shortener - Free URL Shortener',
    description: 'Shorten your URLs 100% automatically and for free with URL Shortener.',
    images: ['/og-image.webp'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen bg-[#E2E1CF] text-neutral-800`}>
        <HeaderNav />
        <main className="flex-grow flex items-center justify-center px-4 pt-28 sm:pt-24 pb-12">
          <div className="flex-grow flex items-center justify-center max-w-xl">
            {children}
          </div>
        </main>
        <div className="w-full">
          <img src="/factory.svg" alt="Factory" className="w-full" />
        </div>
        <footer className='px-6 pt-4 sm:pt-0 h-12 bg-neutral-800 text-neutral-500 text-center relative'>
          <div className="inline-block">
            Copyright © 2024 <a href='https://xiaowangye.org' title='Xiaowangye' target='_blank'>xiaowangye.org.</a>
            Theme originally by <a href='https://x.com/decohack' title='Viggo' target='_blank'>Viggo</a>. 
            <svg className="absolute right-6 top-0" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M341.333333 341.333333c-95.914667 0-170.666667 74.752-170.666666 170.666667s74.752 170.666667 170.666666 170.666667h85.333334a42.666667 42.666667 0 1 1 0 85.333333H341.333333c-143.018667 0-256-112.981333-256-256s112.981333-256 256-256h85.333334a42.666667 42.666667 0 1 1 0 85.333333H341.333333z m213.333334-42.666666a42.666667 42.666667 0 0 1 42.666666-42.666667h85.333334c143.018667 0 256 112.981333 256 256s-112.981333 256-256 256h-85.333334a42.666667 42.666667 0 1 1 0-85.333333h85.333334c95.914667 0 170.666667-74.752 170.666666-170.666667s-74.752-170.666667-170.666666-170.666667h-85.333334a42.666667 42.666667 0 0 1-42.666666-42.666666z m-256 213.333333a42.666667 42.666667 0 0 1 42.666666-42.666667h341.333334a42.666667 42.666667 0 1 1 0 85.333334H341.333333a42.666667 42.666667 0 0 1-42.666666-42.666667z" fill="#737373"></path></svg>
          </div>
        </footer>
      </body>
    </html>
  )
}
