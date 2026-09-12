import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeading from '../components/SectionHeading';
import FaqSection from '../components/FaqSection';
import ProjectsMarqueeSection from '../components/ProjectsMarqueeSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ClientsMarqueeSection from '../components/ClientsMarqueeSection';
import CtaBanner from '../components/CtaBanner';
import MotionCardFlip from '../components/MotionCardFlip';
import heroBg from '../assets/home-page-banner-bg.webp';
import about1 from '../assets/about-01.webp';
import about2 from '../assets/about-2.webp';
import about3 from '../assets/about-3.webp';
import aboutCollage from '../assets/about-collage.webp';
import qualityBadge from '../assets/quality-badge.webp';
import productsBg from '../assets/products-bg.webp';
import homePageBanner from '../assets/home-page banner.webp';
import partnerBg from '../assets/partner-bg.webp';
import whyChooseBg from '../assets/why-choose-bg.webp';
import indMall from '../assets/ind-mall.webp';
import indResort from '../assets/ind-resort.webp';
import indSchool from '../assets/ind-school.webp';
import homeBlockBg from '../assets/home-block.webp';
import homeBlock1 from '../assets/home-block-1.webp';
import homeBlock2 from '../assets/home-block-2.webp';
import homeRightSign from '../assets/home-right-sign.webp';
import exploreMore1 from '../assets/explore-more-1.png';
import exploreMore2 from '../assets/explore-more-2.png';
import homePageIcon from '../assets/home-page-icon.png';
import homeLeftArrow from '../assets/home-page-left-arrow.png';
import homeRightArrow from '../assets/home-page-right-arrow.png';
import { Check, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight, LayoutGrid, ShoppingBag, Palette, Wrench, CheckCheck, UserCheck } from 'lucide-react';

const getValidImageUrl = (url, fallback) => {
  if (!url || typeof url !== 'string' || url.trim() === '' || url.includes('/src/assets/')) {
    return fallback;
  }
  let finalUrl = url;
  if (url.startsWith('/uploads')) {
    const hostname = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';
    finalUrl = `http://${hostname}:5001${url}`;
  }
  if (finalUrl.includes('/uploads/')) {
    finalUrl = finalUrl.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  }
  if (finalUrl.startsWith('http://') || finalUrl.startsWith('https://') || finalUrl.startsWith('data:')) {
    return finalUrl;
  }
  return fallback;
};

