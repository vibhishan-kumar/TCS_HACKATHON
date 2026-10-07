import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Gauge,
  Star,
  Share2,
  Filter,
  Sparkles,
  Download,
  Calendar,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import { useBranch } from '../context/BranchContext';
import {
  weeklyTrafficTrends,
  serviceDemandBreakdown,
  hourlyWaitTimeCurve,
  csatDistribution,
  executiveAiInsights,
} from '../data/mockAnalytics';
import { mockBranches } from '../data/mockBranches';

export const AnalyticsPage: React.FC = () => {
  const { selectedBranch, addToast } = useBranch();

  const [dateFilter, setDateFilter] = useState('Last 7 Days');
  const [serviceFilter, setServiceFilter] = useState('All Services');

  const handleExport = () => {
    addToast('Executive Analytics Report exported to PDF successfully', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Operations & Performance Analytics
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              Historical Intelligence
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Multi-dimensional trend telemetry, SLA wait distributions, and digital redirection efficacy for {selectedBranch.name}
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          {/* Date Filter */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-700 font-medium focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="Today">Today</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="Last Quarter">Last Quarter</option>
          </select>

          {/* Service Filter */}
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-700 font-medium focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="All Services">All Services</option>
            <option value="Teller Services">Teller Services</option>
            <option value="Account Opening">Account Opening</option>
            <option value="KYC Services">KYC Services</option>
            <option value="Loan Services">Loan Services</option>
          </select>

          {/* Export Report */}
          <button
            onClick={handleExport}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* AI Executive Summaries (Prompt requirement) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {executiveAiInsights.map((insight, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {insight.badge}
                </span>
                <span className="text-[11px] font-mono text-slate-400">{insight.impact}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {insight.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                "{insight.description}"
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] text-blue-600 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Validated by 30-Day Cluster Analytics</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Row 1: Traffic by Day & Average Wait Time by Day */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Customer Traffic by Day */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Customer Traffic by Day
              </h3>
              <p className="text-xs text-slate-500">
                Weekly footfall volume distribution (Saturday anomaly highlighted)
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyTrafficTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '12px',
                    border: 'none',
                  }}
                />
                <Bar dataKey="traffic" name="Customers" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Average Waiting Time by Day */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Average Waiting Time Trend
              </h3>
              <p className="text-xs text-slate-500">
                Daily average wait in minutes against 15-minute target SLA
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTrafficTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '12px',
                    border: 'none',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="avgWait"
                  name="Wait Time (min)"
                  stroke="#e11d48"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#e11d48' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Chart Row 2: Branch Load % and Service-Wise Demand */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 3: Branch Load % & Digital Redirection Rate */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Branch Load % & Digital Redirection Rate
              </h3>
              <p className="text-xs text-slate-500">
                Correlation between capacity pressure and mobile deflection adoption
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyTrafficTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '12px',
                    border: 'none',
                  }}
                />
                <Area type="monotone" dataKey="branchLoad" name="Branch Load %" stroke="#2563eb" fill="#dbeafe" />
                <Area type="monotone" dataKey="digitalRedirectionRate" name="Redirection %" stroke="#059669" fill="#d1fae5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Service-Wise Demand Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Service-Wise Demand Volume
              </h3>
              <p className="text-xs text-slate-500">
                Total serviced visitor tickets classified by operational category
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceDemandBreakdown} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '12px',
                    border: 'none',
                  }}
                />
                <Bar dataKey="volume" name="Served Tickets" fill="#0f172a" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
