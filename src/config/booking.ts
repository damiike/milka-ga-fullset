// Booking configuration using environment variables
const FRESHA_BUSINESS_ID = import.meta.env.FRESHA_BUSINESS_ID || "m4vife5o";

// Generate booking URLs
export const bookingConfig = {
  // Main booking URL with service selection
  bookingUrl: `https://www.fresha.com/a/milka-collective-brighton-melbourne-229-bay-street-${FRESHA_BUSINESS_ID}/all-offer?menu=true&pId=1089926`,
  
  // General booking URL
  generalBookingUrl: `https://www.fresha.com/a/milka-collective-brighton-melbourne-229-bay-street-${FRESHA_BUSINESS_ID}/booking?menu=true`,
  
  // Business ID for any custom URLs
  businessId: FRESHA_BUSINESS_ID
};