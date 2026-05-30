'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Eye,
  MousePointerClick,
  Users,
  TrendingUp,
  Megaphone,
  ShoppingCart,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

interface AnalyticsData {
  totalEvents: number;
  uniqueSessions: number;
  todaySessions: number;
  weekSessions: number;
  pageviews: number;
  adViews: number;
  adClicks: number;
  socialShares: number;
  deviceTypes: Record<string, number>;
  countries: Record<string, number>;
  topPages: { page: string; count: number }[];
  topReferrers: { referrer: string; count: number }[];
  dailyPageviews: Record<string, number>;
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-card rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-card rounded-xl" />
          <div className="h-64 bg-card rounded-xl" />
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Pageviews',
      value: analytics?.pageviews || 0,
      change: '+12.5%',
      changeType: 'positive',
      icon: Eye,
      color: 'blue',
    },
    {
      title: 'Ad Impressions',
      value: analytics?.adViews || 0,
      change: '+8.2%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'green',
    },
    {
      title: 'Ad Clicks',
      value: analytics?.adClicks || 0,
      change: '+23.1%',
      changeType: 'positive',
      icon: MousePointerClick,
      color: 'purple',
    },
    {
      title: 'Social Shares',
      value: analytics?.socialShares || 0,
      change: '-2.0%',
      changeType: 'negative',
      icon: Users,
      color: 'orange',
    },
  ];

  const colorClasses: Record<string, { bg: string; icon: string }> = {
    blue: { bg: 'bg-blue-500/20', icon: 'text-blue-500' },
    green: { bg: 'bg-green-500/20', icon: 'text-green-500' },
    purple: { bg: 'bg-purple-500/20', icon: 'text-purple-500' },
    orange: { bg: 'bg-orange-500/20', icon: 'text-orange-500' },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Welcome back, Admin</h2>
          <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your site.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/ads"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            <Megaphone className="w-4 h-4" />
            Manage Ads
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            View Orders
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colors = colorClasses[stat.color];
          return (
            <div key={stat.title} className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${colors.bg}`}>
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold">{stat.value.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Top Pages</h3>
            <Link href="/admin/analytics" className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {analytics?.topPages.slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-6">#{index + 1}</span>
                  <span className="font-medium truncate max-w-[200px]">{item.page}</span>
                </div>
                <span className="text-sm text-muted-foreground">{item.count}</span>
              </div>
            ))}
            {(!analytics?.topPages || analytics.topPages.length === 0) && (
              <p className="text-muted-foreground text-center py-4">No data yet</p>
            )}
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Traffic Sources</h3>
            <Link href="/admin/analytics" className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {analytics?.topReferrers.slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-6">#{index + 1}</span>
                  <span className="font-medium truncate max-w-[200px]">{item.referrer}</span>
                </div>
                <span className="text-sm text-muted-foreground">{item.count}</span>
              </div>
            ))}
            {(!analytics?.topReferrers || analytics.topReferrers.length === 0) && (
              <p className="text-muted-foreground text-center py-4">No data yet</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Device Breakdown</h3>
          <div className="space-y-3">
            {Object.entries(analytics?.deviceTypes || {}).map(([device, count]) => {
              const total = Object.values(analytics?.deviceTypes || {}).reduce((a, b) => a + b, 0);
              const percent = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={device}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize">{device}</span>
                    <span className="text-muted-foreground">{percent}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {Object.keys(analytics?.deviceTypes || {}).length === 0 && (
              <p className="text-muted-foreground text-center py-4">No data yet</p>
            )}
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Weekly Pageviews</h3>
          </div>
          <div className="flex items-end gap-2 h-40">
            {Object.entries(analytics?.dailyPageviews || {}).map(([date, count]) => {
              const maxCount = Math.max(...Object.values(analytics?.dailyPageviews || { '0': 1 }), 1);
              const height = (count / maxCount) * 100;
              const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
              return (
                <div key={date} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center h-32">
                    <div
                      className="w-full max-w-12 bg-primary rounded-t-md transition-all hover:bg-primary/80"
                      style={{ height: `${height}%` }}
                      title={count.toString()}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{dayName}</span>
                </div>
              );
            })}
            {Object.keys(analytics?.dailyPageviews || {}).length === 0 && (
              <div className="flex-1 flex items-center justify-center h-32 text-muted-foreground">
                No data yet
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/ads"
          className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-colors group"
        >
          <Megaphone className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Manage Advertisements</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Create, edit, and monitor all your ads in one place.
          </p>
          <span className="text-sm text-primary group-hover:underline">View Ads →</span>
        </Link>

        <Link
          href="/admin/orders"
          className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-colors group"
        >
          <ShoppingCart className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Client Orders</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Review and manage ad purchase orders from clients.
          </p>
          <span className="text-sm text-primary group-hover:underline">View Orders →</span>
        </Link>

        <Link
          href="/admin/settings"
          className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-colors group"
        >
          <Calendar className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Site Settings</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Toggle maintenance mode and configure site settings.
          </p>
          <span className="text-sm text-primary group-hover:underline">Configure →</span>
        </Link>
      </div>
    </div>
  );
}