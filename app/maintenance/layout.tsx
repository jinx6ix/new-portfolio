import { getSettings } from '@/lib/db';
import MaintenancePage from '@/components/maintenance-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Under Maintenance',
};

export default async function MaintenanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  if (settings.maintenanceMode) {
    return <MaintenancePage />;
  }

  return <>{children}</>;
}