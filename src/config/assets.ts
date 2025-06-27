// Asset configuration for cookie-free static domain serving
// This provides optimal performance by serving assets from static.milkacollective.com.au

// Helper function to get optimized image URL with cookie-free serving
export function getImageUrl(imagePath: string): string {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
  
  // Always use the static domain for production
  return `https://static.milkacollective.com.au/${cleanPath}`;
}

// Helper function to get video URL with cookie-free serving
export function getVideoUrl(videoPath: string): string {
  // Remove leading slash if present
  const cleanPath = videoPath.startsWith('/') ? videoPath.substring(1) : videoPath;
  
  // Use environment variable for static domain, fallback to relative path for CF Pages
  const staticDomain = import.meta.env.STATIC_DOMAIN;
  
  if (staticDomain && staticDomain !== '') {
    // Use configured static domain
    return `${staticDomain}/${cleanPath}`;
  }
  
  // Fallback to relative path (works for CF Pages deployment)
  return `/${cleanPath}`;
}