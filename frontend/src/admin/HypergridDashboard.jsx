import React from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import RichTextareaWithEditor from '../components/RichTextareaWithEditor';
import { uploadImageFile } from '../services/api';

const hypergridHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345665/winera_uploads/dazartbigth5uomw4l82.png";
const hypergridMobileHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345666/winera_uploads/pbm1z3vndfr2wnyvlx8z.png";
const hypergridSupplierCollage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345665/winera_uploads/dzjrsas1qwrxj8qxlw45.png";
const hypergridBannerImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345665/winera_uploads/v1fevfcntejtyhfdhqzl.png";
const hypergridSpecsBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345665/winera_uploads/jhhdqkrobdtt22bztejh.png";
const hypergridWhyUsBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345665/winera_uploads/gtfgc6nbhnkzypye0phi.png";
const arImage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345478/winera_uploads/flajlse8cqswtulhkmtz.png";
const hypergridImage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345665/winera_uploads/huto0jbp8fo9zx7bx3du.png";
const hypergridWineraLastblock = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345667/winera_uploads/enkcvfcpvzrd9rosyjno.jpg";
const hypergridWhyUsLeft = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345667/winera_uploads/vuimojvlsoj16ittjnt4.png";
const ctaMainBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345648/winera_uploads/ei16uczeuelaabtue4bs.jpg";

