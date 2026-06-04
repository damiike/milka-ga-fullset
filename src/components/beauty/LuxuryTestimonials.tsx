import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import type { CarouselTestimonial } from '../../lib/reviews';
import { fallbackCarouselTestimonials } from '../../lib/reviews';
import { LP_GOOGLE_REVIEW_TRUST } from '../../data/lp-trust-copy';

interface LuxuryTestimonialsProps {
  testimonials?: CarouselTestimonial[];
}

const CAROUSEL_CHAR_LIMIT = 320;

function truncateReview(text: string, limit = CAROUSEL_CHAR_LIMIT): string {
  if (text.length <= limit) return text;
  const trimmed = text.slice(0, limit).trimEnd();
  const lastSpace = trimmed.lastIndexOf(' ');
  const cut = lastSpace > limit * 0.6 ? trimmed.slice(0, lastSpace) : trimmed;
  return `${cut}…`;
}

export function LuxuryTestimonials({
  testimonials: testimonialsProp,
}: LuxuryTestimonialsProps) {
  const testimonials = useMemo(() => {
    const source =
      testimonialsProp && testimonialsProp.length > 0
        ? testimonialsProp
        : fallbackCarouselTestimonials;
    return source.map((t) => ({
      ...t,
      content: truncateReview(t.content),
    }));
  }, [testimonialsProp]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    setActiveIndex(0);
  }, [testimonials.length]);

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const active = testimonials[activeIndex];

  return (
    <section className="py-24 section-alt border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-4">Client Love</p>
          <h2 className="text-foreground mb-4">{LP_GOOGLE_REVIEW_TRUST.trustedByHeading}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Latest 5-star Google reviews from clients who love their lash transformations at our Brighton studio.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-12">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="pro-card p-8 md:p-10">
              <Quote className="w-8 h-8 text-accent mb-5" strokeWidth={1} />

              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8">
                &ldquo;{active.content}&rdquo;
              </p>

              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  {active.profileImgUrl && (
                    <img
                      src={active.profileImgUrl}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover border border-border"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <div>
                    <p className="font-medium text-foreground text-lg">{active.name}</p>
                    <p className="text-muted-foreground">
                      {active.location} • {active.service}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1 uppercase tracking-wider">
                      Verified Google Review
                    </p>
                  </div>
                </div>

                <div className="flex gap-1">
                  {[...Array(active.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="w-5 h-5 text-accent fill-accent" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center items-center gap-6">
          <div className="flex gap-2">
            {testimonials.map((t, index) => (
              <button
                key={t.id}
                type="button"
                aria-label={`Show review from ${t.name}`}
                onClick={() => {
                  setActiveIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-8 h-2 bg-primary rounded-full'
                    : 'w-2 h-2 bg-border rounded-full hover:bg-muted-foreground/40'
                }`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-card rounded-md luxury-shadow border border-border">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-accent fill-accent" />
              ))}
            </div>
            <span className="text-foreground font-medium tracking-wide">
              {LP_GOOGLE_REVIEW_TRUST.overVerifiedLabel}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
