import React from 'react';
import { Plus, Trash2, Edit2, Upload } from 'lucide-react';
import RichTextareaWithEditor from '../components/RichTextareaWithEditor';
import AdminAltInput from '../components/AdminAltInput';
import { uploadImageFile } from '../services/api';
import projectPageMobileBanner from '../assets/project-page-mobile-banner.png';

const bikeArcade = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345630/winera_uploads/schxkoaxrvkg5cdfqatw.jpg";
const arcadeBoy = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345623/winera_uploads/lxgyufz5gdfquteol0qq.jpg";
const arcadeHall = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345623/winera_uploads/ctowdzk3h7ee5rxb2vpn.jpg";
const arcadeHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345630/winera_uploads/t3gsogz8if5mw7t0hj1h.png";
const arcadeMobileHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345625/winera_uploads/dv8p9pwu3yjmojbsvay6.png";
const commercialTeam = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345643/winera_uploads/ld6pprroti7x4husa1kz.jpg";
const arcadeCtaBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345623/winera_uploads/gqyx5q0t4y7o8lereesb.png";

const superAirHockeyImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345686/winera_uploads/r9ri8fdp1zn23qijsqbb.jpg";
const puckCarnivalAirHockeyImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345678/winera_uploads/hgufw9unaxafrouason3.jpg";
const dazzlingAirHockeyImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345647/winera_uploads/powuv61epkppbuxyouph.jpg";
const auroraAirHockeyImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345631/winera_uploads/dy0jbj6daxse0hxazo8t.jpg";
const ochaAirHockeyImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345673/winera_uploads/xhpnlwznawws0pul4qqh.jpg";
const aeroXAirHockeyImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345525/winera_uploads/lchcicvnp2rz8bplwljd.jpg";
const arcadegamesImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345630/winera_uploads/bwrkmv2tzczs7ciayqn5.png";
const defaultGameZoneMobileBanner = projectPageMobileBanner;

const DEFAULT_ARCADE_CATEGORIES = [
  "Arcade Games", "Claw Machine", "Redemption Game", "Kiddy Ride",
  "Bike & Car Racing Games", "Shooting Games", "Strength Based Games"
];

const arcadeProductImageMap = {
  "Astrology Cointopia": arcadeHall,
  "Astrology Capsule Version": arcadeBoy,
  "Basketball Star": superAirHockeyImg,
  "Pinball Storm": aeroXAirHockeyImg,
  "Larva Kids Ride": arcadeBoy,
  "Parkour Motor II (DX)": arcadegamesImg,
  "MANX TT 32\"": bikeArcade,
  "Super Air Hockey": superAirHockeyImg,
  "Puck Carnival Air Hockey": puckCarnivalAirHockeyImg,
  "Dazzling Air Hockey - Multi Puck": dazzlingAirHockeyImg,
  "Aurora Air Hockey": auroraAirHockeyImg,
  "Ocha Air Hockey": ochaAirHockeyImg,
  "Aero X Air Hockey": aeroXAirHockeyImg,
  "Happy Carousel Kiddy Ride": arcadeBoy,
  "Super Speed Mini Racer": bikeArcade,
  "Speed Driver 5 Twin Motion": arcadeBoy,
  "OutRun 2 Supercar Simulator": bikeArcade,
  "Scarlet Dawn Dual Gun Shooter": arcadeHall,
  "Jurassic Motion Arcade Shooter": arcadeBoy,
  "Dragon Boxer Punching Machine": arcadeHall,
  "Ultimate Hammer King Pro": arcadeBoy,
  "Toy Story Plush Claw Machine": arcadeHall,
  "Lucky Catcher Crane Machine": arcadeBoy,
  "Claw Machine": arcadeHall,
  "Redemption Game": superAirHockeyImg,
  "Bike & Car Racing Games": bikeArcade,
  "Bike Racing Game": bikeArcade,
  "Car Racing Game": arcadegamesImg,
  "Shooting Games": arcadeHall,
  "VR Games": arcadeBoy,
  "Kiddy Ride": arcadeBoy,
  "Strength Based Games": arcadeHall,
  "Arcade Games": arcadegamesImg
};

