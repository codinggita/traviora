import React from 'react';
import { motion } from 'framer-motion';

export default function StepBar({ step, total }) {
  return (
    <div className="flex items-center gap-2 mb-6 sm:mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ width: i === step ? 32 : 8 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className={`h-2 rounded-full transition-colors duration-300 ${i <= step ? 'bg-gradient-to-r from-sky-500 to-emerald-500' : 'bg-white/10'}`}
        />
      ))}
      <span className="text-slate-400 text-xs ml-1 tracking-wide">
        {step + 1} / {total}
      </span>
    </div>
  );
}
