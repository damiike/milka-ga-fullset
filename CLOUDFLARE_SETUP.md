# Cloudflare Pages Cookie-Free Domain Setup

## Overview
This project is configured to use a cookie-free subdomain for static assets to optimize performance by eliminating unnecessary cookie overhead on asset requests.

## Setup Instructions

### 1. Create Subdomain in Cloudflare Dashboard

1. Go to your Cloudflare dashboard
2. Select your domain (milkacollective.com)
3. Navigate to **DNS** → **Records**
4. Add a new **CNAME** record:
   - **Name**: `static`
   - **Target**: `milkacollective.pages.dev` (or your Cloudflare Pages domain)
   - **Proxy status**: Proxied (orange cloud)

### 2. Configure Cloudflare Pages

1. Go to **Pages** in Cloudflare dashboard
2. Select your project
3. Go to **Settings** → **Custom domains**
4. Add custom domain: `static.milkacollective.com`
5. Cloudflare will automatically provision SSL certificate

### 3. Configure Pages Deployment

In your Pages project settings:

#### Build Configuration
- **Build command**: `npm run build`
- **Build output directory**: `dist`

#### Environment Variables
Set the following environment variable:
- **NODE_ENV**: `production`

### 4. Deploy Static Assets

The project automatically uses the cookie-free domain in production:
- **Development**: Assets served from same domain
- **Production**: Assets served from `static.milkacollective.com`

### 5. Verify Setup

After deployment, verify:

1. **DNS Resolution**: 
   ```bash
   nslookup static.milkacollective.com
   ```

2. **SSL Certificate**: 
   Visit `https://static.milkacollective.com` - should show valid SSL

3. **Asset Loading**: 
   Check browser dev tools to confirm images load from subdomain

4. **Cookie Headers**: 
   Verify no cookies sent with static asset requests

### 6. Performance Benefits

✅ **Cookie-free requests** for all static assets  
✅ **Reduced bandwidth** (no unnecessary cookie overhead)  
✅ **Faster loading** especially on mobile connections  
✅ **CDN optimization** with proper caching headers  
✅ **Parallel connections** (separate domain allows more concurrent requests)

## File Structure

```
public/
├── photos/          # Images served from static.domain.com
├── videos/          # Videos served from static.domain.com  
├── _headers         # Main domain headers
└── static/
    └── _headers     # Static subdomain headers (cookie-free)

src/config/
└── assets.ts        # Cookie-free domain configuration
```

## Troubleshooting

### Common Issues

1. **DNS not resolving**: Check CNAME record is proxied
2. **SSL errors**: Wait 10-15 minutes for certificate provisioning
3. **Assets not loading**: Verify environment variables in Pages settings
4. **Mixed content**: Ensure all asset URLs use HTTPS

### Testing Locally

To test the cookie-free setup locally:
1. Set `NODE_ENV=production` 
2. Update `/etc/hosts`: `127.0.0.1 static.milkacollective.com`
3. Run build and serve from subdomain

## Monitoring

Monitor the setup with:
- **Cloudflare Analytics**: Track subdomain performance
- **Core Web Vitals**: Measure loading improvements  
- **Browser Dev Tools**: Verify cookie-free requests