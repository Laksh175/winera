import React from 'react';
import { Plus, Trash2, Edit2, Upload } from 'lucide-react';
import RichTextareaWithEditor from '../components/RichTextareaWithEditor';
import AdminAltInput from '../components/AdminAltInput';
import { uploadImageFile } from '../services/api';

const heroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345656/winera_uploads/jszelnb45kglcliprty7.png";
const heroMobileBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345650/winera_uploads/metbo4e8giv2tctvqkdh.png";
const aboutCollage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345513/winera_uploads/gx7vudyvuoninal2tnbu.png";
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

export default function HomeDashboard({
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
      {/* 1. HERO SECTION FORM */}
      {activeSection === 'hero' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
              Hero Main Heading Title
            </label>
            <input
              type="text"
              value={formData.hero?.title !== undefined && formData.hero.title !== '' ? formData.hero.title : "Game Zone Equipment *Manufacturer* & Supplier"}
              onChange={(e) => handleFieldChange('hero', 'title', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '14px',
                border: '1.5px solid #e2e8f0',
                background: '#F5F5F9',
                fontSize: '14px',
                fontWeight: '600'
              }}
            />
          </div>

          <div>
            <RichTextareaWithEditor
              label="Hero Subtitle Paragraph"
              rows={3}
              value={formData.hero?.subtitle !== undefined && formData.hero.subtitle !== '' ? formData.hero.subtitle : "India's ROI-First Game Zone Developer from bowling alleys and trampoline parks to arcade zones and VR gaming & complete indoor amusement park setup, installed by our own team across 50+ cities."}
              onChange={(val) => handleFieldChange('hero', 'subtitle', val)}
              placeholder="Enter Hero Subtitle Paragraph..."
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
              CTA Button Text
            </label>
            <input
              type="text"
              placeholder="e.g. Plan Your Game Zone"
              value={formData.hero?.ctaPrimaryText !== undefined && formData.hero.ctaPrimaryText !== '' ? formData.hero.ctaPrimaryText : "Plan Your Game Zone"}
              onChange={(e) => handleFieldChange('hero', 'ctaPrimaryText', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '14px',
                border: '1.5px solid #e2e8f0',
                background: '#F5F5F9',
                fontSize: '14px',
                fontWeight: '600'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
              CTA Button Link / URL
            </label>
            <input
              type="text"
              placeholder="e.g. https://wa.me/919157873576 or /contact"
              value={formData.hero?.ctaPrimaryLink !== undefined && formData.hero.ctaPrimaryLink !== '' ? formData.hero.ctaPrimaryLink : "https://wa.me/919157873576"}
              onChange={(e) => handleFieldChange('hero', 'ctaPrimaryLink', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '14px',
                border: '1.5px solid #e2e8f0',
                background: '#F5F5F9',
                fontSize: '14px',
                fontWeight: '600'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
              WhatsApp Auto Pre-filled Message <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>💬 Auto Text sent on WhatsApp</span>
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Hello Winera International! I want to plan and setup a Game Zone for my space. Please share details and an ROI report. [Ref: Home Page]"
              value={formData.hero?.waMessage !== undefined && formData.hero.waMessage !== '' ? formData.hero.waMessage : "Hello Winera International! I want to plan and setup a Game Zone for my space. Please share details and an ROI report. [Ref: Home Page]"}
              onChange={(e) => handleFieldChange('hero', 'waMessage', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '14px',
                border: '1.5px solid #e2e8f0',
                background: '#F5F5F9',
                fontSize: '13.5px',
                fontWeight: '500',
                lineHeight: 1.5
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
              Hero Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 840 px</span>
            </label>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <img
                src={getAdminValidImageUrl(formData.hero?.bgUrl, heroBg)}
                alt="Hero Background Preview"
                style={{ width: '80px', height: '50px', borderRadius: '8px', objectFit: 'cover', border: '1.5px solid #38bdf8' }}
              />
              <label style={{ background: '#38bdf8', color: '#fff', padding: '10px 18px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Upload style={{ width: '16px', height: '16px' }} /> Upload Hero Background
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    if (setStatusMsg) setStatusMsg('Uploading background...');
                    try {
                      const res = await uploadImageFile(file, admin?.token);
                      handleFieldChange('hero', 'bgUrl', res.url);
                      if (setStatusMsg) setStatusMsg('Hero background uploaded!');
                    } catch (err) {
                      if (setStatusMsg) setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                    }
                  }}
                />
              </label>
              {formData.hero?.bgUrl && (
                <button
                  type="button"
                  onClick={() => handleFieldChange('hero', 'bgUrl', '')}
                  style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '8px 14px', borderRadius: '10px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}
                >
                  Reset Image
                </button>
              )}
            </div>
            <AdminAltInput
              label="🏷️ Hero Image Alt Text (SEO Keyword)"
              value={formData.hero?.bgAlt || ''}
              onChange={(e) => handleFieldChange('hero', 'bgAlt', e.target.value)}
              placeholder="e.g. Commercial Game Zone Setup & Turnkey Equipment Manufacturer - Winera"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
              Mobile Screen Hero Banner <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📱 Recommended Size: 1080 × 1685 px</span>
            </label>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <img
                src={getAdminValidImageUrl(formData.hero?.mobileBgUrl, heroMobileBg)}
                alt="Mobile Hero Background Preview"
                style={{ width: '50px', height: '78px', borderRadius: '8px', objectFit: 'cover', border: '1.5px solid #38bdf8' }}
              />
              <label style={{ background: '#38bdf8', color: '#fff', padding: '10px 18px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Upload style={{ width: '16px', height: '16px' }} /> Upload Mobile Banner
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    if (setStatusMsg) setStatusMsg('Uploading mobile background...');
                    try {
                      const res = await uploadImageFile(file, admin?.token);
                      handleFieldChange('hero', 'mobileBgUrl', res.url);
                      if (setStatusMsg) setStatusMsg('Mobile hero background uploaded!');
                    } catch (err) {
                      if (setStatusMsg) setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                    }
                  }}
                />
              </label>
              {formData.hero?.mobileBgUrl && (
                <button
                  type="button"
                  onClick={() => handleFieldChange('hero', 'mobileBgUrl', '')}
                  style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '8px 14px', borderRadius: '10px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}
                >
                  Reset Image
                </button>
              )}
            </div>
            <AdminAltInput
              label="🏷️ Mobile Hero Image Alt Text (SEO Keyword)"
              value={formData.hero?.mobileBgAlt || ''}
              onChange={(e) => handleFieldChange('hero', 'mobileBgAlt', e.target.value)}
              placeholder="e.g. Commercial Game Zone Setup Mobile Banner - Winera"
            />
          </div>

          <div style={{ textAlign: 'right', marginTop: '10px' }}>
            <button
              onClick={() => persistSectionToDatabase('hero', formData.hero || {})}
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
              Save Hero Banner
            </button>
          </div>
        </div>
      )}

      {/* 2. ABOUT WINERA SECTION FORM */}
      {activeSection === 'aboutHome' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>About Winera Section</h3>
            <p style={{ fontSize: '12.5px', color: '#64748b', margin: '3px 0 0' }}>Manage text and feature bullet list for About section on Home page.</p>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
              Section Heading Title (Use *word* for cyan highlight color)
            </label>
            <input
              type="text"
              value={formData.aboutHome?.title || "*About* Winera International"}
              onChange={(e) => handleFieldChange('aboutHome', 'title', e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
            />
          </div>

          <div>
            <RichTextareaWithEditor
              label="Section Paragraph 1"
              rows={4}
              value={formData.aboutHome?.paragraph1 || "Winera International Pvt. Ltd. is a dynamic force in the gaming and indoor amusement industry, headquartered in Surat, India. Since our establishment in 2014, we have focused exclusively on delivering project-based gaming solutions to the B2B sector nationwide. Our unwavering commitment to excellence and tailored approach sets us apart. We're dedicated to understanding our client's unique needs and providing the most suitable gaming solutions for each project."}
              onChange={(val) => handleFieldChange('aboutHome', 'paragraph1', val)}
              placeholder="Enter About Section Paragraph 1..."
            />
          </div>

          <div>
            <RichTextareaWithEditor
              label="Section Paragraph 2"
              rows={3}
              value={formData.aboutHome?.paragraph2 || "Our team calculates a complete ROI Blueprint for your space, covering projected footfall, revenue potential, and break-even timeline. At Winera International Pvt. Ltd, we've built a reputation for efficiency and reliability, making us the go-to choice for exceptional gaming experiences in the B2B sector."}
              onChange={(val) => handleFieldChange('aboutHome', 'paragraph2', val)}
              placeholder="Enter About Section Paragraph 2..."
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
              Feature Checkmark List (One item per line)
            </label>
            <textarea
              rows={7}
              value={(() => {
                const defaultAboutFeatures = [
                  "Game Zone Setup",
                  "FEC Equipment & Setup",
                  "Bowling Alley Equipment",
                  "Arcade & Amusement Equipment",
                  "Kids Entertainment Solutions",
                  "VR Gaming Equipment",
                  "Concept to Installation"
                ];
                const feats = formData.aboutHome?.features;
                if (typeof feats === 'string') {
                  return feats;
                }
                if (Array.isArray(feats) && feats.length > 0) {
                  if (feats.length === 1 && feats[0].includes('FEC Equipment')) {
                    return defaultAboutFeatures.join('\n');
                  }
                  return feats.join('\n');
                }
                return defaultAboutFeatures.join('\n');
              })()}
              onChange={(e) => {
                handleFieldChange('aboutHome', 'features', e.target.value);
              }}
              placeholder="Enter feature checkmark items (one per line)..."
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '14px',
                border: '1.5px solid #cbd5e1',
                background: '#F5F5F9',
                fontSize: '14px',
                fontWeight: '600',
                lineHeight: 1.6,
                color: '#0f172a',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                CTA Button Text
              </label>
              <input
                type="text"
                value={formData.aboutHome?.btnText || "Talk to an ROI Expert"}
                onChange={(e) => handleFieldChange('aboutHome', 'btnText', e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                CTA Button Link / URL
              </label>
              <input
                type="text"
                value={formData.aboutHome?.btnUrl || "/why-us"}
                onChange={(e) => handleFieldChange('aboutHome', 'btnUrl', e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
              />
            </div>
          </div>

          {/* About Section Side Photo */}
          <div>
            <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
              About Section Side Photo <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 520 × 480 px</span>
            </label>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <img
                src={getAdminValidImageUrl(formData.aboutHome?.rightImgUrl, aboutCollage)}
                alt="About Section Preview"
                style={{ width: '80px', height: '60px', borderRadius: '8px', objectFit: 'cover', border: '1.5px solid #38bdf8' }}
              />
              <label style={{ background: '#38bdf8', color: '#fff', padding: '10px 18px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Upload style={{ width: '16px', height: '16px' }} /> Upload About Photo
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    if (setStatusMsg) setStatusMsg('Uploading photo...');
                    try {
                      const res = await uploadImageFile(file, admin?.token);
                      handleFieldChange('aboutHome', 'rightImgUrl', res.url);
                      if (setStatusMsg) setStatusMsg('About section photo uploaded!');
                    } catch (err) {
                      if (setStatusMsg) setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                    }
                  }}
                />
              </label>
            </div>
            <AdminAltInput
              label="🏷️ About Photo Alt Text (SEO Keyword)"
              value={formData.aboutHome?.rightImgAlt || ''}
              onChange={(e) => handleFieldChange('aboutHome', 'rightImgAlt', e.target.value)}
              placeholder="e.g. About Winera International - Commercial Game Zone Developer & Turnkey Supplier"
            />
          </div>

          <div style={{ textAlign: 'right', marginTop: '10px' }}>
            <button
              onClick={() => {
                const defaultAboutFeatures = [
                  "Game Zone Setup",
                  "FEC Equipment & Setup",
                  "Bowling Alley Equipment",
                  "Arcade & Amusement Equipment",
                  "Kids Entertainment Solutions",
                  "VR Gaming Equipment",
                  "Concept to Installation"
                ];
                const currentAbout = { ...(formData.aboutHome || {}) };
                if (!currentAbout.paragraph1) {
                  currentAbout.paragraph1 = "Winera International Pvt. Ltd. is a dynamic force in the gaming and indoor amusement industry, headquartered in Surat, India. Since our establishment in 2014, we have focused exclusively on delivering project-based gaming solutions to the B2B sector nationwide. Our unwavering commitment to excellence and tailored approach sets us apart. We're dedicated to understanding our client's unique needs and providing the most suitable gaming solutions for each project.";
                }
                if (!currentAbout.paragraph2) {
                  currentAbout.paragraph2 = "Our team calculates a complete ROI Blueprint for your space, covering projected footfall, revenue potential, and break-even timeline. At Winera International Pvt. Ltd, we've built a reputation for efficiency and reliability, making us the go-to choice for exceptional gaming experiences in the B2B sector.";
                }
                if (typeof currentAbout.features === 'string') {
                  currentAbout.features = currentAbout.features
                    .split('\n')
                    .map(line => line.replace(/^[-*•]\s+/, '').trim())
                    .filter(Boolean);
                }
                if (!currentAbout.features || !Array.isArray(currentAbout.features) || currentAbout.features.length === 0) {
                  currentAbout.features = defaultAboutFeatures;
                }
                persistSectionToDatabase('aboutHome', currentAbout);
              }}
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
              Save About Section
            </button>
          </div>
        </div>
      )}

      {/* 3. OUR BEST PRODUCTS SECTION FORM */}
      {activeSection === 'productsHome' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Our Best Products Section</h3>
            <p style={{ fontSize: '12.5px', color: '#64748b', margin: '3px 0 0' }}>Manage section title and subtitle for Products on Home page.</p>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
              Section Heading Title (Use *word* for cyan highlight color)
            </label>
            <input
              type="text"
              value={formData.productsHome?.title || "Take a look At *Our Best Products*"}
              onChange={(e) => handleFieldChange('productsHome', 'title', e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
            />
          </div>

          <div>
            <RichTextareaWithEditor
              label="Section Subtitle Paragraph"
              rows={2}
              value={formData.productsHome?.subtitle || "Our Complete Game Zone Equipment & Setup Solutions"}
              onChange={(val) => handleFieldChange('productsHome', 'subtitle', val)}
              placeholder="Enter Products Subtitle..."
            />
          </div>

          {/* Cards List Manager */}
          <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0369a1' }}>Product Cards List</h4>
              <button
                onClick={async () => {
                  const defaultCards = [
                    { "id": "arcade", "title": "Arcade Game", "desc": "Discover endless fun with our innovative indoor arcade games, merging excitement and fitness seamlessly.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885830/winera_uploads/b1krydhxzvuibrbgnuuw.webp", "link": "/product/arcade-games" },
                    { "id": "vr", "title": "VR GAME", "desc": "Immersive commercial VR gaming machines delivering thrilling virtual reality experiences.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885831/winera_uploads/qn3tburs6dlxuicvosja.jpg", "link": "/product/vr-games" },
                    { "id": "ar", "title": "AR GAME", "desc": "Interactive AR gaming solutions blending technology and entertainment — sports simulators and more.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885836/winera_uploads/bzlewlk9vatvganrelqw.jpg", "link": "/product/ar-games" },
                    { "id": "bowling", "title": "Bowling Alley", "desc": "The Brunswick bowling equipment with stable mechanical capacity popular across global entertainment hubs.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885832/winera_uploads/pyhvat8io2c6uyzu7soz.webp", "link": "/product/bowling-alley" },
                    { "id": "softplay", "title": "Soft Play", "desc": "Indoor playgrounds designed specifically for children aged 3-15 years of indoor game venues.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885832/winera_uploads/cgxqcpf3yhkezpkq6rdi.webp", "link": "/product/soft-play" },
                    { "id": "trampoline", "title": "Trampoline Park", "desc": "Physical fitness and active fun combined in safe high-capacity commercial trampoline layouts.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885836/winera_uploads/fg9p4noqwygcofknhl7i.webp", "link": "/product/trampoline-park" },
                    { "id": "hypergrid", "title": "Hyper Grid", "desc": "Interactive LED floor game where players compete across pressure-sensitive glowing tiles.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885837/winera_uploads/lx7y9w1twhlcosdziwgc.jpg", "link": "/product/hypergrid" },
                    { "id": "amusement", "title": "Amusement Park", "desc": "Our amusement park rides are designed with high safety standards and exciting gameplay for all ages.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885835/winera_uploads/c8exrz7etlhipy1tvxcb.jpg", "link": "/product/amusement-park" },
                    { "id": "bumpercar", "title": "Bumper Cars", "desc": "Our bumper cars are an exhilarating blend of thrilling collisions and smooth handling.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885833/winera_uploads/uy7o5lq9mrstb8bztnev.webp", "link": "/product/bumper-car" },
                    { "id": "lasertag", "title": "Laser Tag", "desc": "Action-packed laser tag arenas designed for competitive multiplayer gaming experiences.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885837/winera_uploads/yojhbga8phmg8eavyb2f.webp", "link": "/product/laser-tag" }
                  ];
                  const cur = (Array.isArray(formData.productsHome?.cardsList) && formData.productsHome.cardsList.length > 0)
                    ? formData.productsHome.cardsList
                    : defaultCards;
                  const updatedList = [...cur, { id: `prod-${Date.now()}`, title: 'New Product', desc: 'Short description.', img: '', link: '/product/arcade-games' }];
                  const updated = { ...(formData.productsHome || {}), cardsList: updatedList };
                  setFormData(prev => ({ ...prev, productsHome: updated }));
                  await persistSectionToDatabase('productsHome', updated);
                }}
                style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
              >
                + Add Product Card
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {(() => {
                const defaultCardsList = [
                  { "id": "arcade", "title": "Arcade Game", "desc": "Discover endless fun with our innovative indoor arcade games, merging excitement and fitness seamlessly.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885830/winera_uploads/b1krydhxzvuibrbgnuuw.webp", "link": "/product/arcade-games" },
                  { "id": "vr", "title": "VR GAME", "desc": "Immersive commercial VR gaming machines delivering thrilling virtual reality experiences.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885831/winera_uploads/qn3tburs6dlxuicvosja.jpg", "link": "/product/vr-games" },
                  { "id": "ar", "title": "AR GAME", "desc": "Interactive AR gaming solutions blending technology and entertainment — sports simulators and more.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885836/winera_uploads/bzlewlk9vatvganrelqw.jpg", "link": "/product/ar-games" },
                  { "id": "bowling", "title": "Bowling Alley", "desc": "The Brunswick bowling equipment with stable mechanical capacity popular across global entertainment hubs.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885832/winera_uploads/pyhvat8io2c6uyzu7soz.webp", "link": "/product/bowling-alley" },
                  { "id": "softplay", "title": "Soft Play", "desc": "Indoor playgrounds designed specifically for children aged 3-15 years of indoor game venues.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885832/winera_uploads/cgxqcpf3yhkezpkq6rdi.webp", "link": "/product/soft-play" },
                  { "id": "trampoline", "title": "Trampoline Park", "desc": "Physical fitness and active fun combined in safe high-capacity commercial trampoline layouts.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885836/winera_uploads/fg9p4noqwygcofknhl7i.webp", "link": "/product/trampoline-park" },
                  { "id": "hypergrid", "title": "Hyper Grid", "desc": "Interactive LED floor game where players compete across pressure-sensitive glowing tiles.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885837/winera_uploads/lx7y9w1twhlcosdziwgc.jpg", "link": "/product/hypergrid" },
                  { "id": "amusement", "title": "Amusement Park", "desc": "Our amusement park rides are designed with high safety standards and exciting gameplay for all ages.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885835/winera_uploads/c8exrz7etlhipy1tvxcb.jpg", "link": "/product/amusement-park" },
                  { "id": "bumpercar", "title": "Bumper Cars", "desc": "Our bumper cars are an exhilarating blend of thrilling collisions and smooth handling.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885833/winera_uploads/uy7o5lq9mrstb8bztnev.webp", "link": "/product/bumper-car" },
                  { "id": "lasertag", "title": "Laser Tag", "desc": "Action-packed laser tag arenas designed for competitive multiplayer gaming experiences.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885837/winera_uploads/yojhbga8phmg8eavyb2f.webp", "link": "/product/laser-tag" }
                ];

                const displayCards = (Array.isArray(formData.productsHome?.cardsList) && formData.productsHome.cardsList.length > 0)
                  ? formData.productsHome.cardsList
                  : defaultCardsList;

                return displayCards.map((card, idx) => {
                  const getList = () => displayCards;

                  return (
                    <div key={card.id || `card-${idx}`} style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '800', fontSize: '13px', color: '#0284c7' }}>Card #{idx + 1} - {card.title || 'Untitled Card'}</span>
                        <button
                          onClick={async () => {
                            const list = [...getList()];
                            list.splice(idx, 1);
                            const updated = { ...(formData.productsHome || {}), cardsList: list };
                            setFormData(prev => ({ ...prev, productsHome: updated }));
                            await persistSectionToDatabase('productsHome', updated);
                          }}
                          style={{ background: '#ef4444', color: '#fff', border: 'none', width: '28px', height: '28px', borderRadius: '6px', cursor: 'pointer', fontWeight: '900' }}
                        >
                          ×
                        </button>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#475569', marginBottom: '4px' }}>Card Title</label>
                        <input
                          type="text"
                          placeholder="Card Title"
                          value={card.title || ''}
                          onChange={(e) => {
                            const list = [...getList()];
                            list[idx] = { ...list[idx], title: e.target.value };
                            handleFieldChange('productsHome', 'cardsList', list);
                          }}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                        />
                      </div>

                      <div>
                        <RichTextareaWithEditor
                          label="Short Description"
                          rows={2}
                          placeholder="Short Description"
                          value={card.desc || ''}
                          onChange={(val) => {
                            const list = [...getList()];
                            list[idx] = { ...list[idx], desc: val };
                            handleFieldChange('productsHome', 'cardsList', list);
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#475569', marginBottom: '4px' }}>Card Link (e.g. /product/arcade-games)</label>
                        <input
                          type="text"
                          placeholder="/product/arcade-games"
                          value={card.link || ''}
                          onChange={(e) => {
                            const list = [...getList()];
                            list[idx] = { ...list[idx], link: e.target.value };
                            handleFieldChange('productsHome', 'cardsList', list);
                          }}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#475569', marginBottom: '4px' }}>
                          Card Image <span style={{ fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px', fontWeight: '700', marginLeft: '6px' }}>📐 Recommended: 600 × 600 px (Square 1:1)</span>
                        </label>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          {(() => {
                            const displayImg = card.img || defaultCardsList.find(d => d.id === card.id || d.title?.toLowerCase().includes((card.title || '').toLowerCase()))?.img;
                            return displayImg ? (
                              <img
                                src={displayImg}
                                alt="Card Preview"
                                style={{ width: '80px', height: '50px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #cbd5e1' }}
                              />
                            ) : null;
                          })()}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (file) {
                                try {
                                  const res = await uploadImageFile(file, admin?.token);
                                  if (res.url) {
                                    const list = [...getList()];
                                    list[idx] = { ...list[idx], img: res.url };
                                    handleFieldChange('productsHome', 'cardsList', list);
                                  }
                                } catch (err) {
                                  console.error('Image upload failed', err);
                                }
                              }
                            }}
                            style={{ fontSize: '12px' }}
                          />
                        </div>
                        <AdminAltInput
                          label="🏷️ Image Alt Text (SEO Keyword)"
                          value={card.imgAlt || ''}
                          onChange={(e) => {
                            const list = [...getList()];
                            list[idx] = { ...list[idx], imgAlt: e.target.value };
                            handleFieldChange('productsHome', 'cardsList', list);
                          }}
                          placeholder={`e.g. ${card.title || 'Product'} Commercial Equipment - Winera`}
                          compact={true}
                        />
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>

          <div style={{ textAlign: 'right', marginTop: '10px' }}>
            <button
              onClick={() => {
                const defaultCardsList = [
                  { "id": "arcade", "title": "Arcade Game", "desc": "Discover endless fun with our innovative indoor arcade games, merging excitement and fitness seamlessly.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885830/winera_uploads/b1krydhxzvuibrbgnuuw.webp", "link": "/product/arcade-games" },
                  { "id": "vr", "title": "VR GAME", "desc": "Immersive commercial VR gaming machines delivering thrilling virtual reality experiences.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885831/winera_uploads/qn3tburs6dlxuicvosja.jpg", "link": "/product/vr-games" },
                  { "id": "ar", "title": "AR GAME", "desc": "Interactive AR gaming solutions blending technology and entertainment — sports simulators and more.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885836/winera_uploads/bzlewlk9vatvganrelqw.jpg", "link": "/product/ar-games" },
                  { "id": "bowling", "title": "Bowling Alley", "desc": "The Brunswick bowling equipment with stable mechanical capacity popular across global entertainment hubs.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885832/winera_uploads/pyhvat8io2c6uyzu7soz.webp", "link": "/product/bowling-alley" },
                  { "id": "softplay", "title": "Soft Play", "desc": "Indoor playgrounds designed specifically for children aged 3-15 years of indoor game venues.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885832/winera_uploads/cgxqcpf3yhkezpkq6rdi.webp", "link": "/product/soft-play" },
                  { "id": "trampoline", "title": "Trampoline Park", "desc": "Physical fitness and active fun combined in safe high-capacity commercial trampoline layouts.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885836/winera_uploads/fg9p4noqwygcofknhl7i.webp", "link": "/product/trampoline-park" },
                  { "id": "hypergrid", "title": "Hyper Grid", "desc": "Interactive LED floor game where players compete across pressure-sensitive glowing tiles.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885837/winera_uploads/lx7y9w1twhlcosdziwgc.jpg", "link": "/product/hypergrid" },
                  { "id": "amusement", "title": "Amusement Park", "desc": "Our amusement park rides are designed with high safety standards and exciting gameplay for all ages.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885835/winera_uploads/c8exrz7etlhipy1tvxcb.jpg", "link": "/product/amusement-park" },
                  { "id": "bumpercar", "title": "Bumper Cars", "desc": "Our bumper cars are an exhilarating blend of thrilling collisions and smooth handling.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885833/winera_uploads/uy7o5lq9mrstb8bztnev.webp", "link": "/product/bumper-car" },
                  { "id": "lasertag", "title": "Laser Tag", "desc": "Action-packed laser tag arenas designed for competitive multiplayer gaming experiences.", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885837/winera_uploads/yojhbga8phmg8eavyb2f.webp", "link": "/product/laser-tag" }
                ];
                const dataToSave = {
                  title: formData.productsHome?.title || "Take a look At *Our Best Products*",
                  subtitle: formData.productsHome?.subtitle || "Our Complete Game Zone Equipment & Setup Solutions",
                  cardsList: (Array.isArray(formData.productsHome?.cardsList) && formData.productsHome.cardsList.length > 0)
                    ? formData.productsHome.cardsList
                    : defaultCardsList
                };
                persistSectionToDatabase('productsHome', dataToSave);
              }}
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
              Save Products Section
            </button>
          </div>
        </div>
      )}

      {/* 4. YOUR PARTNER SECTION FORM */}
      {activeSection === 'partnerHome' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Your Partner Section</h3>
            <p style={{ fontSize: '12.5px', color: '#64748b', margin: '3px 0 0' }}>Manage main title, subtitle, and feature boxes for Your Partner section.</p>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
              Section Heading Title (Use *word* for cyan highlight color)
            </label>
            <input
              type="text"
              value={formData.partnerHome?.title || "*Your Partner* in Building a Profitable Game Zone"}
              onChange={(e) => handleFieldChange('partnerHome', 'title', e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
            />
          </div>

          <div>
            <RichTextareaWithEditor
              label="Section Subtitle Paragraph"
              rows={3}
              value={formData.partnerHome?.subtitle || "Discover how Winera International helps you plan, build, and launch a successful game zone from free ROI consultation to safety-certified equipment and complete installation support."}
              onChange={(val) => handleFieldChange('partnerHome', 'subtitle', val)}
              placeholder="Enter Partner Section Subtitle..."
            />
          </div>

          {/* Box 1 Inputs */}
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Feature Card 1 (ROI Consultancy)</h4>
            <div>
              <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#475569', marginBottom: '6px' }}>Card 1 Title</label>
              <input
                type="text"
                value={formData.partnerHome?.box1Title || "Free ROI Consultancy"}
                onChange={(e) => handleFieldChange('partnerHome', 'box1Title', e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '600' }}
              />
            </div>
            <div>
              <RichTextareaWithEditor
                label="Card 1 Description"
                rows={2}
                value={formData.partnerHome?.box1Desc || "Before you invest a single rupee, our team consults with you on layout, equipment mix, and budget and hands you a complete ROI report covering projected revenue, footfall, and break-even timeline."}
                onChange={(val) => handleFieldChange('partnerHome', 'box1Desc', val)}
                placeholder="Enter Card 1 Description..."
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#475569', marginBottom: '6px' }}>Card 1 Link URL (e.g. /resource/roi)</label>
              <input
                type="text"
                value={formData.partnerHome?.box1Link || "/resource/roi"}
                onChange={(e) => handleFieldChange('partnerHome', 'box1Link', e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
              />
            </div>
          </div>

          {/* Box 2 Inputs */}
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Feature Card 2 (Safety Installation)</h4>
            <div>
              <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#475569', marginBottom: '6px' }}>Card 2 Title</label>
              <input
                type="text"
                value={formData.partnerHome?.box2Title || "Safety-Certified Installation"}
                onChange={(e) => handleFieldChange('partnerHome', 'box2Title', e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '600' }}
              />
            </div>
            <div>
              <RichTextareaWithEditor
                label="Card 2 Description"
                rows={2}
                value={formData.partnerHome?.box2Desc || "Every product we install meets commercial safety standards tested for high-footfall environments, assembled by our own trained team, and handed over only after a full on-site safety inspection."}
                onChange={(val) => handleFieldChange('partnerHome', 'box2Desc', val)}
                placeholder="Enter Card 2 Description..."
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#475569', marginBottom: '6px' }}>Card 2 Link URL (e.g. /resource/safety-standards)</label>
              <input
                type="text"
                value={formData.partnerHome?.box2Link || "/resource/safety-standards"}
                onChange={(e) => handleFieldChange('partnerHome', 'box2Link', e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
              />
            </div>
          </div>

          <div style={{ textAlign: 'right', marginTop: '10px' }}>
            <button
              onClick={() => persistSectionToDatabase('partnerHome', formData.partnerHome || {})}
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
              Save Partner Section
            </button>
          </div>
        </div>
      )}

      {/* 5. INDUSTRIES WE SERVE HEADER FORM */}
      {activeSection === 'industries' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Industries We Serve Section</h3>
            <p style={{ fontSize: '12.5px', color: '#64748b', margin: '3px 0 0' }}>Manage section title and subtitle for Industries We Serve on Home page.</p>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
              Section Heading Title (Use *word* for cyan highlight color)
            </label>
            <input
              type="text"
              value={formData.industriesHeader?.title || "Industries *We Serve*"}
              onChange={(e) => handleFieldChange('industriesHeader', 'title', e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
            />
          </div>

          <div>
            <RichTextareaWithEditor
              label="Section Subtitle Paragraph"
              rows={2}
              value={formData.industriesHeader?.subtitle || "We deliver complete game zone setup solutions for businesses across India"}
              onChange={(val) => handleFieldChange('industriesHeader', 'subtitle', val)}
              placeholder="Enter Industries Subtitle..."
            />
          </div>

          {/* Industries Items Manager */}
          <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            {(() => {
              const defaultItems = [
                { "title": "Shopping Malls", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885841/winera_uploads/qrhgcb1f1ovtfcxljjhp.jpg" },
                { "title": "Hotels & Resorts", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885839/winera_uploads/dnipphbitg7auvb8tkmz.jpg" },
                { "title": "Schools & Academies", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885840/winera_uploads/l5jhtvihkadehhnkgjmc.jpg" },
                { "title": "Commercial Spaces", "img": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80" },
                { "title": "Residential Projects", "img": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80" },
                { "title": "Sports Centres", "img": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80" },
                { "title": "Entertainment Hubs", "img": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80" },
                { "title": "Airports & Terminals", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885838/winera_uploads/vlznxp5vpxt5nxrorrzw.webp" },
                { "title": "Hospitals & Clinics", "img": "https://res.cloudinary.com/achfsmlm/image/upload/v1791885839/winera_uploads/vbmyhwwywzwqzclv0a5u.jpg" },
                { "title": "Food and Beverage", "img": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80" }
              ];

              const getList = () => Array.isArray(formData.industriesHeader?.items)
                ? formData.industriesHeader.items
                : defaultItems;

              const currentItemsList = getList();

              return (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0369a1' }}>Industries List ({currentItemsList.length})</h4>
                    <button
                      type="button"
                      onClick={async () => {
                        const updated = [...currentItemsList, { title: 'New Industry', img: '' }];
                        const updatedHeader = { ...(formData.industriesHeader || {}), items: updated };
                        setFormData(prev => ({ ...prev, industriesHeader: updatedHeader }));
                        await persistSectionToDatabase('industriesHeader', updatedHeader);
                      }}
                      style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      + Add Industry
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {currentItemsList.map((item, idx) => (
                      <div key={idx} style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: '800', fontSize: '13px', color: '#0284c7' }}>Industry #{idx + 1} - {item.title}</span>
                          <button
                            type="button"
                            onClick={async () => {
                              const list = [...currentItemsList];
                              list.splice(idx, 1);
                              const updatedHeader = { ...(formData.industriesHeader || {}), items: list };
                              setFormData(prev => ({ ...prev, industriesHeader: updatedHeader }));
                              await persistSectionToDatabase('industriesHeader', updatedHeader);
                            }}
                            style={{ background: '#ef4444', color: '#fff', border: 'none', width: '28px', height: '28px', borderRadius: '6px', cursor: 'pointer', fontWeight: '900' }}
                          >
                            ×
                          </button>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#475569', marginBottom: '4px' }}>Industry Title</label>
                          <input
                            type="text"
                            placeholder="Industry Title"
                            value={item.title || ''}
                            onChange={(e) => {
                              const list = [...currentItemsList];
                              list[idx] = { ...list[idx], title: e.target.value };
                              handleFieldChange('industriesHeader', 'items', list);
                            }}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#475569', marginBottom: '4px' }}>
                            Industry Image <span style={{ fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px', fontWeight: '700', marginLeft: '6px' }}>📐 Recommended: 800 × 600 px (4:3)</span>
                          </label>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            {(() => {
                              const displayImg = item.img || defaultItems.find(d => d.title.toLowerCase() === (item.title || '').trim().toLowerCase())?.img;
                              return displayImg ? (
                                <img
                                  src={displayImg}
                                  alt="Industry Preview"
                                  style={{ width: '80px', height: '50px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #cbd5e1' }}
                                />
                              ) : null;
                            })()}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  try {
                                    const res = await uploadImageFile(file, admin?.token);
                                    if (res.url) {
                                      const list = [...currentItemsList];
                                      list[idx] = { ...list[idx], img: res.url };
                                      const updatedHeader = { ...(formData.industriesHeader || {}), items: list };
                                      setFormData(prev => ({ ...prev, industriesHeader: updatedHeader }));
                                      await persistSectionToDatabase('industriesHeader', updatedHeader);
                                    }
                                  } catch (err) {
                                    console.error('Image upload failed', err);
                                  }
                                }
                              }}
                              style={{ fontSize: '12px' }}
                            />
                          </div>
                          <AdminAltInput
                            label="🏷️ Image Alt Text (SEO Keyword)"
                            value={item.imgAlt || ''}
                            onChange={(e) => {
                              const list = [...currentItemsList];
                              list[idx] = { ...list[idx], imgAlt: e.target.value };
                              handleFieldChange('industriesHeader', 'items', list);
                            }}
                            placeholder={`e.g. ${item.title || 'Industry'} Game Zone Setup & Turnkey Solutions - Winera`}
                            compact={true}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '14px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        const dataToSave = {
                          title: formData.industriesHeader?.title || "Industries *We Serve*",
                          subtitle: formData.industriesHeader?.subtitle || "We deliver complete game zone setup solutions for businesses across India",
                          items: currentItemsList
                        };
                        persistSectionToDatabase('industriesHeader', dataToSave);
                      }}
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
                      Save Industries Header
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* 6. OUR WORKING PROCESS HEADER FORM */}
      {activeSection === 'processHome' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Our Working Process Section</h3>
            <p style={{ fontSize: '12.5px', color: '#64748b', margin: '3px 0 0' }}>Manage section title and subtitle for Our Working Process on Home page.</p>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
              Section Heading Title (Use *word* for cyan highlight color)
            </label>
            <input
              type="text"
              value={formData.processHome?.title || "*Our Working* Process"}
              onChange={(e) => handleFieldChange('processHome', 'title', e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
            />
          </div>

          <div>
            <RichTextareaWithEditor
              label="Section Subtitle Paragraph"
              rows={2}
              value={formData.processHome?.subtitle || "How We Setup Your Game Zone"}
              onChange={(val) => handleFieldChange('processHome', 'subtitle', val)}
              placeholder="Enter Working Process Subtitle..."
            />
          </div>

          {/* Working Process Dynamic Step Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {(() => {
              const defaultInitial = [
                { num: "01", title: "Free Consultation", points: ["Share your project idea and business goal", "Tell us your space size and budget", "We suggest the best game zone setup for you"] },
                { num: "02", title: "Planning & Selection", points: ["We design a complete game zone layout for your space", "Best equipment and activities selected as per your budget", "Detailed project timeline and execution plan prepared"] },
                { num: "03", title: "Production & Procurement", points: ["Order confirmed with transparent pricing", "Production process begins and Equipment sourcing", "Quality checks done at every stage"] },
                { num: "04", title: "Project Installation", points: ["Complete equipment assembly at your site", "Product installation and setup", "Full equipment inspection after installation"] },
                { num: "05", title: "Forever Support", points: ["Technical support whenever you need assistance", "Spare parts and maintenance support available", "Expert guidance to keep operations running smoothly"] }
              ];

              const cardsList = (Array.isArray(formData.processHome?.cards) && formData.processHome.cards.length > 0)
                ? formData.processHome.cards
                : defaultInitial;

              return (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0 0' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                      Process Step Cards ({cardsList.length})
                    </h4>
                    <button
                      type="button"
                      onClick={async () => {
                        const newStepNum = cardsList.length < 9 ? `0${cardsList.length + 1}` : `${cardsList.length + 1}`;
                        const updatedCards = [
                          ...cardsList,
                          {
                            num: newStepNum,
                            title: "New Process Step",
                            points: ["Feature Detail 1", "Feature Detail 2"]
                          }
                        ];
                        const updatedHeader = {
                          ...(formData.processHome || {}),
                          cards: updatedCards
                        };
                        setFormData(prev => ({ ...prev, processHome: updatedHeader }));
                        await persistSectionToDatabase('processHome', updatedHeader);
                      }}
                      style={{
                        background: '#00a8ff',
                        color: '#ffffff',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '10px',
                        fontWeight: '800',
                        fontSize: '12.5px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0, 168, 255, 0.3)'
                      }}
                    >
                      + Add New Card
                    </button>
                  </div>

                  {cardsList.map((cardItem, cardIdx) => {
                    const cardData = {
                      num: cardItem?.num || `0${cardIdx + 1}`,
                      title: cardItem?.title || '',
                      points: Array.isArray(cardItem?.points) ? cardItem.points : (cardItem?.points ? [cardItem.points] : [])
                    };

                    const updateSingleCard = (updated) => {
                      const updatedCards = [...cardsList];
                      updatedCards[cardIdx] = updated;
                      handleFieldChange('processHome', 'cards', updatedCards);
                    };

                    const deleteSingleCard = async () => {
                      const updatedCards = cardsList.filter((_, idx) => idx !== cardIdx);
                      const updatedHeader = {
                        ...(formData.processHome || {}),
                        cards: updatedCards
                      };
                      setFormData(prev => ({ ...prev, processHome: updatedHeader }));
                      await persistSectionToDatabase('processHome', updatedHeader);
                    };

                    return (
                      <div key={cardIdx} style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                          <span style={{ fontSize: '13px', fontWeight: '800', color: '#0369a1' }}>Card #{cardIdx + 1}</span>
                          <button
                            type="button"
                            onClick={deleteSingleCard}
                            style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                          >
                            ✕ Delete Card
                          </button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '12px' }}>
                          <div>
                            <label style={{ display: 'block', fontWeight: '800', fontSize: '11.5px', color: '#475569', marginBottom: '4px' }}>Step #</label>
                            <input
                              type="text"
                              value={cardData.num}
                              onChange={(e) => updateSingleCard({ ...cardData, num: e.target.value })}
                              style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '800', color: '#00a8ff' }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontWeight: '800', fontSize: '11.5px', color: '#475569', marginBottom: '4px' }}>Step Title</label>
                            <input
                              type="text"
                              value={cardData.title}
                              onChange={(e) => updateSingleCard({ ...cardData, title: e.target.value })}
                              style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontWeight: '800', fontSize: '12px', color: '#0f172a', marginBottom: '6px' }}>
                            Bullet Points (One per line)
                          </label>
                          <textarea
                            rows={3}
                            value={Array.isArray(cardData.points) ? cardData.points.join('\n') : (cardData.points || '')}
                            onChange={(e) => {
                              updateSingleCard({ ...cardData, points: e.target.value });
                            }}
                            onBlur={(e) => {
                              const cleaned = (typeof e.target.value === 'string' ? e.target.value : '').split('\n').map(line => line.replace(/^[-*•]\s+/, '').trim()).filter(Boolean);
                              updateSingleCard({ ...cardData, points: cleaned });
                            }}
                            placeholder="Enter bullet points for this step (one per line)..."
                            style={{
                              width: '100%',
                              padding: '8px 12px',
                              borderRadius: '10px',
                              border: '1.5px solid #cbd5e1',
                              background: '#F5F5F9',
                              fontSize: '13px',
                              fontWeight: '600',
                              lineHeight: 1.5,
                              color: '#0f172a',
                              boxSizing: 'border-box'
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        const dataToSave = {
                          title: formData.processHome?.title || "*Our Working* Process",
                          subtitle: formData.processHome?.subtitle || "How We Setup Your Game Zone",
                          cards: cardsList.map(c => ({
                            ...c,
                            points: Array.isArray(c.points)
                              ? c.points
                              : (typeof c.points === 'string' ? c.points.split('\n').map(l => l.replace(/^[-*•]\s+/, '').trim()).filter(Boolean) : [])
                          }))
                        };
                        persistSectionToDatabase('processHome', dataToSave);
                      }}
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
                      Save Process Header
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* 7. WHY CHOOSE US SECTION FORM */}
      {activeSection === 'whyChooseUs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Why Choose Us Section</h3>
            <p style={{ fontSize: '12.5px', color: '#64748b', margin: '3px 0 0' }}>Manage section title, subtitle, and key feature cards for Why Choose Us on Home page.</p>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
              Section Heading Title (Use *word* for cyan highlight color)
            </label>
            <input
              type="text"
              value={formData.whyChooseUs?.title || "*Why* Choose Us"}
              onChange={(e) => handleFieldChange('whyChooseUs', 'title', e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
            />
          </div>

          <div>
            <RichTextareaWithEditor
              label="Section Subtitle Paragraph"
              rows={2}
              value={formData.whyChooseUs?.subtitle || "We deliver complete game zone setup solutions for businesses across India"}
              onChange={(val) => handleFieldChange('whyChooseUs', 'subtitle', val)}
              placeholder="Enter Why Choose Us Subtitle..."
            />
          </div>

          {/* Dynamic Feature List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {(() => {
              const defaultItems = [
                { title: "ROI-Focused, From Day One", desc: "We consult on ROI first every client receives a complete report covering footfall, revenue, and payback period before we plan or select equipment." },
                { title: "Industry Expertise", desc: "Our team recommends the right entertainment attractions based on your space, budget, and business goals." },
                { title: "Premium Quality Equipment", desc: "We supply high-grade amusement equipment designed for reliable performance and durability." },
                { title: "Customized Planning", desc: "Our team recommends the right entertainment attractions based on your space, budget, and business goals." },
                { title: "Complete Turnkey Solutions", desc: "We provide end-to-end support from project planning and equipment selection to installation and execution" },
                { title: "Pan-India Execution", desc: "We support projects across India with professional installation, project management, and execution services." }
              ];

              const itemsList = (Array.isArray(formData.whyChooseUs?.items) && formData.whyChooseUs.items.length > 0)
                ? formData.whyChooseUs.items
                : defaultItems;

              return (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0 0' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                      Why Choose Us Feature Items ({itemsList.length})
                    </h4>
                    <button
                      type="button"
                      onClick={async () => {
                        const currentItems = [...itemsList];
                        currentItems.push({
                          title: "New Feature Title",
                          desc: "Detailed description of feature point."
                        });
                        const updatedSection = {
                          ...(formData.whyChooseUs || {}),
                          items: currentItems
                        };
                        setFormData(prev => ({ ...prev, whyChooseUs: updatedSection }));
                        await persistSectionToDatabase('whyChooseUs', updatedSection);
                      }}
                      style={{
                        background: '#00a8ff',
                        color: '#ffffff',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '10px',
                        fontWeight: '800',
                        fontSize: '12.5px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0, 168, 255, 0.3)'
                      }}
                    >
                      + Add Feature
                    </button>
                  </div>

                  {itemsList.map((item, itemIdx) => {
                    const itemData = {
                      title: item?.title || '',
                      desc: item?.desc || ''
                    };

                    const updateSingleItem = (updated) => {
                      const updatedItems = [...itemsList];
                      updatedItems[itemIdx] = updated;
                      handleFieldChange('whyChooseUs', 'items', updatedItems);
                    };

                    const deleteSingleItem = async () => {
                      const updatedItems = itemsList.filter((_, idx) => idx !== itemIdx);
                      const updatedSection = {
                        ...(formData.whyChooseUs || {}),
                        items: updatedItems
                      };
                      setFormData(prev => ({ ...prev, whyChooseUs: updatedSection }));
                      await persistSectionToDatabase('whyChooseUs', updatedSection);
                    };

                    return (
                      <div key={itemIdx} style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748b' }}>Feature #{itemIdx + 1}</span>
                          <button
                            type="button"
                            onClick={deleteSingleItem}
                            style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
                          >
                            ✕ Delete
                          </button>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontWeight: '800', fontSize: '11.5px', color: '#475569', marginBottom: '4px' }}>Feature Title</label>
                          <input
                            type="text"
                            value={itemData.title}
                            onChange={(e) => updateSingleItem({ ...itemData, title: e.target.value })}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                          />
                        </div>
                        <div>
                          <RichTextareaWithEditor
                            label="Feature Description"
                            rows={2}
                            value={itemData.desc}
                            onChange={(val) => updateSingleItem({ ...itemData, desc: val })}
                            placeholder="Enter feature description..."
                          />
                        </div>
                      </div>
                    );
                  })}

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        const dataToSave = {
                          title: formData.whyChooseUs?.title || "*Why* Choose Us",
                          subtitle: formData.whyChooseUs?.subtitle || "We deliver complete game zone setup solutions for businesses across India",
                          items: itemsList
                        };
                        persistSectionToDatabase('whyChooseUs', dataToSave);
                      }}
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
                      Save Why Choose Us
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* 8. STATS SECTION - TABLE FORMAT */}
      {activeSection === 'stats' && (() => {
        const defaultHomeStats = [
          { number: "14+", label: "YEARS OF EXPERIENCE" },
          { number: "200+", label: "Project Completed" },
          { number: "98%", label: "Happy Clients" },
          { number: "50+", label: "Cities Covered" }
        ];

        const homeStatsList = (Array.isArray(formData.stats) && formData.stats.length > 0)
          ? formData.stats.map(item => ({
            number: item.number || item.num || '',
            label: item.label || item.title || ''
          }))
          : defaultHomeStats;

        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Company Stats</h3>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0' }}>Manage statistics heading, description, numbers, and labels displayed on the website.</p>
              </div>
              <button
                onClick={() => openModal('add')}
                style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)' }}
              >
                <Plus style={{ width: '16px', height: '16px' }} /> Add Stat
              </button>
            </div>

            {/* Section Header & 5th Card Controls */}
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>
                  Section Heading Title (Use *word* for cyan highlight color)
                </label>
                <input
                  type="text"
                  value={formData.statsHeader?.title || "Discover Our *Company Stats*"}
                  onChange={(e) => handleFieldChange('statsHeader', 'title', e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '600' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>
                  Section Subtitle Paragraph
                </label>
                <input
                  type="text"
                  value={formData.statsHeader?.description || "Helping businesses build profitable, safe, and unforgettable entertainment destinations with precision and luxury in mind."}
                  onChange={(e) => handleFieldChange('statsHeader', 'description', e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '500' }}
                />
              </div>

              {/* 5th Safety Card Settings */}
              <div style={{ marginTop: '6px', paddingTop: '16px', borderTop: '1px solid #cbd5e1' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0284c7', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  🛡️ 5th Card Settings (100% Certified & Safety First Card)
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#0f172a', marginBottom: '6px' }}>
                      Badge Text (e.g. 100% CERTIFIED)
                    </label>
                    <input
                      type="text"
                      value={formData.statsHeader?.safetyBadgeText !== undefined ? formData.statsHeader.safetyBadgeText : "100% CERTIFIED"}
                      onChange={(e) => handleFieldChange('statsHeader', 'safetyBadgeText', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#0f172a', marginBottom: '6px' }}>
                      Card Title (e.g. Safety First)
                    </label>
                    <input
                      type="text"
                      value={formData.statsHeader?.safetyTitle !== undefined ? formData.statsHeader.safetyTitle : "Safety First"}
                      onChange={(e) => handleFieldChange('statsHeader', 'safetyTitle', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#0f172a', marginBottom: '6px' }}>
                    Card Subtitle / Description Text (e.g. Industry Standard Excellence)
                  </label>
                  <input
                    type="text"
                    value={formData.statsHeader?.safetySubtitle !== undefined ? formData.statsHeader.safetySubtitle : "Industry Standard Excellence"}
                    onChange={(e) => handleFieldChange('statsHeader', 'safetySubtitle', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '6px' }}>
                <button
                  onClick={() => persistSectionToDatabase('statsHeader', formData.statsHeader || {})}
                  style={{
                    background: '#38bdf8',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: '10px',
                    fontWeight: '800',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  Save Section & Safety Card Details
                </button>
              </div>
            </div>

            <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#0F172B', color: '#ffffff', borderBottom: '2px solid #1e293b' }}>
                    <th style={{ padding: '14px 18px', fontWeight: '800' }}>#</th>
                    <th style={{ padding: '14px 18px', fontWeight: '800' }}>Number</th>
                    <th style={{ padding: '14px 18px', fontWeight: '800' }}>Label Text</th>
                    <th style={{ padding: '14px 18px', fontWeight: '800', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {homeStatsList.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                      <td style={{ padding: '14px 18px', fontWeight: '700', color: '#64748b' }}>{idx + 1}</td>
                      <td style={{ padding: '14px 18px', fontWeight: '900', color: '#38bdf8', fontSize: '14px' }}>{item.number}</td>
                      <td style={{ padding: '14px 18px', fontWeight: '700', color: '#0f172a' }}>{item.label}</td>
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <button
                          onClick={() => openModal('edit', idx, item)}
                          title="Edit Stat"
                          style={{ background: '#e0f2fe', color: '#0284c7', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', marginRight: '8px', fontWeight: '700', fontSize: '12px' }}
                        >
                          <Edit2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem('stats', idx)}
                          title="Delete Stat"
                          style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px' }}
                        >
                          <Trash2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })()}

      {/* 9. CLIENT LOGOS - TABLE FORMAT */}
      {activeSection === 'clientLogos' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Our Clients Logos</h3>
              <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0' }}>Manage brand logos shown on the clients marquee.</p>
            </div>
            <button
              onClick={() => openModal('add')}
              style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)' }}
            >
              <Plus style={{ width: '16px', height: '16px' }} /> Add Client Logo
            </button>
          </div>
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>
                Section Heading Title (Use *word* for cyan highlight color)
              </label>
              <input
                type="text"
                value={formData.clientsHeader?.title || "*Our Clients* Section"}
                onChange={(e) => handleFieldChange('clientsHeader', 'title', e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '600' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>
                Section Subtitle Paragraph
              </label>
              <input
                type="text"
                value={formData.clientsHeader?.subtitle || "Our Complete Game Zone Equipment & Setup Solutions"}
                onChange={(e) => handleFieldChange('clientsHeader', 'subtitle', e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '500' }}
              />
            </div>
            <div style={{ textAlign: 'right' }}>
              <button
                onClick={() => persistSectionToDatabase('clientsHeader', formData.clientsHeader || {})}
                style={{
                  background: '#38bdf8',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '10px',
                  fontWeight: '800',
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)'
                }}
              >
                Save Section Header
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#0F172B', color: '#ffffff', borderBottom: '2px solid #1e293b' }}>
                  <th style={{ padding: '14px 18px', fontWeight: '800' }}>#</th>
                  <th style={{ padding: '14px 18px', fontWeight: '800' }}>Logo Preview</th>
                  <th style={{ padding: '14px 18px', fontWeight: '800' }}>Company Name</th>
                  <th style={{ padding: '14px 18px', fontWeight: '800', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(formData.clientLogos || []).map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                    <td style={{ padding: '14px 18px', fontWeight: '700', color: '#64748b' }}>{idx + 1}</td>
                    <td style={{ padding: '14px 18px' }}>
                      {item.logoUrl ? (
                        <img src={item.logoUrl} alt="" style={{ height: '40px', maxWidth: '100px', objectFit: 'contain' }} />
                      ) : (
                        <span style={{ color: '#94a3b8', fontSize: '12px' }}>No image</span>
                      )}
                    </td>
                    <td style={{ padding: '14px 18px', fontWeight: '800', color: '#0f172a' }}>{item.name || 'Unnamed Client'}</td>
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <button
                        onClick={() => openModal('edit', idx, item)}
                        style={{ background: '#e0f2fe', color: '#0284c7', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', marginRight: '8px', fontWeight: '700', fontSize: '12px' }}
                      >
                        <Edit2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteItem(activeSection, idx)}
                        style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px' }}
                      >
                        <Trash2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 10. CHANNEL PARTNERS - TABLE FORMAT */}
      {activeSection === 'channelPartners' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Channel Partners Logos</h3>
              <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0' }}>Manage channel partner logos.</p>
            </div>
            <button
              onClick={() => openModal('add')}
              style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)' }}
            >
              <Plus style={{ width: '16px', height: '16px' }} /> Add Channel Partner
            </button>
          </div>

          {/* Section Header Controls */}
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>
                Section Heading Title (Use *word* for cyan highlight color)
              </label>
              <input
                type="text"
                value={formData.channelPartnersHeader?.title || "*Our Channel* Partners"}
                onChange={(e) => handleFieldChange('channelPartnersHeader', 'title', e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '600' }}
              />
            </div>
            <div style={{ textAlign: 'right' }}>
              <button
                onClick={() => persistSectionToDatabase('channelPartnersHeader', formData.channelPartnersHeader || {})}
                style={{
                  background: '#38bdf8',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '10px',
                  fontWeight: '800',
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)'
                }}
              >
                Save Section Header
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#0F172B', color: '#ffffff', borderBottom: '2px solid #1e293b' }}>
                  <th style={{ padding: '14px 18px', fontWeight: '800' }}>#</th>
                  <th style={{ padding: '14px 18px', fontWeight: '800' }}>Partner Logo</th>
                  <th style={{ padding: '14px 18px', fontWeight: '800' }}>Partner Name</th>
                  <th style={{ padding: '14px 18px', fontWeight: '800', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(formData.channelPartners || []).map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                    <td style={{ padding: '14px 18px', fontWeight: '700', color: '#64748b' }}>{idx + 1}</td>
                    <td style={{ padding: '14px 18px' }}>
                      {item.logoUrl ? (
                        <img src={item.logoUrl} alt="" style={{ height: '40px', maxWidth: '100px', objectFit: 'contain' }} />
                      ) : (
                        <span style={{ color: '#94a3b8', fontSize: '12px' }}>No image</span>
                      )}
                    </td>
                    <td style={{ padding: '14px 18px', fontWeight: '800', color: '#0f172a' }}>{item.name || 'Unnamed Partner'}</td>
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <button
                        onClick={() => openModal('edit', idx, item)}
                        style={{ background: '#e0f2fe', color: '#0284c7', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', marginRight: '8px', fontWeight: '700', fontSize: '12px' }}
                      >
                        <Edit2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteItem(activeSection, idx)}
                        style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px' }}
                      >
                        <Trash2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 11. GAME ZONES BUILT - TABLE FORMAT */}
      {activeSection === 'builtProjects' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Game Zones We Have Built Across India</h3>
              <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0' }}>Manage game zone projects, images, and locations.</p>
            </div>
            <button
              onClick={() => openModal('add')}
              style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)' }}
            >
              <Plus style={{ width: '16px', height: '16px' }} /> Add Game Zone
            </button>
          </div>

          {/* Section Header Controls */}
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>
                Section Heading Title (Use *word* for cyan highlight color)
              </label>
              <input
                type="text"
                value={formData.builtProjectsHeader?.title || "Game Zones *Built Across* India"}
                onChange={(e) => handleFieldChange('builtProjectsHeader', 'title', e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '600' }}
              />
            </div>
            <div>
              <RichTextareaWithEditor
                label="Secondary Subtext Paragraph"
                rows={2}
                value={formData.builtProjectsHeader?.subtext || "Complete indoor game zone setups engineered and delivered by Winera International"}
                onChange={(val) => handleFieldChange('builtProjectsHeader', 'subtext', val)}
                placeholder="Enter secondary subtext..."
              />
            </div>
            <div style={{ textAlign: 'right' }}>
              <button
                onClick={() => persistSectionToDatabase('builtProjectsHeader', formData.builtProjectsHeader || {})}
                style={{
                  background: '#38bdf8',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '10px',
                  fontWeight: '800',
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)'
                }}
              >
                Save Section Header
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#0F172B', color: '#ffffff', borderBottom: '2px solid #1e293b' }}>
                  <th style={{ padding: '14px 18px', fontWeight: '800' }}>#</th>
                  <th style={{ padding: '14px 18px', fontWeight: '800' }}>Venue Photo</th>
                  <th style={{ padding: '14px 18px', fontWeight: '800' }}>Name of Game Zone</th>
                  <th style={{ padding: '14px 18px', fontWeight: '800' }}>City</th>
                  <th style={{ padding: '14px 18px', fontWeight: '800', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(formData.builtProjects || []).map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                    <td style={{ padding: '14px 18px', fontWeight: '700', color: '#64748b' }}>{idx + 1}</td>
                    <td style={{ padding: '14px 18px' }}>
                      {(item.imageUrl || item.img) ? (
                        <img src={item.imageUrl || item.img} alt="" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
                      ) : (
                        <span style={{ color: '#94a3b8', fontSize: '12px' }}>No image</span>
                      )}
                    </td>
                    <td style={{ padding: '14px 18px', fontWeight: '800', color: '#0f172a' }}>{item.name || item.title || 'Unnamed Game Zone'}</td>
                    <td style={{ padding: '14px 18px', fontWeight: '700', color: '#38bdf8' }}>{item.city || item.location || 'N/A'}</td>
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <button
                        onClick={() => openModal('edit', idx, { ...item, imageUrl: item.imageUrl || item.img, img: item.img || item.imageUrl })}
                        style={{ background: '#e0f2fe', color: '#0284c7', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', marginRight: '8px', fontWeight: '700', fontSize: '12px' }}
                      >
                        <Edit2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteItem('builtProjects', idx)}
                        style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px' }}
                      >
                        <Trash2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 12. FAQS - TABLE FORMAT */}
      {activeSection === 'faqs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>FAQ (Questions & Answers)</h3>
              <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0' }}>Manage frequent questions and answers.</p>
            </div>
            <button
              onClick={() => openModal('add')}
              style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)' }}
            >
              <Plus style={{ width: '16px', height: '16px' }} /> Add FAQ
            </button>
          </div>

          {/* Section Header Controls */}
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>
                Section Heading Title (Use *word* for cyan highlight color)
              </label>
              <input
                type="text"
                value={formData.faqsHeader?.title || "*Frequently* Asked Questions"}
                onChange={(e) => handleFieldChange('faqsHeader', 'title', e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '600' }}
              />
            </div>
            <div>
              <RichTextareaWithEditor
                label="Secondary Subtitle Paragraph"
                rows={2}
                value={formData.faqsHeader?.subtitle || "Everything you need to know about setting up a game zone in India"}
                onChange={(val) => handleFieldChange('faqsHeader', 'subtitle', val)}
                placeholder="Enter FAQ subtitle..."
              />
            </div>
            <div style={{ textAlign: 'right' }}>
              <button
                onClick={() => persistSectionToDatabase('faqsHeader', formData.faqsHeader || {})}
                style={{
                  background: '#38bdf8',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '10px',
                  fontWeight: '800',
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)'
                }}
              >
                Save Section Header
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#0F172B', color: '#ffffff', borderBottom: '2px solid #1e293b' }}>
                  <th style={{ padding: '14px 18px', fontWeight: '800', width: '50px' }}>#</th>
                  <th style={{ padding: '14px 18px', fontWeight: '800', width: '35%' }}>Question</th>
                  <th style={{ padding: '14px 18px', fontWeight: '800' }}>Answer</th>
                  <th style={{ padding: '14px 18px', fontWeight: '800', textAlign: 'right', width: '160px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const defaultHomeFaqs = [
                    { q: "How do I set up a game zone in India?", a: "Start with a consultation and share your available space, budget, and location with our team. As a trusted gaming zone setup company in India, Winera International handles everything from ROI analysis and layout design to equipment selection, installation, and post-launch support across 50+ cities." },
                    { q: "What is the cost of a game zone setup in India?", a: "Game zone setup cost in India totally depends on the size of space, type of attractions, and level of customisation. As a direct game zone equipment supplier, Winera International provides a complete cost breakdown covering equipment, installation, and maintenance before you confirm any project. Contact our team for a quote specific to your venue." },
                    { q: "Does Winera handle the complete game zone setup?", a: "Yes. As experienced game zone developers in India, we manage the entire project from concept to completion, space planning, equipment sourcing, layout design, installation, and after-sales support all handled by our own team, not third-party contractors." },
                    { q: "Which cities does Winera cover in India?", a: "Winera International installs game zone equipment across 50+ cities in India — covering Tier-1 metros, Tier-2 cities, and emerging Tier-3 markets. Our own installation team reaches wherever your venue is located, without relying on local contractors." },
                    { q: "What makes Winera International different from other game zone suppliers?", a: "Before recommending any equipment, we prepare a free ROI Blueprint for your specific venue covering projected footfall, revenue potential, and break-even timeline. Very few game zone suppliers in India offer this as a standard part of their process." },
                    { q: "Do you provide after-sales support after installation?", a: "Yes. Our technical team provides ongoing maintenance, spare parts, and on-site support for all equipment we install available directly through our own team, not through agents or third-party service providers." },
                    { q: "Can game zone equipment be customised for my venue's theme?", a: "Yes. Every game zone solution we deliver is designed around your specific space, theme, budget, and target audience from layout planning to equipment selection and visual design." },
                    { q: "How do I get started with my game zone project?", a: "Contact us via our website's contact form, WhatsApp, or call +91 91578 73576. We're also available on social media." },
                    { q: "Can Winera International help me plan my game zone from scratch?", a: "Yes, Winera International offers complete game zone planning support. From space planning and equipment selection to installation and staff training, we manage the entire project. Our “Plan Your Game Zone” service is specially designed for first-time entrepreneurs and existing businesses looking to add an entertainment zone." }
                  ];
                  const list = (Array.isArray(formData.faqs) && formData.faqs.length > 0) ? formData.faqs : defaultHomeFaqs;
                  return list.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                      <td style={{ padding: '14px 18px', fontWeight: '700', color: '#64748b' }}>{idx + 1}</td>
                      <td style={{ padding: '14px 18px', fontWeight: '800', color: '#0f172a' }}>{item.q || item.question}</td>
                      <td style={{ padding: '14px 18px', color: '#475569', fontSize: '12.5px', lineHeight: '1.4' }}>{item.a || item.answer}</td>
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <button
                          onClick={() => openModal('edit', idx, { q: item.q || item.question, a: item.a || item.answer })}
                          style={{ background: '#e0f2fe', color: '#0284c7', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', marginRight: '8px', fontWeight: '700', fontSize: '12px' }}
                        >
                          <Edit2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Edit
                        </button>
                        <button
                          onClick={async () => {
                            const updated = list.filter((_, i) => i !== idx);
                            setFormData(prev => ({ ...prev, faqs: updated }));
                            await persistSectionToDatabase('faqs', updated);
                          }}
                          style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px' }}
                        >
                          <Trash2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Delete
                        </button>
                      </td>
                    </tr>
                  ));
                })()}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 13. TESTIMONIALS - TABLE FORMAT */}
      {activeSection === 'testimonials' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Client Testimonials</h3>
              <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0' }}>Manage client feedback, ratings, and video links.</p>
            </div>
            <button
              onClick={() => openModal('add')}
              style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)' }}
            >
              <Plus style={{ width: '16px', height: '16px' }} /> Add Testimonial
            </button>
          </div>

          {/* Section Header Controls */}
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>
                Section Heading Title (Use *word* for cyan highlight color)
              </label>
              <input
                type="text"
                value={formData.testimonialsHeader?.title || "*What Our* Clients Say"}
                onChange={(e) => handleFieldChange('testimonialsHeader', 'title', e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '600' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>
                Secondary Subtitle Paragraph (Optional default override)
              </label>
              <input
                type="text"
                value={formData.testimonialsHeader?.subtitle || ""}
                placeholder="Leave empty to display individual client quote per active card"
                onChange={(e) => handleFieldChange('testimonialsHeader', 'subtitle', e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px' }}
              />
            </div>
            <div style={{ textAlign: 'right' }}>
              <button
                onClick={() => persistSectionToDatabase('testimonialsHeader', formData.testimonialsHeader || {})}
                style={{
                  background: '#38bdf8',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '10px',
                  fontWeight: '800',
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)'
                }}
              >
                Save Section Header
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#0F172B', color: '#ffffff', borderBottom: '2px solid #1e293b' }}>
                  <th style={{ padding: '14px 18px', fontWeight: '800', width: '45px' }}>#</th>
                  <th style={{ padding: '14px 18px', fontWeight: '800', width: '85px' }}>Photo</th>
                  <th style={{ padding: '14px 18px', fontWeight: '800', minWidth: '160px' }}>Game Zone Name</th>
                  <th style={{ padding: '14px 18px', fontWeight: '800', minWidth: '100px' }}>Role / City</th>
                  <th style={{ padding: '14px 18px', fontWeight: '800', width: '85px' }}>Rating</th>
                  <th style={{ padding: '14px 18px', fontWeight: '800', minWidth: '150px' }}>Video & Cover</th>
                  <th style={{ padding: '14px 18px', fontWeight: '800', minWidth: '240px' }}>Review Quote</th>
                  <th style={{ padding: '14px 18px', fontWeight: '800', textAlign: 'right', width: '160px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {((Array.isArray(formData.testimonials) && formData.testimonials.length > 0)
                  ? formData.testimonials
                  : [
                    {
                      gameZoneName: "Rebounce Game Zone",
                      name: "Rebounce Game Zone",
                      reviewerRole: "Surat",
                      role: "Surat",
                      starRating: 5,
                      rating: 5,
                      youtubeVideoUrl: "https://www.youtube.com/shorts/YNrfGqhhl5w",
                      videoUrl: "https://www.youtube.com/shorts/YNrfGqhhl5w",
                      founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360319/winera_uploads/uanfdgdjqntkeaqm8d9u.webp",
                      img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360319/winera_uploads/uanfdgdjqntkeaqm8d9u.webp",
                      videoImg: "https://img.youtube.com/vi/YNrfGqhhl5w/sddefault.jpg",
                      videoThumbnail: "https://img.youtube.com/vi/YNrfGqhhl5w/sddefault.jpg",
                      quote: "When we were planning Rebounce we had the space and the budget but no idea how to turn it into a game zone. Winera International Pvt. Ltd. made the entire process effortless. One meeting was enough. We shared our requirements and they handled everything from game selection and layout design to complete installation. The result speaks for itself Rebounce today is a thriving game zone and our customers keep coming back."
                    },
                    {
                      gameZoneName: "Fun Houze",
                      name: "Fun Houze",
                      reviewerRole: "Surat",
                      role: "Surat",
                      starRating: 5,
                      rating: 5,
                      youtubeVideoUrl: "https://youtube.com/shorts/YXhUJ1k6pbQ",
                      videoUrl: "https://youtube.com/shorts/YXhUJ1k6pbQ",
                      founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360319/winera_uploads/q9p8mlpn0ws9f9vlrxhd.webp",
                      img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360319/winera_uploads/q9p8mlpn0ws9f9vlrxhd.webp",
                      videoImg: "https://img.youtube.com/vi/YXhUJ1k6pbQ/sddefault.jpg",
                      videoThumbnail: "https://img.youtube.com/vi/YXhUJ1k6pbQ/sddefault.jpg",
                      quote: "Choosing the right gaming zone setup company in India was critical for us given our tight deadline. Winera International Pvt. Ltd. delivered everything as planned and on schedule. Fun Houze opening day went smoothly and the game zone setup was exactly as we discussed."
                    },
                    {
                      gameZoneName: "Hulaboo Game Zone",
                      name: "Hulaboo Game Zone",
                      reviewerRole: "Surat",
                      role: "Surat",
                      starRating: 5,
                      rating: 5,
                      youtubeVideoUrl: "https://youtube.com/shorts/Jvtsn-TxVqE",
                      videoUrl: "https://youtube.com/shorts/Jvtsn-TxVqE",
                      founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877032/winera_uploads/projects/jvr2xtu8jszcmzaglxmr.jpg",
                      img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877032/winera_uploads/projects/jvr2xtu8jszcmzaglxmr.jpg",
                      videoImg: "https://img.youtube.com/vi/Jvtsn-TxVqE/sddefault.jpg",
                      videoThumbnail: "https://img.youtube.com/vi/Jvtsn-TxVqE/sddefault.jpg",
                      quote: "To be honest before starting Hulaboo we had visited multiple game zone setup companies and was confused about who to trust. When we finally met Winera International Pvt. Ltd. the clarity they gave us from day one was different. They explained the entire process, showed us real projects and gave us a transparent quote. That confidence is what made us sign. And they delivered exactly what they promised."
                    },
                    {
                      gameZoneName: "House of Pepe",
                      name: "House of Pepe",
                      reviewerRole: "Surat",
                      role: "Surat",
                      starRating: 5,
                      rating: 5,
                      youtubeVideoUrl: "https://youtube.com/shorts/lf1VMqxFvR0",
                      videoUrl: "https://youtube.com/shorts/lf1VMqxFvR0",
                      founderImage: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360320/winera_uploads/etpnimwouc6kknkwqzpd.webp",
                      img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360320/winera_uploads/etpnimwouc6kknkwqzpd.webp",
                      videoImg: "https://img.youtube.com/vi/lf1VMqxFvR0/sddefault.jpg",
                      videoThumbnail: "https://img.youtube.com/vi/lf1VMqxFvR0/sddefault.jpg",
                      quote: "Combining soft play and arcade under one roof was our vision but we had no idea how to execute it. We needed a reliable soft play equipment manufacturer in India who could also handle the arcade side. Winera International Pvt. Ltd. designed the House of Pepe layout perfectly; both zones feel different but connected. Customers enjoy both sections equally."
                    }
                  ]
                ).map((item, idx) => {
                  const founderImgSrc = item.founderImage || item.img || 'https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360319/winera_uploads/uanfdgdjqntkeaqm8d9u.webp';
                  const itemVideoUrl = item.youtubeVideoUrl || item.videoUrl || item.videoLink || '';
                  let itemCoverImg = item.videoImg || item.videoThumbnail || '';
                  if (!itemCoverImg && itemVideoUrl) {
                    const m = itemVideoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/))([^"&?\/\s]{11})/i);
                    if (m && m[1]) itemCoverImg = `https://img.youtube.com/vi/${m[1]}/sddefault.jpg`;
                  }
                  if (!itemCoverImg) itemCoverImg = founderImgSrc;

                  return (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                      <td style={{ padding: '14px 18px', fontWeight: '700', color: '#64748b' }}>{idx + 1}</td>
                      <td style={{ padding: '14px 18px' }}>
                        <img
                          src={founderImgSrc}
                          alt=""
                          style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #e2e8f0' }}
                          onError={(e) => {
                            e.target.src = 'https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1789360319/winera_uploads/uanfdgdjqntkeaqm8d9u.webp';
                          }}
                        />
                      </td>
                      <td style={{ padding: '14px 18px', fontWeight: '800', color: '#0f172a' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>{item.gameZoneName || item.name || 'Unnamed Game Zone'}</span>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '13px',
                            height: '13px',
                            borderRadius: '50%',
                            background: '#000000',
                            color: '#ffffff',
                            fontSize: '8px',
                            fontWeight: '900'
                          }}>✓</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 18px', color: '#64748b', fontWeight: '600' }}>
                        {item.reviewerRole || item.role || 'Surat'}
                      </td>
                      <td style={{ padding: '14px 18px', fontWeight: '900', color: '#ffcd00', whiteSpace: 'nowrap' }}>
                        {item.starRating || item.rating || 5} ★
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {itemCoverImg && (
                            <img
                              src={itemCoverImg}
                              alt=""
                              style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #cbd5e1' }}
                            />
                          )}
                          <div>
                            {itemVideoUrl ? (
                              <a
                                href={itemVideoUrl}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  fontSize: '11px',
                                  color: '#dc2626',
                                  background: '#fee2e2',
                                  padding: '3px 8px',
                                  borderRadius: '6px',
                                  fontWeight: '700',
                                  textDecoration: 'none'
                                }}
                              >
                                ▶ YouTube
                              </a>
                            ) : (
                              <span style={{ fontSize: '11px', color: '#94a3b8' }}>No video URL</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px 18px', color: '#475569', fontSize: '12.5px', lineHeight: '1.45', maxWidth: '320px' }}>
                        <p style={{
                          margin: 0,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          fontStyle: 'italic'
                        }}>
                          “{item.quote || 'No quote provided'}”
                        </p>
                      </td>
                      <td style={{ padding: '14px 18px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <button
                          onClick={() => openModal('edit', idx, {
                            ...item,
                            gameZoneName: item.gameZoneName || item.name || '',
                            reviewerRole: item.reviewerRole || item.role || '',
                            founderImage: item.founderImage || item.img || '',
                            starRating: item.starRating || item.rating || 5,
                            youtubeVideoUrl: item.youtubeVideoUrl || item.videoUrl || '',
                            videoImg: item.videoImg || item.videoThumbnail || '',
                            quote: item.quote || ''
                          })}
                          style={{ background: '#e0f2fe', color: '#0284c7', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', marginRight: '8px', fontWeight: '700', fontSize: '12px' }}
                        >
                          <Edit2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(activeSection, idx)}
                          style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px' }}
                        >
                          <Trash2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 14. CTA CONSULTATION BANNER SECTION FORM */}
      {activeSection === 'ctaBanner' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>CTA Consultation Banner</h3>
            <p style={{ fontSize: '12.5px', color: '#64748b', margin: '3px 0 0' }}>Manage main heading title, description paragraph, CTA button label, link, and background banner image.</p>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
              Banner Main Title Heading
            </label>
            <input
              type="text"
              value={formData.ctaBanner?.title !== undefined && formData.ctaBanner?.title !== "Start Your Game Zone Journey" ? formData.ctaBanner.title : (formData.ctaBanner?.subtitle !== undefined ? formData.ctaBanner.subtitle : "Game Zones Are India's Fastest Growing Business Are You In?")}
              onChange={(e) => handleFieldChange('ctaBanner', 'title', e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '700' }}
            />
          </div>

          <div>
            <RichTextareaWithEditor
              label="Description Paragraph"
              rows={2}
              value={formData.ctaBanner?.description !== undefined ? formData.ctaBanner.description : "Get expert guidance, custom layout design and complete installation support from India's trusted game zone setup company"}
              onChange={(val) => handleFieldChange('ctaBanner', 'description', val)}
              placeholder="Enter CTA description..."
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
              CTA Button Text
            </label>
            <input
              type="text"
              value={formData.ctaBanner?.buttonText !== undefined ? formData.ctaBanner.buttonText : "Talk to an Expert"}
              onChange={(e) => handleFieldChange('ctaBanner', 'buttonText', e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
              CTA Button Link / URL
            </label>
            <input
              type="text"
              value={formData.ctaBanner?.buttonLink !== undefined ? formData.ctaBanner.buttonLink : "https://wa.me/919157873576"}
              onChange={(e) => handleFieldChange('ctaBanner', 'buttonLink', e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
            />
          </div>

          {/* Background Banner Image */}
          <div>
            <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
              Background Banner Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', width: '140px', height: '60px', borderRadius: '10px', overflow: 'hidden', border: '1.5px solid #38bdf8' }}>
                <img
                  src={getAdminValidImageUrl(formData.ctaBanner?.bgUrl, ctaMainBanner)}
                  alt="Banner Background Preview"
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
                      const res = await uploadImageFile(file, admin?.token);
                      const updated = { ...(formData.ctaBanner || {}), bgUrl: res.url };
                      setFormData(prev => ({ ...prev, ctaBanner: updated }));
                      await persistSectionToDatabase('ctaBanner', updated);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                />
              </label>
              {formData.ctaBanner?.bgUrl && (
                <button
                  type="button"
                  onClick={async () => {
                    const updated = { ...(formData.ctaBanner || {}), bgUrl: '' };
                    setFormData(prev => ({ ...prev, ctaBanner: updated }));
                    await persistSectionToDatabase('ctaBanner', updated);
                  }}
                  style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                >
                  Reset to Default Banner
                </button>
              )}
            </div>
            <AdminAltInput
              label="🏷️ Banner Image Alt Text (SEO Keyword)"
              value={formData.ctaBanner?.bgAlt || ''}
              onChange={(e) => handleFieldChange('ctaBanner', 'bgAlt', e.target.value)}
              placeholder="e.g. Commercial Game Zone Turnkey Setup & ROI Consultation - Winera"
            />
          </div>

          <div style={{ textAlign: 'right', marginTop: '10px' }}>
            <button
              onClick={() => persistSectionToDatabase('ctaBanner', formData.ctaBanner || {})}
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
              Save CTA Banner
            </button>
          </div>
        </div>
      )}
    </>
  );
}
