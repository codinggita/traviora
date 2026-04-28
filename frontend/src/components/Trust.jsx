import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe2, RadioTower, BadgeCheck } from 'lucide-react';

const pillars = [
  {
    icon: Globe2,
    title: 'Radical Inclusivity',
    description:
      'We partner with destinations and businesses that actively welcome all travelers, regardless of identity, background, or ability.',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
  },
  {
    icon: RadioTower,
    title: 'Real-Time Awareness',
    description:
      'Live updates on local conditions, crowd densities, and transit safety scores powered by community consensus and verified sources.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: BadgeCheck,
    title: 'Transparent Vetting',
    description:
      'Every recommendation — medical professional, guide, or local business — undergoes a rigorous, fully transparent review process.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Trust() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      className="relative py-28 px-6 lg:px-8"
      ref={ref}
    >
      {/* Background layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-violet-400 mb-3">
            Our Foundation
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Built on Trust
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Three principles that guide every decision we make.
          </p>
        </motion.div>

        {/* Pillars */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                variants={itemVariants}
                className="text-center px-6 py-10 rounded-2xl glass-card border border-white/7 hover:border-white/15 transition-all duration-300 group"
              >
                <div
                  className={`w-14 h-14 ${pillar.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={26} className={pillar.color} strokeWidth={1.6} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">{pillar.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{pillar.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
