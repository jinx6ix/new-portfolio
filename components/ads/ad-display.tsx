'use client';

import { useState } from 'react';
import { Ad, AD_PRICING, AD_SIZES } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CheckCircle,
  Megaphone,
  MousePointerClick,
  Target,
  TrendingUp,
  Zap,
  Users,
  Globe,
  Calendar,
} from 'lucide-react';

interface AdDisplayProps {
  activeAds: Ad[];
}

const features = [
  { icon: Target, title: 'Targeted Reach', description: 'Reach your ideal audience with precise targeting options' },
  { icon: TrendingUp, title: 'Real-time Analytics', description: 'Track impressions, clicks, and conversions in real-time' },
  { icon: Zap, title: 'Instant Activation', description: 'Your ads go live immediately after approval' },
  { icon: MousePointerClick, title: 'High Engagement', description: 'Connect with an engaged and active audience' },
];

export default function AdDisplay({ activeAds }: AdDisplayProps) {
  const [selectedPricing, setSelectedPricing] = useState(AD_PRICING[0]);
  const [duration, setDuration] = useState(7);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    companyName: '',
    websiteUrl: '',
    adTitle: '',
    adDescription: '',
    adTargetUrl: '',
    adImageUrl: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalPrice = selectedPricing.pricePerDay * duration;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          adPosition: selectedPricing.position,
          adSize: selectedPricing.size,
          duration,
          totalPrice,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      companyName: '',
      websiteUrl: '',
      adTitle: '',
      adDescription: '',
      adTargetUrl: '',
      adImageUrl: '',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 px-4 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="outline" className="mb-4 px-4 py-1">
            <Megaphone className="w-4 h-4 mr-2" />
            Advertising Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Reach Your Audience with <span className="text-primary">Powerful Ads</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Connect with engaged users through our premium advertising platform.
            Get your brand in front of the right people.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Megaphone className="w-5 h-5" />
                Get Started
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Order Your Ad</DialogTitle>
              </DialogHeader>
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Order Submitted!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for your order. We will review it and get back to you within 24 hours.
                  </p>
                  <Button onClick={resetForm}>Place Another Order</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Your Name *</Label>
                      <Input
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        value={formData.clientEmail}
                        onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        value={formData.clientPhone}
                        onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company Name</Label>
                      <Input
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Website URL</Label>
                    <Input
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div className="border-t border-border pt-6">
                    <h4 className="font-semibold mb-4">Ad Configuration</h4>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Ad Placement</Label>
                        <Select
                          value={`${selectedPricing.position}-${selectedPricing.size}`}
                          onValueChange={(v) => {
                            const [pos, size] = v.split('-');
                            const pricing = AD_PRICING.find(p => p.position === pos && p.size === size);
                            if (pricing) setSelectedPricing(pricing);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {AD_PRICING.map((p, i) => (
                              <SelectItem key={i} value={`${p.position}-${p.size}`}>
                                {p.position} ({p.size}) - ${p.pricePerDay}/day
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Duration (Days)</Label>
                        <Select value={duration.toString()} onValueChange={(v) => setDuration(Number(v))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7">7 Days</SelectItem>
                            <SelectItem value="14">14 Days</SelectItem>
                            <SelectItem value="30">30 Days</SelectItem>
                            <SelectItem value="90">90 Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-secondary rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-muted-foreground">Price per day</span>
                        <span>${selectedPricing.pricePerDay}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-muted-foreground">Duration</span>
                        <span>{duration} days</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-border font-bold text-lg">
                        <span>Total</span>
                        <span className="text-primary">${totalPrice}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Ad Title *</Label>
                    <Input
                      value={formData.adTitle}
                      onChange={(e) => setFormData({ ...formData, adTitle: e.target.value })}
                      placeholder="Your ad headline"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Ad Description *</Label>
                    <textarea
                      value={formData.adDescription}
                      onChange={(e) => setFormData({ ...formData, adDescription: e.target.value })}
                      placeholder="Describe what you're advertising..."
                      className="w-full min-h-[100px] px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Target URL *</Label>
                    <Input
                      value={formData.adTargetUrl}
                      onChange={(e) => setFormData({ ...formData, adTargetUrl: e.target.value })}
                      placeholder="https://your-landing-page.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Ad Image URL</Label>
                    <Input
                      value={formData.adImageUrl}
                      onChange={(e) => setFormData({ ...formData, adImageUrl: e.target.value })}
                      placeholder="https://your-image.jpg (optional)"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                    {submitting ? 'Submitting...' : `Order Now - $${totalPrice}`}
                  </Button>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Advertise With Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="p-6 bg-card rounded-xl border border-border text-center">
                  <div className="w-14 h-14 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Advertising Packages</h2>
          <p className="text-muted-foreground text-center mb-12">Choose the perfect placement for your brand</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AD_PRICING.map((pricing, i) => (
              <div key={i} className="bg-background rounded-xl border border-border p-6 hover:border-primary transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="capitalize">{pricing.position}</Badge>
                  <span className="text-2xl font-bold">${pricing.pricePerDay}<span className="text-sm text-muted-foreground">/day</span></span>
                </div>
                <p className="text-muted-foreground mb-4">{pricing.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size</span>
                    <span className="capitalize">{pricing.size} ({AD_SIZES[pricing.size].width}x{AD_SIZES[pricing.size].height})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">7 days</span>
                    <span className="font-medium">${pricing.pricePerDay * 7}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">30 days</span>
                    <span className="font-medium">${pricing.pricePerDay * 30}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Our Statistics</h2>
          <p className="text-muted-foreground mb-8">Join our growing network of advertisers</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{activeAds.length}+</div>
              <p className="text-muted-foreground">Active Ads</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">10K+</div>
              <p className="text-muted-foreground">Monthly Impressions</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">500+</div>
              <p className="text-muted-foreground">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">99%</div>
              <p className="text-muted-foreground">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {activeAds.length > 0 && (
        <section className="py-16 px-4 bg-secondary/50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Our Partners</h2>
            <p className="text-muted-foreground mb-8">Trusted by leading brands</p>
            <div className="flex flex-wrap justify-center gap-8">
              {activeAds.slice(0, 6).map((ad) => (
                <div key={ad.id} className="p-4 bg-background rounded-lg border border-border min-w-[150px]">
                  <p className="font-medium">{ad.clientName}</p>
                  <p className="text-xs text-muted-foreground capitalize">{ad.position} Ad</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 px-4 bg-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8">
            Create your ad campaign today and reach thousands of engaged users.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Megaphone className="w-5 h-5" />
                Start Advertising
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Your Ad Campaign</DialogTitle>
              </DialogHeader>
              <p className="text-muted-foreground">Fill out the form above to get started with your advertising campaign.</p>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Advertising Platform powered by Ian Iraya</p>
          <p className="mt-2">Contact us to discuss custom advertising solutions</p>
        </div>
      </footer>
    </div>
  );
}