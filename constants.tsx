
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
    id: '8',
    name: 'Powerace Radio',
    ownerId: 'u8',
    country: 'Ghana / Global',
    streamUrl: 'https://music-station.live/listen/poweraceradio/radio.mp3',
    logo: 'https://picsum.photos/seed/powerace/200/200',
    description: 'Powerful sounds and Ace selections. The best in contemporary African hits and community talk.',
    features: { tips: true, requests: true, shoutouts: true, subscriptions: true },
    metrics: { totalRevenue: 3100, subscribers: 165, monthlyRevenue: 520 },
    onboardingProgress: 100,
    isOptimized: true
  },
  {
    id: '7',
    name: 'Pamtengo Radio',
    ownerId: 'u7',
    country: 'Malawi',
    streamUrl: 'https://music-station.live/listen/pamtengo_radio/radio.mp3',
    logo: 'https://picsum.photos/seed/pamtengo/200/200',
    description: 'Authentic sounds of Malawi. Connecting the community through music and talk.',
    features: { tips: true, requests: true, shoutouts: true, subscriptions: true },
    metrics: { totalRevenue: 4500, subscribers: 210, monthlyRevenue: 850 },
    onboardingProgress: 100,
    isOptimized: true
  },
  {
    id: '6',
    name: 'TSA Radio',
    ownerId: 'u6',
    country: 'Namibia',
    streamUrl: 'https://64575.airadiostream.com/namibianradio',
    logo: 'https://picsum.photos/seed/tsa/200/200',
    description: 'Namibian premium sounds. Bringing the best of the South-West to the world.',
    features: { tips: true, requests: true, shoutouts: true, subscriptions: true },
    metrics: { totalRevenue: 2100, subscribers: 145, monthlyRevenue: 480 },
    onboardingProgress: 100,
    isOptimized: true
  },
  {
    id: '5',
    name: 'NRG',
    ownerId: 'u5',
    country: 'Uganda',
    streamUrl: 'https://music-station.live/listen/nam_radio_local/autodj.mp3',
    logo: 'https://picsum.photos/seed/nrg/200/200',
    description: 'The energy of the youth. High-octane hits and global charts.',
    features: { tips: true, requests: true, shoutouts: true, subscriptions: true },
    metrics: { totalRevenue: 1500, subscribers: 90, monthlyRevenue: 300 },
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
    id: '4',
    name: 'High Grade Radio',
    ownerId: 'u4',
    country: 'Global / Diaspora',
    streamUrl: 'https://music-station.live/listen/high_grade_radio/radio.mp3',
    logo: 'https://picsum.photos/seed/highgrade/200/200',
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
