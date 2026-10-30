import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import projectPageMobileBanner from '../assets/project-page-mobile-banner.png';
import { sanitizeAndFormatHtml } from './BlogDetail';
const aboutHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345516/winera_uploads/c3mm4hffgjiimryiq4et.png";
const gameZoneMobileBanner = projectPageMobileBanner;

const getValidImageUrl = (url, fallback) => {
  if (!url || typeof url !== 'string' || url.trim() === '' || url.includes('/src/assets/') || url.includes('eqjkboeokagpaus2ifxa')) {
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

const renderTitleMarkup = (rawText, defaultText, highlightColor = '#ffcd00') => {
  let text = rawText || defaultText;
  if (!text) return null;

  text = text.replace(/([^\s>])(<br\s*\/?>)/gi, '$1 $2').replace(/(<br\s*\/?>)([^\s<])/gi, '$1 $2');
  const parts = text.split(/\*{1,2}(.*?)\*{1,2}/gs);

  return parts.map((part, pIdx) => {
    const isHighlighted = pIdx % 2 === 1;
    if (isHighlighted) {
      return (
        <span key={pIdx} style={{ color: highlightColor }}>
          {part}
        </span>
      );
    }
    return <span key={pIdx}>{part}</span>;
  });
};

export default function TermsAndConditions({ siteData }) {
  const [isPhone, setIsPhone] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsPhone(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const header = siteData?.header || {};
  const footer = siteData?.footer || {};
  const termsHero = siteData?.termsHero || {};
  const heroBg = getValidImageUrl(termsHero.bgUrl, aboutHeroBg);
  const mobileHeroBg = getValidImageUrl(termsHero.mobileBgUrl, gameZoneMobileBanner);
  const bgAlt = termsHero.bgAlt || "Terms & Conditions - Winera International";
  const mobileBgAlt = termsHero.mobileBgAlt || termsHero.bgAlt || "Terms & Conditions Mobile Banner - Winera International";
  const heroTitle = termsHero.title || "Terms & *Conditions*";
  const breadcrumbHome = termsHero.breadcrumbHome || "Home";
  const breadcrumbText = termsHero.breadcrumbText || "Terms & Conditions";

  const termsSeo = siteData?.termsSeo || {
    pageTitle: "Terms & Conditions | Winera International Pvt. Ltd.",
    metaDescription: "Read Winera International's Terms & Conditions outlining guidelines, responsibilities, project process, warranty, and legal agreements."
  };

  useEffect(() => {
    document.title = termsSeo.pageTitle || termsSeo.title || "Terms & Conditions | Winera International Pvt. Ltd.";
    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'description');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', termsSeo.metaDescription || termsSeo.description || "Read Winera International's Terms & Conditions outlining guidelines, responsibilities, project process, warranty, and legal agreements.");
  }, [termsSeo]);

  const defaultSections = [
    {
      number: "1",
      title: "About Winera International Pvt. Ltd.",
      intro: "Winera International Pvt. Ltd., incorporated under the Companies Act, 1956, with registered office at 1011, 10th floor, Millennium Business Hub, opp., Bhagavan Nagar, Sarthana Jakat Naka, Nature Park and Zoo, Nana Varachha, Surat, Gujarat 395006, India, is a leading B2B turnkey entertainment solutions provider. Our services include:",
      bulletsText: [
        "Indoor soft play zones",
        "Trampoline parks and ninja courses",
        "Arcade and video game machine installations",
        "VR/AR entertainment zones",
        "Bowling alleys, bumper cars, laser tag setups",
        "Customized commercial play and recreation areas"
      ]
    },
    {
      number: "2",
      title: "Scope of Agreement",
      content: [
        "These Terms apply to all interactions, transactions, proposals, quotations, and contracts made through the Site or directly with the Company. These Terms do not override signed project-specific contracts; however, in case of conflict, the mutually signed agreement shall take precedence."
      ]
    },
    {
      number: "3",
      title: "Use of the Website",
      bulletsText: [
        "You agree to access this Site lawfully and only for legitimate business purposes.",
        "Unauthorized use of this Site may give rise to claims for damages and/or be a criminal offense.",
        "You may not attempt to gain unauthorized access to our systems or data, use this Site to copy, store, transmit, or distribute malicious software, or scrape, crawl, or collect user data without permission."
      ]
    },
    {
      number: "4",
      title: "Quotations, Proposals & Pricing",
      bulletsText: [
        "All quotations are non-binding until confirmed through a signed purchase/work order.",
        "Quotes are valid for 30 days unless otherwise stated in writing.",
        "All pricing is in Indian Rupees (INR) and exclusive of applicable taxes, duties, and levies.",
        "Price revisions may occur due to changes in raw material costs, design alterations, or import duties."
      ]
    },
    {
      number: "5",
      title: "Project Process & Order Confirmation",
      intro: "Projects commence only after receiving signed approval on quotation/design/BOQ and advance payment as per agreed terms.",
      bulletsText: [
        "The project is broken into phases: Design → Production → Dispatch → Installation → Handover.",
        "Project-specific responsibilities (like flooring, lighting, or electrical setup) must be completed by the client before installation begins."
      ]
    },
    {
      number: "6",
      title: "Payment Terms",
      intro: "Unless otherwise specified, standard payment milestones are:",
      bulletsText: [
        "50% of the total project value is payable in advance.",
        "40% before shipment or dispatch from factory.",
        "10% upon final handover and acceptance.",
        "No shipment or site work will begin without receipt of due payments.",
        "Delay in payment will lead to additional storage, demurrage, or interest charges (typically 1.5% per month).",
        "Payments must be made to official bank accounts listed on company invoices."
      ]
    },
    {
      number: "7",
      title: "Delivery & Logistics",
      bulletsText: [
        "Delivery timelines are indicative and commence only after design approval and advance receipt.",
        "Unexpected delays (strikes, customs clearance, shipping issues, etc.) will be communicated but shall not be grounds for penalty unless otherwise agreed.",
        "Risk of goods passes to the client upon dispatch from our warehouse.",
        "Insurance, if required, must be arranged by the client or requested in writing."
      ]
    },
    {
      number: "8",
      title: "Installation & Site Readiness",
      intro: "Winera provides installation services as part of turnkey projects.",
      bulletsText: [
        "Client responsibilities: Ensure access to the site during business hours, provide civil-ready conditions (flooring, walls, electric points, etc.), and provide accommodation or local logistics for installation crew in remote locations (as per mutual agreement).",
        "Any re-visits or delays due to client-side unpreparedness will be chargeable."
      ]
    },
    {
      number: "9",
      title: "Warranty & Maintenance",
      intro: "A standard 12-month manufacturer’s warranty is provided from date of installation.",
      bullets: [
        { label: "Coverage includes", text: "Structural integrity, weld failures, and manufacturing defects in supplied components." },
        { label: "Exclusions include", text: "Misuse, vandalism, natural disasters, water/fire/electrical damage, third-party installations or repairs, and consumables / wear-and-tear parts (nets, ropes, foam padding, etc.)." },
        { label: "AMC", text: "Post-warranty AMC (Annual Maintenance Contract) is available for a fee." }
      ]
    },
    {
      number: "10",
      title: "Design, Drawing & Intellectual Property",
      bulletsText: [
        "All designs, layouts, 3D renders, and proposals remain the intellectual property of Winera unless transferred by written agreement.",
        "No reuse, reproduction, or sharing is permitted without our written consent.",
        "Breach of this clause may result in legal action and claims for damages."
      ]
    },
    {
      number: "11",
      title: "Modifications & Customization",
      bulletsText: [
        "Clients may request minor customizations post-design approval; these will be accommodated if feasible.",
        "Major changes post-approval may involve additional cost and timeline revisions.",
        "Requests must be made in writing and approved by both parties."
      ]
    },
    {
      number: "12",
      title: "Cancellation & Refund Policy",
      bulletsText: [
        "Cancellation before production begins will attract a minimum 10% administrative fee.",
        "Once manufacturing or procurement has commenced, no refund will be issued.",
        "Refunds (where applicable) will be processed within 30 working days after due verification."
      ]
    },
    {
      number: "13",
      title: "Limitation of Liability",
      intro: "Winera shall not be liable for indirect or consequential losses, loss of business, revenue, or reputation, or delays due to force majeure or third-party vendors.",
      content: [
        "Maximum liability is capped at the total value of the product/service provided in the dispute."
      ]
    },
    {
      number: "14",
      title: "Subcontractors & Third Parties",
      content: [
        "We may use subcontractors or third-party service providers for part of the project (e.g., transport, electrical work). While we take care in selection, Winera is not liable for direct performance of subcontractors unless contractually stated."
      ]
    },
    {
      number: "15",
      title: "Confidentiality & Data Protection",
      bulletsText: [
        "All discussions, documents, drawings, client lists, and pricing details shared between Winera and the client are confidential.",
        "Each party agrees to use such data only for the intended project and not disclose to third parties without consent.",
        "Winera maintains strict cybersecurity and GDPR-compliant (where applicable) data handling protocols."
      ]
    },
    {
      number: "16",
      title: "Force Majeure",
      content: [
        "Winera shall not be liable for failure or delay in performance due to causes beyond its reasonable control, including but not limited to acts of God, war, fire, pandemics, strikes, shipping delays, embargoes, or government orders."
      ]
    },
    {
      number: "17",
      title: "Termination",
      subtitle: "Winera reserves the right to terminate any contract if:",
      bulletsText: [
        "The client breaches material terms of the agreement.",
        "Payments are withheld or delayed beyond agreed terms.",
        "The client is found engaging in fraudulent, unethical, or harmful business practices."
      ]
    },
    {
      number: "18",
      title: "Governing Law & Jurisdiction",
      bulletsText: [
        "These Terms shall be governed by and construed in accordance with the laws of the Republic of India.",
        "Any disputes or legal claims shall be subject to the exclusive jurisdiction of the courts in Surat, Gujarat."
      ]
    },
    {
      number: "19",
      title: "Revisions and Updates",
      content: [
        "These Terms may be updated periodically to reflect changes in law or business operations. Continued use of the Site or Services after updates will constitute acceptance of the revised Terms."
      ]
    }
  ];

  const sections = (siteData?.termsSections && siteData.termsSections.length > 0) ? siteData.termsSections : defaultSections;

  return (
    <div style={{ background: '#F5F5F9', color: '#0f172a', minHeight: '100vh', fontFamily: "'Open Sans', sans-serif" }}>
      <Header headerData={header} />

      {/* Hero Header Section matching AboutUs.jsx */}
      <section className="winera-terms-hero-section" style={{
        position: 'relative',
        width: '100%',
        minHeight: 'auto',
        aspectRatio: isPhone ? '941 / 550' : 'auto',
        paddingTop: isPhone ? '55px' : '165px',
        paddingBottom: isPhone ? '0px' : '50px',
        background: isPhone ? `url(${mobileHeroBg}) center top / 100% 100% no-repeat` : `url(${heroBg}) center/100% 100% no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff',
        overflow: 'hidden'
      }}>
        {/* SEO crawler discoverable image with alt text */}
        <img
          src={isPhone ? mobileHeroBg : heroBg}
          alt={isPhone ? mobileBgAlt : bgAlt}
          style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}
          loading="lazy"
          decoding="async"
        />
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          {isPhone ? (
            <span className="winera-terms-hero-h1" style={{
              fontSize: '1.15rem',
              fontWeight: '800',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '6px',
              margin: 0,
              lineHeight: 1.2,
              textAlign: 'center',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)'
            }}>
              <a href="/" style={{ color: '#ffffff', textDecoration: 'none' }}>{breadcrumbHome}</a>
              <span style={{ color: '#ffffff', fontWeight: '400' }}>&rsaquo;</span>
              <span style={{ color: '#ffcd00', fontWeight: '900' }}>{breadcrumbText}</span>
            </span>
          ) : (
            <>
              <h1 style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-1px', marginBottom: '8px', lineHeight: 1.15 }}>
                {renderTitleMarkup(heroTitle, 'Terms & <span style="color: #ffcd00">Conditions</span>')}
              </h1>
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', opacity: 0.9, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <a href="/" style={{ color: '#ffffff', textDecoration: 'none' }}>{breadcrumbHome}</a>
                <span style={{ color: '#ffcd00' }}>&gt;</span>
                <span style={{ color: '#ffffff' }}>{breadcrumbText}</span>
              </p>
            </>
          )}
        </div>
      </section>

      {/* Main Content Container */}
      <section style={{ padding: isPhone ? '35px 5vw 60px' : '55px 4vw 90px', width: '100%' }}>
        <div className="winera-terms-content-container" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          textAlign: 'left'
        }}>

          {/* Preamble */}
          <div style={{ marginBottom: '36px', paddingBottom: '24px', borderBottom: '1.5px solid #e2e8f0' }}>
            <h2 className="winera-terms-preamble-title" style={{
              fontSize: isPhone ? '1.35rem' : '1.85rem',
              fontWeight: '900',
              color: '#0f172a',
              margin: '0 0 12px',
              lineHeight: 1.3,
              letterSpacing: '-0.3px'
            }}>
              Winera International Pvt. Ltd.
            </h2>
            <p style={{ fontSize: isPhone ? '15px' : '16px', color: '#334155', lineHeight: 1.85, margin: 0, fontWeight: '400' }}>
              These Terms and Conditions (“Agreement”, “Terms”) govern your (“you”, “your”, “client”, “customer”) access to and use of the website <a href="https://www.winera.in" target="_blank" rel="noreferrer" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>www.winera.in</a> (the “Site”), and the products and services (“Services”) offered by Winera International Pvt. Ltd. (“Company”, “Winera”, “we”, “our”, or “us”). By accessing or using our Site and/or Services, you agree to be legally bound by these Terms. If you do not agree, please do not use this Site or engage with our services.
            </p>
          </div>

          {/* Render Sections 1 to 20 */}
          {sections.map((sec, idx) => {
            const isContact = sec.isContactBox || sec.number === "20" || (sec.title && sec.title.toLowerCase().includes('contact'));
            if (isContact) {
              return (
                <div key={idx} style={{
                  background: '#f8fafc',
                  border: '1.5px solid #cbd5e1',
                  borderRadius: '16px',
                  padding: isPhone ? '24px 20px' : '30px 32px',
                  marginTop: '28px'
                }}>
                  <h3 style={{
                    fontSize: isPhone ? '1.15rem' : '1.3rem',
                    fontWeight: '800',
                    color: '#0f172a',
                    margin: '0 0 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <span style={{
                      background: '#0284c7',
                      color: '#ffffff',
                      borderRadius: '8px',
                      width: '30px',
                      height: '30px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: '800',
                      flexShrink: 0
                    }}>
                      {sec.number || '20'}
                    </span>
                    {sec.title || 'Contact Us'}
                  </h3>
                  {(sec.subtitle || sec.intro) && (
                    <p
                      style={{ fontSize: isPhone ? '15px' : '16px', color: '#334155', fontWeight: '600', margin: '0 0 14px' }}
                      dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(sec.subtitle || sec.intro) }}
                    />
                  )}
                  <div style={{ fontSize: isPhone ? '14.5px' : '15px', color: '#475569', lineHeight: 1.8, fontWeight: '450' }}>
                    <p
                      style={{ margin: '0 0 8px', fontWeight: '700', color: '#0f172a', fontSize: '15.5px' }}
                      dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(sec.companyName || (sec.content && sec.content[0]) || "Winera International Pvt. Ltd.") }}
                    />
                    <p
                      style={{ margin: '0 0 12px', maxWidth: '820px' }}
                      dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(sec.address || (sec.content && sec.content[1]) || "📍 1011, 10th floor, Millennium Business Hub, opp., Bhagavan Nagar, Sarthana Jakat Naka, Nature Park and Zoo, Nana Varachha, Surat, Gujarat-395006, India") }}
                    />
                    {sec.bulletsText ? (
                      <ul style={{ margin: '0 0 12px', paddingLeft: '24px', listStyleType: 'disc' }}>
                        {sec.bulletsText.map((tItem, tIdx) => (
                          <li
                            key={tIdx}
                            style={{ fontSize: isPhone ? '14.5px' : '15px', color: '#475569', lineHeight: 1.75, marginBottom: '8px' }}
                            dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(tItem) }}
                          />
                        ))}
                      </ul>
                    ) : (
                      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '10px' }}>
                        <div>
                          <strong style={{ color: '#0f172a' }}>📧 Email:</strong>{' '}
                          <a href="mailto:info@winera.in" style={{ color: '#0284c7', fontWeight: '700', textDecoration: 'none' }}>
                            info@winera.in
                          </a>
                        </div>
                        <div>
                          <strong style={{ color: '#0f172a' }}>📞 Phone:</strong>{' '}
                          <a href="tel:+919157873576" style={{ color: '#0284c7', fontWeight: '700', textDecoration: 'none' }}>
                            +91 91578 73576
                          </a>
                          {' / '}
                          <a href="tel:+919512356766" style={{ color: '#0284c7', fontWeight: '700', textDecoration: 'none' }}>
                            +91 95123 56766
                          </a>
                        </div>
                        <div>
                          <strong style={{ color: '#0f172a' }}>🌐 Website:</strong>{' '}
                          <a href="https://www.winera.in" target="_blank" rel="noreferrer" style={{ color: '#0284c7', fontWeight: '700', textDecoration: 'none' }}>
                            www.winera.in
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <div key={idx} style={{
                marginBottom: idx === sections.length - 1 ? '35px' : '30px',
                paddingBottom: idx === sections.length - 1 ? '0' : '28px',
                borderBottom: idx === sections.length - 1 ? 'none' : '1px solid #e2e8f0'
              }}>
                <h3 style={{
                  fontSize: isPhone ? '1.15rem' : '1.3rem',
                  fontWeight: '800',
                  color: '#0f172a',
                  margin: '0 0 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  lineHeight: 1.35,
                  letterSpacing: '-0.2px'
                }}>
                  <span style={{
                    background: '#e0f2fe',
                    color: '#0284c7',
                    borderRadius: '8px',
                    width: '30px',
                    height: '30px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: '800',
                    flexShrink: 0
                  }}>
                    {sec.number}
                  </span>
                  <span>{sec.title}</span>
                </h3>

                {(sec.intro || sec.subtitle) && (
                  <p
                    style={{ fontSize: isPhone ? '15px' : '16px', color: '#334155', lineHeight: 1.85, margin: '0 0 12px', fontWeight: '400' }}
                    dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(sec.intro || sec.subtitle) }}
                  />
                )}

                {sec.content && (Array.isArray(sec.content) ? sec.content : [sec.content]).map((pText, pIdx) => (
                  <p
                    key={pIdx}
                    style={{ fontSize: isPhone ? '15px' : '16px', color: '#334155', lineHeight: 1.85, margin: '0 0 10px', fontWeight: '400' }}
                    dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(pText) }}
                  />
                ))}

                {/* Labelled bullets */}
                {sec.bullets && (
                  <ul style={{ margin: '0 0 12px', paddingLeft: '24px', listStyleType: 'disc' }}>
                    {sec.bullets.map((bItem, bIdx) => (
                      <li key={bIdx} style={{ fontSize: isPhone ? '15px' : '16px', color: '#334155', lineHeight: 1.8, marginBottom: '8px' }}>
                        <strong style={{ color: '#0f172a', fontWeight: '700' }}>{bItem.label}:</strong>{' '}
                        <span dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(bItem.text) }} />
                      </li>
                    ))}
                  </ul>
                )}

                {/* Simple text bullets */}
                {sec.bulletsText && (
                  <ul style={{ margin: '0 0 12px', paddingLeft: '24px', listStyleType: 'disc' }}>
                    {sec.bulletsText.map((tItem, tIdx) => (
                      <li
                        key={tIdx}
                        style={{ fontSize: isPhone ? '15px' : '16px', color: '#334155', lineHeight: 1.8, marginBottom: '8px' }}
                        dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(tItem) }}
                      />
                    ))}
                  </ul>
                )}
              </div>
            );
          })}

          {/* Section 20: Fallback Contact Us Box if not already rendered in sections array */}
          {!sections.some(s => s.number === "20" || (s.title && s.title.toLowerCase().includes('contact'))) && (
            <div style={{
              background: '#f8fafc',
              border: '1.5px solid #cbd5e1',
              borderRadius: '16px',
              padding: isPhone ? '24px 20px' : '30px 32px',
              marginTop: '28px'
            }}>
              <h3 style={{
                fontSize: isPhone ? '1.15rem' : '1.3rem',
                fontWeight: '800',
                color: '#0f172a',
                margin: '0 0 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{
                  background: '#0284c7',
                  color: '#ffffff',
                  borderRadius: '8px',
                  width: '30px',
                  height: '30px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: '800',
                  flexShrink: 0
                }}>
                  20
                </span>
                Contact Us
              </h3>
              <div style={{ fontSize: isPhone ? '14.5px' : '15px', color: '#475569', lineHeight: 1.8, fontWeight: '450' }}>
                <p style={{ margin: '0 0 8px', fontWeight: '700', color: '#0f172a', fontSize: '15.5px' }}>
                  Winera International Pvt. Ltd.
                </p>
                <p style={{ margin: '0 0 12px', maxWidth: '820px' }}>
                  📍 1011, 10th floor, Millennium Business Hub, opp., Bhagavan Nagar, Sarthana Jakat Naka, Nature Park and Zoo, Nana Varachha, Surat, Gujarat-395006, India
                </p>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '10px' }}>
                  <div>
                    <strong style={{ color: '#0f172a' }}>📧 Email:</strong>{' '}
                    <a href="mailto:info@winera.in" style={{ color: '#0284c7', fontWeight: '700', textDecoration: 'none' }}>
                      info@winera.in
                    </a>
                  </div>
                  <div>
                    <strong style={{ color: '#0f172a' }}>📞 Phone:</strong>{' '}
                    <a href="tel:+919157873576" style={{ color: '#0284c7', fontWeight: '700', textDecoration: 'none' }}>
                      +91 91578 73576
                    </a>
                    {' / '}
                    <a href="tel:+919512356766" style={{ color: '#0284c7', fontWeight: '700', textDecoration: 'none' }}>
                      +91 95123 56766
                    </a>
                  </div>
                  <div>
                    <strong style={{ color: '#0f172a' }}>🌐 Website:</strong>{' '}
                    <a href="https://www.winera.in" target="_blank" rel="noreferrer" style={{ color: '#0284c7', fontWeight: '700', textDecoration: 'none' }}>
                      www.winera.in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      <Footer footerData={footer} />
    </div>
  );
}
