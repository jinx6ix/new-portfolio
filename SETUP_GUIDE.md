# Ian Iraya Portfolio - Complete Setup Guide

## Overview
This is a comprehensive, SEO-optimized portfolio website for Ian Iraya featuring web development, cybersecurity, and SEO services with integrated booking, analytics, and social media features.

## Features Implemented

### 1. **Pricing & Booking System**
- **Location:** `/pricing` and `/booking`
- **Features:**
  - 8 service packages across all service categories
  - Friendly pricing in KES (Kenyan Shillings)
  - Booking form with email and WhatsApp integration
  - Analytics tracking for all booking interactions
  - Automatic email confirmations to both client and admin
  - WhatsApp notifications for bookings

### 2. **Analytics Tracking**
- **Location:** `/lib/analytics.ts` and `/components/analytics-provider.tsx`
- **Features:**
  - Google Analytics integration (replace `G-XXXXXXXXXX` with your GA ID)
  - Button click tracking
  - Page view tracking
  - Scroll depth tracking (25%, 50%, 75%, 100%)
  - Form submission tracking
  - Service booking tracking
  - Social media link tracking
  - Custom event tracking for all user interactions

### 3. **Social Media Integration**
- **Location:** `/social`
- **Features:**
  - TikTok video embeds
  - Instagram post embeds
  - Twitter/X feed integration
  - LinkedIn profile link
  - Social media widget component
  - Analytics tracking for social clicks

### 4. **SEO Optimization**
- **Location:** `/seo-tools` and `/api/seo-metadata`
- **Features:**
  - AI-powered SEO tools page
  - Schema markup generation (Organization, Service, Article, FAQ, Local Business)
  - Sitemap generation (both XML and TypeScript)
  - Robots.txt configuration
  - Breadcrumb schema
  - Open Graph meta tags
  - Twitter Card meta tags
  - Canonical URLs

### 5. **Email & WhatsApp Integration**
- **Location:** `/api/booking` and `/api/contact`
- **Features:**
  - Booking form submissions sent to `jinxed435@gmail.com`
  - WhatsApp notifications to `+254757662968`
  - HTML email templates
  - Contact form integration
  - Automatic confirmations

### 6. **Navigation Updates**
- **Location:** `/components/navigation.tsx`
- **New Links:**
  - Pricing
  - Booking
  - Social Media
  - SEO Tools
  - Book Now CTA button

## Setup Instructions

### 1. Google Analytics Setup
1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new property for your website
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)
4. Replace `G-XXXXXXXXXX` in:
   - `/app/layout.tsx` (2 places)
   - `/lib/analytics.ts` (if using custom tracking)

### 2. Email Integration Setup
Choose one of these services:

