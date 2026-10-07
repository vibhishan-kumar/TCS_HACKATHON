import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Building2,
  CheckCircle2,
  Cpu,
  TrendingDown,
  Clock,
  ChevronRight,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('director@branchflow.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    navigate('/dashboard');
  };

  const handleDemoLogin = () => {
    setEmail('director.hyderabad@finbank.com');
    setPassword('demo-session-token');
    setTimeout(() => {
      navigate('/dashboard');
    }, 250);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <header className="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-bold">
            <Sparkles className="w-5 h-5 text-blue-100" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              BranchFlow <span className="text-blue-400 text-xs px-1.5 py-0.5 bg-blue-950 rounded border border-blue-800 font-mono">AI</span>
            </h1>
            <p className="text-[11px] text-slate-400">Intelligent Branch Operations & Customer Experience</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-full border border-slate-700">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>FIPS 140-2 & ISO 27001 Compliant Gateway</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Left Column: Hero & Operations Pitch */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>Next-Gen Banking Branch Intelligence</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Optimize Branch Loads, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                Eliminate Service Queues.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              BranchFlow AI powers branch directors and retail operations managers with real-time predictive footfall forecasts, bottleneck detection, dynamic staff reallocation, and digital redirection.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/70 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <TrendingDown className="w-4 h-4" />
                  <span>-45% Wait Times</span>
                </div>
                <p className="text-xs text-slate-400">Automated staff rebalancing during peak demand windows.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/70 space-y-1">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold">
                  <Clock className="w-4 h-4" />
                  <span>Real-Time What-If</span>
                </div>
                <p className="text-xs text-slate-400">Simulate counter additions and digital diversion live.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/70 space-y-1">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Smart Redirection</span>
                </div>
                <p className="text-xs text-slate-400">Divert basic enquiry queues directly to mobile banking.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Banking Login Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white text-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-200">
              <div className="mb-6">
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 mb-3">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Branch Operations Intelligence
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Authenticate using enterprise banking directory credentials.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Corporate Email / Badge ID
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="director@finbank.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Security Token / Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Remember terminal token</span>
                  </label>
                  <a href="#demo" onClick={(e) => { e.preventDefault(); handleDemoLogin(); }} className="text-blue-600 hover:underline font-medium">
                    Reset Token
                  </a>
                </div>

                {/* Primary Sign In Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all hover:shadow-lg"
                >
                  <span>Sign In to Command Center</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Instant Demo Login Button */}
                <div className="relative my-3">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-slate-400 text-[10px] font-semibold tracking-wider">
                      Evaluation Access
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full flex items-center justify-between py-2.5 px-4 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>1-Click Demo Login (Hyderabad Central)</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>

              {/* Security Compliance Message */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Protected by 256-bit TLS encryption & zero-trust identity verification.</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-slate-800/80 text-xs text-slate-500 text-center">
        BranchFlow AI Enterprise Banking Operations • TCS Hackathon Edition • Version 2.4.0-prod
      </footer>
    </div>
  );
};
