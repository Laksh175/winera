import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Phone, User, Globe, Send, Loader2 } from 'lucide-react';
import { submitLeadApi } from '../services/api';

const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳', digits: 10 },
  { code: '+1', country: 'USA / Canada', flag: '🇺🇸', digits: 10 },
  { code: '+971', country: 'UAE', flag: '🇦🇪', digits: 9 },
  { code: '+44', country: 'UK', flag: '🇬🇧', digits: 10 },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦', digits: 9 },
  { code: '+65', country: 'Singapore', flag: '🇸🇬', digits: 8 },
  { code: '+974', country: 'Qatar', flag: '🇶🇦', digits: 8 },
  { code: '+968', country: 'Oman', flag: '🇴🇲', digits: 8 },
  { code: '+965', country: 'Kuwait', flag: '🇰🇼', digits: 8 },
  { code: '+973', country: 'Bahrain', flag: '🇧🇭', digits: 8 },
  { code: '+61', country: 'Australia', flag: '🇦🇺', digits: 9 },
  { code: '+49', country: 'Germany', flag: '🇩🇪', digits: 11, minDigits: 10 },
  { code: '+33', country: 'France', flag: '🇫🇷', digits: 9 },
  { code: '+39', country: 'Italy', flag: '🇮🇹', digits: 10 },
  { code: '+81', country: 'Japan', flag: '🇯🇵', digits: 10 },
  { code: '+86', country: 'China', flag: '🇨🇳', digits: 11 },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾', digits: 10, minDigits: 9 },
  { code: '+66', country: 'Thailand', flag: '🇹🇭', digits: 9 },
  { code: '+62', country: 'Indonesia', flag: '🇮🇩', digits: 11, minDigits: 10 },
  { code: '+977', country: 'Nepal', flag: '🇳🇵', digits: 10 },
  { code: '+880', country: 'Bangladesh', flag: '🇧🇩', digits: 10 },
  { code: '+94', country: 'Sri Lanka', flag: '🇱🇰', digits: 9 },
  { code: '+27', country: 'South Africa', flag: '🇿🇦', digits: 9 },
  { code: '+55', country: 'Brazil', flag: '🇧🇷', digits: 11 },
  { code: '+52', country: 'Mexico', flag: '🇲🇽', digits: 10 },
  { code: '+7', country: 'Russia', flag: '🇷🇺', digits: 10 }
];

const cleanSourceText = (text) => {
  if (!text || typeof text !== 'string') return 'Website CTA';
  return text
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/\*{1,2}(.*?)\*{1,2}/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
};

const resolvePageName = (passedSource, pageUrl) => {
  const url = pageUrl || (typeof window !== 'undefined' ? window.location.pathname : '/');

  // If passedSource contains '›' (like "Arcade Games › Parkour Motor II (DX)"), use it!
  if (passedSource && passedSource.includes('›')) {
    return cleanSourceText(passedSource);
  }

  // Check product URL pattern: /product/category-slug/product-slug
  if (url.includes('/product/')) {
    const segments = url.split('/').filter(Boolean);
    if (segments.length >= 3) {
      const categorySlug = segments[1];
      const productSlug = segments[2];
      
      const categoryName = categorySlug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      let productName = productSlug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      if (passedSource && !passedSource.includes('http') && !passedSource.includes('/') && passedSource.length < 60) {
        const cleaned = cleanSourceText(passedSource);
        if (cleaned && !cleaned.toLowerCase().includes('consultation') && !cleaned.toLowerCase().includes('journey')) {
          productName = cleaned;
        }
      }

      return `${categoryName} › ${productName}`;
    }
  }

  // Exact Page URL Mapping
  if (!url || url === '/') return 'Home Page';
  if (url.includes('/arcade-game')) return 'Arcade Games Page';
  if (url.includes('/bowling-alley')) return 'Bowling Alley Page';
  if (url.includes('/soft-play')) return 'Soft Play Page';
  if (url.includes('/trampoline-park')) return 'Trampoline Park Page';
  if (url.includes('/amusement-park')) return 'Amusement Park Page';
  if (url.includes('/hypergrid')) return 'Hypergrid Page';
  if (url.includes('/bumper-car')) return 'Bumper Car Page';
  if (url.includes('/vr-games')) return 'VR Games Page';
  if (url.includes('/ar-games')) return 'AR Games Page';
  if (url.includes('/project')) return 'Projects Page';
  if (url.includes('/roi')) return 'ROI Calculator Page';
  if (url.includes('/blog')) return 'Blog Page';
  if (url.includes('/about') || url.includes('/why-us') || url.includes('/why')) return 'About Us Page';
  if (url.includes('/contact')) return 'Contact Us Page';
  if (url.includes('/safety-standards')) return 'Safety Standards Page';

  if (passedSource && (
    passedSource.toLowerCase().includes('page') ||
    passedSource.toLowerCase().includes('home') ||
    passedSource.toLowerCase().includes('about')
  )) {
    return cleanSourceText(passedSource);
  }

  return cleanSourceText(passedSource) || 'Website Page';
};

