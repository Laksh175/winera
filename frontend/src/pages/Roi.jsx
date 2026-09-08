import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart2, Edit3, Shield, Database, Users, Settings, AlertTriangle, TrendingDown, UserX } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LeadCaptureModal from '../components/LeadCaptureModal';
import roiBgImage from '../assets/roi-hero-bg.webp';
import roiImg1 from '../assets/roi-img1.webp';
import roiImage3bg from '../assets/roi-image-3bg.webp';
import roiBlock5Img1 from '../assets/roi-block5-img1.webp';
import roiBlock5Img2 from '../assets/roi-block5-img2.webp';
import roiBlock5Img3 from '../assets/roi-block5-img3.webp';
import roiBlock5Img4 from '../assets/roi-block5-img4.webp';
import roiBlock5Img5 from '../assets/roi-block5-img5.webp';
import roiBlock5Img6 from '../assets/roi-block5-img6.webp';
import roiBlock6 from '../assets/roi-block6.webp';
import roiBlock7Bg from '../assets/roi-block7-bg.webp';
import homeBlockBg from '../assets/home-block.webp';
import yellowStrokeLine from '../assets/yellow-stroke-line.webp';
import TestimonialsSection from '../components/TestimonialsSection';
import MotionCardFlip from '../components/MotionCardFlip';

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

