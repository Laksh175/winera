import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEO_SCHEMAS from '../data/seoSchemas';

/**
 * GlobalSeoSchema
 * Dynamically injects Google Rich Snippets / Schema.org JSON-LD structured data
 * into <head> based on the current route, accurately matching Website Structure.pdf
 */
export default function GlobalSeoSchema() {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Normalize path (handle trailing slashes cleanly)
    const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');

    // Look for route schema in SEO_SCHEMAS dictionary
    const schemaData = SEO_SCHEMAS[normalizedPath];

    let scriptTag = document.getElementById('winera-dynamic-ld-json');

    if (schemaData) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'winera-dynamic-ld-json';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schemaData);
    } else if (scriptTag && normalizedPath !== '/') {
      // Clean up on unmapped routes (like admin dashboards)
      scriptTag.remove();
    }
  }, [pathname]);

  return null;
}
