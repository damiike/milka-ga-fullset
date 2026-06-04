import { motion } from 'framer-motion';
import { MapPin, Phone, Star, Clock } from 'lucide-react';
import { useConfetti } from '../../hooks/useConfetti';
import { getImageUrl } from '../../config/assets';
import { generateBookingUrl } from '../../config/booking';
import { LP_HERO_FROM_PRICE } from '../../data/lp-service-menu';
import { LP_GOOGLE_REVIEW_TRUST } from '../../data/lp-trust-copy';
import { captureLpBookNow, captureLpPhoneClick } from '../../lib/lp-booking-analytics';

export function LuxuryHero() {
  const { triggerConfetti } = useConfetti();

  return (
    <div className="flex flex-col bg-background border-b border-border max-sm:min-h-0 sm:min-h-screen sm:min-h-[100dvh]">
      <div className="shrink-0 brand-band text-center text-xs sm:text-sm py-2 sm:py-2.5 px-4">
        <span className="font-medium">Full set lash extensions from ${LP_HERO_FROM_PRICE}</span>
        <span className="hidden sm:inline"> · </span>
        <span className="block sm:inline mt-0.5 sm:mt-0 text-background/85">
          Bay Street, Brighton · By appointment
        </span>
      </div>

      <section className="relative flex flex-col overflow-hidden max-sm:flex-none sm:flex-1 sm:min-h-0">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col max-sm:justify-start max-sm:pt-5 max-sm:pb-[70px] sm:flex-1 sm:min-h-0 sm:items-center sm:justify-center sm:py-12">
          <motion.div
            className="relative max-w-3xl mx-auto text-center w-full sm:pb-16"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-[calc(100%+2rem)] -mx-4 px-5 py-5 sm:w-full sm:mx-auto sm:px-0 sm:py-0 mb-3 sm:mb-8">
              <img
                src={getImageUrl('photos/milka-logo.png')}
                alt="Milka Collective"
                className="hero-logo w-full h-auto object-contain mx-auto sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px]"
                width="694"
                height="194"
                fetchPriority="high"
                loading="eager"
              />
            </div>

            <p className="eyebrow mb-2 sm:mb-3">Brighton&apos;s Most Loved Lash Studio</p>
            <h1 className="text-foreground text-2xl leading-tight sm:text-4xl sm:leading-snug mb-3 sm:mb-4">
              Wake Up Beautiful Every Day — Without the Mascara
            </h1>
            <p className="text-lg text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto hidden md:block">
              Luxurious lash extensions crafted by Brighton&apos;s most experienced artists.
              Wakeup in your makeup every day.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mb-4 sm:mb-10">
              <a
                href={generateBookingUrl()}
                onClick={() => {
                  triggerConfetti();
                  const ph = (window as Window & { posthog?: { capture: (e: string, p?: Record<string, unknown>) => void } }).posthog;
                  if (ph) {
                    captureLpBookNow(ph, {
                      click_type: 'hero_primary',
                      button_text: 'Book Your Transformation',
                      service_type: 'full_set',
                    });
                  }
                }}
                className="btn-luxury-primary"
              >
                Book Your Transformation
              </a>
              <a
                href="tel:0480095789"
                onClick={() => {
                  captureLpPhoneClick({
                    click_type: 'hero_secondary',
                    phone_number: '0480095789',
                  });
                }}
                className="btn-luxury-outline gap-2"
              >
                <Phone className="w-4 h-4" />
                Call 0480 095 789
              </a>
            </div>

            <div className="inline-flex flex-col items-center gap-2 sm:gap-3 border border-border rounded-sm bg-muted/50 px-4 py-3 sm:px-5 sm:py-4 text-xs sm:text-sm max-w-2xl w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                  </div>
                  <span className="font-medium text-foreground">{LP_GOOGLE_REVIEW_TRUST.shortHeroLabel}</span>
                </div>
                <span className="hidden sm:block text-border" aria-hidden>
                  |
                </span>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 shrink-0 text-foreground" strokeWidth={1.5} />
                  <span>2/229 Bay St, Brighton</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-center">
                <Clock className="w-4 h-4 shrink-0 text-foreground" strokeWidth={1.5} />
                <span>Mon–Thu 10am–8pm · Fri 10am–5pm · Sat 10am–4pm</span>
              </div>
            </div>

            {/* Mobile: 20px below trust box */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-[40px] flex justify-center sm:hidden"
              aria-hidden
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="w-6 h-10 border-2 border-border rounded-full flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  className="w-1 h-3 bg-foreground/50 rounded-full mt-2"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Desktop: pinned to bottom of hero viewport */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
          aria-hidden
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-border rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-1 h-3 bg-foreground/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
