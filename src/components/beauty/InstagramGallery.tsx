import { motion } from 'framer-motion';
import { useConfetti } from '../../hooks/useConfetti';
import { getImageUrl } from '../../config/assets';
import { bookingConfig, generateBookingUrl } from '../../config/booking';

interface InstagramPost {
  id: number;
  image: string;
  caption: string;
  title: string;
}

// Real client work photos from Milka Collective
const posts: InstagramPost[] = [
  {
    id: 1,
    image: getImageUrl("photos/IMG_5383.png"),
    caption: "Russian Volume perfection for a bold, dramatic look ✨",
    title: "Hybrid"
  },
  {
    id: 2,
    image: getImageUrl("photos/IMG_4941.jpg"),
    caption: "Wet look lashes for a glossy, defined finish",
    title: "Wet Look"
  },
  {
    id: 3,
    image: getImageUrl("photos/0C70369B-5DD1-4E6D-ADD6-DD7BACAA1104.JPG"),
    caption: "Natural classic set for everyday glam",
    title: "Classic"
  },
  {
    id: 4,
    image: getImageUrl("photos/1F35AADC-3C01-48D7-AAE9-52872ECB0860.JPG"),
    caption: "The transformation is everything 💕",
    title: "Hybrid"
  },
  {
    id: 5,
    image: getImageUrl("photos/5CEDA37A-9CA2-4FEC-AD75-020DDD36610A.JPG"),
    caption: "Wet look lashes are trending!",
    title: "Classic"
  },
  {
    id: 6,
    image: getImageUrl("photos/IMG_4940.jpg"),
    caption: "Mega volume for maximum drama ✨",
    title: "Hybrid"
  },
  {
    id: 7,
    image: getImageUrl("photos/395376D9-1963-4F81-A73F-A1949D441530.JPG"),
    caption: "Flawless lash extensions ✨",
    title: "Hybrid"
  },
  {
    id: 8,
    image: getImageUrl("photos/31544E47-DED2-4D2D-B0E0-487808AA2E0C.JPG"),
    caption: "Beautiful lash work ✨",
    title: "Hybrid"
  },
  {
    id: 9,
    image: getImageUrl("photos/IMG_3559.jpg"),
    caption: "Full Russian Volume for maximum drama ✨",
    title: "Full Russian Volume"
  },
  {
    id: 10,
    image: getImageUrl("photos/IMG_3723.png"),
    caption: "Perfect lash application",
    title: "Russian Volume"
  },
  {
    id: 11,
    image: getImageUrl("photos/IMG_3821.PNG"),
    caption: "Gorgeous lash extensions",
    title: "Wet Look"
  },
  {
    id: 12,
    image: getImageUrl("photos/IMG_4023.PNG"),
    caption: "Flawless lash work",
    title: "Russian Volume"
  },
  {
    id: 13,
    image: getImageUrl("photos/IMG_4589.PNG"),
    caption: "Beautiful lash styling",
    title: "Classic"
  },
  {
    id: 14,
    image: getImageUrl("photos/IMG_4655.png"),
    caption: "Perfect lash finish",
    title: "Classic"
  },
  {
    id: 15,
    image: getImageUrl("photos/IMG_5010.jpg"),
    caption: "Stunning lash design",
    title: "Classic"
  },
  {
    id: 16,
    image: getImageUrl("photos/IMG_5119.jpg"),
    caption: "Amazing lash transformation",
    title: "Light Russian Volume"
  },
  {
    id: 17,
    image: getImageUrl("photos/IMG_5258.png"),
    caption: "Professional lash work",
    title: "Russian Volume"
  },
  {
    id: 18,
    image: getImageUrl("photos/IMG_5637.png"),
    caption: "Expert lash application",
    title: "Classic"
  }
];

export function InstagramGallery() {
  const { triggerConfetti } = useConfetti();

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-4">Real Results @milkacollective</p>
          <h2 className="text-foreground mb-4">Our Latest Creations</h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real lash extensions from our Brighton studio — classic, hybrid and volume sets crafted to suit your style.
          </p>
        </motion.div>

        {/* Instagram grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12">
          {posts.map((post, index) => (
            <motion.a
              key={post.id}
              href={generateBookingUrl()}
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
                loading="lazy"
                decoding="async"
                width="400"
                height="400"
              />
              
              {/* Image title overlay - always visible */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <span className="text-white font-medium text-sm md:text-base">
                  {post.title}
                </span>
              </div>
              
              {/* Hover overlay for booking CTA */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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