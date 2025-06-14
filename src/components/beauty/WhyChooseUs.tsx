import { motion } from 'framer-motion';
import { Award, Heart, Shield, Sparkles, Clock, MapPin } from 'lucide-react';

const reasons = [
  {
    icon: Award,
    title: "Master Artists",
    description: "Certified lash technicians with years of experience creating flawless, custom looks",
    gradient: "from-pink-400 to-rose-400"
  },
  {
    icon: Heart,
    title: "Over 95 5-Star Google Reviews",
    description: "Google verified reviews from happy clients with consistently exceptional results",
    gradient: "from-rose-400 to-pink-400"
  },
  {
    icon: Shield,
    title: "Premium Quality",
    description: "Only the finest materials and adhesives for safe, long-lasting extensions",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    icon: Sparkles,
    title: "Luxury Experience",
    description: "Relax in our beautiful studio while we perfect your lashes to perfection",
    gradient: "from-rose-500 to-pink-500"
  },
  {
    icon: Clock,
    title: "Convenient Hours",
    description: "Mon-Thu 10am-8pm, Fri 10am-5pm, Sat 10am-4pm. Closed Sundays & public holidays",
    gradient: "from-pink-400 to-rose-500"
  },
  {
    icon: MapPin,
    title: "Brighton Location",
    description: "Easy to find on Bay Street with nearby parking and public transport",
    gradient: "from-rose-400 to-pink-500"
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-pink-50 to-white relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-pink-100/30 to-rose-100/30 rounded-full filter blur-3xl"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0]
        }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-rose-100/30 to-pink-100/30 rounded-full filter blur-3xl"
      />

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
            <Sparkles className="w-5 h-5 text-pink-500" />
            <span className="text-pink-600 font-medium uppercase tracking-widest text-sm">Why Milka Collective</span>
            <Sparkles className="w-5 h-5 text-pink-500" />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-6">
            Experience the
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400"> Difference</span>
          </h2>
        </motion.div>

        {/* Reasons grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-pink-100">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 bg-gradient-to-r ${reason.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow`}
                >
                  <reason.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                {/* Content */}
                <h3 className="text-xl font-medium text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-600 leading-relaxed">{reason.description}</p>
                
                {/* Hover decoration */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${reason.gradient} rounded-b-2xl`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-xl text-gray-700 font-light max-w-3xl mx-auto">
            Join hundreds of happy clients who trust us with their lashes.
            <span className="block mt-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">
              Your beauty journey starts here.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}