import { motion } from 'framer-motion';

export default function StepDone() {
  const sparkles = ['🎉', '✨', '🌍', '🧭', '✈️', '🥳', '🏔️', '🌴'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex min-h-[300px] flex-col justify-center overflow-hidden py-8 text-center sm:py-10"
    >
      <div className="pointer-events-none absolute inset-0">
        {sparkles.map((emoji, i) => (
          <motion.span
            key={`${emoji}-${i}`}
            className="absolute text-2xl sm:text-3xl drop-shadow-[0_0_22px_rgba(255,255,255,0.45)]"
            style={{
              left: `${8 + i * 11}%`,
              top: i % 2 === 0 ? '18%' : '70%',
            }}
            initial={{ opacity: 0, scale: 0.6, y: 12 }}
            animate={{
              opacity: [0, 1, 1, 0.85],
              y: [12, -10, 6, -8],
              rotate: [-6, 6, -4, 4],
              scale: [0.7, 1.05, 1, 1.08],
            }}
            transition={{
              duration: 3.4,
              delay: i * 0.16,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="relative z-10 mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-300/35 bg-emerald-400/15 shadow-xl shadow-emerald-500/25"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.9, 1.05, 1], opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="text-4xl">🎊</span>
      </motion.div>
      <div className="pointer-events-none absolute left-1/2 top-[47%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-3xl" />

      <h2 className="relative z-10 text-2xl font-extrabold text-white sm:text-3xl">You Are All Set</h2>
      <p className="relative z-10 mt-3 text-base text-slate-200">
        Profile complete. Your next adventure is ready to unlock.
      </p>
      <p className="relative z-10 mt-2 text-sm text-slate-300">
        New journeys, safer routes, and unforgettable memories await.
      </p>
    </motion.div>
  );
}
