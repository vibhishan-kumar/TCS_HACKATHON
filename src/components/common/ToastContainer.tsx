import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useBranch } from '../../context/BranchContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useBranch();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        let borderColor = 'border-blue-200 bg-white';
        let icon = <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />;

        if (toast.type === 'success') {
          borderColor = 'border-emerald-200 bg-white';
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />;
        } else if (toast.type === 'warning') {
          borderColor = 'border-amber-200 bg-white';
          icon = <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border ${borderColor} shadow-premium transition-all duration-300 animate-in slide-in-from-right`}
          >
            {icon}
            <div className="flex-1 text-sm">
              <p className="font-semibold text-slate-800 leading-snug">{toast.message}</p>
              <span className="text-[11px] text-slate-400 mt-0.5 block">{toast.timestamp}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
