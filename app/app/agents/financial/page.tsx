'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { marketData } from '@/lib/mock-data';
import { pageTransition } from '@/lib/animations';

const portfolio = [
  { symbol: 'SPX', name: 'S&P 500 Index', value: 485234, change: 2.34, changeAmt: 11094, color: '#0EA5E9' },
  { symbol: 'TECH', name: 'Technology ETF', value: 124891, change: -1.28, changeAmt: -1623, color: '#EF4444' },
  { symbol: 'BTC', name: 'Bitcoin', value: 67840, change: 4.72, changeAmt: 3063, color: '#F59E0B' },
  { symbol: 'BONDS', name: 'Treasury Bonds', value: 92100, change: 0.12, changeAmt: 110, color: '#10B981' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0D1117] border border-slate-700 rounded-xl p-3 text-xs">
      <p className="text-slate-400 mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-slate-300">{p.dataKey}: </span>
          <span className="text-white font-medium">{p.value?.toFixed(0)}</span>
        </div>
      ))}
    </div>
  );
};

export default function FinancialAgentPage() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'markets' | 'risk'>('portfolio');

  const totalValue = portfolio.reduce((sum, p) => sum + p.value, 0);

  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl text-3xl flex items-center justify-center" style={{ backgroundColor: '#F59E0B12', border: '1px solid #F59E0B25' }}>📊</div>
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Financial Intelligence Agent</h1>
          <p className="text-sm text-slate-400 mt-0.5">Portfolio analytics, market monitoring, risk assessment, and financial forecasting</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="sentinel-badge text-blue-400 bg-blue-400/10 border-blue-400/30">ADVANCED</span>
            <span className="text-xs text-emerald-400">● Market Open</span>
            <span className="text-xs text-slate-500">Trust Score: 98.0%</span>
          </div>
        </div>
      </div>

      {/* Portfolio summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Portfolio Value', value: `$${(totalValue / 1000).toFixed(1)}K`, color: '#F59E0B', icon: DollarSign },
          { label: 'Today\'s Gain', value: '+$12,644', color: '#10B981', icon: TrendingUp },
          { label: 'Portfolio Risk', value: 'Moderate', color: '#F59E0B', icon: AlertTriangle },
          { label: 'Sharpe Ratio', value: '1.84', color: '#0EA5E9', icon: BarChart3 },
        ].map(m => (
          <div key={m.label} className="sentinel-card p-5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${m.color}15`, border: `1px solid ${m.color}25` }}>
              <m.icon className="w-4 h-4" style={{ color: m.color }} />
            </div>
            <div className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>{m.value}</div>
            <div className="text-xs text-slate-500 mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        {(['portfolio', 'markets', 'risk'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              activeTab === tab ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30' : 'text-slate-500 border border-slate-800 hover:text-slate-300'
            }`}>
            {tab === 'portfolio' ? 'Portfolio' : tab === 'markets' ? 'Market Monitor' : 'Risk Analysis'}
          </button>
        ))}
      </div>

      {activeTab === 'portfolio' && (
        <div className="space-y-4">
          <div className="sentinel-card p-5">
            <div className="space-y-3">
              {portfolio.map(pos => (
                <div key={pos.symbol} className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: `${pos.color}15`, border: `1px solid ${pos.color}25`, color: pos.color }}>
                    {pos.symbol.slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{pos.symbol}</span>
                      <span className="text-sm font-semibold text-white">${pos.value.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">{pos.name}</span>
                      <span className={`text-xs font-medium flex items-center gap-1 ${pos.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {pos.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {pos.change >= 0 ? '+' : ''}{pos.change}% ({pos.changeAmt >= 0 ? '+' : ''}${pos.changeAmt.toLocaleString()})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'markets' && (
        <div className="sentinel-card p-5">
          <h3 className="text-sm font-semibold text-white mb-5" style={{ fontFamily: 'Space Grotesk' }}>Market Performance — 30 Day</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={marketData.slice(-20)}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,41,59,0.5)" />
              <XAxis dataKey="date" tick={{ fill: '#475569', fontSize: 10 }} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="SPX" stroke="#0EA5E9" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="NASDAQ" stroke="#22D3EE" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="BTC" stroke="#F59E0B" strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-6 mt-4 justify-center text-xs">
            {[{ label: 'SPX', color: '#0EA5E9' }, { label: 'NASDAQ', color: '#22D3EE' }, { label: 'BTC', color: '#F59E0B' }].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 rounded" style={{ backgroundColor: color }} />
                <span className="text-slate-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'risk' && (
        <div className="grid md:grid-cols-2 gap-5">
          <div className="sentinel-card p-5">
            <h4 className="text-sm font-semibold text-white mb-5" style={{ fontFamily: 'Space Grotesk' }}>Portfolio Risk Breakdown</h4>
            <div className="space-y-4">
              {[
                { label: 'Market Risk (Beta)', value: 1.24, max: 2, color: '#0EA5E9' },
                { label: 'Volatility (30d)', value: 18.4, max: 30, color: '#F59E0B' },
                { label: 'Concentration Risk', value: 35, max: 100, color: '#EF4444' },
                { label: 'Liquidity Score', value: 92, max: 100, color: '#10B981' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="text-white">{item.value}{item.max === 100 ? '%' : ''}</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full"
                      style={{ backgroundColor: item.color, width: `${(item.value / item.max) * 100}%` }}
                      initial={{ width: 0 }} animate={{ width: `${(item.value / item.max) * 100}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="sentinel-card p-5">
            <h4 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>AI Risk Alerts</h4>
            <div className="space-y-3">
              {[
                { severity: 'medium', msg: 'BTC allocation exceeds 15% threshold. Consider rebalancing.', color: '#F59E0B' },
                { severity: 'low', msg: 'TECH ETF showing divergence from broad market. Monitor correlation.', color: '#0EA5E9' },
                { severity: 'info', msg: 'Portfolio Sharpe ratio (1.84) above benchmark (1.20). Optimal.', color: '#10B981' },
              ].map((alert, i) => (
                <div key={i} className="p-3 rounded-lg border" style={{ borderColor: `${alert.color}25`, backgroundColor: `${alert.color}08` }}>
                  <p className="text-xs text-slate-300 leading-relaxed">{alert.msg}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
