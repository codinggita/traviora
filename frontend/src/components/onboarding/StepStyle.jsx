import { motion } from 'framer-motion';
import { travelStyles } from '../../data/onboardingData';

export default function StepStyle({ selected, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-5 sm:gap-6"
    >
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">Pick Your Travel Interests</h2>
      <p className="text-base text-slate-300">Select one or more interests that match your vibe.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {travelStyles.map((s) => (
          <button
            key={s.id}
            onClick={() => onToggle(s.id)}
            className={`min-h-[96px] rounded-2xl border p-4 text-left transition-all duration-300 ${
              selected.includes(s.id)
                ? 'border-emerald-500/60 bg-emerald-500/10'
                : `border-white/10 bg-gradient-to-br ${s.color} ${s.border}`
            }`}
          >
            <span className="font-semibold text-white">{s.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
