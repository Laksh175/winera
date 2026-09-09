import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import aboutHeroBg from '../assets/about-hero-bg.webp';

export default function PrivacyPolicy({ siteData }) {
  const header = siteData?.header || {};
  const footer = siteData?.footer || {};

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
        "Phone: +91 94289 89488 / +91 95123 56766"
      ]
    }
  ];

  const sections = (siteData?.privacySections && siteData.privacySections.length > 0) ? siteData.privacySections : defaultSections;

  return (
    <div style={{ background: '#F5F5F9', color: '#0f172a', minHeight: '100vh', fontFamily: "'Open Sans', sans-serif" }}>
      <Header headerData={header} />

      {/* Hero Header Section */}
      <section className="winera-vr-hero-section" style={{
        position: 'relative', width: '100%', paddingTop: '165px', paddingBottom: '50px',
        background: `url(${aboutHeroBg}) center/100% 100% no-repeat`, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center', color: '#ffffff'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          <h1 style={{ fontSize: '3.0rem', fontWeight: '900', letterSpacing: '-1px', marginBottom: '8px', lineHeight: 1.15 }}>
            Privacy <span style={{ color: '#ffcd00' }}>Policy</span>
          </h1>
          <p style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', opacity: 0.9, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <a href="/" style={{ color: '#ffffff', textDecoration: 'none' }}>Home</a>
            <span style={{ color: '#ffcd00' }}>&gt;</span>
            <span style={{ color: '#ffffff' }}>Privacy Policy</span>
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <section style={{ padding: '60px 4vw 90px', maxWidth: '940px', margin: '0 auto' }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          border: '1.5px solid #e2e8f0',
          padding: '40px 45px',
          boxShadow: 'none'
        }}>

          {/* Render Sections 1 to 14 */}
          {sections.map((sec, idx) => {
            const isContact = sec.isContactBox || sec.number === "14" || (sec.title && sec.title.toLowerCase().includes('contact'));
            if (isContact) {
              return (
                <div key={idx} style={{
                  background: '#f0f9ff',
                  border: '1.5px solid #38bdf8',
                  borderRadius: '20px',
                  padding: '30px 32px',
                  marginTop: '20px'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '800',
                    color: '#0f172a',
                    margin: '0 0 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <span style={{
                      background: '#38bdf8',
                      color: '#ffffff',
                      borderRadius: '10px',
                      width: '32px',
                      height: '32px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: '800',
                      flexShrink: 0
                    }}>
                      {sec.number || '14'}
                    </span>
                    {sec.title || 'Contact Information'}
                  </h3>
                  {(sec.subtitle || sec.intro) && (
                    <p style={{ fontSize: '14.5px', color: '#334155', fontWeight: '600', margin: '0 0 14px' }}>
                      {sec.subtitle || sec.intro}
                    </p>
                  )}
                  <div style={{ fontSize: '14px', color: '#475569', lineHeight: 1.75, fontWeight: '500' }}>
                    <p style={{ margin: '0 0 8px', fontWeight: '700', color: '#0f172a', fontSize: '15px' }}>
                      {sec.companyName || (sec.content && sec.content[0]) || "Winera International Pvt. Ltd."}
                    </p>
                    <p style={{ margin: '0 0 12px', maxWidth: '720px' }}>
                      {sec.address || (sec.content && sec.content[1]) || "1011, 10th floor, Millennium Business Hub, opp. Bhagavan Nagar, Sarthana Jakat Naka, Nature Park and Zoo, Nana Varachha, Surat, Gujarat-395006, India"}
                    </p>
                    {sec.bulletsText ? (
                      <ul style={{ margin: 0, paddingLeft: '22px', listStyleType: 'disc' }}>
                        {sec.bulletsText.map((tItem, tIdx) => (
                          <li key={tIdx} style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.7, marginBottom: '8px' }}>
                            {tItem}
                          </li>
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
                          <a href={`tel:${sec.phone1 || '+919428989488'}`} style={{ color: '#0284c7', fontWeight: '700', textDecoration: 'none' }}>
                            {sec.phone1 || '+91 94289 89488'}
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
                marginBottom: idx === sections.length - 1 ? '40px' : '36px',
                paddingBottom: idx === sections.length - 1 ? '0' : '32px',
                borderBottom: idx === sections.length - 1 ? 'none' : '1px solid #f1f5f9'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '800',
                  color: '#0f172a',
                  margin: '0 0 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  lineHeight: 1.3
                }}>
                  <span style={{
                    background: '#e0f2fe',
                    color: '#0284c7',
                    borderRadius: '10px',
                    width: '32px',
                    height: '32px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '800',
                    flexShrink: 0
                  }}>
                    {sec.number}
                  </span>
                  {sec.title}
                </h3>

                {sec.content && sec.content.map((pText, pIdx) => (
                  <p key={pIdx} style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.7, margin: '0 0 10px', fontWeight: '450' }}>
                    {pText}
                  </p>
                ))}

                {sec.subtitle && (
                  <p style={{ fontSize: '14.5px', color: '#334155', fontWeight: '600', margin: '0 0 12px', lineHeight: 1.6 }}>
                    {sec.subtitle}
                  </p>
                )}

                {/* Labelled bullets */}
                {sec.bullets && (
                  <ul style={{ margin: 0, paddingLeft: '22px', listStyleType: 'disc' }}>
                    {sec.bullets.map((bItem, bIdx) => (
                      <li key={bIdx} style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.7, marginBottom: '8px' }}>
                        <strong style={{ color: '#0f172a', fontWeight: '700' }}>{bItem.label}:</strong> {bItem.text}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Simple text bullets */}
                {sec.bulletsText && (
                  <ul style={{ margin: 0, paddingLeft: '22px', listStyleType: 'disc' }}>
                    {sec.bulletsText.map((tItem, tIdx) => (
                      <li key={tIdx} style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.7, marginBottom: '8px' }}>
                        {tItem}
                      </li>
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
