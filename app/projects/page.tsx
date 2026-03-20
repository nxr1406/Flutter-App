import type { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard';
import projects from '@/data/projects.json';
import { Project } from '@/types';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Browse NXR Corporation's portfolio of premium web design and development projects — each crafted with precision, elegance, and purpose.',
  openGraph: {
    title: 'Projects — NXR Corporation',
    description: 'Premium web projects crafted with precision and elegance.',
  },
};

const typedProjects = projects as Project[];
const categories = ['All', ...Array.from(new Set(typedProjects.map((p) => p.category)))];

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-hero-gradient relative overflow-hidden" aria-labelledby="projects-hero-heading">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-pink-100 blob opacity-50" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <span className="label-tag mb-6">Our Portfolio</span>
            <h1 id="projects-hero-heading" className="section-heading mt-4 mb-4">
              Work We&apos;re <span className="gradient-text">Proud Of</span>
            </h1>
            <p className="section-subheading">
              Every project below represents a partnership built on trust, craft, and a shared ambition to create something truly excellent.
            </p>
          </div>
        </div>
      </section>

      {/* Category filter labels (static — no JS filter for SSG) */}
      <section className="bg-white border-b border-pink-50 py-4 sticky top-16 md:top-20 z-30" aria-label="Project categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <span
                key={cat}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border border-pink-100 text-muted bg-white"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-cream" aria-labelledby="projects-grid-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="projects-grid-heading" className="sr-only">All Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {typedProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-white text-center" aria-labelledby="projects-cta-heading">
        <div className="max-w-xl mx-auto px-4">
          <span className="label-tag mb-4">Start Your Project</span>
          <h2 id="projects-cta-heading" className="section-heading mt-4 mb-4">
            Ready to Be <span className="gradient-text">Next?</span>
          </h2>
          <p className="section-subheading mb-8 mx-auto">
            Your brand deserves a digital presence this good. Let&apos;s build it together.
          </p>
          <a href="/contact" className="btn-primary text-base py-3.5 px-8">
            Start a Project — $700
          </a>
        </div>
      </section>
    </>
  );
}
