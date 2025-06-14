import posthog from 'posthog-js';

export interface ConversionEvent {
  event: string;
  variant?: string;
  email?: string;
  source?: string;
  [key: string]: any;
}

export function initAnalytics(apiKey: string) {
  if (typeof window !== 'undefined' && apiKey) {
    posthog.init(apiKey, {
      api_host: 'https://app.posthog.com',
      loaded: function(posthog) {
        // Register landing variant if available
        if ((window as any).landingVariant) {
          posthog.register({
            landing_variant: (window as any).landingVariant
          });
        }
      }
    });
  }
}

export function trackConversion(data: ConversionEvent) {
  if (typeof window !== 'undefined' && posthog.__loaded) {
    const { event, ...properties } = data;
    
    // Add variant information
    const eventData = {
      ...properties,
      variant: data.variant || (window as any).landingVariant || 'default',
      timestamp: new Date().toISOString(),
      page_url: window.location.href
    };
    
    posthog.capture(event, eventData);
    
    // Also track as conversion if it's a lead capture
    if (event === 'lead_capture' || event === 'signup') {
      posthog.capture('conversion', {
        conversion_type: event,
        ...eventData
      });
    }
  }
}

export function trackPageView(pageName: string, variant?: string) {
  if (typeof window !== 'undefined' && posthog.__loaded) {
    posthog.capture('$pageview', {
      page_name: pageName,
      variant: variant || (window as any).landingVariant || 'default'
    });
  }
}

export function identifyUser(email: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && posthog.__loaded) {
    posthog.identify(email, properties);
  }
}