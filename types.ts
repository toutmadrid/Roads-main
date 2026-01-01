
export interface Package {
  id: string;
  trackingNumber: string;
  origin: string;
  weight: number; // kg
  status: 'pending' | 'received' | 'consolidated' | 'shipped' | 'delivered';
  description: string;
  dateReceived?: string;
}

export interface ShippingZone {
  id: string;
  name: string;
  baseRate: number;
  perKgRate: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  updated_at?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
  };
  session: {
    access_token: string;
    refresh_token: string;
  } | null;
}

export enum AppView {
  HOME = 'HOME',
  DASHBOARD = 'DASHBOARD',
  PRICING = 'PRICING',
  HOW_IT_WORKS = 'HOW_IT_WORKS',
  BITCOIN = 'BITCOIN',
  VAT_REFUND = 'VAT_REFUND',
  SMART_CONSOLIDATION = 'SMART_CONSOLIDATION',
  ADDRESSES = 'ADDRESSES',
  AUTH = 'AUTH',
  PROHIBITED_ITEMS = 'PROHIBITED_ITEMS',
  FAQ = 'FAQ',
  TERMS = 'TERMS',
  PRIVACY = 'PRIVACY',
  LEGAL_NOTICES = 'LEGAL_NOTICES'
}

export type LanguageCode = 'fr' | 'en' | 'it' | 'es' | 'pt' | 'de' | 'zh' | 'ar' | 'hi';

export interface Language {
  code: LanguageCode;
  name: string;
  flag: string;
}
