import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <article
      className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-pink-lg transition-all duration-500 hover:-translate-y-2"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} project preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="label-tag bg-white/90 backdrop-blur-sm">{project.category}</span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            href={`/projects/${project.slug}`}
            className="bg-white text-pink-600 font-semibold text-sm px-6 py-2.5 rounded-full shadow-lg hover:bg-pink-50 transition-colors"
            aria-label={`View details for ${project.title}`}
          >
            View Details →
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold text-charcoal text-lg leading-tight group-hover:text-pink-600 transition-colors">
            {project.title}
          </h3>
          <span className="text-xs text-muted flex-shrink-0 mt-1">{project.year}</span>
        </div>

        <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs font-medium text-pink-600 bg-pink-50 px-2.5 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs font-medium text-muted bg-gray-50 px-2.5 py-1 rounded-full">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-pink-50">
          <div className="text-xs text-muted">
            <span className="font-medium text-charcoal">{project.client}</span>
            <span className="mx-1">·</span>
            {project.duration}
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="text-xs font-semibold text-pink-500 hover:text-pink-700 transition-colors flex items-center gap-1 group/link"
            aria-label={`View ${project.title} project details`}
          >
            View Details
            <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
