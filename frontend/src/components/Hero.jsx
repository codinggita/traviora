import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
    location: 'Swiss Alps, Switzerland',
  },
  {
    url: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=2070&auto=format&fit=crop',
    location: 'Santorini, Greece',
  },
  {
    url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
    location: 'Bali, Indonesia',
  },
  {
    url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
    location: 'Amalfi Coast, Italy',
  },
  {
    url: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?q=80&w=2070&auto=format&fit=crop',
    location: 'Maldives',
  },
  {
    url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2070&auto=format&fit=crop',
    location: 'Patagonia, Argentina',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], ['0%', '20%']);

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80, scale: 1.03 }),
    center: { opacity: 1, x: 0, scale: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80, scale: 0.97, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }),
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Slideshow Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <img
              src={slides[current].url}
              alt={slides[current].location}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay */}
        <div className="hero-bg absolute inset-0 z-10" />
      </motion.div>

      {/* Atmospheric glow blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-32 w-full">
        <div className="max-w-2xl">
          {/* Location badge — changes with slide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-emerald-500/20 text-xs font-medium text-emerald-400 mb-8"
          >
            <MapPin size={12} />
            <AnimatePresence mode="wait">
              <motion.span
                key={current}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
              >
                {slides[current].location}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 text-balance"
          >
            Travel Safer.{' '}
            <span className="gradient-text block">Explore Smarter.</span>
            Feel Local Anywhere.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            animate="visible"
            className="text-slate-300 text-lg leading-relaxed mb-10 max-w-xl"
          >
            Your intelligent companion for solo travel. Combining real-time
            safety data, verified community insights, and premium curated
            experiences — all in one place.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            custom={0.3}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-semibold text-sm shadow-2xl shadow-sky-500/30 hover:shadow-sky-500/50 transition-all duration-300 cursor-pointer"
            >
              Plan Your Journey
              <ArrowRight size={16} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl glass border border-white/15 text-white font-semibold text-sm hover:border-white/30 hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              View Destinations
            </motion.button>
          </motion.div>

          {/* Trust pill */}
          <motion.div
            variants={fadeUp}
            custom={0.45}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 mt-12"
          >
            <div className="flex -space-x-2">
              {['🧑🏽', '👩🏻', '🧔🏿', '👩🏼'].map((emoji, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full glass border border-white/20 flex items-center justify-center text-sm"
                >
                  {emoji}
                </div>
              ))}
            </div>
            <p className="text-slate-400 text-sm">
              <span className="text-white font-semibold">50,000+</span> solo travelers trust Traviora
            </p>
          </motion.div>
        </div>
      </div>

      {/* Slideshow Controls */}
      <div className="absolute bottom-16 left-0 right-0 z-20 flex items-center justify-center gap-4">
        {/* Prev */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prev}
          className="w-9 h-9 rounded-full glass border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-all cursor-pointer"
        >
          <ChevronLeft size={16} />
        </motion.button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-400 cursor-pointer ${
                i === current
                  ? 'w-6 h-2 bg-gradient-to-r from-sky-400 to-emerald-400'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Next */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={next}
          className="w-9 h-9 rounded-full glass border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-all cursor-pointer"
        >
          <ChevronRight size={16} />
        </motion.button>
      </div>

      {/* Bottom fade into page */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020817] to-transparent z-20" />
    </section>
  );
}
