import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, X } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { getImageUrl } from '../../config/assets';
import { useConfetti } from '../../hooks/useConfetti';
import { bookingConfig, generateBookingUrl } from '../../config/booking';
import { captureLpBookNow } from '../../lib/lp-booking-analytics';

interface VideoItem {
  id: number;
  vimeoId: string;
  vimeoHash: string;
  poster: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  technique: 'classic' | 'hybrid' | 'volume';
}

const videos: VideoItem[] = [
  {
    id: 1,
    vimeoId: "1095029463",
    vimeoHash: "db83b90006",
    poster: getImageUrl("photos/IMG_5637.png"),
    title: "Classic Lash Transformation",
    subtitle: "Natural Elegance That Enhances Your Beauty",
    description: "Watch as we create the perfect everyday look with our signature classic technique. One extension per natural lash for subtle length and definition that looks effortlessly beautiful.",
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
    vimeoId: "1096479714",
    vimeoHash: "0c6e781285",
    poster: getImageUrl("photos/IMG_5400.png"),
    title: "Hybrid Lash Transformation", 
    subtitle: "The Perfect Balance of Natural & Glamorous",
    description: "Discover why hybrid lashes are our most requested service. Combining classic and volume techniques for fuller lashes that still look naturally beautiful.",
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
    vimeoId: "1095029437",
    vimeoHash: "a86d6a75e1",
    poster: getImageUrl("photos/IMG_5258.png"),
    title: "Russian Volume Lash Transformation",
    subtitle: "Maximum Impact for a Show-Stopping Look",
    description: "Experience the ultimate in lash luxury with our Russian volume lashes. Multiple lightweight extensions per natural lash create a dramatic, full look that lasts.",
    highlights: [
      "Multiple lightweight extensions per lash",
      "Dramatic, full look with a feather-light feel",
      "Perfect for glamorous events",
      "Lasts 4-6 weeks with proper care"
    ],
    technique: 'volume'
  }
];

// High-performance image component with WebP support and lazy loading
function OptimizedImage({ src, alt, className, onLoad }: {
  src: string;
  alt: string;
  className: string;
  onLoad?: () => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate WebP version of the image URL
  const getWebPUrl = (originalSrc: string) => {
    return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  };

  // Generate different sizes for responsive images
  const getSrcSet = (originalSrc: string) => {
    const webpSrc = getWebPUrl(originalSrc);
    return `${webpSrc} 1x, ${webpSrc} 2x`;
  };

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Let the browser handle srcset loading
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(img);
    return () => observer.disconnect();
  }, [src]);

  return (
    <div className="relative w-full h-full">
      {/* Blur placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-sm" />
      )}
      
      <picture>
        {/* WebP source for modern browsers */}
        <source 
          srcSet={isLoaded ? getSrcSet(src) : ''} 
          type="image/webp"
        />
        {/* Fallback for older browsers */}
        <img
          ref={imgRef}
          src={isLoaded ? src : ''}
          alt={alt}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
          onLoad={() => {
            setIsLoaded(true);
            onLoad?.();
          }}
          onError={() => setHasError(true)}
          loading="lazy"
          decoding="async"
          width="400"
          height="400"
        />
      </picture>
      
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Image unavailable</span>
        </div>
      )}
    </div>
  );
}

