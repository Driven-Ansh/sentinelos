'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AlertTriangle, Users, Brain, Shield, Eye, Lock, Zap } from 'lucide-react';
import { staggerContainer, staggerItem, fadeUp, fadeLeft, fadeRight } from '@/lib/animations';

const problems = [
  {
    icon: Users,
    title: 'No Agent Identity',
    description: 'There is no universal registry. Any code can claim to be an AI agent. There is no way to verify who built it, what it does, or whether it has been audited.',
    color: 'text-red-400',
    bg: 'bg-red-400/5 border-red-400/20',
  },
  {
    icon: Brain,
    title: 'Zero Trust Baseline',
    description: 'Organizations deploy agents without understanding their actual capabilities, dependencies, or security posture. Trust is assumed, not verified.',
    color: 'text-orange-400',
    bg: 'bg-orange-400/5 border-orange-400/20',
  },
  {
    icon: Eye,
    title: 'No Runtime Oversight',
    description: 'Once deployed, agents operate invisibly. There is no standardized mechanism to monitor what actions they take, what permissions they use, or what decisions they make.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/5 border-yellow-400/20',
  },
  {
    icon: Lock,
    title: 'Permission Sprawl',
    description: 'Agents accumulate permissions far beyond their stated purpose. Revocation is manual, slow, and often forgotten. Privilege creep is endemic.',
    color: 'text-amber-400',
    bg: 'bg-amber-400/5 border-amber-400/20',
  },
  {
    icon: Zap,
    title: 'Prompt Injection Epidemic',
    description: 'Adversarial inputs can hijack agent behavior, redirect actions, and exfiltrate data. Without runtime monitoring, these attacks are invisible and devastating.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/5 border-purple-400/20',
  },
  {
    icon: Shield,
    title: 'No Governance Layer',
    description: 'Enterprises have no unified layer to enforce policies, block dangerous actions, audit decisions, or intervene in real time when agents go rogue.',
    color: 'text-red-400',
    bg: 'bg-red-400/5 border-red-400/20',
  },
];

export default function ProblemSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="platform" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#080B12]" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(239,68,68,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <motion.div variants={staggerItem} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/5 mb-6">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span className="text-xs text-red-400 tracking-widest uppercase font-medium" style={{ fontFamily: 'JetBrains Mono' }}>
              The Agentic AI Crisis
            </span>
          </motion.div>

          <motion.h2 variants={staggerItem} className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Space Grotesk' }}>
            The World is Deploying Agents
            <br />
            <span className="text-red-400">Without Any Safety Net</span>
          </motion.h2>

          <motion.p variants={staggerItem} className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            By 2026, over 50% of enterprise workflows will involve autonomous AI agents. These agents access databases, send emails, execute code, and make financial decisions — with no universal standard for safety, trust, or accountability.
          </motion.p>
        </motion.div>

        {/* Problem cards */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
        >
          {problems.map((p) => (
            <motion.div
              key={p.title}
              variants={staggerItem}
              className={`p-6 rounded-2xl border sentinel-card group cursor-default`}
            >
              <div className={`w-10 h-10 rounded-xl border ${p.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <p.icon className={`w-5 h-5 ${p.color}`} />
              </div>
              <h3 className="font-semibold text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>{p.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Gap + Governance Gap */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="p-8 rounded-2xl border border-red-500/20 bg-red-500/3"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-red-400/10 border border-red-400/30 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-400" />
              </div>
              <span className="text-red-400 font-semibold tracking-wide" style={{ fontFamily: 'Space Grotesk' }}>The Trust Gap</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Space Grotesk' }}>You Cannot Trust What You Cannot Verify</h3>
            <ul className="space-y-3">
              {['Is this agent safe to deploy?', 'Has the code been audited?', 'Are declared permissions accurate?', 'Has it been tested against prompt injection?', 'What is its behavioral track record?'].map(q => (
                <li key={q} className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  {q}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="p-8 rounded-2xl border border-orange-500/20 bg-orange-500/3"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-orange-400/10 border border-orange-400/30 flex items-center justify-center">
                <Shield className="w-4 h-4 text-orange-400" />
              </div>
              <span className="text-orange-400 font-semibold tracking-wide" style={{ fontFamily: 'Space Grotesk' }}>The Governance Gap</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Space Grotesk' }}>Safe Agents Can Still Go Wrong</h3>
            <ul className="space-y-3">
              {['Misuse permissions at runtime', 'Compromise through prompt injection', 'Leak sensitive data to external endpoints', 'Make unsafe decisions in edge cases', 'Execute unintended actions with real consequences'].map(q => (
                <li key={q} className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                  {q}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
