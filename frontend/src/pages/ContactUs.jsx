import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeading from '../components/SectionHeading';
import CtaBanner from '../components/CtaBanner';
import FaqSection from '../components/FaqSection';
import { Phone, Mail, Building2, Globe, CheckCircle2 } from 'lucide-react';
import contactUsHeroBg from '../assets/Contact-us.webp';
import aboutHeroBg from '../assets/about-hero-bg.webp';
import arcadeHeroBg from '../assets/arcade-hero-bg.webp';

export default function ContactUs({ siteData }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiry: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const footer = siteData?.footer;

  return (
    <div style={{ background: '#F5F5F9', minHeight: '100vh', color: '#0f172a', fontFamily: "'Outfit', 'Inter', sans-serif" }}>
      {/* 1. HEADER */}
      <Header headerData={siteData?.header} />

      {/* 2. CONTACT US HERO BANNER (MATCHING PRODUCT HEROES 1:1) */}
      <section className="winera-contact-hero-section" style={{
        position: 'relative',
        width: '100%',
        paddingTop: '165px',
        paddingBottom: '75px',
        background: `url(${contactUsHeroBg}) center top / 100% 100% no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          <h1 className="winera-contact-hero-h1" style={{
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
            <a href="/" style={{ color: '#ffffff', textDecoration: 'none' }}>Home</a>
            <span style={{ color: '#ffffff', fontWeight: '400' }}>&rsaquo;</span>
            <span style={{ color: '#ffcd00', fontWeight: '900' }}>Contact Us</span>
          </h1>
        </div>
      </section>

      {/* 3. MAIN CONTACT US 2-COLUMN SIDE-BY-SIDE SECTION */}
      <section style={{ padding: '80px 4vw 100px', background: '#F5F5F9' }}>
        <div className="winera-contact-page-grid" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.05fr 1fr',
          gap: '60px',
          alignItems: 'flex-start'
        }}>
          {/* LEFT COLUMN: Section Title, Subtext & Stacked Contact Info Cards */}
          <div style={{ textAlign: 'left' }}>
            <SectionHeading align="left" marginBottom="20px" accentWidth="240px" accentMaxWidth="400px">
              {(() => {
                const rawTitle = siteData?.contactPage?.title || "Get in Touch with *Winera International*";
                const parts = rawTitle.split(/\*{1,2}(.*?)\*{1,2}/g);
                return parts.map((part, index) => {
                  if (index % 2 === 1) {
                    return (
                      <span key={index} style={{ color: '#0f172a' }}>
                        {part}
                      </span>
                    );
                  }
                  return <span key={index} style={{ color: '#38bdf8' }}>{part} </span>;
                });
              })()}
            </SectionHeading>

            <p style={{ color: '#64748b', fontSize: '13.5px', lineHeight: 1.65, fontWeight: '500', marginBottom: '36px', maxWidth: '540px' }}>
              {siteData?.contactPage?.desc || "Looking for reliable game zone equipment, soft play solutions, or indoor amusement park installations for your business? Our team is here to help you with product details, project pricing, and complete service support. Connect with us to discuss your space requirements and see how Winera International transforms ordinary spaces into extraordinary entertainment destinations."}
            </p>

            {/* Stack of 2 Contact Info Cards (Call Us & Email Our Team) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* CALL US card — white + cyan diagonal swoosh */}
              <div style={{ position: 'relative', width: '100%', maxWidth: '520px' }}>
                <div style={{
                  position: 'relative',
                  zIndex: 2,
                  background: '#e0f2fe',
                  border: '1.5px solid #38bdf8',
                  borderRadius: '24px',
                  padding: '22px 26px',
                  boxShadow: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px',
                  overflow: 'hidden'
                }}>
                  {/* Diagonal filled swoosh — inside card, clipped to border-radius */}
                  <svg
                    viewBox="0 0 500 100"
                    preserveAspectRatio="none"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
                  >
                    <defs>
                      <linearGradient id="cuCyanSwoosh" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#28b4ee" stopOpacity="1" />
                        <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.7" />
                        <stop offset="58%" stopColor="#38bdf8" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 0 L 220 0 C 220 0 190 6 190 6 L 28 6 C 18 6 6 18 6 28 L 6 72 C 6 82 18 94 28 94 L 165 94 C 165 94 200 100 200 100 L 0 100 Z"
                      fill="url(#cuCyanSwoosh)"
                    />
                  </svg>

                  <div style={{ position: 'relative', zIndex: 1, width: '46px', height: '46px', borderRadius: '50%', background: '#38bdf8', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone style={{ width: '22px', height: '22px' }} />
                  </div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <h5 style={{ fontSize: '11px', fontWeight: '800', color: '#0f172a', letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 4px' }}>
                      {siteData?.contactPage?.callTitle || "CALL US DIRECTLY"}
                    </h5>
                    <div className="winera-contact-phones-row" style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                      <a href={`tel:${(siteData?.contactPage?.phone1 || "+91 94289 89488").replace(/\s+/g, '')}`} style={{ fontSize: '13.5px', fontWeight: '700', color: '#475569', textDecoration: 'none' }}>{siteData?.contactPage?.phone1 || "+91 94289 89488"}</a>
                      <a href={`tel:${(siteData?.contactPage?.phone2 || "+91 95123 56766").replace(/\s+/g, '')}`} style={{ fontSize: '13.5px', fontWeight: '700', color: '#475569', textDecoration: 'none' }}>{siteData?.contactPage?.phone2 || "+91 95123 56766"}</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* EMAIL card — white + yellow diagonal swoosh */}
              <div style={{ position: 'relative', width: '100%', maxWidth: '520px' }}>
                <div style={{
                  position: 'relative',
                  zIndex: 2,
                  background: '#fefce8',
                  border: '1.5px solid #facc15',
                  borderRadius: '24px',
                  padding: '22px 26px',
                  boxShadow: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px',
                  overflow: 'hidden'
                }}>
                  {/* Diagonal filled swoosh — inside card, clipped to border-radius */}
                  <svg
                    viewBox="0 0 500 100"
                    preserveAspectRatio="none"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
                  >
                    <defs>
                      <linearGradient id="cuYellowSwoosh" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#e6a800" stopOpacity="1" />
                        <stop offset="40%" stopColor="#ffcd00" stopOpacity="0.7" />
                        <stop offset="58%" stopColor="#ffcd00" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 0 L 220 0 C 220 0 190 6 190 6 L 28 6 C 18 6 6 18 6 28 L 6 72 C 6 82 18 94 28 94 L 165 94 C 165 94 200 100 200 100 L 0 100 Z"
                      fill="url(#cuYellowSwoosh)"
                    />
                  </svg>

                  <div style={{ position: 'relative', zIndex: 1, width: '46px', height: '46px', borderRadius: '50%', background: '#ffcd00', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail style={{ width: '22px', height: '22px' }} />
                  </div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <h5 style={{ fontSize: '11px', fontWeight: '800', color: '#0f172a', letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 4px' }}>
                      {siteData?.contactPage?.emailTitle || "EMAIL OUR TEAM"}
                    </h5>
                    <a href={`mailto:${siteData?.contactPage?.email || "info@winera.in"}`} style={{ fontSize: '13.5px', fontWeight: '700', color: '#475569', textDecoration: 'none' }}>{siteData?.contactPage?.email || "info@winera.in"}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form Card ("Let’s Start Your Project") */}
          <div className="winera-contact-form-card" style={{
            position: 'relative',
            background: '#ffffff',
            borderRadius: '24px',
            padding: '36px 32px',
            boxShadow: 'none',
            overflow: 'hidden',
            textAlign: 'left',
            maxWidth: '480px',
            margin: '0 auto',
            width: '100%'
          }}>
            {/* Top Multi-Color Gradient Line (Cyan -> Lime -> Yellow) */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '7px',
              background: 'linear-gradient(90deg, #38bdf8 0%, #a3e635 50%, #ffcd00 100%)'
            }}></div>

            <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a', marginBottom: '24px', marginTop: '4px' }}>
              {siteData?.contactPage?.formTitle || "Let’s Start Your Project"}
            </h3>

            {submitted ? (
              <div style={{
                background: '#f0fdf4',
                border: '1.5px solid #86efac',
                borderRadius: '20px',
                padding: '36px 20px',
                textAlign: 'center'
              }}>
                <CheckCircle2 style={{ width: '50px', height: '50px', color: '#16a34a', margin: '0 auto 14px' }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#14532d', marginBottom: '8px' }}>Inquiry Submitted!</h4>
                <p style={{ color: '#166534', fontSize: '13.5px', lineHeight: 1.6, margin: '0 auto 18px' }}>
                  Thank you for reaching out. Our specialist will contact you shortly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', email: '', inquiry: '' }); }}
                  style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '10px 22px', borderRadius: '12px', fontWeight: '800', cursor: 'pointer' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label htmlFor="contact_name" style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#0f172a', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
                    FULL NAME
                  </label>
                  <input
                    id="contact_name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    style={{ width: '100%', padding: '14px 18px', borderRadius: '10px', background: '#f1f5f9', border: 'none', fontSize: '14px', fontWeight: '500', color: '#0f172a', outline: 'none' }}
                  />
                </div>

                <div>
                  <label htmlFor="contact_phone" style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#0f172a', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
                    PHONE NUMBER
                  </label>
                  <input
                    id="contact_phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    style={{ width: '100%', padding: '14px 18px', borderRadius: '10px', background: '#f1f5f9', border: 'none', fontSize: '14px', fontWeight: '500', color: '#0f172a', outline: 'none' }}
                  />
                </div>

                <div>
                  <label htmlFor="contact_email" style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#0f172a', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
                    EMAIL ADDRESS
                  </label>
                  <input
                    id="contact_email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@company.com"
                    style={{ width: '100%', padding: '14px 18px', borderRadius: '10px', background: '#f1f5f9', border: 'none', fontSize: '14px', fontWeight: '500', color: '#0f172a', outline: 'none' }}
                  />
                </div>

                <div>
                  <label htmlFor="contact_inquiry" style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#0f172a', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
                    PROJECT DETAILS / INQUIRY
                  </label>
                  <textarea
                    id="contact_inquiry"
                    name="inquiry"
                    autoComplete="off"
                    rows={4}
                    required
                    value={formData.inquiry}
                    onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                    placeholder="Tell us about your venue requirements, space dimensions, or technical questions..."
                    style={{ width: '100%', padding: '14px 18px', borderRadius: '10px', background: '#f1f5f9', border: 'none', fontSize: '14px', fontWeight: '500', color: '#0f172a', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '14px' }}>
                  <div className="winera-cyan-cta-wrapper">
                    <button
                      type="submit"
                      className="winera-cyan-cta-btn"
                      style={{ border: 'none', cursor: 'pointer', padding: '13px 32px', fontSize: '15.5px', borderRadius: '14px' }}
                    >
                      <span>{siteData?.contactPage?.formBtnText || "Request Free Consultation"}</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* 4. OUR 2 GLOBAL LOCATIONS & MAP SECTION */}
        <div style={{ maxWidth: '1240px', margin: '80px auto 0' }}>
          <div style={{ marginBottom: '80px', textAlign: 'center' }}>
            <SectionHeading align="center" marginBottom="28px" accentWidth="240px" accentMaxWidth="400px">
              <span style={{ color: '#0f172a' }}>Where We’re </span>
              <span style={{ color: '#38bdf8' }}>Globally Present</span>
            </SectionHeading>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>

              {/* Surat HQ — white + cyan diagonal swoosh */}
              <div style={{ position: 'relative', width: '100%', maxWidth: '520px' }}>
                <div style={{
                  position: 'relative',
                  background: '#e0f2fe',
                  border: '1.5px solid #38bdf8',
                  borderRadius: '24px',
                  padding: '32px',
                  boxShadow: 'none',
                  textAlign: 'left',
                  height: '100%',
                  overflow: 'hidden'
                }}>
                  {/* Diagonal filled swoosh — inside card, clipped to border-radius */}
                  <svg
                    viewBox="0 0 500 160"
                    preserveAspectRatio="none"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
                  >
                    <defs>
                      <linearGradient id="suratCyanSwoosh" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#28b4ee" stopOpacity="1" />
                        <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.7" />
                        <stop offset="58%" stopColor="#38bdf8" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 0 L 220 0 C 220 0 190 6 190 6 L 28 6 C 18 6 6 18 6 28 L 6 132 C 6 142 18 152 28 152 L 165 152 C 165 152 200 160 200 160 L 0 160 Z"
                      fill="url(#suratCyanSwoosh)"
                    />
                  </svg>

                  <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#38bdf8', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Building2 style={{ width: '22px', height: '22px' }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>{siteData?.contactPage?.hq1Name || "Surat Headquarters (India)"}</h3>
                      <span style={{ fontSize: '11.5px', color: '#475569', fontWeight: '700' }}>{siteData?.contactPage?.hq1Badge || "Corporate & Sales Office"}</span>
                    </div>
                  </div>
                  <p style={{ position: 'relative', zIndex: 1, color: '#334155', fontSize: '13.5px', lineHeight: 1.65, fontWeight: '500', margin: 0, whiteSpace: 'pre-line' }}>
                    {siteData?.contactPage?.hq1Address || "Winera International Pvt. Ltd.\nSurat, Gujarat, India.\nHotline: +91 94289 89488 / +91 95123 56766"}
                  </p>
                </div>
              </div>

              {/* China Facility — white + yellow diagonal swoosh */}
              <div style={{ position: 'relative', width: '100%', maxWidth: '520px' }}>
                <div style={{
                  position: 'relative',
                  background: '#fefce8',
                  border: '1.5px solid #facc15',
                  borderRadius: '24px',
                  padding: '32px',
                  boxShadow: 'none',
                  textAlign: 'left',
                  height: '100%',
                  overflow: 'hidden'
                }}>
                  {/* Diagonal filled swoosh — inside card, clipped to border-radius */}
                  <svg
                    viewBox="0 0 500 160"
                    preserveAspectRatio="none"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
                  >
                    <defs>
                      <linearGradient id="chinaYellowSwoosh" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#e6a800" stopOpacity="1" />
                        <stop offset="40%" stopColor="#ffcd00" stopOpacity="0.7" />
                        <stop offset="58%" stopColor="#ffcd00" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 0 L 220 0 C 220 0 190 6 190 6 L 28 6 C 18 6 6 18 6 28 L 6 132 C 6 142 18 152 28 152 L 165 152 C 165 152 200 160 200 160 L 0 160 Z"
                      fill="url(#chinaYellowSwoosh)"
                    />
                  </svg>

                  <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#ffcd00', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Globe style={{ width: '22px', height: '22px' }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>{siteData?.contactPage?.hq2Name || "China Manufacturing Facility"}</h3>
                      <span style={{ fontSize: '11.5px', color: '#475569', fontWeight: '700' }}>{siteData?.contactPage?.hq2Badge || "Sourcing & Assembly Hub"}</span>
                    </div>
                  </div>
                  <p style={{ position: 'relative', zIndex: 1, color: '#334155', fontSize: '13.5px', lineHeight: 1.65, fontWeight: '500', margin: 0, whiteSpace: 'pre-line' }}>
                    {siteData?.contactPage?.hq2Address || "Winera International Global Assembly Base\nGuangzhou / Panyu Amusement Equipment Zone,\nGuangdong Province, China."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Map */}
          <div style={{ textAlign: 'center', marginTop: '80px' }}>
            <SectionHeading align="center" marginBottom="28px" accentWidth="220px" accentMaxWidth="360px">
              <span style={{ color: '#38bdf8' }}>Discover Our </span>
              <span style={{ color: '#0f172a' }}>Locations</span>
            </SectionHeading>

            <div style={{
              width: '100%',
              height: '420px',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: 'none',
              border: '4px solid #ffffff'
            }}>
              <iframe
                title="Winera International Location Map"
                src={siteData?.contactPage?.mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238130.15372332616!2d72.68220805!3d21.1591425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA BANNER */}
      <CtaBanner />

      {/* 6. FOOTER */}
      <Footer footerData={footer} />
    </div>
  );
}
