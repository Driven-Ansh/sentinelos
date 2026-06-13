import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Formatters ──────────────────────────────────────────────
export function formatNumber(n: number, abbreviate = false): string {
  if (abbreviate) {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toLocaleString();
  }
  return n.toLocaleString();
}

export function formatCurrency(n: number, currency = 'USD'): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(n);
}

export function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  });
}

export function timeAgo(iso: string): string {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (secs < 60) return `${secs}s ago`;
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
  return `${Math.floor(secs / 86400)}d ago`;
}

// ── Color utilities ──────────────────────────────────────────
export function severityColor(severity: string): string {
  switch (severity) {
    case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/20';
    case 'high': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
    case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    case 'low': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
  }
}

export function decisionColor(decision: string): string {
  switch (decision) {
    case 'approved': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    case 'blocked': return 'text-red-400 bg-red-400/10 border-red-400/20';
    case 'escalated': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
    case 'overridden': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
    default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
  }
}

export function riskColor(level: string): string {
  switch (level) {
    case 'critical': return 'text-red-400';
    case 'high': return 'text-orange-400';
    case 'medium': return 'text-yellow-400';
    case 'low': return 'text-emerald-400';
    default: return 'text-slate-400';
  }
}

export function certLevelColor(level: string): string {
  switch (level) {
    case 'sovereign': return 'text-cyan-400';
    case 'advanced': return 'text-sky-400';
    case 'standard': return 'text-emerald-400';
    case 'basic': return 'text-slate-400';
    default: return 'text-slate-500';
  }
}

export function statusColor(status: string): string {
  switch (status) {
    case 'active': return 'text-emerald-400';
    case 'monitoring': return 'text-sky-400';
    case 'suspended': return 'text-red-400';
    case 'pending': return 'text-yellow-400';
    default: return 'text-slate-400';
  }
}
