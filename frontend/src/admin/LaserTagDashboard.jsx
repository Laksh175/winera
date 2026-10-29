import React from 'react';
import { Upload, Plus, Trash2 } from 'lucide-react';
import RichTextareaWithEditor from '../components/RichTextareaWithEditor';
import AdminAltInput from '../components/AdminAltInput';
import { uploadImageFile } from '../services/api';

const defaultGameZoneMobileBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345484/winera_uploads/cjhcvoxksmptc84yslh2.png";
const homePageIcon = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345656/winera_uploads/gp0aisnttd4hpnswmxu4.png";
const laserTagImg1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345668/winera_uploads/pvowe89a9npyelw0urvy.png";
const laserTagImg2 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345670/winera_uploads/pdxjsxxlv5fmskyvexns.png";
const laserTagImg3 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345671/winera_uploads/c6ibna0gcd0tjshkgo8o.png";
const laserTagBg3 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345673/winera_uploads/zehlru7p5ycnkgk0iy7s.png";
const laserTagBg4 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345671/winera_uploads/xrz97xddcvnnpf6roewa.png";
const laserTagImg5 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345671/winera_uploads/v9ozhnic1za88buasewx.png";
const laserTagImg6 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345671/winera_uploads/ekzzusfpuhfyih8nyc3w.png";
const laserTagImg6Bg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345670/winera_uploads/bmfayjdfcpyocsjcg8cc.png";
const laserTagImg6Small = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345671/winera_uploads/neuibh4fb5zojuvgtiec.png";
const laserTagImg6Btn = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345670/winera_uploads/eo5gjslhvaiutogkzeq9.png";
const laserTagHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345630/winera_uploads/tj7ke5cpufz9t41c4d7v.png";
const ctaMainBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345648/winera_uploads/ei16uczeuelaabtue4bs.jpg";

