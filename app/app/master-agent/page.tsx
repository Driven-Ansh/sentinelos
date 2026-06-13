'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, Shield, AlertTriangle, Clock, Zap, Terminal, ShieldCheck, Play, ShieldAlert } from 'lucide-react';
import { masterAgentDecisions } from '@/lib/mock-data';
import { pageTransition } from '@/lib/animations';
import { timeAgo } from '@/lib/utils';

// SVG Relationship Graph that responds to threat simulation
function AgentRelationGraph({ activeThreatNode, isMitigating }: { activeThreatNode: string | null; isMitigating: boolean }) {
  const nodes = [
    { id: 'master', x: 300, y: 200, label: 'Master Agent', color: '#22D3EE', size: 28 },
    { id: 'disaster', x: 100, y: 100, label: 'Disaster Agent', color: '#0EA5E9', size: 18 },
    { id: 'cyber', x: 500, y: 100, label: 'Cyber Defense', color: '#EF4444', size: 18 },
    { id: 'research', x: 100, y: 300, label: 'Research Agent', color: '#8B5CF6', size: 18 },
    { id: 'health', x: 500, y: 300, label: 'Healthcare Agent', color: '#10B981', size: 18 },
    { id: 'financial', x: 300, y: 360, label: 'Financial Agent', color: '#F59E0B', size: 18 },
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
    <div className="relative bg-[#050810] rounded-xl border border-slate-800 overflow-hidden" style={{ height: 380 }}>
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
          const isTargetThreat = edge.target === activeThreatNode;
          
          return (
            <g key={i}>
              <line
                x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                stroke={isTargetThreat ? '#EF4444' : 'rgba(14,165,233,0.25)'}
                strokeWidth={isTargetThreat ? '2' : '1'}
                strokeDasharray={isTargetThreat ? 'none' : '4 4'}
                className={isTargetThreat ? 'animate-pulse' : ''}
              />
              {/* Animated data packet */}
              <motion.circle
                cx={s.x}
                cy={s.y}
                r={isTargetThreat ? '3.5' : '2.5'}
                fill={isTargetThreat ? '#EF4444' : '#0EA5E9'}
                animate={{
                  cx: [s.x, t.x],
                  cy: [s.y, t.y],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: isTargetThreat ? 1 : 2, repeat: Infinity, delay: i * 0.4, ease: 'linear' }}
              />
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const isThreat = node.id === activeThreatNode;
          const nodeColor = isThreat ? '#EF4444' : node.color;
          const nodeSize = node.size;
          
          return (
            <g key={node.id} style={{ transformOrigin: `${node.x}px ${node.y}px` }}>
              {/* Threat pulse rings */}
              {isThreat && (
                <>
                  <circle cx={node.x} cy={node.y} r={nodeSize + 12} stroke="#EF4444" strokeWidth="1" fill="none" opacity="0.6">
                    <animate attributeName="r" values={`${nodeSize + 10};${nodeSize + 30}`} dur="1.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={node.x} cy={node.y} r={nodeSize + 8} stroke="#EF4444" strokeWidth="0.5" fill="none" opacity="0.3">
                    <animate attributeName="r" values={`${nodeSize + 8};${nodeSize + 45}`} dur="1.2s" begin="0.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0" dur="1.2s" begin="0.4s" repeatCount="indefinite" />
                  </circle>
                </>
              )}

              {/* Master Agent pulse ring */}
              {node.id === 'master' && (
                <circle cx={node.x} cy={node.y} r={nodeSize + 12} stroke={isMitigating ? '#EF4444' : '#22D3EE'} strokeWidth="1.2" fill="none">
                  <animate attributeName="r" values={`${nodeSize + 10};${nodeSize + 26}`} dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0" dur="2s" repeatCount="indefinite" />
                </circle>
              )}

              {/* Node circle */}
              <circle
                cx={node.x} cy={node.y} r={nodeSize}
                fill={`${nodeColor}15`}
                stroke={nodeColor}
                strokeWidth={isThreat || (node.id === 'master' && isMitigating) ? '2.5' : '1.5'}
              />
              <circle cx={node.x} cy={node.y} r={node.id === 'master' ? 12 : 7} fill={nodeColor} opacity="0.9" />
              
              {/* Label */}
              <text x={node.x} y={node.y + nodeSize + 14} textAnchor="middle" fill={isThreat ? '#EF4444' : '#94A3B8'} fontSize="10" fontFamily="Inter" fontWeight={isThreat ? '600' : 'normal'}>
                {node.label}
              </text>
            </g>
          );
        })}

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
        <span className="text-[10px] text-emerald-400">MONITOR ACTIVE</span>
      </div>
    </div>
  );
}

