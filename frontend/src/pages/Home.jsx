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
import aboutCollage from '../assets/about-collage.png';
import qualityBadge from '../assets/quality-badge.png';
import productsBg from '../assets/products-bg.png';
import partnerBg from '../assets/partner-bg.png';
import whyChooseBg from '../assets/why-choose-bg.png';
import indMall from '../assets/ind-mall.png';
import indResort from '../assets/ind-resort.png';
import indSchool from '../assets/ind-school.png';
import homeBlockBg from '../assets/home-block.png';
import homeBlock1 from '../assets/home-block-1.png';
import homeBlock2 from '../assets/home-block-2.png';
import { Check, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight, LayoutGrid, ShoppingBag, Palette, Wrench, CheckCheck, UserCheck } from 'lucide-react';

export default function Home({ siteData }) {
  const [activeProductIndex, setActiveProductIndex] = React.useState(0);
  const [activeIndustryIndex, setActiveIndustryIndex] = React.useState(2);

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

      <section id="hero" className="winera-home-hero-section" style={{
        position: 'relative',
        width: '100%',
        minHeight: 'auto',
        aspectRatio: '1920 / 840',
        paddingTop: '145px',
        paddingBottom: '115px',
        background: `url(${heroBg}) center/100% 100% no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <div style={{ width: '100%', maxWidth: '880px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          {/* Badge */}
          <div style={{
            display: 'inline-block',
            padding: '7px 30px',
            background: 'linear-gradient(90deg, rgba(255,183,3,0.3) 0%, rgba(255,183,3,0.9) 50%, rgba(255,183,3,0.3) 100%)',
            borderRadius: '4px',
            color: '#ffffff',
            fontWeight: '900',
            fontSize: '17.5px',
            letterSpacing: '0.6px',
            textShadow: '0 2px 4px rgba(0,0,0,0.6)',
            marginBottom: '18px',
            clipPath: 'polygon(6% 0%, 94% 0%, 100% 50%, 94% 100%, 6% 100%, 0% 50%)'
          }}>
            India's Trusted
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: 'clamp(1.75rem, 4.4vw, 3.75rem)',
            fontWeight: '900',
            lineHeight: 1.18,
            color: '#ffffff',
            textShadow: '0 4px 25px rgba(0, 0, 0, 0.95), 0 2px 8px rgba(0,0,0,0.8)',
            marginBottom: '18px',
            letterSpacing: '-0.3px',
            maxWidth: '920px',
            margin: '0 auto 18px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            {(() => {
              const rawTitle = hero?.title || "Game Zone Equipment *Manufacturer* & Supplier";
              if (rawTitle.includes("Game Zone Equipment")) {
                return (
                  <>
                    <span style={{ display: 'block', width: '100%' }}>Game Zone Equipment</span>
                    <span style={{ display: 'block', width: '100%', marginTop: '4px' }}>
                      <span style={{ color: '#ffcd00', textShadow: '0 4px 18px rgba(255, 205, 0, 0.55)', display: 'inline' }}>Manufacturer</span> & Supplier
                    </span>
                  </>
                );
              }
              const parts = rawTitle.split(/\*{1,2}(.*?)\*{1,2}/g);
              return parts.map((part, index) => {
                if (index % 2 === 1) {
                  return (
                    <span
                      key={index}
                      style={{
                        color: '#ffcd00',
                        textShadow: '0 4px 18px rgba(255, 205, 0, 0.55)',
                        display: 'inline'
                      }}
                    >
                      {part}
                    </span>
                  );
                }
                return <span key={index} style={{ display: 'inline' }}>{part}</span>;
              });
            })()}
          </h1>

          {/* Subtitle Paragraph */}
          <p style={{
            fontSize: '0.98rem',
            color: '#d1d5db',
            maxWidth: '680px',
            margin: '0 auto 32px',
            lineHeight: 1.6,
            textShadow: '0 2px 8px rgba(0,0,0,0.85)',
            fontWeight: '500'
          }}>
            {hero?.subtitle || "India's ROI-First Game Zone Developer from bowling alleys and trampoline parks to arcade zones and VR gaming & complete indoor amusement park setup, installed by our own team across 50+ cities."}
          </p>

          {/* CTA Button */}
          <div className="winera-hero-cta-wrapper">
            <a href={hero?.ctaPrimaryLink || "https://wa.me/919428989488"} target="_blank" rel="noreferrer" className="winera-hero-cta-btn">
              <div className="winera-hero-cta-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.758.459 3.474 1.33 4.982l-1.412 5.16 5.281-1.385c1.455.794 3.1 1.213 4.787 1.214h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.668-1.037-5.176-2.923-7.061-1.886-1.885-4.394-2.922-7.066-2.922zm5.834 14.168c-.247.694-1.222 1.282-1.688 1.341-.466.06-1.047.098-1.696-.109-.4-.128-.918-.298-1.583-.585-2.822-1.222-4.664-4.084-4.806-4.273-.141-.188-1.144-1.523-1.144-2.905 0-1.381.724-2.062.981-2.343.257-.282.564-.352.752-.352.188 0 .376.002.54.01.174.008.411-.066.643.49.235.564.8 1.95.87 2.091.07.141.117.306.023.494-.094.188-.141.306-.282.47-.141.164-.298.367-.424.494-.141.141-.289.294-.125.576.164.282.729 1.202 1.564 1.946 1.074.956 1.98 1.253 2.262 1.394.282.141.447.117.611-.07.164-.188.705-.823.893-1.105.188-.282.376-.235.634-.141.258.094 1.644.775 1.926.916.282.141.47.211.54.329.07.117.07.681-.177 1.375z" />
                </svg>
              </div>
              <span>{hero?.ctaPrimaryText || "Plan Your Game Zone"}</span>
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: '75px 5vw 70px', background: '#F5F5F9', textAlign: 'center' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <SectionHeading marginBottom="12px" accentWidth="320px" accentMaxWidth="420px">
            {(() => {
              const rawTitle = siteData?.statsHeader?.title || "DISCOVER OUR *COMPANY STATS*";
              const parts = rawTitle.split(/\*{1,2}(.*?)\*{1,2}/g);
              return parts.map((part, index) => {
                if (index % 2 === 1) {
                  return (
                    <span key={index} style={{ color: '#38bdf8' }}>
                      {part}
                    </span>
                  );
                }
                return part;
              });
            })()}
          </SectionHeading>

          <p style={{ color: '#475569', fontSize: '14.5px', fontWeight: '500', maxWidth: '620px', margin: '0 auto 48px', lineHeight: 1.55 }}>
            {siteData?.statsHeader?.description || "Helping businesses build profitable, safe, and unforgettable entertainment destinations with precision and luxury in mind."}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            alignItems: 'stretch'
          }}>
            {(Array.isArray(siteData?.stats) && siteData.stats.length > 0 ? siteData.stats : [
              { number: '14+', label: 'YEARS OF EXPERIENCE' },
              { number: '200+', label: 'Successful Project' },
              { number: '98%', label: 'Happy Clients' },
              { number: '50+', label: 'Cities Covered' }
            ]).map((stat, i) => (
              <div key={i} style={{
                background: 'linear-gradient(145deg, #cceeff 0%, #e8f5ff 45%, #ffffff 100%)',
                padding: '30px 18px 24px',
                borderRadius: '20px',
                border: '1px solid rgba(186, 230, 253, 0.7)',
                boxShadow: '0 12px 30px rgba(0, 168, 255, 0.07)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease'
              }}>
                <h3 style={{ fontSize: '2.6rem', fontWeight: '800', color: '#38bdf8', lineHeight: 1, marginBottom: '8px', letterSpacing: '-0.5px' }}>
                  {stat.number || stat.val}
                </h3>
                <p style={{ color: '#334155', fontWeight: '800', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0, lineHeight: 1.35 }}>
                  {stat.label || stat.title}
                </p>
              </div>
            ))}

            {/* 5th Card: Safety First */}
            <div style={{
              background: 'linear-gradient(145deg, #cceeff 0%, #e8f5ff 45%, #ffffff 100%)',
              padding: '24px 18px 22px',
              borderRadius: '20px',
              border: '1px solid rgba(186, 230, 253, 0.7)',
              boxShadow: '0 12px 30px rgba(0, 168, 255, 0.07)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease'
            }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#0f172a">
                  <path d="M12 2l2.4 1.8 3-0.6 0.8 2.9 3 1.1-0.8 2.9 1.8 2.4-2.4 1.8 0.6 3-2.9 0.8-1.1 3-2.9-0.8-2.4 1.8-1.8-2.4-3 0.6-0.8-2.9-3-1.1 0.8-2.9-1.8-2.4 2.4-1.8-0.6-3 2.9-0.8 1.1-3z" />
                  <path d="M9 12l2 2 4-4" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <span style={{ fontSize: '10.5px', fontWeight: '800', color: '#0f172a', letterSpacing: '0.5px', textTransform: 'uppercase' }}>100% CERTIFIED</span>
              </div>
              <h4 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#38bdf8', margin: '2px 0 4px', lineHeight: 1.2 }}>
                Safety First
              </h4>
              <p style={{ color: '#64748b', fontSize: '10.5px', fontWeight: '600', lineHeight: 1.35, margin: 0 }}>
                Industry Standard<br />Excellence
              </p>
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
                      <Check style={{ width: '18px', height: '18px', strokeWidth: 3.2 }} />
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#334155' }}>{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="winera-cyan-cta-wrapper">
                <a href="/why-us" className="winera-cyan-cta-btn">
                  <span>More About Us</span>
                </a>
              </div>
            </div>

            {/* Right Side Single Composite Collage Image */}
            <div className="winera-about-images-grid" style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={siteData?.aboutHome?.rightImgUrl || aboutCollage}
                alt="About Winera International"
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  maxWidth: '520px',
                  height: 'auto',
                  display: 'block',
                  filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.12))'
                }}
              />
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
                { id: "arcade", title: "Arcade Game", desc: "Discover endless fun with our innovative indoor arcade games, merging excitement and fitness seamlessly.", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80", link: "/product/arcade-games" },
                { id: "vr", title: "VR GAME", desc: "Immersive commercial VR gaming machines delivering thrilling virtual reality experiences.", img: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=800&q=80", link: "/product/vr-games" },
                { id: "ar", title: "AR GAME", desc: "Interactive AR gaming solutions blending technology and entertainment — sports simulators and more.", img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80", link: "/product/ar-games" },
                { id: "bowling", title: "Bowling Alley", desc: "The Brunswick bowling equipment with stable mechanical capacity popular across global entertainment hubs.", img: "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=800&q=80", link: "/product/bowling-alley" },
                { id: "softplay", title: "Soft Play", desc: "Indoor playgrounds designed specifically for children aged 3-15 years of indoor game venues.", img: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=800&q=80", link: "/product/soft-play" },
                { id: "trampoline", title: "Trampoline", desc: "Physical fitness and active fun combined in safe high-capacity commercial trampoline layouts.", img: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?auto=format&fit=crop&w=800&q=80", link: "/product/trampoline-park" },
                { id: "hypergrid", title: "Hyper Grid", desc: "Interactive LED floor game where players compete across pressure-sensitive glowing tiles.", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", link: "/product/hypergrid" },
                { id: "lasertag", title: "Laser Tag & Spy", desc: "High-adrenaline commercial laser tag arena setup delivering competitive team battles for malls & venues.", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80", link: "/product/laser-tag" },
                { id: "ride", title: "Amusement Ride", desc: "Exhilarating blend of collisions and smooth handling designed with top commercial safety.", img: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80", link: "/product/amusement-park" },
                { id: "decorative", title: "Decorative Items", desc: "Custom themed lights, sculptures, reception desks, and ambient furniture to elevate your game zone.", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", link: "/product/arcade-games" }
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
        padding: '70px 5vw 130px',
        background: `url(${partnerBg}) center top / 100% 100% no-repeat`,
        minHeight: '660px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="winera-partner-grid" style={{
          maxWidth: '1240px',
          width: '100%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 520px',
          gap: '50px',
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
            <div className="winera-partner-box-wrapper-yellow">
              <div className="winera-partner-box-yellow">
                <h4 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>
                  {siteData?.partnerHome?.box1Title || "Free ROI Consultancy"}
                </h4>
                <p style={{ fontSize: '12px', color: '#475569', fontWeight: '500', lineHeight: 1.5, marginBottom: '12px' }}>
                  {siteData?.partnerHome?.box1Desc || "Before you invest a single rupee, our team consults with you on layout, equipment mix, and budget and hands you a complete ROI report covering projected revenue, footfall, and break-even timeline."}
                </p>
                <div style={{ textAlign: 'right' }}>
                  <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
                    <a href="https://wa.me/919428989488" target="_blank" rel="noreferrer" title="Chat on WhatsApp for Free ROI Consultancy" className="winera-cyan-cta-btn winera-cyan-cta-btn-sm">
                      <span>Explore More</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 2: Safety-Certified Installation */}
            <div className="winera-partner-box-wrapper-cyan">
              <div className="winera-partner-box-cyan">
                <h4 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>
                  {siteData?.partnerHome?.box2Title || "Safety-Certified Installation"}
                </h4>
                <p style={{ fontSize: '12px', color: '#475569', fontWeight: '500', lineHeight: 1.5, marginBottom: '12px' }}>
                  {siteData?.partnerHome?.box2Desc || "Every product we install meets commercial safety standards tested for high-footfall environments, assembled by our own trained team, and handed over only after a full on-site safety inspection."}
                </p>
                <div style={{ textAlign: 'right' }}>
                  <div className="winera-white-cyan-cta-wrapper">
                    <a href="https://wa.me/919428989488" target="_blank" rel="noreferrer" className="winera-white-cyan-cta-btn">
                      <span>Explore More</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="industries" style={{
        padding: '80px 5vw 100px',
        background: '#F5F5F9',
        textAlign: 'center',
        position: 'relative'
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
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 50,
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: '8px',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#00a8ff'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.15)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
            >
              <ChevronLeft style={{ width: '40px', height: '40px', strokeWidth: 1.8 }} />
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
              aria-label="Next Industry"
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 50,
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: '8px',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#00a8ff'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.15)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
            >
              <ChevronRight style={{ width: '40px', height: '40px', strokeWidth: 1.8 }} />
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
          <div className="winera-process-cards-container" style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '1220px', margin: '0 auto', paddingTop: '12px' }}>
            {(() => {
              const defaultCards = [
                { num: "01", title: "Free ROI Consultation", points: ["Share your project idea and business goal", "Tell us your space size and budget", "We suggest the best game zone setup for you"] },
                { num: "02", title: "Project planning", points: ["We design a complete game zone layout for your space", "Best equipment selected as per your budget", "Complete route planning for your project"] },
                { num: "03", title: "Order Confirmation", points: ["Contract signed with transparent pricing", "Payment confirmation and order finalized", "Game zone production process begins"] },
                { num: "04", title: "Interior Design", points: ["Structural information and details finalized", "Partial decoration work completed", "Overall decoration drawing shared for approval"] },
                { num: "05", title: "Project Installation", points: ["Complete equipment assembly at your site", "Management system installation and setup", "Full equipment inspection after installation"] },
                { num: "06", title: "Forever Support", points: ["Technical support whenever you need assistance", "Spare parts and maintenance support available", "Expert guidance to keep operations running smoothly"] }
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
                const wrapperClass = isYellow ? 'winera-process-card-wrapper-yellow' : 'winera-process-card-wrapper-cyan';
                const iconBg = isYellow ? '#fef9c3' : '#e0f2fe';
                const iconComponent = iconsList[actualIndex % iconsList.length];
                const rawNum = step?.num || `${actualIndex + 1}`;
                const formattedNum = rawNum.length === 1 ? `0${rawNum}` : rawNum;

                return (
                  <div key={idx} className={wrapperClass}>
                    <div className="winera-process-inner-card">
                      {/* Very Large, Bold, Visually Dominant Step Number (Matching FIRST IMAGE) */}
                      <div style={{
                        position: 'absolute',
                        top: '6px',
                        right: '16px',
                        fontSize: '6rem',
                        fontWeight: '900',
                        color: '#f1f5f9',
                        lineHeight: 0.85,
                        letterSpacing: '-2px',
                        pointerEvents: 'none',
                        userSelect: 'none',
                        fontFamily: 'Inter, system-ui, sans-serif'
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
                        marginBottom: '20px',
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
                        {(Array.isArray(step?.points) ? step.points : []).filter(p => p && p.trim() !== '').map((pt, pIdx) => (
                          <li key={pIdx} style={{ fontSize: '13px', color: '#475569', fontWeight: '500', lineHeight: 1.6, display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                            <span style={{ color: isYellow ? '#eab308' : '#00a8ff', fontSize: '14px', fontWeight: '900', marginTop: '-1px' }}>•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              };

              const totalCards = cardList.length;

              if (totalCards % 3 === 0) {
                return (
                  <div className="winera-process-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', width: '100%' }}>
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
        faqList={(Array.isArray(siteData?.faqs) && siteData.faqs.length >= 9) ? siteData.faqs : defaultHomeFaqs}
        title={siteData?.faqsHeader?.title}
        subtitle={siteData?.faqsHeader?.subtitle}
      />

      {/* 15. READY TO GET STARTED CTA BANNER SECTION */}
      <section className="winera-home-cta-section" style={{ padding: '60px 4vw 90px', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{
            backgroundImage: `url(${siteData?.ctaBanner?.bgUrl || homeBlockBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '24px',
            padding: '55px 30px',
            textAlign: 'center',
            color: '#ffffff',
            boxShadow: '0 12px 36px rgba(0,0,0,0.12)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '30px'
          }} className="winera-home-cta-card">
            
            {/* Left Tilted Card Image */}
            <div className="winera-home-cta-left-img" style={{ flexShrink: 0, zIndex: 2 }}>
              <img
                src={homeBlock1}
                alt="Game Zone Experience"
                loading="lazy"
                decoding="async"
                style={{
                  width: '210px',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '16px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                }}
              />
            </div>

            {/* Center Content Area */}
            <div style={{ flex: 1, maxWidth: '680px', zIndex: 2, margin: '0 auto' }}>
              <h2 style={{
                fontSize: '3.2rem',
                fontWeight: '900',
                margin: '0 0 10px 0',
                lineHeight: 1.15,
                letterSpacing: '0.5px'
              }} className="winera-home-cta-h2">
                <span style={{ color: '#ffcd00' }}>READY TO </span>
                <span style={{ color: '#38bdf8' }}>GET STARTED?</span>
              </h2>

              <h3 style={{
                fontSize: '1.6rem',
                fontWeight: '900',
                color: '#ffffff',
                margin: '0 0 16px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                lineHeight: 1.25
              }} className="winera-home-cta-h3">
                {siteData?.ctaBanner?.subtitle || "Start Your Game Zone Journey"}
              </h3>

              <p style={{
                fontSize: '14.5px',
                color: '#cbd5e1',
                lineHeight: 1.6,
                fontWeight: '500',
                margin: '0 auto 28px auto',
                maxWidth: '620px'
              }} className="winera-home-cta-p">
                <span style={{ fontWeight: '700', color: '#ffffff' }}>
                  Game Zones Are India's Fastest Growing Business Are You In?
                </span>
                <br />
                <span>
                  Get expert guidance, custom layout design and complete installation support from India's trusted game zone setup company
                </span>
              </p>

              {/* Offset Rotated Backdrop Button with WhatsApp Icon (Left-Bottom & Right-Top Protrusion) */}
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
                <a
                  href={siteData?.ctaBanner?.buttonLink || siteData?.header?.whatsAppUrl || "https://wa.me/919428989488?text=Hi%20Winera%2C%20I%20want%20to%20talk%20to%20an%20expert"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#ffffff',
                    color: '#0f172a',
                    padding: '10px 24px',
                    borderRadius: '12px',
                    fontWeight: '800',
                    fontSize: '13.5px',
                    textDecoration: 'none',
                    boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
                    transition: 'all 0.25s ease'
                  }}
                  className="winera-cta-btn-hover"
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="#25D366" style={{ display: 'block', flexShrink: 0 }}>
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.486 1.332 5.003L2 22l5.127-1.343c1.46.797 3.107 1.217 4.881 1.217h.004c5.505 0 9.988-4.478 9.989-9.985 0-2.669-1.039-5.178-2.924-7.063C17.192 3.042 14.682 2 12.012 2zm5.824 14.073c-.244.688-1.428 1.32-1.97 1.397-.506.071-1.157.126-3.704-.925-3.08-1.272-5.068-4.398-5.221-4.602-.153-.204-1.246-1.66-1.246-3.166 0-1.506.786-2.247 1.066-2.553.28-.306.611-.382.815-.382.204 0 .408.002.586.01.191.008.446-.073.697.531.255.613.867 2.117.943 2.27.076.153.127.331.025.535-.102.204-.153.331-.306.51-.153.178-.321.398-.459.535-.153.153-.313.319-.135.625.178.306.792 1.306 1.7 2.115 1.169 1.042 2.155 1.365 2.461 1.518.306.153.484.127.663-.076.178-.204.764-.892.968-1.198.204-.306.408-.255.688-.153.28.102 1.784.841 2.09 1.019.306.178.51.255.586.382.076.127.076.739-.168 1.427z"/>
                  </svg>
                  <span>{siteData?.ctaBanner?.buttonText || "Talk to an Expert"}</span>
                </a>
              </div>
            </div>

            {/* Right Tilted Card Image */}
            <div className="winera-home-cta-right-img" style={{ flexShrink: 0, zIndex: 2 }}>
              <img
                src={homeBlock2}
                alt="Game Zone Setup"
                loading="lazy"
                decoding="async"
                style={{
                  width: '210px',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '16px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                }}
              />
            </div>
          </div>
        </div>
      </section>


      {/* 16. FOOTER SECTION */}
      <Footer footerData={footer} />
    </div>
  );
}
