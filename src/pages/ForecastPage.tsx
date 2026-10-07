import React, { useState } from 'react';
import {
  LineChart,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import {
  TrendingUp,
  Clock,
  Sparkles,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { useBranch } from '../context/BranchContext';
import { todayForecast, tomorrowForecast, next7DaysForecast } from '../data/mockForecast';

export const ForecastPage: React.FC = () => {
  const { selectedBranch } = useBranch();
  const [tab, setTab] = useState<'today' | 'tomorrow' | '7days'>('today');

  const activeData =
    tab === 'today'
      ? todayForecast
      : tab === 'tomorrow'
      ? tomorrowForecast
      : next7DaysForecast;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Customer Load & Footfall Forecast
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              Neural Time-Series
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Predictive machine-learning footfall modeling for {selectedBranch.name}
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setTab('today')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              tab === 'today' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setTab('tomorrow')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              tab === 'tomorrow' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            Tomorrow
          </button>
          <button
            onClick={() => setTab('7days')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              tab === '7days' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            Next 7 Days
          </button>
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Expected Customer Traffic vs Nominal Branch Capacity
            </h2>
            <p className="text-xs text-slate-500">
              Peak threshold fixed at 65 concurrent customers based on counter staffing
            </p>
          </div>
        </div>

        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="forecastBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                  border: 'none',
                }}
              />
              <ReferenceLine
                y={tab === '7days' ? 320 : 65}
                stroke="#e11d48"
                strokeDasharray="4 4"
                label={{
                  value: 'Max Floor Capacity (65)',
                  fill: '#e11d48',
                  fontSize: 11,
                  position: 'insideTopRight',
                }}
              />
              <Area
                type="monotone"
                dataKey="predicted"
                name="Predicted Traffic"
                stroke="#2563eb"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#forecastBlue)"
              />
              {tab === 'today' && (
                <Area
                  type="monotone"
                  dataKey="actual"
                  name="Actual Observed"
                  stroke="#059669"
                  strokeWidth={2}
                  fillOpacity={0.2}
                  fill="#059669"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI Insight Box */}
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="block text-sm font-bold text-blue-950">
              AI Insight:
            </strong>
            <p className="leading-relaxed text-blue-900">
              Customer traffic is expected to peak between <strong>2:00 PM and 3:30 PM</strong>, approximately <strong>32% above normal branch capacity</strong> (87 customers predicted at 3 PM). The highest pressure will fall on Account Opening and KYC desks.
            </p>
          </div>
        </div>
      </div>

      {/* Hourly Breakdown Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">
            Hourly Telemetry & Peak Prediction Matrix
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px]">
              <tr>
                <th className="px-5 py-3">Time Interval</th>
                <th className="px-4 py-3">Predicted Customers</th>
                <th className="px-4 py-3">Capacity Threshold</th>
                <th className="px-4 py-3">Utilization Status</th>
                <th className="px-4 py-3">Recommended Staffing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {activeData.map((pt, i) => {
                const isOver = pt.predicted > (tab === '7days' ? 320 : 65);
                return (
                  <tr key={i} className={`hover:bg-slate-50/70 transition-colors ${isOver ? 'bg-rose-50/20' : ''}`}>
                    <td className="px-5 py-3.5 font-bold text-slate-900">{pt.time}</td>
                    <td className="px-4 py-3.5 font-mono font-bold text-blue-700">{pt.predicted}</td>
                    <td className="px-4 py-3.5 font-mono text-slate-500">{pt.capacityThreshold}</td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isOver ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {isOver ? 'OVER CAPACITY (PEAK)' : 'NOMINAL'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 font-medium">
                      {isOver ? 'Deploy 2 Standby Tellers' : 'Standard 8 Staff'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
