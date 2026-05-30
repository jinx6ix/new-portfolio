'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Megaphone,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/ads', label: 'Ads', icon: Megaphone },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-card border-r border-border">
      <div className="p-6 border-b border-border">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-lg font-bold text-primary-foreground">A</span>
          </div>
          <div>
            <h2 className="font-bold text-lg">Ad Manager</h2>
            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
          </div>
        </Link>
      </div>

      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === '/admin'
            ? window.location.pathname === '/admin'
            : window.location.pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Back to Site
        </Link>
      </div>
    </aside>
  );
}