import React from 'react';
import {
  Users2,
  ArrowRight,
  TrendingDown,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  Clock,
  Gauge,
  BarChart2,
  Zap,
} from 'lucide-react';
import { useBranch } from '../context/BranchContext';

export const StaffOptimizationPage: React.FC = () => {
  const {
    staffAllocations,
    applyStaffReallocation,
    recommendations,
  } = useBranch();

  const isApplied = recommendations.find((r) => r.id === 'rec-1')?.applied;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              AI Staff Optimization
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Dynamic Rebalancing
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Algorithmic workforce redeployment to mitigate queue bottlenecks without increasing payroll hours
          </p>
        </div>

        <div>
          {isApplied ? (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Optimized Allocation Active</span>
            </div>
          ) : (
            <button
              onClick={applyStaffReallocation}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-blue-200" />
              <span>Apply Staff Reallocation</span>
            </button>
          )}
        </div>
      </div>

      {/* Projected Operational Impact Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 uppercase font-semibold">
            <span>Account Opening Wait</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="my-2 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-slate-400 line-through">24 min</span>
            <ArrowRight className="w-4 h-4 text-emerald-600" />
            <span className="text-3xl font-extrabold text-emerald-600">13 min</span>
          </div>
          <div className="text-xs text-emerald-700 font-medium">
            45.8% reduction in peak wait time
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 uppercase font-semibold">
            <span>Account Opening Load</span>
            <Gauge className="w-4 h-4 text-rose-600" />
          </div>
          <div className="my-2 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-slate-400 line-through">94%</span>
            <ArrowRight className="w-4 h-4 text-emerald-600" />
            <span className="text-3xl font-extrabold text-emerald-600">68%</span>
          </div>
          <div className="text-xs text-emerald-700 font-medium">
            Normalized to safe operating zone
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 uppercase font-semibold">
            <span>Teller Service Wait</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="my-2 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-slate-700">8 min</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <span className="text-3xl font-extrabold text-slate-900">10 min</span>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Minimal +2 min impact (well within 15 min SLA)
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 uppercase font-semibold">
            <span>Overall Branch Load</span>
            <Gauge className="w-4 h-4 text-blue-600" />
          </div>
          <div className="my-2 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-slate-400 line-through">94%</span>
            <ArrowRight className="w-4 h-4 text-emerald-600" />
            <span className="text-3xl font-extrabold text-emerald-600">72%</span>
          </div>
          <div className="text-xs text-emerald-700 font-medium">
            Optimal workload distribution
          </div>
        </div>
      </div>

      {/* Visual Before / After Comparison Table & Visual Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CURRENT ALLOCATION */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Baseline Configuration
              </span>
              <h3 className="text-base font-bold text-slate-900">CURRENT STAFF ALLOCATION</h3>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-xs font-mono font-bold">
              Bottlenecked
            </span>
          </div>

          <div className="space-y-3.5">
            {staffAllocations.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{item.serviceName}</h4>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                    <span>Wait: <strong className="text-slate-700">{item.currentWait}m</strong></span>
                    <span>Load: <strong className={item.currentLoad > 85 ? 'text-rose-600' : 'text-slate-700'}>{item.currentLoad}%</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {Array.from({ length: item.currentStaff }).map((_, i) => (
                      <span
                        key={i}
                        className="w-6 h-6 rounded-md bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold"
                      >
                        👤
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-900 w-6 text-right">
                    {item.currentStaff}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 text-xs text-rose-800 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <p>
              Account Opening is under-staffed by 1 personnel, causing a compound queue delay of 24 minutes.
            </p>
          </div>
        </div>

        {/* AI RECOMMENDED ALLOCATION */}
        <div className="bg-white rounded-2xl border-2 border-blue-400/80 p-6 shadow-premium space-y-4 bg-gradient-to-b from-blue-50/20 to-white">
          <div className="flex items-center justify-between border-b border-blue-100 pb-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Prescriptive Recommendation
              </span>
              <h3 className="text-base font-bold text-slate-900">AI OPTIMIZED ALLOCATION</h3>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
              Optimal SLA
            </span>
          </div>

          <div className="space-y-3.5">
            {staffAllocations.map((item) => {
              const hasChanged = item.currentStaff !== item.recommendedStaff;

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                    hasChanged
                      ? 'border-blue-300 bg-blue-50/50 shadow-2xs'
                      : 'border-slate-100 bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900">{item.serviceName}</h4>
                      {hasChanged && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-600 text-white">
                          Rebalanced
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                      <span>Wait: <strong className="text-emerald-700 font-bold">{item.projectedWait}m</strong></span>
                      <span>Load: <strong className="text-emerald-700 font-bold">{item.projectedLoad}%</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: item.recommendedStaff }).map((_, i) => (
                        <span
                          key={i}
                          className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white ${
                            hasChanged ? 'bg-blue-600' : 'bg-slate-800'
                          }`}
                        >
                          👤
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-mono font-bold text-blue-700 w-6 text-right">
                      {item.recommendedStaff}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p>
              Reallocating 1 staff member from Teller to Account Opening equalizes desk utilization and decreases overall customer friction.
            </p>
          </div>

          {!isApplied && (
            <button
              onClick={applyStaffReallocation}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Apply Staff Reallocation Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
