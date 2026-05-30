export interface Ad {
  id: string;
  title: string;
  description: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  websiteUrl?: string;
  imageUrl: string;
  targetUrl: string;
  position: 'header' | 'sidebar' | 'footer' | 'in-content';
  size: 'small' | 'medium' | 'large' | 'banner';
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  startDate: string;
  endDate: string;
  impressions: number;
  clicks: number;
  createdAt: string;
  updatedAt: string;
  adType?: 'client' | 'google_adsense';
}

export interface AdOrder {
  id: string;
  adId?: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  companyName?: string;
  websiteUrl?: string;
  adTitle: string;
  adDescription: string;
  adImageUrl?: string;
  adTargetUrl: string;
  adPosition: 'header' | 'sidebar' | 'footer' | 'in-content';
  adSize: 'small' | 'medium' | 'large' | 'banner';
  duration: number;
  totalPrice: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsEvent {
  id: string;
  sessionId: string;
  type: 'pageview' | 'click' | 'scroll' | 'ad_view' | 'ad_click' | 'form_submit' | 'social_share' | 'external_link';
  page: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  userAgent: string;
  screenSize?: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser?: string;
  country?: string;
  city?: string;
  metadata?: Record<string, string>;
  timestamp: string;
}

export interface SiteSettings {
  maintenanceMode: boolean;
  maintenanceMessage?: string;
  googleAdsenseId?: string;
}

export interface AdPricing {
  position: 'header' | 'sidebar' | 'footer' | 'in-content';
  size: 'small' | 'medium' | 'large' | 'banner';
  pricePerDay: number;
  description: string;
}

export const AD_PRICING: AdPricing[] = [
  { position: 'header', size: 'banner', pricePerDay: 25, description: 'Top banner - Maximum visibility' },
  { position: 'sidebar', size: 'medium', pricePerDay: 15, description: 'Side bar - Steady exposure' },
  { position: 'footer', size: 'large', pricePerDay: 20, description: 'Footer - Professional placement' },
  { position: 'in-content', size: 'banner', pricePerDay: 30, description: 'In-content - High engagement' },
  { position: 'in-content', size: 'small', pricePerDay: 18, description: 'In-content small - Subtle integration' },
];

export const AD_SIZES = {
  small: { width: 300, height: 250 },
  medium: { width: 336, height: 280 },
  large: { width: 580, height: 400 },
  banner: { width: 728, height: 90 },
};