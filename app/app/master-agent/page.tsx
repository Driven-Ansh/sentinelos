'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Shield, AlertTriangle, Clock, ChevronRight, Zap, Eye } from 'lucide-react';
import { masterAgentDecisions, governanceActions } from '@/lib/mock-data';
import { pageTransition, staggerContainer, staggerItem } from '@/lib/animations';
import { timeAgo } from '@/lib/utils';

// Simplified network graph visualization using SVG
function AgentRelationGraph() {
  const nodes = [
    { id: 'master', x: 300, y: 200, label: 'Master Agent', color: '#22D3EE', size: 28 },
    { id: 'disaster', x: 100, y: 100, label: 'Disaster', color: '#0EA5E9', size: 18 },
    { id: 'cyber', x: 500, y: 100, label: 'Cyber Defense', color: '#EF4444', size: 18 },
    { id: 'research', x: 100, y: 300, label: 'Research', color: '#8B5CF6', size: 18 },
    { id: 'health', x: 500, y: 300, label: 'Healthcare', color: '#10B981', size: 18 },
    { id: 'financial', x: 300, y: 360, label: 'Financial', color: '#F59E0B', size: 18 },
  ];

  const edges = [
    { source: 'master', target: 'disaster' },
    { source: 'master', target: 'cyber' },
    { source: 'master', target: 'research' },
    { source: 'master', target: 'health' },
    { source: 'master', target: 'financial' },
  ];

  const getNode = (id: string) => nodes.find(n => n.id === id)!;

  return (
    <div className="relative bg-[#050810] rounded-xl border border-slate-800 overflow-hidden" style={{ height: 400 }}>
      <svg viewBox="0 0 600 420" className="w-full h-full">
        {/* Background grid */}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 52} x2="600" y2={i * 52} stroke="rgba(14,165,233,0.04)" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="420" stroke="rgba(14,165,233,0.04)" strokeWidth="0.5" />
        ))}

        {/* Edges */}
        {edges.map((edge, i) => {
          const s = getNode(edge.source);
          const t = getNode(edge.target);
          return (
            <g key={i}>
              <motion.line
                x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                stroke="rgba(14,165,233,0.3)" strokeWidth="1"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
              {/* Animated data packet */}
              <motion.circle
                r="2.5" fill="#0EA5E9"
                animate={{
                  x: [s.x, t.x],
                  y: [s.y, t.y],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: 'linear' }}
              />
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            {/* Pulse ring */}
            {node.id === 'master' && (
              <motion.circle
                cx={node.x} cy={node.y} r={node.size + 10}
                stroke={node.color} strokeWidth="1" fill="none"
                animate={{ r: [node.size + 10, node.size + 22], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
            {/* Node circle */}
            <circle cx={node.x} cy={node.y} r={node.size} fill={`${node.color}20`} stroke={node.color} strokeWidth="1.5" />
            <circle cx={node.x} cy={node.y} r={node.id === 'master' ? 12 : 7} fill={node.color} opacity="0.9" />
            {/* Label */}
            <text x={node.x} y={node.y + node.size + 14} textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="Inter">
              {node.label}
            </text>
          </motion.g>
        ))}

        {/* Center label */}
        <text x="300" y="204" textAnchor="middle" fill="white" fontSize="9" fontFamily="Space Grotesk" fontWeight="600">
          MASTER
        </text>
      </svg>

      {/* Corner labels */}
      <div className="absolute top-3 left-3 text-[10px] text-slate-600" style={{ fontFamily: 'JetBrains Mono' }}>
        AGENT RELATIONSHIP GRAPH v4.2
      </div>
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] text-emerald-400">LIVE</span>
      </div>
    </div>
  );
}

export default function MasterAgentPage() {
  const decisions = masterAgentDecisions;

  const decisionTypeConfig = {
    block: { color: '#EF4444', bg: 'bg-red-400/10 border-red-400/20', label: 'BLOCK' },
    approve: { color: '#10B981', bg: 'bg-emerald-400/10 border-emerald-400/20', label: 'APPROVE' },
    quarantine: { color: '#8B5CF6', bg: 'bg-purple-400/10 border-purple-400/20', label: 'QUARANTINE' },
    alert: { color: '#F59E0B', bg: 'bg-yellow-400/10 border-yellow-400/20', label: 'ALERT' },
    escalate: { color: '#F97316', bg: 'bg-orange-400/10 border-orange-400/20', label: 'ESCALATE' },
  };

  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0EA5E9, #22D3EE)' }}>
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Master Agent</h1>
              <p className="text-xs text-slate-400">Autonomous Supervisory AI · v4.2.1</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400/5 border border-cyan-400/20">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-sm text-cyan-400 font-medium">Operational · 99.98% uptime</span>
        </div>
      </div>

      {/* Mission control stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Agents Monitored', value: '2,847', icon: Cpu, color: '#0EA5E9' },
          { label: 'Threats Prevented', value: '48,291', icon: Shield, color: '#10B981' },
          { label: 'Permissions Blocked', value: '2,051', icon: AlertTriangle, color: '#EF4444' },
          { label: 'Actions Intercepted', value: '127,834', icon: Zap, color: '#F59E0B' },
        ].map(m => (
          <div key={m.label} className="sentinel-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${m.color}15`, border: `1px solid ${m.color}25` }}>
                <m.icon className="w-4 h-4" style={{ color: m.color }} />
              </div>
            </div>
            <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>{m.value}</div>
            <div className="text-xs text-slate-500 mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Network graph */}
        <div className="lg:col-span-3">
          <div className="sentinel-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>
                Agent Relationship Graph
              </h3>
              <span className="text-xs text-slate-500">Master Agent ← Monitors → All Agents</span>
            </div>
            <AgentRelationGraph />
          </div>
        </div>

        {/* Reasoning feed */}
        <div className="lg:col-span-2">
          <div className="sentinel-card p-5 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>
                Reasoning Feed
              </h3>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] text-cyan-400" style={{ fontFamily: 'JetBrains Mono' }}>LIVE</span>
              </div>
            </div>

            <div className="space-y-4">
              {decisions.map((decision) => {
                const cfg = decisionTypeConfig[decision.type as keyof typeof decisionTypeConfig];
                return (
                  <motion.div
                    key={decision.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/50"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${cfg.bg}`} style={{ color: cfg.color }}>
                        {cfg.label}
                      </span>
                      <span className="text-xs text-slate-400 flex-1 truncate">{decision.agentName}</span>
                      <span className="text-[10px] text-slate-600 flex-shrink-0" style={{ fontFamily: 'JetBrains Mono' }}>
                        {timeAgo(decision.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{decision.reasoning}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-slate-600">Confidence: {(decision.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
