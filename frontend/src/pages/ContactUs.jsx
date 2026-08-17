import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeading from '../components/SectionHeading';
import CtaBanner from '../components/CtaBanner';
import { Phone, Mail, MapPin, Send, CheckCircle2, Globe, Building2 } from 'lucide-react';

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

      {/* 2. HERO BANNER */}
      <section style={{
        padding: '140px 4vw 70px',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#ffffff',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <span style={{
            background: 'rgba(56, 189, 248, 0.15)',
            color: '#38bdf8',
            fontSize: '12px',
            fontWeight: '900',
            padding: '6px 18px',
            borderRadius: '20px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            display: 'inline-block',
            marginBottom: '16px'
          }}>
            Contact Us
          </span>
          <h1 style={{ fontSize: '2.6rem', fontWeight: '900', color: '#ffffff', marginBottom: '16px', lineHeight: 1.2 }}>
            Get in Touch with <span style={{ color: '#38bdf8' }}>Winera International</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14.5px', fontWeight: '500', lineHeight: 1.7, maxWidth: '780px', margin: '0 auto' }}>
            Looking for reliable game zone equipment, soft play solutions, or indoor amusement park installations for your business? Our team is here to help you with product details, project pricing, and complete service support. Connect with us to discuss your space requirements and see how Winera International transforms ordinary spaces into extraordinary entertainment destinations.
          </p>
        </div>
      </section>

      {/* 3. CONTACT FORM & QUICK INFO SECTION */}
      <section style={{ padding: '70px 4vw 80px', background: '#F5F5F9' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          {/* Contact Form Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '28px',
            padding: '44px 48px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.05)',
            textAlign: 'left',
            marginBottom: '60px'
          }}>
            <SectionHeading align="left" marginBottom="20px" accentWidth="40%" accentMaxWidth="220px">
              Contact <span style={{ color: '#00a8ff' }}>Form</span>
            </SectionHeading>

            {submitted ? (
              <div style={{
                background: '#f0fdf4',
                border: '1.5px solid #86efac',
                borderRadius: '20px',
                padding: '40px 24px',
                textAlign: 'center'
              }}>
                <CheckCircle2 style={{ width: '56px', height: '56px', color: '#16a34a', margin: '0 auto 16px' }} />
                <h4 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#14532d', marginBottom: '8px' }}>Inquiry Submitted Successfully!</h4>
                <p style={{ color: '#166534', fontSize: '14px', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto 20px' }}>
                  Thank you for your interest. Our game zone specialist will connect with you shortly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', email: '', inquiry: '' }); }}
                  style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '12px', fontWeight: '800', cursor: 'pointer' }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#475569', marginBottom: '8px' }}>Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: '600' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#475569', marginBottom: '8px' }}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter your phone number"
                      style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: '600' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#475569', marginBottom: '8px' }}>Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email address"
                      style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#475569', marginBottom: '8px' }}>Inquiry *</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.inquiry}
                    onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                    placeholder="Describe your inquiry, space requirements, or questions..."
                    style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', lineHeight: 1.6 }}
                  />
                </div>

                <div style={{ textAlign: 'left', marginTop: '6px' }}>
                  <button
                    type="submit"
                    style={{
                      background: '#38bdf8',
                      color: '#ffffff',
                      fontSize: '14.5px',
                      fontWeight: '900',
                      padding: '14px 36px',
                      borderRadius: '14px',
                      border: '2px solid #ffcd00',
                      boxShadow: '0 8px 22px rgba(56, 189, 248, 0.35)',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Send style={{ width: '18px', height: '18px' }} /> Request Free Consultation
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* PHONE & EMAIL STRIP */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '30px',
            marginBottom: '60px'
          }}>
            {/* Phone No. Box */}
            <div style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '32px 36px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              textAlign: 'left'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: '#e0f2fe',
                color: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Phone style={{ width: '26px', height: '26px' }} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>Phone No.</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <a href="tel:+919428989488" style={{ color: '#00a8ff', fontWeight: '800', fontSize: '16px', textDecoration: 'none' }}>+91 94289 89488</a>
                  <a href="tel:+919512356766" style={{ color: '#00a8ff', fontWeight: '800', fontSize: '16px', textDecoration: 'none' }}>+91 95123 56766</a>
                </div>
              </div>
            </div>

            {/* Email Us Box */}
            <div style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '32px 36px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              textAlign: 'left'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: '#fef3c7',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Mail style={{ width: '26px', height: '26px' }} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>Email Us</h4>
                <a href="mailto:info@winera.in" style={{ color: '#0f172a', fontWeight: '800', fontSize: '16px', textDecoration: 'none' }}>info@winera.in</a>
              </div>
            </div>
          </div>

          {/* OUR 2 ADDRESSES: SURAT AND CHINA */}
          <div style={{ marginBottom: '60px', textAlign: 'left' }}>
            <SectionHeading align="left" marginBottom="24px" accentWidth="50%" accentMaxWidth="320px">
              Our 2 <span style={{ color: '#00a8ff' }}>Global Locations</span>
            </SectionHeading>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              {/* Surat India Office */}
              <div style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '32px',
                border: '1.5px solid #38bdf8',
                boxShadow: '0 15px 40px rgba(56, 189, 248, 0.08)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Building2 style={{ width: '20px', height: '20px' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>Surat Headquarters (India)</h3>
                    <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: '800' }}>Corporate & Sales Office</span>
                  </div>
                </div>
                <p style={{ color: '#475569', fontSize: '13.5px', lineHeight: 1.6, fontWeight: '500', margin: 0 }}>
                  Winera International Pvt. Ltd.<br />
                  Surat, Gujarat, India.<br />
                  Hotline: +91 94289 89488 / +91 95123 56766
                </p>
              </div>

              {/* China Manufacturing Facility */}
              <div style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '32px',
                border: '1.5px solid #ffcd00',
                boxShadow: '0 15px 40px rgba(255, 205, 0, 0.12)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Globe style={{ width: '20px', height: '20px' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>China Manufacturing Facility</h3>
                    <span style={{ fontSize: '12px', color: '#d97706', fontWeight: '800' }}>Sourcing & Assembly Hub</span>
                  </div>
                </div>
                <p style={{ color: '#475569', fontSize: '13.5px', lineHeight: 1.6, fontWeight: '500', margin: 0 }}>
                  Winera International Global Assembly Base<br />
                  Guangzhou / Panyu Amusement Equipment Zone,<br />
                  Guangdong Province, China.
                </p>
              </div>
            </div>
          </div>

          {/* INTERACTIVE MAP EMBED */}
          <div style={{ textAlign: 'left' }}>
            <SectionHeading align="left" marginBottom="20px" accentWidth="40%" accentMaxWidth="240px">
              Location <span style={{ color: '#00a8ff' }}>Map</span>
            </SectionHeading>

            <div style={{
              width: '100%',
              height: '420px',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.1)',
              border: '4px solid #ffffff'
            }}>
              <iframe
                title="Winera International Surat Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238130.15372332616!2d72.68220805!3d21.1591425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
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

      {/* 4. CTA BANNER */}
      <CtaBanner />

      {/* 5. FOOTER */}
      <Footer footerData={footer} />
    </div>
  );
}
