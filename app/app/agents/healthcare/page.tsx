'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, AlertTriangle, FileText, TrendingUp, Activity } from 'lucide-react';
import { pageTransition } from '@/lib/animations';

const patients = [
  { id: 'P001', age: 67, gender: 'M', condition: 'Hypertension + T2DM', riskScore: 78, lastVisit: '2 days ago', status: 'high-risk' },
  { id: 'P002', age: 45, gender: 'F', condition: 'Chronic Migraine', riskScore: 32, lastVisit: '1 week ago', status: 'moderate' },
  { id: 'P003', age: 82, gender: 'M', condition: 'CHF + COPD', riskScore: 94, lastVisit: '1 day ago', status: 'critical' },
  { id: 'P004', age: 38, gender: 'F', condition: 'Appendicitis (post-op)', riskScore: 18, lastVisit: 'Today', status: 'low-risk' },
];

const vitals = [
  { label: 'Heart Rate', value: '78 bpm', status: 'normal', color: '#10B981' },
  { label: 'Blood Pressure', value: '142/88 mmHg', status: 'elevated', color: '#F59E0B' },
  { label: 'O2 Saturation', value: '97%', status: 'normal', color: '#10B981' },
  { label: 'Temperature', value: '37.2°C', status: 'normal', color: '#10B981' },
];

const riskStatusConfig = {
  'critical': { color: '#EF4444', bg: 'bg-red-400/10 border-red-400/20' },
  'high-risk': { color: '#F97316', bg: 'bg-orange-400/10 border-orange-400/20' },
  'moderate': { color: '#F59E0B', bg: 'bg-yellow-400/10 border-yellow-400/20' },
  'low-risk': { color: '#10B981', bg: 'bg-emerald-400/10 border-emerald-400/20' },
};

