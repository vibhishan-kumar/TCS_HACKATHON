export const weeklyTrafficTrends = [
  { day: 'Mon', traffic: 385, avgWait: 18, branchLoad: 78, csat: 4.3, digitalRedirectionRate: 14 },
  { day: 'Tue', traffic: 310, avgWait: 13, branchLoad: 64, csat: 4.5, digitalRedirectionRate: 16 },
  { day: 'Wed', traffic: 295, avgWait: 11, branchLoad: 60, csat: 4.6, digitalRedirectionRate: 18 },
  { day: 'Thu', traffic: 330, avgWait: 14, branchLoad: 68, csat: 4.4, digitalRedirectionRate: 15 },
  { day: 'Fri', traffic: 390, avgWait: 19, branchLoad: 80, csat: 4.2, digitalRedirectionRate: 13 },
  { day: 'Sat', traffic: 470, avgWait: 26, branchLoad: 92, csat: 3.9, digitalRedirectionRate: 21 },
];

export const serviceDemandBreakdown = [
  { name: 'Teller Services', volume: 165, avgWait: 8, load: 62 },
  { name: 'Account Opening', volume: 92, avgWait: 24, load: 94 },
  { name: 'KYC Updates', volume: 78, avgWait: 15, load: 72 },
  { name: 'Loan Services', volume: 54, avgWait: 18, load: 78 },
  { name: 'Customer Support', volume: 46, avgWait: 7, load: 45 },
];

export const hourlyWaitTimeCurve = [
  { time: '9 AM', wait: 9, capacity: 20 },
  { time: '10 AM', wait: 12, capacity: 20 },
  { time: '11 AM', wait: 14, capacity: 20 },
  { time: '12 PM', wait: 16, capacity: 20 },
  { time: '1 PM', wait: 18, capacity: 20 },
  { time: '2 PM', wait: 24, capacity: 20 },
  { time: '3 PM', wait: 28, capacity: 20 },
  { time: '4 PM', wait: 21, capacity: 20 },
  { time: '5 PM', wait: 13, capacity: 20 },
  { time: '6 PM', wait: 7, capacity: 20 },
];

export const csatDistribution = [
  { rating: '5 Stars (Delighted)', percentage: 48, count: 185 },
  { rating: '4 Stars (Satisfied)', percentage: 38, count: 146 },
  { rating: '3 Stars (Neutral)', percentage: 9, count: 35 },
  { rating: '2 Stars (Displeased)', percentage: 3, count: 12 },
  { rating: '1 Star (Critical)', percentage: 2, count: 7 },
];

export const executiveAiInsights = [
  {
    title: 'Peak Weekend Volume Anomaly',
    description: 'Saturday traffic is consistently 22% higher than the weekly average, driven primarily by retail account openings and passbook updations.',
    impact: 'High Impact',
    badge: 'Operational Pattern'
  },
  {
    title: 'Account Opening Bottleneck Cluster',
    description: 'Account Opening has the highest average waiting time (24 min) across all 5 branches, primarily due to manual document verifications.',
    impact: 'Critical Friction',
    badge: 'Process Bottleneck'
  },
  {
    title: 'Digital Redirection Efficacy',
    description: 'Digital redirection campaigns reduced in-branch physical traffic by approximately 14%, freeing an estimated 3.5 teller hours per day.',
    impact: 'Positive ROI',
    badge: 'Digital Adoption'
  }
];
