import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { useConfetti } from '../../hooks/useConfetti';

interface InstagramPost {
  id: number;
  image: string;
  caption: string;
}

// Real client work photos from Milka Collective
const posts: InstagramPost[] = [
  {
    id: 1,
    image: "/images/beauty/IMG_4941.jpg",
    caption: "Russian Volume perfection ✨"
  },
  {
    id: 2,
    image: "/images/beauty/0C70369B-5DD1-4E6D-ADD6-DD7BACAA1104.JPG",
    caption: "Natural classic set for everyday glam"
  },
  {
    id: 3,
    image: "/images/beauty/1F35AADC-3C01-48D7-AAE9-52872ECB0860.JPG",
    caption: "The transformation is everything 💕"
  },
  {
    id: 4,
    image: "/images/beauty/5CEDA37A-9CA2-4FEC-AD75-020DDD36610A.JPG",
    caption: "Wet look lashes are trending!"
  },
  {
    id: 5,
    image: "/images/beauty/IMG_4940.jpg",
    caption: "Hybrid perfection - best of both worlds"
  },
  {
    id: 6,
    image: "/images/beauty/IMG_4941.jpg",
    caption: "Mega volume for maximum drama ✨"
  }
];

export function InstagramGallery() {
  const { triggerConfetti } = useConfetti();

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
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
            <Instagram className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium uppercase tracking-widest text-sm">Real Results @milkacollective</span>
            <Instagram className="w-5 h-5 text-primary" />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-light text-foreground mb-6">
            Our Latest
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> Creations</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See our work and get inspired for your next lash appointment
          </p>
        </motion.div>

        {/* Instagram grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12">
          {posts.map((post, index) => (
            <motion.a
              key={post.id}
              href="https://www.fresha.com/a/milka-collective-brighton-melbourne-229-bay-street-m4vife5o/all-offer?menu=true&pId=1089926"
              onClick={() => {
                // Trigger confetti animation
                triggerConfetti();
                
                // Track booking click with GTM
                if (typeof window !== 'undefined' && (window as any).dataLayer) {
                  (window as any).dataLayer.push({
                    event: 'booking_click',
                    click_type: 'instagram_gallery',
                    button_text: 'Book This Look',
                    image_caption: post.caption,
                    image_id: post.id
                  });
                }
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer group block"
            >
              {/* Client work image */}
              <img 
                src={post.image} 
                alt={post.caption}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Subtle hover overlay for booking CTA */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <span className="relative text-white text-sm font-medium group-hover:after:absolute group-hover:after:content-[''] group-hover:after:block group-hover:after:w-full group-hover:after:h-[2px] group-hover:after:bg-white group-hover:after:mt-1">
                  Book This Look
                </span>
              </div>
            </motion.a>
          ))}
        </div>


      </div>
    </section>
  );
}