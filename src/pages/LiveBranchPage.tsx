import React from 'react';
import {
  Activity,
  Users,
  Clock,
  Gauge,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useBranch } from '../context/BranchContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { Link } from 'react-router-dom';

export const LiveBranchPage: React.FC = () => {
  const { selectedBranch, services, applyRecommendation } = useBranch();

  const countersDetail = [
    { number: 1, name: 'Teller 1 (Cash & Cheque)', service: 'Teller Services', teller: 'Amit Sharma', status: 'Busy', queue: 4, avgSpeed: '3.2 min/cust' },
    { number: 2, name: 'Teller 2 (Cash Withdrawals)', service: 'Teller Services', teller: 'Pooja Reddy', status: 'Busy', queue: 4, avgSpeed: '2.8 min/cust' },
    { number: 3, name: 'Teller 3 (High Value & DD)', service: 'Teller Services', teller: 'Kiran Kumar', status: 'Available', queue: 4, avgSpeed: '4.1 min/cust' },
    { number: 4, name: 'Desk 1 (Retail Accounts)', service: 'Account Opening', teller: 'Sneha Patel', status: 'Overloaded', queue: 15, avgSpeed: '18.4 min/cust' },
    { number: 5, name: 'Loans & Mortgages', service: 'Loan Services', teller: 'Vikram Rao', status: 'In Consultation', queue: 4, avgSpeed: '14.0 min/cust' },
    { number: 6, name: 'Business Loans & Credit', service: 'Loan Services', teller: 'Ananya Roy', status: 'Busy', queue: 3, avgSpeed: '16.5 min/cust' },
    { number: 7, name: 'Standby Counter (Offline)', service: 'Account Opening (Standby)', teller: 'Unassigned', status: 'Closed', queue: 0, avgSpeed: 'Standby' },
    { number: 8, name: 'KYC & Biometrics Desk', service: 'KYC Services', teller: 'Rahul Deshmukh', status: 'Busy', queue: 8, avgSpeed: '7.5 min/cust' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Live Branch Operations Command
            </h1>
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 beacon" />
              Live Telemetry
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time counter occupancy, teller productivity, and physical floor throughput at {selectedBranch.name}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <Link
            to="/staff-optimization"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-blue-200" />
            <span>Reallocate Tellers</span>
          </Link>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle">
          <span className="text-xs font-semibold text-slate-400 uppercase">Active Counters</span>
          <div className="text-2xl font-bold text-slate-900 mt-1 font-mono">
            {selectedBranch.activeCounters} / {selectedBranch.totalCounters} Active
          </div>
          <span className="text-xs text-slate-500">Counter #7 available for dispatch</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle">
          <span className="text-xs font-semibold text-slate-400 uppercase">Total Floor Queue</span>
          <div className="text-2xl font-bold text-slate-900 mt-1 font-mono">
            {selectedBranch.currentCustomers} Visitors
          </div>
          <span className="text-xs text-rose-600 font-medium">+18% above typical Monday</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle">
          <span className="text-xs font-semibold text-slate-400 uppercase">Average Wait SLA</span>
          <div className="text-2xl font-bold text-slate-900 mt-1 font-mono">
            {selectedBranch.avgWaitTime} Minutes
          </div>
          <span className="text-xs text-emerald-600 font-medium">Target threshold: 15 min</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle">
          <span className="text-xs font-semibold text-slate-400 uppercase">Current Capacity Load</span>
          <div className="text-2xl font-bold text-slate-900 mt-1 font-mono">
            {selectedBranch.branchLoad}% Utilization
          </div>
          <span className="text-xs text-amber-600 font-medium">Elevated pressure on desk 4</span>
        </div>
      </div>

      {/* Service-by-Service Live Grid */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle space-y-4">
        <h2 className="text-base font-bold text-slate-900">
          Service Counter Operations Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
            >
              <div className="flex items-center justify-between">
                <StatusBadge status={service.status} size="sm" />
                <span className="text-xs text-slate-500 font-mono">{service.staffAssigned} Staff</span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm">{service.name}</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{service.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-200/70 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600">Waiting:</span>
                  <strong className="text-slate-900 font-mono">{service.queue}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Estimated Wait:</span>
                  <strong className={service.wait > 18 ? 'text-rose-600 font-mono' : 'text-slate-900 font-mono'}>
                    {service.wait} min
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Load %:</span>
                  <strong className="text-blue-700 font-mono">{service.load}%</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Counter-by-Counter Physical Layout Grid */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Individual Counter Telemetry & Teller Allocation
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live status for physical counters #1 through #8
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {countersDetail.map((counter) => {
            const isOverloaded = counter.status === 'Overloaded';
            const isClosed = counter.status === 'Closed';

            return (
              <div
                key={counter.number}
                className={`p-4 rounded-xl border transition-all ${
                  isOverloaded
                    ? 'border-rose-300 bg-rose-50/40 shadow-2xs'
                    : isClosed
                    ? 'border-dashed border-slate-300 bg-slate-50 opacity-70'
                    : 'border-slate-200 bg-white shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 font-mono">
                    Counter #{counter.number}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isOverloaded
                        ? 'bg-rose-100 text-rose-700'
                        : isClosed
                        ? 'bg-slate-200 text-slate-600'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {counter.status}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-xs truncate">
                  {counter.name}
                </h4>

                <div className="mt-3 space-y-1.5 text-[11px] text-slate-600">
                  <div className="flex justify-between">
                    <span>Assigned Staff:</span>
                    <strong className="text-slate-800">{counter.teller}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Queue:</span>
                    <strong className={isOverloaded ? 'text-rose-700 font-bold' : 'text-slate-900'}>
                      {counter.queue} customers
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Service Speed:</span>
                    <strong className="text-slate-700">{counter.avgSpeed}</strong>
                  </div>
                </div>

                {isOverloaded && (
                  <div className="mt-3 pt-2 border-t border-rose-200">
                    <button
                      onClick={() => applyRecommendation('rec-1')}
                      className="w-full py-1.5 px-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[11px] font-bold transition-colors"
                    >
                      Reinforce Counter
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
