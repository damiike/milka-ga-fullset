import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Clock, DollarSign } from 'lucide-react';
import { useConfetti } from '../../hooks/useConfetti';
import { generateBookingUrl } from '../../config/booking';
import { LP_SERVICE_GROUPS } from '../../data/lp-service-menu';
import { captureLpBookNow } from '../../lib/lp-booking-analytics';

const services = LP_SERVICE_GROUPS;

export function ServiceShowcase() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { triggerConfetti } = useConfetti();

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
          <p className="eyebrow mb-4">Our Services</p>
          <h2 className="text-foreground mb-4">Choose Your Perfect Look</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From natural elegance to dramatic glamour, we create custom lash looks that enhance your unique beauty
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {services.map((service, index) => (
            <motion.button
              key={service.category}
              onClick={() => setSelectedCategory(index)}
              className={`px-5 py-2.5 rounded-sm text-sm font-medium transition-colors border ${
                selectedCategory === index
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-foreground border-border hover:bg-muted'
              }`}
            >
              {service.category}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
          >
            {services[selectedCategory].items.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCard(item.name)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative pt-4 h-full"
              >
                {item.popular && (
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="absolute top-1 right-1 bg-primary text-primary-foreground px-4 py-1 rounded-md text-xs font-medium uppercase tracking-wider z-20"
                  >
                    Most Popular
                  </motion.div>
                )}

                <motion.div
                  whileHover={{ y: -2 }}
                  className={`relative pro-card h-full flex flex-col ${
                    item.popular ? 'border-foreground/40' : ''
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-3">
                      <h3 className="text-2xl font-medium text-foreground min-h-[3rem] leading-tight">{item.name}</h3>
                    </div>

                    <div className="flex items-center gap-4 mb-4 text-muted-foreground min-h-[2.5rem]">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold text-2xl text-foreground">{item.price.replace('$', '')}</span>
                      </div>
                      <span className="text-border">•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{item.duration}</span>
                      </div>
                    </div>

                    <div className="flex-grow mb-6">
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>

                    <a
                      href={generateBookingUrl()}
                      onClick={() => {
                        triggerConfetti();
                        const ph = (window as Window & { posthog?: { capture: (e: string, p?: Record<string, unknown>) => void } }).posthog;
                        if (ph) {
                          captureLpBookNow(ph, {
                            click_type: 'service_card',
                            button_text: 'Book This Service',
                            service_name: item.name,
                            service_price: item.price,
                            service_category: services[selectedCategory].category,
                          });
                        }
                      }}
                      className={`block w-full py-3 rounded-sm text-sm font-medium uppercase tracking-wide transition-colors text-center cursor-pointer mt-auto ${
                        hoveredCard === item.name
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-foreground text-background hover:bg-foreground/90'
                      }`}
                    >
                      Book This Service
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">Can&apos;t decide? Our artists will help you choose the perfect style during your consultation</p>
          <motion.a
            href={generateBookingUrl()}
            onClick={() => {
              triggerConfetti();
              const ph = (window as Window & { posthog?: { capture: (e: string, p?: Record<string, unknown>) => void } }).posthog;
              if (ph) {
                captureLpBookNow(ph, {
                  click_type: 'service_menu_link',
                  button_text: 'View Full Service Menu',
                });
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 font-medium hover:opacity-80 transition-opacity text-foreground underline-offset-4 hover:underline"
          >
            View Full Service Menu
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
