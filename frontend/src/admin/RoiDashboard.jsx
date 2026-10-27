import React from 'react';
import { Upload, Plus, Trash2 } from 'lucide-react';
import RichTextareaWithEditor from '../components/RichTextareaWithEditor';
import AdminAltInput from '../components/AdminAltInput';
import { uploadImageFile } from '../services/api';

const defaultGameZoneMobileBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345484/winera_uploads/cjhcvoxksmptc84yslh2.png";
const roiBgImage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345680/winera_uploads/mf1cwyxhxusz6bepq49z.png";
const roiImg1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345680/winera_uploads/atfyiiq3xfyaasg0knig.png";
const roiBlock5Img1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345678/winera_uploads/izqazydgn5rpfaztie6u.png";
const roiBlock5Img2 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345678/winera_uploads/cxunxtrlppwkquabwexp.png";
const roiBlock5Img3 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345678/winera_uploads/paetmpiccw1jsxatynka.png";
const roiBlock5Img4 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345680/winera_uploads/caygc5bib4f3zucmavng.png";
const roiBlock5Img5 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345680/winera_uploads/wzwb837zocgpo1e2xfds.png";
const roiBlock5Img6 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345680/winera_uploads/icyqws3zo0i1gnyw52zo.png";
const roiBlock6 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345680/winera_uploads/u7yiknltu3acbgk5bdal.png";
const roiBlock7Bg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345680/winera_uploads/fx5mcigkjl4duogrx0no.png";
const homeBlockBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345656/winera_uploads/ce68jfjddo1sxdoptwkv.png";

const ROI_LOCAL_ASSETS_MAP = {
  'roi-bg-image': roiBgImage,
  'roi-img1': roiImg1,
  'roi-block5-img1': roiBlock5Img1,
  'roi-block5-img2': roiBlock5Img2,
  'roi-block5-img3': roiBlock5Img3,
  'roi-block5-img4': roiBlock5Img4,
  'roi-block5-img5': roiBlock5Img5,
  'roi-block5-img6': roiBlock5Img6,
  'roi-block6': roiBlock6,
  'roi-block7-bg': roiBlock7Bg,
  'project-page-mobile-banner': defaultGameZoneMobileBanner,
  'home-block-bg': homeBlockBg
};

