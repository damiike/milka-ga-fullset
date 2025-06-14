import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Confetti, useConfetti } from '../ui/confetti';

export function FloatingBookingButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { isTriggered, triggerConfetti } = useConfetti();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookingClick = () => {
    // Trigger confetti animation
    triggerConfetti();
    
    // Track conversion with GTM
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'booking_click',
        click_type: 'floating_button',
        scroll_position: window.scrollY,
        expanded: isExpanded
      });
    }
    
    // Legacy PostHog tracking
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture('floating_booking_click', {
        scroll_position: window.scrollY,
        expanded: isExpanded
      });
    }
    
    // Redirect to booking page
    window.location.href = 'https://www.fresha.com/a/milka-collective-brighton-melbourne-229-bay-street-m4vife5o/all-offer?menu=true&pId=1089926';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop for expanded state */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
          )}

          {/* Floating button */}
          <motion.div
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            {!isExpanded ? (
              <motion.button
                onClick={() => setIsExpanded(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                {/* Pulsing ring */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-400 rounded-full opacity-50 blur-md"
                />
                
                {/* Main button */}
                <div className="relative bg-gradient-to-r from-pink-500 to-rose-400 text-white p-4 rounded-full shadow-2xl">
                  <Calendar className="w-6 h-6" />
                </div>
                
                {/* Hover tooltip */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none"
                >
                  Book Now
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                    <div className="border-8 border-transparent border-l-gray-900" />
                  </div>
                </motion.div>
              </motion.button>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-3xl shadow-2xl p-6 w-80"
              >
                {/* Close button */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
                
                {/* Content */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Ready for Gorgeous Lashes?
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    Book your appointment online or give us a call
                  </p>
                  
                  <motion.button
                    onClick={handleBookingClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-medium rounded-full shadow-lg mb-3"
                  >
                    Book Online Now
                  </motion.button>
                  
                  <a
                    href="tel:0480095789"
                    onClick={() => {
                      // Track phone click with GTM
                      if (typeof window !== 'undefined' && (window as any).dataLayer) {
                        (window as any).dataLayer.push({
                          event: 'phone_click',
                          click_type: 'floating_button',
                          phone_number: '0480095789'
                        });
                      }
                    }}
                    className="text-pink-600 font-medium hover:text-pink-700 transition-colors"
                  >
                    or Call 0480 095 789
                  </a>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
      
      {/* Confetti Animation */}
      <Confetti trigger={isTriggered} />
    </AnimatePresence>
  );
}