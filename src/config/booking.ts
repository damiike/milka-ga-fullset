// Enhanced booking configuration with dynamic UTM preservation
export const bookingConfig = {
  // Base booking URL
  baseBookingUrl: "https://www.fresha.com/book-now/milka-collective-hzs7tsc5/all-offer?share&pId=1089926",
  
  // Legacy URLs (kept for compatibility)
  bookingUrl: "https://www.fresha.com/book-now/milka-collective-hzs7tsc5/all-offer?share&pId=1089926&utm_source=google&utm_medium=cpc&utm_campaign=leads",
  generalBookingUrl: "https://www.fresha.com/book-now/milka-collective-hzs7tsc5/all-offer?share&pId=1089926&utm_source=google&utm_medium=cpc&utm_campaign=leads",
  
  // Business ID for reference
  businessId: "hzs7tsc5"
};

// Dynamic booking URL that preserves campaign data
export function generateBookingUrl() {
  const baseUrl = bookingConfig.baseBookingUrl;
  const params = new URLSearchParams();
  
  // Get current URL parameters
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Preserve UTM parameters
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    utmParams.forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        params.set(param, value);
      }
    });
    
    // Preserve GCLID for Google Ads attribution
    const gclid = urlParams.get('gclid');
    if (gclid) {
      params.set('gclid', gclid);
    }
  }
  
  // Add default tracking if no UTM parameters present (both server and client side)
  if (!params.has('utm_source')) {
    params.set('utm_source', 'landing_page');
    params.set('utm_medium', 'website');
    params.set('utm_campaign', 'lash_bookings');
  }
  
  return params.toString() ? `${baseUrl}&${params.toString()}` : `${baseUrl}&utm_source=landing_page&utm_medium=website&utm_campaign=lash_bookings`;
}