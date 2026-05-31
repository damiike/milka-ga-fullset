import { bookingConfig } from '../config/booking';

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating?: number;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText?: string;
  ctaUrl?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface LandingConfig {
  // Hero Section
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  heroImage?: string;
  
  // Features
  features: Feature[];
  
  // Social Proof
  testimonials: Testimonial[];
  trustIndicators?: {
    text: string;
    count?: string;
  };
  
  // Pricing (optional)
  pricingPlans?: PricingPlan[];
  
  // FAQ
  faq?: FAQ[];
  
  // SEO
  seo: {
    title: string;
    description: string;
    ogImage: string;
  };
  
  // Theme
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
  };
}

export const landingConfigs = {
  beauty: {
    title: 'Luxury Lash Extensions',
    subtitle: 'Enhance Your Natural Beauty',
    description: 'Experience premium lash extensions that highlight your natural beauty. Our expert stylists create custom looks tailored just for you.',
    ctaText: 'Book Your Appointment',
    ctaUrl: '#booking',
    heroImage: '/images/beauty/hero.jpg',
    
    features: [
      {
        icon: 'sparkles',
        title: 'Custom Designs',
        description: 'Tailored lash extensions to match your unique eye shape and style.'
      },
      {
        icon: 'shield-check',
        title: 'Premium Quality',
        description: 'We use only the highest quality, lightweight extensions for a natural look.'
      },
      {
        icon: 'clock',
        title: 'Quick Application',
        description: 'Our expert technicians provide efficient service with stunning results.'
      }
    ],
    
    testimonials: [
      {
        name: 'Sarah Johnson',
        role: 'Loyal Client',
        company: '',
        content: 'The best lash extensions I\'ve ever had! They look so natural and last for weeks.',
        rating: 5
      },
      {
        name: 'Michaela Smith',
        role: 'First-time Client',
        company: 'Melbourne',
        content: 'Milka is a true artist! My classic lashes look so natural, people think they\'re my real lashes. Highly recommend!',
        rating: 5
      },
      {
        name: "Claire B.",
        role: "Regular Client",
        company: "Brighton",
        content: "The studio is beautiful, always clean, and the service is exceptional. I wouldn't trust anyone else with my lashes!",
        rating: 5
      }
    ],
    
    trustIndicators: {
      text: "Over",
      count: "105+ ⭐⭐⭐⭐⭐"
    },
    
    pricing: [
      {
        name: "Classic Sets",
        price: "$90",
        period: "starting from",
        description: "Natural, elegant lash extensions",
        features: [
          "Natural Classic Set - $140",
          "Full Classic Set - $160",
          "Half Classic Set - $90",
          "Perfect for everyday wear",
          "Lasts 2-3 weeks"
        ],
        ctaText: "Book Classic Set",
        ctaUrl: bookingConfig.bookingUrl
      },
      {
        name: "Volume Sets",
        price: "$185",
        period: "starting from",
        description: "Dramatic, voluminous lashes",
        features: [
          "Russian Volume Natural Set - $185",
          "Full Russian Volume Set - $210",
          "Full Mega Russian Volume Set - $295",
          "Maximum impact & drama",
          "Long-lasting results"
        ],
        ctaText: "Book Volume Set",
        ctaUrl: bookingConfig.bookingUrl
      },
      {
        name: "Specialty Sets",
        price: "$180",
        period: "starting from",
        description: "Unique styles for every occasion",
        features: [
          "Full Hybrid Set - $185 (Most Popular)",
          "Wet Look Full Set - $180",
          "Trending styles available",
          "Custom styling consultation",
          "Perfect for special events"
        ],
        highlighted: true,
        ctaText: "Book Specialty",
        ctaUrl: bookingConfig.bookingUrl
      },
      {
        name: "Add-Ons",
        price: "$20",
        period: "starting from",
        description: "Enhance any lash set",
        features: [
          "Bottom Lashes Add-On - $60",
          "Wispy Add-On - $20",
          "Can be added to any set",
          "Customise your look",
          "Complimentary consultation"
        ],
        ctaText: "View Add-Ons",
        ctaUrl: bookingConfig.bookingUrl
      }
    ],
    
    faq: [
      {
        question: "What types of lash extensions do you offer?",
        answer: "We offer a complete range of lash extension styles from natural to ultra-dramatic. Each service is customized to your eye shape and desired look. Browse our individual service FAQs below to learn more about each option."
      },
      {
        question: "How do I care for my lash extensions?",
        answer: "For beautiful, long-lasting lash extensions, please follow these care instructions:\n\n1. Keep them dry for the first 24 hours after application to allow the adhesive to fully cure\n2. Clean your lashes gently every 2-3 days with an oil-free, lash-safe cleanser\n3. Brush daily with a clean spoolie to keep them looking neat and separated\n4. Avoid oil-based products near your eyes as they can break down the adhesive\n5. Sleep on your back or side to prevent crushing your lashes\n6. Avoid rubbing, pulling, or playing with your extensions\n7. Schedule regular infills every 2-3 weeks to maintain a full look\n\nIf you have any questions about lash care or experience any irritation, please don't hesitate to contact us. Our lash experts are always happy to help!"
      },
      {
        question: "How should I prepare for my lash appointment?",
        answer: "To ensure the best results from your lash extensions, please follow these pre-appointment guidelines:\n\n1. Arrive with clean, makeup-free eyes (no mascara, eyeliner, or eyeshadow)\n2. Remove contact lenses before your appointment if you wear them\n3. Avoid caffeine for 2 hours before your appointment to minimize eye movement\n4. Plan to keep your eyes closed and relaxed for 1.5-2 hours during application\n5. Wear comfortable clothing as you'll be lying down for an extended period\n6. Avoid using oil-based products on your face for 24 hours before your appointment\n7. Consider bringing headphones to listen to music or a podcast during the treatment\n\nIf you have any questions or need to reschedule, please contact us at least 24 hours in advance."
      },
      {
        question: "Where is Milka Collective located?",
        answer: "We're located at 2/229 Bay St, Brighton VIC 3186. Open Monday to Saturday. Call 0480095789 or click on any 'Book Now' button to make an appointment."
      },
      {
        question: "Do you offer gift vouchers?",
        answer: "Yes! Gift vouchers are available for any service or amount. Perfect for birthdays, special occasions, or treating someone special. To purchase a gift voucher, simply click on any 'Book Now' button and select 'Gift Card' as the purchase option during checkout."
      },
      {
        question: "What is a Natural Classic Set?",
        answer: "Perfect for everyday elegance. One extension applied to each natural lash for a subtle, natural enhancement. Ideal for first-timers or those who prefer a refined, understated look that enhances your natural beauty without being obvious. Lasts 2-3 weeks with proper care."
      },
      {
        question: "What is a Full Classic Set?",
        answer: "Enhanced natural beauty. A fuller classic application covering more lashes for increased definition while maintaining a natural appearance. Perfect for those who want noticeable enhancement that still looks effortlessly natural. Lasts 2-3 weeks with proper care."
      },
      {
        question: "What is a Half Classic Set?",
        answer: "Subtle enhancement. Targeted application on key areas to add definition and length where you need it most. Great for those with naturally full lashes who want a light touch of glamour. Perfect for trying lash extensions for the first time."
      },
      {
        question: "What is a Full Hybrid Set?",
        answer: "The perfect balance. A sophisticated blend of classic and volume techniques that creates fullness while maintaining natural elegance. Our most requested service - ideal for any occasion and perfect for those who can't decide between natural and dramatic. Gives you the best of both worlds."
      },
      {
        question: "What is a Wet Look Full Set?",
        answer: "Trendy glossy finish. Achieves the coveted 'wet look' with a glossy, defined finish that mimics the appearance of freshly applied mascara. Perfect for those who love the fresh, dewy lash trend that's popular on social media."
      },
      {
        question: "What is Natural Russian Volume?",
        answer: "Soft, full glamour. Multiple lightweight extensions create natural-looking fullness without heaviness. Perfect for adding volume while maintaining a soft, natural appearance. Great for those who want more fullness but still want to look natural."
      },
      {
        question: "What is Full Russian Volume?",
        answer: "Dramatic impact. Full, bold volume that creates maximum impact and glamour. Ideal for special occasions or those who love a dramatic, eye-catching look. Perfect for events, photoshoots, or if you love bold, statement lashes."
      },
      {
        question: "What is Mega Russian Volume?",
        answer: "Ultra-luxurious drama. Our most dramatic service featuring ultra-full, feathery lashes with maximum volume and length. Perfect for photo shoots, special events, or those who want the most glamorous look possible. The ultimate in lash luxury and drama."
      },
      {
        question: "What are Bottom Lashes?",
        answer: "Bottom lash extensions add definition and balance to your look by enhancing your lower lash line. Perfect for special occasions, photoshoots, or if you want maximum eye impact. Can be added to any full set service for a complete, dramatic transformation."
      },
      {
        question: "What is Wispy Style?",
        answer: "A trendy styling technique that creates a textured, feathery look with varying lengths for a naturally wispy appearance. This add-on can be applied to any lash set to create a more dimensional, Instagram-worthy finish that's perfect for those who love a modern, effortless look."
      }
    ],
    
    seo: {
      title: "Milka Collective | Lash Extensions Brighton | 105+ 5-Star Reviews",
      description: "Brighton's premier lash extension and beauty salon. Professional service with over 105 five-star reviews.",
      ogImage: "/og-milka-beauty.png"
    },
    
    theme: {
      primaryColor: "neutral",
      accentColor: "champagne"
    }
  }
};