import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Sparkles, Clock, DollarSign } from 'lucide-react';
import { useConfetti } from '../../hooks/useConfetti';

interface Service {
  category: string;
  items: {
    name: string;
    price: string;
    duration: string;
    description: string;
    popular?: boolean;
  }[];
}

const services: Service[] = [
  {
    category: "Classic Lashes",
    items: [
      {
        name: "Natural Classic Set",
        price: "$135",
        duration: "75 min",
        description: "One extension per natural lash for an elegant, natural enhancement"
      },
      {
        name: "Full Classic Set",
        price: "$155",
        duration: "120 min",
        description: "Maximum length and fullness while maintaining a natural look",
        popular: true
      },
      {
        name: "Half Classic Set",
        price: "$80",
        duration: "60 min",
        description: "Perfect for first-timers or a subtle enhancement"
      }
    ]
  },
  {
    category: "Volume Lashes",
    items: [
      {
        name: "Full Russian Volume",
        price: "$210",
        duration: "120 min",
        description: "Dramatic volume with 4-6 ultra-fine extensions per lash",
        popular: true
      },
      {
        name: "Natural Russian Volume",
        price: "$185",
        duration: "90 min",
        description: "Soft, fluffy lashes with 2-3 extensions per natural lash"
      },
      {
        name: "Mega Russian Volume",
        price: "$295",
        duration: "150 min",
        description: "Maximum drama with 6-10 extensions for show-stopping lashes"
      }
    ]
  },
  {
    category: "Specialty Sets",
    items: [
      {
        name: "Wet Look Full Set",
        price: "$170",
        duration: "120 min",
        description: "Glossy, just-out-of-the-shower lash look that's trending"
      },
      {
        name: "Full Hybrid Set",
        price: "$185",
        duration: "120 min",
        description: "Perfect blend of classic and volume for textured fullness"
      }
    ]
  },
  {
    category: "Add-Ons",
    items: [
      {
        name: "Bottom Lashes",
        price: "$60",
        duration: "+30 min",
        description: "Complete your look with lower lash extensions"
      },
      {
        name: "Wispy Style",
        price: "$20",
        duration: "+15 min",
        description: "Add texture and movement to any set",
        popular: true
      }
    ]
  }
];

export function ServiceShowcase() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { triggerConfetti } = useConfetti();

  return (
    <section className="py-24 bg-gradient-to-b from-white to-pink-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-rose-100 to-pink-100 rounded-full filter blur-3xl opacity-30 animate-pulse" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium uppercase tracking-widest text-sm">Our Services</span>
            <Sparkles className="w-5 h-5 text-primary" />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-light text-foreground mb-6">
            Choose Your
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> Perfect </span>
            Look
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From natural elegance to dramatic glamour, we create custom lash looks that enhance your unique beauty
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {services.map((service, index) => (
            <motion.button
              key={service.category}
              onClick={() => setSelectedCategory(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === index
                  ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground luxury-shadow'
                  : 'bg-card text-foreground hover:luxury-shadow luxury-border'
              }`}
            >
              {service.category}
            </motion.button>
          ))}
        </div>

        {/* Service cards */}
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
                className="relative pt-4"
              >
                {/* Popular badge */}
                {item.popular && (
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute top-1 right-1 bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-1 rounded-full text-sm font-medium luxury-shadow z-20"
                  >
                    Most Popular
                  </motion.div>
                )}
                
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`relative bg-card rounded-2xl luxury-shadow luxury-border transition-all ${
                    item.popular ? 'border-primary/30' : ''
                  }`}
                >

                  <div className="p-8">
                    <h3 className="text-2xl font-medium text-foreground mb-3">{item.name}</h3>
                  
                  <div className="flex items-center gap-4 mb-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-2xl text-foreground">{item.price.replace('$', '')}</span>
                    </div>
                    <span className="text-primary/30">•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{item.duration}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">{item.description}</p>

                  <motion.a
                    href="https://www.fresha.com/a/milka-collective-brighton-melbourne-229-bay-street-m4vife5o/all-offer?menu=true&pId=1089926"
                    onClick={() => {
                      // Trigger confetti animation
                      triggerConfetti();
                      
                      // Track booking click with GTM
                      if (typeof window !== 'undefined' && (window as any).dataLayer) {
                        (window as any).dataLayer.push({
                          event: 'booking_click',
                          click_type: 'service_card',
                          button_text: 'Book This Service',
                          service_name: item.name,
                          service_price: item.price,
                          service_category: services[selectedCategory].category
                        });
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`block w-full py-3 rounded-full font-medium transition-all text-center ${
                      hoveredCard === item.name
                        ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground luxury-shadow'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    Book This Service
                  </motion.a>

                  </div>

                  {/* Hover effect glow */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === item.name ? 0.2 : 0 }}
                    className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl filter blur-2xl -z-10"
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">Can't decide? Our artists will help you choose the perfect style during your consultation</p>
          <motion.a
            href="https://www.fresha.com/a/milka-collective-brighton-melbourne-229-bay-street-m4vife5o/all-offer?menu=true&pId=1089926"
            onClick={() => {
              // Trigger confetti animation
              triggerConfetti();
              
              // Track booking click with GTM
              if (typeof window !== 'undefined' && (window as any).dataLayer) {
                (window as any).dataLayer.push({
                  event: 'booking_click',
                  click_type: 'service_menu_link',
                  button_text: 'View Full Service Menu'
                });
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 font-medium hover:opacity-80 transition-opacity text-pink-600"
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