
import { Station, Advertisement } from './types';

export const COLORS = {
  primary: '#E5A443', // Warm African Gold
  secondary: '#2C5F2D', // Deep Savannah Green
  accent: '#973931', // Clay Red
  background: '#FCF8F1', // Off-white/Cream
  dark: '#1A1A1A'
};

export const MOCK_STATIONS: Station[] = [
  {
    id: '1',
    name: 'Nairobi Beats FM',
    ownerId: 'u1',
    country: 'Kenya',
    streamUrl: 'https://stream.zeno.fm/s4r7h6v5m0huv',
    logo: 'https://picsum.photos/seed/nairobi/200/200',
    description: 'The heartbeat of the city. Playing the best of Afrobeats and Gengetone.',
    features: { tips: true, requests: true, shoutouts: true, subscriptions: true },
    metrics: { totalRevenue: 12450, subscribers: 450, monthlyRevenue: 1200 },
    onboardingProgress: 100,
    isOptimized: true
  },
  {
    id: '2',
    name: 'Lagos Life Radio',
    ownerId: 'u2',
    country: 'Nigeria',
    streamUrl: 'https://stream.zeno.fm/ LagosLife',
    logo: 'https://picsum.photos/seed/lagos/200/200',
    description: 'Global sounds from the heart of Lagos.',
    features: { tips: true, requests: false, shoutouts: true, subscriptions: true },
    metrics: { totalRevenue: 8900, subscribers: 310, monthlyRevenue: 950 },
    onboardingProgress: 80,
    isOptimized: true
  },
  {
    id: '3',
    name: 'Accra Highlife',
    ownerId: 'u3',
    country: 'Ghana',
    streamUrl: 'https://stream.zeno.fm/ AccraHigh',
    logo: 'https://picsum.photos/seed/accra/200/200',
    description: 'Preserving the gold of Ghana music.',
    features: { tips: true, requests: true, shoutouts: true, subscriptions: false },
    metrics: { totalRevenue: 5400, subscribers: 120, monthlyRevenue: 400 },
    onboardingProgress: 40,
    isOptimized: false
  }
];

export const MOCK_ADS: Advertisement[] = [
  {
    id: 'ad1',
    advertiserId: 'adv1',
    title: 'Safari Bank Promotion',
    content: 'Save more, grow more with Safari Bank. Open an account today in Nairobi.',
    targetCountries: ['Kenya'],
    budget: 1000,
    spent: 450,
    status: 'active',
    impressions: 12000
  }
];
