'use client';

import { useEffect, useState } from 'react';
import { Ad, AD_SIZES } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Image as ImageIcon,
  Megaphone,
  ExternalLink,
  BarChart3,
} from 'lucide-react';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
  approved: 'bg-green-500/20 text-green-500 border-green-500/30',
  rejected: 'bg-red-500/20 text-red-500 border-red-500/30',
  expired: 'bg-gray-500/20 text-gray-500 border-gray-500/30',
};

const statusIcons: Record<string, React.ElementType> = {
  pending: Clock,
  approved: CheckCircle,
  rejected: XCircle,
  expired: Clock,
};

export default function AdminAdsPage() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [activeTab, setActiveTab] = useState<'client' | 'google'>('client');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    websiteUrl: '',
    imageUrl: '',
    targetUrl: '',
    position: 'header' as Ad['position'],
    size: 'banner' as Ad['size'],
    status: 'pending' as Ad['status'],
    startDate: '',
    endDate: '',
  });

  const fetchAds = async () => {
    try {
      const res = await fetch('/api/admin/ads');
      const data = await res.json();
      setAds(data);
    } catch (error) {
      console.error('Error fetching ads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingAd ? `/api/admin/ads/${editingAd.id}` : '/api/admin/ads';
      const method = editingAd ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, adType: activeTab }),
      });

      if (res.ok) {
        await fetchAds();
        setIsModalOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving ad:', error);
    }
  };

  const handleEdit = (ad: Ad) => {
    setActiveTab((ad as any).adType === 'google_adsense' ? 'google' : 'client');
    setEditingAd(ad);
    setFormData({
      title: ad.title,
      description: ad.description,
      clientName: ad.clientName,
      clientEmail: ad.clientEmail,
      clientPhone: ad.clientPhone || '',
      websiteUrl: ad.websiteUrl || '',
      imageUrl: ad.imageUrl,
      targetUrl: ad.targetUrl,
      position: ad.position,
      size: ad.size,
      status: ad.status,
      startDate: ad.startDate.split('T')[0],
      endDate: ad.endDate.split('T')[0],
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this ad?')) return;
    try {
      await fetch(`/api/admin/ads/${id}`, { method: 'DELETE' });
      await fetchAds();
    } catch (error) {
      console.error('Error deleting ad:', error);
    }
  };

  const handleStatusChange = async (id: string, status: Ad['status']) => {
    try {
      await fetch(`/api/admin/ads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      await fetchAds();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const resetForm = () => {
    setEditingAd(null);
    setFormData({
      title: '',
      description: '',
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      websiteUrl: '',
      imageUrl: '',
      targetUrl: '',
      position: 'header',
      size: 'banner',
      status: 'pending',
      startDate: '',
      endDate: '',
    });
  };

  const clientAds = ads.filter(a => (a as any).adType !== 'google_adsense');
  const googleAds = ads.filter(a => (a as any).adType === 'google_adsense');

  const currentAds = activeTab === 'client' ? clientAds : googleAds;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Advertisements</h2>
          <p className="text-muted-foreground">Manage client ads and Google AdSense</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Client Ad
        </Button>
      </div>

      <div className="flex gap-2 border-b border-border pb-4">
        <button
          onClick={() => setActiveTab('client')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
            activeTab === 'client'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-accent'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          Client Ads ({clientAds.length})
        </button>
        <button
          onClick={() => setActiveTab('google')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
            activeTab === 'google'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-accent'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Google AdSense ({googleAds.length})
        </button>
      </div>

      {activeTab === 'client' && (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold">Client Ad Campaigns</h3>
            <p className="text-sm text-muted-foreground">Create and manage custom ad campaigns for your clients</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Preview</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Impressions</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientAds.map((ad) => {
                const StatusIcon = statusIcons[ad.status];
                return (
                  <TableRow key={ad.id}>
                    <TableCell>
                      <div className="w-16 h-12 bg-secondary rounded overflow-hidden flex items-center justify-center">
                        {ad.imageUrl ? (
                          <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px]">
                        <p className="font-medium truncate">{ad.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{ad.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[150px]">
                        <p className="font-medium truncate">{ad.clientName}</p>
                        <p className="text-xs text-muted-foreground truncate">{ad.clientEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {ad.position} - {ad.size}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`gap-1 ${statusColors[ad.status]}`}>
                        <StatusIcon className="w-3 h-3" />
                        {ad.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{ad.impressions.toLocaleString()}</TableCell>
                    <TableCell>{ad.clicks.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(ad)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(ad.id)} className="text-red-500 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {clientAds.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No client ads yet. Click "Create Client Ad" to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {activeTab === 'google' && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold">Google AdSense Integration</h3>
              <p className="text-sm text-muted-foreground">Your Google AdSense is configured and running</p>
            </div>
            <Badge className="ml-auto bg-green-500/20 text-green-500 border-green-500/30">Active</Badge>
          </div>

          <div className="bg-secondary rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-2">Publisher ID</p>
            <p className="font-mono">ca-pub-7196326660809754</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-secondary rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Auto Ads</p>
              <p className="text-2xl font-bold">Enabled</p>
            </div>
            <div className="bg-secondary rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Ad Slots</p>
              <p className="text-2xl font-bold">{googleAds.length}</p>
            </div>
            <div className="bg-secondary rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Estimated Revenue</p>
              <p className="text-2xl font-bold">$0.00</p>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h4 className="font-semibold mb-4">Google Ad Placement</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Place these tags in your site to display Google AdSense ads:
            </p>
            <div className="bg-secondary rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre>{`{/* Google Auto Ads */}
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7196326660809754" crossOrigin="anonymous"></script>

{/* In-content Ad */}
<ins className="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-7196326660809754"
     data-ad-slot="YOUR_SLOT_ID"
     data-ad-format="auto"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`}</pre>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-sm text-yellow-500 font-medium">
              Note: Google AdSense ads are automatically managed by Google. To configure ad types and placement,
              use your Google AdSense dashboard at adsense.google.com
            </p>
          </div>
        </div>
      )}

      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-semibold mb-4">Quick Stats</h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Ads</p>
            <p className="text-2xl font-bold">{ads.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-2xl font-bold text-green-500">
              {ads.filter(a => a.status === 'approved').length}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-yellow-500">
              {ads.filter(a => a.status === 'pending').length}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Clicks</p>
            <p className="text-2xl font-bold">
              {ads.reduce((sum, a) => sum + a.clicks, 0)}
            </p>
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingAd ? 'Edit Client Ad' : 'Create New Client Ad'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ad Title *</Label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Summer Sale 2024" required />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as Ad['status'] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description *</Label>
              <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe your advertisement..." required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Client Name *</Label>
                <Input value={formData.clientName} onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label>Client Email *</Label>
                <Input type="email" value={formData.clientEmail} onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })} placeholder="john@example.com" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Client Phone</Label>
                <Input value={formData.clientPhone} onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })} placeholder="+1 234 567 8900" />
              </div>
              <div className="space-y-2">
                <Label>Website URL</Label>
                <Input value={formData.websiteUrl} onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })} placeholder="https://example.com" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Image URL *</Label>
                <Input value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} placeholder="https://example.com/ad-image.jpg" required />
              </div>
              <div className="space-y-2">
                <Label>Target URL *</Label>
                <Input value={formData.targetUrl} onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })} placeholder="https://client-site.com/promo" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Position</Label>
                <Select value={formData.position} onValueChange={(v) => setFormData({ ...formData, position: v as Ad['position'] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="header">Header</SelectItem>
                    <SelectItem value="sidebar">Sidebar</SelectItem>
                    <SelectItem value="footer">Footer</SelectItem>
                    <SelectItem value="in-content">In-Content</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Size</Label>
                <Select value={formData.size} onValueChange={(v) => setFormData({ ...formData, size: v as Ad['size'] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small ({AD_SIZES.small.width}x{AD_SIZES.small.height})</SelectItem>
                    <SelectItem value="medium">Medium ({AD_SIZES.medium.width}x{AD_SIZES.medium.height})</SelectItem>
                    <SelectItem value="large">Large ({AD_SIZES.large.width}x{AD_SIZES.large.height})</SelectItem>
                    <SelectItem value="banner">Banner ({AD_SIZES.banner.width}x{AD_SIZES.banner.height})</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>End Date *</Label>
                <Input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} required />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit">{editingAd ? 'Update Ad' : 'Create Ad'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}