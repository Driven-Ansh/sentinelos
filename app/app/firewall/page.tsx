'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Check, X, AlertTriangle, Shield, ChevronRight } from 'lucide-react';
import { pageTransition, staggerContainer, staggerItem } from '@/lib/animations';

const permissionTypes = [
  { id: 'email', label: 'Email', icon: '📧', description: 'Read, send, and manage email' },
  { id: 'calendar', label: 'Calendar', icon: '📅', description: 'Read and write calendar events' },
  { id: 'files', label: 'File System', icon: '📁', description: 'Read and write files' },
  { id: 'database', label: 'Databases', icon: '🗄️', description: 'Query and modify databases' },
  { id: 'cloud_storage', label: 'Cloud Storage', icon: '☁️', description: 'Access cloud storage buckets' },
  { id: 'payment', label: 'Payment Systems', icon: '💳', description: 'Process and read payments' },
  { id: 'external_api', label: 'External APIs', icon: '🔌', description: 'Call third-party APIs' },
  { id: 'messaging', label: 'Messaging', icon: '💬', description: 'Send and read messages' },
  { id: 'network', label: 'Network', icon: '🌐', description: 'Network access and monitoring' },
  { id: 'execution', label: 'Code Execution', icon: '⚡', description: 'Execute code and commands' },
];

const agentPermissions = [
  { agentId: 'agent-001', agentName: 'Disaster Intelligence', icon: '🌐', perms: { external_api: 'granted', network: 'granted', email: 'denied', payment: 'blocked', execution: 'denied', database: 'expired' } },
  { agentId: 'agent-002', agentName: 'Cyber Defense', icon: '🛡️', perms: { network: 'granted', files: 'granted', external_api: 'granted', database: 'pending', payment: 'blocked', execution: 'granted' } },
  { agentId: 'agent-003', agentName: 'Research Intelligence', icon: '🔬', perms: { external_api: 'granted', files: 'denied', database: 'denied', email: 'denied', payment: 'blocked', network: 'granted' } },
  { agentId: 'agent-004', agentName: 'Healthcare Intelligence', icon: '⚕️', perms: { database: 'granted', external_api: 'granted', files: 'denied', payment: 'blocked', execution: 'denied', email: 'denied' } },
  { agentId: 'agent-005', agentName: 'Financial Intelligence', icon: '📊', perms: { external_api: 'granted', database: 'granted', payment: 'granted', email: 'denied', files: 'denied', network: 'granted' } },
];

const statusConfig = {
  granted: { icon: Check, color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: 'Granted' },
  denied: { icon: X, color: 'text-slate-600', bg: 'bg-slate-800', label: 'Denied' },
  blocked: { icon: Lock, color: 'text-red-400', bg: 'bg-red-400/10', label: 'Blocked' },
  pending: { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-400/10', label: 'Pending' },
  expired: { icon: X, color: 'text-orange-400', bg: 'bg-orange-400/10', label: 'Expired' },
};

export default function FirewallPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Permission Firewall</h1>
          <p className="text-sm text-slate-400 mt-1">Visual permission management with Master Agent oversight</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-400/5 border border-cyan-400/20 rounded-lg">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-cyan-400 font-medium">Master Agent Active</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'Total Permissions', value: '847', color: '#0EA5E9' },
          { label: 'Granted', value: '612', color: '#10B981' },
          { label: 'Denied', value: '124', color: '#64748B' },
          { label: 'Blocked', value: '89', color: '#EF4444' },
          { label: 'Pending Review', value: '22', color: '#F59E0B' },
        ].map(s => (
          <div key={s.label} className="sentinel-card p-4">
            <div className="text-xl font-bold mb-1" style={{ color: s.color, fontFamily: 'Space Grotesk' }}>{s.value}</div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Permission matrix */}
      <div className="sentinel-card overflow-hidden">
        <div className="p-5 border-b border-slate-800">
          <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>
            Permission Matrix — Agent × Permission Type
          </h3>
          <p className="text-xs text-slate-500 mt-1">Click any cell to view details and modify permissions</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left px-4 py-3 text-xs text-slate-500 font-medium sticky left-0 bg-[#0D1117]">Agent</th>
                {permissionTypes.map(pt => (
                  <th key={pt.id} className="px-3 py-3 text-center min-w-24">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-base">{pt.icon}</span>
                      <span className="text-[10px] text-slate-500 whitespace-nowrap">{pt.label}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {agentPermissions.map(agent => (
                <tr key={agent.agentId} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-4 py-3 sticky left-0 bg-[#0D1117]">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{agent.icon}</span>
                      <span className="text-sm text-slate-300 whitespace-nowrap">{agent.agentName}</span>
                    </div>
                  </td>
                  {permissionTypes.map(pt => {
                    const status = (agent.perms as unknown as Record<string, string>)[pt.id] || 'denied';
                    const cfg = statusConfig[status as keyof typeof statusConfig];
                    const Icon = cfg.icon;

                    return (
                      <td key={pt.id} className="px-3 py-3 text-center">
                        <button
                          onClick={() => setSelected(`${agent.agentId}-${pt.id}`)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-all hover:scale-110 ${cfg.bg}`}
                          title={`${agent.agentName} — ${pt.label}: ${cfg.label}`}
                        >
                          <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {Object.entries(statusConfig).map(([status, cfg]) => {
          const Icon = cfg.icon;
          return (
            <div key={status} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded flex items-center justify-center ${cfg.bg}`}>
                <Icon className={`w-3 h-3 ${cfg.color}`} />
              </div>
              <span className="text-xs text-slate-400 capitalize">{cfg.label}</span>
            </div>
          );
        })}
        <div className="ml-auto text-xs text-slate-500">
          Master Agent approval required for: Payment Systems, Code Execution, Database Write
        </div>
      </div>
    </motion.div>
  );
}
