'use client';

import { motion } from 'framer-motion';
import { Code2, BarChart3, Star, ArrowUpRight, Upload, TrendingUp, DollarSign } from 'lucide-react';
import { agents } from '@/lib/mock-data';
import { pageTransition, staggerContainer, staggerItem } from '@/lib/animations';
import { formatNumber, formatCurrency } from '@/lib/utils';

const myAgents = agents.slice(0, 3);

export default function DeveloperPage() {
  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Developer Hub</h1>
          <p className="text-sm text-slate-400 mt-1">Build, certify, and monetize AI agents on the SentinelOS ecosystem</p>
        </div>
        <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Upload className="w-4 h-4" />
          Submit New Agent
        </button>
      </div>

      {/* Dev stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'My Agents', value: '3', color: '#0EA5E9', icon: Code2 },
          { label: 'Total Subscribers', value: formatNumber(75301, true), color: '#10B981', icon: Star },
          { label: 'Monthly Revenue', value: '$48.2K', color: '#F59E0B', icon: DollarSign },
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
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20 text-emerald-400">
                      {agent.certificationLevel}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                    <span>{formatNumber(agent.subscribers, true)} subscribers</span>
                    <span>⭐ {agent.ratings}</span>
                    <span>Trust: <span className="text-sky-400">{agent.trustScore}%</span></span>
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
    </motion.div>
  );
}
