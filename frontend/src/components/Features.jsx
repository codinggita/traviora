import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  ShieldCheck,
  Zap,
  HeartPulse,
  ScanLine,
  Users,
} from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Safety Routes',
    description:
      'AI-generated walking paths optimized for well-lit, populated areas based on real-time data.',
    color: 'from-sky-500/20 to-sky-500/5',
    iconColor: 'text-sky-400',
    glow: 'hover:shadow-sky-500/20',
    border: 'hover:border-sky-500/40',
  },
  {
    icon: Zap,
    title: 'PowerSpot',
    description:
      'Locate verified charging stations and secure Wi-Fi networks in emergency situations.',
    color: 'from-amber-500/20 to-amber-500/5',
    iconColor: 'text-amber-400',
    glow: 'hover:shadow-amber-500/20',
    border: 'hover:border-amber-500/40',
  },
  {
    icon: HeartPulse,
    title: 'MediTrust',
    description:
      'Instant access to English-speaking, vetted medical professionals and 24/7 tele-health.',
    color: 'from-rose-500/20 to-rose-500/5',
    iconColor: 'text-rose-400',
    glow: 'hover:shadow-rose-500/20',
    border: 'hover:border-rose-500/40',
  },
  {
    icon: ScanLine,
    title: 'MenuLens',
    description:
      'Point your camera to instantly translate menus and identify hidden allergens based on your profile.',
    color: 'from-violet-500/20 to-violet-500/5',
    iconColor: 'text-violet-400',
    glow: 'hover:shadow-violet-500/20',
    border: 'hover:border-violet-500/40',
  },
  {
    icon: Users,
    title: 'LocalVibe',
    description:
      'Discover inclusive, highly-rated local spots vetted by the solo travel community.',
    color: 'from-emerald-500/20 to-emerald-500/5',
    iconColor: 'text-emerald-400',
    glow: 'hover:shadow-emerald-500/20',
    border: 'hover:border-emerald-500/40',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function FeatureCard({ feature, index }) {
  const Icon = feature.icon;
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`glass-card rounded-2xl p-6 flex flex-col gap-4 border border-white/7 cursor-default
        hover:shadow-2xl ${feature.glow} ${feature.border}
        hover:border transition-all duration-300 group relative overflow-hidden`}
    >
      {/* Gradient top accent */}
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${feature.color}`} />

      <div
        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}
      >
        <Icon size={20} className={feature.iconColor} strokeWidth={1.8} />
      </div>

      <div>
        <h3 className="text-white font-semibold text-base mb-2">{feature.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="safety"
      className="py-28 px-6 lg:px-8 max-w-7xl mx-auto"
      ref={ref}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-center mb-16"
      >
        <p className="text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-3">
          Toolkit
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Intelligent Travel Toolkit
        </h2>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Everything you need to navigate unfamiliar places with confidence.
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {features.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
