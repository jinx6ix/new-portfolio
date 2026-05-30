'use client';

import { useEffect, useState } from 'react';
import { Ad, AD_SIZES } from '@/lib/types';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface AdUnitProps {
  position: Ad['position'];
  size: Ad['size'];
  className?: string;
}

export default function AdUnit({ position, size, className = '' }: AdUnitProps) {
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await fetch(`/api/ads/active?position=${position}`);
        const ads = await res.json();
        const filtered = ads.filter((a: Ad) => a.size === size);
        if (filtered.length > 0) {
          setAd(filtered[0]);
          trackImpression(filtered[0].id);
        }
      } catch (error) {
        console.error('Error fetching ad:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
    const interval = setInterval(fetchAd, 30000);
    return () => clearInterval(interval);
  }, [position, size]);

  const trackImpression = async (adId: string) => {
    try {
      await fetch('/api/ads/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adId, action: 'impression' }),
      });
    } catch (error) {
      console.error('Error tracking impression:', error);
    }
  };

  const trackClick = async (adId: string) => {
    try {
      await fetch('/api/ads/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adId, action: 'click' }),
      });
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  const handleClick = () => {
    if (ad) {
      trackClick(ad.id);
      window.open(ad.targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading || !ad) {
    return (
      <div
        className={`bg-secondary/50 border border-border rounded-lg flex items-center justify-center ${className}`}
        style={{ width: AD_SIZES[size].width, height: AD_SIZES[size].height }}
      >
        <span className="text-xs text-muted-foreground">Advertisement</span>
      </div>
    );
  }

  return (
    <div
      className={`group cursor-pointer relative overflow-hidden rounded-lg border border-border hover:border-primary/50 transition-colors ${className}`}
      style={{ width: AD_SIZES[size].width, height: AD_SIZES[size].height }}
      onClick={handleClick}
    >
      <img
        src={ad.imageUrl}
        alt={ad.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 px-3 py-1.5 rounded-lg flex items-center gap-2">
          <ExternalLink className="w-4 h-4" />
          <span className="text-sm font-medium">Visit Site</span>
        </div>
      </div>
    </div>
  );
}

export function HeaderAd({ className = '' }: { className?: string }) {
  return <AdUnit position="header" size="banner" className={className} />;
}

export function SidebarAd({ className = '' }: { className?: string }) {
  return <AdUnit position="sidebar" size="medium" className={className} />;
}

export function FooterAd({ className = '' }: { className?: string }) {
  return <AdUnit position="footer" size="large" className={className} />;
}

export function InContentAd({ className = '' }: { className?: string }) {
  return <AdUnit position="in-content" size="banner" className={className} />;
}