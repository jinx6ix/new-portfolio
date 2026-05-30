'use client';

import { useEffect, useState } from 'react';
import { Ad, AD_SIZES } from '@/lib/types';
import { ExternalLink, X, Megaphone } from 'lucide-react';
import Link from 'next/link';

export default function HeaderAdBanner() {
  const [ad, setAd] = useState<Ad | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const dismissedBanner = sessionStorage.getItem('header_ad_dismissed');
    if (dismissedBanner) {
      setDismissed(true);
      return;
    }

    const fetchAd = async () => {
      try {
        const res = await fetch('/api/ads/active?position=header');
        const ads = await res.json();
        const clientAds = ads.filter((a: Ad) => a.adType !== 'google_adsense');
        if (clientAds.length > 0) {
          setAd(clientAds[0]);
          trackImpression(clientAds[0].id);
        }
      } catch (error) {
        console.error('Error fetching header ad:', error);
      }
    };

    fetchAd();

    const interval = setInterval(fetchAd, 60000);
    return () => clearInterval(interval);
  }, []);

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

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('header_ad_dismissed', 'true');
  };

  if (dismissed || !ad) return null;

  return (
    <div className="bg-secondary/80 border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-12 gap-4">
          <button
            onClick={handleDismiss}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
            aria-label="Dismiss ad"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex-1 flex items-center gap-3 overflow-hidden">
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <Megaphone className="w-3 h-3" />
              <span>Ad</span>
            </div>

            <a
              href={ad.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick(ad.id)}
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors truncate"
            >
              <span>{ad.title}</span>
              <ExternalLink className="w-3 h-3 flex-shrink-0" />
            </a>
          </div>

          <Link
            href="/ads"
            className="text-xs text-muted-foreground hover:text-primary transition-colors hidden sm:block"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
}