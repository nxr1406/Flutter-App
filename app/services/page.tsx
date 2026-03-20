import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'NXR Corporation offers premium web design, development, branding, and SEO services. Every engagement starts at $700 with full creative attention.',
  openGraph: {
    title: 'Services — NXR Corporation',
    description: 'Premium digital services starting at $700.',
  },
};

const services = [
  {
    id: 'web-design',
    icon: '🎨',
    title: 'Web Design & UI/UX',
    price: 700,
    description:
      'Pixel-perfect, conversion-focused design systems built for your brand. We start with research, move through wireframes, and deliver polished, responsive interfaces that feel as premium as they look.',
    features: [
      'Brand-aligned visual identity',
      'Responsive for all screen sizes',
      'Wireframes + hi-fi mockups in Figma',
      'Interaction design & micro-animations',
      'WCAG AA accessibility compliance',
      'Handoff-ready design system',
    ],
    popular: false,
  },
  {
    id: 'development',
    icon: '💻',
    title: 'Full-Stack Development',
    price: 700,
    description:
      'From static sites to complex web applications — built on modern frameworks like Next.js, with performance, SEO, and maintainability baked in from day one.',
    features: [
      'Next.js / React development',
      'TypeScript throughout',
      'Tailwind CSS styling',
      'API integration & backend logic',
      'Database design & management',
      'Vercel / cloud deployment',
    ],
    popular: true,
  },
  {
    id: 'ecommerce',
    icon: '🛍️',
    title: 'E-Commerce Solutions',
    price: 700,
    description:
      'Launch or revamp your online store with a custom shopping experience that converts browsers into loyal buyers. Integrated with Stripe, Shopify, or a headless commerce setup.',
    features: [
      'Custom product & collection pages',
      'Stripe / Shopify integration',
      'Cart, checkout & payments',
      'Inventory management hooks',
      'Mobile-optimised purchase flow',
      'Analytics & conversion tracking',
    ],
    popular: false,
  },
  {
    id: 'branding',
    icon: '✨',
    title: 'Brand Identity',
    price: 700,
    description:
      'A complete visual brand system: logo, typography, colour palette, and brand guidelines that give your business a consistent, memorable presence across every touchpoint.',
    features: [
      'Logo design (primary + variations)',
      'Typography & colour system',
      'Brand guidelines document',
      'Social media kit',
      'Business card & stationery design',
      'Brand voice & tone guidance',
    ],
    popular: false,
  },
  {
    id: 'seo',
    icon: '📈',
    title: 'SEO & Performance',
    price: 700,
    description:
      'Rank higher and load faster. We audit, optimise, and monitor your site to achieve Core Web Vitals excellence, strong organic rankings, and consistently fast load times.',
    features: [
      'Technical SEO audit & fixes',
      'On-page optimisation',
      'Structured data / JSON-LD',
      'Core Web Vitals improvement',
      'Sitemap & robots.txt setup',
      'Monthly performance reporting',
    ],
    popular: false,
  },
  {
    id: 'maintenance',
    icon: '🔧',
    title: 'Maintenance & Support',
    price: 700,
    description:
      'Stay secure, fast, and up to date. Our ongoing maintenance packages keep your site running at peak performance with regular updates, backups, and priority support.',
    features: [
      'Weekly dependency updates',
      'Automated daily backups',
      'Uptime monitoring & alerts',
      'Security scanning & patching',
      'Content updates on request',
      'Priority email & chat support',
    ],
    popular: false,
  },
];

