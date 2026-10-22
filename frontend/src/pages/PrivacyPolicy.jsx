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

export default function PrivacyPolicy({ siteData }) {
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
  const privacyHero = siteData?.privacyHero || {};
  const heroBg = getValidImageUrl(privacyHero.bgUrl, aboutHeroBg);
  const mobileHeroBg = getValidImageUrl(privacyHero.mobileBgUrl, gameZoneMobileBanner);
  const bgAlt = privacyHero.bgAlt || "Privacy Policy - Winera International";
  const mobileBgAlt = privacyHero.mobileBgAlt || privacyHero.bgAlt || "Privacy Policy Mobile Banner - Winera International";
  const heroTitle = privacyHero.title || "Privacy *Policy*";
  const breadcrumbHome = privacyHero.breadcrumbHome || "Home";
  const breadcrumbText = privacyHero.breadcrumbText || "Privacy Policy";

  const privacySeo = siteData?.privacySeo || {
    pageTitle: "Privacy Policy | Winera International Pvt. Ltd.",
    metaDescription: "Read the Privacy Policy of Winera International Pvt. Ltd. Learn how we collect, use, safeguard, and process your personal and business information."
  };

  useEffect(() => {
    document.title = privacySeo.pageTitle || privacySeo.title || "Privacy Policy | Winera International Pvt. Ltd.";
    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'description');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', privacySeo.metaDescription || privacySeo.description || "Read the Privacy Policy of Winera International Pvt. Ltd. Learn how we collect, use, safeguard, and process your personal and business information.");
  }, [privacySeo]);

  const defaultSections = [
    {
      number: "1",
      title: "Introduction",
      content: [
        "Winera International Pvt. Ltd. ('Winera', 'Company', 'we', 'our', or 'us') is committed to protecting your personal and business information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.winera.in, interact with us online, or use our services. By using our website, you consent to the practices described in this policy."
      ]
    },
    {
      number: "2",
      title: "Information We Collect",
      subtitle: "We collect the following types of information:",
      bullets: [
        { label: "Personal Information", text: "Your name, email address, phone number, business name, designation, and other contact details." },
        { label: "Business Information", text: "Project details, site drawings, requirements, order history." },
        { label: "Technical Data", text: "IP address, browser type, device information, operating system, referring URLs, date/time stamps." },
        { label: "Cookies and Usage Data", text: "We use cookies to collect anonymous usage statistics and user behavior data." }
      ]
    },
    {
      number: "3",
      title: "How We Use Your Information",
      subtitle: "We use your information for purposes including:",
      bulletsText: [
        "Responding to inquiries and sending quotes",
        "Processing and managing your orders",
        "Delivering customer service and support",
        "Improving our website and services",
        "Sending transactional and promotional communications (with your consent)",
        "Legal compliance and dispute resolution"
      ]
    },
    {
      number: "4",
      title: "Legal Basis for Processing",
      subtitle: "We process your data based on:",
      bulletsText: [
        "Your consent",
        "The necessity to perform a contract",
        "Our legal obligations",
        "Legitimate business interests"
      ]
    },
    {
      number: "5",
      title: "Sharing and Disclosure of Information",
      subtitle: "We do not sell your data. We may share information with:",
      bulletsText: [
        "Internal teams for project fulfillment",
        "Logistics providers for delivery",
        "IT and analytics partners (e.g., Google Analytics)",
        "Legal or regulatory authorities when required"
      ]
    },
    {
      number: "6",
      title: "Data Retention",
      content: [
        "We retain your personal and business data only for as long as necessary to fulfill the purposes outlined in this policy. This includes compliance with legal obligations, resolving disputes, and enforcing agreements."
      ]
    },
    {
      number: "7",
      title: "Your Data Rights",
      subtitle: "You have the right to:",
      bulletsText: [
        "Access and review your data",
        "Correct or update inaccurate information",
        "Withdraw consent at any time",
        "Request data deletion, subject to legal limits",
        "Object to processing or request data portability"
      ]
    },
    {
      number: "8",
      title: "Security of Your Data",
      content: [
        "We implement appropriate technical and organizational measures to safeguard your data. This includes secure servers, firewalls, encryption, and access controls. While we strive for security, no method is fully secure."
      ]
    },
    {
      number: "9",
      title: "Cookies and Tracking",
      content: [
        "We use cookies to understand user behavior and improve site performance. You can manage your cookie preferences in your browser settings. Blocking cookies may impact your experience."
      ]
    },
    {
      number: "10",
      title: "Third-Party Links",
      content: [
        "Our website may contain links to other websites. We are not responsible for their privacy practices or content. Please review their policies before interacting with them."
      ]
    },
    {
      number: "11",
      title: "Children’s Privacy",
      content: [
        "Our services are intended for individuals 18 years and older. We do not knowingly collect data from children. If you believe we have inadvertently collected such data, contact us for deletion."
      ]
    },
    {
      number: "12",
      title: "International Data Transfers",
      content: [
        "If you are accessing our website from outside India, you consent to the transfer and processing of your data in accordance with Indian law."
      ]
    },
    {
      number: "13",
      title: "Changes to This Policy",
      content: [
        "We may update this Privacy Policy from time to time. The latest version will be posted on this page. Continued use of our website means you accept the updated terms."
      ]
    },
    {
      number: "14",
      title: "Contact Information",
      subtitle: "For any questions or concerns, contact us at:",
      isContactBox: true,
      companyName: "Winera International Pvt. Ltd.",
      address: "1011, 10th floor, Millennium Business Hub, opp. Bhagavan Nagar, Sarthana Jakat Naka, Nature Park and Zoo, Nana Varachha, Surat, Gujarat-395006, India",
      bulletsText: [
        "Email: info@winera.in",
        "Phone: +91 91578 73576 / +91 95123 56766"
      ]
    }
  ];

  const sections = (siteData?.privacySections && siteData.privacySections.length > 0) ? siteData.privacySections : defaultSections;

  return (
    <div style={{ background: '#F5F5F9', color: '#0f172a', minHeight: '100vh', fontFamily: "'Open Sans', sans-serif" }}>
      <Header headerData={header} />

      {/* Hero Header Section */}
      <section className="winera-privacy-hero-section" style={{
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
            <h1 className="winera-privacy-hero-h1" style={{
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
            </h1>
          ) : (
            <>
              <h1 style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-1px', marginBottom: '8px', lineHeight: 1.15 }}>
                {renderTitleMarkup(heroTitle, 'Privacy <span style="color: #ffcd00">Policy</span>')}
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
        <div className="winera-policy-content-container" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          textAlign: 'left'
        }}>

          {/* Render Sections 1 to 14 */}
          {sections.map((sec, idx) => {
            const isContact = sec.isContactBox || sec.number === "14" || (sec.title && sec.title.toLowerCase().includes('contact'));
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
                      {sec.number || '14'}
                    </span>
                    {sec.title || 'Contact Information'}
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
                      dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(sec.address || (sec.content && sec.content[1]) || "1011, 10th floor, Millennium Business Hub, opp. Bhagavan Nagar, Sarthana Jakat Naka, Nature Park and Zoo, Nana Varachha, Surat, Gujarat-395006, India") }}
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
                          <strong style={{ color: '#0f172a' }}>Email:</strong>{' '}
                          <a href={`mailto:${sec.email || 'info@winera.in'}`} style={{ color: '#0284c7', fontWeight: '700', textDecoration: 'none' }}>
                            {sec.email || 'info@winera.in'}
                          </a>
                        </div>
                        <div>
                          <strong style={{ color: '#0f172a' }}>Phone:</strong>{' '}
                          <a href={`tel:${sec.phone1 || '+919157873576'}`} style={{ color: '#0284c7', fontWeight: '700', textDecoration: 'none' }}>
                            {sec.phone1 || '+91 91578 73576'}
                          </a>
                          {' / '}
                          <a href={`tel:${sec.phone2 || '+919512356766'}`} style={{ color: '#0284c7', fontWeight: '700', textDecoration: 'none' }}>
                            {sec.phone2 || '+91 95123 56766'}
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

                {sec.content && (Array.isArray(sec.content) ? sec.content : [sec.content]).map((pText, pIdx) => (
                  <p
                    key={pIdx}
                    style={{ fontSize: isPhone ? '15px' : '16px', color: '#334155', lineHeight: 1.85, margin: '0 0 10px', fontWeight: '400' }}
                    dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(pText) }}
                  />
                ))}

                {(sec.subtitle || sec.intro) && (
                  <p
                    style={{ fontSize: isPhone ? '15px' : '16px', color: '#334155', fontWeight: '600', margin: '0 0 12px', lineHeight: 1.85 }}
                    dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(sec.subtitle || sec.intro) }}
                  />
                )}

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

        </div>
      </section>

      <Footer footerData={footer} />
    </div>
  );
}
