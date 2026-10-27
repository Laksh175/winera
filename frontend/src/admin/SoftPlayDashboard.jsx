import React from 'react';
import { Plus, Trash2, Edit2, Upload } from 'lucide-react';
import RichTextareaWithEditor from '../components/RichTextareaWithEditor';
import AdminAltInput from '../components/AdminAltInput';
import { uploadImageFile } from '../services/api';

const softplayHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345683/winera_uploads/s9xcisfml3w3bzaqkoq9.png";
const softplayMobileHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345497/winera_uploads/rvdbku2mm1xbhj90hvyq.png";
const softPlayImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345683/winera_uploads/jpa5i3veqiyi3c1ppm01.png";
const softplayCastle3d = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345683/winera_uploads/vfq07wm5wsph9uhc9zqw.png";
const softplaySpecsBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345686/winera_uploads/pn5nx938tt1q2pdzpaoi.png";
const allImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345526/winera_uploads/bine7noydx0n6siekgzj.png";
const softPalyImage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345683/winera_uploads/jt4xtkkan34gtiuzmhkw.png";
const softplayCtaBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345683/winera_uploads/onngsoz46k1mgxbyi6n1.png";
const about1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345510/winera_uploads/wxqjmaw9a6bio8qwbeq4.png";
const about2 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345511/winera_uploads/tqdmbldbsagsq6pylfq0.jpg";
const about3 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345512/winera_uploads/x14hcngkdlrhsdccxigh.jpg";
const about4 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345513/winera_uploads/wvbncpu0ey7yttt9i4yc.jpg";

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

