import React, { useState } from 'react';
import { Upload, Plus, Trash2, Edit3 } from 'lucide-react';
import RichTextareaWithEditor from '../components/RichTextareaWithEditor';
import { uploadImageFile } from '../services/api';

const vrCtaRightImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345690/winera_uploads/r7a7hoy1dktrgee5mxhq.png";
const vrHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345690/winera_uploads/q4ikneewn9feixt3dyat.png";
const vrSupplierCollage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345693/winera_uploads/fotb8dwjs5b1tvmrbuut.png";
const vrMatchedVenueDirect = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345690/winera_uploads/g1jdvjffwyfgczzas3bu.png";
const vrCommercialReliability = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345690/winera_uploads/mwwbahj93n3edr79u56j.png";
const vrRoiFrame = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345693/winera_uploads/q1ko5z5lntd6vquthluc.png";
const vrEarnPlayer = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345690/winera_uploads/lgpdlfkmriydmxrftvc1.jpg";
const vrMobileHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345690/winera_uploads/kpty49ky7coh1q3mmylu.png";
const ctaMainBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345648/winera_uploads/ei16uczeuelaabtue4bs.jpg";

const DEFAULT_VR_CATEGORIES = [
  "All VR Games",
  "VR 9D Cinema",
  "VR Racing Simulator",
  "VR Shooting Simulator",
  "VR Flying Simulator",
  "Movie Experience",
  "VR 360 Simulator",
  "Kids' Interactive Equipment"
];

