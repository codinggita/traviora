import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Briefcase,
  PlaneTakeoff,
  Compass,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Map,
  Users,
  Mountain,
  Sunset,
  Backpack,
  Coffee,
} from 'lucide-react';
import Logo from '../components/Logo';

// ─── Data ────────────────────────────────────────────────────────────────────

const ageGroups = [
  { id: '18-25', label: '18–25', icon: GraduationCap, desc: 'Student & Young Explorer' },
  { id: '26-35', label: '26–35', icon: Briefcase,     desc: 'Young Professional'       },
  { id: '36-50', label: '36–50', icon: PlaneTakeoff,  desc: 'Seasoned Traveler'        },
  { id: '50+',   label: '50+',   icon: Compass,       desc: 'Wisdom Wanderer'          },
];

const travelStyles = [
  { id: 'adventure',  label: 'Adventure',     icon: Mountain, color: 'from-orange-500/20 to-orange-500/5', border: 'hover:border-orange-500/40' },
  { id: 'culture',    label: 'Culture',       icon: Map,      color: 'from-violet-500/20 to-violet-500/5', border: 'hover:border-violet-500/40' },
  { id: 'social',     label: 'Social',        icon: Users,    color: 'from-sky-500/20 to-sky-500/5',       border: 'hover:border-sky-500/40'    },
  { id: 'relaxation', label: 'Relaxation',    icon: Sunset,   color: 'from-amber-500/20 to-amber-500/5',   border: 'hover:border-amber-500/40'  },
  { id: 'budget',     label: 'Budget Travel', icon: Backpack, color: 'from-emerald-500/20 to-emerald-500/5', border: 'hover:border-emerald-500/40' },
  { id: 'comfort',    label: 'Comfort & Café',icon: Coffee,   color: 'from-rose-500/20 to-rose-500/5',     border: 'hover:border-rose-500/40'   },
];

// Per-step background images (travel / tracking / adventure themed)
const STEP_BACKGROUNDS = [
  // Step 1 — Age group / community vibe
  'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2070&auto=format&fit=crop',
  // Step 2 — Adventure / trekking / tracking
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2070&auto=format&fit=crop',
  // Step 3 — Success / open world
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
];

// ─── Step indicators ─────────────────────────────────────────────────────────

function StepBar({ step, total }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ width: i === step ? 32 : 8 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className={`h-2 rounded-full transition-colors duration-300 ${
            i <= step
              ? 'bg-gradient-to-r from-sky-500 to-emerald-500'
              : 'bg-white/10'
          }`}
        />
      ))}
      <span className="text-slate-500 text-xs ml-1">{step + 1} / {total}</span>
    </div>
  );
}

// ─── Step 1: Age Group ────────────────────────────────────────────────────────