export default function SoftPlayDashboard({
  activeSection,
  formData = {},
  setFormData,
  handleFieldChange,
  persistSectionToDatabase,
  openModal,
  handleDeleteItem,
  handleBrochureUpload,
  admin,
  setStatusMsg
}) {
  return (
    <>
          {/* SOFT PLAY HERO BANNER FORM */}
          {activeSection === 'softplayHero' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Soft Play Hero Banner</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Hero Title (Use *word* for Yellow Highlight)
                </label>
                <input
                  type="text"
                  value={formData.softplayHero?.title || '*Soft* Play'}
                  onChange={(e) => handleFieldChange('softplayHero', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Breadcrumb Active Page Text
                </label>
                <input
                  type="text"
                  value={formData.softplayHero?.breadcrumbText || 'Soft Play'}
                  onChange={(e) => handleFieldChange('softplayHero', 'breadcrumbText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Custom Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img
                    src={getAdminValidImageUrl(formData.softplayHero?.bgUrl, softplayHeroBg)}
                    alt="Preview"
                    style={{ height: '65px', width: '120px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                  />
                  <input
                    type="text"
                    value={formData.softplayHero?.bgUrl || ''}
                    onChange={(e) => handleFieldChange('softplayHero', 'bgUrl', e.target.value)}
                    placeholder="Background Image URL"
                    style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', background: '#F5F5F9' }}
                  />
                  <label style={{ padding: '12px 20px', background: '#38bdf8', color: '#ffffff', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading background image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          handleFieldChange('softplayHero', 'bgUrl', res.url);
                          setStatusMsg('Background image uploaded!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                    />
                  </label>
                  {formData.softplayHero?.bgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('softplayHero', 'bgUrl', '')}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '12px 18px', borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
              </div>

              <AdminAltInput
                label="🏷️ Background Image Alt Text (SEO Keyword)"
                value={formData.softplayHero?.bgAlt || ''}
                onChange={(e) => handleFieldChange('softplayHero', 'bgAlt', e.target.value)}
                placeholder="e.g. Indoor Soft Play Area Equipment Manufacturers - Winera"
              />

              {/* Mobile Screen Hero Banner Upload & Preview */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                  Mobile Screen Hero Banner <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📱 Recommended Size: 941 × 550 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img
                    src={getAdminValidImageUrl(formData.softplayHero?.mobileBgUrl, softplayMobileHeroBg)}
                    alt="Mobile Hero Bg Preview"
                    style={{ width: '120px', height: '65px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                  />
                  <input
                    type="text"
                    value={formData.softplayHero?.mobileBgUrl || ''}
                    onChange={(e) => handleFieldChange('softplayHero', 'mobileBgUrl', e.target.value)}
                    placeholder="Mobile Background Image URL"
                    style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', background: '#F5F5F9' }}
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
                          handleFieldChange('softplayHero', 'mobileBgUrl', res.url);
                        }
                      }}
                    />
                  </label>
                  {formData.softplayHero?.mobileBgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('softplayHero', 'mobileBgUrl', '')}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '12px 18px', borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
                <AdminAltInput
                  compact
                  label="🏷️ Mobile Background Image Alt Text (SEO Keyword)"
                  value={formData.softplayHero?.mobileBgAlt || ''}
                  onChange={(e) => handleFieldChange('softplayHero', 'mobileBgAlt', e.target.value)}
                  placeholder="e.g. Indoor Soft Play Area Equipment Mobile Banner - Winera International"
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('softplayHero', formData.softplayHero || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Soft Play Hero Banner
                </button>
              </div>
            </div>
          )}

          {/* INDOOR SOFT PLAY MANUFACTURER SECTION FORM */}
          {activeSection === 'softplayIntro' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Indoor Soft Play Equipment Manufacturer Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue, and use <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>&lt;br/&gt;</code> for line breaks.</p>
                <input
                  type="text"
                  value={formData.softplayIntro?.title || '*Indoor Soft Play*<br/>Equipment Manufacturer in India'}
                  onChange={(e) => handleFieldChange('softplayIntro', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Description Paragraph"
                  rows={3}
                  value={formData.softplayIntro?.desc || "India's trusted soft play equipment manufacturer custom designed, safety certified, and installed by our own team across India."}
                  onChange={(val) => handleFieldChange('softplayIntro', 'desc', val)}
                  placeholder="Enter description paragraph..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Label Text</label>
                  <input
                    type="text"
                    value={formData.softplayIntro?.buttonText || 'Get Quote From Expert'}
                    onChange={(e) => handleFieldChange('softplayIntro', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link URL</label>
                  <input
                    type="text"
                    value={(formData.softplayIntro?.buttonLink && formData.softplayIntro.buttonLink.split('?')[0]) || 'https://wa.me/919157873576'}
                    onChange={(e) => {
                      const baseLink = e.target.value;
                      const msg = formData.softplayIntro?.waMessage || "Hello Winera International! I want to get custom design & quote for Soft Play equipment. Please share details. [Ref: Soft Play Page]";
                      const updatedLink = msg ? `${baseLink.split('?')[0]}?text=${encodeURIComponent(msg)}` : baseLink;
                      handleFieldChange('softplayIntro', 'buttonLink', updatedLink);
                    }}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ marginTop: '14px' }}>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  WhatsApp Auto Pre-filled Message (Readable Text) <span style={{ fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '6px' }}>💬 Sent when user clicks Get Quote From Expert</span>
                </label>
                <textarea
                  rows={2}
                  value={(() => {
                    if (formData.softplayIntro?.waMessage !== undefined && formData.softplayIntro?.waMessage !== '') return formData.softplayIntro.waMessage;
                    if (formData.softplayIntro?.buttonLink && formData.softplayIntro.buttonLink.includes('text=')) {
                      try {
                        const match = formData.softplayIntro.buttonLink.match(/text=([^&]+)/);
                        if (match && match[1]) return decodeURIComponent(match[1]);
                      } catch (err) { }
                    }
                    return "Hello Winera International! I want to get custom design & quote for Soft Play equipment. Please share details. [Ref: Soft Play Page]";
                  })()}
                  onChange={(e) => {
                    const newMsg = e.target.value;
                    const baseLink = (formData.softplayIntro?.buttonLink && formData.softplayIntro.buttonLink.split('?')[0]) || 'https://wa.me/919157873576';
                    const updatedLink = newMsg ? `${baseLink}?text=${encodeURIComponent(newMsg)}` : baseLink;
                    const updated = {
                      ...(formData.softplayIntro || {}),
                      waMessage: newMsg,
                      buttonLink: updatedLink
                    };
                    setFormData(prev => ({ ...prev, softplayIntro: updated }));
                  }}
                  placeholder="e.g. Hello Winera International! I want to get custom design..."
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontWeight: '500', lineHeight: 1.5 }}
                />
              </div>

              {/* Section Image Upload */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
                  Section Photo Upload <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                </h4>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img
                    src={getAdminValidImageUrl(formData.softplayIntro?.mainImgUrl || formData.softplayIntro?.imgUrl, softPlayImg)}
                    alt="Section Photo Preview"
                    style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                  />
                  <input
                    type="text"
                    value={formData.softplayIntro?.mainImgUrl || formData.softplayIntro?.imgUrl || ''}
                    onChange={(e) => handleFieldChange('softplayIntro', 'mainImgUrl', e.target.value)}
                    placeholder="Image URL"
                    style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', background: '#ffffff' }}
                  />
                  <label style={{ padding: '12px 20px', background: '#38bdf8', color: '#ffffff', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const res = await uploadImageFile(file, admin.token);
                          handleFieldChange('softplayIntro', 'mainImgUrl', res.url);
                        }
                      }}
                    />
                  </label>
                </div>
                <AdminAltInput
                  compact
                  label="🏷️ Section Photo Alt Text (SEO Keyword)"
                  value={formData.softplayIntro?.imgAlt || ''}
                  onChange={(e) => handleFieldChange('softplayIntro', 'imgAlt', e.target.value)}
                  placeholder="e.g. Indoor Soft Play Equipment Manufacturer in India - Winera"
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('softplayIntro', formData.softplayIntro || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Soft Play Intro Section
                </button>
              </div>
            </div>
          )}

          {/* SOFT PLAY EQUIPMENT MANUFACTURE SECTION FORM */}
          {activeSection === 'softplayManufacture' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Soft Play Equipment Manufacture Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue, and use <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>&lt;br/&gt;</code> for line breaks.</p>
                <input
                  type="text"
                  value={formData.softplayManufacture?.title || 'Soft Play *Equipment Manufacture*'}
                  onChange={(e) => handleFieldChange('softplayManufacture', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Paragraph 1 Description"
                  rows={4}
                  value={formData.softplayManufacture?.p1 !== undefined && formData.softplayManufacture.p1 !== '' ? formData.softplayManufacture.p1 : "At Winera International, we are one of India's leading soft play equipment manufacturers, designing and supplying custom indoor play areas for kids across malls, hotels, schools, hospitals, and family entertainment centres since 2014. As a direct soft play manufacturer in India, we ensure every project starts with a detailed 3D design and ends with a fully installed, safety-certified play zone with our own team managing every step from concept to handover."}
                  onChange={(val) => handleFieldChange('softplayManufacture', 'p1', val)}
                  placeholder="Enter Paragraph 1..."
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Paragraph 2 Description"
                  rows={4}
                  value={formData.softplayManufacture?.p2 !== undefined && formData.softplayManufacture.p2 !== '' ? formData.softplayManufacture.p2 : "Whether you are setting up a compact 500 sq ft play corner or a large-scale interactive soft play zone, we deliver indoor kids play zone equipment tailored precisely to your space, budget, and audience, not a pre-packaged, off-the-shelf solution."}
                  onChange={(val) => handleFieldChange('softplayManufacture', 'p2', val)}
                  placeholder="Enter Paragraph 2..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Watch Video Button Label</label>
                  <input
                    type="text"
                    value={formData.softplayManufacture?.btnText || 'Watch Video'}
                    onChange={(e) => handleFieldChange('softplayManufacture', 'btnText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    Watch Video URL Link <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>🎬 Video Ratio: 16:9 Landscape (YouTube / MP4)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.softplayManufacture?.videoUrl || 'https://wa.me/919157873576'}
                    onChange={(e) => handleFieldChange('softplayManufacture', 'videoUrl', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              {/* 3D Castle Image Upload */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
                  3D Castle Render Image Upload <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                </h4>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img
                    src={getAdminValidImageUrl(formData.softplayManufacture?.imgUrl, softplayCastle3d)}
                    alt="3D Castle Render Preview"
                    style={{ width: '100px', height: '60px', objectFit: 'contain', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#ffffff' }}
                  />
                  <input
                    type="text"
                    value={formData.softplayManufacture?.imgUrl || ''}
                    onChange={(e) => handleFieldChange('softplayManufacture', 'imgUrl', e.target.value)}
                    placeholder="3D Castle Image URL"
                    style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', background: '#ffffff' }}
                  />
                  <label style={{ background: '#38bdf8', color: '#fff', padding: '12px 20px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload 3D Render
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading 3D castle render...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          handleFieldChange('softplayManufacture', 'imgUrl', res.url);
                          setStatusMsg('3D Castle render uploaded!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                    />
                  </label>
                </div>
                <AdminAltInput
                  compact
                  label="🏷️ 3D Render Alt Text (SEO Keyword)"
                  value={formData.softplayManufacture?.imgAlt || ''}
                  onChange={(e) => handleFieldChange('softplayManufacture', 'imgAlt', e.target.value)}
                  placeholder="e.g. Soft Play Equipment Manufacture 3D Castle Render - Winera"
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('softplayManufacture', formData.softplayManufacture || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Soft Play Equipment Manufacture Section
                </button>
              </div>
            </div>
          )}

          {/* TECHNICAL SPECIFICATIONS SECTION FORM */}
          {activeSection === 'softplaySpecs' && (() => {
            const defaultSpecs = [
              { spec: 'Target age group', details: '2–12 years' },
              { spec: 'Minimum space required', details: '500 sq ft' },
              { spec: 'Maximum height', details: 'Customisable to your venue' },
              { spec: 'Construction', details: 'Galvanized steel frame, imported LLDPE, soft PVC cover' },
              { spec: 'Safety', details: 'Padded surfaces, rounded edges — commercial grade' },
              { spec: 'Customisation', details: 'Theme, colour, layout, activities' },
              { spec: 'Installation', details: "Pan-India by Winera's own team" },
              { spec: 'Expected lifespan', details: '10+ years with proper maintenance' }
            ];
            const currentSec = formData.softplaySpecs || {};
            const specsList = Array.isArray(currentSec.specsList) ? currentSec.specsList : defaultSpecs;

            const handleAddRow = () => {
              const updated = [...specsList, { spec: '', details: '' }];
              const updatedSec = { ...currentSec, specsList: updated };
              setFormData(prev => ({ ...prev, softplaySpecs: updatedSec }));
            };

            const handleRowChange = (index, field, value) => {
              const updated = specsList.map((row, i) => i === index ? { ...row, [field]: value } : row);
              const updatedSec = { ...currentSec, specsList: updated };
              setFormData(prev => ({ ...prev, softplaySpecs: updatedSec }));
            };

            const handleDeleteRow = async (index) => {
              const updated = specsList.filter((_, i) => i !== index);
              const updatedSec = { ...currentSec, specsList: updated };
              setFormData(prev => ({ ...prev, softplaySpecs: updatedSec }));
              await persistSectionToDatabase('softplaySpecs', updatedSec);
            };

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Technical Specifications Section</h3>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Yellow, and use <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>&lt;br/&gt;</code> for line breaks.</p>
                  <input
                    type="text"
                    value={currentSec.title !== undefined ? currentSec.title : '*Technical* Specifications'}
                    onChange={(e) => handleFieldChange('softplaySpecs', 'title', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>

                {/* Dynamic Specifications Rows Manager */}
                <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Specification Table Rows</h4>
                    <button
                      type="button"
                      onClick={handleAddRow}
                      style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Plus style={{ width: '14px', height: '14px' }} /> Add Row
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {specsList.map((sRow, rIdx) => (
                      <div key={rIdx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', alignItems: 'center', background: '#ffffff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                        <input
                          type="text"
                          placeholder="Specification Name"
                          value={sRow.spec}
                          onChange={(e) => handleRowChange(rIdx, 'spec', e.target.value)}
                          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                        />
                        <input
                          type="text"
                          placeholder="Details Value"
                          value={sRow.details}
                          onChange={(e) => handleRowChange(rIdx, 'details', e.target.value)}
                          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteRow(rIdx)}
                          style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                        >
                          <Trash2 style={{ width: '15px', height: '15px' }} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Background Banner Image Upload */}
                <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
                    Background Card Image Upload <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                  </h4>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <img
                      src={getAdminValidImageUrl(currentSec.bgUrl, softplaySpecsBg)}
                      alt="Specs Background Preview"
                      style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                    />
                    <input
                      type="text"
                      value={currentSec.bgUrl || ''}
                      onChange={(e) => handleFieldChange('softplaySpecs', 'bgUrl', e.target.value)}
                      placeholder="Background Image URL"
                      style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', background: '#ffffff' }}
                    />
                    <label style={{ padding: '12px 20px', background: '#38bdf8', color: '#ffffff', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                      <Upload style={{ width: '16px', height: '16px' }} /> Upload
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          setStatusMsg('Uploading background...');
                          try {
                            const res = await uploadImageFile(file, admin.token);
                            handleFieldChange('softplaySpecs', 'bgUrl', res.url);
                            setStatusMsg('Background uploaded!');
                          } catch (err) {
                            setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                          }
                        }}
                      />
                    </label>
                  </div>
                  <AdminAltInput
                    compact
                    label="🏷️ Background Image Alt Text (SEO Keyword)"
                    value={currentSec.bgAlt || ''}
                    onChange={(e) => handleFieldChange('softplaySpecs', 'bgAlt', e.target.value)}
                    placeholder="e.g. Technical Specifications Soft Play Equipment - Winera International"
                  />
                </div>

                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                  <button
                    onClick={() => persistSectionToDatabase('softplaySpecs', { ...currentSec, specsList })}
                    style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                  >
                    Save Technical Specifications Section
                  </button>
                </div>
              </div>
            );
          })()}

          {/* MATERIALS QUALITY SECTION FORM */}
          {activeSection === 'softplayMaterials' && (() => {
            const defaultMaterials = [
              {
                title: 'Plastic Parts',
                desc: 'Crafted from high-quality imported LLDPE (Linear Low-Density Polyethylene) anti-UV, anti-static, and impact-resistant. This material maintains its colour and structural integrity even after years of heavy commercial use.'
              },
              {
                title: 'Post Structure',
                desc: 'Constructed from national standard galvanized steel pipes providing the structural backbone that keeps every soft play structure stable, safe, and built to last for years.'
              },
              {
                title: 'Metal Components',
                desc: 'All metal parts are galvanized to resist corrosion critical for indoor environments where moisture and regular cleaning can degrade lower-grade metals quickly.'
              },
              {
                title: 'Deck, Stair & Bridge',
                desc: 'Features a robust wood core padded with high-density sponge and coated with rubber or powder finish — providing comfort underfoot and impact protection for children.'
              },
              {
                title: 'Outer Cover',
                desc: 'Finished with a soft PVC covering that is pleasant to touch, easy to clean, and provides an additional protective layer across all play surfaces.'
              }
            ];
            const currentSec = formData.softplayMaterials || {};
            const subpointsList = Array.isArray(currentSec.subpoints) ? currentSec.subpoints : defaultMaterials;

            const handleAddSubpoint = () => {
              const updated = [...subpointsList, { title: '', desc: '' }];
              const updatedSec = { ...currentSec, subpoints: updated };
              setFormData(prev => ({ ...prev, softplayMaterials: updatedSec }));
            };

            const handleSubpointChange = (index, field, value) => {
              const updated = subpointsList.map((sub, i) => i === index ? { ...sub, [field]: value } : sub);
              const updatedSec = { ...currentSec, subpoints: updated };
              setFormData(prev => ({ ...prev, softplayMaterials: updatedSec }));
            };

            const handleDeleteSubpoint = async (index) => {
              const updated = subpointsList.filter((_, i) => i !== index);
              const updatedSec = { ...currentSec, subpoints: updated };
              setFormData(prev => ({ ...prev, softplayMaterials: updatedSec }));
              await persistSectionToDatabase('softplayMaterials', updatedSec);
            };

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Materials Quality & Durability Section</h3>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue, and use <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>&lt;br/&gt;</code> for line breaks.</p>
                  <input
                    type="text"
                    value={currentSec.title !== undefined ? currentSec.title : '*Materials — Quality That Defines a* Trusted Soft Play Manufacturer'}
                    onChange={(e) => handleFieldChange('softplayMaterials', 'title', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>

                <div>
                  <RichTextareaWithEditor
                    label="Subtitle Intro Description"
                    rows={3}
                    value={currentSec.desc !== undefined ? currentSec.desc : "Every component in a Winera soft play structure is selected to perform reliably under heavy daily commercial use, not occasional play. Here is what goes into every build:"}
                    onChange={(val) => handleFieldChange('softplayMaterials', 'desc', val)}
                    placeholder="Enter subtitle intro description..."
                  />
                </div>

                {/* Photo Upload */}
                <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
                    Left Kids Play Area Photo Upload <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                  </h4>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <img
                      src={getAdminValidImageUrl(currentSec.imgUrl, allImg)}
                      alt="Materials Photo Preview"
                      style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                    />
                    <input
                      type="text"
                      value={currentSec.imgUrl || ''}
                      onChange={(e) => handleFieldChange('softplayMaterials', 'imgUrl', e.target.value)}
                      placeholder="Image URL"
                      style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', background: '#ffffff' }}
                    />
                    <label style={{ padding: '12px 20px', background: '#38bdf8', color: '#ffffff', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                      <Upload style={{ width: '16px', height: '16px' }} /> Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          setStatusMsg('Uploading photo...');
                          try {
                            const res = await uploadImageFile(file, admin.token);
                            handleFieldChange('softplayMaterials', 'imgUrl', res.url);
                            setStatusMsg('Photo uploaded!');
                          } catch (err) {
                            setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                  <AdminAltInput
                    compact
                    label="🏷️ Photo Alt Text (SEO Keyword)"
                    value={currentSec.imgAlt || ''}
                    onChange={(e) => handleFieldChange('softplayMaterials', 'imgAlt', e.target.value)}
                    placeholder="e.g. Premium Materials Exceptional Durability Soft Play - Winera"
                  />
                </div>

                {/* Subpoints Manager */}
                <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Materials Subpoints (e.g. Plastic Parts, Post Structure)</h4>
                    <button
                      type="button"
                      onClick={handleAddSubpoint}
                      style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Plus style={{ width: '14px', height: '14px' }} /> Add Subpoint
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {subpointsList.map((mSub, subIdx) => (
                      <div key={subIdx} style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', fontWeight: '800', color: '#38bdf8' }}>Material Subpoint #{subIdx + 1}</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteSubpoint(subIdx)}
                            style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '3px' }}
                          >
                            <Trash2 style={{ width: '13px', height: '13px' }} /> Remove Subpoint
                          </button>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Subpoint Title (e.g. Plastic Parts)</label>
                          <input
                            type="text"
                            placeholder="Subpoint Title (e.g. Plastic Parts)"
                            value={mSub.title}
                            onChange={(e) => handleSubpointChange(subIdx, 'title', e.target.value)}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: '700', background: '#f8fafc' }}
                          />
                        </div>
                        <div>
                          <RichTextareaWithEditor
                            label="Full Material Description"
                            rows={3}
                            placeholder="Material Description"
                            value={mSub.desc}
                            onChange={(val) => handleSubpointChange(subIdx, 'desc', val)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                  <button
                    onClick={() => persistSectionToDatabase('softplayMaterials', { ...currentSec, subpoints: subpointsList })}
                    style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                  >
                    Save Materials Quality Section
                  </button>
                </div>
              </div>
            );
          })()}

          {/* TYPES OF SOFT PLAY ZONES TIMELINE FORM */}
          {activeSection === 'softplayTypes' && (() => {
            const defaultTypes = [
              { title: 'Themed Soft Play Zones', desc: 'A Fully Designed Play Environment Built Around A Visual Theme — Jungle, Ocean, Space, Or A Custom Branded Concept Tailored To Your Venue. Every Element From Colours And Structures To Signage Works Together, Creating A Space Visitors Photograph, Share, And Return To. Ideal For Malls, Hotels, And Family Entertainment Centres Looking To Build A Recognisable, Destination-Worthy Indoor Play Area For Kids.', img: '' },
              { title: 'Toddler & Junior Play Areas', desc: 'Age-Segmented Zones Designed For Children Aged 2–5 And 6–12 Years Separately Ensure The Right Structure Height, Challenge Level, And Safety Padding For Each Group. Allows Venues Serving Mixed-Age Families To Keep Younger Toddlers Safe Without Restricting Older Children. Popular In Hospitals, Airports, And Hotel Recreation Zones Where The Play Area Must Serve A Wide Visitor Demographic.', img: '' },
              { title: 'Multi-Level Play Structures', desc: 'Vertical Installations That Use Your Full Ceiling Height — Slides, Climbing Walls, Rope Bridges, Tunnels, And Elevated Platforms Across Multiple Levels. Delivers Large Play Capacity In A Smaller Floor Footprint, Making It The Preferred Format For Venues Where Floor Space Is Limited But Ceiling Height Is Available. Commonly Installed In Malls And Standalone Soft Play Centres Across India.', img: '' },
              { title: 'Ball Pit & Sensory Zones', desc: 'Foam-Filled Ball Pits And Sensory Play Areas Built For Children Aged 2–6 Years — Fully Padded, Rounded Edges, And Commercial-Grade Foam Throughout. These Zones Generate Some Of The Highest Dwell Times Of Any Soft Play Equipment Category, Keeping Young Visitors Engaged While Parents Relax Nearby. Works Well As A Standalone Addition Or As Part Of A Larger Play Zone Setup.', img: '' }
            ];
            const currentSec = formData.softplayTypes || {};
            const typesList = Array.isArray(currentSec.typesList) ? currentSec.typesList : defaultTypes;
            const defaultZoneImgs = [about1, about2, about3, about4];

            const handleAddType = () => {
              const updated = [...typesList, { title: '', desc: '', img: '' }];
              const updatedSec = { ...currentSec, typesList: updated };
              setFormData(prev => ({ ...prev, softplayTypes: updatedSec }));
            };

            const handleTypeChange = (index, field, value) => {
              const updated = typesList.map((t, i) => i === index ? { ...t, [field]: value } : t);
              const updatedSec = { ...currentSec, typesList: updated };
              setFormData(prev => ({ ...prev, softplayTypes: updatedSec }));
            };

            const handleDeleteType = async (index) => {
              const updated = typesList.filter((_, i) => i !== index);
              const updatedSec = { ...currentSec, typesList: updated };
              setFormData(prev => ({ ...prev, softplayTypes: updatedSec }));
              await persistSectionToDatabase('softplayTypes', updatedSec);
            };

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Types of Soft Play Zones Timeline Section</h3>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue, and use <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>&lt;br/&gt;</code> for line breaks.</p>
                  <input
                    type="text"
                    value={currentSec.title !== undefined ? currentSec.title : 'Types of Soft Play Zones<br />*We Design & Install*'}
                    onChange={(e) => handleFieldChange('softplayTypes', 'title', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Brochure Button Label</label>
                    <input
                      type="text"
                      value={currentSec.buttonText !== undefined ? currentSec.buttonText : 'Download Our Brochure'}
                      onChange={(e) => handleFieldChange('softplayTypes', 'buttonText', e.target.value)}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                      Brochure PDF File / Link URL <span style={{ fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '6px' }}>📄 PDF Document</span>
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        value={(currentSec.brochureUrl && String(currentSec.brochureUrl).trim() !== '') ? currentSec.brochureUrl : '/pdf/Winera Softplay.pdf'}
                        onChange={(e) => handleFieldChange('softplayTypes', 'brochureUrl', e.target.value)}
                        placeholder="e.g. /pdf/Winera Softplay.pdf or upload PDF..."
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                      />
                      <label style={{ background: '#38bdf8', color: '#fff', padding: '12px 16px', borderRadius: '14px', fontWeight: '800', fontSize: '12.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                        <Upload style={{ width: '15px', height: '15px' }} /> Upload PDF
                        <input
                          type="file"
                          accept="application/pdf,.pdf"
                          onChange={(e) => handleBrochureUpload(e, 'softplayTypes', 'brochureUrl', { typesList })}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                    <div style={{ marginTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>
                        💡 Cloudinary Free plan limit: <strong>10 MB</strong> (Allows larger files automatically with a Cloudinary Pro plan). Compress via <a href="https://www.ilovepdf.com/compress_pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#0284c7', textDecoration: 'underline', fontWeight: '700' }}>iLovePDF</a> if needed.
                      </span>
                      {(() => {
                        const activePdf = (currentSec.brochureUrl && String(currentSec.brochureUrl).trim() !== '') ? currentSec.brochureUrl : '/pdf/Winera Softplay.pdf';
                        return activePdf && activePdf !== '#' ? (
                          <a
                            href={activePdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: '11.5px', color: '#0284c7', fontWeight: '700', textDecoration: 'underline' }}
                          >
                            📄 Test & Preview Softplay Brochure
                          </a>
                        ) : null;
                      })()}
                    </div>
                  </div>
                </div>

                {/* Types of Soft Play Zones List Manager */}
                <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                      Soft Play Zone Types (Title, Description & Image) <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Card Image: 600 × 400 px (3:2)</span>
                    </h4>
                    <button
                      type="button"
                      onClick={handleAddType}
                      style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Plus style={{ width: '14px', height: '14px' }} /> Add Zone Type
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {typesList.map((tItem, tIdx) => {
                      const cardPreviewImg = getAdminValidImageUrl(tItem.img || currentSec[`step${tIdx + 1}Img`], defaultZoneImgs[tIdx % defaultZoneImgs.length]);
                      return (
                        <div key={tIdx} style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '12px', fontWeight: '800', color: '#38bdf8' }}>Zone Type #{tIdx + 1}</span>
                            <button
                              type="button"
                              onClick={() => handleDeleteType(tIdx)}
                              style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '3px' }}
                            >
                              <Trash2 style={{ width: '13px', height: '13px' }} /> Remove Card
                            </button>
                          </div>
                          <input
                            type="text"
                            placeholder="Zone Title (e.g. Themed Soft Play Zones)"
                            value={tItem.title}
                            onChange={(e) => handleTypeChange(tIdx, 'title', e.target.value)}
                            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                          />
                          <RichTextareaWithEditor
                            label="Zone Description"
                            rows={3}
                            placeholder="Zone Description"
                            value={tItem.desc}
                            onChange={(val) => handleTypeChange(tIdx, 'desc', val)}
                          />

                          {/* Integrated Zone Card Image Upload */}
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', flexWrap: 'wrap' }}>
                            <img
                              src={cardPreviewImg}
                              alt={`Zone #${tIdx + 1} Preview`}
                              style={{ height: '40px', width: '60px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                            />
                            <input
                              type="text"
                              placeholder="Card Image URL"
                              value={tItem.img || ''}
                              onChange={(e) => handleTypeChange(tIdx, 'img', e.target.value)}
                              style={{ flex: 1, minWidth: '150px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                            />
                            <label style={{ background: '#38bdf8', color: '#fff', padding: '6px 12px', borderRadius: '6px', fontWeight: '700', fontSize: '11.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                              <Upload style={{ width: '13px', height: '13px' }} /> Upload Card Image
                              <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                  const file = e.target.files[0];
                                  if (!file) return;
                                  setStatusMsg(`Uploading image for Zone #${tIdx + 1}...`);
                                  try {
                                    const res = await uploadImageFile(file, admin.token);
                                    handleTypeChange(tIdx, 'img', res.url);
                                    setStatusMsg('Image uploaded!');
                                  } catch (err) {
                                    setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                                  }
                                }}
                                style={{ display: 'none' }}
                              />
                            </label>
                            <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                              📐 600 × 400 px
                            </span>
                          </div>
                          <AdminAltInput
                            compact
                            label="🏷️ Card Image Alt Text (SEO Keyword)"
                            placeholder="e.g. Themed Soft Play Zones - Custom Indoor Play Area Setup Winera"
                            value={tItem.imgAlt || ''}
                            onChange={(e) => handleTypeChange(tIdx, 'imgAlt', e.target.value)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                  <button
                    onClick={() => persistSectionToDatabase('softplayTypes', { ...currentSec, typesList })}
                    style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                  >
                    Save Soft Play Types Timeline Section
                  </button>
                </div>
              </div>
            );
          })()}

          {/* KNOW YOUR RETURNS & ROI SECTION FORM */}
          {activeSection === 'softplayRoi' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Know Your Returns & ROI Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue, and use <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>&lt;br/&gt;</code> for line breaks.</p>
                <input
                  type="text"
                  value={formData.softplayRoi?.title || 'Know Your Returns<br />*Before You Invest*'}
                  onChange={(e) => handleFieldChange('softplayRoi', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Paragraph 1 Description"
                  rows={3}
                  value={formData.softplayRoi?.p1 !== undefined && formData.softplayRoi.p1 !== '' ? formData.softplayRoi.p1 : "Most soft play suppliers will quote you a price and ask you to decide. Winera International works differently."}
                  onChange={(val) => handleFieldChange('softplayRoi', 'p1', val)}
                  placeholder="Enter Paragraph 1 description..."
                />
              </div>
              <div>
                <RichTextareaWithEditor
                  label="Paragraph 2 Description"
                  rows={4}
                  value={formData.softplayRoi?.p2 !== undefined && formData.softplayRoi.p2 !== '' ? formData.softplayRoi.p2 : "Before any equipment is selected, our team prepares a complete ROI report for your specific venue covering your exact soft play area cost, projected monthly footfall, estimated revenue, maintenance costs, and break-even timeline. Every number is calculated around your space, your city, and your business, not an industry average copied from a brochure."}
                  onChange={(val) => handleFieldChange('softplayRoi', 'p2', val)}
                  placeholder="Enter Paragraph 2 description..."
                />
              </div>
              <div>
                <RichTextareaWithEditor
                  label="Paragraph 3 Description"
                  rows={3}
                  value={formData.softplayRoi?.p3 !== undefined && formData.softplayRoi.p3 !== '' ? formData.softplayRoi.p3 : "No other soft play manufacturer or supplier in India currently offers this as a standard part of their process. For Winera, it is not an add-on, it is how every project starts."}
                  onChange={(val) => handleFieldChange('softplayRoi', 'p3', val)}
                  placeholder="Enter Paragraph 3 description..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Label Text</label>
                  <input
                    type="text"
                    value={formData.softplayRoi?.buttonText || 'Talk to an ROI Expert'}
                    onChange={(e) => handleFieldChange('softplayRoi', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link URL</label>
                  <input
                    type="text"
                    value={(formData.softplayRoi?.buttonLink && formData.softplayRoi.buttonLink.split('?')[0]) || 'https://wa.me/919157873576'}
                    onChange={(e) => {
                      const baseLink = e.target.value;
                      const msg = formData.softplayRoi?.waMessage || "Hello Winera International! I want to talk to an ROI Expert for Soft Play setup & commercial ROI calculation. Please share details. [Ref: Soft Play Page]";
                      const updatedLink = msg ? `${baseLink.split('?')[0]}?text=${encodeURIComponent(msg)}` : baseLink;
                      handleFieldChange('softplayRoi', 'buttonLink', updatedLink);
                    }}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ marginTop: '14px' }}>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  WhatsApp Auto Pre-filled Message (Readable Text) <span style={{ fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '6px' }}>💬 Sent when user clicks Talk to an ROI Expert</span>
                </label>
                <textarea
                  rows={2}
                  value={(() => {
                    if (formData.softplayRoi?.waMessage !== undefined && formData.softplayRoi?.waMessage !== '') return formData.softplayRoi.waMessage;
                    if (formData.softplayRoi?.buttonLink && formData.softplayRoi.buttonLink.includes('text=')) {
                      try {
                        const match = formData.softplayRoi.buttonLink.match(/text=([^&]+)/);
                        if (match && match[1]) return decodeURIComponent(match[1]);
                      } catch (err) { }
                    }
                    return "Hello Winera International! I want to talk to an ROI Expert for Soft Play setup & commercial ROI calculation. Please share details. [Ref: Soft Play Page]";
                  })()}
                  onChange={(e) => {
                    const newMsg = e.target.value;
                    const baseLink = (formData.softplayRoi?.buttonLink && formData.softplayRoi.buttonLink.split('?')[0]) || 'https://wa.me/919157873576';
                    const updatedLink = newMsg ? `${baseLink}?text=${encodeURIComponent(newMsg)}` : baseLink;
                    const updated = {
                      ...(formData.softplayRoi || {}),
                      waMessage: newMsg,
                      buttonLink: updatedLink
                    };
                    setFormData(prev => ({ ...prev, softplayRoi: updated }));
                  }}
                  placeholder="e.g. Hello Winera International! I want to talk to an ROI Expert..."
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontWeight: '500', lineHeight: 1.5 }}
                />
              </div>

              {/* Section Image Upload */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
                  Section Photo Upload <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                </h4>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img
                    src={getAdminValidImageUrl(formData.softplayRoi?.mainImgUrl || formData.softplayRoi?.imgUrl || formData.softplayRoi?.topImgUrl, softPalyImage)}
                    alt="Section Photo Preview"
                    style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                  />
                  <input
                    type="text"
                    value={formData.softplayRoi?.imgUrl || formData.softplayRoi?.topImgUrl || ''}
                    onChange={(e) => handleFieldChange('softplayRoi', 'imgUrl', e.target.value)}
                    placeholder="Image URL"
                    style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', background: '#ffffff' }}
                  />
                  <label style={{ padding: '12px 20px', background: '#38bdf8', color: '#ffffff', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const res = await uploadImageFile(file, admin.token);
                          handleFieldChange('softplayRoi', 'imgUrl', res.url);
                        }
                      }}
                    />
                  </label>
                </div>
                <AdminAltInput
                  compact
                  label="🏷️ ROI Image Alt Text (SEO Keyword)"
                  value={formData.softplayRoi?.mainImgAlt || formData.softplayRoi?.imgAlt || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    const updated = { ...(formData.softplayRoi || {}), mainImgAlt: val, imgAlt: val };
                    setFormData(prev => ({ ...prev, softplayRoi: updated }));
                  }}
                  placeholder="e.g. Know Your Returns ROI Report - Winera Soft Play Setup"
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('softplayRoi', formData.softplayRoi || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Soft Play ROI Section
                </button>
              </div>
            </div>
          )}

          {/* WHY CHOOSE WINERA SECTION FORM */}
          {activeSection === 'softplayWhyUs' && (() => {
            const defaultCards = [
              { title: 'Expertise', desc: 'Building Commercial Soft Play Zones Since 2014, Made To Survive Heavy Daily Use.', iconUrl: '' },
              { title: 'Customized Solutions', desc: 'Every Project Starts With A Custom 3D Design, Never An Off-The-Shelf Kit.', iconUrl: '' },
              { title: 'Proven Track Record', desc: 'Trusted By Malls, Hotels, And Schools Across 50+ Cities In India.', iconUrl: '' },
              { title: 'Competitive Pricing', desc: 'Factory-Direct Pricing With No Distributor Markup, Plus A Free ROI Report.', iconUrl: '' },
              { title: 'Single Point Of Contact', desc: 'One Team From 3D Design To Installation With No Third-Party Contractors.', iconUrl: '' }
            ];
            const currentSec = formData.softplayWhyUs || {};
            const cardsList = Array.isArray(currentSec.cardsList) ? currentSec.cardsList : defaultCards;

            const handleAddCard = () => {
              const updated = [...cardsList, { title: '', desc: '', iconUrl: '' }];
              const updatedSec = { ...currentSec, cardsList: updated };
              setFormData(prev => ({ ...prev, softplayWhyUs: updatedSec }));
            };

            const handleCardChange = (index, field, value) => {
              const updated = cardsList.map((c, i) => i === index ? { ...c, [field]: value } : c);
              const updatedSec = { ...currentSec, cardsList: updated };
              setFormData(prev => ({ ...prev, softplayWhyUs: updatedSec }));
            };

            const handleDeleteCard = async (index) => {
              const updated = cardsList.filter((_, i) => i !== index);
              const updatedSec = { ...currentSec, cardsList: updated };
              setFormData(prev => ({ ...prev, softplayWhyUs: updatedSec }));
              await persistSectionToDatabase('softplayWhyUs', updatedSec);
            };

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Why Choose Winera Section</h3>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue, and use <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>&lt;br/&gt;</code> for line breaks.</p>
                  <input
                    type="text"
                    value={currentSec.title !== undefined ? currentSec.title : 'Why Choose *Winera International*'}
                    onChange={(e) => handleFieldChange('softplayWhyUs', 'title', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>

                {/* Why Choose Winera Cards Manager */}
                <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Feature Cards (Title, Description & Icon)</h4>
                    <button
                      type="button"
                      onClick={handleAddCard}
                      style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Plus style={{ width: '14px', height: '14px' }} /> Add Card
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {cardsList.map((wCard, wIdx) => (
                      <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', fontWeight: '800', color: '#38bdf8' }}>Card #{wIdx + 1}</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteCard(wIdx)}
                            style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '3px' }}
                          >
                            <Trash2 style={{ width: '13px', height: '13px' }} /> Remove Card
                          </button>
                        </div>

                        <input
                          type="text"
                          placeholder="Card Title (e.g. Expertise)"
                          value={wCard.title}
                          onChange={(e) => handleCardChange(wIdx, 'title', e.target.value)}
                          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                        />

                        <RichTextareaWithEditor
                          label="Card Description"
                          rows={2}
                          placeholder="Card Description"
                          value={wCard.desc}
                          onChange={(val) => handleCardChange(wIdx, 'desc', val)}
                        />

                        {/* Custom Icon Image Upload */}
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <label style={{ background: '#38bdf8', color: '#fff', padding: '6px 12px', borderRadius: '6px', fontWeight: '700', fontSize: '11.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Upload style={{ width: '13px', height: '13px' }} /> Upload Custom Icon
                            <input
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                setStatusMsg(`Uploading icon for Card #${wIdx + 1}...`);
                                try {
                                  const res = await uploadImageFile(file, admin.token);
                                  handleCardChange(wIdx, 'iconUrl', res.url);
                                  setStatusMsg('Icon uploaded!');
                                } catch (err) {
                                  setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                                }
                              }}
                              style={{ display: 'none' }}
                            />
                          </label>
                          {wCard.iconUrl && (
                            <img src={wCard.iconUrl} alt="" style={{ height: '30px', width: '30px', objectFit: 'contain' }} />
                          )}
                          <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: '500' }}>
                            {wCard.iconUrl ? 'Custom Icon Uploaded' : 'Using default SVG icon'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                  <button
                    onClick={() => persistSectionToDatabase('softplayWhyUs', { ...currentSec, cardsList })}
                    style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                  >
                    Save Why Choose Winera Section
                  </button>
                </div>
              </div>
            );
          })()}

          {/* SOFT PLAY FAQS FORM */}
          {activeSection === 'softplayFaqs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Soft Play Page FAQs</h3>
                <button
                  onClick={() => openModal('add')}
                  style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Plus style={{ width: '16px', height: '16px' }} /> Add New Soft Play FAQ
                </button>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue.</p>
                <input
                  type="text"
                  value={formData.faqsHeader?.title || 'Frequently Asked *Questions*'}
                  onChange={(e) => handleFieldChange('faqsHeader', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Subtitle (Optional)</label>
                <input
                  type="text"
                  value={formData.faqsHeader?.subtitle || ''}
                  onChange={(e) => handleFieldChange('faqsHeader', 'subtitle', e.target.value)}
                  placeholder="e.g. Find answers to common questions about our soft play equipment..."
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(() => {
                  const defaultSoftPlayFaqs = [
                    {
                      question: "Why does Winera International stand out as the best soft play equipment manufacturer in India?",
                      answer: "Winera International manufactures every soft play structure in-house, provides a free ROI report before every project, and installs across 50+ cities through our own team, not a third-party contractor. One partner, from 3D design to after-sales support."
                    },
                    {
                      question: "How much does a soft play zone cost in India?",
                      answer: "Soft play zone cost in India depends on space size, design complexity, and materials. Winera International provides a complete cost breakdown before project confirmation. Contact our team for a customized quote based on your specific space and budget."
                    },
                    {
                      question: "What businesses should install a soft play zone?",
                      answer: "Malls, hotels, schools, hospitals, airports, family entertainment centres, and residential township projects benefit most from soft play zones, any venue that regularly attracts families with children aged 2–12 years."
                    },
                    {
                      question: "Can soft play zones be customized with themes?",
                      answer: "Yes. Winera International offers full customisation of jungle, ocean, space, and venue-branded themes with matching colours, structures, and visual elements. Every project includes a detailed 3D visual for client approval before manufacturing begins."
                    },
                    {
                      question: "What maintenance does commercial soft play equipment need?",
                      answer: "Winera soft play structures are designed for a 10+ year commercial lifespan with standard maintenance. Routine checks include: foam padding condition, PVC cover integrity, structural connection points, and slide surface smoothness — typically quarterly. Daily venue-side maintenance is limited to cleaning and a visual safety check before opening. Winera provides a maintenance schedule and inspection checklist with every installation."
                    },
                    {
                      question: "What kind of Soft Play Equipment does Winera International supply?",
                      answer: "Winera International manufactures and supplies themed play zones, toddler and junior play areas, multi-level play structures, and ball pit and sensory zones — all custom designed around your space, budget, and target age group, installed by our own team across 50+ cities in India."
                    },
                    {
                      question: "How much floor space is needed to install a soft play zone?",
                      answer: "A soft play zone can be installed in spaces starting from 500 sq ft. Our design team creates a custom layout around your exact floor dimensions, ensuring every square foot is used effectively — along with a free ROI report before confirming any project."
                    }
                  ];
                  const faqList = (Array.isArray(formData.softplayFaqs) && formData.softplayFaqs.length > 0) ? formData.softplayFaqs : defaultSoftPlayFaqs;
                  return faqList.map((faq, index) => (
                    <div key={index} style={{ background: '#F5F5F9', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>Q: {faq.q || faq.question}</h4>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>A: {faq.a || faq.answer}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => openModal('edit', index, { q: faq.q || faq.question, a: faq.a || faq.answer })}
                          style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '6px', borderRadius: '8px', cursor: 'pointer', color: '#38bdf8' }}
                        >
                          <Edit2 style={{ width: '15px', height: '15px' }} />
                        </button>
                        <button
                          onClick={() => handleDeleteItem('softplayFaqs', index)}
                          style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '6px', borderRadius: '8px', cursor: 'pointer', color: '#ef4444' }}
                        >
                          <Trash2 style={{ width: '15px', height: '15px' }} />
                        </button>
                      </div>
                    </div>
                  ));
                })()}
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={async () => {
                    await persistSectionToDatabase('softplayFaqs', formData.softplayFaqs || []);
                    if (formData.faqsHeader) {
                      await persistSectionToDatabase('faqsHeader', formData.faqsHeader);
                    }
                  }}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Soft Play FAQs
                </button>
              </div>
            </div>
          )}

          {/* SOFT PLAY CTA BANNER FORM */}
          {activeSection === 'softplayCta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Soft Play CTA Banner</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Main Title Heading Text</label>
                <input
                  type="text"
                  value={
                    formData.softplayCta?.title !== undefined
                      ? String(formData.softplayCta.title).replace(/<br\s*\/?>/gi, ' ')
                      : (formData.softplayCta?.mainTitle !== undefined ? String(formData.softplayCta.mainTitle).replace(/<br\s*\/?>/gi, ' ') : "READY TO BUILD YOUR SOFT PLAY ZONE?")
                  }
                  onChange={(e) => {
                    handleFieldChange('softplayCta', 'title', e.target.value);
                    handleFieldChange('softplayCta', 'mainTitle', e.target.value);
                  }}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Description Paragraph"
                  rows={2}
                  value={
                    formData.softplayCta?.description !== undefined
                      ? String(formData.softplayCta.description).replace(/<br\s*\/?>/gi, ' ')
                      : (formData.softplayCta?.subtitle !== undefined ? String(formData.softplayCta.subtitle).replace(/<br\s*\/?>/gi, ' ') : "Talk to India's trusted soft play manufacturer and get a setup made for your space and budget.")
                  }
                  onChange={(val) => {
                    handleFieldChange('softplayCta', 'description', val);
                    handleFieldChange('softplayCta', 'subtitle', val);
                  }}
                  placeholder="Enter description paragraph..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.softplayCta?.buttonText !== undefined ? formData.softplayCta.buttonText : "Get a Quote"}
                    onChange={(e) => handleFieldChange('softplayCta', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                  <input
                    type="text"
                    value={formData.softplayCta?.buttonLink !== undefined ? formData.softplayCta.buttonLink : "https://wa.me/919157873576"}
                    onChange={(e) => handleFieldChange('softplayCta', 'buttonLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              {/* Background Image Upload */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
                  CTA Banner Background Image Upload <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                </h4>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img
                    src={getAdminValidImageUrl(formData.softplayCta?.bgUrl || formData.softplayCta?.bg, softplayCtaBg)}
                    alt="CTA Background Preview"
                    style={{ width: '120px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                  />
                  <input
                    type="text"
                    value={formData.softplayCta?.bgUrl || formData.softplayCta?.bg || ''}
                    onChange={(e) => {
                      handleFieldChange('softplayCta', 'bgUrl', e.target.value);
                      handleFieldChange('softplayCta', 'bg', e.target.value);
                    }}
                    placeholder="Background Image URL"
                    style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', background: '#ffffff' }}
                  />
                  <label style={{ padding: '12px 20px', background: '#38bdf8', color: '#ffffff', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload BG Image
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const res = await uploadImageFile(file, admin.token);
                          handleFieldChange('softplayCta', 'bgUrl', res.url);
                          handleFieldChange('softplayCta', 'bg', res.url);
                          await persistSectionToDatabase('softplayCta', { ...(formData.softplayCta || {}), bgUrl: res.url, bg: res.url });
                          setStatusMsg('Background image uploaded successfully!');
                        }
                      }}
                    />
                  </label>
                  {(formData.softplayCta?.bgUrl || formData.softplayCta?.bg) && (
                    <button
                      type="button"
                      onClick={async () => {
                        handleFieldChange('softplayCta', 'bgUrl', '');
                        handleFieldChange('softplayCta', 'bg', '');
                        await persistSectionToDatabase('softplayCta', { ...(formData.softplayCta || {}), bgUrl: '', bg: '' });
                      }}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '12px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Remove Custom BG
                    </button>
                  )}
                </div>
                <AdminAltInput
                  compact
                  label="🏷️ Banner Image Alt Text (SEO Keyword)"
                  value={formData.softplayCta?.bgAlt || ''}
                  onChange={(e) => handleFieldChange('softplayCta', 'bgAlt', e.target.value)}
                  placeholder="e.g. Ready to Build Your Soft Play Zone - Winera"
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('softplayCta', formData.softplayCta || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Soft Play CTA Banner
                </button>
              </div>
            </div>
          )}




    </>
  );
}
