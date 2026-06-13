'use client';

import { useState } from 'react';
import { Search, Bell, HelpCircle, ChevronDown, Shield, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const breadcrumbMap: Record<string, string> = {
  '/app/dashboard': 'Dashboard',
  '/app/marketplace': 'Agent Marketplace',
  '/app/certification': 'Certification Center',
  '/app/governance': 'Governance Center',
  '/app/monitoring': 'Runtime Monitoring',
  '/app/threats': 'Threat Intelligence',
  '/app/firewall': 'Permission Firewall',
  '/app/master-agent': 'Master Agent',
  '/app/audit': 'Audit Logs',
  '/app/sandbox': 'Agent Sandbox',
  '/app/developer': 'Developer Hub',
  '/app/subscriptions': 'Subscriptions',
  '/app/settings': 'Settings',
  '/app/agents/disaster': 'Disaster Intelligence Agent',
  '/app/agents/cyber': 'Cyber Defense Agent',
  '/app/agents/research': 'Research Intelligence Agent',
  '/app/agents/healthcare': 'Healthcare Intelligence Agent',
  '/app/agents/financial': 'Financial Intelligence Agent',
};

interface TopbarProps {
  sidebarCollapsed: boolean;
}

export default function Topbar({ sidebarCollapsed }: TopbarProps) {
  const pathname = usePathname();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const pageName = breadcrumbMap[pathname] || 'SentinelOS';

  const notifications = [
    { id: 1, type: 'threat', message: 'Critical threat blocked: Prompt injection on Compliance Sentinel', time: '12s ago', color: 'bg-red-400' },
    { id: 2, type: 'cert', message: 'Certification stage passed: SupplyChain Optimizer Pro', time: '4m ago', color: 'bg-emerald-400' },
    { id: 3, type: 'gov', message: 'Permission violation blocked: Financial Intelligence Agent', time: '18m ago', color: 'bg-yellow-400' },
  ];

  return (
    <header
      className="fixed top-0 right-0 z-20 h-16 flex items-center px-6 gap-4 border-b border-slate-800"
      style={{
        left: sidebarCollapsed ? 64 : 256,
        background: 'rgba(8,11,18,0.95)',
        backdropFilter: 'blur(12px)',
        transition: 'left 0.2s ease-in-out',
      }}
    >
      {/* Page title */}
      <div className="flex items-center gap-2 flex-1">
        <div className="flex items-center gap-1.5 text-slate-500 text-sm">
          <Link href="/app/dashboard" className="hover:text-slate-300 transition-colors">SentinelOS</Link>
          <span>/</span>
          <span className="text-white font-medium">{pageName}</span>
        </div>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 w-64 hover:border-sky-500/30 transition-colors">
        <Search className="w-3.5 h-3.5 text-slate-500" />
        <input
          type="text"
          placeholder="Search agents, events, threats..."
          className="bg-transparent text-xs text-slate-400 placeholder:text-slate-600 outline-none flex-1"
        />
        <kbd className="text-[10px] text-slate-600 bg-slate-800 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
      </div>

      {/* Trust index */}
      <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-400/5 border border-emerald-400/20">
        <Shield className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-xs text-emerald-400 font-medium">Trust Index: 94.7</span>
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
          className="relative w-8 h-8 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all"
        >
          <Bell className="w-3.5 h-3.5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] flex items-center justify-center text-white font-bold">3</span>
        </button>

        <AnimatePresence>
          {notifOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-10 w-80 bg-[#0D1117] border border-slate-800 rounded-xl shadow-xl shadow-black/40 overflow-hidden"
            >
              <div className="p-3 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Notifications</span>
                <span className="text-xs text-sky-400">Mark all read</span>
              </div>
              {notifications.map(n => (
                <div key={n.id} className="p-3 border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${n.color} mt-1.5 flex-shrink-0`} />
                    <div>
                      <p className="text-xs text-slate-300 leading-relaxed">{n.message}</p>
                      <span className="text-[10px] text-slate-600 mt-1">{n.time}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-3 text-center">
                <span className="text-xs text-sky-400">View all notifications</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Help */}
      <button className="w-8 h-8 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all">
        <HelpCircle className="w-3.5 h-3.5" />
      </button>

      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:border-slate-700 transition-all"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center text-[10px] font-bold text-slate-900">
            AE
          </div>
          <span className="text-xs text-slate-300 hidden sm:block">Amazi Enterprise</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </button>

        <AnimatePresence>
          {profileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-10 w-56 bg-[#0D1117] border border-slate-800 rounded-xl shadow-xl shadow-black/40 overflow-hidden"
            >
              <div className="p-4 border-b border-slate-800">
                <div className="text-sm font-medium text-white">Amazi Enterprise</div>
                <div className="text-xs text-slate-500 mt-0.5">admin@enterprise.com</div>
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span className="text-xs text-sky-400">Business Plan</span>
                </div>
              </div>
              {[
                { label: 'Organization Settings', href: '/app/settings' },
                { label: 'Subscriptions', href: '/app/subscriptions' },
                { label: 'Developer Hub', href: '/app/developer' },
              ].map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setProfileOpen(false)}
                  className="block px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-slate-800">
                <Link href="/" className="block px-4 py-2.5 text-sm text-red-400 hover:bg-slate-800/50 transition-colors">
                  Sign Out
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
