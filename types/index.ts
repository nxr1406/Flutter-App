export interface Testimonial {
  text: string;
  author: string;
  role: string;
  avatar: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  technologies: string[];
  category: string;
  client: string;
  price: number;
  duration: string;
  year: number;
  testimonial: Testimonial;
  featured: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: number;
  icon: string;
  popular?: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
