'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Shield, AlertTriangle, Activity, TrendingUp, Users,
  Cpu, Lock, FileText, CheckCircle, DollarSign,
  ArrowUpRight, ArrowDownRight, RefreshCw,
} from 'lucide-react';
import { dashboardMetrics, governanceActions, threatEvents, masterAgentDecisions, generateFeedEvent } from '@/lib/mock-data';
import { formatNumber, formatCurrency, timeAgo, severityColor, decisionColor } from '@/lib/utils';
import { staggerContainer, staggerItem, pageTransition } from '@/lib/animations';

interface MetricCard {
  label: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
  trend?: number;
  format?: 'number' | 'currency' | 'percent' | 'raw';
}

function AnimatedCounter({ value, format = 'number' }: { value: number; format?: string }) {
  const [displayed, setDisplayed] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;
    const target = value;
    const duration = 1500;
    const steps = 50;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setDisplayed(target); clearInterval(timer); }
      else setDisplayed(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  const display = () => {
    switch (format) {
      case 'currency': return formatCurrency(displayed);
      case 'percent': return `${displayed.toFixed(1)}%`;
      case 'raw': return displayed.toString();
      default: return formatNumber(displayed, true);
    }
  };

  return <span ref={ref}>{display()}</span>;
}

const metrics: MetricCard[] = [
  { label: 'Registered Agents', value: dashboardMetrics.registeredAgents, icon: Cpu, color: '#0EA5E9', trend: 12.4, format: 'number' },
  { label: 'Certified Agents', value: dashboardMetrics.certifiedAgents, icon: CheckCircle, color: '#10B981', trend: 8.1, format: 'number' },
  { label: 'Pending Reviews', value: dashboardMetrics.pendingReviews, icon: RefreshCw, color: '#F59E0B', trend: -3.2, format: 'number' },
  { label: 'Threats Blocked', value: dashboardMetrics.threatsBlocked, icon: Shield, color: '#EF4444', trend: 23.7, format: 'number' },
  { label: 'Permission Violations', value: dashboardMetrics.permissionViolations, icon: Lock, color: '#F97316', trend: -8.4, format: 'number' },
  { label: 'Active Sessions', value: dashboardMetrics.activeSessions, icon: Activity, color: '#22D3EE', trend: 5.2, format: 'number' },
  { label: 'Trust Index', value: dashboardMetrics.trustIndex, icon: TrendingUp, color: '#10B981', trend: 0.3, format: 'percent' },
  { label: 'Platform Health', value: dashboardMetrics.platformHealth, icon: AlertTriangle, color: '#8B5CF6', trend: 0.1, format: 'percent' },
  { label: 'Agent Revenue', value: dashboardMetrics.agentRevenue, icon: DollarSign, color: '#F59E0B', trend: 34.2, format: 'currency' },
];

