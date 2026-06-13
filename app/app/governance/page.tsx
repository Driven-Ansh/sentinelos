'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, GitBranch, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { governanceActions } from '@/lib/mock-data';
import { pageTransition } from '@/lib/animations';
import { formatTimestamp, decisionColor, riskColor } from '@/lib/utils';

function RiskBar({ score }: { score: number }) {
  const color = score >= 75 ? '#EF4444' : score >= 50 ? '#F59E0B' : '#10B981';
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs tabular-nums" style={{ color, fontFamily: 'JetBrains Mono' }}>{score}</span>
    </div>
  );
}

export default function GovernancePage() {
  const [actions, setActions] = useState(governanceActions);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = actions.filter(a =>
    (filter === 'all' || a.decision === filter) &&
    (a.agentName.toLowerCase().includes(search.toLowerCase()) ||
     a.action.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Governance Center</h1>
          <p className="text-sm text-slate-400 mt-1">Real-time action monitoring and policy enforcement across all agents</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400" style={{ fontFamily: 'JetBrains Mono' }}>LIVE</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Actions', value: '48,291', color: '#0EA5E9' },
          { label: 'Approved', value: '46,104', color: '#10B981' },
          { label: 'Blocked', value: '2,051', color: '#EF4444' },
          { label: 'Escalated', value: '136', color: '#F59E0B' },
        ].map(s => (
          <div key={s.label} className="sentinel-card p-4">
            <div className="text-xl font-bold mb-1" style={{ color: s.color, fontFamily: 'Space Grotesk' }}>{s.value}</div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 bg-[#0D1117] border border-slate-800 rounded-xl px-4 py-3">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            placeholder="Search actions, agents, permissions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          {['all', 'approved', 'blocked', 'escalated'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                filter === f ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30' : 'text-slate-500 border border-slate-800 hover:text-slate-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="sentinel-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">Timestamp</th>
                <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">Agent</th>
                <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">Action</th>
                <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">Permission</th>
                <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">Risk</th>
                <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">Decision</th>
                <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filtered.map((action) => (
                <motion.tr
                  key={action.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <span className="text-xs text-slate-500 tabular-nums" style={{ fontFamily: 'JetBrains Mono' }}>
                      {formatTimestamp(action.timestamp)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-slate-300">{action.agentName}</span>
                    {action.masterAgentOverride && (
                      <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded border border-cyan-400/30 bg-cyan-400/10 text-cyan-400">MA</span>
                    )}
                  </td>
                  <td className="px-4 py-3 max-w-48">
                    <p className="text-xs text-slate-400 truncate">{action.action}</p>
                    <p className="text-[10px] text-slate-600 truncate">{action.context}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-slate-400 font-mono">{action.permission}</span>
                  </td>
                  <td className="px-4 py-3">
                    <RiskBar score={action.riskScore} />
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded border font-bold ${decisionColor(action.decision)}`}>
                      {action.decision.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="w-7 h-7 rounded border border-slate-700 bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                        <Eye className="w-3 h-3" />
                      </button>
                      <button className="w-7 h-7 rounded border border-slate-700 bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                        <GitBranch className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
