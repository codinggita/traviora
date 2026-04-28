import { motion } from 'framer-motion';
import Logo from './Logo';

const footerLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Safety Protocols', href: '#' },
  { label: 'Travel Guides', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Support', href: '#' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/7 py-10 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo + copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Logo size="sm" />
          <p className="text-slate-600 text-xs">
            © 2026 Traviora. Engineered for the bold.
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              whileHover={{ y: -1 }}
              className="text-slate-500 hover:text-slate-300 text-xs font-medium transition-colors duration-200"
            >
              {link.label}
            </motion.a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
