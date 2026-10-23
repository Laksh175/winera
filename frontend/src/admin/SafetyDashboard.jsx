import React from 'react';
import { Upload, Plus, Trash2 } from 'lucide-react';
import RichTextareaWithEditor from '../components/RichTextareaWithEditor';
import { uploadImageFile } from '../services/api';

const defaultGameZoneMobileBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345484/winera_uploads/cjhcvoxksmptc84yslh2.png";
const safetyBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345683/winera_uploads/getce7p5gid4wrppgnic.png";
const safetyStandardImg1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345683/winera_uploads/z3eceycrpfb2wkxweq2g.png";
const safetyStandardBg2 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345683/winera_uploads/lihbfrarrh6ffswp6v6s.png";
const safetyStandard2 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345680/winera_uploads/eawljpqyxow6oyrtd63i.png";
const safetyStandardImg3 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345683/winera_uploads/qbaxirh5jtpuy4ix90ae.png";
const hypergridWineraLastblock = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345667/winera_uploads/enkcvfcpvzrd9rosyjno.jpg";
const ctaMainBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345648/winera_uploads/ei16uczeuelaabtue4bs.jpg";

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

const defaultSafetyHero = {
  bgUrl: safetyBg,
  breadcrumbText: 'Safety Standards',
  bgAlt: 'Safety Standards & Quality Certification - Winera',
  mobileBgUrl: defaultGameZoneMobileBanner,
  mobileBgAlt: 'Safety Standards & Quality Certification Mobile Banner - Winera'
};

const defaultSafetyIntro = {
  titleLine1: 'Game Zone & Kids Play',
  titleLine2: 'Equipment Safety Standards',
  p1: 'When you invest in a game zone or family entertainment center, the safety of your equipment protects your visitors, your reputation, and your investment. At Winera International, product safety and quality is our highest priority. Every product we supply — from arcade games to trampoline parks and climbing walls is certified to international safety standards for commercial, high-footfall use, and every venue is installed by our own trained team and inspected on-site before handover.',
  p2: "As a complete game zone developer, our safety commitment covers four areas: the attractions themselves, the materials they're made of, the electrical systems that power them, and the structure and operation of the finished venue.",
  mainImgUrl: safetyStandardImg1
};

const defaultSafetyCertificationsCards = [
  {
    title: "EN 1176 — Play Structures & Ninja Courses (Europe)",
    desc: "EN 1176 is the European Standard for Playground Equipment, published by CEN. It sets safety requirements for structural strength, heights, gaps, and entrapment protection so children play without hidden risks. Winera International supplies and installs soft play and ninja course equipment that complies with EN 1176 — helping your venue pass inspections."
  },
  {
    title: "EN 1177 — Impact-Absorbing Surfaces (Europe)",
    desc: "EN 1177 is the European Standard for playground impact-absorbing surfaces, published by CEN. It defines how flooring must cushion falls, setting critical fall heights for different materials to reduce injury. Winera International supplies installs safety flooring around play, ninja, and climbing areas that complies with EN 1177 — keeping falls safe."
  },
  {
    title: "ASTM F1918 — Soft Contained Play (International)",
    desc: "ASTM F1918 is the Standard Safety Performance Specification for Soft Contained Play Equipment, published by ASTM International. It sets safety rules for enclosed, padded play structures used in indoor kids zones, covering design, padding, and fall protection. Winera International supplies and installs soft play equipment that complies with ASTM F1918 — helping your venue pass inspections."
  },
  {
    title: "ASTM F2970 — Trampoline Parks (International)",
    desc: "ASTM F2970 is the international Standard Practice for Trampoline Courts, published by ASTM International. It sets safety requirements for net enclosures, frame padding, spacing, and impact zones to prevent falls and collisions. Winera International supplies and installs trampoline parks certified to ASTM F2970 — helping your venue stay safe and pass inspections."
  },
  {
    title: "EN 12572 — Climbing Walls (Europe)",
    desc: "EN 12572 is the European Standard for artificial climbing structures, published by CEN. It sets safety requirements for wall stability, holds, heights, anchor points, and fall zones so climbers stay protected. Winera International supplies and installs wall climbing setups that comply with EN 12572 — helping your venue meet safety standards and pass inspections."
  },
  {
    title: "IS 15475 & IS 15492 — Amusement Rides (India / BIS)",
    desc: "IS 15475 and IS 15492 are Indian Standards published by the Bureau of Indian Standards (BIS). They set safety rules for the design, construction, and operation of amusement rides and devices in India. Winera International supplies amusement park rides and bumper cars that follow these BIS standards — keeping your venue compliant."
  },
  {
    title: "EN 13814 / ISO 17842 — Amusement Devices (International)",
    desc: "EN 13814 and ISO 17842 are the international standards for amusement rides and devices, developed by CEN and ISO. They set safety requirements for the design, manufacturing, and operation of rides. Winera International supplies bumper cars and amusement park attractions that comply with these standards — ensuring safe, reliable operation in high-footfall venues."
  }
];

