import React, { createContext, useContext, useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Branch, ServiceCounter, StaffAllocation, AlertItem, Recommendation, SimulationState } from '../types';
import { mockBranches } from '../data/mockBranches';
import { initialServices, initialStaffAllocations } from '../data/mockServices';
import { initialAlerts } from '../data/mockAlerts';
import { initialRecommendations } from '../data/mockRecommendations';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  timestamp: string;
}

interface BranchContextType {
  selectedBranchId: string;
  selectedBranch: Branch;
  setSelectedBranchId: (id: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  services: ServiceCounter[];
  staffAllocations: StaffAllocation[];
  alerts: AlertItem[];
  recommendations: Recommendation[];
  simulation: SimulationState;
  toasts: Toast[];
  isAssistantOpen: boolean;
  toggleAssistant: (open?: boolean) => void;
  // Actions
  applyRecommendation: (id: string) => void;
  applyStaffReallocation: () => void;
  startDigitalRedirection: (categoryName?: string) => void;
  resolveAlert: (alertId: string) => void;
  updateSimulationStaff: (delta: number) => void;
  updateSimulationDigital: (delta: number) => void;
  toggleSimulationCounter: () => void;
  applySimulationPlan: () => void;
  resetDemoState: () => void;
  addToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const BranchContext = createContext<BranchContextType | undefined>(undefined);

export const BranchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedBranchId, setSelectedBranchIdState] = useState<string>('hyderabad-central');
  const [branches, setBranches] = useState<Record<string, Branch>>(mockBranches);
  const [selectedDate, setSelectedDate] = useState<string>('Today, Oct 07');
  const [services, setServices] = useState<ServiceCounter[]>(initialServices);
  const [staffAllocations, setStaffAllocations] = useState<StaffAllocation[]>(initialStaffAllocations);
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [recommendations, setRecommendations] = useState<Recommendation[]>(initialRecommendations);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Simulation controls state
  const [simStaff, setSimStaff] = useState<number>(1);
  const [simDigital, setSimDigital] = useState<number>(10);
  const [simCounter, setSimCounter] = useState<boolean>(true);

