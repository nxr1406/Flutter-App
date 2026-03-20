import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with NXR Corporation. Start your web design or development project today — we respond within 24 hours.',
  openGraph: {
    title: 'Contact — NXR Corporation',
    description: 'Start your project or ask a question. We respond within 24 hours.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
