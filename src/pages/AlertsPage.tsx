import React, { useState } from 'react';
import {
  Bell,
  AlertOctagon,
  AlertTriangle,
  Info,
  CheckCircle2,
  ArrowRight,
  Filter,
  ShieldCheck,
  Check,
  RotateCcw,
} from 'lucide-react';
import { useBranch } from '../context/BranchContext';

export const AlertsPage: React.FC = () => {
  const { alerts, resolveAlert, applyRecommendation } = useBranch();
  const [filterType, setFilterType] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [showResolved, setShowResolved] = useState(false);

  const filteredAlerts = alerts.filter((a) => {
    if (!showResolved && a.resolved) return false;
    if (filterType !== 'all' && a.type !== filterType) return false;
    return true;
  });

  const unresolvedCritical = alerts.filter((a) => !a.resolved && a.type === 'critical').length;
  const unresolvedWarning = alerts.filter((a) => !a.resolved && a.type === 'warning').length;
  const unresolvedInfo = alerts.filter((a) => !a.resolved && a.type === 'info').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Operations Alert & Triage Center
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
              Active Monitoring
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time threshold breaches, capacity predictions, and mitigation dispatches
          </p>
        </div>

        {/* Severity Count Pills */}
        <div className="flex items-center gap-2 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 font-semibold flex items-center gap-1.5">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
            <span>{unresolvedCritical} Critical</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-semibold flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>{unresolvedWarning} Warning</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 font-semibold flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-600" />
            <span>{unresolvedInfo} Info</span>
          </div>
        </div>
      </div>

      {/* Filter and View Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              filterType === 'all'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Alerts ({alerts.length})
          </button>
          <button
            onClick={() => setFilterType('critical')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              filterType === 'critical'
                ? 'bg-rose-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Critical
          </button>
          <button
            onClick={() => setFilterType('warning')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              filterType === 'warning'
                ? 'bg-amber-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Warning
          </button>
          <button
            onClick={() => setFilterType('info')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              filterType === 'info'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Info
          </button>
        </div>

        <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
          <input
            type="checkbox"
            checked={showResolved}
            onChange={(e) => setShowResolved(e.target.checked)}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Include resolved alerts</span>
        </label>
      </div>

      {/* Alerts List */}
      <div className="space-y-3.5">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No active alerts matching filter</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              All branch performance and throughput indicators are operating within tolerance bounds.
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isCritical = alert.type === 'critical';
            const isWarning = alert.type === 'warning';

            return (
              <div
                key={alert.id}
                className={`p-5 rounded-2xl border transition-all ${
                  alert.resolved
                    ? 'border-slate-200 bg-slate-50/70 opacity-75'
                    : isCritical
                    ? 'border-rose-200 bg-rose-50/20 shadow-subtle'
                    : isWarning
                    ? 'border-amber-200 bg-amber-50/20 shadow-subtle'
                    : 'border-slate-200 bg-white shadow-subtle'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        alert.resolved
                          ? 'bg-emerald-100 text-emerald-700'
                          : isCritical
                          ? 'bg-rose-100 text-rose-700'
                          : isWarning
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {alert.resolved ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : isCritical ? (
                        <AlertOctagon className="w-5 h-5" />
                      ) : isWarning ? (
                        <AlertTriangle className="w-5 h-5" />
                      ) : (
                        <Info className="w-5 h-5" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                            alert.resolved
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : isCritical
                              ? 'bg-rose-100 text-rose-800 border-rose-300'
                              : isWarning
                              ? 'bg-amber-100 text-amber-800 border-amber-300'
                              : 'bg-blue-100 text-blue-800 border-blue-300'
                          }`}
                        >
                          {alert.resolved ? 'RESOLVED' : alert.type}
                        </span>
                        <span className="text-xs font-semibold text-slate-700">
                          {alert.service}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">• {alert.timestamp}</span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900">{alert.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                        {alert.description}
                      </p>

                      <div className="text-[11px] text-slate-500 pt-1">
                        <strong className="text-slate-700">Operational Risk:</strong> {alert.impact}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                    {!alert.resolved && (
                      <>
                        <button
                          onClick={() => resolveAlert(alert.id)}
                          className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors"
                        >
                          Mark as Resolved
                        </button>

                        {alert.actionType && (
                          <button
                            onClick={() => {
                              if (alert.actionType === 'staff_reallocate') {
                                applyRecommendation('rec-1');
                              } else if (alert.actionType === 'digital_redirect') {
                                applyRecommendation('rec-2');
                              } else if (alert.actionType === 'open_counter') {
                                applyRecommendation('rec-3');
                              } else {
                                resolveAlert(alert.id);
                              }
                            }}
                            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                          >
                            <span>{alert.actionLabel || 'Apply Mitigation'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </>
                    )}

                    {alert.resolved && (
                      <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        <span>Mitigated</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
