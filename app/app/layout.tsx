'use client';

import { useState } from 'react';
import Sidebar from '@/components/app/Sidebar';
import Topbar from '@/components/app/Topbar';
import AIAssistant from '@/components/app/AIAssistant';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#080B12]">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Topbar sidebarCollapsed={sidebarCollapsed} />

      <main
        className="transition-all duration-200"
        style={{
          marginLeft: sidebarCollapsed ? 64 : 256,
          paddingTop: 64,
          minHeight: '100vh',
        }}
      >
        <div className="p-6">
          {children}
        </div>
      </main>

      <AIAssistant />
    </div>
  );
}
