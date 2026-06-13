'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { agents } from '@/lib/mock-data';
import { Shield, Star, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { staggerContainer, staggerItem } from '@/lib/animations';

const certColors: Record<string, string> = {
  sovereign: '#22D3EE',
  advanced: '#0EA5E9',
  standard: '#10B981',
  basic: '#64748B',
};

export default function MarketplacePreview() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const featured = agents.slice(0, 4);

  return (
    <section id="marketplace" ref={ref} className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 100% 50%, rgba(139,92,246,0.04) 0%, transparent 60%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <div>
            <motion.div variants={staggerItem} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 mb-4">
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs text-purple-400 tracking-widest uppercase font-medium" style={{ fontFamily: 'JetBrains Mono' }}>
                Agent Marketplace
              </span>
            </motion.div>
            <motion.h2 variants={staggerItem} className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Space Grotesk' }}>
              Discover Certified
              <br />
              <span className="gradient-text-blue">AI Agents</span>
            </motion.h2>
          </div>
          <motion.div variants={staggerItem}>
            <Link
              href="/app/marketplace"
              className="flex items-center gap-2 border border-slate-700 hover:border-sky-500/50 text-slate-300 hover:text-white px-6 py-3 rounded-xl transition-all duration-200 text-sm"
            >
              Browse All Agents
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {featured.map((agent) => (
            <motion.div
              key={agent.id}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="sentinel-card p-6 group cursor-pointer flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: `${agent.color}15`, border: `1px solid ${agent.color}30` }}
                >
                  {agent.icon}
                </div>
                <div
                  className="text-xs font-bold px-2.5 py-1 rounded-full border"
                  style={{
                    color: certColors[agent.certificationLevel] || '#64748B',
                    borderColor: `${certColors[agent.certificationLevel] || '#64748B'}30`,
                    background: `${certColors[agent.certificationLevel] || '#64748B'}10`,
                  }}
                >
                  {agent.certificationLevel.toUpperCase()}
                </div>
              </div>

              <h3 className="font-semibold text-white text-sm mb-1.5" style={{ fontFamily: 'Space Grotesk' }}>
                {agent.name}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-1">
                {agent.description.substring(0, 80)}...
              </p>

              {/* Trust score */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-sky-400" />
                  <span className="text-xs text-sky-400 font-medium">{agent.trustScore}% Trust</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-slate-300">{agent.ratings}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{(agent.subscribers / 1000).toFixed(1)}K users</span>
                </div>
                <span style={{ color: agent.color }}>
                  {agent.pricing.model === 'free' ? 'Free' : agent.pricing.monthly ? `$${agent.pricing.monthly}/mo` : 'Enterprise'}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
