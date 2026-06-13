'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, X, Star } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

const plans = [
  {
    name: 'Free',
    price: 0,
    period: '/month',
    description: 'For individual developers exploring the platform.',
    color: '#64748B',
    features: [
      '5 registered agents',
      'Basic certification (3 stages)',
      '1,000 governance events/month',
      'Community support',
      '7-day audit retention',
      'Public marketplace access',
    ],
    missing: ['Runtime monitoring', 'Threat intelligence', 'Permission firewall', 'SLA guarantee'],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Professional',
    price: 149,
    period: '/month',
    description: 'For teams building serious agent-powered products.',
    color: '#0EA5E9',
    features: [
      '50 registered agents',
      'Full 12-stage certification',
      '100K governance events/month',
      'Runtime monitoring',
      'Threat intelligence',
      'Email + Slack support',
      '90-day audit retention',
    ],
    missing: ['Permission firewall', 'Master Agent decisions', 'Dedicated SLA'],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Business',
    price: 499,
    period: '/month',
    description: 'For organizations deploying agents at scale.',
    color: '#22D3EE',
    features: [
      '500 registered agents',
      'Priority certification queue',
      'Unlimited governance events',
      'Permission firewall',
      'Threat intelligence + feeds',
      'Master Agent decisions',
      '1-year audit retention',
      'Priority support + SLA',
    ],
    missing: ['Custom policies', 'Dedicated infrastructure'],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: null,
    period: 'Custom',
    description: 'For enterprises requiring maximum control and compliance.',
    color: '#8B5CF6',
    features: [
      'Unlimited agents',
      'Dedicated certification team',
      'Custom governance policies',
      'Private marketplace',
      'Dedicated infrastructure',
      'Custom SLA (99.99%)',
      'Compliance reports (SOC2/GDPR)',
      'Unlimited audit retention',
      'White-glove onboarding',
    ],
    missing: [],
    cta: 'Contact Sales',
    popular: false,
  },
  {
    name: 'Government',
    price: null,
    period: 'Custom',
    description: 'For government and defense deployments requiring sovereign control.',
    color: '#F59E0B',
    features: [
      'Air-gapped deployment',
      'FIPS 140-2 compliance',
      'FedRAMP authorized',
      'Sovereign data residency',
      'Security clearance workflows',
      'Dedicated GovCloud infrastructure',
      'IL2/IL4/IL5 support',
    ],
    missing: [],
    cta: 'Contact Gov Sales',
    popular: false,
  },
];

export default function PricingSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="pricing" ref={ref} className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(14,165,233,0.05) 0%, transparent 60%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={staggerItem} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/5 mb-6">
            <Star className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-xs text-sky-400 tracking-widest uppercase font-medium" style={{ fontFamily: 'JetBrains Mono' }}>
              Transparent Pricing
            </span>
          </motion.div>

          <motion.h2 variants={staggerItem} className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Space Grotesk' }}>
            Built for Every Scale
            <br />
            <span className="gradient-text-blue">of Agent Deployment</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={staggerItem}
              className={`relative p-6 rounded-2xl border flex flex-col transition-all duration-300 ${
                plan.popular
                  ? 'border-cyan-400/40 bg-cyan-400/5 shadow-lg shadow-cyan-500/10'
                  : 'border-slate-800 bg-[#0D1117] hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-cyan-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full tracking-wider">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: plan.color }} />
                  <h3 className="font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>{plan.name}</h3>
                </div>
                <div className="flex items-baseline gap-1 mb-3">
                  {plan.price !== null ? (
                    <>
                      <span className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
                        ${plan.price}
                      </span>
                      <span className="text-slate-500 text-sm">{plan.period}</span>
                    </>
                  ) : (
                    <span className="text-xl font-semibold text-slate-300">{plan.period}</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{plan.description}</p>
              </div>

              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
                {plan.missing.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-slate-600">
                    <X className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={
                  plan.popular
                    ? { background: 'linear-gradient(135deg, #0EA5E9, #22D3EE)', color: '#080B12' }
                    : { border: `1px solid ${plan.color}40`, color: plan.color, background: `${plan.color}08` }
                }
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
