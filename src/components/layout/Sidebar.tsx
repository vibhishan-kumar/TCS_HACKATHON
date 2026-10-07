import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Activity,
  LineChart,
  AlertOctagon,
  Users2,
  Share2,
  Sliders,
  UserSquare2,
  BarChart3,
  Bell,
  HelpCircle,
  RotateCcw,
  Sparkles,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useBranch } from '../../context/BranchContext';

interface SidebarProps {
  isOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onCloseMobile }) => {
  const { alerts, resetDemoState } = useBranch();
  const navigate = useNavigate();

  const unresolvedAlertsCount = alerts.filter((a) => !a.resolved).length;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Live Branch', path: '/live-branch', icon: Activity },
    { name: 'Forecast', path: '/forecast', icon: LineChart },
    { name: 'Bottlenecks', path: '/bottlenecks', icon: AlertOctagon },
    { name: 'Staff Optimization', path: '/staff-optimization', icon: Users2 },
    { name: 'Customer Flow', path: '/customer-flow', icon: Share2 },
    { name: 'What-If Simulator', path: '/simulator', icon: Sliders, badge: 'AI Sim' },
    { name: 'Customer Experience', path: '/customer-experience', icon: UserSquare2, badge: 'Kiosk' },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    {
      name: 'Alerts',
      path: '/alerts',
      icon: Bell,
      badgeCount: unresolvedAlertsCount,
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Logo Section */}
        <div>
          <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center shadow-md shadow-blue-500/20 text-white font-bold">
                <Sparkles className="w-5 h-5 text-blue-100" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-tight leading-none flex items-center gap-1.5">
                  BranchFlow <span className="text-blue-400 font-extrabold text-xs px-1 py-0.2 bg-blue-950 rounded border border-blue-800">AI</span>
                </h1>
                <p className="text-[10px] text-slate-400 font-medium tracking-wide mt-1 uppercase">
                  Operations Intelligence
                </p>
              </div>
            </div>
          </div>

          {/* AI Autonomous Status Pill */}
          <div className="px-4 pt-3.5 pb-1">
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-semibold text-slate-200">AI Engine Active</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono font-medium">99.4% SLA</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 transition-transform group-hover:scale-105" />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-950/70 text-blue-200 border border-blue-800/60">
                      {item.badge}
                    </span>
                  )}

                  {item.badgeCount !== undefined && item.badgeCount > 0 && (
                    <span className="px-1.5 py-0.5 text-[11px] font-bold rounded-full bg-rose-500 text-white animate-pulse">
                      {item.badgeCount}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/30 space-y-2">
          {/* Reset Demo State Trigger */}
          <button
            onClick={resetDemoState}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/70 transition-colors"
            title="Reset metrics to baseline demo state"
          >
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset Baseline Demo</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Clean</span>
          </button>

          {/* Quick Security Badge */}
          <div className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span className="truncate">SOC2 Type II • ISO 27001</span>
          </div>

          {/* User Profile Footer */}
          <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center font-bold text-xs text-white border border-slate-600">
                BM
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">Rajesh Varma</p>
                <p className="text-[10px] text-slate-400 truncate">Branch Director</p>
              </div>
            </div>

            <button
              onClick={() => navigate('/login')}
              title="Sign out to Login"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
