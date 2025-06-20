import { motion, AnimatePresence } from 'framer-motion';
import { Play, Clock, Users, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface VideoItem {
  id: number;
  videoUrl: string;
  videoType: 'vimeo' | 'youtube' | 'html5';
  videoId?: string;
  poster: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  popularity: string;
  highlights: string[];
}

interface VideoItem {
  id: number;
  videoUrl: string;
  poster?: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  popularity: string;
  highlights: string[];
  technique: 'classic' | 'hybrid' | 'volume';
  videoType?: 'youtube' | 'vimeo' | 'html5';
  videoId?: string;
}

const videos: VideoItem[] = [
  {
    id: 1,
    videoUrl: "https://vimeo.com/1095029463",
    videoId: "1095029463",
    videoType: 'vimeo',
    poster: "https://vumbnail.com/1095029463.jpg",
    title: "Classic Lash Transformation",
    subtitle: "Natural Elegance That Enhances Your Beauty",
    description: "Watch as we create the perfect everyday look with our signature classic technique. One extension per natural lash for subtle length and definition that looks effortlessly beautiful.",
    duration: "1:15",
    popularity: "Most Popular",
    highlights: [
      "One extension per natural lash",
      "Natural, defined look",
      "Perfect for everyday wear",
      "Lasts 2-3 weeks"
    ],
    technique: 'classic'
  },
  {
    id: 2,
    videoUrl: "https://vimeo.com/1095029345",
    videoId: "1095029345",
    videoType: 'vimeo',
    poster: "https://vumbnail.com/1095029345.jpg",
    title: "Hybrid Lash Transformation", 
    subtitle: "The Perfect Balance of Natural & Glamorous",
    description: "Discover why hybrid lashes are our most requested service. Combining classic and volume techniques for fuller lashes that still look naturally beautiful.",
    duration: "1:30",
    popularity: "Trending",
    highlights: [
      "Mix of classic and volume lashes",
      "Fuller, wispy look",
      "Great for special occasions",
      "Lasts 3-4 weeks"
    ],
    technique: 'hybrid'
  },
  {
    id: 3,
    videoUrl: "https://vimeo.com/1095029437",
    videoId: "1095029437",
    videoType: 'vimeo',
    poster: "https://vumbnail.com/1095029437.jpg",
    title: "Russian Volume Lash Transformation",
    subtitle: "Maximum Impact for a Show-Stopping Look",
    description: "Experience the ultimate in lash luxury with our Russian volume lashes. Multiple lightweight extensions per natural lash create a dramatic, full look that lasts.",
    duration: "2:15",
    popularity: "New",
    highlights: [
      "Multiple lightweight extensions per lash",
      "Dramatic, full look with a feather-light feel",
      "Fully customizable density",
      "Lasts 4-6 weeks with proper care"
    ],
    technique: 'volume'
  }
];

function VideoPlayer({ video, isPlaying, onClose }: { 
  video: VideoItem; 
  isPlaying: boolean; 
  onClose: () => void; 
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, onClose]);

  useEffect(() => {
    if (!isPlaying || !containerRef.current) return;

    // Create wrapper div with aspect ratio
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.paddingBottom = '56.25%';
    wrapper.style.height = '0';
    wrapper.style.overflow = 'hidden';
    wrapper.style.maxWidth = '100%';
    wrapper.style.borderRadius = '0.5rem';
    wrapper.style.backgroundColor = '#000';
    
    // Create iframe with Vimeo embed
    const iframe = document.createElement('iframe');
    iframe.src = `https://player.vimeo.com/video/${video.videoId}?h=7db050aa1f&badge=0&autopause=0&player_id=0&app_id=58479`;
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    
    wrapper.appendChild(iframe);
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(wrapper);
    setIsReady(true);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [isPlaying, video.videoId]);

  if (!isPlaying) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl mx-auto bg-black rounded-xl overflow-hidden aspect-video"
        onClick={e => e.stopPropagation()}
        ref={containerRef}
      >
        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white">Loading video...</div>
          </div>
        )}
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
          aria-label="Close video"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}

        </h3>
        <p className="text-pink-600 font-medium mb-3">
          {video.subtitle}
        </p>
        <p className="text-gray-600 mb-4">
          {video.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{video.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{video.popularity}</span>
          </div>
        </div>
        
        {video.highlights && video.highlights.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium text-gray-900 mb-2">Highlights:</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {video.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-pink-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export  const VideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleVideoClick = (video: VideoItem) => {
    setSelectedVideo(video);
    setIsPlaying(true);
    document.body.style.overflow = 'hidden';
    // Trigger confetti effect if available
    if (typeof window !== 'undefined' && (window as any).confetti) {
      (window as any).confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleCloseVideo = () => {
    setIsPlaying(false);
    document.body.style.overflow = '';
  };
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
                <div 
                  className="relative w-full h-full cursor-pointer group"
                  onClick={() => {
                    console.log('Opening video player for:', video.id, video.videoUrl);
                    setPlayingVideo(video.id);
                    
                    // Track video click with GTM
                    if (typeof window !== 'undefined' && (window as any).dataLayer) {
                      (window as any).dataLayer.push({
                        event: 'video_click',
                        click_type: 'local_video',
                        video_url: video.videoUrl,
                        video_title: video.title
                      });
                    }
                  }}
                >
                  {/* Video thumbnail using first frame */}
                  <video
                    src={video.videoUrl}
                    preload="metadata"
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    onLoadedMetadata={(e) => {
                      // Set to first frame for thumbnail
                      e.currentTarget.currentTime = 0.1;
                    }}
                    onError={() => {
                      console.log('Video thumbnail failed for:', video.videoUrl);
                    }}
                  />
                  
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  
                  {/* Play Button */}
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
      </div>

      {/* Video Player Modal */}
      {playingVideo && (
        <VideoPlayer
          video={videos.find(v => v.id === playingVideo)!}
          isPlaying={playingVideo !== null}
          onClose={() => setPlayingVideo(null)}
        />
      )}
    </section>
  );
}