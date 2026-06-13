'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, Users, Key, Shield, Bell, Check, Plus, Trash2, ShieldAlert } from 'lucide-react';
import { pageTransition } from '@/lib/animations';

interface TeamMember {
  name: string;
  email: string;
  role: 'owner' | 'developer' | 'auditor';
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'team' | 'api' | 'security' | 'notifications'>('general');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // General settings state
  const [orgName, setOrgName] = useState('Amazi Enterprise');
  const [domain, setDomain] = useState('enterprise.com');
  const [adminEmail, setAdminEmail] = useState('admin@enterprise.com');
  const [timezone, setTimezone] = useState('UTC+5:30 (IST)');

  // Team state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: 'Ansh Sharma', email: 'ansh@enterprise.com', role: 'owner' },
    { name: 'Sarah Connor', email: 's.connor@enterprise.com', role: 'auditor' },
    { name: 'John Doe', email: 'j.doe@enterprise.com', role: 'developer' },
  ]);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<'owner' | 'developer' | 'auditor'>('developer');

  // API Keys state
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { id: 'key-1', name: 'Production Dashboard', key: 'sentinel_live_d8a7fc2b9e9e1c2e403d15a', created: '2026-05-12' },
    { id: 'key-2', name: 'Testing Sandbox', key: 'sentinel_test_f891ab0c13d8e9c0b15b3c5', created: '2026-06-01' },
  ]);
  const [newKeyName, setNewKeyName] = useState('');

  // Policies state
  const [policies, setPolicies] = useState([
    { id: 'approval', label: 'Require Master Agent approval for elevated permissions', enabled: true },
    { id: 'quarantine', label: 'Auto-quarantine agents with trust score below 70%', enabled: true },
    { id: 'block', label: 'Block all uncertified agent deployments', enabled: false },
    { id: 'injection', label: 'Enable prompt injection protection (all agents)', enabled: true },
    { id: 'alerts', label: 'Send real-time threat alerts to admin email', enabled: true },
  ]);

  const triggerToast = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const handleGeneralSave = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast('General settings updated successfully!');
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName || !newMemberEmail) return;
    setTeamMembers(prev => [...prev, { name: newMemberName, email: newMemberEmail, role: newMemberRole }]);
    setNewMemberName('');
    setNewMemberEmail('');
    triggerToast(`${newMemberName} added to the team!`);
  };

  const handleRemoveMember = (email: string) => {
    setTeamMembers(prev => prev.filter(m => m.email !== email));
    triggerToast('Team member removed.');
  };

  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;
    const randomHex = Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const newKey: ApiKey = {
      id: `key-${Date.now()}`,
      name: newKeyName,
      key: `sentinel_live_${randomHex}`,
      created: new Date().toISOString().split('T')[0],
    };
    setApiKeys(prev => [newKey, ...prev]);
    setNewKeyName('');
    triggerToast('New API key generated successfully!');
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys(prev => prev.filter(k => k.id !== id));
    triggerToast('API key revoked.');
  };

  const handleTogglePolicy = (id: string) => {
    setPolicies(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
    const policy = policies.find(p => p.id === id);
    triggerToast(`Policy "${policy?.label.slice(0, 30)}..." ${!policy?.enabled ? 'enabled' : 'disabled'}`);
  };

  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Organization Settings</h1>
          <p className="text-sm text-slate-400 mt-1">Manage your organization's configuration, team members, and security preferences</p>
        </div>

        {/* Toast Alert */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-2xl"
            >
              <Check className="w-4 h-4" />
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {[
              { id: 'general', icon: Building, label: 'General' },
              { id: 'team', icon: Users, label: 'Team Members' },
              { id: 'api', icon: Key, label: 'API Keys' },
              { id: 'security', icon: Shield, label: 'Security' },
              { id: 'notifications', icon: Bell, label: 'Notifications' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                  activeTab === item.id ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-sky-400' : 'text-slate-600'}`} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Panels */}
        <div className="lg:col-span-3 space-y-6">
          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="sentinel-card p-6">
              <h3 className="text-sm font-semibold text-white mb-5" style={{ fontFamily: 'Space Grotesk' }}>General Settings</h3>
              <form onSubmit={handleGeneralSave} className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1.5">Organization Name</label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-300 outline-none focus:border-sky-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1.5">Primary Domain</label>
                  <input
                    type="text"
                    required
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-300 outline-none focus:border-sky-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1.5">Admin Email</label>
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-300 outline-none focus:border-sky-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1.5">Timezone</label>
                  <input
                    type="text"
                    required
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-300 outline-none focus:border-sky-500/50 transition-colors"
                  />
                </div>
                <div className="mt-6 flex gap-3 pt-2">
                  <button type="submit" className="bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Team Members Tab */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              {/* Member Add Form */}
              <div className="sentinel-card p-6">
                <h3 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>Invite Team Member</h3>
                <form onSubmit={handleAddMember} className="grid md:grid-cols-4 gap-4 items-end">
                  <div className="md:col-span-1.5">
                    <label className="text-xs text-slate-400 block mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none focus:border-sky-500/50"
                    />
                  </div>
                  <div className="md:col-span-1.5">
                    <label className="text-xs text-slate-400 block mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@enterprise.com"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none focus:border-sky-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1.5">Role</label>
                    <select
                      value={newMemberRole}
                      onChange={(e) => setNewMemberRole(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none focus:border-sky-500/50"
                    >
                      <option value="owner">Owner</option>
                      <option value="developer">Developer</option>
                      <option value="auditor">Auditor</option>
                    </select>
                  </div>
                  <button type="submit" className="bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors">
                    <Plus className="w-4 h-4" />
                    Invite
                  </button>
                </form>
              </div>

              {/* Members List */}
              <div className="sentinel-card p-6">
                <h3 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>Current Members</h3>
                <div className="divide-y divide-slate-850">
                  {teamMembers.map(member => (
                    <div key={member.email} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                      <div>
                        <div className="text-sm font-medium text-white">{member.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{member.email}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                          member.role === 'owner' ? 'bg-amber-400/10 border-amber-400/20 text-amber-400' :
                          member.role === 'developer' ? 'bg-sky-400/10 border-sky-400/20 text-sky-400' :
                          'bg-purple-400/10 border-purple-400/20 text-purple-400'
                        }`}>
                          {member.role}
                        </span>
                        {member.role !== 'owner' && (
                          <button
                            onClick={() => handleRemoveMember(member.email)}
                            className="text-slate-500 hover:text-red-400 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* API Keys Tab */}
          {activeTab === 'api' && (
            <div className="space-y-6">
              {/* Generate form */}
              <div className="sentinel-card p-6">
                <h3 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>Generate API Key</h3>
                <form onSubmit={handleGenerateKey} className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="text-xs text-slate-400 block mb-1.5">Key Description/Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. CI/CD Pipeline Agent"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none focus:border-sky-500/50"
                    />
                  </div>
                  <button type="submit" className="bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors">
                    Generate Key
                  </button>
                </form>
              </div>

              {/* Keys List */}
              <div className="sentinel-card p-6">
                <h3 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>Active API Keys</h3>
                <div className="space-y-4">
                  {apiKeys.map(key => (
                    <div key={key.id} className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold text-white">{key.name}</div>
                        <div className="text-xs text-slate-500 mt-1" style={{ fontFamily: 'JetBrains Mono' }}>{key.key}</div>
                      </div>
                      <div className="flex items-center gap-4 justify-between flex-shrink-0">
                        <span className="text-[10px] text-slate-600">Created: {key.created}</span>
                        <button
                          onClick={() => handleRevokeKey(key.id)}
                          className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors border border-red-400/20 bg-red-400/5 px-3 py-1 rounded-lg"
                        >
                          Revoke
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="sentinel-card p-6">
              <h3 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>Security Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-850">
                  <div>
                    <span className="text-sm text-slate-200 block font-medium">Multi-Factor Authentication (MFA)</span>
                    <span className="text-xs text-slate-500 mt-0.5">Enforce MFA for all team member logins</span>
                  </div>
                  <button className="w-10 h-5 rounded-full transition-colors relative bg-sky-500">
                    <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all left-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-850">
                  <div>
                    <span className="text-sm text-slate-200 block font-medium">IP Allowlist Restriction</span>
                    <span className="text-xs text-slate-500 mt-0.5">Limit dashboard access to whitelisted IP blocks</span>
                  </div>
                  <button className="w-10 h-5 rounded-full transition-colors relative bg-slate-700">
                    <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all left-0.5" />
                  </button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <span className="text-sm text-slate-200 block font-medium">Auto Session Expiry</span>
                    <span className="text-xs text-slate-500 mt-0.5">Log out users after 15 minutes of inactivity</span>
                  </div>
                  <button className="w-10 h-5 rounded-full transition-colors relative bg-sky-500">
                    <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all left-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="sentinel-card p-6">
              <h3 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-850">
                  <div>
                    <span className="text-sm text-slate-200 block font-medium">Critical Threat Emails</span>
                    <span className="text-xs text-slate-500 mt-0.5">Send instant email alerts on critical security threats</span>
                  </div>
                  <button className="w-10 h-5 rounded-full transition-colors relative bg-sky-500">
                    <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all left-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-850">
                  <div>
                    <span className="text-sm text-slate-200 block font-medium">Slack Integration Alerts</span>
                    <span className="text-xs text-slate-500 mt-0.5">Post incident reports to #security Slack channel</span>
                  </div>
                  <button className="w-10 h-5 rounded-full transition-colors relative bg-slate-700">
                    <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all left-0.5" />
                  </button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <span className="text-sm text-slate-200 block font-medium">Weekly Audit Reports</span>
                    <span className="text-xs text-slate-500 mt-0.5">Receive weekly compliance audit summary report</span>
                  </div>
                  <button className="w-10 h-5 rounded-full transition-colors relative bg-sky-500">
                    <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all left-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Governance Policies (always visible at bottom) */}
          <div className="sentinel-card p-6">
            <h3 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>Governance Policies</h3>
            <div className="space-y-4">
              {policies.map((policy) => (
                <div key={policy.id} className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-300">{policy.label}</span>
                  <button
                    onClick={() => handleTogglePolicy(policy.id)}
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
