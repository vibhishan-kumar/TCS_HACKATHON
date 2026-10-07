import React, { useState } from 'react';
import {
  Menu,
  Building2,
  Calendar,
  Bell,
  Sparkles,
  ChevronDown,
  MonitorSmartphone,
  ExternalLink,
  BotMessageSquare,
} from 'lucide-react';
import { useBranch } from '../../context/BranchContext';
import { mockBranches } from '../../data/mockBranches';
import { Link } from 'react-router-dom';

interface TopbarProps {
  onToggleSidebar: () => void;
  onOpenNotifications: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar, onOpenNotifications }) => {
  const {
    selectedBranchId,
    setSelectedBranchId,
    selectedBranch,
    selectedDate,
    setSelectedDate,
    alerts,
    toggleAssistant,
  } = useBranch();

  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  const unresolvedAlerts = alerts.filter((a) => !a.resolved);

  const dateOptions = [
    'Today, Oct 07',
    'Tomorrow, Oct 08',
    'Yesterday, Oct 06',
    'Last 7 Days',
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between shadow-subtle">
      {/* Left: Mobile Toggle & Branch Selector */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Branch Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsBranchDropdownOpen(!isBranchDropdownOpen);
              setIsDateDropdownOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100/80 text-slate-800 text-xs sm:text-sm font-semibold transition-colors focus:ring-2 focus:ring-blue-500/20"
          >
            <Building2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span className="truncate max-w-[150px] sm:max-w-[220px]">{selectedBranch.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {isBranchDropdownOpen && (
            <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-premium border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Select Operating Branch
              </div>
              {Object.values(mockBranches).map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setSelectedBranchId(b.id);
                    setIsBranchDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                    b.id === selectedBranchId ? 'bg-blue-50/70 text-blue-700 font-semibold' : 'text-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-medium text-slate-900">{b.name}</div>
                    <div className="text-[11px] text-slate-400">{b.region} • {b.code}</div>
                  </div>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      b.loadStatus === 'Critical'
                        ? 'bg-rose-100 text-rose-700'
                        : b.loadStatus === 'High'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {b.branchLoad}%
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Selector */}
        <div className="relative hidden md:block">
          <button
            onClick={() => {
              setIsDateDropdownOpen(!isDateDropdownOpen);
              setIsBranchDropdownOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{selectedDate}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isDateDropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-premium border border-slate-200 py-1 z-50">
              {dateOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSelectedDate(opt);
                    setIsDateDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs hover:bg-slate-50 transition-colors ${
                    opt === selectedDate ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: AI Status, Kiosk launcher, Notification, Assistant Trigger */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* AI Status Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 beacon" />
          <span>AI Status: Active</span>
          <span className="text-[10px] text-emerald-600 bg-emerald-100/70 px-1.5 py-0.2 rounded font-mono">
            91% Conf.
          </span>
        </div>

        {/* Customer Kiosk View Shortcut */}
        <Link
          to="/customer-experience"
          className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
          title="Open Customer-Facing Self Service View"
        >
          <MonitorSmartphone className="w-3.5 h-3.5 text-blue-600" />
          <span>Customer Kiosk Mode</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </Link>

        {/* AI Assistant Button */}
        <button
          onClick={() => toggleAssistant(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all hover:shadow"
        >
          <BotMessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">Ask AI Assistant</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5" />
          {unresolvedAlerts.length > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
          )}
        </button>
      </div>
    </header>
  );
};