export default function DashboardPage() {
  const [feedEvents, setFeedEvents] = useState(() =>
    Array.from({ length: 10 }, () => generateFeedEvent())
  );
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  useEffect(() => {
    const interval = setInterval(() => {
      setFeedEvents(prev => [generateFeedEvent(), ...prev.slice(0, 14)]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const feedColor = (type: string) => {
    switch (type) {
      case 'threat': return 'text-red-400';
      case 'block': return 'text-orange-400';
      case 'alert': return 'text-yellow-400';
      case 'cert': return 'text-emerald-400';
      default: return 'text-sky-400';
    }
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
            Command Center
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time platform overview — <span className="text-emerald-400">All Systems Operational</span>
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500" style={{ fontFamily: 'JetBrains Mono' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live · Updates every 2.5s
        </div>
      </div>

      {/* Metrics Grid */}
      <motion.div
        ref={ref}
        variants={staggerContainer(0.05)}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4"
      >
        {metrics.map((metric) => (
          <motion.div
            key={metric.label}
            variants={staggerItem}
            className="sentinel-card p-5 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${metric.color}15`, border: `1px solid ${metric.color}25` }}
              >
                <metric.icon className="w-4 h-4" style={{ color: metric.color }} />
              </div>
              {metric.trend !== undefined && (
                <div className={`flex items-center gap-1 text-xs ${metric.trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {metric.trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(metric.trend)}%
                </div>
              )}
            </div>

            <div className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Space Grotesk' }}>
              {typeof metric.value === 'number' ? (
                <AnimatedCounter value={metric.value} format={metric.format} />
              ) : (
                metric.value
              )}
            </div>
            <div className="text-xs text-slate-500">{metric.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Live Event Feed */}
        <div className="lg:col-span-1 sentinel-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>
              Live Event Stream
            </h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400" style={{ fontFamily: 'JetBrains Mono' }}>LIVE</span>
            </div>
          </div>
          <div className="space-y-2 overflow-hidden" style={{ maxHeight: 320 }}>
            {feedEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-2 py-1.5 border-b border-slate-800/50"
              >
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                  event.severity === 'critical' ? 'bg-red-400' :
                  event.severity === 'high' ? 'bg-orange-400' :
                  event.severity === 'medium' ? 'bg-yellow-400' : 'bg-sky-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-xs truncate ${feedColor(event.type)}`}>{event.message}</p>
                  <span className="text-[10px] text-slate-600" style={{ fontFamily: 'JetBrains Mono' }}>
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Governance Actions */}
        <div className="lg:col-span-1 sentinel-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            Recent Governance Actions
          </h3>
          <div className="space-y-3">
            {governanceActions.slice(0, 5).map((action) => (
              <div key={action.id} className="flex items-center gap-3">
                <div className={`text-xs px-2 py-0.5 rounded border font-bold ${decisionColor(action.decision)}`}>
                  {action.decision.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-300 truncate">{action.agentName}</p>
                  <p className="text-[10px] text-slate-600 truncate">{action.action}</p>
                </div>
                <span className="text-[10px] text-slate-600 flex-shrink-0" style={{ fontFamily: 'JetBrains Mono' }}>
                  {timeAgo(action.timestamp)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Threats */}
        <div className="lg:col-span-1 sentinel-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            Recent Threats
          </h3>
          <div className="space-y-3">
            {threatEvents.slice(0, 5).map((threat) => (
              <div key={threat.id} className="flex items-start gap-3">
                <div className={`text-xs px-2 py-0.5 rounded border font-bold flex-shrink-0 mt-0.5 ${severityColor(threat.severity)}`}>
                  {threat.severity.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-300 truncate">{threat.agentName}</p>
                  <p className="text-[10px] text-slate-500 truncate">{threat.type.replace(/_/g, ' ')}</p>
                </div>
                <div className={`text-xs flex-shrink-0 ${threat.blocked ? 'text-emerald-400' : 'text-yellow-400'}`}>
                  {threat.blocked ? '⛔' : '⚠️'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Master Agent decisions */}
      <div className="sentinel-card p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>
            Master Agent — Recent Decisions
          </h3>
          <span className="text-xs text-sky-400">View all →</span>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {masterAgentDecisions.map((decision) => (
            <div key={decision.id} className="p-4 rounded-xl border border-slate-800 bg-slate-900/50">
              <div className="flex items-center gap-2 mb-2">
                <div className={`text-xs px-2 py-0.5 rounded-full border font-bold ${
                  decision.type === 'block' ? 'text-red-400 bg-red-400/10 border-red-400/20' :
                  decision.type === 'approve' ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' :
                  decision.type === 'quarantine' ? 'text-purple-400 bg-purple-400/10 border-purple-400/20' :
                  'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
                }`}>
                  {decision.type.toUpperCase()}
                </div>
                <span className="text-xs text-slate-400">{decision.agentName}</span>
                <span className="ml-auto text-[10px] text-slate-600" style={{ fontFamily: 'JetBrains Mono' }}>
                  {timeAgo(decision.timestamp)}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{decision.reasoning}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] text-slate-600">Confidence: {(decision.confidence * 100).toFixed(0)}%</span>
                <span className="text-[10px] text-sky-400">{decision.policyApplied}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
