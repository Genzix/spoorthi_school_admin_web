import React, { useEffect } from 'react';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  structuredData 
}) => {
  const defaultTitle = 'Spoorthi CRM - School Management System';
  const defaultDescription = 'Comprehensive school management system for student records, attendance, fees, expenses, and employee management.';
  const defaultImage = '/logo1.png';
  const defaultUrl = 'https://spoorthi-crm.netlify.app/';
  
  const finalTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image || defaultImage;
  const finalUrl = url || defaultUrl;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Update or create meta tags
    const updateMetaTag = (name, content, property = false) => {
      let meta = document.querySelector(`meta[${property ? 'property' : 'name'}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Primary Meta Tags
    updateMetaTag('title', finalTitle);
    updateMetaTag('description', finalDescription);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }
    
    // Open Graph / Facebook
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', finalUrl, true);
    updateMetaTag('og:title', finalTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    updateMetaTag('og:image', finalImage, true);
    updateMetaTag('og:site_name', 'Spoorthi CRM', true);
    updateMetaTag('og:locale', 'en_US', true);
    
    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:url', finalUrl, true);
    updateMetaTag('twitter:title', finalTitle, true);
    updateMetaTag('twitter:description', finalDescription, true);
    updateMetaTag('twitter:image', finalImage, true);
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', finalUrl);
    
    // Structured Data
    if (structuredData) {
      let script = document.querySelector('script[data-seo-structured-data]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('data-seo-structured-data', 'true');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    // Cleanup function
    return () => {
      // Remove structured data script on unmount
      const script = document.querySelector('script[data-seo-structured-data]');
      if (script) {
        script.remove();
      }
    };
  }, [finalTitle, finalDescription, finalImage, finalUrl, type, keywords, structuredData]);

  return null; // This component doesn't render anything
};

export default SEO; 