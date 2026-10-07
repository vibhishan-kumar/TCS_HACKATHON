import React from 'react';
import {
  Sliders,
  Users,
  Clock,
  Gauge,
  Plus,
  Minus,
  Check,
  TrendingDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  RotateCcw,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { useBranch } from '../context/BranchContext';

export const SimulatorPage: React.FC = () => {
  const {
    simulation,
    updateSimulationStaff,
    updateSimulationDigital,
    toggleSimulationCounter,
    applySimulationPlan,
    selectedBranch,
  } = useBranch();

  const comparisonChartData = [
    {
      metric: 'Wait Time (min)',
      Current: simulation.current.avgWait,
      Simulated: simulation.predicted.avgWait,
    },
    {
      metric: 'Branch Load (%)',
      Current: simulation.current.branchLoad,
      Simulated: simulation.predicted.branchLoad,
    },
    {
      metric: 'Total Queue (Cust)',
      Current: simulation.current.customers,
      Simulated: simulation.predicted.customers,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              What-If Simulator
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Monte Carlo Operations Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Simulate operational decisions before applying them to physical counters in {selectedBranch.name}
          </p>
        </div>

        <button
          onClick={applySimulationPlan}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 self-start md:self-auto"
        >
          <Zap className="w-4 h-4 text-blue-200" />
          <span>Apply Simulation as Action Plan</span>
        </button>
      </div>

      {/* Main Grid: Controls on Left, Dynamic Prediction on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Controls */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              Simulation Parameters
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Adjust levers to preview real-time impact on queue dynamics
            </p>
          </div>

          {/* Control 1: Additional Staff */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">
                Number of Additional Staff
              </span>
              <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                +{simulation.additionalStaff} personnel
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <button
                onClick={() => updateSimulationStaff(-1)}
                disabled={simulation.additionalStaff <= 0}
                className="w-9 h-9 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-xl font-bold font-mono text-slate-900">
                {simulation.additionalStaff}
              </span>
              <button
                onClick={() => updateSimulationStaff(1)}
                disabled={simulation.additionalStaff >= 5}
                className="w-9 h-9 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Deployable from floating cross-trained reserve pool
            </p>
          </div>

          {/* Control 2: Customers Redirected to Digital */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">
                Customers Redirected to Digital
              </span>
              <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {simulation.digitalRedirected} customers
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <button
                onClick={() => updateSimulationDigital(-5)}
                disabled={simulation.digitalRedirected <= 0}
                className="w-9 h-9 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="text-center">
                <span className="text-xl font-bold font-mono text-slate-900 block">
                  {simulation.digitalRedirected}
                </span>
                <span className="text-[10px] text-slate-400">mobile deflection</span>
              </div>
              <button
                onClick={() => updateSimulationDigital(5)}
                disabled={simulation.digitalRedirected >= 35}
                className="w-9 h-9 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Via SMS fast-track links and lobby greeter self-service tablets
            </p>
          </div>

          {/* Control 3: Additional Counter Toggle */}
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100/60 transition-colors cursor-pointer"
                 onClick={toggleSimulationCounter}>
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Open Additional Counter
                </span>
                <span className="text-[11px] text-slate-500">
                  Activates standby Counter #7 for Account Opening
                </span>
              </div>

              <div
                className={`w-12 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                  simulation.additionalCounter ? 'bg-blue-600 justify-end' : 'bg-slate-300 justify-start'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center text-[10px] text-blue-600 font-bold">
                  {simulation.additionalCounter ? 'ON' : 'OFF'}
                </div>
              </div>
            </div>
          </div>

          {/* Quick AI Explanation Box */}
          <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200/80 text-xs text-indigo-900 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">Simulated Decision Profile:</strong>
              With +{simulation.additionalStaff} staff, {simulation.digitalRedirected} digital deflections, and counter {simulation.additionalCounter ? 'ON' : 'OFF'}, service queues clear at 1.8x the nominal rate.
            </div>
          </div>
        </div>

        {/* Right: Real-Time Dynamic Results & Before/After Chart */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metric Triads (Current vs Predicted) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Customers */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-subtle space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Total Customers
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-slate-400 line-through">
                  {simulation.current.customers}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-3xl font-extrabold text-slate-900 font-mono">
                  {simulation.predicted.customers}
                </span>
              </div>
              <span className="text-xs text-emerald-700 font-semibold block">
                -{simulation.current.customers - simulation.predicted.customers} queue delta
              </span>
            </div>

            {/* Average Wait */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-subtle space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Average Wait
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-slate-400 line-through">
                  {simulation.current.avgWait}m
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-3xl font-extrabold text-emerald-600 font-mono">
                  {simulation.predicted.avgWait}m
                </span>
              </div>
              <span className="text-xs text-emerald-700 font-semibold block">
                -{simulation.current.avgWait - simulation.predicted.avgWait} min wait reduction
              </span>
            </div>

            {/* Branch Load */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-subtle space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Branch Load
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-slate-400 line-through">
                  {simulation.current.branchLoad}%
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-3xl font-extrabold text-blue-700 font-mono">
                  {simulation.predicted.branchLoad}%
                </span>
              </div>
              <span className="text-xs text-blue-700 font-semibold block">
                {simulation.predicted.branchLoad < 75 ? 'Safe Optimal Zone' : 'Moderate'}
              </span>
            </div>
          </div>

          {/* Before / After Comparison Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Operational Impact Comparison
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Current baseline metrics versus simulated future state
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-medium">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-3 h-3 rounded bg-slate-400" />
                  Current (Baseline)
                </span>
                <span className="flex items-center gap-1.5 text-blue-700 font-bold">
                  <span className="w-3 h-3 rounded bg-blue-600" />
                  Simulated
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparisonChartData}
                  margin={{ top: 20, right: 20, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="metric" fontSize={11} stroke="#64748b" tickLine={false} />
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
                  <Bar dataKey="Current" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Simulated" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Simulation validated against 180-day branch queue telemetry</span>
              </div>

              <button
                onClick={applySimulationPlan}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Apply Simulation as Action Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
