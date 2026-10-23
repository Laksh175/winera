import React from 'react';
import { Upload } from 'lucide-react';
import { uploadImageFile } from '../services/api';

const wineraLogo = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345673/winera_uploads/dqjnjhybdtibqy4soznu.png";

const defaultHeaderNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/why-us' },
  { label: 'Project', href: '/project' },
  { label: 'Contact Us', href: '/contact' }
];
const defaultHeaderProductSubMenu = [
  { label: 'Arcade Games', href: '/product/arcade-games' },
  { label: 'VR Games', href: '/product/vr-games' },
  { label: 'AR Games', href: '/product/ar-games' },
  { label: 'Bowling Alley', href: '/product/bowling-alley' },
  { label: 'Trampoline Park', href: '/product/trampoline-park' },
  { label: 'Soft Play', href: '/product/soft-play' },
  { label: 'Bumper Car', href: '/product/bumper-car' },
  { label: 'Hypergrid', href: '/product/hypergrid' },
  { label: 'Amusement Park', href: '/product/amusement-park' },
  { label: 'Laser Tag', href: '/product/laser-tag' }
];
const defaultHeaderResourcesSubMenu = [
  { label: 'Blog', href: '/blog' },
  { label: 'ROI', href: '/resource/roi' },
  { label: 'Safety Standards', href: '/resource/safety-standards' }
];

const defaultHeaderData = {
  logoUrl: wineraLogo,
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  youtubeUrl: 'https://youtube.com',
  twitterUrl: 'https://x.com',
  whatsappUrl: 'https://wa.me/919157873576',
  navLinks: defaultHeaderNavLinks,
  productSubMenu: defaultHeaderProductSubMenu,
  resourcesSubMenu: defaultHeaderResourcesSubMenu,
  ctaText: 'Free Consultation',
  ctaLink: 'https://wa.me/919157873576'
};

const getAdminValidImageUrl = (url, fallback) => {
  if (!url) return fallback;
  if (typeof url === 'object' && url.default) return url.default;
  if (typeof url !== 'string' || url.trim() === '') return fallback;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }
  if (url.startsWith('/uploads')) {
    const hostname = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';
    return `http://${hostname}:5001${url}`;
  }
  if (url.startsWith('/') || url.startsWith('./')) {
    return url;
  }
  return fallback;
};

export default function HeaderDashboard({
  activeSection,
  formData = {},
  setFormData,
  handleFieldChange,
  persistSectionToDatabase,
  admin,
  setStatusMsg
}) {
  return (
    <>
          {activeSection === 'header' && (() => {
            const currentSec = formData.header || defaultHeaderData;

            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Header Details & Logo Settings</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Header Logo Image */}
                  <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '10px' }}>
                      Header Logo Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended: 240 × 60 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <img src={getAdminValidImageUrl(currentSec.logoUrl, wineraLogo)} alt="Header Logo" style={{ height: '48px', maxWidth: '180px', objectFit: 'contain', background: '#fff', padding: '4px 10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                      <input
                        type="text"
                        value={currentSec.logoUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, header: { ...(prev.header || defaultHeaderData), logoUrl: e.target.value } }))}
                        placeholder="Header Logo Image URL"
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                      <label style={{ padding: '12px 20px', background: '#38bdf8', color: '#ffffff', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Upload style={{ width: '16px', height: '16px' }} /> Upload
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const res = await uploadImageFile(file, admin.token);
                              setFormData(prev => ({ ...prev, header: { ...(prev.header || defaultHeaderData), logoUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                        🏷️ Header Logo Alt Text (SEO Keyword)
                      </label>
                      <input
                        type="text"
                        value={currentSec.logoAlt || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, header: { ...(prev.header || defaultHeaderData), logoAlt: e.target.value } }))}
                        placeholder="e.g. Winera International - Commercial Game Zone Setup & Turnkey Solutions"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>

                  {/* Social Profile URLs */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                        Facebook Profile URL
                      </label>
                      <input
                        type="text"
                        value={currentSec.facebookUrl || defaultHeaderData.facebookUrl || 'https://facebook.com'}
                        onChange={(e) => setFormData(prev => ({ ...prev, header: { ...(prev.header || defaultHeaderData), facebookUrl: e.target.value } }))}
                        placeholder="https://facebook.com"
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                        Instagram Profile URL
                      </label>
                      <input
                        type="text"
                        value={currentSec.instagramUrl || defaultHeaderData.instagramUrl || 'https://instagram.com'}
                        onChange={(e) => setFormData(prev => ({ ...prev, header: { ...(prev.header || defaultHeaderData), instagramUrl: e.target.value } }))}
                        placeholder="https://instagram.com"
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                        YouTube Channel URL
                      </label>
                      <input
                        type="text"
                        value={currentSec.youtubeUrl || defaultHeaderData.youtubeUrl || 'https://youtube.com'}
                        onChange={(e) => setFormData(prev => ({ ...prev, header: { ...(prev.header || defaultHeaderData), youtubeUrl: e.target.value } }))}
                        placeholder="https://youtube.com"
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                        X (Twitter) Profile URL
                      </label>
                      <input
                        type="text"
                        value={currentSec.twitterUrl || defaultHeaderData.twitterUrl || 'https://x.com'}
                        onChange={(e) => setFormData(prev => ({ ...prev, header: { ...(prev.header || defaultHeaderData), twitterUrl: e.target.value } }))}
                        placeholder="https://x.com"
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  {/* WhatsApp Contact Link */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      WhatsApp Contact Link / Number
                    </label>
                    <input
                      type="text"
                      value={currentSec.whatsappUrl || defaultHeaderData.whatsappUrl || 'https://wa.me/919157873576'}
                      onChange={(e) => setFormData(prev => ({ ...prev, header: { ...(prev.header || defaultHeaderData), whatsappUrl: e.target.value } }))}
                      placeholder="https://wa.me/919157873576"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('header', formData.header || defaultHeaderData)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Header Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
    </>
  );
}
