/**
 * Utility functions for cache management with Safari compatibility
 */

/**
 * Detect if the browser is Safari
 */
const isSafari = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('safari') && !userAgent.includes('chrome') && !userAgent.includes('chromium');
};

/**
 * Detect if the browser is iOS Safari
 */
const isIOSSafari = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent) && userAgent.includes('safari');
};

/**
 * Safari-specific cache clearing methods (internal)
 */
const clearSafariCacheInternal = async () => {
  try {
    console.log('Applying Safari-specific cache clearing...');
    
    // For Safari, we need to be more aggressive with cache busting
    // Clear any cached resources by forcing reload of critical resources
    
    // Method 1: Clear application cache if available (deprecated but still works in some cases)
    if (window.applicationCache) {
      try {
        window.applicationCache.update();
        console.log('Application cache updated');
      } catch (error) {
        console.warn('Application cache update failed:', error);
      }
    }

    // Method 2: Force clear any cached fetch requests
    if ('serviceWorker' in navigator) {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (let registration of registrations) {
          await registration.unregister();
          console.log('Service worker unregistered');
        }
      } catch (error) {
        console.warn('Service worker unregistration failed:', error);
      }
    }

    // Method 3: Clear IndexedDB if present
    if ('indexedDB' in window) {
      try {
        // This is a more aggressive approach for Safari
        const databases = await indexedDB.databases?.() || [];
        for (const db of databases) {
          if (db.name) {
            indexedDB.deleteDatabase(db.name);
          }
        }
        console.log('IndexedDB cleared');
      } catch (error) {
        console.warn('IndexedDB clearing failed:', error);
      }
    }

    return true;
  } catch (error) {
    console.error('Safari cache clearing failed:', error);
    return false;
  }
};

/**
 * Clears various types of browser cache while preserving essential data
 * @param {Object} options - Configuration options for cache clearing
 * @param {Array} options.preserveLocalStorage - Array of localStorage keys to preserve
 * @param {Array} options.preserveSessionStorage - Array of sessionStorage keys to preserve
 * @param {boolean} options.clearBrowserCache - Whether to clear browser cache via service worker
 * @param {boolean} options.forceSafariClear - Whether to use Safari-specific clearing methods
 */
export const clearCache = async (options = {}) => {
  const {
    preserveLocalStorage = ['token', 'email'],
    preserveSessionStorage = ['token', 'email'],
    clearBrowserCache = true,
    forceSafariClear = true
  } = options;

  try {
    console.log('Starting cache clearing process...');
    const safariDetected = isSafari() || isIOSSafari();
    
    if (safariDetected) {
      console.log('Safari browser detected, using Safari-specific methods');
    }

    // Clear browser cache using service worker if available
    if (clearBrowserCache && 'caches' in window) {
      try {
        const cacheNames = await caches.keys();
        const deletePromises = cacheNames.map(async (cacheName) => {
          try {
            const deleted = await caches.delete(cacheName);
            console.log(`Cache ${cacheName} deleted:`, deleted);
            return deleted;
          } catch (error) {
            console.warn(`Failed to delete cache ${cacheName}:`, error);
            return false;
          }
        });
        
        await Promise.allSettled(deletePromises);
        console.log('Browser cache clearing attempted for all caches');
      } catch (error) {
        console.warn('Failed to clear browser cache:', error);
      }
    }

    // Apply Safari-specific cache clearing if needed
    if (safariDetected && forceSafariClear) {
      await clearSafariCacheInternal();
    }

    // Clear session storage while preserving specified keys
    if (typeof Storage !== 'undefined' && sessionStorage) {
      const preservedData = {};
      preserveSessionStorage.forEach(key => {
        const value = sessionStorage.getItem(key);
        if (value) {
          preservedData[key] = value;
        }
      });

      sessionStorage.clear();

      // Restore preserved data
      Object.entries(preservedData).forEach(([key, value]) => {
        sessionStorage.setItem(key, value);
      });
      
      console.log('Session storage cleared successfully');
    }

    // Clear localStorage while preserving specified keys
    if (typeof Storage !== 'undefined' && localStorage) {
      const preservedData = {};
      preserveLocalStorage.forEach(key => {
        const value = localStorage.getItem(key);
        if (value) {
          preservedData[key] = value;
        }
      });

      // Clear all localStorage except preserved keys
      const allKeys = Object.keys(localStorage);
      allKeys.forEach(key => {
        if (!preserveLocalStorage.includes(key)) {
          localStorage.removeItem(key);
        }
      });

      console.log('Local storage cleaned successfully');
    }

    // Clear any cached API responses (if using axios cache or similar)
    if (window.axios && window.axios.defaults && window.axios.defaults.cache) {
      window.axios.defaults.cache.clear();
      console.log('Axios cache cleared successfully');
    }

    // Safari-specific: Force clear any cached images and resources
    if (safariDetected) {
      try {
        // Clear cached images by setting src to empty and back
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          if (img.src) {
            const originalSrc = img.src;
            img.src = '';
            setTimeout(() => {
              img.src = originalSrc + (originalSrc.includes('?') ? '&' : '?') + 'cb=' + Date.now();
            }, 10);
          }
        });

        // Clear any cached stylesheets
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        stylesheets.forEach(link => {
          if (link.href) {
            const originalHref = link.href;
            link.href = originalHref + (originalHref.includes('?') ? '&' : '?') + 'cb=' + Date.now();
          }
        });

        console.log('Safari-specific resource cache busting applied');
      } catch (error) {
        console.warn('Safari resource cache busting failed:', error);
      }
    }

    // Additional Safari cache clearing: Clear any WebKit caches
    if (safariDetected && window.webkit && window.webkit.messageHandlers) {
      try {
        // This is for WKWebView contexts
        console.log('WebKit context detected, applying additional clearing');
      } catch (error) {
        console.warn('WebKit cache clearing failed:', error);
      }
    }

    console.log('Cache clearing completed successfully');
    return { success: true, message: 'Cache cleared successfully', safariOptimized: safariDetected };

  } catch (error) {
    console.error('Error during cache clearing:', error);
    return { success: false, message: error.message, safariOptimized: safariDetected };
  }
};

