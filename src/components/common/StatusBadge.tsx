import React from 'react';

interface StatusBadgeProps {
  status: 'healthy' | 'warning' | 'critical' | 'Normal' | 'Moderate' | 'High' | 'Critical' | string;
  className?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '', size = 'md' }) => {
  const normalized = status.toLowerCase();

  let styles = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-500';

  if (normalized === 'healthy' || normalized === 'normal' || normalized === 'improving') {
    styles = 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
    dotColor = 'bg-emerald-500';
  } else if (normalized === 'warning' || normalized === 'moderate') {
    styles = 'bg-amber-50 text-amber-700 border-amber-200/80';
    dotColor = 'bg-amber-500';
  } else if (normalized === 'critical' || normalized === 'high') {
    styles = 'bg-rose-50 text-rose-700 border-rose-200/80';
    dotColor = 'bg-rose-500';
  }

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${sizeClasses} ${styles} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span className="capitalize">{status}</span>
    </span>
  );
};
