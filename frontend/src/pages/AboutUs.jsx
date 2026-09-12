import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MotionCardFlip from '../components/MotionCardFlip';
import CountUpNumber from '../components/CountUpNumber';
import SectionHeading from '../components/SectionHeading';
import CtaBanner from '../components/CtaBanner';
import aboutHeroBg from '../assets/about-us-banner.webp';
import about1 from '../assets/about-01.webp';
import about3 from '../assets/about-3.webp';
import about4 from '../assets/about-4.webp';
import aboutUsTopBg from '../assets/about-us-image-1.webp';
import aboutUsBottomBg from '../assets/about-us-image-2.webp';
import wineraWBadge from '../assets/winera-w-badge.webp';
import founderUnnit from '../assets/founder-unnit.webp';
import aboutLounge from '../assets/about-lounge.webp';
import welcomeWineraImg from '../assets/welcome-to-winera.webp';
import aboutusCtaBg from '../assets/aboutus-cta-bg.webp';
import arcadeBtn1 from '../assets/arcadegame-button-1.png';
import arcadeBtn2 from '../assets/arcadegame-button-2.png';
import { Shield, Users, Target, Eye, TrendingUp, Maximize2, Clock, RefreshCw, Award, Headset, Settings } from 'lucide-react';

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

// Helper function to render title with *word* highlights, <cyan>cyan words</cyan> and <br/> linebreaks
const renderTitleMarkup = (rawText, defaultText, highlightColor = '#ffcd00') => {
  const text = rawText || defaultText;
  const parts = text.split(/\*{1,2}(.*?)\*{1,2}/gs);

  return parts.map((part, pIdx) => {
    const isHighlighted = pIdx % 2 === 1;
    const subParts = part.split(/<cyan>(.*?)<\/cyan>/gi);

    const renderedSub = subParts.map((sub, sIdx) => {
      const isCyan = sIdx % 2 === 1;
      const lines = sub.split(/<br\s*\/?>/i);
      const lineElements = lines.map((line, lIdx) => (
        <React.Fragment key={lIdx}>
          {lIdx > 0 && <br />}
          {line}
        </React.Fragment>
      ));

      if (isCyan) {
        return <span key={sIdx} style={{ color: '#38bdf8' }}>{lineElements}</span>;
      }
      return <React.Fragment key={sIdx}>{lineElements}</React.Fragment>;
    });

    if (isHighlighted) {
      return (
        <span key={pIdx} style={{ color: highlightColor }}>
          {renderedSub}
        </span>
      );
    }
    return <React.Fragment key={pIdx}>{renderedSub}</React.Fragment>;
  });
};

