import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Logo from '../components/Logo';
import { ageGroups, travelerTypes, travelStyles, STEP_BACKGROUNDS, TOTAL_STEPS } from '../data/onboardingData';
import StepBar from '../components/onboarding/StepBar';
import StepAgeGroup from '../components/onboarding/StepAgeGroup';
import StepWhoTravels from '../components/onboarding/StepWhoTravels';
import StepStyle from '../components/onboarding/StepStyle';
import StepDone from '../components/onboarding/StepDone';

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [ageGroup, setAgeGroup] = useState(null);
  const [travelerType, setTravelerType] = useState(null);
  const [styles, setStyles] = useState([]);
  const navigate = useNavigate();

  const toggleStyle = (id) =>
    setStyles((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  const canContinue =
    (step === 0 && ageGroup !== null) ||
    (step === 1 && travelerType !== null) ||
    (step === 2 && styles.length > 0) ||
    step === 3;

  const handleContinue = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    } else {
      navigate('/');
    }
  };

  const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-10 lg:py-14 overflow-hidden">
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
            className="h-full w-full object-cover scale-[1.03] saturate-110 contrast-105 brightness-[0.72]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/78 via-[#07162d]/62 to-[#031127]/84" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(56,189,248,0.14),transparent_34%),radial-gradient(circle_at_85%_68%,rgba(16,185,129,0.12),transparent_32%)]" />
        </motion.div>
      </AnimatePresence>

      {/* Glow blobs */}
      <div className="absolute top-1/3 left-1/3 h-80 w-80 rounded-full bg-emerald-400/14 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-sky-400/12 blur-3xl pointer-events-none" />
      <div className="absolute top-16 right-[18%] h-56 w-56 rounded-full bg-cyan-300/10 blur-[100px] pointer-events-none" />

      {/* Logo */}
      <div className="absolute top-5 left-5 sm:top-7 sm:left-8 z-20">
        <Logo size="sm" />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-xl"
      >
        <div className="glass rounded-3xl border border-white/20 bg-gradient-to-br from-[#0f223fcc]/90 via-[#0b1730cc]/88 to-[#071227cc]/90 p-6 sm:p-8 lg:p-9 shadow-2xl shadow-black/45 backdrop-blur-xl">
          <div className="flex items-center justify-center mb-5 sm:mb-6">
            <Logo size="sm" />
          </div>
          <StepBar step={step} total={TOTAL_STEPS} />

          {/* Step content with slide animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-[320px] sm:min-h-[340px] flex flex-col"
            >
              {step === 0 && <StepAgeGroup selected={ageGroup} setSelected={setAgeGroup} />}
              {step === 1 && <StepWhoTravels selected={travelerType} onSelect={setTravelerType} />}
              {step === 2 && <StepStyle selected={styles} onToggle={toggleStyle} />}
              {step === 3 && <StepDone />}
            </motion.div>
          </AnimatePresence>

          {/* Continue button */}
          <motion.button
            whileHover={canContinue ? { scale: 1.02, y: -1 } : {}}
            whileTap={canContinue ? { scale: 0.98 } : {}}
            onClick={handleContinue}
            disabled={!canContinue}
            className={`w-full mt-4 flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 cursor-pointer relative overflow-hidden group
              ${canContinue
                ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40'
                : 'bg-white/5 text-slate-600 border border-white/8 cursor-not-allowed'}
            `}
          >
            {canContinue && (
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            )}
            {step === TOTAL_STEPS - 1 ? 'Start Exploring ✨' : 'Continue'}
            <ArrowRight size={16} />
          </motion.button>

          {/* Back button */}
          {step > 0 && step < TOTAL_STEPS - 1 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setStep((s) => s - 1)}
              className="w-full flex items-center justify-center gap-1.5 mt-4 text-slate-500 hover:text-slate-300 text-sm transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} /> Back
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
