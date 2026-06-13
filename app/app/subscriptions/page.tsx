'use client';

import { motion } from 'framer-motion';
import { Check, Zap, Building, Shield, Globe, CreditCard } from 'lucide-react';
import { pageTransition } from '@/lib/animations';

const plans = [
  { name: 'Free', price: 0, color: '#64748B', icon: Zap, agents: 5, events: '1K', popular: false },
  { name: 'Professional', price: 149, color: '#0EA5E9', icon: Shield, agents: 50, events: '100K', popular: false },
  { name: 'Business', price: 499, color: '#22D3EE', icon: Building, agents: 500, events: 'Unlimited', popular: true },
  { name: 'Enterprise', price: null, color: '#8B5CF6', icon: Globe, agents: 'Unlimited', events: 'Unlimited', popular: false },
];

export default function SubscriptionsPage() {
  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Subscriptions</h1>
        <p className="text-sm text-slate-400 mt-1">Manage your SentinelOS subscription and billing</p>
      </div>

      {/* Current plan */}
      <div className="sentinel-card p-6 border-sky-500/30">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                <Building className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Current Plan</p>
                <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Business Plan</h2>
              </div>
            </div>
            <div className="flex items-center gap-6 mt-4 text-sm text-slate-400">
              <span>500 agents · Unlimited governance events · Priority support</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>$499</div>
            <div className="text-sm text-slate-500">/month · Renews Jun 30</div>
            <button className="mt-3 text-xs text-sky-400 hover:text-sky-300 border border-sky-500/30 px-3 py-1.5 rounded-lg transition-colors">
              Manage Billing
            </button>
          </div>
        </div>
      </div>

      {/* Upgrade options */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map(plan => (
          <div
            key={plan.name}
            className={`sentinel-card p-5 flex flex-col relative ${plan.popular ? 'border-cyan-400/40' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-cyan-400 text-slate-900 text-[10px] font-bold px-3 py-0.5 rounded-full">CURRENT</span>
              </div>
            )}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${plan.color}15`, border: `1px solid ${plan.color}25` }}>
                <plan.icon className="w-4 h-4" style={{ color: plan.color }} />
              </div>
              <span className="font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>{plan.name}</span>
            </div>
            <div className="mb-4">
              {plan.price !== null ? (
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>${plan.price}</span>
                  <span className="text-slate-500 text-sm">/mo</span>
                </div>
              ) : (
                <span className="text-lg font-semibold text-slate-300">Custom</span>
              )}
            </div>
            <ul className="space-y-2 flex-1 mb-5">
              {[
                `${plan.agents} agents`,
                `${plan.events} events/mo`,
                'Full certification pipeline',
                'Runtime monitoring',
              ].map(f => (
                <li key={f} className="flex items-center gap-2 text-xs text-slate-400">
                  <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              disabled={plan.popular}
              className={`w-full py-2 rounded-lg text-xs font-semibold transition-all ${
                plan.popular
                  ? 'bg-slate-800 text-slate-500 cursor-default'
                  : 'border text-white hover:bg-slate-800'
              }`}
              style={!plan.popular ? { borderColor: `${plan.color}40`, color: plan.color } : {}}
            >
              {plan.popular ? 'Current Plan' : plan.price === null ? 'Contact Sales' : 'Upgrade'}
            </button>
          </div>
        ))}
      </div>

      {/* Usage */}
      <div className="sentinel-card p-5">
        <h3 className="text-sm font-semibold text-white mb-5" style={{ fontFamily: 'Space Grotesk' }}>Current Usage</h3>
        <div className="space-y-4">
          {[
            { label: 'Registered Agents', used: 6, limit: 500, color: '#0EA5E9' },
            { label: 'Governance Events (this month)', used: 48291, limit: 999999, color: '#10B981' },
            { label: 'Certification Jobs', used: 1, limit: 50, color: '#8B5CF6' },
            { label: 'API Calls', used: 127834, limit: 5000000, color: '#F59E0B' },
          ].map(item => {
            const pct = Math.round((item.used / item.limit) * 100);
            return (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-400">{item.label}</span>
                  <span className="text-white">{item.used.toLocaleString()} / {item.limit.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${Math.max(pct, 2)}%`, backgroundColor: item.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