export default function AboutUs({ siteData }) {
  const aboutSeo = siteData?.aboutSeo || {
    pageTitle: "The Right Choice for Your Business | Winera International",
    metaDescription: "Winera delivers more than promises trusted expertise, customer care, and quality solutions that set us apart. Discover why clients choose us."
  };

  React.useEffect(() => {
    document.title = aboutSeo.pageTitle || aboutSeo.title || "The Right Choice for Your Business | Winera International";
    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'description');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', aboutSeo.metaDescription || aboutSeo.description || "Winera delivers more than promises trusted expertise, customer care, and quality solutions that set us apart. Discover why clients choose us.");
  }, [aboutSeo]);

  if (!siteData) return <div style={{ minHeight: '100vh', background: '#06132d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

  const { header, footer } = siteData;

  const aboutHeroData = siteData?.aboutHero || {};
  const heroBg = getValidImageUrl(aboutHeroData.bgUrl, aboutHeroBg);

  // Welcome Section WhatsApp button link calculation
  const rawWelcomeLink = siteData?.aboutWelcome?.btnLink || "https://wa.me/919428989488";
  let welcomeWaMsg = siteData?.aboutWelcome?.waMessage;
  const baseWelcomeLink = rawWelcomeLink.split('?')[0];

  if (!welcomeWaMsg && rawWelcomeLink.includes('text=')) {
    try {
      const match = rawWelcomeLink.match(/text=([^&]+)/);
      if (match && match[1]) {
        welcomeWaMsg = decodeURIComponent(match[1]);
      }
    } catch (e) { }
  }

  if (!welcomeWaMsg) {
    welcomeWaMsg = "Hello Winera International! I want to contact your team regarding amusement solutions. Please share details. [Ref: About Us Page]";
  }

  const welcomeButtonLink = `${baseWelcomeLink}?text=${encodeURIComponent(welcomeWaMsg)}`;

  // Why Choose Us Section Primary WhatsApp button link calculation
  const rawWhyUsLink = siteData?.aboutWhyUsDetail?.ctaPrimaryLink || "https://wa.me/919428989488";
  let whyUsWaMsg = siteData?.aboutWhyUsDetail?.waMessage;
  const baseWhyUsLink = rawWhyUsLink.split('?')[0];

  if (!whyUsWaMsg && rawWhyUsLink.includes('text=')) {
    try {
      const match = rawWhyUsLink.match(/text=([^&]+)/);
      if (match && match[1]) {
        whyUsWaMsg = decodeURIComponent(match[1]);
      }
    } catch (e) { }
  }

  if (!whyUsWaMsg) {
    whyUsWaMsg = "Hello Winera International! I want to get started with a game zone project. Please share details. [Ref: About Us Page]";
  }

  const whyUsButtonLink = `${baseWhyUsLink}?text=${encodeURIComponent(whyUsWaMsg)}`;

  return (
    <div style={{ backgroundColor: '#F5F5F9', color: '#0f172a', minHeight: '100vh' }}>
      {/* 1. HEADER NAVBAR */}
      <Header headerData={header} />

      {/* 2. ABOUT US HERO BANNER */}
      <section className="winera-about-hero-section" style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1920 / 460',
        paddingTop: '120px',
        paddingBottom: '50px',
        background: `url(${heroBg}) center/100% 100% no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          <h1 style={{
            fontSize: '3.6rem',
            fontWeight: '900',
            letterSpacing: '-1px',
            marginBottom: '12px',
            lineHeight: 1.15
          }}>
            {(() => {
              const rawTitle = siteData?.aboutHero?.title || "*About* Us";
              const parts = rawTitle.split(/\*{1,2}(.*?)\*{1,2}/g);
              return parts.map((part, index) => {
                if (index % 2 === 1) {
                  return (
                    <span key={index} style={{ color: '#ffcd00' }}>
                      {part}
                    </span>
                  );
                }
                return part;
              });
            })()}
          </h1>

          <div className="winera-about-hero-breadcrumb" style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            margin: 0,
            lineHeight: 1.2,
            textAlign: 'center'
          }}>
            <a href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '600' }}>Home</a>
            <span style={{ color: '#ffffff', fontWeight: '400' }}>&rsaquo;</span>
            <span style={{ color: '#ffffff', fontWeight: '600' }}>About Us</span>
          </div>
        </div>
      </section>

      {/* 3. WELCOME TO WINERA INTERNATIONAL SECTION */}
      <section id="welcome" style={{ padding: '60px 4vw 60px', background: '#f5f5f9' }}>
        <div className="winera-about-welcome-grid" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '0.85fr 1.3fr',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div className="winera-about-welcome-collage" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <img
              src={getValidImageUrl(siteData?.aboutWelcome?.mainImgUrl || siteData?.aboutWelcome?.img, welcomeWineraImg)}
              alt="Welcome to Winera International 13+ Years Experience"
              style={{
                width: '100%',
                maxHeight: '440px',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>

          <div style={{ textAlign: 'left' }}>
            <SectionHeading align="left" marginBottom="16px" accentWidth="65%" accentMaxWidth="320px">
              {(() => {
                const rawTitle = siteData?.aboutWelcome?.title || "Welcome to *Winera International*";
                const parts = rawTitle.split(/\*{1,2}(.*?)\*{1,2}/g);
                return parts.map((part, index) => {
                  if (index % 2 === 1) {
                    return (
                      <span key={index} style={{ color: '#00a8ff' }}>
                        {part}
                      </span>
                    );
                  }
                  return part;
                });
              })()}
            </SectionHeading>

            <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.65, fontWeight: '500', marginBottom: '24px', maxWidth: '100%' }}>
              {siteData?.aboutWelcome?.desc || "Winera International Pvt. Ltd. is a Surat-based B2B leader in indoor amusement and playground solutions. Since 2014, we have been transforming commercial spaces into world-class entertainment destinations, handling everything from design and manufacturing to installation and after-sales support."}
            </p>

            <div className="winera-about-welcome-box-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
              <MotionCardFlip style={{ position: 'relative', background: '#ffffff', borderRadius: '18px', padding: '20px 22px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', borderLeft: '4px solid #00a8ff' }}>
                <div style={{ color: '#00a8ff', marginBottom: '10px' }}><Shield style={{ width: '24px', height: '24px', fill: '#00a8ff', color: '#00a8ff' }} /></div>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#1e3a8a', marginBottom: '6px' }}>{siteData?.aboutWelcome?.box1Title || "Quality Assurance"}</h4>
                <p style={{ fontSize: '15px', color: '#64748b', fontWeight: '500', lineHeight: 1.5 }}>{siteData?.aboutWelcome?.box1Desc || "At Winera International, Quality Is Key. Our Lanes, Trampolines, Soft Play, And Arcade Games Are Built To Last And Ensure Safety. We Don't Just Build Equipment; We Build Experiences You Can Trust."}</p>
              </MotionCardFlip>
              <MotionCardFlip style={{ position: 'relative', background: '#ffffff', borderRadius: '18px', padding: '20px 22px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', borderLeft: '4px solid #00a8ff' }}>
                <div style={{ color: '#00a8ff', marginBottom: '10px' }}><Users style={{ width: '24px', height: '24px', color: '#00a8ff' }} /></div>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#1e3a8a', marginBottom: '6px' }}>{siteData?.aboutWelcome?.box2Title || "Your Success, Our Commitment"}</h4>
                <p style={{ fontSize: '15px', color: '#64748b', fontWeight: '500', lineHeight: 1.5 }}>{siteData?.aboutWelcome?.box2Desc || "At Winera International, We Prioritize Your Satisfaction. From Product Exploration To Final Installation And Beyond, Our Dedicated Team Walks With You At Every Step."}</p>
              </MotionCardFlip>
            </div>

            <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
              <a
                href={welcomeButtonLink}
                target="_blank"
                rel="noreferrer"
                className="winera-cyan-cta-btn winera-cyan-cta-btn-sm"
              >
                <span>{siteData?.aboutWelcome?.btnText || "Contact Us Now"}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STATS & OUR PURPOSE & PROMISE SECTION */}
      <section style={{ padding: '0 0 50px', background: '#F5F5F9', textAlign: 'center' }}>
        <div style={{ background: 'linear-gradient(180deg, #e0f2fe 0%, #ffffff 100%)', padding: '40px 4vw 50px', marginBottom: '50px' }}>
          <div className="winera-about-stats-grid" style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {(() => {
              const defaultStats = [
                { number: "14+", label: "YEARS<br/>EXPERIENCE" },
                { number: "200+", label: "Project Completed" },
                { number: "98%", label: "Happy Clients" },
                { number: "50+", label: "Cities Covered" }
              ];

              const dbStats = Array.isArray(siteData?.aboutStats?.items) && siteData.aboutStats.items.length > 0
                ? siteData.aboutStats.items
                : (Array.isArray(siteData?.stats) && siteData.stats.length > 0 ? siteData.stats : defaultStats);

              const stats = dbStats.map((item, idx) => ({
                number: item.num || item.number || (defaultStats[idx] ? defaultStats[idx].number : '100+'),
                label: item.title || item.label || (defaultStats[idx] ? defaultStats[idx].label : 'Stat Label')
              }));

              const renderStatLabel = (labelStr) => {
                if (!labelStr || typeof labelStr !== 'string') return labelStr;
                let formatted = labelStr;
                if (formatted.toUpperCase() === 'YEARS EXPERIENCE') {
                  formatted = 'YEARS<br/>EXPERIENCE';
                } else if (formatted.toUpperCase() === 'YEARS OF EXPERIENCE') {
                  formatted = 'YEARS OF<br/>EXPERIENCE';
                } else if (formatted.toUpperCase() === 'CUSTOMER SATISFACTION') {
                  formatted = 'CUSTOMER<br/>SATISFACTION';
                }
                return formatted.split(/<br\s*\/?>|\n/i).map((line, lIdx) => (
                  <React.Fragment key={lIdx}>
                    {lIdx > 0 && <br />}
                    {line}
                  </React.Fragment>
                ));
              };

              return stats.map((stat, idx) => (
                <div key={idx} style={{
                  background: '#ffffff',
                  borderRadius: '18px',
                  padding: '24px 22px 20px',
                  boxShadow: '0 12px 30px rgba(56, 189, 248, 0.12)',
                  borderLeft: '4px solid #38bdf8',
                  textAlign: 'left'
                }}>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0284c7', lineHeight: 1, marginBottom: '10px' }}>
                    <CountUpNumber value={stat.number} />
                  </h3>
                  <p style={{ fontSize: '12.5px', fontWeight: '700', color: 'rgba(110, 120, 129, 1)', lineHeight: 1.3, margin: 0 }}>
                    {renderStatLabel(stat.label)}
                  </p>
                </div>
              ));
            })()}
          </div>
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 4vw' }}>
          <SectionHeading marginBottom="40px" accentWidth="367px" accentMaxWidth="95%" accentHeight="11px" accentMarginBottom="8px" accentAlign="left-inline">
            {(() => {
              const rawTitle = siteData?.aboutMissionVision?.title || "*Our Purpose* & Promise";
              const parts = rawTitle.split(/\*{1,2}(.*?)\*{1,2}/g);
              return parts.map((part, index) => {
                if (index % 2 === 1) {
                  return (
                    <span key={index} style={{ color: '#00a8ff' }}>
                      {part}
                    </span>
                  );
                }
                return part;
              });
            })()}
          </SectionHeading>

          <div className="winera-about-purpose-grid" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center' }}>
            <div className="winera-about-purpose-divider" style={{ position: 'absolute', left: '50%', top: '0', bottom: '0', width: '1.5px', background: '#7dd3fc', transform: 'translateX(-50%)', zIndex: 1 }}></div>

            {/* Left Mission Card */}
            <div style={{ position: 'relative', textAlign: 'left' }}>
              <div style={{ display: 'inline-block', background: '#38bdf8', color: '#ffffff', fontSize: '13px', fontWeight: '800', padding: '6px 28px', borderRadius: '10px 10px 0 0', marginLeft: '50px' }}>
                {siteData?.aboutMissionVision?.missionLabel || "Mission"}
              </div>
              <div style={{
                position: 'relative',
                background: 'linear-gradient(135deg, #00b4d8 0%, #38bdf8 20%, #e0f2fe 55%, #ffffff 100%)',
                borderRadius: '24px',
                padding: '36px 32px',
                border: '1.5px solid #e0f2fe',
                boxShadow: '0 10px 30px rgba(56, 189, 248, 0.08)',
                color: '#334155',
                zIndex: 5
              }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Target style={{ width: '22px', height: '22px', color: '#0284c7' }} />
                </div>
                <p style={{ fontSize: '0.94rem', fontWeight: '500', color: '#334155', lineHeight: 1.65, margin: 0 }}>
                  {siteData?.aboutMissionVision?.missionText || "We deliver premium-quality game zone and indoor playground solutions to B2B clients across India combining expert design, international equipment, and seamless project execution to create entertainment spaces that last."}
                </p>
              </div>
              {/* Overlapping Glass Frame Front Mission */}
              <div className="winera-about-purpose-frame" style={{
                position: 'absolute',
                top: '-5px',
                left: '210px',
                width: '55%',
                height: '100%',
                border: '1.5px solid #7dd3fc',
                borderRadius: '24px',
                background: 'transparent',
                pointerEvents: 'none',
                zIndex: 10
              }}></div>
            </div>

            {/* Right Vision Card */}
            <div style={{ position: 'relative', textAlign: 'left' }}>
              <div style={{ display: 'inline-block', background: '#ffcd00', color: '#0f172a', fontSize: '13px', fontWeight: '800', padding: '6px 28px', borderRadius: '10px 10px 0 0', marginLeft: '50px' }}>
                {siteData?.aboutMissionVision?.visionLabel || "Vision"}
              </div>
              <div style={{
                position: 'relative',
                background: 'linear-gradient(135deg, #facc15 0%, #fde047 20%, #fef9c3 55%, #ffffff 100%)',
                borderRadius: '24px',
                padding: '36px 32px',
                border: '1.5px solid #fef9c3',
                boxShadow: '0 10px 30px rgba(250, 204, 21, 0.08)',
                color: '#334155',
                zIndex: 5
              }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Eye style={{ width: '22px', height: '22px', color: '#854d0e' }} />
                </div>
                <p style={{ fontSize: '0.94rem', fontWeight: '500', color: '#334155', lineHeight: 1.65, margin: 0 }}>
                  {siteData?.aboutMissionVision?.visionText || "To be India's most trusted partner in building world-class indoor entertainment destinations where every space we touch becomes a thriving hub of joy, play, and business success."}
                </p>
              </div>
              {/* Overlapping Glass Frame Front Vision */}
              <div className="winera-about-purpose-frame" style={{
                position: 'absolute',
                top: '40px',
                left: '15px',
                width: '58%',
                height: '90%',
                border: '1.5px solid #fde047',
                borderRadius: '24px',
                background: 'transparent',
                pointerEvents: 'none',
                zIndex: 10
              }}></div>
              {/* Bottom Center Small Overlapping Box */}
              <div className="winera-about-purpose-frame" style={{
                position: 'absolute',
                bottom: '-22px',
                top: '230px',
                left: '-60px',
                width: '135px',
                height: '60px',
                border: '1.5px solid #facc15',
                borderRadius: '20px',
                background: 'transparent',
                pointerEvents: 'none',
                zIndex: 10
              }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US MINDMAP & 3-CARD SECTION */}
      <section id="why-choose-us-detail" className="winera-about-mindmap-section" style={{ position: 'relative', width: '100%', padding: '0 0 50px', background: '#F5F5F9', textAlign: 'center' }}>
        <div style={{ position: 'relative', width: '100%', background: `url(${getValidImageUrl(siteData?.aboutWhyUsDetail?.bgUrl, aboutUsTopBg)}) center top / 100% 100% no-repeat`, padding: '80px 4vw 80px', minHeight: '775px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SectionHeading marginBottom="40px" accentWidth="370px" accentMaxWidth="95%" accentHeight="11px" accentMarginBottom="8px" accentAlign="left-inline" style={{ zIndex: 10 }}>
            {(() => {
              const rawTitle = siteData?.aboutWhyUsDetail?.title || "Why *Choose Us?*";
              const parts = rawTitle.split(/\*{1,2}(.*?)\*{1,2}/g);
              return parts.map((part, index) => {
                if (index % 2 === 1) {
                  return (
                    <span key={index} style={{ color: '#00a8ff' }}>
                      {part}
                    </span>
                  );
                }
                return part;
              });
            })()}
          </SectionHeading>

          <div className="winera-about-mindmap-container" style={{ position: 'relative', width: '100%', maxWidth: '1080px', height: '260px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg className="winera-about-mindmap-svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
              <line x1="321" y1="45" x2="540" y2="130" stroke="#00a8ff" strokeWidth="1.8" opacity="0.65" />
              <line x1="315" y1="130" x2="540" y2="130" stroke="#00a8ff" strokeWidth="1.8" opacity="0.65" />
              <line x1="385" y1="235" x2="540" y2="130" stroke="#00a8ff" strokeWidth="1.8" opacity="0.65" />
              <line x1="714" y1="35" x2="540" y2="130" stroke="#d97706" strokeWidth="1.8" opacity="0.65" />
              <line x1="734" y1="130" x2="540" y2="130" stroke="#d97706" strokeWidth="1.8" opacity="0.65" />
              <line x1="704" y1="235" x2="540" y2="130" stroke="#d97706" strokeWidth="1.8" opacity="0.65" />
            </svg>
            <div className="winera-about-mindmap-badge" style={{ position: 'relative', zIndex: 10, width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'drop-shadow(0 15px 35px rgba(0, 168, 255, 0.45))' }}>
              <img src={wineraWBadge} alt="Winera Badge" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            {(() => {
              const defaultPills = [
                "Rich Vendor Base",
                "Transparent Project Pricing",
                "International-Grade Quality Equipment",
                "On-Time Delivery & Installation",
                "End-to-End Project Ownership",
                "Competitive Pricing with High ROI"
              ];
              const pills = Array.isArray(siteData?.aboutWhyUsDetail?.pills) && siteData.aboutWhyUsDetail.pills.length >= 6
                ? siteData.aboutWhyUsDetail.pills
                : defaultPills;

              const leftItems = [
                { icon: TrendingUp, text: pills[0], offset: '66px' },
                { icon: Maximize2, text: pills[1], offset: '85px' },
                { icon: Headset, text: pills[2], offset: '42px' }
              ];
              const rightItems = [
                { icon: Clock, text: pills[3], offset: '10px' },
                { icon: RefreshCw, text: pills[4], offset: '0px' },
                { icon: Award, text: pills[5], offset: '0px' }
              ];

              return (
                <>
                  <div className="winera-about-mindmap-left" style={{ position: 'absolute', left: '3px', top: '12px', bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 5 }}>
                    {leftItems.map((item, idx) => (
                      <div key={idx} className="winera-about-mindmap-item" style={{
                        position: 'relative',
                        background: '#ffffff',
                        borderRadius: '40px',
                        padding: idx === 0 ? '14px 75px 14px 18px' : '14px 22px 14px 18px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        overflow: 'hidden',
                        width: 'fit-content',
                        maxWidth: '420px',
                        marginLeft: item.offset
                      }}>
                        {/* Left Side Blue Accent Line */}
                        <div style={{
                          position: 'absolute',
                          left: 0,
                          top: '18%',
                          bottom: '18%',
                          width: '4px',
                          background: '#38bdf8',
                          borderRadius: '0 4px 4px 0'
                        }} />
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <item.icon style={{ width: '15px', height: '15px', color: '#0284c7' }} />
                        </div>
                        <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#0f172a' }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="winera-about-mindmap-right" style={{ position: 'absolute', right: '66px', top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 5 }}>
                    {rightItems.map((item, idx) => (
                      <div key={idx} className="winera-about-mindmap-item" style={{
                        position: 'relative',
                        background: '#ffffff',
                        borderRadius: '40px',
                        padding: '14px 30px 14px 18px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        overflow: 'hidden',
                        width: 'fit-content',
                        maxWidth: '420px',
                        marginRight: item.offset
                      }}>
                        {/* Left Side Yellow Accent Line */}
                        <div style={{
                          position: 'absolute',
                          left: 0,
                          top: '18%',
                          bottom: '18%',
                          width: '4px',
                          background: '#eab308',
                          borderRadius: '0 4px 4px 0'
                        }} />
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <item.icon style={{ width: '15px', height: '15px', color: '#d97706' }} />
                        </div>
                        <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#0f172a' }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
        <div className="winera-about-whyus-bottom-bg" style={{ position: 'relative', width: '100%', background: `url(${getValidImageUrl(siteData?.aboutWhyUsDetail?.bottomBgUrl, aboutUsBottomBg)}) center top / 100% 100% no-repeat`, padding: '80px 4vw 100px', marginTop: '-340px', zIndex: 2 }}>
          <div className="winera-about-whyus-cards-grid" style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', textAlign: 'left' }}>
            {(() => {
              const defaultCards = [
                { title: "Sales", desc: "From the moment you choose Winera International, our dedicated sales team works closely with you to finalize the right game zone solution for your space and budget. We're an ROI-focused partner. Before any project begins, every client receives a complete ROI report covering projected footfall, revenue potential, and payback period. We handle product selection, project scoping, pricing, and documentation, making your buying experience smooth, transparent, and completely hassle-free.", icon: Headset, bg: '#00a8ff', color: '#ffffff' },
                { title: "Service", desc: "Our professional installation team takes complete ownership of your project from equipment delivery and assembly to safety testing and final handover. Every game zone we install is set up with precision, care, and zero compromise on quality standards so your entertainment space is ready to welcome visitors from day one.", icon: Settings, bg: '#7dd3fc', color: '#0284c7' },
                { title: "Satisfaction", desc: "At Winera International, a completed project is just the beginning of our relationship. We measure our success by yours whether it's children laughing in our soft play zones, families enjoying our bowling alleys, or teenagers competing on our arcade machines. Your visitors' joy and your business's growth are what drive everything we do.", icon: Award, bg: '#ffcd00', color: '#0f172a' }
              ];

              const cardsList = Array.isArray(siteData?.aboutWhyUsDetail?.cards) && siteData.aboutWhyUsDetail.cards.length >= 3
                ? siteData.aboutWhyUsDetail.cards
                : defaultCards;

              const stylingIcons = [
                { icon: Headset, bg: '#00a8ff', color: '#ffffff' },
                { icon: Settings, bg: '#7dd3fc', color: '#0284c7' },
                { icon: Award, bg: '#ffcd00', color: '#0f172a' }
              ];

              return cardsList.map((c, idx) => {
                const styleObj = stylingIcons[idx % 3];
                const IconComponent = styleObj.icon;

                return (
                  <div key={idx} style={{ background: '#ffffff', borderRadius: '24px', padding: '36px 30px', boxShadow: '0 15px 40px rgba(0, 168, 255, 0.08)', border: '1px solid #f1f5f9' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: styleObj.bg, color: styleObj.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}><IconComponent style={{ width: '20px', height: '20px' }} /></div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0f172a', marginBottom: '12px' }}>{c.title}</h3>
                    <p style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', lineHeight: 1.6 }}>{c.desc}</p>
                  </div>
                );
              });
            })()}
          </div>

          {/* CTA Buttons: Get Started & View Our Products */}
          <div className="winera-about-whyus-cta-btns" style={{ textAlign: 'center', marginTop: '55px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            {/* Primary Button: Get Started with arcadegame-button-1.png BG */}
            <a
              href={whyUsButtonLink}
              target="_blank"
              rel="noreferrer"
              style={{
                width: '190px',
                height: '70px',
                background: `url(${getValidImageUrl(siteData?.aboutWhyUsDetail?.ctaPrimaryBg, arcadeBtn1)}) center center / 100% 100% no-repeat`,
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: '600',
                border: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: '7px 5px 2px 0',
                textDecoration: 'none'
              }}
            >
              <span>{siteData?.aboutWhyUsDetail?.ctaPrimaryText || "Get Started"}</span>
            </a>

            {/* Secondary Button: View Our Products with arcadegame-button-2.png BG */}
            <a
              href={siteData?.aboutWhyUsDetail?.ctaSecondaryLink || "/arcade-game"}
              style={{
                width: '190px',
                height: '70px',
                background: `url(${getValidImageUrl(siteData?.aboutWhyUsDetail?.ctaSecondaryBg, arcadeBtn2)}) center center / 100% 100% no-repeat`,
                color: '#0f172a',
                fontSize: '15px',
                fontWeight: '700',
                border: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: '7px 5px 2px 0',
                textDecoration: 'none'
              }}
            >
              <span>{siteData?.aboutWhyUsDetail?.ctaSecondaryText || "View Our Products"}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. OUR FOUNDER SECTION */}
      <section id="founder" style={{ padding: '50px 4vw 50px', background: '#F5F5F9', position: 'relative' }}>
        <div className="winera-about-founder-grid" style={{ maxWidth: '1180px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '60px', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto' }}>
            <img
              src={siteData?.founder?.image || founderUnnit}
              alt={`${siteData?.founder?.name || 'Mr. Unnit Jogani'} - Founder & CEO`}
              style={{
                position: 'relative',
                zIndex: 10,
                maxHeight: '460px',
                width: 'auto',
                display: 'block',
                filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.12))'
              }}
            />
            {/* 14+ Years Experience Circular Badge Attached to Image */}
            <div
              className="winera-about-founder-badge"
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '20px',
                zIndex: 20,
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '4px solid #0f172a',
                boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '8px'
              }}
            >
              <span style={{ fontSize: '1.9rem', fontWeight: '900', color: '#ec4899', lineHeight: 1 }}>
                {siteData?.founder?.yearsOfExperience || '14+'}
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#ec4899', lineHeight: 1.15, marginTop: '2px' }}>
                Years<br />Experience
              </span>
            </div>
          </div>
          <div style={{ textAlign: 'left' }}>
            <SectionHeading align="left" marginBottom="24px" accentWidth="65%" accentMaxWidth="360px">
              {(() => {
                const rawTitle = siteData?.founder?.headingTitle || "OUR *FOUNDER*";
                const parts = rawTitle.split(/\*{1,2}(.*?)\*{1,2}/g);
                return parts.map((part, index) => {
                  if (index % 2 === 1) {
                    return (
                      <span key={index} style={{ color: '#00a8ff' }}>
                        {part}
                      </span>
                    );
                  }
                  return part;
                });
              })()}
            </SectionHeading>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '500', color: '#0f172a', marginBottom: '16px' }}>{siteData?.founder?.name || 'Mr. Unnit Jogani'}</h3>

            <div style={{ color: '#475569', fontSize: '16px', lineHeight: 1.65, fontWeight: '500', marginBottom: '32px', whiteSpace: 'pre-line' }}>
              {(() => {
                const defaultBio = "Mr. Unnit Jogani is the Founder & CEO of Winera International Pvt. Ltd., one of India's most trusted game zone equipment manufacturers and indoor amusement park solution providers.\n\nSince establishing Winera in Surat, Gujarat in 2014, Unnit has led the company's growth from a regional startup to a pan-India B2B leader with an uncompromising focus on quality, safety, and client satisfaction.";
                let rawText = siteData?.founder?.aboutDetails || defaultBio;
                const targetPhrase = "game zone equipment manufacturers and indoor amusement park solution providers.";

                if (rawText.includes(targetPhrase) && !rawText.includes(`*${targetPhrase}*`)) {
                  rawText = rawText.replace(targetPhrase, `*${targetPhrase}*`);
                }

                const parts = rawText.split(/\*{1,2}(.*?)\*{1,2}/g);
                return parts.map((part, index) => {
                  if (index % 2 === 1) {
                    return (
                      <strong key={index} style={{ fontWeight: '600', color: 'rgba(55, 62, 65, 1)' }}>
                        {part}
                      </strong>
                    );
                  }
                  return part;
                });
              })()}
            </div>

            <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
              <a
                href={siteData?.founder?.linkedinUrl || "https://linkedin.com"}
                target="_blank"
                rel="noreferrer"
                className="winera-cyan-cta-btn winera-cyan-cta-btn-sm"
              >
                <span>Linkedin Profile</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA BANNER SECTION */}
      <CtaBanner
        pageSource="About Us Page"
        showOverlay={false}
        align="left"
        buttonTheme="yellow_white"
        gradientTagline={false}
        gradientTitle={true}
        bgUrl={siteData?.aboutCta?.bgUrl !== undefined ? siteData.aboutCta.bgUrl : null}
        bg={aboutusCtaBg}
        tagline={
          siteData?.aboutCta?.tagline !== undefined
            ? siteData.aboutCta.tagline
            : "READY TO GET STARTED?"
        }
        title={
          siteData?.aboutCta?.title !== undefined
            ? siteData.aboutCta.title
            : "TAKE THE NEXT STEP TOWARDS<br />YOUR PERFECT GAME ZONE"
        }
        subtitle=""
        description={
          siteData?.aboutCta?.description !== undefined
            ? siteData.aboutCta.description
            : "Whether you're starting from scratch or upgrading an existing space our team is ready to help you plan, build, and launch a game zone that drives real revenue."
        }
        buttonText={
          siteData?.aboutCta?.buttonText !== undefined
            ? siteData.aboutCta.buttonText
            : "Talk to an ROI Expert"
        }
        buttonLink={
          siteData?.aboutCta?.buttonLink !== undefined
            ? siteData.aboutCta.buttonLink
            : "https://wa.me/919428989488"
        }
      />

      {/* 8. FOOTER */}
      <Footer footerData={footer} />
    </div>
  );
}
