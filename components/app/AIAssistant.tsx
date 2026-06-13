'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const suggestions = [
  'Why was this threat blocked?',
  'Explain certification results',
  'What is the trust score drop?',
  'Summarize recent audit events',
  'Explain governance decision',
];

const mockResponses: Record<string, string> = {
  default: 'I\'m the SentinelOS Master Intelligence. I can help you understand threat detections, governance decisions, certification results, and audit events. What would you like to investigate?',
  threat: 'The threat was blocked because the agent\'s outbound data transfer of 847MB exceeded the declared behavioral profile by 340%. Policy "Data Exfiltration Prevention v3.0" triggered an automatic block at the network firewall level. The session was terminated and the operator was notified within 2.3 seconds of detection.',
  trust: 'The trust score dropped from 97.2 to 94.8 because: (1) a behavioral deviation was detected in session #8821, (2) an uncertified external API endpoint was contacted, and (3) permission scope exceeded declared capabilities by ~15%. Score will recover after a clean 72-hour observation window.',
  cert: 'The certification pipeline shows your agent passed 5 of 12 stages. The current stage (Behavioral Testing) is running 2,400 scenarios. Expected completion: 47 minutes. Issues found so far: 2 low-severity dependency CVEs and 1 minor permission scope overlap — neither will prevent certification.',
  audit: 'In the last 24 hours: 48,291 governance actions were evaluated, 127 were blocked, 12 were escalated to Master Agent review, and 6 threats were actively neutralized. Zero policy violations resulted in data exposure. Compliance posture: SOC2 ✓, GDPR ✓, HIPAA ✓.',
  govern: 'The governance decision was made by Master Agent v4.2.1 with 97% confidence. The agent requested elevated network capture permissions during an active threat investigation — a legitimate use case. Temporary elevation was approved for 15 minutes with full audit trail logging and automatic revocation.',
};

function getResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('threat') || q.includes('block')) return mockResponses.threat;
  if (q.includes('trust') || q.includes('score') || q.includes('drop')) return mockResponses.trust;
  if (q.includes('cert')) return mockResponses.cert;
  if (q.includes('audit') || q.includes('summary')) return mockResponses.audit;
  if (q.includes('govern') || q.includes('decision')) return mockResponses.govern;
  return mockResponses.default;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'assistant', content: mockResponses.default, timestamp: new Date() },
  ]);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const response = getResponse(text);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      }]);
      setTyping(false);
    }, 1200 + Math.random() * 600);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: 'spring' }}
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 transition-shadow"
          style={{ background: 'linear-gradient(135deg, #0EA5E9, #22D3EE)' }}
        >
          <Bot className="w-5 h-5 text-white" />
        </motion.button>
      )}

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 w-96 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl shadow-black/50"
            style={{ background: '#0D1117' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800"
              style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.1), rgba(34,211,238,0.05))' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #0EA5E9, #22D3EE)' }}>
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>
                    Sentinel Intelligence
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online · Master Agent v4.2.1
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setMinimized(!minimized)} className="w-6 h-6 rounded text-slate-500 hover:text-slate-300 flex items-center justify-center">
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setOpen(false)} className="w-6 h-6 rounded text-slate-500 hover:text-slate-300 flex items-center justify-center">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {!minimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                >
                  {/* Messages */}
                  <div className="h-72 overflow-y-auto p-4 space-y-3">
                    {messages.map(msg => (
                      <div key={msg.id} className={cn('flex gap-3', msg.role === 'user' ? 'flex-row-reverse' : '')}>
                        {msg.role === 'assistant' && (
                          <div className="w-6 h-6 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Bot className="w-3 h-3 text-sky-400" />
                          </div>
                        )}
                        <div
                          className={cn(
                            'max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed',
                            msg.role === 'user'
                              ? 'bg-sky-500/10 border border-sky-500/20 text-sky-100'
                              : 'bg-slate-800 text-slate-300'
                          )}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}

                    {typing && (
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Bot className="w-3 h-3 text-sky-400" />
                        </div>
                        <div className="bg-slate-800 rounded-xl px-4 py-3 flex items-center gap-1">
                          {[0, 1, 2].map(i => (
                            <motion.div
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-slate-500"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Suggestions */}
                  <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                    {suggestions.slice(0, 3).map(s => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="text-[10px] px-2.5 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-slate-400 hover:text-sky-400 hover:border-sky-500/30 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="px-4 pb-4">
                    <div className="flex items-center gap-2 bg-slate-800 rounded-xl border border-slate-700 px-3 py-2">
                      <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                        placeholder="Ask about threats, certifications..."
                        className="flex-1 bg-transparent text-xs text-slate-300 placeholder:text-slate-600 outline-none"
                      />
                      <button
                        onClick={() => sendMessage(input)}
                        disabled={!input.trim()}
                        className="w-6 h-6 rounded-lg bg-sky-500 disabled:bg-slate-700 flex items-center justify-center transition-colors"
                      >
                        <Send className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
