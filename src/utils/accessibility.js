// Accessibility utilities for better SEO and user experience

export const generateAriaLabel = (action, element) => {
  return `${action} ${element}`;
};

export const generateAltText = (imageType, context) => {
  return `${imageType} for ${context}`;
};

export const focusManagement = {
  // Focus first interactive element in a container
  focusFirstInteractive: (containerRef) => {
    if (containerRef.current) {
      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  },

  // Trap focus within a container
  trapFocus: (containerRef) => {
    if (containerRef.current) {
      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKey = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      containerRef.current.addEventListener('keydown', handleTabKey);
      
      return () => {
        containerRef.current?.removeEventListener('keydown', handleTabKey);
      };
    }
  }
};

export const keyboardNavigation = {
  // Handle Enter key for clickable elements
  handleEnterKey: (callback) => (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      callback();
    }
  },

  // Handle Space key for clickable elements
  handleSpaceKey: (callback) => (e) => {
    if (e.key === ' ') {
      e.preventDefault();
      callback();
    }
  }
};

export const screenReaderAnnouncement = (message) => {
  // Create a live region for screen reader announcements
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.overflow = 'hidden';
  
  document.body.appendChild(announcement);
  announcement.textContent = message;
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

export const semanticHTML = {
  // Generate proper heading structure
  getHeadingLevel: (baseLevel = 1, increment = 0) => {
    return Math.min(baseLevel + increment, 6);
  },

  // Generate proper list structure
  createListItems: (items, type = 'ul') => {
    return items.map((item, index) => ({
      id: `list-item-${index}`,
      text: item,
      key: index
    }));
  }
};

export const colorContrast = {
  // Calculate relative luminance
  getLuminance: (r, g, b) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },

  // Calculate contrast ratio
  getContrastRatio: (l1, l2) => {
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  },

  // Check if contrast meets WCAG guidelines
  meetsWCAG: (contrastRatio, level = 'AA') => {
    const thresholds = {
      'AA': { normal: 4.5, large: 3 },
      'AAA': { normal: 7, large: 4.5 }
    };
    return contrastRatio >= thresholds[level].normal;
  }
}; 