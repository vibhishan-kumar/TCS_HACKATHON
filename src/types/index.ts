export type BranchId = 
  | 'hyderabad-central' 
  | 'financial-district' 
  | 'gachibowli' 
  | 'madhapur' 
  | 'secunderabad';

export interface Branch {
  id: BranchId;
  name: string;
  code: string;
  region: string;
  address: string;
  currentCustomers: number;
  customersChange: string; // e.g. "+18% vs usual"
  avgWaitTime: number; // in mins
  waitChange: string; // e.g. "-12% vs yesterday"
  branchLoad: number; // percentage e.g. 78
  loadStatus: 'Normal' | 'Moderate' | 'High' | 'Critical';
  activeCounters: number;
  totalCounters: number;
  availableStaff: number;
  totalStaff: number;
  csat: number; // e.g. 4.3
  csatChange: string; // e.g. "+0.2"
  lastUpdated: string;
}

export interface ServiceCounter {
  id: string;
  name: string;
  description: string;
  queue: number;
  wait: number; // mins
  load: number; // %
  status: 'healthy' | 'warning' | 'critical';
  staffAssigned: number;
  countersActive: number;
  totalCounters: number;
  digitalEligible: number;
}

export interface StaffAllocation {
  id: string;
  serviceName: string;
  currentStaff: number;
  recommendedStaff: number;
  currentWait: number;
  projectedWait: number;
  currentLoad: number;
  projectedLoad: number;
}

export interface ForecastPoint {
  time: string;
  actual?: number;
  predicted: number;
  capacityThreshold: number;
  isPeak?: boolean;
}

export interface RedirectionCategory {
  id: string;
  serviceName: string;
  totalCustomers: number;
  digitalEligible: number;
  branchRequired: number;
  avgWaitMins: number;
  digitalTimeMins: number;
  appDeepLink: string;
}

export interface AlertItem {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  service: string;
  resolved: boolean;
  impact: string;
  actionLabel?: string;
  actionType?: 'staff_reallocate' | 'digital_redirect' | 'open_counter' | 'dismiss';
}

export interface Recommendation {
  id: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  reason: string;
  expectedImpact: string;
  actionLabel: string;
  actionType: 'staff_reallocate' | 'digital_redirect' | 'open_counter';
  applied: boolean;
}

export interface SimulationState {
  additionalStaff: number;
  digitalRedirected: number;
  additionalCounter: boolean;
  // dynamically calculated
  current: {
    customers: number;
    avgWait: number;
    branchLoad: number;
  };
  predicted: {
    customers: number;
    avgWait: number;
    branchLoad: number;
  };
}

export interface HistoricalMetric {
  day: string;
  traffic: number;
  avgWait: number;
  load: number;
  csat: number;
  digitalRedirectionRate: number;
}
