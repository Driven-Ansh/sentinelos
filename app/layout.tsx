import type { Metadata } from 'next';
import './globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';

export const metadata: Metadata = {
  title: 'SentinelOS — The Operating System for Autonomous Agents',
  description: 'Register, Certify, Monitor, Govern, and Scale AI Agents through one unified trust layer. The world\'s first autonomous AI governance platform.',
  keywords: 'AI agents, agent governance, agent certification, agent security, autonomous AI, AI trust, agent registry, AI monitoring',
  openGraph: {
    title: 'SentinelOS — The Operating System for Autonomous Agents',
    description: 'Register, Certify, Monitor, Govern, and Scale AI Agents through one unified trust layer.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