export default function MasterAgentPage() {
  const [decisions, setDecisions] = useState(masterAgentDecisions);
  const [threatCount, setThreatCount] = useState(48291);
  const [blockedCount, setBlockedCount] = useState(2051);
  
  // Threat simulation states
  const [activeThreatNode, setActiveThreatNode] = useState<string | null>(null);
  const [isMitigating, setIsMitigating] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState('injection');
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [simulationStatus, setSimulationStatus] = useState<'idle' | 'running' | 'completed'>('idle');

  const threatConfig = {
    injection: {
      nodeId: 'financial',
      agentName: 'Financial Agent',
      desc: 'Adversarial Prompt Injection',
      detail: 'Query attempt to override baseline settings and extract API keys.',
      logs: [
        '⚠️ ALERT: Anomalous instruction query intercepted on Financial Agent.',
        '🧠 REASONING: Input string contains instruction override tokens ("IGNORE PREVIOUS SYSTEM RULES"). Matching injection heuristic with 99.1% confidence.',
        '🛡️ MITIGATION: Terminating active agent thread. Creating sandboxed analysis instance.',
        '✅ FIXED: Outbound ports restricted. Memory context cleared. Threat mitigated.',
      ],
      outcome: 'Terminated injection thread. Restored agent memory baseline. Verified integrity.'
    },
    exfiltration: {
      nodeId: 'health',
      agentName: 'Healthcare Agent',
      desc: 'Database Data Exfiltration',
      detail: 'Anomalous POST request attempting to send 4,500 patient risk profiles.',
      logs: [
        '⚠️ ALERT: High-volume data transmission request logged from Healthcare Agent.',
        '🧠 REASONING: Outgoing POST payload contains encrypted HIPAA-restricted medical histories. Target destination is unregistered IP address. Exfiltration risk score: 96.8%.',
        '🛡️ MITIGATION: Initiating API egress block. Quarantining agent credentials.',
        '✅ FIXED: Egress block active. Quarantined Healthcare Agent credentials. Threat neutralized.',
      ],
      outcome: 'Blocked outbound payload transfer. Locked agent IAM scope. Compliance restored.'
    },
    write: {
      nodeId: 'cyber',
      agentName: 'Cyber Defense Agent',
      desc: 'Privilege Escalation Attempt',
      detail: 'Unauthorized write request to root firewall configurations.',
      logs: [
        '⚠️ ALERT: Cyber Defense Agent requested system-level write access to root configs.',
        '🧠 REASONING: Requested scope exceeds active developer manifest capabilities by 150%. No operator request logged. Threat risk score: 87.2%.',
        '🛡️ MITIGATION: Activating permission sandbox lock. Rejecting API call.',
        '✅ FIXED: Permission call rejected. Locked agent capability sandbox. Audit trail written.',
      ],
      outcome: 'Rejected privilege request. Confirmed firewall constraints. Operator notified.'
    }
  };

  const handleTriggerSimulation = () => {
    if (isMitigating) return;
    
    const cfg = threatConfig[selectedThreat as keyof typeof threatConfig];
    setActiveThreatNode(cfg.nodeId);
    setIsMitigating(true);
    setSimulationStatus('running');
    setSimulationLogs([]);

    let step = 0;
    const interval = setInterval(() => {
      if (step < cfg.logs.length) {
        setSimulationLogs(prev => [...prev, cfg.logs[step]]);
        step += 1;
      }
      
      if (step >= cfg.logs.length) {
        clearInterval(interval);
        setTimeout(() => {
          // Increment metrics
          setThreatCount(prev => prev + 1);
          setBlockedCount(prev => prev + 1);
          
          // Prepend new decision to feed
          const newDecision = {
            id: `mad-sim-${Date.now()}`,
            timestamp: new Date().toISOString(),
            type: 'block' as const,
            reasoning: `${cfg.agentName} triggered ${cfg.desc}. ${cfg.detail} Immediate block applied.`,
            agentId: `agent-${cfg.nodeId}`,
            agentName: cfg.agentName,
            confidence: 0.94,
            policyApplied: `${cfg.desc} Protection Protocol v2.5`,
            outcome: cfg.outcome,
          };
          setDecisions(prev => [newDecision, ...prev]);

          // End simulation
          setIsMitigating(false);
          setActiveThreatNode(null);
          setSimulationStatus('completed');
        }, 1200);
      }
    }, 1200);
  };

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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0EA5E9, #22D3EE)' }}>
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Master Agent</h1>
            <p className="text-xs text-slate-400">Autonomous Supervisory AI · v4.2.1</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400/5 border border-cyan-400/20">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-sm text-cyan-400 font-medium">Operational · 99.98% uptime</span>
        </div>
      </div>

      {/* Dashboard metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Agents Monitored', value: '2,847', icon: Cpu, color: '#0EA5E9' },
          { label: 'Threats Prevented', value: threatCount.toLocaleString(), icon: Shield, color: '#10B981' },
          { label: 'Permissions Blocked', value: blockedCount.toLocaleString(), icon: AlertTriangle, color: '#EF4444' },
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

      {/* Threat Mitigation Simulator Console */}
      <div className="sentinel-card p-6 border-red-500/25 bg-red-500/3">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2" style={{ fontFamily: 'Space Grotesk' }}>
              <ShieldAlert className="w-4 h-4 text-red-400" />
              Master Agent Threat Mitigation Simulator
            </h3>
            <p className="text-xs text-slate-500 mt-1">Select a threat scenario and watch how the Master Agent intercepts, reasons, and resolves it.</p>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-red-500/30 bg-red-500/10 text-red-400">DEMO RUNNER</span>
        </div>

        <div className="grid md:grid-cols-5 gap-6 items-start">
          {/* Simulator controls */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-2 font-medium">Select Threat Scenario</label>
              <div className="space-y-2">
                {[
                  { id: 'injection', title: 'Adversarial Prompt Injection', target: 'Financial Agent' },
                  { id: 'exfiltration', title: 'Data Exfiltration Attempt', target: 'Healthcare Agent' },
                  { id: 'write', title: 'Privilege Escalation Attempt', target: 'Cyber Defense Agent' },
                ].map(scenario => (
                  <div
                    key={scenario.id}
                    onClick={() => !isMitigating && setSelectedThreat(scenario.id)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                      selectedThreat === scenario.id ? 'bg-red-500/10 border-red-500/30 text-white' : 'bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-800'
                    }`}
                  >
                    <div className="font-semibold text-xs">{scenario.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Target: {scenario.target}</div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleTriggerSimulation}
              disabled={isMitigating}
              className="w-full bg-red-500 hover:bg-red-400 text-white text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-white" />
              {isMitigating ? 'Mitigation in Progress...' : 'Launch Incident Simulation'}
            </button>
          </div>

          {/* Simulator logs console */}
          <div className="md:col-span-3">
            <label className="text-xs text-slate-400 block mb-2 font-medium flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5" />
              Live Reasoning Output Console
            </label>
            <div className="terminal p-4 rounded-xl min-h-[175px] max-h-[175px] overflow-y-auto space-y-2 text-xs" style={{ fontFamily: 'JetBrains Mono' }}>
              {simulationLogs.length === 0 && (
                <div className="text-slate-600 italic flex items-center justify-center h-28">
                  Ready. Click 'Launch Incident Simulation' to start.
                </div>
              )}
              {simulationLogs.filter(Boolean).map((log, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={log?.startsWith('✅') ? 'text-emerald-400 font-bold' : log?.startsWith('⚠️') ? 'text-red-400 font-bold animate-pulse' : 'text-slate-300'}
                >
                  {log}
                </motion.div>
              ))}
              {simulationStatus === 'completed' && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-1.5 mt-4 p-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-[10px] font-bold"
                >
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  INCIDENT RESOLVED: Threat neutralized. Metrics updated. Verification complete.
                </motion.div>
              )}
            </div>
          </div>
        </div>
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
            <AgentRelationGraph activeThreatNode={activeThreatNode} isMitigating={isMitigating} />
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

            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
              <AnimatePresence>
                {decisions.map((decision) => {
                  const cfg = decisionTypeConfig[decision.type as keyof typeof decisionTypeConfig];
                  return (
                    <motion.div
                      key={decision.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
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
                        {decision.outcome && (
                          <span className="text-[9px] text-slate-500 italic truncate max-w-[140px]" title={decision.outcome}>
                            {decision.outcome}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
