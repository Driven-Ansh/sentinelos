'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle, Shield, Eye, Database, Lock, AlertTriangle, BarChart3, Cpu } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

const capabilities = [
  {
    icon: Shield,
    title: 'Agent Registry',
    description: 'Universal identity system for all AI agents. Every agent gets a cryptographically verified identity, capability declaration, and immutable history.',
    color: '#0EA5E9',
    features: ['Unique Agent Identity', 'Capability Declarations', 'Version Control', 'Developer Verification'],
  },
  {
    icon: CheckCircle,
    title: 'Certification Engine',
    description: '12-stage certification pipeline including static analysis, security scanning, behavioral testing, and prompt injection resistance testing.',
    color: '#10B981',
    features: ['Static Code Analysis', 'Security Scanning', 'Behavioral Testing', 'Injection Resistance'],
  },
  {
    icon: Eye,
    title: 'Runtime Monitoring',
    description: 'Every action by every agent is intercepted, logged, and evaluated in real time against your organization\'s policy framework.',
    color: '#8B5CF6',
    features: ['Action Interception', 'Policy Enforcement', 'Realtime Alerts', 'Session Replay'],
  },
  {
    icon: Database,
    title: 'Agent Marketplace',
    description: 'Professional marketplace where certified agents can be discovered, subscribed to, and deployed with full trust rankings and audit trails.',
    color: '#F59E0B',
    features: ['Trust Rankings', 'Risk Scores', 'Usage Analytics', 'Subscription Plans'],
  },
  {
    icon: Lock,
    title: 'Permission Firewall',
    description: 'Granular permission management with Master Agent approval, automated expiry, and complete audit trails for every permission decision.',
    color: '#EF4444',
    features: ['Permission Gating', 'Master Approval', 'Auto-Expiry', 'Scope Enforcement'],
  },
  {
    icon: Cpu,
    title: 'Master Agent',
    description: 'SentinelOS itself operates as a supervisory AI that makes autonomous governance decisions, blocks threats, and enforces policies 24/7.',
    color: '#22D3EE',
    features: ['Autonomous Decisions', 'Threat Blocking', 'Policy Enforcement', 'Reasoning Transparency'],
  },
  {
    icon: AlertTriangle,
    title: 'Threat Intelligence',
    description: 'Real-time threat detection across the entire agent ecosystem — prompt injection, data exfiltration, privilege escalation, and more.',
    color: '#F97316',
    features: ['Injection Detection', 'Exfiltration Prevention', 'Privilege Monitoring', 'Threat Feeds'],
  },
  {
    icon: BarChart3,
    title: 'Audit & Compliance',
    description: 'Immutable audit logs with full event correlation, compliance reporting for SOC2/GDPR/HIPAA, and one-click export capabilities.',
    color: '#6366F1',
    features: ['Immutable Logs', 'Compliance Reports', 'Event Correlation', 'Data Export'],
  },
];

export default function WhatSentinelDoes() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="platform-detail" ref={ref} className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(14,165,233,0.04) 0%, transparent 70%)' }}
      />
      <div className="absolute inset-0 dot-bg opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <motion.div variants={staggerItem} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/5 mb-6">
            <Shield className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-xs text-sky-400 tracking-widest uppercase font-medium" style={{ fontFamily: 'JetBrains Mono' }}>
              The SentinelOS Platform
            </span>
          </motion.div>

          <motion.h2 variants={staggerItem} className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Space Grotesk' }}>
            Everything You Need to
            <br />
            <span className="gradient-text-blue">Govern the Agent Economy</span>
          </motion.h2>

          <motion.p variants={staggerItem} className="text-lg text-slate-400 max-w-3xl mx-auto">
            A unified platform that covers the entire lifecycle of an AI agent — from submission to certification, deployment to monitoring, threat to remediation.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {capabilities.map((cap) => (
            <motion.div
              key={cap.title}
              variants={staggerItem}
              className="sentinel-card p-6 group cursor-default"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${cap.color}12`, border: `1px solid ${cap.color}30` }}
              >
                <cap.icon className="w-5 h-5" style={{ color: cap.color }} />
              </div>

              <h3 className="font-semibold text-white mb-2 text-sm" style={{ fontFamily: 'Space Grotesk' }}>
                {cap.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{cap.description}</p>

              <ul className="space-y-1.5">
                {cap.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: cap.color }} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
