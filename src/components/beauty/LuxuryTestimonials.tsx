import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  service: string;
  content: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Summer Jay",
    location: "Brighton",
    service: "Lash Extensions",
    content: "I was very happy with my services. I had my eyelashes done & they look awesome! If you are looking for beautiful lash extensions, look no further than Milka!",
    rating: 5
  },
  {
    id: 2,
    name: "Intan Sari Patanan",
    location: "Melbourne",
    service: "Lashes & Brows",
    content: "I recently had the pleasure of getting my eyelash extensions and brow tinting done by Michelle and Ella, and I couldn't be happier with the results! Ella's expertise in eyelash extensions was evident in the meticulous care she took to ensure each lash was perfectly applied. The extensions look natural yet voluminous, enhancing my eyes beautifully without being overly dramatic...Both Michelle and Ella were professional, friendly, and attentive to my preferences, making the whole experience enjoyable. I highly recommend their services to anyone looking to enhance their lashes and brows with a touch of expert artistry.",
    rating: 5
  },
  {
    id: 3,
    name: "Skye Taylor",
    location: "Brighton",
    service: "Lash Extensions",
    content: "I had my lashes done by the lovely Oxana yesterday. She is absolutely amazing - highly recommend!",
    rating: 5
  },
  {
    id: 4,
    name: "Maryanne Serratore",
    location: "Brighton",
    service: "Lash Extensions",
    content: "Just amazing! Wouldn't go anywhere else. My lashes are exactly what I want. Thanks so much girls x",
    rating: 5
  }
];

export function LuxuryTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section className="py-24 bg-gradient-to-b from-pink-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-pink-100 rounded-full filter blur-3xl opacity-30" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-rose-100 rounded-full filter blur-3xl opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
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
            <Star className="w-5 h-5 text-pink-500 fill-pink-500" />
            <span className="text-pink-600 font-medium uppercase tracking-widest text-sm">Client Love</span>
            <Star className="w-5 h-5 text-pink-500 fill-pink-500" />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-6">
            Real Stories,
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400"> Beautiful </span>
            Results
          </h2>
        </motion.div>

        {/* Main testimonial display */}
        <div className="max-w-4xl mx-auto mb-12">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-pink-100">
              {/* Quote icon */}
              <Quote className="w-12 h-12 text-pink-200 mb-6" />
              
              {/* Testimonial content */}
              <p className="text-2xl md:text-3xl font-light text-gray-800 leading-relaxed mb-8">
                "{testimonials[activeIndex].content}"
              </p>
              
              {/* Author info */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 text-lg">{testimonials[activeIndex].name}</p>
                  <p className="text-gray-600">
                    {testimonials[activeIndex].location} • {testimonials[activeIndex].service}
                  </p>
                </div>
                
                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="w-5 h-5 text-pink-500 fill-pink-500" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonial navigation */}
        <div className="flex justify-center items-center gap-6">
          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-8 h-2 bg-gradient-to-r from-pink-500 to-rose-400 rounded-full'
                    : 'w-2 h-2 bg-pink-200 rounded-full hover:bg-pink-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Google reviews callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-md border border-pink-100">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-pink-500 fill-pink-500" />
              ))}
            </div>
            <span className="text-gray-700 font-medium">Over 95 5-Star Google Verified Reviews</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}