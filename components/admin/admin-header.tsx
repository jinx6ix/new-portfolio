'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Bell, Search, User } from 'lucide-react';

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/ads': 'Manage Ads',
  '/admin/orders': 'Orders',
  '/admin/analytics': 'Analytics',
  '/admin/settings': 'Settings',
};

export default function AdminHeader() {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);

  const getPageTitle = () => {
    if (pathname.startsWith('/admin/ads')) return 'Manage Ads';
    if (pathname.startsWith('/admin/orders')) return 'Orders';
    if (pathname.startsWith('/admin/analytics')) return 'Analytics';
    if (pathname.startsWith('/admin/settings')) return 'Settings';
    return 'Dashboard';
  };

  return (
    <header className="sticky top-0 z-30 bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{getPageTitle()}</h1>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-secondary rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}