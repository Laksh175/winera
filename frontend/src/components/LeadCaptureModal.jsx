import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, Phone, User, Globe, Send, Loader2, ChevronDown, MessageCircle } from 'lucide-react';
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
  if (!url || url === '/') return 'Home';
  if (url.includes('/arcade-game')) return 'Arcade Games';
  if (url.includes('/bowling-alley')) return 'Bowling Alley';
  if (url.includes('/soft-play')) return 'Soft Play';
  if (url.includes('/trampoline-park')) return 'Trampoline Park';
  if (url.includes('/amusement-park')) return 'Amusement Park';
  if (url.includes('/hypergrid')) return 'Hypergrid';
  if (url.includes('/bumper-car')) return 'Bumper Cars';
  if (url.includes('/vr-games')) return 'VR Games';
  if (url.includes('/ar-games')) return 'AR Games';
  if (url.includes('/laser-tag')) return 'Laser Tag';
  if (url.includes('/project')) return 'Turnkey Projects';
  if (url.includes('/roi')) return 'ROI Calculator';
  if (url.includes('/blog')) return 'Blog';
  if (url.includes('/about') || url.includes('/why-us') || url.includes('/why')) return 'About Us';
  if (url.includes('/contact')) return 'Contact Us';
  if (url.includes('/safety-standards')) return 'Safety Standards';

  if (passedSource && (
    passedSource.toLowerCase().includes('page') ||
    passedSource.toLowerCase().includes('home') ||
    passedSource.toLowerCase().includes('about')
  )) {
    return cleanSourceText(passedSource).replace(/\s*page\s*$/i, '');
  }

  return (cleanSourceText(passedSource) || 'Game Zone Consultation').replace(/\s*page\s*$/i, '');
};

export const getProfessionalInquiryDetails = (sourceName, url = '') => {
  const cleanSource = (sourceName || '').replace(/\s*page\s*$/i, '').trim();
  const lowerUrl = (url || '').toLowerCase();
  const lowerSource = cleanSource.toLowerCase();

  // If specific product (e.g. category › product)
  if (cleanSource.includes('›')) {
    const parts = cleanSource.split('›').map(s => s.trim());
    const prodName = parts[parts.length - 1];
    return {
      interest: cleanSource,
      message: `Looking for pricing, technical specifications & quotation for "${prodName}".`
    };
  }

  if (lowerUrl.includes('/trampoline-park') || lowerSource.includes('trampoline')) {
    return {
      interest: 'Trampoline Park',
      message: 'Interested in Trampoline Park setup, design & project quotation.'
    };
  }
  if (lowerUrl.includes('/arcade-game') || lowerSource.includes('arcade')) {
    return {
      interest: 'Arcade Games',
      message: 'Looking for Arcade Game machines catalog, pricing & commercial setup.'
    };
  }
  if (lowerUrl.includes('/soft-play') || lowerSource.includes('soft play')) {
    return {
      interest: 'Soft Play Area',
      message: 'Interested in Indoor Soft Play Area design, equipment & project quotation.'
    };
  }
  if (lowerUrl.includes('/bowling-alley') || lowerSource.includes('bowling')) {
    return {
      interest: 'Bowling Alley',
      message: 'Looking for Bowling Alley lane installation, specifications & quotation.'
    };
  }
  if (lowerUrl.includes('/vr-games') || lowerSource.includes('vr')) {
    return {
      interest: 'VR Games',
      message: 'Interested in VR Gaming equipment setup, pricing & commercial catalog.'
    };
  }
  if (lowerUrl.includes('/ar-games') || lowerSource.includes('ar')) {
    return {
      interest: 'AR Games',
      message: 'Interested in AR Interactive Games setup & project quotation.'
    };
  }
  if (lowerUrl.includes('/amusement-park') || lowerSource.includes('amusement')) {
    return {
      interest: 'Amusement Park',
      message: 'Looking for Amusement Park rides, equipment & turnkey project quotation.'
    };
  }
  if (lowerUrl.includes('/bumper-car') || lowerSource.includes('bumper')) {
    return {
      interest: 'Bumper Cars',
      message: 'Interested in Bumper Car setup, arena tracks & equipment pricing.'
    };
  }
  if (lowerUrl.includes('/laser-tag') || lowerSource.includes('laser')) {
    return {
      interest: 'Laser Tag Arena',
      message: 'Looking for Laser Tag arena design, equipment & project quotation.'
    };
  }
  if (lowerUrl.includes('/hypergrid') || lowerSource.includes('hypergrid')) {
    return {
      interest: 'Hypergrid LED Floor',
      message: 'Interested in Hypergrid interactive LED floor game setup & quotation.'
    };
  }
  if (lowerUrl.includes('/roi') || lowerSource.includes('roi')) {
    return {
      interest: 'ROI & Project Planning',
      message: 'Looking for investment guidance & ROI calculation for Game Zone setup.'
    };
  }
  if (lowerUrl.includes('/project') || lowerSource.includes('project')) {
    return {
      interest: 'Turnkey Projects',
      message: 'Interested in turnkey Game Zone setup and past project portfolio details.'
    };
  }

  return {
    interest: cleanSource || 'Game Zone Consultation',
    message: 'Looking for commercial Game Zone setup, consultation & project quotation.'
  };
};

