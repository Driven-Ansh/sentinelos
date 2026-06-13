'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Eye, Zap, Globe, Clock } from 'lucide-react';
import { threatEvents } from '@/lib/mock-data';
import { pageTransition, staggerContainer, staggerItem } from '@/lib/animations';
import { timeAgo, severityColor } from '@/lib/utils';

// SVG World Map for threat visualization
function WorldThreatMap({ threats }: { threats: typeof threatEvents }) {
  // Simplified world map paths
  return (
    <div className="relative w-full bg-[#050810] rounded-xl border border-slate-800 overflow-hidden" style={{ height: 320 }}>
      <svg viewBox="0 0 1000 500" className="w-full h-full" style={{ opacity: 0.7 }}>
        {/* Grid lines */}
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="1000" y2={i * 50} stroke="rgba(14,165,233,0.06)" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 20 }, (_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="500" stroke="rgba(14,165,233,0.06)" strokeWidth="0.5" />
        ))}

        {/* Simplified continent shapes */}
        {/* North America */}
        <path d="M 80 120 L 240 100 L 260 160 L 220 200 L 180 220 L 140 200 L 100 180 Z" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.2)" strokeWidth="1" />
        {/* South America */}
        <path d="M 200 240 L 260 230 L 280 300 L 260 360 L 220 380 L 200 340 L 190 280 Z" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.2)" strokeWidth="1" />
        {/* Europe */}
        <path d="M 440 100 L 520 90 L 540 130 L 510 160 L 460 150 L 440 130 Z" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.2)" strokeWidth="1" />
        {/* Africa */}
        <path d="M 460 170 L 530 160 L 560 220 L 550 300 L 510 330 L 460 300 L 440 240 Z" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.2)" strokeWidth="1" />
        {/* Asia */}
        <path d="M 540 80 L 760 70 L 800 130 L 770 180 L 700 200 L 620 190 L 560 160 L 540 120 Z" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.2)" strokeWidth="1" />
        {/* Australia */}
        <path d="M 740 270 L 820 260 L 840 320 L 800 350 L 750 340 L 730 300 Z" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.2)" strokeWidth="1" />
      </svg>

      {/* Threat markers */}
      {threats.map((threat, i) => {
        if (!threat.location) return null;
        // Convert lat/lng to SVG coordinates
        const x = ((threat.location.lng + 180) / 360) * 1000;
        const y = ((90 - threat.location.lat) / 180) * 500;
        const color = threat.severity === 'critical' ? '#EF4444' : threat.severity === 'high' ? '#F97316' : '#F59E0B';

        return (
          <div
            key={threat.id}
            className="absolute"
            style={{ left: `${(x / 1000) * 100}%`, top: `${(y / 500) * 100}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className="relative flex items-center justify-center">
              <motion.div
                className="absolute rounded-full"
                style={{ background: color, width: 24, height: 24 }}
                animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              />
              <div
                className="w-3 h-3 rounded-full border-2 z-10 cursor-pointer hover:scale-125 transition-transform"
                style={{ backgroundColor: color, borderColor: color }}
                title={`${threat.type} — ${threat.location.country}`}
              />
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex items-center gap-4">
        {[
          { color: '#EF4444', label: 'Critical' },
          { color: '#F97316', label: 'High' },
          { color: '#F59E0B', label: 'Medium' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[10px] text-slate-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ThreatsPage() {
  const [threats, setThreats] = useState(threatEvents);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? threats : threats.filter(t => t.severity === filter);

  const threatTypeLabel = (type: string) => type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Threat Intelligence</h1>
          <p className="text-sm text-slate-400 mt-1">Real-time threat detection and analysis across the agent ecosystem</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/5 border border-red-500/20">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span className="text-sm text-red-400 font-medium">{threats.filter(t => t.severity === 'critical').length} Critical Active</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Threats', value: threats.length, color: '#EF4444', icon: AlertTriangle },
          { label: 'Blocked', value: threats.filter(t => t.blocked).length, color: '#10B981', icon: Shield },
          { label: 'Critical', value: threats.filter(t => t.severity === 'critical').length, color: '#EF4444', icon: Zap },
          { label: 'Countries', value: new Set(threats.map(t => t.location?.country)).size, color: '#0EA5E9', icon: Globe },
        ].map(s => (
          <div key={s.label} className="sentinel-card p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${s.color}15`, border: `1px solid ${s.color}25` }}>
              <s.icon className="w-4 h-4" style={{ color: s.color }} />
            </div>
            <div>
              <div className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* World Map */}
      <div className="sentinel-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>Global Threat Map</h3>
          <span className="text-xs text-slate-500">Hover markers for details</span>
        </div>
        <WorldThreatMap threats={threats} />
      </div>

      {/* Threat feed */}
      <div className="sentinel-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>Threat Events</h3>
          <div className="flex items-center gap-2">
            {['all', 'critical', 'high', 'medium'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-lg text-xs capitalize transition-all ${
                  filter === f ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30' : 'text-slate-500 border border-slate-800 hover:text-slate-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((threat) => (
            <motion.div
              key={threat.id}
              layout
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/30 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className={`sentinel-badge flex-shrink-0 ${severityColor(threat.severity)}`}>
                  {threat.severity}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-medium text-white">{threat.agentName}</span>
                    <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
                      {threatTypeLabel(threat.type)}
                    </span>
                    {threat.location && (
                      <span className="text-xs text-slate-500">
                        📍 {threat.location.country}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{threat.description}</p>
                  {threat.vector && (
                    <p className="text-[11px] text-slate-600 mt-1">Vector: {threat.vector}</p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <div className={`text-xs font-medium ${threat.blocked ? 'text-emerald-400' : 'text-yellow-400'}`}>
                    {threat.blocked ? '✓ BLOCKED' : '⚠ ACTIVE'}
                  </div>
                  <span className="text-[10px] text-slate-600 flex items-center gap-1" style={{ fontFamily: 'JetBrains Mono' }}>
                    <Clock className="w-2.5 h-2.5" />
                    {timeAgo(threat.timestamp)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
