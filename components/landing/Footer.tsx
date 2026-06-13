'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, ExternalLink, Globe, Link2 } from 'lucide-react';
import Link from 'next/link';
import SentinelLogo from '@/components/logo/SentinelLogo';
import { staggerContainer, staggerItem } from '@/lib/animations';

const footerSections = [
  {
    title: 'Platform',
    links: ['Agent Registry', 'Certification Engine', 'Runtime Monitoring', 'Permission Firewall', 'Master Agent', 'Threat Intelligence'],
  },
  {
    title: 'Marketplace',
    links: ['Browse Agents', 'Submit Agent', 'Developer Hub', 'Agent Bundles', 'Enterprise Catalog', 'Become a Partner'],
  },
  {
    title: 'Security',
    links: ['Security Overview', 'SOC2 Report', 'GDPR Compliance', 'Penetration Testing', 'Bug Bounty', 'Responsible Disclosure'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'API Reference', 'Architecture Guide', 'Blog', 'Case Studies', 'Community'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Press Kit', 'Legal', 'Privacy Policy', 'Terms of Service'],
  },
];

const roadmapItems = [
  { quarter: 'Q3 2026', items: ['Agent Identity Protocol v2', 'Cross-platform Federation', 'Open certification standard'], status: 'upcoming' },
  { quarter: 'Q4 2026', items: ['On-prem deployment', 'Agent-to-agent trust mesh', 'Governance API v3'], status: 'upcoming' },
  { quarter: 'Q1 2027', items: ['SentinelOS mobile', 'Agent marketplace v2', 'Government cloud expansion'], status: 'future' },
];

export default function Footer() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <>
      {/* Roadmap */}
      <section id="roadmap" className="relative py-24 overflow-hidden border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/5 mb-6">
              <span className="text-xs text-sky-400 tracking-widest uppercase font-medium" style={{ fontFamily: 'JetBrains Mono' }}>
                Roadmap
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Space Grotesk' }}>
              The Future of <span className="gradient-text-blue">Agent Governance</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {roadmapItems.map((item, i) => (
              <motion.div
                key={item.quarter}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="sentinel-card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-2 h-2 rounded-full ${item.status === 'upcoming' ? 'bg-sky-400' : 'bg-slate-600'}`} />
                  <span className="text-sm font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>{item.quarter}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ml-auto ${item.status === 'upcoming' ? 'bg-sky-400/10 text-sky-400 border border-sky-400/20' : 'bg-slate-700 text-slate-400'}`}>
                    {item.status}
                  </span>
                </div>
                <ul className="space-y-2">
                  {item.items.map(feat => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-slate-400">
                      <div className="w-1 h-1 rounded-full bg-slate-600 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 border-t border-slate-800/50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            Ready to Govern Your <span className="gradient-text-blue">Agent Ecosystem?</span>
          </h2>
          <p className="text-slate-400 mb-10">
            Join 2,847 organizations that trust SentinelOS to secure and govern their autonomous AI agents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/app/dashboard"
              className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors duration-200"
            >
              <Shield className="w-4 h-4" />
              Start Free Trial
            </Link>
            <button className="flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-600 text-slate-300 px-8 py-3.5 rounded-xl transition-colors duration-200">
              <ExternalLink className="w-4 h-4" />
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer ref={ref} className="border-t border-slate-800/80 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-6 gap-10 mb-14">
            {/* Brand */}
            <div className="md:col-span-1">
              <SentinelLogo size={48} animate={false} showText={false} />
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-bold gradient-text-blue" style={{ fontFamily: 'Space Grotesk' }}>Sentinel</span>
                <span className="text-cyan-400/60 font-light" style={{ fontFamily: 'Space Grotesk' }}>OS</span>
              </div>
              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                The Operating System for Autonomous Agents
              </p>
              <div className="flex items-center gap-3 mt-5">
                <button className="text-slate-500 hover:text-slate-300 transition-colors">
                  <Globe className="w-4 h-4" />
                </button>
                <button className="text-slate-500 hover:text-slate-300 transition-colors">
                  <Link2 className="w-4 h-4" />
                </button>
                <button className="text-slate-500 hover:text-slate-300 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Links */}
            {footerSections.map(section => (
              <div key={section.title}>
                <h4 className="text-xs font-semibold text-slate-300 mb-4 tracking-wider uppercase" style={{ fontFamily: 'Space Grotesk' }}>
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map(link => (
                    <li key={link}>
                      <button className="text-xs text-slate-500 hover:text-slate-300 transition-colors text-left">
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600">
              © 2026 SentinelOS, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-600">
              <span>SOC2 Type II Certified</span>
              <span>·</span>
              <span>GDPR Compliant</span>
              <span>·</span>
              <span>ISO 27001</span>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-emerald-600">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
