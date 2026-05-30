import { getActiveAds } from '@/lib/db';
import AdDisplay from '@/components/ads/ad-display';

export const metadata = {
  title: 'Advertise With Us | Reach Your Audience',
  description: 'Connect with engaged users through our premium advertising platform. View our advertising packages and pricing.',
};

export default async function AdsPage() {
  const activeAds = await getActiveAds();

  return <AdDisplay activeAds={activeAds} />;
}