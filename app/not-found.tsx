import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'Oops! The page you are looking for does not exist. Return to NXR Corporation.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-pink-100 blob opacity-60" aria-hidden="true" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-pink-50 blob opacity-70" aria-hidden="true" />

      <div className="relative text-center max-w-lg">
        {/* 404 number */}
        <div className="relative mb-6">
          <p
            className="font-display font-bold text-[10rem] leading-none text-pink-100 select-none"
            aria-hidden="true"
          >
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-white rounded-2xl shadow-pink-md flex items-center justify-center text-5xl animate-float">
              🌸
            </div>
          </div>
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-semibold text-charcoal mb-4">
          Oops — This Page Bloomed Elsewhere
        </h1>
        <p className="text-muted leading-relaxed mb-8 max-w-sm mx-auto">
          The page you&apos;re looking for has wandered off. Don&apos;t worry — let&apos;s get you back somewhere beautiful.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            Return Home
          </Link>
          <Link href="/projects" className="btn-secondary">
            View Our Work
          </Link>
          <Link href="/contact" className="btn-ghost">
            Contact Us
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-10 pt-8 border-t border-pink-100">
          <p className="text-xs text-muted mb-3 font-medium tracking-wider uppercase">Popular Pages</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: 'About', href: '/about' },
              { label: 'Services', href: '/services' },
              { label: 'Projects', href: '/projects' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-pink-500 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-4 py-1.5 rounded-full transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
