'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Network, Zap, Lock, RefreshCw, Activity } from 'lucide-react';
import { pageTransition } from '@/lib/animations';

// Network topology visualization
function NetworkTopology() {
  const nodes = [
    { id: 'gateway', x: 300, y: 50, label: 'Gateway', color: '#0EA5E9', size: 20, status: 'secure' },
    { id: 'firewall', x: 300, y: 150, label: 'Firewall', color: '#22D3EE', size: 16, status: 'secure' },
    { id: 'server1', x: 150, y: 260, label: 'API Server', color: '#10B981', size: 14, status: 'secure' },
    { id: 'server2', x: 300, y: 260, label: 'DB Server', color: '#10B981', size: 14, status: 'alert' },
    { id: 'server3', x: 450, y: 260, label: 'Auth Server', color: '#10B981', size: 14, status: 'secure' },
    { id: 'client1', x: 80, y: 370, label: 'Client A', color: '#64748B', size: 10, status: 'secure' },
    { id: 'client2', x: 200, y: 370, label: 'Client B', color: '#64748B', size: 10, status: 'secure' },
    { id: 'threat', x: 520, y: 370, label: 'THREAT', color: '#EF4444', size: 12, status: 'threat' },
  ];

  const edges = [
    { s: 'gateway', t: 'firewall' }, { s: 'firewall', t: 'server1' },
    { s: 'firewall', t: 'server2' }, { s: 'firewall', t: 'server3' },
    { s: 'server1', t: 'client1' }, { s: 'server1', t: 'client2' },
    { s: 'server3', t: 'threat', threat: true },
  ];

  const getNode = (id: string) => nodes.find(n => n.id === id)!;

  return (
    <div className="bg-[#030508] rounded-xl border border-slate-800 overflow-hidden" style={{ height: 420 }}>
      <svg viewBox="0 0 600 420" className="w-full h-full">
        {/* Grid */}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1="0" y1={i * 52} x2="600" y2={i * 52} stroke="rgba(14,165,233,0.04)" strokeWidth="0.5" />
        ))}

        {/* Edges */}
        {edges.map((edge, i) => {
          const s = getNode(edge.s), t = getNode(edge.t);
          return (
            <g key={i}>
              <line
                x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                stroke={edge.threat ? 'rgba(239,68,68,0.4)' : 'rgba(14,165,233,0.2)'}
                strokeWidth={edge.threat ? '2' : '1'}
                strokeDasharray={edge.threat ? '4 2' : 'none'}
              />
              {edge.threat && (
                <motion.circle r="3" fill="#EF4444"
                  animate={{ cx: [s.x, t.x], cy: [s.y, t.y], opacity: [1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, type: 'spring' }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            {node.status === 'threat' && (
              <motion.circle cx={node.x} cy={node.y} r={node.size + 8}
                stroke="#EF4444" strokeWidth="1" fill="none"
                animate={{ r: [node.size + 8, node.size + 20], opacity: [0.6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            {node.status === 'alert' && (
              <motion.circle cx={node.x} cy={node.y} r={node.size + 6}
                stroke="#F59E0B" strokeWidth="1" fill="none"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
            <circle cx={node.x} cy={node.y} r={node.size}
              fill={`${node.color}20`} stroke={node.color} strokeWidth="1.5" />
            <circle cx={node.x} cy={node.y} r={node.size * 0.5}
              fill={node.color} opacity="0.9" />
            <text x={node.x} y={node.y + node.size + 14} textAnchor="middle"
              fill={node.status === 'threat' ? '#EF4444' : '#64748B'} fontSize="9" fontFamily="JetBrains Mono">
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
      <div className="absolute top-3 left-3 text-[9px] text-slate-600 space-y-0.5" style={{ fontFamily: 'JetBrains Mono' }}>
        <div>NETWORK TOPOLOGY MONITOR v5.1</div>
        <div className="text-red-400/70">● THREAT DETECTED: Auth Server → External</div>
      </div>
    </div>
  );
}

const threats = [
  { id: 't1', type: 'Brute Force', source: '192.168.44.201', target: 'Auth Server', severity: 'high', blocked: true, time: '2s ago' },
  { id: 't2', type: 'SQL Injection', source: '10.0.2.45', target: 'DB Server', severity: 'critical', blocked: true, time: '12s ago' },
  { id: 't3', type: 'Port Scan', source: '172.16.0.88', target: 'Gateway', severity: 'medium', blocked: false, time: '1m ago' },
  { id: 't4', type: 'XSS Attempt', source: '203.0.113.42', target: 'API Server', severity: 'low', blocked: true, time: '3m ago' },
];

const secScore = { overall: 94, network: 98, application: 91, identity: 96, data: 93 };

export default function CyberAgentPage() {
  const [activeTab, setActiveTab] = useState<'network' | 'threats' | 'scoring'>('network');

  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl text-3xl flex items-center justify-center" style={{ backgroundColor: '#EF444412', border: '1px solid #EF444425' }}>🛡️</div>
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Cyber Defense Agent</h1>
          <p className="text-sm text-slate-400 mt-0.5">Advanced threat detection, network analysis, and incident response automation</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="sentinel-badge text-cyan-300 bg-cyan-300/10 border-cyan-300/30">SOVEREIGN</span>
            <span className="text-xs text-emerald-400">● Monitoring</span>
            <span className="text-xs text-slate-500">Trust Score: 99.1%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Threats Blocked (24h)', value: '1,847', color: '#10B981' },
          { label: 'Active Connections', value: '48,291', color: '#0EA5E9' },
          { label: 'Anomalies Detected', value: '7', color: '#F59E0B' },
          { label: 'Security Score', value: '94/100', color: '#8B5CF6' },
        ].map(s => (
          <div key={s.label} className="sentinel-card p-4">
            <div className="text-xl font-bold mb-1" style={{ color: s.color, fontFamily: 'Space Grotesk' }}>{s.value}</div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        {(['network', 'threats', 'scoring'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              activeTab === tab ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'text-slate-500 border border-slate-800 hover:text-slate-300'
            }`}
          >
            {tab === 'network' ? 'Network Topology' : tab === 'threats' ? 'Threat Feed' : 'Security Score'}
          </button>
        ))}
      </div>

      {activeTab === 'network' && (
        <div className="sentinel-card p-5 relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>Live Network Topology</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              <span className="text-xs text-red-400 font-medium">ACTIVE THREAT DETECTED</span>
            </div>
          </div>
          <NetworkTopology />
        </div>
      )}

      {activeTab === 'threats' && (
        <div className="space-y-3">
          {threats.map(t => (
            <div key={t.id} className="sentinel-card p-4 flex items-center gap-4">
              <div className={`sentinel-badge flex-shrink-0 ${
                t.severity === 'critical' ? 'text-red-400 bg-red-400/10 border-red-400/20' :
                t.severity === 'high' ? 'text-orange-400 bg-orange-400/10 border-orange-400/20' :
                t.severity === 'medium' ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' :
                'text-blue-400 bg-blue-400/10 border-blue-400/20'
              }`}>{t.severity}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-white">{t.type}</span>
                  <span className="text-xs text-slate-500 font-mono">{t.source} → {t.target}</span>
                </div>
              </div>
              <span className={`text-xs font-medium ${t.blocked ? 'text-emerald-400' : 'text-yellow-400'}`}>
                {t.blocked ? '✓ Blocked' : '⚠ Active'}
              </span>
              <span className="text-xs text-slate-600" style={{ fontFamily: 'JetBrains Mono' }}>{t.time}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'scoring' && (
        <div className="sentinel-card p-6">
          <h3 className="text-sm font-semibold text-white mb-6" style={{ fontFamily: 'Space Grotesk' }}>Security Posture Score</h3>
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
              <span className="gradient-text-blue">{secScore.overall}</span>
              <span className="text-slate-600 text-3xl">/100</span>
            </div>
            <p className="text-slate-400 mt-2">Overall Security Score · Enterprise Grade</p>
          </div>
          <div className="space-y-4">
            {Object.entries(secScore).filter(([k]) => k !== 'overall').map(([domain, score]) => (
              <div key={domain}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400 capitalize">{domain}</span>
                  <span className="text-white font-medium">{score}/100</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #0EA5E9, #22D3EE)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
