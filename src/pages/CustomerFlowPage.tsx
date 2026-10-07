import React from 'react';
import {
  Share2,
  Smartphone,
  Building2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Send,
  Zap,
  TrendingDown,
  Clock,
  QrCode,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { useBranch } from '../context/BranchContext';
import { mockRedirectionData } from '../data/mockRedirection';

export const CustomerFlowPage: React.FC = () => {
  const { startDigitalRedirection, recommendations } = useBranch();

  const isRedirectionActive = recommendations.find((r) => r.id === 'rec-2')?.applied;

  const totalCustomers = mockRedirectionData.reduce((acc, curr) => acc + curr.totalCustomers, 0);
  const totalDigitalEligible = mockRedirectionData.reduce((acc, curr) => acc + curr.digitalEligible, 0);
  const totalBranchRequired = mockRedirectionData.reduce((acc, curr) => acc + curr.branchRequired, 0);

  const pieData = [
    { name: 'Digital Eligible (Mobile App / Net Banking)', value: totalDigitalEligible, color: '#2563eb' },
    { name: 'Branch Required (Physical In-Person)', value: totalBranchRequired, color: '#94a3b8' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Customer Flow & Digital Redirection
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              Channel Optimization
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Identify customers waiting for simple services that can be serviced via mobile or net banking channels
          </p>
        </div>

        <div>
          {isRedirectionActive ? (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Digital Dispatch Active (38 Diverted)</span>
            </div>
          ) : (
            <button
              onClick={() => startDigitalRedirection()}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-blue-200" />
              <span>Start Digital Redirection</span>
            </button>
          )}
        </div>
      </div>

      {/* Prominent Recommendation Card */}
      <div className="p-5 rounded-2xl border-2 border-blue-200 bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/60 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md shadow-blue-500/20">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">
              AI Redirection Opportunity
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              38 customers currently waiting for services that can be completed digitally.
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Diverting these customers via automated SMS assistance or branch tablet kiosks can reduce average in-branch waiting times from <strong>18 min to 11 min</strong>.
            </p>
          </div>
        </div>

        <button
          onClick={() => startDigitalRedirection('Balance & Statements')}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5 self-start md:self-auto flex-shrink-0"
        >
          <span>Dispatch Mobile Deep-Links</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Queue Monitored
            </span>
            <div className="text-2xl font-bold text-slate-900 mt-1 font-mono">{totalCustomers}</div>
            <span className="text-xs text-slate-500">Across 5 primary categories</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 text-slate-600">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-blue-200 bg-blue-50/20 shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
              Digital Migration Eligible
            </span>
            <div className="text-2xl font-bold text-blue-700 mt-1 font-mono">{totalDigitalEligible}</div>
            <span className="text-xs text-blue-600 font-medium">62.3% of current floor footfall</span>
          </div>
          <div className="p-3 rounded-xl bg-blue-100 text-blue-700">
            <Smartphone className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Branch-Mandatory Requests
            </span>
            <div className="text-2xl font-bold text-slate-800 mt-1 font-mono">{totalBranchRequired}</div>
            <span className="text-xs text-slate-500">Requires in-person KYC or notary</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 text-slate-600">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Charts Section: Donut + Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Donut Chart: Channel Distribution */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Digital Eligibility Breakdown
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Proportion of queue eligible for digital banking
            </p>
          </div>

          <div className="h-64 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '12px',
                    border: 'none',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-3 text-xs">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-bold font-mono text-slate-900">
                  {item.value} ({Math.round((item.value / totalCustomers) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart: Service By Service Digital Eligibility */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Service Category Comparison
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Digital-ready queue volume versus mandatory counter service
            </p>
          </div>

          <div className="h-64 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockRedirectionData}
                margin={{ top: 15, right: 15, left: -15, bottom: 0 }}
              >
                <XAxis dataKey="serviceName" fontSize={11} stroke="#64748b" tickLine={false} />
                <YAxis fontSize={11} stroke="#64748b" tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '12px',
                    border: 'none',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="digitalEligible" name="Digital Eligible" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="branchRequired" name="Branch Mandatory" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
            <span>High conversion candidate: <strong>Balance Enquiry (90.4% eligible)</strong></span>
            <span className="font-mono text-blue-600 font-bold">1.5m mobile flow</span>
          </div>
        </div>
      </div>

      {/* Service-by-Service Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Detailed Customer Redirection Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Real-time classification of waiting visitors and target deflection action
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px]">
              <tr>
                <th className="px-5 py-3.5">Service Category</th>
                <th className="px-4 py-3.5">Current Waiting</th>
                <th className="px-4 py-3.5">Digital Eligible</th>
                <th className="px-4 py-3.5">Branch Mandatory</th>
                <th className="px-4 py-3.5">Branch Wait</th>
                <th className="px-4 py-3.5">Mobile App Time</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {mockRedirectionData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-slate-900">
                    {item.serviceName}
                  </td>
                  <td className="px-4 py-3.5 font-mono font-semibold">
                    {item.totalCustomers}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-blue-700 font-bold">
                    {item.digitalEligible} ({Math.round((item.digitalEligible / item.totalCustomers) * 100)}%)
                  </td>
                  <td className="px-4 py-3.5 font-mono text-slate-500">
                    {item.branchRequired}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-rose-600 font-semibold">
                    {item.avgWaitMins} min
                  </td>
                  <td className="px-4 py-3.5 font-mono text-emerald-600 font-bold">
                    {item.digitalTimeMins} min
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => startDigitalRedirection(item.serviceName)}
                      className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold transition-colors border border-blue-200 text-[11px]"
                    >
                      Divert ({item.digitalEligible})
                    </button>
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