const getAdminValidImageUrl = (url, fallback) => {
  if (!url) return fallback;
  if (typeof url === 'object' && url.default) return url.default;
  if (typeof url !== 'string' || url.trim() === '') return fallback;
  if (url.includes('/src/assets/') || url.includes('laser-tag') || url.includes('lasertag') || url.includes('laserTag')) {
    if (url.includes('laserTagHero') || url.includes('laser-tag-hero') || url.includes('lasertag-hero')) return laserTagHeroBg;
    if (url.includes('mobile') || url.includes('Mobile')) return defaultGameZoneMobileBanner;
    if (url.includes('laser-tag-1') || url.includes('laserTagImg1')) return laserTagImg1;
    if (url.includes('laser-tag-2') || url.includes('laserTagImg2')) return laserTagImg2;
    if (url.includes('laser-tag-3') || url.includes('laserTagImg3')) return laserTagImg3;
    if (url.includes('laser-tag-5') || url.includes('laserTagImg5')) return laserTagImg5;
    if (url.includes('laser-tag-6') || url.includes('laserTagImg6')) return laserTagImg6;
    if (url.includes('laser-tag-7') || url.includes('laserTagImg7')) return "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345673/winera_uploads/c4xhhkjcjwhagwd8drzm.png";
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

const defaultLasertagHero = {
  breadcrumbText: "Laser Tag",
  bgUrl: laserTagHeroBg,
  mobileBgUrl: defaultGameZoneMobileBanner,
  mobileBgAlt: "Commercial Laser Tag Arena Equipment & Setup Mobile Banner - Winera"
};

const defaultLasertagIntro = {
  titleHighlight: "Laser Tag Gaming Equipment",
  titleNormal: "& Laser Spy Supplier in India",
  title: "*Laser Tag Gaming<br/>Equipment* & Laser Spy<br/>Supplier in India",
  desc: "Turn your venue into a place people book again and again. We set up complete laser tag and laser spy games for venues across India. arenas equipment, design, installation, and support handled by our own team across 50+ cities.",
  buttonText: "Get A Quote",
  buttonLink: "https://wa.me/919157873576",
  waMessage: "Hello Winera International! I want to get a quote for Laser Tag & Laser Spy Equipment setup. Please share details.",
  mainImgUrl: laserTagImg1
};

const defaultLasertagSetup = {
  titleNormal: "One Team for Your Whole Laser",
  titleHighlight: "Tag & Laser Spy Setup",
  title: "One Team for Your Whole<br/>Laser *Tag & Laser Spy Setup*",
  paragraph1: "Winera International has set up laser tag and laser spy games for entertainment centres, malls, hotels, schools, and resorts across India since 2014. Every setup comes with the full equipment, game software, scoreboards, and complete arena setup.",
  paragraph2: "Before you order anything, we check your space size, how many players you want, and how you plan to run it. Then our own team handles everything — design, setup, and staff training across 50+ cities in India.",
  mainImgUrl: laserTagImg2
};

const defaultLasertagGroups = {
  titleHighlight: "Laser Tag - ",
  titleNormal: "Great for Groups",
  desc: "Laser tag fills fast because groups book many players at once at birthday parties, office teams, and school outings. We supply the complete game and set it up fully, so you're ready to take bookings from day one.",
  listHeading: "What you get, fully set up:",
  features: [
    "Laser guns with lights and a small screen, and vests that show each hit right away",
    "Wireless charging, so you don't have to wait between games",
    "Home base points and power-ups that make the game more fun",
    "A TV to explain the rules, and a live score screen that makes players want to play again",
    "Full sound, game software, setup, and staff training all done by our team"
  ],
  mainImgUrl: laserTagImg3,
  bgUrl: laserTagBg3
};

const defaultLasertagSpecs = {
  titleHighlight: "Technical",
  titleNormal: "Specifications",
  title: "*Technical* Specifications",
  bgUrl: laserTagBg4,
  buttonText: "Download Our Brochure",
  buttonLink: "/pdf/Laser tag.pdf",
  waMessage: "Hello Winera International! I want to download the Laser Tag Equipment & Setup Brochure. Please share details.",
  specHeading: "Specification",
  detailsHeading: "Details",
  rows: [
    { spec: "Players", details: "10 to 30+ simultaneously" },
    { spec: "Guns & vests", details: "Start with 8, add more anytime" },
    { spec: "Staff needed", details: "Just 1 person" },
    { spec: "Game types", details: "Team battle, solo, elimination, capture the flag" },
    { spec: "Lasts for", details: "8–10 years" }
  ]
};

const defaultLasertagSpySpecs = {
  titleHighlight: "Technical",
  titleNormal: "Specifications",
  title: "*Technical* Specifications",
  bgUrl: laserTagBg4,
  buttonText: "Download Our Brochure",
  buttonLink: "/pdf/Laser tag.pdf",
  waMessage: "Hello Winera International! I want to download the Laser Spy Equipment & Setup Brochure. Please share details.",
  specHeading: "Specification",
  detailsHeading: "Details",
  rows: [
    { spec: "Smallest space", details: "150 sq ft" },
    { spec: "Best space", details: "Around 560 sq ft" },
    { spec: "Tasks", details: "3–4 team tasks + 1 main challenge" },
    { spec: "Staff needed", details: "Just 1 person" },
    { spec: "Scoreboard", details: "Automatic TV leaderboard" }
  ]
};

const defaultLasertagSpace = {
  titleHighlight: "How Much Space",
  titleNormal: "You Need for Laser Tag",
  desc: "A laser tag arena works from about 1,000 sq ft, but 2,500–5,000 sq ft is ideal; it gives players room to move, hide, and enjoy the game. Here's how the space is used:",
  mainImgUrl: laserTagImg5,
  zones: [
    {
      num: "01",
      title: "BRIEFING AREA",
      subtitle: "(EXPLAIN THE RULES)",
      space: "~150 sq ft",
      iconType: "rules"
    },
    {
      num: "02",
      title: "VESTING AREA",
      subtitle: "(PLAYERS GEAR UP)",
      space: "~250 sq ft",
      iconType: "vest"
    },
    {
      num: "03",
      title: "PLAY AREA",
      subtitle: "(COMBAT ZONE)",
      space: "7–8 sq ft / pl",
      iconType: "play"
    }
  ]
};

const defaultLasertagSpyFeatures = [
  "Laser guns with lights and a small screen, and vests that show each hit right away",
  "3 to 4 team games and one big final game",
  "A 40-inch TV that shows the top players",
  "Glowing lights, UV art, and smoke machines for a cool spy look",
  "Control panels, game software, sound system, and staff training — all by our team"
];

const defaultLasertagSpy = {
  titleDark: "Laser Spy — Laser ",
  titleCyan: "Beam Game That Fits in a Small Room",
  desc: "Laser spy is a room full of laser beams. Players have to move through them without touching any. People love it and come back again and again to beat their best score. And it fits in a small room, so you can add it even when you don't have much space. We supply and set up the full game, ready to play.",
  listHeading: "What you get, fully set up:",
  badgeText: "Small Space. Big Thrills.",
  mainImgUrl: laserTagImg6,
  borderImgUrl: laserTagImg6Bg,
  smallImgUrl: laserTagImg6Small,
  buttonImgUrl: laserTagImg6Btn,
  bgUrl: laserTagBg3,
  features: defaultLasertagSpyFeatures
};

const defaultLasertagComparison = {
  title: "*Which Game Is* Right for Your Venue?",
  features: [
    "How to play",
    "Space needed",
    "Players at once",
    "Best for",
    "Earns money from",
    "The feel"
  ],
  lasertagPoints: [
    { text: "Teams shoot each other with laser guns in an open arena" },
    { text: "A big open room" },
    { text: "10 to 30+" },
    { text: "Big groups, parties, and events" },
    { text: "Group bookings and parties" },
    { text: "Fast, active team battle" }
  ],
  laserspyPoints: [
    { text: "Players move through laser beams without touching them" },
    { text: "A small room (from 150 sq ft)" },
    { text: "A few at a time" },
    { text: "Quick play and small spaces" },
    { text: "Repeat play and walk-ins" },
    { text: "A cool spy-movie challenge" }
  ],
  note: "Not sure which fits your venue? Our team looks at your space and how you want to run it, then suggests the right game or both, if you have the room."
};


export default function LaserTagDashboard({
  activeSection,
  formData = {},
  setFormData,
  handleFieldChange,
  persistSectionToDatabase,
  handleBrochureUpload,
  admin,
  setStatusMsg
}) {
  const handleCloudinaryUpload = async (file, callback) => {
    if (!file) return;
    setStatusMsg('Uploading image...');
    try {
      const res = await uploadImageFile(file, admin?.token);
      if (res?.url) {
        callback(res.url);
        setStatusMsg('Image uploaded successfully!');
      }
    } catch (err) {
      setStatusMsg('Upload failed: ' + (err.response?.data?.message || err.message));
    }
  };
  return (
    <>
          {activeSection === 'lasertagHero' && (() => {
            const currentSec = formData.lasertagHero || defaultLasertagHero;
            const heroImg = getAdminValidImageUrl(currentSec.bgUrl, defaultLasertagHero.bgUrl);
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Laser Tag Hero Banner Settings</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Hero Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 550 px (Aspect Ratio 16:9 / Banner)</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={heroImg} alt="Hero Preview" style={{ width: '120px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.bgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, lasertagHero: { ...(prev.lasertagHero || defaultLasertagHero), bgUrl: e.target.value } }))}
                        placeholder="Image URL or Asset Path"
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                      <label style={{ padding: '12px 20px', background: '#38bdf8', color: '#ffffff', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Upload style={{ width: '16px', height: '16px' }} /> Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const res = await uploadImageFile(file, admin.token);
                              setFormData(prev => ({ ...prev, lasertagHero: { ...(prev.lasertagHero || defaultLasertagHero), bgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                      {currentSec.bgUrl && (
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, lasertagHero: { ...(prev.lasertagHero || defaultLasertagHero), bgUrl: '' } }))}
                          style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '12px 18px', borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
                        >
                          Reset Image
                        </button>
                      )}
                    </div>
                    <AdminAltInput
                      compact
                      label="🏷️ Hero Background Alt Text (SEO Keyword)"
                      value={currentSec.bgAlt || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, lasertagHero: { ...(prev.lasertagHero || defaultLasertagHero), bgAlt: e.target.value } }))}
                      placeholder="e.g. Laser Tag Arena Equipment Suppliers - Winera"
                    />
                  </div>

                  {/* Mobile Screen Hero Banner Upload & Preview */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Mobile Screen Hero Banner <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📱 Recommended Size: 941 × 550 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img
                        src={getAdminValidImageUrl(currentSec.mobileBgUrl, defaultGameZoneMobileBanner)}
                        alt="Laser Tag Mobile Hero Bg Preview"
                        style={{ width: '120px', height: '65px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                      />
                      <input
                        type="text"
                        value={currentSec.mobileBgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, lasertagHero: { ...(prev.lasertagHero || defaultLasertagHero), mobileBgUrl: e.target.value } }))}
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
                              const res = await uploadImageFile(file, admin.token);
                              setFormData(prev => ({ ...prev, lasertagHero: { ...(prev.lasertagHero || defaultLasertagHero), mobileBgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                      {currentSec.mobileBgUrl && (
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, lasertagHero: { ...(prev.lasertagHero || defaultLasertagHero), mobileBgUrl: '' } }))}
                          style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '12px 18px', borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
                        >
                          Reset Image
                        </button>
                      )}
                    </div>
                    <AdminAltInput
                      compact
                      label="🏷️ Mobile Background Image Alt Text (SEO Keyword)"
                      value={currentSec.mobileBgAlt || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, lasertagHero: { ...(prev.lasertagHero || defaultLasertagHero), mobileBgAlt: e.target.value } }))}
                      placeholder="e.g. Laser Tag Arena Setup Mobile Banner - Winera"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Breadcrumb Label</label>
                    <input
                      type="text"
                      value={currentSec.breadcrumbText !== undefined ? currentSec.breadcrumbText : defaultLasertagHero.breadcrumbText}
                      onChange={(e) => setFormData(prev => ({ ...prev, lasertagHero: { ...(prev.lasertagHero || defaultLasertagHero), breadcrumbText: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('lasertagHero', formData.lasertagHero || defaultLasertagHero)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                    >
                      Save Laser Tag Hero Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* LASER TAG SUPPLIER INTRO FORM */}
          {activeSection === 'lasertagIntro' && (() => {
            const currentSec = formData.lasertagIntro || defaultLasertagIntro;
            const mainImg = getAdminValidImageUrl(currentSec.mainImgUrl, defaultLasertagIntro.mainImgUrl);
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Laser Tag Supplier Section Settings</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0284c7', marginBottom: '8px' }}>
                        Cyan Highlighted Title <span style={{ fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>Blue Color</span>
                      </label>
                      <input
                        type="text"
                        value={currentSec.titleHighlight !== undefined ? currentSec.titleHighlight : (defaultLasertagIntro.titleHighlight || "Laser Tag Gaming Equipment")}
                        onChange={(e) => setFormData(prev => ({ ...prev, lasertagIntro: { ...(prev.lasertagIntro || defaultLasertagIntro), titleHighlight: e.target.value } }))}
                        placeholder="e.g. Laser Tag Gaming Equipment"
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #38bdf8', fontSize: '14px', fontWeight: '600', color: '#0284c7' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                        Remaining Dark Title <span style={{ fontSize: '11px', color: '#475569', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>Dark Color</span>
                      </label>
                      <input
                        type="text"
                        value={currentSec.titleNormal !== undefined ? currentSec.titleNormal : (defaultLasertagIntro.titleNormal || "& Laser Spy Supplier in India")}
                        onChange={(e) => setFormData(prev => ({ ...prev, lasertagIntro: { ...(prev.lasertagIntro || defaultLasertagIntro), titleNormal: e.target.value } }))}
                        placeholder="e.g. & Laser Spy Supplier in India"
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: '600', color: '#0f172a' }}
                      />
                    </div>
                  </div>

                  {/* Live Visual Title Preview */}
                  <div style={{ background: '#f8fafc', border: '1px dashed #94a3b8', borderRadius: '12px', padding: '12px 16px' }}>
                    <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Live Title Preview on Website:</span>
                    <div style={{ fontSize: '18px', fontWeight: '900', marginTop: '4px', lineHeight: 1.25 }}>
                      <span style={{ color: '#38bdf8' }}>{currentSec.titleHighlight || defaultLasertagIntro.titleHighlight}</span>
                      {' '}
                      <span style={{ color: '#0f172a' }}>{currentSec.titleNormal || defaultLasertagIntro.titleNormal}</span>
                    </div>
                  </div>
                  <RichTextareaWithEditor
                    label="Description Paragraph"
                    rows={3}
                    value={currentSec.desc !== undefined ? currentSec.desc : defaultLasertagIntro.desc}
                    onChange={(val) => setFormData(prev => ({ ...prev, lasertagIntro: { ...(prev.lasertagIntro || defaultLasertagIntro), desc: val } }))}
                    placeholder="Enter Description Paragraph..."
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                      <input
                        type="text"
                        value={currentSec.buttonText !== undefined ? currentSec.buttonText : defaultLasertagIntro.buttonText}
                        onChange={(e) => setFormData(prev => ({ ...prev, lasertagIntro: { ...(prev.lasertagIntro || defaultLasertagIntro), buttonText: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                      <input
                        type="text"
                        value={(currentSec.buttonLink && currentSec.buttonLink.split('?')[0]) || defaultLasertagIntro.buttonLink}
                        onChange={(e) => {
                          const baseLink = e.target.value;
                          const msg = currentSec.waMessage || defaultLasertagIntro.waMessage;
                          const updatedLink = msg ? `${baseLink.split('?')[0]}?text=${encodeURIComponent(msg)}` : baseLink;
                          setFormData(prev => ({ ...prev, lasertagIntro: { ...(prev.lasertagIntro || defaultLasertagIntro), buttonLink: updatedLink } }));
                        }}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: '4px' }}>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                      WhatsApp Auto Pre-filled Message (Readable Text) <span style={{ fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '6px' }}>💬 Sent when user clicks Get A Quote</span>
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
                        return defaultLasertagIntro.waMessage;
                      })()}
                      onChange={(e) => {
                        const newMsg = e.target.value;
                        const baseLink = (currentSec.buttonLink && currentSec.buttonLink.split('?')[0]) || defaultLasertagIntro.buttonLink;
                        const updatedLink = newMsg ? `${baseLink}?text=${encodeURIComponent(newMsg)}` : baseLink;
                        setFormData(prev => ({
                          ...prev,
                          lasertagIntro: {
                            ...(prev.lasertagIntro || defaultLasertagIntro),
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
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Right Graphic Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 620 × 450 px (Aspect Ratio ~ 4:3 / 16:9 PNG)</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={mainImg} alt="Graphic Preview" style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.mainImgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, lasertagIntro: { ...(prev.lasertagIntro || defaultLasertagIntro), mainImgUrl: e.target.value } }))}
                        placeholder="Image URL or Asset Path"
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                      <label style={{ padding: '12px 20px', background: '#38bdf8', color: '#ffffff', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Upload style={{ width: '16px', height: '16px' }} /> Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const res = await uploadImageFile(file, admin.token);
                              setFormData(prev => ({ ...prev, lasertagIntro: { ...(prev.lasertagIntro || defaultLasertagIntro), mainImgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <AdminAltInput
                      compact
                      label="🏷️ Graphic Image Alt Text (SEO Keyword)"
                      value={currentSec.mainImgAlt || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, lasertagIntro: { ...(prev.lasertagIntro || defaultLasertagIntro), mainImgAlt: e.target.value } }))}
                      placeholder="e.g. Commercial Laser Tag Game Equipment - Winera"
                    />
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('lasertagIntro', formData.lasertagIntro || defaultLasertagIntro)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                    >
                      Save Laser Tag Supplier Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* LASER TAG SETUP (BLOCK 2) FORM */}
          {activeSection === 'lasertagSetup' && (() => {
            const currentSec = formData.lasertagSetup || defaultLasertagSetup;
            const mainImg = getAdminValidImageUrl(currentSec.mainImgUrl, defaultLasertagSetup.mainImgUrl);
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Laser Tag Setup (Block 2) Settings</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                        Main Dark Title <span style={{ fontSize: '11px', color: '#475569', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>Dark Color</span>
                      </label>
                      <input
                        type="text"
                        value={currentSec.titleNormal !== undefined ? currentSec.titleNormal : (defaultLasertagSetup.titleNormal || "One Team for Your Whole Laser")}
                        onChange={(e) => setFormData(prev => ({ ...prev, lasertagSetup: { ...(prev.lasertagSetup || defaultLasertagSetup), titleNormal: e.target.value } }))}
                        placeholder="e.g. One Team for Your Whole Laser"
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: '600', color: '#0f172a' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0284c7', marginBottom: '8px' }}>
                        Cyan Highlighted Title <span style={{ fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>Blue Color</span>
                      </label>
                      <input
                        type="text"
                        value={currentSec.titleHighlight !== undefined ? currentSec.titleHighlight : (defaultLasertagSetup.titleHighlight || "Tag & Laser Spy Setup")}
                        onChange={(e) => setFormData(prev => ({ ...prev, lasertagSetup: { ...(prev.lasertagSetup || defaultLasertagSetup), titleHighlight: e.target.value } }))}
                        placeholder="e.g. Tag & Laser Spy Setup"
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #38bdf8', fontSize: '14px', fontWeight: '600', color: '#0284c7' }}
                      />
                    </div>
                  </div>

                  {/* Live Visual Title Preview */}
                  <div style={{ background: '#f8fafc', border: '1px dashed #94a3b8', borderRadius: '12px', padding: '12px 16px' }}>
                    <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Live Title Preview on Website:</span>
                    <div style={{ fontSize: '18px', fontWeight: '900', marginTop: '4px', lineHeight: 1.25 }}>
                      <span style={{ color: '#0f172a' }}>{currentSec.titleNormal || defaultLasertagSetup.titleNormal}</span>
                      {' '}
                      <span style={{ color: '#38bdf8' }}>{currentSec.titleHighlight || defaultLasertagSetup.titleHighlight}</span>
                    </div>
                  </div>

                  <RichTextareaWithEditor
                    label="First Paragraph"
                    rows={3}
                    value={currentSec.paragraph1 !== undefined ? currentSec.paragraph1 : defaultLasertagSetup.paragraph1}
                    onChange={(val) => setFormData(prev => ({ ...prev, lasertagSetup: { ...(prev.lasertagSetup || defaultLasertagSetup), paragraph1: val } }))}
                    placeholder="Enter First Paragraph..."
                  />

                  <RichTextareaWithEditor
                    label="Second Paragraph"
                    rows={3}
                    value={currentSec.paragraph2 !== undefined ? currentSec.paragraph2 : defaultLasertagSetup.paragraph2}
                    onChange={(val) => setFormData(prev => ({ ...prev, lasertagSetup: { ...(prev.lasertagSetup || defaultLasertagSetup), paragraph2: val } }))}
                    placeholder="Enter Second Paragraph..."
                  />

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Left Graphic Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 520 × 450 px (Aspect Ratio ~ 4:3 / 1:1 PNG)</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={mainImg} alt="Graphic Preview" style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.mainImgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, lasertagSetup: { ...(prev.lasertagSetup || defaultLasertagSetup), mainImgUrl: e.target.value } }))}
                        placeholder="Image URL or Asset Path"
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                      <label style={{ padding: '12px 20px', background: '#38bdf8', color: '#ffffff', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Upload style={{ width: '16px', height: '16px' }} /> Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const res = await uploadImageFile(file, admin.token);
                              setFormData(prev => ({ ...prev, lasertagSetup: { ...(prev.lasertagSetup || defaultLasertagSetup), mainImgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <AdminAltInput
                      compact
                      label="🏷️ Graphic Image Alt Text (SEO Keyword)"
                      value={currentSec.mainImgAlt || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, lasertagSetup: { ...(prev.lasertagSetup || defaultLasertagSetup), mainImgAlt: e.target.value } }))}
                      placeholder="e.g. Commercial Laser Tag Arena Setup - Winera"
                    />
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('lasertagSetup', formData.lasertagSetup || defaultLasertagSetup)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                    >
                      Save Laser Tag Setup Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* LASER TAG GREAT FOR GROUPS (BLOCK 3) FORM */}
          {activeSection === 'lasertagGroups' && (() => {
            const currentSec = formData.lasertagGroups || defaultLasertagGroups;
            const mainImg = getAdminValidImageUrl(currentSec.mainImgUrl, defaultLasertagGroups.mainImgUrl);
            const currentFeatures = Array.isArray(currentSec.features) && currentSec.features.length > 0
              ? currentSec.features
              : defaultLasertagGroups.features;

            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Laser Tag - Great for Groups (Block 3) Settings</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                  {/* Title Fields */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0284c7', marginBottom: '8px' }}>
                        Cyan Highlighted Title <span style={{ fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>Blue Color</span>
                      </label>
                      <input
                        type="text"
                        value={currentSec.titleHighlight !== undefined ? currentSec.titleHighlight : (defaultLasertagGroups.titleHighlight || "Laser Tag - ")}
                        onChange={(e) => setFormData(prev => ({ ...prev, lasertagGroups: { ...(prev.lasertagGroups || defaultLasertagGroups), titleHighlight: e.target.value } }))}
                        placeholder="e.g. Laser Tag - "
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #38bdf8', fontSize: '14px', fontWeight: '600', color: '#0284c7' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                        Main Dark Title <span style={{ fontSize: '11px', color: '#475569', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>Dark Color</span>
                      </label>
                      <input
                        type="text"
                        value={currentSec.titleNormal !== undefined ? currentSec.titleNormal : (defaultLasertagGroups.titleNormal || "Great for Groups")}
                        onChange={(e) => setFormData(prev => ({ ...prev, lasertagGroups: { ...(prev.lasertagGroups || defaultLasertagGroups), titleNormal: e.target.value } }))}
                        placeholder="e.g. Great for Groups"
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: '600', color: '#0f172a' }}
                      />
                    </div>
                  </div>

                  {/* Live Visual Title Preview */}
                  <div style={{ background: '#f8fafc', border: '1px dashed #94a3b8', borderRadius: '12px', padding: '12px 16px', textAlign: 'center' }}>
                    <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Live Title Preview on Website:</span>
                    <div style={{ fontSize: '20px', fontWeight: '900', marginTop: '6px', lineHeight: 1.25 }}>
                      <span style={{ color: '#38bdf8' }}>{currentSec.titleHighlight || defaultLasertagGroups.titleHighlight}</span>
                      <span style={{ color: '#0f172a' }}>{currentSec.titleNormal || defaultLasertagGroups.titleNormal}</span>
                    </div>
                  </div>

                  {/* Section Description */}
                  <RichTextareaWithEditor
                    label="Section Subtitle / Description"
                    rows={3}
                    value={currentSec.desc !== undefined ? currentSec.desc : defaultLasertagGroups.desc}
                    onChange={(val) => setFormData(prev => ({ ...prev, lasertagGroups: { ...(prev.lasertagGroups || defaultLasertagGroups), desc: val } }))}
                    placeholder="Enter subtitle description..."
                  />

                  {/* Checklist Subheading */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Checklist Heading</label>
                    <input
                      type="text"
                      value={currentSec.listHeading !== undefined ? currentSec.listHeading : defaultLasertagGroups.listHeading}
                      onChange={(e) => setFormData(prev => ({ ...prev, lasertagGroups: { ...(prev.lasertagGroups || defaultLasertagGroups), listHeading: e.target.value } }))}
                      placeholder="e.g. What you get, fully set up:"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: '700' }}
                    />
                  </div>

                  {/* Checklist Features Manager */}
                  <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                        Checklist Bullet Points ({currentFeatures.length} items)
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...currentFeatures, "New setup feature item"];
                          setFormData(prev => ({ ...prev, lasertagGroups: { ...(prev.lasertagGroups || defaultLasertagGroups), features: updated } }));
                        }}
                        style={{ background: '#e0f2fe', color: '#0284c7', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <Plus style={{ width: '14px', height: '14px' }} /> Add Point
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {currentFeatures.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={homePageIcon} alt="check" style={{ width: '16px', height: '16px', flexShrink: 0 }} />
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => {
                              const updated = [...currentFeatures];
                              updated[idx] = e.target.value;
                              setFormData(prev => ({ ...prev, lasertagGroups: { ...(prev.lasertagGroups || defaultLasertagGroups), features: updated } }));
                            }}
                            placeholder={`Point ${idx + 1}...`}
                            style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
                          />
                          {currentFeatures.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = currentFeatures.filter((_, i) => i !== idx);
                                setFormData(prev => ({ ...prev, lasertagGroups: { ...(prev.lasertagGroups || defaultLasertagGroups), features: updated } }));
                              }}
                              style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              <Trash2 style={{ width: '14px', height: '14px' }} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Graphic Image */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Right Photo Graphic <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 616 × 482 px (PNG / WebP)</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={mainImg} alt="Graphic Preview" style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.mainImgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, lasertagGroups: { ...(prev.lasertagGroups || defaultLasertagGroups), mainImgUrl: e.target.value } }))}
                        placeholder="Image URL or Asset Path"
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                      <label style={{ padding: '12px 20px', background: '#38bdf8', color: '#ffffff', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Upload style={{ width: '16px', height: '16px' }} /> Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const res = await uploadImageFile(file, admin.token);
                              setFormData(prev => ({ ...prev, lasertagGroups: { ...(prev.lasertagGroups || defaultLasertagGroups), mainImgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <AdminAltInput
                      compact
                      label="🏷️ Right Photo Graphic Alt Text (SEO Keyword)"
                      value={currentSec.mainImgAlt || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, lasertagGroups: { ...(prev.lasertagGroups || defaultLasertagGroups), mainImgAlt: e.target.value } }))}
                      placeholder="e.g. Laser Tag for Groups & Birthday Parties - Winera"
                    />
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('lasertagGroups', formData.lasertagGroups || defaultLasertagGroups)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                    >
                      Save Great for Groups Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* LASER TAG TECHNICAL SPECIFICATIONS (BLOCK 4) FORM */}
          {activeSection === 'lasertagSpecs' && (() => {
            const currentSec = formData.lasertagSpecs || defaultLasertagSpecs;
            const bgImg = getAdminValidImageUrl(currentSec.bgUrl, defaultLasertagSpecs.bgUrl);
            const currentRows = Array.isArray(currentSec.rows) && currentSec.rows.length > 0
              ? currentSec.rows
              : defaultLasertagSpecs.rows;

            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Laser Tag - Technical Specifications (Block 4) Settings</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                  {/* Title Inputs with Color Separation */}
                  <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#eab308', marginBottom: '8px' }}>
                          🟡 Yellow Highlighted Title
                        </label>
                        <input
                          type="text"
                          value={currentSec.titleHighlight !== undefined ? currentSec.titleHighlight : defaultLasertagSpecs.titleHighlight}
                          onChange={(e) => setFormData(prev => ({ ...prev, lasertagSpecs: { ...(prev.lasertagSpecs || defaultLasertagSpecs), titleHighlight: e.target.value } }))}
                          placeholder="e.g. Technical"
                          style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: '700' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                          ⚪ Main Title
                        </label>
                        <input
                          type="text"
                          value={currentSec.titleNormal !== undefined ? currentSec.titleNormal : defaultLasertagSpecs.titleNormal}
                          onChange={(e) => setFormData(prev => ({ ...prev, lasertagSpecs: { ...(prev.lasertagSpecs || defaultLasertagSpecs), titleNormal: e.target.value } }))}
                          placeholder="e.g. Specifications"
                          style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: '700' }}
                        />
                      </div>
                    </div>
                    {/* Live Preview */}
                    <div style={{ marginTop: '14px', padding: '10px 16px', background: '#051b47', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '11.5px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Preview:</span>
                      <span style={{ fontSize: '18px', fontWeight: '900', color: '#eab308' }}>
                        {currentSec.titleHighlight !== undefined ? currentSec.titleHighlight : defaultLasertagSpecs.titleHighlight}
                      </span>
                      <span style={{ fontSize: '18px', fontWeight: '900', color: '#ffffff' }}>
                        {currentSec.titleNormal !== undefined ? currentSec.titleNormal : defaultLasertagSpecs.titleNormal}
                      </span>
                    </div>
                  </div>

                  {/* Table Column Headers */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Table Column 1 Heading</label>
                      <input
                        type="text"
                        value={currentSec.specHeading !== undefined ? currentSec.specHeading : defaultLasertagSpecs.specHeading}
                        onChange={(e) => setFormData(prev => ({ ...prev, lasertagSpecs: { ...(prev.lasertagSpecs || defaultLasertagSpecs), specHeading: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Table Column 2 Heading</label>
                      <input
                        type="text"
                        value={currentSec.detailsHeading !== undefined ? currentSec.detailsHeading : defaultLasertagSpecs.detailsHeading}
                        onChange={(e) => setFormData(prev => ({ ...prev, lasertagSpecs: { ...(prev.lasertagSpecs || defaultLasertagSpecs), detailsHeading: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  {/* Table Rows Manager */}
                  <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>
                        Specifications Table Rows ({currentRows.length})
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...currentRows, { spec: "New Specification", details: "Specification details here" }];
                          setFormData(prev => ({ ...prev, lasertagSpecs: { ...(prev.lasertagSpecs || defaultLasertagSpecs), rows: updated } }));
                        }}
                        style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '12px', cursor: 'pointer' }}
                      >
                        + Add Spec Row
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {currentRows.map((row, idx) => (
                        <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 42px', gap: '10px', alignItems: 'center' }}>
                          <input
                            type="text"
                            value={row.spec || ''}
                            onChange={(e) => {
                              const updated = [...currentRows];
                              updated[idx] = { ...updated[idx], spec: e.target.value };
                              setFormData(prev => ({ ...prev, lasertagSpecs: { ...(prev.lasertagSpecs || defaultLasertagSpecs), rows: updated } }));
                            }}
                            placeholder="Specification (e.g. Players)"
                            style={{ padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                          />
                          <input
                            type="text"
                            value={row.details || row.detail || row.value || ''}
                            onChange={(e) => {
                              const updated = [...currentRows];
                              updated[idx] = { ...updated[idx], details: e.target.value };
                              setFormData(prev => ({ ...prev, lasertagSpecs: { ...(prev.lasertagSpecs || defaultLasertagSpecs), rows: updated } }));
                            }}
                            placeholder="Details (e.g. 10 to 30+ simultaneously)"
                            style={{ padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                          />
                          {currentRows.length > 1 ? (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = currentRows.filter((_, i) => i !== idx);
                                setFormData(prev => ({ ...prev, lasertagSpecs: { ...(prev.lasertagSpecs || defaultLasertagSpecs), rows: updated } }));
                              }}
                              style={{ background: '#fee2e2', color: '#ef4444', border: 'none', width: '38px', height: '38px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              <Trash2 style={{ width: '14px', height: '14px' }} />
                            </button>
                          ) : <div />}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Button Settings */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                      <input
                        type="text"
                        value={currentSec.buttonText !== undefined ? currentSec.buttonText : defaultLasertagSpecs.buttonText}
                        onChange={(e) => setFormData(prev => ({ ...prev, lasertagSpecs: { ...(prev.lasertagSpecs || defaultLasertagSpecs), buttonText: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                        Button Target URL / Brochure PDF / WhatsApp Link
                      </label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          value={currentSec.buttonLink !== undefined ? currentSec.buttonLink : defaultLasertagSpecs.buttonLink}
                          onChange={(e) => setFormData(prev => ({ ...prev, lasertagSpecs: { ...(prev.lasertagSpecs || defaultLasertagSpecs), buttonLink: e.target.value } }))}
                          placeholder="WhatsApp link or PDF brochure URL"
                          style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                        />
                        <label style={{ background: '#38bdf8', color: '#fff', padding: '12px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '12.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                          <Upload style={{ width: '15px', height: '15px' }} /> Upload PDF
                          <input
                            type="file"
                            accept="application/pdf,.pdf"
                            onChange={(e) => handleBrochureUpload(e, 'lasertagSpecs', 'buttonLink', {}, defaultLasertagSpecs)}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </div>
                      <div style={{ marginTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>
                          💡 Cloudinary Free plan limit: <strong>10 MB</strong> (Allows larger files automatically with a Cloudinary Pro plan). Compress via <a href="https://www.ilovepdf.com/compress_pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#0284c7', textDecoration: 'underline', fontWeight: '700' }}>iLovePDF</a> if needed.
                        </span>
                        {(() => {
                          const activePdf = currentSec.buttonLink !== undefined ? currentSec.buttonLink : defaultLasertagSpecs.buttonLink;
                          return activePdf && !activePdf.includes('wa.me') && activePdf !== '#' ? (
                            <a
                              href={activePdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ fontSize: '11.5px', color: '#0284c7', fontWeight: '700', textDecoration: 'underline' }}
                            >
                              📄 Test & Preview Laser Tag Brochure
                            </a>
                          ) : null;
                        })()}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Pre-filled WhatsApp Message</label>
                    <input
                      type="text"
                      value={currentSec.waMessage !== undefined ? currentSec.waMessage : defaultLasertagSpecs.waMessage}
                      onChange={(e) => setFormData(prev => ({ ...prev, lasertagSpecs: { ...(prev.lasertagSpecs || defaultLasertagSpecs), waMessage: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>

                  {/* Card Background Graphic */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Card Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1440 × 779 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={bgImg} alt="BG Preview" style={{ width: '110px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.bgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, lasertagSpecs: { ...(prev.lasertagSpecs || defaultLasertagSpecs), bgUrl: e.target.value } }))}
                        placeholder="Background Image URL or Asset Path"
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                      <label style={{ padding: '12px 20px', background: '#38bdf8', color: '#ffffff', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Upload style={{ width: '16px', height: '16px' }} /> Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const res = await uploadImageFile(file, admin.token);
                              setFormData(prev => ({ ...prev, lasertagSpecs: { ...(prev.lasertagSpecs || defaultLasertagSpecs), bgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <AdminAltInput
                      compact
                      label="🏷️ Card Background Image Alt Text (SEO Keyword)"
                      value={currentSec.bgAlt || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, lasertagSpecs: { ...(prev.lasertagSpecs || defaultLasertagSpecs), bgAlt: e.target.value } }))}
                      placeholder="e.g. Laser Tag Technical Specifications Arena - Winera"
                    />
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('lasertagSpecs', formData.lasertagSpecs || defaultLasertagSpecs)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                    >
                      Save Technical Specifications Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* LASER TAG SPACE REQUIREMENTS (BLOCK 5) FORM */}
          {activeSection === 'lasertagSpace' && (() => {
            const currentSec = formData.lasertagSpace || defaultLasertagSpace;
            const mainImg = getAdminValidImageUrl(currentSec.mainImgUrl, defaultLasertagSpace.mainImgUrl);
            const currentZones = Array.isArray(currentSec.zones) && currentSec.zones.length > 0
              ? currentSec.zones
              : defaultLasertagSpace.zones;

            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Laser Tag - Space Requirements (Block 5) Settings</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                  {/* Title Inputs with Color Separation */}
                  <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0284c7', marginBottom: '8px' }}>
                          🔵 Cyan Highlighted Title
                        </label>
                        <input
                          type="text"
                          value={currentSec.titleHighlight !== undefined ? currentSec.titleHighlight : defaultLasertagSpace.titleHighlight}
                          onChange={(e) => setFormData(prev => ({ ...prev, lasertagSpace: { ...(prev.lasertagSpace || defaultLasertagSpace), titleHighlight: e.target.value } }))}
                          placeholder="e.g. How Much Space"
                          style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: '700' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                          ⚫ Main Dark Title
                        </label>
                        <input
                          type="text"
                          value={currentSec.titleNormal !== undefined ? currentSec.titleNormal : defaultLasertagSpace.titleNormal}
                          onChange={(e) => setFormData(prev => ({ ...prev, lasertagSpace: { ...(prev.lasertagSpace || defaultLasertagSpace), titleNormal: e.target.value } }))}
                          placeholder="e.g. You Need for Laser Tag"
                          style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: '700' }}
                        />
                      </div>
                    </div>
                    {/* Live Preview */}
                    <div style={{ marginTop: '14px', padding: '10px 16px', background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '11.5px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Preview:</span>
                      <span style={{ fontSize: '18px', fontWeight: '900', color: '#38bdf8' }}>
                        {currentSec.titleHighlight !== undefined ? currentSec.titleHighlight : defaultLasertagSpace.titleHighlight}
                      </span>
                      <span style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a' }}>
                        {currentSec.titleNormal !== undefined ? currentSec.titleNormal : defaultLasertagSpace.titleNormal}
                      </span>
                    </div>
                  </div>

                  {/* Description Textarea */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Description Text</label>
                    <RichTextareaWithEditor
                      rows={3}
                      value={currentSec.desc !== undefined ? currentSec.desc : defaultLasertagSpace.desc}
                      onChange={(val) => setFormData(prev => ({ ...prev, lasertagSpace: { ...(prev.lasertagSpace || defaultLasertagSpace), desc: val } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', lineHeight: 1.5 }}
                    />
                  </div>

                  {/* Zones Table Manager */}
                  <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>
                        Space Breakdown Zones ({currentZones.length})
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const nextNum = currentZones.length + 1 < 10 ? `0${currentZones.length + 1}` : `${currentZones.length + 1}`;
                          const updated = [...currentZones, { num: nextNum, title: "NEW ZONE AREA", subtitle: "(ZONE PURPOSE)", space: "~200 sq ft", iconType: "rules" }];
                          setFormData(prev => ({ ...prev, lasertagSpace: { ...(prev.lasertagSpace || defaultLasertagSpace), zones: updated } }));
                        }}
                        style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '12px', cursor: 'pointer' }}
                      >
                        + Add Zone Row
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {currentZones.map((zone, idx) => (
                        <div key={idx} style={{ display: 'grid', gridTemplateColumns: '70px 1.2fr 1.2fr 1fr 42px', gap: '10px', alignItems: 'center' }}>
                          <input
                            type="text"
                            value={zone.num || ''}
                            onChange={(e) => {
                              const updated = [...currentZones];
                              updated[idx] = { ...updated[idx], num: e.target.value };
                              setFormData(prev => ({ ...prev, lasertagSpace: { ...(prev.lasertagSpace || defaultLasertagSpace), zones: updated } }));
                            }}
                            placeholder="01"
                            style={{ padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '800', textAlign: 'center' }}
                          />
                          <input
                            type="text"
                            value={zone.title || ''}
                            onChange={(e) => {
                              const updated = [...currentZones];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setFormData(prev => ({ ...prev, lasertagSpace: { ...(prev.lasertagSpace || defaultLasertagSpace), zones: updated } }));
                            }}
                            placeholder="Title (e.g. BRIEFING AREA)"
                            style={{ padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                          />
                          <input
                            type="text"
                            value={zone.subtitle || ''}
                            onChange={(e) => {
                              const updated = [...currentZones];
                              updated[idx] = { ...updated[idx], subtitle: e.target.value };
                              setFormData(prev => ({ ...prev, lasertagSpace: { ...(prev.lasertagSpace || defaultLasertagSpace), zones: updated } }));
                            }}
                            placeholder="Subtitle (e.g. (EXPLAIN THE RULES))"
                            style={{ padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                          />
                          <input
                            type="text"
                            value={zone.space || ''}
                            onChange={(e) => {
                              const updated = [...currentZones];
                              updated[idx] = { ...updated[idx], space: e.target.value };
                              setFormData(prev => ({ ...prev, lasertagSpace: { ...(prev.lasertagSpace || defaultLasertagSpace), zones: updated } }));
                            }}
                            placeholder="Space (e.g. ~150 sq ft)"
                            style={{ padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                          />
                          {currentZones.length > 1 ? (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = currentZones.filter((_, i) => i !== idx);
                                setFormData(prev => ({ ...prev, lasertagSpace: { ...(prev.lasertagSpace || defaultLasertagSpace), zones: updated } }));
                              }}
                              style={{ background: '#fee2e2', color: '#ef4444', border: 'none', width: '38px', height: '38px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              <Trash2 style={{ width: '14px', height: '14px' }} />
                            </button>
                          ) : <div />}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right 3D Schematic Image Graphic */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Right 3D Arena Schematic Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 727 × 350 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={mainImg} alt="Arena Preview" style={{ width: '110px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.mainImgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, lasertagSpace: { ...(prev.lasertagSpace || defaultLasertagSpace), mainImgUrl: e.target.value } }))}
                        placeholder="Image URL or Asset Path"
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                      <label style={{ padding: '12px 20px', background: '#38bdf8', color: '#ffffff', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Upload style={{ width: '16px', height: '16px' }} /> Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const res = await uploadImageFile(file, admin.token);
                              setFormData(prev => ({ ...prev, lasertagSpace: { ...(prev.lasertagSpace || defaultLasertagSpace), mainImgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <AdminAltInput
                      compact
                      label="🏷️ Schematic Image Alt Text (SEO Keyword)"
                      value={currentSec.mainImgAlt || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, lasertagSpace: { ...(prev.lasertagSpace || defaultLasertagSpace), mainImgAlt: e.target.value } }))}
                      placeholder="e.g. Laser Tag Arena Space Requirements 3D Layout - Winera"
                    />
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('lasertagSpace', formData.lasertagSpace || defaultLasertagSpace)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                    >
                      Save Space Requirements Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* LASER TAG - LASER SPY SECTION FORM */}
          {activeSection === 'lasertagSpy' && (() => {
            const spyData = formData.lasertagSpy || defaultLasertagSpy;
            const features = Array.isArray(spyData.features) ? spyData.features : defaultLasertagSpyFeatures;

            const handleSpyChange = (field, val) => {
              setFormData(prev => ({
                ...prev,
                lasertagSpy: {
                  ...(prev.lasertagSpy || defaultLasertagSpy),
                  [field]: val
                }
              }));
            };

            const handleFeatureChange = (idx, val) => {
              const updated = [...features];
              updated[idx] = val;
              handleSpyChange('features', updated);
            };

            const addFeature = () => {
              handleSpyChange('features', [...features, 'New setup item']);
            };

            const removeFeature = (idx) => {
              handleSpyChange('features', features.filter((_, i) => i !== idx));
            };

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                    Laser Spy — Laser Beam Game Section (Small Space)
                  </h3>
                  <button
                    onClick={() => persistSectionToDatabase('lasertagSpy', formData.lasertagSpy || defaultLasertagSpy)}
                    style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '10px 22px', borderRadius: '10px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)' }}
                  >
                    Save Laser Spy Section
                  </button>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '6px' }}>Title (Dark Part):</label>
                      <input
                        type="text"
                        value={spyData.titleDark ?? "Laser Spy — Laser "}
                        onChange={(e) => handleSpyChange('titleDark', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: '600' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '6px' }}>Title (Cyan Highlight Part):</label>
                      <input
                        type="text"
                        value={spyData.titleCyan ?? "Beam Game That Fits in a Small Room"}
                        onChange={(e) => handleSpyChange('titleCyan', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: '600' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '6px' }}>Section Description:</label>
                    <RichTextareaWithEditor
                      rows={3}
                      value={spyData.desc !== undefined && spyData.desc !== null ? spyData.desc : (defaultLasertagSpy.desc || "")}
                      onChange={(val) => handleSpyChange('desc', val)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', lineHeight: 1.5 }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '6px' }}>List Heading:</label>
                      <input
                        type="text"
                        value={spyData.listHeading ?? "What you get, fully set up:"}
                        onChange={(e) => handleSpyChange('listHeading', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: '600' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '6px' }}>Small Badge Text:</label>
                      <input
                        type="text"
                        value={spyData.badgeText ?? "Small Space. Big Thrills."}
                        onChange={(e) => handleSpyChange('badgeText', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: '600' }}
                      />
                    </div>
                  </div>

                  {/* IMAGES UPLOADER SECTION */}
                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#1e293b', marginBottom: '14px' }}>Section Image</h4>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '6px' }}>
                        Big Main Arena Image: <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 630 × 492 px</span>
                      </label>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <img src={spyData.mainImgUrl || laserTagImg6} alt="Main" style={{ width: '90px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }} />
                        <input
                          type="text"
                          value={spyData.mainImgUrl || ''}
                          onChange={(e) => handleSpyChange('mainImgUrl', e.target.value)}
                          placeholder="Image URL or Asset Path"
                          style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                        />
                        <label style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Upload style={{ width: '15px', height: '15px' }} /> Upload
                          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => e.target.files?.[0] && handleCloudinaryUpload(e.target.files[0], (url) => handleSpyChange('mainImgUrl', url))} />
                        </label>
                      </div>
                      <AdminAltInput
                        compact
                        label="🏷️ Big Main Arena Image Alt Text (SEO Keyword)"
                        value={spyData.mainImgAlt || ''}
                        onChange={(e) => handleSpyChange('mainImgAlt', e.target.value)}
                        placeholder="e.g. Laser Spy Laser Beam Maze Room Setup - Winera"
                      />
                    </div>
                  </div>

                  {/* FEATURES LIST */}
                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#1e293b', margin: 0 }}>Checklist Items</h4>
                      <button
                        onClick={addFeature}
                        style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#0f172a', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                      >
                        + Add Item
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {features.map((feat, fIdx) => (
                        <div key={fIdx} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', width: '24px' }}>#{fIdx + 1}</span>
                          <input
                            type="text"
                            value={feat}
                            onChange={(e) => handleFeatureChange(fIdx, e.target.value)}
                            style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                          />
                          <button
                            onClick={() => removeFeature(fIdx)}
                            style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('lasertagSpy', formData.lasertagSpy || defaultLasertagSpy)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                    >
                      Save Laser Spy Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* LASER SPY TECHNICAL SPECIFICATIONS FORM */}
          {activeSection === 'lasertagSpySpecs' && (() => {
            const currentSec = formData.lasertagSpySpecs || defaultLasertagSpySpecs;
            const bgImg = getAdminValidImageUrl(currentSec.bgUrl, defaultLasertagSpySpecs.bgUrl);
            const currentRows = Array.isArray(currentSec.rows) && currentSec.rows.length > 0
              ? currentSec.rows
              : defaultLasertagSpySpecs.rows;

            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Laser Spy - Technical Specifications Settings</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                  {/* Title Inputs with Color Separation */}
                  <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#eab308', marginBottom: '8px' }}>
                          🟡 Yellow Highlighted Title
                        </label>
                        <input
                          type="text"
                          value={currentSec.titleHighlight !== undefined ? currentSec.titleHighlight : defaultLasertagSpySpecs.titleHighlight}
                          onChange={(e) => setFormData(prev => ({ ...prev, lasertagSpySpecs: { ...(prev.lasertagSpySpecs || defaultLasertagSpySpecs), titleHighlight: e.target.value } }))}
                          placeholder="e.g. Technical"
                          style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: '700' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                          ⚪ Main Title
                        </label>
                        <input
                          type="text"
                          value={currentSec.titleNormal !== undefined ? currentSec.titleNormal : defaultLasertagSpySpecs.titleNormal}
                          onChange={(e) => setFormData(prev => ({ ...prev, lasertagSpySpecs: { ...(prev.lasertagSpySpecs || defaultLasertagSpySpecs), titleNormal: e.target.value } }))}
                          placeholder="e.g. Specifications"
                          style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: '700' }}
                        />
                      </div>
                    </div>
                    {/* Live Preview */}
                    <div style={{ marginTop: '14px', padding: '10px 16px', background: '#051b47', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '11.5px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Preview:</span>
                      <span style={{ fontSize: '18px', fontWeight: '900', color: '#eab308' }}>
                        {currentSec.titleHighlight !== undefined ? currentSec.titleHighlight : defaultLasertagSpySpecs.titleHighlight}
                      </span>
                      <span style={{ fontSize: '18px', fontWeight: '900', color: '#ffffff' }}>
                        {currentSec.titleNormal !== undefined ? currentSec.titleNormal : defaultLasertagSpySpecs.titleNormal}
                      </span>
                    </div>
                  </div>

                  {/* Table Column Headers */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Table Column 1 Heading</label>
                      <input
                        type="text"
                        value={currentSec.specHeading !== undefined ? currentSec.specHeading : defaultLasertagSpySpecs.specHeading}
                        onChange={(e) => setFormData(prev => ({ ...prev, lasertagSpySpecs: { ...(prev.lasertagSpySpecs || defaultLasertagSpySpecs), specHeading: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Table Column 2 Heading</label>
                      <input
                        type="text"
                        value={currentSec.detailsHeading !== undefined ? currentSec.detailsHeading : defaultLasertagSpySpecs.detailsHeading}
                        onChange={(e) => setFormData(prev => ({ ...prev, lasertagSpySpecs: { ...(prev.lasertagSpySpecs || defaultLasertagSpySpecs), detailsHeading: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  {/* Table Rows Manager */}
                  <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>
                        Specifications Table Rows ({currentRows.length})
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...currentRows, { spec: "New Specification", details: "Specification details here" }];
                          setFormData(prev => ({ ...prev, lasertagSpySpecs: { ...(prev.lasertagSpySpecs || defaultLasertagSpySpecs), rows: updated } }));
                        }}
                        style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '12px', cursor: 'pointer' }}
                      >
                        + Add Spec Row
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {currentRows.map((row, idx) => (
                        <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 42px', gap: '10px', alignItems: 'center' }}>
                          <input
                            type="text"
                            value={row.spec || ''}
                            onChange={(e) => {
                              const updated = [...currentRows];
                              updated[idx] = { ...updated[idx], spec: e.target.value };
                              setFormData(prev => ({ ...prev, lasertagSpySpecs: { ...(prev.lasertagSpySpecs || defaultLasertagSpySpecs), rows: updated } }));
                            }}
                            placeholder="Specification (e.g. Smallest space)"
                            style={{ padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                          />
                          <input
                            type="text"
                            value={row.details || row.detail || row.value || ''}
                            onChange={(e) => {
                              const updated = [...currentRows];
                              updated[idx] = { ...updated[idx], details: e.target.value };
                              setFormData(prev => ({ ...prev, lasertagSpySpecs: { ...(prev.lasertagSpySpecs || defaultLasertagSpySpecs), rows: updated } }));
                            }}
                            placeholder="Details (e.g. 150 sq ft)"
                            style={{ padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                          />
                          {currentRows.length > 1 ? (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = currentRows.filter((_, i) => i !== idx);
                                setFormData(prev => ({ ...prev, lasertagSpySpecs: { ...(prev.lasertagSpySpecs || defaultLasertagSpySpecs), rows: updated } }));
                              }}
                              style={{ background: '#fee2e2', color: '#ef4444', border: 'none', width: '38px', height: '38px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              <Trash2 style={{ width: '14px', height: '14px' }} />
                            </button>
                          ) : <div />}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Button Settings */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                      <input
                        type="text"
                        value={currentSec.buttonText !== undefined ? currentSec.buttonText : defaultLasertagSpySpecs.buttonText}
                        onChange={(e) => setFormData(prev => ({ ...prev, lasertagSpySpecs: { ...(prev.lasertagSpySpecs || defaultLasertagSpySpecs), buttonText: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                        Button Target URL / Brochure PDF / WhatsApp Link
                      </label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          value={currentSec.buttonLink !== undefined ? currentSec.buttonLink : defaultLasertagSpySpecs.buttonLink}
                          onChange={(e) => setFormData(prev => ({ ...prev, lasertagSpySpecs: { ...(prev.lasertagSpySpecs || defaultLasertagSpySpecs), buttonLink: e.target.value } }))}
                          placeholder="WhatsApp link or PDF brochure URL"
                          style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                        />
                        <label style={{ background: '#38bdf8', color: '#fff', padding: '12px 16px', borderRadius: '14px', fontWeight: '800', fontSize: '12.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                          <Upload style={{ width: '15px', height: '15px' }} /> Upload PDF
                          <input
                            type="file"
                            accept="application/pdf,.pdf"
                            onChange={(e) => handleBrochureUpload(e, 'lasertagSpySpecs', 'buttonLink', {}, defaultLasertagSpySpecs)}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </div>
                      <div style={{ marginTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>
                          💡 Cloudinary Free plan limit: <strong>10 MB</strong> (Allows larger files automatically with a Cloudinary Pro plan). Compress via <a href="https://www.ilovepdf.com/compress_pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#0284c7', textDecoration: 'underline', fontWeight: '700' }}>iLovePDF</a> if needed.
                        </span>
                        {(() => {
                          const activePdf = currentSec.buttonLink !== undefined ? currentSec.buttonLink : defaultLasertagSpySpecs.buttonLink;
                          return activePdf && !activePdf.includes('wa.me') && activePdf !== '#' ? (
                            <a
                              href={activePdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ fontSize: '11.5px', color: '#0284c7', fontWeight: '700', textDecoration: 'underline' }}
                            >
                              📄 Test & Preview Laser Spy Brochure
                            </a>
                          ) : null;
                        })()}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Pre-filled WhatsApp Message</label>
                    <input
                      type="text"
                      value={currentSec.waMessage !== undefined ? currentSec.waMessage : defaultLasertagSpySpecs.waMessage}
                      onChange={(e) => setFormData(prev => ({ ...prev, lasertagSpySpecs: { ...(prev.lasertagSpySpecs || defaultLasertagSpySpecs), waMessage: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>

                  {/* Card Background Graphic */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Card Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1440 × 779 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={bgImg} alt="BG Preview" style={{ width: '110px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.bgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, lasertagSpySpecs: { ...(prev.lasertagSpySpecs || defaultLasertagSpySpecs), bgUrl: e.target.value } }))}
                        placeholder="Background Image URL or Asset Path"
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                      <label style={{ padding: '12px 20px', background: '#38bdf8', color: '#ffffff', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Upload style={{ width: '16px', height: '16px' }} /> Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const res = await uploadImageFile(file, admin.token);
                              setFormData(prev => ({ ...prev, lasertagSpySpecs: { ...(prev.lasertagSpySpecs || defaultLasertagSpySpecs), bgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <AdminAltInput
                      compact
                      label="🏷️ Card Background Image Alt Text (SEO Keyword)"
                      value={currentSec.bgAlt || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, lasertagSpySpecs: { ...(prev.lasertagSpySpecs || defaultLasertagSpySpecs), bgAlt: e.target.value } }))}
                      placeholder="e.g. Laser Spy Technical Specifications Arena - Winera"
                    />
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('lasertagSpySpecs', formData.lasertagSpySpecs || defaultLasertagSpySpecs)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                    >
                      Save Laser Spy Specifications Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* LASER TAG GAME COMPARISON FORM */}
          {activeSection === 'lasertagComparison' && (() => {
            const currentSec = formData.lasertagComparison || defaultLasertagComparison;
            const features = currentSec.features || defaultLasertagComparison.features;
            const lasertagPoints = currentSec.lasertagPoints || defaultLasertagComparison.lasertagPoints;
            const laserspyPoints = currentSec.laserspyPoints || defaultLasertagComparison.laserspyPoints;

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                      Laser Tag vs Laser Spy Comparison Section
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>
                      Manage title, 6 comparison parameters, points for both games, and bottom advisory note.
                    </p>
                  </div>
                  <button
                    onClick={() => persistSectionToDatabase('lasertagComparison', formData.lasertagComparison || defaultLasertagComparison)}
                    style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '10px 22px', borderRadius: '10px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                  >
                    Save Changes
                  </button>
                </div>

                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>
                      Main Heading <span style={{ fontSize: '12px', fontWeight: '500', color: '#64748b' }}>(use *word* for cyan highlight)</span>
                    </label>
                    <input
                      type="text"
                      value={currentSec.title || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        lasertagComparison: { ...(prev.lasertagComparison || defaultLasertagComparison), title: e.target.value }
                      }))}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#ffffff', color: '#0f172a' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>
                      Bottom Advice Note
                    </label>
                    <RichTextareaWithEditor
                      rows={3}
                      value={currentSec.note !== undefined && currentSec.note !== null ? currentSec.note : defaultLasertagComparison.note}
                      onChange={(val) => setFormData(prev => ({
                        ...prev,
                        lasertagComparison: { ...(prev.lasertagComparison || defaultLasertagComparison), note: val }
                      }))}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#ffffff', color: '#0f172a' }}
                    />
                  </div>

                  {/* 6 COMPARISON ROWS */}
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
                      6 Comparison Parameters & Points (01 to 06)
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {features.map((featureName, idx) => (
                        <div key={idx} style={{ background: '#ffffff', padding: '14px 18px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#0284c7', color: '#fff', fontSize: '12px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <div style={{ flex: 1 }}>
                              <label style={{ display: 'block', fontWeight: '700', fontSize: '11.5px', color: '#64748b', marginBottom: '4px' }}>
                                Center Parameter Name
                              </label>
                              <input
                                type="text"
                                value={featureName || ''}
                                onChange={(e) => {
                                  const updated = [...features];
                                  updated[idx] = e.target.value;
                                  setFormData(prev => ({
                                    ...prev,
                                    lasertagComparison: { ...(prev.lasertagComparison || defaultLasertagComparison), features: updated }
                                  }));
                                }}
                                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#f8fafc', color: '#0f172a' }}
                              />
                            </div>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '4px' }}>
                            {/* Laser Tag Yellow Point */}
                            <div style={{ background: '#fefce8', padding: '10px 14px', borderRadius: '10px', border: '1px solid #fef08a' }}>
                              <label style={{ display: 'block', fontWeight: '800', fontSize: '11.5px', color: '#854d0e', marginBottom: '4px' }}>
                                🔫 Laser Tag Point #{idx + 1}
                              </label>
                              <RichTextareaWithEditor
                                rows={2}
                                value={lasertagPoints[idx]?.text || ''}
                                onChange={(val) => {
                                  const updated = [...lasertagPoints];
                                  updated[idx] = { ...updated[idx], text: val };
                                  setFormData(prev => ({
                                    ...prev,
                                    lasertagComparison: { ...(prev.lasertagComparison || defaultLasertagComparison), lasertagPoints: updated }
                                  }));
                                }}
                                style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #fde047', fontSize: '12.5px', background: '#ffffff', color: '#0f172a' }}
                              />
                            </div>

                            {/* Laser Spy Cyan Point */}
                            <div style={{ background: '#f0f9ff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #bae6fd' }}>
                              <label style={{ display: 'block', fontWeight: '800', fontSize: '11.5px', color: '#0369a1', marginBottom: '4px' }}>
                                🎯 Laser Spy Point #{idx + 1}
                              </label>
                              <RichTextareaWithEditor
                                rows={2}
                                value={laserspyPoints[idx]?.text || ''}
                                onChange={(val) => {
                                  const updated = [...laserspyPoints];
                                  updated[idx] = { ...updated[idx], text: val };
                                  setFormData(prev => ({
                                    ...prev,
                                    lasertagComparison: { ...(prev.lasertagComparison || defaultLasertagComparison), laserspyPoints: updated }
                                  }));
                                }}
                                style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #7dd3fc', fontSize: '12.5px', background: '#ffffff', color: '#0f172a' }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('lasertagComparison', formData.lasertagComparison || defaultLasertagComparison)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                    >
                      Save Comparison Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* LASER TAG KNOW YOUR NUMBERS ROI FORM */}
          {activeSection === 'lasertagRoi' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Know Your Numbers ROI Section</h3>
                <button
                  onClick={() => persistSectionToDatabase('lasertagRoi', formData.lasertagRoi || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '10px 24px', borderRadius: '12px', fontWeight: '800', fontSize: '13.5px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Section Changes
                </button>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Heading (use *stars* for highlight, &lt;br/&gt; for line breaks)
                </label>
                <input
                  type="text"
                  value={formData.lasertagRoi?.title ?? "Know Your Numbers *Before You Spend*"}
                  onChange={(e) => handleFieldChange('lasertagRoi', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Paragraph 1 (First Description Block)
                </label>
                <RichTextareaWithEditor
                  rows={3}
                  value={formData.lasertagRoi?.paragraph1 ?? "Buying a laser tag or laser spy setup is a big decision, and you shouldn't have to guess whether it will pay off. That's why every project with Winera starts with a free ROI report built around your venue, not a general estimate copied from a brochure."}
                  onChange={(val) => handleFieldChange('lasertagRoi', 'paragraph1', val)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', lineHeight: 1.5 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Paragraph 2 (Second Description Block)
                </label>
                <RichTextareaWithEditor
                  rows={4}
                  value={formData.lasertagRoi?.paragraph2 ?? "We work out how many games you can run each day, how much you can earn from them, what upkeep will cost, and how soon you'll make your money back. Both games are strong earners because they pull in groups, parties, office teams, and school outings that book many players at once and with just one staff member running the show, you keep costs low and games flowing. You'll see the full picture first, then decide."}
                  onChange={(val) => handleFieldChange('lasertagRoi', 'paragraph2', val)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', lineHeight: 1.5 }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.lasertagRoi?.buttonText ?? "Talk to an ROI Expert"}
                    onChange={(e) => handleFieldChange('lasertagRoi', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    WhatsApp Link
                  </label>
                  <input
                    type="text"
                    value={formData.lasertagRoi?.buttonLink ?? "https://wa.me/919157873576"}
                    onChange={(e) => handleFieldChange('lasertagRoi', 'buttonLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  WhatsApp Prefilled Message
                </label>
                <input
                  type="text"
                  value={formData.lasertagRoi?.waMessage ?? "Hello Winera International! I want to talk to an ROI Expert regarding Laser Tag & Laser Spy setup for my venue."}
                  onChange={(e) => handleFieldChange('lasertagRoi', 'waMessage', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Right Side Photo (laser-tag-7.png) <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 911 × 636 px</span>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px dashed #cbd5e1' }}>
                  <img
                    src={getAdminValidImageUrl(formData.lasertagRoi?.mainImgUrl, "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345673/winera_uploads/c4xhhkjcjwhagwd8drzm.png")}
                    alt="ROI Photo"
                    style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const res = await uploadImageFile(file);
                      if (res?.url) {
                        const updated = { ...(formData.lasertagRoi || {}), mainImgUrl: res.url };
                        setFormData(prev => ({ ...prev, lasertagRoi: updated }));
                        await persistSectionToDatabase('lasertagRoi', updated);
                      }
                    }}
                    style={{ fontSize: '12px' }}
                  />
                </div>
                <AdminAltInput
                  compact
                  label="🏷️ ROI Photo Alt Text (SEO Keyword)"
                  value={formData.lasertagRoi?.mainImgAlt || ''}
                  onChange={(e) => handleFieldChange('lasertagRoi', 'mainImgAlt', e.target.value)}
                  placeholder="e.g. Laser Tag ROI Returns & Payback Analysis - Winera"
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('lasertagRoi', formData.lasertagRoi || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '800', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save ROI Section
                </button>
              </div>
            </div>
          )}

          {/* LASER TAG WHY CHOOSE WINERA FORM */}
          {activeSection === 'lasertagWhyUs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Why Choose Winera International Section</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Section Title (Use *word* for cyan highlight)</label>
                <input
                  type="text"
                  value={formData.lasertagWhyUs?.title || 'Why Choose *Winera International*'}
                  onChange={(e) => handleFieldChange('lasertagWhyUs', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              {/* Cards List Manager */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0369a1' }}>Feature Cards</h4>
                  <button
                    onClick={() => {
                      const cur = formData.lasertagWhyUs?.cardsList || [
                        { title: "Complete Arena Setup", desc: "We handle the equipment, design, setup, and training, not just the supply." },
                        { title: "Revenue Calculated", desc: "We show you the games, monthly income, and payback time before you spend." },
                        { title: "Low Running Cost", desc: "Just one person runs the whole game, less staff, more games." },
                        { title: "Built for Your Space", desc: "We plan the layout and player flow to fit your floor." },
                        { title: "Direct After-Sales Support", desc: "One call reaches the same team that built your game." }
                      ];
                      handleFieldChange('lasertagWhyUs', 'cardsList', [...cur, { title: 'New Feature Card', desc: 'Card description goes here.' }]);
                    }}
                    style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    + Add Feature Card
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {(formData.lasertagWhyUs?.cardsList || [
                    { title: "Complete Arena Setup", desc: "We handle the equipment, design, setup, and training, not just the supply." },
                    { title: "Revenue Calculated", desc: "We show you the games, monthly income, and payback time before you spend." },
                    { title: "Low Running Cost", desc: "Just one person runs the whole game, less staff, more games." },
                    { title: "Built for Your Space", desc: "We plan the layout and player flow to fit your floor." },
                    { title: "Direct After-Sales Support", desc: "One call reaches the same team that built your game." }
                  ]).map((card, idx) => (
                    <div key={idx} style={{ background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '800', fontSize: '13px', color: '#0284c7' }}>Card #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={async () => {
                            const list = [...(formData.lasertagWhyUs?.cardsList || [
                              { title: "Complete Arena Setup", desc: "We handle the equipment, design, setup, and training, not just the supply." },
                              { title: "Revenue Calculated", desc: "We show you the games, monthly income, and payback time before you spend." },
                              { title: "Low Running Cost", desc: "Just one person runs the whole game, less staff, more games." },
                              { title: "Built for Your Space", desc: "We plan the layout and player flow to fit your floor." },
                              { title: "Direct After-Sales Support", desc: "One call reaches the same team that built your game." }
                            ])];
                            const updated = list.filter((_, i) => i !== idx);
                            const updatedSec = { ...(formData.lasertagWhyUs || {}), cardsList: updated };
                            setFormData(prev => ({ ...prev, lasertagWhyUs: updatedSec }));
                            await persistSectionToDatabase('lasertagWhyUs', updatedSec);
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
                          const list = [...(formData.lasertagWhyUs?.cardsList || [])];
                          list[idx] = { ...list[idx], title: e.target.value };
                          handleFieldChange('lasertagWhyUs', 'cardsList', list);
                        }}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                      />

                      <RichTextareaWithEditor
                        rows={2}
                        placeholder="Card Description"
                        value={card.desc || ''}
                        onChange={(val) => {
                          const list = [...(formData.lasertagWhyUs?.cardsList || [])];
                          list[idx] = { ...list[idx], desc: val };
                          handleFieldChange('lasertagWhyUs', 'cardsList', list);
                        }}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('lasertagWhyUs', formData.lasertagWhyUs || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Why Choose Section
                </button>
              </div>
            </div>
          )}

          {/* LASER TAG & LASER SPY FAQS FORM */}
          {activeSection === 'lasertagFaqs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Laser Tag & Laser Spy FAQs Management</h3>
                <button
                  onClick={() => {
                    const currentList = Array.isArray(formData.lasertagFaqs) && formData.lasertagFaqs.length > 0
                      ? formData.lasertagFaqs
                      : [
                        {
                          question: "What is the laser tag equipment cost in India?",
                          answer: "The cost depends on your arena size, player count, game types, and theming. We give you a full cost breakdown plus a free ROI report before you order, so you see the exact cost and payback for your venue. Contact us for a quote for your space."
                        },
                        {
                          question: "How long does the setup take?",
                          answer: "A standard laser tag or laser spy setup takes about 3–7 days, depending on the arena size and design. We give you an exact timeline at the quote stage, covering delivery, building, software, and staff training."
                        },
                        {
                          question: "What ceiling height do I need for laser tag?",
                          answer: "Laser tag works best with a ceiling of at least 3 metres, which allows proper obstacles and, where space allows, a multi-level layout. We check your ceiling and floor before designing the arena."
                        },
                        {
                          question: "How much maintenance do these games need?",
                          answer: "Very little. The equipment is built for daily commercial use, and routine upkeep is simple mostly charging, cleaning, and occasional checks. We provide servicing and support whenever you need it."
                        },
                        {
                          question: "Can the arena be themed to match my venue?",
                          answer: "Yes. We can theme the arena with custom design, lighting, and effects to match your venue's look. We suggest the theming options during the design stage."
                        },
                        {
                          question: "Do you provide staff training?",
                          answer: "Yes. Before opening day, we train your team to run games, manage sessions, and handle the software confidently, so you're ready from day one."
                        },
                        {
                          question: "What happens if something breaks after installation?",
                          answer: "Our own team handles all repairs and servicing directly across 50+ cities, you deal with us, not an outside agent or an overseas supplier. Most issues are fixed quickly so your games keep running."
                        }
                      ];
                    const updated = [...currentList, { question: '', answer: '' }];
                    setFormData((prev) => ({ ...prev, lasertagFaqs: updated }));
                  }}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                >
                  + Add FAQ Item
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(Array.isArray(formData.lasertagFaqs) && formData.lasertagFaqs.length > 0
                  ? formData.lasertagFaqs
                  : [
                    {
                      question: "What is the laser tag equipment cost in India?",
                      answer: "The cost depends on your arena size, player count, game types, and theming. We give you a full cost breakdown plus a free ROI report before you order, so you see the exact cost and payback for your venue. Contact us for a quote for your space."
                    },
                    {
                      question: "How long does the setup take?",
                      answer: "A standard laser tag or laser spy setup takes about 3–7 days, depending on the arena size and design. We give you an exact timeline at the quote stage, covering delivery, building, software, and staff training."
                    },
                    {
                      question: "What ceiling height do I need for laser tag?",
                      answer: "Laser tag works best with a ceiling of at least 3 metres, which allows proper obstacles and, where space allows, a multi-level layout. We check your ceiling and floor before designing the arena."
                    },
                    {
                      question: "How much maintenance do these games need?",
                      answer: "Very little. The equipment is built for daily commercial use, and routine upkeep is simple mostly charging, cleaning, and occasional checks. We provide servicing and support whenever you need it."
                    },
                    {
                      question: "Can the arena be themed to match my venue?",
                      answer: "Yes. We can theme the arena with custom design, lighting, and effects to match your venue's look. We suggest the theming options during the design stage."
                    },
                    {
                      question: "Do you provide staff training?",
                      answer: "Yes. Before opening day, we train your team to run games, manage sessions, and handle the software confidently, so you're ready from day one."
                    },
                    {
                      question: "What happens if something breaks after installation?",
                      answer: "Our own team handles all repairs and servicing directly across 50+ cities, you deal with us, not an outside agent or an overseas supplier. Most issues are fixed quickly so your games keep running."
                    }
                  ]
                ).map((faq, index) => (
                  <div key={index} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '800', color: '#0f172a', fontSize: '13px' }}>FAQ #{index + 1}</span>
                      <button
                        onClick={() => {
                          const currentList = Array.isArray(formData.lasertagFaqs) && formData.lasertagFaqs.length > 0
                            ? [...formData.lasertagFaqs]
                            : [
                              {
                                question: "What is the laser tag equipment cost in India?",
                                answer: "The cost depends on your arena size, player count, game types, and theming. We give you a full cost breakdown plus a free ROI report before you order, so you see the exact cost and payback for your venue. Contact us for a quote for your space."
                              },
                              {
                                question: "How long does the setup take?",
                                answer: "A standard laser tag or laser spy setup takes about 3–7 days, depending on the arena size and design. We give you an exact timeline at the quote stage, covering delivery, building, software, and staff training."
                              },
                              {
                                question: "What ceiling height do I need for laser tag?",
                                answer: "Laser tag works best with a ceiling of at least 3 metres, which allows proper obstacles and, where space allows, a multi-level layout. We check your ceiling and floor before designing the arena."
                              },
                              {
                                question: "How much maintenance do these games need?",
                                answer: "Very little. The equipment is built for daily commercial use, and routine upkeep is simple mostly charging, cleaning, and occasional checks. We provide servicing and support whenever you need it."
                              },
                              {
                                question: "Can the arena be themed to match my venue?",
                                answer: "Yes. We can theme the arena with custom design, lighting, and effects to match your venue's look. We suggest the theming options during the design stage."
                              },
                              {
                                question: "Do you provide staff training?",
                                answer: "Yes. Before opening day, we train your team to run games, manage sessions, and handle the software confidently, so you're ready from day one."
                              },
                              {
                                question: "What happens if something breaks after installation?",
                                answer: "Our own team handles all repairs and servicing directly across 50+ cities, you deal with us, not an outside agent or an overseas supplier. Most issues are fixed quickly so your games keep running."
                              }
                            ];
                          currentList.splice(index, 1);
                          setFormData((prev) => ({ ...prev, lasertagFaqs: currentList }));
                        }}
                        style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '12px' }}
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Question"
                      value={faq.question || faq.q || ''}
                      onChange={(e) => {
                        const currentList = Array.isArray(formData.lasertagFaqs) && formData.lasertagFaqs.length > 0
                          ? [...formData.lasertagFaqs]
                          : [
                            {
                              question: "What is the laser tag equipment cost in India?",
                              answer: "The cost depends on your arena size, player count, game types, and theming. We give you a full cost breakdown plus a free ROI report before you order, so you see the exact cost and payback for your venue. Contact us for a quote for your space."
                            },
                            {
                              question: "How long does the setup take?",
                              answer: "A standard laser tag or laser spy setup takes about 3–7 days, depending on the arena size and design. We give you an exact timeline at the quote stage, covering delivery, building, software, and staff training."
                            },
                            {
                              question: "What ceiling height do I need for laser tag?",
                              answer: "Laser tag works best with a ceiling of at least 3 metres, which allows proper obstacles and, where space allows, a multi-level layout. We check your ceiling and floor before designing the arena."
                            },
                            {
                              question: "How much maintenance do these games need?",
                              answer: "Very little. The equipment is built for daily commercial use, and routine upkeep is simple mostly charging, cleaning, and occasional checks. We provide servicing and support whenever you need it."
                            },
                            {
                              question: "Can the arena be themed to match my venue?",
                              answer: "Yes. We can theme the arena with custom design, lighting, and effects to match your venue's look. We suggest the theming options during the design stage."
                            },
                            {
                              question: "Do you provide staff training?",
                              answer: "Yes. Before opening day, we train your team to run games, manage sessions, and handle the software confidently, so you're ready from day one."
                            },
                            {
                              question: "What happens if something breaks after installation?",
                              answer: "Our own team handles all repairs and servicing directly across 50+ cities, you deal with us, not an outside agent or an overseas supplier. Most issues are fixed quickly so your games keep running."
                            }
                          ];
                        currentList[index] = { ...currentList[index], question: e.target.value };
                        setFormData((prev) => ({ ...prev, lasertagFaqs: currentList }));
                      }}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: '600' }}
                    />
                    <RichTextareaWithEditor
                      rows={3}
                      placeholder="Answer"
                      value={faq.answer || faq.a || ''}
                      onChange={(val) => {
                        const currentList = Array.isArray(formData.lasertagFaqs) && formData.lasertagFaqs.length > 0
                          ? [...formData.lasertagFaqs]
                          : [
                            {
                              question: "What is the laser tag equipment cost in India?",
                              answer: "The cost depends on your arena size, player count, game types, and theming. We give you a full cost breakdown plus a free ROI report before you order, so you see the exact cost and payback for your venue. Contact us for a quote for your space."
                            },
                            {
                              question: "How long does the setup take?",
                              answer: "A standard laser tag or laser spy setup takes about 3–7 days, depending on the arena size and design. We give you an exact timeline at the quote stage, covering delivery, building, software, and staff training."
                            },
                            {
                              question: "What ceiling height do I need for laser tag?",
                              answer: "Laser tag works best with a ceiling of at least 3 metres, which allows proper obstacles and, where space allows, a multi-level layout. We check your ceiling and floor before designing the arena."
                            },
                            {
                              question: "How much maintenance do these games need?",
                              answer: "Very little. The equipment is built for daily commercial use, and routine upkeep is simple mostly charging, cleaning, and occasional checks. We provide servicing and support whenever you need it."
                            },
                            {
                              question: "Can the arena be themed to match my venue?",
                              answer: "Yes. We can theme the arena with custom design, lighting, and effects to match your venue's look. We suggest the theming options during the design stage."
                            },
                            {
                              question: "Do you provide staff training?",
                              answer: "Yes. Before opening day, we train your team to run games, manage sessions, and handle the software confidently, so you're ready from day one."
                            },
                            {
                              question: "What happens if something breaks after installation?",
                              answer: "Our own team handles all repairs and servicing directly across 50+ cities, you deal with us, not an outside agent or an overseas supplier. Most issues are fixed quickly so your games keep running."
                            }
                          ];
                        currentList[index] = { ...currentList[index], answer: val };
                        setFormData((prev) => ({ ...prev, lasertagFaqs: currentList }));
                      }}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', lineHeight: 1.5 }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('lasertagFaqs', formData.lasertagFaqs || [])}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Laser Tag FAQs
                </button>
              </div>
            </div>
          )}

          {/* LASER TAG CTA BANNER FORM */}
          {activeSection === 'lasertagCta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Laser Tag CTA Banner Settings</h3>

              {/* Banner Background Image Upload */}
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Banner Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img
                    src={getAdminValidImageUrl(formData.lasertagCta?.bgUrl, ctaMainBanner)}
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
                        setStatusMsg('Uploading banner background image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.lasertagCta || {}), bgUrl: res.url };
                          setFormData(prev => ({ ...prev, lasertagCta: updated }));
                          await persistSectionToDatabase('lasertagCta', updated);
                          setStatusMsg('Background image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {formData.lasertagCta?.bgUrl && (
                    <button
                      type="button"
                      onClick={async () => {
                        const updated = { ...(formData.lasertagCta || {}), bgUrl: '' };
                        setFormData(prev => ({ ...prev, lasertagCta: updated }));
                        await persistSectionToDatabase('lasertagCta', updated);
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
                  label="🏷️ Banner Background Alt Text (SEO Keyword)"
                  value={formData.lasertagCta?.bgAlt || ''}
                  onChange={(e) => handleFieldChange('lasertagCta', 'bgAlt', e.target.value)}
                  placeholder="e.g. Setup Commercial Laser Tag Arena - Winera International"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Main Title Heading</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Use <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>&lt;br/&gt;</code> for line breaks.</p>
                <input
                  type="text"
                  value={formData.lasertagCta?.title !== undefined && formData.lasertagCta.title !== '' ? formData.lasertagCta.title : 'Thinking About Adding Laser Tag<br/>& Laser Spy To Your Venue?'}
                  onChange={(e) => handleFieldChange('lasertagCta', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Subtitle Description Text</label>
                <RichTextareaWithEditor
                  rows={3}
                  value={formData.lasertagCta?.subtitle !== undefined && formData.lasertagCta.subtitle !== '' ? formData.lasertagCta.subtitle : (formData.lasertagCta?.whiteText || "Book a free call and we'll walk you through with a free ROI report and a plan made for your venue")}
                  onChange={(val) => {
                    handleFieldChange('lasertagCta', 'subtitle', val);
                    handleFieldChange('lasertagCta', 'whiteText', val);
                  }}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.lasertagCta?.buttonText || 'Get a Quote on WhatsApp'}
                    onChange={(e) => handleFieldChange('lasertagCta', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                  <input
                    type="text"
                    value={formData.lasertagCta?.buttonLink || 'https://wa.me/919157873576'}
                    onChange={(e) => handleFieldChange('lasertagCta', 'buttonLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('lasertagCta', formData.lasertagCta || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Laser Tag CTA Banner
                </button>
              </div>
            </div>
          )}
    </>
  );
}
