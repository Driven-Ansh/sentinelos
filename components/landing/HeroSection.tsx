'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, Code2, Activity, Shield } from 'lucide-react';
import SentinelLogo from '@/components/logo/SentinelLogo';
import NetworkBackground from './NetworkBackground';
import { staggerContainer, staggerItem, fadeUp } from '@/lib/animations';

const stats = [
  { label: 'Agents Certified', value: '1,923' },
  { label: 'Threats Blocked', value: '48,291' },
  { label: 'Trust Score Avg', value: '96.8%' },
  { label: 'Active Sessions', value: '3,401' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#080B12]" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(14,165,233,0.07) 0%, transparent 70%)',
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <NetworkBackground />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center text-center pt-24 pb-16">

        {/* Boot badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/5 mb-12"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-sky-400 tracking-widest uppercase font-medium" style={{ fontFamily: 'JetBrains Mono' }}>
            System Online — All Governance Systems Operational
          </span>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <SentinelLogo size={180} animate={true} showText={true} showTagline={false} />
        </motion.div>

        {/* Headlines */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.8 }}
          className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6"
          style={{ fontFamily: 'Space Grotesk' }}
        >
          The Operating System
          <br />
          <span className="gradient-text">for Autonomous Agents</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.0 }}
          className="text-xl text-slate-400 max-w-3xl leading-relaxed mb-12"
        >
          Register, Certify, Monitor, Govern, and Scale AI Agents through one unified trust layer.
          The world's first autonomous AI governance platform.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-20"
        >
          <Link
            href="/app/dashboard"
            className="group flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40"
          >
            <Shield className="w-4 h-4" />
            Explore Platform
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/app/dashboard"
            className="flex items-center gap-2 border border-slate-700 hover:border-sky-500/50 text-slate-300 hover:text-white font-medium px-8 py-3.5 rounded-xl transition-all duration-200 hover:bg-sky-500/5"
          >
            <Activity className="w-4 h-4 text-sky-400" />
            View Live Demo
          </Link>

          <Link
            href="/app/developer"
            className="flex items-center gap-2 border border-slate-700 hover:border-slate-600 text-slate-400 hover:text-slate-300 font-medium px-8 py-3.5 rounded-xl transition-all duration-200"
          >
            <Code2 className="w-4 h-4" />
            Become a Developer
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px w-full max-w-4xl rounded-2xl overflow-hidden border border-slate-800 bg-slate-800"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="bg-[#0D1117] px-6 py-5 flex flex-col items-center gap-1"
            >
              <span className="text-2xl font-bold gradient-text-blue" style={{ fontFamily: 'Space Grotesk' }}>
                {stat.value}
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-600 tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-slate-700 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-sky-500 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
