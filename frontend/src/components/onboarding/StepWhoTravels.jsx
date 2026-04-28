import { motion } from 'framer-motion';
import { travelerTypes } from '../../data/onboardingData';

export default function StepWhoTravels({ selected, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-5 sm:gap-6"
    >
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">Who Are You Traveling As?</h2>
      <p className="text-base text-slate-300">Choose your travel style so we can personalize your plan.</p>
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {travelerTypes.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`rounded-2xl border p-5 text-left transition-all duration-300 shadow-lg ${
              selected === t.id ? t.active : `border-white/10 bg-white/5 ${t.glow}`
            }`}
          >
            <div className="text-lg font-semibold text-white">{t.label}</div>
            <div className="mt-1 text-sm text-slate-300">{t.desc}</div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
