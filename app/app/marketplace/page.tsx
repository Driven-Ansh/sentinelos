'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Users, Shield, ArrowRight, SlidersHorizontal, TrendingUp } from 'lucide-react';
import { agents } from '@/lib/mock-data';
import { pageTransition, staggerContainer, staggerItem } from '@/lib/animations';
import { certLevelColor, riskColor, formatNumber } from '@/lib/utils';
import Link from 'next/link';
import type { AgentCategory } from '@/lib/types';

const categories: { id: string; label: string }[] = [
  { id: 'all', label: 'All Agents' },
  { id: 'disaster_intelligence', label: 'Disaster Intelligence' },
  { id: 'cyber_defense', label: 'Cyber Defense' },
  { id: 'research_intelligence', label: 'Research' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'financial', label: 'Financial' },
  { id: 'compliance', label: 'Compliance' },
];

const sortOptions = ['Trust Score', 'Risk Level', 'Popularity', 'Rating', 'Newest'];

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('Trust Score');

  const filtered = agents.filter(a =>
    (category === 'all' || a.category === category) &&
    (a.name.toLowerCase().includes(search.toLowerCase()) ||
     a.description.toLowerCase().includes(search.toLowerCase()))
  );

  const certColor = (level: string) => {
    switch (level) {
      case 'sovereign': return '#22D3EE';
      case 'advanced': return '#0EA5E9';
      case 'standard': return '#10B981';
      default: return '#64748B';
    }
  };

  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Agent Marketplace</h1>
          <p className="text-sm text-slate-400 mt-1">{formatNumber(agents.length)} certified agents available · Updated live</p>
        </div>
        <Link
          href="/app/developer?open=true"
          className="flex items-center gap-2 bg-sky-500/10 border border-sky-500/30 text-sky-400 px-4 py-2 rounded-lg text-sm hover:bg-sky-500/20 transition-colors"
        >
          <Shield className="w-4 h-4" />
          Submit Agent
        </Link>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex items-center gap-3 bg-[#0D1117] border border-slate-800 rounded-xl px-4 py-3 hover:border-sky-500/30 transition-colors">
          <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search agents by name, capability, or developer..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none"
          />
        </div>
        <div className="flex items-center gap-2 bg-[#0D1117] border border-slate-800 rounded-xl px-4 py-3">
          <SlidersHorizontal className="w-4 h-4 text-slate-500" />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="bg-transparent text-sm text-slate-300 outline-none"
          >
            {sortOptions.map(o => <option key={o} value={o} className="bg-slate-900">{o}</option>)}
          </select>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              category === cat.id
                ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                : 'text-slate-500 hover:text-slate-300 border border-transparent hover:border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Agent grid */}
      <motion.div
        variants={staggerContainer(0.06)}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {filtered.map((agent) => (
          <motion.div
            key={agent.id}
            variants={staggerItem}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="sentinel-card p-6 flex flex-col group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: `${agent.color}15`, border: `1px solid ${agent.color}25` }}
                >
                  {agent.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm leading-tight" style={{ fontFamily: 'Space Grotesk' }}>
                    {agent.name}
                  </h3>
                  <p className="text-xs text-slate-500">{agent.developer}</p>
                </div>
              </div>
              <div
                className="text-[10px] font-bold px-2 py-1 rounded-full border"
                style={{
                  color: certColor(agent.certificationLevel),
                  borderColor: `${certColor(agent.certificationLevel)}30`,
                  background: `${certColor(agent.certificationLevel)}10`,
                }}
              >
                {agent.certificationLevel.toUpperCase()}
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-5 flex-1 line-clamp-3">
              {agent.description}
            </p>

            {/* Trust & Risk */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-900 rounded-lg p-3">
                <div className="text-xs text-slate-500 mb-1">Trust Score</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${agent.trustScore}%`, background: `linear-gradient(90deg, #0EA5E9, #22D3EE)` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-sky-400">{agent.trustScore}%</span>
                </div>
              </div>
              <div className="bg-slate-900 rounded-lg p-3">
                <div className="text-xs text-slate-500 mb-1">Risk Level</div>
                <div className={`text-sm font-bold ${riskColor(agent.riskLevel)} capitalize`}>
                  {agent.riskLevel}
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                <span className="text-xs text-slate-300 font-medium">{agent.ratings}</span>
                <span className="text-xs text-slate-600">({formatNumber(agent.reviewCount)})</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Users className="w-3 h-3" />
                {formatNumber(agent.subscribers, true)} subscribers
              </div>
              <div className="text-xs font-medium" style={{ color: agent.color }}>
                {agent.pricing.model === 'free' ? 'Free' :
                 agent.pricing.monthly ? `$${agent.pricing.monthly}/mo` : 'Enterprise'}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Link
                href={`/app/agents/${agent.slug}`}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                style={{
                  background: `${agent.color}15`,
                  border: `1px solid ${agent.color}30`,
                  color: agent.color,
                }}
              >
                Use Agent
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                href={`/app/agents/${agent.slug}`}
                className="flex items-center justify-center px-3 py-2 rounded-xl text-xs text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-300 transition-all duration-200"
              >
                Details
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
