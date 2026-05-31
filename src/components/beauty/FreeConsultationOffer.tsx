import { motion } from 'framer-motion';
import { Calendar, Clock, Gift } from 'lucide-react';
import { useConfetti } from '../../hooks/useConfetti';
import { generateBookingUrl } from '../../config/booking';

export function FreeConsultationOffer() {
  const { triggerConfetti } = useConfetti();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="brand-band rounded-sm p-8 relative overflow-hidden max-w-lg mx-auto border border-border"
    >
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Gift className="w-6 h-6 text-accent" />
          <span className="eyebrow text-accent">Included with Full Set</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-light text-accent mb-2">
          FREE Lash Consultation
        </h3>

        <p className="text-accent/80 mb-6">
          Included with every new full set booking
        </p>

        <div className="space-y-3 mb-6">
          {[
            'Personalized lash style assessment',
            'Professional eye shape analysis',
            'Custom length & curl recommendations',
            'Aftercare tips for long-lasting results',
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-accent/90"
            >
              <span className="text-accent">✓</span>
              <span>{benefit}</span>
            </motion.div>
          ))}
        </div>

        <motion.a
          href={generateBookingUrl()}
          onClick={() => {
            triggerConfetti();
            if (typeof window !== 'undefined' && (window as Window & { dataLayer?: unknown[] }).dataLayer) {
              (window as Window & { dataLayer: unknown[] }).dataLayer.push({
                event: 'booking_click',
                click_type: 'consultation_offer_cta',
                button_text: 'Perfect for New Clients',
              });
            }
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-luxury-outline w-full border-accent text-accent hover:bg-accent hover:text-primary inline-flex"
        >
          Perfect for New Clients
        </motion.a>
      </div>
    </motion.div>
  );
}

export function FreeConsultationBadge() {
  const { triggerConfetti } = useConfetti();

  return (
    <motion.a
      href={generateBookingUrl()}
      onClick={() => {
        triggerConfetti();
        if (typeof window !== 'undefined' && (window as Window & { dataLayer?: unknown[] }).dataLayer) {
          (window as Window & { dataLayer: unknown[] }).dataLayer.push({
            event: 'booking_click',
            click_type: 'hero_consultation_badge',
            button_text: 'FREE Consultation',
          });
        }
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 500 }}
      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-sm text-sm font-medium uppercase tracking-wider luxury-shadow"
    >
      <Gift className="w-4 h-4" />
      <span>FREE Consultation</span>
    </motion.a>
  );
}
