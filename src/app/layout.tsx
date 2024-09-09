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
    url: 'https://url-shortener-flame.vercel.app/', 
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
        <footer className='px-6 pt-4 sm:pt-0 pb-6 bg-neutral-800 text-neutral-500 text-center'>Copyright © 2024 <a href='https://xiaowangye.org' title='Harrison Wang' target='_blank'>Harrison Wang</a></footer>
      </body>
    </html>
  )
}
