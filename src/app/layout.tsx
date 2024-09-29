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
        <footer className='pb-6 bg-neutral-800 text-neutral-500 text-center relative'>
          <div className="inline-flex items-center justify-center">
            <svg className="w-6 h-6 fill-[#737373] mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1" width="200" height="200"><path d="M341.333333 512a42.666667 42.666667 0 0 0 42.666667 42.666667h256a42.666667 42.666667 0 0 0 0-85.333334H384a42.666667 42.666667 0 0 0-42.666667 42.666667z"></path><path d="M384 682.666667H307.626667A176.213333 176.213333 0 0 1 128 527.786667 170.666667 170.666667 0 0 1 298.666667 341.333333h85.333333a42.666667 42.666667 0 0 0 0-85.333333H307.626667a262.4 262.4 0 0 0-262.826667 222.293333A256 256 0 0 0 298.666667 768h85.333333a42.666667 42.666667 0 0 0 0-85.333333zM981.333333 479.573333A262.826667 262.826667 0 0 0 715.093333 256h-64.426666C616.106667 256 597.333333 275.2 597.333333 298.666667a42.666667 42.666667 0 0 0 42.666667 42.666666h76.373333A176.213333 176.213333 0 0 1 896 496.213333 170.666667 170.666667 0 0 1 725.333333 682.666667h-85.333333a42.666667 42.666667 0 0 0 0 85.333333h85.333333a256 256 0 0 0 256-288.426667z"></path></svg>
            <div className="flex flex-col sm:flex-row items-center">
              <span className="sm:mr-2">© 2024 <a href='https://xiaowangye.org' title='Xiaowangye' target='_blank' rel="noopener noreferrer">xiaowangye.org.</a></span>
              <span>Theme originally by <a href='https://x.com/decohack' title='Viggo' target='_blank' rel="noopener noreferrer">Viggo</a>.</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
