// Cloudflare Pages configuration for static site
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Serve static files from the src directory
    if (url.pathname === '/' || url.pathname === '') {
      url.pathname = '/index.html';
    }
    
    // Handle SPA routing - serve index.html for all routes
    const staticExtensions = ['.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.woff', '.woff2', '.ttf', '.ico'];
    const hasStaticExtension = staticExtensions.some(ext => url.pathname.endsWith(ext));
    
    if (!hasStaticExtension && !url.pathname.startsWith('/api/')) {
      // For non-static routes, serve the main index.html (SPA behavior)
      url.pathname = '/index.html';
    }
    
    return env.ASSETS.fetch(url);
  }
};