'use client';

import { motion } from 'framer-motion';
import { Activity, Cpu, Zap, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { agents } from '@/lib/mock-data';
import { pageTransition, staggerContainer, staggerItem } from '@/lib/animations';
import { timeAgo } from '@/lib/utils';

const agentSessions = agents.map((a, i) => ({
  ...a,
  sessionId: `sess-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
  startedAt: new Date(Date.now() - (i + 1) * 1200000).toISOString(),
  memoryUsage: Math.floor(Math.random() * 60 + 20),
  cpuUsage: Math.floor(Math.random() * 40 + 10),
  apiCalls: Math.floor(Math.random() * 500 + 50),
  toolCalls: Math.floor(Math.random() * 100 + 10),
  sessionStatus: i < 4 ? 'active' : 'idle',
}));

export default function MonitoringPage() {
  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Runtime Monitoring</h1>
          <p className="text-sm text-slate-400 mt-1">Live session monitoring and performance tracking for all active agents</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400" style={{ fontFamily: 'JetBrains Mono' }}>
            {agentSessions.filter(s => s.sessionStatus === 'active').length} Active Sessions
          </span>
        </div>
      </div>

      {/* Platform health */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Platform Health', value: '99.8%', color: '#10B981', icon: TrendingUp },
          { label: 'Active Sessions', value: '3,401', color: '#0EA5E9', icon: Activity },
          { label: 'Avg Response Time', value: '142ms', color: '#F59E0B', icon: Zap },
          { label: 'Anomalies Detected', value: '7', color: '#EF4444', icon: AlertTriangle },
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

      {/* Active agent sessions */}
      <div className="sentinel-card p-5">
        <h3 className="text-sm font-semibold text-white mb-5" style={{ fontFamily: 'Space Grotesk' }}>
          Agent Sessions
        </h3>
        <div className="space-y-4">
          {agentSessions.map((session) => (
            <div key={session.id} className="p-4 rounded-xl border border-slate-800 bg-slate-900/30 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-4">
                {/* Agent info */}
                <div className="flex items-center gap-3 min-w-52">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ backgroundColor: `${session.color}12`, border: `1px solid ${session.color}25` }}
                  >
                    {session.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{session.name}</p>
                    <p className="text-[10px] text-slate-600 font-mono">{session.sessionId}</p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${session.sessionStatus === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                  <span className={`text-xs capitalize ${session.sessionStatus === 'active' ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {session.sessionStatus}
                  </span>
                </div>

                {/* Resource bars */}
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>CPU</span>
                      <span className="text-white">{session.cpuUsage}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: session.cpuUsage > 70 ? '#EF4444' : '#0EA5E9', width: `${session.cpuUsage}%` }}
                        animate={{ width: [`${session.cpuUsage}%`, `${Math.min(session.cpuUsage + 5, 100)}%`, `${session.cpuUsage}%`] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Memory</span>
                      <span className="text-white">{session.memoryUsage}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-purple-400" style={{ width: `${session.memoryUsage}%` }} />
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="hidden md:flex items-center gap-6 text-xs text-slate-500">
                  <div className="text-center">
                    <div className="text-white font-medium">{session.apiCalls}</div>
                    <div>API Calls</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-medium">{session.toolCalls}</div>
                    <div>Tool Calls</div>
                  </div>
                  <div className="flex items-center gap-1 text-slate-600">
                    <Clock className="w-3 h-3" />
                    {timeAgo(session.startedAt)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