const getAdminValidImageUrl = (url, fallback) => {
  if (!url) return fallback;
  if (typeof url === 'object' && url.default) return url.default;
  if (typeof url !== 'string' || url.trim() === '') return fallback;
  if (url.includes('/src/assets/') || url.includes('vr-') || url.includes('vr')) {
    if (url.includes('vr-hero') || url.includes('vrHero')) return vrHeroBg;
    if (url.includes('vr-mobile') || url.includes('vrMobile')) return vrMobileHeroBg;
    if (url.includes('vr-supplier') || url.includes('vrSupplier')) return vrSupplierCollage;
    if (url.includes('vr-matched') || url.includes('vrMatched')) return vrMatchedVenueDirect;
    if (url.includes('vr-commercial') || url.includes('vrReliability')) return vrCommercialReliability;
    if (url.includes('vr-roi') || url.includes('vrRoi')) return vrRoiFrame;
    if (url.includes('vr-player') || url.includes('vrEarn')) return vrEarnPlayer;
    if (url.includes('vr-cta') || url.includes('vrCta')) return vrCtaRightImg;
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

export default function VrDashboard({
  activeSection,
  formData = {},
  setFormData,
  handleFieldChange,
  persistSectionToDatabase,
  openModal,
  handleDeleteItem: _handleDeleteItem,
  admin,
  setStatusMsg,
  vrMasterCards = [],
  refreshContent = () => {},
  setLoadingSection = () => {}
}) {
  const [adminVrSearch, setAdminVrSearch] = useState('');
  const [adminVrFilterCat, setAdminVrFilterCat] = useState('All');
  const [adminVrPage, setAdminVrPage] = useState(1);
  const [newVrCategoryInput, setNewVrCategoryInput] = useState('');

  return (
    <>
          {/* VR GAMES HERO BANNER FORM */}
          {activeSection === 'vrHero' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>VR Games Hero Banner Settings</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Hero Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img
                    src={getAdminValidImageUrl(formData.vrHero?.bgUrl, vrHeroBg)}
                    alt="Hero Background Preview"
                    style={{ width: '120px', height: '60px', borderRadius: '10px', objectFit: 'cover', border: '1.5px solid #38bdf8' }}
                  />
                  <input
                    type="text"
                    value={formData.vrHero?.bgUrl || ''}
                    onChange={(e) => handleFieldChange('vrHero', 'bgUrl', e.target.value)}
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
                    <Upload style={{ width: '16px', height: '16px' }} /> Choose Hero Background Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading VR hero background...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.vrHero || {}), bgUrl: res.url };
                          setFormData(prev => ({ ...prev, vrHero: updated }));
                          await persistSectionToDatabase('vrHero', updated);
                          setStatusMsg('Image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {formData.vrHero?.bgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('vrHero', 'bgUrl', '')}
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
                  value={formData.vrHero?.bgAlt || ''}
                  onChange={(e) => handleFieldChange('vrHero', 'bgAlt', e.target.value)}
                  placeholder="e.g. Virtual Reality VR Games and Simulators - Winera"
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
                    src={getAdminValidImageUrl(formData.vrHero?.mobileBgUrl, vrMobileHeroBg)}
                    alt="Mobile Hero Bg Preview"
                    style={{ width: '120px', height: '65px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                  />
                  <input
                    type="text"
                    value={formData.vrHero?.mobileBgUrl || ''}
                    onChange={(e) => handleFieldChange('vrHero', 'mobileBgUrl', e.target.value)}
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
                          setStatusMsg('Uploading mobile VR hero banner image...');
                          try {
                            const res = await uploadImageFile(file, admin.token);
                            const updated = { ...(formData.vrHero || {}), mobileBgUrl: res.url };
                            setFormData(prev => ({ ...prev, vrHero: updated }));
                            await persistSectionToDatabase('vrHero', updated);
                            setStatusMsg('Mobile VR banner uploaded successfully!');
                          } catch (err) {
                            setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                          }
                        }
                      }}
                    />
                  </label>
                  {formData.vrHero?.mobileBgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('vrHero', 'mobileBgUrl', '')}
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
                    value={formData.vrHero?.mobileBgAlt || ''}
                    onChange={(e) => handleFieldChange('vrHero', 'mobileBgAlt', e.target.value)}
                    placeholder="e.g. Virtual Reality VR Games and Simulators Mobile Banner - Winera"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Main Hero Title (Use *word* for yellow highlight)</label>
                <input
                  type="text"
                  value={formData.vrHero?.title || '*VR* Games'}
                  onChange={(e) => handleFieldChange('vrHero', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Breadcrumb Label</label>
                <input
                  type="text"
                  value={formData.vrHero?.breadcrumbText || 'VR Games'}
                  onChange={(e) => handleFieldChange('vrHero', 'breadcrumbText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('vrHero', formData.vrHero || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Hero Banner Section
                </button>
              </div>
            </div>
          )}


          {/* VR GAMING MACHINE SUPPLIER FORM */}
          {activeSection === 'vrSupplier' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>VR Gaming Machine Supplier Section</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Left Image Graphic <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
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
                    <Upload style={{ width: '16px', height: '16px' }} /> Choose Left Image Graphic
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading VR supplier graphic...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.vrIntro || {}), mainImgUrl: res.url };
                          setFormData(prev => ({ ...prev, vrIntro: updated }));
                          await persistSectionToDatabase('vrIntro', updated);
                          setStatusMsg('Image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <img
                    src={getAdminValidImageUrl(formData.vrIntro?.mainImgUrl, vrSupplierCollage)}
                    alt="Supplier Left Image Preview"
                    style={{ width: '120px', height: '60px', borderRadius: '10px', objectFit: 'cover', border: '1.5px solid #38bdf8' }}
                  />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                    🏷️ Left Image Graphic Alt Text (SEO Keyword)
                  </label>
                  <input
                    type="text"
                    value={formData.vrIntro?.mainImgAlt || formData.vrIntro?.imgAlt || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleFieldChange('vrIntro', 'mainImgAlt', val);
                      handleFieldChange('vrIntro', 'imgAlt', val);
                    }}
                    placeholder="e.g. VR Gaming Machine Supplier in India - Winera Commercial Setup"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Section Title (Use *word* for cyan highlight & &lt;br/&gt; for linebreaks)</label>
                <input
                  type="text"
                  value={formData.vrIntro?.title || '*VR Gaming Machine*<br/>supplier in India'}
                  onChange={(e) => handleFieldChange('vrIntro', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Section Description"
                  rows={3}
                  value={formData.vrIntro?.desc !== undefined ? formData.vrIntro.desc : "India's ROI-first VR gaming supplier commercial-grade machines sourced, configured, and serviced by our own team across 50+ cities"}
                  onChange={(val) => handleFieldChange('vrIntro', 'desc', val)}
                  placeholder="Enter Section Description..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.vrIntro?.buttonText || 'Get Quote From Expert'}
                    onChange={(e) => handleFieldChange('vrIntro', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                  <input
                    type="text"
                    value={(formData.vrIntro?.buttonLink && formData.vrIntro.buttonLink.split('?')[0]) || 'https://wa.me/919157873576'}
                    onChange={(e) => {
                      const baseLink = e.target.value;
                      const msg = formData.vrIntro?.waMessage || "Hello Winera International! I want to get a quote and details for VR Gaming Machine setup. Please share details. [Ref: VR Games Page]";
                      const updatedLink = msg ? `${baseLink.split('?')[0]}?text=${encodeURIComponent(msg)}` : baseLink;
                      setFormData(prev => ({ ...prev, vrIntro: { ...(prev.vrIntro || {}), buttonLink: updatedLink } }));
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
                    if (formData.vrIntro?.waMessage !== undefined && formData.vrIntro.waMessage !== '') return formData.vrIntro.waMessage;
                    if (formData.vrIntro?.buttonLink && formData.vrIntro.buttonLink.includes('text=')) {
                      try {
                        const match = formData.vrIntro.buttonLink.match(/text=([^&]+)/);
                        if (match && match[1]) return decodeURIComponent(match[1]);
                      } catch (err) { }
                    }
                    return "Hello Winera International! I want to get a quote and details for VR Gaming Machine setup. Please share details. [Ref: VR Games Page]";
                  })()}
                  onChange={(e) => {
                    const newMsg = e.target.value;
                    const baseLink = (formData.vrIntro?.buttonLink && formData.vrIntro.buttonLink.split('?')[0]) || 'https://wa.me/919157873576';
                    const updatedLink = newMsg ? `${baseLink}?text=${encodeURIComponent(newMsg)}` : baseLink;
                    setFormData(prev => ({
                      ...prev,
                      vrIntro: {
                        ...(prev.vrIntro || {}),
                        waMessage: newMsg,
                        buttonLink: updatedLink
                      }
                    }));
                  }}
                  placeholder="e.g. Hello Winera International! I want to get a quote..."
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', lineHeight: 1.5, color: '#0f172a', fontWeight: '500' }}
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('vrIntro', formData.vrIntro || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Supplier Section
                </button>
              </div>
            </div>
          )}

          {/* COMMERCIAL VR MACHINES MATCHED VENUE FORM */}
          {activeSection === 'vrMatchedVenue' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Commercial VR Machines Matched Venue Section</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Right Image Graphic <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
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
                    <Upload style={{ width: '16px', height: '16px' }} /> Choose Right Image Graphic
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading matched venue graphic...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.vrMatchedVenue || {}), imgUrl: res.url };
                          setFormData(prev => ({ ...prev, vrMatchedVenue: updated }));
                          await persistSectionToDatabase('vrMatchedVenue', updated);
                          setStatusMsg('Image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <img
                    src={getAdminValidImageUrl(formData.vrMatchedVenue?.imgUrl, vrMatchedVenueDirect)}
                    alt="Right Image Preview"
                    style={{ width: '120px', height: '60px', borderRadius: '10px', objectFit: 'cover', border: '1.5px solid #38bdf8' }}
                  />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                    🏷️ Right Image Graphic Alt Text (SEO Keyword)
                  </label>
                  <input
                    type="text"
                    value={formData.vrMatchedVenue?.imgAlt || ''}
                    onChange={(e) => handleFieldChange('vrMatchedVenue', 'imgAlt', e.target.value)}
                    placeholder="e.g. Commercial VR Machines Matched to Your Venue - Winera"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Title (Use *word* for cyan highlight & &lt;br/&gt; for linebreaks)</label>
                <input
                  type="text"
                  value={formData.vrMatchedVenue?.title || '*Commercial VR Machines,*<br/>Matched to Your Venue'}
                  onChange={(e) => handleFieldChange('vrMatchedVenue', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Paragraph 1"
                  rows={2}
                  value={formData.vrMatchedVenue?.p1 !== undefined ? formData.vrMatchedVenue.p1 : "Winera International Pvt. Ltd. is a trusted VR gaming machine supplier in India sourcing and servicing commercial virtual reality machines end-to-end across India."}
                  onChange={(val) => handleFieldChange('vrMatchedVenue', 'p1', val)}
                  placeholder="Enter Paragraph 1..."
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Paragraph 2"
                  rows={2}
                  value={formData.vrMatchedVenue?.p2 !== undefined ? formData.vrMatchedVenue.p2 : "With over 15 years of industry expertise, we source every VR gaming machine from established global manufacturers and configure it with the right game library, payment system, and safety setup to match your venue's requirements."}
                  onChange={(val) => handleFieldChange('vrMatchedVenue', 'p2', val)}
                  placeholder="Enter Paragraph 2..."
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Paragraph 3"
                  rows={2}
                  value={formData.vrMatchedVenue?.p3 !== undefined ? formData.vrMatchedVenue.p3 : "Before delivery, each unit goes through a commercial-grade durability check — built for high-footfall environments like malls, hotels, and family entertainment centres."}
                  onChange={(val) => handleFieldChange('vrMatchedVenue', 'p3', val)}
                  placeholder="Enter Paragraph 3..."
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Paragraph 4"
                  rows={2}
                  value={formData.vrMatchedVenue?.p4 !== undefined ? formData.vrMatchedVenue.p4 : "From sourcing to installation and after-sales support, our own team manages the entire process."}
                  onChange={(val) => handleFieldChange('vrMatchedVenue', 'p4', val)}
                  placeholder="Enter Paragraph 4..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.vrMatchedVenue?.buttonText || 'Get Quote From Expert'}
                    onChange={(e) => handleFieldChange('vrMatchedVenue', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                  <input
                    type="text"
                    value={(formData.vrMatchedVenue?.buttonLink && formData.vrMatchedVenue.buttonLink.split('?')[0]) || 'https://wa.me/919157873576'}
                    onChange={(e) => {
                      const baseLink = e.target.value;
                      const msg = formData.vrMatchedVenue?.waMessage || "Hello Winera International! I want to get a quote for Commercial VR Machines matched to my venue. Please share details. [Ref: VR Games Page]";
                      const updatedLink = msg ? `${baseLink.split('?')[0]}?text=${encodeURIComponent(msg)}` : baseLink;
                      setFormData(prev => ({ ...prev, vrMatchedVenue: { ...(prev.vrMatchedVenue || {}), buttonLink: updatedLink } }));
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
                    if (formData.vrMatchedVenue?.waMessage !== undefined && formData.vrMatchedVenue.waMessage !== '') return formData.vrMatchedVenue.waMessage;
                    if (formData.vrMatchedVenue?.buttonLink && formData.vrMatchedVenue.buttonLink.includes('text=')) {
                      try {
                        const match = formData.vrMatchedVenue.buttonLink.match(/text=([^&]+)/);
                        if (match && match[1]) return decodeURIComponent(match[1]);
                      } catch (err) { }
                    }
                    return "Hello Winera International! I want to get a quote for Commercial VR Machines matched to my venue. Please share details. [Ref: VR Games Page]";
                  })()}
                  onChange={(e) => {
                    const newMsg = e.target.value;
                    const baseLink = (formData.vrMatchedVenue?.buttonLink && formData.vrMatchedVenue.buttonLink.split('?')[0]) || 'https://wa.me/919157873576';
                    const updatedLink = newMsg ? `${baseLink}?text=${encodeURIComponent(newMsg)}` : baseLink;
                    setFormData(prev => ({
                      ...prev,
                      vrMatchedVenue: {
                        ...(prev.vrMatchedVenue || {}),
                        waMessage: newMsg,
                        buttonLink: updatedLink
                      }
                    }));
                  }}
                  placeholder="e.g. Hello Winera International! I want to get a quote for VR Machines..."
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', lineHeight: 1.5, color: '#0f172a', fontWeight: '500' }}
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('vrMatchedVenue', formData.vrMatchedVenue || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Matched Venue Section
                </button>
              </div>
            </div>
          )}

          {/* VR GAME CATEGORIES & CARDS MANAGEMENT */}
          {(activeSection === 'vrCategories' || activeSection === 'vrRange') && (() => {
            const defaultVrCategories = DEFAULT_VR_CATEGORIES;
            const masterCards = vrMasterCards || [];

            const vrSource = formData.vrCategories || formData.vrRange;
            const deletedSlugs = new Set((formData?.vrCategories?.deletedSlugs || formData?.vrRange?.deletedSlugs || []).map(s => (s || '').toLowerCase().trim()));

            let categoriesList = defaultVrCategories;
            let cardsList = masterCards.filter(mc => {
              const k1 = (mc.slug || '').toLowerCase().trim();
              const k2 = (mc.name || mc.title || '').toLowerCase().trim();
              return !deletedSlugs.has(k1) && !deletedSlugs.has(k2);
            });

            if (vrSource) {
              let rawCards = null;
              if (Array.isArray(vrSource.cards) && vrSource.cards.length > 0) {
                rawCards = vrSource.cards;
              } else if (Array.isArray(vrSource) && vrSource.length > 0) {
                rawCards = vrSource;
              }

              if (rawCards) {
                const cmsMap = new Map();
                rawCards.forEach(c => {
                  const k1 = (c.slug || '').toLowerCase().trim();
                  const k2 = (c.name || c.title || '').toLowerCase().trim();
                  if (k1 && !deletedSlugs.has(k1)) cmsMap.set(k1, c);
                  if (k2 && !deletedSlugs.has(k2)) cmsMap.set(k2, c);
                });
                cardsList = cardsList.map(mc => {
                  const k1 = (mc.slug || '').toLowerCase().trim();
                  const k2 = (mc.name || mc.title || '').toLowerCase().trim();
                  const override = cmsMap.get(k1) || cmsMap.get(k2);
                  if (!override) return mc;
                  const ovGal = Array.isArray(override.gallery) ? override.gallery.filter(Boolean) : [];
                  const mcGal = Array.isArray(mc.gallery) ? mc.gallery.filter(Boolean) : [];
                  const bestGal = ovGal.length > mcGal.length ? ovGal : (mcGal.length > 0 ? mcGal : ovGal);
                  return { ...mc, ...override, gallery: bestGal };
                });
                rawCards.forEach(cc => {
                  const k1 = (cc.slug || '').toLowerCase().trim();
                  const k2 = (cc.name || cc.title || '').toLowerCase().trim();
                  if (cc.isUserCreated && !deletedSlugs.has(k1) && !deletedSlugs.has(k2) && !cardsList.some(mc => (mc.slug || mc.name || mc.title || '').toLowerCase().trim() === k1)) {
                    cardsList.unshift(cc);
                  }
                });
              }

              if (Array.isArray(vrSource.categoriesList) && vrSource.categoriesList.length > 0) {
                categoriesList = vrSource.categoriesList;
              }
            }

            const activeFilterCat = adminVrFilterCat || "All";
            const categoryFiltered = activeFilterCat === "All" || activeFilterCat === "All VR Games"
              ? cardsList
              : cardsList.filter(item => (item.category || item.tag || "").toLowerCase().includes(activeFilterCat.toLowerCase()));

            const searchFiltered = adminVrSearch.trim()
              ? categoryFiltered.filter(item => {
                const q = adminVrSearch.toLowerCase().trim();
                const name = (item.name || item.title || "").toLowerCase();
                const cat = (item.category || item.tag || "").toLowerCase();
                return name.includes(q) || cat.includes(q);
              })
              : categoryFiltered;

            const adminItemsPerPage = 24;
            const adminTotalPages = Math.max(1, Math.ceil(searchFiltered.length / adminItemsPerPage));
            const validAdminPage = Math.min(adminVrPage, adminTotalPages);
            const startAdminIdx = (validAdminPage - 1) * adminItemsPerPage;
            const filteredCards = searchFiltered.slice(startAdminIdx, startAdminIdx + adminItemsPerPage);

            const handleAddVrCategory = async () => {
              let val = (newVrCategoryInput || '').trim();
              if (!val) {
                const promptVal = window.prompt('Enter new VR category brand name:');
                if (!promptVal || !promptVal.trim()) return;
                val = promptVal.trim();
              }
              if (categoriesList.some(c => c.toLowerCase() === val.toLowerCase())) {
                alert(`Category "${val}" already exists.`);
                return;
              }
              const newCats = [...categoriesList, val];
              const updated = { categoriesList: newCats, cards: cardsList };
              setFormData(prev => ({ ...prev, vrCategories: updated, vrRange: updated }));
              await persistSectionToDatabase('vrCategories', updated);
              setStatusMsg(`Category "${val}" added successfully!`);
              setNewVrCategoryInput('');
            };

            return (
              <div className="winera-admin-card" style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '24px' }}>

                {/* Header & Add VR Product Button */}
                <div className="winera-admin-flex-header" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '14px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>VR Game Machines (Categories & Cards Manager)</h3>
                    <p style={{ fontSize: '12.5px', color: '#64748b', margin: '4px 0 0' }}>Manage brand category tabs, add new VR simulator cards, edit technical specifications & photos across all {cardsList.length} VR machines.</p>
                  </div>
                  <button
                    onClick={() => openModal('add', null, null, 'vrCategories')}
                    style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)' }}
                  >
                    <Plus style={{ width: '16px', height: '16px' }} /> Add New VR Product Card
                  </button>
                </div>

                {/* CATEGORY TABS, SEARCH & MANAGEMENT BAR */}
                <div style={{ background: '#f8fafc', padding: '18px 22px', borderRadius: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '14px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>Filter Category:</label>
                      <select
                        value={activeFilterCat}
                        onChange={(e) => {
                          setAdminVrFilterCat(e.target.value);
                          setAdminVrPage(1);
                        }}
                        style={{ padding: '8px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '700', background: '#ffffff', color: '#0284c7', maxWidth: '100%' }}
                      >
                        <option value="All">All Categories ({cardsList.length})</option>
                        {categoriesList.filter(c => c !== "All VR Games").map((cat, idx) => {
                          const count = cardsList.filter(item => (item.category || "").toLowerCase().includes(cat.toLowerCase())).length;
                          return (
                            <option key={idx} value={cat}>{cat} ({count})</option>
                          );
                        })}
                      </select>

                      {/* Search in Admin */}
                      <input
                        type="text"
                        placeholder="Search by VR game name..."
                        value={adminVrSearch}
                        onChange={(e) => {
                          setAdminVrSearch(e.target.value);
                          setAdminVrPage(1);
                        }}
                        style={{ padding: '8px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', width: '220px', maxWidth: '100%' }}
                      />
                    </div>

                    {/* Add New Category Brand */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="Type new VR brand..."
                        value={newVrCategoryInput}
                        onChange={(e) => setNewVrCategoryInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddVrCategory();
                          }
                        }}
                        style={{ padding: '8px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', width: '190px', maxWidth: '100%' }}
                      />
                      <button
                        type="button"
                        onClick={handleAddVrCategory}
                        style={{ background: '#0F172B', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '10px', fontSize: '12.5px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Plus style={{ width: '15px', height: '15px' }} /> Add Brand
                      </button>
                    </div>
                  </div>

                  {/* Category Pills List */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748b', alignSelf: 'center', marginRight: '4px' }}>Category Tabs:</span>
                    <span
                      style={{
                        background: (activeFilterCat === 'All' || activeFilterCat === 'All VR Games') ? '#38bdf8' : '#e0f2fe',
                        color: (activeFilterCat === 'All' || activeFilterCat === 'All VR Games') ? '#ffffff' : '#0284c7',
                        padding: '5px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '800',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        setAdminVrFilterCat('All');
                        setAdminVrPage(1);
                      }}
                    >
                      All ({cardsList.length})
                    </span>
                    {categoriesList.filter(c => c !== "All VR Games").map((cat, idx) => (
                      <span key={idx} style={{
                        background: activeFilterCat === cat ? '#38bdf8' : '#e0f2fe',
                        color: activeFilterCat === cat ? '#ffffff' : '#0284c7',
                        padding: '5px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '800',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer'
                      }}
                        onClick={() => {
                          setAdminVrFilterCat(cat);
                          setAdminVrPage(1);
                        }}
                      >
                        {cat}
                        {categoriesList.length > 1 && (
                          <span
                            title="Remove Category"
                            onClick={(e) => {
                              e.stopPropagation();
                              const newCats = categoriesList.filter((_, i) => i !== idx);
                              const updated = { categoriesList: newCats, cards: cardsList };
                              setFormData(prev => ({ ...prev, vrCategories: updated, vrRange: updated }));
                              persistSectionToDatabase('vrCategories', updated);
                            }}
                            style={{ cursor: 'pointer', opacity: 0.7, fontWeight: '900', marginLeft: '2px' }}
                          >
                            &times;
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3-COLUMN VISUAL CARDS GRID */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                      VR Game Cards Grid ({searchFiltered.length} Total Matching) <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Card Image: 1:1 Isolated Product</span>
                    </h4>
                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>
                      Showing {searchFiltered.length === 0 ? 0 : startAdminIdx + 1}-{Math.min(startAdminIdx + adminItemsPerPage, searchFiltered.length)} of {searchFiltered.length}
                    </span>
                  </div>

                  {filteredCards.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', background: '#f8fafc', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
                      <p style={{ margin: 0, fontWeight: '700', color: '#64748b' }}>No VR products found matching current filter or search criteria.</p>
                    </div>
                  ) : (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                      gap: '18px'
                    }}>
                      {filteredCards.map((card, idx) => {
                        const realIdx = cardsList.findIndex(c => (c.slug || c.name || c.title) === (card.slug || card.name || card.title));
                        const resolvedImg = getAdminValidImageUrl(
                          card.img || card.imageUrl,
                          '/assets/vr-game-images/bester-vr/1.png'
                        );

                        return (
                          <div
                            key={card.slug || card.name || idx}
                            style={{
                              background: '#ffffff',
                              border: '1.5px solid #e2e8f0',
                              borderRadius: '16px',
                              padding: '14px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '12px',
                              position: 'relative',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                              transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                            }}
                          >
                            {/* Card Image Thumbnail */}
                            <div style={{
                              width: '100%',
                              height: '180px',
                              borderRadius: '12px',
                              overflow: 'hidden',
                              background: '#f8fafc',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '1px solid #f1f5f9',
                              position: 'relative'
                            }}>
                              <img
                                src={resolvedImg}
                                alt={card.title || card.name}
                                style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }}
                                onError={(e) => { e.currentTarget.src = '/assets/vr-game-images/bester-vr/1.png'; }}
                              />
                              <span style={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                background: 'rgba(15, 23, 42, 0.85)',
                                color: '#38bdf8',
                                padding: '3px 8px',
                                borderRadius: '6px',
                                fontSize: '10.5px',
                                fontWeight: '800',
                                letterSpacing: '0.04em'
                              }}>
                                {card.category || card.tag || 'VR Game'}
                              </span>
                            </div>

                            {/* Card Info */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <h5 style={{
                                margin: 0,
                                fontSize: '14px',
                                fontWeight: '800',
                                color: '#0f172a',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}>
                                {card.name || card.title}
                              </h5>
                              {card.tagline && (
                                <p style={{
                                  margin: 0,
                                  fontSize: '11.5px',
                                  color: '#64748b',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}>
                                  {card.tagline}
                                </p>
                              )}
                              {/* Quick Specs Badges */}
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                                {card.players && (
                                  <span style={{ background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', padding: '2px 6px', borderRadius: '5px', fontSize: '10px', fontWeight: '800' }}>
                                    👥 {card.players}P
                                  </span>
                                )}
                                {card.voltage && (
                                  <span style={{ background: '#fef3c7', color: '#d97706', border: '1px solid #fde68a', padding: '2px 6px', borderRadius: '5px', fontSize: '10px', fontWeight: '800' }}>
                                    ⚡ {card.voltage}
                                  </span>
                                )}
                                {card.power && (
                                  <span style={{ background: '#e0f2fe', color: '#0284c7', border: '1px solid #bae6fd', padding: '2px 6px', borderRadius: '5px', fontSize: '10px', fontWeight: '800' }}>
                                    🔌 {card.power}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Actions (Edit / Delete) */}
                            <div style={{ display: 'flex', gap: '8px', paddingTop: '6px', borderTop: '1px solid #f1f5f9' }}>
                              <button
                                type="button"
                                onClick={() => openModal('edit', realIdx !== -1 ? realIdx : idx, card, 'vrCategories')}
                                style={{
                                  flex: 1,
                                  background: '#0284c7',
                                  color: '#ffffff',
                                  border: 'none',
                                  padding: '8px 12px',
                                  borderRadius: '8px',
                                  fontSize: '12px',
                                  fontWeight: '800',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '5px'
                                }}
                              >
                                <Edit3 style={{ width: '13px', height: '13px' }} /> Edit Details
                              </button>
                              <button
                                type="button"
                                onClick={async () => {
                                  const cardName = card.title || card.name || 'this VR game';
                                  if (!window.confirm(`Are you sure you want to permanently delete '${cardName}'?`)) return;

                                  const cardSlug = (card.slug || '').toLowerCase().trim();
                                  const cardTitleKey = (card.name || card.title || '').toLowerCase().trim();
                                  const currentDeleted = Array.isArray(formData?.vrCategories?.deletedSlugs)
                                    ? formData.vrCategories.deletedSlugs
                                    : (Array.isArray(formData?.vrRange?.deletedSlugs) ? formData.vrRange.deletedSlugs : []);
                                  const newDeleted = Array.from(new Set([...currentDeleted, cardSlug, cardTitleKey].filter(Boolean)));

                                  const updatedCards = cardsList.filter((_, i) => i !== (realIdx !== -1 ? realIdx : idx));
                                  const updated = {
                                    categoriesList,
                                    cards: updatedCards,
                                    deletedSlugs: newDeleted
                                  };

                                  setFormData(prev => ({ ...prev, vrCategories: updated, vrRange: updated }));
                                  setLoadingSection('vrCategories');
                                  try {
                                    await persistSectionToDatabase('vrCategories', updated);
                                    await refreshContent();
                                    setStatusMsg(`VR Product '${cardName}' deleted successfully!`);
                                  } catch (delErr) {
                                    setStatusMsg('Delete Error: ' + (delErr.response?.data?.message || delErr.message));
                                  } finally {
                                    setLoadingSection('');
                                  }
                                }}
                                style={{
                                  background: '#fee2e2',
                                  color: '#ef4444',
                                  border: 'none',
                                  padding: '8px 10px',
                                  borderRadius: '8px',
                                  fontSize: '12px',
                                  fontWeight: '800',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                title="Delete Product"
                              >
                                <Trash2 style={{ width: '13px', height: '13px' }} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* PAGINATION CONTROLS */}
                  {adminTotalPages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        disabled={validAdminPage <= 1}
                        onClick={() => setAdminVrPage(p => Math.max(1, p - 1))}
                        style={{
                          background: validAdminPage <= 1 ? '#f1f5f9' : '#0F172B',
                          color: validAdminPage <= 1 ? '#94a3b8' : '#ffffff',
                          border: 'none',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '800',
                          cursor: validAdminPage <= 1 ? 'not-allowed' : 'pointer'
                        }}
                      >
                        Previous
                      </button>

                      {Array.from({ length: adminTotalPages }, (_, i) => i + 1)
                        .filter(pageNum => pageNum === 1 || pageNum === adminTotalPages || Math.abs(pageNum - validAdminPage) <= 2)
                        .map((pageNum, pIdx, arr) => {
                          const prevPage = arr[pIdx - 1];
                          const showEllipsis = prevPage && pageNum - prevPage > 1;
                          return (
                            <React.Fragment key={pageNum}>
                              {showEllipsis && <span style={{ color: '#94a3b8', fontSize: '12px' }}>...</span>}
                              <button
                                type="button"
                                onClick={() => setAdminVrPage(pageNum)}
                                style={{
                                  background: validAdminPage === pageNum ? '#38bdf8' : '#f1f5f9',
                                  color: validAdminPage === pageNum ? '#ffffff' : '#0f172a',
                                  border: 'none',
                                  padding: '6px 12px',
                                  borderRadius: '8px',
                                  fontSize: '12px',
                                  fontWeight: '800',
                                  cursor: 'pointer'
                                }}
                              >
                                {pageNum}
                              </button>
                            </React.Fragment>
                          );
                        })}

                      <button
                        type="button"
                        disabled={validAdminPage >= adminTotalPages}
                        onClick={() => setAdminVrPage(p => Math.min(adminTotalPages, p + 1))}
                        style={{
                          background: validAdminPage >= adminTotalPages ? '#f1f5f9' : '#0F172B',
                          color: validAdminPage >= adminTotalPages ? '#94a3b8' : '#ffffff',
                          border: 'none',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '800',
                          cursor: validAdminPage >= adminTotalPages ? 'not-allowed' : 'pointer'
                        }}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* COMMERCIAL-GRADE QUALITY AND RELIABILITY FORM */}
          {activeSection === 'vrReliability' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Commercial-Grade Quality & Reliability Section</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue.</p>
                <input
                  type="text"
                  value={formData.vrReliability?.title || '*Commercial-Grade Quality*<br/>and Reliability'}
                  onChange={(e) => handleFieldChange('vrReliability', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Right Column Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
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
                    <Upload style={{ width: '16px', height: '16px' }} /> Choose Right Column Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading reliability graphic...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.vrReliability || {}), imgUrl: res.url };
                          setFormData(prev => ({ ...prev, vrReliability: updated }));
                          await persistSectionToDatabase('vrReliability', updated);
                          setStatusMsg('Image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <img
                    src={getAdminValidImageUrl(formData.vrReliability?.imgUrl, vrCommercialReliability)}
                    alt="Reliability Image Preview"
                    style={{ width: '120px', height: '60px', borderRadius: '10px', objectFit: 'cover', border: '1.5px solid #38bdf8' }}
                  />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                    🏷️ Right Column Image Alt Text (SEO Keyword)
                  </label>
                  <input
                    type="text"
                    value={formData.vrReliability?.imgAlt || ''}
                    onChange={(e) => handleFieldChange('vrReliability', 'imgAlt', e.target.value)}
                    placeholder="e.g. Commercial-Grade Quality and Reliability - Winera VR"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Main Paragraph Description"
                  rows={3}
                  value={formData.vrReliability?.mainP !== undefined ? formData.vrReliability.mainP : "Most VR machines look impressive in a showroom. What matters for your venue is how they perform after six months of daily public use. Every unit we supply is built specifically for commercial cycling not consumer hardware repackaged for public environments. The difference shows up in your maintenance bills, not the spec sheet."}
                  onChange={(val) => handleFieldChange('vrReliability', 'mainP', val)}
                  placeholder="Enter main paragraph description..."
                />
              </div>

              {/* Feature 1 */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0284c7' }}>Feature Checkmark 1</h4>
                <input
                  type="text"
                  placeholder="Feature 1 Title"
                  value={formData.vrReliability?.f1Title || "Right Machine for Every Venue Type"}
                  onChange={(e) => handleFieldChange('vrReliability', 'f1Title', e.target.value)}
                  style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: '700' }}
                />
                <RichTextareaWithEditor
                  label="Feature 1 Description"
                  rows={2}
                  placeholder="Feature 1 Description"
                  value={formData.vrReliability?.f1Desc !== undefined ? formData.vrReliability.f1Desc : "A 5-player group ride suits a high-footfall mall. A solo seated simulator suits a hotel lobby. Getting this match wrong is the most common reason VR zones underperform. We assess your space, footfall, and visitors before recommending anything — not from a catalogue."}
                  onChange={(val) => handleFieldChange('vrReliability', 'f1Desc', val)}
                />
              </div>

              {/* Feature 2 */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0284c7' }}>Feature Checkmark 2</h4>
                <input
                  type="text"
                  placeholder="Feature 2 Title"
                  value={formData.vrReliability?.f2Title || "End-to-End Support and Service"}
                  onChange={(e) => handleFieldChange('vrReliability', 'f2Title', e.target.value)}
                  style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: '700' }}
                />
                <RichTextareaWithEditor
                  label="Feature 2 Description"
                  rows={2}
                  placeholder="Feature 2 Description"
                  value={formData.vrReliability?.f2Desc !== undefined ? formData.vrReliability.f2Desc : "The same team that recommends your machine mix sources it, installs it, and supports it after handover. No separate vendors, no subcontractors, no waiting on overseas manufacturers. When something needs attention, one call reaches the right person."}
                  onChange={(val) => handleFieldChange('vrReliability', 'f2Desc', val)}
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('vrReliability', formData.vrReliability || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Reliability Section
                </button>
              </div>
            </div>
          )}

          {/* WHAT WILL YOUR VR GAMING ZONE ACTUALLY EARN FORM */}
          {activeSection === 'vrEarn' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>What Will Your VR Gaming Zone Earn Section</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Right Graphic Image (VR Player) <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
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
                    <Upload style={{ width: '16px', height: '16px' }} /> Right Graphic Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading VR player graphic...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.vrEarn || {}), imgUrl: res.url };
                          setFormData(prev => ({ ...prev, vrEarn: updated }));
                          await persistSectionToDatabase('vrEarn', updated);
                          setStatusMsg('Image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <img
                    src={getAdminValidImageUrl(formData.vrEarn?.imgUrl, vrEarnPlayer)}
                    alt="Right Graphic Preview"
                    style={{ width: '100px', height: '55px', borderRadius: '10px', objectFit: 'cover', border: '1.5px solid #38bdf8' }}
                  />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                    🏷️ Right Graphic Image (VR Player) Alt Text (SEO Keyword)
                  </label>
                  <input
                    type="text"
                    value={formData.vrEarn?.imgAlt || ''}
                    onChange={(e) => handleFieldChange('vrEarn', 'imgAlt', e.target.value)}
                    placeholder="e.g. What Will Your VR Gaming Zone Actually Earn - Winera International"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue.</p>
                <input
                  type="text"
                  value={formData.vrEarn?.title || 'What Will Your VR Gaming<br/>*Zone Actually Earn?*'}
                  onChange={(e) => handleFieldChange('vrEarn', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Paragraph 1"
                  rows={3}
                  value={formData.vrEarn?.p1 !== undefined ? formData.vrEarn.p1 : "Most VR machine suppliers in India quote a price and leave the financial decision entirely to you. As India's ROI-First Game Zone Developer, Winera International works differently. Before confirming any order, our team prepares a complete ROI report for your specific venue covering machine cost, projected daily sessions, estimated revenue per player, maintenance costs, and break-even timeline."}
                  onChange={(val) => handleFieldChange('vrEarn', 'p1', val)}
                  placeholder="Enter Paragraph 1..."
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Paragraph 2"
                  rows={3}
                  value={formData.vrEarn?.p2 !== undefined ? formData.vrEarn.p2 : "Every figure is calculated around your venue type, footfall, and machine selection, not an industry average pulled from a brochure. Very few VR gaming suppliers in India include this as a standard part of their process. For Winera, it is where every project starts"}
                  onChange={(val) => handleFieldChange('vrEarn', 'p2', val)}
                  placeholder="Enter Paragraph 2..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.vrEarn?.buttonText || 'Get Quote From Expert'}
                    onChange={(e) => handleFieldChange('vrEarn', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                  <input
                    type="text"
                    value={(formData.vrEarn?.buttonLink && formData.vrEarn.buttonLink.split('?')[0]) || 'https://wa.me/919157873576'}
                    onChange={(e) => {
                      const baseLink = e.target.value;
                      const msg = formData.vrEarn?.waMessage || "Hello Winera International! I want to talk to an ROI Expert for VR Gaming Zone setup & commercial ROI calculation. Please share details. [Ref: VR Games Page]";
                      const updatedLink = msg ? `${baseLink.split('?')[0]}?text=${encodeURIComponent(msg)}` : baseLink;
                      setFormData(prev => ({ ...prev, vrEarn: { ...(prev.vrEarn || {}), buttonLink: updatedLink } }));
                    }}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
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
                    if (formData.vrEarn?.waMessage !== undefined && formData.vrEarn.waMessage !== '') return formData.vrEarn.waMessage;
                    if (formData.vrEarn?.buttonLink && formData.vrEarn.buttonLink.includes('text=')) {
                      try {
                        const match = formData.vrEarn.buttonLink.match(/text=([^&]+)/);
                        if (match && match[1]) return decodeURIComponent(match[1]);
                      } catch (err) { }
                    }
                    return "Hello Winera International! I want to talk to an ROI Expert for VR Gaming Zone setup & commercial ROI calculation. Please share details. [Ref: VR Games Page]";
                  })()}
                  onChange={(e) => {
                    const newMsg = e.target.value;
                    const baseLink = (formData.vrEarn?.buttonLink && formData.vrEarn.buttonLink.split('?')[0]) || 'https://wa.me/919157873576';
                    const updatedLink = newMsg ? `${baseLink}?text=${encodeURIComponent(newMsg)}` : baseLink;
                    setFormData(prev => ({
                      ...prev,
                      vrEarn: {
                        ...(prev.vrEarn || {}),
                        waMessage: newMsg,
                        buttonLink: updatedLink
                      }
                    }));
                  }}
                  placeholder="e.g. Hello Winera International! I want to talk to an ROI Expert..."
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', lineHeight: 1.5, color: '#0f172a', fontWeight: '500' }}
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('vrEarn', formData.vrEarn || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save ROI Earn Section
                </button>
              </div>
            </div>
          )}

          {/* WHY CHOOSE WINERA SECTION */}
          {activeSection === 'vrWhyUs' && (() => {
            const defaultVrWhyUsCards = [
              { title: "We Turn Down Weak Machines", desc: "If A Machine Won't Survive Heavy Public Use, We Won't Sell It To You." },
              { title: "One Supplier, Full Setup", desc: "Your Entire Machine Mix Is Sourced, Installed, And Serviced By One Team." },
              { title: "We Know The Footfall", desc: "Years Of Real Venues Tell Us What Works Where And What Doesn't." },
              { title: "Transparent Pricing", desc: "A Clear Cost Breakdown Up Front, With No Surprises Later." },
              { title: "Built Around Your Space", desc: "We Recommend Machines That Fit Your Actual Floor, Not A Catalogue." }
            ];

            const currentSec = formData.vrWhyUs || {};
            const cardsList = Array.isArray(currentSec.cardsList)
              ? currentSec.cardsList
              : defaultVrWhyUsCards;

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Why Choose Winera International Section</h3>

                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue.</p>
                  <input
                    type="text"
                    value={currentSec.title !== undefined ? currentSec.title : 'Why Choose *Winera International*'}
                    onChange={(e) => {
                      const updatedSec = { ...currentSec, title: e.target.value };
                      setFormData(prev => ({ ...prev, vrWhyUs: updatedSec }));
                    }}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>

                {/* Feature Cards List */}
                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0369a1' }}>Feature Cards ({cardsList.length} cards)</h4>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...cardsList, { title: 'New Feature Card', desc: 'Description here...' }];
                        const updatedSec = { ...currentSec, cardsList: updated };
                        setFormData(prev => ({ ...prev, vrWhyUs: updatedSec }));
                      }}
                      style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      + Add Card
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {cardsList.map((card, idx) => (
                      <div key={idx} style={{ background: '#ffffff', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <input
                            type="text"
                            placeholder="Card Title"
                            value={card.title || ''}
                            onChange={(e) => {
                              const updated = [...cardsList];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              const updatedSec = { ...currentSec, cardsList: updated };
                              setFormData(prev => ({ ...prev, vrWhyUs: updatedSec }));
                            }}
                            style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                          />
                          <RichTextareaWithEditor
                            label="Card Description"
                            rows={2}
                            placeholder="Card Description"
                            value={card.desc || ''}
                            onChange={(val) => {
                              const updated = [...cardsList];
                              updated[idx] = { ...updated[idx], desc: val };
                              const updatedSec = { ...currentSec, cardsList: updated };
                              setFormData(prev => ({ ...prev, vrWhyUs: updatedSec }));
                            }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={async () => {
                            const updated = cardsList.filter((_, i) => i !== idx);
                            const updatedSec = { ...currentSec, cardsList: updated };
                            setFormData(prev => ({ ...prev, vrWhyUs: updatedSec }));
                            await persistSectionToDatabase('vrWhyUs', updatedSec);
                          }}
                          style={{ background: '#ef4444', color: '#fff', border: 'none', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', flexShrink: 0 }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section CTA Button Controls */}
                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0369a1' }}>Call To Action (CTA) Button Settings</h4>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>CTA Button Text</label>
                      <input
                        type="text"
                        value={currentSec.ctaText || 'Get Free Consultation'}
                        onChange={(e) => {
                          const updatedSec = { ...currentSec, ctaText: e.target.value };
                          setFormData(prev => ({ ...prev, vrWhyUs: updatedSec }));
                        }}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '600' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>CTA Button Link (URL or WhatsApp)</label>
                      <input
                        type="text"
                        value={currentSec.ctaLink || 'https://wa.me/919157873576'}
                        onChange={(e) => {
                          const updatedSec = { ...currentSec, ctaLink: e.target.value };
                          setFormData(prev => ({ ...prev, vrWhyUs: updatedSec }));
                        }}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '600' }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                  <button
                    onClick={() => persistSectionToDatabase('vrWhyUs', { ...currentSec, cardsList })}
                    style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                  >
                    Save Why Choose Section
                  </button>
                </div>
              </div>
            );
          })()}

          {/* VR GAMES FAQS FORM */}
          {activeSection === 'vrFaqs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>VR Games FAQs Management</h3>
                <button
                  onClick={() => {
                    const defaultVrFaqsList = [
                      {
                        question: "What is included in a commercial VR gaming set?",
                        answer: "A complete commercial VR gaming set from Winera includes the VR machine unit, motion platform (where applicable), VR headsets, a pre-loaded and commercially licensed game library, safety barriers, installation by our own team, and post-installation support. Exact components vary by machine model — confirmed at the quote stage."
                      },
                      {
                        question: "Which businesses typically need a VR games supplier in India?",
                        answer: "Family entertainment centres, malls, amusement parks, hotels, resorts, bowling centers, and standalone gaming zones are the most common businesses that work with a VR games supplier in India."
                      },
                      {
                        question: "What is the VR gaming setup cost in India?",
                        answer: "VR gaming setup cost in India depends on the number of machines, machine category, motion system complexity, and game library size. Pricing varies significantly between a single compact platform and a multi-machine zone with group rides."
                      },
                      {
                        question: "Do VR gaming machines require a minimum ceiling height or floor space?",
                        answer: "Yes. Motion platforms and group rides typically need higher ceiling clearance than solo simulators, and floor space requirements scale with player count. Winera assesses your venue's exact dimensions before recommending machine models, since not every machine fits every space."
                      },
                      {
                        question: "How long does VR gaming machine installation take?",
                        answer: "Installation timelines depend on machine count and complexity; a single solo platform can be operational within days, while a multi-machine zone with group rides takes longer for setup and software configuration. We confirm an exact schedule at the quote stage."
                      },
                      {
                        question: "Can VR gaming machines be customised with branded content or specific game libraries?",
                        answer: "Yes. Game library selection, branding wraps, and venue-specific configuration can be tailored per machine. We confirm available customisation options for each model during the consultation."
                      },
                      {
                        question: "What happens if a VR machine breaks down after installation?",
                        answer: "Our own technicians handle servicing directly, with coverage across 50+ cities in India. For software issues, remote diagnostics are available for most machines. For hardware faults, our own team visits your site; you're not waiting on an overseas manufacturer or a disconnected logistics partner."
                      },
                      {
                        question: "How do I get started with a VR gaming machine order from Winera?",
                        answer: "Contact us via our website's contact form, WhatsApp, or call +91 91578 73576. Tell us your venue type, approximate floor area available, and the number of machines you're considering. Our team will recommend the right machine mix, provide a complete cost breakdown, and send a quote ASAP."
                      }
                    ];
                    const currentList = Array.isArray(formData.vrFaqs) && formData.vrFaqs.length > 0
                      ? formData.vrFaqs
                      : defaultVrFaqsList;
                    const updated = [...currentList, { question: '', answer: '' }];
                    setFormData((prev) => ({ ...prev, vrFaqs: updated }));
                  }}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                >
                  + Add FAQ Item
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(Array.isArray(formData.vrFaqs) && formData.vrFaqs.length > 0
                  ? formData.vrFaqs
                  : [
                    {
                      question: "What is included in a commercial VR gaming set?",
                      answer: "A complete commercial VR gaming set from Winera includes the VR machine unit, motion platform (where applicable), VR headsets, a pre-loaded and commercially licensed game library, safety barriers, installation by our own team, and post-installation support. Exact components vary by machine model — confirmed at the quote stage."
                    },
                    {
                      question: "Which businesses typically need a VR games supplier in India?",
                      answer: "Family entertainment centres, malls, amusement parks, hotels, resorts, bowling centers, and standalone gaming zones are the most common businesses that work with a VR games supplier in India."
                    },
                    {
                      question: "What is the VR gaming setup cost in India?",
                      answer: "VR gaming setup cost in India depends on the number of machines, machine category, motion system complexity, and game library size. Pricing varies significantly between a single compact platform and a multi-machine zone with group rides."
                    },
                    {
                      question: "Do VR gaming machines require a minimum ceiling height or floor space?",
                      answer: "Yes. Motion platforms and group rides typically need higher ceiling clearance than solo simulators, and floor space requirements scale with player count. Winera assesses your venue's exact dimensions before recommending machine models, since not every machine fits every space."
                    },
                    {
                      question: "How long does VR gaming machine installation take?",
                      answer: "Installation timelines depend on machine count and complexity; a single solo platform can be operational within days, while a multi-machine zone with group rides takes longer for setup and software configuration. We confirm an exact schedule at the quote stage."
                    },
                    {
                      question: "Can VR gaming machines be customised with branded content or specific game libraries?",
                      answer: "Yes. Game library selection, branding wraps, and venue-specific configuration can be tailored per machine. We confirm available customisation options for each model during the consultation."
                    },
                    {
                      question: "What happens if a VR machine breaks down after installation?",
                      answer: "Our own technicians handle servicing directly, with coverage across 50+ cities in India. For software issues, remote diagnostics are available for most machines. For hardware faults, our own team visits your site; you're not waiting on an overseas manufacturer or a disconnected logistics partner."
                    },
                    {
                      question: "How do I get started with a VR gaming machine order from Winera?",
                      answer: "Contact us via our website's contact form, WhatsApp, or call +91 91578 73576. Tell us your venue type, approximate floor area available, and the number of machines you're considering. Our team will recommend the right machine mix, provide a complete cost breakdown, and send a quote ASAP."
                    }
                  ]
                ).map((faq, idx) => (
                  <div key={idx} style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '800', fontSize: '13px', color: '#0369a1' }}>FAQ #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={async () => {
                          const defaultVrFaqsList = [
                            {
                              question: "What is included in a commercial VR gaming set?",
                              answer: "A complete commercial VR gaming set from Winera includes the VR machine unit, motion platform (where applicable), VR headsets, a pre-loaded and commercially licensed game library, safety barriers, installation by our own team, and post-installation support. Exact components vary by machine model — confirmed at the quote stage."
                            },
                            {
                              question: "Which businesses typically need a VR games supplier in India?",
                              answer: "Family entertainment centres, malls, amusement parks, hotels, resorts, bowling centers, and standalone gaming zones are the most common businesses that work with a VR games supplier in India."
                            },
                            {
                              question: "What is the VR gaming setup cost in India?",
                              answer: "VR gaming setup cost in India depends on the number of machines, machine category, motion system complexity, and game library size. Pricing varies significantly between a single compact platform and a multi-machine zone with group rides."
                            },
                            {
                              question: "Do VR gaming machines require a minimum ceiling height or floor space?",
                              answer: "Yes. Motion platforms and group rides typically need higher ceiling clearance than solo simulators, and floor space requirements scale with player count. Winera assesses your venue's exact dimensions before recommending machine models, since not every machine fits every space."
                            },
                            {
                              question: "How long does VR gaming machine installation take?",
                              answer: "Installation timelines depend on machine count and complexity; a single solo platform can be operational within days, while a multi-machine zone with group rides takes longer for setup and software configuration. We confirm an exact schedule at the quote stage."
                            },
                            {
                              question: "Can VR gaming machines be customised with branded content or specific game libraries?",
                              answer: "Yes. Game library selection, branding wraps, and venue-specific configuration can be tailored per machine. We confirm available customisation options for each model during the consultation."
                            },
                            {
                              question: "What happens if a VR machine breaks down after installation?",
                              answer: "Our own technicians handle servicing directly, with coverage across 50+ cities in India. For software issues, remote diagnostics are available for most machines. For hardware faults, our own team visits your site; you're not waiting on an overseas manufacturer or a disconnected logistics partner."
                            },
                            {
                              question: "How do I get started with a VR gaming machine order from Winera?",
                              answer: "Contact us via our website's contact form, WhatsApp, or call +91 91578 73576. Tell us your venue type, approximate floor area available, and the number of machines you're considering. Our team will recommend the right machine mix, provide a complete cost breakdown, and send a quote ASAP."
                            }
                          ];
                          const currentList = Array.isArray(formData.vrFaqs) && formData.vrFaqs.length > 0
                            ? [...formData.vrFaqs]
                            : defaultVrFaqsList;
                          const updated = currentList.filter((_, i) => i !== idx);
                          setFormData((prev) => ({ ...prev, vrFaqs: updated }));
                          await persistSectionToDatabase('vrFaqs', updated);
                        }}
                        style={{ background: '#ef4444', color: '#fff', border: 'none', width: '28px', height: '28px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '900' }}
                      >
                        ×
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="Question"
                      value={faq.q || faq.question || ''}
                      onChange={(e) => {
                        const currentList = [...(formData.vrFaqs || [])];
                        currentList[idx] = { ...currentList[idx], q: e.target.value, question: e.target.value };
                        setFormData((prev) => ({ ...prev, vrFaqs: currentList }));
                      }}
                      style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: '700' }}
                    />

                    <RichTextareaWithEditor
                      label="Answer"
                      rows={3}
                      placeholder="Answer"
                      value={faq.a || faq.answer || ''}
                      onChange={(val) => {
                        const currentList = [...(formData.vrFaqs || [])];
                        currentList[idx] = { ...currentList[idx], a: val, answer: val };
                        setFormData((prev) => ({ ...prev, vrFaqs: currentList }));
                      }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('vrFaqs', formData.vrFaqs || [])}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save VR Games FAQs
                </button>
              </div>
            </div>
          )}
          {activeSection === 'vrCta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>VR Games CTA Banner Settings</h3>

              {/* Background Image Upload */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
                  CTA Banner Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                </h4>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img
                    src={getAdminValidImageUrl(
                      (formData.vrCta?.bgUrl && !formData.vrCta.bgUrl.includes('cta-consultations') && !formData.vrCta.bgUrl.includes('project-lastbg'))
                        ? formData.vrCta.bgUrl
                        : (formData.vrCta?.bg && !formData.vrCta.bg.includes('cta-consultations') && !formData.vrCta.bg.includes('project-lastbg') ? formData.vrCta.bg : ''),
                      ctaMainBanner
                    )}
                    alt="CTA Background Preview"
                    style={{ width: '140px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                  />
                  <input
                    type="text"
                    value={formData.vrCta?.bgUrl || formData.vrCta?.bg || ''}
                    onChange={(e) => {
                      handleFieldChange('vrCta', 'bgUrl', e.target.value);
                      handleFieldChange('vrCta', 'bg', e.target.value);
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
                          handleFieldChange('vrCta', 'bgUrl', res.url);
                          handleFieldChange('vrCta', 'bg', res.url);
                          await persistSectionToDatabase('vrCta', { ...(formData.vrCta || {}), bgUrl: res.url, bg: res.url });
                          setStatusMsg('Background image uploaded successfully!');
                        }
                      }}
                    />
                  </label>
                  {(formData.vrCta?.bgUrl || formData.vrCta?.bg) && (
                    <button
                      type="button"
                      onClick={async () => {
                        handleFieldChange('vrCta', 'bgUrl', '');
                        handleFieldChange('vrCta', 'bg', '');
                        await persistSectionToDatabase('vrCta', { ...(formData.vrCta || {}), bgUrl: '', bg: '' });
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
                    value={formData.vrCta?.bgAlt || ''}
                    onChange={(e) => handleFieldChange('vrCta', 'bgAlt', e.target.value)}
                    placeholder="e.g. Need Any Consultations for VR Game Zone Setup - Winera"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>



              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Yellow Title Text</label>
                  <input
                    type="text"
                    value={formData.vrCta?.yellowText !== undefined ? formData.vrCta.yellowText : 'NEED ANY '}
                    onChange={(e) => handleFieldChange('vrCta', 'yellowText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Cyan Title Text</label>
                  <input
                    type="text"
                    value={formData.vrCta?.cyanText !== undefined ? formData.vrCta.cyanText : 'CONSULTATIONS?'}
                    onChange={(e) => handleFieldChange('vrCta', 'cyanText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div>
                <RichTextareaWithEditor
                  label="White Subtitle Text"
                  rows={2}
                  value={formData.vrCta?.whiteText !== undefined ? formData.vrCta.whiteText : (formData.vrCta?.subtitle !== undefined ? formData.vrCta.subtitle : "WE'RE READY TO GIVE ANSWERS TO YOUR QUESTIONS.")}
                  onChange={(val) => {
                    handleFieldChange('vrCta', 'whiteText', val);
                    handleFieldChange('vrCta', 'subtitle', val);
                  }}
                  placeholder="WE'RE READY TO GIVE ANSWERS TO YOUR QUESTIONS."
                />
              </div>


              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.vrCta?.buttonText !== undefined ? formData.vrCta.buttonText : 'Talk to an ROI Expert'}
                    onChange={(e) => handleFieldChange('vrCta', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                  <input
                    type="text"
                    value={formData.vrCta?.buttonLink !== undefined ? formData.vrCta.buttonLink : 'https://wa.me/919157873576'}
                    onChange={(e) => handleFieldChange('vrCta', 'buttonLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('vrCta', formData.vrCta || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save VR Games CTA Banner
                </button>
              </div>
            </div>
          )}
    </>
  );
}
