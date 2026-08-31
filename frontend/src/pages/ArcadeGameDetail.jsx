import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import arcadegame1Bg from '../assets/arcadegame1-bg.webp';
import arcadegamesImg from '../assets/arcadegames-img.webp';
import bikeArcade from '../assets/bike-arcade.webp';
import yellowBrushAccent from '../assets/yellow-stroke-line.webp';
import superAirHockeyImg from '../assets/super-air-hockey.jpg';
import puckCarnivalAirHockeyImg from '../assets/puck-carnival-air-hockey.jpg';
import dazzlingAirHockeyImg from '../assets/dazzling-air-hockey.jpg';
import auroraAirHockeyImg from '../assets/aurora-air-hockey.jpg';
import ochaAirHockeyImg from '../assets/ocha-air-hockey.jpg';
import aeroXAirHockeyImg from '../assets/aero-x-air-hockey.jpg';
import projectLastBg from '../assets/project-lastbg.webp';

import { 
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight, MoveHorizontal, Box, Ruler, MessageCircle, ArrowRight 
} from 'lucide-react';

// Arcade Products Database Mapping all dynamic game detail content
export const arcadeProductsData = {
  'parkour-motor-2-dx': {
    slug: 'parkour-motor-2-dx',
    name: 'Parkour Motor II (DX)',
    nameBase: 'Parkour Motor ',
    nameHighlight: 'II (DX)',
    category: 'Bike Racing Game',
    tagline: 'High-Performance Dual Player Commercial Motorbike Racing Simulator',
    img: arcadegamesImg,
    heroBg: arcadegame1Bg,
    specs: {
      power: '880 W',
      voltage: '220v',
      category: 'Bike Racing Game',
      players: '2 Player',
      material: 'Imported',
      width: '2140 mm',
      depth: '2310 mm',
      height: '2490 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Parkour%20Motor%20II%20(DX)'
  },
  'manx-tt-32': {
    slug: 'manx-tt-32',
    name: 'MANX TT 32"',
    nameBase: 'MANX TT ',
    nameHighlight: '32"',
    category: 'Bike Racing Game',
    tagline: 'Classic High-Velocity Arcade Motorcycle Simulator',
    img: arcadegamesImg,
    heroBg: arcadegame1Bg,
    specs: {
      power: '500 W',
      voltage: '220v',
      category: 'Bike Racing Game',
      players: '2 Player',
      material: 'Imported',
      width: '2150 mm',
      depth: '1900 mm',
      height: '1700 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20MANX%20TT%2032"'
  },
  'super-air-hockey': {
    slug: 'super-air-hockey',
    name: 'Super Air Hockey',
    nameBase: 'Super Air ',
    nameHighlight: 'Hockey',
    category: 'Arcade Games',
    tagline: 'Commercial Grade Heavy-Duty Air Hockey Table',
    img: superAirHockeyImg,
    heroBg: arcadegame1Bg,
    specs: {
      power: '450 W',
      voltage: '220v',
      category: 'Air Hockey',
      players: '2 Player',
      material: 'Stainless Steel & Aluminum',
      width: '2100 mm',
      depth: '1200 mm',
      height: '820 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Super%20Air%20Hockey'
  },
  'puck-carnival-air-hockey': {
    slug: 'puck-carnival-air-hockey',
    name: 'Puck Carnival Air Hockey',
    nameBase: 'Puck Carnival ',
    nameHighlight: 'Air Hockey',
    category: 'Arcade Games',
    tagline: 'Multi-Puck Carnival Style Arcade Air Hockey Machine',
    img: puckCarnivalAirHockeyImg,
    heroBg: arcadegame1Bg,
    specs: {
      power: '600 W',
      voltage: '220v',
      category: 'Air Hockey',
      players: '2-4 Player',
      material: 'Heavy Commercial Polycarbonate',
      width: '2200 mm',
      depth: '1350 mm',
      height: '850 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Puck%20Carnival%20Air%20Hockey'
  },
  'dazzling-air-hockey-multi-puck': {
    slug: 'dazzling-air-hockey-multi-puck',
    name: 'Dazzling Air Hockey - Multi Puck',
    nameBase: 'Dazzling Air Hockey ',
    nameHighlight: 'Multi Puck',
    category: 'Arcade Games',
    tagline: 'LED Illuminated Multi-Puck Arcade Air Hockey Table',
    img: dazzlingAirHockeyImg,
    heroBg: arcadegame1Bg,
    specs: {
      power: '700 W',
      voltage: '220v',
      category: 'Air Hockey',
      players: '2-4 Player',
      material: 'Tempered Glass & Steel Frame',
      width: '2250 mm',
      depth: '1400 mm',
      height: '900 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Dazzling%20Air%20Hockey'
  },
  'aurora-air-hockey': {
    slug: 'aurora-air-hockey',
    name: 'Aurora Air Hockey',
    nameBase: 'Aurora Air ',
    nameHighlight: 'Hockey',
    category: 'Arcade Games',
    tagline: 'High-Power Blower Tournament Air Hockey Table',
    img: auroraAirHockeyImg,
    heroBg: arcadegame1Bg,
    specs: {
      power: '500 W',
      voltage: '220v',
      category: 'Air Hockey',
      players: '2 Player',
      material: 'Aluminum Railing & High-Grade MDF',
      width: '2150 mm',
      depth: '1250 mm',
      height: '830 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Aurora%20Air%20Hockey'
  },
  'ocha-air-hockey': {
    slug: 'ocha-air-hockey',
    name: 'Ocha Air Hockey',
    nameBase: 'Ocha Air ',
    nameHighlight: 'Hockey',
    category: 'Arcade Games',
    tagline: 'Compact & Stylish Arcade Air Hockey Machine',
    img: ochaAirHockeyImg,
    heroBg: arcadegame1Bg,
    specs: {
      power: '400 W',
      voltage: '220v',
      category: 'Air Hockey',
      players: '2 Player',
      material: 'Imported Acrylic Top',
      width: '1980 mm',
      depth: '1100 mm',
      height: '800 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Ocha%20Air%20Hockey'
  },
  'aero-x-air-hockey': {
    slug: 'aero-x-air-hockey',
    name: 'Aero X Air Hockey',
    nameBase: 'Aero X Air ',
    nameHighlight: 'Hockey',
    category: 'Arcade Games',
    tagline: 'Next-Gen Arcade Air Hockey Table with Ticket Dispenser',
    img: aeroXAirHockeyImg,
    heroBg: arcadegame1Bg,
    specs: {
      power: '550 W',
      voltage: '220v',
      category: 'Air Hockey',
      players: '2 Player',
      material: 'Stainless Steel Construction',
      width: '2180 mm',
      depth: '1280 mm',
      height: '860 mm'
    },
    videoUrl: 'https://youtube.com',
    quoteUrl: 'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20Aero%20X%20Air%20Hockey'
  }
};

import { useVideoModal } from '../context/VideoModalContext';

export default function ArcadeGameDetail({ siteData }) {
  const { openVideoModal } = useVideoModal();
  const { slug } = useParams();
  const header = siteData?.header || null;
  const footer = siteData?.footer || null;

  // Helper to slugify text
  const slugify = (text) => (text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  // Extract dynamic cards from CMS siteData.arcadeCategories
  const cmsArcadeData = siteData?.arcadeCategories;
  const cmsCards = Array.isArray(cmsArcadeData?.cards) ? cmsArcadeData.cards : (Array.isArray(cmsArcadeData) ? cmsArcadeData : []);

  // Find dynamic CMS product card matching slug
  const cmsFoundCard = cmsCards.find(c => {
    const cardSlug = c.slug || slugify(c.title || c.name);
    return cardSlug === slug || c.slug === slug || c.title === slug;
  });

  // Default fallback static product
  const defaultProduct = arcadeProductsData[slug] || arcadeProductsData['parkour-motor-2-dx'];

  // Construct dynamic product object
  const product = {
    name: cmsFoundCard?.name || cmsFoundCard?.title || defaultProduct.name,
    nameBase: cmsFoundCard?.nameBase !== undefined ? cmsFoundCard.nameBase : (cmsFoundCard?.title || defaultProduct.nameBase),
    nameHighlight: cmsFoundCard?.nameHighlight !== undefined ? cmsFoundCard.nameHighlight : defaultProduct.nameHighlight,
    category: cmsFoundCard?.category || cmsFoundCard?.specsCategory || defaultProduct.category,
    tagline: cmsFoundCard?.tagline || cmsFoundCard?.desc || defaultProduct.tagline,
    img: cmsFoundCard?.img || cmsFoundCard?.imageUrl || defaultProduct.img,
    heroBg: defaultProduct.heroBg,
    specs: {
      power: cmsFoundCard?.power || defaultProduct.specs.power,
      voltage: cmsFoundCard?.voltage || defaultProduct.specs.voltage,
      category: cmsFoundCard?.specsCategory || cmsFoundCard?.category || defaultProduct.specs.category,
      players: cmsFoundCard?.players || defaultProduct.specs.players,
      material: cmsFoundCard?.material || defaultProduct.specs.material,
      width: cmsFoundCard?.width || defaultProduct.specs.width,
      depth: cmsFoundCard?.depth || defaultProduct.specs.depth,
      height: cmsFoundCard?.height || defaultProduct.specs.height
    },
    gallery: [
      cmsFoundCard?.gallery1 || cmsFoundCard?.img || defaultProduct.img,
      cmsFoundCard?.gallery2 || cmsFoundCard?.img || defaultProduct.img,
      cmsFoundCard?.gallery3 || cmsFoundCard?.img || defaultProduct.img,
      cmsFoundCard?.gallery4 || cmsFoundCard?.img || defaultProduct.img
    ],
    videoUrl: cmsFoundCard?.videoUrl || defaultProduct.videoUrl,
    quoteUrl: cmsFoundCard?.quoteUrl || defaultProduct.quoteUrl,
    features: [
      {
        num: "1.",
        title: cmsFoundCard?.feature1Title || "12+ Years of Expertise",
        desc: cmsFoundCard?.feature1Desc || "Proven experience delivering game zone projects across malls, hotels, schools, and resorts since 2014."
      },
      {
        num: "2.",
        title: cmsFoundCard?.feature2Title || "Quality & Safety Standards",
        desc: cmsFoundCard?.feature2Desc || "Every product sourced from global manufacturers and tested for commercial-grade safety and durability."
      },
      {
        num: "3.",
        title: cmsFoundCard?.feature3Title || "ROI-First Approach",
        desc: cmsFoundCard?.feature3Desc || "Every project begins with a free ROI report, revenue and break-even calculated before you invest."
      },
      {
        num: "4.",
        title: cmsFoundCard?.feature4Title || "Reliable Pan-India Service",
        desc: cmsFoundCard?.feature4Desc || "Our own team installs and supports every project across 50+ cities on time, every time."
      }
    ]
  };

  useEffect(() => {
    document.title = `${product.name} | Arcade Game Machine | Winera International`;
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <div style={{ backgroundColor: '#F5F5F9', color: '#0f172a', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 1. HEADER NAVBAR */}
      <Header headerData={header} />

      <main id="main-content">
        {/* 2. HERO SECTION BANNER USING arcadegame1-bg.webp */}
        <section 
          className="winera-arcade-hero-section" 
          style={{
            position: 'relative',
            width: '100%',
            paddingTop: '185px',
            paddingBottom: '60px',
            background: `url(${arcadegame1Bg}) center top / 100% 100% no-repeat`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#ffffff'
          }}
        >
          {/* Breadcrumb Title: Home › [Product Name] */}
          <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
            <h1 className="winera-arcade-hero-h1" style={{
              fontSize: '1.45rem',
              fontWeight: '800',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              margin: 0,
              lineHeight: 1.2,
              textAlign: 'center',
              flexWrap: 'wrap'
            }}>
              <Link to="/" style={{ color: '#ffffff', textDecoration: 'none' }}>Home</Link>
              <span style={{ color: '#ffffff', fontWeight: '400' }}>&rsaquo;</span>
              <span style={{ color: '#ffcd00', fontWeight: '900' }}>
                {product.name}
              </span>
            </h1>
          </div>
        </section>

        {/* 3. PRODUCT SPECIFICATION BLOCK IN HERO SECTION BOTTOM (MATCHING FIGMA/DESIGN SCREENSHOT 1:1) */}
        <section style={{ padding: '70px 4vw 90px', background: '#F5F5F9' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(480px, 550px) 1fr',
              gap: '28px',
              alignItems: 'start'
            }} className="winera-arcade-specs-grid">

              {/* Left Group: Side-by-Side Thumbnails + Main Showcase Card (Matching Image 2) */}
              <div style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'stretch',
                width: '100%'
              }} className="winera-arcade-left-group">

                {/* 1. Left Vertical Thumbnails Menu */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '450px',
                  width: '85px',
                  flexShrink: 0
                }} className="winera-arcade-thumb-column">
                  {/* Top / Left Arrow */}
                  <button aria-label="Previous image" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronUp className="winera-arrow-up" style={{ width: '35px', height: '35px', strokeWidth: 2.5 }} />
                    <ChevronLeft className="winera-arrow-left" style={{ width: '32px', height: '32px', strokeWidth: 2.5 }} />
                  </button>

                  {/* 4 Thumbnails */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 'calc(100% - 66px)',
                    width: '100%',
                    padding: '2px 0'
                  }} className="winera-arcade-thumb-inner">
                    {[0, 1, 2, 3].map((thumbIdx) => (
                      <div
                        key={thumbIdx}
                        style={{
                          width: '85px',
                          height: '85px',
                          borderRadius: '20px',
                          overflow: 'hidden',
                          background: 'radial-gradient(circle at center, #1e293b 0%, #090d16 100%)',
                          border: thumbIdx === 0 ? '2.5px solid #38bdf8' : '1px solid #cbd5e1',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '6px',
                          transition: 'all 0.2s ease'
                        }}
                        className="winera-arcade-thumb-box"
                      >
                        <img
                          src={product.gallery[thumbIdx] || product.img || arcadegamesImg}
                          alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Bottom / Right Arrow */}
                  <button aria-label="Next image" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronDown className="winera-arrow-down" style={{ width: '35px', height: '35px', strokeWidth: 2.5 }} />
                    <ChevronRight className="winera-arrow-right" style={{ width: '32px', height: '32px', strokeWidth: 2.5 }} />
                  </button>
                </div>

                {/* 2. Center Main Product Image Showcase Card */}
                <div style={{
                  flex: 1,
                  minWidth: 0,
                  height: '450px',
                  borderRadius: '28px',
                  background: 'radial-gradient(circle at center, #1e293b 0%, #090d16 100%)',
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  padding: 0
                }} className="winera-arcade-main-card">
                  <img
                    src={product.img || arcadegamesImg}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      position: 'relative',
                      zIndex: 2
                    }}
                  />
                </div>
              </div>

              {/* 3. Right Details & Specifications */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingLeft: '8px' }} className="winera-arcade-details-col">
                {/* Yellow Brush Stroke Line Accent */}
                <img
                  src={yellowBrushAccent}
                  alt=""
                  style={{ width: '380px', maxWidth: '92%', height: '8px', objectFit: 'fill', marginBottom: '4px' }}
                />

                {/* Title */}
                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                  {product.nameBase || "Parkour Motor "}
                  <span style={{ color: '#38bdf8' }}>{product.nameHighlight || "II (DX)"}</span>
                </h2>

                {/* Specification Long Banner */}
                <div style={{
                  background: 'linear-gradient(90deg, #38bdf8 0%, rgba(56, 189, 248, 0.5) 55%, rgba(56, 189, 248, 0) 100%)',
                  color: '#ffffff',
                  fontWeight: '800',
                  fontSize: '14px',
                  padding: '7px 16px',
                  borderRadius: '2px',
                  display: 'block',
                  width: '82%',
                  maxWidth: '360px',
                  marginTop: '4px'
                }} className="winera-arcade-banner-pill">
                  Specification:
                </div>

                {/* Specs Key-Value List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#334155', fontWeight: '600' }} className="winera-arcade-specs-list">
                  <div><strong style={{ color: '#0f172a' }}>Power :</strong> {product.specs.power}</div>
                  <div><strong style={{ color: '#0f172a' }}>Voltage :</strong> {product.specs.voltage}</div>
                  <div><strong style={{ color: '#0f172a' }}>Category :</strong> {product.specs.category}</div>
                  <div><strong style={{ color: '#0f172a' }}>Players :</strong> {product.specs.players}</div>
                  <div><strong style={{ color: '#0f172a' }}>Main Material :</strong> {product.specs.material}</div>
                </div>

                {/* Dimension Long Banner */}
                <div style={{
                  background: 'linear-gradient(90deg, #38bdf8 0%, rgba(56, 189, 248, 0.5) 55%, rgba(56, 189, 248, 0) 100%)',
                  color: '#ffffff',
                  fontWeight: '800',
                  fontSize: '14px',
                  padding: '7px 16px',
                  borderRadius: '2px',
                  display: 'block',
                  width: '82%',
                  maxWidth: '360px',
                  marginTop: '8px'
                }} className="winera-arcade-banner-pill">
                  Dimension :
                </div>

                {/* 3 Dimension Cards */}
                <div style={{ display: 'flex', gap: '14px', marginTop: '6px' }} className="winera-arcade-dim-container">
                  {/* Width */}
                  <div style={{
                    width: '115px',
                    background: 'linear-gradient(180deg, rgba(216, 244, 255, 1) 0%, rgba(255, 255, 255, 1) 100%)',
                    border: '1px solid rgba(0, 174, 239, 0.6)',
                    borderRadius: '20px',
                    boxShadow: '0 4px 10px rgba(0, 129, 178, 0.15)',
                    padding: '14px 6px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                  }} className="winera-arcade-dim-card">
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '10px', background: 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a'
                    }}>
                      <MoveHorizontal style={{ width: '22px', height: '22px', strokeWidth: 2.2 }} />
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>Width</span>
                    <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: '600' }}>{product.specs.width}</span>
                  </div>

                  {/* Depth */}
                  <div style={{
                    width: '115px',
                    background: 'linear-gradient(180deg, rgba(216, 244, 255, 1) 0%, rgba(255, 255, 255, 1) 100%)',
                    border: '1px solid rgba(0, 174, 239, 0.6)',
                    borderRadius: '20px',
                    boxShadow: '0 4px 10px rgba(0, 129, 178, 0.15)',
                    padding: '14px 6px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                  }} className="winera-arcade-dim-card">
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '10px', background: 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a'
                    }}>
                      <Box style={{ width: '22px', height: '22px', strokeWidth: 2.2 }} />
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>Depth</span>
                    <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: '600' }}>{product.specs.depth}</span>
                  </div>

                  {/* Height */}
                  <div style={{
                    width: '115px',
                    background: 'linear-gradient(180deg, rgba(216, 244, 255, 1) 0%, rgba(255, 255, 255, 1) 100%)',
                    border: '1px solid rgba(0, 174, 239, 0.6)',
                    borderRadius: '20px',
                    boxShadow: '0 4px 10px rgba(0, 129, 178, 0.15)',
                    padding: '14px 6px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                  }} className="winera-arcade-dim-card">
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '10px', background: 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a'
                    }}>
                      <Ruler style={{ width: '22px', height: '22px', strokeWidth: 2.2 }} />
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>Height</span>
                    <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: '600' }}>{product.specs.height}</span>
                  </div>
                </div>

                {/* CTA Action Buttons */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginTop: '18px', flexWrap: 'wrap' }} className="winera-arcade-cta-row">
                  {/* Button 1: Watch Video with Offset Rotated Yellow Backdrop */}
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <div style={{
                      position: 'absolute',
                      top: '-3px',
                      bottom: '-3px',
                      left: '-4px',
                      right: '-4px',
                      background: '#ffcd00',
                      borderRadius: '14px',
                      transform: 'rotate(-1.8deg)',
                      zIndex: 1
                    }} />
                    <button
                      onClick={() => openVideoModal(product.videoUrl, `${product.name} Showcase`)}
                      style={{
                        position: 'relative',
                        zIndex: 2,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(90deg, #28b4ee 0%, #0284c7 100%)',
                        color: '#ffffff',
                        fontSize: '13.5px',
                        fontWeight: '800',
                        padding: '10px 24px',
                        borderRadius: '12px',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: 'none',
                        transition: 'all 0.25s ease'
                      }}
                      className="winera-cta-btn-hover"
                    >
                      <span>Watch Video</span>
                    </button>
                  </div>

                  {/* Button 2: Get a Quote with Offset Rotated Cyan Backdrop */}
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <div style={{
                      position: 'absolute',
                      top: '-3px',
                      bottom: '-3px',
                      left: '-4px',
                      right: '-4px',
                      background: '#38bdf8',
                      borderRadius: '14px',
                      transform: 'rotate(-1.8deg)',
                      zIndex: 1
                    }} />
                    <a
                      href={product.quoteUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        position: 'relative',
                        zIndex: 2,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#e0f2fe',
                        color: '#0f172a',
                        fontSize: '13.5px',
                        fontWeight: '800',
                        padding: '10px 24px',
                        borderRadius: '12px',
                        border: '1.5px solid #38bdf8',
                        textDecoration: 'none',
                        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.05)',
                        transition: 'all 0.25s ease'
                      }}
                      className="winera-cta-btn-hover"
                    >
                      <span>Get a Quote</span>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 4. SPECIFICATION DETAIL SECTION (MATCHING DESIGN SCREENSHOT 1:1) */}
        <section style={{ padding: '40px 4vw 90px', background: '#F5F5F9' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
            {/* Section Header with Yellow Brush Accent Line */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img
                src={yellowBrushAccent}
                alt=""
                style={{ width: '380px', maxWidth: '90%', height: '8px', objectFit: 'fill', marginBottom: '4px' }}
              />
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a', margin: 0, lineHeight: 1.2 }}>
                Specification <span style={{ color: '#38bdf8' }}>Detail</span>
              </h2>
            </div>

            {/* Horizontal Rule Below Title Text */}
            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '28px 0 45px', width: '100%' }} />

            {/* 2x2 Grid of Feature Specification Cards with Top-Left & Bottom-Right Gradient Border */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
              gap: '24px'
            }} className="winera-spec-details-grid">
              {(product.features || []).map((card, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 50%, rgba(216, 244, 255, 0.45) 100%) padding-box, linear-gradient(135deg, #38bdf8 0%, rgba(56, 189, 248, 0.08) 35%, rgba(56, 189, 248, 0.08) 65%, #38bdf8 100%) border-box',
                    border: '1.5px solid transparent',
                    borderRadius: '20px',
                    boxShadow: '0 4px 16px rgba(56, 189, 248, 0.08)',
                    padding: '28px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    transition: 'all 0.3s ease'
                  }}
                  className="winera-spec-detail-card-hover"
                >
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#0f172a', fontWeight: '900' }}>{card.num}</span>
                    <span>{card.title}</span>
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, margin: 0, fontWeight: '500' }}>
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. NEED ANY CONSULTATIONS CTA BANNER SECTION (MATCHING PROJECT SECTION 1:1) */}
        <section style={{ padding: '20px 4vw 80px', background: '#F5F5F9', display: 'flex', justifyContent: 'center' }}>
          <div style={{ maxWidth: '1240px', width: '100%', position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
            <a
              href={product.quoteUrl || "https://wa.me/919428989488"}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', width: '100%', position: 'relative' }}
            >
              <img
                src={projectLastBg}
                alt="Need Any Consultations"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '24px' }}
              />
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer footerData={footer} />
    </div>
  );
}
