import supabase from './supabase';
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
    const { data: settings, error } = await supabase
      .from('site_settings')
      .select('*')
      .maybeSingle();

    if (error) throw error;
    if (!settings) {
      const { data: newSettings, error: createError } = await supabase
        .from('site_settings')
        .insert({
          maintenance_mode: false,
          maintenance_message: 'We are currently under maintenance. Please check back soon.',
        })
        .select()
        .single();

      if (createError) throw createError;
      return {
        maintenanceMode: newSettings.maintenance_mode,
        maintenanceMessage: newSettings.maintenance_message || undefined,
        googleAdsenseId: newSettings.google_adsense_id || undefined,
      };
    }

    return {
      maintenanceMode: settings.maintenance_mode,
      maintenanceMessage: settings.maintenance_message || undefined,
      googleAdsenseId: settings.google_adsense_id || undefined,
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
    const { data: existing } = await supabase
      .from('site_settings')
      .select('id')
      .maybeSingle();

    let settings;
    if (!existing) {
      const { data: newSettings, error } = await supabase
        .from('site_settings')
        .insert({
          maintenance_mode: updates.maintenanceMode ?? false,
          maintenance_message: updates.maintenanceMessage || 'We are currently under maintenance. Please check back soon.',
          google_adsense_id: updates.googleAdsenseId,
        })
        .select()
        .single();
      if (error) throw error;
      settings = newSettings;
    } else {
      const updateData: Record<string, any> = {};
      if (updates.maintenanceMode !== undefined) updateData.maintenance_mode = updates.maintenanceMode;
      if (updates.maintenanceMessage !== undefined) updateData.maintenance_message = updates.maintenanceMessage;
      if (updates.googleAdsenseId !== undefined) updateData.google_adsense_id = updates.googleAdsenseId;

      const { data: updated, error } = await supabase
        .from('site_settings')
        .update(updateData)
        .eq('id', existing.id)
        .select()
        .single();
      if (error) throw error;
      settings = updated;
    }

    return {
      maintenanceMode: settings.maintenance_mode,
      maintenanceMessage: settings.maintenance_message || undefined,
      googleAdsenseId: settings.google_adsense_id || undefined,
    };
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
}

export async function getAllAds(status?: string): Promise<Ad[]> {
  try {
    let query = supabase
      .from('ads')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data: ads, error } = await query;
    if (error) throw error;

    return (ads || []).map((ad: any) => ({
      id: ad.id,
      title: ad.title,
      description: ad.description,
      clientName: ad.client_name,
      clientEmail: ad.client_email,
      clientPhone: ad.client_phone || undefined,
      websiteUrl: ad.website_url || undefined,
      imageUrl: ad.image_url,
      targetUrl: ad.target_url,
      position: ad.position,
      size: ad.size,
      status: ad.status,
      startDate: ad.start_date,
      endDate: ad.end_date,
      impressions: ad.impressions || 0,
      clicks: ad.clicks || 0,
      createdAt: ad.created_at,
      updatedAt: ad.updated_at,
      adType: ad.ad_type || 'client',
    }));
  } catch (error) {
    console.error('Error fetching ads:', error);
    return [];
  }
}

export async function getActiveAds(position?: string): Promise<Ad[]> {
  try {
    const now = new Date().toISOString();
    let query = supabase
      .from('ads')
      .select('*')
      .eq('status', 'approved')
      .lte('start_date', now)
      .gte('end_date', now)
      .order('created_at', { ascending: false });

    if (position) {
      query = query.eq('position', position);
    }

    const { data: ads, error } = await query;
    if (error) throw error;

    return (ads || []).map((ad: any) => ({
      id: ad.id,
      title: ad.title,
      description: ad.description,
      clientName: ad.client_name,
      clientEmail: ad.client_email,
      clientPhone: ad.client_phone || undefined,
      websiteUrl: ad.website_url || undefined,
      imageUrl: ad.image_url,
      targetUrl: ad.target_url,
      position: ad.position,
      size: ad.size,
      status: ad.status,
      startDate: ad.start_date,
      endDate: ad.end_date,
      impressions: ad.impressions || 0,
      clicks: ad.clicks || 0,
      createdAt: ad.created_at,
      updatedAt: ad.updated_at,
      adType: ad.ad_type || 'client',
    }));
  } catch (error) {
    console.error('Error fetching active ads:', error);
    return [];
  }
}

