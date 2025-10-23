# Deployment Checklist

## Pre-Deployment Tasks

### 1. Google Analytics Setup
- [ ] Create Google Analytics account
- [ ] Create new property for your website
- [ ] Get Measurement ID (G-XXXXXXXXXX)
- [ ] Update `/app/layout.tsx` with your GA ID (2 places)
- [ ] Test analytics tracking in development

### 2. Email Service Setup
Choose one:

**SendGrid:**
- [ ] Create SendGrid account
- [ ] Get API key
- [ ] Update `/app/api/booking/route.ts`
- [ ] Update `/app/api/contact/route.ts`
- [ ] Test email sending

**Mailgun:**
- [ ] Create Mailgun account
- [ ] Get API credentials
- [ ] Update API routes
- [ ] Test email sending

**Resend:**
- [ ] Create Resend account
- [ ] Get API key
- [ ] Update API routes
- [ ] Test email sending

### 3. WhatsApp Integration (Twilio)
- [ ] Create Twilio account
- [ ] Set up WhatsApp Business Account
- [ ] Get Account SID and Auth Token
- [ ] Get WhatsApp number
- [ ] Update `/app/api/booking/route.ts`
- [ ] Test WhatsApp notifications

### 4. Social Media Setup
- [ ] Update TikTok URL: `https://www.tiktok.com/@ianiraya`
- [ ] Update Instagram URL: `https://www.instagram.com/ianiraya`
- [ ] Update Twitter URL: `https://twitter.com/ianiraya`
- [ ] Update LinkedIn URL: `https://linkedin.com/in/ianiraya`
- [ ] Add TikTok video embeds in `/app/social/page.tsx`
- [ ] Add Instagram post embeds in `/app/social/page.tsx`
- [ ] Test social media embeds

### 5. Content Updates
- [ ] Update profile photo
- [ ] Update testimonials
- [ ] Add blog posts (at least 5)
- [ ] Add portfolio projects (at least 8)
- [ ] Update service descriptions
- [ ] Update pricing if needed
- [ ] Update FAQs
- [ ] Update contact information

### 6. SEO Verification
- [ ] Verify sitemap.xml is accessible
- [ ] Verify robots.txt is correct
- [ ] Check all meta tags
- [ ] Verify schema markup
- [ ] Test with Google Search Console
- [ ] Test with Bing Webmaster Tools

### 7. Testing
- [ ] Test booking form
- [ ] Test contact form
- [ ] Test email notifications
- [ ] Test WhatsApp notifications
- [ ] Test analytics tracking
- [ ] Test social media embeds
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Test page load speed
- [ ] Test all links

### 8. Environment Variables
- [ ] Create `.env.local` file
- [ ] Add NEXT_PUBLIC_GA_ID
- [ ] Add email service API key
- [ ] Add Twilio credentials
- [ ] Verify all variables are set

### 9. Vercel Setup (if deploying to Vercel)
- [ ] Create Vercel account
- [ ] Connect GitHub repository
- [ ] Add environment variables in Vercel dashboard
- [ ] Configure domain (if using custom domain)
- [ ] Set up SSL certificate
- [ ] Configure redirects if needed

### 10. Final Checks
- [ ] All pages load correctly
- [ ] All forms work
- [ ] All links work
- [ ] Analytics tracking works
- [ ] Email notifications work
- [ ] WhatsApp notifications work
- [ ] Social media embeds work
- [ ] Mobile responsive
- [ ] Fast page load times
- [ ] No console errors

## Deployment Steps

### Step 1: Build
\`\`\`bash
npm run build
\`\`\`

### Step 2: Test Build Locally
\`\`\`bash
npm run start
\`\`\`

### Step 3: Push to GitHub
\`\`\`bash
git add .
git commit -m "Ready for deployment"
git push origin main
\`\`\`

### Step 4: Deploy to Vercel
1. Go to Vercel dashboard
2. Click "New Project"
3. Select your GitHub repository
4. Add environment variables
5. Click "Deploy"

### Step 5: Verify Deployment
- [ ] Website loads correctly
- [ ] All pages accessible
- [ ] Forms work
- [ ] Analytics tracking works
- [ ] Emails send
- [ ] WhatsApp notifications work

## Post-Deployment Tasks

### Week 1
- [ ] Monitor analytics
- [ ] Check for errors in logs
- [ ] Verify all forms working
- [ ] Test all integrations
- [ ] Monitor email delivery
- [ ] Monitor WhatsApp delivery

### Week 2-4
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Monitor search rankings
- [ ] Analyze user behavior
- [ ] Optimize based on analytics
- [ ] Add more content

### Month 2+
- [ ] Regular content updates
- [ ] Monitor analytics monthly
- [ ] Update blog regularly
- [ ] Monitor search rankings
- [ ] Optimize for conversions
- [ ] Scale and expand

## Troubleshooting

### Analytics Not Tracking
- [ ] Verify GA ID is correct
- [ ] Check browser console for errors
- [ ] Verify gtag script is loaded
- [ ] Check Google Analytics dashboard

### Emails Not Sending
- [ ] Verify email service API key
- [ ] Check email service logs
- [ ] Verify email templates
- [ ] Test with sample data

### WhatsApp Not Working
- [ ] Verify Twilio credentials
- [ ] Check Twilio logs
- [ ] Verify phone number format
- [ ] Test with sample message

### Social Media Embeds Not Showing
- [ ] Verify embed scripts are loaded
- [ ] Check social media URLs
- [ ] Ensure accounts are public
- [ ] Check browser console for errors

## Support

For issues:
1. Check logs in Vercel dashboard
2. Check browser console
3. Review API route logs
4. Test with sample data
5. Verify environment variables

---

**Last Updated:** January 23, 2025
