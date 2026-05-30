'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle, RefreshCw, Wrench, ExternalLink } from 'lucide-react';

interface Settings {
  maintenanceMode: boolean;
  maintenanceMessage?: string;
  googleAdsenseId?: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    maintenanceMode: false,
    maintenanceMessage: 'We are currently under maintenance. Please check back soon.',
    googleAdsenseId: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Settings saved successfully!' });
      } else {
        setMessage({ type: 'error', text: 'Failed to save settings.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while saving.' });
    } finally {
      setSaving(false);
    }
  };

  const toggleMaintenance = async () => {
    const newMode = !settings.maintenanceMode;
    setSettings({ ...settings, maintenanceMode: newMode });

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...settings, maintenanceMode: newMode }),
      });

      if (res.ok) {
        setMessage({
          type: 'success',
          text: newMode
            ? 'Maintenance mode ENABLED - Site is now offline for visitors.'
            : 'Maintenance mode DISABLED - Site is now live.'
        });
      } else {
        setSettings({ ...settings, maintenanceMode: !newMode });
        setMessage({ type: 'error', text: 'Failed to toggle maintenance mode.' });
      }
    } catch (error) {
      setSettings({ ...settings, maintenanceMode: !newMode });
      setMessage({ type: 'error', text: 'An error occurred.' });
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-48 bg-card rounded-xl" />
        <div className="h-48 bg-card rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">Configure your site settings</p>
      </div>

      {message && (
        <div className={`flex items-center gap-3 p-4 rounded-lg ${
          message.type === 'success'
            ? 'bg-green-500/20 text-green-500 border border-green-500/30'
            : 'bg-red-500/20 text-red-500 border border-red-500/30'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          {message.text}
        </div>
      )}

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border bg-yellow-500/10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <Wrench className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Maintenance Mode</h3>
              <p className="text-sm text-muted-foreground">
                When enabled, visitors will see a maintenance page instead of your site.
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Enable Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground mt-1">
                {settings.maintenanceMode
                  ? 'Site is currently showing maintenance page to visitors.'
                  : 'Site is live and accessible to visitors.'}
              </p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={toggleMaintenance}
              className={settings.maintenanceMode ? 'bg-yellow-500' : ''}
            />
          </div>

          {settings.maintenanceMode && (
            <div className="space-y-2">
              <Label>Maintenance Message</Label>
              <textarea
                value={settings.maintenanceMessage || ''}
                onChange={(e) => setSettings({ ...settings, maintenanceMessage: e.target.value })}
                placeholder="Enter a message to show visitors during maintenance..."
                className="w-full min-h-[100px] px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold">Google Adsense</h3>
          <p className="text-sm text-muted-foreground">
            Configure your Google Adsense publisher ID for ad monetization.
          </p>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <Label>Adsense Publisher ID</Label>
            <div className="flex gap-2">
              <Input
                value={settings.googleAdsenseId || ''}
                onChange={(e) => setSettings({ ...settings, googleAdsenseId: e.target.value })}
                placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={() => window.open('https://www.google.com/adsense', '_blank')}
                className="gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Adsense
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Found in your Google Adsense account settings. Format: ca-pub-XXXXXXXXXXXXXXXX
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold">Site Information</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Site URL</p>
              <p className="font-medium">https://new-portfolio-kappa-sand.vercel.app</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ads Page</p>
              <a href="/ads" className="text-primary hover:underline">View Advertising Page</a>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Client Orders</p>
              <a href="/admin/orders" className="text-primary hover:underline">View Orders</a>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Manage Ads</p>
              <a href="/admin/ads" className="text-primary hover:underline">View All Ads</a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={fetchSettings} className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Reload
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
}