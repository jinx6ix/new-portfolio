import prisma from './prisma';
import { Ad, AdOrder, AnalyticsEvent, SiteSettings, AdPricing } from './types';

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

export async function getSettings(): Promise<SiteSettings> {
  try {
    let settings = await prisma.siteSettings.findFirst();
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          maintenanceMode: false,
          maintenanceMessage: 'We are currently under maintenance. Please check back soon.',
        },
      });
    }
    return {
      maintenanceMode: settings.maintenanceMode,
      maintenanceMessage: settings.maintenanceMessage || undefined,
      googleAdsenseId: settings.googleAdsenseId || undefined,
    };
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {
      maintenanceMode: false,
      maintenanceMessage: undefined,
      googleAdsenseId: undefined,
    };
  }
}

export async function updateSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
  try {
    let settings = await prisma.siteSettings.findFirst();
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          maintenanceMode: updates.maintenanceMode ?? false,
          maintenanceMessage: updates.maintenanceMessage || 'We are currently under maintenance. Please check back soon.',
          googleAdsenseId: updates.googleAdsenseId,
        },
      });
    } else {
      settings = await prisma.siteSettings.update({
        where: { id: settings.id },
        data: {
          maintenanceMode: updates.maintenanceMode ?? settings.maintenanceMode,
          maintenanceMessage: updates.maintenanceMessage ?? settings.maintenanceMessage,
          googleAdsenseId: updates.googleAdsenseId ?? settings.googleAdsenseId,
        },
      });
    }
    return {
      maintenanceMode: settings.maintenanceMode,
      maintenanceMessage: settings.maintenanceMessage || undefined,
      googleAdsenseId: settings.googleAdsenseId || undefined,
    };
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
}

export async function getAllAds(status?: string): Promise<Ad[]> {
  try {
    const where = status ? { status } : {};
    const ads = await prisma.ad.findMany({ where, orderBy: { createdAt: 'desc' } });
    return ads.map(ad => ({
      id: ad.id,
      title: ad.title,
      description: ad.description,
      clientName: ad.clientName,
      clientEmail: ad.clientEmail,
      clientPhone: ad.clientPhone || undefined,
      websiteUrl: ad.websiteUrl || undefined,
      imageUrl: ad.imageUrl,
      targetUrl: ad.targetUrl,
      position: ad.position as Ad['position'],
      size: ad.size as Ad['size'],
      status: ad.status as Ad['status'],
      startDate: ad.startDate.toISOString(),
      endDate: ad.endDate.toISOString(),
      impressions: ad.impressions,
      clicks: ad.clicks,
      createdAt: ad.createdAt.toISOString(),
      updatedAt: ad.updatedAt.toISOString(),
      adType: (ad as any).adType as 'client' | 'google_adsense' || 'client',
    }));
  } catch (error) {
    console.error('Error fetching ads:', error);
    return [];
  }
}

export async function getActiveAds(position?: string): Promise<Ad[]> {
  try {
    const now = new Date();
    const where: Record<string, unknown> = {
      status: 'approved',
      startDate: { lte: now },
      endDate: { gte: now },
    };
    if (position) {
      where.position = position;
    }
    const ads = await prisma.ad.findMany({ where, orderBy: { createdAt: 'desc' } });
    return ads.map(ad => ({
      id: ad.id,
      title: ad.title,
      description: ad.description,
      clientName: ad.clientName,
      clientEmail: ad.clientEmail,
      clientPhone: ad.clientPhone || undefined,
      websiteUrl: ad.websiteUrl || undefined,
      imageUrl: ad.imageUrl,
      targetUrl: ad.targetUrl,
      position: ad.position as Ad['position'],
      size: ad.size as Ad['size'],
      status: ad.status as Ad['status'],
      startDate: ad.startDate.toISOString(),
      endDate: ad.endDate.toISOString(),
      impressions: ad.impressions,
      clicks: ad.clicks,
      createdAt: ad.createdAt.toISOString(),
      updatedAt: ad.updatedAt.toISOString(),
      adType: (ad as any).adType as 'client' | 'google_adsense' || 'client',
    }));
  } catch (error) {
    console.error('Error fetching active ads:', error);
    return [];
  }
}