export async function getAdById(id: string): Promise<Ad | null> {
  try {
    const { data: ad, error } = await supabase
      .from('ads')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !ad) return null;

    return {
      id: ad.id,
      title: ad.title,
      description: ad.description,
      clientName: ad.client_name,
      clientEmail: ad.client_email,
      clientPhone: ad.client_phone || undefined,
      websiteUrl: ad.website_url || undefined,
      imageUrl: ad.image_url,
      targetUrl: ad.target_url,
      position: ad.position,
      size: ad.size,
      status: ad.status,
      startDate: ad.start_date,
      endDate: ad.end_date,
      impressions: ad.impressions || 0,
      clicks: ad.clicks || 0,
      createdAt: ad.created_at,
      updatedAt: ad.updated_at,
    };
  } catch (error) {
    console.error('Error fetching ad:', error);
    return null;
  }
}

export async function createAd(ad: Omit<Ad, 'id' | 'createdAt' | 'updatedAt' | 'impressions' | 'clicks'>): Promise<Ad> {
  const { data: newAd, error } = await supabase
    .from('ads')
    .insert({
      title: ad.title,
      description: ad.description,
      client_name: ad.clientName,
      client_email: ad.clientEmail,
      client_phone: ad.clientPhone,
      website_url: ad.websiteUrl,
      image_url: ad.imageUrl,
      target_url: ad.targetUrl,
      position: ad.position,
      size: ad.size,
      status: ad.status,
      start_date: ad.startDate,
      end_date: ad.endDate,
      impressions: 0,
      clicks: 0,
      ad_type: (ad as any).adType || 'client',
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: newAd.id,
    title: newAd.title,
    description: newAd.description,
    clientName: newAd.client_name,
    clientEmail: newAd.client_email,
    clientPhone: newAd.client_phone || undefined,
    websiteUrl: newAd.website_url || undefined,
    imageUrl: newAd.image_url,
    targetUrl: newAd.target_url,
    position: newAd.position,
    size: newAd.size,
    status: newAd.status,
    startDate: newAd.start_date,
    endDate: newAd.end_date,
    impressions: newAd.impressions || 0,
    clicks: newAd.clicks || 0,
    createdAt: newAd.created_at,
    updatedAt: newAd.updated_at,
    adType: newAd.ad_type || 'client',
  };
}

export async function updateAd(id: string, updates: Partial<Ad>): Promise<Ad | null> {
  try {
    const updateData: Record<string, any> = {};
    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.clientName !== undefined) updateData.client_name = updates.clientName;
    if (updates.clientEmail !== undefined) updateData.client_email = updates.clientEmail;
    if (updates.clientPhone !== undefined) updateData.client_phone = updates.clientPhone;
    if (updates.websiteUrl !== undefined) updateData.website_url = updates.websiteUrl;
    if (updates.imageUrl !== undefined) updateData.image_url = updates.imageUrl;
    if (updates.targetUrl !== undefined) updateData.target_url = updates.targetUrl;
    if (updates.position !== undefined) updateData.position = updates.position;
    if (updates.size !== undefined) updateData.size = updates.size;
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.startDate !== undefined) updateData.start_date = updates.startDate;
    if (updates.endDate !== undefined) updateData.end_date = updates.endDate;
    if (updates.impressions !== undefined) updateData.impressions = updates.impressions;
    if (updates.clicks !== undefined) updateData.clicks = updates.clicks;

    const { data: ad, error } = await supabase
      .from('ads')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error || !ad) return null;

    return {
      id: ad.id,
      title: ad.title,
      description: ad.description,
      clientName: ad.client_name,
      clientEmail: ad.client_email,
      clientPhone: ad.client_phone || undefined,
      websiteUrl: ad.website_url || undefined,
      imageUrl: ad.image_url,
      targetUrl: ad.target_url,
      position: ad.position,
      size: ad.size,
      status: ad.status,
      startDate: ad.start_date,
      endDate: ad.end_date,
      impressions: ad.impressions || 0,
      clicks: ad.clicks || 0,
      createdAt: ad.created_at,
      updatedAt: ad.updated_at,
      adType: ad.ad_type || 'client',
    };
  } catch (error) {
    console.error('Error updating ad:', error);
    return null;
  }
}