  const selectedBranch = useMemo(() => {
    return branches[selectedBranchId] || branches['hyderabad-central'];
  }, [branches, selectedBranchId]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const newToast: Toast = {
      id: Math.random().toString(36).substring(2, 9),
      message,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
    setToasts((prev) => [newToast, ...prev].slice(0, 4));
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#1e40af', '#059669', '#3b82f6', '#10b981'],
      });
    } catch {
      // ignore
    }
  };

  // Switch branch
  const setSelectedBranchId = (id: string) => {
    setSelectedBranchIdState(id);
    const branchName = mockBranches[id]?.name || 'Branch';
    addToast(`Switched operational view to ${branchName}`, 'info');
  };

  // Staff Reallocation Action
  const applyStaffReallocation = () => {
    // Move 1 staff from Teller (3 -> 2) to Account Opening (1 -> 2)
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === 'teller') {
          return { ...s, staffAssigned: 2, wait: 10, load: 70 };
        }
        if (s.id === 'account_opening') {
          return { ...s, staffAssigned: 2, wait: 13, load: 68, status: 'healthy', queue: 9 };
        }
        return s;
      })
    );

    setStaffAllocations((prev) =>
      prev.map((s) => {
        if (s.id === 'teller') return { ...s, currentStaff: 2, currentWait: 10, currentLoad: 70 };
        if (s.id === 'account_opening') return { ...s, currentStaff: 2, currentWait: 13, currentLoad: 68 };
        return s;
      })
    );

    // Update branch metrics: wait drops 18 -> 13 min, load drops 78 -> 72%
    setBranches((prev) => ({
      ...prev,
      [selectedBranchId]: {
        ...prev[selectedBranchId],
        avgWaitTime: 13,
        branchLoad: 72,
        loadStatus: 'Moderate',
        waitChange: '-32% after AI reallocation',
        lastUpdated: 'Just now (AI Optimized)',
      },
    }));

    // Mark rec-1 applied
    setRecommendations((prev) =>
      prev.map((r) => (r.id === 'rec-1' ? { ...r, applied: true } : r))
    );

    // Resolve critical alert
    setAlerts((prev) =>
      prev.map((a) => (a.id === 'alert-1' ? { ...a, resolved: true } : a))
    );

    triggerCelebration();
    addToast('Action Applied: 1 Staff reallocated from Teller to Account Opening. Wait reduced to 13m!', 'success');
  };

  // Digital Redirection Action
  const startDigitalRedirection = (categoryName?: string) => {
    const label = categoryName || '38 digital-eligible customers';
    setBranches((prev) => ({
      ...prev,
      [selectedBranchId]: {
        ...prev[selectedBranchId],
        currentCustomers: Math.max(28, prev[selectedBranchId].currentCustomers - 10),
        customersChange: '-10 diverted to Mobile Banking',
        branchLoad: Math.max(58, prev[selectedBranchId].branchLoad - 12),
        avgWaitTime: Math.max(10, prev[selectedBranchId].avgWaitTime - 4),
        lastUpdated: 'Just now (Digital Deflection Active)',
      },
    }));

    setServices((prev) =>
      prev.map((s) => {
        if (s.id === 'support' || s.id === 'teller') {
          return { ...s, queue: Math.max(2, s.queue - 4), wait: Math.max(5, s.wait - 2) };
        }
        return s;
      })
    );

    setRecommendations((prev) =>
      prev.map((r) => (r.id === 'rec-2' ? { ...r, applied: true } : r))
    );

    triggerCelebration();
    addToast(`Digital Redirection initiated for ${label}. 10 customers diverted to mobile banking!`, 'success');
  };

  // Schedule Counter
  const openAdditionalCounter = () => {
    setBranches((prev) => ({
      ...prev,
      [selectedBranchId]: {
        ...prev[selectedBranchId],
        activeCounters: Math.min(prev[selectedBranchId].totalCounters, prev[selectedBranchId].activeCounters + 1),
        branchLoad: Math.max(55, prev[selectedBranchId].branchLoad - 8),
        lastUpdated: 'Just now (Counter Scheduled)',
      },
    }));

    setServices((prev) =>
      prev.map((s) => (s.id === 'account_opening' ? { ...s, countersActive: 2, totalCounters: 2, wait: 14 } : s))
    );

    setRecommendations((prev) =>
      prev.map((r) => (r.id === 'rec-3' ? { ...r, applied: true } : r))
    );

    setAlerts((prev) =>
      prev.map((a) => (a.id === 'alert-2' ? { ...a, resolved: true } : a))
    );

    triggerCelebration();
    addToast('Additional Account Opening counter scheduled for 2:00 PM (+25% capacity)', 'success');
  };

  // Apply recommendation by ID
  const applyRecommendation = (id: string) => {
    if (id === 'rec-1') {
      applyStaffReallocation();
    } else if (id === 'rec-2') {
      startDigitalRedirection('Balance Enquiry & Statements');
    } else if (id === 'rec-3') {
      openAdditionalCounter();
    }
  };

  const resolveAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === alertId ? { ...a, resolved: true } : a)));
    addToast('Alert marked as resolved', 'info');
  };

  // Dynamic simulation calculations
  const simulation: SimulationState = useMemo(() => {
    const baseCust = 82;
    const baseWait = 24;
    const baseLoad = 92;

    const calcCustomers = Math.max(40, baseCust - simDigital);
    const staffImpact = simStaff * 5.5; // each staff cuts ~5.5 min wait
    const digitalImpact = simDigital * 0.45; // cuts wait
    const counterImpact = simCounter ? 3.5 : 0;

    const calcWait = Math.max(8, Math.round(baseWait - staffImpact - digitalImpact - counterImpact));
    const loadReduction = Math.round(simStaff * 8 + simDigital * 0.8 + (simCounter ? 8 : 0));
    const calcLoad = Math.max(50, baseLoad - loadReduction);

    return {
      additionalStaff: simStaff,
      digitalRedirected: simDigital,
      additionalCounter: simCounter,
      current: {
        customers: baseCust,
        avgWait: baseWait,
        branchLoad: baseLoad,
      },
      predicted: {
        customers: calcCustomers,
        avgWait: calcWait,
        branchLoad: calcLoad,
      },
    };
  }, [simStaff, simDigital, simCounter]);

  const updateSimulationStaff = (delta: number) => {
    setSimStaff((prev) => Math.max(0, Math.min(5, prev + delta)));
  };

  const updateSimulationDigital = (delta: number) => {
    setSimDigital((prev) => Math.max(0, Math.min(35, prev + delta)));
  };

  const toggleSimulationCounter = () => {
    setSimCounter((prev) => !prev);
  };

  const applySimulationPlan = () => {
    setBranches((prev) => ({
      ...prev,
      [selectedBranchId]: {
        ...prev[selectedBranchId],
        currentCustomers: simulation.predicted.customers,
        avgWaitTime: simulation.predicted.avgWait,
        branchLoad: simulation.predicted.branchLoad,
        loadStatus: simulation.predicted.branchLoad > 80 ? 'High' : 'Moderate',
        waitChange: `-${simulation.current.avgWait - simulation.predicted.avgWait}m from simulation`,
        lastUpdated: 'Just now (Simulation Applied)',
      },
    }));

    triggerCelebration();
    addToast(`What-If Operational Plan Applied! Average wait dropped to ${simulation.predicted.avgWait} min.`, 'success');
  };

  const resetDemoState = () => {
    setBranches(mockBranches);
    setServices(initialServices);
    setStaffAllocations(initialStaffAllocations);
    setAlerts(initialAlerts);
    setRecommendations(initialRecommendations);
    setSimStaff(1);
    setSimDigital(10);
    setSimCounter(true);
    addToast('Operational demo state reset to baseline defaults.', 'info');
  };

  const toggleAssistant = (open?: boolean) => {
    setIsAssistantOpen((prev) => (open !== undefined ? open : !prev));
  };

  return (
    <BranchContext.Provider
      value={{
        selectedBranchId,
        selectedBranch,
        setSelectedBranchId,
        selectedDate,
        setSelectedDate,
        services,
        staffAllocations,
        alerts,
        recommendations,
        simulation,
        toasts,
        isAssistantOpen,
        toggleAssistant,
        applyRecommendation,
        applyStaffReallocation,
        startDigitalRedirection,
        resolveAlert,
        updateSimulationStaff,
        updateSimulationDigital,
        toggleSimulationCounter,
        applySimulationPlan,
        resetDemoState,
        addToast,
        removeToast,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
};

export const useBranch = () => {
  const context = useContext(BranchContext);
  if (!context) {
    throw new Error('useBranch must be used within a BranchProvider');
  }
  return context;
};
