import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, PlaneTakeoff, Compass } from 'lucide-react';

export default function StepAgeGroup({ selected, setSelected }) {
  const groups = [
    { id: '18-25', label: '18-25', icon: GraduationCap, desc: 'Student and young explorer' },
    { id: '26-35', label: '26-35', icon: Briefcase, desc: 'Young professional' },
    { id: '36-50', label: '36-50', icon: PlaneTakeoff, desc: 'Seasoned traveler' },
    { id: '50+', label: '50+', icon: Compass, desc: 'Wisdom wanderer' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-5 sm:gap-6"
    >
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">Your Travel Vibe</h2>
      <p className="text-slate-300 text-base">Select the age group that best represents you.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {groups.map((g) => (
          <button
            key={g.id}
            onClick={() => setSelected(g.id)}
            className={`flex min-h-[124px] flex-col items-center justify-center rounded-2xl border p-4 transition-all duration-300 ${
              selected === g.id
                ? 'border-sky-500 bg-sky-500/10 shadow-lg shadow-sky-500/15'
                : 'border-white/15 bg-white/5 hover:border-slate-400/60'
            }`}
          >
            <g.icon className="mb-2 h-7 w-7 text-sky-300" />
            <span className="font-semibold text-white">{g.label}</span>
            <span className="mt-1 text-center text-xs text-slate-300">{g.desc}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