const faqs = [
  {
    q: 'Why does everything start at $700?',
    a: 'We price at $700 because that reflects the minimum we need to deliver genuinely excellent work. Below that threshold, quality compromises are inevitable — and we refuse to compromise.',
  },
  {
    q: 'How long does a project take?',
    a: 'Most projects are completed within 3–5 weeks depending on scope and your feedback turnaround. We share a detailed timeline before we start.',
  },
  {
    q: 'Do you offer revisions?',
    a: 'Yes. Every project includes two full revision rounds. Additional rounds are available at a flat rate if needed.',
  },
  {
    q: 'What do you need from me to get started?',
    a: 'A brief conversation, your brand assets (or willingness to create them), and your vision. We handle the rest.',
  },
  {
    q: 'Can I upgrade or combine services?',
    a: "Absolutely. Many clients bundle design + development + SEO for a comprehensive engagement. Get in touch and we'll build a custom scope.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-hero-gradient relative overflow-hidden" aria-labelledby="services-hero-heading">
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-pink-100 blob opacity-50" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <span className="label-tag mb-6">What We Offer</span>
            <h1 id="services-hero-heading" className="section-heading mt-4 mb-4">
              Premium Services, <span className="gradient-text">Real Results</span>
            </h1>
            <p className="section-subheading">
              Every engagement is scoped with precision, executed with care, and priced transparently. No hidden fees, no surprises — just exceptional digital work.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-cream" aria-labelledby="services-grid-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="services-grid-heading" className="sr-only">Service offerings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <article
                key={service.id}
                id={service.id}
                className={`relative bg-white rounded-2xl p-8 border transition-all duration-300 hover:shadow-pink-md hover:-translate-y-1 ${
                  service.popular
                    ? 'border-pink-300 shadow-pink-sm ring-1 ring-pink-200'
                    : 'border-pink-50 shadow-card'
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-6">
                    <span className="bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs font-bold tracking-wider px-4 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="font-display font-semibold text-charcoal text-xl mb-1">{service.title}</h3>
                <p className="text-2xl font-bold text-pink-500 mb-3">
                  ${service.price.toLocaleString()}
                  <span className="text-sm font-normal text-muted ml-1">/ project</span>
                </p>
                <p className="text-sm text-muted leading-relaxed mb-6">{service.description}</p>

                <ul className="space-y-2 mb-8" aria-label={`${service.title} features`}>
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-charcoal">
                      <span className="mt-0.5 text-pink-400 flex-shrink-0" aria-hidden="true">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`block text-center py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    service.popular
                      ? 'bg-pink-500 text-white hover:bg-pink-600 shadow-pink-sm hover:shadow-pink-md'
                      : 'bg-pink-50 text-pink-600 hover:bg-pink-100 border border-pink-100'
                  }`}
                >
                  Get Started →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-white" aria-labelledby="why-nxr-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="label-tag mb-4">Why Choose Us</span>
          <h2 id="why-nxr-heading" className="section-heading mt-4 mb-12">
            The NXR <span className="gradient-text">Difference</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🏆', title: 'Senior-Only Team', desc: 'Every project is handled by experienced senior designers and developers — no juniors, no outsourcing.' },
              { icon: '📋', title: 'Transparent Process', desc: 'You see every step. Figma links, GitHub access, weekly updates — full visibility from day one.' },
              { icon: '🚀', title: 'Launch-Ready Output', desc: 'We don\'t stop at design. We build, test, and deploy — handing you a fully live, production-ready product.' },
            ].map((item) => (
              <div key={item.title} className="p-8 rounded-2xl border border-pink-50 hover:border-pink-200 hover:shadow-pink-sm transition-all duration-300">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display font-semibold text-charcoal text-lg mb-2">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-cream" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="label-tag mb-4">FAQs</span>
            <h2 id="faq-heading" className="section-heading mt-4">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-pink-50 hover:border-pink-200 transition-colors">
                <h3 className="font-semibold text-charcoal mb-2">{faq.q}</h3>
                <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center" aria-labelledby="services-cta-heading">
        <div className="max-w-xl mx-auto px-4">
          <h2 id="services-cta-heading" className="section-heading mb-4">
            Ready to Get <span className="gradient-text">Started?</span>
          </h2>
          <p className="section-subheading mb-8 mx-auto">Tell us about your project and we&apos;ll get back to you within 24 hours.</p>
          <Link href="/contact" className="btn-primary text-base py-3.5 px-8">Book a Free Consultation</Link>
        </div>
      </section>
    </>
  );
}
