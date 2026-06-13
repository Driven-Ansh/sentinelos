'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SentinelLogoProps {
  size?: number;
  animate?: boolean;
  showText?: boolean;
  showTagline?: boolean;
  className?: string;
}

export default function SentinelLogo({
  size = 120,
  animate = true,
  showText = true,
  showTagline = false,
  className = '',
}: SentinelLogoProps) {
  const [phase, setPhase] = useState(0);
  // Phases: 0=nodes appear, 1=connections, 2=convergence, 3=shield, 4=text, 5=tagline, 6=done

  useEffect(() => {
    if (!animate) { setPhase(6); return; }
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 1800),
      setTimeout(() => setPhase(4), 2600),
      setTimeout(() => setPhase(5), 3200),
      setTimeout(() => setPhase(6), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [animate]);

  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;

  // Hexagonal node positions
  const nodes = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), i };
  });

  // Center node
  const centerNode = { x: cx, y: cy };

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <defs>
            <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#0EA5E9" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0369A1" stopOpacity="0.3" />
            </radialGradient>
            <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#0369A1" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="strongGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Shield / hexagon outline */}
          <AnimatePresence>
            {phase >= 3 && (
              <motion.polygon
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
                points={nodes.map(n => `${n.x},${n.y}`).join(' ')}
                stroke="#0EA5E9"
                strokeWidth="1.5"
                fill="rgba(14,165,233,0.04)"
                strokeDasharray="4 2"
              />
            )}
          </AnimatePresence>

          {/* Outer orbit ring */}
          <AnimatePresence>
            {phase >= 3 && (
              <motion.circle
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.25, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
                cx={cx} cy={cy} r={r * 1.2}
                stroke="#22D3EE"
                strokeWidth="0.8"
                fill="none"
                strokeDasharray="3 6"
              />
            )}
          </AnimatePresence>

          {/* Connections from center to nodes */}
          {nodes.map((node, i) => (
            <AnimatePresence key={`conn-${i}`}>
              {phase >= 1 && (
                <motion.line
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.4 }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                  x1={centerNode.x} y1={centerNode.y}
                  x2={node.x} y2={node.y}
                  stroke="#0EA5E9"
                  strokeWidth="0.8"
                />
              )}
            </AnimatePresence>
          ))}

          {/* Peripheral connections */}
          {nodes.map((node, i) => {
            const next = nodes[(i + 1) % 6];
            return (
              <AnimatePresence key={`pconn-${i}`}>
                {phase >= 2 && (
                  <motion.line
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.25 }}
                    transition={{ duration: 0.3, delay: i * 0.06, ease: 'easeOut' }}
                    x1={node.x} y1={node.y}
                    x2={next.x} y2={next.y}
                    stroke="#22D3EE"
                    strokeWidth="0.6"
                  />
                )}
              </AnimatePresence>
            );
          })}

          {/* Peripheral nodes */}
          {nodes.map((node, i) => (
            <AnimatePresence key={`node-${i}`}>
              {phase >= 0 && (
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: i * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                >
                  <circle cx={node.x} cy={node.y} r={size * 0.035} fill="rgba(14,165,233,0.15)" stroke="#0EA5E9" strokeWidth="1" />
                  <circle cx={node.x} cy={node.y} r={size * 0.015} fill="#0EA5E9" />
                </motion.g>
              )}
            </AnimatePresence>
          ))}

          {/* Core */}
          <AnimatePresence>
            {phase >= 2 && (
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 15 }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              >
                <circle cx={cx} cy={cy} r={size * 0.12} fill="url(#coreGrad)" />
                <circle cx={cx} cy={cy} r={size * 0.085} fill="rgba(34,211,238,0.2)" stroke="#22D3EE" strokeWidth="1.5" />
                <circle cx={cx} cy={cy} r={size * 0.05} fill="#22D3EE" opacity="0.9" />
                {/* Inner cross/sentinel mark */}
                <line x1={cx - size * 0.025} y1={cy} x2={cx + size * 0.025} y2={cy} stroke="#080B12" strokeWidth="2" />
                <line x1={cx} y1={cy - size * 0.025} x2={cx} y2={cy + size * 0.025} stroke="#080B12" strokeWidth="2" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Animated orbit dot */}
          {phase >= 3 && (
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            >
              <circle cx={cx} cy={cy - r * 1.2} r={size * 0.018} fill="#22D3EE" opacity="0.8" />
            </motion.g>
          )}

          {/* Scan line effect */}
          {phase >= 3 && (
            <motion.rect
              x={cx - r * 1.3} y={cy - r * 1.3}
              width={r * 2.6} height="2"
              fill="rgba(34,211,238,0.15)"
              animate={{ y: [cy - r * 1.3, cy + r * 1.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
            />
          )}
        </svg>
      </div>

      {/* Text */}
      {showText && (
        <AnimatePresence>
          {(phase >= 4 || !animate) && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-center"
            >
              <div className="flex items-center gap-2">
                <span
                  className="font-bold tracking-tight"
                  style={{
                    fontFamily: 'Space Grotesk',
                    fontSize: size * 0.22,
                    background: 'linear-gradient(135deg, #F8FAFC 0%, #22D3EE 50%, #0EA5E9 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Sentinel
                </span>
                <span
                  className="font-light tracking-widest text-cyan-400/80"
                  style={{ fontFamily: 'Space Grotesk', fontSize: size * 0.22 }}
                >
                  OS
                </span>
              </div>

              {showTagline && (
                <AnimatePresence>
                  {(phase >= 5 || !animate) && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-slate-400 text-xs tracking-widest uppercase mt-1"
                      style={{ fontFamily: 'JetBrains Mono', fontSize: size * 0.085 }}
                    >
                      The Operating System for Autonomous Agents
                    </motion.p>
                  )}
                </AnimatePresence>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
