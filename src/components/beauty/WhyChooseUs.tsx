import { Award, Heart, Shield, Sparkles, Clock, MapPin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { LP_GOOGLE_REVIEW_TRUST } from '../../data/lp-trust-copy';

const reasons: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Award,
    title: 'Master Artists',
    description: 'Certified lash technicians with years of experience creating flawless, custom looks',
  },
  {
    icon: Heart,
    title: LP_GOOGLE_REVIEW_TRUST.whyChooseTitle,
    description: 'Google verified reviews from happy clients with consistently exceptional results',
  },
  {
    icon: Shield,
    title: 'Premium Quality',
    description: 'Only the finest materials and adhesives for safe, long-lasting extensions',
  },
  {
    icon: Sparkles,
    title: 'Luxury Experience',
    description: 'Relax in our beautiful studio while we perfect your lashes to perfection',
  },
  {
    icon: Clock,
    title: 'Convenient Hours',
    description: 'Mon–Thu 10am–8pm, Fri 10am–5pm, Sat 10am–4pm. Closed Sundays and public holidays.',
  },
  {
    icon: MapPin,
    title: 'Brighton Location',
    description: '2/229 Bay St — easy parking and tram access, five minutes from the beach.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 section-base border-t border-border">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="eyebrow mb-4">Why Milka Collective</p>
          <h2 className="text-foreground mb-4">Experience the Difference</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div key={reason.title} className="group h-full">
                <div className="pro-card h-full flex flex-col">
                  <div className="w-12 h-12 bg-muted border border-border rounded-sm flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-foreground" strokeWidth={1.25} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-medium text-foreground mb-3 min-h-[3rem] leading-tight">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center mt-16 text-xl text-muted-foreground font-light max-w-3xl mx-auto">
          Join hundreds of happy clients who trust us with their lashes.
        </p>
      </div>
    </section>
  );
}
