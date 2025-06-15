import { motion } from 'framer-motion';
import { Play, Clock, Users, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useConfetti } from '../../hooks/useConfetti';

interface VideoItem {
  id: number;
  embedUrl: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  popularity: string;
  highlights: string[];
  technique: 'classic' | 'hybrid' | 'volume';
}

const videos: VideoItem[] = [
  {
    id: 1,
    embedUrl: "https://www.instagram.com/p/DKhGG65TaWN/embed",
    title: "Classic Lash Transformation",
    subtitle: "Natural Elegance That Enhances Your Beauty",
    description: "Watch as we create the perfect everyday look with our signature classic technique. One extension per natural lash for subtle length and definition that looks effortlessly beautiful.",
    duration: "75 minutes",
    popularity: "Most Popular for Daily Wear",
    highlights: [
      "Natural one-to-one application technique",
      "Perfect for first-time lash clients",
      "Enhances your natural eye shape",
      "Comfortable and lightweight feel"
    ],
    technique: 'classic'
  },
  {
    id: 2,
    embedUrl: "https://www.instagram.com/p/DK1P7ZyTk2O/embed",
    title: "Hybrid Lash Transformation", 
    subtitle: "The Perfect Balance of Natural & Glamorous",
    description: "Discover why hybrid lashes are our most requested service. Combining classic and volume techniques for fuller lashes that still look naturally beautiful.",
    duration: "120 minutes",
    popularity: "Client Favorite - Best of Both Worlds",
    highlights: [
      "Mix of classic and volume techniques",
      "Fuller look while maintaining natural appearance", 
      "Perfect for special events and everyday",
      "Customized to your eye shape and style"
    ],
    technique: 'hybrid'
  },
  {
    id: 3,
    embedUrl: "https://www.instagram.com/p/DFmzJ9YTh6f/embed",
    title: "Volume Lash Transformation",
    subtitle: "Dramatic Glamour for Special Occasions",
    description: "Experience the artistry of Russian volume technique. Multiple ultra-fine extensions create breathtaking fullness and drama that photographs beautifully.",
    duration: "150 minutes",
    popularity: "Perfect for Events & Photography",
    highlights: [
      "Russian volume fan technique",
      "Maximum fullness and dramatic impact",
      "Lightweight despite increased volume",
      "Perfect for weddings and special events"
    ],
    technique: 'volume'
  }
];

export function VideoShowcase() {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const { triggerConfetti } = useConfetti();

  const handleVideoClick = (videoId: number) => {
    setPlayingVideo(videoId);
    
    // Track video click with GTM
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'video_click',
        click_type: 'instagram_embed',
        video_id: videoId
      });
    }
  };

  const handleBookNow = (technique: string) => {
    triggerConfetti();
    
    // Track booking click with GTM
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'booking_click',
        click_type: 'video_showcase',
        video_technique: technique,
        button_text: 'Book This Style'
      });
    }
    
    // Redirect to booking in same window
    window.location.href = 'https://www.fresha.com/a/milka-collective-brighton-melbourne-229-bay-street-m4vife5o/all-offer?menu=true&pId=1089926';
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-pink-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full filter blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-rose-100 to-pink-100 rounded-full filter blur-3xl opacity-20" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
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
            <Play className="w-5 h-5 text-pink-500" />
            <span className="text-pink-600 font-medium uppercase tracking-widest text-sm">See The Magic</span>
            <Play className="w-5 h-5 text-pink-500" />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-6">
            Watch Your
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400"> Transformation </span>
            Unfold
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Go behind the scenes and see exactly how we create stunning lash transformations. 
            Each technique is carefully crafted to enhance your natural beauty.
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-xl border border-pink-100 hover:shadow-2xl transition-all duration-300"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-square overflow-hidden">
                {playingVideo === video.id ? (
                  <iframe
                    src={video.embedUrl}
                    className="w-full h-full border-0"
                    frameBorder="0"
                    scrolling="no"
                    allow="encrypted-media"
                    title={video.title}
                  />
                ) : (
                  <div 
                    className="relative w-full h-full bg-gradient-to-br from-pink-100 to-rose-100 cursor-pointer group"
                    onClick={() => handleVideoClick(video.id)}
                  >
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white/90 backdrop-blur-sm rounded-full p-6 shadow-xl group-hover:bg-white transition-all"
                      >
                        <Play className="w-8 h-8 text-pink-600 ml-1" fill="currentColor" />
                      </motion.div>
                    </div>
                    
                    {/* Video Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <div className="flex items-center gap-2 text-white text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{video.duration}</span>
                        <span className="ml-auto bg-pink-500 px-2 py-1 rounded-full text-xs">
                          {video.technique.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Details */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {video.title}
                  </h3>
                  <p className="text-pink-600 font-medium mb-3">
                    {video.subtitle}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                {/* Popularity Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-orange-700 bg-orange-50 px-3 py-1 rounded-full">
                    {video.popularity}
                  </span>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-pink-500" />
                    What You'll See:
                  </h4>
                  <ul className="space-y-2">
                    {video.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={() => handleBookNow(video.technique)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium rounded-full transition-all luxury-shadow"
                >
                  Book This Style
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-pink-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Still Deciding Which Style is Right for You?
            </h3>
            <p className="text-gray-600 mb-6">
              Book a free consultation and let our experts help you choose the perfect lash style for your lifestyle and preferences.
            </p>
            <motion.button
              onClick={() => handleBookNow('consultation')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-secondary text-secondary-foreground px-8 py-3 rounded-full font-medium shadow-lg hover:bg-secondary/80 transition-all"
            >
              Book Free Consultation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}