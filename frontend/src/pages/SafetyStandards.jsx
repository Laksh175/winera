import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ShieldCheck } from 'lucide-react';
import yellowStrokeLine from '../assets/yellow-stroke-line.png';
import safetyBg from '../assets/safety-bg.png';
import safetyStandardImg1 from '../assets/safety-standard-img1.png';
import safetyStandardBg2 from '../assets/safety-standard-bg-2.png';
import safetyStandard2 from '../assets/safety-standard-2.png';
import safetyStandardImg3 from '../assets/safety-standard-img3.png';
import hypergridWineraLastblock from '../assets/hypergrid-winera-lastblock.png';
import leftTiltedCard from '../assets/Left Tilted Card.png';
import rightTiltedCard from '../assets/Right Tilted Card.png';

export default function SafetyStandards({ siteData }) {
  const header = siteData?.header || null;
  const footer = siteData?.footer || null;

  const bgImage = siteData?.safetyHero?.bgUrl || safetyBg;
  const introImg = siteData?.safetyIntro?.mainImgUrl || safetyStandardImg1;

  useEffect(() => {
    document.title = siteData?.safetySeo?.pageTitle || "Equipment Safety Standards | Winera International";
    let metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (!metaDescriptionTag) {
      metaDescriptionTag = document.createElement('meta');
      metaDescriptionTag.name = "description";
      document.head.appendChild(metaDescriptionTag);
    }
    metaDescriptionTag.setAttribute("content", siteData?.safetySeo?.metaDescription || "Winera International equipment safety standards, international certifications, commercial-grade materials, and on-site inspection protocols for game zones in India.");
  }, [siteData]);

  return (
    <div style={{ background: '#f5F5F9', color: '#0f172a', minHeight: '100vh', fontFamily: 'Montserrat, sans-serif', overflowX: 'hidden' }}>
      {/* 1. HEADER */}
      <Header headerData={header} />

      {/* 2. HERO BANNER SECTION (MATCHING 1:1 SCREENSHOT UI) */}
      <section className="winera-safety-hero-section" style={{
        position: 'relative',
        width: '100%',
        paddingTop: '210px',
        paddingBottom: '75px',
        background: `url(${bgImage}) center top / 100% 100% no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          {/* Centered Single Line Heading: Home › Safety Standards */}
          <h1 className="winera-safety-hero-h1" style={{
            fontSize: '2.8rem',
            fontWeight: '900',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            margin: 0,
            lineHeight: 1.2,
            textAlign: 'center'
          }}>
            <a href="/" style={{ color: '#ffffff', textDecoration: 'none' }}>Home</a>
            <span style={{ color: '#ffffff', fontWeight: '400' }}>&rsaquo;</span>
            <span style={{ color: '#ffcd00', fontWeight: '900' }}>
              {siteData?.safetyHero?.breadcrumbText || "Safety Standards"}
            </span>
          </h1>
        </div>
      </section>

      {/* 3. GAME ZONE & KIDS PLAY EQUIPMENT SAFETY STANDARDS BLOCK (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-safety-intro-section" style={{ padding: '80px 4vw', background: '#F5F5F9', overflow: 'hidden' }}>
        <div className="winera-safety-intro-grid" style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.15fr 1fr',
          gap: '50px',
          alignItems: 'center'
        }}>
          {/* Left Collage Graphic Column */}
          <div className="winera-safety-intro-img" style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <img
              src={introImg}
              alt="Game Zone & Kids Play Equipment Safety Standards"
              style={{
                width: '100%',
                maxWidth: '640px',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>

          {/* Right Text Content Column */}
          <div className="winera-safety-intro-text">
            {/* Yellow Accent Stroke Line */}
            <div style={{ position: 'relative', display: 'block', marginBottom: '16px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', maxWidth: '100%', width: '320px', height: '10px', marginBottom: '12px', objectFit: 'fill' }}
              />
              <h2 style={{ fontSize: '2.7rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                {siteData?.safetyIntro?.titleLine1 || "Game Zone & Kids Play"}<br />
                <span style={{ color: '#38bdf8' }}>{siteData?.safetyIntro?.titleLine2 || "Equipment Safety Standards"}</span>
              </h2>
            </div>

            {/* Paragraph 1 */}
            <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', marginBottom: '20px' }}>
              {siteData?.safetyIntro?.p1 || "When you invest in a game zone or family entertainment center, the safety of your equipment protects your visitors, your reputation, and your investment. At Winera International, product safety and quality is our highest priority. Every product we supply — from arcade games to trampoline parks and climbing walls is certified to international safety standards for commercial, high-footfall use, and every venue is installed by our own trained team and inspected on-site before handover."}
            </p>

            {/* Paragraph 2 */}
            <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0 }}>
              {siteData?.safetyIntro?.p2 || "As a complete game zone developer, our safety commitment covers four areas: the attractions themselves, the materials they're made of, the electrical systems that power them, and the structure and operation of the finished venue."}
            </p>
          </div>
        </div>
      </section>

      {/* 4. PLAY & ATTRACTION EQUIPMENT SAFETY SECTION (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-safety-standards-section" style={{ padding: '40px 4vw 90px', background: '#F5F5F9' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Centered Header */}
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 45px' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'inline-block', maxWidth: '100%', width: '280px', height: '8px', marginBottom: '10px', objectFit: 'fill' }}
            />
            <h2 className="winera-safety-standards-h2" style={{
              fontSize: '2.6rem',
              fontWeight: '900',
              color: '#0f172a',
              margin: '0 0 12px',
              lineHeight: 1.2,
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}>
              <span>Play &amp; Attraction</span>
              <span style={{ color: '#38bdf8' }}>Equipment Safety</span>
            </h2>
            <p style={{
              fontSize: '14.5px',
              color: '#64748b',
              fontWeight: '500',
              margin: 0,
              lineHeight: 1.6
            }}>
              These standards make sure every attraction people play on is safe by design.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="winera-safety-standards-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {(Array.isArray(siteData?.safetyCertifications?.cards) && siteData.safetyCertifications.cards.length > 0
              ? siteData.safetyCertifications.cards
              : [
                {
                  title: "EN 1176 — Play Structures & Ninja Courses (Europe)",
                  desc: "EN 1176 is the European Standard for Playground Equipment, published by CEN. It sets safety requirements for structural strength, heights, gaps, and entrapment protection so children play without hidden risks. Winera International supplies and installs soft play and ninja course equipment that complies with EN 1176 — helping your venue pass inspections."
                },
                {
                  title: "EN 1177 — Impact-Absorbing Surfaces (Europe)",
                  desc: "EN 1177 is the European Standard for playground impact-absorbing surfaces, published by CEN. It defines how flooring must cushion falls, setting critical fall heights for different materials to reduce injury. Winera International supplies installs safety flooring around play, ninja, and climbing areas that complies with EN 1177 — keeping falls safe."
                },
                {
                  title: "ASTM F1918 — Soft Contained Play (International)",
                  desc: "ASTM F1918 is the Standard Safety Performance Specification for Soft Contained Play Equipment, published by ASTM International. It sets safety rules for enclosed, padded play structures used in indoor kids zones, covering design, padding, and fall protection. Winera International supplies and installs soft play equipment that complies with ASTM F1918 — helping your venue pass inspections."
                },
                {
                  title: "ASTM F2970 — Trampoline Parks (International)",
                  desc: "ASTM F2970 is the international Standard Practice for Trampoline Courts, published by ASTM International. It sets safety requirements for net enclosures, frame padding, spacing, and impact zones to prevent falls and collisions. Winera International supplies and installs trampoline parks certified to ASTM F2970 — helping your venue stay safe and pass inspections."
                },
                {
                  title: "EN 12572 — Climbing Walls (Europe)",
                  desc: "EN 12572 is the European Standard for artificial climbing structures, published by CEN. It sets safety requirements for wall stability, holds, heights, anchor points, and fall zones so climbers stay protected. Winera International supplies and installs wall climbing setups that comply with EN 12572 — helping your venue meet safety standards and pass inspections."
                },
                {
                  title: "IS 15475 & IS 15492 — Amusement Rides (India / BIS)",
                  desc: "IS 15475 and IS 15492 are Indian Standards published by the Bureau of Indian Standards (BIS). They set safety rules for the design, construction, and operation of amusement rides and devices in India. Winera International supplies amusement park rides and bumper cars that follow these BIS standards — keeping your venue compliant."
                },
                {
                  title: "EN 13814 / ISO 17842 — Amusement Devices (International)",
                  desc: "EN 13814 and ISO 17842 are the international standards for amusement rides and devices, developed by CEN and ISO. They set safety requirements for the design, manufacturing, and operation of rides. Winera International supplies bumper cars and amusement park attractions that comply with these standards — ensuring safe, reliable operation in high-footfall venues."
                }
              ]
            ).map((card, idx, arr) => {
              const isLastOdd = (arr.length % 2 !== 0) && (idx === arr.length - 1);
              return (
                <div
                  key={idx}
                  className={`winera-safety-card ${isLastOdd ? 'winera-safety-card-wide' : ''}`}
                  style={{
                    gridColumn: isLastOdd ? '1 / -1' : 'auto',
                    maxWidth: isLastOdd ? '680px' : '100%',
                    width: '100%',
                    margin: isLastOdd ? '0 auto' : '0',
                    background: 'linear-gradient(180deg, #d3ebff 0%, #ffffff 100%)',
                    borderRadius: '18px',
                    padding: '30px 32px',
                    textAlign: 'center',
                    boxShadow: '0 8px 24px rgba(0, 174, 239, 0.08)'
                  }}
                >
                  <h3 style={{
                    fontSize: '1.15rem',
                    fontWeight: '800',
                    color: '#0f172a',
                    marginBottom: '12px',
                    lineHeight: 1.35
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    fontSize: '14.5px',
                    color: '#475569',
                    lineHeight: 1.6,
                    fontWeight: '500',
                    margin: 0
                  }}>
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. MATERIAL & FIRE SAFETY SECTION (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-safety-material-section" style={{
        position: 'relative',
        width: '100%',
        padding: '80px 4vw 90px',
        background: `url(${safetyStandardBg2}) center center / 100% 100% no-repeat`,
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Header (Left Aligned matching Image 2) */}
          <div style={{ textAlign: 'left', maxWidth: '820px', margin: '0 0 35px 0' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'block', maxWidth: '100%', width: '280px', height: '8px', marginBottom: '10px', objectFit: 'fill', marginLeft: 0 }}
            />
            <h2 className="winera-safety-material-h2" style={{
              fontSize: '2.8rem',
              fontWeight: '900',
              color: '#0f172a',
              margin: '0 0 12px',
              lineHeight: 1.2,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '8px 12px',
              textAlign: 'left'
            }}>
              <span style={{ color: '#38bdf8' }}>{siteData?.safetyMaterials?.title1 || "Material &"}</span>
              <span>{siteData?.safetyMaterials?.title2 || "Fire Safety"}</span>
            </h2>
            <p style={{
              fontSize: '14.5px',
              color: '#64748b',
              fontWeight: '500',
              margin: 0,
              lineHeight: 1.6,
              maxWidth: '820px',
              textAlign: 'left'
            }}>
              {siteData?.safetyMaterials?.subtitle || "These standards make sure everything is made from safe materials that don't catch fire easily and are not harmful to touch which is also a legal rule for game zones in India."}
            </p>
          </div>

          {/* 2-Column Grid: Left 4 Wide Rectangle Cards, Right 3D Shield Graphic */}
          <div className="winera-safety-material-grid">
            {/* Left 4 Wide Rectangle Cards Stack */}
            <div className="winera-safety-material-cards">
              {(Array.isArray(siteData?.safetyMaterials?.cards) && siteData.safetyMaterials.cards.length > 0
                ? siteData.safetyMaterials.cards
                : [
                  {
                    title: "Fire-Safe Materials (India)",
                    desc: "In India, game zone materials must not catch fire easily. The padding, nets, and finishes we use are fire-safe, so they slow down flames instead of feeding them. This keeps your visitors safer and helps your venue follow the law."
                  },
                  {
                    title: "NFPA 701 & UL 94 — Fire Safety (International)",
                    desc: "These two tests check how well materials resist fire. NFPA 701 tests cloth and nets, and UL 94 tests plastic parts, to make sure they don't burn quickly. The materials we use pass these fire-safety tests."
                  },
                  {
                    title: "EN 71 — Safe Play Materials (Europe)",
                    desc: "EN 71 is a European rule that makes sure play materials are safe for children. It checks that they don't catch fire easily and don't contain harmful chemicals. Our kids' equipment meets the EN 71 standard."
                  },
                  {
                    title: "EU REACH & CPSIA — Non-Toxic Materials",
                    desc: "These rules keep harmful chemicals, lead, and other unsafe substances out of children's products. The materials in our kids' equipment follow these rules, so they are safe for kids to touch and play on."
                  }
                ]
              ).map((card, idx) => (
                <div key={idx} className="winera-safety-card winera-safety-rect-card" style={{
                  background: 'linear-gradient(180deg, #d3ebff 0%, #ffffff 100%)',
                  borderRadius: '18px',
                  padding: '20px 28px',
                  textAlign: 'left',
                  width: '100%',
                  boxShadow: '0 8px 24px rgba(0, 174, 239, 0.08)'
                }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '800',
                    color: '#0f172a',
                    marginBottom: '6px',
                    lineHeight: 1.3,
                    textAlign: 'left'
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    fontSize: '14.5px',
                    color: '#475569',
                    lineHeight: 1.55,
                    fontWeight: '500',
                    margin: 0,
                    textAlign: 'left'
                  }}>
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Right 3D Shield Collage Image */}
            <div className="winera-safety-material-img">
              <img
                src={siteData?.safetyMaterials?.imgUrl || safetyStandard2}
                alt="Material & Fire Safety"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. ELECTRICAL & MACHINE SAFETY SECTION (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-safety-electrical-section" style={{
        position: 'relative',
        width: '100%',
        padding: '80px 4vw 90px',
        background: '#f8fafc',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Left Aligned Header */}
          <div style={{ textAlign: 'left', maxWidth: '820px', margin: '0 0 40px 0' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'block', maxWidth: '100%', width: '280px', height: '8px', marginBottom: '10px', objectFit: 'fill', marginLeft: 0 }}
            />
            <h2 className="winera-safety-electrical-h2" style={{
              fontSize: '2.8rem',
              fontWeight: '900',
              color: '#0f172a',
              margin: '0 0 12px',
              lineHeight: 1.2,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '8px 12px',
              textAlign: 'left'
            }}>
              <span>{siteData?.safetyElectrical?.title1 || "Electrical &"}</span>
              <span style={{ color: '#38bdf8' }}>{siteData?.safetyElectrical?.title2 || "Machine Safety"}</span>
            </h2>
            <p style={{
              fontSize: '14.5px',
              color: '#64748b',
              fontWeight: '500',
              margin: 0,
              lineHeight: 1.6,
              maxWidth: '720px',
              textAlign: 'left'
            }}>
              {siteData?.safetyElectrical?.subtitle || "These rules make sure all machines that run on electricity are safe to use — like arcade games, VR, laser tag, bumper cars, hypergrid, bowling, and rides."}
            </p>
          </div>

          {/* 2-Column Grid: Left Numbered List Items, Right Image */}
          <div className="winera-safety-electrical-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
            gap: '40px',
            alignItems: 'center'
          }}>
            {/* Left Numbered List Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {(Array.isArray(siteData?.safetyElectrical?.items) && siteData.safetyElectrical.items.length > 0
                ? siteData.safetyElectrical.items
                : [
                  {
                    num: "1",
                    title: "CE Marking — European Safety Mark",
                    desc: "The CE mark means a machine has passed Europe's health and safety checks. It shows the product is safe to use. Our arcade games, VR systems, laser tag, hypergrid, and bumper cars all carry the CE mark."
                  },
                  {
                    num: "2",
                    title: "RoHS — Safe Electronics",
                    desc: "RoHS makes sure machines are not made with harmful materials inside their electronics. This keeps them safer and cleaner to use. All our electronic machines are RoHS-safe."
                  },
                  {
                    num: "3",
                    title: "IS / IEC — Electrical Safety Rules (India & International)",
                    desc: "These rules make sure the wiring and power setup of every machine is safe. Our equipment — bowling pinsetters, scoring screens, VR, arcade games, and LED hypergrid floors — follows both Indian and international electrical safety rules for safe wiring, earthing, and power."
                  }
                ]
              ).map((item, idx) => (
                <div key={idx} style={{ textAlign: 'left' }}>
                  {/* Badge + Title Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: '#38bdf8',
                      color: '#ffffff',
                      fontWeight: '800',
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {item.num}
                    </div>
                    <h3 style={{
                      fontSize: '1.15rem',
                      fontWeight: '800',
                      color: '#0f172a',
                      margin: 0,
                      lineHeight: 1.3,
                      textAlign: 'left'
                    }}>
                      {item.title}
                    </h3>
                  </div>
                  {/* Description Paragraph */}
                  <p style={{
                    fontSize: '14.5px',
                    color: '#475569',
                    lineHeight: 1.6,
                    fontWeight: '500',
                    margin: 0,
                    paddingLeft: 0,
                    textAlign: 'left',
                    maxWidth: '650px'
                  }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Graphic Image */}
            <div className="winera-safety-electrical-img" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={siteData?.safetyElectrical?.imgUrl || safetyStandardImg3}
                alt="Electrical & Machine Safety"
                style={{
                  width: '100%',
                  maxWidth: '560px',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '16px'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. STRUCTURE, INSTALLATION & OPERATIONAL SAFETY SECTION (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-safety-structure-section" style={{
        position: 'relative',
        width: '100%',
        padding: '90px 4vw 100px',
        background: '#ffffff',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Centered Header */}
          <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto 55px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'block', maxWidth: '100%', width: '320px', height: '9px', marginBottom: '12px', objectFit: 'fill' }}
            />
            <h2 className="winera-safety-structure-h2" style={{
              fontSize: '2.8rem',
              fontWeight: '900',
              color: '#0f172a',
              margin: '0 0 14px',
              lineHeight: 1.2,
              textAlign: 'center'
            }}>
              <span style={{ color: '#38bdf8' }}>{siteData?.safetyStructure?.title1 || "Structure, Installation & "}</span>
              <span style={{ color: '#0f172a' }}>{siteData?.safetyStructure?.title2 || "Operational Safety"}</span>
            </h2>
            <p style={{
              fontSize: '14.5px',
              color: '#64748b',
              fontWeight: '500',
              margin: '0 auto',
              lineHeight: 1.6,
              maxWidth: '800px',
              textAlign: 'center'
            }}>
              {siteData?.safetyStructure?.subtitle || "These standards make sure the finished venue is strong, set up correctly, and safe to run every day — and ready to pass the local safety check needed for a licence."}
            </p>
          </div>

          {/* 3 Blocks Per Row Grid with Offset Colored Borders */}
          <div className="winera-safety-structure-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px 28px',
            alignItems: 'stretch'
          }}>
            {(Array.isArray(siteData?.safetyStructure?.cards) && siteData.safetyStructure.cards.length > 0
              ? siteData.safetyStructure.cards
              : [
                {
                  num: "01",
                  accent: "#00aeef",
                  title: "Strong and Stable Setup (India)",
                  desc: "In India, a game zone must pass a check for strong, stable structure before it can get a licence. We build and fix everything properly so your venue is ready to pass that check. This matters most for climbing walls, ninja courses, trampolines, and rides, where the structure has to hold real weight safely."
                },
                {
                  num: "02",
                  accent: "#ffd600",
                  title: "Quality Checks (ISO 9001)",
                  desc: "ISO 9001 is a worldwide standard for good quality work. It makes sure the design, sourcing, and installation are done to a consistent, high standard every time. We follow these quality practices in all our projects."
                },
                {
                  num: "03",
                  accent: "#00aeef",
                  title: "Full Safety Check Before Handover",
                  desc: "Good equipment alone is not enough. Once all the games and machines are installed, our trained team runs a full safety check on the complete setup. We hand it over only after everything passes."
                },
                {
                  num: "04",
                  accent: "#ffd600",
                  title: "Safe Running & Maintenance (ISO 17842-2 / EN 13814-2)",
                  desc: "These standards are about running and looking after the attractions safely after they are built. We set up your venue the right way and show your team how to run and maintain each attraction safely."
                }
              ]
            ).map((card, idx) => (
              <div key={idx} style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                paddingTop: '12px',
                paddingLeft: '12px'
              }}>
                {/* Accent Offset Colored Backing (Stops at ~68% width on top, ~82% height on left) */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '68%',
                  height: '82%',
                  background: card.accent || '#00aeef',
                  borderRadius: '28px 20px 20px 28px',
                  zIndex: 1
                }} />

                {/* Main White Card Box */}
                <div style={{
                  position: 'relative',
                  zIndex: 2,
                  background: '#ffffff',
                  borderRadius: '24px',
                  padding: '28px 22px',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
                  overflow: 'hidden'
                }}>
                  {/* Top Header Row: Small Icon Badge Left, Giant Watermark Number Right */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: '#d8eefd',
                      color: '#0284c7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <ShieldCheck size={22} strokeWidth={2.2} />
                    </div>
                    <span className="winera-safety-watermark-num" style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '8.6rem',
                      fontWeight: '800',
                      color: '#f0f3f7',
                      lineHeight: 0.9,
                      letterSpacing: '-2px',
                      userSelect: 'none',
                      marginTop: '-6px',
                      marginRight: '-4px'
                    }}>
                      {card.num}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 style={{
                    fontSize: '1.08rem',
                    fontWeight: '800',
                    color: '#0f172a',
                    marginBottom: '8px',
                    lineHeight: 1.35,
                    textAlign: 'left'
                  }}>
                    {card.title}
                  </h3>

                  {/* Card Description */}
                  <p style={{
                    fontSize: '10.5px',
                    color: '#64748b',
                    lineHeight: 1.55,
                    fontWeight: '500',
                    margin: 0,
                    textAlign: 'left'
                  }}>
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHY THIS MATTERS FOR YOUR BUSINESS + CTA SECTION */}
      <section className="winera-safety-why-matters-section" style={{
        position: 'relative',
        width: '100%',
        padding: '80px 4vw 90px',
        background: '#f8fafc',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Centered Header */}
          <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 45px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'block', maxWidth: '100%', width: '280px', height: '8px', marginBottom: '12px', objectFit: 'fill' }}
            />
            <h2 className="winera-safety-why-h2" style={{
              fontSize: '2.8rem',
              fontWeight: '900',
              color: '#0f172a',
              margin: '0 0 16px',
              lineHeight: 1.2,
              textAlign: 'center'
            }}>
              <span style={{ color: '#38bdf8' }}>{siteData?.safetyWhyMatters?.title1 || "Why This Matters "}</span>
              <span style={{ color: '#0f172a' }}>{siteData?.safetyWhyMatters?.title2 || "for Your Business"}</span>
            </h2>
            <p style={{
              fontSize: '14.5px',
              color: '#64748b',
              fontWeight: '500',
              margin: '0 auto',
              lineHeight: 1.65,
              maxWidth: '840px',
              textAlign: 'center'
            }}>
              {siteData?.safetyWhyMatters?.subtitle || "Good, certified equipment is a smart investment. It keeps visitors safe, protects your money, and helps you get your licence easier. In India, every game zone must pass checks for strong structure, fire safety, and electrical safety before it can open. Because we supply you certified equipment, fire-safe materials, and proper installation, your game zone is ready to pass these checks. The result: you open on time, stay within the rules, and win the trust of every family."}
            </p>
          </div>

          {/* BUILD YOURS NOW CTA BANNER (MATCHING SCREENSHOT 1:1) */}
          <div className="winera-cta-banner-container" style={{
            maxWidth: '1240px',
            margin: '0 auto',
            position: 'relative',
            backgroundImage: `url(${hypergridWineraLastblock})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            borderRadius: '24px',
            padding: '55px 20px',
            minHeight: '340px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            overflow: 'hidden'
          }}>
            {/* Dark Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(8, 12, 22, 0.75)',
              zIndex: 1
            }}></div>

            {/* Left Tilted Card Image (Using rightTiltedCard asset matching screenshot) */}
            <img
              src={rightTiltedCard}
              alt="Build Yours Now Left"
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                maxHeight: '96%',
                maxWidth: '28%',
                objectFit: 'contain',
                zIndex: 2,
                filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.6))'
              }}
            />

            {/* Right Tilted Card Image (Using leftTiltedCard asset matching screenshot) */}
            <img
              src={leftTiltedCard}
              alt="Build Yours Now Right"
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                maxHeight: '96%',
                maxWidth: '28%',
                objectFit: 'contain',
                zIndex: 2,
                filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.6))'
              }}
            />

            {/* Center Content Box */}
            <div style={{ position: 'relative', zIndex: 3, maxWidth: '720px', padding: '0 20px' }}>
              <h2 style={{
                fontSize: '3rem',
                fontWeight: '900',
                margin: '0 0 24px',
                lineHeight: 1.15,
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                <span style={{ color: '#facc15' }}>{siteData?.safetyWhyMatters?.ctaTitle1 || "BUILD "}</span>
                <span style={{ color: '#38bdf8' }}>{siteData?.safetyWhyMatters?.ctaTitle2 || "YOURS NOW"}</span>
              </h2>

              {/* Cyan Offset Backdrop Button Wrapper (Matching Image 2 100%) */}
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div style={{
                  position: 'absolute',
                  top: '-4px',
                  bottom: '-3px',
                  left: '-6px',
                  right: '-5px',
                  background: '#38bdf8',
                  borderRadius: '18px',
                  transform: 'rotate(-1.5deg)',
                  zIndex: 1
                }} />
                <a
                  href={siteData?.safetyWhyMatters?.buttonLink || "https://wa.me/919428989488"}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    background: '#ffcd00',
                    color: '#0f172a',
                    fontSize: '15px',
                    fontWeight: '900',
                    padding: '14px 34px',
                    borderRadius: '16px',
                    display: 'inline-block',
                    textDecoration: 'none'
                  }}
                >
                  {siteData?.safetyWhyMatters?.buttonText || "Talk to an ROI Expert"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer footerData={footer} />
    </div>
  );
}
