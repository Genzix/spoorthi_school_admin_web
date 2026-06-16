// Performance monitoring utilities for SEO optimization

export const performanceMetrics = {
  // Track Core Web Vitals
  trackCoreWebVitals: () => {
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
        
        // Send to analytics if needed
        if (window.gtag) {
          window.gtag('event', 'LCP', {
            value: Math.round(lastEntry.startTime),
            event_category: 'Web Vitals'
          });
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime);
          
          if (window.gtag) {
            window.gtag('event', 'FID', {
              value: Math.round(entry.processingStart - entry.startTime),
              event_category: 'Web Vitals'
            });
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            console.log('CLS:', clsValue);
            
            if (window.gtag) {
              window.gtag('event', 'CLS', {
                value: Math.round(clsValue * 1000) / 1000,
                event_category: 'Web Vitals'
              });
            }
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  },

  // Track page load performance
  trackPageLoad: () => {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');
        
        const metrics = {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime,
          firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime
        };
        
        console.log('Page Load Metrics:', metrics);
        
        // Send to analytics
        if (window.gtag) {
          window.gtag('event', 'page_load', {
            value: Math.round(metrics.loadComplete),
            event_category: 'Performance'
          });
        }
      }, 0);
    });
  },

  // Track component render performance
  trackComponentRender: (componentName) => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      console.log(`${componentName} render time:`, renderTime);
      
      if (window.gtag) {
        window.gtag('event', 'component_render', {
          value: Math.round(renderTime),
          event_category: 'Performance',
          event_label: componentName
        });
      }
    };
  }
};

export const resourceOptimization = {
  // Preload critical resources
  preloadResource: (href, as = 'script') => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  },

  // Lazy load images
  lazyLoadImage: (imgElement, src) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          imgElement.src = src;
          observer.unobserve(imgElement);
        }
      });
    });
    
    observer.observe(imgElement);
  },

  // Debounce function calls
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function calls
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

export const memoryManagement = {
  // Clean up event listeners
  cleanupEventListeners: (element, eventType, handler) => {
    if (element && element.removeEventListener) {
      element.removeEventListener(eventType, handler);
    }
  },

  // Clear intervals and timeouts
  clearTimers: (timers) => {
    timers.forEach(timer => {
      if (timer) {
        clearTimeout(timer);
        clearInterval(timer);
      }
    });
  },

  // Monitor memory usage
  monitorMemory: () => {
    if ('memory' in performance) {
      const memory = performance.memory;
      console.log('Memory Usage:', {
        used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
        total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
        limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
      });
    }
  }
};

export const networkOptimization = {
  // Check network status
  isOnline: () => navigator.onLine,

  // Retry failed requests
  retryRequest: async (requestFn, maxRetries = 3, delay = 1000) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await requestFn();
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  },

  // Cache API responses
  cacheResponse: async (key, response, ttl = 300000) => {
    if ('caches' in window) {
      const cache = await caches.open('api-cache');
      const cachedResponse = new Response(JSON.stringify(response), {
        headers: { 'Content-Type': 'application/json' }
      });
      await cache.put(key, cachedResponse);
      
      // Set expiration
      setTimeout(async () => {
        await cache.delete(key);
      }, ttl);
    }
  }
}; 