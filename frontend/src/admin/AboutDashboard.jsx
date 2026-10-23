import React from 'react';
import { Upload, Plus, Trash2 } from 'lucide-react';
import RichTextareaWithEditor from '../components/RichTextareaWithEditor';
import { uploadImageFile } from '../services/api';

const defaultGameZoneMobileBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345484/winera_uploads/cjhcvoxksmptc84yslh2.png";
const aboutusCtaBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345524/winera_uploads/xk0ihsjpsavmxrrt07di.png";
const aboutHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345517/winera_uploads/wa3oylkwg39op9yozk90.png";
const welcomeWineraImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345693/winera_uploads/lqcqhjziwp6sl1zbinep.png";
const founderUnnit = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345649/winera_uploads/cjhrbui8tkykaxa9tztp.png";

const getAdminValidImageUrl = (url, fallback) => {
  if (!url) return fallback;
  if (typeof url === 'object' && url.default) return url.default;
  if (typeof url !== 'string' || url.trim() === '') return fallback;
  if (url.includes('mobile') || url.includes('Mobile')) return defaultGameZoneMobileBanner;
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

export default function AboutDashboard({
  activeSection,
  formData = {},
  setFormData,
  handleFieldChange,
  persistSectionToDatabase,
  admin,
  setStatusMsg,
  loadingSection
}) {
  return (
    <>
          {activeSection === 'aboutCta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>About Us CTA Banner Settings</h3>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '3px 0 0' }}>Manage title heading, description text, CTA button, and background banner image for About Us page.</p>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>
                  Main Title Heading
                </label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Use <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> for Yellow, <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>&lt;cyan&gt;word&lt;/cyan&gt;</code> for Cyan.</p>
                <input
                  type="text"
                  value={formData.aboutCta?.title !== undefined ? formData.aboutCta.title : "*TAKE THE NEXT STEP* <cyan>TOWARDS</cyan><br />*YOUR PERFECT* <cyan>GAME ZONE</cyan>"}
                  onChange={(e) => handleFieldChange('aboutCta', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '700' }}
                />
              </div>

              <RichTextareaWithEditor
                label="Description Paragraph"
                rows={3}
                value={formData.aboutCta?.description !== undefined ? formData.aboutCta.description : "Whether you're starting from scratch or upgrading an existing space our team is ready to help you plan, build, and launch a game zone that drives real revenue."}
                onChange={(val) => handleFieldChange('aboutCta', 'description', val)}
                placeholder="Enter description paragraph..."
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.aboutCta?.buttonText !== undefined ? formData.aboutCta.buttonText : "Book Consultation"}
                    onChange={(e) => handleFieldChange('aboutCta', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    Button Link / WhatsApp URL
                  </label>
                  <input
                    type="text"
                    value={formData.aboutCta?.buttonLink !== undefined ? formData.aboutCta.buttonLink : "https://wa.me/919157873576"}
                    onChange={(e) => handleFieldChange('aboutCta', 'buttonLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              {/* Background Banner Image */}
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Background Banner Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ position: 'relative', width: '180px', height: '65px', borderRadius: '10px', overflow: 'hidden', border: '1.5px solid #38bdf8' }}>
                    <img
                      src={getAdminValidImageUrl(formData.aboutCta?.bgUrl, aboutusCtaBg)}
                      alt="About Banner Background Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <label style={{
                    background: '#00a8ff',
                    color: '#ffffff',
                    padding: '10px 18px',
                    borderRadius: '12px',
                    fontWeight: '800',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(0, 168, 255, 0.3)'
                  }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Banner Image
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.aboutCta || {}), bgUrl: res.url };
                          setFormData(prev => ({ ...prev, aboutCta: updated }));
                          await persistSectionToDatabase('aboutCta', updated);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    />
                  </label>
                  <input
                    type="text"
                    value={formData.aboutCta?.bgUrl || ''}
                    onChange={(e) => handleFieldChange('aboutCta', 'bgUrl', e.target.value)}
                    placeholder="Image URL or upload banner with button"
                    style={{ flex: 1, minWidth: '220px', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                  />
                  {formData.aboutCta?.bgUrl && (
                    <button
                      type="button"
                      onClick={async () => {
                        const updated = { ...(formData.aboutCta || {}), bgUrl: '' };
                        setFormData(prev => ({ ...prev, aboutCta: updated }));
                        await persistSectionToDatabase('aboutCta', updated);
                      }}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Reset to Default Banner
                    </button>
                  )}
                </div>
                <div style={{ marginTop: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                    🏷️ Background Banner Alt Text (SEO Keyword)
                  </label>
                  <input
                    type="text"
                    value={formData.aboutCta?.bgAlt !== undefined ? formData.aboutCta.bgAlt : ''}
                    onChange={(e) => handleFieldChange('aboutCta', 'bgAlt', e.target.value)}
                    placeholder="e.g. Take The Next Step Towards Your Perfect Game Zone - Winera International"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('aboutCta', formData.aboutCta || {})}
                  style={{
                    background: '#38bdf8',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '12px',
                    fontWeight: '900',
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)'
                  }}
                >
                  Save About Us CTA Banner
                </button>
              </div>
            </div>
          )}

          {/* ABOUT HERO BANNER FORM */}
          {activeSection === 'aboutHero' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>About Us Hero Banner</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Hero Title (Use *word* for Yellow Highlight)
                </label>
                <input
                  type="text"
                  value={formData.aboutHero?.title || '*About* Us'}
                  onChange={(e) => handleFieldChange('aboutHero', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Breadcrumb Active Page Text
                </label>
                <input
                  type="text"
                  value={formData.aboutHero?.breadcrumbText || 'About Us'}
                  onChange={(e) => handleFieldChange('aboutHero', 'breadcrumbText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Hero Banner Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                </label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={formData.aboutHero?.bgUrl || ''}
                    onChange={(e) => handleFieldChange('aboutHero', 'bgUrl', e.target.value)}
                    placeholder="Image URL or Asset Path (e.g. /src/assets/about-us-banner.webp)"
                    style={{ flex: 1, padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px' }}
                  />
                  <label style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#38bdf8', color: '#ffffff', padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}>
                    <Upload style={{ width: '16px', height: '16px', marginRight: '6px' }} />
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={async (e) => {
                        if (e.target.files?.[0]) {
                          const res = await uploadImageFile(e.target.files[0], admin.token);
                          handleFieldChange('aboutHero', 'bgUrl', res.url);
                        }
                      }}
                    />
                  </label>
                  <img
                    src={getAdminValidImageUrl(formData.aboutHero?.bgUrl, aboutHeroBg)}
                    alt="About Hero Preview"
                    style={{ width: '100px', height: '70px', borderRadius: '10px', objectFit: 'cover', background: '#f8fafc', border: '1.5px solid #38bdf8', padding: '2px' }}
                  />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                    🏷️ Hero Banner Alt Text (SEO Keyword)
                  </label>
                  <input
                    type="text"
                    value={formData.aboutHero?.bgAlt || ''}
                    onChange={(e) => handleFieldChange('aboutHero', 'bgAlt', e.target.value)}
                    placeholder="e.g. About Winera International - Commercial Entertainment Solutions"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              {/* Mobile Screen Hero Banner Upload & Preview */}
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Mobile Screen Hero Banner <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📱 Recommended Size: 941 × 550 px</span>
                </label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={formData.aboutHero?.mobileBgUrl || ''}
                    onChange={(e) => handleFieldChange('aboutHero', 'mobileBgUrl', e.target.value)}
                    placeholder="Mobile Background Image URL"
                    style={{ flex: 1, padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px' }}
                  />
                  <label style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#38bdf8', color: '#ffffff', padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}>
                    <Upload style={{ width: '16px', height: '16px', marginRight: '6px' }} />
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={async (e) => {
                        if (e.target.files?.[0]) {
                          const res = await uploadImageFile(e.target.files[0], admin.token);
                          handleFieldChange('aboutHero', 'mobileBgUrl', res.url);
                        }
                      }}
                    />
                  </label>
                  <img
                    src={getAdminValidImageUrl(formData.aboutHero?.mobileBgUrl, defaultGameZoneMobileBanner)}
                    alt="About Mobile Hero Preview"
                    style={{ width: '100px', height: '70px', borderRadius: '10px', objectFit: 'cover', background: '#f8fafc', border: '1.5px solid #38bdf8', padding: '2px' }}
                  />
                  {formData.aboutHero?.mobileBgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('aboutHero', 'mobileBgUrl', '')}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                    🏷️ Mobile Background Image Alt Text (SEO Keyword)
                  </label>
                  <input
                    type="text"
                    value={formData.aboutHero?.mobileBgAlt || ''}
                    onChange={(e) => handleFieldChange('aboutHero', 'mobileBgAlt', e.target.value)}
                    placeholder="e.g. About Winera International Mobile Banner - Commercial Entertainment Solutions"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>
              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('aboutHero', formData.aboutHero || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save About Hero Banner
                </button>
              </div>
            </div>
          )}

          {/* WELCOME TO WINERA FORM */}
          {activeSection === 'aboutWelcome' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Welcome To Winera Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Main Title (Use *word* for Cyan Accent)
                </label>
                <input
                  type="text"
                  value={formData.aboutWelcome?.title || 'Welcome to *Winera International*'}
                  onChange={(e) => handleFieldChange('aboutWelcome', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>
              <RichTextareaWithEditor
                label="Main Description Paragraph"
                rows={4}
                value={formData.aboutWelcome?.desc !== undefined ? formData.aboutWelcome.desc : "Winera International Pvt. Ltd. is a Surat-based B2B leader in indoor amusement and playground solutions. Since 2014, we have been transforming commercial spaces into world-class entertainment destinations, handling everything from design and manufacturing to installation and after-sales support."}
                onChange={(val) => handleFieldChange('aboutWelcome', 'desc', val)}
                placeholder="Enter main description..."
              />

              {/* Single Welcome Section Photo Upload */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
                  Section Photo <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                </h4>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={formData.aboutWelcome?.mainImgUrl || formData.aboutWelcome?.img || ''}
                    onChange={(e) => {
                      const updated = { ...(formData.aboutWelcome || {}), mainImgUrl: e.target.value, img: e.target.value };
                      setFormData(prev => ({ ...prev, aboutWelcome: updated }));
                    }}
                    placeholder="Image URL or Asset Path (e.g. /src/assets/welcome-to-winera.webp)"
                    style={{ flex: 1, padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px' }}
                  />
                  <label style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: '#ffffff', padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                    <Upload style={{ width: '16px', height: '16px', marginRight: '6px' }} />
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={async (e) => {
                        if (e.target.files?.[0]) {
                          const res = await uploadImageFile(e.target.files[0], admin.token);
                          const updated = { ...(formData.aboutWelcome || {}), mainImgUrl: res.url, img: res.url };
                          setFormData(prev => ({ ...prev, aboutWelcome: updated }));
                          await persistSectionToDatabase('aboutWelcome', updated);
                        }
                      }}
                    />
                  </label>
                  {(formData.aboutWelcome?.mainImgUrl || formData.aboutWelcome?.img || welcomeWineraImg) && (
                    <img
                      src={getAdminValidImageUrl(formData.aboutWelcome?.mainImgUrl || formData.aboutWelcome?.img, welcomeWineraImg)}
                      alt=""
                      style={{ width: '60px', height: '45px', borderRadius: '8px', objectFit: 'contain', border: '1.5px solid #38bdf8' }}
                    />
                  )}
                </div>
                <div style={{ marginTop: '8px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '3px' }}>
                    🏷️ Photo Alt Text (SEO Keyword)
                  </label>
                  <input
                    type="text"
                    value={formData.aboutWelcome?.mainImgAlt || ''}
                    onChange={(e) => handleFieldChange('aboutWelcome', 'mainImgAlt', e.target.value)}
                    placeholder="e.g. Welcome to Winera International 13+ Years Experience - Commercial Game Zone Setup"
                    style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12px' }}
                  />
                </div>
              </div>

              {/* 2 Feature Cards */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Feature Boxes</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div style={{ background: '#ffffff', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                    <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Box 1 Title</label>
                    <input
                      type="text"
                      value={formData.aboutWelcome?.box1Title || 'Quality Assurance'}
                      onChange={(e) => handleFieldChange('aboutWelcome', 'box1Title', e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}
                    />
                    <RichTextareaWithEditor
                      label="Box 1 Description"
                      rows={3}
                      value={formData.aboutWelcome?.box1Desc !== undefined ? formData.aboutWelcome.box1Desc : "At Winera International, quality is key. Our lanes, trampolines, soft play, and arcade games are built to last and ensure safety. We don't just build equipment; we build experiences you can trust."}
                      onChange={(val) => handleFieldChange('aboutWelcome', 'box1Desc', val)}
                      placeholder="Enter Box 1 description..."
                    />
                  </div>

                  <div style={{ background: '#ffffff', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                    <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Box 2 Title</label>
                    <input
                      type="text"
                      value={formData.aboutWelcome?.box2Title || 'Your Success, Our Commitment'}
                      onChange={(e) => handleFieldChange('aboutWelcome', 'box2Title', e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}
                    />
                    <RichTextareaWithEditor
                      label="Box 2 Description"
                      rows={3}
                      value={formData.aboutWelcome?.box2Desc !== undefined ? formData.aboutWelcome.box2Desc : "At Winera International, we prioritize your satisfaction. From product exploration to final installation and beyond, our dedicated team walks with you at every step."}
                      onChange={(val) => handleFieldChange('aboutWelcome', 'box2Desc', val)}
                      placeholder="Enter Box 2 description..."
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.aboutWelcome?.btnText || 'Contact Us Now'}
                    onChange={(e) => handleFieldChange('aboutWelcome', 'btnText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link URL (WhatsApp URL)</label>
                  <input
                    type="text"
                    value={formData.aboutWelcome?.btnLink || 'https://wa.me/919157873576'}
                    onChange={(e) => handleFieldChange('aboutWelcome', 'btnLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#0f172a', marginBottom: '8px' }}>
                  WhatsApp Auto Pre-filled Message (Readable Text) <span style={{ fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '6px' }}>💬 Sent when user clicks Contact Us Now</span>
                </label>
                <textarea
                  rows={2}
                  value={(() => {
                    if (formData.aboutWelcome?.waMessage !== undefined && formData.aboutWelcome?.waMessage !== '') return formData.aboutWelcome.waMessage;
                    if (formData.aboutWelcome?.btnLink && formData.aboutWelcome.btnLink.includes('text=')) {
                      try {
                        const match = formData.aboutWelcome.btnLink.match(/text=([^&]+)/);
                        if (match && match[1]) return decodeURIComponent(match[1]);
                      } catch (err) { }
                    }
                    return 'Hello Winera International! I want to contact your team regarding amusement solutions. Please share details. [Ref: About Us Page]';
                  })()}
                  onChange={(e) => {
                    const newMsg = e.target.value;
                    const baseLink = (formData.aboutWelcome?.btnLink && formData.aboutWelcome.btnLink.split('?')[0]) || 'https://wa.me/919157873576';
                    const updatedLink = newMsg ? `${baseLink}?text=${encodeURIComponent(newMsg)}` : baseLink;
                    setFormData(prev => ({
                      ...prev,
                      aboutWelcome: {
                        ...(prev.aboutWelcome || {}),
                        waMessage: newMsg,
                        btnLink: updatedLink
                      }
                    }));
                  }}
                  placeholder="e.g. Hello Winera International! I want to contact your team..."
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', lineHeight: 1.5, color: '#0f172a', fontWeight: '500' }}
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('aboutWelcome', formData.aboutWelcome || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Welcome Section
                </button>
              </div>
            </div>
          )}

          {/* COMPANY ACHIEVEMENTS STATS FORM */}
          {activeSection === 'aboutStats' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Company Achievements Stats Section</h3>

              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
                {(() => {
                  const defaultStatsList = [
                    { num: "14+", title: "YEARS OF EXPERIENCE" },
                    { num: "200+", title: "Project Completed" },
                    { num: "98%", title: "Happy Clients" },
                    { num: "50+", title: "Cities Covered" }
                  ];

                  const statsList = Array.isArray(formData.aboutStats?.items)
                    ? formData.aboutStats.items
                    : (Array.isArray(formData.stats) ? formData.stats : defaultStatsList);

                  return (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Achievement Counter Stats (Total {statsList.length})</h4>
                        <button
                          type="button"
                          onClick={async () => {
                            const newStats = [...statsList, { num: "100+", title: "New Stat Title" }];
                            const updatedObj = { ...(formData.aboutStats || {}), items: newStats };
                            setFormData(prev => ({
                              ...prev,
                              aboutStats: updatedObj,
                              stats: newStats
                            }));
                            await persistSectionToDatabase('aboutStats', updatedObj);
                            await persistSectionToDatabase('stats', newStats);
                          }}
                          style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: '800', fontSize: '12.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                        >
                          <Plus style={{ width: '14px', height: '14px' }} /> Add Stat Card
                        </button>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        {statsList.map((currentStat, sIdx) => (
                          <div key={sIdx} style={{ background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontWeight: '800', fontSize: '12px', color: '#38bdf8' }}>Stat Box #{sIdx + 1}</span>
                              <button
                                type="button"
                                onClick={async () => {
                                  const newStats = statsList.filter((_, i) => i !== sIdx);
                                  const updatedObj = { ...(formData.aboutStats || {}), items: newStats };
                                  setFormData(prev => ({
                                    ...prev,
                                    aboutStats: updatedObj,
                                    stats: newStats
                                  }));
                                  await persistSectionToDatabase('aboutStats', updatedObj);
                                  await persistSectionToDatabase('stats', newStats);
                                }}
                                style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                              >
                                <Trash2 style={{ width: '12px', height: '12px' }} /> Delete
                              </button>
                            </div>
                            <input
                              type="text"
                              placeholder="Stat Number (e.g. 14+)"
                              value={currentStat.num || currentStat.number || ''}
                              onChange={(e) => {
                                const newStats = [...statsList];
                                newStats[sIdx] = { ...newStats[sIdx], num: e.target.value, number: e.target.value };
                                setFormData(prev => ({
                                  ...prev,
                                  aboutStats: { ...(prev.aboutStats || {}), items: newStats },
                                  stats: newStats
                                }));
                              }}
                              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                            />
                            <input
                              type="text"
                              placeholder="Stat Title Label"
                              value={currentStat.title || currentStat.label || ''}
                              onChange={(e) => {
                                const newStats = [...statsList];
                                newStats[sIdx] = { ...newStats[sIdx], title: e.target.value, label: e.target.value };
                                setFormData(prev => ({
                                  ...prev,
                                  aboutStats: { ...(prev.aboutStats || {}), items: newStats },
                                  stats: newStats
                                }));
                              }}
                              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12.5px', fontWeight: '600' }}
                            />
                          </div>
                        ))}
                      </div>

                      <div style={{ textAlign: 'right', marginTop: '20px' }}>
                        <button
                          onClick={async () => {
                            const updatedObj = { ...(formData.aboutStats || {}), items: statsList };
                            setFormData(prev => ({ ...prev, aboutStats: updatedObj, stats: statsList }));
                            await persistSectionToDatabase('aboutStats', updatedObj);
                            await persistSectionToDatabase('stats', statsList);
                          }}
                          style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                        >
                          Save Stats Section
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          )}

          {/* MISSION & VISION FORM */}
          {activeSection === 'aboutMissionVision' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Our Purpose & Promise Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Heading Title (Use *word* for Cyan Highlight)
                </label>
                <input
                  type="text"
                  value={formData.aboutMissionVision?.title || '*Our Purpose* & Promise'}
                  onChange={(e) => handleFieldChange('aboutMissionVision', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              {/* Mission Control */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Mission Block</h4>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Mission Badge Label</label>
                  <input
                    type="text"
                    value={formData.aboutMissionVision?.missionLabel || 'Mission'}
                    onChange={(e) => handleFieldChange('aboutMissionVision', 'missionLabel', e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                  />
                </div>
                <RichTextareaWithEditor
                  label="Mission Statement"
                  rows={3}
                  value={formData.aboutMissionVision?.missionText !== undefined ? formData.aboutMissionVision.missionText : "We deliver premium-quality game zone and indoor playground solutions to B2B clients across India combining expert design, international equipment, and seamless project execution to create entertainment spaces that last."}
                  onChange={(val) => handleFieldChange('aboutMissionVision', 'missionText', val)}
                  placeholder="Enter Mission Statement..."
                />
              </div>

              {/* Vision Control */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Vision Block</h4>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Vision Badge Label</label>
                  <input
                    type="text"
                    value={formData.aboutMissionVision?.visionLabel || 'Vision'}
                    onChange={(e) => handleFieldChange('aboutMissionVision', 'visionLabel', e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                  />
                </div>
                <RichTextareaWithEditor
                  label="Vision Statement"
                  rows={3}
                  value={formData.aboutMissionVision?.visionText !== undefined ? formData.aboutMissionVision.visionText : "To be India's most trusted partner in building world-class indoor entertainment destinations where every space we touch becomes a thriving hub of joy, play, and business success."}
                  onChange={(val) => handleFieldChange('aboutMissionVision', 'visionText', val)}
                  placeholder="Enter Vision Statement..."
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('aboutMissionVision', formData.aboutMissionVision || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Mission & Vision Section
                </button>
              </div>
            </div>
          )}

          {/* WHY CHOOSE US MINDMAP DETAIL FORM */}
          {activeSection === 'aboutWhyUsDetail' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Why Choose Us Mindmap Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Heading Title (Use *word* for Cyan Highlight)
                </label>
                <input
                  type="text"
                  value={formData.aboutWhyUsDetail?.title || 'Why *Choose Us?*'}
                  onChange={(e) => handleFieldChange('aboutWhyUsDetail', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>


              {/* 6 Mindmap Pills */}
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', marginBottom: '14px' }}>6 Mindmap Feature Pills</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  {[
                    "Rich Vendor Base",
                    "Transparent Project Pricing",
                    "International-Grade Quality Equipment",
                    "On-Time Delivery & Installation",
                    "End-to-End Project Ownership",
                    "Competitive Pricing with High ROI"
                  ].map((defText, pIdx) => {
                    const pillsList = Array.isArray(formData.aboutWhyUsDetail?.pills) ? formData.aboutWhyUsDetail.pills : [];
                    const currentPill = pillsList[pIdx] || defText;

                    return (
                      <div key={pIdx} style={{ background: '#ffffff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                        <label style={{ display: 'block', fontWeight: '700', fontSize: '11.5px', color: '#38bdf8', marginBottom: '4px' }}>Pill #{pIdx + 1}</label>
                        <input
                          type="text"
                          value={currentPill || ''}
                          onChange={(e) => {
                            const newPills = [...pillsList];
                            newPills[pIdx] = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              aboutWhyUsDetail: { ...(prev.aboutWhyUsDetail || {}), pills: newPills }
                            }));
                          }}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12.5px', fontWeight: '600' }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3 Bottom Cards (Sales, Service, Satisfaction) */}
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', marginBottom: '14px' }}>3 Bottom Cards (Sales, Service, Satisfaction)</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { defaultTitle: "Sales", defaultDesc: "From the moment you choose Winera International, our dedicated sales team works closely with you to finalize the right game zone solution for your space and budget. We're an ROI-focused partner. Before any project begins, every client receives a complete ROI report covering projected footfall, revenue potential, and payback period. We handle product selection, project scoping, pricing, and documentation, making your buying experience smooth, transparent, and completely hassle-free." },
                    { defaultTitle: "Service", defaultDesc: "Our professional installation team takes complete ownership of your project from equipment delivery and assembly to safety testing and final handover. Every game zone we install is set up with precision, care, and zero compromise on quality standards so your entertainment space is ready to welcome visitors from day one." },
                    { defaultTitle: "Satisfaction", defaultDesc: "At Winera International, a completed project is just the beginning of our relationship. We measure our success by yours whether it's children laughing in our soft play zones, families enjoying our bowling alleys, or teenagers competing on our arcade machines. Your visitors' joy and your business's growth are what drive everything we do." }
                  ].map((cDef, cIdx) => {
                    const cardsList = Array.isArray(formData.aboutWhyUsDetail?.cards) ? formData.aboutWhyUsDetail.cards : [];
                    const currentCard = cardsList[cIdx] || cDef;

                    return (
                      <div key={cIdx} style={{ background: '#ffffff', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                        <div style={{ fontWeight: '800', fontSize: '12px', color: '#38bdf8', marginBottom: '6px' }}>Card #{cIdx + 1}</div>
                        <input
                          type="text"
                          placeholder="Title"
                          value={currentCard.title || cDef.defaultTitle}
                          onChange={(e) => {
                            const newCards = [...cardsList];
                            newCards[cIdx] = { ...(newCards[cIdx] || cDef), title: e.target.value };
                            setFormData(prev => ({
                              ...prev,
                              aboutWhyUsDetail: { ...(prev.aboutWhyUsDetail || {}), cards: newCards }
                            }));
                          }}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}
                        />
                        <RichTextareaWithEditor
                          label="Card Description"
                          rows={3}
                          placeholder="Enter card description..."
                          value={currentCard.desc || cDef.defaultDesc}
                          onChange={(val) => {
                            const newCards = [...cardsList];
                            newCards[cIdx] = { ...(newCards[cIdx] || cDef), desc: val };
                            setFormData(prev => ({
                              ...prev,
                              aboutWhyUsDetail: { ...(prev.aboutWhyUsDetail || {}), cards: newCards }
                            }));
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA Buttons Management */}
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Call To Action (CTA) Buttons</h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#0f172a', marginBottom: '4px' }}>Primary Button Text</label>
                    <input
                      type="text"
                      value={formData.aboutWhyUsDetail?.ctaPrimaryText || 'Get Started'}
                      onChange={(e) => handleFieldChange('aboutWhyUsDetail', 'ctaPrimaryText', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#0f172a', marginBottom: '4px' }}>Primary Button Link (URL or WhatsApp)</label>
                    <input
                      type="text"
                      value={formData.aboutWhyUsDetail?.ctaPrimaryLink || 'https://wa.me/919157873576'}
                      onChange={(e) => handleFieldChange('aboutWhyUsDetail', 'ctaPrimaryLink', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#0f172a', marginBottom: '4px' }}>Secondary Button Text</label>
                    <input
                      type="text"
                      value={formData.aboutWhyUsDetail?.ctaSecondaryText || 'View Our Products'}
                      onChange={(e) => handleFieldChange('aboutWhyUsDetail', 'ctaSecondaryText', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#0f172a', marginBottom: '4px' }}>Secondary Button Link</label>
                    <input
                      type="text"
                      value={formData.aboutWhyUsDetail?.ctaSecondaryLink || '/arcade-game'}
                      onChange={(e) => handleFieldChange('aboutWhyUsDetail', 'ctaSecondaryLink', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#0f172a', marginBottom: '4px' }}>
                      Primary Button WhatsApp Auto Pre-filled Message (Readable Text) <span style={{ fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '6px' }}>💬 Sent when user clicks Get Started</span>
                    </label>
                    <textarea
                      rows={2}
                      value={(() => {
                        if (formData.aboutWhyUsDetail?.waMessage !== undefined && formData.aboutWhyUsDetail?.waMessage !== '') return formData.aboutWhyUsDetail.waMessage;
                        if (formData.aboutWhyUsDetail?.ctaPrimaryLink && formData.aboutWhyUsDetail.ctaPrimaryLink.includes('text=')) {
                          try {
                            const match = formData.aboutWhyUsDetail.ctaPrimaryLink.match(/text=([^&]+)/);
                            if (match && match[1]) return decodeURIComponent(match[1]);
                          } catch (err) { }
                        }
                        return 'Hello Winera International! I want to get started with a game zone project. Please share details. [Ref: About Us Page]';
                      })()}
                      onChange={(e) => {
                        const newMsg = e.target.value;
                        const baseLink = (formData.aboutWhyUsDetail?.ctaPrimaryLink && formData.aboutWhyUsDetail.ctaPrimaryLink.split('?')[0]) || 'https://wa.me/919157873576';
                        const updatedLink = newMsg ? `${baseLink}?text=${encodeURIComponent(newMsg)}` : baseLink;
                        setFormData(prev => ({
                          ...prev,
                          aboutWhyUsDetail: {
                            ...(prev.aboutWhyUsDetail || {}),
                            waMessage: newMsg,
                            ctaPrimaryLink: updatedLink
                          }
                        }));
                      }}
                      placeholder="e.g. Hello Winera International! I want to get started..."
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', lineHeight: 1.5, color: '#0f172a', fontWeight: '500' }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('aboutWhyUsDetail', formData.aboutWhyUsDetail || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Why Choose Us Mindmap Section
                </button>
              </div>
            </div>
          )}
          {activeSection === 'founder' && (() => {
            const defaultBio = "Mr. Unnit Jogani is the Founder & CEO of Winera International Pvt. Ltd., one of India's most trusted game zone equipment manufacturers and indoor amusement park solution providers.\n\nSince establishing Winera in Surat, Gujarat in 2014, Unnit has led the company's growth from a regional startup to a pan-India B2B leader with an uncompromising focus on quality, safety, and client satisfaction.";

            const getFounderProfiles = () => {
              if (Array.isArray(formData.founder?.items) && formData.founder.items.length > 0) {
                return formData.founder.items;
              }
              return [
                {
                  name: formData.founder?.name || 'Mr. Unnit Jogani',
                  image: formData.founder?.image || '',
                  yearsOfExperience: formData.founder?.yearsOfExperience || '14+',
                  linkedinUrl: formData.founder?.linkedinUrl || 'https://linkedin.com',
                  aboutDetails: formData.founder?.aboutDetails !== undefined ? formData.founder.aboutDetails : defaultBio
                },
                {
                  name: formData.founder?.name || 'Mr. Unnit Jogani',
                  image: formData.founder?.image || '',
                  yearsOfExperience: formData.founder?.yearsOfExperience || '14+',
                  linkedinUrl: formData.founder?.linkedinUrl || 'https://linkedin.com',
                  aboutDetails: formData.founder?.aboutDetails !== undefined ? formData.founder.aboutDetails : defaultBio
                },
                {
                  name: formData.founder?.name || 'Mr. Unnit Jogani',
                  image: formData.founder?.image || '',
                  yearsOfExperience: formData.founder?.yearsOfExperience || '14+',
                  linkedinUrl: formData.founder?.linkedinUrl || 'https://linkedin.com',
                  aboutDetails: formData.founder?.aboutDetails !== undefined ? formData.founder.aboutDetails : defaultBio
                }
              ];
            };

            const founderProfiles = getFounderProfiles();

            const handleAddProfile = async () => {
              const currentList = Array.isArray(formData.founder?.items)
                ? [...formData.founder.items]
                : [...founderProfiles];

              const newProfile = {
                name: '',
                image: '',
                yearsOfExperience: '10+',
                linkedinUrl: 'https://linkedin.com',
                aboutDetails: ''
              };

              const updated = [...currentList, newProfile];
              const payload = {
                ...(formData.founder || {}),
                items: updated,
                name: updated[0]?.name || 'Mr. Unnit Jogani',
                image: updated[0]?.image || '',
                yearsOfExperience: updated[0]?.yearsOfExperience || '14+',
                linkedinUrl: updated[0]?.linkedinUrl || 'https://linkedin.com',
                aboutDetails: updated[0]?.aboutDetails !== undefined ? updated[0].aboutDetails : defaultBio
              };
              setFormData(prev => ({
                ...prev,
                founder: payload
              }));
              await persistSectionToDatabase('founder', payload);
              setStatusMsg(`Added new founder profile card #${updated.length}!`);
              setTimeout(() => {
                const el = document.getElementById(`founder-card-${updated.length - 1}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }, 100);
            };

            const handleRemoveProfile = async (indexToRemove) => {
              const currentList = Array.isArray(formData.founder?.items)
                ? [...formData.founder.items]
                : [...founderProfiles];
              const updated = currentList.filter((_, i) => i !== indexToRemove);
              const payload = {
                ...(formData.founder || {}),
                items: updated,
                name: updated[0]?.name || 'Mr. Unnit Jogani',
                image: updated[0]?.image || '',
                yearsOfExperience: updated[0]?.yearsOfExperience || '14+',
                linkedinUrl: updated[0]?.linkedinUrl || 'https://linkedin.com',
                aboutDetails: updated[0]?.aboutDetails !== undefined ? updated[0].aboutDetails : defaultBio
              };
              setFormData(prev => ({
                ...prev,
                founder: payload
              }));
              await persistSectionToDatabase('founder', payload);
              setStatusMsg(`Removed profile #${indexToRemove + 1}.`);
            };

            const handleProfileFieldChange = (profileIdx, fieldName, value) => {
              const currentList = Array.isArray(formData.founder?.items) && formData.founder.items.length > 0
                ? [...formData.founder.items]
                : [...founderProfiles];
              const updated = [...currentList];
              updated[profileIdx] = {
                ...updated[profileIdx],
                [fieldName]: value
              };
              setFormData(prev => ({
                ...prev,
                founder: {
                  ...(prev.founder || {}),
                  items: updated
                }
              }));
            };

            const handleSaveAll = async () => {
              const payload = {
                headingTitle: formData.founder?.headingTitle || 'OUR *FOUNDER*',
                items: founderProfiles,
                name: founderProfiles[0]?.name || 'Mr. Unnit Jogani',
                image: founderProfiles[0]?.image || '',
                yearsOfExperience: founderProfiles[0]?.yearsOfExperience || '14+',
                linkedinUrl: founderProfiles[0]?.linkedinUrl || 'https://linkedin.com',
                aboutDetails: founderProfiles[0]?.aboutDetails !== undefined ? founderProfiles[0].aboutDetails : defaultBio
              };
              await persistSectionToDatabase('founder', payload);
            };

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Founder & Leadership Profiles ({founderProfiles.length})</h3>
                    <p style={{ fontSize: '12.5px', color: '#64748b', margin: '3px 0 0' }}>Manage Founder profiles shown in the slider on the About Us page.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddProfile}
                    style={{
                      background: '#0284c7',
                      color: '#ffffff',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '12px',
                      fontWeight: '800',
                      fontSize: '13.5px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      boxShadow: '0 4px 14px rgba(2, 132, 199, 0.3)'
                    }}
                  >
                    <Plus style={{ width: '17px', height: '17px' }} /> Add Founder Profile
                  </button>
                </div>

                {/* Founder Section Heading Title */}
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 14px rgba(0,0,0,0.02)' }}>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                    Section Heading Title (Use *word* for Cyan Accent)
                  </label>
                  <input
                    type="text"
                    value={formData.founder?.headingTitle || 'OUR *FOUNDER*'}
                    onChange={(e) => handleFieldChange('founder', 'headingTitle', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '600' }}
                  />
                </div>

                {/* Profiles List */}
                {founderProfiles.map((item, idx) => (
                  <div id={`founder-card-${idx}`} key={idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', boxShadow: '0 8px 24px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                      <span style={{ fontWeight: '800', fontSize: '15px', color: '#0f172a' }}>Profile #{idx + 1}: {item.name ? item.name : <em style={{ color: '#94a3b8', fontWeight: '500' }}>New Profile (Empty Name)</em>}</span>
                      {founderProfiles.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveProfile(idx)}
                          style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                        >
                          Remove Profile
                        </button>
                      )}
                    </div>

                    {/* Founder Photo Upload */}
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                        Founder Photo <span style={{ fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '2px 6px', borderRadius: '6px', fontWeight: '700', marginLeft: '6px' }}>📐 600 × 500 px</span>
                      </label>
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                        <label style={{
                          background: '#38bdf8',
                          color: '#fff',
                          padding: '8px 16px',
                          borderRadius: '10px',
                          fontWeight: '700',
                          fontSize: '12.5px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <Upload style={{ width: '15px', height: '15px' }} /> Upload Photo
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (!file) return;
                              setStatusMsg(`Uploading photo for profile #${idx + 1}...`);
                              try {
                                const res = await uploadImageFile(file, admin.token);
                                handleProfileFieldChange(idx, 'image', res.url);
                                setStatusMsg(`Photo uploaded for profile #${idx + 1}!`);
                              } catch (err) {
                                setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                              }
                            }}
                            style={{ display: 'none' }}
                          />
                        </label>
                        <img src={item.image || founderUnnit} alt="Preview" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #38bdf8' }} />
                      </div>
                      <div style={{ marginTop: '10px' }}>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                          🏷️ Founder Photo Alt Text (SEO Keyword)
                        </label>
                        <input
                          type="text"
                          value={item.imageAlt || ''}
                          onChange={(e) => handleProfileFieldChange(idx, 'imageAlt', e.target.value)}
                          placeholder="e.g. Mr. Unnit Jogani - Founder & CEO - Winera International"
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                        />
                      </div>
                    </div>

                    {/* Name & Experience */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>Founder Name</label>
                        <input
                          type="text"
                          value={item.name || ''}
                          onChange={(e) => handleProfileFieldChange(idx, 'name', e.target.value)}
                          placeholder="e.g. Mr. Unnit Jogani"
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontWeight: '700', fontSize: '13.5px' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>Years of Experience</label>
                        <input
                          type="text"
                          value={item.yearsOfExperience || ''}
                          onChange={(e) => handleProfileFieldChange(idx, 'yearsOfExperience', e.target.value)}
                          placeholder="e.g. 14+"
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontWeight: '700', fontSize: '13.5px' }}
                        />
                      </div>
                    </div>

                    {/* LinkedIn Link */}
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>LinkedIn Profile Link</label>
                      <input
                        type="text"
                        value={item.linkedinUrl || ''}
                        onChange={(e) => handleProfileFieldChange(idx, 'linkedinUrl', e.target.value)}
                        placeholder="https://linkedin.com/in/..."
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontWeight: '600', fontSize: '13.5px' }}
                      />
                    </div>

                    {/* Biography */}
                    <RichTextareaWithEditor
                      label="Biography / About Details"
                      rows={6}
                      value={item.aboutDetails !== undefined ? item.aboutDetails : defaultBio}
                      onChange={(val) => handleProfileFieldChange(idx, 'aboutDetails', val)}
                      placeholder="Enter founder biography & details..."
                    />
                  </div>
                ))}

                {/* Bottom Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', flexWrap: 'wrap', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={handleAddProfile}
                    style={{
                      background: '#f1f5f9',
                      color: '#0284c7',
                      border: '1.5px solid #cbd5e1',
                      padding: '11px 20px',
                      borderRadius: '12px',
                      fontWeight: '800',
                      fontSize: '13.5px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px'
                    }}
                  >
                    <Plus style={{ width: '17px', height: '17px' }} /> Add Another Founder Profile
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveAll}
                    disabled={loadingSection === 'founder'}
                    style={{
                      background: '#38bdf8',
                      color: '#ffffff',
                      border: 'none',
                      padding: '12px 28px',
                      borderRadius: '12px',
                      fontWeight: '900',
                      fontSize: '14px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)',
                      opacity: loadingSection === 'founder' ? 0.7 : 1
                    }}
                  >
                    {loadingSection === 'founder' ? 'Saving to Database...' : 'Save Founder Profiles'}
                  </button>
                </div>
              </div>
            );
          })()}
    </>
  );
}
