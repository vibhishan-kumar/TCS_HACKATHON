import { Recommendation } from '../types';

export const initialRecommendations: Recommendation[] = [
  {
    id: 'rec-1',
    priority: 'HIGH',
    title: 'Move 1 staff member from Teller Services to Account Opening.',
    reason: 'Account Opening is predicted to remain above 90% capacity for the next 60 minutes.',
    expectedImpact: 'Estimated wait reduction: 24 min → 13 min (45% reduction)',
    actionLabel: 'Apply Recommendation',
    actionType: 'staff_reallocate',
    applied: false,
  },
  {
    id: 'rec-2',
    priority: 'MEDIUM',
    title: 'Redirect simple balance enquiries to Mobile Banking.',
    reason: '38 out of 42 customers in queue for balance inquiry hold active smartphone banking credentials.',
    expectedImpact: 'Potentially reduce branch traffic by 8–12 customers.',
    actionLabel: 'Start Digital Redirection',
    actionType: 'digital_redirect',
    applied: false,
  },
  {
    id: 'rec-3',
    priority: 'MEDIUM',
    title: 'Open an additional Account Opening counter at 2:00 PM.',
    reason: 'Traffic projection models identify a 32% influx spike beginning at 2:00 PM.',
    expectedImpact: 'Estimated capacity increase: 25% (Peak wait reduced by 9 min)',
    actionLabel: 'Schedule Counter',
    actionType: 'open_counter',
    applied: false,
  },
];
