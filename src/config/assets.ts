// Asset configuration for optimized asset serving
// Ready to switch to cookie-free static domain when configured

// Configuration for asset serving
const USE_STATIC_SUBDOMAIN = true; // Set to true once static.milkacollective.com.au is configured
const STATIC_DOMAIN = 'https://static.milkacollective.com.au';

// Helper function to get optimized image URL
export function getImageUrl(imagePath: string): string {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
  
  // Use static subdomain when configured, otherwise use relative paths
  if (USE_STATIC_SUBDOMAIN) {
    return `${STATIC_DOMAIN}/${cleanPath}`;
  }
  
  return `/${cleanPath}`;
}

// Helper function to get video URL
export function getVideoUrl(videoPath: string): string {
  // Remove leading slash if present
  const cleanPath = videoPath.startsWith('/') ? videoPath.substring(1) : videoPath;
  
  // Use static subdomain when configured, otherwise use relative paths
  if (USE_STATIC_SUBDOMAIN) {
    return `${STATIC_DOMAIN}/${cleanPath}`;
  }
  
  return `/${cleanPath}`;
}