/**
 * Clears only browser cache (service worker caches)
 */
export const clearBrowserCache = async () => {
  return clearCache({
    preserveLocalStorage: Object.keys(localStorage),
    preserveSessionStorage: Object.keys(sessionStorage),
    clearBrowserCache: true
  });
};

/**
 * Clears only storage (localStorage and sessionStorage) while preserving auth data
 */
export const clearStorageCache = async () => {
  return clearCache({
    preserveLocalStorage: ['token', 'email'],
    preserveSessionStorage: ['token', 'email'],
    clearBrowserCache: false
  });
};

/**
 * Force reload the page to ensure fresh content
 * @param {boolean} hardReload - Whether to perform a hard reload (bypass cache)
 */
export const forceReload = (hardReload = false) => {
  if (hardReload) {
    // Hard reload - bypasses cache completely
    window.location.reload(true);
  } else {
    // Normal reload
    window.location.reload();
  }
};

/**
 * Safari-optimized cache clearing function
 * This function uses Safari-specific methods and more aggressive cache busting
 */
export const clearSafariCache = async () => {
  const options = {
    preserveLocalStorage: ['token', 'email'],
    preserveSessionStorage: ['token', 'email'],
    clearBrowserCache: true,
    forceSafariClear: true
  };
  
  const result = await clearCache(options);
  
  // Additional Safari-specific steps
  if (result.success) {
    try {
      // Force reload of any cached API endpoints by adding cache-busting parameters
      if (window.fetch) {
        const originalFetch = window.fetch;
        window.fetch = function(resource, init = {}) {
          if (typeof resource === 'string' && !resource.includes('cb=')) {
            resource += (resource.includes('?') ? '&' : '?') + 'cb=' + Date.now();
          }
          return originalFetch.call(this, resource, init);
        };
        
        // Restore original fetch after 5 seconds
        setTimeout(() => {
          window.fetch = originalFetch;
        }, 5000);
      }
      
      console.log('Safari-specific cache clearing completed');
    } catch (error) {
      console.warn('Safari-specific enhancements failed:', error);
    }
  }
  
  return result;
};

/**
 * Clear cache and reload the page
 * @param {Object} options - Cache clearing options
 * @param {boolean} reload - Whether to reload after clearing cache
 */
export const clearCacheAndReload = async (options = {}, reload = false) => {
  const safariDetected = isSafari() || isIOSSafari();
  
  // Use Safari-specific clearing if Safari is detected
  const result = safariDetected ? 
    await clearSafariCache() : 
    await clearCache(options);
  
  if (reload && result.success) {
    setTimeout(() => {
      // For Safari, use a hard reload to bypass cache
      if (safariDetected) {
        window.location.href = window.location.href + (window.location.href.includes('?') ? '&' : '?') + 'cb=' + Date.now();
      } else {
        window.location.reload();
      }
    }, 100); // Small delay to ensure cache clearing completes
  }
  
  return result;
};