function StepAge({ selected, onSelect }) {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-white mb-3">Your Travel Vibe 🌍</h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          Select your age group to help us customize safety protocols and tailor community
          interest logic for your trips.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {ageGroups.map(({ id, label, icon: Icon, desc }) => {
          const active = selected === id;
          return (
            <motion.button
              key={id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(id)}
              className={`relative flex flex-col items-center gap-3 py-6 px-4 rounded-2xl border transition-all duration-300 cursor-pointer text-center
                ${active
                  ? 'border-emerald-500/70 bg-emerald-500/10 shadow-lg shadow-emerald-500/15'
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
                }`}
            >
              {active && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              )}
              <Icon size={28} className={active ? 'text-emerald-400' : 'text-slate-400'} strokeWidth={1.6} />
              <div>
                <div className={`text-lg font-bold ${active ? 'text-white' : 'text-slate-300'}`}>{label}</div>
                <div className="text-slate-500 text-xs mt-0.5">{desc}</div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Info box */}
      <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-sky-500/8 border border-sky-500/15 mb-6">
        <ShieldCheck size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
        <p className="text-slate-400 text-xs leading-relaxed">
          <span className="text-slate-300 font-medium">Why we ask: </span>
          This allows Traviora to highlight age-appropriate solo travel groups, suggest relevant
          PowerSpots, and tune emergency response protocols to your demographic profile.
        </p>
      </div>
    </>
  );
}

// ─── Step 2: Travel Style ─────────────────────────────────────────────────────

function StepStyle({ selected, onToggle }) {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-white mb-3">Travel Style ✈️</h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          Pick the styles that match you best. We'll curate destinations, community groups,
          and features around what you love. (Select all that apply)
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {travelStyles.map(({ id, label, icon: Icon, color, border }) => {
          const active = selected.includes(id);
          return (
            <motion.button
              key={id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onToggle(id)}
              className={`relative flex flex-col items-center gap-2.5 py-5 px-3 rounded-2xl border transition-all duration-300 cursor-pointer text-center
                ${active
                  ? `border-emerald-500/60 bg-gradient-to-b ${color} shadow-lg`
                  : `border-white/10 bg-white/5 ${border} hover:bg-white/8`
                }`}
            >
              {active && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-4 h-4 rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center"
                >
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              )}
              <Icon size={22} className={active ? 'text-emerald-400' : 'text-slate-400'} strokeWidth={1.6} />
              <span className={`text-sm font-semibold ${active ? 'text-white' : 'text-slate-300'}`}>{label}</span>
            </motion.button>
          );
        })}
      </div>
    </>
  );
}

// ─── Step 3: Done ─────────────────────────────────────────────────────────────

function StepDone() {
  return (
    <div className="text-center py-6">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-sky-500/30"
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M8 18l7 7 13-14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-3xl font-extrabold text-white mb-3"
      >
        You're all set! 🎉
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto mb-8"
      >
        Welcome to Traviora. Your personalized travel experience is ready.
        Explore smarter, travel safer, and feel local anywhere.
      </motion.p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const TOTAL_STEPS = 3;

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [ageGroup, setAgeGroup] = useState(null);
  const [styles, setStyles] = useState([]);
  const navigate = useNavigate();

  const toggleStyle = (id) =>
    setStyles((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);

  const canContinue =
    (step === 0 && ageGroup !== null) ||
    (step === 1 && styles.length > 0) ||
    step === 2;

  const handleContinue = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    } else {
      navigate('/');
    }
  };

  const slideVariants = {
    enter:  { opacity: 0, x: 40  },
    center: { opacity: 1, x: 0   },
    exit:   { opacity: 0, x: -40 },
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Per-step background with crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <img
            src={STEP_BACKGROUNDS[step]}
            alt="Travel background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#020817]/85 via-[#020817]/70 to-[#020817]/85" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-sky-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* Logo */}
      <div className="absolute top-6 left-8 z-20">
        <Logo size="sm" />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass rounded-3xl border border-white/10 p-8 shadow-2xl shadow-black/40">
          <StepBar step={step} total={TOTAL_STEPS} />

          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 0 && <StepAge selected={ageGroup} onSelect={setAgeGroup} />}
              {step === 1 && <StepStyle selected={styles} onToggle={toggleStyle} />}
              {step === 2 && <StepDone />}
            </motion.div>
          </AnimatePresence>

          {/* Continue button */}
          <motion.button
            whileHover={canContinue ? { scale: 1.02, y: -1 } : {}}
            whileTap={canContinue ? { scale: 0.98 } : {}}
            onClick={handleContinue}
            disabled={!canContinue}
            className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 cursor-pointer relative overflow-hidden group
              ${canContinue
                ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40'
                : 'bg-white/5 text-slate-600 border border-white/8 cursor-not-allowed'
              }`}
          >
            {canContinue && (
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            )}
            {step === TOTAL_STEPS - 1 ? 'Start Exploring' : 'Continue Setup'}
            <ArrowRight size={16} />
          </motion.button>

          {/* Back */}
          {step > 0 && step < TOTAL_STEPS - 1 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setStep((s) => s - 1)}
              className="w-full flex items-center justify-center gap-1.5 mt-3 text-slate-500 hover:text-slate-300 text-sm transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} /> Back
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
