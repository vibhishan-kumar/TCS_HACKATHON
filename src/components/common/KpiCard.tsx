import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface KpiCardProps {
  title: string;
  value: string | number;
  unit?: string;
  comparison?: string;
  trend?: 'up' | 'down' | 'neutral';
  status: string;
  icon: LucideIcon;
  subtext?: string;
  accentColor?: 'blue' | 'amber' | 'rose' | 'emerald';
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  unit,
  comparison,
  trend = 'neutral',
  status,
  icon: Icon,
  subtext,
  accentColor = 'blue',
}) => {
  const iconBgMap = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    rose: 'bg-rose-50 text-rose-700 border-rose-100',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-subtle hover:shadow-card transition-all duration-200 flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase">
          {title}
        </span>
        <div className={`p-2 rounded-lg border ${iconBgMap[accentColor]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      {/* Primary Value */}
      <div className="flex items-baseline gap-1.5 my-1">
        <span className="text-3xl font-bold tracking-tight text-slate-900 font-sans">
          {value}
        </span>
        {unit && <span className="text-sm font-semibold text-slate-500">{unit}</span>}
      </div>

      {/* Footer Info & Status */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          {trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-rose-500" />}
          {trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />}
          {trend === 'neutral' && <Minus className="w-3.5 h-3.5 text-slate-400" />}
          <span className="font-medium text-slate-700">{comparison}</span>
          {subtext && <span className="text-slate-400">{subtext}</span>}
        </div>

        <StatusBadge status={status} size="sm" />
      </div>
    </div>
  );
};
