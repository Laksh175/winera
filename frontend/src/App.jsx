import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { fetchSiteContent } from './services/api';

// Route Level Code Splitting with React.lazy
const Home = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const ArcadeGame = lazy(() => import('./pages/ArcadeGame'));
const ArcadeGameDetail = lazy(() => import('./pages/ArcadeGameDetail'));
const BowlingAlley = lazy(() => import('./pages/BowlingAlley'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const SoftPlay = lazy(() => import('./pages/SoftPlay'));
const BumperCar = lazy(() => import('./pages/BumperCar'));
const VrGames = lazy(() => import('./pages/VrGames'));
const ArGames = lazy(() => import('./pages/ArGames'));
const AmusementPark = lazy(() => import('./pages/AmusementPark'));
const Hypergrid = lazy(() => import('./pages/Hypergrid'));
const Project = lazy(() => import('./pages/Project'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const SafetyStandards = lazy(() => import('./pages/SafetyStandards'));
const TrampolinePark = lazy(() => import('./pages/TrampolinePark'));
const Roi = lazy(() => import('./pages/Roi'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const LaserTag = lazy(() => import('./pages/LaserTag'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));

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

    // Force DOM reflow so browser engine acknowledges removal of animation classes
    void document.body.offsetHeight;

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
        rootMargin: '0px 0px -30px 0px',
        threshold: 0.03
      }
    );

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
        if (el.classList.contains('framer-motion-wrapper') || el.dataset.noAutoReveal === 'true') {
          return;
        }
        // If section contains explicit side-slide elements or framer motion elements, do not force section-wide winera-reveal
        if (el.tagName === 'SECTION' && el.querySelector('.winera-reveal-left, .winera-reveal-right, [data-framer-motion="true"]')) {
          return;
        }
        if (!el.classList.contains('winera-reveal') && !el.classList.contains('winera-animate-block') && !el.classList.contains('winera-reveal-left') && !el.classList.contains('winera-reveal-right')) {
          el.classList.add('winera-reveal');
        }
        observer.observe(el);
      });
    };

    scanAndObserve();

    const animationFrameId = requestAnimationFrame(() => {
      scanAndObserve();
    });

    const interval = setInterval(scanAndObserve, 250);
    const timeout = setTimeout(() => clearInterval(interval), 3000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

import { VideoModalProvider } from './context/VideoModalContext';
import WhatsAppFloat from './components/WhatsAppFloat';

function AppRoutes({ siteData, loadData }) {
  const location = useLocation();

  return (
    <>
      <GlobalScrollAnimation />
      <WhatsAppFloat whatsAppUrl={siteData?.header?.whatsAppUrl} />
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#F5F5F9' }} />}>
        <Routes location={location} key={location.pathname}>
          {/* 1. Home Page */}
          <Route path="/" element={<Home siteData={siteData} />} />

          {/* 2. Blog Page & Blog Detail */}
          <Route path="/blog" element={<Blog siteData={siteData} />} />
          <Route path="/blog/:id" element={<BlogDetail siteData={siteData} />} />
          <Route path="/resources/blog" element={<Blog siteData={siteData} />} />
          <Route path="/resources/blog/:id" element={<BlogDetail siteData={siteData} />} />

          {/* 3. About Us Page */}
          <Route path="/why-us" element={<AboutUs siteData={siteData} />} />
          <Route path="/about" element={<AboutUs siteData={siteData} />} />
          <Route path="/about-us" element={<AboutUs siteData={siteData} />} />

          {/* 4. Arcade Games */}
          <Route path="/product/arcade-games" element={<ArcadeGame siteData={siteData} />} />
          <Route path="/products/arcade-games" element={<ArcadeGame siteData={siteData} />} />
          <Route path="/products/arcade-game" element={<ArcadeGame siteData={siteData} />} />
          <Route path="/arcade-game" element={<ArcadeGame siteData={siteData} />} />

          {/* 5. Bowling Alley */}
          <Route path="/product/bowling-alley" element={<BowlingAlley siteData={siteData} />} />
          <Route path="/products/bowling-alley" element={<BowlingAlley siteData={siteData} />} />
          <Route path="/bowling-alley" element={<BowlingAlley siteData={siteData} />} />

          {/* 6. Soft Play */}
          <Route path="/product/soft-play" element={<SoftPlay siteData={siteData} />} />
          <Route path="/products/soft-play" element={<SoftPlay siteData={siteData} />} />
          <Route path="/soft-play" element={<SoftPlay siteData={siteData} />} />

          {/* 7. Trampoline Park */}
          <Route path="/product/trampoline-park" element={<TrampolinePark siteData={siteData} />} />
          <Route path="/products/trampoline-park" element={<TrampolinePark siteData={siteData} />} />
          <Route path="/products/trampoline-parks" element={<TrampolinePark siteData={siteData} />} />
          <Route path="/trampoline-park" element={<TrampolinePark siteData={siteData} />} />

          {/* 8. VR Games */}
          <Route path="/product/vr-games" element={<VrGames siteData={siteData} />} />
          <Route path="/products/vr-games" element={<VrGames siteData={siteData} />} />
          <Route path="/vr-games" element={<VrGames siteData={siteData} />} />
          <Route path="/product/vr-game" element={<VrGames siteData={siteData} />} />
          <Route path="/products/vr-game" element={<VrGames siteData={siteData} />} />
          <Route path="/vr-game" element={<VrGames siteData={siteData} />} />
          <Route path="/vr" element={<VrGames siteData={siteData} />} />

          {/* 9. Bumper Car */}
          <Route path="/product/bumper-car" element={<BumperCar siteData={siteData} />} />
          <Route path="/products/bumper-car" element={<BumperCar siteData={siteData} />} />
          <Route path="/products/bumper-cars" element={<BumperCar siteData={siteData} />} />
          <Route path="/bumper-car" element={<BumperCar siteData={siteData} />} />

          {/* 10. Amusement Park */}
          <Route path="/product/amusement-park" element={<AmusementPark siteData={siteData} />} />
          <Route path="/products/amusement-park" element={<AmusementPark siteData={siteData} />} />
          <Route path="/amusement-park" element={<AmusementPark siteData={siteData} />} />

          {/* 11. AR Games */}
          <Route path="/product/ar-games" element={<ArGames siteData={siteData} />} />
          <Route path="/products/ar-games" element={<ArGames siteData={siteData} />} />
          <Route path="/ar-games" element={<ArGames siteData={siteData} />} />
          <Route path="/product/ar-game" element={<ArGames siteData={siteData} />} />
          <Route path="/products/ar-game" element={<ArGames siteData={siteData} />} />
          <Route path="/ar-game" element={<ArGames siteData={siteData} />} />

          {/* 12. Hypergrid */}
          <Route path="/product/hypergrid" element={<Hypergrid siteData={siteData} />} />
          <Route path="/products/hypergrid" element={<Hypergrid siteData={siteData} />} />
          <Route path="/hypergrid" element={<Hypergrid siteData={siteData} />} />

          {/* 13. Laser Tag */}
          <Route path="/product/laser-tag" element={<LaserTag siteData={siteData} />} />
          <Route path="/products/laser-tag" element={<LaserTag siteData={siteData} />} />
          <Route path="/laser-tag" element={<LaserTag siteData={siteData} />} />

          {/* Arcade Detail Dynamic Route */}
          <Route path="/product/:slug" element={<ArcadeGameDetail siteData={siteData} />} />
          <Route path="/arcade-game/:slug" element={<ArcadeGameDetail siteData={siteData} />} />

          {/* 14. Safety Standards */}
          <Route path="/resource/safety-standards" element={<SafetyStandards siteData={siteData} />} />
          <Route path="/resources/safety-standards" element={<SafetyStandards siteData={siteData} />} />
          <Route path="/safety-standards" element={<SafetyStandards siteData={siteData} />} />

          {/* 15. ROI */}
          <Route path="/resource/roi" element={<Roi siteData={siteData} />} />
          <Route path="/resources/roi" element={<Roi siteData={siteData} />} />
          <Route path="/roi" element={<Roi siteData={siteData} />} />

          {/* 16. Project Page & Single Project Detail */}
          <Route path="/project" element={<Project siteData={siteData} />} />
          <Route path="/projects" element={<Project siteData={siteData} />} />
          <Route path="/project/:slug" element={<ProjectDetail siteData={siteData} />} />

          {/* 17. Contact Us */}
          <Route path="/contact" element={<ContactUs siteData={siteData} />} />
          <Route path="/contact-us" element={<ContactUs siteData={siteData} />} />

          {/* 18. Privacy Policy & Terms */}
          <Route path="/privacy-policy" element={<PrivacyPolicy siteData={siteData} />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions siteData={siteData} />} />
          <Route path="/terms" element={<TermsAndConditions siteData={siteData} />} />

          {/* 19. Admin CMS */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard siteData={siteData} refreshContent={loadData} />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default function App() {
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await fetchSiteContent();
      setSiteData(data || {});
    } catch (err) {
      console.error('Failed to load content from backend, fallback to local', err);
      setSiteData({});
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

