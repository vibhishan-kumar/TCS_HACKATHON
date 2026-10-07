import React, { useState } from 'react';
import {
  Users,
  Clock,
  Gauge,
  UserCheck,
  Star,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Layers,
  CheckCircle2,
  PhoneCall,
  Calendar,
  Share2,
  Sliders,
  Info,
  Maximize2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import { useBranch } from '../context/BranchContext';
import { KpiCard } from '../components/common/KpiCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { todayForecast, tomorrowForecast, next7DaysForecast } from '../data/mockForecast';
import { Link, useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const {
    selectedBranch,
    services,
    recommendations,
    applyRecommendation,
    toggleAssistant,
  } = useBranch();

  const navigate = useNavigate();
  const [forecastTab, setForecastTab] = useState<'today' | 'tomorrow' | '7days'>('today');

  const activeForecastData =
    forecastTab === 'today'
      ? todayForecast
      : forecastTab === 'tomorrow'
      ? tomorrowForecast
      : next7DaysForecast;

  const accountOpeningService = services.find((s) => s.id === 'account_opening');

  return (
    <div className="space-y-7">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Good afternoon, Branch Manager
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
              <Sparkles className="w-3 h-3 text-blue-600" />
              Live Optimization Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Here's your branch performance and AI recommendations for today for{' '}
            <strong className="text-slate-800 font-semibold">{selectedBranch.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="text-right">
            <span className="text-[11px] font-medium text-slate-400 block uppercase tracking-wider">
              Telemetry Status
            </span>
            <span className="text-xs font-semibold text-slate-700 font-mono">
              Last updated {selectedBranch.lastUpdated}
            </span>
          </div>
          <button
            onClick={() => toggleAssistant(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Consult AI Co-Pilot</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Cards (5 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* 1. Current Customers */}
        <KpiCard
          title="Current Customers"
          value={selectedBranch.currentCustomers}
          unit="in branch"
          comparison={selectedBranch.customersChange}
          trend={selectedBranch.customersChange.includes('+') ? 'up' : 'down'}
          status={selectedBranch.currentCustomers > 35 ? 'High' : 'Normal'}
          icon={Users}
          accentColor="rose"
        />

        {/* 2. Average Wait Time */}
        <KpiCard
          title="Average Wait Time"
          value={selectedBranch.avgWaitTime}
          unit="min"
          comparison={selectedBranch.waitChange}
          trend={selectedBranch.avgWaitTime > 15 ? 'up' : 'down'}
          status={selectedBranch.avgWaitTime <= 15 ? 'Improving' : 'High'}
          icon={Clock}
          accentColor="amber"
        />

        {/* 3. Branch Load */}
        <KpiCard
          title="Branch Load"
          value={`${selectedBranch.branchLoad}%`}
          comparison="Target SLA < 75%"
          status={selectedBranch.loadStatus}
          icon={Gauge}
          accentColor={selectedBranch.branchLoad > 80 ? 'rose' : 'blue'}
        />

        {/* 4. Available Staff */}
        <KpiCard
          title="Available Staff"
          value={`${selectedBranch.availableStaff} / ${selectedBranch.totalStaff}`}
          comparison="2 on scheduled break"
          status="2 unavailable"
          icon={UserCheck}
          accentColor="blue"
        />

        {/* 5. Customer Satisfaction */}
        <KpiCard
          title="Customer Satisfaction"
          value={selectedBranch.csat}
          unit="/ 5.0"
          comparison={selectedBranch.csatChange}
          trend="down"
          status="Improving"
          icon={Star}
          accentColor="emerald"
        />
      </div>

      {/* 3. AI Bottleneck Alert (Prominent callout banner) */}
      {accountOpeningService && (
        <div className="rounded-2xl border-2 border-rose-200 bg-gradient-to-r from-rose-50/70 via-white to-amber-50/40 p-5 shadow-subtle relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200/20 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-700 flex-shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded border border-rose-300">
                    AI Bottleneck Detection
                  </span>
                  <span className="text-xs font-semibold text-rose-900">
                    Critical Operational Alert
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Account Opening is approaching critical capacity.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  Demand is <strong>38% above normal</strong> for this time period while only{' '}
                  <strong>one employee</strong> is currently assigned to this desk.
                </p>

                {/* Metrics Breakdown Chips */}
                <div className="flex items-center gap-2 pt-2 flex-wrap text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-medium text-slate-700">
                    Current Load: <strong className="text-rose-700 font-bold">{accountOpeningService.load}%</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-medium text-slate-700">
                    Queue: <strong className="text-slate-900 font-bold">{accountOpeningService.queue} customers</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-medium text-slate-700">
                    Average Wait: <strong className="text-rose-700 font-bold">{accountOpeningService.wait} min</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-medium text-slate-700">
                    Staff Assigned: <strong className="text-slate-900 font-bold">{accountOpeningService.staffAssigned}</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 flex-shrink-0 self-end lg:self-center w-full sm:w-auto">
              <button
                onClick={() => applyRecommendation('rec-1')}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-md shadow-rose-600/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Reallocate 1 Staff Immediately</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/simulator"
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-medium text-xs transition-colors text-center flex items-center justify-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5 text-blue-600" />
                <span>Simulate in What-If Engine</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 4. Customer Load Forecast (Chart Section) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Customer Load Forecast
              <span className="text-xs font-normal text-slate-400">
                (Predictive Footfall Analysis)
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              AI dynamic projection versus actual customer arrivals and nominal threshold
            </p>
          </div>

          {/* Forecast Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl self-start sm:self-auto border border-slate-200">
            <button
              onClick={() => setForecastTab('today')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                forecastTab === 'today'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setForecastTab('tomorrow')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                forecastTab === 'tomorrow'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tomorrow
            </button>
            <button
              onClick={() => setForecastTab('7days')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                forecastTab === '7days'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Next 7 Days
            </button>
          </div>
        </div>

        {/* Forecast Recharts Visual */}
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={activeForecastData}
              margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="predictedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="time"
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  color: '#fff',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
                }}
              />
              {/* Peak Threshold Reference Line */}
              <ReferenceLine
                y={forecastTab === '7days' ? 320 : 65}
                stroke="#f43f5e"
                strokeDasharray="4 4"
                label={{
                  value: 'Peak Capacity Threshold',
                  fill: '#e11d48',
                  fontSize: 11,
                  position: 'insideTopRight',
                }}
              />

              <Area
                type="monotone"
                dataKey="predicted"
                name="AI Predicted Footfall"
                stroke="#2563eb"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#predictedGrad)"
              />
              {forecastTab === 'today' && (
                <Area
                  type="monotone"
                  dataKey="actual"
                  name="Actual Customers"
                  stroke="#059669"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#actualGrad)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend and AI Insight Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-3 rounded-full bg-blue-600" />
              AI Predicted Load
            </span>
            {forecastTab === 'today' && (
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-3 h-3 rounded-full bg-emerald-600" />
                Actual Footfall
              </span>
            )}
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-0.5 bg-rose-500" />
              Max Branch Threshold (65)
            </span>
          </div>

          <span className="text-[11px] font-mono text-slate-400">
            Model: DeepFlow Neural Forecast v4.1 • 94.8% historical precision
          </span>
        </div>

        {/* Contextual AI Insight Block */}
        <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-3">
          <div className="p-1 rounded-lg bg-blue-600 text-white mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <strong className="text-blue-900 font-bold block mb-0.5">
              AI Insight:
            </strong>
            <p className="text-blue-800 leading-relaxed">
              Customer traffic is expected to peak between <strong>2:00 PM and 3:30 PM</strong> (estimated 87 customers at 3 PM), approximately <strong>32% above the normal branch capacity</strong>. Pre-allocating staff to Account Opening will prevent an estimated 11-minute wait spike.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Live Branch Operations & Counters */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Live Branch Operations
              <span className="w-2 h-2 rounded-full bg-emerald-500 beacon" />
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Real-time telemetry across active service counters and queue wait intervals
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3 text-xs bg-slate-50 p-2 rounded-xl border border-slate-200">
            <div className="px-2">
              <span className="text-slate-400 text-[10px] block uppercase">Current Queue</span>
              <strong className="text-slate-900 font-bold font-mono">{selectedBranch.currentCustomers} customers</strong>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div className="px-2">
              <span className="text-slate-400 text-[10px] block uppercase">Average Wait</span>
              <strong className="text-slate-900 font-bold font-mono">{selectedBranch.avgWaitTime} min</strong>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div className="px-2">
              <span className="text-slate-400 text-[10px] block uppercase">Active Counters</span>
              <strong className="text-slate-900 font-bold font-mono">{selectedBranch.activeCounters} / {selectedBranch.totalCounters}</strong>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div className="px-2">
              <span className="text-slate-400 text-[10px] block uppercase">Branch Load</span>
              <strong className="text-blue-700 font-bold font-mono">{selectedBranch.branchLoad}%</strong>
            </div>
          </div>
        </div>

        {/* 5 Service-Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {services.map((service) => {
            let cardBorder = 'border-slate-200 bg-white';
            let barColor = 'bg-emerald-500';

            if (service.status === 'warning') {
              cardBorder = 'border-amber-200 bg-amber-50/20';
              barColor = 'bg-amber-500';
            } else if (service.status === 'critical') {
              cardBorder = 'border-rose-300 bg-rose-50/30';
              barColor = 'bg-rose-500';
            }

            return (
              <div
                key={service.id}
                className={`p-4 rounded-xl border ${cardBorder} shadow-2xs hover:shadow-subtle transition-all flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <StatusBadge status={service.status} size="sm" />
                    <span className="text-[11px] font-mono text-slate-500">
                      {service.staffAssigned} Staff
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm leading-tight">
                    {service.name}
                  </h3>

                  <div className="mt-3 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Queue:</span>
                      <strong className="text-slate-900 font-semibold">{service.queue}</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Wait Time:</span>
                      <strong className={`font-semibold ${service.wait > 20 ? 'text-rose-600' : 'text-slate-900'}`}>
                        {service.wait} min
                      </strong>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-500">Service Load:</span>
                        <span className="font-bold font-mono text-slate-800">{service.load}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                          style={{ width: `${Math.min(100, service.load)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{service.countersActive}/{service.totalCounters} counters</span>
                  <Link
                    to="/bottlenecks"
                    className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-0.5"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. AI Recommendations (Actionable Decision Cards) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Recommended Actions
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                Prescriptive Intelligence
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              1-click operational playbooks calculated to maximize throughput and minimize customer wait times
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {recommendations.map((rec) => {
            const isHigh = rec.priority === 'HIGH';

            return (
              <div
                key={rec.id}
                className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
                  rec.applied
                    ? 'border-emerald-200 bg-emerald-50/30 opacity-90'
                    : isHigh
                    ? 'border-blue-300 bg-gradient-to-b from-blue-50/40 to-white shadow-subtle'
                    : 'border-slate-200 bg-white shadow-subtle'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                        rec.applied
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : isHigh
                          ? 'bg-rose-100 text-rose-700 border-rose-300'
                          : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}
                    >
                      {rec.applied ? 'APPLIED' : `${rec.priority} PRIORITY`}
                    </span>

                    <span className="text-[11px] font-mono text-slate-400">
                      Impact Score: 94/100
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm leading-snug">
                    {rec.title}
                  </h3>

                  <div className="mt-2 text-xs text-slate-600 space-y-1.5">
                    <p className="leading-relaxed">
                      <strong className="text-slate-800 font-semibold">Reason:</strong> {rec.reason}
                    </p>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-700">
                      <strong className="text-emerald-700 font-bold block mb-0.5">
                        Expected Impact:
                      </strong>
                      {rec.expectedImpact}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  {rec.applied ? (
                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-700 py-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Recommendation Enacted</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => applyRecommendation(rec.id)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1.5 ${
                        isHigh
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <span>{rec.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
