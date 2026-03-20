import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans, Cormorant_Garamond } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nxrcorporation.com'),
  title: {
    default: 'NXR Corporation — Premium Digital Experiences',
    template: '%s | NXR Corporation',
  },
  description:
    'NXR Corporation crafts premium websites and digital experiences that elevate your brand. Professional web design and development starting at $700.',
  keywords: ['web design', 'web development', 'digital agency', 'premium websites', 'NXR Corporation'],
  authors: [{ name: 'NXR Corporation' }],
  creator: 'NXR Corporation',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nxrcorporation.com',
    siteName: 'NXR Corporation',
    title: 'NXR Corporation — Premium Digital Experiences',
    description: 'Premium websites and digital experiences crafted with elegance. Starting at $700.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NXR Corporation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nxrcorp',
    creator: '@nxrcorp',
    title: 'NXR Corporation — Premium Digital Experiences',
    description: 'Premium websites and digital experiences crafted with elegance. Starting at $700.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${playfair.variable} ${dmSans.variable} ${cormorant.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 bg-pink-500 text-white px-4 py-2 rounded-lg"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