**Option A: SendGrid**
1. Sign up at [SendGrid](https://sendgrid.com)
2. Get your API key
3. Update `/app/api/booking/route.ts` with SendGrid integration

**Option B: Mailgun**
1. Sign up at [Mailgun](https://mailgun.com)
2. Get your API credentials
3. Update `/app/api/booking/route.ts` with Mailgun integration

**Option C: Resend**
1. Sign up at [Resend](https://resend.com)
2. Get your API key
3. Update `/app/api/booking/route.ts` with Resend integration

### 3. WhatsApp Integration Setup
1. Sign up at [Twilio](https://www.twilio.com/whatsapp)
2. Get your account credentials
3. Update `/app/api/booking/route.ts` with Twilio WhatsApp integration

### 4. Social Media Links
Update these URLs with your actual social media profiles:
- TikTok: `https://www.tiktok.com/@ianiraya`
- Instagram: `https://www.instagram.com/ianiraya`
- Twitter: `https://twitter.com/ianiraya`
- LinkedIn: `https://linkedin.com/in/ianiraya`

### 5. Social Media Embeds
In `/app/social/page.tsx`, replace placeholder URLs with your actual:
- TikTok video URLs
- Instagram post URLs
- Twitter tweet URLs

### 6. Environment Variables
Create a `.env.local` file with:
\`\`\`
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
SENDGRID_API_KEY=your_sendgrid_key
MAILGUN_API_KEY=your_mailgun_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_WHATSAPP_NUMBER=your_twilio_number
\`\`\`

## Page Structure

### Public Pages
- `/` - Homepage with hero, services, projects, pricing overview
- `/about` - Personal branding and background
- `/services` - Services overview
- `/services/web-development` - Web development details
- `/services/cybersecurity` - Cybersecurity details
- `/services/seo` - SEO details
- `/services/hosting` - Hosting details
- `/portfolio` - Project showcase with filtering
- `/portfolio/[slug]` - Individual project details
- `/blog` - Blog listing with search and filtering
- `/blog/[slug]` - Individual blog posts
- `/faqs` - Frequently asked questions
- `/pricing` - Service pricing and packages
- `/booking` - Service booking form
- `/social` - Social media feeds and links
- `/seo-tools` - AI-powered SEO tools
- `/contact` - Contact form

### API Routes
- `/api/booking` - Booking form submissions
- `/api/contact` - Contact form submissions
- `/api/seo-metadata` - SEO schema generation

## Analytics Events Tracked

### Button Clicks
- `button_click` - Any button on the site
- `pricing_service_selected` - Service selection on pricing page
- `booking_form_submitted` - Booking form submission
- `booking_success` - Successful booking
- `booking_error` - Booking error

### Navigation
- `navigation_clicked` - Navigation menu clicks
- `social_link_clicked` - Social media link clicks
- `social_widget_clicked` - Social media widget clicks

### Page Interactions
- `service_card_clicked` - Service card clicks
- `featured_project_clicked` - Featured project clicks
- `view_all_projects_clicked` - View all projects button
- `homepage_view_work_clicked` - View work CTA
- `homepage_book_service_clicked` - Book service CTA
- `homepage_pricing_clicked` - Pricing link
- `homepage_booking_cta_clicked` - Booking CTA
- `homepage_seo_tools_clicked` - SEO tools link
- `homepage_final_cta_clicked` - Final CTA

### Scroll & Time
- `scroll_depth` - Scroll depth tracking (25%, 50%, 75%, 100%)
- `time_on_page` - Time spent on page

## SEO Features

### Schema Markup
- Organization schema
- Service schema
- Article schema
- FAQ schema
- Breadcrumb schema
- Local business schema

### Meta Tags
- Title tags (unique per page)
- Meta descriptions
- Open Graph tags
- Twitter Card tags
- Canonical URLs

### Sitemap & Robots
- Dynamic sitemap generation
- Robots.txt configuration
- Proper crawl directives

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
1. Build: `npm run build`
2. Start: `npm run start`
3. Add environment variables to your hosting platform

## Customization

### Update Contact Information
- Email: `jinxed435@gmail.com` (update in `/app/booking/page.tsx`, `/app/api/booking/route.ts`)
- WhatsApp: `+254757662968` (update in `/app/booking/page.tsx`, `/app/api/booking/route.ts`)
- Location: Kiambu, Githunguri, Kenya (update in `/app/layout.tsx`, `/lib/seo-schema.ts`)

### Update Pricing
Edit `/app/pricing/page.tsx` to modify:
- Service names
- Prices
- Features
- Descriptions

### Update Blog Posts
Add new blog posts in `/app/blog/[slug]/page.tsx` with proper metadata and schema markup.

### Update Portfolio Projects
Add new projects in `/app/portfolio/[slug]/page.tsx` with images and descriptions.

## Performance Optimization

- Images optimized with Next.js Image component
- CSS-in-JS with Tailwind CSS v4
- Server-side rendering for SEO
- Static generation where possible
- Analytics loaded asynchronously
- Social media embeds loaded on demand

## Security

- Environment variables for sensitive data
- CORS headers configured
- Input validation on forms
- SQL injection prevention (if using database)
- XSS protection with Next.js

## Maintenance

### Regular Updates
- Update blog posts weekly
- Update portfolio projects monthly
- Monitor analytics monthly
- Check SEO rankings monthly
- Update social media links as needed

### Monitoring
- Google Analytics dashboard
- Search Console for SEO
- Email notifications for bookings
- WhatsApp notifications for bookings

## Support & Troubleshooting

### Common Issues

**Analytics not tracking:**
- Verify GA ID is correct
- Check browser console for errors
- Ensure gtag script is loaded

**Emails not sending:**
- Verify email service API key
- Check email templates
- Review email service logs

**Social media embeds not showing:**
- Verify embed scripts are loaded
- Check social media URLs
- Ensure accounts are public

**Booking form not working:**
- Check API route logs
- Verify email service configuration
- Test WhatsApp integration

## Next Steps

1. Set up Google Analytics
2. Configure email service
3. Set up WhatsApp integration
4. Update social media links
5. Add your actual blog posts
6. Add your actual portfolio projects
7. Deploy to Vercel
8. Monitor analytics and bookings
9. Optimize based on user behavior
10. Scale and expand services

---

**Last Updated:** January 23, 2025
**Version:** 1.0
