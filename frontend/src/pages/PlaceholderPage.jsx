import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PlaceholderPage({ title, description, icon, color }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020817] flex flex-col items-center justify-center px-6 text-center">
      {/* Background glow */}
      <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 ${color} rounded-full blur-3xl opacity-20 pointer-events-none`} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-lg"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6, type: 'spring', stiffness: 200 }}
          className="text-6xl mb-8"
        >
          {icon}
        </motion.div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-xs font-medium text-slate-400 mb-6">
          Coming Soon
        </div>

        <h1 className="text-5xl font-extrabold text-white tracking-tight mb-4">
          {title}
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed mb-10">
          {description}
        </p>

        <motion.button
          whileHover={{ scale: 1.04, x: -3 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl glass border border-white/15 text-white font-semibold text-sm hover:border-white/30 transition-all duration-300 cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
}
