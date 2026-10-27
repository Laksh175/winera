import React from 'react';
import { Upload } from 'lucide-react';
import RichTextareaWithEditor from '../components/RichTextareaWithEditor';
import AdminAltInput from '../components/AdminAltInput';
import { uploadImageFile } from '../services/api';

const amusementHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345536/winera_uploads/s8shz3a3qqju8pkzuosz.png";
const amusementMobileHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345538/winera_uploads/zoiowsmyqss0g4jfojxg.png";
const amusementSupplierCollage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345542/winera_uploads/fdeml6rze08pwyeevuol.png";
const amusementSetupsCollage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345541/winera_uploads/ft99zjjtowo2whm7wmfm.png";
const amusementOptionsTopCollage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345534/winera_uploads/zwtfbjhcbssivoub3tt3.png";
const amusementOptionsBottomImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345532/winera_uploads/tztjfsszmpxauyphdevb.png";
const ctaMainBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345648/winera_uploads/ei16uczeuelaabtue4bs.jpg";

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

export default function AmusementDashboard({
  activeSection,
  formData = {},
  setFormData,
  handleFieldChange,
  persistSectionToDatabase,
  openModal,
  handleDeleteItem,
  admin,
  setStatusMsg
}) {
  return (
    <>
          {/* AMUSEMENT HERO BANNER FORM */}

          {/* AMUSEMENT HERO BANNER FORM */}
          {activeSection === 'amusementHero' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Amusement Park Hero Banner</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>Breadcrumb Active Page Text</label>
                <input
                  type="text"
                  value={formData.amusementHero?.breadcrumbText || 'Amusement Park'}
                  onChange={(e) => handleFieldChange('amusementHero', 'breadcrumbText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Hero Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img
                    src={getAdminValidImageUrl(formData.amusementHero?.bgUrl, amusementHeroBg)}
                    alt="Hero Background Preview"
                    style={{ width: '80px', height: '50px', borderRadius: '8px', border: '1.5px solid #38bdf8', objectFit: 'cover' }}
                  />
                  <input
                    type="text"
                    value={formData.amusementHero?.bgUrl || ''}
                    onChange={(e) => handleFieldChange('amusementHero', 'bgUrl', e.target.value)}
                    placeholder="Image URL or Asset Path"
                    style={{ flex: 1, padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
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
                    <Upload style={{ width: '16px', height: '16px' }} /> Choose Hero Background Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading hero background image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.amusementHero || {}), bgUrl: res.url };
                          setFormData(prev => ({ ...prev, amusementHero: updated }));
                          await persistSectionToDatabase('amusementHero', updated);
                          setStatusMsg('Image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {formData.amusementHero?.bgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('amusementHero', 'bgUrl', '')}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '8px 14px', borderRadius: '10px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
              </div>

              <AdminAltInput
                label="🏷️ Background Image Alt Text (SEO Keyword)"
                value={formData.amusementHero?.bgAlt || ''}
                onChange={(e) => handleFieldChange('amusementHero', 'bgAlt', e.target.value)}
                placeholder="e.g. Amusement Rides & Equipment Setup - Winera"
              />

              {/* Mobile Screen Hero Banner Upload & Preview */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                  Mobile Screen Hero Banner <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📱 Recommended Size: 941 × 550 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img
                    src={getAdminValidImageUrl(formData.amusementHero?.mobileBgUrl, amusementMobileHeroBg)}
                    alt="Mobile Hero Bg Preview"
                    style={{ width: '120px', height: '65px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                  />
                  <input
                    type="text"
                    value={formData.amusementHero?.mobileBgUrl || ''}
                    onChange={(e) => handleFieldChange('amusementHero', 'mobileBgUrl', e.target.value)}
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
                          setStatusMsg('Uploading mobile hero banner image...');
                          try {
                            const res = await uploadImageFile(file, admin.token);
                            const updated = { ...(formData.amusementHero || {}), mobileBgUrl: res.url };
                            setFormData(prev => ({ ...prev, amusementHero: updated }));
                            await persistSectionToDatabase('amusementHero', updated);
                            setStatusMsg('Mobile banner uploaded successfully!');
                          } catch (err) {
                            setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                          }
                        }
                      }}
                    />
                  </label>
                  {formData.amusementHero?.mobileBgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('amusementHero', 'mobileBgUrl', '')}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '12px 18px', borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
                <AdminAltInput
                  compact
                  label="🏷️ Mobile Background Image Alt Text (SEO Keyword)"
                  value={formData.amusementHero?.mobileBgAlt || ''}
                  onChange={(e) => handleFieldChange('amusementHero', 'mobileBgAlt', e.target.value)}
                  placeholder="e.g. Turnkey Amusement Park Setup Mobile Banner - Winera International"
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('amusementHero', formData.amusementHero || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Amusement Hero Banner
                </button>
              </div>
            </div>
          )}

          {/* AMUSEMENT INTRO / RIDE MANUFACTURER FORM */}
          {activeSection === 'amusementIntro' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Amusement Park Ride Manufacturer Section</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>Section Title (*word* for cyan, &lt;br/&gt; for linebreaks)</label>
                <input
                  type="text"
                  value={formData.amusementIntro?.title || '*Amusement Park Ride*<br/>Manufacturer in India'}
                  onChange={(e) => handleFieldChange('amusementIntro', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Description Paragraph"
                  rows={3}
                  value={formData.amusementIntro?.desc !== undefined ? formData.amusementIntro.desc : "India's ROI-first amusement park partner rides and attractions sourced, installed, and serviced by our own team across 50+ cities."}
                  onChange={(val) => handleFieldChange('amusementIntro', 'desc', val)}
                  placeholder="Enter description paragraph..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#0f172a', marginBottom: '4px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.amusementIntro?.buttonText || 'Get Quote From Expert'}
                    onChange={(e) => handleFieldChange('amusementIntro', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#0f172a', marginBottom: '4px' }}>Button Link</label>
                  <input
                    type="text"
                    value={(formData.amusementIntro?.buttonLink && formData.amusementIntro.buttonLink.split('?')[0]) || 'https://wa.me/919157873576'}
                    onChange={(e) => {
                      const baseLink = e.target.value;
                      const msg = formData.amusementIntro?.waMessage || "Hello Winera International! I want to get a quote and details for Amusement Park Rides. Please share details. [Ref: Amusement Park Page]";
                      const updatedLink = msg ? `${baseLink.split('?')[0]}?text=${encodeURIComponent(msg)}` : baseLink;
                      setFormData(prev => ({ ...prev, amusementIntro: { ...(prev.amusementIntro || {}), buttonLink: updatedLink } }));
                    }}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
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
                    if (formData.amusementIntro?.waMessage !== undefined && formData.amusementIntro.waMessage !== '') return formData.amusementIntro.waMessage;
                    if (formData.amusementIntro?.buttonLink && formData.amusementIntro.buttonLink.includes('text=')) {
                      try {
                        const match = formData.amusementIntro.buttonLink.match(/text=([^&]+)/);
                        if (match && match[1]) return decodeURIComponent(match[1]);
                      } catch (err) { }
                    }
                    return "Hello Winera International! I want to get a quote and details for Amusement Park Rides. Please share details. [Ref: Amusement Park Page]";
                  })()}
                  onChange={(e) => {
                    const newMsg = e.target.value;
                    const baseLink = (formData.amusementIntro?.buttonLink && formData.amusementIntro.buttonLink.split('?')[0]) || 'https://wa.me/919157873576';
                    const updatedLink = newMsg ? `${baseLink}?text=${encodeURIComponent(newMsg)}` : baseLink;
                    setFormData(prev => ({
                      ...prev,
                      amusementIntro: {
                        ...(prev.amusementIntro || {}),
                        waMessage: newMsg,
                        buttonLink: updatedLink
                      }
                    }));
                  }}
                  placeholder="e.g. Hello Winera International! I want to get a quote..."
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', lineHeight: 1.5, color: '#0f172a', fontWeight: '500' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Left Collage Graphic Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img
                    src={getAdminValidImageUrl(formData.amusementIntro?.mainImgUrl, amusementSupplierCollage)}
                    alt="Collage Preview"
                    style={{ width: '80px', height: '50px', borderRadius: '8px', border: '1.5px solid #38bdf8', objectFit: 'cover' }}
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
                    <Upload style={{ width: '16px', height: '16px' }} /> Choose Left Collage Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading left collage image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.amusementIntro || {}), mainImgUrl: res.url };
                          setFormData(prev => ({ ...prev, amusementIntro: updated }));
                          await persistSectionToDatabase('amusementIntro', updated);
                          setStatusMsg('Image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {formData.amusementIntro?.mainImgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('amusementIntro', 'mainImgUrl', '')}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '8px 14px', borderRadius: '10px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
              </div>

              <AdminAltInput
                label="🏷️ Left Collage Graphic Alt Text (SEO Keyword)"
                value={formData.amusementIntro?.mainImgAlt || formData.amusementIntro?.imgAlt || ''}
                onChange={(e) => {
                  handleFieldChange('amusementIntro', 'mainImgAlt', e.target.value);
                  handleFieldChange('amusementIntro', 'imgAlt', e.target.value);
                }}
                placeholder="e.g. Amusement Park Ride Manufacturer in India - Winera"
              />

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('amusementIntro', formData.amusementIntro || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Manufacturer Section
                </button>
              </div>
            </div>
          )}

          {/* AMUSEMENT BANNER / COMPLETE SETUPS FORM */}
          {activeSection === 'amusementBanner' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Complete Amusement Park Setups Section</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>Section Title (*word* for cyan, &lt;br/&gt; for linebreaks)</label>
                <input
                  type="text"
                  value={formData.amusementBanner?.title || 'Complete Amusement Park<br/>*Setups, Built for Indian Venues*'}
                  onChange={(e) => handleFieldChange('amusementBanner', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Paragraph 1"
                  rows={4}
                  value={formData.amusementBanner?.paragraph1 !== undefined && formData.amusementBanner.paragraph1 !== '' ? formData.amusementBanner.paragraph1 : "Winera International has been supplying and installing amusement park rides and attractions across India since 2014 — for theme parks, malls, resorts, and family entertainment centres in over 50 cities. We source every ride from established manufacturers, install it with our own team, and stay on for servicing after handover."}
                  onChange={(val) => handleFieldChange('amusementBanner', 'paragraph1', val)}
                  placeholder="Enter Paragraph 1..."
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Paragraph 2"
                  rows={4}
                  value={formData.amusementBanner?.paragraph2 !== undefined && formData.amusementBanner.paragraph2 !== '' ? formData.amusementBanner.paragraph2 : "From a few signature rides to a full park layout, we handle the whole project space planning, ride selection, installation, and after-sales support so you deal with one team from start to finish, not a chain of separate vendors."}
                  onChange={(val) => handleFieldChange('amusementBanner', 'paragraph2', val)}
                  placeholder="Enter Paragraph 2..."
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Right Graphic Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img
                    src={getAdminValidImageUrl(formData.amusementBanner?.imgUrl, amusementSetupsCollage)}
                    alt="Graphic Preview"
                    style={{ width: '80px', height: '50px', borderRadius: '8px', border: '1.5px solid #38bdf8', objectFit: 'cover' }}
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
                    <Upload style={{ width: '16px', height: '16px' }} /> Choose Right Graphic Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading graphic image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.amusementBanner || {}), imgUrl: res.url };
                          setFormData(prev => ({ ...prev, amusementBanner: updated }));
                          await persistSectionToDatabase('amusementBanner', updated);
                          setStatusMsg('Image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {formData.amusementBanner?.imgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('amusementBanner', 'imgUrl', '')}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '8px 14px', borderRadius: '10px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
              </div>

              <AdminAltInput
                label="🏷️ Right Graphic Alt Text (SEO Keyword)"
                value={formData.amusementBanner?.imgAlt || ''}
                onChange={(e) => handleFieldChange('amusementBanner', 'imgAlt', e.target.value)}
                placeholder="e.g. Complete Amusement Park Setups Built for Indian Venues - Winera"
              />

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('amusementBanner', formData.amusementBanner || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Complete Setups Section
                </button>
              </div>
            </div>
          )}

          {/* AMUSEMENT OPTIONS / RIDES WE SUPPLY FORM */}
          {activeSection === 'amusementOptions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Rides & Attractions We Supply Section</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>Section Title (*word* for cyan, &lt;br/&gt; for linebreaks)</label>
                <input
                  type="text"
                  value={formData.amusementOptions?.title || '*Rides & Attractions*<br/>We Supply'}
                  onChange={(e) => handleFieldChange('amusementOptions', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Subtitle"
                  rows={2}
                  value={formData.amusementOptions?.subtitle !== undefined ? formData.amusementOptions.subtitle : 'We Supply Many Types Of Rides So You Can Build The Right Experience For Your Space And Visitors.'}
                  onChange={(val) => handleFieldChange('amusementOptions', 'subtitle', val)}
                  placeholder="Enter subtitle..."
                />
              </div>

              {/* RIDES ITEMS LIST MANAGER */}
              {(() => {
                const defaultRideItems = [
                  { boldText: "Thrill Rides", desc: "For Teens And Adults Chasing Excitement" },
                  { boldText: "Family Rides", desc: "Gentler Attractions The Whole Family Can Enjoy Together" },
                  { boldText: "Kids' Rides", desc: "Safe, Age-Appropriate Rides For Younger Visitors" },
                  { boldText: "Classic Favourites", desc: "Proven, Time-Tested Crowd-Pullers" },
                  { boldText: "Custom Attractions", desc: "Tailored To Your Theme And Space" }
                ];
                const currentSec = formData.amusementOptions || {};
                const rideItemsList = Array.isArray(currentSec.items)
                  ? currentSec.items
                  : defaultRideItems;

                return (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <label style={{ fontWeight: '800', fontSize: '13px', color: '#0f172a' }}>Ride & Attraction Items ({rideItemsList.length})</label>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...rideItemsList, { boldText: 'New Ride Category', desc: 'Category description here.' }];
                          const updatedSec = { ...currentSec, items: updated };
                          setFormData(prev => ({ ...prev, amusementOptions: updatedSec }));
                        }}
                        style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}
                      >
                        + Add Ride Item
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {rideItemsList.map((item, idx) => (
                        <div key={idx} style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '800', fontSize: '13px', color: '#0284c7' }}>Ride Category #{idx + 1}: {item.boldText || item.title}</span>
                            <button
                              type="button"
                              onClick={async () => {
                                const updated = rideItemsList.filter((_, i) => i !== idx);
                                const updatedSec = { ...currentSec, items: updated };
                                setFormData(prev => ({ ...prev, amusementOptions: updatedSec }));
                                await persistSectionToDatabase('amusementOptions', updatedSec);
                              }}
                              style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '800', fontSize: '12px' }}
                            >
                              Delete Item
                            </button>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <input
                              type="text"
                              value={item.boldText || item.title || ''}
                              onChange={(e) => {
                                const updated = [...rideItemsList];
                                updated[idx] = { ...updated[idx], boldText: e.target.value, title: e.target.value };
                                const updatedSec = { ...currentSec, items: updated };
                                setFormData(prev => ({ ...prev, amusementOptions: updatedSec }));
                              }}
                              placeholder="Category Name (e.g. Thrill Rides)"
                              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                            />
                            <RichTextareaWithEditor
                              label="Item Description"
                              rows={2}
                              value={item.desc || item.description || ''}
                              onChange={(val) => {
                                const updated = [...rideItemsList];
                                updated[idx] = { ...updated[idx], desc: val, description: val };
                                const updatedSec = { ...currentSec, items: updated };
                                setFormData(prev => ({ ...prev, amusementOptions: updatedSec }));
                              }}
                              placeholder="Description (e.g. For Teens And Adults...)"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              <div>
                <RichTextareaWithEditor
                  label="Footer Safety Note"
                  rows={3}
                  value={formData.amusementOptions?.footerText !== undefined && formData.amusementOptions.footerText !== '' ? formData.amusementOptions.footerText : "Every Ride Comes With Strong Safety Belts, Automatic Sensors That Stop The Ride If Something Goes Wrong, And A Tough, Durable Build. We Test Each Ride On-Site Before Handing It Over To You."}
                  onChange={(val) => handleFieldChange('amusementOptions', 'footerText', val)}
                  placeholder="Enter footer safety note..."
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Top Collage Graphic Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 400 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img
                    src={getAdminValidImageUrl(formData.amusementOptions?.topImgUrl, amusementOptionsTopCollage)}
                    alt="Top Collage Preview"
                    style={{ width: '80px', height: '50px', borderRadius: '8px', border: '1.5px solid #38bdf8', objectFit: 'cover' }}
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
                    <Upload style={{ width: '16px', height: '16px' }} /> Choose Top Collage Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading collage image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.amusementOptions || {}), topImgUrl: res.url };
                          setFormData(prev => ({ ...prev, amusementOptions: updated }));
                          await persistSectionToDatabase('amusementOptions', updated);
                          setStatusMsg('Image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {formData.amusementOptions?.topImgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('amusementOptions', 'topImgUrl', '')}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '8px 14px', borderRadius: '10px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
              </div>

              <AdminAltInput
                label="🏷️ Top Collage Graphic Alt Text (SEO Keyword)"
                value={formData.amusementOptions?.topImgAlt || formData.amusementOptions?.imgAlt || ''}
                onChange={(e) => {
                  handleFieldChange('amusementOptions', 'topImgAlt', e.target.value);
                  handleFieldChange('amusementOptions', 'imgAlt', e.target.value);
                }}
                placeholder="e.g. Rides & Attractions We Supply - Winera Commercial Amusement Parks"
              />

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('amusementOptions', formData.amusementOptions || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Rides We Supply Section
                </button>
              </div>
            </div>
          )}

          {/* AMUSEMENT ROI / BEFORE YOU BUILD FORM */}
          {activeSection === 'amusementRoi' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Before You Build ROI Section</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>Section Title (*word* for cyan, &lt;br/&gt; for linebreaks)</label>
                <input
                  type="text"
                  value={formData.amusementRoi?.title || 'Before You Build,<br/>*Know What It Will Earn*'}
                  onChange={(e) => handleFieldChange('amusementRoi', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Paragraph 1"
                  rows={3}
                  value={formData.amusementRoi?.paragraph1 !== undefined && formData.amusementRoi.paragraph1 !== '' ? formData.amusementRoi.paragraph1 : "Most Amusement Park Equipment Suppliers In India Hand You A Catalogue And A Price List, Leaving The Financial Planning Entirely To You. As India's ROI-First Game Zone Developer, Winera International Works Differently. Before Recommending, Our Team Prepares A Complete ROI Report For Your Specific Venue Covering Equipment Cost, Projected Daily Visitor Capacity, Estimated Revenue, Maintenance Costs, And Break-Even Timeline."}
                  onChange={(val) => handleFieldChange('amusementRoi', 'paragraph1', val)}
                  placeholder="Enter Paragraph 1..."
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Paragraph 2"
                  rows={3}
                  value={formData.amusementRoi?.paragraph2 !== undefined && formData.amusementRoi.paragraph2 !== '' ? formData.amusementRoi.paragraph2 : "Every Figure Is Calculated Around Your Land Size, Footfall Projection, And Target Visitor Demographic Not An Industry Average. Very Few Amusement Park Manufacturers In India Include This As A Standard Part Of Their Process. For Winera, It Is Where Every Project Begins."}
                  onChange={(val) => handleFieldChange('amusementRoi', 'paragraph2', val)}
                  placeholder="Enter Paragraph 2..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#0f172a', marginBottom: '4px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.amusementRoi?.buttonText || 'Talk to an ROI Expert'}
                    onChange={(e) => handleFieldChange('amusementRoi', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#0f172a', marginBottom: '4px' }}>Button Link</label>
                  <input
                    type="text"
                    value={(formData.amusementRoi?.buttonLink && formData.amusementRoi.buttonLink.split('?')[0]) || 'https://wa.me/919157873576'}
                    onChange={(e) => {
                      const baseLink = e.target.value;
                      const msg = formData.amusementRoi?.waMessage || "Hello Winera International! I want to talk to an ROI Expert for Amusement Park setup & commercial ROI calculation. Please share details. [Ref: Amusement Park Page]";
                      const updatedLink = msg ? `${baseLink.split('?')[0]}?text=${encodeURIComponent(msg)}` : baseLink;
                      setFormData(prev => ({ ...prev, amusementRoi: { ...(prev.amusementRoi || {}), buttonLink: updatedLink } }));
                    }}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ marginTop: '4px' }}>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  WhatsApp Auto Pre-filled Message (Readable Text) <span style={{ fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '6px' }}>💬 Sent when user clicks Talk to an ROI Expert</span>
                </label>
                <textarea
                  rows={2}
                  value={(() => {
                    if (formData.amusementRoi?.waMessage !== undefined && formData.amusementRoi.waMessage !== '') return formData.amusementRoi.waMessage;
                    if (formData.amusementRoi?.buttonLink && formData.amusementRoi.buttonLink.includes('text=')) {
                      try {
                        const match = formData.amusementRoi.buttonLink.match(/text=([^&]+)/);
                        if (match && match[1]) return decodeURIComponent(match[1]);
                      } catch (err) { }
                    }
                    return "Hello Winera International! I want to talk to an ROI Expert for Amusement Park setup & commercial ROI calculation. Please share details. [Ref: Amusement Park Page]";
                  })()}
                  onChange={(e) => {
                    const newMsg = e.target.value;
                    const baseLink = (formData.amusementRoi?.buttonLink && formData.amusementRoi.buttonLink.split('?')[0]) || 'https://wa.me/919157873576';
                    const updatedLink = newMsg ? `${baseLink}?text=${encodeURIComponent(newMsg)}` : baseLink;
                    setFormData(prev => ({
                      ...prev,
                      amusementRoi: {
                        ...(prev.amusementRoi || {}),
                        waMessage: newMsg,
                        buttonLink: updatedLink
                      }
                    }));
                  }}
                  placeholder="e.g. Hello Winera International! I want to talk to an ROI Expert..."
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', lineHeight: 1.5, color: '#0f172a', fontWeight: '500' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Bottom Inflatable Graphic Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 400 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img
                    src={getAdminValidImageUrl(formData.amusementRoi?.bottomImgUrl, amusementOptionsBottomImg)}
                    alt="Inflatable Graphic Preview"
                    style={{ width: '80px', height: '50px', borderRadius: '8px', border: '1.5px solid #38bdf8', objectFit: 'cover' }}
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
                    <Upload style={{ width: '16px', height: '16px' }} /> Choose Bottom Inflatable Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading inflatable image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.amusementRoi || {}), bottomImgUrl: res.url };
                          setFormData(prev => ({ ...prev, amusementRoi: updated }));
                          await persistSectionToDatabase('amusementRoi', updated);
                          setStatusMsg('Image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {formData.amusementRoi?.bottomImgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('amusementRoi', 'bottomImgUrl', '')}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '8px 14px', borderRadius: '10px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
              </div>

              <AdminAltInput
                label="🏷️ Bottom Inflatable Graphic Alt Text (SEO Keyword)"
                value={formData.amusementRoi?.bottomImgAlt || formData.amusementRoi?.imgAlt || ''}
                onChange={(e) => {
                  handleFieldChange('amusementRoi', 'bottomImgAlt', e.target.value);
                  handleFieldChange('amusementRoi', 'imgAlt', e.target.value);
                }}
                placeholder="e.g. Before You Build Know What It Will Earn - Amusement Park ROI Setup Winera"
              />

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('amusementRoi', formData.amusementRoi || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save ROI Section
                </button>
              </div>
            </div>
          )}


          {/* AMUSEMENT PARK FAQS MANAGEMENT FORM */}
          {activeSection === 'amusementFaqs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Amusement Park FAQs Management</h3>
                <button
                  onClick={() => {
                    const currentList = Array.isArray(formData.amusementFaqs) && formData.amusementFaqs.length > 0
                      ? formData.amusementFaqs
                      : [
                        {
                          q: "Who is a reliable amusement park manufacturer in India?",
                          a: "Winera International is a direct amusement park manufacturer in India, supplying and installing rides and equipment for theme parks, malls, and family entertainment centres since 2014 installed across 50+ cities by our own team."
                        },
                        {
                          q: "What is the cost of setting up an amusement park in India?",
                          a: "Amusement park setup cost in India depends on land size, number of rides, ride category, and customisation. Winera provides a complete cost breakdown, installation, and maintenance before confirming any project."
                        },
                        {
                          q: "What safety standards do Winera's amusement park rides meet?",
                          a: "Every ride is built with load-rated restraints, sensor-based safety stops, and commercial-grade structural materials, then tested on-site before handover."
                        },
                        {
                          q: "How much land is needed to start an amusement park in India?",
                          a: "Land requirements vary significantly by ride mix and target capacity Winera's team assesses your available space and recommends an attraction layout that fits it."
                        },
                        {
                          q: "Which businesses typically work with an amusement park equipment manufacturer in India?",
                          a: "Theme parks, malls, resorts, family entertainment centres, and tourism developments are the most common buyers of amusement park equipment in India."
                        },
                        {
                          q: "How long does amusement park ride installation take?",
                          a: "Timelines depend on ride complexity and project scale. Winera confirms an exact schedule covering manufacturing, delivery, and installation at the quote stage."
                        },
                        {
                          q: "What after-sales support does Winera provide for amusement park rides?",
                          a: "Winera provides ongoing maintenance, spare parts, and on-site servicing support for all rides and equipment installed available directly through our after-sales team."
                        }
                      ];
                    const updated = [...currentList, { q: '', a: '' }];
                    setFormData((prev) => ({ ...prev, amusementFaqs: updated }));
                  }}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                >
                  + Add FAQ Item
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(Array.isArray(formData.amusementFaqs) && formData.amusementFaqs.length > 0
                  ? formData.amusementFaqs
                  : [
                    {
                      q: "Who is a reliable amusement park manufacturer in India?",
                      a: "Winera International is a direct amusement park manufacturer in India, supplying and installing rides and equipment for theme parks, malls, and family entertainment centres since 2014 installed across 50+ cities by our own team."
                    },
                    {
                      q: "What is the cost of setting up an amusement park in India?",
                      a: "Amusement park setup cost in India depends on land size, number of rides, ride category, and customisation. Winera provides a complete cost breakdown, installation, and maintenance before confirming any project."
                    },
                    {
                      q: "What safety standards do Winera's amusement park rides meet?",
                      a: "Every ride is built with load-rated restraints, sensor-based safety stops, and commercial-grade structural materials, then tested on-site before handover."
                    },
                    {
                      q: "How much land is needed to start an amusement park in India?",
                      a: "Land requirements vary significantly by ride mix and target capacity Winera's team assesses your available space and recommends an attraction layout that fits it."
                    },
                    {
                      q: "Which businesses typically work with an amusement park equipment manufacturer in India?",
                      a: "Theme parks, malls, resorts, family entertainment centres, and tourism developments are the most common buyers of amusement park equipment in India."
                    },
                    {
                      q: "How long does amusement park ride installation take?",
                      a: "Timelines depend on ride complexity and project scale. Winera confirms an exact schedule covering manufacturing, delivery, and installation at the quote stage."
                    },
                    {
                      q: "What after-sales support does Winera provide for amusement park rides?",
                      a: "Winera provides ongoing maintenance, spare parts, and on-site servicing support for all rides and equipment installed available directly through our after-sales team."
                    }
                  ]
                ).map((faq, idx) => (
                  <div key={idx} style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '800', fontSize: '13px', color: '#0369a1' }}>FAQ #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={async () => {
                          const currentList = Array.isArray(formData.amusementFaqs) && formData.amusementFaqs.length > 0
                            ? [...formData.amusementFaqs]
                            : [
                              {
                                q: "Who is a reliable amusement park manufacturer in India?",
                                a: "Winera International is a direct amusement park manufacturer in India, supplying and installing rides and equipment for theme parks, malls, and family entertainment centres since 2014 installed across 50+ cities by our own team."
                              },
                              {
                                q: "What is the cost of setting up an amusement park in India?",
                                a: "Amusement park setup cost in India depends on land size, number of rides, ride category, and customisation. Winera provides a complete cost breakdown, installation, and maintenance before confirming any project."
                              },
                              {
                                q: "What safety standards do Winera's amusement park rides meet?",
                                a: "Every ride is built with load-rated restraints, sensor-based safety stops, and commercial-grade structural materials, then tested on-site before handover."
                              },
                              {
                                q: "How much land is needed to start an amusement park in India?",
                                a: "Land requirements vary significantly by ride mix and target capacity Winera's team assesses your available space and recommends an attraction layout that fits it."
                              },
                              {
                                q: "Which businesses typically work with an amusement park equipment manufacturer in India?",
                                a: "Theme parks, malls, resorts, family entertainment centres, and tourism developments are the most common buyers of amusement park equipment in India."
                              },
                              {
                                q: "How long does amusement park ride installation take?",
                                a: "Timelines depend on ride complexity and project scale. Winera confirms an exact schedule covering manufacturing, delivery, and installation at the quote stage."
                              },
                              {
                                q: "What after-sales support does Winera provide for amusement park rides?",
                                a: "Winera provides ongoing maintenance, spare parts, and on-site servicing support for all rides and equipment installed available directly through our after-sales team."
                              }
                            ];
                          const updated = currentList.filter((_, i) => i !== idx);
                          setFormData((prev) => ({ ...prev, amusementFaqs: updated }));
                          await persistSectionToDatabase('amusementFaqs', updated);
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
                        const currentList = [...(formData.amusementFaqs || [])];
                        currentList[idx] = { ...(currentList[idx] || {}), question: e.target.value, q: e.target.value };
                        setFormData((prev) => ({ ...prev, amusementFaqs: currentList }));
                      }}
                      style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: '700' }}
                    />

                    <RichTextareaWithEditor
                      label="Answer"
                      rows={3}
                      value={faq.answer || faq.a || ''}
                      onChange={(val) => {
                        const currentList = [...(formData.amusementFaqs || [])];
                        currentList[idx] = { ...(currentList[idx] || {}), answer: val, a: val };
                        setFormData((prev) => ({ ...prev, amusementFaqs: currentList }));
                      }}
                      placeholder="Answer"
                    />
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('amusementFaqs', formData.amusementFaqs || [])}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}>
                  Save Amusement Park FAQs
                </button>
              </div>
            </div>
          )}


          {/* AMUSEMENT PARK CTA BANNER FORM */}
          {activeSection === 'amusementCta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Amusement Park CTA Banner Settings</h3>

              {/* Banner Background Image Upload */}
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Banner Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img
                    src={getAdminValidImageUrl(formData.amusementCta?.bgUrl, ctaMainBanner)}
                    alt="Banner Background Preview"
                    style={{ width: '120px', height: '60px', borderRadius: '10px', objectFit: 'cover', border: '1.5px solid #38bdf8' }}
                  />
                  <label style={{ background: '#38bdf8', color: '#ffffff', padding: '10px 18px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Background Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading background...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.amusementCta || {}), bgUrl: res.url };
                          setFormData(prev => ({ ...prev, amusementCta: updated }));
                          await persistSectionToDatabase('amusementCta', updated);
                          setStatusMsg('Background image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {formData.amusementCta?.bgUrl && (
                    <button
                      type="button"
                      onClick={async () => {
                        const updated = { ...(formData.amusementCta || {}), bgUrl: '' };
                        setFormData(prev => ({ ...prev, amusementCta: updated }));
                        await persistSectionToDatabase('amusementCta', updated);
                        setStatusMsg('Banner reset to default successfully!');
                      }}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Reset to Default Banner
                    </button>
                  )}
                </div>
                <AdminAltInput
                  compact
                  label="🏷️ Banner Background Image Alt Text (SEO Keyword)"
                  value={formData.amusementCta?.bgAlt || ''}
                  onChange={(e) => handleFieldChange('amusementCta', 'bgAlt', e.target.value)}
                  placeholder="e.g. Need Any Consultations - Amusement Park Solutions by Winera"
                />
              </div>



              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Yellow Title Text</label>
                  <input
                    type="text"
                    value={formData.amusementCta?.yellowText || 'NEED ANY'}
                    onChange={(e) => handleFieldChange('amusementCta', 'yellowText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Cyan Title Text</label>
                  <input
                    type="text"
                    value={formData.amusementCta?.cyanText || 'CONSULTATIONS?'}
                    onChange={(e) => handleFieldChange('amusementCta', 'cyanText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Subtitle Text (White Subtitle Text)"
                  rows={2}
                  value={formData.amusementCta?.subtitle !== undefined ? formData.amusementCta.subtitle : "WE'RE READY TO GIVE ANSWERS TO YOUR QUESTIONS."}
                  onChange={(val) => handleFieldChange('amusementCta', 'subtitle', val)}
                  placeholder="Enter subtitle text..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>CTA Button Label</label>
                  <input
                    type="text"
                    value={formData.amusementCta?.buttonText || 'Get Quote Now'}
                    onChange={(e) => handleFieldChange('amusementCta', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>CTA Button Link</label>
                  <input
                    type="text"
                    value={formData.amusementCta?.buttonLink || 'https://wa.me/919157873576'}
                    onChange={(e) => handleFieldChange('amusementCta', 'buttonLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('amusementCta', formData.amusementCta || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Amusement Park CTA Banner
                </button>
              </div>
            </div>
          )}

          {/* AMUSEMENT PARK WHY CHOOSE US FORM */}
          {activeSection === 'amusementWhyUs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Amusement Park Why Choose Us Section</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>
                  Section Heading Title (Use *word* for Cyan Accent)
                </label>
                <input
                  type="text"
                  value={formData.amusementWhyUs?.title || 'Why Choose *Winera International*'}
                  onChange={(e) => handleFieldChange('amusementWhyUs', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              {/* Feature Cards Manager */}
              {(() => {
                const defaultWhyUsCards = [
                  { title: "Full Project, Not Just Equipment", desc: "We Handle Everything From Layout To Installation, So You're Not Left Coordinating Vendors." },
                  { title: "Right Attractions For Your Space", desc: "We Recommend Rides That Fit Your Land, Footfall, And Visitors Not A Catalogue Guess" },
                  { title: "One Team, Zero Confusion", desc: "Sourcing, Installation, And Service Handled By Our Own Dedicated Team" },
                  { title: "Ready To Open From Day One", desc: "Every Ride Is Tested On-Site Before Handover, So Opening Day Runs Smoothly" },
                  { title: "We Know What Keeps Visitors Coming Back", desc: "Years Of Real Projects Tell Us Which Attractions Drive Repeat Footfall" }
                ];
                const currentSec = formData.amusementWhyUs || {};
                const cardsList = Array.isArray(currentSec.cards) ? currentSec.cards : defaultWhyUsCards;

                return (
                  <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Feature Cards ({cardsList.length})</h4>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...cardsList, { title: 'New Feature Card', desc: 'Card description here.' }];
                          const updatedSec = { ...currentSec, cards: updated };
                          setFormData(prev => ({ ...prev, amusementWhyUs: updatedSec }));
                        }}
                        style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}
                      >
                        + Add Card
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {cardsList.map((card, cIdx) => (
                        <div key={cIdx} style={{ background: '#ffffff', padding: '14px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '800', fontSize: '12px', color: '#38bdf8' }}>Card #{cIdx + 1}: {card.title}</span>
                            <button
                              type="button"
                              onClick={async () => {
                                const updated = cardsList.filter((_, i) => i !== cIdx);
                                const updatedSec = { ...currentSec, cards: updated };
                                setFormData(prev => ({ ...prev, amusementWhyUs: updatedSec }));
                                await persistSectionToDatabase('amusementWhyUs', updatedSec);
                              }}
                              style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '800', fontSize: '12px' }}
                            >
                              Delete Card
                            </button>
                          </div>
                          <input
                            type="text"
                            placeholder="Title"
                            value={card.title || ''}
                            onChange={(e) => {
                              const updated = [...cardsList];
                              updated[cIdx] = { ...updated[cIdx], title: e.target.value };
                              const updatedSec = { ...currentSec, cards: updated };
                              setFormData(prev => ({ ...prev, amusementWhyUs: updatedSec }));
                            }}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                          />
                          <RichTextareaWithEditor
                            label="Card Description"
                            rows={2}
                            value={card.desc || ''}
                            onChange={(val) => {
                              const updated = [...cardsList];
                              updated[cIdx] = { ...updated[cIdx], desc: val };
                              const updatedSec = { ...currentSec, cards: updated };
                              setFormData(prev => ({ ...prev, amusementWhyUs: updatedSec }));
                            }}
                            placeholder="Card Description"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('amusementWhyUs', formData.amusementWhyUs || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Why Choose Us Section
                </button>
              </div>
            </div>
          )}
    </>
  );
}
