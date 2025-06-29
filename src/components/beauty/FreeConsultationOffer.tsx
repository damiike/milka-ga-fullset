import { motion } from 'framer-motion';
import { Gift, CheckCircle, Sparkles } from 'lucide-react';
import { useConfetti } from '../../hooks/useConfetti';
import { bookingConfig, generateBookingUrl } from '../../config/booking';

export function FreeConsultationOffer() {
  const { triggerConfetti } = useConfetti();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-pink-500 to-rose-400 rounded-2xl p-8 text-white relative overflow-hidden max-w-lg mx-auto"
    >
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 opacity-20">
        <Sparkles className="w-12 h-12" />
      </div>
      <div className="absolute bottom-4 left-4 opacity-10">
        <Sparkles className="w-8 h-8" />
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4"
          >
            <Gift className="w-8 h-8 text-white" />
          </motion.div>
          
          <h3 className="text-2xl font-bold mb-2">
            FREE Lash Consultation
          </h3>
          <p className="text-white/90 text-lg">
            Included with every new full set booking
          </p>
        </div>

        {/* Benefits */}
        <div className="space-y-3 mb-6">
          {[
            'Personalized lash style assessment',
            'Professional eye shape analysis',
            'Custom length & curl recommendations',
            'Aftercare tips for long-lasting results'
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
              <span className="text-white/95">{benefit}</span>
            </motion.div>
          ))}
        </div>

        {/* Value proposition */}
        <div className="text-center">
          <motion.a
            href={generateBookingUrl()}
            onClick={() => {
              // Trigger confetti animation
              triggerConfetti();
              
              // Track booking click with GTM
              if (typeof window !== 'undefined' && (window as any).dataLayer) {
                (window as any).dataLayer.push({
                  event: 'booking_click',
                  click_type: 'consultation_offer_cta',
                  button_text: 'Perfect for New Clients'
                });
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <div className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer">
              Perfect for New Clients ✨
            </div>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

// Compact version for inline use
export function FreeConsultationBadge() {
  const { triggerConfetti } = useConfetti();

  return (
    <motion.a
      href={generateBookingUrl()}
      onClick={() => {
        // Trigger confetti animation
        triggerConfetti();
        
        // Track booking click with GTM
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'booking_click',
            click_type: 'hero_consultation_badge',
            button_text: 'FREE Consultation'
          });
        }
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 500 }}
      className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all cursor-pointer"
    >
      <Gift className="w-4 h-4" />
      <span>FREE Consultation</span>
    </motion.a>
  );
}