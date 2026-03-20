import type { Metadata } from 'next';
import Link from 'next/link';
import HeroBanner from '@/components/HeroBanner';
import ProjectCard from '@/components/ProjectCard';
import TestimonialSlider from '@/components/TestimonialSlider';
import projects from '@/data/projects.json';
import { Project } from '@/types';

export const metadata: Metadata = {
  title: 'Premium Digital Experiences',
  description:
    'NXR Corporation crafts premium websites and digital experiences. Elevate your brand with bespoke web design starting at $700.',
};

const typedProjects = projects as Project[];
const featuredProjects = typedProjects.filter((p) => p.featured);
const testimonials = typedProjects.slice(0, 4).map((p) => ({
  testimonial: p.testimonial,
  project: p.title,
}));

const services = [
  {
    icon: '🎨',
    title: 'Brand & Identity',
    description: 'Visual systems that communicate your unique essence with clarity and elegance.',
  },
  {
    icon: '💻',
    title: 'Web Development',
    description: 'Fast, accessible, and beautifully coded websites built to convert.',
  },
  {
    icon: '📱',
    title: 'Mobile-First Design',
    description: 'Flawless experiences across every device, screen, and interaction.',
  },
  {
    icon: '📈',
    title: 'SEO & Performance',
    description: 'Optimized for search engines and blazing fast — Core Web Vitals perfection.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NXR Corporation',
  url: 'https://nxrcorporation.com',
  logo: 'https://nxrcorporation.com/logo.png',
  description: 'Premium digital experiences crafted with elegance.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
  sameAs: [
    'https://twitter.com/nxrcorp',
    'https://instagram.com/nxrcorp',
    'https://linkedin.com/company/nxrcorp',
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <HeroBanner />

      {/* Services Overview */}
      <section className="py-20 bg-white" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="label-tag">What We Do</span>
            <h2 id="services-heading" className="section-heading mt-4">
              Crafted for <span className="gradient-text">Excellence</span>
            </h2>
            <p className="section-subheading mt-4 mx-auto">
              Every project receives our full creative and technical expertise. No shortcuts, no templates — just purposeful design.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div
                key={service.title}
                className="group p-6 rounded-2xl border border-pink-50 bg-white hover:bg-pink-50/60 hover:border-pink-200 hover:shadow-pink-sm transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center text-2xl mb-4 group-hover:bg-pink-100 transition-colors">
                  {service.icon}
                </div>
                <h3 className="font-display font-semibold text-charcoal mb-2">{service.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/services" className="btn-secondary">
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-cream" aria-labelledby="projects-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="label-tag">Our Portfolio</span>
              <h2 id="projects-heading" className="section-heading mt-4">
                Featured <span className="gradient-text">Projects</span>
              </h2>
            </div>
            <Link href="/projects" className="btn-ghost self-start md:self-auto">
              View All Work →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSlider testimonials={testimonials} />

      {/* Process Section */}
      <section className="py-20 bg-white" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="label-tag">Our Process</span>
            <h2 id="process-heading" className="section-heading mt-4">
              How We <span className="gradient-text">Work</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connecting line */}
            <div
              className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-pink-200 via-pink-300 to-pink-200"
              aria-hidden="true"
            />
            {[
              { step: '01', title: 'Discovery', desc: 'We learn about your brand, goals, and audience.' },
              { step: '02', title: 'Strategy', desc: 'A roadmap tailored to your unique requirements.' },
              { step: '03', title: 'Design & Build', desc: 'Pixel-perfect design brought to life in code.' },
              { step: '04', title: 'Launch', desc: 'Deployed, tested, and ready to impress.' },
            ].map((item, i) => (
              <div key={item.step} className="relative text-center group" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="w-20 h-20 rounded-2xl bg-pink-gradient border border-pink-100 flex flex-col items-center justify-center mx-auto mb-4 shadow-pink-sm group-hover:shadow-pink-md transition-shadow">
                  <span className="text-xs font-bold text-pink-400 tracking-widest">{item.step}</span>
                  <span className="font-display font-semibold text-charcoal text-sm mt-0.5">{item.title}</span>
                </div>
                <p className="text-sm text-muted leading-relaxed max-w-[180px] mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 relative overflow-hidden bg-charcoal" aria-labelledby="cta-heading">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 50%, #ec4899 0%, transparent 50%), radial-gradient(circle at 70% 50%, #f9a8d4 0%, transparent 50%)',
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="label-tag mb-6 bg-pink-500/20 border-pink-500/30 text-pink-300">Limited Spots Available</div>
          <h2 id="cta-heading" className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
            Your Next Project
            <br />
            <span className="gradient-text">Starts at $700</span>
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
            We take on a select number of projects each month to ensure exceptional quality and personal attention.
          </p>
          <Link href="/contact" className="btn-primary text-base py-4 px-10">
            Book a Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
