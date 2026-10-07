import React, { useState } from 'react';
import {
  MonitorSmartphone,
  Smartphone,
  Building2,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Sparkles,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import { useBranch } from '../context/BranchContext';

export const CustomerExperiencePage: React.FC = () => {
  const { selectedBranch, setSelectedBranchId, addToast } = useBranch();

  const [selectedService, setSelectedService] = useState<string>('Balance Enquiry');
  const [digitalModalOpen, setDigitalModalOpen] = useState<boolean>(false);
  const [inBranchTicketIssued, setInBranchTicketIssued] = useState<boolean>(false);

  const serviceOptions = [
    { name: 'Balance Enquiry', category: 'digital', wait: 14, digitalTime: '2 minutes' },
    { name: 'Account Statement', category: 'digital', wait: 16, digitalTime: '2 minutes' },
    { name: 'Cash Withdrawal', category: 'physical', wait: 8, digitalTime: 'ATM / Cash Kiosk' },
    { name: 'Deposit', category: 'physical', wait: 8, digitalTime: 'Cash Deposit Machine' },
    { name: 'Account Opening', category: 'mixed', wait: 24, digitalTime: '5 mins via Video-KYC' },
    { name: 'KYC Update', category: 'mixed', wait: 18, digitalTime: '3 mins via DigiLocker' },
    { name: 'Loan Enquiry', category: 'mixed', wait: 20, digitalTime: 'Instant In-App Prequal' },
    { name: 'Other', category: 'physical', wait: 12, digitalTime: 'Helpdesk' },
  ];

  const currentSelectedConfig =
    serviceOptions.find((s) => s.name === selectedService) || serviceOptions[0];

  const nearbyBranches = [
    {
      id: 'hyderabad-central',
      name: 'Hyderabad Central (Current)',
      wait: 24,
      load: 'HIGH',
      distance: '0.0 km',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    {
      id: 'financial-district',
      name: 'Financial District Branch',
      wait: 8,
      load: 'LOW',
      distance: '6.4 km',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'gachibowli',
      name: 'Gachibowli Branch',
      wait: 12,
      load: 'MEDIUM',
      distance: '4.8 km',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    },
  ];

  const handleDigitalAction = () => {
    setDigitalModalOpen(true);
    addToast('Digital Banking fast-track loaded on your device', 'success');
  };

  const handleContinueBranch = () => {
    setInBranchTicketIssued(true);
    addToast(`Queue token #${selectedService.slice(0, 2).toUpperCase()}-142 generated.`, 'info');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Kiosk Mode Bar */}
      <div className="bg-slate-900 text-white px-5 py-3 rounded-2xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <MonitorSmartphone className="w-4 h-4 text-blue-400" />
          <span className="font-semibold">Customer Self-Service Kiosk & Lobby Terminal</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 beacon" />
          <span>Lobby Station #03 • {selectedBranch.name}</span>
        </div>
      </div>

      {/* Main Self-Service Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-premium p-6 sm:p-10 space-y-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center mx-auto mb-3">
            <Building2 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome to BranchFlow
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Intelligent digital queue routing for <strong className="text-slate-800">{selectedBranch.name}</strong>
          </p>
        </div>

        {/* Step 1: Service Selection */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-800 text-center uppercase tracking-wider">
            What service do you need today?
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {serviceOptions.map((service) => {
              const isSelected = selectedService === service.name;
              return (
                <button
                  key={service.name}
                  onClick={() => {
                    setSelectedService(service.name);
                    setInBranchTicketIssued(false);
                    setDigitalModalOpen(false);
                  }}
                  className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 min-h-[90px] ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/80 text-blue-900 shadow-sm ring-2 ring-blue-600/20'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 text-slate-700'
                  }`}
                >
                  <span className="text-xs font-bold leading-snug">{service.name}</span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    ~{service.wait} min wait
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Live Wait & Branch Load Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Current Branch Load
              </span>
              <div className="text-2xl font-black text-rose-600 mt-0.5 tracking-tight">
                {selectedBranch.loadStatus.toUpperCase()}
              </div>
              <span className="text-xs text-slate-500">Heavy floor footfall right now</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg">
              {selectedBranch.branchLoad}%
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Estimated In-Branch Wait Time
              </span>
              <div className="text-2xl font-black text-slate-900 mt-0.5 tracking-tight">
                {currentSelectedConfig.wait} minutes
              </div>
              <span className="text-xs text-slate-500">Based on active counter throughput</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Step 3: Faster Option Available Banner */}
        <div className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-r from-emerald-50/90 via-white to-blue-50/60 p-6 shadow-subtle space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-600/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                  Faster Option Available
                </span>
                <span className="text-xs font-semibold text-slate-600">
                  Save ~{currentSelectedConfig.wait - 2} minutes today
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {selectedService} can be completed instantly using Mobile Banking.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Estimated completion time:{' '}
                <strong className="text-emerald-700 font-bold">{currentSelectedConfig.digitalTime}</strong>{' '}
                with zero queuing.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={handleDigitalAction}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Smartphone className="w-4 h-4" />
              <span>Use Digital Banking (2 Mins)</span>
            </button>

            <button
              onClick={handleContinueBranch}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Continue at Branch ({currentSelectedConfig.wait} Min Wait)</span>
            </button>
          </div>

          {inBranchTicketIssued && (
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>
                Ticket issued! Please take a seat in Zone B. A teller will call your ticket shortly.
              </span>
            </div>
          )}
        </div>

        {/* Step 4: Nearby Branches Comparison */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Nearby Branches Load Comparison</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Less-crowded alternative locations within 15 minutes of your location
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nearbyBranches.map((branch) => (
              <div
                key={branch.id}
                className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs hover:shadow-subtle transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400 font-medium">{branch.distance}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${branch.badgeClass}`}>
                      {branch.load} LOAD
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm">{branch.name}</h4>

                  <div className="my-3 flex items-baseline gap-1.5">
                    <span className="text-2xl font-extrabold text-slate-900 font-mono">
                      {branch.wait}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">min wait</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedBranchId(branch.id);
                    addToast(`Switched terminal context to ${branch.name}`, 'info');
                  }}
                  className="w-full mt-2 py-2 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Select Branch</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Digital Modal / QR Demonstration */}
      {digitalModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 border border-slate-200 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">Digital Fast-Track Pass</h3>
              </div>
              <button
                onClick={() => setDigitalModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
              <div className="w-36 h-36 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xs mx-auto flex items-center justify-center">
                <QrCode className="w-32 h-32 text-slate-800" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Scan to complete {selectedService} on your phone
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Pre-authenticated token generated. Valid for 15 minutes.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setDigitalModalOpen(false);
                addToast('Task completed digitally. Thank you for using BranchFlow!', 'success');
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-colors"
            >
              Simulate Instant Smartphone Completion
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
