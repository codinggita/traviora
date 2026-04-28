import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import Logo from '../components/Logo';

const slides = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?q=80&w=2070&auto=format&fit=crop',
];

const inputClass =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-sky-500/60 focus:bg-white/8 transition-all duration-300';

export default function AuthPage() {
  const [mode, setMode] = useState('signup'); // 'signup' | 'login'
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [bgIdx] = useState(() => Math.floor(Math.random() * slides.length));
  const navigate = useNavigate();

  const isSignup = mode === 'signup';

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to onboarding after auth
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={slides[bgIdx]}
          alt="Travel background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#020817]/80 via-[#020817]/60 to-[#020817]/85" />
      </div>

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top-left logo */}
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
        <div className="glass rounded-3xl border border-white/10 p-8 md:p-10 shadow-2xl shadow-black/40">

          {/* Mode toggle tabs */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/5 border border-white/8 mb-8">
            {['signup', 'login'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  mode === m
                    ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-lg shadow-sky-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {m === 'signup' ? 'Sign Up' : 'Log In'}
              </button>
            ))}
          </div>

          {/* Header */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="mb-8"
            >
              <h1 className="text-2xl font-extrabold text-white mb-2">
                {isSignup ? 'Start Your Adventure 🌍' : 'Welcome Back 👋'}
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed">
                {isSignup
                  ? 'Your journey begins here. Sign up to stay safe and connected.'
                  : 'Log back in and continue exploring the world with Traviora.'}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={mode + '-form'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              {/* Full Name — signup only */}
              {isSignup && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-400 ml-1">Full Name</label>
                  <div className="relative">
                    <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="e.g. Alex Traveler"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400 ml-1">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    placeholder="alex@example.com"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400 ml-1">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    className={`${inputClass} pl-10 pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {isSignup && (
                  <p className="text-slate-600 text-xs ml-1">Must be at least 8 characters.</p>
                )}
                {!isSignup && (
                  <div className="text-right">
                    <a href="#" className="text-xs text-sky-400 hover:text-sky-300 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                )}
              </div>

              {/* Terms — signup only */}
              {isSignup && (
                <label className="flex items-start gap-3 cursor-pointer group mt-1">
                  <div
                    onClick={() => setAgreed(!agreed)}
                    className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      agreed
                        ? 'bg-gradient-to-br from-sky-500 to-emerald-500 border-transparent'
                        : 'border-white/20 bg-white/5 group-hover:border-white/40'
                    }`}
                  >
                    {agreed && <Check size={10} className="text-white" strokeWidth={3} />}
                  </div>
                  <span className="text-slate-400 text-xs leading-relaxed">
                    I agree to the{' '}
                    <a href="#" className="text-sky-400 hover:text-sky-300 transition-colors">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
              )}

              {/* Submit button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="relative mt-2 w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-semibold text-sm shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 transition-shadow duration-300 cursor-pointer overflow-hidden group"
              >
                {/* Shimmer */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {isSignup ? 'Create Account' : 'Log In'}
                <ArrowRight size={16} />
              </motion.button>
            </motion.form>
          </AnimatePresence>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-slate-600 text-xs">or</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {/* Switch mode */}
          <p className="text-center text-slate-500 text-sm">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setMode(isSignup ? 'login' : 'signup')}
              className="text-sky-400 hover:text-sky-300 font-semibold transition-colors cursor-pointer"
            >
              {isSignup ? 'Log In' : 'Sign Up'}
            </button>
          </p>

          {/* Back link */}
          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/')}
              className="text-slate-600 hover:text-slate-400 text-xs transition-colors cursor-pointer"
            >
              ← Back to Traviora
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
