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
        role: 'Loyal Customer',
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
        role: "Regular Customer",
        company: "Brighton",
        content: "The studio is beautiful, always clean, and the service is exceptional. I wouldn't trust anyone else with my lashes!",
        rating: 5
      }
    ],
    
    trustIndicators: {
      text: "Over",
      count: "90+ ⭐⭐⭐⭐⭐"
    },
    
    pricing: [
      {
        name: "Classic Sets",
        price: "$80",
        period: "starting from",
        description: "Natural, elegant lash extensions",
        features: [
          "Natural Classic Set - $135",
          "Full Classic Set - $155",
          "Half Classic Set - $80",
          "Perfect for everyday wear",
          "Lasts 2-3 weeks"
        ],
        ctaText: "Book Classic Set",
        ctaUrl: "https://www.fresha.com/a/milka-collective-brighton-melbourne-229-bay-street-m4vife5o/all-offer?menu=true&pId=1089926"
      },
      {
        name: "Volume Sets",
        price: "$185",
        period: "starting from",
        description: "Dramatic, voluminous lashes",
        features: [
          "Natural Russian Volume - $185",
          "Full Russian Volume - $210",
          "Mega Russian Volume - $295",
          "Maximum impact & drama",
          "Long-lasting results"
        ],
        highlighted: true,
        ctaText: "Book Volume Set",
        ctaUrl: "https://www.fresha.com/a/milka-collective-brighton-melbourne-229-bay-street-m4vife5o/all-offer?menu=true&pId=1089926"
      },
      {
        name: "Specialty Sets",
        price: "$170",
        period: "starting from",
        description: "Unique styles for every occasion",
        features: [
          "Wet Look Full Set - $170",
          "Full Hybrid Set - $185",
          "Trending styles available",
          "Custom styling consultation",
          "Perfect for special events"
        ],
        ctaText: "Book Specialty",
        ctaUrl: "https://www.fresha.com/a/milka-collective-brighton-melbourne-229-bay-street-m4vife5o/all-offer?menu=true&pId=1089926"
      },
      {
        name: "Add-Ons",
        price: "$20",
        period: "starting from",
        description: "Enhance any lash set",
        features: [
          "Bottom Lashes - $60",
          "Wispy Style - $20",
          "Can be added to any set",
          "Customize your look",
          "Complimentary consultation"
        ],
        ctaText: "View Add-Ons",
        ctaUrl: "https://www.fresha.com/a/milka-collective-brighton-melbourne-229-bay-street-m4vife5o/all-offer?menu=true&pId=1089926"
      }
    ],
    
    faq: [
      {
        question: "What are the different types of lash extensions available?",
        answer: "We offer several lash extension styles to suit your desired look:\n\n### 1. Classic Lashes\n**Look:** Natural and subtle enhancement  \n**Application:** One extension applied to each natural lash  \n**Best for:** First-timers or those who prefer a natural, everyday look  \n**Maintenance:** Infills recommended every 2-3 weeks  \n![Classic Lashes](https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80)\n\n### 2. Hybrid Lashes\n**Look:** Balance between natural and dramatic  \n**Application:** Mix of classic and volume techniques  \n**Best for:** Adding fullness while maintaining a natural appearance  \n**Maintenance:** Infills recommended every 2-3 weeks  \n![Hybrid Lashes](https://images.unsplash.com/photo-1515886653613-034df15bb0c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80)\n\n### 3. Volume Lashes\n**Look:** Full, dramatic, and glamorous  \n**Application:** Multiple lightweight extensions (2-6) per natural lash  \n**Best for:** Special occasions or those who love a bold look  \n**Maintenance:** Infills recommended every 2-3 weeks  \n![Volume Lashes](https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80)\n\n### 4. Mega Volume Lashes\n**Look:** Ultra-dramatic and feathery  \n**Application:** Multiple lightweight fans (5+ extensions per lash)  \n**Best for:** Special events or those who love maximum impact  \n**Maintenance:** Infills recommended every 2-3 weeks  \n![Mega Volume Lashes](https://images.unsplash.com/photo-1524504388940-b1c172265116?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80)\n\n**Not sure which style to choose?** Book a consultation and our lash artists will help you select the perfect look for your eye shape and lifestyle!"
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
      }
    ],
    
    seo: {
      title: "Milka Collective | Lash Extensions Brighton | 95+ 5-Star Reviews",
      description: "Brighton's premier lash extension and beauty salon. Professional service with over 95 five-star reviews.",
      ogImage: "/og-milka-beauty.png"
    },
    
    theme: {
      primaryColor: "pink",
      accentColor: "rose"
    }
  }
};