const CountUpNumber = ({ targetText, duration = 1800 }) => {
  const [count, setCount] = React.useState(0);
  const elementRef = React.useRef(null);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  const raw = String(targetText || '');
  const match = raw.match(/(\d+)/);
  const targetNum = match ? parseInt(match[1], 10) : 0;
  const prefix = match ? raw.substring(0, match.index) : '';
  const suffix = match ? raw.substring(match.index + match[0].length) : raw;

  React.useEffect(() => {
    if (typeof window === 'undefined' || !elementRef.current || targetNum === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            let startTime = null;

            const animate = (currentTime) => {
              if (!startTime) startTime = currentTime;
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easedProgress = 1 - Math.pow(1 - progress, 3);
              const currentVal = Math.floor(easedProgress * targetNum);

              setCount(currentVal);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(targetNum);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [targetNum, duration, hasAnimated]);

  if (!match) return <span>{targetText}</span>;

  return (
    <span ref={elementRef}>
      {prefix}{hasAnimated ? count : 0}{suffix}
    </span>
  );
};

export default function Home({ siteData }) {
  const navigate = useNavigate();
  const [activeProductIndex, setActiveProductIndex] = React.useState(0);
  const [activeIndustryIndex, setActiveIndustryIndex] = React.useState(2);

  const resolveProductLink = (prod) => {
    const title = (prod.title || '').toLowerCase();
    const rawLink = (prod.link || '').toLowerCase();
    if (title.includes('bumper') || rawLink.includes('bumper')) return '/products/bumper-car';
    if (title.includes('arcade') || rawLink.includes('arcade')) return '/products/arcade-games';
    if (title.includes('vr') || rawLink.includes('vr')) return '/products/vr-games';
    if (title.includes('ar') || rawLink.includes('ar')) return '/products/ar-games';
    if (title.includes('bowling') || rawLink.includes('bowling')) return '/products/bowling-alley';
    if (title.includes('soft') || rawLink.includes('soft')) return '/products/soft-play';
    if (title.includes('trampoline') || rawLink.includes('trampoline')) return '/products/trampoline-park';
    if (title.includes('hyper') || rawLink.includes('hyper')) return '/products/hypergrid';
    if (title.includes('laser') || rawLink.includes('laser')) return '/products/laser-tag';
    if (title.includes('amusement') || rawLink.includes('amusement')) return '/products/amusement-park';
    if (title.includes('decorative') || title.includes('light') || rawLink.includes('light')) return '/products/lights';
    return prod.link || '/products/bumper-car';
  };

  const homeSeo = siteData?.homeSeo || {
    pageTitle: "Game Zone Equipment Manufacturer in India | Winera International",
    metaDescription: "Winera International is your trusted Game Zone Equipment Manufacturer and Indoor Play Equipment Manufacturer in India since 2014. Get Amazing deals!"
  };

  React.useEffect(() => {
    document.title = homeSeo.pageTitle || homeSeo.title || "Game Zone Equipment Manufacturer in India | Winera International";
    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'description');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', homeSeo.metaDescription || homeSeo.description || "Winera International is your trusted Game Zone Equipment Manufacturer and Indoor Play Equipment Manufacturer in India since 2014. Get Amazing deals!");
  }, [homeSeo]);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

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
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1
      }
    );

    const initObserver = () => {
      const elements = document.querySelectorAll('.winera-reveal, .winera-animate-block, [data-aos]');
      elements.forEach((el) => {
        observer.observe(el);
      });
    };

    initObserver();
    const timer = setTimeout(initObserver, 150);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [siteData]);

  if (!siteData) return <div style={{ minHeight: '100vh', background: '#06132d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

  const { header, hero, footer } = siteData;

  const defaultHomeFaqs = [
    {
      q: "How do I set up a game zone in India?",
      a: "Start with a consultation and share your available space, budget, and location with our team. As a trusted gaming zone setup company in India, Winera International handles everything from ROI analysis and layout design to equipment selection, installation, and post-launch support across 50+ cities."
    },
    {
      q: "What is the cost of a game zone setup in India?",
      a: "Game zone setup cost in India totally depends on the size of space, type of attractions, and level of customisation. As a direct game zone equipment supplier, Winera International provides a complete cost breakdown covering equipment, installation, and maintenance before you confirm any project. Contact our team for a quote specific to your venue."
    },
    {
      q: "Does Winera handle the complete game zone setup?",
      a: "Yes. As experienced game zone developers in India, we manage the entire project from concept to completion, space planning, equipment sourcing, layout design, installation, and after-sales support all handled by our own team, not third-party contractors."
    },
    {
      q: "Which cities does Winera cover in India?",
      a: "Winera International installs game zone equipment across 50+ cities in India — covering Tier-1 metros, Tier-2 cities, and emerging Tier-3 markets. Our own installation team reaches wherever your venue is located, without relying on local contractors."
    },
    {
      q: "What makes Winera International different from other game zone suppliers?",
      a: "Before recommending any equipment, we prepare a free ROI Blueprint for your specific venue covering projected footfall, revenue potential, and break-even timeline. Very few game zone suppliers in India offer this as a standard part of their process."
    },
    {
      q: "Do you provide after-sales support after installation?",
      a: "Yes. Our technical team provides ongoing maintenance, spare parts, and on-site support for all equipment we install available directly through our own team, not through agents or third-party service providers."
    },
    {
      q: "Can game zone equipment be customised for my venue's theme?",
      a: "Yes. Every game zone solution we deliver is designed around your specific space, theme, budget, and target audience from layout planning to equipment selection and visual design."
    },
    {
      q: "How do I get started with my game zone project?",
      a: "Contact us via our website's contact form, WhatsApp, or call +91 94289 89488. We're also available on social media."
    },
    {
      q: "Can Winera International help me plan my game zone from scratch?",
      a: "Yes, Winera International offers complete game zone planning support. From space planning and equipment selection to installation and staff training, we manage the entire project. Our “Plan Your Game Zone” service is specially designed for first-time entrepreneurs and existing businesses looking to add an entertainment zone."
    }
  ];

  return (
    <div style={{ backgroundColor: '#F5F5F9', color: '#0f172a', minHeight: '100vh' }}>
      <Header headerData={header} />
      <main id="main-content">
        <section id="hero" className="winera-home-hero-section" style={{
          position: 'relative',
          width: '100%',
          minHeight: 'auto',
          aspectRatio: '1920 / 840',
          paddingTop: '65px',
          paddingBottom: '70px',
          background: `url(${heroBg}) center/100% 100% no-repeat`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#ffffff',
          overflow: 'hidden'
        }}>
          <img
            src={heroBg}
            alt=""
            fetchpriority="high"
            loading="eager"
            decoding="async"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 1,
              pointerEvents: 'none'
            }}
          />
          <div className="winera-hero-animate" style={{ width: '100%', maxWidth: '951px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
            {/* Badge */}
            <div className="winera-hero-badge" style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px 48px 2px 40px',
              width: '38%',
              minWidth: '220px',
              height: '40px',
              background: 'linear-gradient(90deg, rgba(0, 42, 95, 1) 0%, rgba(255, 212, 0, 1) 35%, rgba(8, 45, 86, 1) 100%)',
              color: 'rgba(255, 255, 255, 1)',
              fontFamily: "'Black Han Sans', sans-serif",
              fontWeight: 400,
              fontSize: '25px',
              lineHeight: '40px',
              letterSpacing: '0px',
              marginBottom: '18px',
              clipPath: 'polygon(0% 0%, calc(100% - 20px) 0%, 85% 50%, calc(100% - 22px) 100%, 0% 100%)'
            }}>
              India's Trusted
            </div>

            {/* Main Title */}
            <h1 className="winera-home-hero-h1">
              {(() => {
                const rawTitle = hero?.title || "Game Zone Equipment *Manufacturer* & Supplier";
                let l1 = "Game Zone Equipment";
                let l2Highlight = "Manufacturer";
                let l2Rest = " & Supplier";

                const str = String(rawTitle).trim();
                if (str.includes('*')) {
                  const parts = str.split('*');
                  l1 = parts[0].trim();
                  l2Highlight = parts[1] || "";
                  l2Rest = parts.slice(2).join('');
                } else if (str.toLowerCase().includes("manufacturer")) {
                  const lower = str.toLowerCase();
                  const idx = lower.indexOf("manufacturer");
                  l1 = str.substring(0, idx).trim() || "Game Zone Equipment";
                  const rest = str.substring(idx).trim();
                  const spaceIdx = rest.indexOf(' ');
                  if (spaceIdx !== -1) {
                    l2Highlight = rest.substring(0, spaceIdx);
                    l2Rest = ' ' + rest.substring(spaceIdx).trim();
                  } else {
                    l2Highlight = rest;
                    l2Rest = "";
                  }
                }

                return (
                  <>
                    <div className="winera-hero-line1">{l1}</div>
                    <div className="winera-hero-line2">
                      {l2Highlight ? <span className="winera-hero-highlight">{l2Highlight}</span> : null}
                      {l2Rest}
                    </div>
                  </>
                );
              })()}
            </h1>

            {/* Subtitle Paragraph (Image 3: Open Sans, Weight 400, Size 18px, Line height 28px, Color rgba(241, 241, 241, 1), Width 721px) */}
            <p style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: '16px',
              color: 'rgba(241, 241, 241, 1)',
              maxWidth: '721px',
              margin: '0 auto 32px',
              lineHeight: '28px',
              fontWeight: 400,
              letterSpacing: '0px',
              textAlign: 'center'
            }}>
              {hero?.subtitle || "India's ROI-First Game Zone Developer from bowling alleys and trampoline parks to arcade zones and VR gaming & complete indoor amusement park setup, installed by our own team across 50+ cities."}
            </p>

            {/* CTA Button (Image 4 & 5: Gap 35px, Width 346px, Height 74px, Font Open Sans 700 Bold, 20px, Color rgba(1, 21, 28, 1)) */}
            {(() => {
              const defaultBaseLink = hero?.ctaPrimaryLink || "https://wa.me/919428989488";
              const defaultMsg = hero?.waMessage || "Hello Winera International! I want to plan and setup a Game Zone for my space. Please share details and an ROI report. [Ref: Home Page]";

              let hrefLink = defaultBaseLink;
              if (!defaultBaseLink.includes('text=')) {
                const separator = defaultBaseLink.includes('?') ? '&' : '?';
                hrefLink = `${defaultBaseLink}${separator}text=${encodeURIComponent(defaultMsg)}`;
              }

              return (
                <div className="winera-hero-cta-wrapper">
                  <a href={hrefLink} target="_blank" rel="noreferrer" className="winera-hero-cta-btn">
                    <div className="winera-hero-cta-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
                        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.758.459 3.474 1.33 4.982l-1.412 5.16 5.281-1.385c1.455.794 3.1 1.213 4.787 1.214h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.668-1.037-5.176-2.923-7.061-1.886-1.885-4.394-2.922-7.066-2.922zm5.834 14.168c-.247.694-1.222 1.282-1.688 1.341-.466.06-1.047.098-1.696-.109-.4-.128-.918-.298-1.583-.585-2.822-1.222-4.664-4.084-4.806-4.273-.141-.188-1.144-1.523-1.144-2.905 0-1.381.724-2.062.981-2.343.257-.282.564-.352.752-.352.188 0 .376.002.54.01.174.008.411-.066.643.49.235.564.8 1.95.87 2.091.07.141.117.306.023.494-.094.188-.141.306-.282.47-.141.164-.298.367-.424.494-.141.141-.289.294-.125.576.164.282.729 1.202 1.564 1.946 1.074.956 1.98 1.253 2.262 1.394.282.141.447.117.611-.07.164-.188.705-.823.893-1.105.188-.282.376-.235.634-.141.258.094 1.644.775 1.926.916.282.141.47.211.54.329.07.117.07.681-.177 1.375z" />
                      </svg>
                    </div>
                    <span>{(hero?.ctaPrimaryText || "Plan Your Game Zone").replace(/\s*\(WhatsApp\)/gi, '')}</span>
                  </a>
                </div>
              );
            })()}
          </div>
        </section>

        <section style={{ padding: '70px 5vw 35px', background: '#F5F5F9', textAlign: 'center' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <SectionHeading marginBottom="12px" accentWidth="480px" accentMaxWidth="420px">
              {(() => {
                const rawTitle = siteData?.statsHeader?.title || "DISCOVER OUR *COMPANY STATS*";
                const parts = rawTitle.split(/\*{1,2}(.*?)\*{1,2}/g);
                return parts.map((part, index) => {
                  if (index % 2 === 1) {
                    return (
                      <span key={index} style={{ color: 'rgba(0, 174, 239, 1)' }}>
                        {part}
                      </span>
                    );
                  }
                  return part;
                });
              })()}
            </SectionHeading>

            <p style={{
              fontFamily: "'Geist', 'Open Sans', sans-serif",
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '28.8px',
              letterSpacing: '0px',
              color: 'rgba(0, 28, 38, 1)',
              maxWidth: '769px',
              margin: '0 auto 48px',
              textAlign: 'center'
            }}>
              {siteData?.statsHeader?.description || "Helping businesses build profitable, safe, and unforgettable entertainment destinations with precision and luxury in mind."}
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              alignItems: 'stretch'
            }}>
              {(Array.isArray(siteData?.stats) && siteData.stats.length > 0 ? siteData.stats : [
                { number: '14+', label: 'YEARS OF\nEXPERIENCE' },
                { number: '200+', label: 'Successful Project' },
                { number: '98%', label: 'Happy Clients' },
                { number: '50+', label: 'Cities Covered' }
              ]).map((stat, i) => {
                const labelText = (stat.label || stat.title || '').replace('YEARS OF EXPERIENCE', 'YEARS OF\nEXPERIENCE');
                return (
                  <div key={i} className={`winera-stats-card winera-reveal winera-reveal-delay-${(i % 4) + 1}`} style={{
                    background: 'linear-gradient(145deg, #cceeff 0%, #e8f5ff 45%, #ffffff 100%)',
                    padding: '24px 20px',
                    borderRadius: '18px',
                    border: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    textAlign: 'left'
                  }}>
                    <h3 style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: '46.72px',
                      lineHeight: '51.39px',
                      letterSpacing: '-1.4px',
                      color: 'rgba(0, 174, 239, 1)',
                      marginBottom: '4px',
                      textAlign: 'left'
                    }}>
                      <CountUpNumber targetText={stat.number || stat.val || ''} />
                    </h3>
                    <p style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: '13.35px',
                      lineHeight: '16.02px',
                      letterSpacing: '0.67px',
                      verticalAlign: 'middle',
                      color: 'rgba(0, 28, 38, 1)',
                      margin: 0,
                      whiteSpace: 'pre-line',
                      textAlign: 'left'
                    }}>
                      {labelText}
                    </p>
                  </div>
                );
              })}

              {/* 5th Card: Safety First */}
              <div className="winera-stats-card winera-reveal winera-reveal-delay-5" style={{
                background: 'linear-gradient(145deg, #cceeff 0%, #e8f5ff 45%, #ffffff 100%)',
                padding: '24px 20px',
                borderRadius: '18px',
                border: 'none',
                boxShadow: '0 12px 30px rgba(0, 168, 255, 0.07)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                textAlign: 'left'
              }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(0, 28, 38, 1)">
                    <path d="M12 2l2.4 1.8 3-0.6 0.8 2.9 3 1.1-0.8 2.9 1.8 2.4-2.4 1.8 0.6 3-2.9 0.8-1.1 3-2.9-0.8-2.4 1.8-1.8-2.4-3 0.6-0.8-2.9-3-1.1 0.8-2.9-1.8-2.4 2.4-1.8-0.6-3 2.9-0.8 1.1-3z" />
                    <path d="M9 12l2 2 4-4" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '15px',
                    fontWeight: 400,
                    color: 'rgba(0, 28, 38, 1)',
                    letterSpacing: '0.67px',
                    textTransform: 'uppercase'
                  }}>
                    <CountUpNumber targetText={siteData?.statsHeader?.safetyBadgeText !== undefined ? siteData.statsHeader.safetyBadgeText : "100% CERTIFIED"} />
                  </span>
                </div>
                <h4 style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '28px',
                  fontWeight: 400,
                  lineHeight: '32px',
                  color: 'rgba(0, 174, 239, 1)',
                  margin: '2px 0 6px',
                  textAlign: 'left'
                }}>
                  {siteData?.statsHeader?.safetyTitle !== undefined ? siteData.statsHeader.safetyTitle : "Safety First"}
                </h4>
                <p style={{
                  fontFamily: "'Open Sans', sans-serif",
                  color: 'rgba(0, 28, 38, 1)',
                  fontSize: '13.35px',
                  fontWeight: 400,
                  lineHeight: '16.02px',
                  letterSpacing: '0.67px',
                  margin: 0,
                  whiteSpace: 'pre-line',
                  textAlign: 'left'
                }}>
                  {siteData?.statsHeader?.safetySubtitle !== undefined ? siteData.statsHeader.safetySubtitle : "Industry Standard\nExcellence"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT WINERA INTERNATIONAL SECTION */}
        <section id="about" className="winera-reveal" style={{ padding: '70px 5vw 50px', background: '#F5F5F9', textAlign: 'center' }}>
          <div style={{ maxWidth: '1220px', margin: '0 auto' }}>
            <SectionHeading marginBottom="45px" accentWidth="320px" accentMaxWidth="320px">
              {(() => {
                const rawTitle = siteData?.aboutHome?.title || "*About* Winera International";
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

            <div className="winera-about-content-wrapper" style={{ display: 'grid', gridTemplateColumns: '1fr 520px', gap: '50px', alignItems: 'center', textAlign: 'left' }}>
              <div className="winera-reveal-left">
                <p style={{ color: '#373E41', fontFamily: "'Open Sans', sans-serif", fontSize: '16px', lineHeight: '28px', fontWeight: 400, textAlign: 'justify', marginBottom: '16px' }}>
                  {siteData?.aboutHome?.paragraph1 || "Winera International Pvt. Ltd. is a dynamic force in the gaming and indoor amusement industry, headquartered in Surat, India. Since our establishment in 2014, we have focused exclusively on delivering project-based gaming solutions to the B2B sector nationwide. Our unwavering commitment to excellence and tailored approach sets us apart. We're dedicated to understanding our client's unique needs and providing the most suitable gaming solutions for each project."}
                </p>

                <p style={{ color: '#373E41', fontFamily: "'Open Sans', sans-serif", fontSize: '16px', lineHeight: '28px', fontWeight: 400, textAlign: 'justify', marginBottom: '24px' }}>
                  {siteData?.aboutHome?.paragraph2 || "Our team calculates a complete ROI Blueprint for your space, covering projected footfall, revenue potential, and break-even timeline. At Winera International Pvt. Ltd, we've built a reputation for efficiency and reliability, making us the go-to choice for exceptional gaming experiences in the B2B sector."}
                </p>

                {/* Dynamic Checkmark Feature Bullets */}
                <div className="winera-about-bullets-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 20px', marginBottom: '32px' }}>
                  {(
                    Array.isArray(siteData?.aboutHome?.features) && siteData.aboutHome.features.length > 0
                      ? siteData.aboutHome.features.filter(f => f && f.trim() !== '')
                      : [
                        "Game Zone Setup",
                        "FEC Equipment & Setup",
                        "Bowling Alley Equipment",
                        "Arcade & Amusement Equipment",
                        "Kids Entertainment Solutions",
                        "VR Gaming Equipment",
                        "Concept to Installation"
                      ]
                  ).map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={homePageIcon} alt="check" style={{ width: '18px', height: '18px', objectFit: 'contain', flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '17px', fontWeight: '400', color: '#373E41' }}>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '8px' }}>
                  <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
                    {(() => {
                      const btnUrl = siteData?.aboutHome?.btnUrl || "/why-us";
                      const isExternal = btnUrl.startsWith('http') || btnUrl.startsWith('https') || btnUrl.startsWith('wa.me');
                      const text = siteData?.aboutHome?.btnText || "Talk to an ROI Expert";

                      if (isExternal) {
                        return (
                          <a
                            href={btnUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="winera-cyan-cta-btn winera-cyan-cta-btn-sm winera-about-roi-expert-btn"
                          >
                            <span>{text}</span>
                          </a>
                        );
                      }
                      return (
                        <Link
                          to={btnUrl}
                          className="winera-cyan-cta-btn winera-cyan-cta-btn-sm winera-about-roi-expert-btn"
                        >
                          <span>{text}</span>
                        </Link>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* Right Side Single Composite Collage Image */}
              <div className="winera-about-images-grid winera-reveal-right" style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={siteData?.aboutHome?.rightImgUrl || aboutCollage}
                  alt="About Winera International"
                  loading="eager"
                  decoding="async"
                  width={520}
                  height={480}
                  style={{
                    width: '100%',
                    maxWidth: '520px',
                    height: 'auto',
                    aspectRatio: '520 / 480',
                    display: 'block',
                    filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.12))'
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="winera-products-section winera-reveal" style={{
          position: 'relative',
          padding: '70px 4vw 85px',
          backgroundColor: '#F5F5F9',
          background: `#F5F5F9 url(${homePageBanner}) center/100% 100% no-repeat`,
          minHeight: '760px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}>
          <div style={{ maxWidth: '1240px', width: '100%', margin: '40px auto', textAlign: 'center' }}>
            <SectionHeading marginBottom="6px" accentWidth="500px" accentMaxWidth="340px">
              {(() => {
                const rawTitle = siteData?.productsHome?.title || "Take a look At *Our Best Products*";
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

            <p style={{ color: '#64748b', fontSize: '13px', fontWeight: '700', marginBottom: '40px' }}>
              {siteData?.productsHome?.subtitle || "Our Complete Game Zone Equipment & Setup Solutions"}
            </p>

            <div className="winera-products-container" style={{
              display: 'flex',
              gap: '12px',
              maxWidth: '1220px',
              margin: '0 auto',
              height: '460px',
              alignItems: 'stretch'
            }}>
              {(() => {
                const defaultProductsCards = [
                  { id: "arcade", title: "Arcade Game", desc: "Discover endless fun with our innovative indoor arcade games, merging excitement and fitness seamlessly.", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80", link: "/products/arcade-games" },
                  { id: "vr", title: "VR GAME", desc: "Immersive commercial VR gaming machines delivering thrilling virtual reality experiences.", img: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=800&q=80", link: "/products/vr-games" },
                  { id: "ar", title: "AR GAME", desc: "Interactive AR gaming solutions blending technology and entertainment — sports simulators and more.", img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80", link: "/products/ar-games" },
                  { id: "bowling", title: "Bowling Alley", desc: "The Brunswick bowling equipment with stable mechanical capacity popular across global entertainment hubs.", img: "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=800&q=80", link: "/products/bowling-alley" },
                  { id: "softplay", title: "Soft Play", desc: "Indoor playgrounds designed specifically for children aged 3-15 years of indoor game venues.", img: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=800&q=80", link: "/products/soft-play" },
                  { id: "trampoline", title: "Trampoline Park", desc: "Physical fitness and active fun combined in safe high-capacity commercial trampoline layouts.", img: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?auto=format&fit=crop&w=800&q=80", link: "/products/trampoline-park" },
                  { id: "hypergrid", title: "Hyper Grid", desc: "Interactive LED floor game where players compete across pressure-sensitive glowing tiles.", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", link: "/products/hypergrid" },
                  { id: "lasertag", title: "Laser Tag", desc: "High-adrenaline commercial laser tag arena setup delivering competitive team battles for malls & venues.", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80", link: "/products/laser-tag" },
                  { id: "amusement", title: "Amusement Park", desc: "Our amusement park rides are designed with high safety standards and exciting gameplay for all ages.", img: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&w=800&q=80", link: "/products/amusement-park" },
                  { id: "bumpercar", title: "Bumper Cars", desc: "Our bumper cars are an exhilarating blend of thrilling collisions and smooth handling.", img: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80", link: "/products/bumper-car" }
                ];

                const getCustomTitleStyle = (prod) => {
                  const idKey = (prod.id || '').toLowerCase().replace(/[^a-z]/g, '');
                  const titleKey = (prod.title || '').toLowerCase().replace(/[^a-z]/g, '');

                  if (idKey.includes('arcade') || titleKey.includes('arcade')) {
                    return { padding: '0 29px 175px 0', fontSize: '32px', letterSpacing: '2px' };
                  }
                  if (idKey.includes('bumper') || titleKey.includes('bumper')) {
                    return { padding: '0 29px 186px 0', fontSize: '31px', letterSpacing: '2px' };
                  }
                  if (idKey.includes('amusement') || titleKey.includes('amusement')) {
                    return { padding: '0 29px 135px 0', fontSize: '29px', letterSpacing: '1.8px' };
                  }
                  if (idKey.includes('trampoline') || titleKey.includes('trampoline')) {
                    return { padding: '0 29px 141px 0', fontSize: '29px', letterSpacing: '1.8px' };
                  }
                  if (idKey.includes('hyper') || titleKey.includes('hyper')) {
                    return { padding: '0 29px 219px 0', fontSize: '31px', letterSpacing: '2px' };
                  }
                  if (idKey.includes('laser') || titleKey.includes('laser')) {
                    return { padding: '0 29px 242px 0', fontSize: '31px', letterSpacing: '2px' };
                  }
                  if (idKey.includes('soft') || titleKey.includes('soft')) {
                    return { padding: '0 29px 252px 0', fontSize: '31px', letterSpacing: '2px' };
                  }
                  if (idKey.includes('bowling') || titleKey.includes('bowling')) {
                    return { padding: '0 29px 179px 0', fontSize: '31px', letterSpacing: '2px' };
                  }
                  if (idKey.includes('vr') || titleKey.includes('vr')) {
                    return { padding: '0 29px 243px 0', fontSize: '32px', letterSpacing: '2.5px' };
                  }
                  if (idKey === 'ar' || titleKey === 'argame' || titleKey === 'ar' || titleKey.startsWith('argame')) {
                    return { padding: '0 29px 240px 0', fontSize: '32px', letterSpacing: '2.5px' };
                  }

                  return { padding: '0 0 120px 0', fontSize: '30px', letterSpacing: '2px' };
                };

                const rawCards = (Array.isArray(siteData?.productsHome?.cardsList) && siteData.productsHome.cardsList.length > 0)
                  ? siteData.productsHome.cardsList
                  : defaultProductsCards;

                const cards = rawCards.filter(prod => {
                  const idKey = (prod.id || '').toLowerCase();
                  const titleKey = (prod.title || '').toLowerCase();
                  return !idKey.includes('decorative') && !titleKey.includes('decorative') && !titleKey.includes('light');
                });

                return cards.map((prod, idx) => {
                  const isExpanded = activeProductIndex === idx;
                  const targetLink = resolveProductLink(prod);
                  const cardStyle = getCustomTitleStyle(prod);

                  return (
                    <div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      aria-expanded={isExpanded}
                      aria-label={`View ${prod.title} equipment`}
                      onClick={() => {
                        if (isExpanded) {
                          navigate(targetLink);
                        } else {
                          setActiveProductIndex(idx);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          if (isExpanded) {
                            navigate(targetLink);
                          } else {
                            setActiveProductIndex(idx);
                          }
                        }
                      }}
                      onMouseEnter={() => setActiveProductIndex(idx)}
                      className={`winera-product-card ${isExpanded ? 'is-expanded' : ''}`}
                      style={{
                        flex: isExpanded ? '0 0 340px' : '1',
                        borderRadius: '18px',
                        overflow: 'hidden',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
                        boxShadow: isExpanded ? '0 16px 36px rgba(2, 132, 199, 0.22)' : '0 4px 12px rgba(0,0,0,0.06)',
                        background: '#0f172a'
                      }}
                    >
                      {/* Product Card Image with Native Lazy Loading */}
                      <img
                        src={getValidImageUrl(prod.img, '')}
                        alt={prod.title}
                        loading="lazy"
                        decoding="async"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          zIndex: 0
                        }}
                      />

                      {/* Gradient / Overlay */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: isExpanded
                          ? 'rgba(15, 23, 42, 0.2)'
                          : 'linear-gradient(180deg, rgba(30, 168, 243, 0.90) 0%, rgba(0, 137, 217, 0.95) 100%)',
                        zIndex: 1
                      }} />

                      {isExpanded ? (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          position: 'relative',
                          zIndex: 2
                        }}>
                          <div style={{ flex: 1, minHeight: '120px' }}></div>
                          <div
                            className="winera-expanded-info-box"
                            style={{
                              background: '#ffffff',
                              margin: '14px',
                              padding: '16px 20px',
                              borderRadius: '16px',
                              textAlign: 'left',
                              boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
                            }}
                          >
                            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0284c7', marginBottom: '6px' }}>{prod.title}</h3>
                            <p style={{ fontSize: '11.5px', color: '#475569', lineHeight: 1.5, marginBottom: '10px' }}>
                              {prod.desc}
                            </p>
                            <Link
                              to={targetLink}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              style={{
                                color: '#0284c7',
                                fontSize: '12px',
                                fontWeight: '800',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                textDecoration: 'none'
                              }}
                            >
                              <span>View More Info</span>
                              <ArrowRight style={{ width: '13px', height: '13px' }} />
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="winera-collapsed-title winera-collapsed-title-anim"
                          style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            writingMode: 'vertical-rl',
                            transform: 'rotate(180deg)',
                            padding: cardStyle.padding,
                            color: '#ffffff',
                            fontWeight: '500',
                            fontSize: cardStyle.fontSize,
                            letterSpacing: cardStyle.letterSpacing,
                            textShadow: 'none',
                            whiteSpace: 'nowrap',
                            zIndex: 2,
                            position: 'relative',
                            transition: 'all 0.4s ease'
                          }}
                        >
                          {prod.title}
                        </div>
                      )}
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </section>

        <section className="winera-partner-section winera-reveal" style={{
          position: 'relative',
          width: '100%',
          padding: '35px 5vw 140px',
          backgroundColor: 'rgb(245, 245, 249)',
          backgroundImage: `url(${partnerBg})`,
          backgroundPosition: 'center top',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'multiply',
          minHeight: '660px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div className="winera-partner-grid" style={{
            maxWidth: '1320px',
            width: '100%',
            margin: '0 auto',
            marginBottom: '60px',
            display: 'grid',
            gridTemplateColumns: '1fr 580px',
            gap: '50px',
            alignItems: 'flex-start'
          }}>
            <div className="winera-reveal-left" style={{ textAlign: 'left', paddingTop: '4px' }}>
              <SectionHeading align="left" marginBottom="16px" accentWidth="340px" accentMaxWidth="360px" accentHeight="7px">
                {(() => {
                  const rawTitle = siteData?.partnerHome?.title || "*Your Partner* in\nBuilding a Profitable\nGame Zone";
                  const parts = rawTitle.split(/\*{1,2}(.*?)\*{1,2}/g);
                  return parts.map((part, index) => {
                    if (index % 2 === 1) {
                      return (
                        <span key={index} style={{ color: '#00a8ff' }}>
                          {part}
                        </span>
                      );
                    }
                    return part.split('\n').map((line, lIdx) => (
                      <React.Fragment key={lIdx}>
                        {lIdx > 0 && <br />}
                        {line}
                      </React.Fragment>
                    ));
                  });
                })()}
              </SectionHeading>

              <p style={{ color: '#475569', fontSize: '13px', lineHeight: 1.6, maxWidth: '600px', marginTop: '18px', width: '80%'}}>
                {siteData?.partnerHome?.subtitle || "Discover how Winera International helps you plan, build, and launch a successful game zone from free ROI consultation to safety-certified equipment and complete installation support."}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
              {/* Box 1: Free ROI Consultancy */}
              <MotionCardFlip className="winera-partner-box-wrapper-yellow winera-reveal-right winera-reveal-delay-1">
                <div className="winera-partner-box-yellow">
                  <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                    {siteData?.partnerHome?.box1Title || "Free ROI Consultancy"}
                  </h4>
                  <p style={{ fontSize: '15px', color: '#475569', fontWeight: '500', lineHeight: 1.55, marginBottom: '0px' }}>
                    {siteData?.partnerHome?.box1Desc || "Before you invest a single rupee, our team consults with you on layout, equipment mix, and budget and hands you a complete ROI report covering projected revenue, footfall, and break-even timeline."}
                  </p>
                  <div style={{ textAlign: 'right', marginTop: '-15px', marginBottom: '-12px' }}>
                    <Link
                      to={siteData?.partnerHome?.box1Link || "/roi"}
                      title="Learn More about Free ROI Consultancy"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '160px',
                        height: '75px',
                        paddingTop: '5px',
                        background: `url(${exploreMore1}) center center / 100% 100% no-repeat`,
                        color: 'rgb(255, 255, 255)',
                        fontSize: '14px',
                        fontWeight: '700',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        transition: 'transform 0.25s ease'
                      }}
                    >
                      <span>Explore More</span>
                    </Link>
                  </div>
                </div>
              </MotionCardFlip>

              {/* Box 2: Safety-Certified Installation */}
              <MotionCardFlip className="winera-partner-box-wrapper-cyan winera-reveal-right winera-reveal-delay-2">
                <div className="winera-partner-box-cyan">
                  <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                    {siteData?.partnerHome?.box2Title || "Safety-Certified Installation"}
                  </h4>
                  <p style={{ fontSize: '15px', color: '#475569', fontWeight: '500', lineHeight: 1.55, marginBottom: '0px' }}>
                    {siteData?.partnerHome?.box2Desc || "Every product we install meets commercial safety standards tested for high-footfall environments, assembled by our own trained team, and handed over only after a full on-site safety inspection."}
                  </p>
                  <div style={{ textAlign: 'right', marginTop: '-15px', marginBottom: '-12px' }}>
                    <Link
                      to={siteData?.partnerHome?.box2Link || "/safety-standards"}
                      title="Learn More about Safety Standards"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '160px',
                        height: '75px',
                        paddingTop: '5px',
                        background: `url(${exploreMore2}) center center / 100% 100% no-repeat`,
                        color: 'rgb(9, 30, 43)',
                        fontSize: '14px',
                        fontWeight: '700',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        transition: 'transform 0.25s ease'
                      }}
                    >
                      <span>Explore More</span>
                    </Link>
                  </div>
                </div>
              </MotionCardFlip>
            </div>
          </div>
        </section>

        <section id="industries" className="winera-reveal" style={{
          padding: '70px 5vw 5px',
          background: '#F5F5F9',
          textAlign: 'center',
          position: 'relative',
          marginTop: '-110px',
          zIndex: 2
        }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <SectionHeading marginBottom="8px" accentWidth="470px" accentMaxWidth="320px">
              {(() => {
                const rawTitle = siteData?.industriesHeader?.title || "INDUSTRIES *WE SERVE*";
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

            <p className="winera-industries-subtitle" style={{ color: 'rgb(26, 30, 36)', fontSize: '15px', fontWeight: '500', marginBottom: '50px' }}>
              {siteData?.industriesHeader?.subtitle || "We deliver complete game zone setup solutions for businesses across India"}
            </p>

            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '1240px',
              margin: '0 auto',
              minHeight: '440px'
            }}>
              <button
                onClick={() => {
                  const total = (Array.isArray(siteData?.industriesHeader?.items) && siteData.industriesHeader.items.length > 0) ? siteData.industriesHeader.items.length : 10;
                  setActiveIndustryIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
                }}
                className="winera-industries-btn-left"
                aria-label="Previous Industry"
                style={{
                  position: 'absolute',
                  left: '0px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 50,
                  background: 'transparent',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: '8px',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
              >
                <img src={homeLeftArrow} alt="Previous" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </button>

              <div style={{
                position: 'relative',
                width: '100%',
                height: '440px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {(() => {
                  const defaultIndustries = [
                    { title: "Shopping Malls", img: indMall },
                    { title: "Hotels & Resorts", img: indResort },
                    { title: "Schools & Academies", img: indSchool },
                    { title: "Commercial Spaces", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80" },
                    { title: "Residential Projects", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80" },
                    { title: "Sports Centres", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80" },
                    { title: "Entertainment Hubs", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80" },
                    { title: "Airports & Terminals", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80" },
                    { title: "Hospitals & Clinics", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80" },
                    { title: "Food and Beverage", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80" }
                  ];

                  const items = (Array.isArray(siteData?.industriesHeader?.items) && siteData.industriesHeader.items.length > 0)
                    ? siteData.industriesHeader.items
                    : defaultIndustries;

                  return items.map((ind, idx, arr) => {
                    const total = arr.length;
                    let offset = (idx - activeIndustryIndex) % total;
                    if (offset > total / 2) offset -= total;
                    if (offset < -total / 2) offset += total;

                    // Show only the 5 closest cards: offsets -2, -1, 0, 1, 2
                    if (Math.abs(offset) > 2) return null;

                    const isCenter = offset === 0;
                    const translateXMap = { '-2': '-500px', '-1': '-265px', '0': '0px', '1': '265px', '2': '500px' };
                    const translateYMap = { '-2': '30px', '-1': '15px', '0': '0px', '1': '15px', '2': '30px' };
                    const scaleMap = { '-2': 0.76, '-1': 0.88, '0': 1.12, '1': 0.88, '2': 0.76 };
                    const opacityMap = { '-2': 0.6, '-1': 0.88, '0': 1, '1': 0.88, '2': 0.6 };
                    const zIndexMap = { '-2': 5, '-1': 15, '0': 30, '1': 15, '2': 5 };

                    return (
                      <div
                        key={idx}
                        role="button"
                        tabIndex={0}
                        aria-label={`Select industry ${ind.title}`}
                        onClick={() => setActiveIndustryIndex(idx)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setActiveIndustryIndex(idx);
                          }
                        }}
                        className={`winera-industry-card ${isCenter ? 'is-center-card' : 'is-side-card'}`}
                        style={{
                          position: 'absolute',
                          width: '260px',
                          height: '350px',
                          borderRadius: '16px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          transition: 'all 0.55s cubic-bezier(0.34, 1.25, 0.64, 1)',
                          opacity: opacityMap[offset],
                          zIndex: zIndexMap[offset],
                          transform: `translate3d(${translateXMap[offset]}, ${translateYMap[offset]}, 0) scale(${scaleMap[offset]})`,
                          boxShadow: isCenter ? '0 25px 50px rgba(0, 0, 0, 0.4)' : '0 12px 28px rgba(0,0,0,0.18)',
                          background: '#0f172a'
                        }}
                      >
                        <img
                          src={getValidImageUrl(ind.img, '')}
                          alt={ind.title}
                          loading="lazy"
                          decoding="async"
                          style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            zIndex: 0
                          }}
                        />
                        {isCenter && (
                          <div style={{
                            position: 'absolute',
                            bottom: '16px',
                            left: '14px',
                            right: '14px',
                            background: '#ffffff',
                            padding: '14px 16px',
                            borderRadius: '12px',
                            textAlign: 'left',
                            boxShadow: '0 12px 30px rgba(0,0,0,0.25)'
                          }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#00a8ff', marginBottom: '4px' }}>
                              {ind.title}
                            </h3>
                            <div style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '12px',
                              fontWeight: '700',
                              color: '#334155',
                              marginTop: '2px'
                            }}>
                              <span>Explore Experience</span>
                              <ArrowRight style={{ width: '13px', height: '13px', color: '#334155' }} />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  });
                })()}
              </div>

              <button
                onClick={() => {
                  const total = (Array.isArray(siteData?.industriesHeader?.items) && siteData.industriesHeader.items.length > 0) ? siteData.industriesHeader.items.length : 10;
                  setActiveIndustryIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
                }}
                className="winera-industries-btn-right"
                aria-label="Next Industry"
                style={{
                  position: 'absolute',
                  right: '0px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 50,
                  background: 'transparent',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: '8px',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
              >
                <img src={homeRightArrow} alt="Next" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </button>
            </div>
          </div>
        </section>

        <section id="process" className="winera-process-section" style={{ padding: '70px 4vw 75px', background: '#F5F5F9', textAlign: 'center' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <SectionHeading marginBottom="8px" accentWidth="440px" accentMaxWidth="440px">
              {(() => {
                const rawTitle = siteData?.processHome?.title || "*OUR WORKING* PROCESS";
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

            <p style={{ color: 'rgb(30, 35, 44)', fontSize: '14px', fontWeight: '700', marginBottom: '50px' }}>
              {siteData?.processHome?.subtitle || "How We Setup Your Game Zone"}
            </p>

            {/* Dynamic Working Process Cards */}
            <div className="winera-process-cards-container" style={{ display: 'flex', flexDirection: 'column', gap: '80px', maxWidth: '1220px', margin: '0 auto', paddingTop: '12px' }}>
              {(() => {
                const defaultCards = [
                  {
                    num: "01",
                    title: "Free Consultation",
                    points: [
                      "Share your project idea and business goal",
                      "Tell us your space size and budget",
                      "We suggest the best game zone setup for you"
                    ]
                  },
                  {
                    num: "02",
                    title: "Planning & Selection",
                    points: [
                      "We design a complete game zone layout for your space",
                      "Best equipment and activities selected as per your budget",
                      "Detailed project timeline and execution plan prepared"
                    ]
                  },
                  {
                    num: "03",
                    title: "Production & Procurement",
                    points: [
                      "Order confirmed with transparent pricing",
                      "Production process begins and Equipment sourcing",
                      "Quality checks done at every stage"
                    ]
                  },
                  {
                    num: "04",
                    title: "Project Installation",
                    points: [
                      "Complete equipment assembly at your site",
                      "Product installation and setup",
                      "Full equipment inspection after installation"
                    ]
                  },
                  {
                    num: "05",
                    title: "Forever Support",
                    points: [
                      "Technical support whenever you need assistance",
                      "Spare parts and maintenance support available",
                      "Expert guidance to keep operations running smoothly"
                    ]
                  }
                ];
                const cardList = (Array.isArray(siteData?.processHome?.cards) && siteData.processHome.cards.length > 0)
                  ? siteData.processHome.cards.filter(item => item && typeof item === 'object')
                  : defaultCards;

                const iconsList = [
                  <UserCheck style={{ width: '26px', height: '26px', color: '#00a8ff' }} />,
                  <LayoutGrid style={{ width: '26px', height: '26px', color: '#d97706' }} />,
                  <ShoppingBag style={{ width: '26px', height: '26px', color: '#00a8ff' }} />,
                  <Palette style={{ width: '26px', height: '26px', color: '#d97706' }} />,
                  <Wrench style={{ width: '26px', height: '26px', color: '#00a8ff' }} />,
                  <UserCheck style={{ width: '26px', height: '26px', color: '#d97706' }} />
                ];

                const renderCard = (step, idx, actualIndex) => {
                  const isYellow = actualIndex % 2 === 1;
                  const dirClass = actualIndex % 2 === 0 ? 'winera-reveal-left' : 'winera-reveal-right';
                  let wrapperClass = isYellow
                    ? `winera-process-card-wrapper-yellow ${dirClass} winera-reveal-delay-${(actualIndex % 3) + 1}`
                    : `winera-process-card-wrapper-cyan ${dirClass} winera-reveal-delay-${(actualIndex % 3) + 1}`;

                  if (actualIndex === 3) {
                    wrapperClass = `winera-process-card-wrapper-yellow-left ${dirClass} winera-reveal-delay-${(actualIndex % 3) + 1}`;
                  } else if (actualIndex === 4) {
                    wrapperClass = `winera-process-card-wrapper-cyan-right ${dirClass} winera-reveal-delay-${(actualIndex % 3) + 1}`;
                  }
                  const iconBg = isYellow ? '#fef9c3' : '#e0f2fe';
                  const iconComponent = iconsList[actualIndex % iconsList.length];
                  const rawNum = step?.num || `${actualIndex + 1}`;
                  const formattedNum = rawNum.length === 1 ? `0${rawNum}` : rawNum;

                  return (
                    <MotionCardFlip key={idx} className={wrapperClass}>
                      <div className="winera-process-inner-card">
                        {/* Very Large, Bold, Visually Dominant Step Number */}
                        <div
                          className="winera-process-step-num"
                          style={{
                            position: 'absolute',
                            top: '-15px',
                            right: '25px',
                            width: '165px',
                            height: '140px',
                            fontSize: '140px',
                            fontWeight: '800',
                            fontFamily: "'Open Sans', sans-serif",
                            lineHeight: '140px',
                            letterSpacing: '0px',
                            color: 'rgba(0, 0, 0, 0.05)',
                            pointerEvents: 'none',
                            userSelect: 'none'
                          }}>
                          {formattedNum}
                        </div>

                        {/* Icon Badge Container */}
                        <div style={{
                          width: '54px',
                          height: '54px',
                          borderRadius: '16px',
                          background: iconBg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '40px',
                          flexShrink: 0,
                          boxShadow: isYellow ? '0 6px 18px rgba(234, 179, 8, 0.18)' : '0 6px 18px rgba(56, 189, 248, 0.18)'
                        }}>
                          {iconComponent}
                        </div>

                        {/* Card Title */}
                        <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0f172a', margin: '0 0 16px 0', lineHeight: 1.3 }}>
                          {step?.title || ''}
                        </h3>

                        {/* Bullet Points */}
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {(() => {
                            const validPts = (Array.isArray(step?.points) ? step.points : []).filter(p => p && p.trim() !== '');
                            return validPts.map((pt, pIdx) => {
                              const isLastInCard45 = actualIndex >= 3 && pIdx === validPts.length - 1;
                              return (
                                <li key={pIdx} style={{
                                  fontSize: '12px',
                                  color: '#475569',
                                  fontWeight: '500',
                                  lineHeight: 1.6,
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: '8px',
                                  paddingBottom: isLastInCard45 ? '14px' : '0px'
                                }}>
                                  <span style={{ color: isYellow ? '#eab308' : '#00a8ff', fontSize: '12px', fontWeight: '900', marginTop: '-1px' }}>•</span>
                                  <span>{pt}</span>
                                </li>
                              );
                            });
                          })()}
                        </ul>
                      </div>
                    </MotionCardFlip>
                  );
                };

                const totalCards = cardList.length;

                if (totalCards % 3 === 0) {
                  return (
                    <div className="winera-process-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', width: '100%' }}>
                      {cardList.map((step, idx) => renderCard(step, idx, idx))}
                    </div>
                  );
                }

                const topRowCards = cardList.slice(0, 3);
                const bottomRowCards = cardList.slice(3);

                return (
                  <>
                    <div className="winera-process-row" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(topRowCards.length, 3)}, 1fr)`, gap: '40px' }}>
                      {topRowCards.map((step, idx) => renderCard(step, idx, idx))}
                    </div>

                    {bottomRowCards.length > 0 && (
                      <div className="winera-process-row" style={{ display: 'grid', gridTemplateColumns: `repeat(${bottomRowCards.length}, 1fr)`, gap: '40px', maxWidth: bottomRowCards.length === 2 ? '820px' : '1220px', margin: '0 auto', width: '100%' }}>
                        {bottomRowCards.map((step, idx) => renderCard(step, idx, idx + topRowCards.length))}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </section>

        <ClientsMarqueeSection
          clientLogos={siteData?.clientLogos}
          title={siteData?.clientsHeader?.title}
          subtitle={siteData?.clientsHeader?.subtitle}
        />

        <ProjectsMarqueeSection
          showTopHeader={true}
          projects={siteData?.builtProjects}
          title={siteData?.builtProjectsHeader?.title}
          subtext={siteData?.builtProjectsHeader?.subtext}
        />

        <section id="partners" className="winera-channel-partners-section" style={{ padding: '70px 5vw 0px', background: '#f5F5F9' }}>
          <div className="winera-channel-partners-grid" style={{
            maxWidth: '1240px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '360px 1fr',
            gap: '50px',
            alignItems: 'center'
          }}>
            <div style={{ textAlign: 'left' }}>
              <SectionHeading align="left" marginBottom="8px" accentWidth="80%" accentMaxWidth="320px">
                {(() => {
                  const rawTitle = siteData?.channelPartnersHeader?.title || "*Our Channel* partners";
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
            </div>

            <div className="winera-channel-partners-content">
              {/* Desktop Static Grid */}
              <div className="winera-desktop-partners-grid">
                {(siteData?.channelPartners && siteData.channelPartners.length > 0) ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '16px' }}>
                    {siteData.channelPartners.map((partner, idx) => (
                      <div key={idx} style={{
                        background: '#F5F5F9',
                        height: '56px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                        border: '1px solid #e2e8f0',
                        padding: '8px 16px'
                      }}>
                        {partner.logoUrl ? (
                          <img src={partner.logoUrl} alt={partner.name} style={{ maxHeight: '36px', maxWidth: '100%', objectFit: 'contain' }} />
                        ) : (
                          <span style={{ fontWeight: '800', color: '#0f172a', fontSize: '14px' }}>{partner.name}</span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
                    <div style={{ background: '#F5F5F9', height: '54px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '16px', color: '#0f172a', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>NETFLIX</div>
                    <div style={{ background: '#F5F5F9', height: '54px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '16px', color: '#0f172a', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>DISNEY</div>
                    <div style={{ background: '#F5F5F9', height: '54px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '16px', color: '#0f172a', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>SONY</div>
                    <div style={{ background: '#F5F5F9', height: '54px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '16px', color: '#0f172a', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>WARNER</div>
                  </div>
                )}
              </div>

              {/* Mobile Infinite Scrolling Marquee Track */}
              <div className="winera-mobile-partners-marquee" style={{ display: 'none', width: '100vw', overflow: 'hidden', margin: '16px 0 0', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}>
                <div className="marquee-track">
                  {[...Array(4)].map((_, setIdx) => (
                    <div key={setIdx} style={{ display: 'flex', alignItems: 'center', gap: '45px', paddingRight: '45px' }}>
                      {(siteData?.channelPartners && siteData.channelPartners.length > 0) ? (
                        siteData.channelPartners.map((partner, idx) => (
                          <div key={idx} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '60px' }}>
                            {partner.logoUrl ? (
                              <img src={partner.logoUrl} alt={partner.name} style={{ maxHeight: '50px', maxWidth: '160px', objectFit: 'contain' }} />
                            ) : (
                              <span style={{ fontSize: '1.6rem', fontWeight: '900', color: '#0f172a', whiteSpace: 'nowrap' }}>{partner.name}</span>
                            )}
                          </div>
                        ))
                      ) : (
                        [
                          { text: "NETFLIX" },
                          { text: "DISNEY" },
                          { text: "SONY" },
                          { text: "WARNER" }
                        ].map((item, idx) => (
                          <div key={idx} style={{ fontSize: '1.6rem', fontWeight: '900', color: '#0f172a', whiteSpace: 'nowrap' }}>
                            {item.text}
                          </div>
                        ))
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="why-us" className="winera-why-us-section" style={{
          position: 'relative',
          width: '100%',
          padding: '80px 4vw 110px',
          background: `url(${whyChooseBg}) center/100% 100% no-repeat`,
          minHeight: '520px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '1180px', width: '100%', margin: '0 auto' }}>
            <SectionHeading marginBottom="8px" accentColor="#00a8ff">
              {(() => {
                const rawTitle = siteData?.whyChooseUs?.title || "*WHY* CHOOSE US";
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

            <p style={{ color: '#334155', fontSize: '13px', fontWeight: '600', marginBottom: '45px' }}>
              {siteData?.whyChooseUs?.subtitle || "We deliver complete game zone setup solutions for businesses across India"}
            </p>

            <div className="winera-why-us-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '18px 45px',
              textAlign: 'left'
            }}>
              {(
                Array.isArray(siteData?.whyChooseUs?.items) && siteData.whyChooseUs.items.length > 0
                  ? siteData.whyChooseUs.items
                  : [
                    { title: "ROI-Focused, From Day One", desc: "We consult on ROI first every client receives a complete report covering footfall, revenue, and payback period before we plan or select equipment." },
                    { title: "Industry Expertise", desc: "Our team recommends the right entertainment attractions based on your space, budget, and business goals." },
                    { title: "Premium Quality Equipment", desc: "We supply high-grade amusement equipment designed for reliable performance and durability." },
                    { title: "Customized Planning", desc: "Our team recommends the right entertainment attractions based on your space, budget, and business goals." },
                    { title: "Complete Turnkey Solutions", desc: "We provide end-to-end support from project planning and equipment selection to installation and execution" },
                    { title: "Pan-India Execution", desc: "We support projects across India with professional installation, project management, and execution services." }
                  ]
              ).map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <img
                    src={homeRightSign}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    width={42}
                    height={42}
                    style={{
                      width: '42px',
                      height: '42px',
                      flexShrink: 0,
                      objectFit: 'contain',
                      marginTop: '2px'
                    }}
                  />
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#0f172a', marginBottom: '0px' }}>
                      {item.title}
                    </h4>
                    <p className="winera-why-us-desc" style={{ fontSize: '14px', color: '#334155', fontWeight: '500', lineHeight: 1.4, margin: 0, width: '70%' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <TestimonialsSection
          testimonials={siteData?.testimonials}
          title={siteData?.testimonialsHeader?.title}
          subtitle={siteData?.testimonialsHeader?.subtitle}
        />

        <FaqSection
          faqList={(Array.isArray(siteData?.faqs) && siteData.faqs.length >= 9) ? siteData.faqs : defaultHomeFaqs}
          title={siteData?.faqsHeader?.title}
          subtitle={siteData?.faqsHeader?.subtitle}
        />

        {/* 15. READY TO GET STARTED CTA BANNER SECTION */}
        <CtaBanner
          align="center"
          buttonTheme="yellow_white"
          gradientTagline={true}
          gradientTitle={false}
          bgUrl={siteData?.ctaBanner?.bgUrl !== undefined ? siteData.ctaBanner.bgUrl : null}
          bg={homeBlockBg}
          leftImgUrl={siteData?.ctaBanner?.leftImgUrl !== undefined ? siteData.ctaBanner.leftImgUrl : null}
          leftImg={homeBlock1}
          rightImgUrl={siteData?.ctaBanner?.rightImgUrl !== undefined ? siteData.ctaBanner.rightImgUrl : null}
          rightImg={homeBlock2}
          tagline={siteData?.ctaBanner?.tagline !== undefined ? siteData.ctaBanner.tagline : "READY TO GET STARTED?"}
          title={siteData?.ctaBanner?.title || "Start Your Game Zone Journey"}
          subtitle={siteData?.ctaBanner?.subtitle || "Game Zones Are India's Fastest Growing Business Are You In?"}
          description={siteData?.ctaBanner?.description || "Get expert guidance, custom layout design and complete installation support from India's trusted game zone setup company"}
          buttonText={siteData?.ctaBanner?.buttonText || "Talk to an Expert"}
          buttonLink={siteData?.ctaBanner?.buttonLink || "https://wa.me/919428989488"}
        />
      </main>

      {/* 16. FOOTER SECTION */}
      <Footer footerData={footer} />
    </div>
  );
}
