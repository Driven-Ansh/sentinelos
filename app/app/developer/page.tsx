'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, BarChart3, Star, ArrowUpRight, Upload, TrendingUp, DollarSign, X, CheckCircle, ShieldAlert, Cpu, Database, Network } from 'lucide-react';
import { agents } from '@/lib/mock-data';
import { pageTransition, staggerContainer, staggerItem } from '@/lib/animations';
import { formatNumber } from '@/lib/utils';

function DeveloperPageContent() {
  const searchParams = useSearchParams();
  const shouldOpen = searchParams.get('open') === 'true';
  const [myAgents, setMyAgents] = useState(agents.slice(0, 3));
  const [isModalOpen, setIsModalOpen] = useState(shouldOpen);
  
  // Form state
  const [agentName, setAgentName] = useState('');
  const [version, setVersion] = useState('1.0.0');
  const [category, setCategory] = useState('financial');
  const [icon, setIcon] = useState('🤖');
  const [description, setDescription] = useState('');
  const [pricing, setPricing] = useState('299');
  const [permissions, setPermissions] = useState<string[]>(['network', 'external_api']);
  const [repoUrl, setRepoUrl] = useState('https://github.com/my-org/my-agent');
  
  // Pipeline Simulation State
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [simulationFinished, setSimulationFinished] = useState(false);

  const pipelineSteps = [
    { label: 'Verifying Repository Manifest', desc: 'Parsing package.json and agent.manifest.json...' },
    { label: 'Static Code Analysis', desc: 'Running ESLint, SonarQube rules, and type checks...' },
    { label: 'Security Vulnerability Scan', desc: 'Auditing npm dependencies for known CVEs...' },
    { label: 'Permission Range Verification', desc: 'Checking if requested permissions exceed capabilities...' },
    { label: 'Adversarial Prompt Injection Testing', desc: 'Fuzzing input channels with prompt injection payloads...' },
    { label: 'Behavioral Simulation Sandbox', desc: 'Simulating agent actions in virtual network sandbox...' },
    { label: 'Finalizing Certification Report', desc: 'Generating cryptographic signature and certificate...' },
  ];

  const handlePermissionToggle = (perm: string) => {
    if (permissions.includes(perm)) {
      setPermissions(permissions.filter(p => p !== perm));
    } else {
      setPermissions([...permissions, perm]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentName) return;
    
    // Start simulation
    setIsSimulating(true);
    setSimulationStep(0);
    setSimulationFinished(false);
    
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < pipelineSteps.length) {
        setSimulationStep(step);
      } else {
        clearInterval(interval);
        setSimulationFinished(true);
        // Add new agent to list
        const newAgent: any = {
          id: `agent-new-${Date.now()}`,
          name: agentName,
          slug: agentName.toLowerCase().replace(/\s+/g, '-'),
          description: description || 'No description provided.',
          longDescription: description,
          developer: 'Amazi Enterprise',
          developerAvatar: 'AE',
          version: version,
          category: category as any,
          trustScore: 95.0 + Math.random() * 4,
          governanceScore: 96.0 + Math.random() * 3,
          certificationLevel: 'advanced' as const,
          status: 'active' as const,
          riskLevel: 'low' as const,
          requiredPermissions: permissions.map((p, i) => ({
            id: `p-new-${i}`,
            name: p === 'network' ? 'Network Access' : p === 'external_api' ? 'External API Access' : p === 'database' ? 'Database Read/Write' : 'System Commands',
            type: p as any,
            scope: 'read/write',
            risk: 'medium',
            status: 'granted' as const
          })),
          pricing: { model: 'subscription' as const, monthly: parseInt(pricing) || 0, annual: (parseInt(pricing) || 0) * 10, currency: 'USD' },
          ratings: 5.0,
          reviewCount: 0,
          subscribers: 0,
          monthlyActiveUsers: 0,
          tags: [category, 'custom-agent'],
          capabilities: ['Custom action pipeline', 'Secure authentication API'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastAuditAt: new Date().toISOString(),
          icon: icon,
          color: category === 'financial' ? '#F59E0B' : category === 'cyber_defense' ? '#EF4444' : category === 'healthcare' ? '#10B981' : '#8B5CF6',
        };
        
        setTimeout(() => {
          setMyAgents(prev => [newAgent, ...prev]);
          setIsSimulating(false);
          setIsModalOpen(false);
          // Reset fields
          setAgentName('');
          setDescription('');
        }, 1200);
      }
    }, 1000);
  };

  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Developer Hub</h1>
          <p className="text-sm text-slate-400 mt-1">Build, certify, and monetize AI agents on the SentinelOS ecosystem</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Upload className="w-4 h-4" />
          Submit New Agent
        </button>
      </div>

      {/* Dev stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'My Agents', value: myAgents.length.toString(), color: '#0EA5E9', icon: Code2 },
          { label: 'Total Subscribers', value: formatNumber(75301 + (myAgents.length - 3) * 12, true), color: '#10B981', icon: Star },
          { label: 'Monthly Revenue', value: `$${(48.2 + (myAgents.length - 3) * 0.3).toFixed(1)}K`, color: '#F59E0B', icon: DollarSign },
          { label: 'Avg Trust Score', value: '97.9%', color: '#8B5CF6', icon: TrendingUp },
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

      {/* My agents */}
      <div className="sentinel-card p-5">
        <h3 className="text-sm font-semibold text-white mb-5" style={{ fontFamily: 'Space Grotesk' }}>My Agents</h3>
        <div className="space-y-4">
          {myAgents.map(agent => (
            <div key={agent.id} className="p-4 rounded-xl border border-slate-800 bg-slate-900/30 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl text-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${agent.color}15`, border: `1px solid ${agent.color}25` }}>
                  {agent.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-white">{agent.name}</span>
                    <span className="text-xs text-slate-500">v{agent.version}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 uppercase">
                      {agent.certificationLevel}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                    <span>{formatNumber(agent.subscribers, true)} subscribers</span>
                    <span>⭐ {agent.ratings}</span>
                    <span>Trust: <span className="text-sky-400">{agent.trustScore.toFixed(1)}%</span></span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-white">
                    {agent.pricing.monthly ? `$${agent.pricing.monthly}/mo` : 'Enterprise'}
                  </div>
                  <div className="text-xs text-slate-500">per subscription</div>
                </div>
                <button className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 transition-colors">
                  Manage <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SDK & API */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="sentinel-card p-6">
          <h3 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>Quick Start</h3>
          <div className="terminal p-4 rounded-lg space-y-1">
            <p className="text-emerald-400 text-xs">$ npm install @sentinelos/sdk</p>
            <p className="text-slate-400 text-xs">$ sentinel init my-agent</p>
            <p className="text-slate-400 text-xs">$ sentinel certify --submit</p>
            <p className="text-emerald-400 text-xs">✓ Agent submitted for certification</p>
          </div>
        </div>
        <div className="sentinel-card p-6">
          <h3 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>API Access</h3>
          <div className="space-y-3">
            {['REST API', 'GraphQL', 'WebSocket', 'gRPC'].map(api => (
              <div key={api} className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{api}</span>
                <span className="text-xs text-emerald-400 font-medium">Available</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Agent Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSimulating && setIsModalOpen(false)}
              className="absolute inset-0 bg-[#030712]/80 backdrop-filter backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#090D16] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 p-6"
            >
              {!isSimulating ? (
                <>
                  <div className="flex items-center justify-between mb-6 border-b border-slate-800/50 pb-4">
                    <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Submit New Agent</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Agent Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. SupplyChain Optimizer"
                          value={agentName}
                          onChange={(e) => setAgentName(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-sky-500/50"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Version</label>
                        <input
                          type="text"
                          required
                          value={version}
                          onChange={(e) => setVersion(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-sky-500/50"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Category</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none focus:border-sky-500/50"
                        >
                          <option value="financial">Financial</option>
                          <option value="cyber_defense">Cyber Defense</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="disaster_intelligence">Disaster Intelligence</option>
                          <option value="utility">Utility</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Agent Icon (Emoji)</label>
                        <select
                          value={icon}
                          onChange={(e) => setIcon(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none focus:border-sky-500/50"
                        >
                          <option value="🤖">🤖 Robot</option>
                          <option value="📊">📊 Chart</option>
                          <option value="🛡️">🛡️ Shield</option>
                          <option value="🌐">🌐 Globe</option>
                          <option value="🔬">🔬 Microscope</option>
                          <option value="⚕️">⚕️ Healthcare</option>
                          <option value="⚙️">⚙️ Cog</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Pricing (USD/month)</label>
                        <input
                          type="number"
                          value={pricing}
                          onChange={(e) => setPricing(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-sky-500/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Repository URL</label>
                      <input
                        type="url"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-sky-500/50"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Description</label>
                      <textarea
                        rows={2}
                        placeholder="What capabilities does your agent provide?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-sky-500/50 resize-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 block mb-2">Requested Permissions</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'network', name: 'Network Access', desc: 'Allows outgoing network calls' },
                          { id: 'external_api', name: 'External API access', desc: 'Queries public/private APIs' },
                          { id: 'database', name: 'Database access', desc: 'Read/write records in DB' },
                          { id: 'system', name: 'System Commands', desc: 'Execute low-level OS operations' },
                        ].map(perm => (
                          <div
                            key={perm.id}
                            onClick={() => handlePermissionToggle(perm.id)}
                            className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                              permissions.includes(perm.id) ? 'bg-sky-500/10 border-sky-500/35 text-white' : 'bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-800'
                            }`}
                          >
                            <div className="font-semibold text-xs">{perm.name}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">{perm.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 justify-end pt-4 border-t border-slate-800/50">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="border border-slate-700 text-slate-400 hover:text-slate-300 text-xs px-4 py-2 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold px-5 py-2 rounded-lg transition-colors"
                      >
                        Start Certification
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                /* Simulation Pipeline Overlay */
                <div className="py-6 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border border-sky-500/30 bg-sky-500/5 flex items-center justify-center mb-5 animate-pulse">
                    <Code2 className="w-5 h-5 text-sky-400" />
                  </div>
                  <h4 className="text-md font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
                    12-Stage Certification Pipeline Running
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">Analyzing agent code against SentinelOS trust rules</p>
                  
                  {/* Stages checklists */}
                  <div className="w-full mt-6 space-y-3 max-w-md bg-slate-950 border border-slate-800 rounded-xl p-4">
                    {pipelineSteps.map((step, idx) => {
                      const isActive = idx === simulationStep;
                      const isCompleted = idx < simulationStep;
                      return (
                        <div key={idx} className="flex items-start gap-3 opacity-90">
                          <div className="flex-shrink-0 mt-0.5">
                            {isCompleted ? (
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                            ) : isActive ? (
                              <div className="w-4 h-4 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-slate-800" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className={`text-xs font-semibold ${isCompleted ? 'text-slate-400 line-through' : isActive ? 'text-sky-400' : 'text-slate-600'}`}>
                              {step.label}
                            </div>
                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0, y: -2 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-[10px] text-slate-500 mt-0.5"
                              >
                                {step.desc}
                              </motion.div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function DeveloperPage() {
  return (
    <Suspense fallback={<div className="text-white text-xs">Loading Developer Hub...</div>}>
      <DeveloperPageContent />
    </Suspense>
  );
}
