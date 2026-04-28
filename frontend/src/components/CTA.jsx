import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800/80 to-slate-900 p-12 md:p-20 text-center"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.12)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(52,211,153,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

        {/* Sparkle badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-500/20 text-xs font-medium text-sky-400 mb-8"
        >
          <Sparkles size={12} />
          Premium Plan Available
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.7, ease: 'easeOut' }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 text-balance"
        >
          Your smarter travel companion{' '}
          <span className="gradient-text">starts here.</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.7, ease: 'easeOut' }}
          className="text-slate-400 text-lg max-w-lg mx-auto mb-10 leading-relaxed"
        >
          Join thousands of solo travelers exploring the world with confidence,
          clarity, and community backing.
        </motion.p>

        {/* Pulsing CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.7, ease: 'easeOut' }}
          className="relative inline-block"
        >
          {/* Pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 opacity-50"
          />
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="relative flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-semibold text-base shadow-2xl shadow-sky-500/30 hover:shadow-sky-500/50 transition-shadow duration-300 cursor-pointer"
          >
            Get Traviora Premium
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>

        {/* Social proof */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-slate-500 text-sm mt-6"
        >
          No credit card required · Cancel anytime · 14-day free trial
        </motion.p>
      </motion.div>
    </section>
  );
}