const defaultSafetyCertifications = {
  title1: "Play & Attraction",
  title2: "Equipment Safety",
  subtitle: "These standards make sure every attraction people play on is safe by design.",
  cards: defaultSafetyCertificationsCards
};

const defaultSafetyMaterialsCards = [
  {
    title: "Fire-Safe Materials (India)",
    desc: "In India, game zone materials must not catch fire easily. The padding, nets, and finishes we use are fire-safe, so they slow down flames instead of feeding them. This keeps your visitors safer and helps your venue follow the law."
  },
  {
    title: "NFPA 701 & UL 94 — Fire Safety (International)",
    desc: "These two tests check how well materials resist fire. NFPA 701 tests cloth and nets, and UL 94 tests plastic parts, to make sure they don't burn quickly. The materials we use pass these fire-safety tests."
  },
  {
    title: "EN 71 — Safe Play Materials (Europe)",
    desc: "EN 71 is a European rule that makes sure play materials are safe for children. It checks that they don't catch fire easily and don't contain harmful chemicals. Our kids' equipment meets the EN 71 standard."
  },
  {
    title: "EU REACH & CPSIA — Non-Toxic Materials",
    desc: "These rules keep harmful chemicals, lead, and other unsafe substances out of children's products. The materials in our kids' equipment follow these rules, so they are safe for kids to touch and play on."
  }
];

const defaultSafetyMaterials = {
  title1: "Material &",
  title2: "Fire Safety",
  subtitle: "These standards make sure everything is made from safe materials that don't catch fire easily and are not harmful to touch which is also a legal rule for game zones in India.",
  bgUrl: safetyStandardBg2,
  imgUrl: safetyStandard2,
  cards: defaultSafetyMaterialsCards
};

const defaultSafetyElectricalItems = [
  {
    num: "1",
    title: "CE Marking — European Safety Mark",
    desc: "The CE mark means a machine has passed Europe's health and safety checks. It shows the product is safe to use. Our arcade games, VR systems, laser tag, hypergrid, and bumper cars all carry the CE mark."
  },
  {
    num: "2",
    title: "RoHS — Safe Electronics",
    desc: "RoHS makes sure machines are not made with harmful materials inside their electronics. This keeps them safer and cleaner to use. All our electronic machines are RoHS-safe."
  },
  {
    num: "3",
    title: "IS / IEC — Electrical Safety Rules (India & International)",
    desc: "These rules make sure the wiring and power setup of every machine is safe. Our equipment — bowling pinsetters, scoring screens, VR, arcade games, and LED hypergrid floors — follows both Indian and international electrical safety rules for safe wiring, earthing, and power."
  }
];

const defaultSafetyElectrical = {
  title1: "Electrical &",
  title2: "Machine Safety",
  subtitle: "These rules make sure all machines that run on electricity are safe to use — like arcade games, VR, laser tag, bumper cars, hypergrid, bowling, and rides.",
  imgUrl: safetyStandardImg3,
  items: defaultSafetyElectricalItems
};

const defaultSafetyStructureCards = [
  {
    num: "01",
    accent: "#00aeef",
    title: "Strong and Stable Setup (India)",
    desc: "In India, a game zone must pass a check for strong, stable structure before it can get a licence. We build and fix everything properly so your venue is ready to pass that check. This matters most for climbing walls, ninja courses, trampolines, and rides, where the structure has to hold real weight safely."
  },
  {
    num: "02",
    accent: "#ffd600",
    title: "Quality Checks (ISO 9001)",
    desc: "ISO 9001 is a worldwide standard for good quality work. It makes sure the design, sourcing, and installation are done to a consistent, high standard every time. We follow these quality practices in all our projects."
  },
  {
    num: "03",
    accent: "#00aeef",
    title: "Full Safety Check Before Handover",
    desc: "Good equipment alone is not enough. Once all the games and machines are installed, our trained team runs a full safety check on the complete setup. We hand it over only after everything passes."
  },
  {
    num: "04",
    accent: "#ffd600",
    title: "Safe Running & Maintenance (ISO 17842-2 / EN 13814-2)",
    desc: "These standards are about running and looking after the attractions safely after they are built. We set up your venue the right way and show your team how to run and maintain each attraction safely."
  }
];

const defaultSafetyStructure = {
  title1: "Structure, Installation &",
  title2: "Operational Safety",
  subtitle: "These standards make sure the finished venue is strong, set up correctly, and safe to run every day — and ready to pass the local safety check needed for a licence.",
  cards: defaultSafetyStructureCards
};

