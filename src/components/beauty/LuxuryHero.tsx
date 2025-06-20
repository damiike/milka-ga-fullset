import { motion, useScroll, useTransform } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { Sparkles, Star, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useConfetti } from '../../hooks/useConfetti';

export function LuxuryHero() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -150]);
  const { triggerConfetti } = useConfetti();
  
  // Floating animation for sparkles
  const sparkleAnimation = useSpring({
    from: { y: 0 },
    to: async (next) => {
      while (true) {
        await next({ y: -20 });
        await next({ y: 0 });
      }
    },
    config: { duration: 3000 }
  });

  return (
    <section className="relative min-h-screen overflow-hidden premium-gradient">
      {/* Static gradient background */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-primary/30 to-transparent" />
      
      {/* Floating sparkle elements */}
      <animated.div style={sparkleAnimation} className="absolute top-20 left-10 text-primary opacity-40">
        <Sparkles size={30} />
      </animated.div>
      <animated.div style={{...sparkleAnimation, animationDelay: '1s'}} className="absolute top-40 right-20 text-accent opacity-30">
        <Sparkles size={24} />
      </animated.div>
      <animated.div style={{...sparkleAnimation, animationDelay: '2s'}} className="absolute bottom-40 left-32 text-primary opacity-25">
        <Sparkles size={20} />
      </animated.div>

      <div className="relative">
        <div className="container mx-auto px-6 relative z-10 min-h-screen flex items-center justify-center py-16 sm:py-24">
          <motion.div 
            className="flex flex-col items-center justify-center w-full text-center relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 pt-6 sm:pt-0"
          >
            <img 
              src="/photos/milka-logo.png"
              alt="Milka Collective Logo"
              className="h-16 md:h-20 mx-auto"
            />
          </motion.div>

          {/* Elegant brand introduction */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card/80 backdrop-blur-sm luxury-shadow luxury-border">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-medium text-foreground">Brighton's Most Loved Lash Studio</span>
              <Star className="w-4 h-4 text-primary fill-primary" />
            </div>
          </motion.div>

          {/* Main headline with split text animation */}
          <div className="mb-8">
            <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight">
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="block text-foreground"
              >
                Because Life's
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="block font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
              >
                Too Short
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="block text-foreground"
              >
                for Short Lashes
              </motion.span>
            </motion.h1>
          </div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl font-light"
          >
            Wake up beautiful every day with luxurious lash extensions 
            crafted by Brighton's most experienced artists
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <motion.a
              href="https://www.fresha.com/a/milka-collective-brighton-melbourne-229-bay-street-m4vife5o/all-offer?menu=true&pId=1089926"
              onClick={() => {
                // Trigger confetti animation
                triggerConfetti();
                
                // Track booking click with GTM
                if (typeof window !== 'undefined' && (window as any).dataLayer) {
                  (window as any).dataLayer.push({
                    event: 'booking_click',
                    click_type: 'hero_primary',
                    button_text: 'Book Your Transformation'
                  });
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-medium rounded-full overflow-hidden shadow-xl inline-block"
            >
              <span className="relative z-10 flex items-center gap-2 text-lg">
                Book Your Transformation
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            <motion.a
              href="tel:0480095789"
              onClick={() => {
                // Track phone click with GTM
                if (typeof window !== 'undefined' && (window as any).dataLayer) {
                  (window as any).dataLayer.push({
                    event: 'phone_click',
                    click_type: 'hero_secondary',
                    phone_number: '0480095789'
                  });
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-card/80 backdrop-blur-sm text-foreground font-medium rounded-full luxury-shadow luxury-border flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              <span className="text-lg">Call 0480 095 789</span>
            </motion.a>
          </motion.div>

          {/* Trust indicators with animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-muted-foreground pb-6 sm:pb-0"
          >
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto px-4 sm:px-0">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1.5 + i * 0.1 }}
                  >
                    <Star className="w-5 h-5 text-primary fill-primary" />
                  </motion.div>
                ))}
              </div>
              <span className="font-medium text-center sm:text-left">Over 95 5-Star Google Verified Reviews</span>
            </div>
            <span className="hidden sm:inline text-primary/30">•</span>
            <div className="flex flex-col sm:flex-row items-center gap-2 px-4 sm:px-0 w-full sm:w-auto">
              <span className="text-2xl sm:text-lg">⏰</span>
              <span className="text-center sm:text-left">
                <span className="sm:inline">Mon-Thu 10am-8pm •</span>
                <span className="sm:inline"> Fri 10am-5pm •</span>
                <span className="sm:inline"> Sat 10am-4pm</span>
              </span>
            </div>
            <span className="hidden sm:inline text-primary/30">•</span>
            <div className="flex items-center gap-2">
              <span className="text-lg">📍</span>
              <span>2/229 Bay St, Brighton</span>
            </div>
            </motion.div>
            
            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="absolute -bottom-8 sm:-bottom-12 left-1/2 transform -translate-x-1/2 z-10"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-1 h-3 bg-primary rounded-full mt-2"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative blur circles */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-primary rounded-full filter blur-3xl opacity-20"
      />
      <motion.div
        style={{ y: parallaxY }}
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent rounded-full filter blur-3xl opacity-20"
      />
    </section>
  );
}