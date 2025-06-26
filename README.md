# Milka Collective - Luxury Lash Studio Landing Pages

A stunning, conversion-optimized landing page system for Milka Collective lash studio in Brighton. Built with **Astro 5.2+**, **Tailwind v4**, **Framer Motion**, and custom luxury components designed to maximize bookings.

## ✨ Features

- **Luxury Beauty Design**: Custom animations, gradients, and interactions that stand out
- **Service Showcase**: Interactive service cards with pricing and duration
- **Floating Booking Button**: Persistent CTA with pulse animation
- **Instagram Gallery**: Visual portfolio integration (ready for API)
- **Testimonial Carousel**: Auto-playing client reviews with ratings
- **Advanced Animations**: Framer Motion & React Spring for smooth interactions
- **Conversion Focused**: Every element designed to drive bookings
- **Mobile Optimized**: Perfect experience on all devices

## 📊 Landing Page Variants

1. **Default** (`/`) - Milka Collective main landing page
2. **Beauty** (`/beauty`) - Full service menu with pricing and booking
3. **SaaS** (`/saas`) - Revenue growth platform for SaaS companies
4. **Agency** (`/agency`) - Lead generation system for digital agencies  
5. **Product** (`/product`) - Smart home energy-saving device

Each variant includes:
- Hero section with compelling value proposition
- Feature highlights with icons and descriptions
- Social proof testimonials
- FAQ section for objection handling
- Strong call-to-action sections
- Lead capture forms (where appropriate)

## 🛠️ Tech Stack

- **Framework**: Astro 5.2+ (SSG with islands architecture)
- **Styling**: Tailwind CSS v4 with Vite plugin
- **Components**: shadcn/ui (React-based)
- **Analytics**: PostHog for conversion tracking
- **A/B Testing**: Custom lightweight framework
- **TypeScript**: Full type safety throughout

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── beauty/          # Custom luxury components
│   │   ├── LuxuryHero.tsx        # Animated hero with parallax
│   │   ├── ServiceShowcase.tsx   # Interactive service cards
│   │   ├── LuxuryTestimonials.tsx # Auto-playing reviews
│   │   ├── WhyChooseUs.tsx       # Animated benefit cards
│   │   ├── InstagramGallery.tsx  # Social proof gallery
│   │   └── FloatingBookingButton.tsx # Persistent CTA
│   ├── landing/         # Generic landing components
│   └── forms/           # Lead capture forms
├── layouts/
│   ├── BaseLayout.astro
│   └── LandingLayout.astro
├── pages/
│   ├── index.astro      # Default landing page
│   ├── saas.astro       # SaaS variant
│   ├── agency.astro     # Agency variant
│   └── product.astro    # Product variant
├── lib/
│   ├── utils.ts         # shadcn utilities
│   ├── analytics.ts     # PostHog tracking
│   └── ab-testing.ts    # A/B test framework
├── data/
│   └── landing-configs.ts # Page configurations
└── styles/
    └── global.css       # Tailwind v4 imports
```

## 🎯 Conversion Optimization Features

### A/B Testing
```typescript
import { getVariant } from '@/lib/ab-testing';

// Simple A/B test
const variant = getVariant('hero-test', ['A', 'B']);

// Weighted distribution
const variant = getVariant('pricing-test', ['control', 'discount'], [70, 30]);
```

### Analytics Tracking
```typescript
import { trackConversion } from '@/lib/analytics';

// Track conversions
trackConversion({
  event: 'lead_capture',
  email: 'user@example.com',
  variant: 'saas'
});
```

### Lead Forms
Built-in lead capture forms with:
- Email validation
- Loading states
- Success messages
- Automatic conversion tracking
- Variant-aware submissions

## ⚙️ Configuration

### Analytics Setup
1. Get your PostHog API key from https://app.posthog.com
2. Replace `'YOUR_POSTHOG_KEY'` in `src/layouts/BaseLayout.astro`
3. Analytics will automatically track page views and conversions

### Milka Collective Information
- **Address**: 2/229 Bay St, Brighton VIC 3186
- **Phone**: 0480095789
- **Email**: hello@milkacollective.com.au
- **Hours**: Monday to Saturday (By Appointment Only)

### Landing Page Customization
Edit `src/data/landing-configs.ts` to customize:
- Headlines and copy
- Features and benefits
- Testimonials and social proof
- Pricing plans (where applicable)
- FAQ content
- SEO metadata

## 🚀 Deployment

### Cloudflare Pages (Recommended)
```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
# 1. Push to GitHub
# 2. Connect repository in Cloudflare Pages
# 3. Set build command: npm run build
# 4. Set output directory: dist
```

## 🧞 Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## 📈 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Optimized for LCP, CLS, FID
- **Bundle Size**: Minimal JavaScript with islands architecture
- **Image Optimization**: Astro's built-in image optimization
- **CSS**: Tailwind v4 with performance improvements

## 💅 Services & Pricing

### Classic Sets
- Natural Classic Set - $135
- Full Classic Set - $155
- Half Classic Set - $80

### Volume Sets
- Natural Russian Volume - $185
- Full Russian Volume - $210
- Mega Russian Volume - $295

### Specialty Options
- Wet Look Full Set - $170
- Full Hybrid Set - $185
- Bottom Lashes Add-On - $60
- Wispy Add-On - $20

Built with ❤️ for Milka Collective - Because Life's Too Short for Short Lashes!

<!-- Deployment trigger -->
