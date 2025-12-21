
import { Station, Advertisement } from './types';

export const COLORS = {
  primary: '#E5A443', // Premium Gold
  secondary: '#1B4332', // Rich Forest Green
  accent: '#7A2E28', // Deep Clay
  background: '#FDFCFB', // Clean Cream
  dark: '#0A0A0A', // Deepest Black
  surface: '#FFFFFF',
  text: '#121212'
};

export const MOCK_STATIONS: Station[] = [
  {
    id: '1',
    name: 'Nairobi Beats FM',
    ownerId: 'u1',
    country: 'Kenya',
    streamUrl: 'https://stream.zeno.fm/s4r7h6v5m0huv',
    logo: 'https://images.unsplash.com/photo-1594435012581-2200e0087799?q=80&w=400&h=400&fit=crop',
    description: 'The heartbeat of East Africa. From Gengetone to global Afropop, we define the sound of the 254.',
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
    streamUrl: 'https://stream.zeno.fm/s4r7h6v5m0huv',
    logo: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=400&h=400&fit=crop',
    description: 'The epicenter of global Afrobeats. Broadcasting live from the heart of Lagos to the world.',
    features: { tips: true, requests: false, shoutouts: true, subscriptions: true },
    metrics: { totalRevenue: 8900, subscribers: 310, monthlyRevenue: 950 },
    onboardingProgress: 80,
    isOptimized: true
  },
  {
    id: '8',
    name: 'Powerace Radio',
    ownerId: 'u8',
    country: 'Ghana',
    streamUrl: 'https://music-station.live/listen/poweraceradio/radio.mp3',
    logo: 'https://images.unsplash.com/photo-1514525253344-f81bcd0ce58e?q=80&w=400&h=400&fit=crop',
    description: 'Powerful sounds, Ace selections. Ghana\'s leading independent voice for youth culture.',
    features: { tips: true, requests: true, shoutouts: true, subscriptions: true },
    metrics: { totalRevenue: 3100, subscribers: 165, monthlyRevenue: 520 },
    onboardingProgress: 100,
    isOptimized: true
  },
  {
    id: '6',
    name: 'TSA Radio',
    ownerId: 'u6',
    country: 'Namibia',
    streamUrl: 'https://64575.airadiostream.com/namibianradio',
    logo: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&h=400&fit=crop',
    description: 'Premium Namibian hits. Bringing the soul of the South-West to the digital stage.',
    features: { tips: true, requests: true, shoutouts: true, subscriptions: true },
    metrics: { totalRevenue: 2100, subscribers: 145, monthlyRevenue: 480 },
    onboardingProgress: 100,
    isOptimized: true
  },
  {
    id: '7',
    name: 'Pamtengo Radio',
    ownerId: 'u7',
    country: 'Malawi',
    streamUrl: 'https://music-station.live/listen/pamtengo_radio/radio.mp3',
    logo: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=400&h=400&fit=crop',
    description: 'Authentic sounds of Malawi. Connecting the community through music, talk, and culture.',
    features: { tips: true, requests: true, shoutouts: true, subscriptions: true },
    metrics: { totalRevenue: 4500, subscribers: 210, monthlyRevenue: 850 },
    onboardingProgress: 100,
    isOptimized: true
  },
  {
    id: '5',
    name: 'NRG Radio',
    ownerId: 'u5',
    country: 'Uganda',
    streamUrl: 'https://music-station.live/listen/nam_radio_local/autodj.mp3',
    logo: 'https://images.unsplash.com/photo-1520110120385-c285d6b21c7b?q=80&w=400&h=400&fit=crop',
    description: 'The energy of the youth. High-octane hits and global charts from the heart of Kampala.',
    features: { tips: true, requests: true, shoutouts: true, subscriptions: true },
    metrics: { totalRevenue: 1500, subscribers: 90, monthlyRevenue: 300 },
    onboardingProgress: 100,
    isOptimized: true
  },
  {
    id: '4',
    name: 'High Grade Radio',
    ownerId: 'u4',
    country: 'Global',
    streamUrl: 'https://music-station.live/listen/high_grade_radio/radio.mp3',
    logo: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=400&h=400&fit=crop',
    description: 'Premium selection of Reggae, Dancehall, and African Riddims. High grade vibes only.',
    features: { tips: true, requests: true, shoutouts: true, subscriptions: true },
    metrics: { totalRevenue: 3200, subscribers: 180, monthlyRevenue: 650 },
    onboardingProgress: 100,
    isOptimized: true
  },
  {
    id: '3',
    name: 'Accra Highlife',
    ownerId: 'u3',
    country: 'Ghana',
    streamUrl: 'https://stream.zeno.fm/s4r7h6v5m0huv',
    logo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&h=400&fit=crop',
    description: 'Preserving the gold of Ghana music. From legendary Highlife to the latest Hiplife classics.',
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
    title: 'Safari Bank Premium',
    content: 'The future of mobile banking in East Africa. Earn more with Safari Savings.',
    targetCountries: ['Kenya', 'Tanzania'],
    budget: 5000,
    spent: 1200,
    status: 'active',
    impressions: 45000
  }
];
