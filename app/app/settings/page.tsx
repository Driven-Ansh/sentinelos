'use client';

import { motion } from 'framer-motion';
import { Settings, Building, Users, Key, Shield, Bell } from 'lucide-react';
import { pageTransition } from '@/lib/animations';

export default function SettingsPage() {
  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Organization Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Manage your organization's configuration, team members, and security preferences</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Nav */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {[
              { icon: Building, label: 'General', active: true },
              { icon: Users, label: 'Team Members', active: false },
              { icon: Key, label: 'API Keys', active: false },
              { icon: Shield, label: 'Security', active: false },
              { icon: Bell, label: 'Notifications', active: false },
            ].map(item => (
              <button key={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                  item.active ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                }`}>
                <item.icon className={`w-4 h-4 ${item.active ? 'text-sky-400' : 'text-slate-600'}`} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="sentinel-card p-6">
            <h3 className="text-sm font-semibold text-white mb-5" style={{ fontFamily: 'Space Grotesk' }}>General Settings</h3>
            <div className="space-y-4">
              {[
                { label: 'Organization Name', value: 'Amazi Enterprise', type: 'text' },
                { label: 'Primary Domain', value: 'enterprise.com', type: 'text' },
                { label: 'Admin Email', value: 'admin@enterprise.com', type: 'email' },
                { label: 'Timezone', value: 'UTC+5:30 (IST)', type: 'text' },
              ].map(field => (
                <div key={field.label}>
                  <label className="text-xs text-slate-400 block mb-1.5">{field.label}</label>
                  <input
                    type={field.type}
                    defaultValue={field.value}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-300 outline-none focus:border-sky-500/50 transition-colors"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button className="bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors">
                Save Changes
              </button>
              <button className="border border-slate-700 text-slate-400 hover:text-slate-300 text-sm px-5 py-2 rounded-lg transition-colors">
                Cancel
              </button>
            </div>
          </div>

          <div className="sentinel-card p-6">
            <h3 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>Governance Policies</h3>
            <div className="space-y-4">
              {[
                { label: 'Require Master Agent approval for elevated permissions', enabled: true },
                { label: 'Auto-quarantine agents with trust score below 70%', enabled: true },
                { label: 'Block all uncertified agent deployments', enabled: false },
                { label: 'Enable prompt injection protection (all agents)', enabled: true },
                { label: 'Send real-time threat alerts to admin email', enabled: true },
              ].map((policy) => (
                <div key={policy.label} className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-300">{policy.label}</span>
                  <button
                    className={`w-10 h-5 rounded-full transition-colors relative ${policy.enabled ? 'bg-sky-500' : 'bg-slate-700'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${policy.enabled ? 'left-5' : 'left-0.5'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
