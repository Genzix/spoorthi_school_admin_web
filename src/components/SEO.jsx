import React, { useEffect } from 'react';
import { useSchoolOptional } from '@/context/SchoolContext';

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  structuredData,
}) => {
  const schoolCtx = useSchoolOptional();
  const seo = schoolCtx?.school?.seo;

  const defaultTitle = seo?.title || 'School CRM - School Management System';
  const defaultDescription =
    seo?.description ||
    'Comprehensive school management system for student records, attendance, fees, expenses, and employee management.';
  const defaultImage = seo?.ogImage || schoolCtx?.school?.logo?.favicon || '/logo1.png';
  const defaultUrl = seo?.url || (typeof window !== 'undefined' ? window.location.origin : '');
  const siteName = seo?.siteName || schoolCtx?.school?.displayName || 'School CRM';

  const finalTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image || defaultImage;
  const finalUrl = url || defaultUrl;

  useEffect(() => {
    document.title = finalTitle;

    const updateMetaTag = (name, content, property = false) => {
      let meta = document.querySelector(
        `meta[${property ? 'property' : 'name'}="${name}"]`
      );
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

    updateMetaTag('title', finalTitle);
    updateMetaTag('description', finalDescription);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', finalUrl, true);
    updateMetaTag('og:title', finalTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    updateMetaTag('og:image', finalImage, true);
    updateMetaTag('og:site_name', siteName, true);
    updateMetaTag('og:locale', 'en_US', true);

    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:url', finalUrl, true);
    updateMetaTag('twitter:title', finalTitle, true);
    updateMetaTag('twitter:description', finalDescription, true);
    updateMetaTag('twitter:image', finalImage, true);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', finalUrl);

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
  }, [
    finalTitle,
    finalDescription,
    finalImage,
    finalUrl,
    keywords,
    type,
    structuredData,
    siteName,
  ]);

  return null;
};

export default SEO;
