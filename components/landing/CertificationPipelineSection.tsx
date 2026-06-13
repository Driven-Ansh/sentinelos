'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle, Clock, AlertTriangle, XCircle, Loader2 } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

const stages = [
  { id: 'submission', label: 'Agent Submission', status: 'passed', score: 100, detail: 'Code repository validated. Manifest verified. Developer identity confirmed.' },
  { id: 'static_analysis', label: 'Static Code Analysis', status: 'passed', score: 91, detail: '14,823 lines analyzed. 0 critical issues. 3 minor warnings.' },
  { id: 'dependency_inspection', label: 'Dependency Inspection', status: 'passed', score: 88, detail: '47 dependencies scanned. 2 low-severity CVEs noted and mitigated.' },
  { id: 'permission_review', label: 'Permission Review', status: 'passed', score: 94, detail: 'All requested permissions match declared capabilities. Scope validated.' },
  { id: 'security_scan', label: 'Security Scan', status: 'passed', score: 97, detail: 'OWASP Top 10 compliance verified. No injection vectors detected.' },
  { id: 'behavioral_testing', label: 'Behavioral Testing', status: 'running', score: null, detail: 'Running 2,400 behavioral scenarios across 12 capability domains...' },
  { id: 'injection_testing', label: 'Prompt Injection Testing', status: 'pending', score: null, detail: 'Pending: 840 adversarial prompt scenarios' },
  { id: 'stress_testing', label: 'Stress Testing', status: 'pending', score: null, detail: 'Pending: Load testing at 10x normal capacity' },
  { id: 'trust_scoring', label: 'Trust Scoring', status: 'pending', score: null, detail: 'Pending: Composite trust calculation' },
  { id: 'governance_scoring', label: 'Governance Scoring', status: 'pending', score: null, detail: 'Pending: Policy alignment assessment' },
  { id: 'report_generation', label: 'Report Generation', status: 'pending', score: null, detail: 'Pending: Full certification report' },
  { id: 'approval_decision', label: 'Approval Decision', status: 'pending', score: null, detail: 'Pending: Master Agent review and decision' },
];

const statusConfig = {
  passed: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/30', label: 'PASSED' },
  running: { icon: Loader2, color: 'text-sky-400', bg: 'bg-sky-400/10 border-sky-400/30', label: 'RUNNING' },
  pending: { icon: Clock, color: 'text-slate-500', bg: 'bg-slate-500/10 border-slate-500/20', label: 'PENDING' },
  failed: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/30', label: 'FAILED' },
  warning: { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/30', label: 'WARNING' },
};

export default function CertificationPipelineSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="certification" ref={ref} className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 0% 50%, rgba(16,185,129,0.04) 0%, transparent 60%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={staggerItem} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 mb-6">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs text-emerald-400 tracking-widest uppercase font-medium" style={{ fontFamily: 'JetBrains Mono' }}>
              12-Stage Certification
            </span>
          </motion.div>

          <motion.h2 variants={staggerItem} className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Space Grotesk' }}>
            The Most Rigorous Agent
            <br />
            <span className="text-emerald-400">Certification Pipeline on Earth</span>
          </motion.h2>

          <motion.p variants={staggerItem} className="text-lg text-slate-400 max-w-2xl mx-auto">
            Before any agent touches your data, it passes through 12 automated stages of scrutiny — from static analysis to adversarial injection testing.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Pipeline visualization */}
          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-3"
          >
            {stages.map((stage, i) => {
              const cfg = statusConfig[stage.status as keyof typeof statusConfig];
              const Icon = cfg.icon;
              const isRunning = stage.status === 'running';

              return (
                <motion.div
                  key={stage.id}
                  variants={staggerItem}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                    stage.status === 'running'
                      ? 'border-sky-500/40 bg-sky-500/5'
                      : stage.status === 'passed'
                      ? 'border-emerald-500/20 bg-emerald-500/3'
                      : 'border-slate-800 bg-[#0D1117]'
                  }`}
                >
                  <div className="flex-shrink-0 flex items-center gap-2">
                    <span className="text-xs text-slate-600 w-4 text-right" style={{ fontFamily: 'JetBrains Mono' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className={`w-7 h-7 rounded-lg border flex items-center justify-center ${cfg.bg}`}>
                      <Icon className={`w-3.5 h-3.5 ${cfg.color} ${isRunning ? 'animate-spin' : ''}`} />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-white" style={{ fontFamily: 'Space Grotesk' }}>
                        {stage.label}
                      </span>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {stage.score !== null && (
                          <span className="text-xs text-emerald-400 font-medium" style={{ fontFamily: 'JetBrains Mono' }}>
                            {stage.score}/100
                          </span>
                        )}
                        <span className={`text-xs font-bold tracking-wider ${cfg.color}`} style={{ fontFamily: 'JetBrains Mono' }}>
                          {cfg.label}
                        </span>
                      </div>
                    </div>
                    {stage.status !== 'pending' && (
                      <p className="text-xs text-slate-500 mt-0.5 truncate">{stage.detail}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Info panel */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="lg:sticky lg:top-24 space-y-6"
          >
            <motion.div variants={staggerItem} className="sentinel-card p-8">
              <h3 className="text-xl font-bold mb-4 text-white" style={{ fontFamily: 'Space Grotesk' }}>
                SupplyChain Optimizer Pro
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Certification Status</span>
                  <span className="text-sm text-sky-400 font-medium">In Progress</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Stages Completed</span>
                  <span className="text-sm text-white font-medium">5 of 12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Current Stage</span>
                  <span className="text-sm text-sky-400">Behavioral Testing</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">ETA to Completion</span>
                  <span className="text-sm text-white">~47 minutes</span>
                </div>

                {/* Progress bar */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span>Overall Progress</span>
                    <span>42%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #0EA5E9, #22D3EE)' }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: '42%' } : { width: 0 }}
                      transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={staggerItem} className="sentinel-card p-6">
              <h4 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>Certification Levels</h4>
              <div className="space-y-3">
                {[
                  { level: 'Sovereign', desc: 'Highest trust. Mission-critical deployments.', color: '#22D3EE' },
                  { level: 'Advanced', desc: 'Verified. Enterprise-grade security.', color: '#0EA5E9' },
                  { level: 'Standard', desc: 'Certified. General business use.', color: '#10B981' },
                  { level: 'Basic', desc: 'Registered. Limited trust scope.', color: '#64748B' },
                ].map(({ level, desc, color }) => (
                  <div key={level} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                    <div>
                      <span className="text-xs font-semibold text-white">{level}</span>
                      <span className="text-xs text-slate-500 ml-2">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
