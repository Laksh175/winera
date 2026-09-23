import React, { useEffect, useState } from 'react';
import { ShieldCheck, Settings, Database, Headset, Wrench, Box, ChevronLeft, ChevronRight, ChevronDown, Search, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectsMarqueeSection from '../components/ProjectsMarqueeSection';
import TestimonialsSection from '../components/TestimonialsSection';
import RelatedProductsSection from '../components/RelatedProductsSection';
import FaqSection from '../components/FaqSection';
import CtaBanner from '../components/CtaBanner';
import MobileExpandableText from '../components/MobileExpandableText';
import arHeroBg from '../assets/argame-hero-bg.webp';
import arHeroMobileBg from '../assets/Ar game phone banner.png';
import arSupplierCollage from '../assets/ar-supplier-collage.webp';
import arAttractionsGraphic from '../assets/ar-attractions-graphic.webp';
import arFeaturesBg from '../assets/ar-features-bg.webp';
import arEarnGamers from '../assets/ar-earn-gamers.webp';
import yellowStrokeLine from '../assets/yellow-stroke-line.webp';
import ctaConsultationsBanner from '../assets/cta-consultations-banner.webp';
import needConsultationsBg from '../assets/cta-consultations-banner.webp';
import homeBlock1 from '../assets/home-block-1.webp';
import vrCtaRightImg from '../assets/vr-cta-right-img.webp';
import amusementParkCtaBg from '../assets/cta-consultations-banner.webp';
import ctaMainBanner from '../assets/cta-main-banner.png';
import superAirHockeyImg from '../assets/super-air-hockey.webp';
import puckCarnivalAirHockeyImg from '../assets/puck-carnival-air-hockey.webp';
import dazzlingAirHockeyImg from '../assets/dazzling-air-hockey.webp';
import auroraAirHockeyImg from '../assets/aurora-air-hockey.webp';
import ochaAirHockeyImg from '../assets/ocha-air-hockey.webp';
import aeroXAirHockeyImg from '../assets/aero-x-air-hockey.webp';
import WhyChooseUsMobileSlider from '../components/WhyChooseUsMobileSlider';
import ArcadeSwipeCardDeck from '../components/ArcadeSwipeCardDeck';

const airHockeyImageMap = {
  "Super Air Hockey": superAirHockeyImg,
  "Puck Carnival Air Hockey": puckCarnivalAirHockeyImg,
  "Dazzling Air Hockey - Multi Puck": dazzlingAirHockeyImg,
  "Aurora Air Hockey": auroraAirHockeyImg,
  "Ocha Air Hockey": ochaAirHockeyImg,
  "Aero X Air Hockey": aeroXAirHockeyImg
};

const getValidImageUrl = (url, fallback) => {
  if (!url || typeof url !== 'string' || url.trim() === '' || url.includes('/src/assets/')) {
    return fallback;
  }
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  if (url.startsWith('/uploads')) {
    const hostname = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';
    return `http://${hostname}:5001${url}`;
  }
  return fallback;
};

// Helper function to render title with *word* highlights and <br/> linebreaks
const renderTitleMarkup = (rawText, defaultText, highlightColor = '#38bdf8') => {
  const text = rawText || defaultText;
  const parts = text.split(/\*{1,2}(.*?)\*{1,2}/gs);

  return parts.map((part, pIdx) => {
    const isHighlighted = pIdx % 2 === 1;
    const lines = part.split(/<br\s*\/?>/i);
    const renderedContent = lines.map((line, lIdx) => (
      <React.Fragment key={lIdx}>
        {lIdx > 0 && <br />}
        {line}
      </React.Fragment>
    ));

    if (isHighlighted) {
      const hasBr = part.toLowerCase().includes('<br');
      return (
        <span key={pIdx} style={{ color: highlightColor, whiteSpace: hasBr ? 'normal' : 'nowrap' }}>
          {renderedContent}
        </span>
      );
    }
    return <React.Fragment key={pIdx}>{renderedContent}</React.Fragment>;
  });
};

export default function ArGames({ siteData }) {
  const arSeo = siteData?.arSeo || {
    pageTitle: "AR Games Supplier in India | Winera International",
    metaDescription: "Winera International is a leading AR games supplier in India, sourcing and installing sports simulators, interactive floors, and immersive gaming attractions."
  };

  useEffect(() => {
    document.title = arSeo.pageTitle || arSeo.title || "AR Games Supplier in India | Winera International";
    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'description');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', arSeo.metaDescription || arSeo.description || "Winera International is a leading AR games supplier in India, sourcing and installing sports simulators, interactive floors, and immersive gaming attractions.");
  }, [arSeo]);

  const [activeCategory, setActiveCategory] = useState('Sports Simulators');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');



  const defaultCategoryProducts = {
    "Sports Simulators": [
      {
        "name": "Super Air Hockey",
        "img": superAirHockeyImg
      },
      {
        "name": "Puck Carnival Air Hockey",
        "img": puckCarnivalAirHockeyImg
      },
      {
        "name": "Dazzling Air Hockey - Multi Puck",
        "img": dazzlingAirHockeyImg
      },
      {
        "name": "Aurora Air Hockey",
        "img": auroraAirHockeyImg
      },
      {
        "name": "Ocha Air Hockey",
        "img": ochaAirHockeyImg
      },
      {
        "name": "Aero X Air Hockey",
        "img": aeroXAirHockeyImg
      }
    ],
    "Interactive Games": [
      {
        "name": "SAIO All-in-One 2.0",
        "img": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "SAIO (LED Version)",
        "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Omniball LED Version",
        "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Omniball",
        "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Combat 6",
        "img": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Cyber Dunk Reality",
        "img": "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Interactive Running Wall",
        "img": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Interactive Curling",
        "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Cyber AR Boxing",
        "img": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "AR Spin Bike",
        "img": "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "AR Spin Bikes — Luxe",
        "img": "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Interactive Rock Climbing",
        "img": "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Magic Billiard",
        "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Dynamic Kayaking",
        "img": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Interactive Billiards",
        "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Whac-a-Mole on Wall",
        "img": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Wonder Wall",
        "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Interactive Slide",
        "img": "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "AR Magic Swing",
        "img": "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Music Wall",
        "img": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Legend Archery",
        "img": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Roll Action",
        "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Particle Man",
        "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Super Grid",
        "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Laser Maze",
        "img": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Motion Master Console",
        "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
      }
    ],
    "AR & VR Experiences": [
      {
        "name": "AR Bumper Car",
        "img": "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "AR Garden",
        "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "AR Spin Bike",
        "img": "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "AR Spin Bikes — Luxe",
        "img": "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Immersive Laser Shooting",
        "img": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "10M High Range High Accuracy Laser Shooting",
        "img": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Hunting Storm Realistic",
        "img": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Wireless Laser Tag",
        "img": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "7D Imax Cinema",
        "img": "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Immersive Dynamic Cinema",
        "img": "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Immersive Room",
        "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Immersive Restaurant",
        "img": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "AI Holographic Bot",
        "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Fog Screen Machine",
        "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Radar",
        "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
      }
    ],
    "Interactive Floors & Walls": [
      {
        "name": "Magic Floor — Integrated",
        "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Magic Floor — Outdoor",
        "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Magic Floor — Indoor",
        "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Active Game LED Floor",
        "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Digital Display Wall",
        "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Wonderful World",
        "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Magical Waterfall",
        "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Wonder Wall",
        "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
      }
    ],
    "Kids & Family": [
      {
        "name": "Interactive Trampoline",
        "img": "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Interactive Sandbox",
        "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Magic Egg Fort",
        "img": "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Interactive Slide",
        "img": "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "AR Garden",
        "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Gesture Interactive Book",
        "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
      }
    ],
    "Bowling & Ball Games": [
      {
        "name": "Top Bowling",
        "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Bowling",
        "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Mini Bowling",
        "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Interactive Bowling",
        "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
      }
    ],
    "Fitness & Education": [
      {
        "name": "Gym Education Interactive Training System",
        "img": "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "AR Spin Bike",
        "img": "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Interactive Rock Climbing",
        "img": "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Cyber AR Boxing",
        "img": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=600&q=80"
      }
    ],
    "Immersive Zones": [
      {
        "name": "Immersive Room",
        "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Immersive Restaurant",
        "img": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "Immersive Dynamic Cinema",
        "img": "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=600&q=80"
      },
      {
        "name": "7D Imax Cinema",
        "img": "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=600&q=80"
      }
    ]
  };

  const categoriesData = siteData?.arCategoriesData || defaultCategoryProducts;
  const categories = Object.keys(categoriesData);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const defaultArFaqs = [
    { question: "Who is a reliable AR games supplier in India?", answer: "Winera International is a direct AR games supplier in India, sourcing and installing commercial AR and interactive gaming equipment for malls, hotels, schools, resorts, and family entertainment centres." },
    { question: "What is the setup cost for AR gaming equipment in India?", answer: "AR gaming cost in India depends on the product category, number of units and customisation requirements. Winera provides a complete cost breakdown of equipment, installation, and maintenance before confirming any order. Contact our team for a quote specific to your venue." },
    { question: "What is the minimum space required for AR gaming equipment?", answer: "Space requirements vary by product. Interactive floor tiles start from 30x30cm per module, while full sports simulators typically require 4–9 metres in length and 3–3.5 metres ceiling height. Winera's team assesses your exact dimensions before recommending compatible products." },
    { question: "How do I get started with an AR gaming zone setup from Winera?", answer: "Contact us via our website's contact form, WhatsApp, or call +91 94289 89488. Share your venue type, available floor space, and the type of interactive experience you want to offer. Our team will recommend the right product mix, prepare a free ROI report, and send a quote ASAP." },
    { question: "Can AR gaming equipment be customised with branding or specific game content?", answer: "Yes. Many products in our range support custom branding, game library selection, and venue-specific content configuration. We confirm available customisation options for each product during the consultation stage." },
    { question: "What is the typical ROI for an AR gaming zone in India?", answer: "ROI depends on your venue type, daily footfall, session pricing, and machine mix. Winera prepares a free ROI report for every project — covering projected daily sessions, estimated revenue per attraction, maintenance costs, and break-even timeline — specific to your venue before you confirm any order." },
    { question: "Does Winera provide after-sales support for AR and interactive gaming equipment?", answer: "Yes. Our own technicians provide software updates, hardware servicing, and on-site support for all AR games and interactive gaming equipment we install — directly through our own team, without third-party service agents." },
    { question: "How long does AR gaming equipment installation take?", answer: "Installation timelines depend on the number of products, venue readiness, and configuration complexity. A single interactive floor system can be operational within days, while a complete multi-category AR gaming zone takes longer for full setup and software configuration." }
  ];

  const categoryProducts = categoriesData[activeCategory] || categoriesData[categories[0]] || [];
  const currentProducts = searchQuery.trim()
    ? categoryProducts.filter(p => {
        const q = searchQuery.toLowerCase().trim();
        const name = (p.name || p.title || "").toLowerCase();
        const cat = (p.category || activeCategory || "").toLowerCase();
        return name.includes(q) || cat.includes(q);
      })
    : categoryProducts;
  const itemsPerPage = 6;
  const totalPages = Math.ceil(currentProducts.length / itemsPerPage) || 1;
  const paginatedProducts = currentProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const header = siteData?.header || {};
  const footer = siteData?.footer || {};

  const heroBgImage = siteData?.arHero?.bgUrl || siteData?.arHero?.bg || arHeroBg;

  return (
    <div style={{ backgroundColor: '#F5F5F9', color: '#0f172a', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 1. HEADER NAVBAR */}
      <Header headerData={header} />

      {/* 2. AR GAMES HERO BANNER SECTION (MATCHING 1:1 SECOND IMAGE UI) */}
      <section className="winera-ar-hero-section" style={{
        position: 'relative',
        width: '100%',
        paddingTop: '175px',
        paddingBottom: '95px',
        background: `url(${heroBgImage}) center top / 100% 100% no-repeat`,
        '--winera-ar-mobile-bg': `url("${arHeroMobileBg}")`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          {/* Centered Single Line Heading: Home › AR Games */}
          <h1 className="winera-ar-hero-h1" style={{
            fontSize: '21px',
            fontWeight: '800',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            margin: 0,
            lineHeight: 1.2,
            textAlign: 'center'
          }}>
            <a href="/" style={{ color: '#ffffff', textDecoration: 'none' }}>Home</a>
            <span style={{ color: '#ffffff', fontWeight: '400' }}>&rsaquo;</span>
            <span style={{ color: '#ffcd00', fontWeight: '900' }}>
              {siteData?.arHero?.breadcrumbText || "AR Games"}
            </span>
          </h1>
        </div>
      </section>

      {/* 3. AR GAMES SUPPLIER IN INDIA SECTION (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-ar-supplier-section" style={{ padding: '45px 4vw 25px', background: '#F5F5F9', overflow: 'hidden' }}>
        <div className="winera-ar-supplier-grid" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: '70px',
          alignItems: 'center'
        }}>
          {/* Left Text Content Column */}
          <div className="winera-ar-supplier-text">
            <div style={{ position: 'relative', display: 'block', marginBottom: '16px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', width: '320px', height: '10px', marginBottom: '10px', objectFit: 'fill' }}
              />
              <h2 style={{ fontSize: '35px', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                {renderTitleMarkup(siteData?.arIntro?.title, "*AR Games* Supplier<br/>in India", '#38bdf8')}
              </h2>
            </div>

            <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.65, fontWeight: '500', marginBottom: '10px', maxWidth: '500px' }}>
              {siteData?.arIntro?.desc || "India's ROI-first AR games supplier — we source, install, and service interactive gaming attractions that draw crowds."}
            </p>

            <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
              {(() => {
                const baseLink = siteData?.arIntro?.buttonLink || "https://wa.me/919428989488";
                const defaultMsg = siteData?.arIntro?.waMessage || "Hello Winera International! I want to get a quote and details for AR Games setup. Please share details. [Ref: AR Games Page]";
                let hrefLink = baseLink;
                if (!baseLink.includes('text=')) {
                  const separator = baseLink.includes('?') ? '&' : '?';
                  hrefLink = `${baseLink}${separator}text=${encodeURIComponent(defaultMsg)}`;
                }
                return (
                  <a
                    href={hrefLink}
                    target="_blank"
                    rel="noreferrer"
                    className="winera-cyan-cta-btn winera-cyan-cta-btn-sm"
                  >
                    {siteData?.arIntro?.buttonText || "Get Quote From Expert"}
                  </a>
                );
              })()}
            </div>
          </div>

          {/* Right Collage Graphic Container */}
          <div className="winera-ar-supplier-img" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={siteData?.arIntro?.mainImgUrl || arSupplierCollage}
              alt="AR Games Supplier in India"
              style={{
                width: '100%',
                maxWidth: '520px',
                marginBottom: '3%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE AR ATTRACTIONS, BUILT FOR YOUR VENUE SECTION (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-ar-attractions-section" style={{ padding: '5px 4vw 45px', background: '#F5F5F9', overflow: 'hidden' }}>
        <div className="winera-ar-attractions-grid" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Left Image Column */}
          <div className="winera-ar-attractions-img" style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <img
              src={siteData?.arMatchedVenue?.imgUrl || arAttractionsGraphic}
              alt="Interactive AR Attractions Setup"
              style={{
                width: '100%',
                maxWidth: '580px',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>

          {/* Right Text Column */}
          <div className="winera-ar-attractions-text">
            <div style={{ position: 'relative', display: 'block', marginBottom: '22px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', width: '300px', height: '10px', marginBottom: '12px', objectFit: 'fill' }}
              />
              <h2 style={{
                fontSize: '35px',
                fontWeight: '900',
                lineHeight: 1.15,
                margin: 0,
                color: '#0f172a',
                letterSpacing: '-0.5px'
              }}>
                {renderTitleMarkup(
                  siteData?.arMatchedVenue?.title,
                  "Interactive AR Attractions,<br/>*Built for Your Venue*",
                  '#38bdf8'
                )}
              </h2>
            </div>

            <div style={{ marginBottom: '16px', maxWidth: '540px' }}>
              <MobileExpandableText
                preview={
                  <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: '0 0 8px 0' }}>
                    {siteData?.arMatchedVenue?.p1 || (
                      <>
                        Winera International is a trusted AR games supplier in India sourcing and installing commercial sports simulators, interactive floor systems, AR experiences, and immersive gaming equipment for malls, hotels, schools, resorts, and family entertainment centres for more than 15 Years. Every product is sourced from established global manufacturers and configured for sustained commercial use
                      </>
                    )}
                  </p>
                }
                expandedContent={
                  <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: '8px 0 0 0' }}>
                    {siteData?.arMatchedVenue?.p2 || (
                      <>
                        As a direct AR entertainment setup partner, our own team manages everything from space planning and product selection to installation and after-sales support — one team, zero third-party contractors.
                      </>
                    )}
                  </p>
                }
              />
            </div>

            <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
              {(() => {
                const baseLink = siteData?.arMatchedVenue?.buttonLink || "https://wa.me/919428989488";
                const defaultMsg = siteData?.arMatchedVenue?.waMessage || "Hello Winera International! I want to get a quote for Interactive AR Attractions setup for my venue. Please share details. [Ref: AR Games Page]";
                let hrefLink = baseLink;
                if (!baseLink.includes('text=')) {
                  const separator = baseLink.includes('?') ? '&' : '?';
                  hrefLink = `${baseLink}${separator}text=${encodeURIComponent(defaultMsg)}`;
                }
                return (
                  <a
                    href={hrefLink}
                    target="_blank"
                    rel="noreferrer"
                    className="winera-cyan-cta-btn winera-cyan-cta-btn-sm"
                  >
                    {siteData?.arMatchedVenue?.buttonText || "Get Quote From Expert"}
                  </a>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CATEGORIES SECTION (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-ar-categories-section" style={{ padding: '45px 4vw 50px', background: '#F5F5F9', textAlign: 'center' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Section Title: Categories: with yellow bar */}
          <div style={{ textAlign: 'center', marginBottom: '45px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '60px', height: '6px', backgroundColor: '#ffcd00', borderRadius: '3px', marginBottom: '14px' }}></div>
            <h2 style={{ fontSize: '35px', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
              Categories:
            </h2>
          </div>

          {/* Mobile Category Select Dropdown (Custom UI matching Arcade Game) */}
          <div className="winera-ar-mobile-cat-dropdown" style={{ display: 'none', marginBottom: '24px', width: '100%', position: 'relative', zIndex: 50 }}>
            <label style={{ display: 'block', fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px', textAlign: 'left' }}>
              Select Category:
            </label>

            {/* Category Toggle Button */}
            <button
              type="button"
              onClick={() => setIsCatDropdownOpen(!isCatDropdownOpen)}
              style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: '16px',
                border: '2px solid #38bdf8',
                background: '#ffffff',
                color: '#0f172a',
                fontSize: '15px',
                fontWeight: '800',
                outline: 'none',
                boxShadow: '0 4px 15px rgba(56, 189, 248, 0.12)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left'
              }}
            >
              <span>{activeCategory}</span>
              <ChevronDown style={{
                width: '20px',
                height: '20px',
                color: '#0284c7',
                transform: isCatDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.25s ease'
              }} />
            </button>

            {/* Custom Dropdown Options Menu */}
            {isCatDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: 0,
                right: 0,
                background: '#ffffff',
                border: '2px solid #38bdf8',
                borderRadius: '18px',
                boxShadow: '0 12px 35px rgba(2, 132, 199, 0.18)',
                overflow: 'hidden',
                zIndex: 100,
                maxHeight: '340px',
                overflowY: 'auto',
                padding: '6px'
              }}>
                {categories.map((cat, cIdx) => {
                  const isSelected = (activeCategory || "Sports Simulators") === cat;
                  return (
                    <div
                      key={cIdx}
                      onClick={() => {
                        setActiveCategory(cat);
                        setCurrentPage(1);
                        setIsCatDropdownOpen(false);
                      }}
                      style={{
                        padding: '13px 16px',
                        borderRadius: '12px',
                        fontSize: '15px',
                        fontWeight: isSelected ? '800' : '600',
                        color: isSelected ? '#ffffff' : '#0f172a',
                        background: isSelected ? '#38bdf8' : 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '3px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span>{cat}</span>
                      {isSelected && <span style={{ fontSize: '15px', fontWeight: '900' }}>✓</span>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Main Categories Grid Layout: Left Sidebar + Right 3x2 Card Grid */}
          <div className="winera-ar-categories-grid" style={{
            display: 'grid',
            gridTemplateColumns: '260px 1fr',
            gap: '30px',
            alignItems: 'start'
          }}>
            {/* Left Discover Our Products Sidebar Card */}
            <div className="winera-ar-sidebar" style={{
              background: 'linear-gradient(180deg, #b9e9fe 0%, #d8f3fe 60%, #e8f8fe 100%)',
              borderRadius: '24px',
              padding: '24px 18px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
              textAlign: 'left'
            }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', marginBottom: '18px', paddingLeft: '8px' }}>
                Discover our Products
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* Main AR Games Parent Header Pill Button (Matching Image 1) */}
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: '#38bdf8',
                    color: '#ffffff',
                    fontWeight: '800',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 12px rgba(56, 189, 248, 0.25)'
                  }}
                >
                  <span>AR Games</span>
                  <span style={{ fontSize: '10px' }}>∨</span>
                </div>

                {categories.map((cat, idx) => {
                  const isActive = cat === activeCategory;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveCategory(cat)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '12px',
                        background: isActive ? '#38bdf8' : 'transparent',
                        color: isActive ? '#ffffff' : '#64748b',
                        fontWeight: isActive ? '800' : '600',
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: isActive ? '0 4px 12px rgba(56, 189, 248, 0.25)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>{cat}</span>
                      <span style={{ fontSize: '10px', opacity: 0.8 }}>›</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Product Grid (Desktop Grid + Mobile 3D Swipe Deck Animation) */}
            <div className="winera-ar-products-display-area" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {/* Top Search Bar & Counter Pill Header */}
              <div className="winera-products-search-bar-wrap" style={{
                background: '#ffffff',
                border: '1.5px solid rgba(56, 189, 248, 0.4)',
                borderRadius: '18px',
                padding: '10px 16px',
                boxShadow: '0 4px 18px rgba(56, 189, 248, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                {/* Search Input Field with Lucide Icon */}
                <div style={{
                  position: 'relative',
                  flex: '1 1 240px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Search style={{
                    position: 'absolute',
                    left: '12px',
                    width: '18px',
                    height: '18px',
                    color: '#0284c7',
                    pointerEvents: 'none'
                  }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder={`Search in ${activeCategory || 'games'} (e.g. Simulator, Hockey)...`}
                    style={{
                      width: '100%',
                      padding: '10px 36px 10px 38px',
                      borderRadius: '12px',
                      border: '1px solid rgba(148, 163, 184, 0.3)',
                      background: '#f8fafc',
                      fontSize: '13.5px',
                      fontWeight: '500',
                      color: '#0f172a',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      boxSizing: 'border-box'
                    }}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setCurrentPage(1);
                      }}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        background: '#e2e8f0',
                        border: 'none',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#475569',
                        padding: 0
                      }}
                      title="Clear search"
                    >
                      <X style={{ width: '12px', height: '12px' }} />
                    </button>
                  )}
                </div>

                {/* Filter Count Indicator */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  color: '#64748b',
                  fontWeight: '600'
                }}>
                  <span>Showing <strong style={{ color: '#0284c7' }}>{currentProducts.length}</strong> {currentProducts.length === 1 ? 'game' : 'games'}</span>
                </div>
              </div>

              {/* Empty State when no games match search */}
              {currentProducts.length === 0 ? (
                <div style={{
                  background: 'linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)',
                  borderRadius: '24px',
                  padding: '45px 24px',
                  textAlign: 'center',
                  border: '1.5px dashed #7dd3fc',
                  width: '100%',
                  boxSizing: 'border-box',
                  marginBottom: '30px'
                }}>
                  <Search style={{ width: '36px', height: '36px', color: '#38bdf8', margin: '0 auto 12px' }} />
                  <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' }}>
                    {searchQuery ? `No games found matching "${searchQuery}"` : `No attractions found in ${activeCategory}`}
                  </h4>
                  <p style={{ fontSize: '13.5px', color: '#64748b', maxWidth: '460px', margin: '0 auto 18px', lineHeight: 1.6 }}>
                    {searchQuery ? `Try searching with another keyword or reset the search filter to view all attractions.` : `We supply and build custom interactive attractions tailored to your requirements.`}
                  </p>
                  {searchQuery ? (
                    <button
                      onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
                      style={{
                        background: '#38bdf8',
                        color: '#ffffff',
                        border: 'none',
                        padding: '10px 22px',
                        borderRadius: '12px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Clear Search
                    </button>
                  ) : (
                    <a
                      href={`https://wa.me/919428989488?text=${encodeURIComponent(`Hello Winera International! I want to inquire about ${activeCategory} catalog and pricing.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#38bdf8',
                        color: '#ffffff',
                        padding: '11px 22px',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '700',
                        textDecoration: 'none',
                        boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)'
                      }}
                    >
                      Request Catalog on WhatsApp
                    </a>
                  )}
                </div>
              ) : (
                <>
                  <div className="winera-ar-desktop-products-grid winera-ar-products-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '24px',
                    marginBottom: '40px'
                  }}>
                    {paginatedProducts.map((prod, pIdx) => {
                      const fallbackImg = airHockeyImageMap[prod.name] || superAirHockeyImg;
                      const finalImgSrc = getValidImageUrl(prod.img, fallbackImg);

                      return (
                        <div
                          key={pIdx}
                          style={{
                            background: 'linear-gradient(180deg, #d8f3fe 0%, #eaf8fe 100%)',
                            borderRadius: '24px',
                            padding: '18px 16px 16px',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
                            textAlign: 'center',
                            transition: 'transform 0.3s ease, boxShadow 0.3s ease'
                          }} >
                          {/* Inner Image Container with White Card Frame */}
                          <div style={{
                            borderRadius: '16px',
                            overflow: 'hidden',
                            height: '200px',
                            marginBottom: '16px',
                            background: '#ffffff',
                            padding: '6px',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
                          }}>
                            <img
                              src={finalImgSrc}
                              alt={prod.name}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '12px',
                                display: 'block'
                              }}
                            />
                          </div>

                          <h4 style={{
                            fontSize: '1.05rem',
                            fontWeight: '800',
                            color: '#0f172a',
                            margin: '4px 0 6px 0',
                            lineHeight: 1.35,
                            padding: '0 4px'
                          }}>
                            {prod.name}
                          </h4>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mobile Stacked 3D Swipe Card Deck Animation (Matching Arcade Game) */}
                  {(() => {
                    const swipeCards = currentProducts.map(p => {
                      const fallbackImg = airHockeyImageMap[p.name] || superAirHockeyImg;
                      const finalImgSrc = getValidImageUrl(p.img || p.imageUrl, fallbackImg);
                      return {
                        ...p,
                        name: p.name || p.title || "",
                        category: p.category || activeCategory || "AR Games",
                        imageUrl: finalImgSrc,
                        img: finalImgSrc,
                        slug: p.slug || (p.name ? p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : 'ar-game')
                      };
                    });
                    return swipeCards.length > 0 ? (
                      <ArcadeSwipeCardDeck cards={swipeCards} isClickable={false} showCta={false} />
                    ) : null;
                  })()}
                </>
              )}
            </div>
          </div>

          {/* Dynamic Bottom Pagination Controls (Centered across both blocks / full section width) */}
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '40px' }}>
            <div className="winera-ar-pagination" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(224, 242, 254, 0.65)',
              border: '1.5px solid #7dd3fc',
              padding: '6px 20px',
              borderRadius: '16px',
              boxShadow: 'none'
            }}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{
                  background: 'none',
                  border: 'none',
                  color: currentPage === 1 ? '#cbd5e1' : '#475569',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px'
                }}
                aria-label="Previous Page"
              >
                <ChevronLeft style={{ width: '18px', height: '18px' }} />
              </button>

              <button
                onClick={() => setCurrentPage(1)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '12px',
                  background: currentPage === 1 ? '#38bdf8' : 'transparent',
                  color: currentPage === 1 ? '#ffffff' : '#475569',
                  border: 'none',
                  fontWeight: currentPage === 1 ? '800' : '600',
                  fontSize: '14.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                1
              </button>

              <button
                onClick={() => setCurrentPage(2)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '12px',
                  background: currentPage === 2 ? '#38bdf8' : 'transparent',
                  color: currentPage === 2 ? '#ffffff' : '#475569',
                  border: 'none',
                  fontWeight: currentPage === 2 ? '800' : '600',
                  fontSize: '14.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                2
              </button>

              <button
                onClick={() => setCurrentPage(3)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '12px',
                  background: currentPage === 3 ? '#38bdf8' : 'transparent',
                  color: currentPage === 3 ? '#ffffff' : '#475569',
                  border: 'none',
                  fontWeight: currentPage === 3 ? '800' : '600',
                  fontSize: '14.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                3
              </button>

              <button
                onClick={() => setCurrentPage(4)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '12px',
                  background: currentPage === 4 ? '#38bdf8' : 'transparent',
                  color: currentPage === 4 ? '#ffffff' : '#475569',
                  border: 'none',
                  fontWeight: currentPage === 4 ? '800' : '600',
                  fontSize: '14.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                4
              </button>

              <span style={{ fontSize: '14.5px', fontWeight: '600', color: '#475569', padding: '0 4px' }}>...</span>

              <button
                onClick={() => setCurrentPage(71)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '12px',
                  background: currentPage === 71 ? '#38bdf8' : 'transparent',
                  color: currentPage === 71 ? '#ffffff' : '#475569',
                  border: 'none',
                  fontWeight: currentPage === 71 ? '800' : '600',
                  fontSize: '14.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                71
              </button>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, 71))}
                disabled={currentPage === 71}
                style={{
                  background: 'none',
                  border: 'none',
                  color: currentPage === 71 ? '#cbd5e1' : '#475569',
                  cursor: currentPage === 71 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px'
                }}
                aria-label="Next Page"
              >
                <ChevronRight style={{ width: '18px', height: '18px' }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. AR FEATURES & HIGHLIGHTS SECTION (FULL WIDTH TECH FRAME BG) */}
      <section className="winera-ar-features-section" style={{
        position: 'relative',
        width: '100%',
        padding: '100px 4vw 110px',
        backgroundImage: `url(${siteData?.arFeatures?.bgUrl || arFeaturesBg})`,
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '60px'
        }}>
          {/* Row 1: Exciting Attractions (Left Text + Right Image) */}
          <div className="winera-ar-feature-row" style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '40px',
            alignItems: 'center'
          }}>
            {/* Left Content */}
            <div className="winera-ar-feature-col-text" style={{ textAlign: 'left' }}>
              <div className="winera-ar-feature-title" style={{ position: 'relative', display: 'block', marginBottom: '14px' }}>
                <img
                  src={yellowStrokeLine}
                  alt=""
                  style={{ display: 'block', width: '260px', height: '10px', marginBottom: '8px', objectFit: 'fill' }}
                />
                <h2 style={{ fontSize: '35px', fontWeight: '900', color: '#0f172a', margin: 0, lineHeight: 1.15 }}>
                  {renderTitleMarkup(siteData?.arFeatures?.f1Title, "*Exciting* Attractions", '#38bdf8')}
                </h2>
              </div>
              <p className="winera-ar-feature-desc" style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0, textAlign: 'justify' }}>
                {siteData?.arFeatures?.f1Desc || "Bumper cars have long held a special place in the hearts of amusement park enthusiasts, and at Winera International, we take immense pride in delivering high-quality options that enhance the overall park experience. As a leading bumper car manufacturer in India and trusted bumper car manufacturer, our creations are not just rides; they're an exhilarating blend of thrilling collisions and smooth handling, designed with a laser focus on safety and durability."}
              </p>
            </div>

            {/* Right Image */}
            <div className="winera-ar-feature-col-img" style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.12)' }}>
              <img
                src={siteData?.arFeatures?.f1Img || 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80'}
                alt="Exciting Attractions"
                style={{ width: '100%', height: '230px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>

          {/* Row 2: High-Quality Equipment (Left Image + Right Text) */}
          <div className="winera-ar-feature-row" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '40px',
            alignItems: 'center'
          }}>
            {/* Left Image */}
            <div className="winera-ar-feature-col-img" style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.12)' }}>
              <img
                src={siteData?.arFeatures?.f2Img || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80'}
                alt="High-Quality Equipment"
                style={{ width: '100%', height: '230px', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Right Content */}
            <div className="winera-ar-feature-col-text" style={{ textAlign: 'left' }}>
              <div className="winera-ar-feature-title" style={{ position: 'relative', display: 'block', marginBottom: '14px' }}>
                <img
                  src={yellowStrokeLine}
                  alt=""
                  style={{ display: 'block', width: '260px', height: '10px', marginBottom: '8px', objectFit: 'fill' }}
                />
                <h2 style={{ fontSize: '35px', fontWeight: '900', color: '#0f172a', margin: 0, lineHeight: 1.15 }}>
                  {renderTitleMarkup(siteData?.arFeatures?.f2Title, "High-Quality *Equipment*", '#38bdf8')}
                </h2>
              </div>
              <p className="winera-ar-feature-desc" style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0, textAlign: 'justify' }}>
                {siteData?.arFeatures?.f2Desc || "Bumper cars have long held a special place in the hearts of amusement park enthusiasts, and at Winera International, we take immense pride in delivering high-quality options that enhance the overall park experience. As a leading bumper car manufacturer in India and trusted bumper car manufacturer, our creations are not just rides; they're an exhilarating blend of thrilling collisions and smooth handling, designed with a laser focus on safety and durability."}
              </p>
            </div>
          </div>

          {/* Row 3: Budget-Friendly AR Entertainment Setup (Left Text + Right Image) */}
          <div className="winera-ar-feature-row" style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '40px',
            alignItems: 'center'
          }}>
            {/* Left Content */}
            <div className="winera-ar-feature-col-text" style={{ textAlign: 'left' }}>
              <div className="winera-ar-feature-title" style={{ position: 'relative', display: 'block', marginBottom: '14px' }}>
                <img
                  src={yellowStrokeLine}
                  alt=""
                  style={{ display: 'block', width: '280px', height: '10px', marginBottom: '8px', objectFit: 'fill' }}
                />
                <h2 style={{ fontSize: '35px', fontWeight: '900', color: '#0f172a', margin: 0, lineHeight: 1.15 }}>
                  {renderTitleMarkup(siteData?.arFeatures?.f3Title, "*Budget-Friendly AR*<br/>Entertainment Setup", '#38bdf8')}
                </h2>
              </div>
              <p className="winera-ar-feature-desc" style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0, textAlign: 'justify' }}>
                {siteData?.arFeatures?.f3Desc || "Bumper cars have long held a special place in the hearts of amusement park enthusiasts, and at Winera International, we take immense pride in delivering high-quality options that enhance the overall park experience. As a leading bumper car manufacturer in India and trusted bumper car manufacturer, our creations are not just rides; they're an exhilarating blend of thrilling collisions and smooth handling, designed with a laser focus on safety and durability."}
              </p>
            </div>

            {/* Right Image */}
            <div className="winera-ar-feature-col-img" style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.12)' }}>
              <img
                src={siteData?.arFeatures?.f3Img || 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=800&q=80'}
                alt="Budget-Friendly AR Setup"
                style={{ width: '100%', height: '230px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. KNOW YOUR RETURNS BEFORE YOU INVEST IN AR GAMING EQUIPMENT SECTION (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-ar-earn-section" style={{
        position: 'relative',
        width: '100%',
        padding: '70px 4vw 80px',
        background: 'rgb(245, 245, 249)',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative'
        }}>
          {/* Centered Heading */}
          <div style={{ textAlign: 'center', marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'block', width: '320px', height: '10px', marginBottom: '14px', objectFit: 'fill' }}
            />
            <h2 style={{
              fontSize: '35px',
              fontWeight: '900',
              color: '#0f172a',
              lineHeight: 1.2,
              margin: 0,
              maxWidth: '950px',
              letterSpacing: '-0.5px'
            }}>
              {renderTitleMarkup(
                siteData?.arEarn?.title,
                "*Know Your Returns*<br/>Before You Invest in AR Gaming Equipment",
                '#38bdf8'
              )}
            </h2>
          </div>

          {/* Grid Container: Centered Paragraphs + Right Side Gamers Graphic */}
          <div className="winera-ar-earn-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 260px',
            gap: '20px',
            alignItems: 'center',
            width: '100%'
          }}>
            {/* Paragraphs */}
            <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto', width: '100%' }}>
              <MobileExpandableText
                preview={
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, fontWeight: '500', margin: '0 auto 8px', maxWidth: '100%' }}>
                    {siteData?.arEarn?.p1 || "Most AR games suppliers in India present a product catalogue and a price list the financial planning is left entirely to you. As India's ROI-First Game Zone Developer, Winera International works differently. Before recommending any product or configuration, our team prepares a complete ROI report for your specific venue covering equipment cost, projected daily sessions, estimated revenue per attraction, maintenance costs, and break-even timeline."}
                  </p>
                }
                expandedContent={
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, fontWeight: '500', margin: '8px auto 0', maxWidth: '100%' }}>
                    {siteData?.arEarn?.p2 || "Every figure is calculated around your venue type, available floor space, and visitor demographic, not an industry benchmark that may have no relevance to your actual situation. Very few interactive gaming setup suppliers in India include this as a standard part of their process. For Winera, it is where every project starts"}
                  </p>
                }
              />
            </div>

            {/* Right Side Gamers Graphic */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <img
                src={siteData?.arEarn?.imgUrl || arEarnGamers}
                alt="AR Gaming Experience Gamers"
                style={{
                  width: '150%',
                  maxWidth: '290px',
                  height: 'auto',
                  display: 'block',
                  marginRight: '-32%',
                  marginBottom: '14%'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHY CHOOSE WINERA INTERNATIONAL SECTION (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-ar-whyus-section" style={{ padding: '80px 4vw 90px', background: '#F5F5F9', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          {/* Section Heading */}
          <div style={{ textAlign: 'center', marginBottom: '60px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              className="winera-yellow-stroke"
              style={{ display: 'block', width: '200px', maxWidth: '100%', height: '8px', marginBottom: '8px', objectFit: 'fill', margin: '0 auto 8px' }}
            />
            <h2 className="winera-ar-whyus-h2" style={{ fontSize: '35px', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
              {renderTitleMarkup(siteData?.arWhyUs?.title, "Why Choose *Winera International*", '#38bdf8')}
            </h2>
          </div>

          {/* Cards Grid Container (Dynamic List with Thin Blue Dividers & 3x2 Grid Layout) */}
          <div style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto' }}>
            {(() => {
              const defaultArWhyUsCards = [
                { title: "Right Product, Right Venue", desc: "We Recommend What Actually Fits Your Space And Footfall." },
                { title: "ROI Before You Invest", desc: "We Show You The Real Numbers Before You Commit." },
                { title: "Operational From Day One", desc: "We Install And Configure Everything, So You Open Without The Headaches." },
                { title: "Support Beyond Installation", desc: "Our Own Technicians Handle Servicing And Updates After Handover." },
                { title: "Age-Inclusive Entertainment", desc: "We Choose A Mix That Entertains All Ages, So More Visitors Walk In." },
                { title: "Trusted Across Venue Types", desc: "From Malls And Hotels To Schools And Resorts Across India Trust Us." }
              ];

              const cards = (Array.isArray(siteData?.arWhyUs?.cardsList) && siteData.arWhyUs.cardsList.length > 0)
                ? siteData.arWhyUs.cardsList
                : defaultArWhyUsCards;

              const iconsList = [
                <ShieldCheck key={0} style={{ width: '24px', height: '24px' }} />,
                <Settings key={1} style={{ width: '24px', height: '24px' }} />,
                <Database key={2} style={{ width: '24px', height: '24px' }} />,
                <Headset key={3} style={{ width: '24px', height: '24px' }} />,
                <Wrench key={4} style={{ width: '24px', height: '24px' }} />,
                <Box key={5} style={{ width: '24px', height: '24px' }} />
              ];

              let topCount = 3;
              if (cards.length <= 3) {
                topCount = cards.length;
              } else if (cards.length === 5) {
                topCount = 3;
              } else if (cards.length === 6) {
                topCount = 3;
              } else {
                topCount = Math.ceil(cards.length / 2);
              }

              const topCards = cards.slice(0, topCount);
              const bottomCards = cards.slice(topCount);

              return (
                <>
                  <div className="winera-ar-whyus-desktop-container" style={{ position: 'relative' }}>
                    {/* TOP ROW */}
                    <div className="winera-ar-whyus-row winera-ar-whyus-top-row" style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${topCards.length}, 1fr)`,
                      gap: '0px',
                      position: 'relative',
                      zIndex: 2
                    }}>
                      {topCards.map((card, cIdx) => (
                        <div
                          key={cIdx}
                          className="winera-ar-whyus-card"
                          style={{
                            padding: '0 35px 30px',
                            textAlign: 'center',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                          }}
                        >
                          {/* Vertical Shade/Gradient Divider Line for Top Row */}
                          {cIdx < topCards.length - 1 && (
                            <div className="winera-ar-whyus-vertical-divider" style={{
                              position: 'absolute',
                              right: 0,
                              top: '20px',
                              bottom: 0,
                              width: '2px',
                              background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.08) 0%, #38bdf8 100%)',
                              zIndex: 3
                            }}></div>
                          )}

                          {/* Cyan Icon Box */}
                          <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '14px',
                            background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '16px',
                            boxShadow: 'none'
                          }}>
                            {card.iconUrl ? (
                              <img src={card.iconUrl} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                            ) : (
                              iconsList[cIdx % iconsList.length]
                            )}
                          </div>
                          <h4 style={{ fontSize: '1.15rem', fontWeight: '500', color: '#0f172a', margin: '0 0 10px 0', whiteSpace: 'nowrap' }}>
                            {card.title}
                          </h4>
                          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, fontWeight: '500', margin: 0, maxWidth: '280px' }}>
                            {card.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Horizontal Center Cyan Divider Line with Shade Fading */}
                    {bottomCards.length > 0 && (
                      <div className="winera-ar-whyus-horizontal-divider" style={{
                        width: '100%',
                        height: '2px',
                        background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.08) 0%, #38bdf8 12%, #38bdf8 88%, rgba(56, 189, 248, 0.08) 100%)',
                        position: 'relative',
                        zIndex: 3,
                        margin: '0 0 30px'
                      }}></div>
                    )}

                    {/* BOTTOM ROW */}
                    {bottomCards.length > 0 && (
                      <div className="winera-ar-whyus-row winera-ar-whyus-bottom-row" style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${bottomCards.length}, 1fr)`,
                        maxWidth: bottomCards.length <= 3 ? '780px' : '100%',
                        margin: '0 auto',
                        gap: '0px',
                        position: 'relative',
                        zIndex: 2
                      }}>
                        {bottomCards.map((card, bIdx) => (
                          <div
                            key={bIdx}
                            className="winera-ar-whyus-card"
                            style={{
                              padding: '0 35px',
                              textAlign: 'center',
                              position: 'relative',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center'
                            }}
                          >
                            {/* Vertical Shade/Gradient Divider Line for Bottom Row */}
                            {bIdx < bottomCards.length - 1 && (
                              <div className="winera-ar-whyus-vertical-divider" style={{
                                position: 'absolute',
                                right: 0,
                                top: '-30px',
                                bottom: '20px',
                                width: '2px',
                                background: 'linear-gradient(180deg, #38bdf8 0%, rgba(56, 189, 248, 0.08) 100%)',
                                zIndex: 3
                              }}></div>
                            )}

                            {/* Cyan Icon Box */}
                            <div style={{
                              width: '48px',
                              height: '48px',
                              borderRadius: '14px',
                              background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
                              color: '#ffffff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginBottom: '16px',
                              boxShadow: 'none'
                            }}>
                              {card.iconUrl ? (
                                <img src={card.iconUrl} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                              ) : (
                                iconsList[(topCards.length + bIdx) % iconsList.length]
                              )}
                            </div>
                            <h4 style={{ fontSize: '1.15rem', fontWeight: '500', color: '#0f172a', margin: '0 0 10px 0', whiteSpace: 'nowrap' }}>
                              {card.title}
                            </h4>
                            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, fontWeight: '500', margin: 0, maxWidth: '280px' }}>
                              {card.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Mobile Slider View */}
                  <WhyChooseUsMobileSlider
                    items={cards}
                    renderIcon={(item, idx) =>
                      item.iconUrl ? (
                        <img src={item.iconUrl} alt="" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                      ) : (
                        iconsList[idx % iconsList.length]
                      )
                    }
                  />
                </>
              );
            })()}
          </div>
        </div>
      </section>

      {/* 9. OUR RECENT PROJECTS SHOWCASE SECTION */}
      <ProjectsMarqueeSection
        showTopHeader={false}
        simpleTitle={<>Our <span style={{ color: '#38bdf8' }}>Recent Projects</span></>}
      />

      {/* 10. WHAT OUR CLIENTS SAY (TESTIMONIALS) SECTION */}
      <TestimonialsSection siteData={siteData} />

      {/* 11. RELATED PRODUCTS SECTION */}
      <RelatedProductsSection sectionData={siteData?.arRelated || siteData?.arcadeRelated} accentColor="#38bdf8" />

      {/* 12. FAQ SECTION */}
      <FaqSection
        faqList={Array.isArray(siteData?.arFaqs) && siteData.arFaqs.length > 0 ? siteData.arFaqs : defaultArFaqs}
        faqsList={Array.isArray(siteData?.arFaqs) && siteData.arFaqs.length > 0 ? siteData.arFaqs : defaultArFaqs}
      />

      {/* 13. CTA BANNER SECTION (MATCHING DESIGN SYSTEM SPEC) */}
      <CtaBanner
        containerPadding="15px 32px"
        blurBg={true}
        showOverlay={true}
        align="center"
        gradientTitle={true}
        buttonTheme="yellow"
        titleFontSize="clamp(24px, 2.6vw, 32px)"
        subtitleFontSize="16px"
        subtitleFontWeight="400"
        bgUrl={
          siteData?.arCta?.bgUrl &&
            !siteData.arCta.bgUrl.includes('cta-consultations') &&
            !siteData.arCta.bgUrl.includes('need-consultations') &&
            !siteData.arCta.bgUrl.includes('project-lastbg')
            ? getValidImageUrl(siteData.arCta.bgUrl, ctaMainBanner)
            : null
        }
        bg={ctaMainBanner}
        leftImgUrl={
          siteData?.arCta?.leftImgUrl
            ? getValidImageUrl(siteData.arCta.leftImgUrl, homeBlock1)
            : null
        }
        leftImg={homeBlock1}
        rightImgUrl={
          siteData?.arCta?.rightImgUrl
            ? getValidImageUrl(siteData.arCta.rightImgUrl, vrCtaRightImg)
            : null
        }
        rightImg={vrCtaRightImg}
        tagline={siteData?.arCta?.tagline || null}
        title={
          siteData?.arCta?.title
            ? siteData.arCta.title
            : "Ready To Set Up<br/>Your Gaming Zone?"
        }
        subtitle={
          siteData?.arCta?.subtitle || siteData?.arCta?.description || siteData?.arCta?.whiteText
            ? siteData?.arCta?.subtitle || siteData?.arCta?.description || siteData?.arCta?.whiteText
            : "Get in touch with India's ROI-First Game Zone Developer"
        }
        description={null}
        buttonText={
          siteData?.arCta?.buttonText !== undefined
            ? siteData.arCta.buttonText
            : "Get a Quote"
        }
        buttonLink={
          siteData?.arCta?.buttonLink !== undefined
            ? siteData.arCta.buttonLink
            : "https://wa.me/919428989488"
        }
      />

      {/* FOOTER */}
      <Footer footerData={footer} />
    </div>
  );
}
