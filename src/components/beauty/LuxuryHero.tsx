import { motion } from 'framer-motion';
import { MapPin, Phone, Star, Clock } from 'lucide-react';
import { useConfetti } from '../../hooks/useConfetti';
import { getImageUrl } from '../../config/assets';
import { generateBookingUrl } from '../../config/booking';

export function LuxuryHero() {
  const { triggerConfetti } = useConfetti();

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-background border-b border-border">
      <div className="shrink-0 brand-band text-center text-xs sm:text-sm py-2.5 px-4">
        <span className="font-medium">Full set lash extensions from $140</span>
        <span className="hidden sm:inline"> · </span>
        <span className="block sm:inline mt-0.5 sm:mt-0 text-background/85">
          Bay Street, Brighton · By appointment
        </span>
      </div>

      <section className="relative flex-1 flex flex-col overflow-hidden">
        <div className="container mx-auto px-6 flex-1 flex items-center justify-center py-8 sm:py-12">
          <motion.div
            className="relative max-w-3xl mx-auto text-center w-full pb-14 sm:pb-16"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={getImageUrl('photos/milka-logo.png')}
              alt="Milka Collective"
              className="hero-logo w-full max-w-[min(100%,160px)] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] h-auto mx-auto mb-6 sm:mb-8"
              width="694"
              height="194"
              fetchPriority="high"
              loading="eager"
            />

            <p className="eyebrow mb-3">Brighton&apos;s Most Loved Lash Studio</p>
            <h1 className="text-foreground mb-4">
              Wake Up Beautiful Every Day — Without the Mascara
            </h1>
            <p className="text-lg text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto hidden md:block">
              Luxurious lash extensions crafted by Brighton&apos;s most experienced artists.
              Wakeup in your makeup every day.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6 sm:mb-10">
              <a
                href={generateBookingUrl()}
                onClick={() => {
                  triggerConfetti();
                  if (typeof window !== 'undefined' && (window as Window & { dataLayer?: unknown[] }).dataLayer) {
                    (window as Window & { dataLayer: unknown[] }).dataLayer.push({
                      event: 'booking_click',
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
                  if (typeof window !== 'undefined' && (window as Window & { dataLayer?: unknown[] }).dataLayer) {
                    (window as Window & { dataLayer: unknown[] }).dataLayer.push({
                      event: 'phone_click',
                      click_type: 'hero_secondary',
                      phone_number: '0480095789',
                    });
                  }
                }}
                className="btn-luxury-outline gap-2"
              >
                <Phone className="w-4 h-4" />
                Call 0480 095 789
              </a>
            </div>

            <div className="inline-flex flex-col items-center gap-3 border border-border rounded-sm bg-muted/50 px-5 py-4 text-sm max-w-2xl w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                  </div>
                  <span className="font-medium text-foreground">105+ Google reviews</span>
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute left-1/2 -translate-x-1/2 top-full mt-6 sm:mt-8 z-10"
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
      </section>
    </div>
  );
}
