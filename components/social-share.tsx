'use client';

import { useState } from 'react';
import { Share2, Check, Twitter, Linkedin, Facebook, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { trackEvent } from './analytics-provider';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
  className?: string;
}

export default function SocialShare({ url, title, description, image, className = '' }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl = `${window.location.origin}${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    trackEvent('social_share', { platform: 'copy_link' });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    trackEvent('social_share', { platform });
    window.open(shareLinks[platform as keyof typeof shareLinks], '_blank', 'width=600,height=400');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className={`gap-2 ${className}`}>
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-3">
        <div className="space-y-2">
          <p className="text-sm font-medium mb-3">Share this page</p>

          <button
            onClick={() => handleShare('twitter')}
            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-accent transition-colors"
            data-social-share="true"
            data-platform="twitter"
          >
            <Twitter className="w-5 h-5 text-[#1DA1F2]" />
            <span className="text-sm">Twitter</span>
          </button>

          <button
            onClick={() => handleShare('facebook')}
            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-accent transition-colors"
            data-social-share="true"
            data-platform="facebook"
          >
            <Facebook className="w-5 h-5 text-[#4267B2]" />
            <span className="text-sm">Facebook</span>
          </button>

          <button
            onClick={() => handleShare('linkedin')}
            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-accent transition-colors"
            data-social-share="true"
            data-platform="linkedin"
          >
            <Linkedin className="w-5 h-5 text-[#0077B5]" />
            <span className="text-sm">LinkedIn</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Link2 className="w-5 h-5" />
            )}
            <span className="text-sm">{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function SocialShareButtons({ url, title, description, className = '' }: SocialShareProps) {
  const fullUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleShare = (platform: string) => {
    trackEvent('social_share', { platform });
    window.open(shareLinks[platform as keyof typeof shareLinks], '_blank', 'width=600,height=400');
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-muted-foreground mr-2">Share:</span>

      <button
        onClick={() => handleShare('twitter')}
        className="p-2 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-colors"
        aria-label="Share on Twitter"
        data-social-share="true"
        data-platform="twitter"
      >
        <Twitter className="w-4 h-4" />
      </button>

      <button
        onClick={() => handleShare('facebook')}
        className="p-2 rounded-full bg-[#4267B2]/10 text-[#4267B2] hover:bg-[#4267B2]/20 transition-colors"
        aria-label="Share on Facebook"
        data-social-share="true"
        data-platform="facebook"
      >
        <Facebook className="w-4 h-4" />
      </button>

      <button
        onClick={() => handleShare('linkedin')}
        className="p-2 rounded-full bg-[#0077B5]/10 text-[#0077B5] hover:bg-[#0077B5]/20 transition-colors"
        aria-label="Share on LinkedIn"
        data-social-share="true"
        data-platform="linkedin"
      >
        <Linkedin className="w-4 h-4" />
      </button>

      <button
        onClick={async () => {
          await navigator.clipboard.writeText(fullUrl);
          trackEvent('social_share', { platform: 'copy_link' });
        }}
        className="p-2 rounded-full bg-secondary hover:bg-accent transition-colors"
        aria-label="Copy link"
      >
        <Link2 className="w-4 h-4" />
      </button>
    </div>
  );
}