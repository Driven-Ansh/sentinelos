'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import SentinelLogo from '@/components/logo/SentinelLogo';
import { Shield, Menu, X, ChevronRight } from 'lucide-react';

const navLinks = [
  { label: 'Platform', href: '#platform' },
  { label: 'Certification', href: '#certification' },
  { label: 'Governance', href: '#governance' },
  { label: 'Marketplace', href: '#marketplace' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Developers', href: '#developers' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.5]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{}}
      >
        <motion.div
          className="absolute inset-0"
          style={{ opacity: bgOpacity, background: 'rgba(8,11,18,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(30,41,59,0.5)' }}
        />

        <div className="relative max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <SentinelLogo size={36} animate={false} showText={false} />
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-lg gradient-text-blue" style={{ fontFamily: 'Space Grotesk' }}>
                Sentinel
              </span>
              <span className="text-cyan-400/70 text-lg font-light tracking-wider" style={{ fontFamily: 'Space Grotesk' }}>
                OS
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/app/dashboard"
              className="text-sm text-slate-400 hover:text-white transition-colors px-4 py-2"
            >
              Sign in
            </Link>
            <Link
              href="/app/dashboard"
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <Shield className="w-3.5 h-3.5" />
              Launch Platform
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-slate-400 hover:text-white"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-[#080B12] border-b border-slate-800 px-6 py-4"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-slate-300 hover:text-white transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/app/dashboard"
                className="flex items-center gap-2 bg-sky-500 text-white text-sm font-medium px-4 py-2.5 rounded-lg text-center justify-center mt-2"
              >
                Launch Platform
              </Link>
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
}
