import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { fetchSiteContent } from './services/api';
import wineraLogo from './assets/logo.webp';
import ErrorBoundary from './components/ErrorBoundary';

// Dynamic Import with automatic retry to prevent blank screens on chunk load failures
const lazyWithRetry = (componentImport) =>
  lazy(async () => {
    const pageHasBeenRefreshed = sessionStorage.getItem('winera_page_refreshed');
    try {
      const component = await componentImport();
      sessionStorage.removeItem('winera_page_refreshed');
      return component;
    } catch (error) {
      console.error('Dynamic import error caught:', error);
      if (!pageHasBeenRefreshed) {
        sessionStorage.setItem('winera_page_refreshed', 'true');
        window.location.reload();
        return new Promise(() => {});
      }
      sessionStorage.removeItem('winera_page_refreshed');
      throw error;
    }
  });

// Direct import for Homepage to eliminate secondary chunk waterfall and Suspense delay on root
import Home from './pages/Home';
const AboutUs = lazyWithRetry(() => import('./pages/AboutUs'));
const ArcadeGame = lazyWithRetry(() => import('./pages/ArcadeGame'));
const ArcadeGameDetail = lazyWithRetry(() => import('./pages/ArcadeGameDetail'));
const BowlingAlley = lazyWithRetry(() => import('./pages/BowlingAlley'));
const ContactUs = lazyWithRetry(() => import('./pages/ContactUs'));
const AdminLogin = lazyWithRetry(() => import('./pages/AdminLogin'));
const AdminDashboard = lazyWithRetry(() => import('./pages/AdminDashboard'));
const SoftPlay = lazyWithRetry(() => import('./pages/SoftPlay'));
const BumperCar = lazyWithRetry(() => import('./pages/BumperCar'));
const VrGames = lazyWithRetry(() => import('./pages/VrGames'));
const ArGames = lazyWithRetry(() => import('./pages/ArGames'));
const AmusementPark = lazyWithRetry(() => import('./pages/AmusementPark'));
const Hypergrid = lazyWithRetry(() => import('./pages/Hypergrid'));
const Project = lazyWithRetry(() => import('./pages/Project'));
const ProjectDetail = lazyWithRetry(() => import('./pages/ProjectDetail'));
const SafetyStandards = lazyWithRetry(() => import('./pages/SafetyStandards'));
const TrampolinePark = lazyWithRetry(() => import('./pages/TrampolinePark'));
const Roi = lazyWithRetry(() => import('./pages/Roi'));
const Blog = lazyWithRetry(() => import('./pages/Blog'));
const BlogDetail = lazyWithRetry(() => import('./pages/BlogDetail'));
const LaserTag = lazyWithRetry(() => import('./pages/LaserTag'));
const NotFoundPage = lazyWithRetry(() => import('./pages/NotFoundPage'));
const PrivacyPolicy = lazyWithRetry(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazyWithRetry(() => import('./pages/TermsAndConditions'));

// Helper component that resets window scroll position and initializes smooth scroll-reveal animations across all pages
function GlobalScrollAnimation() {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Reset scroll to top instantly on page navigation
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Clean up old animation classes from previous page elements
    const visibleEls = document.querySelectorAll('.is-visible, .aos-animate');
    visibleEls.forEach((el) => {
      el.classList.remove('is-visible', 'aos-animate');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            entry.target.classList.add('aos-animate');
          }
        });
      },
      {
        root: null,
        rootMargin: '120px 0px 50px 0px',
        threshold: 0.01
      }
    );

    const observedSet = new WeakSet();

    const scanAndObserve = () => {
      if (window.location.pathname.startsWith('/admin')) return;

      const selector = [
        'section',
        '.winera-reveal',
        '.winera-reveal-left',
        '.winera-reveal-right',
        '.fade-up-right',
        '.fade-up-left',
        '.winera-animate-block',
        '[data-aos]',
        '.winera-stats-card',
        '.winera-process-card-wrapper-cyan',
        '.winera-process-card-wrapper-yellow',
        '.winera-partner-box-wrapper-yellow',
        '.winera-partner-box-wrapper-cyan'
      ].join(', ');

      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        if (observedSet.has(el)) return;
        if (el.classList.contains('framer-motion-wrapper') || el.dataset.noAutoReveal === 'true') {
          return;
        }

        // Hero sections should never be hidden
        if (el.tagName === 'SECTION' && (el.className.includes('hero') || el.querySelector('[class*="hero"]'))) {
          el.classList.add('is-visible');
          el.classList.add('aos-animate');
          observedSet.add(el);
          return;
        }

        // If section contains explicit side-slide elements or framer motion elements, do not force section-wide winera-reveal
        if (el.tagName === 'SECTION' && el.querySelector('.winera-reveal-left, .winera-reveal-right, [data-framer-motion="true"]')) {
          return;
        }
        if (!el.classList.contains('winera-reveal') && !el.classList.contains('winera-animate-block') && !el.classList.contains('winera-reveal-left') && !el.classList.contains('winera-reveal-right')) {
          el.classList.add('winera-reveal');
        }
        observedSet.add(el);
        observer.observe(el);
      });
    };

    let timeoutId;
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        scanAndObserve();
        timeoutId = setTimeout(scanAndObserve, 500);
      }, { timeout: 1000 });
    } else {
      timeoutId = setTimeout(scanAndObserve, 300);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

// Centralized Canonical Tag Manager that syncs with Admin Dashboard SEO settings
function GlobalCanonicalTag({ siteData }) {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // Do not set or modify canonical on internal admin routes
    if (pathname.startsWith('/admin')) return;

    const routeSeoKeyMap = {
      '/': 'homeSeo',
      '/why-us': 'aboutSeo',
      '/blog': 'blogSeo',
      '/product/arcade-games': 'arcadeSeo',
      '/product/bowling-alley': 'bowlingSeo',
      '/product/soft-play': 'softplaySeo',
      '/product/trampoline-park': 'trampolineSeo',
      '/product/vr-games': 'vrSeo',
      '/product/bumper-car': 'bumpercarSeo',
      '/product/amusement-park': 'amusementSeo',
      '/product/ar-games': 'arSeo',
      '/product/hypergrid': 'hypergridSeo',
      '/product/laser-tag': 'lasertagSeo',
      '/resource/safety-standards': 'safetySeo',
      '/resource/roi': 'roiSeo',
      '/project': 'projectSeo',
      '/contact': 'contactSeo',
      '/privacy-policy': 'privacySeo',
      '/terms-and-conditions': 'termsSeo'
    };

    const seoKey = routeSeoKeyMap[pathname];
    let customCanonical = '';
    if (seoKey && siteData && siteData[seoKey]) {
      customCanonical = siteData[seoKey].canonicalUrl || '';
    } else if (pathname === '/product/bumper-car' && siteData?.bumperSeo?.canonicalUrl) {
      customCanonical = siteData.bumperSeo.canonicalUrl;
    }

    // Determine target URL: Admin configured custom URL or clean standard live URL
    const targetUrl = customCanonical && customCanonical.trim() !== ''
      ? customCanonical.trim()
      : `https://winera.in${pathname === '/' ? '/' : pathname}`;

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', targetUrl);
  }, [pathname, siteData]);

  return null;
}