export default function HealthcareAgentPage() {
  const [selected, setSelected] = useState(patients[2]);
  const [activeTab, setActiveTab] = useState<'patients' | 'assessment' | 'literature'>('patients');

  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl text-3xl flex items-center justify-center" style={{ backgroundColor: '#10B98112', border: '1px solid #10B98125' }}>⚕️</div>
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Healthcare Intelligence Agent</h1>
          <p className="text-sm text-slate-400 mt-0.5">Clinical decision support with patient risk assessment · Demo data only</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="sentinel-badge text-cyan-300 bg-cyan-300/10 border-cyan-300/30">SOVEREIGN</span>
            <span className="text-xs text-emerald-400">● HIPAA Compliant</span>
            <span className="text-xs text-slate-500">Trust Score: 97.5%</span>
          </div>
        </div>
      </div>

      <div className="p-3 rounded-xl border border-yellow-500/30 bg-yellow-500/5 text-xs text-yellow-400 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
        Demo mode: All patient data is synthetic and for demonstration purposes only. Not for clinical use.
      </div>

      <div className="flex items-center gap-2">
        {(['patients', 'assessment', 'literature'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              activeTab === tab ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'text-slate-500 border border-slate-800 hover:text-slate-300'
            }`}>
            {tab === 'patients' ? 'Patient Dashboard' : tab === 'assessment' ? 'Risk Assessment' : 'Medical Literature'}
          </button>
        ))}
      </div>

      {activeTab === 'patients' && (
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-1 space-y-3">
            {patients.map(p => {
              const cfg = riskStatusConfig[p.status as keyof typeof riskStatusConfig];
              return (
                <button key={p.id} onClick={() => setSelected(p)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    selected.id === p.id ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-slate-800 bg-[#0D1117] hover:border-slate-700'
                  }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white" style={{ fontFamily: 'JetBrains Mono' }}>{p.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded border ${cfg.bg}`} style={{ color: cfg.color }}>
                      {p.status.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{p.age}y {p.gender} · {p.condition}</p>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600">Risk Score</span>
                      <span style={{ color: cfg.color }}>{p.riskScore}/100</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${p.riskScore}%`, backgroundColor: cfg.color }} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="sentinel-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>
                  Patient {selected.id} — Current Status
                </h3>
                <span className={`sentinel-badge ${riskStatusConfig[selected.status as keyof typeof riskStatusConfig].bg}`}
                  style={{ color: riskStatusConfig[selected.status as keyof typeof riskStatusConfig].color }}>
                  {selected.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {vitals.map(v => (
                  <div key={v.label} className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-xs text-slate-500 mb-1">{v.label}</div>
                    <div className="font-semibold text-white">{v.value}</div>
                    <div className="text-xs mt-1" style={{ color: v.color }}>{v.status}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sentinel-card p-5">
              <h4 className="text-sm font-semibold text-white mb-3" style={{ fontFamily: 'Space Grotesk' }}>AI Clinical Recommendations</h4>
              <div className="space-y-2">
                {[
                  { priority: 'URGENT', rec: 'Adjust diuretic dosage given elevated BNP levels. Schedule cardiology follow-up within 72 hours.' },
                  { priority: 'HIGH', rec: 'Initiate pulmonary rehabilitation program. Current SpO2 trending toward threshold.' },
                  { priority: 'ROUTINE', rec: 'Review medication interactions: current regimen has 2 potential interactions.' },
                ].map(r => (
                  <div key={r.rec} className={`p-3 rounded-lg border flex gap-3 ${
                    r.priority === 'URGENT' ? 'border-red-400/20 bg-red-400/5' :
                    r.priority === 'HIGH' ? 'border-orange-400/20 bg-orange-400/5' :
                    'border-slate-800 bg-slate-900/50'
                  }`}>
                    <span className={`text-[10px] font-bold flex-shrink-0 mt-0.5 ${
                      r.priority === 'URGENT' ? 'text-red-400' : r.priority === 'HIGH' ? 'text-orange-400' : 'text-slate-500'
                    }`}>{r.priority}</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{r.rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'assessment' && (
        <div className="sentinel-card p-6">
          <h3 className="text-sm font-semibold text-white mb-6" style={{ fontFamily: 'Space Grotesk' }}>Patient Risk Assessment Matrix</h3>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { category: 'Cardiovascular Risk', score: 82, factors: ['Hypertension', 'Elevated troponin', 'Previous MI', 'Reduced EF'] },
              { category: 'Pulmonary Risk', score: 74, factors: ['COPD Stage III', 'Reduced FEV1', 'SpO2 trending'] },
              { category: 'Metabolic Risk', score: 45, factors: ['T2DM controlled', 'HbA1c 7.2%'] },
              { category: 'Fall Risk', score: 60, factors: ['Age >80', 'Polypharmacy', 'Reduced mobility'] },
            ].map(cat => (
              <div key={cat.category} className="p-4 rounded-xl border border-slate-800 bg-slate-900/30">
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-medium text-white">{cat.category}</span>
                  <span className={`text-sm font-bold ${cat.score >= 75 ? 'text-red-400' : cat.score >= 50 ? 'text-yellow-400' : 'text-emerald-400'}`}>
                    {cat.score}/100
                  </span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-3">
                  <motion.div className="h-full rounded-full"
                    style={{ width: `${cat.score}%`, backgroundColor: cat.score >= 75 ? '#EF4444' : cat.score >= 50 ? '#F59E0B' : '#10B981' }}
                    initial={{ width: 0 }} animate={{ width: `${cat.score}%` }} transition={{ duration: 0.8 }}
                  />
                </div>
                <div className="flex flex-wrap gap-1">
                  {cat.factors.map(f => (
                    <span key={f} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-500">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'literature' && (
        <div className="space-y-3">
          {[
            { title: 'Management of Acute Heart Failure in Elderly Patients with COPD', journal: 'NEJM', year: 2025, relevance: 97 },
            { title: 'Optimizing Diuretic Therapy in CHF: A Systematic Review', journal: 'JACC', year: 2026, relevance: 94 },
            { title: 'Pulmonary Rehabilitation Outcomes in Advanced COPD', journal: 'Lancet', year: 2025, relevance: 88 },
          ].map(paper => (
            <div key={paper.title} className="sentinel-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20 text-emerald-400">{paper.journal}</span>
                    <span className="text-xs text-slate-500">{paper.year}</span>
                  </div>
                  <h4 className="text-sm font-medium text-white">{paper.title}</h4>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold text-emerald-400">{paper.relevance}%</div>
                  <div className="text-[10px] text-slate-600">relevance</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
