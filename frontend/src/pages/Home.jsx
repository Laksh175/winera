import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeading from '../components/SectionHeading';
import FaqSection from '../components/FaqSection';
import ProjectsMarqueeSection from '../components/ProjectsMarqueeSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ClientsMarqueeSection from '../components/ClientsMarqueeSection';
import CtaBanner from '../components/CtaBanner';
import heroBg from '../assets/hero-bg.png';
import about1 from '../assets/about-1.png';
import about2 from '../assets/about-2.png';
import about3 from '../assets/about-3.png';
import qualityBadge from '../assets/quality-badge.png';
import productsBg from '../assets/products-bg.png';
import partnerBg from '../assets/partner-bg.png';
import whyChooseBg from '../assets/why-choose-bg.png';
import indMall from '../assets/ind-mall.png';
import indResort from '../assets/ind-resort.png';
import indSchool from '../assets/ind-school.png';
import { Check, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight, LayoutGrid, ShoppingBag, Palette, Wrench, CheckCheck } from 'lucide-react';

export default function Home({ siteData }) {
  const [activeProductIndex, setActiveProductIndex] = React.useState(0);
  const [activeIndustryIndex, setActiveIndustryIndex] = React.useState(2);

  if (!siteData) return <div style={{ minHeight: '100vh', background: '#06132d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

  const { header, hero, footer } = siteData;

  const homeFaqs = [
    {
      q: "1. How Do I Set Up A Game Zone In India?",
      a: "Start with a consultation and share your available space, budget, and location with our team. As a trusted gaming zone setup company in India, Winera International handles everything from ROI analysis and layout design to equipment selection, installation, and post-launch support across 50+ cities."
    },
    {
      q: "2. What Is The Cost Of A Game Zone Setup In India?",
      a: "The cost depends on your venue size, equipment mix (arcade, VR, bowling, softplay), and customization level. Winera provides transparent pricing and flexible packages tailored to your budget."
    },
    {
      q: "3. Does Winera Handle The Complete Game Zone Setup?",
      a: "Yes! We provide complete end-to-end turnkey solutions including 2D/3D layout planning, equipment manufacturing/sourcing, shipping, site installation, card system setup, and staff training."
    },
    {
      q: "4. Which Cities Does Winera Cover In India?",
      a: "We execute projects pan-India across 50+ major cities including Mumbai, Delhi NCR, Bangalore, Hyderabad, Surat, Indore, Ahmedabad, Pune, and Chennai."
    },
    {
      q: "5. What Makes Winera International Different From Other Game Zone Suppliers?",
      a: "We prioritize ROI consultancy first before selling equipment. Our safety-certified machines, dedicated technical support team, and custom venue branding give our clients higher profitability."
    },
    {
      q: "6. Do You Provide After-Sales Support After Installation?",
      a: "Absolutely. We offer lifetime technical support, spare parts assistance, machine maintenance guidance, and periodic software updates."
    },
    {
      q: "7. Can Game Zone Equipment Be Customised For My Venue's Theme?",
      a: "Yes, all our amusement rides, softplay structures, neon lighting, and machine cabinet graphics can be customized to align with your brand identity."
    },
    {
      q: "8. How Do I Get Started With My Game Zone Project?",
      a: "Simply reach out to us via call or WhatsApp. Our team will analyze your space drawings and prepare a customized ROI & layout proposal."
    },
    {
      q: "9. Can Winers International Help Me Plan My Game Zone From Scratch?",
      a: "Yes, even if you only have a bare commercial hall, we design full spatial layouts, electrical routing, interior lighting, and equipment placement from scratch."
    }
  ];

  return (
    <div style={{ backgroundColor: '#F5F5F9', color: '#0f172a', minHeight: '100vh' }}>
      <Header headerData={header} />

      <section id="hero" className="winera-home-hero-section" style={{
        position: 'relative',
        width: '100%',
        minHeight: 'auto',
        aspectRatio: '1920 / 840',
        paddingTop: '140px',
        paddingBottom: '60px',
        background: `url(${heroBg}) center/100% 100% no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          <div style={{
            display: 'inline-block',
            padding: '6px 28px',
            background: 'linear-gradient(90deg, rgba(255,183,3,0.2) 0%, rgba(255,183,3,0.85) 50%, rgba(255,183,3,0.2) 100%)',
            borderRadius: '4px',
            color: '#ffffff',
            fontWeight: '900',
            fontSize: '18px',
            letterSpacing: '0.5px',
            textShadow: '0 2px 4px rgba(0,0,0,0.6)',
            marginBottom: '16px',
            clipPath: 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)'
          }}>
            India's Trusted
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
            fontWeight: '900',
            lineHeight: 1.15,
            color: '#ffffff',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
            marginBottom: '10px'
          }}>
            {(() => {
              const rawTitle = hero?.title || "Game Zone Equipment *Manufacturer* & Supplier";
              // Split by * or **
              const parts = rawTitle.split(/\*{1,2}(.*?)\*{1,2}/g);
              return parts.map((part, index) => {
                if (index % 2 === 1) {
                  return (
                    <span
                      key={index}
                      style={{
                        color: '#ffcd00',
                        WebkitTextStroke: '1px #000',
                        textShadow: '0 4px 15px rgba(255, 205, 0, 0.4)'
                      }}
                    >
                      {part}
                    </span>
                  );
                }
                return part;
              });
            })()}
          </h1>

          <p style={{
            fontSize: '0.95rem',
            color: '#d1d5db',
            maxWidth: '650px',
            margin: '0 auto 28px',
            lineHeight: 1.6,
            textShadow: '0 2px 6px rgba(0,0,0,0.8)'
          }}>
            {hero?.subtitle || "India's ROI-First Game Zone Developer from bowling alleys and trampoline parks to arcade zones and VR gaming & complete indoor amusement park setup, installed by our own team across 50+ cities."}
          </p>

          <a href={hero?.ctaPrimaryLink || "https://wa.me/919428989488"} target="_blank" rel="noreferrer" className="winera-hero-cta-btn" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '14px',
            padding: '10px 36px 10px 14px',
            background: '#F5F5F9',
            borderRadius: '40px',
            border: '3px solid #ffcd00',
            color: '#0f172a',
            fontWeight: '800',
            fontSize: '17px',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
            transition: 'transform 0.2s',
            textDecoration: 'none'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: '#25d366',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(37, 211, 102, 0.5)',
              flexShrink: 0
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.758.459 3.474 1.33 4.982l-1.412 5.16 5.281-1.385c1.455.794 3.1 1.213 4.787 1.214h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.668-1.037-5.176-2.923-7.061-1.886-1.885-4.394-2.922-7.066-2.922zm5.834 14.168c-.247.694-1.222 1.282-1.688 1.341-.466.06-1.047.098-1.696-.109-.4-.128-.918-.298-1.583-.585-2.822-1.222-4.664-4.084-4.806-4.273-.141-.188-1.144-1.523-1.144-2.905 0-1.381.724-2.062.981-2.343.257-.282.564-.352.752-.352.188 0 .376.002.54.01.174.008.411-.066.643.49.235.564.8 1.95.87 2.091.07.141.117.306.023.494-.094.188-.141.306-.282.47-.141.164-.298.367-.424.494-.141.141-.289.294-.125.576.164.282.729 1.202 1.564 1.946 1.074.956 1.98 1.253 2.262 1.394.282.141.447.117.611-.07.164-.188.705-.823.893-1.105.188-.282.376-.235.634-.141.258.094 1.644.775 1.926.916.282.141.47.211.54.329.07.117.07.681-.177 1.375z"/>
              </svg>
            </div>
            <span>{hero?.ctaPrimaryText || "Plan Your Game Zone"}</span>
          </a>
        </div>
      </section>

      <section style={{ padding: '70px 5vw 60px', background: '#F5F5F9', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionHeading marginBottom="8px">
            {(() => {
              const rawTitle = siteData?.statsHeader?.title || "DISCOVER OUR *COMPANY STATS*";
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

          <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '650px', margin: '0 auto 40px' }}>
            {siteData?.statsHeader?.description || "Helping businesses build profitable, safe, and unforgettable entertainment destinations with precision and luxury in mind."}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '20px' }}>
            {(Array.isArray(siteData?.stats) && siteData.stats.length > 0 ? siteData.stats : [
              { number: '14+', label: 'YEARS OF EXPERIENCE' },
              { number: '200+', label: 'Project Completed' },
              { number: '98%', label: 'Happy Clients' },
              { number: '50+', label: 'Cities Covered' }
            ]).map((stat, i) => (
              <div key={i} style={{
                background: 'linear-gradient(180deg, #dcf0ff 0%, #ffffff 100%)',
                padding: '28px 16px',
                borderRadius: '16px',
                border: '1px solid #c8e5ff',
                boxShadow: '0 10px 25px rgba(0, 168, 255, 0.08)',
                textAlign: 'center'
              }}>
                <h3 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#00a8ff', lineHeight: 1 }}>{stat.number || stat.val}</h3>
                <p style={{ color: '#0f172a', fontWeight: '800', fontSize: '11px', textTransform: 'uppercase', marginTop: '8px', letterSpacing: '0.5px' }}>{stat.label || stat.title}</p>
              </div>
            ))}
            <div style={{
              background: 'linear-gradient(180deg, #dcf0ff 0%, #ffffff 100%)',
              padding: '24px 16px',
              borderRadius: '16px',
              border: '1px solid #c8e5ff',
              boxShadow: '0 10px 25px rgba(0, 168, 255, 0.08)',
              textAlign: 'center'
            }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(0, 168, 255, 0.1)', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: '800', color: '#00a8ff', marginBottom: '4px' }}>
                <ShieldCheck style={{ width: '12px', height: '12px' }} />
                <span>100% CERTIFIED</span>
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#00a8ff', marginTop: '2px' }}>Safety First</h4>
              <p style={{ color: '#64748b', fontSize: '10px', fontWeight: '600', lineHeight: 1.3, marginTop: '2px' }}>Industry Standard Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT WINERA INTERNATIONAL SECTION */}
      <section id="about" style={{ padding: '70px 5vw 90px', background: '#F5F5F9', textAlign: 'center' }}>
        <div style={{ maxWidth: '1220px', margin: '0 auto' }}>
          <SectionHeading marginBottom="45px" accentWidth="55%" accentMaxWidth="400px">
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
            <div>
              <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: '16px' }}>
                {siteData?.aboutHome?.paragraph1 || "Winera International Pvt. Ltd. is a dynamic force in the gaming and indoor amusement industry, headquartered in Surat, India. Since our establishment in 2014, we have focused exclusively on delivering project-based gaming solutions to the B2B sector nationwide. Our unwavering commitment to excellence and tailored approach sets us apart. We're dedicated to understanding our client's unique needs and providing the most suitable gaming solutions for each project."}
              </p>

              <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: '24px' }}>
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
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '18px',
                      height: '18px',
                      color: '#000000',
                      flexShrink: 0
                    }}>
                      <CheckCheck style={{ width: '18px', height: '18px', strokeWidth: 2.5 }} />
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#334155' }}>{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <a href="/about" style={{
                display: 'inline-block',
                background: '#38bdf8',
                color: '#ffffff',
                fontSize: '13.5px',
                fontWeight: '800',
                padding: '12px 32px',
                borderRadius: '12px',
                border: '2px solid #ffcd00',
                boxShadow: '0 8px 20px rgba(56, 189, 248, 0.35)',
                textDecoration: 'none'
              }}>
                More About Us
              </a>
            </div>

            {/* Right Side 4-Image Grid with Central Quality Badge Overlay */}
            <div className="winera-about-images-grid" style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '14px',
                width: '100%'
              }}>
                <div style={{
                  height: '180px',
                  borderRadius: '24px 8px 24px 24px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  background: `url(${about1}) center/cover no-repeat`
                }}></div>
                <div style={{
                  height: '210px',
                  borderRadius: '12px 28px 24px 12px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  background: `url(${about2}) center/cover no-repeat`
                }}></div>
                <div style={{
                  height: '210px',
                  borderRadius: '24px 12px 28px 24px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  background: `url(${about3}) center/cover no-repeat`
                }}></div>
                <div style={{
                  height: '180px',
                  borderRadius: '12px 24px 12px 28px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  background: `url(${about1}) center/cover no-repeat`
                }}></div>
              </div>

              {/* Central Circular Badge: Tested Safe, Reliable & Quality */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '32%',
                transform: 'translate(-50%, -50%)',
                zIndex: 30,
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                filter: 'drop-shadow(0 12px 25px rgba(0, 168, 255, 0.35))'
              }}>
                <img src={qualityBadge} alt="Tested Safe, Reliable & Quality Badge" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="winera-products-section" style={{
        position: 'relative',
        padding: '60px 4vw 80px',
        background: `url(${productsBg}) center/100% 100% no-repeat`,
        minHeight: '760px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}>
        <div style={{ maxWidth: '1240px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
          <SectionHeading marginBottom="6px" accentWidth="65%" accentMaxWidth="440px">
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
                { id: "trampoline", title: "Trampoline", desc: "Physical fitness and active fun combined in safe high-capacity commercial trampoline layouts.", img: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?auto=format&fit=crop&w=800&q=80", link: "/products/trampoline-park" },
                { id: "hypergrid", title: "Hyper Grid", desc: "Interactive LED floor game where players compete across pressure-sensitive glowing tiles.", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", link: "/products/hypergrid" },
                { id: "lasertag", title: "Laser Tag & Spy", desc: "High-adrenaline commercial laser tag arena setup delivering competitive team battles for malls & venues.", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80", link: "/products/laser-tag" },
                { id: "ride", title: "Amusement Ride", desc: "Exhilarating blend of collisions and smooth handling designed with top commercial safety.", img: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80", link: "/products/amusement-park" },
                { id: "decorative", title: "Decorative Items", desc: "Custom themed lights, sculptures, reception desks, and ambient furniture to elevate your game zone.", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", link: "/products/lights" }
              ];

              const cards = (Array.isArray(siteData?.productsHome?.cardsList) && siteData.productsHome.cardsList.length > 0)
                ? siteData.productsHome.cardsList
                : defaultProductsCards;

              return cards.map((prod, idx) => {
                const isExpanded = activeProductIndex === idx;
                return (
                <div
                  key={idx}
                  onClick={() => setActiveProductIndex(idx)}
                  onMouseEnter={() => setActiveProductIndex(idx)}
                  className={`winera-product-card ${isExpanded ? 'is-expanded' : ''}`}
                  style={{
                    flex: isExpanded ? '0 0 340px' : '1',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: isExpanded ? '0 15px 35px rgba(0, 0, 0, 0.35)' : '0 6px 16px rgba(0, 144, 224, 0.2)',
                    border: isExpanded ? '2px solid rgba(0, 168, 255, 0.6)' : '1px solid rgba(255, 255, 255, 0.3)',
                    background: `linear-gradient(180deg, rgba(0, 144, 224, 0.85) 0%, rgba(0, 114, 200, 0.95) 100%), url(${prod.img}) center/cover no-repeat`,
                    backgroundBlendMode: isExpanded ? 'normal' : 'overlay'
                  }}
                >
                  {isExpanded ? (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      background: `url(${prod.img}) center/cover no-repeat`,
                      position: 'relative'
                    }}>
                      <div style={{ flex: 1, minHeight: '120px' }}></div>
                      <div style={{
                        background: '#F5F5F9',
                        margin: '12px',
                        padding: '16px 20px',
                        borderRadius: '16px',
                        textAlign: 'left',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                      }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#00a8ff', marginBottom: '6px' }}>{prod.title}</h3>
                        <p style={{ fontSize: '11px', color: '#475569', lineHeight: 1.5, marginBottom: '10px' }}>
                          {prod.desc}
                        </p>
                        <a href={prod.link || '/products/arcade-games'} style={{
                          color: '#00a8ff',
                          fontSize: '11px',
                          fontWeight: '800',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          textDecoration: 'none'
                        }}>
                          <span>View More Info</span>
                          <ArrowRight style={{ width: '12px', height: '12px' }} />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="winera-collapsed-title"
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                        padding: '20px 0',
                        color: '#ffffff',
                        fontWeight: '800',
                        fontSize: '15px',
                        letterSpacing: '1px',
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                        whiteSpace: 'nowrap'
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

      <section className="winera-partner-section" style={{
        position: 'relative',
        width: '100%',
        padding: '70px 5vw 90px',
        background: `url(${partnerBg}) center/100% 100% no-repeat`,
        minHeight: '480px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="winera-partner-grid" style={{
          maxWidth: '1240px',
          width: '100%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 500px',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div style={{ textAlign: 'left' }}>
            <SectionHeading align="left" marginBottom="12px" accentWidth="70%" accentMaxWidth="380px">
              {(() => {
                const rawTitle = siteData?.partnerHome?.title || "*Your Partner* in Building a Profitable Game Zone";
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

            <p style={{ color: '#475569', fontSize: '13px', lineHeight: 1.6, maxWidth: '440px', marginTop: '16px' }}>
              {siteData?.partnerHome?.subtitle || "Discover how Winera International helps you plan, build, and launch a successful game zone from free ROI consultation to safety-certified equipment and complete installation support."}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Box 1: Free ROI Consultancy */}
            <div style={{
              background: '#F5F5F9',
              borderRadius: '20px',
              padding: '24px 28px',
              border: '2px solid #ffcd00',
              boxShadow: '0 10px 30px rgba(255, 205, 0, 0.15)',
              textAlign: 'left',
              position: 'relative'
            }}>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>
                {siteData?.partnerHome?.box1Title || "Free ROI Consultancy"}
              </h4>
              <p style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', lineHeight: 1.55, marginBottom: '16px' }}>
                {siteData?.partnerHome?.box1Desc || "Before you invest a single rupee, our team consults with you on layout, equipment mix, and budget and hands you a complete ROI report covering projected revenue, footfall, and break-even timeline."}
              </p>
              <div style={{ textAlign: 'right' }}>
                <a href="https://wa.me/919428989488" target="_blank" rel="noreferrer" title="Chat on WhatsApp for Free ROI Consultancy" style={{
                  display: 'inline-block',
                  background: '#00a8ff',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: '800',
                  padding: '6px 16px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(0, 168, 255, 0.3)'
                }}>
                  Explore More
                </a>
              </div>
            </div>

            {/* Box 2: Safety-Certified Installation */}
            <div style={{
              background: '#e0f2fe',
              borderRadius: '20px',
              padding: '24px 28px',
              border: '1.5px solid #7dd3fc',
              boxShadow: '0 10px 30px rgba(56, 189, 248, 0.12)',
              textAlign: 'left',
              position: 'relative'
            }}>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>
                {siteData?.partnerHome?.box2Title || "Safety-Certified Installation"}
              </h4>
              <p style={{ fontSize: '12px', color: '#475569', fontWeight: '500', lineHeight: 1.55, marginBottom: '16px' }}>
                {siteData?.partnerHome?.box2Desc || "Every product we install meets commercial safety standards tested for high-footfall environments, assembled by our own trained team, and handed over only after a full on-site safety inspection."}
              </p>
              <div style={{ textAlign: 'right' }}>
                <a href="https://wa.me/919428989488" target="_blank" rel="noreferrer" style={{
                  display: 'inline-block',
                  background: '#ffffff',
                  color: '#0f172a',
                  fontSize: '11px',
                  fontWeight: '800',
                  padding: '6px 16px',
                  borderRadius: '12px',
                  border: '1px solid #7dd3fc',
                  textDecoration: 'none',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)'
                }}>
                  Explore More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="industries" style={{
        padding: '80px 4vw 100px',
        background: '#F5F5F9',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <SectionHeading marginBottom="8px" accentWidth="60%" accentMaxWidth="400px">
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

          <p style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', marginBottom: '50px' }}>
            {siteData?.industriesHeader?.subtitle || "We deliver complete game zone setup solutions for businesses across India"}
          </p>

          <div className="winera-industries-wrapper" style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '1220px',
            margin: '0 auto',
            minHeight: '440px'
          }}>
            <button
              onClick={() => {
                const total = (Array.isArray(siteData?.industriesHeader?.items) && siteData.industriesHeader.items.length > 0) ? siteData.industriesHeader.items.length : 10;
                setActiveIndustryIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
              }}
              className="winera-industries-btn-left"
              style={{
                position: 'absolute',
                left: '-50px',
                zIndex: 40,
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              <ChevronLeft style={{ width: '28px', height: '28px', strokeWidth: 1.5 }} />
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
                    onClick={() => setActiveIndustryIndex(idx)}
                    className={`winera-industry-card ${isCenter ? 'is-center-card' : 'is-side-card'}`}
                    style={{
                      position: 'absolute',
                      width: '260px',
                      height: '350px',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.55s cubic-bezier(0.34, 1.25, 0.64, 1)',
                      opacity: opacityMap[offset],
                      zIndex: zIndexMap[offset],
                      transform: `translate3d(${translateXMap[offset]}, ${translateYMap[offset]}, 0) scale(${scaleMap[offset]})`,
                      boxShadow: isCenter ? '0 25px 50px rgba(0, 0, 0, 0.4)' : '0 12px 28px rgba(0,0,0,0.18)',
                      background: `url(${ind.img}) center/cover no-repeat`
                    }}
                  >
                    {isCenter && (
                      <div style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '16px',
                        right: '16px',
                        background: '#F5F5F9',
                        padding: '16px 18px',
                        borderRadius: '16px',
                        textAlign: 'left',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.25)'
                      }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#00a8ff', marginBottom: '6px' }}>
                          {ind.title}
                        </h3>
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
              style={{
                position: 'absolute',
                right: '-50px',
                zIndex: 40,
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              <ChevronRight style={{ width: '28px', height: '28px', strokeWidth: 1.5 }} />
            </button>
          </div>
        </div>
      </section>

      <section id="process" className="winera-process-section" style={{ padding: '80px 4vw 100px', background: '#F5F5F9', textAlign: 'center' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <SectionHeading marginBottom="8px" accentWidth="65%" accentMaxWidth="440px">
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

          <p style={{ color: '#64748b', fontSize: '14px', fontWeight: '700', marginBottom: '50px' }}>
            {siteData?.processHome?.subtitle || "How We Setup Your Game Zone"}
          </p>

          {/* Dynamic Working Process Cards */}
          <div className="winera-process-cards-container" style={{ display: 'flex', flexDirection: 'column', gap: '30px', maxWidth: '1180px', margin: '0 auto' }}>
            {(() => {
              const defaultCards = [
                { num: "01", title: "Consultation & Concept", points: ["Initial Project Discussion", "ROI & Business Feasibility Analysis", "Space & Budget Evaluation"] },
                { num: "02", title: "2D/3D Layout & Planning", points: ["Custom Game Zone Layout Design", "Equipment Mix Selection", "Electrical & Interior Planning Guidance"] },
                { num: "03", title: "Equipment Sourcing & Manufacturing", points: ["High-Grade Commercial Amusement Machines", "Quality Inspection Before Shipping", "Branding & Theme Customization"] },
                { num: "04", title: "Installation & Setup", points: ["On-Site Assembly by Expert Technicians", "Safety & Operational Testing", "Card System Integration"] },
                { num: "05", title: "Handover & Support", points: ["Staff Operations Training", "Go-Live Assistance", "Lifetime Technical & Spare Parts Support"] }
              ];
              const cardList = (Array.isArray(siteData?.processHome?.cards) && siteData.processHome.cards.length > 0)
                ? siteData.processHome.cards.filter(item => item && typeof item === 'object')
                : defaultCards;

              const totalCards = cardList.length;

              // When 6, 9, 12... cards exist, show uniform 3-column grid per row so all cards have equal width
              if (totalCards % 3 === 0) {
                return (
                  <div className="winera-process-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', width: '100%' }}>
                    {cardList.map((step, idx) => (
                      <div key={idx} style={{ background: '#F5F5F9', borderRadius: '24px', padding: '32px 24px', textAlign: 'left', position: 'relative', border: '1.5px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#00a8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', boxShadow: '0 6px 16px rgba(0, 168, 255, 0.3)' }}>
                          <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: '900' }}>{step?.num || `0${idx + 1}`}</span>
                        </div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '14px' }}>{step?.title || ''}</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {(Array.isArray(step?.points) ? step.points : []).filter(p => p && p.trim() !== '').map((pt, pIdx) => (
                            <li key={pIdx} style={{ fontSize: '11px', color: '#64748b', fontWeight: '500', lineHeight: 1.4, display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                              <span style={{ color: '#94a3b8', fontSize: '10px', marginTop: '1px' }}>•</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                );
              }

              // Otherwise for 5 cards (or non-multiples of 3), keep 3 cards in row 1 and remaining centered below
              const topRowCards = cardList.slice(0, 3);
              const bottomRowCards = cardList.slice(3);

              return (
                <>
                  <div className="winera-process-row" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(topRowCards.length, 3)}, 1fr)`, gap: '24px' }}>
                    {topRowCards.map((step, idx) => (
                      <div key={idx} style={{ background: '#F5F5F9', borderRadius: '24px', padding: '32px 24px', textAlign: 'left', position: 'relative', border: '1.5px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#00a8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', boxShadow: '0 6px 16px rgba(0, 168, 255, 0.3)' }}>
                          <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: '900' }}>{step?.num || `0${idx + 1}`}</span>
                        </div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '14px' }}>{step?.title || ''}</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {(Array.isArray(step?.points) ? step.points : []).filter(p => p && p.trim() !== '').map((pt, pIdx) => (
                            <li key={pIdx} style={{ fontSize: '11px', color: '#64748b', fontWeight: '500', lineHeight: 1.4, display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                              <span style={{ color: '#94a3b8', fontSize: '10px', marginTop: '1px' }}>•</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {bottomRowCards.length > 0 && (
                    <div className="winera-process-row" style={{ display: 'grid', gridTemplateColumns: `repeat(${bottomRowCards.length}, 1fr)`, gap: '24px', maxWidth: bottomRowCards.length === 2 ? '780px' : '1180px', margin: '0 auto', width: '100%' }}>
                      {bottomRowCards.map((step, idx) => (
                        <div key={idx} style={{ background: '#F5F5F9', borderRadius: '24px', padding: '32px 24px', textAlign: 'left', position: 'relative', border: '1.5px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#00a8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', boxShadow: '0 6px 16px rgba(0, 168, 255, 0.3)' }}>
                            <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: '900' }}>{step?.num || `0${idx + 4}`}</span>
                          </div>
                          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '14px' }}>{step?.title || ''}</h3>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {(Array.isArray(step?.points) ? step.points : []).filter(p => p && p.trim() !== '').map((pt, pIdx) => (
                              <li key={pIdx} style={{ fontSize: '11px', color: '#64748b', fontWeight: '500', lineHeight: 1.4, display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                                <span style={{ color: '#94a3b8', fontSize: '10px', marginTop: '1px' }}>•</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
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

      <section id="partners" className="winera-channel-partners-section" style={{ padding: '80px 5vw 100px', background: '#f5F5F9' }}>
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
          <SectionHeading marginBottom="8px">
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

          <p style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', marginBottom: '45px' }}>
            {siteData?.whyChooseUs?.subtitle || "We deliver complete game zone setup solutions for businesses across India"}
          </p>

          <div className="winera-why-us-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '30px 45px',
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
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: '#cff4fe',
                  border: '1px solid #7dd3fc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <CheckCheck style={{ width: '20px', height: '20px', color: '#00a8ff' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', lineHeight: 1.5, margin: 0 }}>
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
        faqList={siteData?.faqs}
        title={siteData?.faqsHeader?.title}
        subtitle={siteData?.faqsHeader?.subtitle}
      />

      {/* 15. READY TO GET STARTED CTA BANNER SECTION */}
      <CtaBanner
        tagline={siteData?.ctaBanner?.tagline}
        title={siteData?.ctaBanner?.title}
        subtitle={siteData?.ctaBanner?.subtitle}
        description={siteData?.ctaBanner?.description}
        buttonText={siteData?.ctaBanner?.buttonText}
        buttonLink={siteData?.ctaBanner?.buttonLink}
        bgUrl={siteData?.ctaBanner?.bgUrl}
      />


      {/* 16. FOOTER SECTION */}
      <Footer footerData={footer} />
    </div>
  );
}
