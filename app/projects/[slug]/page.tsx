import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import projects from '@/data/projects.json';
import { Project } from '@/types';

const typedProjects = projects as Project[];

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return typedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = typedProjects.find((p) => p.slug === params.slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — NXR Corporation`,
      description: project.shortDescription,
      images: [{ url: project.image, width: 800, height: 600, alt: project.title }],
    },
  };
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = typedProjects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const relatedProjects = typedProjects
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    creator: { '@type': 'Organization', name: 'NXR Corporation' },
    dateCreated: String(project.year),
    image: project.image,
    keywords: project.technologies.join(', '),
    review: {
      '@type': 'Review',
      reviewBody: project.testimonial.text,
      author: { '@type': 'Person', name: project.testimonial.author, jobTitle: project.testimonial.role },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="pt-20 relative" aria-label={`${project.title} hero`}>
        <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
          <Image src={project.image} alt={`${project.title} — featured image`} fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto">
              <span className="label-tag bg-white/90 backdrop-blur-sm mb-4 inline-flex">{project.category}</span>
              <h1 className="font-display text-3xl md:text-5xl font-semibold text-white leading-tight mt-2">{project.title}</h1>
              <p className="text-white/80 mt-2 text-lg max-w-2xl">{project.shortDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meta bar */}
      <section className="bg-white border-b border-pink-50 py-5" aria-label="Project details">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-6 md:gap-12">
            {[
              { label: 'Client', value: project.client },
              { label: 'Category', value: project.category },
              { label: 'Duration', value: project.duration },
              { label: 'Year', value: String(project.year) },
              { label: 'Investment', value: `$${project.price.toLocaleString()}` },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs text-muted font-medium tracking-wider uppercase">{item.label}</p>
                <p className="font-semibold text-charcoal mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="font-display text-2xl font-semibold text-charcoal mb-4">About This Project</h2>
                <p className="text-muted leading-relaxed text-lg">{project.description}</p>
              </div>

              {project.gallery.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl font-semibold text-charcoal mb-5">Project Gallery</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.gallery.map((img, i) => (
                      <div key={i} className="relative h-52 rounded-2xl overflow-hidden shadow-card group">
                        <Image src={img} alt={`${project.title} gallery image ${i + 1}`} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl p-8 border border-pink-100 shadow-pink-sm relative overflow-hidden">
                <div className="absolute top-4 left-6 text-8xl font-display text-pink-100 leading-none select-none" aria-hidden="true">"</div>
                <blockquote className="relative">
                  <p className="font-accent text-xl italic text-charcoal leading-relaxed mb-6">&ldquo;{project.testimonial.text}&rdquo;</p>
                  <footer className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-pink-100">
                      <Image src={project.testimonial.avatar} alt={project.testimonial.author} fill sizes="48px" className="object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal">{project.testimonial.author}</p>
                      <p className="text-sm text-muted">{project.testimonial.role}</p>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-pink-50 shadow-card">
                <h3 className="font-display font-semibold text-charcoal mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-sm font-medium text-pink-600 bg-pink-50 border border-pink-100 px-3 py-1 rounded-full">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-500 to-pink-700 rounded-2xl p-6 text-white">
                <h3 className="font-display font-semibold text-xl mb-2">Love What You See?</h3>
                <p className="text-pink-100 text-sm leading-relaxed mb-4">We can build something just as impressive for your brand. Every project starts at $700.</p>
                <Link href="/contact" className="block text-center bg-white text-pink-600 font-semibold py-2.5 rounded-xl hover:bg-pink-50 transition-colors text-sm">Start a Project →</Link>
              </div>

              <Link href="/projects" className="flex items-center gap-2 text-sm text-muted hover:text-pink-500 transition-colors">← Back to All Projects</Link>
            </aside>
          </div>
        </div>
      </article>

      {relatedProjects.length > 0 && (
        <section className="py-16 bg-white" aria-labelledby="related-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="related-heading" className="font-display text-2xl font-semibold text-charcoal mb-8">More {project.category} Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rp, i) => (<ProjectCard key={rp.id} project={rp} index={i} />))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
