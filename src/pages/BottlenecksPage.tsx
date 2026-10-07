import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
  Users,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Layers,
} from 'lucide-react';
import { useBranch } from '../context/BranchContext';
import { Link } from 'react-router-dom';

export const BottlenecksPage: React.FC = () => {
  const { services, applyRecommendation, recommendations } = useBranch();

  const accountOpening = services.find((s) => s.id === 'account_opening');
  const isMitigated = recommendations.find((r) => r.id === 'rec-1')?.applied;

  const rootCauses = [
    {
      factor: 'Unseasonal Inflow Surge',
      severity: '+38% above baseline',
      description: 'Corporate payroll account enrollments clustered during morning and midday crossover.',
      impact: 'High',
    },
    {
      factor: 'Staff Imbalance',
      severity: '1 Active Personnel',
      description: 'Only 1 dedicated teller assigned to Account Opening, creating a 1:15 service bottleneck ratio.',
      impact: 'Critical',
    },
    {
      factor: 'Document Processing Latency',
      severity: '18.4 min per customer',
      description: 'Physical signature card scanning and KYC photo verification slowing individual completions.',
      impact: 'Medium',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              AI Bottleneck Detection & Root-Cause Diagnosis
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
              Deep Neural Diagnostic
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time identification of capacity choke points, service drag, and operational risks
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link
            to="/simulator"
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Simulate Fix in What-If</span>
          </Link>
        </div>
      </div>

      {/* Main Alert Card */}
      {accountOpening && (
        <div
          className={`p-6 rounded-2xl border-2 transition-all ${
            isMitigated
              ? 'border-emerald-200 bg-emerald-50/30'
              : 'border-rose-300 bg-gradient-to-r from-rose-50/70 via-white to-amber-50/30 shadow-subtle'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isMitigated ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}
              >
                {isMitigated ? <CheckCircle2 className="w-6 h-6" /> : <AlertOctagon className="w-6 h-6" />}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isMitigated
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {isMitigated ? 'BOTTLENECK RESOLVED' : 'CRITICAL BOTTLENECK ACTIVE'}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    Service Desk: Account Opening
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-900">
                  {isMitigated
                    ? 'Account Opening load stabilized following staff rebalancing.'
                    : 'Account Opening is approaching critical capacity.'}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  Demand is <strong>38% above normal</strong> for this time period while only{' '}
                  <strong>{accountOpening.staffAssigned} employee</strong> is currently assigned to this counter.
                </p>

                {/* Metrics Pill Grid */}
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                  <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 font-medium">
                    Current Load: <strong className={accountOpening.load > 85 ? 'text-rose-700' : 'text-slate-900'}>{accountOpening.load}%</strong>
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 font-medium">
                    Queue: <strong className="text-slate-900">{accountOpening.queue} customers</strong>
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 font-medium">
                    Average Wait: <strong className={accountOpening.wait > 20 ? 'text-rose-700' : 'text-slate-900'}>{accountOpening.wait} min</strong>
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 font-medium">
                    Available Staff: <strong className="text-slate-900">{accountOpening.staffAssigned}</strong>
                  </span>
                </div>
              </div>
            </div>

            {!isMitigated && (
              <div className="flex flex-col gap-2 flex-shrink-0 self-end lg:self-center">
                <button
                  onClick={() => applyRecommendation('rec-1')}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-md shadow-rose-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Apply Staff Reallocation Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Root-Cause Decomposition Grid */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Root-Cause Factor Decomposition
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Diagnostic model breakdown showing why this bottleneck developed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rootCauses.map((rc, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Factor #{idx + 1}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      rc.impact === 'Critical'
                        ? 'bg-rose-100 text-rose-700'
                        : rc.impact === 'High'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {rc.impact} Risk
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs">{rc.factor}</h4>
                <div className="font-mono text-xs font-semibold text-blue-700 mt-0.5">
                  {rc.severity}
                </div>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {rc.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Ranking Comparison */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">
            All Service Centers Bottleneck Vulnerability Ranking
          </h3>
          <p className="text-xs text-slate-500">
            Indexed by load factor and queue sensitivity
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px]">
              <tr>
                <th className="px-5 py-3">Service Desk</th>
                <th className="px-4 py-3">Active Load</th>
                <th className="px-4 py-3">Queue Count</th>
                <th className="px-4 py-3">Wait Time</th>
                <th className="px-4 py-3">Assigned Staff</th>
                <th className="px-4 py-3">Bottleneck Index</th>
                <th className="px-5 py-3 text-right">Mitigation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-slate-900">{s.name}</td>
                  <td className="px-4 py-3.5 font-mono font-bold text-slate-800">
                    <span className={s.load > 85 ? 'text-rose-600' : 'text-slate-800'}>
                      {s.load}%
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-mono">{s.queue}</td>
                  <td className="px-4 py-3.5 font-mono">{s.wait} min</td>
                  <td className="px-4 py-3.5 font-mono">{s.staffAssigned}</td>
                  <td className="px-4 py-3.5">
                    <div className="w-24 h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full ${
                          s.load > 85 ? 'bg-rose-500' : s.load > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${s.load}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    {s.id === 'account_opening' && !isMitigated ? (
                      <button
                        onClick={() => applyRecommendation('rec-1')}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-[11px] shadow-sm"
                      >
                        Reallocate Staff
                      </button>
                    ) : (
                      <span className="text-slate-400 text-[11px] font-medium">Safe</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
