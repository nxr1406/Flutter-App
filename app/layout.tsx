import type { Metadata } from 'next';
import '@/styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap"
          rel="stylesheet"
        />
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