export async function getAdById(id: string): Promise<Ad | null> {
  try {
    const ad = await prisma.ad.findUnique({ where: { id } });
    if (!ad) return null;
    return {
      id: ad.id,
      title: ad.title,
      description: ad.description,
      clientName: ad.clientName,
      clientEmail: ad.clientEmail,
      clientPhone: ad.clientPhone || undefined,
      websiteUrl: ad.websiteUrl || undefined,
      imageUrl: ad.imageUrl,
      targetUrl: ad.targetUrl,
      position: ad.position as Ad['position'],
      size: ad.size as Ad['size'],
      status: ad.status as Ad['status'],
      startDate: ad.startDate.toISOString(),
      endDate: ad.endDate.toISOString(),
      impressions: ad.impressions,
      clicks: ad.clicks,
      createdAt: ad.createdAt.toISOString(),
      updatedAt: ad.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error('Error fetching ad:', error);
    return null;
  }
}

export async function createAd(ad: Omit<Ad, 'id' | 'createdAt' | 'updatedAt' | 'impressions' | 'clicks'>): Promise<Ad> {
  const newAd = await prisma.ad.create({
    data: {
      title: ad.title,
      description: ad.description,
      clientName: ad.clientName,
      clientEmail: ad.clientEmail,
      clientPhone: ad.clientPhone,
      websiteUrl: ad.websiteUrl,
      imageUrl: ad.imageUrl,
      targetUrl: ad.targetUrl,
      position: ad.position,
      size: ad.size,
      status: ad.status,
      startDate: new Date(ad.startDate),
      endDate: new Date(ad.endDate),
    },
  });
  return {
    id: newAd.id,
    title: newAd.title,
    description: newAd.description,
    clientName: newAd.clientName,
    clientEmail: newAd.clientEmail,
    clientPhone: newAd.clientPhone || undefined,
    websiteUrl: newAd.websiteUrl || undefined,
    imageUrl: newAd.imageUrl,
    targetUrl: newAd.targetUrl,
    position: newAd.position as Ad['position'],
    size: newAd.size as Ad['size'],
    status: newAd.status as Ad['status'],
    startDate: newAd.startDate.toISOString(),
    endDate: newAd.endDate.toISOString(),
    impressions: newAd.impressions,
    clicks: newAd.clicks,
    createdAt: newAd.createdAt.toISOString(),
    updatedAt: newAd.updatedAt.toISOString(),
  };
}

export async function updateAd(id: string, updates: Partial<Ad>): Promise<Ad | null> {
  try {
    const data: Record<string, unknown> = {};
    if (updates.title !== undefined) data.title = updates.title;
    if (updates.description !== undefined) data.description = updates.description;
    if (updates.clientName !== undefined) data.clientName = updates.clientName;
    if (updates.clientEmail !== undefined) data.clientEmail = updates.clientEmail;
    if (updates.clientPhone !== undefined) data.clientPhone = updates.clientPhone;
    if (updates.websiteUrl !== undefined) data.websiteUrl = updates.websiteUrl;
    if (updates.imageUrl !== undefined) data.imageUrl = updates.imageUrl;
    if (updates.targetUrl !== undefined) data.targetUrl = updates.targetUrl;
    if (updates.position !== undefined) data.position = updates.position;
    if (updates.size !== undefined) data.size = updates.size;
    if (updates.status !== undefined) data.status = updates.status;
    if (updates.startDate !== undefined) data.startDate = new Date(updates.startDate);
    if (updates.endDate !== undefined) data.endDate = new Date(updates.endDate);
    if (updates.impressions !== undefined) data.impressions = updates.impressions;
    if (updates.clicks !== undefined) data.clicks = updates.clicks;

    const ad = await prisma.ad.update({ where: { id }, data });
    if (!ad) return null;
    return {
      id: ad.id,
      title: ad.title,
      description: ad.description,
      clientName: ad.clientName,
      clientEmail: ad.clientEmail,
      clientPhone: ad.clientPhone || undefined,
      websiteUrl: ad.websiteUrl || undefined,
      imageUrl: ad.imageUrl,
      targetUrl: ad.targetUrl,
      position: ad.position as Ad['position'],
      size: ad.size as Ad['size'],
      status: ad.status as Ad['status'],
      startDate: ad.startDate.toISOString(),
      endDate: ad.endDate.toISOString(),
      impressions: ad.impressions,
      clicks: ad.clicks,
      createdAt: ad.createdAt.toISOString(),
      updatedAt: ad.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error('Error updating ad:', error);
    return null;
  }
}

export async function deleteAd(id: string): Promise<boolean> {
  try {
    await prisma.ad.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

export async function incrementAdImpression(id: string): Promise<void> {
  try {
    await prisma.ad.update({ where: { id }, data: { impressions: { increment: 1 } } });
  } catch (error) {
    console.error('Error incrementing impression:', error);
  }
}

export async function incrementAdClick(id: string): Promise<void> {
  try {
    await prisma.ad.update({ where: { id }, data: { clicks: { increment: 1 } } });
  } catch (error) {
    console.error('Error incrementing click:', error);
  }
}

export async function getAllOrders(status?: string): Promise<AdOrder[]> {
  try {
    const where = status ? { status } : {};
    const orders = await prisma.adOrder.findMany({ where, orderBy: { createdAt: 'desc' } });
    return orders.map(order => ({
      id: order.id,
      adId: order.adId || undefined,
      clientName: order.clientName,
      clientEmail: order.clientEmail,
      clientPhone: order.clientPhone || undefined,
      companyName: order.companyName || undefined,
      websiteUrl: order.websiteUrl || undefined,
      adTitle: order.adTitle,
      adDescription: order.adDescription,
      adImageUrl: order.adImageUrl || undefined,
      adTargetUrl: order.adTargetUrl,
      adPosition: order.adPosition as AdOrder['adPosition'],
      adSize: order.adSize as AdOrder['adSize'],
      duration: order.duration,
      totalPrice: order.totalPrice,
      status: order.status as AdOrder['status'],
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

export async function getOrderById(id: string): Promise<AdOrder | null> {
  try {
    const order = await prisma.adOrder.findUnique({ where: { id } });
    if (!order) return null;
    return {
      id: order.id,
      adId: order.adId || undefined,
      clientName: order.clientName,
      clientEmail: order.clientEmail,
      clientPhone: order.clientPhone || undefined,
      companyName: order.companyName || undefined,
      websiteUrl: order.websiteUrl || undefined,
      adTitle: order.adTitle,
      adDescription: order.adDescription,
      adImageUrl: order.adImageUrl || undefined,
      adTargetUrl: order.adTargetUrl,
      adPosition: order.adPosition as AdOrder['adPosition'],
      adSize: order.adSize as AdOrder['adSize'],
      duration: order.duration,
      totalPrice: order.totalPrice,
      status: order.status as AdOrder['status'],
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
}

export async function createOrder(order: Omit<AdOrder, 'id' | 'createdAt' | 'updatedAt'>): Promise<AdOrder> {
  const newOrder = await prisma.adOrder.create({
    data: {
      adId: order.adId,
      clientName: order.clientName,
      clientEmail: order.clientEmail,
      clientPhone: order.clientPhone,
      companyName: order.companyName,
      websiteUrl: order.websiteUrl,
      adTitle: order.adTitle,
      adDescription: order.adDescription,
      adImageUrl: order.adImageUrl,
      adTargetUrl: order.adTargetUrl,
      adPosition: order.adPosition,
      adSize: order.adSize,
      duration: order.duration,
      totalPrice: order.totalPrice,
      status: order.status,
    },
  });
  return {
    id: newOrder.id,
    adId: newOrder.adId || undefined,
    clientName: newOrder.clientName,
    clientEmail: newOrder.clientEmail,
    clientPhone: newOrder.clientPhone || undefined,
    companyName: newOrder.companyName || undefined,
    websiteUrl: newOrder.websiteUrl || undefined,
    adTitle: newOrder.adTitle,
    adDescription: newOrder.adDescription,
    adImageUrl: newOrder.adImageUrl || undefined,
    adTargetUrl: newOrder.adTargetUrl,
    adPosition: newOrder.adPosition as AdOrder['adPosition'],
    adSize: newOrder.adSize as AdOrder['adSize'],
    duration: newOrder.duration,
    totalPrice: newOrder.totalPrice,
    status: newOrder.status as AdOrder['status'],
    createdAt: newOrder.createdAt.toISOString(),
    updatedAt: newOrder.updatedAt.toISOString(),
  };
}

export async function updateOrder(id: string, updates: Partial<AdOrder>): Promise<AdOrder | null> {
  try {
    const data: Record<string, unknown> = {};
    if (updates.adId !== undefined) data.adId = updates.adId;
    if (updates.clientName !== undefined) data.clientName = updates.clientName;
    if (updates.clientEmail !== undefined) data.clientEmail = updates.clientEmail;
    if (updates.clientPhone !== undefined) data.clientPhone = updates.clientPhone;
    if (updates.companyName !== undefined) data.companyName = updates.companyName;
    if (updates.websiteUrl !== undefined) data.websiteUrl = updates.websiteUrl;
    if (updates.adTitle !== undefined) data.adTitle = updates.adTitle;
    if (updates.adDescription !== undefined) data.adDescription = updates.adDescription;
    if (updates.adImageUrl !== undefined) data.adImageUrl = updates.adImageUrl;
    if (updates.adTargetUrl !== undefined) data.adTargetUrl = updates.adTargetUrl;
    if (updates.adPosition !== undefined) data.adPosition = updates.adPosition;
    if (updates.adSize !== undefined) data.adSize = updates.adSize;
    if (updates.duration !== undefined) data.duration = updates.duration;
    if (updates.totalPrice !== undefined) data.totalPrice = updates.totalPrice;
    if (updates.status !== undefined) data.status = updates.status;

    const order = await prisma.adOrder.update({ where: { id }, data });
    if (!order) return null;
    return {
      id: order.id,
      adId: order.adId || undefined,
      clientName: order.clientName,
      clientEmail: order.clientEmail,
      clientPhone: order.clientPhone || undefined,
      companyName: order.companyName || undefined,
      websiteUrl: order.websiteUrl || undefined,
      adTitle: order.adTitle,
      adDescription: order.adDescription,
      adImageUrl: order.adImageUrl || undefined,
      adTargetUrl: order.adTargetUrl,
      adPosition: order.adPosition as AdOrder['adPosition'],
      adSize: order.adSize as AdOrder['adSize'],
      duration: order.duration,
      totalPrice: order.totalPrice,
      status: order.status as AdOrder['status'],
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error('Error updating order:', error);
    return null;
  }
}

export async function logAnalyticsEvent(event: Omit<AnalyticsEvent, 'id' | 'timestamp'>): Promise<void> {
  try {
    await prisma.analyticsEvent.create({
      data: {
        sessionId: event.sessionId,
        type: event.type,
        page: event.page,
        referrer: event.referrer,
        utmSource: event.utmSource,
        utmMedium: event.utmMedium,
        utmCampaign: event.utmCampaign,
        userAgent: event.userAgent,
        screenSize: event.screenSize,
        deviceType: event.deviceType,
        browser: event.browser,
        country: event.country,
        city: event.city,
        metadata: event.metadata as any,
      },
    });
  } catch (error) {
    console.error('Error logging analytics event:', error);
  }
}

export async function getAnalytics(filters?: {
  startDate?: string;
  endDate?: string;
  type?: string;
  page?: string;
  sessionId?: string;
}) {
  try {
    const where: Record<string, unknown> = {};
    if (filters?.startDate) where.timestamp = { gte: new Date(filters.startDate) };
    if (filters?.endDate) {
      where.timestamp = { ...(where.timestamp as object || {}), lte: new Date(filters.endDate) };
    }
    if (filters?.type) where.type = filters.type;
    if (filters?.page) where.page = filters.page;
    if (filters?.sessionId) where.sessionId = filters.sessionId;

    return prisma.analyticsEvent.findMany({
      where,
      orderBy: { timestamp: 'desc' },
      take: 500,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return [];
  }
}

export async function getAnalyticsSummary() {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [events, totalCount, todayEvents, weekEvents, pageviews, adViews, adClicks, socialShares] = await Promise.all([
      prisma.analyticsEvent.findMany({ take: 1000, orderBy: { timestamp: 'desc' } }),
      prisma.analyticsEvent.count(),
      prisma.analyticsEvent.findMany({ where: { timestamp: { gte: today } } }),
      prisma.analyticsEvent.findMany({ where: { timestamp: { gte: weekAgo } } }),
      prisma.analyticsEvent.findMany({ where: { type: 'pageview' } }),
      prisma.analyticsEvent.findMany({ where: { type: 'ad_view' } }),
      prisma.analyticsEvent.findMany({ where: { type: 'ad_click' } }),
      prisma.analyticsEvent.findMany({ where: { type: 'social_share' } }),
    ]);

    const uniqueSessions = new Set(events.map(e => e.sessionId)).size;
    const todaySessions = new Set(todayEvents.map(e => e.sessionId)).size;
    const weekSessions = new Set(weekEvents.map(e => e.sessionId)).size;

    const referrers: Record<string, number> = {};
    const pages: Record<string, number> = {};
    const deviceTypes: Record<string, number> = {};
    const countries: Record<string, number> = {};
    const browsers: Record<string, number> = {};
    const clicksByPage: Record<string, number> = {};
    const sessions: Record<string, { pages: string[]; referrer?: string; device: string; browser: string; timestamp: string }> = {};

    events.forEach(e => {
      if (e.referrer) {
        try {
          const url = new URL(e.referrer);
          const domain = url.hostname.replace('www.', '');
          referrers[domain] = (referrers[domain] || 0) + 1;
        } catch {}
      }
      pages[e.page] = (pages[e.page] || 0) + 1;
      deviceTypes[e.deviceType] = (deviceTypes[e.deviceType] || 0) + 1;
      if (e.browser) browsers[e.browser] = (browsers[e.browser] || 0) + 1;
      if (e.country) countries[e.country] = (countries[e.country] || 0) + 1;
      if (e.type === 'click') clicksByPage[e.page] = (clicksByPage[e.page] || 0) + 1;

      if (!sessions[e.sessionId]) {
        sessions[e.sessionId] = {
          pages: [],
          referrer: e.referrer ?? undefined,
          device: e.deviceType,
          browser: e.browser || 'Unknown',
          timestamp: e.timestamp.toISOString(),
        };
      }
      if (!sessions[e.sessionId].pages.includes(e.page)) {
        sessions[e.sessionId].pages.push(e.page);
      }
    });

    const topPages = Object.entries(pages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([page, count]) => ({ page, count, clicks: clicksByPage[page] || 0 }));

    const topReferrers = Object.entries(referrers)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([referrer, count]) => ({ referrer, count }));

    const dailyPageviews: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const key = date.toISOString().split('T')[0];
      dailyPageviews[key] = events.filter(e => {
        const eventDate = e.timestamp.toISOString().split('T')[0];
        return eventDate === key && e.type === 'pageview';
      }).length;
    }

    return {
      totalEvents: totalCount,
      uniqueSessions,
      todaySessions,
      weekSessions,
      pageviews: pageviews.length,
      adViews: adViews.length,
      adClicks: adClicks.length,
      socialShares: socialShares.length,
      deviceTypes,
      browsers,
      countries,
      topPages,
      topReferrers,
      dailyPageviews,
      sessions: Object.entries(sessions).slice(0, 50).map(([id, data]) => ({
        sessionId: id,
        ...data,
      })),
    };
  } catch (error) {
    console.error('Error getting analytics summary:', error);
    return {
      totalEvents: 0,
      uniqueSessions: 0,
      todaySessions: 0,
      weekSessions: 0,
      pageviews: 0,
      adViews: 0,
      adClicks: 0,
      socialShares: 0,
      deviceTypes: {},
      browsers: {},
      countries: {},
      topPages: [],
      topReferrers: [],
      dailyPageviews: {},
      sessions: [],
    };
  }
}