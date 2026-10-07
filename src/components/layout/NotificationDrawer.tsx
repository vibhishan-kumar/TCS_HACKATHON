import React from 'react';
import { X, AlertOctagon, AlertTriangle, Info, CheckCircle2, ArrowRight } from 'lucide-react';
import { useBranch } from '../../context/BranchContext';
import { Link } from 'react-router-dom';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { alerts, resolveAlert, applyRecommendation } = useBranch();

  if (!isOpen) return null;

  const unresolvedAlerts = alerts.filter((a) => !a.resolved);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div>
              <h2 className="text-base font-bold text-slate-900">Operations Alerts & Dispatch</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {unresolvedAlerts.length} actionable notifications require attention
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Alert List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {unresolvedAlerts.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-slate-900">All Alerts Resolved</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Branch operations are functioning normally within safe thresholds.
                </p>
              </div>
            ) : (
              unresolvedAlerts.map((alert) => {
                let badgeStyle = 'bg-rose-50 text-rose-700 border-rose-200';
                let icon = <AlertOctagon className="w-4 h-4 text-rose-600" />;

                if (alert.type === 'warning') {
                  badgeStyle = 'bg-amber-50 text-amber-700 border-amber-200';
                  icon = <AlertTriangle className="w-4 h-4 text-amber-600" />;
                } else if (alert.type === 'info') {
                  badgeStyle = 'bg-blue-50 text-blue-700 border-blue-200';
                  icon = <Info className="w-4 h-4 text-blue-600" />;
                }

                return (
                  <div
                    key={alert.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white shadow-subtle hover:border-slate-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border ${badgeStyle} uppercase tracking-wider`}
                        >
                          {icon}
                          {alert.type}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">{alert.timestamp}</span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 leading-snug">{alert.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{alert.description}</p>

                      <div className="mt-2 text-[11px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
                        <strong className="text-slate-700 font-medium">Risk:</strong> {alert.impact}
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => resolveAlert(alert.id)}
                        className="text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors"
                      >
                        Dismiss
                      </button>

                      {alert.actionType && (
                        <button
                          onClick={() => {
                            if (alert.actionType === 'staff_reallocate') {
                              applyRecommendation('rec-1');
                            } else if (alert.actionType === 'open_counter') {
                              applyRecommendation('rec-3');
                            } else if (alert.actionType === 'digital_redirect') {
                              applyRecommendation('rec-2');
                            } else {
                              resolveAlert(alert.id);
                            }
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
                        >
                          {alert.actionLabel || 'Apply Mitigation'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <Link
              to="/alerts"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition-colors"
            >
              <span>Open Dedicated Alert Command Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