const getAdminValidImageUrl = (url, fallback) => {
  if (!url) return fallback;
  if (typeof url === 'object' && url.default) return url.default;
  if (typeof url !== 'string' || url.trim() === '') return fallback;
  if (url.includes('/src/assets/') || url.includes('hypergrid') || url.includes('AR-image') || url.includes('ar-image')) {
    if (url.includes('hypergrid-specs-bg')) return hypergridSpecsBg;
    if (url.includes('AR-image') || url.includes('ar-image')) return arImage;
    if (url.includes('hypergrid-image')) return hypergridImage;
    if (url.includes('hypergrid-why-us-bg') || url.includes('hypergrid-whyus-bg')) return hypergridWhyUsBg;
    if (url.includes('hypergrid-why-us-left') || url.includes('hypergrid-whyus-left')) return hypergridWhyUsLeft;
    if (url.includes('hypergrid-supplier-collage')) return hypergridSupplierCollage;
    if (url.includes('hypergrid-banner')) return hypergridBannerImg;
    if (url.includes('hypergrid-hero-bg')) return hypergridHeroBg;
    if (url.includes('hypergrid-game-phone-banner') || url.includes('hypergrid-mobile')) return hypergridMobileHeroBg;
    if (url.includes('hypergrid-winera-lastblock')) return hypergridWineraLastblock;
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

const defaultHypergridHero = {
  bgUrl: hypergridHeroBg,
  bgAlt: 'Hypergrid Game Supplier in India - Winera International',
  mobileBgUrl: hypergridMobileHeroBg,
  mobileBgAlt: 'Hypergrid Interactive Game Mobile Banner - Winera International',
  breadcrumbText: 'Hypergrid'
};

const defaultHypergridIntro = {
  title: '*Hypergrid Game* Supplier<br/>in India',
  desc: "India's trusted Hypergrid game supplier commercial-grade interactive LED floor systems, installed and serviced by our own team across 50+ cities.",
  buttonText: 'Get A Quote',
  buttonLink: 'https://wa.me/919157873576',
  mainImgUrl: hypergridSupplierCollage
};

const defaultHypergridBanner = {
  title: 'Interactive LED Floor Games *for High-<br/>Footfall Venues*',
  paragraph1: 'Winera International is a trusted Hypergrid game supplier in India, sourcing and installing commercial Hypergrid interactive LED floor systems for malls, family entertainment centres, hotels, schools, trampoline parks, and bowling alleys since 2014. Every Hypergrid unit we supply is sourced from established global manufacturers — configured specifically for sustained daily commercial use in high-footfall Indian venues.',
  paragraph2: 'As a direct Hypergrid business partner, our own team manages the complete process from space assessment and product configuration to installation, software setup, and after-sales support. One team, zero third-party contractors, from order to opening day.',
  imgUrl: hypergridBannerImg
};

const defaultHypergridSpecs = {
  bgUrl: hypergridSpecsBg,
  title: '*Technical* Specifications',
  rows: [
    { spec: "Players", details: "1 to 6 simultaneously" },
    { spec: "Game modes", details: "5+ repeatable modes" },
    { spec: "Attendant required", details: "No — fully self-operated" },
    { spec: "Minimum space required", details: "200 sq ft onwards" },
    { spec: "Expected lifespan", details: "8+ years — commercial grade" }
  ],
  buttonText: 'Download Our Brochure',
  buttonLink: '/pdf/Hyper Grid.pdf'
};

const defaultHypergridWhyUs = {
  bgUrl: hypergridWhyUsBg,
  title: '*What Makes Hypergrid* the Right<br/>Choice for Your Venue',
  subtitle: 'Every component in a Winera soft play structure is selected to perform reliably under heavy daily commercial use, not occasional play. Here is what goes into every build:',
  leftImgUrl: arImage,
  cards: [
    {
      title: "An Attraction That Draws a Crowd Without Marketing",
      desc: "Hypergrid's illuminated floor is visible from across a venue visitors stop, watch, and join without any promotion needed. The combination of moving lights, real-time competition, and full-body play creates a natural spectator effect that draws walk-in visitors throughout the day."
    },
    {
      title: "Every Visitor Has a Reason to Play",
      desc: "From a young child learning through colour-based games or a teenager competing for the top score, Hypergrid keeps players engaged with adjustable difficulty levels and multiple game modes. One attraction appeals to different age groups, helping your venue attract and entertain more visitors."
    },
    {
      title: "Revenue Without the Overhead",
      desc: "Visitors can start and play Hypergrid on their own without needing staff assistance. This helps reduce operating costs while generating consistent revenue, making it an ideal attraction for Indian FECs, malls, and hotels."
    }
  ]
};

const defaultHypergridRoi = {
  title: 'Is Hypergrid a Smart<br/>*Investment for Your Venue?*',
  paragraph1: "Most interactive LED floor game suppliers quote a unit price and leave the business decision entirely to you. As India's ROI-First Game Zone Developer, Winera International works differently. Before confirming any Hypergrid order, our team prepares a complete ROI report for your specific venue — covering equipment cost, projected daily sessions, estimated revenue per session, maintenance costs, and break-even timeline.",
  paragraph2: "Every figure is calculated around your venue type, daily footfall, and target visitor demographic — not an industry average. Very few Hypergrid game suppliers in India include this as a standard part of their process. For Winera, it is where every project starts.",
  buttonText: 'Talk to an ROI Expert',
  buttonLink: 'https://wa.me/919157873576',
  imgUrl: hypergridImage
};

const defaultHypergridWhyWineraItems = [
  {
    icon: 'award',
    title: "Commercial-Grade Equipment",
    desc: "Made To Run Every Day In Busy Places Without Breaking Down."
  },
  {
    icon: 'settings',
    title: "Customized For Your Venue",
    desc: "We Set Up The Games, Levels, And Branding To Fit Your Space."
  },
  {
    icon: 'coins',
    title: "ROI Planning Before You Invest",
    desc: "We Show You The Cost And Profit Before You Spend Any Money."
  },
  {
    icon: 'headphones',
    title: "Professional Installation",
    desc: "Our Own Team Comes And Sets Everything Up For You."
  },
  {
    icon: 'calendar',
    title: "Operator Training Included",
    desc: "We Train Your Staff So They're Ready Before You Open."
  },
  {
    icon: 'package',
    title: "Reliable After-Sales Support",
    desc: "We Fix, Update, And Service It Whenever You Need Help."
  }
];

const defaultHypergridWhyWinera = {
  title: 'Why Choose *Winera International*',
  items: defaultHypergridWhyWineraItems
};

const defaultHypergridFaqs = [
  {
    question: "Who is a reliable Hypergrid game supplier in India?",
    answer: "Winera International is a trusted Hypergrid game supplier in India, sourcing commercial interactive LED floor systems from established global manufacturers for malls, FECs, hotels, schools, and trampoline parks — installed across 50+ cities by our own team since 2014."
  },
  {
    question: "What is a Hypergrid interactive LED floor game?",
    answer: "Hypergrid is a commercial interactive LED floor system using pressure-sensitive RGB tiles. Players step, jump, and sprint across the glowing grid — reacting to colour patterns, memory sequences, and speed challenges in real time. It supports 1 to 6 players simultaneously, requires no attendant, and offers 5+ game modes for consistent repeat engagement."
  },
  {
    question: "Is Hypergrid a good business investment for an FEC or mall?",
    answer: "As a Hypergrid FEC game, it generates revenue through per-session fees with zero consumable costs and no attendant requirement — keeping operating costs low. Its self-operated design and high repeat-play appeal make it one of the strongest revenue-per-square-foot attractions for Indian FECs and malls."
  },
  {
    question: "What is the price of a Hypergrid game in India?",
    answer: "Hypergrid game pricing depends on configuration, tile count, and installation requirements. Winera provides a complete cost breakdown — equipment, installation, and projected maintenance — before confirming any order. Contact our team for a venue-specific quote and free ROI report."
  },
  {
    question: "How much space does Hypergrid require?",
    answer: "A commercial Hypergrid installation starts from 200 sq ft of flat floor space — compact enough to fit within an existing trampoline park, bowling alley, or mall entertainment zone without requiring a dedicated standalone room."
  },
  {
    question: "What game modes does Hypergrid offer?",
    answer: "Hypergrid offers 5+ game modes including colour-matching, memory sequences, speed reaction challenges, and competitive multiplayer formats — with adjustable difficulty settings for children through adults. Game modes can be configured through the 24\" operator control panel."
  },
  {
    question: "Does Hypergrid require a dedicated staff member to operate?",
    answer: "No. Hypergrid is fully self-operated — players start and control sessions through the intuitive interface without staff involvement."
  },
  {
    question: "How long does Hypergrid installation take?",
    answer: "A standard Hypergrid installation is typically completed within 1–2 days depending on floor configuration. Winera confirms an exact timeline at the quote stage covering delivery, calibration, and staff training."
  },
  {
    question: "What after-sales support does Winera provide for Hypergrid?",
    answer: "Winera International provides software updates, hardware servicing, tile replacement, and on-site support for all Hypergrid installations — directly through our own team across 50+ cities."
  }
];

const defaultHypergridCta = {
  bgUrl: hypergridWineraLastblock,
  buttonLink: 'https://wa.me/919157873576'
};


export default function HypergridDashboard({
  activeSection,
  formData = {},
  setFormData,
  handleFieldChange,
  persistSectionToDatabase,
  handleBrochureUpload,
  admin,
  setStatusMsg
}) {
  return (
    <>
          {activeSection === 'hypergridHero' && (() => {
            const currentSec = formData.hypergridHero || defaultHypergridHero;
            const heroImg = getAdminValidImageUrl(currentSec.bgUrl, defaultHypergridHero.bgUrl);
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Hypergrid Hero Banner</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Hero Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={heroImg} alt="Hero Preview" style={{ width: '120px', height: '65px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.bgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, hypergridHero: { ...(prev.hypergridHero || defaultHypergridHero), bgUrl: e.target.value } }))}
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
                              setFormData(prev => ({ ...prev, hypergridHero: { ...(prev.hypergridHero || defaultHypergridHero), bgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                      {currentSec.bgUrl && (
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, hypergridHero: { ...(prev.hypergridHero || defaultHypergridHero), bgUrl: '' } }))}
                          style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '12px 18px', borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
                        >
                          Reset Image
                        </button>
                      )}
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                        🏷️ Hero Background Alt Text (SEO Keyword)
                      </label>
                      <input
                        type="text"
                        value={currentSec.bgAlt || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, hypergridHero: { ...(prev.hypergridHero || defaultHypergridHero), bgAlt: e.target.value } }))}
                        placeholder="e.g. Active Grid Interactive LED Gaming Floor - Winera"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>

                  {/* Mobile Screen Hero Banner Upload & Preview */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Mobile Screen Hero Banner <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📱 Recommended Size: 941 × 550 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img
                        src={getAdminValidImageUrl(currentSec.mobileBgUrl, hypergridMobileHeroBg)}
                        alt="Mobile Hero Preview"
                        style={{ width: '120px', height: '65px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                      />
                      <input
                        type="text"
                        value={currentSec.mobileBgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, hypergridHero: { ...(prev.hypergridHero || defaultHypergridHero), mobileBgUrl: e.target.value } }))}
                        placeholder="Mobile Background Image URL"
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', background: '#F5F5F9' }}
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
                              setFormData(prev => ({ ...prev, hypergridHero: { ...(prev.hypergridHero || defaultHypergridHero), mobileBgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                      {currentSec.mobileBgUrl && (
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, hypergridHero: { ...(prev.hypergridHero || defaultHypergridHero), mobileBgUrl: '' } }))}
                          style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '12px 18px', borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
                        >
                          Reset Image
                        </button>
                      )}
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                        🏷️ Mobile Background Alt Text (SEO Keyword)
                      </label>
                      <input
                        type="text"
                        value={currentSec.mobileBgAlt || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, hypergridHero: { ...(prev.hypergridHero || defaultHypergridHero), mobileBgAlt: e.target.value } }))}
                        placeholder="e.g. Active Grid Interactive LED Gaming Floor Mobile Banner - Winera"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Breadcrumb Active Page Text</label>
                    <input
                      type="text"
                      value={currentSec.breadcrumbText !== undefined ? currentSec.breadcrumbText : defaultHypergridHero.breadcrumbText}
                      onChange={(e) => setFormData(prev => ({ ...prev, hypergridHero: { ...(prev.hypergridHero || defaultHypergridHero), breadcrumbText: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('hypergridHero', formData.hypergridHero || defaultHypergridHero)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Hero Banner
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* HYPERGRID INTRO FORM */}
          {activeSection === 'hypergridIntro' && (() => {
            const currentSec = formData.hypergridIntro || defaultHypergridIntro;
            const mainImg = getAdminValidImageUrl(currentSec.mainImgUrl, defaultHypergridIntro.mainImgUrl);
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Hypergrid Manufacturer Section</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Section Title (*word* for cyan, &lt;br/&gt; for linebreaks)</label>
                    <input
                      type="text"
                      value={currentSec.title !== undefined ? currentSec.title : defaultHypergridIntro.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, hypergridIntro: { ...(prev.hypergridIntro || defaultHypergridIntro), title: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <RichTextareaWithEditor
                      label="Description Paragraph"
                      rows={3}
                      value={currentSec.desc !== undefined ? currentSec.desc : defaultHypergridIntro.desc}
                      onChange={(val) => setFormData(prev => ({ ...prev, hypergridIntro: { ...(prev.hypergridIntro || defaultHypergridIntro), desc: val } }))}
                      placeholder="Enter description paragraph..."
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                      <input
                        type="text"
                        value={currentSec.buttonText !== undefined ? currentSec.buttonText : defaultHypergridIntro.buttonText}
                        onChange={(e) => setFormData(prev => ({ ...prev, hypergridIntro: { ...(prev.hypergridIntro || defaultHypergridIntro), buttonText: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                      <input
                        type="text"
                        value={(currentSec.buttonLink && currentSec.buttonLink.split('?')[0]) || defaultHypergridIntro.buttonLink}
                        onChange={(e) => {
                          const baseLink = e.target.value;
                          const msg = currentSec.waMessage || "Hello Winera International! I want to get a quote and details for Hypergrid LED Floor Game setup. Please share details. [Ref: Hypergrid Page]";
                          const updatedLink = msg ? `${baseLink.split('?')[0]}?text=${encodeURIComponent(msg)}` : baseLink;
                          setFormData(prev => ({ ...prev, hypergridIntro: { ...(prev.hypergridIntro || defaultHypergridIntro), buttonLink: updatedLink } }));
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
                        return "Hello Winera International! I want to get a quote and details for Hypergrid LED Floor Game setup. Please share details. [Ref: Hypergrid Page]";
                      })()}
                      onChange={(e) => {
                        const newMsg = e.target.value;
                        const baseLink = (currentSec.buttonLink && currentSec.buttonLink.split('?')[0]) || defaultHypergridIntro.buttonLink;
                        const updatedLink = newMsg ? `${baseLink}?text=${encodeURIComponent(newMsg)}` : baseLink;
                        setFormData(prev => ({
                          ...prev,
                          hypergridIntro: {
                            ...(prev.hypergridIntro || defaultHypergridIntro),
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
                      Left Graphic Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={mainImg} alt="Graphic Preview" style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.mainImgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, hypergridIntro: { ...(prev.hypergridIntro || defaultHypergridIntro), mainImgUrl: e.target.value } }))}
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
                              setFormData(prev => ({ ...prev, hypergridIntro: { ...(prev.hypergridIntro || defaultHypergridIntro), mainImgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                        🏷️ Left Graphic Alt Text (SEO Keyword)
                      </label>
                      <input
                        type="text"
                        value={currentSec.mainImgAlt || currentSec.imgAlt || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, hypergridIntro: { ...(prev.hypergridIntro || defaultHypergridIntro), mainImgAlt: e.target.value } }))}
                        placeholder="e.g. Hypergrid Game Supplier in India - Winera International"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('hypergridIntro', formData.hypergridIntro || defaultHypergridIntro)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Manufacturer Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* HYPERGRID BANNER FORM */}
          {activeSection === 'hypergridBanner' && (() => {
            const currentSec = formData.hypergridBanner || defaultHypergridBanner;
            const bannerImg = getAdminValidImageUrl(currentSec.imgUrl, defaultHypergridBanner.imgUrl);
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Interactive LED Floor Games Section</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Section Title (*word* for cyan, &lt;br/&gt; for linebreaks)</label>
                    <input
                      type="text"
                      value={currentSec.title !== undefined ? currentSec.title : defaultHypergridBanner.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, hypergridBanner: { ...(prev.hypergridBanner || defaultHypergridBanner), title: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <RichTextareaWithEditor
                      label="Paragraph 1"
                      rows={4}
                      value={currentSec.paragraph1 !== undefined ? currentSec.paragraph1 : defaultHypergridBanner.paragraph1}
                      onChange={(val) => setFormData(prev => ({ ...prev, hypergridBanner: { ...(prev.hypergridBanner || defaultHypergridBanner), paragraph1: val } }))}
                      placeholder="Enter Paragraph 1..."
                    />
                  </div>
                  <div>
                    <RichTextareaWithEditor
                      label="Paragraph 2"
                      rows={4}
                      value={currentSec.paragraph2 !== undefined ? currentSec.paragraph2 : defaultHypergridBanner.paragraph2}
                      onChange={(val) => setFormData(prev => ({ ...prev, hypergridBanner: { ...(prev.hypergridBanner || defaultHypergridBanner), paragraph2: val } }))}
                      placeholder="Enter Paragraph 2..."
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Right Graphic Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={bannerImg} alt="Banner Preview" style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.imgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, hypergridBanner: { ...(prev.hypergridBanner || defaultHypergridBanner), imgUrl: e.target.value } }))}
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
                              setFormData(prev => ({ ...prev, hypergridBanner: { ...(prev.hypergridBanner || defaultHypergridBanner), imgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                        🏷️ Right Graphic Alt Text (SEO Keyword)
                      </label>
                      <input
                        type="text"
                        value={currentSec.imgAlt || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, hypergridBanner: { ...(prev.hypergridBanner || defaultHypergridBanner), imgAlt: e.target.value } }))}
                        placeholder="e.g. Interactive LED Floor Games for High-Footfall Venues - Winera International"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('hypergridBanner', formData.hypergridBanner || defaultHypergridBanner)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save High-Footfall Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* HYPERGRID SPECS FORM */}
          {activeSection === 'hypergridSpecs' && (() => {
            const currentSec = formData.hypergridSpecs || defaultHypergridSpecs;
            const bgImg = getAdminValidImageUrl(currentSec.bgUrl, defaultHypergridSpecs.bgUrl);
            const rowsList = Array.isArray(currentSec.rows) && currentSec.rows.length > 0 ? currentSec.rows : defaultHypergridSpecs.rows;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Technical Specifications Section</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1200 × 600 px (2:1)</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={bgImg} onError={(e) => { e.target.src = hypergridSpecsBg; }} alt="BG Preview" style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.bgUrl ? (currentSec.bgUrl.includes('/src/assets/') ? hypergridSpecsBg : currentSec.bgUrl) : ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, hypergridSpecs: { ...(prev.hypergridSpecs || defaultHypergridSpecs), bgUrl: e.target.value } }))}
                        placeholder="Image URL or Asset Path"
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                      <label style={{ padding: '12px 20px', background: '#38bdf8', color: '#ffffff', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Upload style={{ width: '16px', height: '16px' }} /> Upload BG
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const res = await uploadImageFile(file, admin.token);
                              setFormData(prev => ({ ...prev, hypergridSpecs: { ...(prev.hypergridSpecs || defaultHypergridSpecs), bgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                        🏷️ Background Image Alt Text (SEO Keyword)
                      </label>
                      <input
                        type="text"
                        value={currentSec.bgAlt || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, hypergridSpecs: { ...(prev.hypergridSpecs || defaultHypergridSpecs), bgAlt: e.target.value } }))}
                        placeholder="e.g. Technical Specifications - Hypergrid Interactive LED Gaming Floor"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Section Title (*word* for yellow highlight)</label>
                    <input
                      type="text"
                      value={currentSec.title !== undefined ? currentSec.title : defaultHypergridSpecs.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, hypergridSpecs: { ...(prev.hypergridSpecs || defaultHypergridSpecs), title: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>

                  {/* Specification Table Rows */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>Specification Table Rows</label>
                      <button
                        onClick={() => {
                          const currentRows = [...rowsList];
                          currentRows.push({ spec: '', details: '' });
                          setFormData(prev => ({ ...prev, hypergridSpecs: { ...(prev.hypergridSpecs || defaultHypergridSpecs), rows: currentRows } }));
                        }}
                        style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#0f172a', padding: '6px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <Plus style={{ width: '14px', height: '14px' }} /> Add Row
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {rowsList.map((row, rIdx) => (
                        <div key={rIdx} style={{ display: 'flex', gap: '12px', alignItems: 'center', background: '#f8fafc', padding: '10px 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                          <input
                            type="text"
                            value={row.spec || ''}
                            placeholder="Specification"
                            onChange={(e) => {
                              const newRows = [...rowsList];
                              newRows[rIdx] = { ...(newRows[rIdx] || row), spec: e.target.value };
                              setFormData(prev => ({ ...prev, hypergridSpecs: { ...(prev.hypergridSpecs || defaultHypergridSpecs), rows: newRows } }));
                            }}
                            style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                          />
                          <input
                            type="text"
                            value={row.details || ''}
                            placeholder="Details"
                            onChange={(e) => {
                              const newRows = [...rowsList];
                              newRows[rIdx] = { ...(newRows[rIdx] || row), details: e.target.value };
                              setFormData(prev => ({ ...prev, hypergridSpecs: { ...(prev.hypergridSpecs || defaultHypergridSpecs), rows: newRows } }));
                            }}
                            style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                          />
                          <button
                            onClick={async () => {
                              const newRows = rowsList.filter((_, i) => i !== rIdx);
                              const updatedSec = { ...(formData.hypergridSpecs || defaultHypergridSpecs), rows: newRows };
                              setFormData(prev => ({ ...prev, hypergridSpecs: updatedSec }));
                              await persistSectionToDatabase('hypergridSpecs', updatedSec);
                            }}
                            style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                          >
                            <Trash2 style={{ width: '16px', height: '16px' }} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                      <input
                        type="text"
                        value={currentSec.buttonText !== undefined ? currentSec.buttonText : defaultHypergridSpecs.buttonText}
                        onChange={(e) => setFormData(prev => ({ ...prev, hypergridSpecs: { ...(prev.hypergridSpecs || defaultHypergridSpecs), buttonText: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                        Brochure PDF File / Link URL <span style={{ fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '6px' }}>📄 PDF Document</span>
                      </label>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          type="text"
                          value={(currentSec.buttonLink && !currentSec.buttonLink.includes('wa.me')) ? currentSec.buttonLink : defaultHypergridSpecs.buttonLink}
                          onChange={(e) => setFormData(prev => ({ ...prev, hypergridSpecs: { ...(prev.hypergridSpecs || defaultHypergridSpecs), buttonLink: e.target.value } }))}
                          placeholder="e.g. /pdf/Hyper Grid.pdf or Cloudinary PDF URL"
                          style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                        />
                        <label style={{ background: '#38bdf8', color: '#fff', padding: '12px 18px', borderRadius: '12px', fontWeight: '800', fontSize: '12.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                          <Upload style={{ width: '15px', height: '15px' }} /> Upload PDF
                          <input
                            type="file"
                            accept="application/pdf,.pdf"
                            onChange={(e) => handleBrochureUpload(e, 'hypergridSpecs', 'buttonLink', {}, defaultHypergridSpecs)}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </div>
                      <div style={{ marginTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>
                          💡 Cloudinary Free plan limit: <strong>10 MB</strong> (Allows larger files automatically with a Cloudinary Pro plan). Compress via <a href="https://www.ilovepdf.com/compress_pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#0284c7', textDecoration: 'underline', fontWeight: '700' }}>iLovePDF</a> if needed.
                        </span>
                        {(() => {
                          const activePdf = (currentSec.buttonLink && !currentSec.buttonLink.includes('wa.me')) ? currentSec.buttonLink : defaultHypergridSpecs.buttonLink;
                          return activePdf && activePdf !== '#' ? (
                            <a
                              href={activePdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ fontSize: '11.5px', color: '#0284c7', fontWeight: '700', textDecoration: 'underline' }}
                            >
                              📄 Test & Preview PDF Brochure
                            </a>
                          ) : null;
                        })()}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('hypergridSpecs', formData.hypergridSpecs || defaultHypergridSpecs)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Technical Specs
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* HYPERGRID WHY US FORM */}
          {activeSection === 'hypergridWhyUs' && (() => {
            const currentSec = formData.hypergridWhyUs || defaultHypergridWhyUs;
            const bgImg = getAdminValidImageUrl(currentSec.bgUrl, defaultHypergridWhyUs.bgUrl);
            const leftImg = getAdminValidImageUrl(currentSec.leftImgUrl, defaultHypergridWhyUs.leftImgUrl);
            const cardsList = Array.isArray(currentSec.cards) && currentSec.cards.length > 0 ? currentSec.cards : defaultHypergridWhyUs.cards;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>What Makes Hypergrid the Right Choice</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Left Column Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <img src={leftImg} onError={(e) => { e.target.src = arImage; }} alt="Left Preview" style={{ width: '60px', height: '50px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                      <input
                        type="text"
                        value={currentSec.leftImgUrl ? (currentSec.leftImgUrl.includes('/src/assets/') ? arImage : currentSec.leftImgUrl) : ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, hypergridWhyUs: { ...(prev.hypergridWhyUs || defaultHypergridWhyUs), leftImgUrl: e.target.value } }))}
                        placeholder="Left Image URL"
                        style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                      />
                      <label style={{ padding: '10px 18px', background: '#38bdf8', color: '#ffffff', borderRadius: '10px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', whiteSpace: 'nowrap' }}>
                        <Upload style={{ width: '15px', height: '15px' }} /> Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const res = await uploadImageFile(file, admin.token);
                              setFormData(prev => ({ ...prev, hypergridWhyUs: { ...(prev.hypergridWhyUs || defaultHypergridWhyUs), leftImgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                        🏷️ Left Column Image Alt Text (SEO Keyword)
                      </label>
                      <input
                        type="text"
                        value={currentSec.leftImgAlt || currentSec.imgAlt || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, hypergridWhyUs: { ...(prev.hypergridWhyUs || defaultHypergridWhyUs), leftImgAlt: e.target.value, imgAlt: e.target.value } }))}
                        placeholder="e.g. What Makes Hypergrid the Right Choice for Your Venue - Winera"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Section Title (*word* for cyan highlight, &lt;br/&gt; for linebreaks)</label>
                    <input
                      type="text"
                      value={currentSec.title !== undefined ? currentSec.title : defaultHypergridWhyUs.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, hypergridWhyUs: { ...(prev.hypergridWhyUs || defaultHypergridWhyUs), title: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <RichTextareaWithEditor
                      label="Subtitle"
                      rows={2}
                      value={currentSec.subtitle !== undefined ? currentSec.subtitle : defaultHypergridWhyUs.subtitle}
                      onChange={(val) => setFormData(prev => ({ ...prev, hypergridWhyUs: { ...(prev.hypergridWhyUs || defaultHypergridWhyUs), subtitle: val } }))}
                      placeholder="Enter subtitle..."
                    />
                  </div>

                  {/* Features List */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>Feature Cards ({cardsList.length})</label>
                      <button
                        onClick={() => {
                          const currentCards = [...cardsList];
                          currentCards.push({ title: 'New Feature Title', desc: 'New feature description text...' });
                          setFormData(prev => ({ ...prev, hypergridWhyUs: { ...(prev.hypergridWhyUs || defaultHypergridWhyUs), cards: currentCards } }));
                        }}
                        style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#0f172a', padding: '6px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <Plus style={{ width: '14px', height: '14px' }} /> Add Feature Card
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {cardsList.map((card, cIdx) => (
                        <div key={cIdx} style={{ background: '#f8fafc', padding: '14px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '12px', fontWeight: '800', color: '#38bdf8' }}>Feature #{cIdx + 1}</span>
                            <button
                              onClick={async () => {
                                const newCards = cardsList.filter((_, i) => i !== cIdx);
                                const updatedSec = { ...(formData.hypergridWhyUs || defaultHypergridWhyUs), cards: newCards };
                                setFormData(prev => ({ ...prev, hypergridWhyUs: updatedSec }));
                                await persistSectionToDatabase('hypergridWhyUs', updatedSec);
                              }}
                              style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '800', cursor: 'pointer' }}
                            >
                              Delete
                            </button>
                          </div>
                          <input
                            type="text"
                            value={card.title || ''}
                            placeholder="Feature Title"
                            onChange={(e) => {
                              const newCards = [...cardsList];
                              newCards[cIdx] = { ...(newCards[cIdx] || card), title: e.target.value };
                              setFormData(prev => ({ ...prev, hypergridWhyUs: { ...(prev.hypergridWhyUs || defaultHypergridWhyUs), cards: newCards } }));
                            }}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                          />
                          <RichTextareaWithEditor
                            label="Feature Description"
                            rows={2}
                            value={card.desc || ''}
                            placeholder="Feature Description"
                            onChange={(val) => {
                              const newCards = [...cardsList];
                              newCards[cIdx] = { ...(newCards[cIdx] || card), desc: val };
                              setFormData(prev => ({ ...prev, hypergridWhyUs: { ...(prev.hypergridWhyUs || defaultHypergridWhyUs), cards: newCards } }));
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('hypergridWhyUs', formData.hypergridWhyUs || defaultHypergridWhyUs)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Why Choose Hypergrid
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* HYPERGRID ROI FORM */}
          {activeSection === 'hypergridRoi' && (() => {
            const currentSec = formData.hypergridRoi || defaultHypergridRoi;
            const roiImg = getAdminValidImageUrl(currentSec.imgUrl, defaultHypergridRoi.imgUrl);
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Is Hypergrid a Smart Investment Section</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Section Title (*word* for cyan highlight, &lt;br/&gt; for linebreaks)</label>
                    <input
                      type="text"
                      value={currentSec.title !== undefined ? currentSec.title : defaultHypergridRoi.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, hypergridRoi: { ...(prev.hypergridRoi || defaultHypergridRoi), title: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <RichTextareaWithEditor
                      label="Paragraph 1"
                      rows={3}
                      value={currentSec.paragraph1 !== undefined ? currentSec.paragraph1 : defaultHypergridRoi.paragraph1}
                      onChange={(val) => setFormData(prev => ({ ...prev, hypergridRoi: { ...(prev.hypergridRoi || defaultHypergridRoi), paragraph1: val } }))}
                      placeholder="Enter Paragraph 1..."
                    />
                  </div>
                  <div>
                    <RichTextareaWithEditor
                      label="Paragraph 2"
                      rows={3}
                      value={currentSec.paragraph2 !== undefined ? currentSec.paragraph2 : defaultHypergridRoi.paragraph2}
                      onChange={(val) => setFormData(prev => ({ ...prev, hypergridRoi: { ...(prev.hypergridRoi || defaultHypergridRoi), paragraph2: val } }))}
                      placeholder="Enter Paragraph 2..."
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                      <input
                        type="text"
                        value={currentSec.buttonText !== undefined ? currentSec.buttonText : defaultHypergridRoi.buttonText}
                        onChange={(e) => setFormData(prev => ({ ...prev, hypergridRoi: { ...(prev.hypergridRoi || defaultHypergridRoi), buttonText: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                      <input
                        type="text"
                        value={(currentSec.buttonLink && currentSec.buttonLink.split('?')[0]) || defaultHypergridRoi.buttonLink}
                        onChange={(e) => {
                          const baseLink = e.target.value;
                          const msg = currentSec.waMessage || "Hello Winera International! I want to talk to an ROI Expert for Hypergrid LED Floor Game setup & commercial ROI calculation. Please share details. [Ref: Hypergrid Page]";
                          const updatedLink = msg ? `${baseLink.split('?')[0]}?text=${encodeURIComponent(msg)}` : baseLink;
                          setFormData(prev => ({ ...prev, hypergridRoi: { ...(prev.hypergridRoi || defaultHypergridRoi), buttonLink: updatedLink } }));
                        }}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
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
                        if (currentSec.waMessage !== undefined && currentSec.waMessage !== '') return currentSec.waMessage;
                        if (currentSec.buttonLink && currentSec.buttonLink.includes('text=')) {
                          try {
                            const match = currentSec.buttonLink.match(/text=([^&]+)/);
                            if (match && match[1]) return decodeURIComponent(match[1]);
                          } catch (err) { }
                        }
                        return "Hello Winera International! I want to talk to an ROI Expert for Hypergrid LED Floor Game setup & commercial ROI calculation. Please share details. [Ref: Hypergrid Page]";
                      })()}
                      onChange={(e) => {
                        const newMsg = e.target.value;
                        const baseLink = (currentSec.buttonLink && currentSec.buttonLink.split('?')[0]) || defaultHypergridRoi.buttonLink;
                        const updatedLink = newMsg ? `${baseLink}?text=${encodeURIComponent(newMsg)}` : baseLink;
                        setFormData(prev => ({
                          ...prev,
                          hypergridRoi: {
                            ...(prev.hypergridRoi || defaultHypergridRoi),
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
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Right Graphic Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 400 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={roiImg} onError={(e) => { e.target.src = hypergridImage; }} alt="Preview" style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.imgUrl ? (currentSec.imgUrl.includes('/src/assets/') ? hypergridImage : currentSec.imgUrl) : ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, hypergridRoi: { ...(prev.hypergridRoi || defaultHypergridRoi), imgUrl: e.target.value } }))}
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
                              setFormData(prev => ({ ...prev, hypergridRoi: { ...(prev.hypergridRoi || defaultHypergridRoi), imgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                        🏷️ Right Graphic Image Alt Text (SEO Keyword)
                      </label>
                      <input
                        type="text"
                        value={currentSec.imgAlt || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, hypergridRoi: { ...(prev.hypergridRoi || defaultHypergridRoi), imgAlt: e.target.value } }))}
                        placeholder="e.g. Is Hypergrid a Smart Investment for Your Venue - Winera Commercial Setup"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('hypergridRoi', formData.hypergridRoi || defaultHypergridRoi)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Smart Investment Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* HYPERGRID WHY WINERA FORM */}
          {activeSection === 'hypergridWhyWinera' && (() => {
            const currentSec = formData.hypergridWhyWinera || defaultHypergridWhyWinera;
            const itemsList = Array.isArray(currentSec.items) && currentSec.items.length > 0 ? currentSec.items : defaultHypergridWhyWineraItems;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Why Choose Winera International Section</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Section Title (*word* for cyan highlight)</label>
                    <input
                      type="text"
                      value={currentSec.title !== undefined ? currentSec.title : defaultHypergridWhyWinera.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, hypergridWhyWinera: { ...(prev.hypergridWhyWinera || defaultHypergridWhyWinera), title: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>

                  {/* Feature Items List */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>Feature Cards ({itemsList.length})</label>
                      <button
                        onClick={() => {
                          const newItems = [...itemsList, { icon: 'award', title: 'New Benefit Title', desc: 'Description of the benefit...' }];
                          setFormData(prev => ({ ...prev, hypergridWhyWinera: { ...(prev.hypergridWhyWinera || defaultHypergridWhyWinera), items: newItems } }));
                        }}
                        style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <Plus style={{ width: '14px', height: '14px' }} /> Add Feature Card
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '14px' }}>
                      {itemsList.map((item, iIdx) => (
                        <div key={iIdx} style={{ background: '#f8fafc', padding: '14px', borderRadius: '14px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '12px', fontWeight: '800', color: '#38bdf8' }}>Card #{iIdx + 1}</span>
                            <button
                              onClick={async () => {
                                const newItems = itemsList.filter((_, i) => i !== iIdx);
                                const updatedSec = { ...(formData.hypergridWhyWinera || defaultHypergridWhyWinera), items: newItems };
                                setFormData(prev => ({ ...prev, hypergridWhyWinera: updatedSec }));
                                await persistSectionToDatabase('hypergridWhyWinera', updatedSec);
                              }}
                              style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                            >
                              <Trash2 style={{ width: '12px', height: '12px' }} /> Delete
                            </button>
                          </div>

                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <label style={{ fontSize: '11.5px', fontWeight: '700', color: '#64748b' }}>Icon:</label>
                            <select
                              value={item.icon || 'award'}
                              onChange={(e) => {
                                const newItems = [...itemsList];
                                newItems[iIdx] = { ...(newItems[iIdx] || item), icon: e.target.value };
                                setFormData(prev => ({ ...prev, hypergridWhyWinera: { ...(prev.hypergridWhyWinera || defaultHypergridWhyWinera), items: newItems } }));
                              }}
                              style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: '700', flex: 1 }}
                            >
                              <option value="award">Award / Equipment</option>
                              <option value="settings">Settings / Custom</option>
                              <option value="coins">Coins / ROI</option>
                              <option value="headphones">Headphones / Installation</option>
                              <option value="calendar">Calendar / Training</option>
                              <option value="package">Package / Support</option>
                            </select>
                          </div>

                          <input
                            type="text"
                            value={item.title || ''}
                            placeholder="Card Title"
                            onChange={(e) => {
                              const newItems = [...itemsList];
                              newItems[iIdx] = { ...(newItems[iIdx] || item), title: e.target.value };
                              setFormData(prev => ({ ...prev, hypergridWhyWinera: { ...(prev.hypergridWhyWinera || defaultHypergridWhyWinera), items: newItems } }));
                            }}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                          />

                          <RichTextareaWithEditor
                            label="Card Description"
                            rows={2}
                            value={item.desc || ''}
                            placeholder="Card Description"
                            onChange={(val) => {
                              const newItems = [...itemsList];
                              newItems[iIdx] = { ...(newItems[iIdx] || item), desc: val };
                              setFormData(prev => ({ ...prev, hypergridWhyWinera: { ...(prev.hypergridWhyWinera || defaultHypergridWhyWinera), items: newItems } }));
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('hypergridWhyWinera', formData.hypergridWhyWinera || defaultHypergridWhyWinera)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Why Choose Winera Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* HYPERGRID FAQS MANAGEMENT FORM */}
          {activeSection === 'hypergridFaqs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Hypergrid FAQs Management ({Array.isArray(formData.hypergridFaqs) && formData.hypergridFaqs.length > 0 ? formData.hypergridFaqs.length : defaultHypergridFaqs.length})</h3>
                <button
                  onClick={() => {
                    const currentList = Array.isArray(formData.hypergridFaqs) && formData.hypergridFaqs.length > 0
                      ? formData.hypergridFaqs
                      : defaultHypergridFaqs;
                    const updated = [...currentList, { question: '', answer: '' }];
                    setFormData((prev) => ({ ...prev, hypergridFaqs: updated }));
                  }}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                >
                  + Add FAQ Item
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(Array.isArray(formData.hypergridFaqs) && formData.hypergridFaqs.length > 0
                  ? formData.hypergridFaqs
                  : defaultHypergridFaqs
                ).map((faq, idx) => (
                  <div key={idx} style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '800', fontSize: '13px', color: '#0369a1' }}>FAQ #{idx + 1}</span>
                      <button
                        onClick={async () => {
                          const currentList = Array.isArray(formData.hypergridFaqs) && formData.hypergridFaqs.length > 0
                            ? [...formData.hypergridFaqs]
                            : [...defaultHypergridFaqs];
                          const updated = currentList.filter((_, i) => i !== idx);
                          setFormData((prev) => ({ ...prev, hypergridFaqs: updated }));
                          await persistSectionToDatabase('hypergridFaqs', updated);
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
                        const currentList = [...(formData.hypergridFaqs || [])];
                        currentList[idx] = { ...(currentList[idx] || {}), question: e.target.value, q: e.target.value };
                        setFormData((prev) => ({ ...prev, hypergridFaqs: currentList }));
                      }}
                      style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: '700' }}
                    />

                    <RichTextareaWithEditor
                      label="Answer"
                      rows={3}
                      placeholder="Answer"
                      value={faq.answer || faq.a || ''}
                      onChange={(val) => {
                        const currentList = [...(formData.hypergridFaqs || [])];
                        currentList[idx] = { ...(currentList[idx] || {}), answer: val, a: val };
                        setFormData((prev) => ({ ...prev, hypergridFaqs: currentList }));
                      }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('hypergridFaqs', formData.hypergridFaqs || [])}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Hypergrid FAQs
                </button>
              </div>
            </div>
          )}

          {/* HYPERGRID CTA BANNER FORM */}
          {activeSection === 'hypergridCta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Hypergrid CTA Banner Settings</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Banner Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img
                    src={getAdminValidImageUrl(formData.hypergridCta?.bgUrl, ctaMainBanner)}
                    alt="Banner Background Preview"
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
                    gap: '8px'
                  }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Choose Banner Background Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading banner background...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.hypergridCta || {}), bgUrl: res.url };
                          setFormData(prev => ({ ...prev, hypergridCta: updated }));
                          await persistSectionToDatabase('hypergridCta', updated);
                          setStatusMsg('Image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {formData.hypergridCta?.bgUrl && (
                    <button
                      type="button"
                      onClick={async () => {
                        const updated = { ...(formData.hypergridCta || {}), bgUrl: '' };
                        setFormData(prev => ({ ...prev, hypergridCta: updated }));
                        await persistSectionToDatabase('hypergridCta', updated);
                        setStatusMsg('Banner reset to default successfully!');
                      }}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Reset to Default Banner
                    </button>
                  )}
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                    🏷️ Banner Background Image Alt Text (SEO Keyword)
                  </label>
                  <input
                    type="text"
                    value={formData.hypergridCta?.bgAlt || ''}
                    onChange={(e) => handleFieldChange('hypergridCta', 'bgAlt', e.target.value)}
                    placeholder="e.g. Ready to Add Hypergrid to Your Venue - Winera"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>



              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Title (*word* for cyan, &lt;br/&gt; for linebreaks)</label>
                <input
                  type="text"
                  value={formData.hypergridCta?.title !== undefined && formData.hypergridCta.title !== '' ? formData.hypergridCta.title : "READY TO ADD *HYPERGRID*<br/>TO YOUR *VENUE?*"}
                  onChange={(e) => handleFieldChange('hypergridCta', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Subtitle Text"
                  rows={2}
                  value={formData.hypergridCta?.subtitle !== undefined && formData.hypergridCta.subtitle !== '' ? formData.hypergridCta.subtitle : "Get In Touch With India's Trusted Hypergrid Game Supplier For A Free ROI Report, Space Assessment, And Project Quote."}
                  onChange={(val) => handleFieldChange('hypergridCta', 'subtitle', val)}
                  placeholder="Enter Subtitle Text..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>CTA Button Label</label>
                  <input
                    type="text"
                    value={formData.hypergridCta?.buttonText || 'Talk to an ROI Expert'}
                    onChange={(e) => handleFieldChange('hypergridCta', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>CTA Button Link</label>
                  <input
                    type="text"
                    value={formData.hypergridCta?.buttonLink || 'https://wa.me/919157873576'}
                    onChange={(e) => handleFieldChange('hypergridCta', 'buttonLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('hypergridCta', formData.hypergridCta || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Hypergrid CTA Banner
                </button>
              </div>
            </div>
          )}
    </>
  );
}
