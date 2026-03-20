import Link from 'next/link';
import Image from 'next/image';

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '$700', label: 'Starting Price' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '3–5wk', label: 'Avg. Delivery' },
];

export default function HeroBanner() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient pt-20"
      aria-label="Hero section"
    >
      {/* Decorative blobs */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 bg-pink-100 blob opacity-60"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-12 -left-16 w-72 h-72 bg-pink-50 blob opacity-70"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-pink-50 to-transparent rounded-full opacity-40"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text */}
          <div>
            <div className="label-tag mb-6 animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
              ✦ Premium Digital Experiences
            </div>

            <h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] text-charcoal mb-6 animate-fade-up opacity-0"
              style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
            >
              We Craft{' '}
              <span className="gradient-text">Beautiful</span>
              <br />
              Digital Products
            </h1>

            <p
              className="text-lg text-muted leading-relaxed mb-8 max-w-lg animate-fade-up opacity-0"
              style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
            >
              NXR Corporation builds premium websites and digital experiences that elevate your brand.
              Each project is tailored, polished, and delivered with precision — starting at $700.
            </p>

            <div
              className="flex flex-wrap gap-4 animate-fade-up opacity-0"
              style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
            >
              <Link href="/projects" className="btn-primary text-base py-3.5 px-8">
                View Our Work
              </Link>
              <Link href="/contact" className="btn-secondary text-base py-3.5 px-8">
                Get a Quote
              </Link>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-10 border-t border-pink-100 animate-fade-up opacity-0"
              style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-semibold text-charcoal">{stat.value}</p>
                  <p className="text-xs text-muted mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div
            className="relative animate-fade-up opacity-0"
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-pink-lg">
              <Image
                src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=900&q=85"
                alt="Premium web design workspace with elegant design tools"
                width={600}
                height={480}
                className="w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 to-transparent" />
            </div>

            {/* Floating cards */}
            <div
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-pink-md p-4 flex items-center gap-3 animate-float"
              aria-hidden="true"
            >
              <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-xl">
                ✨
              </div>
              <div>
                <p className="font-semibold text-charcoal text-sm">Project Launched!</p>
                <p className="text-xs text-muted">Lumière Beauty Brand</p>
              </div>
            </div>

            <div
              className="absolute -top-6 -right-4 bg-white rounded-2xl shadow-pink-md p-4"
              aria-hidden="true"
            >
              <div className="flex items-center gap-2 mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-pink-400 text-sm">
                    ★
                  </span>
                ))}
              </div>
              <p className="font-semibold text-charcoal text-sm">5-Star Quality</p>
              <p className="text-xs text-muted">100% client satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0V30Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