export default function LeadCaptureModal({ isOpen, onClose, pageSource, pageUrl }) {
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [waLink, setWaLink] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setPhone('');
      setSubmitted(false);
      setWaLink('');
      setErrorMsg('');
      setIsCountryDropdownOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && typeof document !== 'undefined') {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
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
      const inquiryDetails = getProfessionalInquiryDetails(currentSource, currentUrl);

      const resData = await submitLeadApi({
        name: name.trim(),
        countryCode,
        phone: phone.trim(),
        pageSource: `${inquiryDetails.interest} - ${inquiryDetails.message}`,
        pageUrl: currentUrl
      });

      if (resData && resData.success) {
        const targetPhone = '919157873576';
        const fullPhoneNum = `${countryCode} ${phone.trim()}`;
        const fullPageUrl = typeof window !== 'undefined' && window.location.href.startsWith('http')
          ? window.location.href
          : (currentUrl.startsWith('http') ? currentUrl : `https://winerainternational.com${currentUrl}`);

        const messageLines = [
          'Hello Winera International! 👋',
          '',
          '*New Website Inquiry:*',
          `👤 *Name:* ${name.trim()}`,
          `📞 *Phone:* ${fullPhoneNum}`,
          `📌 *Interest:* ${inquiryDetails.interest}`,
          `💬 *Message:* ${inquiryDetails.message}`,
          `🌐 *Page Link:* ${fullPageUrl}`
        ];

        const rawWaText = messageLines.join('\n');
        const generatedWaUrl = `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(rawWaText)}`;

        setWaLink(generatedWaUrl);
        setSubmitted(true);

        // Auto open WhatsApp
        setTimeout(() => {
          try {
            const newWin = window.open(generatedWaUrl, '_blank');
            if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
              window.location.href = generatedWaUrl;
            }
          } catch (e) {
            window.location.href = generatedWaUrl;
          }
        }, 900);

        setTimeout(() => {
          onClose();
        }, 5500);
      } else {
        setErrorMsg(resData.message || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const modalContent = (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        padding: '20px',
        margin: 0,
        boxSizing: 'border-box'
      }}
      onClick={onClose}
    >
      <div
        className="winera-lead-modal-card"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '460px',
          background: '#ffffff',
          borderRadius: '24px',
          padding: '32px 28px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1.5px solid #e0f2fe',
          overflow: 'visible'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Row with Ref Badge (Left) & Close Button (Right) - No overlapping! */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: submitted ? 'flex-end' : 'space-between',
          gap: '12px',
          marginBottom: submitted ? '0' : '14px',
          width: '100%',
          minHeight: '34px'
        }}>
          {!submitted && (
            <div
              title={`Ref: ${currentSource}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#e0f2fe',
                color: '#0284c7',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.3px',
                maxWidth: 'calc(100% - 44px)',
                minWidth: 0,
                boxSizing: 'border-box'
              }}
            >
              <Globe style={{ width: '13px', height: '13px', flexShrink: 0 }} />
              <span style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'inline-block'
              }}>
                Ref: {currentSource}
              </span>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              cursor: 'pointer',
              transition: 'all 0.2s',
              marginLeft: 'auto'
            }}
            aria-label="Close Modal"
          >
            <X style={{ width: '16px', height: '16px' }} />
          </button>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 12px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', marginBottom: '16px' }}>
              <CheckCircle2 style={{ width: '38px', height: '38px' }} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>
              Thank You, {name}!
            </h3>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, marginBottom: '16px' }}>
              Your inquiry has been received by our admin team.
            </p>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '12px 14px', marginBottom: '18px' }}>
              <p style={{ margin: 0, fontSize: '13px', color: '#166534', fontWeight: '600' }}>
                Connecting directly to our specialist on WhatsApp (+91 91578 73576)...
              </p>
            </div>
            {waLink && (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#25D366',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontWeight: '800',
                  fontSize: '14px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
                  transition: 'all 0.2s ease'
                }}
              >
                <MessageCircle style={{ width: '18px', height: '18px' }} />
                Open WhatsApp Chat Now
              </a>
            )}
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ marginBottom: '20px' }}>
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
                  {/* Custom Country Code Dropdown */}
                  <div ref={dropdownRef} className="winera-country-select-container" style={{ position: 'relative', width: '110px', flexShrink: 0 }}>
                    <button
                      type="button"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      className="winera-country-trigger-btn"
                      style={{
                        width: '100%',
                        padding: '12px 10px',
                        borderRadius: '14px',
                        border: isCountryDropdownOpen ? '1.5px solid #0284c7' : '1.5px solid #cbd5e1',
                        background: '#f8fafc',
                        fontSize: '13.5px',
                        fontWeight: '800',
                        color: '#0f172a',
                        outline: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '4px',
                        boxSizing: 'border-box'
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <span>{selectedCountry.flag}</span>
                        <span>{selectedCountry.code}</span>
                      </span>
                      <ChevronDown style={{
                        width: '14px',
                        height: '14px',
                        color: '#64748b',
                        flexShrink: 0,
                        transition: 'transform 0.2s',
                        transform: isCountryDropdownOpen ? 'rotate(180deg)' : 'rotate(0)'
                      }} />
                    </button>

                    {/* Scrollable Country List Popup */}
                    {isCountryDropdownOpen && (
                      <div
                        className="winera-country-dropdown-popup"
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 6px)',
                          left: 0,
                          zIndex: 999,
                          width: '255px',
                          maxHeight: '190px',
                          overflowY: 'auto',
                          background: '#ffffff',
                          border: '1.5px solid #e2e8f0',
                          borderRadius: '16px',
                          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.18)',
                          padding: '6px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                          boxSizing: 'border-box'
                        }}
                      >
                        {COUNTRY_CODES.map((c) => {
                          const isSelected = c.code === countryCode;
                          return (
                            <button
                              key={`${c.country}-${c.code}`}
                              type="button"
                              onClick={() => {
                                handleCountryChange(c.code);
                                setIsCountryDropdownOpen(false);
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                padding: '9px 12px',
                                borderRadius: '10px',
                                border: 'none',
                                background: isSelected ? '#e0f2fe' : 'transparent',
                                color: isSelected ? '#0284c7' : '#0f172a',
                                fontSize: '13px',
                                fontWeight: isSelected ? '800' : '600',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'background 0.15s'
                              }}
                              onMouseEnter={(e) => {
                                if (!isSelected) e.currentTarget.style.background = '#f1f5f9';
                              }}
                              onMouseLeave={(e) => {
                                if (!isSelected) e.currentTarget.style.background = 'transparent';
                              }}
                            >
                              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                <span style={{ fontSize: '15px' }}>{c.flag}</span>
                                <span style={{ fontWeight: '800' }}>{c.code}</span>
                                <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '500' }}>({c.country})</span>
                              </span>
                              {isSelected && <CheckCircle2 style={{ width: '15px', height: '15px', color: '#0284c7', flexShrink: 0 }} />}
                            </button>
                          );
                        })}
                      </div>
                    )}
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

  if (typeof document !== 'undefined' && document.body) {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
}