export default function Roi({ siteData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const header = siteData?.header || null;
  const footer = siteData?.footer || null;

  const roiHero = siteData?.roiHero || {
    breadcrumbPage: "ROI",
    bgUrl: roiBgImage
  };

  const roiIntro = siteData?.roiIntro || {
    tagline: "Return on Investment (ROI)",
    titleLine1: "You don't need a game zone…",
    titleLine2: "you need a",
    titleLine2Blue: "profit machine.",
    paragraph1: "Anyone can fill a room with arcade machines. Very few build a game zone that pays back your investment and keeps printing profit month after month.",
    paragraph2: "Most game zone owners lose money in year one — not because gaming is dead, but because the setup, game mix, and management were wrong from day one.",
    buttonText: "Book Your Free ROI Consultation",
    buttonLink: "https://wa.me/919428989488",
    waMessage: "Hello Winera International! I want to book a free ROI consultation. Please share details. [Ref: ROI Page]",
    image: roiImg1
  };

  const rawRoiLink = roiIntro.buttonLink || "https://wa.me/919428989488";
  let roiWaMsg = roiIntro.waMessage;

  const baseRoiLink = rawRoiLink.split('?')[0];

  if (!roiWaMsg && rawRoiLink.includes('text=')) {
    try {
      const match = rawRoiLink.match(/text=([^&]+)/);
      if (match && match[1]) {
        roiWaMsg = decodeURIComponent(match[1]);
      }
    } catch (e) { }
  }

  if (!roiWaMsg) {
    roiWaMsg = "Hello Winera International! I want to book a free ROI consultation. Please share details. [Ref: ROI Page]";
  }

  const roiButtonLink = `${baseRoiLink}?text=${encodeURIComponent(roiWaMsg)}`;

  const roiMatters = siteData?.roiMatters || {
    title: "Opening a game zone is easy. Making it profitable is a system.",
    paragraph1: "You've seen the crowds. You know the demand is real. So you're tempted to invest. But here's what nobody tells you:",
    cards: [
      "₹40–80 lakh invested, and the zone still runs at a loss.",
      "Machines that look exciting but nobody plays twice.",
      "Empty floors on weekdays, chaos on weekends, no system in between.",
      "No idea what your actual return per square foot is."
    ],
    warningTextLine1: "A cheap or random setup doesn't save you money.",
    warningTextLine2: "It quietly kills your ROI."
  };

  const roiComparison = siteData?.roiComparison || {
    title: "Why most game zones fail vs. why ours profit",
    subCaption: "The difference isn't the games. It's the system behind them.",
    wrongItems: [
      { num: "01", text: "Random game selection", offset: "20px" },
      { num: "02", text: "No space planning", offset: "65px" },
      { num: "03", text: "Buy machines, then figure it out", offset: "95px" },
      { num: "04", text: "No pricing strategy", offset: "95px" },
      { num: "05", text: "Owner manages everything manually", offset: "65px" },
      { num: "06", text: "Guessing monthly income", offset: "20px" }
    ],
    rightItems: [
      { num: "01", text: "Data-backed game mix (high footfall + high margin)", offset: "20px" },
      { num: "02", text: "Optimized layout for max games per sq. ft.", offset: "65px" },
      { num: "03", text: "ROI modeled before you spend a rupee", offset: "95px" },
      { num: "04", text: "Dynamic pricing + package systems", offset: "95px" },
      { num: "05", text: "Full management + POS + reporting system", offset: "65px" },
      { num: "06", text: "Predictable, tracked revenue", offset: "20px" }
    ]
  };

  const roiProcess = siteData?.roiProcess || {
    title: "From empty space to profit we handle everything",
    cards: [
      { title: "Location & Feasibility", desc: "We analyze your space and market and then project your ROI.", img: roiBlock5Img1 },
      { title: "Design & Layout", desc: "Maximum games, best flow, optimized experience per sq. ft.", img: roiBlock5Img2 },
      { title: "Game Selection", desc: "The right mix of high-demand + high-margin games.", img: roiBlock5Img3 },
      { title: "Setup & Installation", desc: "You don't have to touch a single wire.", img: roiBlock5Img4 },
      { title: "Management System", desc: "POS, pricing, staff training, reporting, and maintenance.", img: roiBlock5Img5 },
      { title: "Ongoing Growth", desc: "We help you scale revenue, not just open doors.", img: roiBlock5Img6 }
    ]
  };

  const roiGet = siteData?.roiGet || {
    title: "What you get with Winera International",
    subtitle: "Three things that turn your investment into predictable, growing profit.",
    badgeText: "Built for Profit.",
    image: roiBlock6,
    steps: [
      { title: "Predictable ROI", desc: "Know your returns before you invest." },
      { title: "Zero Guesswork", desc: "We handle setup + management end-to-end." },
      { title: "Ongoing Profit", desc: "Systems that keep revenue growing." }
    ]
  };

  const roiChecklist = siteData?.roiChecklist || {
    title: "This is for you if",
    bgImage: roiBlock7Bg,
    fitPill: "You're a fit",
    unfitPill: "You're a fit",
    fitItems: [
      "You want to invest ₹XX Lakh+ in a proven, growing business",
      "You want returns backed by data, not hope",
      "You'd rather have experts build it than learn by losing money",
      "You want a zone that runs as a system, not a headache"
    ],
    unfitItems: [
      "You want to invest ₹XX Lakh+ in a proven, growing business",
      "You want the cheapest possible setup",
      "You're not serious about returns",
      "You expect profit without a proper system"
    ]
  };

  const roiCta = siteData?.roiCta || {
    yellowText: "READY TO",
    whiteText: "SEE YOUR",
    cyanText: "NUMBERS?",
    subtitle: "Book A Free Consultation With Winera International. We'll Walk You Through The ROI Projection For Your Space, Your Budget, And Your City — Before You Spend Anything.",
    buttonText: "Book Your Free ROI Call",
    buttonLink: "https://wa.me/919428989488",
    bgUrl: homeBlockBg
  };

  const roiSeo = siteData?.roiSeo || {
    pageTitle: "Know Your Game Zone ROI Before You Invest | Winera International",
    metaDescription: "Opening a game zone is easy, making it profitable is a system. Winera International models your ROI around your space and budget before you invest a rupee."
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = roiSeo.pageTitle || "Know Your Game Zone ROI Before You Invest | Winera International";

    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'description');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', roiSeo.metaDescription || "Opening a game zone is easy, making it profitable is a system. Winera International models your ROI around your space and budget before you invest a rupee.");
  }, [roiSeo]);

  const painPoints = Array.isArray(roiMatters.cards) ? roiMatters.cards : [
    "₹40–80 lakh invested, and the zone still runs at a loss.",
    "Machines that look exciting but nobody plays twice.",
    "Empty floors on weekdays, chaos on weekends, no system in between.",
    "No idea what your actual return per square foot is."
  ];

  const wrongItems = Array.isArray(roiComparison.wrongItems) ? roiComparison.wrongItems : [];
  const rightItems = Array.isArray(roiComparison.rightItems) ? roiComparison.rightItems : [];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#0f172a', background: '#F5F5F9', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* HEADER */}
      <Header headerData={header} />

      {/* 1. HERO BANNER SECTION */}
      <section className="winera-roi-hero-section" style={{
        position: 'relative',
        width: '100%',
        paddingTop: '175px',
        paddingBottom: '95px',
        background: `url(${getValidImageUrl(roiHero.bgUrl, roiBgImage)}) center top / 100% 100% no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          <h1 className="winera-roi-hero-h1" style={{
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
            <Link to="/" style={{ color: '#ffffff', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#ffffff', fontWeight: '400' }}>&rsaquo;</span>
            <span style={{ color: '#ffcd00', fontWeight: '900' }}>{roiHero.breadcrumbPage || "ROI"}</span>
          </h1>
        </div>
      </section>

      {/* 2. RETURN ON INVESTMENT INTRO BLOCK */}
      <section className="winera-roi-intro-section" style={{
        padding: '40px 4vw 40px',
        maxWidth: '1240px',
        margin: '0 auto'
      }}>
        <div className="winera-roi-intro-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)',
          gap: '50px',
          alignItems: 'center'
        }}>
          {/* Left Content */}
          <motion.div
            data-framer-motion="true"
            initial={{ opacity: 0, x: -75 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="winera-roi-intro-text"
          >
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'block', maxWidth: '100%', width: '280px', height: '8px', marginBottom: '14px', objectFit: 'fill' }}
            />
            <p style={{
              fontSize: '13px',
              fontWeight: '700',
              color: '#38bdf8',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '6px'
            }}>
              {roiIntro.tagline}
            </p>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: '900',
              color: '#0f172a',
              lineHeight: 1.15,
              marginBottom: '22px'
            }}>
              {roiIntro.titleLine1}<br />
              {roiIntro.titleLine2}{' '}
              <span style={{ color: '#38bdf8' }}>{roiIntro.titleLine2Blue}</span>
            </h2>

            <p style={{
              fontSize: '15px',
              color: '#475569',
              lineHeight: 1.7,
              marginBottom: '16px',
              maxWidth: '540px'
            }}>
              {roiIntro.paragraph1}
            </p>
            <p style={{
              fontSize: '15px',
              color: '#475569',
              lineHeight: 1.7,
              marginBottom: '30px',
              maxWidth: '540px'
            }}>
              {roiIntro.paragraph2}
            </p>

            {/* CTA Button — offset yellow front, cyan back matching figma design */}
            <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
              <a
                href={roiButtonLink}
                target="_blank"
                rel="noreferrer"
                className="winera-cyan-cta-btn winera-cyan-cta-btn-sm"
              >
                {roiIntro.buttonText}
              </a>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            data-framer-motion="true"
            initial={{ opacity: 0, x: 75 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="winera-roi-intro-img"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img
              src={getValidImageUrl(roiIntro.image || roiIntro.imgUrl, roiImg1)}
              alt="ROI Investment Growth"
              style={{
                width: '100%',
                maxWidth: '460px',
                height: 'auto',
                display: 'block',
                objectFit: 'contain'
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* 3. OPENING A GAME ZONE IS EASY BLOCK */}
      <section className="winera-roi-pain-section" style={{
        padding: '40px 4vw 40px',
        background: '#eef4fb',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div className="winera-roi-pain-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
            gap: '55px',
            alignItems: 'flex-start'
          }}>
            {/* Left Content */}
            <motion.div
              data-framer-motion="true"
              initial={{ opacity: 0, x: -75 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="winera-roi-pain-text"
            >
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', maxWidth: '100%', width: '240px', height: '8px', marginBottom: '14px', objectFit: 'fill' }}
              />
              <h2 style={{
                fontSize: 'clamp(2rem, 3.6vw, 3rem)',
                fontWeight: '900',
                color: '#0f172a',
                lineHeight: 1.12,
                marginBottom: '20px'
              }}>
                {roiMatters.title.split('. ')[0]}.<br />
                <span style={{ color: '#38bdf8' }}>{roiMatters.title.split('. ')[1]}</span>
              </h2>
              <p style={{
                fontSize: '15px',
                color: '#475569',
                lineHeight: 1.7,
                maxWidth: '480px'
              }}>
                {roiMatters.paragraph1}
              </p>
            </motion.div>

            {/* Right — Red Pain Point Cards */}
            <motion.div
              data-framer-motion="true"
              initial={{ opacity: 0, x: 75 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="winera-roi-pain-cards"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                paddingTop: '10px'
              }}
            >
              {painPoints.map((point, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0',
                  position: 'relative'
                }}>
                  {/* Vertical connector line */}
                  {idx < painPoints.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      left: '18px',
                      top: '48px',
                      width: '2px',
                      height: '32px',
                      background: '#cbd5e1'
                    }} />
                  )}
                  {/* Red X icon */}
                  <div style={{
                    width: '38px',
                    height: '38px',
                    minWidth: '38px',
                    borderRadius: '8px',
                    background: '#ef4444',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: '900',
                    marginRight: '0',
                    marginTop: '2px',
                    flexShrink: 0
                  }}>
                    ✕
                  </div>
                  {/* Card */}
                  <div style={{
                    flex: 1,
                    background: '#fde8e8',
                    borderRadius: '12px',
                    padding: '14px 22px',
                    fontSize: '14.5px',
                    fontWeight: '600',
                    color: '#1e293b',
                    lineHeight: 1.5,
                    marginLeft: '16px',
                    border: '1px solid #fecaca'
                  }}>
                    {point}
                  </div>
                </div>
              ))}

              {/* Bottom warning text */}
              <div style={{
                marginTop: '18px',
                padding: '18px 24px',
                background: '#ffffff',
                borderRadius: '14px',
                border: '2px solid #fbbf24',
                boxShadow: '0 4px 16px rgba(0,0,0,0.05)'
              }}>
                <p style={{ fontSize: '14.5px', fontWeight: '700', color: '#92400e', lineHeight: 1.6, margin: 0 }}>
                  {roiMatters.warningTextLine1}<br />
                  <span style={{ color: '#dc2626', fontWeight: '800' }}>{roiMatters.warningTextLine2}</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. WHY MOST GAME ZONES FAIL VS WHY OURS PROFIT SECTION */}
      <section className="winera-roi-comparison-section" style={{
        padding: '75px 4vw 75px',
        background: `url(${roiImage3bg}) center top / 100% 100% no-repeat`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', textAlign: 'center' }}>
          {/* Yellow Stroke + Title */}
          <div style={{ marginBottom: '30px' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'inline-block', maxWidth: '100%', width: '280px', height: '8px', marginBottom: '12px', objectFit: 'fill' }}
            />
            <h2 style={{
              fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
              fontWeight: '900',
              color: '#0f172a',
              lineHeight: 1.15,
              margin: '0 auto',
              maxWidth: '900px',
              letterSpacing: '-0.5px'
            }}>
              {roiComparison.title.split(' vs. ')[0]}<br />
              <span style={{ color: '#38bdf8' }}>vs. {roiComparison.title.split(' vs. ')[1]}</span>
            </h2>
          </div>

          {/* Grid Layout for Arc Comparison Graphic */}
          <div className="winera-roi-comparison-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
            gap: '140px',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '1240px',
            margin: '0 auto'
          }}>
            {/* LEFT SIDE: The Wrong Way (Red Pills Arc) */}
            <motion.div
              data-framer-motion="true"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="winera-roi-wrong-side"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                position: 'relative',
                paddingRight: '45px'
              }}
            >
              {/* Red Circle ✕ in center-right of left side */}
              <div className="winera-roi-center-circle-red" style={{
                position: 'absolute',
                right: '-90px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '270px',
                height: '270px',
                borderRadius: '50%',
                border: '2px dashed #fcd34d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1
              }}>
                <div style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
                }}>
                  <div style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: '50%',
                    border: '4px solid #ff0004',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ff0004',
                    fontSize: '36px',
                    fontWeight: '900',
                    lineHeight: '1'
                  }}>
                    ✕
                  </div>
                </div>
              </div>

              {/* Red Pills Stacked in an Arc */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%', alignItems: 'flex-end', zIndex: 2 }}>
                {wrongItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="winera-roi-pill-red"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      background: 'linear-gradient(90deg, rgba(255, 0, 4, 1) 0%, rgba(255, 185, 187, 1) 100%)',
                      color: '#ffffff',
                      padding: '8px 8px 8px 20px',
                      borderRadius: '40px',
                      fontSize: '13px',
                      fontWeight: '700',
                      boxShadow: 'none',
                      marginRight: item.offset,
                      width: '260px'
                    }}
                  >
                    <span style={{ textAlign: 'left', lineHeight: 1.3 }}>{item.text}</span>
                    <span style={{
                      width: '32px',
                      height: '32px',
                      minWidth: '32px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      color: '#0f172a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800',
                      fontSize: '12px',
                      boxShadow: 'none'
                    }}>
                      {item.num}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT SIDE: The Right Way (Green Pills Arc) */}
            <motion.div
              data-framer-motion="true"
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="winera-roi-right-side"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                position: 'relative',
                paddingLeft: '45px'
              }}
            >
              {/* Green Circle ✓ in center-left of right side (dashed circle behind pills) */}
              <div className="winera-roi-center-circle-green" style={{
                position: 'absolute',
                left: '-90px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '270px',
                height: '270px',
                borderRadius: '50%',
                border: '2px dashed #38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1
              }}>
                <div style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
                }}>
                  <div style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: '50%',
                    border: '4px solid #22c55e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#22c55e',
                    fontSize: '36px',
                    fontWeight: '900',
                    lineHeight: '1'
                  }}>
                    ✓
                  </div>
                </div>
              </div>

              {/* Green Pills Stacked in an Arc */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%', alignItems: 'flex-start', zIndex: 2 }}>
                {rightItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="winera-roi-pill-green"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: '12px',
                      background: 'linear-gradient(90deg, rgba(182, 236, 178, 1) 0%, rgba(107, 246, 97, 1) 100%)',
                      color: '#0f172a',
                      padding: '8px 20px 8px 8px',
                      borderRadius: '40px',
                      fontSize: '13px',
                      fontWeight: '800',
                      boxShadow: 'none',
                      marginLeft: item.offset,
                      width: '280px'
                    }}
                  >
                    <span style={{
                      width: '32px',
                      height: '32px',
                      minWidth: '32px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      color: '#0f172a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800',
                      fontSize: '12px',
                      boxShadow: 'none'
                    }}>
                      {item.num}
                    </span>
                    <span style={{ textAlign: 'left', lineHeight: 1.3 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sub Caption */}
          <p style={{
            fontSize: '15px',
            color: '#475569',
            fontWeight: '600',
            marginTop: '45px',
            marginBottom: 0
          }}>
            {roiComparison.subCaption || "The difference isn't the games. It's the system behind them."}
          </p>
        </div>
      </section>

      {/* 5. FROM EMPTY SPACE TO PROFIT SECTION */}
      <section className="winera-roi-process-section" style={{
        padding: '40px 4vw 40px',
        background: 'rgb(245, 245, 249)'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', textAlign: 'center' }}>
          {/* Yellow Stroke + Title */}
          <div style={{ marginBottom: '30px' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'inline-block', maxWidth: '100%', width: '280px', height: '8px', marginBottom: '2px', objectFit: 'fill' }}
            />
            <h2 style={{
              fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
              fontWeight: '900',
              color: '#0f172a',
              lineHeight: 1.15,
              margin: '4px auto 0',
              maxWidth: '900px',
              letterSpacing: '-0.5px'
            }}>
              {roiProcess.title.includes("profit") ? (
                <>
                  <span style={{ color: '#38bdf8' }}>{roiProcess.title.split("profit")[0]}</span> profit<br />
                  {roiProcess.title.split("profit")[1]}
                </>
              ) : roiProcess.title}
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="winera-roi-process-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            marginTop: '40px'
          }}>
            {(Array.isArray(roiProcess.cards) ? roiProcess.cards : []).map((step, idx) => {
              let fallbackImg = roiBlock5Img1;
              if (idx === 1) fallbackImg = roiBlock5Img2;
              else if (idx === 2) fallbackImg = roiBlock5Img3;
              else if (idx === 3) fallbackImg = roiBlock5Img4;
              else if (idx === 4) fallbackImg = roiBlock5Img5;
              else if (idx === 5) fallbackImg = roiBlock5Img6;

              const resolvedImg = step.img && (step.img.startsWith('http') || step.img.startsWith('data:')) ? step.img : fallbackImg;
              const isLeft = idx % 3 === 0;
              const isRight = idx % 3 === 2;
              const startX = isLeft ? -75 : (isRight ? 75 : 0);
              const startY = isLeft || isRight ? 0 : 40;

              return (
                <motion.div
                  key={idx}
                  data-framer-motion="true"
                  initial={{ opacity: 0, x: startX, y: startY }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    duration: 0.8,
                    delay: (idx % 3) * 0.12,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <MotionCardFlip
                    className="winera-roi-process-card"
                    style={{
                      position: 'relative',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      height: '280px',
                      background: `url(${resolvedImg}) center center / cover no-repeat`,
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end'
                    }}
                  >
                    {/* Dark overlay for readability */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.9) 100%)',
                      zIndex: 1
                    }} />

                    {/* Text Content */}
                    <div style={{
                      position: 'relative',
                      zIndex: 2,
                      padding: '24px',
                      textAlign: 'left'
                    }}>
                      <h3 style={{
                        color: '#ffffff',
                        fontSize: '18px',
                        fontWeight: '800',
                        margin: '0 0 8px 0',
                        fontFamily: "'Inter', sans-serif"
                      }}>
                        {step.title}
                      </h3>
                      <p style={{
                        color: '#cbd5e1',
                        fontSize: '13.5px',
                        lineHeight: '1.5',
                        margin: 0,
                        fontFamily: "'Inter', sans-serif"
                      }}>
                        {step.desc}
                      </p>
                    </div>
                  </MotionCardFlip>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. WHAT YOU GET WITH WINERA INTERNATIONAL SECTION */}
      <section className="winera-roi-get-section" style={{
        padding: '40px 4vw 40px',
        background: 'rgb(244, 244, 248)'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div className="winera-roi-get-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
            gap: '60px',
            alignItems: 'center'
          }}>
            {/* Left Card Container (White background + cyan shade gradient) */}
            <motion.div
              data-framer-motion="true"
              initial={{ opacity: 0, x: -75 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="winera-roi-get-card-box"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(0, 174, 239, 0.2) 100%)',
                borderRadius: '10px',
                padding: '40px',
                boxShadow: '0 10px 40px rgba(0, 174, 239, 0.04)',
                border: '1px solid rgba(0, 174, 239, 0.08)',
                display: 'flex',
                gap: '40px',
                alignItems: 'center'
              }}
            >
              {/* Inner Left: Rounded Photo with Pill Sticker */}
              <div className="winera-roi-get-img-wrapper" style={{
                position: 'relative',
                flexShrink: 0
              }}>
                <img
                  src={roiGet.image && (roiGet.image.startsWith('http') || roiGet.image.startsWith('data:')) ? roiGet.image : roiBlock6}
                  alt="Winera Built for Profit"
                  style={{
                    width: '210px',
                    height: '210px',
                    borderRadius: '20px',
                    objectFit: 'cover',
                    display: 'block',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
                  }}
                />
                {/* Built for Profit sticker */}
                <div style={{
                  position: 'absolute',
                  bottom: '-8px',
                  right: '-8px',
                  background: '#00aeef',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: '800',
                  padding: '6px 14px',
                  borderRadius: '30px',
                  boxShadow: 'none',
                  border: '2.5px solid #ffffff',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  {roiGet.badgeText || "Built for Profit."}
                </div>
              </div>

              {/* Inner Right: Feature List Connected with vertical line */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                position: 'relative',
                paddingLeft: '5px',
                flex: 1
              }}>
                {/* Vertical line connecting the badges */}
                <div style={{
                  position: 'absolute',
                  left: '23px',
                  top: '24px',
                  bottom: '24px',
                  width: '2px',
                  background: '#000000',
                  zIndex: 1
                }} />

                {(Array.isArray(roiGet.steps) ? roiGet.steps : []).map((step, idx) => {
                  let stepIcon;
                  if (idx === 0) {
                    stepIcon = <BarChart2 size={18} />;
                  } else if (idx === 1) {
                    stepIcon = <Edit3 size={18} />;
                  } else {
                    stepIcon = <Shield size={18} />;
                  }

                  return (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 2 }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '8px',
                        background: idx === 0 ? '#38bdf8' : '#ffffff',
                        border: idx === 0 ? 'none' : '1.5px solid #000000',
                        color: idx === 0 ? '#ffffff' : '#0f172a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {stepIcon}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: '0 0 3px 0', fontFamily: "'Inter', sans-serif" }}>
                          {step.title}
                        </h4>
                        <p style={{ fontSize: '12.5px', color: '#475569', margin: 0, fontFamily: "'Inter', sans-serif" }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Side Column (Title + description) */}
            <motion.div
              data-framer-motion="true"
              initial={{ opacity: 0, x: 75 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="winera-roi-get-content"
              style={{ paddingLeft: '20px' }}
            >
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', maxWidth: '100%', width: '280px', height: '8px', marginBottom: '14px', objectFit: 'fill' }}
              />
              <h2 style={{
                fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)',
                fontWeight: '900',
                color: '#0f172a',
                lineHeight: 1.12,
                margin: '0 0 24px 0',
                letterSpacing: '-0.8px'
              }}>
                {(() => {
                  if (roiGet.title.includes("Winera")) {
                    const mainBefore = roiGet.title.split("Winera")[0].replace(/\s*with\s*$/i, "").trim();
                    const afterWinera = roiGet.title.split("Winera")[1] ? roiGet.title.split("Winera")[1].trim() : "International";
                    return (
                      <>
                        {mainBefore}<br />
                        with <span style={{ color: '#00aeef' }}>Winera</span><br />
                        <span style={{ color: '#00aeef' }}>{afterWinera}</span>
                      </>
                    );
                  }
                  return roiGet.title;
                })()}
              </h2>
              <p style={{
                fontSize: '15px',
                color: '#475569',
                lineHeight: 1.6,
                margin: 0,
                fontFamily: "'Inter', sans-serif"
              }}>
                {roiGet.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. THIS IS FOR YOU IF SECTION (Checklist Block) */}
      <section className="winera-roi-checklist-section" style={{
        padding: '40px 4vw 40px',
        background: 'rgb(245, 245, 249)'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', textAlign: 'center' }}>
          {/* Title Header */}
          <div style={{ marginBottom: '30px' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'inline-block', maxWidth: '100%', width: '280px', height: '8px', marginBottom: '2px', objectFit: 'fill' }}
            />
            <h2 style={{
              fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
              fontWeight: '900',
              color: '#0f172a',
              lineHeight: 1.15,
              margin: '4px auto 0',
              maxWidth: '900px',
              letterSpacing: '-0.5px'
            }}>
              {roiChecklist.title.includes("This is") ? (
                <>
                  <span style={{ color: '#38bdf8' }}>This is</span> {roiChecklist.title.split("This is")[1]}
                </>
              ) : roiChecklist.title}
            </h2>
          </div>

          {/* Large Card Box with grid lines background */}
          <div className="winera-roi-checklist-card" style={{
            background: `url(${roiChecklist.bgImage && (roiChecklist.bgImage.startsWith('http') || roiChecklist.bgImage.startsWith('data:')) ? roiChecklist.bgImage : roiBlock7Bg}) center center / cover no-repeat, #030f26`,
            borderRadius: '24px',
            padding: '70px 60px',
            boxShadow: '0 20px 50px rgba(3, 15, 38, 0.25)',
            position: 'relative',
            textAlign: 'left'
          }}>
            {/* Checklist Grid */}
            <div className="winera-roi-checklist-grid" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '60px',
              position: 'relative',
              zIndex: 2
            }}>
              {/* Left Column wrapper (Fit Items) */}
              <motion.div
                data-framer-motion="true"
                initial={{ opacity: 0, x: -75 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="winera-roi-checklist-col-left"
                style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'relative' }}
              >
                {/* Float Pill Left (You're a fit) */}
                <div className="winera-roi-checklist-pill-left" style={{
                  position: 'absolute',
                  left: '50%',
                  top: '-94px',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  zIndex: 10,
                  width: 'fit-content'
                }}>
                  {/* Check circle */}
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: '3px solid #38bdf8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 0 3px #ffffff',
                    zIndex: 2,
                    flexShrink: 0
                  }}>
                    <span style={{ color: '#38bdf8', fontSize: '20px', fontWeight: '900', lineHeight: 1 }}>✓</span>
                  </div>
                  {/* Slanted blue pill (matching second image shape) */}
                  <div style={{
                    background: 'linear-gradient(90deg, #38bdf8 0%, #7dd3fc 100%)',
                    color: '#0f172a',
                    padding: '0 28px 0 24px',
                    borderRadius: '0 16px 16px 0',
                    marginLeft: '-14px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    transform: 'skewX(-16deg)',
                    zIndex: 1,
                    whiteSpace: 'nowrap'
                  }}>
                    <span style={{
                      transform: 'skewX(16deg)',
                      fontSize: '13.5px',
                      fontWeight: '800',
                      fontFamily: "'Inter', sans-serif"
                    }}>
                      {roiChecklist.fitPill || "You're a fit"}
                    </span>
                  </div>
                </div>

                {(Array.isArray(roiChecklist.fitItems) ? roiChecklist.fitItems : []).map((itemText, idx) => {
                  let icon;
                  if (idx === 0) {
                    icon = <BarChart2 size={22} />;
                  } else if (idx === 1) {
                    icon = <Database size={22} />;
                  } else if (idx === 2) {
                    icon = <Users size={22} />;
                  } else {
                    icon = <Settings size={22} />;
                  }
                  return (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'linear-gradient(180deg, rgba(2, 23, 56, 1) 0%, rgba(67, 99, 149, 1) 100%)',
                        border: '1px solid rgba(95, 154, 246, 0.75)',
                        boxShadow: '0 6px 16px rgba(2, 23, 56, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.25)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {icon}
                      </div>
                      <p style={{
                        fontSize: '16px',
                        color: 'rgb(226, 232, 240)',
                        lineHeight: '1.45',
                        fontWeight: '500',
                        margin: '0px',
                        fontFamily: "'Inter', sans-serif"
                      }}>
                        {itemText}
                      </p>
                    </div>
                  );
                })}
              </motion.div>

              {/* Right Column wrapper (Unfit Items) */}
              <motion.div
                data-framer-motion="true"
                initial={{ opacity: 0, x: 75 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="winera-roi-checklist-col-right"
                style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'relative' }}
              >
                {/* Float Pill Right (Not for you if - using red pill matching figma mockup) */}
                <div className="winera-roi-checklist-pill-right" style={{
                  position: 'absolute',
                  left: '50%',
                  top: '-94px',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  zIndex: 10,
                  width: 'fit-content'
                }}>
                  {/* Cross circle */}
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: '3px solid #ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 0 3px #ffffff',
                    zIndex: 2,
                    flexShrink: 0
                  }}>
                    <span style={{ color: '#ef4444', fontSize: '18px', fontWeight: '900', lineHeight: 1 }}>✕</span>
                  </div>
                  {/* Slanted red pill (matching second image shape) */}
                  <div style={{
                    background: 'linear-gradient(90deg, #ef4444 0%, #b91c1c 100%)',
                    color: '#ffffff',
                    padding: '0 28px 0 24px',
                    borderRadius: '0 16px 16px 0',
                    marginLeft: '-14px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    transform: 'skewX(-16deg)',
                    zIndex: 1,
                    whiteSpace: 'nowrap'
                  }}>
                    <span style={{
                      transform: 'skewX(16deg)',
                      fontSize: '13.5px',
                      fontWeight: '800',
                      fontFamily: "'Inter', sans-serif"
                    }}>
                      {roiChecklist.unfitPill === "You're a fit" ? "Not for you if" : (roiChecklist.unfitPill || "Not for you if")}
                    </span>
                  </div>
                </div>

                {(Array.isArray(roiChecklist.unfitItems) ? roiChecklist.unfitItems : []).map((itemText, idx) => {
                  let icon;
                  if (idx === 0) {
                    icon = <BarChart2 size={22} />;
                  } else if (idx === 1) {
                    icon = <AlertTriangle size={22} />;
                  } else if (idx === 2) {
                    icon = <TrendingDown size={22} />;
                  } else {
                    icon = <UserX size={22} />;
                  }
                  return (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'linear-gradient(180deg, rgba(2, 23, 56, 1) 0%, rgba(67, 99, 149, 1) 100%)',
                        border: '1px solid rgba(95, 154, 246, 0.75)',
                        boxShadow: '0 6px 16px rgba(2, 23, 56, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.25)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {icon}
                      </div>
                      <p style={{
                        fontSize: '16px',
                        color: 'rgb(226, 232, 240)',
                        lineHeight: '1.45',
                        fontWeight: '500',
                        margin: '0px',
                        fontFamily: "'Inter', sans-serif"
                      }}>
                        {itemText}
                      </p>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHAT OUR CLIENTS SAY (TESTIMONIALS) SECTION */}
      <TestimonialsSection siteData={siteData} />

      {/* 9. BOTTOM CTA BOOK CONSULTATION SECTION */}
      <section style={{ padding: '40px 4vw 40px', background: '#F5F5F9', textAlign: 'center' }}>
        <div className="winera-cta-banner-container" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative',
          backgroundImage: `url(${roiCta.bgUrl && (roiCta.bgUrl.startsWith('http') || roiCta.bgUrl.startsWith('data:')) ? roiCta.bgUrl : homeBlockBg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          borderRadius: '24px',
          padding: '60px 40px',
          minHeight: '290px',
          aspectRatio: '1920 / 520',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          overflow: 'hidden'
        }}>
          {/* Dark Background Overlay matching Hypergrid (rgba 8, 12, 22, 0.85) */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(8, 12, 22, 0.85)',
            borderRadius: '24px',
            zIndex: 1
          }} />

          {/* Heading */}
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.8vw, 2.5rem)',
            fontWeight: '900',
            lineHeight: 1.25,
            marginBottom: '14px',
            letterSpacing: '0.5px',
            position: 'relative',
            zIndex: 2,
            background: 'linear-gradient(90deg, rgba(255, 212, 0, 1) 0%, rgba(238, 229, 183, 1) 30%, rgba(0, 174, 239, 1) 68%, rgba(167, 229, 245, 1) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.85))',
            display: 'inline-block'
          }}>
            {roiCta.title || (
              <>
                {roiCta.yellowText || "READY TO"} {roiCta.whiteText || "SEE YOUR"} {roiCta.cyanText || "NUMBERS?"}
              </>
            )}
          </h2>

          {/* Description */}
          <p style={{
            fontSize: 'clamp(12px, 2.5vw, 14.5px)',
            fontWeight: '600',
            color: '#e2e8f0',
            lineHeight: 1.5,
            marginBottom: '26px',
            maxWidth: '780px',
            letterSpacing: '0.5px',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            textTransform: 'none',
            position: 'relative',
            zIndex: 2
          }}>
            {roiCta.subtitle}
          </p>

          {/* Styled Button offset wrap */}
          <div className="winera-yellow-cyan-cta-wrapper winera-yellow-cyan-cta-wrapper-sm" style={{ position: 'relative', zIndex: 2 }}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
              className="winera-yellow-cyan-cta-btn winera-yellow-cyan-cta-btn-sm"
            >
              {roiCta.buttonText}
            </a>
          </div>
        </div>
      </section>

      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pageSource="ROI Calculator Page"
      />

      {/* FOOTER */}
      <Footer footerData={footer} />
    </div>
  );
}