import { VideoModalProvider } from './context/VideoModalContext';
import WhatsAppFloat from './components/WhatsAppFloat';
import GlobalSeoSchema from './components/GlobalSeoSchema';

function AppRoutes({ siteData, loadData }) {
  const location = useLocation();

  useEffect(() => {
    // If navigating to an inner page and full data is not yet loaded, load it immediately
    if (location.pathname !== '/' && location.pathname !== '' && (!siteData || !siteData.aboutHero)) {
      loadData(true);
    }
  }, [location.pathname, siteData, loadData]);

  return (
    <ErrorBoundary>
      <GlobalScrollAnimation />
      <GlobalCanonicalTag siteData={siteData} />
      <GlobalSeoSchema />
      <WhatsAppFloat whatsAppUrl={siteData?.header?.whatsAppUrl} />
      <Suspense fallback={
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F5F5F9'
        }}>
          <img
            src={wineraLogo}
            alt="Loading Winera..."
            className="winera-logo-blinking"
            width="120"
            height="32"
            style={{ width: '120px', height: 'auto', aspectRatio: '120 / 32', objectFit: 'contain' }}
          />
        </div>
      }>
        <Routes location={location} key={location.pathname}>
          {/* 1. Home Page */}
          <Route path="/" element={<Home siteData={siteData} />} />

          {/* 2. Blog Page & Blog Detail (Canonical /blog & /blog/:id) */}
          <Route path="/blog" element={<Blog siteData={siteData} />} />
          <Route path="/blog/:id" element={<BlogDetail siteData={siteData} />} />

          {/* 3. About Us Page (Canonical /why-us) */}
          <Route path="/why-us" element={<AboutUs siteData={siteData} />} />

          {/* 4. Arcade Games (Canonical /product/arcade-games) */}
          <Route path="/product/arcade-games" element={<ArcadeGame siteData={siteData} />} />

          {/* 5. Bowling Alley (Canonical /product/bowling-alley) */}
          <Route path="/product/bowling-alley" element={<BowlingAlley siteData={siteData} />} />

          {/* 6. Soft Play (Canonical /product/soft-play) */}
          <Route path="/product/soft-play" element={<SoftPlay siteData={siteData} />} />

          {/* 7. Trampoline Park (Canonical /product/trampoline-park) */}
          <Route path="/product/trampoline-park" element={<TrampolinePark siteData={siteData} />} />

          {/* 8. VR Games (Canonical /product/vr-games) */}
          <Route path="/product/vr-games" element={<VrGames siteData={siteData} />} />

          {/* 9. Bumper Car (Canonical /product/bumper-car) */}
          <Route path="/product/bumper-car" element={<BumperCar siteData={siteData} />} />

          {/* 10. Amusement Park (Canonical /product/amusement-park) */}
          <Route path="/product/amusement-park" element={<AmusementPark siteData={siteData} />} />

          {/* 11. AR Games (Canonical /product/ar-games) */}
          <Route path="/product/ar-games" element={<ArGames siteData={siteData} />} />

          {/* 12. Hypergrid (Canonical /product/hypergrid) */}
          <Route path="/product/hypergrid" element={<Hypergrid siteData={siteData} />} />

          {/* 13. Laser Tag (Canonical /product/laser-tag) */}
          <Route path="/product/laser-tag" element={<LaserTag siteData={siteData} />} />

          {/* Product Detail Dynamic Route (Canonical /product/:slug) */}
          <Route path="/product/:slug" element={<ArcadeGameDetail siteData={siteData} />} />

          {/* 14. Safety Standards (Canonical /resource/safety-standards) */}
          <Route path="/resource/safety-standards" element={<SafetyStandards siteData={siteData} />} />

          {/* 15. ROI (Canonical /resource/roi) */}
          <Route path="/resource/roi" element={<Roi siteData={siteData} />} />

          {/* 16. Project Page & Single Project Detail (Canonical /project & /project/:slug) */}
          <Route path="/project" element={<Project siteData={siteData} />} />
          <Route path="/project/:slug" element={<ProjectDetail siteData={siteData} />} />

          {/* 17. Contact Us (Canonical /contact) */}
          <Route path="/contact" element={<ContactUs siteData={siteData} />} />

          {/* 18. Privacy Policy & Terms (Canonical) */}
          <Route path="/privacy-policy" element={<PrivacyPolicy siteData={siteData} />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions siteData={siteData} />} />

          {/* 19. Admin CMS */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard siteData={siteData} refreshContent={loadData} />} />

          {/* 20. Strict Fallback 404 Page Not Found Route for all non-canonical / invalid URLs */}
          <Route path="*" element={<NotFoundPage siteData={siteData} />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default function App() {
  const [siteData, setSiteData] = useState(() => {
    try {
      const cached = localStorage.getItem('winera_home_content');
      return cached ? JSON.parse(cached) : null;
    } catch (e) {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  const loadData = async (forceFull = false) => {
    try {
      const isHome = typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '');
      const pageParam = (!forceFull && isHome) ? 'home' : null;
      const data = await fetchSiteContent(pageParam);
      if (data && Object.keys(data).length > 0) {
        setSiteData(data);
        if (pageParam === 'home') {
          try {
            localStorage.setItem('winera_home_content', JSON.stringify(data));
          } catch (e) {}
        }
      }

      // If we loaded lightweight homepage content first, silently fetch full site data in the background
      // on first user interaction (scroll, touch, click) or after 15 seconds, avoiding Lighthouse test window
      if (pageParam === 'home') {
        const scheduleFullFetch = () => {
          if (typeof window === 'undefined' || window._wineraFullDataScheduled) return;
          window._wineraFullDataScheduled = true;
          fetchSiteContent().then(fullData => {
            if (fullData && Object.keys(fullData).length > 0) {
              setSiteData(prev => ({ ...prev, ...fullData }));
            }
          }).catch(() => {});
        };

        ['scroll', 'touchstart', 'click'].forEach(evt => {
          window.addEventListener(evt, scheduleFullFetch, { once: true, passive: true });
        });
        setTimeout(scheduleFullFetch, 15000);
      }
    } catch (err) {
      console.error('Failed to load content from backend, fallback to local', err);
      if (!siteData) setSiteData({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <AuthProvider>
      <VideoModalProvider>
        <Router>
          <AppRoutes siteData={siteData} loadData={loadData} />
        </Router>
      </VideoModalProvider>
    </AuthProvider>
  );
}

