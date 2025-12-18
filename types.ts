
export type UserRole = 'station' | 'advertiser' | 'admin' | 'supporter';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Station {
  id: string;
  name: string;
  ownerId: string;
  country: string;
  streamUrl: string;
  logo: string;
  description: string;
  features: {
    tips: boolean;
    requests: boolean;
    shoutouts: boolean;
    subscriptions: boolean;
  };
  metrics: {
    totalRevenue: number;
    subscribers: number;
    monthlyRevenue: number;
  };
  onboardingProgress: number; // 0 to 100
  isOptimized: boolean; // 30-day fast start flag
}

export type PaymentType = 'tip' | 'request' | 'shoutout' | 'subscription' | 'ad';

export interface Payment {
  id: string;
  stationId: string;
  type: PaymentType;
  amount: number;
  currency: string;
  senderName: string;
  message?: string;
  songName?: string;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
  originCountry: string;
}

export interface Advertisement {
  id: string;
  advertiserId: string;
  title: string;
  content: string; // TTS text or Audio URL
  targetCountries: string[];
  budget: number;
  spent: number;
  status: 'active' | 'paused' | 'completed';
  impressions: number;
}
