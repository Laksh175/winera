import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeading from '../components/SectionHeading';
import CtaBanner from '../components/CtaBanner';
import aboutHeroBg from '../assets/about-hero-bg.png';
import about1 from '../assets/about-1.png';
import about3 from '../assets/about-3.png';
import about4 from '../assets/about-4.png';
import whyChooseTopBg from '../assets/why-choose-top-bg.png';
import whyChooseBottomBg from '../assets/why-choose-bottom-bg.png';
import wineraWBadge from '../assets/winera-w-badge.png';
import founderUnnit from '../assets/founder-unnit.png';
import aboutLounge from '../assets/about-lounge.png';
import { Shield, Users, Target, Eye, TrendingUp, Maximize2, Clock, RefreshCw, Award, Headset, Settings } from 'lucide-react';

export default function AboutUs({ siteData }) {
  if (!siteData) return <div style={{ minHeight: '100vh', background: '#06132d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

  const { header, footer } = siteData;

  return (
    <div style={{ backgroundColor: '#F5F5F9', color: '#0f172a', minHeight: '100vh' }}>
      {/* 1. HEADER NAVBAR */}
      <Header headerData={header} />

      {/* 2. ABOUT US HERO BANNER */}
      <section className="winera-about-hero-section" style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1920 / 640',
        paddingTop: '160px',
        paddingBottom: '80px',
        background: `url(${aboutHeroBg}) center/100% 100% no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          <h1 style={{
            fontSize: '3.8rem',
            fontWeight: '900',
            letterSpacing: '-1px',
            marginBottom: '10px',
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
          <p style={{
            fontSize: '14px',
            fontWeight: '700',
            color: '#ffffff',
            opacity: 0.9,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <a href="/" style={{ color: '#ffffff', textDecoration: 'none' }}>Home</a>
            <span style={{ color: '#ffcd00' }}>&gt;</span>
            <span style={{ color: '#ffffff' }}>{siteData?.aboutHero?.breadcrumbText || "About Us"}</span>
          </p>
        </div>
      </section>

      {/* 3. WELCOME TO WINERA INTERNATIONAL SECTION */}
      <section id="welcome" style={{ padding: '90px 4vw 100px', background: '#f5f5f9' }}>
        <div className="winera-about-welcome-grid" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.05fr',
          gap: '60px',
          alignItems: 'center'
        }}>
          <div className="winera-about-welcome-collage" style={{ position: 'relative', width: '100%', height: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              position: 'relative',
              width: '82%',
              height: '360px',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 20px 45px rgba(0,0,0,0.15)',
              background: `url(${siteData?.aboutWelcome?.mainImgUrl || aboutLounge}) center/cover no-repeat`
            }}></div>
            <div className="winera-about-collage-sub-1" style={{
              position: 'absolute',
              top: '10px',
              right: '25px',
              width: '180px',
              height: '145px',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
              border: '4px solid #ffffff',
              background: `url(${siteData?.aboutWelcome?.topRightImgUrl || about1}) center/cover no-repeat`,
              zIndex: 10
            }}></div>
            <div className="winera-about-collage-sub-2" style={{
              position: 'absolute',
              top: '160px',
              right: '-10px',
              width: '200px',
              height: '150px',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
              border: '4px solid #ffffff',
              background: `url(${siteData?.aboutWelcome?.midRightImgUrl || about4}) center/cover no-repeat`,
              zIndex: 15
            }}></div>
            <div className="winera-about-collage-sub-3" style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              width: '210px',
              height: '165px',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
              border: '4px solid #ffffff',
              background: `url(${siteData?.aboutWelcome?.bottomLeftImgUrl || about3}) center/cover no-repeat`,
              zIndex: 20
            }}></div>
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

            <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.65, fontWeight: '500', marginBottom: '30px', maxWidth: '540px' }}>
              {siteData?.aboutWelcome?.desc || "Winera International Pvt. Ltd. is a Surat-based B2B leader in indoor amusement and playground solutions. Since 2014, we have been transforming commercial spaces into world-class entertainment destinations, handling everything from design and manufacturing to installation and after-sales support."}
            </p>

            <div className="winera-about-welcome-box-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
              <div style={{ position: 'relative', background: '#F5F5F9', borderRadius: '20px', padding: '24px 20px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', borderLeft: '4px solid #00a8ff' }}>
                <div style={{ color: '#00a8ff', marginBottom: '10px' }}><Shield style={{ width: '24px', height: '24px', fill: '#00a8ff', color: '#00a8ff' }} /></div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#1e3a8a', marginBottom: '6px' }}>{siteData?.aboutWelcome?.box1Title || "Quality Assurance"}</h4>
                <p style={{ fontSize: '10.5px', color: '#64748b', fontWeight: '500', lineHeight: 1.45 }}>{siteData?.aboutWelcome?.box1Desc || "At Winera International, Quality Is Key. Our Lanes, Trampolines, Soft Play, And Arcade Games Are Built To Last And Ensure Safety. We Don't Just Build Equipment; We Build Experiences You Can Trust."}</p>
              </div>
              <div style={{ position: 'relative', background: '#F5F5F9', borderRadius: '20px', padding: '24px 20px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', borderLeft: '4px solid #00a8ff' }}>
                <div style={{ color: '#00a8ff', marginBottom: '10px' }}><Users style={{ width: '24px', height: '24px', color: '#00a8ff' }} /></div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#1e3a8a', marginBottom: '6px' }}>{siteData?.aboutWelcome?.box2Title || "Your Success, Our Commitment"}</h4>
                <p style={{ fontSize: '10.5px', color: '#64748b', fontWeight: '500', lineHeight: 1.45 }}>{siteData?.aboutWelcome?.box2Desc || "At Winera International, We Prioritize Your Satisfaction. From Product Exploration To Final Installation And Beyond, Our Dedicated Team Walks With You At Every Step."}</p>
              </div>
            </div>

            <a href={siteData?.aboutWelcome?.btnLink || "https://wa.me/919428989488"} target="_blank" rel="noreferrer" style={{ background: '#00a8ff', color: '#ffffff', fontSize: '13px', fontWeight: '800', padding: '12px 36px', borderRadius: '25px', border: '2px solid #ffcd00', boxShadow: '0 8px 22px rgba(0, 168, 255, 0.3)', display: 'inline-block', textDecoration: 'none' }}>
              {siteData?.aboutWelcome?.btnText || "Contact Us Now"}
            </a>
          </div>
        </div>
      </section>

      {/* 4. STATS & OUR PURPOSE & PROMISE SECTION */}
      <section style={{ padding: '0 0 100px', background: '#F5F5F9', textAlign: 'center' }}>
        <div style={{ background: 'linear-gradient(180deg, #e0f2fe 0%, #ffffff 100%)', padding: '40px 4vw 50px', marginBottom: '50px' }}>
          <div className="winera-about-stats-grid" style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {(() => {
              const defaultStats = [
                { number: "14+", label: "YEARS OF EXPERIENCE" },
                { number: "200+", label: "Project Completed" },
                { number: "98%", label: "Happy Clients" },
                { number: "50+", label: "Cities Covered" }
              ];

              const dbStats = Array.isArray(siteData?.aboutStats?.items)
                ? siteData.aboutStats.items
                : (Array.isArray(siteData?.stats) ? siteData.stats : []);

              const stats = defaultStats.map((def, idx) => {
                const item = dbStats[idx] || {};
                return {
                  number: item.num || item.number || def.number,
                  label: item.title || item.label || def.label
                };
              });

              return stats.map((stat, idx) => (
                <div key={idx} style={{ background: '#F5F5F9', borderRadius: '16px', padding: '24px 20px', boxShadow: '0 12px 35px rgba(0, 168, 255, 0.12)', borderTop: '3px solid #38bdf8', textAlign: 'left' }}>
                  <h3 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#0284c7', lineHeight: 1, marginBottom: '6px' }}>{stat.number}</h3>
                  <p style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</p>
                </div>
              ));
            })()}
          </div>
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 4vw' }}>
          <SectionHeading marginBottom="60px" accentWidth="60%" accentMaxWidth="400px">
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
            <div className="winera-about-purpose-divider" style={{ position: 'absolute', left: '50%', top: '0', bottom: '0', width: '1.5px', background: '#38bdf8', transform: 'translateX(-50%)', zIndex: 1 }}></div>

            <div style={{ position: 'relative', textAlign: 'left' }}>
              <div style={{ display: 'inline-block', background: '#00a8ff', color: '#ffffff', fontSize: '13px', fontWeight: '800', padding: '6px 28px', borderRadius: '8px 8px 0 0', marginLeft: '60px' }}>{siteData?.aboutMissionVision?.missionLabel || "Mission"}</div>
              <div style={{ position: 'relative', background: 'linear-gradient(135deg, #7dd3fc 0%, #38bdf8 100%)', borderRadius: '24px', padding: '36px 32px', boxShadow: '0 20px 45px rgba(56, 189, 248, 0.25)', color: '#0f172a', zIndex: 5 }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}><Target style={{ width: '22px', height: '22px', color: '#0369a1' }} /></div>
                <p style={{ fontSize: '1.05rem', fontWeight: '600', color: '#0f172a', lineHeight: 1.6 }}>{siteData?.aboutMissionVision?.missionText || "To be India's most trusted partner in building world-class indoor entertainment destinations where every space we touch becomes a thriving hub of joy, play, and business success."}</p>
              </div>
              <div style={{ position: 'absolute', top: '20px', left: '160px', width: '75%', height: '100%', border: '1.5px solid #7dd3fc', borderRadius: '24px', pointerEvents: 'none', zIndex: 2 }} className="winera-about-purpose-frame"></div>
            </div>

            <div style={{ position: 'relative', textAlign: 'left' }}>
              <div style={{ display: 'inline-block', background: '#ffcd00', color: '#0f172a', fontSize: '13px', fontWeight: '800', padding: '6px 28px', borderRadius: '8px 8px 0 0', marginLeft: '60px' }}>{siteData?.aboutMissionVision?.visionLabel || "Vision"}</div>
              <div style={{ position: 'relative', background: 'linear-gradient(135deg, #fef08a 0%, #fde047 100%)', borderRadius: '24px', padding: '36px 32px', boxShadow: '0 20px 45px rgba(250, 204, 21, 0.25)', color: '#0f172a', zIndex: 5 }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}><Eye style={{ width: '22px', height: '22px', color: '#854d0e' }} /></div>
                <p style={{ fontSize: '1.05rem', fontWeight: '600', color: '#0f172a', lineHeight: 1.6 }}>{siteData?.aboutMissionVision?.visionText || "To be India's most trusted partner in building world-class indoor entertainment destinations where every space we touch becomes a thriving hub of joy, play, and business success."}</p>
              </div>
              <div style={{ position: 'absolute', top: '20px', right: '160px', width: '75%', height: '100%', border: '1.5px solid #fde047', borderRadius: '24px', pointerEvents: 'none', zIndex: 2 }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US MINDMAP & 3-CARD SECTION */}
      <section id="why-choose-us-detail" className="winera-about-mindmap-section" style={{ position: 'relative', width: '100%', padding: '0 0 100px', background: '#F5F5F9', textAlign: 'center' }}>
        <div style={{ position: 'relative', width: '100%', background: `url(${whyChooseTopBg}) center top / 100% 100% no-repeat`, padding: '80px 4vw 160px', minHeight: '620px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SectionHeading marginBottom="60px" accentWidth="60%" accentMaxWidth="400px" style={{ zIndex: 10 }}>
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

          <div className="winera-about-mindmap-container" style={{ position: 'relative', width: '100%', maxWidth: '1080px', height: '320px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg className="winera-about-mindmap-svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
              <line x1="330" y1="50" x2="540" y2="160" stroke="#00a8ff" strokeWidth="1.5" opacity="0.6" />
              <line x1="340" y1="160" x2="540" y2="160" stroke="#00a8ff" strokeWidth="1.5" opacity="0.6" />
              <line x1="360" y1="270" x2="540" y2="160" stroke="#00a8ff" strokeWidth="1.5" opacity="0.6" />
              <line x1="750" y1="50" x2="540" y2="160" stroke="#d97706" strokeWidth="1.5" opacity="0.6" />
              <line x1="740" y1="160" x2="540" y2="160" stroke="#d97706" strokeWidth="1.5" opacity="0.6" />
              <line x1="760" y1="270" x2="540" y2="160" stroke="#d97706" strokeWidth="1.5" opacity="0.6" />
            </svg>
            <div className="winera-about-mindmap-badge" style={{ position: 'relative', zIndex: 10, width: '130px', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'drop-shadow(0 15px 30px rgba(0, 168, 255, 0.4))' }}>
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

              const leftItems = [ { icon: TrendingUp, text: pills[0] }, { icon: Maximize2, text: pills[1] }, { icon: Headset, text: pills[2] } ];
              const rightItems = [ { icon: Clock, text: pills[3] }, { icon: RefreshCw, text: pills[4] }, { icon: Award, text: pills[5] } ];

              return (
                <>
                  <div className="winera-about-mindmap-left" style={{ position: 'absolute', left: '40px', top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 5 }}>
                    {leftItems.map((item, idx) => (
                      <div key={idx} style={{ background: '#F5F5F9', borderRadius: '30px', padding: '10px 24px 10px 14px', boxShadow: '0 10px 25px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><item.icon style={{ width: '16px', height: '16px', color: '#0284c7' }} /></div>
                        <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#0f172a' }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="winera-about-mindmap-right" style={{ position: 'absolute', right: '40px', top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 5 }}>
                    {rightItems.map((item, idx) => (
                      <div key={idx} style={{ background: '#F5F5F9', borderRadius: '30px', padding: '10px 24px 10px 14px', boxShadow: '0 10px 25px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><item.icon style={{ width: '16px', height: '16px', color: '#d97706' }} /></div>
                        <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#0f172a' }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
        <div className="winera-about-whyus-bottom-bg" style={{ position: 'relative', width: '100%', background: `url(${whyChooseBottomBg}) center top / 100% 100% no-repeat`, padding: '110px 4vw 100px', marginTop: '-155px', zIndex: 2 }}>
          <div className="winera-about-whyus-cards-grid" style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', textAlign: 'left' }}>
            {(() => {
              const defaultCards = [
                { title: "Sales", desc: "From the moment you choose Winera International, our dedicated sales team works closely with you to discuss your game zone needs in detail.", icon: Headset, bg: '#00a8ff', color: '#ffffff' },
                { title: "Service", desc: "Our professional installation team takes complete ownership of your project. We ensure smooth assembly, safety compliance, and zero compromise on quality.", icon: Settings, bg: '#7dd3fc', color: '#0284c7' },
                { title: "Satisfaction", desc: "Our team manages everything from delivery to live handover. Every game zone we install is set up with precision and care.", icon: Award, bg: '#ffcd00', color: '#0f172a' }
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
                  <div key={idx} style={{ background: '#F5F5F9', borderRadius: '24px', padding: '36px 30px', boxShadow: '0 15px 40px rgba(0, 168, 255, 0.08)', border: '1px solid #f1f5f9' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: styleObj.bg, color: styleObj.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}><IconComponent style={{ width: '20px', height: '20px' }} /></div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0f172a', marginBottom: '12px' }}>{c.title}</h3>
                    <p style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', lineHeight: 1.6 }}>{c.desc}</p>
                  </div>
                );
              });
            })()}
          </div>

          {/* CTA Buttons: Get Started & View Our Products */}
          <div style={{ textAlign: 'center', marginTop: '55px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href={siteData?.aboutWhyUsDetail?.ctaPrimaryLink || "https://wa.me/919428989488"}
              target="_blank"
              rel="noreferrer"
              style={{
                background: 'linear-gradient(90deg, #00a8ff 0%, #0284c7 100%)',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '900',
                padding: '14px 38px',
                borderRadius: '16px',
                border: '2.5px solid #ffcd00',
                boxShadow: '0 8px 25px rgba(0, 168, 255, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                transition: 'all 0.25s ease'
              }}
            >
              {siteData?.aboutWhyUsDetail?.ctaPrimaryText || "Get Started"}
            </a>

            <a
              href={siteData?.aboutWhyUsDetail?.ctaSecondaryLink || "/arcade-game"}
              style={{
                background: '#ffffff',
                color: '#0f172a',
                fontSize: '14px',
                fontWeight: '900',
                padding: '14px 38px',
                borderRadius: '16px',
                border: '2px solid #00a8ff',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.05)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                transition: 'all 0.25s ease'
              }}
            >
              {siteData?.aboutWhyUsDetail?.ctaSecondaryText || "View Our Products"}
            </a>
          </div>
        </div>
      </section>

      {/* 6. OUR FOUNDER SECTION */}
      <section id="founder" style={{ padding: '80px 4vw 110px', background: '#F5F5F9', position: 'relative' }}>
        <div className="winera-about-founder-grid" style={{ maxWidth: '1180px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '60px', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
            <img src={siteData?.founder?.image || founderUnnit} alt={`${siteData?.founder?.name || 'Mr. Unnit Jogani'} - Founder & CEO`} style={{ position: 'relative', zIndex: 10, maxHeight: '460px', objectFit: 'contain', filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.12))' }} />
            <div className="winera-about-founder-badge" style={{ position: 'absolute', bottom: '15px', right: '20px', zIndex: 20, width: '115px', height: '115px', borderRadius: '50%', background: '#F5F5F9', border: '3px solid #0f172a', boxShadow: '0 12px 30px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '10px' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ec4899', lineHeight: 1 }}>{siteData?.founder?.yearsOfExperience || '14+'}</span>
              <span style={{ fontSize: '10.5px', fontWeight: '800', color: '#ec4899', lineHeight: 1.15, marginTop: '2px' }}>Years<br />Experience</span>
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
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>{siteData?.founder?.name || 'Mr. Unnit Jogani'}</h3>
            
            <div style={{ color: '#475569', fontSize: '13.5px', lineHeight: 1.65, fontWeight: '500', marginBottom: '32px', whiteSpace: 'pre-line' }}>
              {siteData?.founder?.aboutDetails || (
                <>
                  <p style={{ marginBottom: '16px' }}>Mr. Unnit Jogani is the Founder &amp; CEO of Winera International Pvt. Ltd. One of India's most trusted <strong>game zone equipment manufacturers and indoor amusement park solution providers</strong>.</p>
                  <p>Since establishing Winera in Surat, Gujarat in 2014, Unnit has led the company's growth from a regional startup to a pan-India B2B leader with an uncompromising focus on quality, safety, and client satisfaction.</p>
                </>
              )}
            </div>

            <a href={siteData?.founder?.linkedinUrl || "https://linkedin.com"} target="_blank" rel="noreferrer" style={{ background: '#00a8ff', color: '#ffffff', fontSize: '13.5px', fontWeight: '800', padding: '12px 36px', borderRadius: '25px', border: '2px solid #ffcd00', boxShadow: '0 8px 22px rgba(0, 168, 255, 0.3)', display: 'inline-block', textDecoration: 'none' }}>Linkedin Profile</a>
          </div>
        </div>
      </section>

      {/* 7. CTA BANNER SECTION */}
      <CtaBanner
        tagline={siteData?.ctaBanner?.tagline}
        title={siteData?.ctaBanner?.title}
        subtitle={siteData?.ctaBanner?.subtitle}
        description={siteData?.ctaBanner?.description}
        buttonText={siteData?.ctaBanner?.buttonText}
        buttonLink={siteData?.ctaBanner?.buttonLink}
        bgUrl={siteData?.ctaBanner?.bgUrl}
      />

      {/* 8. FOOTER */}
      <Footer footerData={footer} />
    </div>
  );
}