function VimeoPlayer({ video, isPlaying, onClose }: { 
  video: VideoItem; 
  isPlaying: boolean; 
  onClose: () => void; 
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enhanced keyboard and touch event handling
  useEffect(() => {
    if (!isPlaying) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Prevent scroll on mobile when modal is open - preserve scroll position
    const scrollY = window.scrollY;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPosition = window.getComputedStyle(document.body).position;
    
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      
      // Restore scroll position
      document.body.style.overflow = originalStyle;
      document.body.style.position = originalPosition;
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Restore scroll position after removing fixed positioning
      window.scrollTo(0, scrollY);
    };
  }, [isPlaying, onClose]);

  // Enhanced iframe loading with error handling
  useEffect(() => {
    if (!isPlaying) return;
    
    setIsLoading(true);
    setHasError(false);
    
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Longer timeout for mobile networks
    
    const errorTimer = setTimeout(() => {
      if (isLoading) {
        setHasError(true);
        setIsLoading(false);
      }
    }, 8000); // Error if takes too long
    
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(errorTimer);
    };
  }, [isPlaying, isLoading]);

  // Handle touch events for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  }, [onClose]);

  if (!isPlaying) return null;

  // Enhanced Vimeo URL with mobile optimizations and portrait support
  const vimeoEmbedUrl = `https://player.vimeo.com/video/${video.vimeoId}?h=${video.vimeoHash}&autoplay=1&title=0&byline=0&portrait=0&badge=0&dnt=1&muted=1&playsinline=1&responsive=1&autopause=0&background=0${isMobile ? '&controls=1' : ''}`;

  return (
    <motion.div
      ref={modalRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
      onTouchStart={handleTouchStart}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
        className="relative w-full mx-auto bg-black rounded-xl sm:rounded-2xl overflow-hidden"
        style={{ 
          aspectRatio: isMobile ? '9/16' : '16/9',
          maxHeight: '90vh',
          maxWidth: isMobile ? '400px' : '1200px',
          width: isMobile ? '90vw' : '95vw'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Vimeo iframe with enhanced mobile support */}
        {!hasError && (
          <iframe
            ref={iframeRef}
            src={vimeoEmbedUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            style={{ objectFit: 'contain' }}
            title={video.title}
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        )}
        

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="text-center text-white p-6">
              <div className="text-4xl mb-4">⚠️</div>
              <div className="text-xl mb-2">Video Error</div>
              <div className="text-white/70 mb-4">Unable to load video. Please check your connection.</div>
              <button 
                onClick={() => {
                  setHasError(false);
                  setIsLoading(true);
                }}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-[#1a1a1a] transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}
        
        {/* Enhanced close button with better mobile touch targets */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/70 text-white p-3 rounded-full hover:bg-black/90 transition-colors z-20 touch-manipulation"
          style={{ minWidth: '44px', minHeight: '44px' }} // WCAG touch target size
          aria-label="Close video"
        >
          <X className="w-5 h-5" />
        </button>

      </motion.div>
    </motion.div>
  );
}

export const VideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const { triggerConfetti } = useConfetti();

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Track section view
  useEffect(() => {
    if (hasTrackedView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          setHasTrackedView(true);

          // Track section view with GTM
          if (typeof window !== 'undefined' && (window as any).dataLayer) {
            (window as any).dataLayer.push({
              event: 'section_view',
              section_name: 'video_showcase',
              event_category: 'Engagement',
              event_action: 'Section View',
              event_label: 'Video Showcase'
            });
          }

          // Track section view with PostHog
          if (typeof window !== 'undefined' && (window as any).posthog) {
            (window as any).posthog.capture('section_view', {
              section_name: 'video_showcase',
              video_count: videos.length,
              videos_available: videos.map(v => v.technique)
            });
          }
        }
      },
      { threshold: 0.3 }
    );

    const section = document.querySelector('[data-section="video-showcase"]');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [hasTrackedView]);

  const handleVideoClick = useCallback((video: VideoItem) => {
    setSelectedVideo(video);
    setIsPlaying(true);
    
    // Trigger confetti effect if available and motion is allowed
    if (!prefersReducedMotion && typeof window !== 'undefined' && (window as any).confetti) {
      (window as any).confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    }

    // Track video play event with GTM
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'video_play',
        video_title: video.title,
        video_technique: video.technique,
        video_id: video.vimeoId,
        event_category: 'Video',
        event_action: 'Play',
        event_label: video.title
      });
    }

    // Track video play event with PostHog
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture('video_play', {
        video_title: video.title,
        video_technique: video.technique,
        video_id: video.vimeoId,
        section: 'video_showcase'
      });
    }
  }, [prefersReducedMotion]);

  const handleCloseVideo = useCallback(() => {
    setIsPlaying(false);
    setSelectedVideo(null);

    // Track video close event with GTM
    if (selectedVideo && typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'video_close',
        video_title: selectedVideo.title,
        video_technique: selectedVideo.technique,
        video_id: selectedVideo.vimeoId,
        event_category: 'Video',
        event_action: 'Close',
        event_label: selectedVideo.title
      });
    }

    // Track video close event with PostHog
    if (selectedVideo && typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture('video_close', {
        video_title: selectedVideo.title,
        video_technique: selectedVideo.technique,
        video_id: selectedVideo.vimeoId,
        section: 'video_showcase'
      });
    }
  }, [selectedVideo]);

  const handleBookNow = useCallback((technique: string, videoTitle: string) => {
    // Trigger confetti animation
    triggerConfetti();
    
    if (typeof window !== 'undefined' && (window as any).posthog) {
      captureLpBookNow((window as any).posthog, {
        click_type: 'video_showcase',
        video_technique: technique,
        video_title: videoTitle,
        button_text: 'Book This Style',
        source_section: 'video_showcase',
        conversion_type: 'booking_intent',
        event_category: 'Conversion',
        event_action: 'Booking Click',
        event_label: `${technique} - ${videoTitle}`,
      });
    }
    
    // Redirect to booking with analytics
    window.location.href = generateBookingUrl();
  }, [triggerConfetti]);

  return (
    <section 
      className="py-24 section-base border-t border-border"
      data-section="video-showcase"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-4">See The Magic</p>
          <h2 className="text-foreground mb-4">Watch Your Transformation Unfold</h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch real lash transformations from our Brighton studio — classic, hybrid and Russian volume techniques crafted to suit your eye shape.
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? {} : { delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-card rounded-2xl overflow-hidden shadow-xl border border-border hover:shadow-2xl transition-all duration-300 group flex flex-col h-full"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-square overflow-hidden">
                <div 
                  className="relative w-full h-full cursor-pointer touch-manipulation"
                  onClick={() => handleVideoClick(video)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Play ${video.title} video`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleVideoClick(video);
                    }
                  }}
                >
                  <OptimizedImage
                    src={video.poster}
                    alt={`${video.title} - ${video.subtitle}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Light overlay with centered play button - always visible */}
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px] flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/20">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 text-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Enhanced hover overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div 
                      className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center shadow-xl border border-border"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 text-foreground ml-1" fill="currentColor" />
                    </motion.div>
                  </div>


                </div>
              </div>

              {/* Video Info */}
              <div className="p-4 sm:p-6 flex flex-col flex-grow">
                {/* Title and Description Section - Fixed Heights */}
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 leading-tight min-h-[3rem]">{video.title}</h3>
                  <p className="text-muted-foreground font-medium mb-3 text-sm sm:text-base min-h-[1.5rem]">{video.subtitle}</p>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">{video.description}</p>
                </div>
                
                
                {/* Key Benefits Section - Flexible Height */}
                {video.highlights && video.highlights.length > 0 && (
                  <div className="mb-6 flex-grow">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {video.highlights.slice(0, 3).map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Sparkles className="w-4 h-4 text-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Button Section - Always at Bottom */}
                
                <motion.button
                  onClick={() => handleBookNow(video.technique, video.title)}
                  className="w-full bg-primary text-primary-foreground py-3 sm:py-4 px-6 rounded-md font-medium transition-colors duration-200 touch-manipulation text-sm sm:text-base cursor-pointer mt-auto hover:bg-[#1a1a1a]"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                  style={{ minHeight: '44px' }}
                >
                  <span className="flex items-center justify-center gap-2">
                    Book This Style
                    <span className="text-lg">✨</span>
                  </span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Vimeo Player Modal */}
      <AnimatePresence>
        {isPlaying && selectedVideo && (
          <VimeoPlayer 
            video={selectedVideo} 
            isPlaying={isPlaying} 
            onClose={handleCloseVideo} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};
