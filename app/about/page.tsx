import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about NXR Corporation — our story, our team, and our mission to craft premium digital experiences that elevate brands worldwide.',
  openGraph: {
    title: 'About NXR Corporation',
    description: 'Our story, mission, and the team behind premium digital experiences.',
  },
};

const team = [
  {
    name: 'Alexandra Chen',
    role: 'Creative Director & Founder',
    bio: 'With 10+ years in luxury brand design, Alex founded NXR to bring agency-level quality to independent and growing brands.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b0e3?w=400&q=80',
  },
  {
    name: 'Marcus Webb',
    role: 'Lead Developer',
    bio: 'Full-stack engineer specializing in React and Next.js. Marcus ensures every site is as performant as it is beautiful.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    name: 'Priya Sharma',
    role: 'UX & Strategy Lead',
    bio: 'Priya blends research-driven UX with strategic thinking to ensure our designs actually move the needle for clients.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  },
];

const values = [
  {
    icon: '💎',
    title: 'Uncompromising Quality',
    description:
      'We never cut corners. Every pixel, every interaction, every line of code is crafted to the highest standard.',
  },
  {
    icon: '🤝',
    title: 'Partnership First',
    description:
      'We treat every client as a long-term partner, invested in your success beyond the initial launch.',
  },
  {
    icon: '🚀',
    title: 'Deliver Results',
    description:
      'Beautiful is not enough. Our work is designed to convert, engage, and grow your business.',
  },
  {
    icon: '🌸',
    title: 'Thoughtful Process',
    description:
      'Every decision is intentional. We take time to understand your brand before we build.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-hero-gradient relative overflow-hidden" aria-labelledby="about-hero-heading">
        <div
          className="absolute top-0 right-0 w-72 h-72 bg-pink-100 blob opacity-50"
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <span className="label-tag mb-6">About NXR</span>
            <h1 id="about-hero-heading" className="section-heading mt-4 mb-6">
              We Build Digital Products <span className="gradient-text">Worth Loving</span>
            </h1>
            <p className="section-subheading">
              NXR Corporation is a boutique digital studio focused on premium web design and development.
              We believe great design is not a luxury — it&apos;s a competitive advantage.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white" aria-labelledby="story-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="label-tag">Our Story</span>
              <h2 id="story-heading" className="section-heading mt-4 mb-6">
                Born from a Passion for <span className="gradient-text">Beautiful Design</span>
              </h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  NXR Corporation was founded with a simple belief: every business deserves a digital
                  presence that truly reflects the quality of what they offer. Too often, great companies
                  are held back by generic, uninspiring websites.
                </p>
                <p>
                  We started as a small team of designers and developers who were tired of seeing
                  beautiful brands misrepresented online. So we set out to change that — one project
                  at a time.
                </p>
                <p>
                  Today, we work with clients across industries — from luxury lifestyle brands to tech
                  startups — delivering bespoke digital experiences that command attention and drive results.
                  Every project starts at $700, and every project receives our full commitment.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <Link href="/projects" className="btn-primary">
                  See Our Work
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Work With Us
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-pink-lg">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                  alt="NXR Corporation team collaborating on a design project"
                  width={600}
                  height={480}
                  className="w-full object-cover"
                />
              </div>
              {/* Badge */}
              <div
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-pink-md"
                aria-hidden="true"
              >
                <p className="font-display font-bold text-4xl text-pink-500">50+</p>
                <p className="text-sm text-muted mt-0.5">Premium Projects</p>
                <p className="text-xs text-pink-300">Delivered with love</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cream" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="label-tag">Our Values</span>
            <h2 id="values-heading" className="section-heading mt-4">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-6 border border-pink-50 hover:border-pink-200 hover:shadow-pink-sm transition-all duration-300"
              >
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="font-display font-semibold text-charcoal mb-2">{value.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white" aria-labelledby="team-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="label-tag">The Team</span>
            <h2 id="team-heading" className="section-heading mt-4">
              The Minds Behind <span className="gradient-text">NXR</span>
            </h2>
            <p className="section-subheading mt-4 mx-auto">
              A small but mighty team of designers, developers, and strategists obsessed with craft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <article
                key={member.name}
                className="group text-center"
              >
                <div className="relative w-36 h-36 mx-auto mb-5">
                  <div className="w-full h-full rounded-2xl overflow-hidden shadow-pink-sm group-hover:shadow-pink-md transition-shadow">
                    <Image
                      src={member.image}
                      alt={`${member.name}, ${member.role}`}
                      fill
                      sizes="144px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-pink-gradient rounded-lg"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-display font-semibold text-charcoal text-lg">{member.name}</h3>
                <p className="text-sm font-medium text-pink-500 mb-2">{member.role}</p>
                <p className="text-sm text-muted leading-relaxed max-w-xs mx-auto">{member.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section
        className="py-20 bg-gradient-to-br from-pink-500 to-pink-700 text-white relative overflow-hidden"
        aria-labelledby="mission-heading"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 80%, white 0%, transparent 50%), radial-gradient(circle at 80% 20%, white 0%, transparent 50%)',
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-white/20 border border-white/30 px-3 py-1.5 rounded-full mb-6">
            Our Mission
          </span>
          <h2 id="mission-heading" className="font-display text-4xl md:text-5xl font-semibold leading-tight mb-6">
            To make premium digital design accessible to every ambitious brand.
          </h2>
          <p className="text-lg text-pink-100 leading-relaxed max-w-2xl mx-auto">
            We started NXR because we believed that world-class design shouldn&apos;t require a world-class
            budget. At $700 per project, we&apos;re committed to delivering exceptional value without ever
            compromising on quality.
          </p>
        </div>
      </section>
    </>
  );
}
