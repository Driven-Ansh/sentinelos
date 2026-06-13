'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertTriangle, XCircle, Loader2, Plus, ArrowRight } from 'lucide-react';
import { certificationJobs } from '@/lib/mock-data';
import { pageTransition, staggerContainer, staggerItem } from '@/lib/animations';
import { timeAgo } from '@/lib/utils';
import type { CertificationStage } from '@/lib/types';
import Link from 'next/link';

const stageLabels: Record<CertificationStage, string> = {
  submission: 'Agent Submission',
  static_analysis: 'Static Code Analysis',
  dependency_inspection: 'Dependency Inspection',
  permission_review: 'Permission Review',
  security_scan: 'Security Scan',
  behavioral_testing: 'Behavioral Testing',
  injection_testing: 'Prompt Injection Testing',
  stress_testing: 'Stress Testing',
  trust_scoring: 'Trust Scoring',
  governance_scoring: 'Governance Scoring',
  report_generation: 'Report Generation',
  approval_decision: 'Approval Decision',
};

const statusConfig = {
  passed: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/30' },
  running: { icon: Loader2, color: 'text-sky-400', bg: 'bg-sky-400/10 border-sky-400/30' },
  pending: { icon: Clock, color: 'text-slate-600', bg: 'bg-slate-800 border-slate-700' },
  failed: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/30' },
  warning: { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/30' },
};

export default function CertificationPage() {
  const [selectedJob, setSelectedJob] = useState(certificationJobs[0]);
  const [progress, setProgress] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => Math.min(p + 0.3, 100));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const completedStages = selectedJob.stages.filter(s => s.status === 'passed').length;

  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Certification Center</h1>
          <p className="text-sm text-slate-400 mt-1">12-stage automated certification pipeline for AI agents</p>
        </div>
        <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Submit Agent
        </button>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Jobs', value: '3', color: '#0EA5E9' },
          { label: 'Passed Today', value: '12', color: '#10B981' },
          { label: 'Avg Time', value: '4.2h', color: '#F59E0B' },
          { label: 'Pass Rate', value: '94.1%', color: '#8B5CF6' },
        ].map(card => (
          <div key={card.label} className="sentinel-card p-4">
            <div className="text-2xl font-bold mb-1" style={{ color: card.color, fontFamily: 'Space Grotesk' }}>
              {card.value}
            </div>
            <div className="text-xs text-slate-500">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Active certification */}
        <div className="lg:col-span-3 sentinel-card p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>
                {selectedJob.agentName}
              </h2>
              <p className="text-sm text-slate-400">Submitted {timeAgo(selectedJob.submittedAt)}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-sky-400" style={{ fontFamily: 'Space Grotesk' }}>
                {progress.toFixed(0)}%
              </div>
              <div className="text-xs text-slate-500">Complete</div>
            </div>
          </div>

          {/* Overall progress bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-8">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #0EA5E9, #22D3EE)' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Stages */}
          <div className="space-y-2.5">
            {selectedJob.stages.map((stage, i) => {
              const cfg = statusConfig[stage.status as keyof typeof statusConfig];
              const Icon = cfg.icon;
              const isRunning = stage.status === 'running';

              return (
                <div
                  key={stage.stage}
                  className={`flex items-center gap-4 p-3.5 rounded-xl border transition-colors ${
                    isRunning ? 'border-sky-500/40 bg-sky-500/5' :
                    stage.status === 'passed' ? 'border-emerald-500/20 bg-emerald-500/3' :
                    'border-slate-800/50 bg-slate-900/30'
                  }`}
                >
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-slate-600 w-5 text-right tabular-nums" style={{ fontFamily: 'JetBrains Mono' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className={`w-7 h-7 rounded-lg border flex items-center justify-center ${cfg.bg}`}>
                      <Icon className={`w-3.5 h-3.5 ${cfg.color} ${isRunning ? 'animate-spin' : ''}`} />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${stage.status === 'pending' ? 'text-slate-600' : 'text-white'}`} style={{ fontFamily: 'Space Grotesk' }}>
                        {stageLabels[stage.stage]}
                      </span>
                      <div className="flex items-center gap-3">
                        {stage.score !== null && (
                          <span className="text-xs text-emerald-400 font-medium tabular-nums" style={{ fontFamily: 'JetBrains Mono' }}>
                            {stage.score}/100
                          </span>
                        )}
                        {isRunning && (
                          <span className="text-xs text-sky-400 animate-pulse">RUNNING</span>
                        )}
                        {stage.status === 'passed' && (
                          <span className="text-xs text-emerald-400 font-bold">PASSED</span>
                        )}
                      </div>
                    </div>
                    {stage.findings.length > 0 && (
                      <p className="text-[11px] text-slate-500 mt-0.5">{stage.findings[0]}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="sentinel-card p-5">
            <h3 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
              Stage Progress
            </h3>
            <div className="text-center py-4">
              <div className="text-4xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
                {completedStages}
                <span className="text-slate-600 text-2xl"> / {selectedJob.stages.length}</span>
              </div>
              <div className="text-sm text-slate-400 mt-1">Stages completed</div>
            </div>
            <div className="mt-4 space-y-2">
              {[
                { label: 'Passed', value: completedStages, color: '#10B981' },
                { label: 'Running', value: 1, color: '#0EA5E9' },
                { label: 'Pending', value: selectedJob.stages.length - completedStages - 1, color: '#64748B' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-400">{item.label}</span>
                  </div>
                  <span className="font-medium text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sentinel-card p-5">
            <h3 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>Pre-certification Score</h3>
            <div className="space-y-3">
              {[
                { label: 'Code Quality', score: 91 },
                { label: 'Security', score: 97 },
                { label: 'Permissions', score: 94 },
                { label: 'Dependencies', score: 88 },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>{item.label}</span>
                    <span className="text-white font-medium">{item.score}/100</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-sky-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sentinel-card p-5">
            <h3 className="text-sm font-semibold text-white mb-3" style={{ fontFamily: 'Space Grotesk' }}>Actions</h3>
            <div className="space-y-2">
              <button className="w-full py-2 px-3 rounded-lg text-xs text-sky-400 border border-sky-500/30 bg-sky-500/5 hover:bg-sky-500/10 transition-colors text-left">
                Download Partial Report
              </button>
              <button className="w-full py-2 px-3 rounded-lg text-xs text-slate-400 border border-slate-800 hover:border-slate-700 transition-colors text-left">
                Pause Certification
              </button>
              <button className="w-full py-2 px-3 rounded-lg text-xs text-red-400 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-colors text-left">
                Cancel & Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
