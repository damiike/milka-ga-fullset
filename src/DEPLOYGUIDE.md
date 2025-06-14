# Milka Collective - Deployment Guide

### Production Deployment for Milka Collective Beauty Landing Page

This guide outlines the deployment process for the Milka Collective beauty landing page on Cloudflare Pages. The project has been simplified to focus solely on the beauty variant.

*Preamble*

This document is a comprehensive playbook for deploying, securing, and maintaining a production-grade Astro application on Cloudflare Pages. It incorporates industry best practices for performance, security, observability, and automated quality control.

*   *Core Philosophies:*
    *   *Hybrid Image Strategy:* We leverage Astro's build-time optimization for critical assets (using the ⁠ experimental ⁠ ⁠ <Image /> ⁠ component) and a hardened on-demand Cloudflare Function for dynamic images.
    *   *Two-Track Local Development:* We outline distinct workflows for fast HMR development and for previewing the final production build with Cloudflare services.
*   *Versioning & Pricing:*
    *   This guide is designed to work with the latest versions of Astro and Wrangler. Always use the newest package versions to leverage the latest features and security updates.
    *   Cloudflare service pricing and free tier limits (e.g., 100 GB/mo bandwidth) are subject to change. Please verify current details on the official Cloudflare pricing pages.

---

#### *Phase 1: Project & TypeScript Setup*

1.  *Install Dependencies:*
    *   For bundled applications like Astro, all packages can be considered development dependencies.
        ⁠ bash
        npm i -D astro wrangler posthog-js web-vitals
         ⁠

2.  *Configure ⁠ package.json ⁠:*
    *   Enforce a minimum Node.js version and ensure the ⁠ start ⁠ script runs a production preview. The ⁠ latest ⁠ tag ensures you always pull the newest versions on a fresh install.
        ⁠ json
        {
          "name": "milka-gafullset",
          "type": "module",
          "version": "0.0.1",
          "scripts": {
            "dev": "astro dev",
            "start": "astro preview",
            "build": "astro build",
            "preview": "astro preview",
            "astro": "astro",
            "lint": "astro check",
            "check": "astro check"
          },
          "devDependencies": {
            "astro": "latest",
            "posthog-js": "latest",
            "web-vitals": "latest",
            "wrangler": "latest"
          },
          "engines": {
            "node": ">=18.0.0"
          }
        }
         ⁠

3.  *Configure Wrangler (⁠ wrangler.toml ⁠):*
    *   Create a ⁠ wrangler.toml ⁠ file in your project root. The ⁠ node_compat ⁠ flag is recommended for compatibility with dependencies that may use Node.js APIs.
        ⁠ toml
        # wrangler.toml
        name = "milka-gafullset"
        compatibility_date = "2024-06-13"
        node_compat = true
         ⁠

4.  *Configure Astro (⁠ astro.config.mjs ⁠):*
    *   Enable the experimental assets flag to use Astro's ⁠ <Image /> ⁠ component without console warnings.
        ⁠ javascript
        import { defineConfig } from 'astro/config';

        export default defineConfig({
          experimental: {
            assets: true,
          },
        });
         ⁠

---

#### *Phase 2: Local Development & Workflow*

*   *A) Day-to-Day Hot-Reload Development:*
    *   Use Astro's built-in Vite dev server. The ⁠ --host ⁠ flag exposes it on your local network.
        ⁠ bash
        npm run dev -- --host --https
         ⁠
*   *B) Production-Preview with Functions:*
    *   Use Wrangler to serve your final production build locally. This emulates the Cloudflare environment but is not a byte-for-byte replica of the edge.
        ⁠ bash
        # You must run a new build after ANY code change to see it reflected.
        npm run build

        # Run the local production preview server, serving the build output
        npx wrangler pages dev ./dist
         ⁠

---

#### *Phase 3: Deployment & Core Configuration*

1.  *Deployment via CLI:*
    *   For CI/CD, use ⁠ npx wrangler pages deploy ⁠. It deploys the standard ⁠ ./dist ⁠ directory. Wrangler infers the project name from ⁠ wrangler.toml ⁠.
        ⁠ bash
        npx wrangler pages deploy ./dist
         ⁠

2.  *Environment Variables & Secrets:*
    *   The *PostHog Key is client-side* and must be a *plain text* environment variable, prefixed with ⁠ PUBLIC_ ⁠.
        ⁠ bash
        # No PostHog integration is currently configured
