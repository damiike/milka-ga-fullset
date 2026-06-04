/** PostHog + GTM context for Google Ads full-set LP (distinct from main-site Website Book Link). */
export const LP_BOOK_NOW_EVENT = 'LP_GA_Full_Set_Book_Now_Link';
export const LP_PAGE_TYPE = 'lp_ga_full_set';
export const LP_LANDING_PAGE = 'full_lash_set';
export const LP_LANDING_VARIANT = 'ga_full_set_lp';

type PosthogCapture = {
  capture: (event: string, props?: Record<string, unknown>) => void;
};

type DataLayer = Record<string, unknown>[];

function dataLayer(): DataLayer | null {
  if (typeof window === 'undefined') return null;
  const w = window as Window & { dataLayer?: DataLayer };
  w.dataLayer = w.dataLayer || [];
  return w.dataLayer;
}

export function lpAnalyticsContext(): Record<string, string> {
  if (typeof window === 'undefined') {
    return {
      page_type: LP_PAGE_TYPE,
      landing_page: LP_LANDING_PAGE,
      landing_variant: LP_LANDING_VARIANT,
      page_path: '',
      page_location: '',
    };
  }
  return {
    page_type: LP_PAGE_TYPE,
    landing_page: LP_LANDING_PAGE,
    landing_variant: LP_LANDING_VARIANT,
    page_path: window.location.pathname,
    page_location: window.location.href,
  };
}

function pageUtmProps(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid']) {
    const value = params.get(key);
    if (value) out[key] = value;
  }
  return out;
}

/** Push GTM/GA4 dataLayer events with LP page context (for Analytics segmentation). */
export function pushLpDataLayer(event: string, props: Record<string, unknown> = {}) {
  const dl = dataLayer();
  if (!dl) return;
  dl.push({
    event,
    ...lpAnalyticsContext(),
    ...pageUtmProps(),
    ...props,
  });
}

/** Register LP page context before GTM tags fire (GA4 custom dimensions / triggers). */
export function pushLpPageContext() {
  pushLpDataLayer('lp_page_context', {
    page_title: typeof document !== 'undefined' ? document.title : '',
  });
}

type PosthogCaptureFn = PosthogCapture;

export function captureLpBookNow(posthog: PosthogCaptureFn, props: Record<string, unknown> = {}) {
  const ctx = { ...lpAnalyticsContext(), ...pageUtmProps(), ...props };
  pushLpDataLayer('booking_click', ctx);
  posthog.capture(LP_BOOK_NOW_EVENT, ctx);
  posthog.capture('conversion', {
    conversion_type: LP_BOOK_NOW_EVENT,
    ...ctx,
  });
}

export function captureLpPhoneClick(props: Record<string, unknown> = {}) {
  pushLpDataLayer('phone_click', props);
  const ph = (window as Window & { posthog?: PosthogCaptureFn }).posthog;
  if (ph?.capture) ph.capture('phone_click', { ...lpAnalyticsContext(), ...props });
}

export function captureLpEmailClick(props: Record<string, unknown> = {}) {
  pushLpDataLayer('email_click', props);
  const ph = (window as Window & { posthog?: PosthogCaptureFn }).posthog;
  if (ph?.capture) ph.capture('email_click', { ...lpAnalyticsContext(), ...props });
}
