import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Animated SVG globe/orbit icon for Traviora
function TraviIcon({ size = 32 }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileHover={{ rotate: 20, scale: 1.12 }}
      transition={{ type: 'spring', stiffness: 260, damping: 16 }}
    >
      <circle cx="18" cy="18" r="17" fill="url(#orb_grad)" opacity="0.15" />
      <circle cx="18" cy="18" r="13" stroke="url(#stroke_grad)" strokeWidth="1.5" fill="none" />
      <ellipse cx="18" cy="18" rx="6" ry="13" stroke="url(#stroke_grad)" strokeWidth="1.2" fill="none" />
      <path d="M5.5 18 Q18 14 30.5 18" stroke="url(#stroke_grad)" strokeWidth="1.2" fill="none" />
      <motion.ellipse
        cx="18" cy="18" rx="17" ry="5"
        stroke="url(#orbit_grad)" strokeWidth="1.2" fill="none" strokeDasharray="4 3"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '18px 18px' }}
      />
      <motion.circle
        cx="35" cy="18" r="2.5" fill="url(#dot_grad)"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '18px 18px' }}
      />
      <defs>
        <linearGradient id="orb_grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" /><stop offset="1" stopColor="#34d399" />
        </linearGradient>
        <linearGradient id="stroke_grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" /><stop offset="1" stopColor="#34d399" />
        </linearGradient>
        <linearGradient id="orbit_grad" x1="0" y1="0" x2="36" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a78bfa" /><stop offset="1" stopColor="#38bdf8" />
        </linearGradient>
        <linearGradient id="dot_grad" x1="0" y1="0" x2="5" y2="5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f0abfc" /><stop offset="1" stopColor="#818cf8" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

const letterVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: 'easeOut' },
  }),
};

const brand = 'Traviora'.split('');
const gradientStart = 5;

export default function Logo({ size = 'md' }) {
  const iconSize = size === 'sm' ? 26 : 34;
  const textClass = size === 'sm' ? 'text-base' : 'text-xl';

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
      <Link to="/" className="flex items-center gap-2.5 select-none">
        <TraviIcon size={iconSize} />
        <span className={`font-extrabold tracking-tight ${textClass} flex`}>
          {brand.map((char, i) => (
            <motion.span
              key={i} custom={i}
              variants={letterVariants} initial="hidden" animate="visible"
              style={i >= gradientStart ? {
                background: 'linear-gradient(135deg, #38bdf8 0%, #34d399 60%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              } : { color: '#fff' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      </Link>
    </motion.div>
  );
}