export default function LeadCaptureModal({ isOpen, onClose, pageSource, pageUrl }) {
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const currentUrl = pageUrl || (typeof window !== 'undefined' ? window.location.pathname : '/');
  const currentSource = resolvePageName(pageSource, currentUrl);

  const selectedCountry = COUNTRY_CODES.find(c => c.code === countryCode) || COUNTRY_CODES[0];
  const maxDigits = selectedCountry.digits || 10;
  const minDigits = selectedCountry.minDigits || maxDigits;

  const handleCountryChange = (newCode) => {
    setCountryCode(newCode);
    const newCountry = COUNTRY_CODES.find(c => c.code === newCode) || COUNTRY_CODES[0];
    if (phone.length > newCountry.digits) {
      setPhone(phone.slice(0, newCountry.digits));
    }
  };

  const handlePhoneChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, '');
    if (onlyNums.length <= maxDigits) {
      setPhone(onlyNums);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setPhone('');
      setSubmitted(false);
      setErrorMsg('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter your phone number');
      return;
    }

    if (phone.trim().length < minDigits) {
      if (minDigits === maxDigits) {
        setErrorMsg(`Please enter a valid ${selectedCountry.country} phone number (${maxDigits} digits required)`);
      } else {
        setErrorMsg(`Please enter a valid ${selectedCountry.country} phone number (${minDigits}-${maxDigits} digits required)`);
      }
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const resData = await submitLeadApi({
        name: name.trim(),
        countryCode,
        phone: phone.trim(),
        pageSource: currentSource,
        pageUrl: currentUrl
      });

      if (resData && resData.success) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
        }, 2200);
      } else {
        setErrorMsg(resData.message || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '460px',
          background: '#ffffff',
          borderRadius: '24px',
          padding: '32px 28px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1.5px solid #e0f2fe',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          aria-label="Close Modal"
        >
          <X style={{ width: '18px', height: '18px' }} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px 10px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', marginBottom: '16px' }}>
              <CheckCircle2 style={{ width: '38px', height: '38px' }} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>
              Thank You, {name}!
            </h3>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5 }}>
              Your inquiry has been received. Our team will contact you shortly on <strong>{countryCode} {phone}</strong>.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ marginBottom: '22px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#e0f2fe', color: '#0284c7', padding: '4px 12px', borderRadius: '20px', fontSize: '11.5px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
                <Globe style={{ width: '13px', height: '13px' }} />
                Ref: {currentSource}
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: '#0f172a', margin: 0, lineHeight: 1.25 }}>
                Get In Touch With Winera
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '6px 0 0', fontWeight: '500' }}>
                Fill details below to get direct consultation & project quote.
              </p>
            </div>

            {errorMsg && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: '12px', fontSize: '13px', fontWeight: '600', marginBottom: '16px' }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Name Field */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <User style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#94a3b8' }} />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      borderRadius: '14px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '14px',
                      fontWeight: '600',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* International Phone Number Field */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                  Mobile / Phone Number *
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {/* Country Code Select */}
                  <div style={{ position: 'relative', width: '130px', flexShrink: 0 }}>
                    <select
                      value={countryCode}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 8px 12px 12px',
                        borderRadius: '14px',
                        border: '1.5px solid #cbd5e1',
                        background: '#f8fafc',
                        fontSize: '13.5px',
                        fontWeight: '700',
                        color: '#0f172a',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={`${c.country}-${c.code}`} value={c.code}>
                          {c.flag} {c.code} ({c.country})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Number Input */}
                  <div style={{ position: 'relative', flex: 1 }}>
                    <Phone style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '17px', height: '17px', color: '#94a3b8' }} />
                    <input
                      type="tel"
                      required
                      maxLength={maxDigits}
                      placeholder={`${maxDigits} digits`}
                      value={phone}
                      onChange={handlePhoneChange}
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 40px',
                        borderRadius: '14px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '14px',
                        fontWeight: '600',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', fontWeight: '600', textAlign: 'right' }}>
                  {phone.length}/{maxDigits} digits ({selectedCountry.country})
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  marginTop: '8px',
                  background: 'linear-gradient(90deg, #28b4ee 0%, #0284c7 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px 20px',
                  borderRadius: '14px',
                  fontWeight: '900',
                  fontSize: '15px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
                  transition: 'all 0.2s ease'
                }}
              >
                {loading ? (
                  <>
                    <Loader2 style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite' }} />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send style={{ width: '16px', height: '16px' }} />
                    Submit Request
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
