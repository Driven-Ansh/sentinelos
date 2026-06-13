// Framer Motion animation variant library for SentinelOS

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export const staggerContainer = (stagger = 0.08, delay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export const slideUp = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export const pageTransition = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: [0.55, 0, 1, 0.45] as [number, number, number, number] } },
};

export const cardHover = {
  rest: { scale: 1, boxShadow: '0 0 0 1px rgba(14,165,233,0)' },
  hover: { scale: 1.01, boxShadow: '0 0 0 1px rgba(14,165,233,0.3)', transition: { duration: 0.2 } },
};

export const glowPulse = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const nodeAppear = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay, duration: 0.4, type: 'spring', stiffness: 260, damping: 20 },
  },
});

export const orbitAnimation = {
  animate: {
    rotate: 360,
    transition: { duration: 20, repeat: Infinity, ease: 'linear' },
  },
};

export const scanLine = {
  animate: {
    y: ['0%', '100%'],
    transition: { duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 },
  },
};

export const counterSpring = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 30,
};
