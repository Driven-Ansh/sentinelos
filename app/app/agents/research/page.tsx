'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, TrendingUp, Network } from 'lucide-react';
import { pageTransition } from '@/lib/animations';

const papers = [
  { id: 1, title: 'Autonomous AI Governance: A Framework for Trust in Multi-Agent Systems', authors: 'Chen, L., Rodriguez, M., Kim, S.', year: 2025, citations: 234, venue: 'Nature AI', relevance: 98 },
  { id: 2, title: 'Prompt Injection Attacks in Production LLM Systems: A Systematic Review', authors: 'Zhao, W., Patel, A., Thompson, R.', year: 2026, citations: 89, venue: 'USENIX Security', relevance: 95 },
  { id: 3, title: 'Federated Trust Networks for Distributed Agent Ecosystems', authors: 'Nakamura, T., Osei, K., Williams, J.', year: 2025, citations: 178, venue: 'ICML 2025', relevance: 92 },
  { id: 4, title: 'Runtime Behavioral Analysis for AI Safety Verification', authors: 'Santos, F., Liu, X., Ahmed, R.', year: 2026, citations: 45, venue: 'NeurIPS 2025', relevance: 89 },
  { id: 5, title: 'Permission Boundaries in Agentic AI: Formal Methods and Practice', authors: 'Bergmann, H., Gupta, N., Park, J.', year: 2025, citations: 312, venue: 'IEEE S&P', relevance: 87 },
];

const knowledgeNodes = [
  { id: 'ai-safety', label: 'AI Safety', x: 45, y: 35, size: 20, color: '#0EA5E9' },
  { id: 'governance', label: 'Governance', x: 25, y: 60, size: 18, color: '#8B5CF6' },
  { id: 'agents', label: 'AI Agents', x: 65, y: 60, size: 22, color: '#22D3EE' },
  { id: 'trust', label: 'Trust Systems', x: 45, y: 80, size: 16, color: '#10B981' },
  { id: 'security', label: 'Security', x: 15, y: 40, size: 14, color: '#EF4444' },
  { id: 'ml', label: 'Machine Learning', x: 78, y: 30, size: 17, color: '#F59E0B' },
];

const knowledgeEdges = [
  { s: 'ai-safety', t: 'governance' }, { s: 'ai-safety', t: 'agents' },
  { s: 'agents', t: 'trust' }, { s: 'governance', t: 'trust' },
  { s: 'security', t: 'ai-safety' }, { s: 'ml', t: 'agents' },
];

function KnowledgeGraph() {
  return (
    <div className="bg-[#030508] rounded-xl border border-slate-800 overflow-hidden" style={{ height: 300 }}>
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {knowledgeEdges.map((e, i) => {
          const s = knowledgeNodes.find(n => n.id === e.s)!;
          const t = knowledgeNodes.find(n => n.id === e.t)!;
          return (
            <motion.line key={i}
              x1={s.x} y1={s.y} x2={t.x} y2={t.y}
              stroke="rgba(14,165,233,0.2)" strokeWidth="0.4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            />
          );
        })}
        {knowledgeNodes.map((node, i) => (
          <motion.g key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, type: 'spring' }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            <circle cx={node.x} cy={node.y} r={node.size / 10} fill={`${node.color}25`} stroke={node.color} strokeWidth="0.3" />
            <circle cx={node.x} cy={node.y} r={node.size / 20} fill={node.color} />
            <text x={node.x} y={node.y + node.size / 8} textAnchor="middle" fill="#94A3B8" fontSize="2.8" fontFamily="Inter">
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

export default function ResearchAgentPage() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'search' | 'graph' | 'trends'>('search');

  const filtered = papers.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.authors.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl text-3xl flex items-center justify-center" style={{ backgroundColor: '#8B5CF612', border: '1px solid #8B5CF625' }}>🔬</div>
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Research Intelligence Agent</h1>
          <p className="text-sm text-slate-400 mt-0.5">Scientific literature discovery, knowledge graph construction, and trend analysis</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="sentinel-badge text-blue-400 bg-blue-400/10 border-blue-400/30">ADVANCED</span>
            <span className="text-xs text-emerald-400">● Active</span>
            <span className="text-xs text-slate-500">Trust Score: 96.2%</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {(['search', 'graph', 'trends'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              activeTab === tab ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' : 'text-slate-500 border border-slate-800 hover:text-slate-300'
            }`}>
            {tab === 'search' ? 'Literature Search' : tab === 'graph' ? 'Knowledge Graph' : 'Research Trends'}
          </button>
        ))}
      </div>

      {activeTab === 'search' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-[#0D1117] border border-slate-800 rounded-xl px-4 py-3 hover:border-purple-500/30 transition-colors">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search millions of papers, authors, topics..."
              className="flex-1 bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none"
            />
          </div>
          <div className="space-y-3">
            {filtered.map(paper => (
              <div key={paper.id} className="sentinel-card p-5 hover:border-purple-500/20 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-2 py-0.5 rounded bg-purple-400/10 border border-purple-400/20 text-purple-400">{paper.venue}</span>
                      <span className="text-xs text-slate-500">{paper.year}</span>
                    </div>
                    <h4 className="text-sm font-medium text-white mb-1" style={{ fontFamily: 'Space Grotesk' }}>{paper.title}</h4>
                    <p className="text-xs text-slate-500">{paper.authors}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-600">
                      <span>{paper.citations} citations</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold text-purple-400">{paper.relevance}%</div>
                    <div className="text-[10px] text-slate-600">relevance</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'graph' && (
        <div className="sentinel-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>Knowledge Graph — AI Governance Domain</h3>
          </div>
          <KnowledgeGraph />
        </div>
      )}

      {activeTab === 'trends' && (
        <div className="grid md:grid-cols-2 gap-5">
          {['AI Agent Safety', 'Prompt Injection', 'Multi-Agent Systems', 'Governance Frameworks'].map((topic, i) => (
            <div key={topic} className="sentinel-card p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-white">{topic}</h4>
                <span className={`text-xs ${i < 2 ? 'text-emerald-400' : 'text-sky-400'}`}>
                  ↑ {[142, 89, 67, 44][i]}% YoY
                </span>
              </div>
              <div className="flex items-end gap-1 h-16">
                {Array.from({ length: 12 }, (_, j) => {
                  const h = 20 + Math.sin((j + i) * 0.5) * 15 + j * 3 + Math.random() * 10;
                  return (
                    <motion.div key={j} className="flex-1 rounded-t"
                      style={{ background: `${['#0EA5E9', '#8B5CF6', '#22D3EE', '#10B981'][i]}60` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.min(h, 100)}%` }}
                      transition={{ delay: j * 0.05, duration: 0.4 }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                <span>Jan 2025</span><span>Jun 2026</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