const defaultSafetyWhyMatters = {
  title1: "Why This Matters",
  title2: "for Your Business",
  subtitle: "Good, certified equipment is a smart investment. It keeps visitors safe, protects your money, and helps you get your licence easier. In India, every game zone must pass checks for strong structure, fire safety, and electrical safety before it can open. Because we supply you certified equipment, fire-safe materials, and proper installation, your game zone is ready to pass these checks. The result: you open on time, stay within the rules, and win the trust of every family.",
  ctaTitle: "Need Any Consultations?",
  ctaSubtitle: "We're Ready To Give Answers To Your Questions.",
  buttonText: "Talk to an Expert",
  buttonLink: "https://wa.me/919157873576"
};


export default function SafetyDashboard({
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
          {activeSection === 'safetyHero' && (() => {
            const currentSec = formData.safetyHero || defaultSafetyHero;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Safety Hero Banner Settings</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Breadcrumb Text</label>
                    <input
                      type="text"
                      value={currentSec.breadcrumbText !== undefined ? currentSec.breadcrumbText : defaultSafetyHero.breadcrumbText}
                      onChange={(e) => setFormData(prev => ({ ...prev, safetyHero: { ...(prev.safetyHero || defaultSafetyHero), breadcrumbText: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended: 1920 × 450 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={getAdminValidImageUrl(currentSec.bgUrl, safetyBg)} alt="Hero Bg" style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                      <input
                        type="text"
                        value={currentSec.bgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyHero: { ...(prev.safetyHero || defaultSafetyHero), bgUrl: e.target.value } }))}
                        placeholder="Background Image URL"
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
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
                              setFormData(prev => ({ ...prev, safetyHero: { ...(prev.safetyHero || defaultSafetyHero), bgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                        🏷️ Hero Background Alt Text (SEO Keyword)
                      </label>
                      <input
                        type="text"
                        value={currentSec.bgAlt || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyHero: { ...(prev.safetyHero || defaultSafetyHero), bgAlt: e.target.value } }))}
                        placeholder="e.g. Safety Standards & Quality Certification - Winera"
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
                        src={getAdminValidImageUrl(currentSec.mobileBgUrl, defaultGameZoneMobileBanner)}
                        alt="Safety Mobile Hero Preview"
                        style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                      />
                      <input
                        type="text"
                        value={currentSec.mobileBgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyHero: { ...(prev.safetyHero || defaultSafetyHero), mobileBgUrl: e.target.value } }))}
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
                              setFormData(prev => ({ ...prev, safetyHero: { ...(prev.safetyHero || defaultSafetyHero), mobileBgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                      {currentSec.mobileBgUrl && (
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, safetyHero: { ...(prev.safetyHero || defaultSafetyHero), mobileBgUrl: '' } }))}
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
                        value={currentSec.mobileBgAlt !== undefined ? currentSec.mobileBgAlt : ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyHero: { ...(prev.safetyHero || defaultSafetyHero), mobileBgAlt: e.target.value } }))}
                        placeholder="e.g. Safety Standards & Quality Certification Mobile Banner - Winera"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('safetyHero', formData.safetyHero || defaultSafetyHero)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Safety Hero Banner
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* SAFETY INTRO FORM */}
          {activeSection === 'safetyIntro' && (() => {
            const currentSec = formData.safetyIntro || defaultSafetyIntro;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Safety Standards Intro Section</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Line 1 (Dark Text)</label>
                      <input
                        type="text"
                        value={currentSec.titleLine1 !== undefined ? currentSec.titleLine1 : defaultSafetyIntro.titleLine1}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyIntro: { ...(prev.safetyIntro || defaultSafetyIntro), titleLine1: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Line 2 (Cyan Text)</label>
                      <input
                        type="text"
                        value={currentSec.titleLine2 !== undefined ? currentSec.titleLine2 : defaultSafetyIntro.titleLine2}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyIntro: { ...(prev.safetyIntro || defaultSafetyIntro), titleLine2: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                  <RichTextareaWithEditor
                    label="Paragraph 1"
                    rows={4}
                    value={currentSec.p1 !== undefined ? currentSec.p1 : defaultSafetyIntro.p1}
                    onChange={(val) => setFormData(prev => ({ ...prev, safetyIntro: { ...(prev.safetyIntro || defaultSafetyIntro), p1: val } }))}
                    placeholder="Enter paragraph 1..."
                  />
                  <RichTextareaWithEditor
                    label="Paragraph 2"
                    rows={4}
                    value={currentSec.p2 !== undefined ? currentSec.p2 : defaultSafetyIntro.p2}
                    onChange={(val) => setFormData(prev => ({ ...prev, safetyIntro: { ...(prev.safetyIntro || defaultSafetyIntro), p2: val } }))}
                    placeholder="Enter paragraph 2..."
                  />
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Left Graphic Collage Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended: 640 × 520 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={getAdminValidImageUrl(currentSec.mainImgUrl, safetyStandardImg1)} alt="Intro Img" style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                      <input
                        type="text"
                        value={currentSec.mainImgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyIntro: { ...(prev.safetyIntro || defaultSafetyIntro), mainImgUrl: e.target.value } }))}
                        placeholder="Main Image URL"
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
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
                              setFormData(prev => ({ ...prev, safetyIntro: { ...(prev.safetyIntro || defaultSafetyIntro), mainImgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                        🏷️ Intro Image Alt Text (SEO Keyword)
                      </label>
                      <input
                        type="text"
                        value={currentSec.mainImgAlt || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyIntro: { ...(prev.safetyIntro || defaultSafetyIntro), mainImgAlt: e.target.value } }))}
                        placeholder="e.g. Game Zone & Kids Play Equipment Safety Standards - Winera International"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('safetyIntro', formData.safetyIntro || defaultSafetyIntro)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Safety Intro Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* SAFETY CERTIFICATIONS FORM */}
          {activeSection === 'safetyCertifications' && (() => {
            const currentSec = formData.safetyCertifications || defaultSafetyCertifications;
            const cardsList = Array.isArray(currentSec.cards) ? currentSec.cards : defaultSafetyCertificationsCards;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>Certified Safety Standards (Total {cardsList.length} Cards)</h3>
                  <button
                    type="button"
                    onClick={async () => {
                      const updated = [...cardsList, { title: "New Certified Standard", desc: "Standard description..." }];
                      const updatedSec = { ...(formData.safetyCertifications || defaultSafetyCertifications), cards: updated };
                      setFormData(prev => ({ ...prev, safetyCertifications: updatedSec }));
                      await persistSectionToDatabase('safetyCertifications', updatedSec);
                    }}
                    style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: '800', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Plus style={{ width: '14px', height: '14px' }} /> Add Card
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Part 1</label>
                      <input
                        type="text"
                        value={currentSec.title1 !== undefined ? currentSec.title1 : defaultSafetyCertifications.title1}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyCertifications: { ...(prev.safetyCertifications || defaultSafetyCertifications), title1: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Part 2 (Cyan)</label>
                      <input
                        type="text"
                        value={currentSec.title2 !== undefined ? currentSec.title2 : defaultSafetyCertifications.title2}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyCertifications: { ...(prev.safetyCertifications || defaultSafetyCertifications), title2: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                  <RichTextareaWithEditor
                    label="Section Subtitle"
                    rows={2}
                    value={currentSec.subtitle !== undefined ? currentSec.subtitle : defaultSafetyCertifications.subtitle}
                    onChange={(val) => setFormData(prev => ({ ...prev, safetyCertifications: { ...(prev.safetyCertifications || defaultSafetyCertifications), subtitle: val } }))}
                    placeholder="Enter section subtitle..."
                  />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
                    {cardsList.map((card, idx) => (
                      <div key={idx} style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '14px', border: '1px solid #e2e8f0', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <span style={{ fontWeight: '800', fontSize: '13px', color: '#38bdf8' }}>Card #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={async () => {
                              const updated = cardsList.filter((_, i) => i !== idx);
                              const updatedSec = { ...(formData.safetyCertifications || defaultSafetyCertifications), cards: updated };
                              setFormData(prev => ({ ...prev, safetyCertifications: updatedSec }));
                              await persistSectionToDatabase('safetyCertifications', updatedSec);
                            }}
                            style={{ background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Trash2 style={{ width: '13px', height: '13px' }} /> Delete
                          </button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <input
                            type="text"
                            placeholder="Card Title (e.g. EN 1176)"
                            value={card.title || ''}
                            onChange={(e) => {
                              const updated = [...cardsList];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setFormData(prev => ({ ...prev, safetyCertifications: { ...(prev.safetyCertifications || defaultSafetyCertifications), cards: updated } }));
                            }}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '700' }}
                          />
                          <RichTextareaWithEditor
                            label="Card Description"
                            rows={3}
                            placeholder="Card Description..."
                            value={card.desc || ''}
                            onChange={(val) => {
                              const updated = [...cardsList];
                              updated[idx] = { ...updated[idx], desc: val };
                              setFormData(prev => ({ ...prev, safetyCertifications: { ...(prev.safetyCertifications || defaultSafetyCertifications), cards: updated } }));
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('safetyCertifications', formData.safetyCertifications || defaultSafetyCertifications)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Certified Standards
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* SAFETY MATERIALS FORM */}
          {activeSection === 'safetyMaterials' && (() => {
            const currentSec = formData.safetyMaterials || defaultSafetyMaterials;
            const cardsList = Array.isArray(currentSec.cards) ? currentSec.cards : defaultSafetyMaterialsCards;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>Material & Fire Safety Section (Total {cardsList.length} Cards)</h3>
                  <button
                    type="button"
                    onClick={async () => {
                      const updated = [...cardsList, { title: "New Material Standard", desc: "Description..." }];
                      const updatedSec = { ...(formData.safetyMaterials || defaultSafetyMaterials), cards: updated };
                      setFormData(prev => ({ ...prev, safetyMaterials: updatedSec }));
                      await persistSectionToDatabase('safetyMaterials', updatedSec);
                    }}
                    style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: '800', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Plus style={{ width: '14px', height: '14px' }} /> Add Card
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Part 1 (Cyan)</label>
                      <input
                        type="text"
                        value={currentSec.title1 !== undefined ? currentSec.title1 : defaultSafetyMaterials.title1}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyMaterials: { ...(prev.safetyMaterials || defaultSafetyMaterials), title1: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Part 2 (Dark)</label>
                      <input
                        type="text"
                        value={currentSec.title2 !== undefined ? currentSec.title2 : defaultSafetyMaterials.title2}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyMaterials: { ...(prev.safetyMaterials || defaultSafetyMaterials), title2: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                  <RichTextareaWithEditor
                    label="Section Subtitle"
                    rows={3}
                    value={currentSec.subtitle !== undefined ? currentSec.subtitle : defaultSafetyMaterials.subtitle}
                    onChange={(val) => setFormData(prev => ({ ...prev, safetyMaterials: { ...(prev.safetyMaterials || defaultSafetyMaterials), subtitle: val } }))}
                    placeholder="Enter section subtitle..."
                  />


                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Right Shield Graphic Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended: 540 × 580 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={getAdminValidImageUrl(currentSec.imgUrl, safetyStandard2)} alt="Materials Img" style={{ width: '100px', height: '60px', objectFit: 'contain', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                      <input
                        type="text"
                        value={currentSec.imgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyMaterials: { ...(prev.safetyMaterials || defaultSafetyMaterials), imgUrl: e.target.value } }))}
                        placeholder="Image URL"
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
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
                              setFormData(prev => ({ ...prev, safetyMaterials: { ...(prev.safetyMaterials || defaultSafetyMaterials), imgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                        🏷️ Material Safety Image Alt Text (SEO Keyword)
                      </label>
                      <input
                        type="text"
                        value={currentSec.imgAlt || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyMaterials: { ...(prev.safetyMaterials || defaultSafetyMaterials), imgAlt: e.target.value } }))}
                        placeholder="e.g. Material & Fire Safety - Commercial Play Equipment - Winera"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
                    {cardsList.map((card, idx) => (
                      <div key={idx} style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <span style={{ fontWeight: '800', fontSize: '13px', color: '#38bdf8' }}>Material Card #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={async () => {
                              const updated = cardsList.filter((_, i) => i !== idx);
                              const updatedSec = { ...(formData.safetyMaterials || defaultSafetyMaterials), cards: updated };
                              setFormData(prev => ({ ...prev, safetyMaterials: updatedSec }));
                              await persistSectionToDatabase('safetyMaterials', updatedSec);
                            }}
                            style={{ background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Trash2 style={{ width: '13px', height: '13px' }} /> Delete
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Card Title"
                          value={card.title || ''}
                          onChange={(e) => {
                            const updated = [...cardsList];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            setFormData(prev => ({ ...prev, safetyMaterials: { ...(prev.safetyMaterials || defaultSafetyMaterials), cards: updated } }));
                          }}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '700', marginBottom: '10px' }}
                        />
                        <RichTextareaWithEditor
                          label="Card Description"
                          rows={3}
                          placeholder="Card Description..."
                          value={card.desc || ''}
                          onChange={(val) => {
                            const updated = [...cardsList];
                            updated[idx] = { ...updated[idx], desc: val };
                            setFormData(prev => ({ ...prev, safetyMaterials: { ...(prev.safetyMaterials || defaultSafetyMaterials), cards: updated } }));
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('safetyMaterials', formData.safetyMaterials || defaultSafetyMaterials)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Material Safety Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* SAFETY ELECTRICAL FORM */}
          {activeSection === 'safetyElectrical' && (() => {
            const currentSec = formData.safetyElectrical || defaultSafetyElectrical;
            const itemsList = Array.isArray(currentSec.items) ? currentSec.items : defaultSafetyElectricalItems;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>Electrical & Machine Safety Section (Total {itemsList.length} Items)</h3>
                  <button
                    type="button"
                    onClick={async () => {
                      const updated = [...itemsList, { num: `${itemsList.length + 1}`, title: "New Item", desc: "Description..." }];
                      const updatedSec = { ...(formData.safetyElectrical || defaultSafetyElectrical), items: updated };
                      setFormData(prev => ({ ...prev, safetyElectrical: updatedSec }));
                      await persistSectionToDatabase('safetyElectrical', updatedSec);
                    }}
                    style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: '800', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Plus style={{ width: '14px', height: '14px' }} /> Add List Item
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Part 1 (Dark)</label>
                      <input
                        type="text"
                        value={currentSec.title1 !== undefined ? currentSec.title1 : defaultSafetyElectrical.title1}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyElectrical: { ...(prev.safetyElectrical || defaultSafetyElectrical), title1: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Part 2 (Cyan)</label>
                      <input
                        type="text"
                        value={currentSec.title2 !== undefined ? currentSec.title2 : defaultSafetyElectrical.title2}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyElectrical: { ...(prev.safetyElectrical || defaultSafetyElectrical), title2: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                  <RichTextareaWithEditor
                    label="Section Subtitle"
                    rows={3}
                    value={currentSec.subtitle !== undefined ? currentSec.subtitle : defaultSafetyElectrical.subtitle}
                    onChange={(val) => setFormData(prev => ({ ...prev, safetyElectrical: { ...(prev.safetyElectrical || defaultSafetyElectrical), subtitle: val } }))}
                    placeholder="Enter section subtitle..."
                  />
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Right Machine Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended: 560 × 520 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={getAdminValidImageUrl(currentSec.imgUrl, safetyStandardImg3)} alt="Electrical Img" style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                      <input
                        type="text"
                        value={currentSec.imgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyElectrical: { ...(prev.safetyElectrical || defaultSafetyElectrical), imgUrl: e.target.value } }))}
                        placeholder="Image URL"
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
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
                              setFormData(prev => ({ ...prev, safetyElectrical: { ...(prev.safetyElectrical || defaultSafetyElectrical), imgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                        🏷️ Electrical Safety Image Alt Text (SEO Keyword)
                      </label>
                      <input
                        type="text"
                        value={currentSec.imgAlt || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyElectrical: { ...(prev.safetyElectrical || defaultSafetyElectrical), imgAlt: e.target.value } }))}
                        placeholder="e.g. Electrical & Machine Safety - Commercial Play Zones - Winera"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
                    {itemsList.map((item, idx) => (
                      <div key={idx} style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <span style={{ fontWeight: '800', fontSize: '13px', color: '#38bdf8' }}>List Item #{item.num || idx + 1}</span>
                          <button
                            type="button"
                            onClick={async () => {
                              const updated = itemsList.filter((_, i) => i !== idx);
                              const updatedSec = { ...(formData.safetyElectrical || defaultSafetyElectrical), items: updated };
                              setFormData(prev => ({ ...prev, safetyElectrical: updatedSec }));
                              await persistSectionToDatabase('safetyElectrical', updatedSec);
                            }}
                            style={{ background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Trash2 style={{ width: '13px', height: '13px' }} /> Delete
                          </button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '10px', marginBottom: '10px' }}>
                          <input
                            type="text"
                            placeholder="Num (1)"
                            value={item.num || ''}
                            onChange={(e) => {
                              const updated = [...itemsList];
                              updated[idx] = { ...updated[idx], num: e.target.value };
                              setFormData(prev => ({ ...prev, safetyElectrical: { ...(prev.safetyElectrical || defaultSafetyElectrical), items: updated } }));
                            }}
                            style={{ padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '800', textAlign: 'center' }}
                          />
                          <input
                            type="text"
                            placeholder="Item Title"
                            value={item.title || ''}
                            onChange={(e) => {
                              const updated = [...itemsList];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setFormData(prev => ({ ...prev, safetyElectrical: { ...(prev.safetyElectrical || defaultSafetyElectrical), items: updated } }));
                            }}
                            style={{ padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '700' }}
                          />
                        </div>
                        <RichTextareaWithEditor
                          label="Item Description"
                          rows={3}
                          placeholder="Item Description..."
                          value={item.desc || ''}
                          onChange={(val) => {
                            const updated = [...itemsList];
                            updated[idx] = { ...updated[idx], desc: val };
                            setFormData(prev => ({ ...prev, safetyElectrical: { ...(prev.safetyElectrical || defaultSafetyElectrical), items: updated } }));
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('safetyElectrical', formData.safetyElectrical || defaultSafetyElectrical)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Electrical Safety Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* SAFETY STRUCTURE FORM */}
          {activeSection === 'safetyStructure' && (() => {
            const currentSec = formData.safetyStructure || defaultSafetyStructure;
            const cardsList = Array.isArray(currentSec.cards) ? currentSec.cards : defaultSafetyStructureCards;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>Structure & Installation Safety Section (Total {cardsList.length} Cards)</h3>
                  <button
                    type="button"
                    onClick={async () => {
                      const nextNum = cardsList.length + 1 < 10 ? `0${cardsList.length + 1}` : `${cardsList.length + 1}`;
                      const updated = [...cardsList, { num: nextNum, accent: "#00aeef", title: "New Structure Standard", desc: "Description..." }];
                      const updatedSec = { ...(formData.safetyStructure || defaultSafetyStructure), cards: updated };
                      setFormData(prev => ({ ...prev, safetyStructure: updatedSec }));
                      await persistSectionToDatabase('safetyStructure', updatedSec);
                    }}
                    style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: '800', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Plus style={{ width: '14px', height: '14px' }} /> Add Card
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Part 1 (Cyan)</label>
                      <input
                        type="text"
                        value={currentSec.title1 !== undefined ? currentSec.title1 : defaultSafetyStructure.title1}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyStructure: { ...(prev.safetyStructure || defaultSafetyStructure), title1: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Part 2 (Dark)</label>
                      <input
                        type="text"
                        value={currentSec.title2 !== undefined ? currentSec.title2 : defaultSafetyStructure.title2}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyStructure: { ...(prev.safetyStructure || defaultSafetyStructure), title2: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                  <RichTextareaWithEditor
                    label="Section Subtitle"
                    rows={3}
                    value={currentSec.subtitle !== undefined ? currentSec.subtitle : defaultSafetyStructure.subtitle}
                    onChange={(val) => setFormData(prev => ({ ...prev, safetyStructure: { ...(prev.safetyStructure || defaultSafetyStructure), subtitle: val } }))}
                    placeholder="Enter section subtitle..."
                  />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
                    {cardsList.map((card, idx) => (
                      <div key={idx} style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <span style={{ fontWeight: '800', fontSize: '13px', color: '#38bdf8' }}>Structure Card #{card.num || idx + 1}</span>
                          <button
                            type="button"
                            onClick={async () => {
                              const updated = cardsList.filter((_, i) => i !== idx);
                              const updatedSec = { ...(formData.safetyStructure || defaultSafetyStructure), cards: updated };
                              setFormData(prev => ({ ...prev, safetyStructure: updatedSec }));
                              await persistSectionToDatabase('safetyStructure', updatedSec);
                            }}
                            style={{ background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Trash2 style={{ width: '13px', height: '13px' }} /> Delete
                          </button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '80px 140px 1fr', gap: '10px', marginBottom: '10px' }}>
                          <input
                            type="text"
                            placeholder="Num (01)"
                            value={card.num || ''}
                            onChange={(e) => {
                              const updated = [...cardsList];
                              updated[idx] = { ...updated[idx], num: e.target.value };
                              setFormData(prev => ({ ...prev, safetyStructure: { ...(prev.safetyStructure || defaultSafetyStructure), cards: updated } }));
                            }}
                            style={{ padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '800', textAlign: 'center' }}
                          />
                          <input
                            type="text"
                            placeholder="Accent (#00aeef)"
                            value={card.accent || ''}
                            onChange={(e) => {
                              const updated = [...cardsList];
                              updated[idx] = { ...updated[idx], accent: e.target.value };
                              setFormData(prev => ({ ...prev, safetyStructure: { ...(prev.safetyStructure || defaultSafetyStructure), cards: updated } }));
                            }}
                            style={{ padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                          />
                          <input
                            type="text"
                            placeholder="Card Title"
                            value={card.title || ''}
                            onChange={(e) => {
                              const updated = [...cardsList];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setFormData(prev => ({ ...prev, safetyStructure: { ...(prev.safetyStructure || defaultSafetyStructure), cards: updated } }));
                            }}
                            style={{ padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '700' }}
                          />
                        </div>
                        <RichTextareaWithEditor
                          label="Card Description"
                          rows={3}
                          placeholder="Card Description..."
                          value={card.desc || ''}
                          onChange={(val) => {
                            const updated = [...cardsList];
                            updated[idx] = { ...updated[idx], desc: val };
                            setFormData(prev => ({ ...prev, safetyStructure: { ...(prev.safetyStructure || defaultSafetyStructure), cards: updated } }));
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('safetyStructure', formData.safetyStructure || defaultSafetyStructure)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Structure Safety Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* SAFETY WHY MATTERS & CTA FORM */}
          {activeSection === 'safetyWhyMatters' && (() => {
            const currentSec = formData.safetyWhyMatters || defaultSafetyWhyMatters;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Why This Matters & Build Yours Now CTA Section</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Section Title Part 1 (Cyan)</label>
                      <input
                        type="text"
                        value={currentSec.title1 !== undefined ? currentSec.title1 : defaultSafetyWhyMatters.title1}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyWhyMatters: { ...(prev.safetyWhyMatters || defaultSafetyWhyMatters), title1: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Section Title Part 2 (Dark)</label>
                      <input
                        type="text"
                        value={currentSec.title2 !== undefined ? currentSec.title2 : defaultSafetyWhyMatters.title2}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyWhyMatters: { ...(prev.safetyWhyMatters || defaultSafetyWhyMatters), title2: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  <RichTextareaWithEditor
                    label="Why This Matters Subtitle Paragraph"
                    rows={4}
                    value={currentSec.subtitle !== undefined ? currentSec.subtitle : defaultSafetyWhyMatters.subtitle}
                    onChange={(val) => setFormData(prev => ({ ...prev, safetyWhyMatters: { ...(prev.safetyWhyMatters || defaultSafetyWhyMatters), subtitle: val } }))}
                    placeholder="Enter section subtitle paragraph..."
                  />

                  {/* Banner Background Image Upload */}
                  <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
                      CTA Banner Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended: 1920 × 600 px</span>
                    </h4>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <img
                        src={getAdminValidImageUrl(currentSec.bgUrl || currentSec.bg, ctaMainBanner)}
                        alt="CTA Background Preview"
                        style={{ width: '140px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                      />
                      <input
                        type="text"
                        value={currentSec.bgUrl !== undefined ? currentSec.bgUrl : (currentSec.bg !== undefined ? currentSec.bg : hypergridWineraLastblock)}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyWhyMatters: { ...(prev.safetyWhyMatters || defaultSafetyWhyMatters), bgUrl: e.target.value, bg: e.target.value } }))}
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
                              setFormData(prev => ({ ...prev, safetyWhyMatters: { ...(prev.safetyWhyMatters || defaultSafetyWhyMatters), bgUrl: res.url, bg: res.url } }));
                              await persistSectionToDatabase('safetyWhyMatters', { ...(formData.safetyWhyMatters || defaultSafetyWhyMatters), bgUrl: res.url, bg: res.url });
                              setStatusMsg('Background image uploaded successfully!');
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                        🏷️ CTA Banner Background Alt Text (SEO Keyword)
                      </label>
                      <input
                        type="text"
                        value={currentSec.bgAlt || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyWhyMatters: { ...(prev.safetyWhyMatters || defaultSafetyWhyMatters), bgAlt: e.target.value } }))}
                        placeholder="e.g. Safety Standard Certified Game Zone Consultation - Winera"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>CTA Banner Title (Gradient Shaded Text)</label>
                    <input
                      type="text"
                      value={
                        currentSec.ctaTitle !== undefined && currentSec.ctaTitle !== "BUILD YOURS NOW" && !currentSec.ctaTitle.includes("BUILD")
                          ? currentSec.ctaTitle
                          : currentSec.ctaTitle1 || currentSec.ctaTitle2
                            ? `${(currentSec.ctaTitle1 || '').trim()} ${(currentSec.ctaTitle2 || '').trim()}`.replace(/\s+/g, ' ')
                            : "Need Any Consultations?"
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          safetyWhyMatters: {
                            ...(prev.safetyWhyMatters || defaultSafetyWhyMatters),
                            ctaTitle: val,
                            ctaTitle1: val,
                            ctaTitle2: ''
                          }
                        }));
                      }}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>

                  <RichTextareaWithEditor
                    label="CTA Banner Subtitle Text"
                    rows={2}
                    value={
                      currentSec.ctaSubtitle !== undefined
                        ? currentSec.ctaSubtitle
                        : (currentSec.whiteText !== undefined ? currentSec.whiteText : "We're Ready To Give Answers To Your Questions.")
                    }
                    onChange={(val) => {
                      setFormData(prev => ({
                        ...prev,
                        safetyWhyMatters: {
                          ...(prev.safetyWhyMatters || defaultSafetyWhyMatters),
                          ctaSubtitle: val,
                          whiteText: val
                        }
                      }));
                    }}
                    placeholder="Enter CTA banner subtitle..."
                  />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                      <input
                        type="text"
                        value={currentSec.buttonText !== undefined ? currentSec.buttonText : defaultSafetyWhyMatters.buttonText}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyWhyMatters: { ...(prev.safetyWhyMatters || defaultSafetyWhyMatters), buttonText: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Button WhatsApp Link</label>
                      <input
                        type="text"
                        value={currentSec.buttonLink !== undefined ? currentSec.buttonLink : defaultSafetyWhyMatters.buttonLink}
                        onChange={(e) => setFormData(prev => ({ ...prev, safetyWhyMatters: { ...(prev.safetyWhyMatters || defaultSafetyWhyMatters), buttonLink: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('safetyWhyMatters', formData.safetyWhyMatters || defaultSafetyWhyMatters)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Why Matters Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
    </>
  );
}
