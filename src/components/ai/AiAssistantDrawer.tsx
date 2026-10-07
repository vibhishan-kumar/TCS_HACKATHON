import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Minimize2,
  Maximize2,
} from 'lucide-react';
import { useBranch } from '../../context/BranchContext';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  action?: {
    label: string;
    actionId: string;
  };
}

export const AiAssistantDrawer: React.FC = () => {
  const {
    isAssistantOpen,
    toggleAssistant,
    selectedBranch,
    services,
    applyRecommendation,
    applyStaffReallocation,
    startDigitalRedirection,
  } = useBranch();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'initial',
      sender: 'ai',
      text: `Hello Director. I am your operations co-pilot for ${selectedBranch.name}. I'm actively monitoring branch throughput, queue telemetry, and staffing levels. How can I assist you right now?`,
      timestamp: 'Just now',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'What is causing today\'s high wait time?',
    'What should I do before the 3 PM peak?',
    'Which service is currently the bottleneck?',
    'What happens if I add 2 staff members?',
    'How can I reduce today\'s branch traffic?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = textToSend.toLowerCase();
      let aiResponse = '';
      let actionObj: { label: string; actionId: string } | undefined;

      const accountOpening = services.find((s) => s.id === 'account_opening');
      const teller = services.find((s) => s.id === 'teller');

      if (lower.includes('wait time') || lower.includes('high wait') || lower.includes('causing')) {
        aiResponse = `The primary driver of the current ${selectedBranch.avgWaitTime}-minute average wait time is **Account Opening**, operating at ${accountOpening?.load || 94}% capacity with 15 customers waiting. The counter is staffed by only 1 employee while demand is 38% above normal.\n\nSimultaneously, **Teller Services** has low wait time (8 min) and 3 staff members, creating an imbalance.`;
        actionObj = {
          label: 'Apply Staff Reallocation (24m → 13m)',
          actionId: 'rec-1',
        };
      } else if (lower.includes('3 pm') || lower.includes('peak') || lower.includes('before')) {
        aiResponse = `Between **2:00 PM and 3:30 PM**, customer traffic is projected to peak at **87 customers/hr**, which is 32% above your branch's normal 65-customer threshold.\n\n**Recommended Pre-emptive Playbook:**\n1. Reallocate 1 Teller to Account Opening counter.\n2. Open Counter #7 at 2:00 PM.\n3. Send SMS push prompts to 38 digital-eligible queue members to deflect simple requests to the mobile app.`;
        actionObj = {
          label: 'Schedule Additional Counter at 2 PM',
          actionId: 'rec-3',
        };
      } else if (lower.includes('bottleneck') || lower.includes('which service')) {
        aiResponse = `**Account Opening** is your critical bottleneck (Load: ${accountOpening?.load}%, Wait: ${accountOpening?.wait} min, Queue: ${accountOpening?.queue}). Secondarily, **KYC Services** is under warning at 72% load.\n\nTeller Services and Customer Support remain healthy and can afford to spare capacity.`;
        actionObj = {
          label: 'Move 1 Teller to Account Opening',
          actionId: 'rec-1',
        };
      } else if (lower.includes('add 2 staff') || lower.includes('staff members')) {
        aiResponse = `Simulating **+2 additional staff members** (allocated to Account Opening and KYC):\n\n• Average wait time drops from **${selectedBranch.avgWaitTime} min → 10 min** (-58% reduction).\n• Branch capacity utilization drops from **${selectedBranch.branchLoad}% → 64%** (Healthy green).\n• Projected Customer Experience Score increases from 4.3 → 4.8.\n\nYou can verify this in the What-If Simulator.`;
      } else if (lower.includes('reduce') || lower.includes('traffic') || lower.includes('digital')) {
        aiResponse = `Currently, **38 out of 42 customers** waiting for Balance Enquiries and Statement printing can complete their tasks in under 2 minutes on the Mobile Banking app.\n\nDeploying digital redirection can immediately remove 8–12 physical customers from your floor.`;
        actionObj = {
          label: 'Launch Digital Redirection SMS',
          actionId: 'rec-2',
        };
      } else if (lower.includes('what should i do') || lower.includes('action')) {
        aiResponse = `Account Opening is currently the main bottleneck with a 94% load and 24-minute wait time.\n\n**I recommend:**\n1. Move 1 teller to Account Opening.\n2. Open an additional counter at 2 PM.\n3. Redirect eligible balance enquiries to Mobile Banking.\n\nThese actions are estimated to reduce average waiting time to approximately 13 minutes.`;
        actionObj = {
          label: 'Apply Recommended Reallocation',
          actionId: 'rec-1',
        };
      } else {
        aiResponse = `Based on real-time telemetry for **${selectedBranch.name}**:\n\n• Branch Load: ${selectedBranch.branchLoad}%\n• Active Counters: ${selectedBranch.activeCounters} / ${selectedBranch.totalCounters}\n• Available Staff: ${selectedBranch.availableStaff} / ${selectedBranch.totalStaff}\n\nOur predictive neural engine forecasts demand will crest at 3:00 PM. Rebalancing staff now will preserve your target SLA of < 15 minutes.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'ai',
          text: aiResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action: actionObj,
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleActionClick = (actionId: string) => {
    if (actionId === 'rec-1') {
      applyStaffReallocation();
    } else if (actionId === 'rec-2') {
      startDigitalRedirection();
    } else if (actionId === 'rec-3') {
      applyRecommendation('rec-3');
    }
  };

  return (
    <>
      {/* Floating Bottom-Right Trigger Button */}
      {!isAssistantOpen && (
        <button
          onClick={() => toggleAssistant(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900 text-white shadow-premium hover:bg-slate-800 transition-all hover:scale-105 border border-slate-700/80 group"
          aria-label="Open AI Operations Assistant"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-blue-400 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-900 beacon" />
          </div>
          <span className="text-xs font-semibold tracking-wide">BranchFlow AI Co-Pilot</span>
        </button>
      )}

      {/* Slide-out / Pop-up Chat Interface */}
      {isAssistantOpen && (
        <div
          className={`fixed bottom-4 right-4 z-50 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col transition-all duration-300 overflow-hidden ${
            isExpanded
              ? 'w-[95vw] sm:w-[600px] h-[85vh] max-h-[720px]'
              : 'w-[95vw] sm:w-[420px] h-[580px]'
          }`}
        >
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                  BranchFlow AI Assistant
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.2 rounded font-mono">
                    Online
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400 truncate max-w-[200px]">
                  {selectedBranch.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => toggleAssistant(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-2.5 bg-slate-50 border-b border-slate-200 overflow-x-auto flex gap-1.5 no-scrollbar">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-2.5 py-1 text-[11px] font-medium bg-white hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-full border border-slate-200 shadow-2xs transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-2xs ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-line font-normal">{m.text}</div>

                  {m.action && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100">
                      <button
                        onClick={() => handleActionClick(m.action!.actionId)}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] shadow-sm transition-all"
                      >
                        <span>{m.action.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <span
                    className={`block text-[10px] mt-1 ${
                      m.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-400'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center flex-shrink-0 mt-0.5 text-[11px] font-bold">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-xs text-slate-400 italic">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 rounded-full px-3 py-1.5 flex items-center gap-1 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask about traffic, wait times, staff..."
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isTyping}
                className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
