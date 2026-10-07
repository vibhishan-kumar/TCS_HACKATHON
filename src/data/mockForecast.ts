import { ForecastPoint } from '../types';

export const todayForecast: ForecastPoint[] = [
  { time: '9 AM', actual: 16, predicted: 18, capacityThreshold: 65 },
  { time: '10 AM', actual: 24, predicted: 26, capacityThreshold: 65 },
  { time: '11 AM', actual: 32, predicted: 30, capacityThreshold: 65 },
  { time: '12 PM', actual: 38, predicted: 35, capacityThreshold: 65 },
  { time: '1 PM', actual: 45, predicted: 48, capacityThreshold: 65 },
  { time: '2 PM', actual: undefined, predicted: 62, capacityThreshold: 65, isPeak: true },
  { time: '2:30 PM', actual: undefined, predicted: 78, capacityThreshold: 65, isPeak: true },
  { time: '3 PM', actual: undefined, predicted: 87, capacityThreshold: 65, isPeak: true },
  { time: '3:30 PM', actual: undefined, predicted: 82, capacityThreshold: 65, isPeak: true },
  { time: '4 PM', actual: undefined, predicted: 74, capacityThreshold: 65 },
  { time: '5 PM', actual: undefined, predicted: 51, capacityThreshold: 65 },
  { time: '6 PM', actual: undefined, predicted: 28, capacityThreshold: 65 },
];

export const tomorrowForecast: ForecastPoint[] = [
  { time: '9 AM', predicted: 20, capacityThreshold: 65 },
  { time: '10 AM', predicted: 30, capacityThreshold: 65 },
  { time: '11 AM', predicted: 42, capacityThreshold: 65 },
  { time: '12 PM', predicted: 46, capacityThreshold: 65 },
  { time: '1 PM', predicted: 52, capacityThreshold: 65 },
  { time: '2 PM', predicted: 68, capacityThreshold: 65, isPeak: true },
  { time: '3 PM', predicted: 79, capacityThreshold: 65, isPeak: true },
  { time: '4 PM', predicted: 65, capacityThreshold: 65 },
  { time: '5 PM', predicted: 48, capacityThreshold: 65 },
  { time: '6 PM', predicted: 22, capacityThreshold: 65 },
];

export const next7DaysForecast: ForecastPoint[] = [
  { time: 'Mon (Today)', actual: 360, predicted: 385, capacityThreshold: 320, isPeak: true },
  { time: 'Tue', predicted: 310, capacityThreshold: 320 },
  { time: 'Wed', predicted: 295, capacityThreshold: 320 },
  { time: 'Thu', predicted: 330, capacityThreshold: 320 },
  { time: 'Fri', predicted: 390, capacityThreshold: 320, isPeak: true },
  { time: 'Sat (Half)', predicted: 420, capacityThreshold: 320, isPeak: true },
  { time: 'Sun', predicted: 0, capacityThreshold: 320 },
];