# Uncomment and set this if you want to add PostHog later
# npx wrangler pages project env-vars set PUBLIC_POSTHOG_KEY=phc_abc123
         ⁠
    *   Use ⁠ wrangler secret put ⁠ for any server-side secrets. Create secrets for both production and preview environments.
        ⁠ bash
        # Production secret
        npx wrangler secret put YOUR_API_KEY

        # Preview environment secret
        npx wrangler secret put YOUR_API_KEY --env preview
         ⁠

---

#### *Phase 4: Advanced Security & Caching*

1.  *Function Routing (⁠ _routes.json ⁠):*
    *   Create ⁠ public/_routes.json ⁠ to explicitly route paths to Functions.
        ⁠ json
        {
          "version": 1,
          "include": ["/_image/*", "/api/*"],
          "exclude": ["/assets/*"]
        }
         ⁠

2.  *Security & Caching Headers (⁠ _headers ⁠):*
    *   Create ⁠ public/_headers ⁠ with a robust Content Security Policy (CSP) and granular cache control.
        ⁠ text
        # Long-lived, fingerprinted assets
        /assets/*
          Cache-Control: public, max-age=31536000, immutable

        # HTML pages: serve from edge cache for 10 mins, revalidate in background
        /*.html
          Cache-Control: public, s-maxage=600, stale-while-revalidate=60

        # Global security headers for all pages
        /*
          # NOTE: 'unsafe-inline' is required for script-src and style-src to enable Astro's View Transitions.
          # This is a common and necessary trade-off for using the feature.
          Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; object-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'self';
          Referrer-Policy: strict-origin-when-cross-origin
          Cross-Origin-Opener-Policy: same-origin
          X-Frame-Options: DENY
          X-Content-Type-Options: nosniff
          Permissions-Policy: accelerometer=(), camera=(), microphone=()
          Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
         ⁠

---

#### *Phase 5: Feature Implementation*

1.  *Analytics & Web Vitals (⁠ src/scripts/analytics.ts ⁠):*
    *   Use a dynamic import to keep the main bundle lean and implement the ⁠ sendWebVital ⁠ function body.
        ⁠ typescript
        import type { Metric } from 'web-vitals';

        // Analytics is currently disabled
        // Uncomment and configure if you want to add PostHog later
        /*
        const apiKey = import.meta.env.PUBLIC_POSTHOG_KEY;
        const isProd = import.meta.env.PROD;

        if (typeof window !== 'undefined' && isProd && apiKey) {
          import('posthog-js').then(({ default: posthog }) => {
            posthog.init(apiKey, { api_host: 'https://app.posthog.com' });

            const sendWebVital = (metric: Metric) => posthog.capture(metric.name, {
                value: metric.value,
                rating: metric.rating,
                id: metric.id,
                navigationType: metric.navigationType
            });

            import('web-vitals').then(({ onCLS, onINP, onLCP, onFCP, onTTFB }) => {
              onCLS(sendWebVital);
              onLCP(sendWebVital);
              onINP(sendWebVital);
              onFCP(sendWebVital);
              onTTFB(sendWebVital);
            });
          });
        }
        */
         ⁠
    *   Load this script idiomatically in your main layout's frontmatter: ⁠ import '../scripts/analytics.ts'; ⁠.

2.  *Hardened Image Function (⁠ functions/_image.ts ⁠):*
    *   This version uses URL-based path sanitization, validates width, and properly handles not-found errors.
        ⁠ typescript
        import type { EventContext } from '@cloudflare/workers-types';

        export async function onRequest(context: EventContext<Env, string, unknown>): Promise<Response> {
          const { request, env } = context;
          const url = new URL(request.url);

          const src = url.searchParams.get('src');
          const widthParam = url.searchParams.get('w');
          const width = Number(widthParam);

          if (!width || !Number.isInteger(width) || width <= 0 || width > 4096) {
            return new Response('Invalid "w" parameter. Must be an integer between 1 and 4096.', { status: 400 });
          }

          const cleanedPath = src ? new URL(src, 'https://dummy.com').pathname : '';
          if (!cleanedPath.startsWith('/')) {
            return new Response('Invalid "src" parameter.', { status: 400 });
          }

          const imageOptions = { cf: { image: { width, fit: 'scale-down', format: 'auto' } } };

          try {
            const assetResponse = await env.ASSETS.fetch(cleanedPath, imageOptions);

            if (!assetResponse.ok) {
              return new Response(`Asset not found at path: ${cleanedPath}`, { status: 404 });
            }

            const response = new Response(assetResponse.body, assetResponse);
            response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
            return response;

          } catch (error) {
            console.error('Error in image function:', { error });
            // Install Sentry or another crash monitor to handle this properly
            return new Response('Error processing image.', { status: 500 });
          }
        }
         ⁠

