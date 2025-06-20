# Static Subdomain Setup Guide

## Current Status ✅

**Image Optimization Complete:**
- All images now use the `getImageUrl()` function from `src/config/assets.ts`
- Optimized images are working (IMG_3723.png: 3.5MB → 337KB, 90% reduction)
- Asset configuration system is ready for cookie-free static domain

**What's Working Now:**
- All images served from main domain with optimizations
- Easy toggle to switch to static subdomain when ready
- Performance gains from image optimization (87% file size reduction)

## To Complete Static Subdomain Setup

### Step 1: Add Custom Domain in Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → **milka-gafullset** project
3. Go to **Settings** → **Custom domains**
4. Click **"Set up a custom domain"**
5. Enter: `static.milkacollective.com.au`
6. Cloudflare will automatically provision SSL certificate

### Step 2: Enable Static Subdomain in Code

Once the custom domain is active, update the configuration:

```typescript
// In src/config/assets.ts, change line 5:
const USE_STATIC_SUBDOMAIN = true; // Set to true once static.milkacollective.com.au is configured
```

### Step 3: Deploy with Static Subdomain

```bash
npm run build
npx wrangler pages deploy dist --project-name milka-gafullset
```

### Step 4: Verify Cookie-Free Serving

Test that assets are served without cookies:

```bash
# Check headers - should show no Set-Cookie headers
curl -I https://static.milkacollective.com.au/photos/IMG_3723.png

# Verify optimized file size
curl -s https://static.milkacollective.com.au/photos/IMG_3723.png | wc -c
# Should return: 337147 (337KB optimized)
```

## Performance Benefits of Static Subdomain

✅ **Cookie-free requests** - No cookie overhead on asset requests  
✅ **Parallel connections** - Browser can make more concurrent requests  
✅ **CDN optimization** - Better caching behavior  
✅ **Reduced bandwidth** - No unnecessary headers  
✅ **Faster mobile loading** - Especially beneficial on slower connections  

## Current Performance Gains (Already Active)

- **IMG_3723.png**: 3.5MB → 337KB (90% reduction)
- **IMG_4655.png**: 3.6MB → 330KB (91% reduction)  
- **IMG_4023.PNG**: 1.2MB → 242KB (80% reduction)
- **Total bandwidth savings**: 8.3MB → 909KB (89% reduction)

## File Structure

```
src/config/
└── assets.ts          # Asset URL configuration (cookie-free ready)

public/photos/          # Optimized images (600px max, compressed)
├── IMG_3723.png       # 337KB (was 3.5MB)
├── IMG_4655.png       # 330KB (was 3.6MB)
├── IMG_4023.PNG       # 242KB (was 1.2MB)
└── ...                # All other images optimized

public/_headers         # Cache headers for main domain
```

## DNS Configuration (Already Complete)

The DNS for `static.milkacollective.com.au` is already configured and pointing to Cloudflare. You just need to add it as a custom domain in the Pages dashboard.

## Testing Commands

```bash
# Check DNS resolution
nslookup static.milkacollective.com.au

# Test current optimized images (main domain)
curl -s https://lp.milkacollective.com.au/photos/IMG_3723.png | wc -c

# Test after static subdomain is configured
curl -s https://static.milkacollective.com.au/photos/IMG_3723.png | wc -c
```

The infrastructure is ready - just need to add the custom domain in Cloudflare Dashboard and flip the toggle in the code!