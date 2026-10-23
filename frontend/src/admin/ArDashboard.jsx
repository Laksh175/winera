import React from 'react';
import { Upload } from 'lucide-react';
import RichTextareaWithEditor from '../components/RichTextareaWithEditor';
import { uploadImageFile } from '../services/api';

const arHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345623/winera_uploads/f1ecb4v7xdztwwimzb3l.png";
const arHeroMobileBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345484/winera_uploads/cjhcvoxksmptc84yslh2.png";
const arSupplierCollage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345623/winera_uploads/jnv3jpypar3oyptok2ua.png";
const arAttractionsGraphic = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345544/winera_uploads/o0rxgli4i1gfotelvg9a.png";
const arFeaturesBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345623/winera_uploads/ug6dmazccdtqxjpzixxz.png";
const arEarnGamers = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345546/winera_uploads/u9f9gkrbms7knuto3gg5.png";
const ctaMainBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345648/winera_uploads/ei16uczeuelaabtue4bs.jpg";

const getAdminValidImageUrl = (url, fallback) => {
  if (!url) return fallback;
  if (typeof url === 'object' && url.default) return url.default;
  if (typeof url !== 'string' || url.trim() === '') return fallback;
  if (url.includes('/src/assets/') || url.includes('ar-' ) || url.includes('arHero') || url.includes('AR-')) {
    if (url.includes('arHeroMobile') || url.includes('ar-hero-mobile') || url.includes('mobile')) return arHeroMobileBg;
    if (url.includes('arHero') || url.includes('ar-hero')) return arHeroBg;
    if (url.includes('arSupplier') || url.includes('ar-supplier')) return arSupplierCollage;
    if (url.includes('arAttractions') || url.includes('ar-attractions') || url.includes('arMatched')) return arAttractionsGraphic;
    if (url.includes('arFeatures') || url.includes('ar-features')) return arFeaturesBg;
    if (url.includes('arEarn') || url.includes('ar-earn')) return arEarnGamers;
    return fallback;
  }
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

export default function ArDashboard({
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
          {activeSection === 'arHero' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>AR Games Hero Banner Settings</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Hero Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img
                    src={getAdminValidImageUrl(formData.arHero?.bgUrl, arHeroBg)}
                    alt="AR Hero Background Preview"
                    style={{ width: '120px', height: '60px', borderRadius: '10px', objectFit: 'cover', border: '1.5px solid #38bdf8' }}
                  />
                  <input
                    type="text"
                    value={formData.arHero?.bgUrl || ''}
                    onChange={(e) => handleFieldChange('arHero', 'bgUrl', e.target.value)}
                    placeholder="Image URL or Asset Path"
                    style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                  />
                  <label style={{
                    background: '#38bdf8',
                    color: '#ffffff',
                    padding: '10px 18px',
                    borderRadius: '12px',
                    fontWeight: '800',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading AR hero background...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.arHero || {}), bgUrl: res.url };
                          setFormData(prev => ({ ...prev, arHero: updated }));
                          await persistSectionToDatabase('arHero', updated);
                          setStatusMsg('Image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {formData.arHero?.bgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('arHero', 'bgUrl', '')}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>🏷️ Hero Background Alt Text (SEO Keyword)</label>
                <input
                  type="text"
                  value={formData.arHero?.bgAlt || ''}
                  onChange={(e) => handleFieldChange('arHero', 'bgAlt', e.target.value)}
                  placeholder="e.g. Augmented Reality AR Interactive Games Setup - Winera"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              {/* Mobile Screen Hero Banner Upload & Preview */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                  Mobile Screen Hero Banner <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📱 Recommended Size: 941 × 550 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img
                    src={getAdminValidImageUrl(formData.arHero?.mobileBgUrl, arHeroMobileBg)}
                    alt="AR Mobile Hero Bg Preview"
                    style={{ width: '120px', height: '65px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                  />
                  <input
                    type="text"
                    value={formData.arHero?.mobileBgUrl || ''}
                    onChange={(e) => handleFieldChange('arHero', 'mobileBgUrl', e.target.value)}
                    placeholder="Mobile Background Image URL"
                    style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', background: '#F5F5F9' }}
                  />
                  <label style={{ padding: '12px 20px', background: '#38bdf8', color: '#ffffff', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Mobile Banner
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setStatusMsg('Uploading AR mobile hero banner image...');
                          try {
                            const res = await uploadImageFile(file, admin.token);
                            const updated = { ...(formData.arHero || {}), mobileBgUrl: res.url };
                            setFormData(prev => ({ ...prev, arHero: updated }));
                            await persistSectionToDatabase('arHero', updated);
                            setStatusMsg('Mobile banner uploaded successfully!');
                          } catch (err) {
                            setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                          }
                        }
                      }}
                    />
                  </label>
                  {formData.arHero?.mobileBgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('arHero', 'mobileBgUrl', '')}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '12px 18px', borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
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
                    value={formData.arHero?.mobileBgAlt || ''}
                    onChange={(e) => handleFieldChange('arHero', 'mobileBgAlt', e.target.value)}
                    placeholder="e.g. Augmented Reality AR Games Setup Mobile Banner - Winera"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Main Hero Title (Use *word* for yellow highlight)</label>
                <input
                  type="text"
                  value={formData.arHero?.title || '*AR* Games'}
                  onChange={(e) => handleFieldChange('arHero', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Breadcrumb Label</label>
                <input
                  type="text"
                  value={formData.arHero?.breadcrumbText || 'AR Games'}
                  onChange={(e) => handleFieldChange('arHero', 'breadcrumbText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arHero', formData.arHero || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save AR Hero Banner Section
                </button>
              </div>
            </div>
          )}


          {/* AR GAMES SUPPLIER FORM */}
          {activeSection === 'arIntro' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>AR Games Supplier in India Section</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Right Collage Graphic Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <label style={{
                    background: '#38bdf8',
                    color: '#ffffff',
                    padding: '10px 18px',
                    borderRadius: '12px',
                    fontWeight: '800',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Choose Right Collage Graphic
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading supplier collage graphic...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.arIntro || {}), mainImgUrl: res.url };
                          setFormData(prev => ({ ...prev, arIntro: updated }));
                          await persistSectionToDatabase('arIntro', updated);
                          setStatusMsg('Image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <img
                    src={getAdminValidImageUrl(formData.arIntro?.mainImgUrl, arSupplierCollage)}
                    alt="AR Supplier Collage Preview"
                    style={{ width: '120px', height: '60px', borderRadius: '10px', objectFit: 'cover', border: '1.5px solid #38bdf8' }}
                  />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                    🏷️ Right Collage Graphic Image Alt Text (SEO Keyword)
                  </label>
                  <input
                    type="text"
                    value={formData.arIntro?.mainImgAlt || formData.arIntro?.imgAlt || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleFieldChange('arIntro', 'mainImgAlt', val);
                      handleFieldChange('arIntro', 'imgAlt', val);
                    }}
                    placeholder="e.g. AR Games Supplier in India - Winera Commercial Setup"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Section Title (Use *word* for cyan highlight & &lt;br/&gt; for linebreaks)</label>
                <input
                  type="text"
                  value={formData.arIntro?.title || '*AR Games* Supplier in India'}
                  onChange={(e) => handleFieldChange('arIntro', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <RichTextareaWithEditor
                label="Section Description"
                rows={3}
                value={formData.arIntro?.desc !== undefined ? formData.arIntro.desc : "India's ROI-first AR games supplier — we source, install, and service interactive gaming attractions that draw crowds."}
                onChange={(val) => handleFieldChange('arIntro', 'desc', val)}
                placeholder="Enter Section Description..."
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.arIntro?.buttonText || 'Get Quote From Expert'}
                    onChange={(e) => handleFieldChange('arIntro', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                  <input
                    type="text"
                    value={(formData.arIntro?.buttonLink && formData.arIntro.buttonLink.split('?')[0]) || 'https://wa.me/919157873576'}
                    onChange={(e) => {
                      const baseLink = e.target.value;
                      const msg = formData.arIntro?.waMessage || "Hello Winera International! I want to get a quote and details for AR Games setup. Please share details. [Ref: AR Games Page]";
                      const updatedLink = msg ? `${baseLink.split('?')[0]}?text=${encodeURIComponent(msg)}` : baseLink;
                      setFormData(prev => ({ ...prev, arIntro: { ...(prev.arIntro || {}), buttonLink: updatedLink } }));
                    }}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ marginTop: '4px' }}>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  WhatsApp Auto Pre-filled Message (Readable Text) <span style={{ fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '6px' }}>💬 Sent when user clicks Get Quote From Expert</span>
                </label>
                <textarea
                  rows={2}
                  value={(() => {
                    if (formData.arIntro?.waMessage !== undefined && formData.arIntro.waMessage !== '') return formData.arIntro.waMessage;
                    if (formData.arIntro?.buttonLink && formData.arIntro.buttonLink.includes('text=')) {
                      try {
                        const match = formData.arIntro.buttonLink.match(/text=([^&]+)/);
                        if (match && match[1]) return decodeURIComponent(match[1]);
                      } catch (err) { }
                    }
                    return "Hello Winera International! I want to get a quote and details for AR Games setup. Please share details. [Ref: AR Games Page]";
                  })()}
                  onChange={(e) => {
                    const newMsg = e.target.value;
                    const baseLink = (formData.arIntro?.buttonLink && formData.arIntro.buttonLink.split('?')[0]) || 'https://wa.me/919157873576';
                    const updatedLink = newMsg ? `${baseLink}?text=${encodeURIComponent(newMsg)}` : baseLink;
                    setFormData(prev => ({
                      ...prev,
                      arIntro: {
                        ...(prev.arIntro || {}),
                        waMessage: newMsg,
                        buttonLink: updatedLink
                      }
                    }));
                  }}
                  placeholder="e.g. Hello Winera International! I want to get a quote for AR Games..."
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', lineHeight: 1.5, color: '#0f172a', fontWeight: '500' }}
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arIntro', formData.arIntro || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save AR Supplier Section
                </button>
              </div>
            </div>
          )}

          {/* INTERACTIVE AR ATTRACTIONS FORM */}
          {activeSection === 'arMatchedVenue' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Interactive AR Attractions Section</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Left Column Image Graphic <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <label style={{
                    background: '#38bdf8',
                    color: '#ffffff',
                    padding: '10px 18px',
                    borderRadius: '12px',
                    fontWeight: '800',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Choose Left Column Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading AR attractions graphic...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.arMatchedVenue || {}), imgUrl: res.url };
                          setFormData(prev => ({ ...prev, arMatchedVenue: updated }));
                          await persistSectionToDatabase('arMatchedVenue', updated);
                          setStatusMsg('Image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <img
                    src={getAdminValidImageUrl(formData.arMatchedVenue?.imgUrl, arAttractionsGraphic)}
                    alt="AR Attractions Image Preview"
                    style={{ width: '120px', height: '60px', borderRadius: '10px', objectFit: 'cover', border: '1.5px solid #38bdf8' }}
                  />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                    🏷️ Left Column Image Graphic Alt Text (SEO Keyword)
                  </label>
                  <input
                    type="text"
                    value={formData.arMatchedVenue?.imgAlt || ''}
                    onChange={(e) => handleFieldChange('arMatchedVenue', 'imgAlt', e.target.value)}
                    placeholder="e.g. Interactive AR Attractions Built for Your Venue - Winera"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Title (Use *word* for cyan highlight & &lt;br/&gt; for linebreaks)</label>
                <input
                  type="text"
                  value={formData.arMatchedVenue?.title || 'Interactive AR Attractions,<br/>*Built for Your Venue*'}
                  onChange={(e) => handleFieldChange('arMatchedVenue', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <RichTextareaWithEditor
                label="Paragraph 1"
                rows={3}
                value={formData.arMatchedVenue?.p1 !== undefined ? formData.arMatchedVenue.p1 : "Winera International is a trusted AR games supplier in India sourcing and installing commercial sports simulators, interactive floor systems, AR experiences, and immersive gaming equipment for malls, hotels, schools, resorts, and family entertainment centres for more than 15 Years. Every product is sourced from established global manufacturers and configured for sustained commercial use"}
                onChange={(val) => handleFieldChange('arMatchedVenue', 'p1', val)}
                placeholder="Enter Paragraph 1..."
              />

              <RichTextareaWithEditor
                label="Paragraph 2"
                rows={3}
                value={formData.arMatchedVenue?.p2 !== undefined ? formData.arMatchedVenue.p2 : "As a direct AR entertainment setup partner, our own team manages everything from space planning and product selection to installation and after-sales support — one team, zero third-party contractors."}
                onChange={(val) => handleFieldChange('arMatchedVenue', 'p2', val)}
                placeholder="Enter Paragraph 2..."
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.arMatchedVenue?.buttonText || 'Get Quote From Expert'}
                    onChange={(e) => handleFieldChange('arMatchedVenue', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                  <input
                    type="text"
                    value={(formData.arMatchedVenue?.buttonLink && formData.arMatchedVenue.buttonLink.split('?')[0]) || 'https://wa.me/919157873576'}
                    onChange={(e) => {
                      const baseLink = e.target.value;
                      const msg = formData.arMatchedVenue?.waMessage || "Hello Winera International! I want to get a quote for Interactive AR Attractions setup for my venue. Please share details. [Ref: AR Games Page]";
                      const updatedLink = msg ? `${baseLink.split('?')[0]}?text=${encodeURIComponent(msg)}` : baseLink;
                      setFormData(prev => ({ ...prev, arMatchedVenue: { ...(prev.arMatchedVenue || {}), buttonLink: updatedLink } }));
                    }}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ marginTop: '4px' }}>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  WhatsApp Auto Pre-filled Message (Readable Text) <span style={{ fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '6px' }}>💬 Sent when user clicks Get Quote From Expert</span>
                </label>
                <textarea
                  rows={2}
                  value={(() => {
                    if (formData.arMatchedVenue?.waMessage !== undefined && formData.arMatchedVenue.waMessage !== '') return formData.arMatchedVenue.waMessage;
                    if (formData.arMatchedVenue?.buttonLink && formData.arMatchedVenue.buttonLink.includes('text=')) {
                      try {
                        const match = formData.arMatchedVenue.buttonLink.match(/text=([^&]+)/);
                        if (match && match[1]) return decodeURIComponent(match[1]);
                      } catch (err) { }
                    }
                    return "Hello Winera International! I want to get a quote for Interactive AR Attractions setup for my venue. Please share details. [Ref: AR Games Page]";
                  })()}
                  onChange={(e) => {
                    const newMsg = e.target.value;
                    const baseLink = (formData.arMatchedVenue?.buttonLink && formData.arMatchedVenue.buttonLink.split('?')[0]) || 'https://wa.me/919157873576';
                    const updatedLink = newMsg ? `${baseLink}?text=${encodeURIComponent(newMsg)}` : baseLink;
                    setFormData(prev => ({
                      ...prev,
                      arMatchedVenue: {
                        ...(prev.arMatchedVenue || {}),
                        waMessage: newMsg,
                        buttonLink: updatedLink
                      }
                    }));
                  }}
                  placeholder="e.g. Hello Winera International! I want to get a quote for AR Attractions..."
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', lineHeight: 1.5, color: '#0f172a', fontWeight: '500' }}
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arMatchedVenue', formData.arMatchedVenue || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Interactive AR Attractions Section
                </button>
              </div>
            </div>
          )}

          {/* AR FEATURES & HIGHLIGHTS FORM */}
          {activeSection === 'arFeatures' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>AR Features & Highlights Settings</h3>

              {/* Feature 1 */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0284c7' }}>Feature Row #1</h4>
                <input
                  type="text"
                  placeholder="Row 1 Title"
                  value={formData.arFeatures?.f1Title || "*Exciting* Attractions"}
                  onChange={(e) => handleFieldChange('arFeatures', 'f1Title', e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                />
                <RichTextareaWithEditor
                  label="Row 1 Description"
                  rows={3}
                  placeholder="Row 1 Description"
                  value={formData.arFeatures?.f1Desc !== undefined ? formData.arFeatures.f1Desc : "Bumper cars have long held a special place in the hearts of amusement park enthusiasts, and at Winera International, we take immense pride in delivering high-quality options that enhance the overall park experience. As a leading bumper car manufacturer in India and trusted bumper car manufacturer, our creations are not just rides; they're an exhilarating blend of thrilling collisions and smooth handling, designed with a laser focus on safety and durability."}
                  onChange={(val) => handleFieldChange('arFeatures', 'f1Desc', val)}
                />
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '12px', color: '#0f172a', marginBottom: '6px' }}>
                    Row 1 Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 550 × 230 px (2.4:1 Widescreen)</span>
                  </label>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <label style={{
                      background: '#38bdf8',
                      color: '#ffffff',
                      padding: '8px 14px',
                      borderRadius: '10px',
                      fontWeight: '800',
                      fontSize: '12.5px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <Upload style={{ width: '14px', height: '14px' }} /> Upload Row 1 Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          setStatusMsg('Uploading Row 1 image...');
                          try {
                            const res = await uploadImageFile(file, admin.token);
                            const updated = { ...(formData.arFeatures || {}), f1Img: res.url };
                            setFormData(prev => ({ ...prev, arFeatures: updated }));
                            await persistSectionToDatabase('arFeatures', updated);
                            setStatusMsg('Image uploaded successfully!');
                          } catch (err) {
                            setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <img
                      src={getAdminValidImageUrl(formData.arFeatures?.f1Img, 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80')}
                      alt="Row 1 Preview"
                      style={{ width: '100px', height: '50px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #38bdf8' }}
                    />
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                      🏷️ Row 1 Image Alt Text (SEO Keyword)
                    </label>
                    <input
                      type="text"
                      value={formData.arFeatures?.f1ImgAlt || ''}
                      onChange={(e) => handleFieldChange('arFeatures', 'f1ImgAlt', e.target.value)}
                      placeholder="e.g. Exciting AR Attractions - Winera"
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0284c7' }}>Feature Row #2</h4>
                <input
                  type="text"
                  placeholder="Row 2 Title"
                  value={formData.arFeatures?.f2Title || "High-Quality *Equipment*"}
                  onChange={(e) => handleFieldChange('arFeatures', 'f2Title', e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                />
                <RichTextareaWithEditor
                  label="Row 2 Description"
                  rows={3}
                  placeholder="Row 2 Description"
                  value={formData.arFeatures?.f2Desc !== undefined ? formData.arFeatures.f2Desc : "Bumper cars have long held a special place in the hearts of amusement park enthusiasts, and at Winera International, we take immense pride in delivering high-quality options that enhance the overall park experience. As a leading bumper car manufacturer in India and trusted bumper car manufacturer, our creations are not just rides; they're an exhilarating blend of thrilling collisions and smooth handling, designed with a laser focus on safety and durability."}
                  onChange={(val) => handleFieldChange('arFeatures', 'f2Desc', val)}
                />
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '12px', color: '#0f172a', marginBottom: '6px' }}>
                    Row 2 Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 550 × 230 px (2.4:1 Widescreen)</span>
                  </label>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <label style={{
                      background: '#38bdf8',
                      color: '#ffffff',
                      padding: '8px 14px',
                      borderRadius: '10px',
                      fontWeight: '800',
                      fontSize: '12.5px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <Upload style={{ width: '14px', height: '14px' }} /> Upload Row 2 Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          setStatusMsg('Uploading Row 2 image...');
                          try {
                            const res = await uploadImageFile(file, admin.token);
                            const updated = { ...(formData.arFeatures || {}), f2Img: res.url };
                            setFormData(prev => ({ ...prev, arFeatures: updated }));
                            await persistSectionToDatabase('arFeatures', updated);
                            setStatusMsg('Image uploaded successfully!');
                          } catch (err) {
                            setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <img
                      src={getAdminValidImageUrl(formData.arFeatures?.f2Img, 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80')}
                      alt="Row 2 Preview"
                      style={{ width: '100px', height: '50px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #38bdf8' }}
                    />
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                      🏷️ Row 2 Image Alt Text (SEO Keyword)
                    </label>
                    <input
                      type="text"
                      value={formData.arFeatures?.f2ImgAlt || ''}
                      onChange={(e) => handleFieldChange('arFeatures', 'f2ImgAlt', e.target.value)}
                      placeholder="e.g. High-Quality AR Equipment - Winera"
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0284c7' }}>Feature Row #3</h4>
                <input
                  type="text"
                  placeholder="Row 3 Title"
                  value={formData.arFeatures?.f3Title || "*Budget-Friendly AR*<br/>Entertainment Setup"}
                  onChange={(e) => handleFieldChange('arFeatures', 'f3Title', e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                />
                <RichTextareaWithEditor
                  label="Row 3 Description"
                  rows={3}
                  placeholder="Row 3 Description"
                  value={formData.arFeatures?.f3Desc !== undefined ? formData.arFeatures.f3Desc : "Bumper cars have long held a special place in the hearts of amusement park enthusiasts, and at Winera International, we take immense pride in delivering high-quality options that enhance the overall park experience. As a leading bumper car manufacturer in India and trusted bumper car manufacturer, our creations are not just rides; they're an exhilarating blend of thrilling collisions and smooth handling, designed with a laser focus on safety and durability."}
                  onChange={(val) => handleFieldChange('arFeatures', 'f3Desc', val)}
                />
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '12px', color: '#0f172a', marginBottom: '6px' }}>
                    Row 3 Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 550 × 230 px (2.4:1 Widescreen)</span>
                  </label>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <label style={{
                      background: '#38bdf8',
                      color: '#ffffff',
                      padding: '8px 14px',
                      borderRadius: '10px',
                      fontWeight: '800',
                      fontSize: '12.5px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <Upload style={{ width: '14px', height: '14px' }} /> Upload Row 3 Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          setStatusMsg('Uploading Row 3 image...');
                          try {
                            const res = await uploadImageFile(file, admin.token);
                            const updated = { ...(formData.arFeatures || {}), f3Img: res.url };
                            setFormData(prev => ({ ...prev, arFeatures: updated }));
                            await persistSectionToDatabase('arFeatures', updated);
                            setStatusMsg('Image uploaded successfully!');
                          } catch (err) {
                            setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <img
                      src={getAdminValidImageUrl(formData.arFeatures?.f3Img, 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=800&q=80')}
                      alt="Row 3 Preview"
                      style={{ width: '100px', height: '50px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #38bdf8' }}
                    />
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                      🏷️ Row 3 Image Alt Text (SEO Keyword)
                    </label>
                    <input
                      type="text"
                      value={formData.arFeatures?.f3ImgAlt || ''}
                      onChange={(e) => handleFieldChange('arFeatures', 'f3ImgAlt', e.target.value)}
                      placeholder="e.g. Budget-Friendly AR Setup - Winera"
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arFeatures', formData.arFeatures || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save AR Features
                </button>
              </div>
            </div>
          )}

          {/* KNOW YOUR RETURNS SECTION FORM */}
          {activeSection === 'arEarn' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Know Your Returns Section Settings</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Section Title (Use *word* for cyan highlight & &lt;br/&gt; for linebreaks)</label>
                <input
                  type="text"
                  value={formData.arEarn?.title || '*Know Your Returns Before* You Invest in<br/>AR Gaming Equipment'}
                  onChange={(e) => handleFieldChange('arEarn', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <RichTextareaWithEditor
                label="Paragraph 1"
                rows={3}
                value={formData.arEarn?.p1 !== undefined ? formData.arEarn.p1 : "Most AR games suppliers in India present a product catalogue and a price list the financial planning is left entirely to you. As India's ROI-First Game Zone Developer, Winera International works differently. Before recommending any product or configuration, our team prepares a complete ROI report for your specific venue covering equipment cost, projected daily sessions, estimated revenue per attraction, maintenance costs, and break-even timeline."}
                onChange={(val) => handleFieldChange('arEarn', 'p1', val)}
                placeholder="Enter Paragraph 1..."
              />

              <RichTextareaWithEditor
                label="Paragraph 2"
                rows={3}
                value={formData.arEarn?.p2 !== undefined ? formData.arEarn.p2 : "Every figure is calculated around your venue type, available floor space, and visitor demographic, not an industry benchmark that may have no relevance to your actual situation. Very few interactive gaming setup suppliers in India include this as a standard part of their process. For Winera, it is where every project starts"}
                onChange={(val) => handleFieldChange('arEarn', 'p2', val)}
                placeholder="Enter Paragraph 2..."
              />


              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Right Side Gamers Image Graphic <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <label style={{
                    background: '#38bdf8',
                    color: '#ffffff',
                    padding: '10px 18px',
                    borderRadius: '12px',
                    fontWeight: '800',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Choose Right Gamers Graphic
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading gamers graphic...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.arEarn || {}), imgUrl: res.url };
                          setFormData(prev => ({ ...prev, arEarn: updated }));
                          await persistSectionToDatabase('arEarn', updated);
                          setStatusMsg('Image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <img
                    src={getAdminValidImageUrl(formData.arEarn?.imgUrl, arEarnGamers)}
                    alt="Gamers Graphic Preview"
                    style={{ width: '100px', height: '60px', borderRadius: '10px', objectFit: 'cover', border: '1.5px solid #38bdf8' }}
                  />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                    🏷️ Right Side Gamers Image Graphic Alt Text (SEO Keyword)
                  </label>
                  <input
                    type="text"
                    value={formData.arEarn?.imgAlt || ''}
                    onChange={(e) => handleFieldChange('arEarn', 'imgAlt', e.target.value)}
                    placeholder="e.g. Know Your Returns Before You Invest in AR Gaming Equipment - Winera"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arEarn', formData.arEarn || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Know Your Returns Section
                </button>
              </div>
            </div>
          )}

          {/* AR GAMES WHY CHOOSE US FORM */}
          {activeSection === 'arWhyUs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Why Choose Winera International Section</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Section Title (Use *word* for cyan highlight)</label>
                <input
                  type="text"
                  value={formData.arWhyUs?.title || 'Why Choose *Winera International*'}
                  onChange={(e) => handleFieldChange('arWhyUs', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              {/* Cards List Manager */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0369a1' }}>Feature Cards (6 Cards Layout)</h4>
                  <button
                    onClick={() => {
                      const cur = formData.arWhyUs?.cardsList || [
                        { title: "Right Product, Right Venue", desc: "We Recommend What Actually Fits Your Space And Footfall." },
                        { title: "ROI Before You Invest", desc: "We Show You The Real Numbers Before You Commit." },
                        { title: "Operational From Day One", desc: "We Install And Configure Everything, So You Open Without The Headaches." },
                        { title: "Support Beyond Installation", desc: "Our Own Technicians Handle Servicing And Updates After Handover." },
                        { title: "Age-Inclusive Entertainment", desc: "We Choose A Mix That Entertains All Ages, So More Visitors Walk In." },
                        { title: "Trusted Across Venue Types", desc: "From Malls And Hotels To Schools And Resorts Across India Trust Us." }
                      ];
                      handleFieldChange('arWhyUs', 'cardsList', [...cur, { title: 'New Feature Card', desc: 'Card description goes here.' }]);
                    }}
                    style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    + Add Feature Card
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {(formData.arWhyUs?.cardsList || [
                    { title: "Right Product, Right Venue", desc: "We Recommend What Actually Fits Your Space And Footfall." },
                    { title: "ROI Before You Invest", desc: "We Show You The Real Numbers Before You Commit." },
                    { title: "Operational From Day One", desc: "We Install And Configure Everything, So You Open Without The Headaches." },
                    { title: "Support Beyond Installation", desc: "Our Own Technicians Handle Servicing And Updates After Handover." },
                    { title: "Age-Inclusive Entertainment", desc: "We Choose A Mix That Entertains All Ages, So More Visitors Walk In." },
                    { title: "Trusted Across Venue Types", desc: "From Malls And Hotels To Schools And Resorts Across India Trust Us." }
                  ]).map((card, idx) => (
                    <div key={idx} style={{ background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '800', fontSize: '13px', color: '#0284c7' }}>Card #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={async () => {
                            const list = [...(formData.arWhyUs?.cardsList || [
                              { title: "Right Product, Right Venue", desc: "We Recommend What Actually Fits Your Space And Footfall." },
                              { title: "ROI Before You Invest", desc: "We Show You The Real Numbers Before You Commit." },
                              { title: "Operational From Day One", desc: "We Install And Configure Everything, So You Open Without The Headaches." },
                              { title: "Support Beyond Installation", desc: "Our Own Technicians Handle Servicing And Updates After Handover." },
                              { title: "Age-Inclusive Entertainment", desc: "We Choose A Mix That Entertains All Ages, So More Visitors Walk In." },
                              { title: "Trusted Across Venue Types", desc: "From Malls And Hotels To Schools And Resorts Across India Trust Us." }
                            ])];
                            const updated = list.filter((_, i) => i !== idx);
                            const updatedSec = { ...(formData.arWhyUs || {}), cardsList: updated };
                            setFormData(prev => ({ ...prev, arWhyUs: updatedSec }));
                            await persistSectionToDatabase('arWhyUs', updatedSec);
                          }}
                          style={{ background: '#ef4444', color: '#fff', border: 'none', width: '28px', height: '28px', borderRadius: '6px', cursor: 'pointer', fontWeight: '900' }}
                        >
                          ×
                        </button>
                      </div>

                      <input
                        type="text"
                        placeholder="Card Title"
                        value={card.title || ''}
                        onChange={(e) => {
                          const list = [...(formData.arWhyUs?.cardsList || [])];
                          list[idx] = { ...list[idx], title: e.target.value };
                          handleFieldChange('arWhyUs', 'cardsList', list);
                        }}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                      />

                      <RichTextareaWithEditor
                        label="Card Description"
                        rows={2}
                        placeholder="Card Description"
                        value={card.desc || ''}
                        onChange={(val) => {
                          const list = [...(formData.arWhyUs?.cardsList || [])];
                          list[idx] = { ...list[idx], desc: val };
                          handleFieldChange('arWhyUs', 'cardsList', list);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arWhyUs', formData.arWhyUs || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Why Choose Section
                </button>
              </div>
            </div>
          )}

          {/* AR GAMES FAQS FORM */}
          {activeSection === 'arFaqs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>AR Games FAQs Management</h3>
                <button
                  onClick={() => {
                    const currentList = Array.isArray(formData.arFaqs) && formData.arFaqs.length > 0
                      ? formData.arFaqs
                      : [
                        { question: "Who is a reliable AR games supplier in India?", answer: "Winera International is a direct AR games supplier in India, sourcing and installing commercial AR and interactive gaming equipment for malls, hotels, schools, resorts, and family entertainment centres." },
                        { question: "What is the setup cost for AR gaming equipment in India?", answer: "AR gaming cost in India depends on the product category, number of units and customisation requirements. Winera provides a complete cost breakdown of equipment, installation, and maintenance before confirming any order. Contact our team for a quote specific to your venue." },
                        { question: "What is the minimum space required for AR gaming equipment?", answer: "Space requirements vary by product. Interactive floor tiles start from 30x30cm per module, while full sports simulators typically require 4–9 metres in length and 3–3.5 metres ceiling height. Winera's team assesses your exact dimensions before recommending compatible products." },
                        { question: "How do I get started with an AR gaming zone setup from Winera?", answer: "Contact us via our website's contact form, WhatsApp, or call +91 91578 73576. Share your venue type, available floor space, and the type of interactive experience you want to offer. Our team will recommend the right product mix, prepare a free ROI report, and send a quote ASAP." },
                        { question: "Can AR gaming equipment be customised with branding or specific game content?", answer: "Yes. Many products in our range support custom branding, game library selection, and venue-specific content configuration. We confirm available customisation options for each product during the consultation stage." },
                        { question: "What is the typical ROI for an AR gaming zone in India?", answer: "ROI depends on your venue type, daily footfall, session pricing, and machine mix. Winera prepares a free ROI report for every project — covering projected daily sessions, estimated revenue per attraction, maintenance costs, and break-even timeline — specific to your venue before you confirm any order." },
                        { question: "Does Winera provide after-sales support for AR and interactive gaming equipment?", answer: "Yes. Our own technicians provide software updates, hardware servicing, and on-site support for all AR games and interactive gaming equipment we install — directly through our own team, without third-party service agents." },
                        { question: "How long does AR gaming equipment installation take?", answer: "Installation timelines depend on the number of products, venue readiness, and configuration complexity. A single interactive floor system can be operational within days, while a complete multi-category AR gaming zone takes longer for full setup and software configuration." }
                      ];
                    const updated = [...currentList, { question: '', answer: '' }];
                    setFormData((prev) => ({ ...prev, arFaqs: updated }));
                  }}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                >
                  + Add FAQ Item
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(Array.isArray(formData.arFaqs) && formData.arFaqs.length > 0
                  ? formData.arFaqs
                  : [
                    { question: "Who is a reliable AR games supplier in India?", answer: "Winera International is a direct AR games supplier in India, sourcing and installing commercial AR and interactive gaming equipment for malls, hotels, schools, resorts, and family entertainment centres." },
                    { question: "What is the setup cost for AR gaming equipment in India?", answer: "AR gaming cost in India depends on the product category, number of units and customisation requirements. Winera provides a complete cost breakdown of equipment, installation, and maintenance before confirming any order. Contact our team for a quote specific to your venue." },
                    { question: "What is the minimum space required for AR gaming equipment?", answer: "Space requirements vary by product. Interactive floor tiles start from 30x30cm per module, while full sports simulators typically require 4–9 metres in length and 3–3.5 metres ceiling height. Winera's team assesses your exact dimensions before recommending compatible products." },
                    { question: "How do I get started with an AR gaming zone setup from Winera?", answer: "Contact us via our website's contact form, WhatsApp, or call +91 91578 73576. Share your venue type, available floor space, and the type of interactive experience you want to offer. Our team will recommend the right product mix, prepare a free ROI report, and send a quote ASAP." },
                    { question: "Can AR gaming equipment be customised with branding or specific game content?", answer: "Yes. Many products in our range support custom branding, game library selection, and venue-specific content configuration. We confirm available customisation options for each product during the consultation stage." },
                    { question: "What is the typical ROI for an AR gaming zone in India?", answer: "ROI depends on your venue type, daily footfall, session pricing, and machine mix. Winera prepares a free ROI report for every project — covering projected daily sessions, estimated revenue per attraction, maintenance costs, and break-even timeline — specific to your venue before you confirm any order." },
                    { question: "Does Winera provide after-sales support for AR and interactive gaming equipment?", answer: "Yes. Our own technicians provide software updates, hardware servicing, and on-site support for all AR games and interactive gaming equipment we install — directly through our own team, without third-party service agents." },
                    { question: "How long does AR gaming equipment installation take?", answer: "Installation timelines depend on the number of products, venue readiness, and configuration complexity. A single interactive floor system can be operational within days, while a complete multi-category AR gaming zone takes longer for full setup and software configuration." }
                  ]
                ).map((faq, idx) => (
                  <div key={idx} style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '800', fontSize: '13px', color: '#0369a1' }}>FAQ #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={async () => {
                          const currentList = Array.isArray(formData.arFaqs) && formData.arFaqs.length > 0
                            ? [...formData.arFaqs]
                            : [
                              { question: "Who is a reliable AR games supplier in India?", answer: "Winera International is a direct AR games supplier in India, sourcing and installing commercial AR and interactive gaming equipment for malls, hotels, schools, resorts, and family entertainment centres." },
                              { question: "What is the setup cost for AR gaming equipment in India?", answer: "AR gaming cost in India depends on the product category, number of units and customisation requirements. Winera provides a complete cost breakdown of equipment, installation, and maintenance before confirming any order. Contact our team for a quote specific to your venue." },
                              { question: "What is the minimum space required for AR gaming equipment?", answer: "Space requirements vary by product. Interactive floor tiles start from 30x30cm per module, while full sports simulators typically require 4–9 metres in length and 3–3.5 metres ceiling height. Winera's team assesses your exact dimensions before recommending compatible products." },
                              { question: "How do I get started with an AR gaming zone setup from Winera?", answer: "Contact us via our website's contact form, WhatsApp, or call +91 91578 73576. Share your venue type, available floor space, and the type of interactive experience you want to offer. Our team will recommend the right product mix, prepare a free ROI report, and send a quote ASAP." },
                              { question: "Can AR gaming equipment be customised with branding or specific game content?", answer: "Yes. Many products in our range support custom branding, game library selection, and venue-specific content configuration. We confirm available customisation options for each product during the consultation stage." },
                              { question: "What is the typical ROI for an AR gaming zone in India?", answer: "ROI depends on your venue type, daily footfall, session pricing, and machine mix. Winera prepares a free ROI report for every project — covering projected daily sessions, estimated revenue per attraction, maintenance costs, and break-even timeline — specific to your venue before you confirm any order." },
                              { question: "Does Winera provide after-sales support for AR and interactive gaming equipment?", answer: "Yes. Our own technicians provide software updates, hardware servicing, and on-site support for all AR games and interactive gaming equipment we install — directly through our own team, without third-party service agents." },
                              { question: "How long does AR gaming equipment installation take?", answer: "Installation timelines depend on the number of products, venue readiness, and configuration complexity. A single interactive floor system can be operational within days, while a complete multi-category AR gaming zone takes longer for full setup and software configuration." }
                            ];
                          const updated = currentList.filter((_, i) => i !== idx);
                          setFormData((prev) => ({ ...prev, arFaqs: updated }));
                          await persistSectionToDatabase('arFaqs', updated);
                        }}
                        style={{ background: '#ef4444', color: '#fff', border: 'none', width: '28px', height: '28px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '900' }}
                      >
                        ×
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="Question"
                      value={faq.question || faq.q || ''}
                      onChange={(e) => {
                        const currentList = Array.isArray(formData.arFaqs) ? [...formData.arFaqs] : [];
                        currentList[idx] = { ...currentList[idx], question: e.target.value, q: e.target.value };
                        setFormData((prev) => ({ ...prev, arFaqs: currentList }));
                      }}
                      style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                    />

                    <RichTextareaWithEditor
                      label="Answer"
                      rows={3}
                      placeholder="Answer"
                      value={faq.answer || faq.a || ''}
                      onChange={(val) => {
                        const currentList = Array.isArray(formData.arFaqs) ? [...formData.arFaqs] : [];
                        currentList[idx] = { ...currentList[idx], answer: val, a: val };
                        setFormData((prev) => ({ ...prev, arFaqs: currentList }));
                      }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arFaqs', formData.arFaqs || [])}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save AR FAQs
                </button>
              </div>
            </div>
          )}

          {/* AR GAMES CTA BANNER FORM */}
          {activeSection === 'arCta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>AR Games CTA Banner Settings</h3>

              {/* Background Image Upload */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
                  CTA Banner Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                </h4>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img
                    src={getAdminValidImageUrl(
                      (formData.arCta?.bgUrl && !formData.arCta.bgUrl.includes('cta-consultations') && !formData.arCta.bgUrl.includes('need-consultations') && !formData.arCta.bgUrl.includes('project-lastbg'))
                        ? formData.arCta.bgUrl
                        : (formData.arCta?.bg && !formData.arCta.bg.includes('cta-consultations') && !formData.arCta.bg.includes('need-consultations') && !formData.arCta.bg.includes('project-lastbg') ? formData.arCta.bg : ''),
                      ctaMainBanner
                    )}
                    alt="CTA Background Preview"
                    style={{ width: '140px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                  />
                  <input
                    type="text"
                    value={formData.arCta?.bgUrl || formData.arCta?.bg || ''}
                    onChange={(e) => {
                      handleFieldChange('arCta', 'bgUrl', e.target.value);
                      handleFieldChange('arCta', 'bg', e.target.value);
                    }}
                    placeholder="Background Image URL"
                    style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', background: '#ffffff' }}
                  />
                  <label style={{ padding: '12px 20px', background: '#38bdf8', color: '#ffffff', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload BG Image
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const res = await uploadImageFile(file, admin.token);
                          handleFieldChange('arCta', 'bgUrl', res.url);
                          handleFieldChange('arCta', 'bg', res.url);
                          await persistSectionToDatabase('arCta', { ...(formData.arCta || {}), bgUrl: res.url, bg: res.url });
                          setStatusMsg('Background image uploaded successfully!');
                        }
                      }}
                    />
                  </label>
                  {(formData.arCta?.bgUrl || formData.arCta?.bg) && (
                    <button
                      type="button"
                      onClick={async () => {
                        handleFieldChange('arCta', 'bgUrl', '');
                        handleFieldChange('arCta', 'bg', '');
                        await persistSectionToDatabase('arCta', { ...(formData.arCta || {}), bgUrl: '', bg: '' });
                      }}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '12px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Remove Custom BG
                    </button>
                  )}
                </div>
                <div style={{ marginTop: '14px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                    🏷️ Banner Background Image Alt Text (SEO Keyword)
                  </label>
                  <input
                    type="text"
                    value={formData.arCta?.bgAlt || ''}
                    onChange={(e) => handleFieldChange('arCta', 'bgAlt', e.target.value)}
                    placeholder="e.g. Ready to Set Up Your AR Gaming Zone - Winera"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>



              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Main Title Heading Text</label>
                <input
                  type="text"
                  value={formData.arCta?.title !== undefined ? formData.arCta.title : "Ready to Set Up Your Gaming Zone?"}
                  onChange={(e) => handleFieldChange('arCta', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <RichTextareaWithEditor
                label="Description Paragraph"
                rows={2}
                value={formData.arCta?.description !== undefined ? formData.arCta.description : (formData.arCta?.whiteText !== undefined ? formData.arCta.whiteText : "Get in touch with India's ROI-First Game Zone Developer")}
                onChange={(val) => {
                  handleFieldChange('arCta', 'description', val);
                  handleFieldChange('arCta', 'whiteText', val);
                }}
                placeholder="Enter Description..."
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.arCta?.buttonText !== undefined ? formData.arCta.buttonText : 'Get a Quote'}
                    onChange={(e) => handleFieldChange('arCta', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link (Redirect URL)</label>
                  <input
                    type="text"
                    value={formData.arCta?.buttonLink !== undefined ? formData.arCta.buttonLink : 'https://wa.me/919157873576'}
                    onChange={(e) => handleFieldChange('arCta', 'buttonLink', e.target.value)}
                    placeholder="https://wa.me/919157873576"
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arCta', formData.arCta || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save AR Games CTA Banner
                </button>
              </div>
            </div>
          )}
    </>
  );
}