export async function deleteAd(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('ads')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch {
    return false;
  }
}

export async function incrementAdImpression(id: string): Promise<void> {
  try {
    const { data: ad } = await supabase
      .from('ads')
      .select('impressions')
      .eq('id', id)
      .single();

    if (ad) {
      await supabase
        .from('ads')
        .update({ impressions: (ad.impressions || 0) + 1 })
        .eq('id', id);
    }
  } catch (error) {
    console.error('Error incrementing impression:', error);
  }
}

export async function incrementAdClick(id: string): Promise<void> {
  try {
    const { data: ad } = await supabase
      .from('ads')
      .select('clicks')
      .eq('id', id)
      .single();

    if (ad) {
      await supabase
        .from('ads')
        .update({ clicks: (ad.clicks || 0) + 1 })
        .eq('id', id);
    }
  } catch (error) {
    console.error('Error incrementing click:', error);
  }
}

export async function getAllOrders(status?: string): Promise<AdOrder[]> {
  try {
    let query = supabase
      .from('ad_orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data: orders, error } = await query;
    if (error) throw error;

    return (orders || []).map((order: any) => ({
      id: order.id,
      adId: order.ad_id || undefined,
      clientName: order.client_name,
      clientEmail: order.client_email,
      clientPhone: order.client_phone || undefined,
      companyName: order.company_name || undefined,
      websiteUrl: order.website_url || undefined,
      adTitle: order.ad_title,
      adDescription: order.ad_description,
      adImageUrl: order.ad_image_url || undefined,
      adTargetUrl: order.ad_target_url,
      adPosition: order.ad_position,
      adSize: order.ad_size,
      duration: order.duration,
      totalPrice: order.total_price,
      status: order.status,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    }));
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

export async function getOrderById(id: string): Promise<AdOrder | null> {
  try {
    const { data: order, error } = await supabase
      .from('ad_orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !order) return null;

    return {
      id: order.id,
      adId: order.ad_id || undefined,
      clientName: order.client_name,
      clientEmail: order.client_email,
      clientPhone: order.client_phone || undefined,
      companyName: order.company_name || undefined,
      websiteUrl: order.website_url || undefined,
      adTitle: order.ad_title,
      adDescription: order.ad_description,
      adImageUrl: order.ad_image_url || undefined,
      adTargetUrl: order.ad_target_url,
      adPosition: order.ad_position,
      adSize: order.ad_size,
      duration: order.duration,
      totalPrice: order.total_price,
      status: order.status,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    };
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
}

export async function createOrder(order: Omit<AdOrder, 'id' | 'createdAt' | 'updatedAt'>): Promise<AdOrder> {
  const { data: newOrder, error } = await supabase
    .from('ad_orders')
    .insert({
      ad_id: order.adId,
      client_name: order.clientName,
      client_email: order.clientEmail,
      client_phone: order.clientPhone,
      company_name: order.companyName,
      website_url: order.websiteUrl,
      ad_title: order.adTitle,
      ad_description: order.adDescription,
      ad_image_url: order.adImageUrl,
      ad_target_url: order.adTargetUrl,
      ad_position: order.adPosition,
      ad_size: order.adSize,
      duration: order.duration,
      total_price: order.totalPrice,
      status: order.status,
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: newOrder.id,
    adId: newOrder.ad_id || undefined,
    clientName: newOrder.client_name,
    clientEmail: newOrder.client_email,
    clientPhone: newOrder.client_phone || undefined,
    companyName: newOrder.company_name || undefined,
    websiteUrl: newOrder.website_url || undefined,
    adTitle: newOrder.ad_title,
    adDescription: newOrder.ad_description,
    adImageUrl: newOrder.ad_image_url || undefined,
    adTargetUrl: newOrder.ad_target_url,
    adPosition: newOrder.ad_position,
    adSize: newOrder.ad_size,
    duration: newOrder.duration,
    totalPrice: newOrder.total_price,
    status: newOrder.status,
    createdAt: newOrder.created_at,
    updatedAt: newOrder.updated_at,
  };
}

export async function updateOrder(id: string, updates: Partial<AdOrder>): Promise<AdOrder | null> {
  try {
    const updateData: Record<string, any> = {};
    if (updates.adId !== undefined) updateData.ad_id = updates.adId;
    if (updates.clientName !== undefined) updateData.client_name = updates.clientName;
    if (updates.clientEmail !== undefined) updateData.client_email = updates.clientEmail;
    if (updates.clientPhone !== undefined) updateData.client_phone = updates.clientPhone;
    if (updates.companyName !== undefined) updateData.company_name = updates.companyName;
    if (updates.websiteUrl !== undefined) updateData.website_url = updates.websiteUrl;
    if (updates.adTitle !== undefined) updateData.ad_title = updates.adTitle;
    if (updates.adDescription !== undefined) updateData.ad_description = updates.adDescription;
    if (updates.adImageUrl !== undefined) updateData.ad_image_url = updates.adImageUrl;
    if (updates.adTargetUrl !== undefined) updateData.ad_target_url = updates.adTargetUrl;
    if (updates.adPosition !== undefined) updateData.ad_position = updates.adPosition;
    if (updates.adSize !== undefined) updateData.ad_size = updates.adSize;
    if (updates.duration !== undefined) updateData.duration = updates.duration;
    if (updates.totalPrice !== undefined) updateData.total_price = updates.totalPrice;
    if (updates.status !== undefined) updateData.status = updates.status;

    const { data: order, error } = await supabase
      .from('ad_orders')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error || !order) return null;

    return {
      id: order.id,
      adId: order.ad_id || undefined,
      clientName: order.client_name,
      clientEmail: order.client_email,
      clientPhone: order.client_phone || undefined,
      companyName: order.company_name || undefined,
      websiteUrl: order.website_url || undefined,
      adTitle: order.ad_title,
      adDescription: order.ad_description,
      adImageUrl: order.ad_image_url || undefined,
      adTargetUrl: order.ad_target_url,
      adPosition: order.ad_position,
      adSize: order.ad_size,
      duration: order.duration,
      totalPrice: order.total_price,
      status: order.status,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    };
  } catch (error) {
    console.error('Error updating order:', error);
    return null;
  }
}

export async function logAnalyticsEvent(event: Omit<AnalyticsEvent, 'id' | 'timestamp'>): Promise<void> {
  try {
    const { error } = await supabase
      .from('analytics_events')
      .insert({
        session_id: event.sessionId,
        type: event.type,
        page: event.page,
        referrer: event.referrer,
        utm_source: event.utmSource,
        utm_medium: event.utmMedium,
        utm_campaign: event.utmCampaign,
        user_agent: event.userAgent,
        screen_size: event.screenSize,
        device_type: event.deviceType,
        browser: event.browser,
        country: event.country,
        city: event.city,
        metadata: event.metadata,
      });

    if (error) throw error;
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
    let query = supabase
      .from('analytics_events')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(500);

    if (filters?.startDate) {
      query = query.gte('timestamp', filters.startDate);
    }
    if (filters?.endDate) {
      query = query.lte('timestamp', filters.endDate);
    }
    if (filters?.type) {
      query = query.eq('type', filters.type);
    }
    if (filters?.page) {
      query = query.eq('page', filters.page);
    }
    if (filters?.sessionId) {
      query = query.eq('session_id', filters.sessionId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
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

    const [
      { data: events },
      { count: totalCount },
      { data: todayEvents },
      { data: weekEvents },
      { data: pageviews },
      { data: adViews },
      { data: adClicks },
      { data: socialShares },
    ] = await Promise.all([
      supabase.from('analytics_events').select('*').order('timestamp', { ascending: false }).limit(1000),
      supabase.from('analytics_events').select('id', { count: 'exact', head: true }),
      supabase.from('analytics_events').select('*').gte('timestamp', today.toISOString()),
      supabase.from('analytics_events').select('*').gte('timestamp', weekAgo.toISOString()),
      supabase.from('analytics_events').select('*').eq('type', 'pageview'),
      supabase.from('analytics_events').select('*').eq('type', 'ad_view'),
      supabase.from('analytics_events').select('*').eq('type', 'ad_click'),
      supabase.from('analytics_events').select('*').eq('type', 'social_share'),
    ]);

    const eventsList = events || [];
    const todayList = todayEvents || [];
    const weekList = weekEvents || [];

    const uniqueSessions = new Set(eventsList.map((e: any) => e.session_id)).size;
    const todaySessions = new Set(todayList.map((e: any) => e.session_id)).size;
    const weekSessions = new Set(weekList.map((e: any) => e.session_id)).size;

    const referrers: Record<string, number> = {};
    const pages: Record<string, number> = {};
    const deviceTypes: Record<string, number> = {};
    const countries: Record<string, number> = {};
    const browsers: Record<string, number> = {};
    const clicksByPage: Record<string, number> = {};
    const sessionsMap: Record<string, { pages: string[]; referrer?: string; device: string; browser: string; timestamp: string }> = {};

    eventsList.forEach((e: any) => {
      if (e.referrer) {
        try {
          const url = new URL(e.referrer);
          const domain = url.hostname.replace('www.', '');
          referrers[domain] = (referrers[domain] || 0) + 1;
        } catch {}
      }
      pages[e.page] = (pages[e.page] || 0) + 1;
      deviceTypes[e.device_type] = (deviceTypes[e.device_type] || 0) + 1;
      if (e.browser) browsers[e.browser] = (browsers[e.browser] || 0) + 1;
      if (e.country) countries[e.country] = (countries[e.country] || 0) + 1;
      if (e.type === 'ad_click') clicksByPage[e.page] = (clicksByPage[e.page] || 0) + 1;

      if (!sessionsMap[e.session_id]) {
        sessionsMap[e.session_id] = {
          pages: [],
          referrer: e.referrer || undefined,
          device: e.device_type,
          browser: e.browser || 'Unknown',
          timestamp: e.timestamp,
        };
      }
      if (!sessionsMap[e.session_id].pages.includes(e.page)) {
        sessionsMap[e.session_id].pages.push(e.page);
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
      dailyPageviews[key] = eventsList.filter((e: any) => {
        const eventDate = e.timestamp.split('T')[0];
        return eventDate === key && e.type === 'pageview';
      }).length;
    }

    return {
      totalEvents: totalCount || 0,
      uniqueSessions,
      todaySessions,
      weekSessions,
      pageviews: (pageviews || []).length,
      adViews: (adViews || []).length,
      adClicks: (adClicks || []).length,
      socialShares: (socialShares || []).length,
      deviceTypes,
      browsers,
      countries,
      topPages,
      topReferrers,
      dailyPageviews,
      sessions: Object.entries(sessionsMap).slice(0, 50).map(([id, data]) => ({
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