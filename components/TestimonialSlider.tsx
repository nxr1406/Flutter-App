'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Testimonial } from '@/types';

interface TestimonialSliderProps {
  testimonials: Array<{
    testimonial: Testimonial;
    project: string;
  }>;
}

export default function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (transitioning) return;
      setTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setTransitioning(false);
      }, 300);
    },
    [transitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length);
  }, [current, testimonials.length, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <section
      className="relative py-20 overflow-hidden bg-gradient-to-br from-pink-50 to-white"
      aria-label="Client testimonials"
    >
      {/* Decorative */}
      <div
        className="absolute top-8 left-8 text-[10rem] font-display text-pink-100 leading-none select-none"
        aria-hidden="true"
      >
        &ldquo;
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <span className="label-tag">Testimonials</span>
          <h2 className="section-heading mt-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </div>

        {/* Testimonial */}
        <div
          className={`text-center transition-all duration-300 ${
            transitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
          role="region"
          aria-live="polite"
          aria-atomic="true"
        >
          <blockquote className="relative">
            <p className="font-accent text-xl md:text-2xl text-charcoal leading-relaxed italic mb-8 max-w-3xl mx-auto">
              &ldquo;{t.testimonial.text}&rdquo;
            </p>
          </blockquote>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-pink-200">
              <Image
                src={t.testimonial.avatar}
                alt={t.testimonial.author}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-charcoal">{t.testimonial.author}</p>
              <p className="text-sm text-muted">{t.testimonial.role}</p>
              <p className="text-xs text-pink-400 mt-0.5 font-medium">{t.project}</p>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-10" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current ? 'bg-pink-500 w-6 h-2' : 'bg-pink-200 hover:bg-pink-300 w-2 h-2'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
              role="tab"
              aria-selected={i === current}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
