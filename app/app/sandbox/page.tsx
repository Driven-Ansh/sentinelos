'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Square, RotateCcw, Terminal, Eye, Database, Zap } from 'lucide-react';
import { agents } from '@/lib/mock-data';
import { pageTransition } from '@/lib/animations';

const sandboxLogs = [
  { time: '00:00.000', type: 'init', msg: 'Sandbox environment initialized. Isolation level: STRICT' },
  { time: '00:00.124', type: 'info', msg: 'Agent loaded: Financial Intelligence Agent v6.1.3' },
  { time: '00:00.341', type: 'perm', msg: 'Permission check: external_api → ALLOWED (whitelist match)' },
  { time: '00:01.234', type: 'tool', msg: 'Tool call: fetch_market_data(symbol="SPX", range="30d")' },
  { time: '00:01.891', type: 'mem', msg: 'Memory write: portfolio_context → 2.4KB stored' },
  { time: '00:02.445', type: 'tool', msg: 'Tool call: calculate_risk_metrics(portfolio_id="demo-001")' },
  { time: '00:03.102', type: 'perm', msg: 'Permission check: database_write → DENIED (policy: read-only sandbox)' },
  { time: '00:03.103', type: 'warn', msg: 'GOVERNANCE: Database write attempt blocked by firewall' },
  { time: '00:03.890', type: 'info', msg: 'Agent gracefully handled denial: using cached data instead' },
  { time: '00:04.233', type: 'tool', msg: 'Tool call: generate_forecast(model="ARIMA", horizon=30)' },
  { time: '00:05.001', type: 'ok', msg: 'Simulation complete. All governance policies respected.' },
];

const logColors: Record<string, string> = {
  init: '#22D3EE', info: '#64748B', perm: '#F59E0B',
  tool: '#8B5CF6', mem: '#0EA5E9', warn: '#EF4444', ok: '#10B981',
};

export default function SandboxPage() {
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [visibleLogs, setVisibleLogs] = useState<typeof sandboxLogs>([]);
  const [selectedAgent, setSelectedAgent] = useState(agents[4]);

  const runSimulation = () => {
    setRunning(true);
    setCompleted(false);
    setVisibleLogs([]);
    sandboxLogs.forEach((log, i) => {
      setTimeout(() => {
        setVisibleLogs(prev => [...prev, log]);
        if (i === sandboxLogs.length - 1) {
          setRunning(false);
          setCompleted(true);
        }
      }, i * 500);
    });
  };

  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Agent Sandbox</h1>
          <p className="text-sm text-slate-400 mt-1">Test agent behavior, inspect decisions, and validate governance compliance in isolation</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Config panel */}
        <div className="lg:col-span-1 space-y-4">
          <div className="sentinel-card p-5">
            <h3 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>Agent Selection</h3>
            <div className="space-y-2">
              {agents.slice(0, 5).map(agent => (
                <button key={agent.id} onClick={() => setSelectedAgent(agent)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                    selectedAgent.id === agent.id ? 'bg-sky-500/10 border border-sky-500/20' : 'border border-transparent hover:bg-slate-800/50'
                  }`}>
                  <span className="text-lg">{agent.icon}</span>
                  <div>
                    <p className="text-xs font-medium text-white">{agent.name.split(' ')[0]}</p>
                    <p className="text-[10px] text-slate-500">v{agent.version}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="sentinel-card p-5">
            <h3 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>Isolation Level</h3>
            {['STRICT', 'MODERATE', 'PERMISSIVE'].map((level, i) => (
              <label key={level} className="flex items-center gap-3 py-2 cursor-pointer">
                <input type="radio" name="isolation" defaultChecked={i === 0} className="accent-sky-400" />
                <div>
                  <div className="text-xs font-medium text-slate-300">{level}</div>
                  <div className="text-[10px] text-slate-600">
                    {i === 0 ? 'All writes blocked' : i === 1 ? 'Audited writes allowed' : 'Full permissions'}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Sandbox terminal */}
        <div className="lg:col-span-3 space-y-4">
          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={runSimulation}
              disabled={running}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
            >
              <Play className="w-4 h-4" />
              {running ? 'Running...' : 'Run Simulation'}
            </button>
            <button onClick={() => { setVisibleLogs([]); setCompleted(false); }}
              className="flex items-center gap-2 border border-slate-700 text-slate-400 hover:text-white text-sm px-4 py-2.5 rounded-xl transition-colors">
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            {completed && (
              <span className="text-sm text-emerald-400 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                Simulation complete — 0 policy violations
              </span>
            )}
          </div>

          {/* Terminal */}
          <div className="terminal p-4 rounded-xl" style={{ minHeight: 400 }}>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="text-slate-600 text-xs ml-2" style={{ fontFamily: 'JetBrains Mono' }}>
                sentinelos/sandbox — {selectedAgent.name} v{selectedAgent.version}
              </span>
            </div>

            {visibleLogs.length === 0 && (
              <div className="text-slate-600 text-xs" style={{ fontFamily: 'JetBrains Mono' }}>
                <p>$ sentinel sandbox run --agent={selectedAgent.slug} --isolation=STRICT</p>
                <p className="mt-2 text-slate-700">Press "Run Simulation" to start...</p>
              </div>
            )}

            <div className="space-y-1">
              {visibleLogs.map((log, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-3 text-xs leading-relaxed">
                  <span className="text-slate-700 flex-shrink-0 tabular-nums">[{log.time}]</span>
                  <span className="flex-shrink-0 font-bold uppercase text-[10px] w-10" style={{ color: logColors[log.type] }}>
                    {log.type}
                  </span>
                  <span style={{ color: logColors[log.type] === '#EF4444' ? '#FCA5A5' : logColors[log.type] === '#10B981' ? '#6EE7B7' : '#CBD5E1' }}>
                    {log.msg}
                  </span>
                </motion.div>
              ))}
              {running && (
                <motion.div animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-emerald-400 text-xs" style={{ fontFamily: 'JetBrains Mono' }}>
                  ▮
                </motion.div>
              )}
            </div>
          </div>

          {/* Stats */}
          {completed && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-4 gap-3">
              {[
                { label: 'Tool Calls', value: '5', icon: Zap, color: '#8B5CF6' },
                { label: 'Memory Ops', value: '1', icon: Database, color: '#0EA5E9' },
                { label: 'Policy Checks', value: '8', icon: Eye, color: '#F59E0B' },
                { label: 'Violations', value: '0', icon: Terminal, color: '#10B981' },
              ].map(s => (
                <div key={s.label} className="sentinel-card p-4 text-center">
                  <div className="text-xl font-bold mb-1" style={{ color: s.color, fontFamily: 'Space Grotesk' }}>{s.value}</div>
                  <div className="text-[10px] text-slate-500">{s.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
