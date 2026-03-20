'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters';
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200)); // Simulate API call
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-hero-gradient relative overflow-hidden" aria-labelledby="contact-heading">
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-pink-100 blob opacity-50" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <span className="label-tag mb-6">Get In Touch</span>
            <h1 id="contact-heading" className="section-heading mt-4 mb-4">
              Let&apos;s Build Something <span className="gradient-text">Together</span>
            </h1>
            <p className="section-subheading">
              Ready to start your project or just have a question? We&apos;d love to hear from you. We respond to every message within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Left — Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display text-2xl font-semibold text-charcoal mb-6">Contact Information</h2>
                <div className="space-y-5">
                  {[
                    { icon: '📧', label: 'Email', value: 'hello@nxrcorporation.com', href: 'mailto:hello@nxrcorporation.com' },
                    { icon: '📞', label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
                    { icon: '📍', label: 'Location', value: '123 Design Street, San Francisco, CA 94105', href: null },
                    { icon: '⏰', label: 'Hours', value: 'Mon–Fri, 9 AM – 6 PM PST', href: null },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-lg flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs font-semibold tracking-wider uppercase text-muted mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-charcoal hover:text-pink-500 transition-colors font-medium text-sm">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-charcoal font-medium text-sm">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div>
                <h3 className="font-display font-semibold text-charcoal mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {['Twitter', 'Instagram', 'LinkedIn'].map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all duration-200 text-sm font-bold"
                      aria-label={s}
                    >
                      {s[0]}
                    </a>
                  ))}
                </div>
              </div>

              {/* Map embed placeholder */}
              <div className="rounded-2xl overflow-hidden shadow-card border border-pink-50">
                <iframe
                  title="NXR Corporation office location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019300738!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-8 shadow-card border border-pink-50">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                      ✅
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-charcoal mb-3">Message Sent!</h3>
                    <p className="text-muted leading-relaxed max-w-sm mx-auto">
                      Thank you for reaching out. We&apos;ll review your message and get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                      className="btn-secondary mt-6"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-display text-xl font-semibold text-charcoal mb-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="name" className="block text-xs font-semibold tracking-wider uppercase text-muted mb-1.5">
                            Full Name <span className="text-pink-400" aria-hidden="true">*</span>
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Jane Smith"
                            autoComplete="name"
                            className={`input-field ${errors.name ? 'border-red-300 focus:ring-red-200' : ''}`}
                            aria-describedby={errors.name ? 'name-error' : undefined}
                            aria-invalid={!!errors.name}
                          />
                          {errors.name && <p id="name-error" className="text-xs text-red-500 mt-1" role="alert">{errors.name}</p>}
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-xs font-semibold tracking-wider uppercase text-muted mb-1.5">
                            Email Address <span className="text-pink-400" aria-hidden="true">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="jane@company.com"
                            autoComplete="email"
                            className={`input-field ${errors.email ? 'border-red-300 focus:ring-red-200' : ''}`}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                            aria-invalid={!!errors.email}
                          />
                          {errors.email && <p id="email-error" className="text-xs text-red-500 mt-1" role="alert">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="subject" className="block text-xs font-semibold tracking-wider uppercase text-muted mb-1.5">
                          Subject <span className="text-pink-400" aria-hidden="true">*</span>
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          className={`input-field ${errors.subject ? 'border-red-300 focus:ring-red-200' : ''}`}
                          aria-describedby={errors.subject ? 'subject-error' : undefined}
                          aria-invalid={!!errors.subject}
                        >
                          <option value="">Select a subject…</option>
                          <option>New Web Design Project</option>
                          <option>Web Development</option>
                          <option>E-Commerce Store</option>
                          <option>Brand Identity</option>
                          <option>SEO & Performance</option>
                          <option>Maintenance & Support</option>
                          <option>General Enquiry</option>
                        </select>
                        {errors.subject && <p id="subject-error" className="text-xs text-red-500 mt-1" role="alert">{errors.subject}</p>}
                      </div>

                      <div className="mb-6">
                        <label htmlFor="message" className="block text-xs font-semibold tracking-wider uppercase text-muted mb-1.5">
                          Message <span className="text-pink-400" aria-hidden="true">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Tell us about your project, goals, and timeline…"
                          className={`input-field resize-none ${errors.message ? 'border-red-300 focus:ring-red-200' : ''}`}
                          aria-describedby={errors.message ? 'message-error' : undefined}
                          aria-invalid={!!errors.message}
                        />
                        {errors.message && <p id="message-error" className="text-xs text-red-500 mt-1" role="alert">{errors.message}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-primary w-full justify-center text-base py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                        aria-busy={submitting}
                      >
                        {submitting ? (
                          <>
                            <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-hidden="true" />
                            Sending…
                          </>
                        ) : (
                          'Send Message →'
                        )}
                      </button>

                      <p className="text-xs text-muted text-center mt-4">
                        We respond to every message within 24 hours. No spam, ever.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
