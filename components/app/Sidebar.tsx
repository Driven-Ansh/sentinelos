'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Store, ShieldCheck, Scale, Activity,
  AlertTriangle, FileText, Lock, Brain, Code2, CreditCard,
  Settings, ChevronLeft, ChevronRight, Cpu, Beaker, ChevronDown,
} from 'lucide-react';
import SentinelLogo from '@/components/logo/SentinelLogo';
import { cn } from '@/lib/utils';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { href: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { href: '/app/marketplace', icon: Store, label: 'Marketplace' },
    ],
  },
  {
    label: 'Governance',
    items: [
      { href: '/app/certification', icon: ShieldCheck, label: 'Certification Center' },
      { href: '/app/governance', icon: Scale, label: 'Governance Center' },
      { href: '/app/monitoring', icon: Activity, label: 'Runtime Monitoring' },
      { href: '/app/threats', icon: AlertTriangle, label: 'Threat Intelligence' },
      { href: '/app/firewall', icon: Lock, label: 'Permission Firewall' },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { href: '/app/master-agent', icon: Brain, label: 'Master Agent' },
      { href: '/app/audit', icon: FileText, label: 'Audit Logs' },
      { href: '/app/sandbox', icon: Beaker, label: 'Agent Sandbox' },
    ],
  },
  {
    label: 'Developer',
    items: [
      { href: '/app/developer', icon: Code2, label: 'Developer Hub' },
    ],
  },
  {
    label: 'Organization',
    items: [
      { href: '/app/subscriptions', icon: CreditCard, label: 'Subscriptions' },
      { href: '/app/settings', icon: Settings, label: 'Settings' },
    ],
  },
];

const agents = [
  { href: '/app/agents/disaster', label: 'Disaster Intelligence', icon: '🌐', color: '#0EA5E9' },
  { href: '/app/agents/cyber', label: 'Cyber Defense', icon: '🛡️', color: '#EF4444' },
  { href: '/app/agents/research', label: 'Research Intelligence', icon: '🔬', color: '#8B5CF6' },
  { href: '/app/agents/healthcare', label: 'Healthcare Intelligence', icon: '⚕️', color: '#10B981' },
  { href: '/app/agents/financial', label: 'Financial Intelligence', icon: '📊', color: '#F59E0B' },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [agentsExpanded, setAgentsExpanded] = useState(true);

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-full z-30 flex flex-col overflow-hidden"
      style={{ background: '#080B12', borderRight: '1px solid #1E293B' }}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-slate-800 flex-shrink-0">
        <Link href="/" className="flex items-center gap-3 overflow-hidden">
          <div className="flex-shrink-0">
            <SentinelLogo size={30} animate={false} showText={false} />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="flex items-baseline gap-1 whitespace-nowrap"
              >
                <span className="font-bold text-sm gradient-text-blue" style={{ fontFamily: 'Space Grotesk' }}>Sentinel</span>
                <span className="text-cyan-400/60 text-sm" style={{ fontFamily: 'Space Grotesk' }}>OS</span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-4 space-y-6">
        {navGroups.map(group => (
          <div key={group.label}>
            {!collapsed && (
              <div className="px-4 mb-2">
                <span className="text-[10px] font-semibold text-slate-600 tracking-widest uppercase" style={{ fontFamily: 'JetBrains Mono' }}>
                  {group.label}
                </span>
              </div>
            )}
            <div className="space-y-0.5 px-2">
              {group.items.map(item => {
                const active = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 group',
                      active
                        ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                    )}
                  >
                    <item.icon className={cn('w-4 h-4 flex-shrink-0', active ? 'text-sky-400' : 'text-slate-600 group-hover:text-slate-400')} />
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.1 }}
                          className="truncate whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Demo Agents */}
        {!collapsed && (
          <div>
            <div className="px-4 mb-2">
              <button
                onClick={() => setAgentsExpanded(!agentsExpanded)}
                className="flex items-center gap-2 text-[10px] font-semibold text-slate-600 hover:text-slate-400 tracking-widest uppercase transition-colors"
                style={{ fontFamily: 'JetBrains Mono' }}
              >
                <Cpu className="w-3 h-3" />
                Demo Agents
                <ChevronDown className={cn('w-3 h-3 ml-auto transition-transform', agentsExpanded ? 'rotate-0' : '-rotate-90')} />
              </button>
            </div>
            <AnimatePresence>
              {agentsExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-0.5 px-2">
                    {agents.map(agent => {
                      const active = pathname === agent.href;
                      return (
                        <Link
                          key={agent.href}
                          href={agent.href}
                          className={cn(
                            'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150',
                            active
                              ? 'bg-slate-800 text-white'
                              : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                          )}
                        >
                          <span className="text-base leading-none flex-shrink-0">{agent.icon}</span>
                          <span className="truncate text-xs">{agent.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* System status */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-800 flex-shrink-0">
          <div className="bg-slate-900 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-medium">All Systems Operational</span>
            </div>
            <div className="text-[10px] text-slate-600" style={{ fontFamily: 'JetBrains Mono' }}>
              Master Agent v4.2.1 · Uptime 99.98%
            </div>
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="absolute top-5 -right-3 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-10"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </motion.aside>
  );
}
