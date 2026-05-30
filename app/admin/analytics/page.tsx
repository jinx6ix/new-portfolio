'use client';

import { useEffect, useState } from 'react';
import {
  Eye,
  MousePointerClick,
  Users,
  TrendingUp,
  Share2,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Activity,
  Clock,
  MapPin,
} from 'lucide-react';
import React, { createElement } from 'react';

interface AnalyticsSummary {
  totalEvents: number;
  uniqueSessions: number;
  todaySessions: number;
  weekSessions: number;
  pageviews: number;
  adViews: number;
  adClicks: number;
  socialShares: number;
  deviceTypes: Record<string, number>;
  browsers: Record<string, number>;
  countries: Record<string, number>;
  topPages: { page: string; count: number; clicks: number }[];
  topReferrers: { referrer: string; count: number }[];
  dailyPageviews: Record<string, number>;
  sessions: SessionDetail[];
}

interface SessionDetail {
  sessionId: string;
  pages: string[];
  referrer?: string;
  device: string;
  browser: string;
  timestamp: string;
}

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'visitors' | 'pages' | 'devices'>('overview');
  const [selectedSession, setSelectedSession] = useState<SessionDetail | null>(null);

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then(res => res.json())
      .then(data => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching analytics:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-card rounded-xl" />)}
        </div>
        <div className="h-96 bg-card rounded-xl" />
      </div>
    );
  }

  const deviceIcons: Record<string, React.ElementType> = {
    desktop: Monitor,
    mobile: Smartphone,
    tablet: Tablet,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTimeAgo = (dateString: string) => {
    const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analytics</h2>
        <p className="text-muted-foreground">Track visitor behavior and site performance in real-time</p>
      </div>

      <div className="flex gap-2 border-b border-border pb-4">
        {(['overview', 'visitors', 'pages', 'devices'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              activeTab === tab
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Eye className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{analytics?.pageviews || 0}</p>
                  <p className="text-sm text-muted-foreground">Total Pageviews</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Users className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{analytics?.uniqueSessions || 0}</p>
                  <p className="text-sm text-muted-foreground">Unique Visitors</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <MousePointerClick className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{analytics?.adClicks || 0}</p>
                  <p className="text-sm text-muted-foreground">Ad Clicks</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-500/20 rounded-lg">
                  <Share2 className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{analytics?.socialShares || 0}</p>
                  <p className="text-sm text-muted-foreground">Social Shares</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold mb-4">Session Trends</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <p className="text-3xl font-bold text-primary">{analytics?.todaySessions || 0}</p>
                  <p className="text-sm text-muted-foreground">Today</p>
                </div>
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <p className="text-3xl font-bold text-primary">{analytics?.weekSessions || 0}</p>
                  <p className="text-sm text-muted-foreground">This Week</p>
                </div>
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <p className="text-3xl font-bold text-primary">{analytics?.totalEvents || 0}</p>
                  <p className="text-sm text-muted-foreground">Total Events</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold mb-4">Top Traffic Sources</h3>
              <div className="space-y-3">
                {analytics?.topReferrers.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium truncate max-w-[200px]">{item.referrer}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.count} visits</span>
                  </div>
                ))}
                {(!analytics?.topReferrers || analytics.topReferrers.length === 0) && (
                  <p className="text-center py-8 text-muted-foreground">No referrer data yet</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="text-lg font-semibold mb-6">Weekly Pageviews</h3>
            <div className="flex items-end gap-3 h-48">
              {Object.entries(analytics?.dailyPageviews || {}).map(([date, count]) => {
                const maxCount = Math.max(...Object.values(analytics?.dailyPageviews || { '0': 1 }), 1);
                const height = (count / maxCount) * 100;
                const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
                return (
                  <div key={date} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full flex items-end justify-center h-36">
                      <div
                        className="w-full max-w-16 bg-primary rounded-t-md transition-all hover:bg-primary/80 cursor-pointer relative"
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-background border border-border rounded px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {count} views
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{dayName}</span>
                  </div>
                );
              })}
              {Object.keys(analytics?.dailyPageviews || {}).length === 0 && (
                <div className="flex-1 flex items-center justify-center h-36 text-muted-foreground">
                  No data available yet
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {activeTab === 'visitors' && (
        <div className="space-y-6">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold">Live Visitor Sessions</h3>
              <p className="text-sm text-muted-foreground">{analytics?.sessions?.length || 0} active sessions</p>
            </div>
            <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
              {analytics?.sessions?.map((session) => (
                <div
                  key={session.sessionId}
                  className="p-4 hover:bg-accent/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedSession(session)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-green-500" />
                      <span className="font-mono text-sm">{session.sessionId.slice(0, 12)}...</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{getTimeAgo(session.timestamp)}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      {deviceIcons[session.device] ? createElement(deviceIcons[session.device], { className: 'w-4 h-4' }) : <Monitor className="w-4 h-4" />}
                      {session.device}
                    </span>
                    <span className="flex items-center gap-1">
                      {session.browser}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {session.pages.length} pages
                    </span>
                    {session.referrer && (
                      <span className="flex items-center gap-1 truncate max-w-[150px]">
                        <Globe className="w-4 h-4" />
                        {new URL(session.referrer).hostname.replace('www.', '')}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {(!analytics?.sessions || analytics.sessions.length === 0) && (
                <div className="p-8 text-center text-muted-foreground">
                  No visitor sessions recorded yet
                </div>
              )}
            </div>
          </div>

          {selectedSession && (
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Session Details</h3>
                <button onClick={() => setSelectedSession(null)} className="text-sm text-muted-foreground hover:text-foreground">
                  Close
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Session ID</p>
                  <p className="font-mono text-sm">{selectedSession.sessionId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">First Seen</p>
                  <p className="text-sm">{formatDate(selectedSession.timestamp)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Device</p>
                  <p className="text-sm capitalize">{selectedSession.device}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Browser</p>
                  <p className="text-sm">{selectedSession.browser}</p>
                </div>
                {selectedSession.referrer && (
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Referred From</p>
                    <p className="text-sm truncate">{selectedSession.referrer}</p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Pages Visited (in order)</p>
                <div className="space-y-2">
                  {selectedSession.pages.map((page, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-secondary rounded-lg">
                      <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-sm">{page}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'pages' && (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold">Page Performance</h3>
            <p className="text-sm text-muted-foreground">Views and clicks per page</p>
          </div>
          <div className="divide-y divide-border">
            {analytics?.topPages.map((page, index) => (
              <div key={index} className="p-4 hover:bg-accent/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground w-6">#{index + 1}</span>
                    <span className="font-medium">{page.page}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-medium">{page.count}</p>
                      <p className="text-xs text-muted-foreground">views</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{page.clicks}</p>
                      <p className="text-xs text-muted-foreground">clicks</p>
                    </div>
                  </div>
                </div>
                <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(page.count / (analytics?.topPages[0]?.count || 1)) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            {(!analytics?.topPages || analytics.topPages.length === 0) && (
              <div className="p-8 text-center text-muted-foreground">
                No page data recorded yet
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'devices' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="text-lg font-semibold mb-4">Device Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(analytics?.deviceTypes || {}).map(([device, count]) => {
                const total = Object.values(analytics?.deviceTypes || {}).reduce((a, b) => a + b, 0);
                const percent = total > 0 ? Math.round((count / total) * 100) : 0;
                const DeviceIcon = deviceIcons[device] || Monitor;
                return (
                  <div key={device} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                      <DeviceIcon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium capitalize">{device}</span>
                        <span className="text-sm text-muted-foreground">{count} ({percent}%)</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
              {Object.keys(analytics?.deviceTypes || {}).length === 0 && (
                <p className="text-center py-8 text-muted-foreground">No device data yet</p>
              )}
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="text-lg font-semibold mb-4">Browser Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(analytics?.browsers || {}).map(([browser, count]) => {
                const total = Object.values(analytics?.browsers || {}).reduce((a, b) => a + b, 0);
                const percent = total > 0 ? Math.round((count / total) * 100) : 0;
                return (
                  <div key={browser} className="flex items-center gap-4">
                    <Globe className="w-6 h-6 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{browser}</span>
                        <span className="text-sm text-muted-foreground">{count} ({percent}%)</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
              {Object.keys(analytics?.browsers || {}).length === 0 && (
                <p className="text-center py-8 text-muted-foreground">No browser data yet</p>
              )}
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Geographic Distribution</h3>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(analytics?.countries || {}).map(([country, count]) => (
                <div key={country} className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">{country}</p>
                    <p className="text-xs text-muted-foreground">{count} visits</p>
                  </div>
                </div>
              ))}
              {Object.keys(analytics?.countries || {}).length === 0 && (
                <p className="col-span-4 text-center py-8 text-muted-foreground">No geographic data yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}