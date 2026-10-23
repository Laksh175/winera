import React from 'react';
import { Upload } from 'lucide-react';
import { uploadImageFile } from '../services/api';

const wineraLogo = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345673/winera_uploads/dqjnjhybdtibqy4soznu.png";

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

const defaultFooterProductLinks = [
  { name: "Arcade Games", link: "/product/arcade-games" },
  { name: "Bowling Alley", link: "/product/bowling-alley" },
  { name: "Soft Play", link: "/product/soft-play" },
  { name: "Trampoline Park", link: "/product/trampoline-park" },
  { name: "VR Games", link: "/product/vr-games" },
  { name: "AR Games", link: "/product/ar-games" },
  { name: "Bumper Car", link: "/product/bumper-car" },
  { name: "Amusement Park", link: "/product/amusement-park" },
  { name: "Hypergrid", link: "/product/hypergrid" },
  { name: "Laser Tag", link: "/product/laser-tag" }
];

const defaultFooterQuickLinks = [
  { name: "About Us", link: "/why-us" },
  { name: "Contact Us", link: "/contact" },
  { name: "Privacy Policy", link: "/privacy-policy" },
  { name: "Terms & Conditions", link: "/terms-and-conditions" }
];

const defaultFooterResourceLinks = [
  { name: "Blog", link: "/blog" },
  { name: "Project", link: "/project" },
  { name: "ROI", link: "/resource/roi" },
  { name: "Safety Standards", link: "/resource/safety-standards" }
];

const defaultFooterData = {
  logoUrl: wineraLogo,
  tagline: "Winera is a professional solution provider and builder specializing in indoor amusement parks and playground equipment.",
  productLinks: defaultFooterProductLinks,
  quickLinks: defaultFooterQuickLinks,
  resourceLinks: defaultFooterResourceLinks,
  phone1: "+91 91578 73576",
  phone2: "+91 95123 56766",
  email: "info@winera.in",
  copyright: "© 2026 Winera International Pvt. Ltd. All Rights Reserved."
};


export default function FooterDashboard({
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
          {activeSection === 'footer' && (() => {
            const currentSec = formData.footer || defaultFooterData;

            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Footer Details Settings</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* 1. Footer Logo & Tagline */}
                  <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '10px' }}>
                      Footer Logo Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended: 240 × 60 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '14px' }}>
                      <img src={getAdminValidImageUrl(currentSec.logoUrl, wineraLogo)} alt="Footer Logo" style={{ height: '48px', maxWidth: '180px', objectFit: 'contain', background: '#fff', padding: '4px 10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                      <input
                        type="text"
                        value={currentSec.logoUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, footer: { ...(prev.footer || defaultFooterData), logoUrl: e.target.value } }))}
                        placeholder="Footer Logo Image URL"
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
                              setFormData(prev => ({ ...prev, footer: { ...(prev.footer || defaultFooterData), logoUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                        🏷️ Footer Logo Alt Text (SEO Keyword)
                      </label>
                      <input
                        type="text"
                        value={currentSec.logoAlt || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, footer: { ...(prev.footer || defaultFooterData), logoAlt: e.target.value } }))}
                        placeholder="e.g. Winera International - Commercial Game Zone Developer & Manufacturer"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>Footer About Tagline Paragraph</label>
                      <textarea
                        rows={3}
                        value={currentSec.tagline || defaultFooterData.tagline}
                        onChange={(e) => setFormData(prev => ({ ...prev, footer: { ...(prev.footer || defaultFooterData), tagline: e.target.value } }))}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  {/* 2. Contact Info & Copyright */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Phone Number 1</label>
                      <input
                        type="text"
                        value={currentSec.phone1 || defaultFooterData.phone1}
                        onChange={(e) => setFormData(prev => ({ ...prev, footer: { ...(prev.footer || defaultFooterData), phone1: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Phone Number 2</label>
                      <input
                        type="text"
                        value={currentSec.phone2 || defaultFooterData.phone2}
                        onChange={(e) => setFormData(prev => ({ ...prev, footer: { ...(prev.footer || defaultFooterData), phone2: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Email Address</label>
                      <input
                        type="text"
                        value={currentSec.email || defaultFooterData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, footer: { ...(prev.footer || defaultFooterData), email: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Copyright Notice Text</label>
                    <input
                      type="text"
                      value={currentSec.copyright || defaultFooterData.copyright}
                      onChange={(e) => setFormData(prev => ({ ...prev, footer: { ...(prev.footer || defaultFooterData), copyright: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('footer', formData.footer || defaultFooterData)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Footer Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

    </>
  );
}
