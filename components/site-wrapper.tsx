'use client';

import Navigation from './navigation';
import HeaderAdBanner from './ads/header-ad-banner';
import Footer from './footer';

export default function SiteWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <HeaderAdBanner />
      {children}
      <Footer />
    </>
  );
}