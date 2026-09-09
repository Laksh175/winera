import React, { useEffect, useState } from 'react';
import { ShieldCheck, Settings, Database, Headset, Wrench, Box, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectsMarqueeSection from '../components/ProjectsMarqueeSection';
import TestimonialsSection from '../components/TestimonialsSection';
import RelatedProductsSection from '../components/RelatedProductsSection';
import FaqSection from '../components/FaqSection';
import CtaBanner from '../components/CtaBanner';
import arHeroBg from '../assets/argame-hero-bg.webp';
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
import superAirHockeyImg from '../assets/super-air-hockey.webp';
import puckCarnivalAirHockeyImg from '../assets/puck-carnival-air-hockey.webp';
import dazzlingAirHockeyImg from '../assets/dazzling-air-hockey.webp';
import auroraAirHockeyImg from '../assets/aurora-air-hockey.webp';
import ochaAirHockeyImg from '../assets/ocha-air-hockey.webp';
import aeroXAirHockeyImg from '../assets/aero-x-air-hockey.webp';

const airHockeyImageMap = {
  "Super Air Hockey": superAirHockeyImg,
  "Puck Carnival Air Hockey": puckCarnivalAirHockeyImg,
  "Dazzling Air Hockey - Multi Puck": dazzlingAirHockeyImg,
  "Aurora Air Hockey": auroraAirHockeyImg,
  "Ocha Air Hockey": ochaAirHockeyImg,
  "Aero X Air Hockey": aeroXAirHockeyImg
};

const getValidImageUrl = (url, fallback) => {
  if (!url || typeof url !== 'string' || url.trim() === '' || url.includes('/src/assets/') || url.includes('unsplash.com')) {
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

// Helper function to render text with *highlighted* words in specific colors and <br/> linebreaks
function renderTitleMarkup(rawText, defaultText, highlightColor = '#ffcd00') {
  const textToParse = rawText || defaultText;
  const lines = textToParse.split(/<br\s*\/?>/i);

  return lines.map((line, lineIdx) => {
    const parts = line.split(/\*{1,2}(.*?)\*{1,2}/g);
    return (
      <React.Fragment key={lineIdx}>
        {parts.map((part, index) => {
          if (index % 2 === 1) {
            return (
              <span key={index} style={{ color: highlightColor }}>
                {part}
              </span>
            );
          }
          return part;
        })}
        {lineIdx < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
}

export default function ArGames({ siteData }) {
  const arSeo = siteData?.arSeo || {
    pageTitle: "AR Games Supplier in India | Winera International",
    metaDescription: "Winera International is a leading AR games supplier in India, sourcing and installing sports simulators, interactive floors, and immersive gaming attractions."
  };

  useEffect(() => {
    window.scrollTo(0, 0);
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
    { question: "What is an AR Gaming Setup and how does it work?", answer: "Augmented Reality (AR) gaming combines physical play spaces with interactive digital projections, sensors, and motion tracking to create immersive experiences for players without needing heavy headsets." },
    { question: "What type of venues are AR games best suited for?", answer: "AR games are ideal for Family Entertainment Centres (FECs), shopping malls, amusement parks, sports bars, resorts, trampoline parks, and indoor play zones." },
    { question: "Do you provide installation and technical support across India?", answer: "Yes, Winera International provides end-to-end site inspection, custom installation, game software setup, staff training, and nationwide maintenance support." },
    { question: "What is the expected ROI for an AR gaming setup?", answer: "With high repeat play rates and low operator maintenance, most commercial venue operators achieve full break-even within 6 to 12 months depending on footfall." }
  ];

  const currentProducts = categoriesData[activeCategory] || categoriesData[categories[0]] || [];
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
            fontSize: '1.45rem',
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
      <section className="winera-ar-supplier-section" style={{ padding: '90px 4vw 80px', background: '#F5F5F9', overflow: 'hidden' }}>
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
              <h2 style={{ fontSize: '2.9rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                {renderTitleMarkup(siteData?.arIntro?.title, "*AR Games* Supplier in India", '#38bdf8')}
              </h2>
            </div>

            <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.65, fontWeight: '500', marginBottom: '28px', maxWidth: '500px' }}>
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
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={siteData?.arIntro?.mainImgUrl || arSupplierCollage}
              alt="AR Games Supplier in India"
              style={{
                width: '100%',
                maxWidth: '580px',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE AR ATTRACTIONS, BUILT FOR YOUR VENUE SECTION (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-ar-attractions-section" style={{ padding: '70px 4vw 90px', background: '#F5F5F9', overflow: 'hidden' }}>
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
                fontSize: '2.85rem',
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px', maxWidth: '540px' }}>
              <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0 }}>
                {siteData?.arMatchedVenue?.p1 || (
                  <>
                    Winera International is a trusted <strong>AR games supplier</strong> in India sourcing and installing commercial sports simulators, interactive floor systems, AR experiences, and immersive gaming equipment for malls, hotels, schools, resorts, and family entertainment centres for more than 15 Years. Every product is sourced from established global manufacturers and configured for sustained commercial use
                  </>
                )}
              </p>
              <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0 }}>
                {siteData?.arMatchedVenue?.p2 || (
                  <>
                    As a direct <strong>AR entertainment setup partner</strong>, our own team manages everything from space planning and product selection to installation and after-sales support — one team, zero third-party contractors.
                  </>
                )}
              </p>
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
      <section className="winera-ar-categories-section" style={{ padding: '80px 4vw 90px', background: '#F5F5F9', textAlign: 'center' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Section Title: Categories: with yellow bar */}
          <div style={{ textAlign: 'center', marginBottom: '45px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '60px', height: '6px', backgroundColor: '#ffcd00', borderRadius: '3px', marginBottom: '14px' }}></div>
            <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
              Categories:
            </h2>
          </div>

          {/* Mobile Category Dropdown */}
          <div className="winera-ar-mobile-cat-dropdown" style={{ display: 'none', marginBottom: '24px' }}>
            <label htmlFor="ar_category_select" style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '8px', textAlign: 'left' }}>
              Select Category:
            </label>
            <select
              id="ar_category_select"
              name="arCategory"
              aria-label="Select Category"
              value={activeCategory}
              onChange={(e) => { setActiveCategory(e.target.value); }}
              style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: '16px',
                border: '2px solid #38bdf8',
                background: '#ffffff',
                color: '#0f172a',
                fontSize: '14px',
                fontWeight: '800',
                outline: 'none',
                appearance: 'none',
                cursor: 'pointer'
              }}
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
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

            {/* Right Product Grid (3 Columns x 2 Rows) */}
            <div>
              <div className="winera-ar-products-grid" style={{
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
                <h3 style={{ fontSize: '2.4rem', fontWeight: '900', color: '#0f172a', margin: 0, lineHeight: 1.15 }}>
                  {renderTitleMarkup(siteData?.arFeatures?.f1Title, "*Exciting* Attractions", '#38bdf8')}
                </h3>
              </div>
              <p className="winera-ar-feature-desc" style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0 }}>
                {siteData?.arFeatures?.f1Desc || "Bumper Cars Have Long Held A Special Place In The Hearts Of Amusement Park Enthusiasts, And At Winera International, We Take Immense Pride In Delivering High-Quality Options That Enhance The Overall Park Experience. As A Leading Bumper Car Manufacturer In India And Trusted Bumper Car Manufacturer, Our Creations Are Not Just Rides; They're An Exhilarating Blend Of Thrilling Collisions And Smooth Handling, Designed With A Laser Focus On Safety And Durability."}
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
                <h3 style={{ fontSize: '2.4rem', fontWeight: '900', color: '#0f172a', margin: 0, lineHeight: 1.15 }}>
                  {renderTitleMarkup(siteData?.arFeatures?.f2Title, "High-Quality *Equipment*", '#38bdf8')}
                </h3>
              </div>
              <p className="winera-ar-feature-desc" style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0 }}>
                {siteData?.arFeatures?.f2Desc || "Bumper Cars Have Long Held A Special Place In The Hearts Of Amusement Park Enthusiasts, And At Winera International, We Take Immense Pride In Delivering High-Quality Options That Enhance The Overall Park Experience. As A Leading Bumper Car Manufacturer In India And Trusted Bumper Car Manufacturer, Our Creations Are Not Just Rides; They're An Exhilarating Blend Of Thrilling Collisions And Smooth Handling, Designed With A Laser Focus On Safety And Durability."}
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
                <h3 style={{ fontSize: '2.4rem', fontWeight: '900', color: '#0f172a', margin: 0, lineHeight: 1.15 }}>
                  {renderTitleMarkup(siteData?.arFeatures?.f3Title, "*Budget-Friendly AR*<br/>Entertainment Setup", '#38bdf8')}
                </h3>
              </div>
              <p className="winera-ar-feature-desc" style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0 }}>
                {siteData?.arFeatures?.f3Desc || "Bumper Cars Have Long Held A Special Place In The Hearts Of Amusement Park Enthusiasts, And At Winera International, We Take Immense Pride In Delivering High-Quality Options That Enhance The Overall Park Experience. As A Leading Bumper Car Manufacturer In India And Trusted Bumper Car Manufacturer, Our Creations Are Not Just Rides; They're An Exhilarating Blend Of Thrilling Collisions And Smooth Handling, Designed With A Laser Focus On Safety And Durability."}
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
        {/* Top Decorative Color Accent Tabs (Figma 1:1) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '5vw',
          width: '140px',
          height: '14px',
          background: '#38bdf8',
          clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)'
        }}></div>
        <div style={{
          position: 'absolute',
          top: 0,
          right: '5vw',
          width: '260px',
          height: '16px',
          background: '#ffcd00',
          clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)'
        }}></div>

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
              fontSize: '2.5rem',
              fontWeight: '900',
              color: '#0f172a',
              lineHeight: 1.2,
              margin: 0,
              maxWidth: '950px',
              letterSpacing: '-0.5px'
            }}>
              {renderTitleMarkup(
                siteData?.arEarn?.title,
                "*Know Your Returns Before* You Invest in<br/>AR Gaming Equipment",
                '#38bdf8'
              )}
            </h2>
          </div>

          {/* Grid Container: Centered Paragraphs + Right Side Gamers Graphic */}
          <div className="winera-ar-earn-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 280px',
            gap: '30px',
            alignItems: 'center',
            width: '100%'
          }}>
            {/* Paragraphs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
              <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.7, fontWeight: '500', margin: 0 }}>
                {siteData?.arEarn?.p1 || "Most AR games suppliers in India present a product catalogue and a price list the financial planning is left entirely to you. As India's ROI-First Game Zone Developer, Winera International works differently. Before recommending any product or configuration, our team prepares a complete ROI report for your specific venue covering equipment cost, projected daily sessions, estimated revenue per attraction, maintenance costs, and break-even timeline."}
              </p>
              <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.7, fontWeight: '500', margin: 0 }}>
                {siteData?.arEarn?.p2 || "Every figure is calculated around your venue type, available floor space, and visitor demographic, not an industry benchmark that may have no relevance to your actual situation. Very few interactive gaming setup suppliers in India include this as a standard part of their process. For Winera, it is where every project starts"}
              </p>
            </div>

            {/* Right Side Gamers Graphic */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={siteData?.arEarn?.imgUrl || arEarnGamers}
                alt="AR Gaming Experience Gamers"
                style={{
                  width: '100%',
                  maxWidth: '260px',
                  height: 'auto',
                  display: 'block'
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
              style={{ display: 'block', width: '510px', maxWidth: '100%', height: '11px', marginBottom: '8px', objectFit: 'fill', margin: '0 auto 8px' }}
            />
            <h2 className="winera-ar-whyus-h2" style={{ fontSize: '2.8rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
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
                <div style={{ position: 'relative' }}>
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
                        <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: '0 0 10px 0' }}>
                          {card.title}
                        </h4>
                        <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.6, fontWeight: '500', margin: 0, maxWidth: '280px' }}>
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
                          <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: '0 0 10px 0' }}>
                            {card.title}
                          </h4>
                          <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.6, fontWeight: '500', margin: 0, maxWidth: '280px' }}>
                            {card.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* 9. OUR RECENT PROJECTS SHOWCASE SECTION */}
      <ProjectsMarqueeSection
        showTopHeader={false}
        simpleTitle={<>OUR <span style={{ color: '#38bdf8' }}>RECENT PROJECTS</span></>}
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

      {/* 13. CTA BANNER SECTION (MATCHING VR GAMES STYLE 1:1) */}
      <CtaBanner
        showOverlay={true}
        align="center"
        gradientTitle={true}
        buttonTheme="yellow"
        titleFontSize="45px"
        bgUrl={
          siteData?.arCta?.bgUrl &&
          !siteData.arCta.bgUrl.includes('cta-consultations') &&
          !siteData.arCta.bgUrl.includes('need-consultations') &&
          !siteData.arCta.bgUrl.includes('project-lastbg')
            ? getValidImageUrl(siteData.arCta.bgUrl, amusementParkCtaBg)
            : null
        }
        bg={amusementParkCtaBg}
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
        tagline={null}
        title={
          siteData?.arCta?.title
            ? siteData.arCta.title
            : "READY TO SET UP YOUR GAMING ZONE?"
        }
        subtitle={
          siteData?.arCta?.subtitle || siteData?.arCta?.description || siteData?.arCta?.whiteText
            ? siteData?.arCta?.subtitle || siteData?.arCta?.description || siteData?.arCta?.whiteText
            : "Get in touch with India's ROI-First Game Zone Developer"
        }
        subtitleFontSize="18px"
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