---

#### *Phase 6: CI/CD & Automated Quality Gates*

1.  *Performance Budget (⁠ lighthouserc.js ⁠):*
    *   Create this file to enforce performance standards.
        ⁠ javascript
        module.exports = {
          ci: {
            assert: {
              preset: 'lighthouse:no-pwa',
              assertions: {
                'performance': ['error', { minScore: 0.9 }],
                'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
                'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
                'total-blocking-time': ['error', { maxNumericValue: 200 }],
              },
            },
          },
        };
         ⁠

2.  *Hardened CI Workflow (⁠ .github/workflows/ci.yml ⁠):*
    *   This workflow runs linting, type-checking, and a Lighthouse audit against the unique *preview URL* for every pull request. It uses the newest version of actions by tracking the ⁠ main ⁠ branch.
        ⁠ yaml
        name: CI & Preview Audit
        on: [pull_request]

        jobs:
          ci:
            runs-on: ubuntu-latest
            steps:
              - uses: actions/checkout@main
              - uses: actions/setup-node@main
                with: { node-version: 20, cache: 'npm' }
              - run: npm ci

              - name: Lint & Type Check
                run: npm run lint && npm run check

              - name: Build Project
                run: npm run build

              - name: Deploy to Cloudflare Pages (Preview)
                id: cloudflare_pages_deploy
                uses: cloudflare/pages-action@main
                with:
                  apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
                  accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
                  projectName: 'milka-gafullset'
                  directory: './dist'
                  gitHubToken: ${{ secrets.GITHUB_TOKEN }}
                if: github.event.pull_request.head.repo.full_name == github.repository

              - name: Run Lighthouse CI on Preview URL
                if: success() && steps.cloudflare_pages_deploy.outputs.url
                run: |
                  # Wait for deployment to be ready before auditing
                  npx wait-on ${{ steps.cloudflare_pages_deploy.outputs.url }} -t 60000
                  npx @lhci/cli autorun --collect.url=${{ steps.cloudflare_pages_deploy.outputs.url }} --config=./lighthouserc.js
         ⁠

---

#### *Phase 7: Production Operations & Monitoring*

*   *Real-Time Log Tailing:*
    *   Debug your live Pages Functions directly from your terminal.
        ⁠ bash
        npx wrangler pages deployment tail
         ⁠
*   *CLI & Automated Rollbacks:*
    *   If a deployment introduces a bug, you can roll back from the command line.
        ⁠ bash
        # List recent deployments to find an ID
        npx wrangler pages deployment list

        # Roll back to a specific, previous deployment ID
        npx wrangler pages deployment rollback <DEPLOYMENT_ID>
         ⁠
*   *Crash Monitoring:*
    *   Integrate a service like Sentry or use Cloudflare's "Workers Trace Events" to get notified of unhandled exceptions in your Pages Functions.
*   *Cost Controls:*
    *   Enable "Hard Limits" in your Cloudflare Billing settings to prevent surprise overages from bot traffic or high usage.
*   *Image Storage:*
    *   All images are currently stored in the `/public/images` directory. For production, consider optimizing and compressing images before deployment.

## Deployment Steps

1. **Build the project**
   ```bash
   npm install
   npm run build
   ```

2. **Deploy to Cloudflare Pages**
   ```bash
   # Install Wrangler if not already installed
   npm install -g wrangler
   
   # Login to Cloudflare
   npx wrangler login
   
   # Deploy to production
   npx wrangler pages deploy ./dist --project-name=milka-gafullset
   ```

3. **Configure Custom Domain (Optional)**
   - Go to Cloudflare Pages dashboard
   - Select your project
   - Go to 'Custom Domains' and follow the instructions to add your domain

## Environment Variables

No environment variables are required for the current setup. If you need to add any in the future, use:

```bash
# For production
npx wrangler pages project env-vars set VARIABLE_NAME=value

# For preview environments
npx wrangler pages project env-vars set VARIABLE_NAME=value --env=preview
```