const getAdminValidImageUrl = (url, fallback = bikeArcade) => {
  if (!url) return fallback;
  if (typeof url === 'object' && url.default) return url.default;
  if (typeof url !== 'string' || url.trim() === '') return fallback;
  if (url.includes('eqjkboeokagpaus2ifxa') || url.includes('project-page-mobile-banner')) {
    return defaultGameZoneMobileBanner;
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

export default function ArcadeDashboard({
  activeSection,
  formData = {},
  setFormData,
  handleFieldChange,
  persistSectionToDatabase,
  openModal,
  handleDeleteItem,
  admin,
  setStatusMsg,
  setLoadingSection,
  refreshContent,
  setDeleteConfirmModal,
  arcadeMasterCards = [],
  adminProjectFilterCat,
  setAdminProjectFilterCat,
  adminArcadeSearch,
  setAdminArcadeSearch,
  adminArcadePage,
  setAdminArcadePage,
  newCategoryInput,
  setNewCategoryInput
}) {
  return (
    <>
          {/* ARCADE HERO BANNER FORM */}
          {activeSection === 'arcadeHero' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Arcade Hero Banner</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Hero Title (Use *word* for Yellow Highlight)
                </label>
                <input
                  type="text"
                  value={formData.arcadeHero?.title || '*Arcade* Game'}
                  onChange={(e) => handleFieldChange('arcadeHero', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Breadcrumb Active Page Text
                </label>
                <input
                  type="text"
                  value={formData.arcadeHero?.breadcrumbText || 'Arcade Game'}
                  onChange={(e) => handleFieldChange('arcadeHero', 'breadcrumbText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              {/* Hero Background Image Upload & Preview */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                  Hero Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img
                    src={getAdminValidImageUrl(formData.arcadeHero?.bgUrl, arcadeHeroBg)}
                    alt="Hero Bg Preview"
                    style={{ width: '120px', height: '65px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                  />
                  <input
                    type="text"
                    value={formData.arcadeHero?.bgUrl || ''}
                    onChange={(e) => handleFieldChange('arcadeHero', 'bgUrl', e.target.value)}
                    placeholder="Background Image URL"
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
                          handleFieldChange('arcadeHero', 'bgUrl', res.url);
                        }
                      }}
                    />
                  </label>
                  {formData.arcadeHero?.bgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('arcadeHero', 'bgUrl', '')}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '12px 18px', borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
                <AdminAltInput
                  label="🏷️ Hero Banner Alt Text (SEO Keyword)"
                  value={formData.arcadeHero?.bgAlt || ''}
                  onChange={(e) => handleFieldChange('arcadeHero', 'bgAlt', e.target.value)}
                  placeholder="e.g. Commercial Arcade Game Setup & Machines India - Winera International"
                />
              </div>

              {/* Mobile Screen Hero Banner Upload & Preview */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                  Mobile Screen Hero Banner <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📱 Recommended Size: 941 × 550 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img
                    src={getAdminValidImageUrl(formData.arcadeHero?.mobileBgUrl, arcadeMobileHeroBg)}
                    alt="Mobile Hero Bg Preview"
                    style={{ width: '120px', height: '65px', objectFit: 'cover', borderRadius: '10px', border: '1.5px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                  />
                  <input
                    type="text"
                    value={formData.arcadeHero?.mobileBgUrl || ''}
                    onChange={(e) => handleFieldChange('arcadeHero', 'mobileBgUrl', e.target.value)}
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
                          handleFieldChange('arcadeHero', 'mobileBgUrl', res.url);
                        }
                      }}
                    />
                  </label>
                  {formData.arcadeHero?.mobileBgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('arcadeHero', 'mobileBgUrl', '')}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '12px 18px', borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
                <AdminAltInput
                  label="🏷️ Mobile Hero Banner Alt Text (SEO Keyword)"
                  value={formData.arcadeHero?.mobileBgAlt || ''}
                  onChange={(e) => handleFieldChange('arcadeHero', 'mobileBgAlt', e.target.value)}
                  placeholder="e.g. Commercial Arcade Game Setup Mobile Banner - Winera International"
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arcadeHero', formData.arcadeHero || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Arcade Hero Banner
                </button>
              </div>
            </div>
          )}

          {/* ARCADE INTRO & SPECS FORM */}
          {activeSection === 'arcadeIntro' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Arcade Game Machines In India Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Main Section Title (Use *word* for Cyan Accent)
                </label>
                <input
                  type="text"
                  value={formData.arcadeIntro?.title || '*Arcade Game* Machines in India'}
                  onChange={(e) => handleFieldChange('arcadeIntro', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              {/* Image 1 Upload: Main Top-Left Image */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                  Main Top-Left Image (Racing/Boy Photo) <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 600 px (Square 1:1)</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img
                    src={getAdminValidImageUrl(formData.arcadeIntro?.mainImgUrl, arcadeBoy)}
                    alt="Main Photo Preview"
                    style={{ width: '80px', height: '60px', borderRadius: '10px', objectFit: 'cover', border: '1.5px solid #38bdf8' }}
                  />
                  <label style={{
                    background: '#38bdf8',
                    color: '#fff',
                    padding: '10px 18px',
                    borderRadius: '12px',
                    fontWeight: '800',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Main Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading main image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.arcadeIntro || {}), mainImgUrl: res.url };
                          setFormData(prev => ({ ...prev, arcadeIntro: updated }));
                          await persistSectionToDatabase('arcadeIntro', updated);
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {formData.arcadeIntro?.mainImgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('arcadeIntro', 'mainImgUrl', '')}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '8px 14px', borderRadius: '10px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
                <AdminAltInput
                  label="🏷️ Main Photo Alt Text (SEO Keyword)"
                  value={formData.arcadeIntro?.mainImgAlt || ''}
                  onChange={(e) => handleFieldChange('arcadeIntro', 'mainImgAlt', e.target.value)}
                  placeholder="e.g. Commercial Arcade Game Machine Setup in India - Winera International"
                />
              </div>

              {/* Image 2 Upload: Secondary Bottom-Right Image */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                  Secondary Bottom-Right Image (Arcade Arena Overview) <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 500 × 380 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img
                    src={getAdminValidImageUrl(formData.arcadeIntro?.secondaryImgUrl, arcadeHall)}
                    alt="Secondary Photo Preview"
                    style={{ width: '80px', height: '60px', borderRadius: '10px', objectFit: 'cover', border: '1.5px solid #38bdf8' }}
                  />
                  <label style={{
                    background: '#38bdf8',
                    color: '#fff',
                    padding: '10px 18px',
                    borderRadius: '12px',
                    fontWeight: '800',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Secondary Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading secondary image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.arcadeIntro || {}), secondaryImgUrl: res.url };
                          setFormData(prev => ({ ...prev, arcadeIntro: updated }));
                          await persistSectionToDatabase('arcadeIntro', updated);
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {formData.arcadeIntro?.secondaryImgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('arcadeIntro', 'secondaryImgUrl', '')}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '8px 14px', borderRadius: '10px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
                <AdminAltInput
                  label="🏷️ Secondary Photo Alt Text (SEO Keyword)"
                  value={formData.arcadeIntro?.secondaryImgAlt || ''}
                  onChange={(e) => handleFieldChange('arcadeIntro', 'secondaryImgAlt', e.target.value)}
                  placeholder="e.g. Commercial Arcade Arena Zone Overview - Winera"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Floating Pill Tag Text
                </label>
                <input
                  type="text"
                  value={formData.arcadeIntro?.floatingTag || 'Set Up Arcade Arena Now !'}
                  onChange={(e) => handleFieldChange('arcadeIntro', 'floatingTag', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Section Description Paragraph"
                  rows={4}
                  value={formData.arcadeIntro?.desc !== undefined ? formData.arcadeIntro.desc : "Winera International Pvt. Ltd is a trusted arcade games manufacturer and supplier of premium arcade machines, sourced and serviced end-to-end across 50+ cities. With over 15 years of industry expertise, we source every arcade game machine from established global manufacturers and configure it with modern coin, card, or ticket-based redemption systems to match your venue's requirements"}
                  onChange={(val) => handleFieldChange('arcadeIntro', 'desc', val)}
                  placeholder="Enter arcade section description..."
                />
              </div>

              {/* Feature 1: Commercial Durability */}
              <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Feature 1 Control</h4>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Feature 1 Title</label>
                  <input
                    type="text"
                    value={formData.arcadeIntro?.feature1Title || 'Commercial Durability'}
                    onChange={(e) => handleFieldChange('arcadeIntro', 'feature1Title', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <RichTextareaWithEditor
                    label="Feature 1 Description"
                    rows={3}
                    value={formData.arcadeIntro?.feature1Desc !== undefined ? formData.arcadeIntro.feature1Desc : "Before delivery, each unit goes through a commercial-grade durability check built for high-footfall environments like malls, hotels, and entertainment centres, not casual or residential use."}
                    onChange={(val) => handleFieldChange('arcadeIntro', 'feature1Desc', val)}
                    placeholder="Enter feature 1 description..."
                  />
                </div>
              </div>

              {/* Feature 2: Installation Network */}
              <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Feature 2 Control</h4>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Feature 2 Title</label>
                  <input
                    type="text"
                    value={formData.arcadeIntro?.feature2Title || 'Installation Network'}
                    onChange={(e) => handleFieldChange('arcadeIntro', 'feature2Title', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <RichTextareaWithEditor
                    label="Feature 2 Description"
                    rows={3}
                    value={formData.arcadeIntro?.feature2Desc !== undefined ? formData.arcadeIntro.feature2Desc : "From sourcing to installation and after-sales support, our own team handles the entire arcade game zone setup process, not a third-party contractor."}
                    onChange={(val) => handleFieldChange('arcadeIntro', 'feature2Desc', val)}
                    placeholder="Enter feature 2 description..."
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    Watch Video Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.arcadeIntro?.videoBtnText || 'Watch Video'}
                    onChange={(e) => handleFieldChange('arcadeIntro', 'videoBtnText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    Watch Video Link URL <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>🎬 Video Ratio: 16:9 Landscape (YouTube / MP4)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.arcadeIntro?.videoLink || 'https://youtube.com'}
                    onChange={(e) => handleFieldChange('arcadeIntro', 'videoLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    Get Quote Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.arcadeIntro?.quoteBtnText || 'Get a Quote'}
                    onChange={(e) => handleFieldChange('arcadeIntro', 'quoteBtnText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    Get Quote Link URL
                  </label>
                  <input
                    type="text"
                    value={formData.arcadeIntro?.quoteLink || 'https://wa.me/919157873576'}
                    onChange={(e) => handleFieldChange('arcadeIntro', 'quoteLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  WhatsApp Auto Pre-filled Message <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>💬 Auto Text sent on WhatsApp</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Hello Winera International! I want to inquire about Commercial Arcade Game Machines. Please share catalog and details. [Ref: Arcade Games Page]"
                  value={formData.arcadeIntro?.waMessage !== undefined && formData.arcadeIntro.waMessage !== '' ? formData.arcadeIntro.waMessage : "Hello Winera International! I want to inquire about Commercial Arcade Game Machines. Please share catalog and details. [Ref: Arcade Games Page]"}
                  onChange={(e) => handleFieldChange('arcadeIntro', 'waMessage', e.target.value)}
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

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => {
                    const currentIntro = { ...(formData.arcadeIntro || {}) };
                    if (typeof currentIntro.desc === 'string') {
                      currentIntro.desc = currentIntro.desc.replace(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|[\w\.,\(\)]+)\s*\n+\s*([a-z])/g, '$1 $2').trim();
                    }
                    persistSectionToDatabase('arcadeIntro', currentIntro);
                  }}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Arcade Intro Section
                </button>
              </div>
            </div>
          )}

          {/* ARCADE GAME CATEGORIES & PRODUCTS MANAGER FORM */}
          {activeSection === 'arcadeCategories' && (() => {
            const defaultArcadeCategories = DEFAULT_ARCADE_CATEGORIES;
            const masterCards = arcadeMasterCards || [];

            const legacyMockups = new Set([
              'super air hockey', 'super-air-hockey',
              'puck carnival air hockey', 'puck-carnival-air-hockey',
              'dazzling air hockey - multi puck', 'dazzling-air-hockey-multi-puck', 'dazzling-air-hockey',
              'aurora air hockey', 'aurora-air-hockey',
              'ocha air hockey', 'ocha-air-hockey',
              'aero x air hockey', 'aero-x-air-hockey',
              'toy story plush claw machine', 'toy-story-plush-claw-machine',
              'lucky catcher crane machine', 'lucky-catcher-crane-machine'
            ]);

            const deletedSlugs = new Set((formData?.arcadeCategories?.deletedSlugs || []).map(s => (s || '').toLowerCase().trim()));

            let categoriesList = defaultArcadeCategories;
            let cardsList = masterCards.filter(mc => {
              const k1 = (mc.slug || '').toLowerCase().trim();
              const k2 = (mc.name || mc.title || '').toLowerCase().trim();
              return !deletedSlugs.has(k1) && !deletedSlugs.has(k2) && !legacyMockups.has(k1) && !legacyMockups.has(k2);
            });

            if (formData.arcadeCategories) {
              let rawCards = null;
              if (Array.isArray(formData.arcadeCategories.cards) && formData.arcadeCategories.cards.length > 0) {
                rawCards = formData.arcadeCategories.cards;
              } else if (Array.isArray(formData.arcadeCategories) && formData.arcadeCategories.length > 0) {
                rawCards = formData.arcadeCategories;
              }

              if (rawCards) {
                const cmsMap = new Map();
                rawCards.forEach(c => {
                  const k1 = (c.slug || '').toLowerCase().trim();
                  const k2 = (c.name || c.title || '').toLowerCase().trim();
                  if (k1 && !deletedSlugs.has(k1) && !legacyMockups.has(k1) && !legacyMockups.has(k2)) cmsMap.set(k1, c);
                });
                cardsList = cardsList.map(mc => {
                  const k = (mc.slug || mc.name || mc.title || '').toLowerCase().trim();
                  if (!cmsMap.has(k)) return mc;
                  const cmsItem = cmsMap.get(k);
                  const cmsGal = Array.isArray(cmsItem.gallery) ? cmsItem.gallery.filter(Boolean) : [];
                  const mcGal = Array.isArray(mc.gallery) ? mc.gallery.filter(Boolean) : [];
                  const bestGal = cmsGal.length > mcGal.length ? cmsGal : (mcGal.length > 0 ? mcGal : cmsGal);
                  return { ...mc, ...cmsItem, gallery: bestGal };
                });
                rawCards.forEach(cc => {
                  const k1 = (cc.slug || '').toLowerCase().trim();
                  const k2 = (cc.name || cc.title || '').toLowerCase().trim();
                  if (cc.isUserCreated && k1 && !deletedSlugs.has(k1) && !legacyMockups.has(k1) && !legacyMockups.has(k2) && !cardsList.some(mc => (mc.slug || mc.name || mc.title || '').toLowerCase().trim() === k1)) {
                    cardsList.unshift(cc);
                  }
                });
              }

              if (Array.isArray(formData.arcadeCategories.categoriesList) && formData.arcadeCategories.categoriesList.length > 0) {
                categoriesList = formData.arcadeCategories.categoriesList;
              }
            }

            const activeFilterCat = adminProjectFilterCat || "All";
            const categoryFiltered = activeFilterCat === "All"
              ? cardsList
              : cardsList.filter(item => (item.category || item.tag || "").toLowerCase().includes(activeFilterCat.toLowerCase()));

            const searchFiltered = adminArcadeSearch.trim()
              ? categoryFiltered.filter(item => {
                const q = adminArcadeSearch.toLowerCase().trim();
                const name = (item.name || item.title || "").toLowerCase();
                const cat = (item.category || item.tag || "").toLowerCase();
                return name.includes(q) || cat.includes(q);
              })
              : categoryFiltered;

            const adminItemsPerPage = 24;
            const adminTotalPages = Math.max(1, Math.ceil(searchFiltered.length / adminItemsPerPage));
            const validAdminPage = Math.min(adminArcadePage, adminTotalPages);
            const startAdminIdx = (validAdminPage - 1) * adminItemsPerPage;
            const filteredCards = searchFiltered.slice(startAdminIdx, startAdminIdx + adminItemsPerPage);

            const handleAddArcadeCategory = async () => {
              let val = (newCategoryInput || '').trim();
              if (!val) {
                const promptVal = window.prompt('Enter new arcade category name:');
                if (!promptVal || !promptVal.trim()) return;
                val = promptVal.trim();
              }
              if (categoriesList.some(c => c.toLowerCase() === val.toLowerCase())) {
                alert(`Category "${val}" already exists.`);
                return;
              }
              const newCats = [...categoriesList, val];
              const updated = { categoriesList: newCats, cards: cardsList };
              setFormData(prev => ({ ...prev, arcadeCategories: updated }));
              await persistSectionToDatabase('arcadeCategories', updated);
              setStatusMsg(`Category "${val}" added successfully!`);
              setNewCategoryInput('');
            };

            return (
              <div className="winera-admin-card" style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '24px' }}>

                {/* Header & Add Project Button */}
                <div className="winera-admin-flex-header" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '14px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>Discover our Products (Categories & Cards Manager)</h3>
                    <p style={{ fontSize: '12.5px', color: '#64748b', margin: '4px 0 0' }}>Manage category tabs sidebar, add new products, edit product photos & details across all {cardsList.length} products.</p>
                  </div>
                  <button
                    onClick={() => openModal('add', null, null, 'arcadeCategories')}
                    style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)' }}
                  >
                    <Plus style={{ width: '16px', height: '16px' }} /> Add New Arcade Product Card
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
                          setAdminProjectFilterCat(e.target.value);
                          setAdminArcadePage(1);
                        }}
                        style={{ padding: '8px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '700', background: '#ffffff', color: '#0284c7', maxWidth: '100%' }}
                      >
                        <option value="All">All Categories ({cardsList.length})</option>
                        {categoriesList.map((cat, idx) => {
                          const count = cardsList.filter(item => (item.category || "").toLowerCase().includes(cat.toLowerCase())).length;
                          return (
                            <option key={idx} value={cat}>{cat} ({count})</option>
                          );
                        })}
                      </select>

                      {/* Search in Admin */}
                      <input
                        type="text"
                        placeholder="Search by game name..."
                        value={adminArcadeSearch}
                        onChange={(e) => {
                          setAdminArcadeSearch(e.target.value);
                          setAdminArcadePage(1);
                        }}
                        style={{ padding: '8px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', width: '220px', maxWidth: '100%' }}
                      />
                    </div>

                    {/* Add New Category Control */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="Type new category name..."
                        value={newCategoryInput}
                        onChange={(e) => setNewCategoryInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddArcadeCategory();
                          }
                        }}
                        style={{ padding: '8px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', width: '200px', maxWidth: '100%' }}
                      />
                      <button
                        type="button"
                        onClick={handleAddArcadeCategory}
                        style={{ background: '#0F172B', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '10px', fontSize: '12.5px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Plus style={{ width: '15px', height: '15px' }} /> Add Category
                      </button>
                    </div>
                  </div>

                  {/* Category Pills List */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748b', alignSelf: 'center', marginRight: '4px' }}>Category Sidebar Tabs:</span>
                    {categoriesList.map((cat, idx) => (
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
                          setAdminProjectFilterCat(cat);
                          setAdminArcadePage(1);
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
                              setFormData(prev => ({ ...prev, arcadeCategories: updated }));
                              persistSectionToDatabase('arcadeCategories', updated);
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

                {/* 3-COLUMN VISUAL CARDS GRID (MATCHING USER SIDE UI 1:1) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                      User-Side Style Product Cards Grid ({searchFiltered.length} Total Matching) <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Card Image: 1:1 Square</span>
                    </h4>
                    {adminTotalPages > 1 && (
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748b' }}>
                        Page {validAdminPage} of {adminTotalPages}
                      </div>
                    )}
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                    gap: '20px'
                  }}>
                    {filteredCards.map((card, idx) => {
                      const realIdx = cardsList.indexOf(card) !== -1
                        ? cardsList.indexOf(card)
                        : cardsList.findIndex(c => (c._id && card._id && c._id === card._id) || (c.slug && card.slug && c.slug !== 'new-arcade-game' && c.slug === card.slug) || (c.title && card.title && c.title === card.title));
                      const displayTitle = card.name || card.title || "Arcade Machine";
                      const displayImg = getAdminValidImageUrl(
                        card.imageUrl || card.img || arcadeProductImageMap[displayTitle] || arcadeProductImageMap[card.title] || arcadeProductImageMap[card.name],
                        arcadeProductImageMap[displayTitle] || bikeArcade
                      );

                      return (
                        <div
                          key={idx}
                          style={{
                            background: 'linear-gradient(180deg, #bae6fd 0%, #ffffff 100%)',
                            borderRadius: '24px',
                            padding: '16px',
                            boxShadow: '0 10px 25px rgba(56, 189, 248, 0.08)',
                            border: '1.5px solid #e0f2fe',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            position: 'relative'
                          }}
                        >
                          {/* Image Box */}
                          <div style={{
                            width: '100%',
                            aspectRatio: '1 / 1',
                            borderRadius: '18px',
                            overflow: 'hidden',
                            marginBottom: '14px',
                            background: '#ffffff',
                            boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
                            border: '4px solid #ffffff',
                            padding: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <img
                              src={displayImg}
                              alt={displayTitle}
                              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                          </div>

                          {/* Category Badge */}
                          <div style={{ marginBottom: '6px' }}>
                            <span style={{ background: '#0284c7', color: '#ffffff', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '800' }}>
                              {card.category || 'Arcade Games'}
                            </span>
                          </div>

                          {/* Title */}
                          <h4 style={{
                            fontSize: '1rem',
                            fontWeight: '800',
                            color: '#0f172a',
                            lineHeight: 1.3,
                            margin: '4px 0 14px',
                            minHeight: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {displayTitle}
                          </h4>

                          {/* Action Buttons */}
                          <div style={{ display: 'flex', gap: '8px', width: '100%', justifyContent: 'center', marginTop: 'auto' }}>
                            <button
                              onClick={() => openModal('edit', realIdx !== -1 ? realIdx : idx, card, 'arcadeCategories')}
                              style={{ flex: 1, background: '#38bdf8', color: '#ffffff', border: 'none', padding: '8px 12px', borderRadius: '10px', cursor: 'pointer', fontWeight: '800', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                            >
                              <Edit2 style={{ width: '13px', height: '13px' }} /> Edit
                            </button>
                            <button
                              onClick={() => {
                                setDeleteConfirmModal({
                                  title: 'Delete Product Card?',
                                  message: `Are you sure you want to delete '${displayTitle}'?`,
                                  onConfirm: async () => {
                                    const targetIndex = realIdx !== -1 ? realIdx : idx;
                                    const newCards = cardsList.filter((_, i) => i !== targetIndex);
                                    const targetSlug = (card.slug || card.title || card.name || '').toLowerCase().trim();
                                    const currentDeleted = Array.isArray(formData?.arcadeCategories?.deletedSlugs) ? formData.arcadeCategories.deletedSlugs : [];
                                    const updatedDeletedSlugs = Array.from(new Set([...currentDeleted, targetSlug]));

                                    const updated = {
                                      categoriesList,
                                      cards: newCards,
                                      deletedSlugs: updatedDeletedSlugs
                                    };
                                    setFormData(prev => ({ ...prev, arcadeCategories: updated }));

                                    setLoadingSection('arcadeCategories');
                                    try {
                                      await persistSectionToDatabase('arcadeCategories', updated);
                                      await refreshContent();
                                      setStatusMsg(`Product '${displayTitle}' deleted successfully!`);
                                    } catch (err) {
                                      console.error("Delete arcade card error:", err);
                                      setStatusMsg('Delete error: ' + (err.response?.data?.message || err.message));
                                    } finally {
                                      setLoadingSection('');
                                    }
                                  }
                                });
                              }}
                              style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '8px 12px', borderRadius: '10px', cursor: 'pointer', fontWeight: '800', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                            >
                              <Trash2 style={{ width: '13px', height: '13px' }} /> Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Admin Pagination Controls */}
                  {adminTotalPages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
                      <button
                        onClick={() => setAdminArcadePage(p => Math.max(1, p - 1))}
                        disabled={validAdminPage <= 1}
                        style={{
                          background: validAdminPage <= 1 ? '#e2e8f0' : '#0284c7',
                          color: validAdminPage <= 1 ? '#94a3b8' : '#ffffff',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '10px',
                          fontWeight: '800',
                          fontSize: '13px',
                          cursor: validAdminPage <= 1 ? 'not-allowed' : 'pointer'
                        }}
                      >
                        Previous
                      </button>
                      <span style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>
                        Page {validAdminPage} of {adminTotalPages} ({searchFiltered.length} items)
                      </span>
                      <button
                        onClick={() => setAdminArcadePage(p => Math.min(adminTotalPages, p + 1))}
                        disabled={validAdminPage >= adminTotalPages}
                        style={{
                          background: validAdminPage >= adminTotalPages ? '#e2e8f0' : '#0284c7',
                          color: validAdminPage >= adminTotalPages ? '#94a3b8' : '#ffffff',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '10px',
                          fontWeight: '800',
                          fontSize: '13px',
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

          {/* BUILT FOR COMMERCIAL USE SECTION FORM */}
          {activeSection === 'arcadeCommercial' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Built for Commercial Use Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Title (Use *word* for Cyan Highlight)
                </label>
                <input
                  type="text"
                  value={formData.arcadeCommercial?.title || 'Built for *Commercial Use*'}
                  onChange={(e) => handleFieldChange('arcadeCommercial', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>
              {/* Team Photo Upload */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                  Team Photo (Right Graphic Frame) <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img
                    src={getAdminValidImageUrl(formData.arcadeCommercial?.teamImgUrl, commercialTeam)}
                    alt="Team Photo Preview"
                    style={{ width: '80px', height: '60px', borderRadius: '10px', objectFit: 'cover', border: '1.5px solid #38bdf8' }}
                  />
                  <label style={{
                    background: '#38bdf8',
                    color: '#fff',
                    padding: '10px 18px',
                    borderRadius: '12px',
                    fontWeight: '800',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Team Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading team photo...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.arcadeCommercial || {}), teamImgUrl: res.url };
                          setFormData(prev => ({ ...prev, arcadeCommercial: updated }));
                          await persistSectionToDatabase('arcadeCommercial', updated);
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {formData.arcadeCommercial?.teamImgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('arcadeCommercial', 'teamImgUrl', '')}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '8px 14px', borderRadius: '10px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
                <AdminAltInput
                  label="🏷️ Team Photo Alt Text (SEO Keyword)"
                  value={formData.arcadeCommercial?.teamImgAlt || ''}
                  onChange={(e) => handleFieldChange('arcadeCommercial', 'teamImgAlt', e.target.value)}
                  placeholder="e.g. Winera Commercial Arcade Game Setup & Support Team"
                />
              </div>

              {/* Point 1 Control */}
              <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Checkmark Block 1</h4>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Title</label>
                  <input
                    type="text"
                    value={formData.arcadeCommercial?.point1Title || 'Built for Real Commercial Footfall'}
                    onChange={(e) => handleFieldChange('arcadeCommercial', 'point1Title', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <RichTextareaWithEditor
                    label="Description Paragraphs"
                    rows={4}
                    value={formData.arcadeCommercial?.point1Text !== undefined ? formData.arcadeCommercial.point1Text : "Arcade machines in Indian malls and entertainment centres often run ten or more hours a day, handled mostly by children. Equipment sourced without that environment in mind tends to fail within weeks of installation.\n\nWe at Winera International prioritise machines rated for sustained commercial cycles over units designed for lighter, residential, or occasional use, which is why our installations typically need far less frequent servicing than machines bought through unverified import channels."}
                    onChange={(val) => handleFieldChange('arcadeCommercial', 'point1Text', val)}
                    placeholder="Enter block 1 paragraphs..."
                  />
                </div>
              </div>

              {/* Point 2 Control */}
              <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Checkmark Block 2</h4>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Title</label>
                  <input
                    type="text"
                    value={formData.arcadeCommercial?.point2Title || 'What Will Your Arcade Game Zone Actually Earn?'}
                    onChange={(e) => handleFieldChange('arcadeCommercial', 'point2Title', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <RichTextareaWithEditor
                    label="Description Paragraphs"
                    rows={4}
                    value={formData.arcadeCommercial?.point2Text !== undefined ? formData.arcadeCommercial.point2Text : "An arcade game zone is not a single machine decision, it is a business decision about which machines, in which combination, at what price point, will generate the strongest return for your specific venue. Most suppliers hand you a catalogue and leave that calculation entirely to you.\n\nWinera International starts there. Before any machine is recommended, our team works out the numbers for your specific floor size, daily footfall, and target visitor age group projected revenue per machine category, daily session estimates, maintenance costs per year, and a realistic break-even timeline. Not a generic percentage claim. Your actual numbers, for your actual venue."}
                    onChange={(val) => handleFieldChange('arcadeCommercial', 'point2Text', val)}
                    placeholder="Enter block 2 paragraphs..."
                  />
                </div>
              </div>

              {/* WhatsApp Action Button Controls */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    WhatsApp Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.arcadeCommercial?.ctaBtnText || 'Talk to an ROI Expert'}
                    onChange={(e) => handleFieldChange('arcadeCommercial', 'ctaBtnText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    WhatsApp Link URL
                  </label>
                  <input
                    type="text"
                    value={(formData.arcadeCommercial?.ctaLink && formData.arcadeCommercial.ctaLink.split('?')[0]) || 'https://wa.me/919157873576'}
                    onChange={(e) => {
                      const baseLink = e.target.value;
                      const msg = formData.arcadeCommercial?.waMessage || "Hello Winera International! I want to talk to an ROI Expert for setup & commercial guidance. Please share details. [Ref: Arcade Game Page]";
                      const updatedLink = msg ? `${baseLink.split('?')[0]}?text=${encodeURIComponent(msg)}` : baseLink;
                      handleFieldChange('arcadeCommercial', 'ctaLink', updatedLink);
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
                    if (formData.arcadeCommercial?.waMessage !== undefined && formData.arcadeCommercial?.waMessage !== '') return formData.arcadeCommercial.waMessage;
                    if (formData.arcadeCommercial?.ctaLink && formData.arcadeCommercial.ctaLink.includes('text=')) {
                      try {
                        const match = formData.arcadeCommercial.ctaLink.match(/text=([^&]+)/);
                        if (match && match[1]) return decodeURIComponent(match[1]);
                      } catch (err) { }
                    }
                    return "Hello Winera International! I want to talk to an ROI Expert for setup & commercial guidance. Please share details. [Ref: Arcade Game Page]";
                  })()}
                  onChange={(e) => {
                    const newMsg = e.target.value;
                    const baseLink = (formData.arcadeCommercial?.ctaLink && formData.arcadeCommercial.ctaLink.split('?')[0]) || 'https://wa.me/919157873576';
                    const updatedLink = newMsg ? `${baseLink}?text=${encodeURIComponent(newMsg)}` : baseLink;
                    const updated = {
                      ...(formData.arcadeCommercial || {}),
                      waMessage: newMsg,
                      ctaLink: updatedLink
                    };
                    setFormData(prev => ({ ...prev, arcadeCommercial: updated }));
                  }}
                  placeholder="e.g. Hello Winera International! I want to talk to an ROI Expert..."
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontWeight: '500', lineHeight: 1.5 }}
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arcadeCommercial', formData.arcadeCommercial || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Commercial Use Section
                </button>
              </div>
            </div>
          )}

          {/* WHY CHOOSE WINERA ARCADE FORM */}
          {activeSection === 'arcadeWhyUs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Why Choose Winera Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Title (Use *word* for Cyan Accent)
                </label>
                <input
                  type="text"
                  value={formData.arcadeWhyUs?.title !== undefined ? formData.arcadeWhyUs.title : 'Why Choose *Winera International*'}
                  onChange={(e) => handleFieldChange('arcadeWhyUs', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              {/* Dynamic Feature Cards List */}
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                    Why Choose Us Feature Items ({((Array.isArray(formData.arcadeWhyUs?.items) && formData.arcadeWhyUs.items.length > 0) ? formData.arcadeWhyUs.items : [
                      { title: "15+ Years In The Industry", desc: "Supplying And Supporting Indoor Amusement Equipment Across India" },
                      { title: "Successful Installations", desc: "From Malls To Resorts, Our Track Record Speaks Through Completed Projects, Not Just Promises." },
                      { title: "Direct Sourcing", desc: "We Work Straight With Global Manufacturers — Consistent Quality, No Unnecessary Markup." },
                      { title: "Pricing That Makes Sense", desc: "No Hidden Costs, No Inflated Resale Pricing — Fair Rates Backed By Direct Sourcing" },
                      { title: "Local Support In 50+ Cities", desc: "Our Own Technicians Install And Service Every Machine — No Waiting On Overseas Suppliers." },
                      { title: "Easy To Maintain", desc: "Equipment Rated For Heavy Daily Commercial Use — Fewer Breakdowns, More Consistent Revenue" },
                      { title: "Solutions That Fit Your Space", desc: "Every Recommendation Based On Your Venue Size, Footfall, And Budget — Never One-Size-Fits-All." }
                    ]).length} Items)
                  </h4>

                  <button
                    onClick={async () => {
                      const defaultItems = [
                        { title: "15+ Years In The Industry", desc: "Supplying And Supporting Indoor Amusement Equipment Across India" },
                        { title: "Successful Installations", desc: "From Malls To Resorts, Our Track Record Speaks Through Completed Projects, Not Just Promises." },
                        { title: "Direct Sourcing", desc: "We Work Straight With Global Manufacturers — Consistent Quality, No Unnecessary Markup." },
                        { title: "Pricing That Makes Sense", desc: "No Hidden Costs, No Inflated Resale Pricing — Fair Rates Backed By Direct Sourcing" },
                        { title: "Local Support In 50+ Cities", desc: "Our Own Technicians Install And Service Every Machine — No Waiting On Overseas Suppliers." },
                        { title: "Easy To Maintain", desc: "Equipment Rated For Heavy Daily Commercial Use — Fewer Breakdowns, More Consistent Revenue" },
                        { title: "Solutions That Fit Your Space", desc: "Every Recommendation Based On Your Venue Size, Footfall, And Budget — Never One-Size-Fits-All." }
                      ];
                      const currentItems = (Array.isArray(formData.arcadeWhyUs?.items) && formData.arcadeWhyUs.items.length > 0)
                        ? formData.arcadeWhyUs.items
                        : defaultItems;

                      const updatedItems = [...currentItems, { title: "New Feature Title", desc: "Description text..." }];
                      const currentTitle = (formData.arcadeWhyUs?.title !== undefined && formData.arcadeWhyUs?.title !== null && formData.arcadeWhyUs.title.trim() !== '')
                        ? formData.arcadeWhyUs.title
                        : 'Why Choose *Winera International*';
                      const updatedSection = {
                        ...(formData.arcadeWhyUs || {}),
                        title: currentTitle,
                        items: updatedItems
                      };
                      setFormData(prev => ({
                        ...prev,
                        arcadeWhyUs: updatedSection
                      }));
                      await persistSectionToDatabase('arcadeWhyUs', updatedSection);
                    }}
                    style={{
                      background: '#38bdf8',
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontSize: '12.5px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Plus style={{ width: '14px', height: '14px' }} /> Add Feature Item
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {(() => {
                    const defaultItems = [
                      { title: "15+ Years In The Industry", desc: "Supplying And Supporting Indoor Amusement Equipment Across India" },
                      { title: "Successful Installations", desc: "From Malls To Resorts, Our Track Record Speaks Through Completed Projects, Not Just Promises." },
                      { title: "Direct Sourcing", desc: "We Work Straight With Global Manufacturers — Consistent Quality, No Unnecessary Markup." },
                      { title: "Pricing That Makes Sense", desc: "No Hidden Costs, No Inflated Resale Pricing — Fair Rates Backed By Direct Sourcing" },
                      { title: "Local Support In 50+ Cities", desc: "Our Own Technicians Install And Service Every Machine — No Waiting On Overseas Suppliers." },
                      { title: "Easy To Maintain", desc: "Equipment Rated For Heavy Daily Commercial Use — Fewer Breakdowns, More Consistent Revenue" },
                      { title: "Solutions That Fit Your Space", desc: "Every Recommendation Based On Your Venue Size, Footfall, And Budget — Never One-Size-Fits-All." }
                    ];

                    const itemsList = (Array.isArray(formData.arcadeWhyUs?.items) && formData.arcadeWhyUs.items.length > 0)
                      ? formData.arcadeWhyUs.items
                      : (Array.isArray(formData.arcadeWhyUs?.topItems) && formData.arcadeWhyUs.topItems.length > 0)
                        ? [...formData.arcadeWhyUs.topItems, ...(formData.arcadeWhyUs.bottomItems || [])]
                        : defaultItems;

                    return itemsList.map((item, idx) => (
                      <div key={idx} style={{ background: '#ffffff', padding: '14px 18px', borderRadius: '14px', border: '1px solid #cbd5e1', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontWeight: '800', fontSize: '12px', color: '#38bdf8' }}>Feature Item #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={async () => {
                              const updated = itemsList.filter((_, i) => i !== idx);
                              const currentTitle = (formData.arcadeWhyUs?.title !== undefined && formData.arcadeWhyUs?.title !== null && formData.arcadeWhyUs.title.trim() !== '')
                                ? formData.arcadeWhyUs.title
                                : 'Why Choose *Winera International*';
                              const updatedSection = {
                                ...(formData.arcadeWhyUs || {}),
                                title: currentTitle,
                                items: updated
                              };
                              setFormData(prev => ({
                                ...prev,
                                arcadeWhyUs: updatedSection
                              }));
                              await persistSectionToDatabase('arcadeWhyUs', updatedSection);
                            }}
                            style={{
                              background: '#fee2e2',
                              color: '#dc2626',
                              border: 'none',
                              padding: '4px 10px',
                              borderRadius: '8px',
                              fontSize: '11px',
                              fontWeight: '800',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Trash2 style={{ width: '12px', height: '12px' }} /> Delete
                          </button>
                        </div>

                        <input
                          type="text"
                          placeholder="Feature Title"
                          value={item.title || ''}
                          onChange={(e) => {
                            const updated = [...itemsList];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            handleFieldChange('arcadeWhyUs', 'items', updated);
                          }}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}
                        />
                        <div style={{ marginTop: '8px' }}>
                          <RichTextareaWithEditor
                            label="Feature Description"
                            rows={2}
                            placeholder="Feature Description"
                            value={item.desc || ''}
                            onChange={(val) => {
                              const updated = [...itemsList];
                              updated[idx] = { ...updated[idx], desc: val };
                              handleFieldChange('arcadeWhyUs', 'items', updated);
                            }}
                          />
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => {
                    const currentTitle = (formData.arcadeWhyUs?.title !== undefined && formData.arcadeWhyUs?.title !== null && formData.arcadeWhyUs.title.trim() !== '')
                      ? formData.arcadeWhyUs.title
                      : 'Why Choose *Winera International*';
                    const defaultItems = [
                      { title: "15+ Years In The Industry", desc: "Supplying And Supporting Indoor Amusement Equipment Across India" },
                      { title: "Successful Installations", desc: "From Malls To Resorts, Our Track Record Speaks Through Completed Projects, Not Just Promises." },
                      { title: "Direct Sourcing", desc: "We Work Straight With Global Manufacturers — Consistent Quality, No Unnecessary Markup." },
                      { title: "Pricing That Makes Sense", desc: "No Hidden Costs, No Inflated Resale Pricing — Fair Rates Backed By Direct Sourcing" },
                      { title: "Local Support In 50+ Cities", desc: "Our Own Technicians Install And Service Every Machine — No Waiting On Overseas Suppliers." },
                      { title: "Easy To Maintain", desc: "Equipment Rated For Heavy Daily Commercial Use — Fewer Breakdowns, More Consistent Revenue" },
                      { title: "Solutions That Fit Your Space", desc: "Every Recommendation Based On Your Venue Size, Footfall, And Budget — Never One-Size-Fits-All." }
                    ];
                    const itemsToSave = (Array.isArray(formData.arcadeWhyUs?.items) && formData.arcadeWhyUs.items.length > 0)
                      ? formData.arcadeWhyUs.items
                      : (Array.isArray(formData.arcadeWhyUs?.topItems) && formData.arcadeWhyUs.topItems.length > 0)
                        ? [...formData.arcadeWhyUs.topItems, ...(formData.arcadeWhyUs.bottomItems || [])]
                        : defaultItems;

                    const dataToSave = {
                      title: currentTitle,
                      subtitle: formData.arcadeWhyUs?.subtitle || "We are direct arcade game machines manufacturer and supplier...",
                      items: itemsToSave
                    };
                    setFormData(prev => ({
                      ...prev,
                      arcadeWhyUs: dataToSave
                    }));
                    persistSectionToDatabase('arcadeWhyUs', dataToSave);
                  }}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Why Choose Section
                </button>
              </div>
            </div>
          )}


          {/* ARCADE CTA BANNER SECTION FORM */}
          {activeSection === 'arcadeCta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Arcade CTA Banner Section</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Yellow Highlighted Words (e.g. "NEED ANY")
                </label>
                <input
                  type="text"
                  value={formData.arcadeCta?.yellowText !== undefined ? formData.arcadeCta.yellowText : "NEED ANY"}
                  onChange={(e) => handleFieldChange('arcadeCta', 'yellowText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Cyan Highlighted Words (e.g. "CONSULTATIONS ?")
                </label>
                <input
                  type="text"
                  value={formData.arcadeCta?.cyanText !== undefined ? formData.arcadeCta.cyanText : "CONSULTATIONS ?"}
                  onChange={(e) => handleFieldChange('arcadeCta', 'cyanText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="White Main Subtitle Text"
                  rows={2}
                  value={formData.arcadeCta?.whiteText !== undefined ? formData.arcadeCta.whiteText : "We're Ready To Give Answers To Your Question."}
                  onChange={(val) => handleFieldChange('arcadeCta', 'whiteText', val)}
                  placeholder="We're Ready To Give Answers To Your Question."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    CTA Button Label Text
                  </label>
                  <input
                    type="text"
                    value={formData.arcadeCta?.buttonText !== undefined ? formData.arcadeCta.buttonText : "Get Quote Now"}
                    onChange={(e) => handleFieldChange('arcadeCta', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    CTA Button Target Link URL
                  </label>
                  <input
                    type="text"
                    value={formData.arcadeCta?.buttonLink !== undefined ? formData.arcadeCta.buttonLink : "https://wa.me/919157873576"}
                    onChange={(e) => handleFieldChange('arcadeCta', 'buttonLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              {/* Background Banner Image Upload */}
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Background Banner Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <img
                    src={getAdminValidImageUrl(formData.arcadeCta?.bgUrl, arcadeCtaBg)}
                    alt="Banner Preview"
                    style={{ width: '120px', height: '60px', borderRadius: '10px', objectFit: 'cover', border: '1.5px solid #38bdf8' }}
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
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)'
                  }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Banner Image
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading banner image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          handleFieldChange('arcadeCta', 'bgUrl', res.url);
                          setStatusMsg('Banner image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                    />
                  </label>
                  {formData.arcadeCta?.bgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('arcadeCta', 'bgUrl', '')}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
                <AdminAltInput
                  label="🏷️ Banner Image Alt Text (SEO Keyword)"
                  value={formData.arcadeCta?.bgAlt || ''}
                  onChange={(e) => handleFieldChange('arcadeCta', 'bgAlt', e.target.value)}
                  placeholder="e.g. Need Any Consultations - Commercial Arcade Setup by Winera"
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arcadeCta', formData.arcadeCta || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Arcade CTA Banner
                </button>
              </div>
            </div>
          )}

          {/* ARCADE PAGE FAQS FORM */}
          {activeSection === 'arcadeFaqs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Arcade Page FAQs</h3>
                  <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0' }}>Manage custom FAQs specific to Arcade Games page.</p>
                </div>
                <button
                  onClick={() => openModal('add', null, null, 'arcadeFaqs')}
                  style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)' }}
                >
                  <Plus style={{ width: '16px', height: '16px' }} /> Add Arcade FAQ
                </button>
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
                      const defaultArcadeFaqs = [
                        { q: "Where Can I Buy Arcade Game Machines In India?", a: "Winera International is a trusted arcade games manufacturer and supplier in India — supplying claw machines, redemption games, racing simulators, shooting games, and kiddy rides for malls, hotels, FECs, and amusement parks, with complete installation across 50+ cities by our own team." },
                        { q: "Do You Supply Coin Operated Arcade Machines In India?", a: "Yes. Winera International supplies a wide range of coin operated arcade machines in India, card-based systems, and ticket redemption arcade machines, built for commercial environments such as malls, hotels, resorts, and family entertainment centres." },
                        { q: "Can Winera International Set Up A Complete Arcade Game Zone Setup?", a: "Yes. We handle space planning, machine selection, delivery, installation, and staff training as one connected arcade game zone setup process, not separate transactions with different vendors." },
                        { q: "What Happens If A Machine Breaks Down After Installation?", a: "Our own technicians handle servicing directly, with coverage across 50+ cities in India. You are not waiting on an overseas supplier or a disconnected logistics partner to respond." },
                        { q: "Which Businesses Typically Install Arcade Game Machines In India?", a: "Malls, hotels, resorts, and family entertainment centres are the most common buyers of arcade machines." },
                        { q: "How Long Does It Take To Install Arcade Machines?", a: "Installation timelines depend on the number of machines, your venue's readiness, and your location. We share an exact schedule as part of your quote, so you know precisely when your arcade zone will be ready." },
                        { q: "What Is The Price Of Arcade Machines In India?", a: "Arcade machine pricing in India depends on the machine category, payment mechanism, and customisation level. Because Winera International sources directly at scale, our pricing avoids the markup typical of multi-layer resellers." },
                        { q: "How Do I Get Started With Ordering Arcade Machines From Winera?", a: "Contact us via our website's contact form, WhatsApp, or call +91 91578 73576. Our team will recommend the right machine mix for your space and send a quote ASAP." },
                        { q: "Which Arcade Games Give The Best ROI For FECs And Malls In India?", a: "Ticket redemption games, claw machines, and racing simulators consistently deliver the strongest revenue per square foot in Indian FECs and malls. Winera International helps you choose the right arcade game zone machine mix based on your specific footfall, floor size, and visitor demographic — not a generic recommendation." },
                        { q: "What Is The Difference Between Coin-Operated And Card-Based Arcade Machines?", a: "Coin-operated arcade machines accept physical tokens and suit venues with casual walk-in visitors. Card-based systems use rechargeable cards — better for revenue tracking, reducing cash handling, and encouraging repeat visits through balance top-ups. Winera supplies both and advises on the right system for your venue." }
                      ];
                      const list = (Array.isArray(formData.arcadeFaqs) && formData.arcadeFaqs.length > 0) ? formData.arcadeFaqs : defaultArcadeFaqs;
                      return list.map((item, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                          <td style={{ padding: '14px 18px', fontWeight: '700', color: '#64748b' }}>{idx + 1}</td>
                          <td style={{ padding: '14px 18px', fontWeight: '800', color: '#0f172a' }}>{item.q || item.question}</td>
                          <td style={{ padding: '14px 18px', color: '#475569', fontSize: '12.5px', lineHeight: '1.4' }}>{item.a || item.answer}</td>
                          <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                            <button
                              onClick={() => openModal('edit', idx, { q: item.q || item.question, a: item.a || item.answer }, 'arcadeFaqs')}
                              style={{ background: '#e0f2fe', color: '#0284c7', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', marginRight: '8px', fontWeight: '700', fontSize: '12px' }}
                            >
                              <Edit2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Edit
                            </button>
                            <button
                              onClick={async () => {
                                const updated = list.filter((_, i) => i !== idx);
                                setFormData(prev => ({ ...prev, arcadeFaqs: updated }));
                                await persistSectionToDatabase('arcadeFaqs', updated);
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



    </>
  );
}
