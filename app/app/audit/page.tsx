'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Eye, RefreshCw } from 'lucide-react';
import { auditEvents } from '@/lib/mock-data';
import { pageTransition } from '@/lib/animations';
import { formatTimestamp, severityColor, timeAgo } from '@/lib/utils';

const categoryColors: Record<string, string> = {
  auth: '#0EA5E9',
  agent: '#8B5CF6',
  governance: '#F59E0B',
  permission: '#EF4444',
  certification: '#10B981',
  system: '#64748B',
};

export default function AuditPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [severity, setSeverity] = useState('all');

  const filtered = auditEvents.filter(e =>
    (category === 'all' || e.category === category) &&
    (severity === 'all' || e.severity === severity) &&
    (e.actor.toLowerCase().includes(search.toLowerCase()) ||
     e.action.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Audit Logs</h1>
          <p className="text-sm text-slate-400 mt-1">Immutable event tracking with full correlation and compliance reporting</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700 text-slate-400 hover:text-white text-sm transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700 text-slate-400 hover:text-white text-sm transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Events (24h)', value: '127,834', color: '#0EA5E9' },
          { label: 'Critical Events', value: '2', color: '#EF4444' },
          { label: 'Unique Actors', value: '847', color: '#8B5CF6' },
          { label: 'Compliance Score', value: '99.7%', color: '#10B981' },
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
            placeholder="Search events, actors, resources..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="bg-[#0D1117] border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 outline-none"
          >
            <option value="all">All Categories</option>
            {['auth', 'agent', 'governance', 'permission', 'certification', 'system'].map(c => (
              <option key={c} value={c} className="capitalize">{c}</option>
            ))}
          </select>
          <select
            value={severity}
            onChange={e => setSeverity(e.target.value)}
            className="bg-[#0D1117] border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 outline-none"
          >
            <option value="all">All Severities</option>
            {['critical', 'high', 'medium', 'low', 'info'].map(s => (
              <option key={s} value={s} className="capitalize">{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Audit table */}
      <div className="sentinel-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">Timestamp</th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">Category</th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">Severity</th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">Actor</th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">Action</th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">Outcome</th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {filtered.map((event) => (
              <tr key={event.id} className="hover:bg-slate-800/20 transition-colors">
                <td className="px-4 py-3">
                  <span className="text-xs text-slate-500 tabular-nums" style={{ fontFamily: 'JetBrains Mono' }}>
                    {formatTimestamp(event.timestamp)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded capitalize"
                    style={{
                      color: categoryColors[event.category],
                      background: `${categoryColors[event.category]}15`,
                      border: `1px solid ${categoryColors[event.category]}25`,
                    }}
                  >
                    {event.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`sentinel-badge ${severityColor(event.severity)}`}>
                    {event.severity}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="text-xs text-slate-300">{event.actor}</p>
                    <p className="text-[10px] text-slate-600 capitalize">{event.actorType.replace('_', ' ')}</p>
                  </div>
                </td>
                <td className="px-4 py-3 max-w-56">
                  <p className="text-xs text-slate-400 truncate">{event.action}</p>
                  <p className="text-[10px] text-slate-600 truncate">→ {event.resource}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded capitalize ${
                    event.outcome === 'success' ? 'text-emerald-400 bg-emerald-400/10' :
                    event.outcome === 'blocked' ? 'text-red-400 bg-red-400/10' :
                    'text-red-400 bg-red-400/10'
                  }`}>
                    {event.outcome}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="w-7 h-7 rounded border border-slate-700 bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                    <Eye className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Compliance badges */}
      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-xs text-slate-500">Compliance status:</span>
        {['SOC2 Type II ✓', 'GDPR ✓', 'HIPAA ✓', 'ISO 27001 ✓', 'FedRAMP Ready'].map(badge => (
          <span key={badge} className="text-xs px-3 py-1 rounded-full bg-emerald-400/5 border border-emerald-400/20 text-emerald-400">
            {badge}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