const getAdminValidImageUrl = (url, fallback) => {
  if (!url) return fallback;
  if (typeof url === 'object' && url.default) return url.default;
  if (typeof url !== 'string' || url.trim() === '') return fallback;

  for (const [key, mappedCloudinary] of Object.entries(ROI_LOCAL_ASSETS_MAP)) {
    if (url.includes(key)) {
      return mappedCloudinary;
    }
  }

  if (url.includes('/src/assets/') || url.includes('/assets/')) {
    return fallback;
  }

  if (url.includes('mobile-banner') || url.includes('mobileBg') || url.includes('defaultGameZoneMobileBanner')) {
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

const defaultRoiHero = {
  breadcrumbPage: "ROI",
  bgUrl: roiBgImage,
  bgAlt: "FEC & Game Zone ROI Calculator - Winera International",
  mobileBgUrl: defaultGameZoneMobileBanner,
  mobileBgAlt: "FEC & Game Zone ROI Calculator Mobile Banner - Winera International"
};

const defaultRoiIntro = {
  tagline: "Return on Investment (ROI)",
  titleLine1: "You don't need a game zone…",
  titleLine2: "you need a",
  titleLine2Blue: "profit machine.",
  paragraph1: "Anyone can fill a room with arcade machines. Very few build a game zone that pays back your investment and keeps printing profit month after month.",
  paragraph2: "Most game zone owners lose money in year one — not because gaming is dead, but because the setup, game mix, and management were wrong from day one.",
  buttonText: "Book Your Free ROI Consultation",
  buttonLink: "https://wa.me/919157873576",
  image: roiImg1
};

const defaultRoiMatters = {
  title: "Opening a game zone is easy. Making it profitable is a system.",
  paragraph1: "You've seen the crowds. You know the demand is real. So you're tempted to invest. But here's what nobody tells you:",
  cards: [
    "₹40–80 lakh invested, and the zone still runs at a loss.",
    "Machines that look exciting but nobody plays twice.",
    "Empty floors on weekdays, chaos on weekends, no system in between.",
    "No idea what your actual return per square foot is."
  ],
  warningTextLine1: "A cheap or random setup doesn't save you money.",
  warningTextLine2: "It quietly kills your ROI."
};

const defaultRoiComparison = {
  title: "Why most game zones fail vs. why ours profit",
  subCaption: "The difference isn't the games. It's the system behind them.",
  wrongItems: [
    { num: "01", text: "Random game selection", offset: "0px" },
    { num: "02", text: "No space planning", offset: "45px" },
    { num: "03", text: "Buy machines, then figure it out", offset: "95px" },
    { num: "04", text: "No pricing strategy", offset: "95px" },
    { num: "05", text: "Owner manages everything manually", offset: "45px" },
    { num: "06", text: "Guessing monthly income", offset: "0px" }
  ],
  rightItems: [
    { num: "01", text: "Data-backed game mix (high footfall + high margin)", offset: "0px" },
    { num: "02", text: "Optimized layout for max games per sq. ft.", offset: "45px" },
    { num: "03", text: "ROI modeled before you spend a rupee", offset: "95px" },
    { num: "04", text: "Dynamic pricing + package systems", offset: "95px" },
    { num: "05", text: "Full management + POS + reporting system", offset: "45px" },
    { num: "06", text: "Predictable, tracked revenue", offset: "0px" }
  ]
};

const defaultRoiProcess = {
  title: "From empty space to profit we handle everything",
  cards: [
    { title: "Location & Feasibility", desc: "We analyze your space and market and then project your ROI.", img: roiBlock5Img1 },
    { title: "Design & Layout", desc: "Maximum games, best flow, optimized experience per sq. ft.", img: roiBlock5Img2 },
    { title: "Game Selection", desc: "The right mix of high-demand + high-margin games.", img: roiBlock5Img3 },
    { title: "Setup & Installation", desc: "You don't have to touch a single wire.", img: roiBlock5Img4 },
    { title: "Management System", desc: "POS, pricing, staff training, reporting, and maintenance.", img: roiBlock5Img5 },
    { title: "Ongoing Growth", desc: "We help you scale revenue, not just open doors.", img: roiBlock5Img6 }
  ]
};

const defaultRoiGet = {
  title: "What you get with Winera International",
  subtitle: "Three things that turn your investment into predictable, growing profit.",
  badgeText: "Built for Profit.",
  image: roiBlock6,
  steps: [
    { title: "Predictable ROI", desc: "Know your returns before you invest." },
    { title: "Zero Guesswork", desc: "We handle setup + management end-to-end." },
    { title: "Ongoing Profit", desc: "Systems that keep revenue growing." }
  ]
};

const defaultRoiChecklist = {
  title: "This is for you if",
  bgImage: roiBlock7Bg,
  fitPill: "You're a fit",
  unfitPill: "You're not a fit",
  fitItems: [
    "You want to invest ₹XX Lakh+ in a proven, growing business",
    "You want returns backed by data, not hope",
    "You'd rather have experts build it than learn by losing money",
    "You want a zone that runs as a system, not a headache"
  ],
  unfitItems: [
    "You want the cheapest possible setup without care for quality",
    "You're looking for overnight shortcuts",
    "You're not serious about long term ROI",
    "You expect profit without a proper system"
  ]
};

const defaultRoiCta = {
  yellowText: "Ready To",
  whiteText: "See Your",
  cyanText: "Numbers?",
  subtitle: "Book A Free Consultation With Winera International. We'll Walk You Through The ROI Projection For Your Space, Your Budget, And Your City — Before You Spend Anything.",
  buttonText: "Book Your Free ROI Call",
  buttonLink: "https://wa.me/919157873576",
  bgUrl: homeBlockBg
};


export default function RoiDashboard({
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
          {activeSection === 'roiHero' && (() => {
            const currentSec = formData.roiHero || defaultRoiHero;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>ROI Hero Banner</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Breadcrumb Page Name</label>
                    <input
                      type="text"
                      value={currentSec.breadcrumbPage !== undefined ? currentSec.breadcrumbPage : defaultRoiHero.breadcrumbPage}
                      onChange={(e) => setFormData(prev => ({ ...prev, roiHero: { ...(prev.roiHero || defaultRoiHero), breadcrumbPage: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Background Image URL <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={currentSec.bgUrl !== undefined ? currentSec.bgUrl : defaultRoiHero.bgUrl}
                        onChange={(e) => setFormData(prev => ({ ...prev, roiHero: { ...(prev.roiHero || defaultRoiHero), bgUrl: e.target.value } }))}
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
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
                              setFormData(prev => ({ ...prev, roiHero: { ...(prev.roiHero || defaultRoiHero), bgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                      <img
                        src={getAdminValidImageUrl(currentSec.bgUrl, roiBgImage)}
                        alt="ROI Hero Preview"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = roiBgImage; }}
                        style={{ width: '100px', height: '70px', borderRadius: '10px', objectFit: 'cover', background: '#f8fafc', border: '1.5px solid #38bdf8', padding: '2px' }}
                      />
                    </div>
                    <AdminAltInput
                      compact
                      label="🏷️ Hero Background Alt Text (SEO Keyword)"
                      value={currentSec.bgAlt || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, roiHero: { ...(prev.roiHero || defaultRoiHero), bgAlt: e.target.value } }))}
                      placeholder="e.g. FEC & Game Zone ROI Calculator - Winera International"
                    />
                  </div>

                  {/* Mobile Screen Hero Banner Upload & Preview */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Mobile Screen Hero Banner <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📱 Recommended Size: 941 × 550 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={currentSec.mobileBgUrl !== undefined ? currentSec.mobileBgUrl : ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, roiHero: { ...(prev.roiHero || defaultRoiHero), mobileBgUrl: e.target.value } }))}
                        placeholder="Mobile Background Image URL"
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', background: '#F5F5F9' }}
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
                              setFormData(prev => ({ ...prev, roiHero: { ...(prev.roiHero || defaultRoiHero), mobileBgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                      <img
                        src={getAdminValidImageUrl(currentSec.mobileBgUrl, defaultGameZoneMobileBanner)}
                        alt="ROI Mobile Hero Preview"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = defaultGameZoneMobileBanner; }}
                        style={{ width: '100px', height: '70px', borderRadius: '10px', objectFit: 'cover', background: '#f8fafc', border: '1.5px solid #38bdf8', padding: '2px' }}
                      />
                      {currentSec.mobileBgUrl && (
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, roiHero: { ...(prev.roiHero || defaultRoiHero), mobileBgUrl: '' } }))}
                          style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
                        >
                          Reset Image
                        </button>
                      )}
                    </div>
                    <AdminAltInput
                      compact
                      label="🏷️ Mobile Background Image Alt Text (SEO Keyword)"
                      value={currentSec.mobileBgAlt !== undefined ? currentSec.mobileBgAlt : ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, roiHero: { ...(prev.roiHero || defaultRoiHero), mobileBgAlt: e.target.value } }))}
                      placeholder="e.g. FEC & Game Zone ROI Calculator Mobile Banner - Winera International"
                    />
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('roiHero', formData.roiHero || defaultRoiHero)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Hero Banner
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ROI INTRO FORM */}
          {activeSection === 'roiIntro' && (() => {
            const currentSec = formData.roiIntro || defaultRoiIntro;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Know Your Numbers Intro Section</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Tagline</label>
                      <input
                        type="text"
                        value={currentSec.tagline !== undefined ? currentSec.tagline : defaultRoiIntro.tagline}
                        onChange={(e) => setFormData(prev => ({ ...prev, roiIntro: { ...(prev.roiIntro || defaultRoiIntro), tagline: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Part 1</label>
                      <input
                        type="text"
                        value={currentSec.titleLine1 !== undefined ? currentSec.titleLine1 : defaultRoiIntro.titleLine1}
                        onChange={(e) => setFormData(prev => ({ ...prev, roiIntro: { ...(prev.roiIntro || defaultRoiIntro), titleLine1: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Part 2</label>
                      <input
                        type="text"
                        value={currentSec.titleLine2 !== undefined ? currentSec.titleLine2 : defaultRoiIntro.titleLine2}
                        onChange={(e) => setFormData(prev => ({ ...prev, roiIntro: { ...(prev.roiIntro || defaultRoiIntro), titleLine2: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Blue Part</label>
                      <input
                        type="text"
                        value={currentSec.titleLine2Blue !== undefined ? currentSec.titleLine2Blue : defaultRoiIntro.titleLine2Blue}
                        onChange={(e) => setFormData(prev => ({ ...prev, roiIntro: { ...(prev.roiIntro || defaultRoiIntro), titleLine2Blue: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Paragraph 1</label>
                    <RichTextareaWithEditor
                      rows={3}
                      value={currentSec.paragraph1 !== undefined ? currentSec.paragraph1 : defaultRoiIntro.paragraph1}
                      onChange={(val) => setFormData(prev => ({ ...prev, roiIntro: { ...(prev.roiIntro || defaultRoiIntro), paragraph1: val } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', lineHeight: 1.6 }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Paragraph 2</label>
                    <RichTextareaWithEditor
                      rows={3}
                      value={currentSec.paragraph2 !== undefined ? currentSec.paragraph2 : defaultRoiIntro.paragraph2}
                      onChange={(val) => setFormData(prev => ({ ...prev, roiIntro: { ...(prev.roiIntro || defaultRoiIntro), paragraph2: val } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', lineHeight: 1.6 }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                      <input
                        type="text"
                        value={currentSec.buttonText !== undefined ? currentSec.buttonText : defaultRoiIntro.buttonText}
                        onChange={(e) => setFormData(prev => ({ ...prev, roiIntro: { ...(prev.roiIntro || defaultRoiIntro), buttonText: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Button Link (WhatsApp URL)</label>
                      <input
                        type="text"
                        value={currentSec.buttonLink !== undefined ? currentSec.buttonLink : defaultRoiIntro.buttonLink}
                        onChange={(e) => setFormData(prev => ({ ...prev, roiIntro: { ...(prev.roiIntro || defaultRoiIntro), buttonLink: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      WhatsApp Auto Pre-filled Message (Readable Text) <span style={{ fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '6px' }}>💬 Sent when user clicks Book Your Free ROI Consultation</span>
                    </label>
                    <textarea
                      rows={2}
                      value={(() => {
                        if (currentSec.waMessage !== undefined && currentSec.waMessage !== '') return currentSec.waMessage;
                        if (currentSec.buttonLink && currentSec.buttonLink.includes('text=')) {
                          try {
                            const match = currentSec.buttonLink.match(/text=([^&]+)/);
                            if (match && match[1]) return decodeURIComponent(match[1]);
                          } catch (err) { }
                        }
                        return 'Hello Winera International! I want to book a free ROI consultation. Please share details. [Ref: ROI Page]';
                      })()}
                      onChange={(e) => {
                        const newMsg = e.target.value;
                        const baseLink = (currentSec.buttonLink && currentSec.buttonLink.split('?')[0]) || 'https://wa.me/919157873576';
                        const updatedLink = newMsg ? `${baseLink}?text=${encodeURIComponent(newMsg)}` : baseLink;
                        setFormData(prev => ({
                          ...prev,
                          roiIntro: {
                            ...(prev.roiIntro || defaultRoiIntro),
                            waMessage: newMsg,
                            buttonLink: updatedLink
                          }
                        }));
                      }}
                      placeholder="e.g. Hello Winera International! I want to book a free ROI consultation..."
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', lineHeight: 1.5, color: '#0f172a', fontWeight: '500' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Main Right Image Graphic <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={currentSec.image !== undefined ? currentSec.image : (currentSec.imgUrl !== undefined ? currentSec.imgUrl : defaultRoiIntro.image)}
                        onChange={(e) => setFormData(prev => ({ ...prev, roiIntro: { ...(prev.roiIntro || defaultRoiIntro), image: e.target.value, imgUrl: e.target.value } }))}
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                      <label style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#38bdf8', color: '#ffffff', padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}>
                        <Upload style={{ width: '16px', height: '16px', marginRight: '6px' }} />
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={async (e) => {
                            if (e.target.files?.[0]) {
                              const res = await uploadImageFile(e.target.files[0], admin.token);
                              setFormData(prev => ({ ...prev, roiIntro: { ...(prev.roiIntro || defaultRoiIntro), image: res.url, imgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                      <img
                        src={getAdminValidImageUrl(currentSec.image || currentSec.imgUrl, roiImg1)}
                        alt="ROI Intro Graphic Preview"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = roiImg1; }}
                        style={{ width: '100px', height: '70px', borderRadius: '10px', objectFit: 'contain', background: '#f8fafc', border: '1.5px solid #38bdf8', padding: '4px' }}
                      />
                    </div>
                    <AdminAltInput
                      compact
                      label="🏷️ Image Alt Text (SEO Keyword)"
                      value={currentSec.imageAlt !== undefined ? currentSec.imageAlt : (currentSec.imgAlt || '')}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        roiIntro: {
                          ...(prev.roiIntro || defaultRoiIntro),
                          imageAlt: e.target.value,
                          imgAlt: e.target.value
                        }
                      }))}
                      placeholder="e.g. ROI Investment Growth & Commercial Game Zone Setup - Winera"
                    />
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('roiIntro', formData.roiIntro || defaultRoiIntro)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Intro Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ROI MATTERS FORM */}
          {activeSection === 'roiMatters' && (() => {
            const currentSec = formData.roiMatters || defaultRoiMatters;
            const cardsList = Array.isArray(currentSec.cards) ? currentSec.cards : defaultRoiMatters.cards;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Why Setup Matters Section</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Section Main Title</label>
                    <input
                      type="text"
                      value={currentSec.title !== undefined ? currentSec.title : defaultRoiMatters.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, roiMatters: { ...(prev.roiMatters || defaultRoiMatters), title: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Subtitle / Paragraph 1</label>
                    <RichTextareaWithEditor
                      rows={2}
                      value={currentSec.paragraph1 !== undefined ? currentSec.paragraph1 : defaultRoiMatters.paragraph1}
                      onChange={(val) => setFormData(prev => ({ ...prev, roiMatters: { ...(prev.roiMatters || defaultRoiMatters), paragraph1: val } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', lineHeight: 1.6 }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '900', color: '#0f172a', margin: 0 }}>Pain Point Cards (Total {cardsList.length})</label>
                      <button
                        type="button"
                        onClick={async () => {
                          const copy = [...cardsList, ""];
                          const updatedSec = { ...(formData.roiMatters || defaultRoiMatters), cards: copy };
                          setFormData(prev => ({ ...prev, roiMatters: updatedSec }));
                          await persistSectionToDatabase('roiMatters', updatedSec);
                        }}
                        style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Plus style={{ width: '14px', height: '14px' }} /> Add Point
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {cardsList.map((cardVal, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                          <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#64748b', width: '20px', paddingTop: '10px' }}>{idx + 1}.</span>
                          <div style={{ flex: 1 }}>
                            <RichTextareaWithEditor
                              rows={2}
                              value={cardVal}
                              onChange={(val) => {
                                const copy = [...cardsList];
                                copy[idx] = val;
                                setFormData(prev => ({ ...prev, roiMatters: { ...(prev.roiMatters || defaultRoiMatters), cards: copy } }));
                              }}
                              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px' }}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={async () => {
                              const copy = [...cardsList];
                              copy.splice(idx, 1);
                              const updatedSec = { ...(formData.roiMatters || defaultRoiMatters), cards: copy };
                              setFormData(prev => ({ ...prev, roiMatters: updatedSec }));
                              await persistSectionToDatabase('roiMatters', updatedSec);
                            }}
                            style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '8px', borderRadius: '8px', cursor: 'pointer', marginTop: '6px' }}
                          >
                            <Trash2 style={{ width: '15px', height: '15px' }} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Bottom Warning Line 1</label>
                      <input
                        type="text"
                        value={currentSec.warningTextLine1 !== undefined ? currentSec.warningTextLine1 : defaultRoiMatters.warningTextLine1}
                        onChange={(e) => setFormData(prev => ({ ...prev, roiMatters: { ...(prev.roiMatters || defaultRoiMatters), warningTextLine1: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Bottom Warning Line 2 (Red Accent)</label>
                      <input
                        type="text"
                        value={currentSec.warningTextLine2 !== undefined ? currentSec.warningTextLine2 : defaultRoiMatters.warningTextLine2}
                        onChange={(e) => setFormData(prev => ({ ...prev, roiMatters: { ...(prev.roiMatters || defaultRoiMatters), warningTextLine2: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('roiMatters', formData.roiMatters || defaultRoiMatters)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Matters Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ROI COMPARISON FORM */}
          {activeSection === 'roiComparison' && (() => {
            const currentSec = formData.roiComparison || defaultRoiComparison;
            const wrongItems = Array.isArray(currentSec.wrongItems) ? currentSec.wrongItems : defaultRoiComparison.wrongItems;
            const rightItems = Array.isArray(currentSec.rightItems) ? currentSec.rightItems : defaultRoiComparison.rightItems;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Game Zones Fail vs. Profit Comparison</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Main Section Title</label>
                      <input
                        type="text"
                        value={currentSec.title !== undefined ? currentSec.title : defaultRoiComparison.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, roiComparison: { ...(prev.roiComparison || defaultRoiComparison), title: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Sub Caption Text</label>
                      <input
                        type="text"
                        value={currentSec.subCaption !== undefined ? currentSec.subCaption : defaultRoiComparison.subCaption}
                        onChange={(e) => setFormData(prev => ({ ...prev, roiComparison: { ...(prev.roiComparison || defaultRoiComparison), subCaption: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                    {/* Wrong Side */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '900', color: '#ef4444', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Why Most Game Zones Fail ({wrongItems.length})</h4>
                        <button
                          type="button"
                          onClick={async () => {
                            const newNum = (wrongItems.length + 1).toString().padStart(2, '0');
                            const copy = [...wrongItems, { num: newNum, text: "", offset: "20px" }];
                            const updatedSec = { ...(formData.roiComparison || defaultRoiComparison), wrongItems: copy };
                            setFormData(prev => ({ ...prev, roiComparison: updatedSec }));
                            await persistSectionToDatabase('roiComparison', updatedSec);
                          }}
                          style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Plus style={{ width: '14px', height: '14px' }} /> Add Point
                        </button>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {wrongItems.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '12px', color: '#94a3b8', width: '20px' }}>{item.num}</span>
                            <input
                              type="text"
                              value={item.text}
                              onChange={(e) => {
                                const copy = [...wrongItems];
                                copy[idx] = { ...copy[idx], text: e.target.value };
                                setFormData(prev => ({ ...prev, roiComparison: { ...(prev.roiComparison || defaultRoiComparison), wrongItems: copy } }));
                              }}
                              placeholder="Point Text"
                              style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #fca5a5', fontSize: '13px' }}
                            />
                            <input
                              type="text"
                              value={item.offset || ''}
                              onChange={(e) => {
                                const copy = [...wrongItems];
                                copy[idx] = { ...copy[idx], offset: e.target.value };
                                setFormData(prev => ({ ...prev, roiComparison: { ...(prev.roiComparison || defaultRoiComparison), wrongItems: copy } }));
                              }}
                              placeholder="Offset"
                              style={{ width: '70px', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #fca5a5', fontSize: '13px' }}
                            />
                            <button
                              type="button"
                              onClick={async () => {
                                const copy = [...wrongItems];
                                copy.splice(idx, 1);
                                const reindexed = copy.map((x, i) => ({ ...x, num: (i + 1).toString().padStart(2, '0') }));
                                const updatedSec = { ...(formData.roiComparison || defaultRoiComparison), wrongItems: reindexed };
                                setFormData(prev => ({ ...prev, roiComparison: updatedSec }));
                                await persistSectionToDatabase('roiComparison', updatedSec);
                              }}
                              style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                            >
                              <Trash2 style={{ width: '15px', height: '15px' }} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Side */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '900', color: '#22c55e', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Why Ours Profit ({rightItems.length})</h4>
                        <button
                          type="button"
                          onClick={async () => {
                            const newNum = (rightItems.length + 1).toString().padStart(2, '0');
                            const copy = [...rightItems, { num: newNum, text: "", offset: "20px" }];
                            const updatedSec = { ...(formData.roiComparison || defaultRoiComparison), rightItems: copy };
                            setFormData(prev => ({ ...prev, roiComparison: updatedSec }));
                            await persistSectionToDatabase('roiComparison', updatedSec);
                          }}
                          style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Plus style={{ width: '14px', height: '14px' }} /> Add Point
                        </button>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {rightItems.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '12px', color: '#94a3b8', width: '20px' }}>{item.num}</span>
                            <input
                              type="text"
                              value={item.text}
                              onChange={(e) => {
                                const copy = [...rightItems];
                                copy[idx] = { ...copy[idx], text: e.target.value };
                                setFormData(prev => ({ ...prev, roiComparison: { ...(prev.roiComparison || defaultRoiComparison), rightItems: copy } }));
                              }}
                              placeholder="Point Text"
                              style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #86efac', fontSize: '13px' }}
                            />
                            <input
                              type="text"
                              value={item.offset || ''}
                              onChange={(e) => {
                                const copy = [...rightItems];
                                copy[idx] = { ...copy[idx], offset: e.target.value };
                                setFormData(prev => ({ ...prev, roiComparison: { ...(prev.roiComparison || defaultRoiComparison), rightItems: copy } }));
                              }}
                              placeholder="Offset"
                              style={{ width: '70px', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #86efac', fontSize: '13px' }}
                            />
                            <button
                              type="button"
                              onClick={async () => {
                                const copy = [...rightItems];
                                copy.splice(idx, 1);
                                const reindexed = copy.map((x, i) => ({ ...x, num: (i + 1).toString().padStart(2, '0') }));
                                const updatedSec = { ...(formData.roiComparison || defaultRoiComparison), rightItems: reindexed };
                                setFormData(prev => ({ ...prev, roiComparison: updatedSec }));
                                await persistSectionToDatabase('roiComparison', updatedSec);
                              }}
                              style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                            >
                              <Trash2 style={{ width: '15px', height: '15px' }} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('roiComparison', formData.roiComparison || defaultRoiComparison)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Comparison Data
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ROI PROCESS FORM */}
          {activeSection === 'roiProcess' && (() => {
            const currentSec = formData.roiProcess || defaultRoiProcess;
            const cardsList = Array.isArray(currentSec.cards) ? currentSec.cards : defaultRoiProcess.cards;
            const defaultProcessImgs = [roiBlock5Img1, roiBlock5Img2, roiBlock5Img3, roiBlock5Img4, roiBlock5Img5, roiBlock5Img6];
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Working Process Steps (Cards)</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Main Section Title</label>
                    <input
                      type="text"
                      value={currentSec.title !== undefined ? currentSec.title : defaultRoiProcess.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, roiProcess: { ...(prev.roiProcess || defaultRoiProcess), title: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '900', color: '#0f172a', margin: 0 }}>Process Steps Cards (Total {cardsList.length})</label>
                    <button
                      type="button"
                      onClick={async () => {
                        const copy = [...cardsList, { title: "", desc: "", img: "" }];
                        const updatedSec = { ...(formData.roiProcess || defaultRoiProcess), cards: copy };
                        setFormData(prev => ({ ...prev, roiProcess: updatedSec }));
                        await persistSectionToDatabase('roiProcess', updatedSec);
                      }}
                      style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Plus style={{ width: '14px', height: '14px' }} /> Add Step
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    {cardsList.map((card, idx) => (
                      <div key={idx} style={{ padding: '20px', borderRadius: '16px', border: '1.5px solid #e2e8f0', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: '900', fontSize: '14px', color: '#00aeef' }}>Step {idx + 1}</span>
                          <button
                            type="button"
                            onClick={async () => {
                              const copy = [...cardsList];
                              copy.splice(idx, 1);
                              const updatedSec = { ...(formData.roiProcess || defaultRoiProcess), cards: copy };
                              setFormData(prev => ({ ...prev, roiProcess: updatedSec }));
                              await persistSectionToDatabase('roiProcess', updatedSec);
                            }}
                            style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Trash2 style={{ width: '13px', height: '13px' }} /> Delete
                          </button>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>Card Title</label>
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => {
                              const copy = [...cardsList];
                              copy[idx] = { ...copy[idx], title: e.target.value };
                              setFormData(prev => ({ ...prev, roiProcess: { ...(prev.roiProcess || defaultRoiProcess), cards: copy } }));
                            }}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>Card Description</label>
                          <RichTextareaWithEditor
                            rows={2}
                            value={card.desc}
                            onChange={(val) => {
                              const copy = [...cardsList];
                              copy[idx] = { ...copy[idx], desc: val };
                              setFormData(prev => ({ ...prev, roiProcess: { ...(prev.roiProcess || defaultRoiProcess), cards: copy } }));
                            }}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12.5px', lineHeight: 1.4 }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                            Background Image URL <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                          </label>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <input
                              type="text"
                              value={card.img}
                              onChange={(e) => {
                                const copy = [...cardsList];
                                copy[idx] = { ...copy[idx], img: e.target.value };
                                setFormData(prev => ({ ...prev, roiProcess: { ...(prev.roiProcess || defaultRoiProcess), cards: copy } }));
                              }}
                              style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                            />
                            <label style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#38bdf8', color: '#ffffff', padding: '8px 12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '11.5px' }}>
                              <Upload style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                              Upload
                              <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={async (e) => {
                                  if (e.target.files?.[0]) {
                                    const res = await uploadImageFile(e.target.files[0], admin.token);
                                    const copy = [...cardsList];
                                    copy[idx] = { ...copy[idx], img: res.url };
                                    setFormData(prev => ({ ...prev, roiProcess: { ...(prev.roiProcess || defaultRoiProcess), cards: copy } }));
                                  }
                                }}
                              />
                            </label>
                            <img
                              src={getAdminValidImageUrl(card.img, defaultProcessImgs[idx % defaultProcessImgs.length])}
                              alt="Process Step Preview"
                              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = defaultProcessImgs[idx % defaultProcessImgs.length]; }}
                              style={{ width: '55px', height: '40px', borderRadius: '6px', objectFit: 'cover', border: '1.5px solid #38bdf8', padding: '2px', background: '#fff' }}
                            />
                          </div>
                        </div>
                        <AdminAltInput
                          compact
                          label="🏷️ Step Background Alt Text (SEO Keyword)"
                          value={card.imgAlt || ''}
                          onChange={(e) => {
                            const copy = [...cardsList];
                            copy[idx] = { ...copy[idx], imgAlt: e.target.value };
                            setFormData(prev => ({ ...prev, roiProcess: { ...(prev.roiProcess || defaultRoiProcess), cards: copy } }));
                          }}
                          placeholder={`e.g. ${card.title || 'Step ' + (idx + 1)} - Winera Game Zone Setup Process`}
                        />
                      </div>
                    ))}
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('roiProcess', formData.roiProcess || defaultRoiProcess)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Process Cards
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ROI GET FORM */}
          {activeSection === 'roiGet' && (() => {
            const currentSec = formData.roiGet || defaultRoiGet;
            const steps = Array.isArray(currentSec.steps) ? currentSec.steps : defaultRoiGet.steps;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>What You Get Section</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Section Main Title</label>
                      <input
                        type="text"
                        value={currentSec.title !== undefined ? currentSec.title : defaultRoiGet.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, roiGet: { ...(prev.roiGet || defaultRoiGet), title: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Subtitle Text</label>
                      <RichTextareaWithEditor
                        rows={2}
                        value={currentSec.subtitle !== undefined ? currentSec.subtitle : defaultRoiGet.subtitle}
                        onChange={(val) => setFormData(prev => ({ ...prev, roiGet: { ...(prev.roiGet || defaultRoiGet), subtitle: val } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Blue Badge Text Sticker</label>
                      <input
                        type="text"
                        value={currentSec.badgeText !== undefined ? currentSec.badgeText : defaultRoiGet.badgeText}
                        onChange={(e) => setFormData(prev => ({ ...prev, roiGet: { ...(prev.roiGet || defaultRoiGet), badgeText: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                        Section Left Image URL <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                      </label>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                          type="text"
                          value={currentSec.image !== undefined ? currentSec.image : defaultRoiGet.image}
                          onChange={(e) => setFormData(prev => ({ ...prev, roiGet: { ...(prev.roiGet || defaultRoiGet), image: e.target.value } }))}
                          style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
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
                                setFormData(prev => ({ ...prev, roiGet: { ...(prev.roiGet || defaultRoiGet), image: res.url } }));
                              }
                            }}
                          />
                        </label>
                        <img
                          src={getAdminValidImageUrl(currentSec.image, roiBlock6)}
                          alt="ROI Get Preview"
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = roiBlock6; }}
                          style={{ width: '100px', height: '70px', borderRadius: '10px', objectFit: 'contain', background: '#f8fafc', border: '1.5px solid #38bdf8', padding: '4px' }}
                        />
                      </div>
                      <AdminAltInput
                        compact
                        label="🏷️ Section Left Image Alt Text (SEO Keyword)"
                        value={currentSec.imageAlt !== undefined ? currentSec.imageAlt : (currentSec.imgAlt || '')}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          roiGet: {
                            ...(prev.roiGet || defaultRoiGet),
                            imageAlt: e.target.value,
                            imgAlt: e.target.value
                          }
                        }))}
                        placeholder="e.g. Winera Built for Profit - High ROI Commercial Entertainment Setup"
                      />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '900', color: '#0f172a', margin: 0 }}>List Features (Total {steps.length})</label>
                      <button
                        type="button"
                        onClick={async () => {
                          const copy = [...steps, { title: "", desc: "" }];
                          const updatedSec = { ...(formData.roiGet || defaultRoiGet), steps: copy };
                          setFormData(prev => ({ ...prev, roiGet: updatedSec }));
                          await persistSectionToDatabase('roiGet', updatedSec);
                        }}
                        style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Plus style={{ width: '14px', height: '14px' }} /> Add Feature
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {steps.map((step, idx) => (
                        <div key={idx} style={{ padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px', background: '#f8fafc' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '12px', color: '#64748b' }}>Feature #{idx + 1}</span>
                            <button
                              type="button"
                              onClick={async () => {
                                const copy = [...steps];
                                copy.splice(idx, 1);
                                const updatedSec = { ...(formData.roiGet || defaultRoiGet), steps: copy };
                                setFormData(prev => ({ ...prev, roiGet: updatedSec }));
                                await persistSectionToDatabase('roiGet', updatedSec);
                              }}
                              style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                            >
                              <Trash2 style={{ width: '12px', height: '12px' }} /> Delete
                            </button>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Feature Title</label>
                              <input
                                type="text"
                                value={step.title}
                                onChange={(e) => {
                                  const copy = [...steps];
                                  copy[idx] = { ...copy[idx], title: e.target.value };
                                  setFormData(prev => ({ ...prev, roiGet: { ...(prev.roiGet || defaultRoiGet), steps: copy } }));
                                }}
                                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Feature Description</label>
                              <RichTextareaWithEditor
                                rows={2}
                                value={step.desc}
                                onChange={(val) => {
                                  const copy = [...steps];
                                  copy[idx] = { ...copy[idx], desc: val };
                                  setFormData(prev => ({ ...prev, roiGet: { ...(prev.roiGet || defaultRoiGet), steps: copy } }));
                                }}
                                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ textHeading: 'right', textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('roiGet', formData.roiGet || defaultRoiGet)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Section Data
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ROI CHECKLIST FORM */}
          {activeSection === 'roiChecklist' && (() => {
            const currentSec = formData.roiChecklist || defaultRoiChecklist;
            const fitItems = Array.isArray(currentSec.fitItems) ? currentSec.fitItems : defaultRoiChecklist.fitItems;
            const unfitItems = Array.isArray(currentSec.unfitItems) ? currentSec.unfitItems : defaultRoiChecklist.unfitItems;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Checklist (This is for you if)</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Main Section Title</label>
                    <input
                      type="text"
                      value={currentSec.title !== undefined ? currentSec.title : defaultRoiChecklist.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, roiChecklist: { ...(prev.roiChecklist || defaultRoiChecklist), title: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Fit Pill Text Label</label>
                      <input
                        type="text"
                        value={currentSec.fitPill !== undefined ? currentSec.fitPill : defaultRoiChecklist.fitPill}
                        onChange={(e) => setFormData(prev => ({ ...prev, roiChecklist: { ...(prev.roiChecklist || defaultRoiChecklist), fitPill: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Unfit Pill Text Label</label>
                      <input
                        type="text"
                        value={currentSec.unfitPill !== undefined ? currentSec.unfitPill : defaultRoiChecklist.unfitPill}
                        onChange={(e) => setFormData(prev => ({ ...prev, roiChecklist: { ...(prev.roiChecklist || defaultRoiChecklist), unfitPill: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Section Background Graphic <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={currentSec.bgImage !== undefined ? currentSec.bgImage : defaultRoiChecklist.bgImage}
                        onChange={(e) => setFormData(prev => ({ ...prev, roiChecklist: { ...(prev.roiChecklist || defaultRoiChecklist), bgImage: e.target.value } }))}
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
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
                              setFormData(prev => ({ ...prev, roiChecklist: { ...(prev.roiChecklist || defaultRoiChecklist), bgImage: res.url } }));
                            }
                          }}
                        />
                      </label>
                      <img
                        src={getAdminValidImageUrl(currentSec.bgImage, roiBlock7Bg)}
                        alt="Checklist BG Preview"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = roiBlock7Bg; }}
                        style={{ width: '100px', height: '70px', borderRadius: '10px', objectFit: 'cover', background: '#f8fafc', border: '1.5px solid #38bdf8', padding: '2px' }}
                      />
                    </div>
                    <AdminAltInput
                      compact
                      label="🏷️ Section Background Image Alt Text (SEO Keyword)"
                      value={currentSec.bgAlt || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, roiChecklist: { ...(prev.roiChecklist || defaultRoiChecklist), bgAlt: e.target.value } }))}
                      placeholder="e.g. ROI Calculator Checklist Background - Winera Commercial Entertainment"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                    {/* Fit Items */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '900', color: '#38bdf8', margin: 0 }}>You're a Fit Checklist Items (Total {fitItems.length})</h4>
                        <button
                          type="button"
                          onClick={async () => {
                            const copy = [...fitItems, ""];
                            const updatedSec = { ...(formData.roiChecklist || defaultRoiChecklist), fitItems: copy };
                            setFormData(prev => ({ ...prev, roiChecklist: updatedSec }));
                            await persistSectionToDatabase('roiChecklist', updatedSec);
                          }}
                          style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Plus style={{ width: '14px', height: '14px' }} /> Add Point
                        </button>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {fitItems.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '12px', color: '#94a3b8', paddingTop: '8px' }}>{idx + 1}.</span>
                            <div style={{ flex: 1 }}>
                              <RichTextareaWithEditor
                                rows={2}
                                value={item}
                                onChange={(val) => {
                                  const copy = [...fitItems];
                                  copy[idx] = val;
                                  setFormData(prev => ({ ...prev, roiChecklist: { ...(prev.roiChecklist || defaultRoiChecklist), fitItems: copy } }));
                                }}
                                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={async () => {
                                const copy = [...fitItems];
                                copy.splice(idx, 1);
                                const updatedSec = { ...(formData.roiChecklist || defaultRoiChecklist), fitItems: copy };
                                setFormData(prev => ({ ...prev, roiChecklist: updatedSec }));
                                await persistSectionToDatabase('roiChecklist', updatedSec);
                              }}
                              style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '8px', borderRadius: '8px', cursor: 'pointer', marginTop: '4px' }}
                            >
                              <Trash2 style={{ width: '15px', height: '15px' }} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Unfit Items */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '900', color: '#ef4444', margin: 0 }}>You're Not a Fit Checklist Items (Total {unfitItems.length})</h4>
                        <button
                          type="button"
                          onClick={async () => {
                            const copy = [...unfitItems, ""];
                            const updatedSec = { ...(formData.roiChecklist || defaultRoiChecklist), unfitItems: copy };
                            setFormData(prev => ({ ...prev, roiChecklist: updatedSec }));
                            await persistSectionToDatabase('roiChecklist', updatedSec);
                          }}
                          style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Plus style={{ width: '14px', height: '14px' }} /> Add Point
                        </button>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {unfitItems.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '12px', color: '#94a3b8', paddingTop: '8px' }}>{idx + 1}.</span>
                            <div style={{ flex: 1 }}>
                              <RichTextareaWithEditor
                                rows={2}
                                value={item}
                                onChange={(val) => {
                                  const copy = [...unfitItems];
                                  copy[idx] = val;
                                  setFormData(prev => ({ ...prev, roiChecklist: { ...(prev.roiChecklist || defaultRoiChecklist), unfitItems: copy } }));
                                }}
                                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={async () => {
                                const copy = [...unfitItems];
                                copy.splice(idx, 1);
                                const updatedSec = { ...(formData.roiChecklist || defaultRoiChecklist), unfitItems: copy };
                                setFormData(prev => ({ ...prev, roiChecklist: updatedSec }));
                                await persistSectionToDatabase('roiChecklist', updatedSec);
                              }}
                              style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '8px', borderRadius: '8px', cursor: 'pointer', marginTop: '4px' }}
                            >
                              <Trash2 style={{ width: '15px', height: '15px' }} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('roiChecklist', formData.roiChecklist || defaultRoiChecklist)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Checklist
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ROI CTA FORM */}
          {activeSection === 'roiCta' && (() => {
            const currentSec = formData.roiCta || defaultRoiCta;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Ready to See Your Numbers CTA Banner</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Accent Yellow</label>
                      <input
                        type="text"
                        value={currentSec.yellowText !== undefined ? currentSec.yellowText : defaultRoiCta.yellowText}
                        onChange={(e) => setFormData(prev => ({ ...prev, roiCta: { ...(prev.roiCta || defaultRoiCta), yellowText: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Middle White</label>
                      <input
                        type="text"
                        value={currentSec.whiteText !== undefined ? currentSec.whiteText : defaultRoiCta.whiteText}
                        onChange={(e) => setFormData(prev => ({ ...prev, roiCta: { ...(prev.roiCta || defaultRoiCta), whiteText: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Accent Cyan</label>
                      <input
                        type="text"
                        value={currentSec.cyanText !== undefined ? currentSec.cyanText : defaultRoiCta.cyanText}
                        onChange={(e) => setFormData(prev => ({ ...prev, roiCta: { ...(prev.roiCta || defaultRoiCta), cyanText: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Subtitle</label>
                    <RichTextareaWithEditor
                      rows={3}
                      value={currentSec.subtitle !== undefined ? currentSec.subtitle : defaultRoiCta.subtitle}
                      onChange={(val) => setFormData(prev => ({ ...prev, roiCta: { ...(prev.roiCta || defaultRoiCta), subtitle: val } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', lineHeight: 1.6 }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                      <input
                        type="text"
                        value={currentSec.buttonText !== undefined ? currentSec.buttonText : defaultRoiCta.buttonText}
                        onChange={(e) => setFormData(prev => ({ ...prev, roiCta: { ...(prev.roiCta || defaultRoiCta), buttonText: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                      <input
                        type="text"
                        value={currentSec.buttonLink !== undefined ? currentSec.buttonLink : defaultRoiCta.buttonLink}
                        onChange={(e) => setFormData(prev => ({ ...prev, roiCta: { ...(prev.roiCta || defaultRoiCta), buttonLink: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Background Image URL <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={currentSec.bgUrl !== undefined ? currentSec.bgUrl : defaultRoiCta.bgUrl}
                        onChange={(e) => setFormData(prev => ({ ...prev, roiCta: { ...(prev.roiCta || defaultRoiCta), bgUrl: e.target.value } }))}
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
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
                              setFormData(prev => ({ ...prev, roiCta: { ...(prev.roiCta || defaultRoiCta), bgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                      <img
                        src={getAdminValidImageUrl(currentSec.bgUrl, homeBlockBg)}
                        alt="CTA BG Preview"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = homeBlockBg; }}
                        style={{ width: '100px', height: '70px', borderRadius: '10px', objectFit: 'cover', background: '#f8fafc', border: '1.5px solid #38bdf8', padding: '2px' }}
                      />
                    </div>
                    <AdminAltInput
                      compact
                      label="🏷️ Banner Background Alt Text (SEO Keyword)"
                      value={currentSec.bgAlt || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, roiCta: { ...(prev.roiCta || defaultRoiCta), bgAlt: e.target.value } }))}
                      placeholder="e.g. Commercial Entertainment Center ROI Calculator & Turnkey Consultation - Winera"
                    />
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('roiCta', formData.roiCta || defaultRoiCta)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save CTA Banner
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

    </>
  );
}
