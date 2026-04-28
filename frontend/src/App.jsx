import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Trust from './components/Trust';
import CTA from './components/CTA';
import Footer from './components/Footer';
import PlaceholderPage from './pages/PlaceholderPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';

// Landing page (Home)
function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Hero />
      <Features />
      <Trust />
      <CTA />
    </motion.div>
  );
}

// Individual route pages
function DestinationsPage() {
  return (
    <PlaceholderPage
      title="Destinations"
      description="Explore curated destinations handpicked by our community of 50,000+ solo travelers. Detailed guides, safety scores, and local tips — all in one place."
      icon="🌍"
      color="bg-sky-500"
    />
  );
}

function SafetyPage() {
  return (
    <PlaceholderPage
      title="Safety Hub"
      description="Real-time safety data, AI-powered route planning, and emergency resources for every destination on the planet."
      icon="🛡️"
      color="bg-emerald-500"
    />
  );
}

function CommunityPage() {
  return (
    <PlaceholderPage
      title="Community"
      description="Connect with thousands of like-minded travelers. Share experiences, find travel buddies, and get insider tips from locals."
      icon="🤝"
      color="bg-violet-500"
    />
  );
}

function PricingPage() {
  return (
    <PlaceholderPage
      title="Pricing"
      description="Simple, transparent pricing. Start free and upgrade when you're ready. No hidden fees, cancel anytime."
      icon="💎"
      color="bg-amber-500"
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#020817] text-slate-200">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/get-started" element={<AuthPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/safety" element={<SafetyPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/pricing" element={<PricingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
