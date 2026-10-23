import React from 'react';
import { Plus, Trash2, Edit2, Upload } from 'lucide-react';
import RichTextareaWithEditor from '../components/RichTextareaWithEditor';
import { uploadImageFile } from '../services/api';

const bowlingHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345639/winera_uploads/lp7tajaeyaq6qgrmo40k.png";
const bowlingMobileHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791344862/winera_uploads/rkmpp6gdku34kpzrxakm.png";
const bowlingImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345635/winera_uploads/zyqvt8jgfcgpdwwnsyp0.png";
const bowlingPinsExplode = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345635/winera_uploads/yma3vs3ksbgdout5sstv.png";
const bowlingBallPinsBlue = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345635/winera_uploads/itulmznrljzaclrtvu4p.png";
const bowlingImage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345640/winera_uploads/u8tizerxgewq8uzkhsws.png";

const maskGroupImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345494/winera_uploads/gez4jio7tv0srzaswalq.png";
const maskGroup01Img = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345493/winera_uploads/bf2obwmpvqhhbcbrsutk.png";
const trampolineParkCtaBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345688/winera_uploads/l1grqnreps9stov1wrta.png";

const defaultBowlingFaqs = [
  {
    q: "Why Choose Refurbished Brunswick Bowling Alley Equipment?",
    a: "We offer refurbished Brunswick bowling equipment that is well-known for its long-term reliability and performance. As one of the most preferred brands worldwide, Brunswick is valued for its stable mechanical capacity and low failure rate making it a top choice for bowling alley equipment globally. One of Brunswick’s standout features is its advanced scoring system that automatically identifies potential issues and provides user-friendly troubleshooting guides. This helps keep your lanes running smoothly with minimal downtime."
  },
  {
    q: "How is Brunswick Equipment Refurbished to Perfection?",
    a: "Our skilled engineers refurbish each set of Brunswick equipment with precision, replacing all worn parts using original Brunswick components. The result? A product that performs like new, at a fraction of the cost."
  },
  {
    q: "Why is the quality of refurbished Brunswick equipment trustworthy?",
    a: "Many bowling centers in India have shut down in recent years due to shifts in the sport's popularity. However, the equipment from these venues often remains in excellent condition, with many systems being only 2–5 years old. Considering Brunswick equipment is built to last 40–50 years, even lightly used units are still in their prime."
  },
  {
    q: "Why Opt for Refurbished Equipment?",
    a: "By choosing our refurbished Brunswick bowling systems, you can create a high-end bowling center at a cost-effective budget. With reliable machinery that’s been expertly restored, you’ll enjoy top-tier performance, low maintenance, and durability."
  },
  {
    q: "What is the Bowling Alley Setup Cost in India?",
    a: "The bowling alley setup cost in India depends on the number of lanes, equipment condition, and venue size. Winera International provides refurbished Brunswick bowling equipment at a fraction of new equipment cost making it possible to set up a high-end bowling center within a realistic budget. Contact our team for a complete cost-to-revenue report for your specific space."
  },
  {
    q: "What After-Sales Support Does Winera Provide for Bowling Alley Equipment?",
    a: "Our relationship with clients continues well after installation. We provide comprehensive maintenance, servicing, and support for all Brunswick bowling alley equipment we supply ensuring your lanes run smoothly with minimal downtime for years to come."
  },
  {
    q: "How much space is required to set up a bowling alley?",
    a: "A standard bowling lane requires 89 feet in length and 6 feet in width; a minimum of 2 lanes is recommended for commercial setups. Winera assesses your exact dimensions and provides a complete layout plan along with a free ROI report before confirming any equipment."
  },
  {
    q: "What is the difference between a free-fall bowling system and a string bowling system?",
    a: "Free-Fall Bowling System: In this system, the pins fall freely when the bowling ball hits them. It feels just like real bowling played in professional bowling centers.\n\nString Bowling System: In this system, each pin has a string attached at the top. After the ball hits the pins, the strings lift them back into place. It is easier to maintain and more affordable."
  }
];

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

export default function BowlingDashboard({
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
          {/* BOWLING HERO BANNER FORM */}
          {activeSection === 'bowlingHero' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Bowling Hero Banner</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Hero Title (Use *word* for Yellow Highlight)
                </label>
                <input
                  type="text"
                  value={formData.bowlingHero?.title || '*Bowling* Alley'}
                  onChange={(e) => handleFieldChange('bowlingHero', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Breadcrumb Active Page Text
                </label>
                <input
                  type="text"
                  value={formData.bowlingHero?.breadcrumbText || 'Bowling'}
                  onChange={(e) => handleFieldChange('bowlingHero', 'breadcrumbText', e.target.value)}
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
                    src={getAdminValidImageUrl(formData.bowlingHero?.bgUrl, bowlingHeroBg)}
                    alt="Hero Bg Preview"
                    style={{ width: '120px', height: '65px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                  />
                  <input
                    type="text"
                    value={formData.bowlingHero?.bgUrl || ''}
                    onChange={(e) => handleFieldChange('bowlingHero', 'bgUrl', e.target.value)}
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
                          handleFieldChange('bowlingHero', 'bgUrl', res.url);
                        }
                      }}
                    />
                  </label>
                  {formData.bowlingHero?.bgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('bowlingHero', 'bgUrl', '')}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '12px 18px', borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
              </div>

              {/* Hero Background Image Alt Tag */}
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  🏷️ Background Image Alt Text (SEO Keyword)
                </label>
                <input
                  type="text"
                  value={formData.bowlingHero?.bgAlt || ''}
                  onChange={(e) => handleFieldChange('bowlingHero', 'bgAlt', e.target.value)}
                  placeholder="e.g. Bowling Alley Setup & Manufacturer in India - Winera International"
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
                    src={getAdminValidImageUrl(formData.bowlingHero?.mobileBgUrl, bowlingMobileHeroBg)}
                    alt="Mobile Hero Bg Preview"
                    style={{ width: '120px', height: '65px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                  />
                  <input
                    type="text"
                    value={formData.bowlingHero?.mobileBgUrl || ''}
                    onChange={(e) => handleFieldChange('bowlingHero', 'mobileBgUrl', e.target.value)}
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
                          handleFieldChange('bowlingHero', 'mobileBgUrl', res.url);
                        }
                      }}
                    />
                  </label>
                  {formData.bowlingHero?.mobileBgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('bowlingHero', 'mobileBgUrl', '')}
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
                    value={formData.bowlingHero?.mobileBgAlt || ''}
                    onChange={(e) => handleFieldChange('bowlingHero', 'mobileBgAlt', e.target.value)}
                    placeholder="e.g. Bowling Alley Setup & Manufacturer Mobile Banner - Winera International"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('bowlingHero', formData.bowlingHero || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Bowling Hero Banner
                </button>
              </div>
            </div>
          )}


          {/* BOWLING MANUFACTURERS SECTION FORM */}
          {activeSection === 'bowlingIntro' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Bowling Alley Manufacturers in India Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Main Section Title (Use *word* for Cyan Accent and &lt;br/&gt; for linebreaks)
                </label>
                <input
                  type="text"
                  value={formData.bowlingIntro?.title || '*Bowling Alley*<br/>Manufacturers in India'}
                  onChange={(e) => handleFieldChange('bowlingIntro', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Description Paragraph"
                  rows={3}
                  value={formData.bowlingIntro?.desc || "India's trusted source for refurbished Brunswick bowling equipment — complete setup, installation, and a free ROI report before you invest."}
                  onChange={(val) => handleFieldChange('bowlingIntro', 'desc', val)}
                  placeholder="Enter bowling intro description..."
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                  Section Main Graphic Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img
                    src={getAdminValidImageUrl(formData.bowlingIntro?.mainImgUrl || formData.bowlingIntro?.imgUrl, bowlingImg)}
                    alt="Bowling Intro Graphic Preview"
                    style={{ width: '80px', height: '60px', borderRadius: '10px', border: '1.5px solid #38bdf8', objectFit: 'contain', background: '#ffffff', padding: '2px' }}
                  />
                  <label style={{ background: '#38bdf8', color: '#fff', padding: '10px 18px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Main Graphic Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading main graphic image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.bowlingIntro || {}), mainImgUrl: res.url, imgUrl: res.url };
                          setFormData(prev => ({ ...prev, bowlingIntro: updated }));
                          await persistSectionToDatabase('bowlingIntro', updated);
                          setStatusMsg('Main graphic image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {(formData.bowlingIntro?.mainImgUrl || formData.bowlingIntro?.imgUrl) && (
                    <button
                      type="button"
                      onClick={async () => {
                        const updated = { ...(formData.bowlingIntro || {}), mainImgUrl: '', imgUrl: '' };
                        setFormData(prev => ({ ...prev, bowlingIntro: updated }));
                        await persistSectionToDatabase('bowlingIntro', updated);
                      }}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
              </div>

              {/* Main Graphic Alt Tag */}
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  🏷️ Main Graphic Image Alt Text (SEO Keyword)
                </label>
                <input
                  type="text"
                  value={formData.bowlingIntro?.mainImgAlt || formData.bowlingIntro?.imgAlt || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    const updated = { ...(formData.bowlingIntro || {}), mainImgAlt: val, imgAlt: val };
                    setFormData(prev => ({ ...prev, bowlingIntro: updated }));
                  }}
                  placeholder="e.g. Bowling Alley Manufacturers in India - Winera International"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              {/* WhatsApp Action Button Controls for Bowling Intro */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    WhatsApp Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.bowlingIntro?.buttonText || 'Get Quote From Expert'}
                    onChange={(e) => handleFieldChange('bowlingIntro', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    WhatsApp Link URL
                  </label>
                  <input
                    type="text"
                    value={(formData.bowlingIntro?.buttonLink && formData.bowlingIntro.buttonLink.split('?')[0]) || 'https://wa.me/919157873576'}
                    onChange={(e) => {
                      const baseLink = e.target.value;
                      const msg = formData.bowlingIntro?.waMessage || "Hello Winera International! I want to get a quote and estimation for a Bowling Alley setup. Please share details. [Ref: Bowling Alley Page]";
                      const updatedLink = msg ? `${baseLink.split('?')[0]}?text=${encodeURIComponent(msg)}` : baseLink;
                      handleFieldChange('bowlingIntro', 'buttonLink', updatedLink);
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
                    if (formData.bowlingIntro?.waMessage !== undefined && formData.bowlingIntro?.waMessage !== '') return formData.bowlingIntro.waMessage;
                    if (formData.bowlingIntro?.buttonLink && formData.bowlingIntro.buttonLink.includes('text=')) {
                      try {
                        const match = formData.bowlingIntro.buttonLink.match(/text=([^&]+)/);
                        if (match && match[1]) return decodeURIComponent(match[1]);
                      } catch (err) { }
                    }
                    return "Hello Winera International! I want to get a quote and estimation for a Bowling Alley setup. Please share details. [Ref: Bowling Alley Page]";
                  })()}
                  onChange={(e) => {
                    const newMsg = e.target.value;
                    const baseLink = (formData.bowlingIntro?.buttonLink && formData.bowlingIntro.buttonLink.split('?')[0]) || 'https://wa.me/919157873576';
                    const updatedLink = newMsg ? `${baseLink}?text=${encodeURIComponent(newMsg)}` : baseLink;
                    const updated = {
                      ...(formData.bowlingIntro || {}),
                      waMessage: newMsg,
                      buttonLink: updatedLink
                    };
                    setFormData(prev => ({ ...prev, bowlingIntro: updated }));
                  }}
                  placeholder="e.g. Hello Winera International! I want to get a quote..."
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontWeight: '500', lineHeight: 1.5 }}
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => {
                    const cur = { ...(formData.bowlingIntro || {}) };
                    if (typeof cur.desc === 'string') {
                      cur.desc = cur.desc.replace(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|[\w\.,\(\)]+)\s*\n+\s*([a-z])/g, '$1 $2').trim();
                    }
                    persistSectionToDatabase('bowlingIntro', cur);
                  }}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Section Data
                </button>
              </div>
            </div>
          )}

          {/* PREMIUM BOWLING MANUFACTURER FORM */}
          {activeSection === 'bowlingManufacturer' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Premium Bowling Manufacturer Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Heading Title (Use *word* for Cyan Accent)
                </label>
                <input
                  type="text"
                  value={formData.bowlingManufacturer?.title || 'Premium Bowling *Alley Manufacturer in India*'}
                  onChange={(e) => handleFieldChange('bowlingManufacturer', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Paragraph 1 Description"
                  rows={4}
                  value={formData.bowlingManufacturer?.p1 !== undefined && formData.bowlingManufacturer.p1 !== '' ? formData.bowlingManufacturer.p1 : "At Winera International Pvt. Ltd., we are proud to be India's leading bowling alley manufacturer and supplier of refurbished Brunswick bowling equipment. With over 15 years of expertise in the industry, we have built a reputation for delivering top-quality bowling alley equipment and exceptional customer service, tailored to fit the unique needs and budgets of our clients."}
                  onChange={(val) => handleFieldChange('bowlingManufacturer', 'p1', val)}
                  placeholder="Enter Paragraph 1 description..."
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Paragraph 2 Description"
                  rows={4}
                  value={formData.bowlingManufacturer?.p2 !== undefined && formData.bowlingManufacturer.p2 !== '' ? formData.bowlingManufacturer.p2 : "We specialize in providing refurbished Brunswick GS98 & GSX equipment, enhanced with the latest Frameworx or Vector Scoring Systems based on your specific requirements. Our approach is simple — offer the best bowling solutions to match both your budget and venue dimensions, ensuring an outstanding bowling experience."}
                  onChange={(val) => handleFieldChange('bowlingManufacturer', 'p2', val)}
                  placeholder="Enter Paragraph 2 description..."
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                  Right Side Graphic Image (Exploding Bowling Pins & Ball) <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 500 × 500 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img
                    src={getAdminValidImageUrl(formData.bowlingManufacturer?.mainImgUrl || formData.bowlingManufacturer?.imgUrl, bowlingPinsExplode)}
                    alt="Pins Graphic Preview"
                    style={{ width: '80px', height: '60px', borderRadius: '10px', border: '1.5px solid #38bdf8', objectFit: 'contain', background: '#ffffff', padding: '2px' }}
                  />
                  <label style={{ background: '#38bdf8', color: '#fff', padding: '10px 18px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Pins Graphic Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading pins graphic image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.bowlingManufacturer || {}), mainImgUrl: res.url, imgUrl: res.url };
                          setFormData(prev => ({ ...prev, bowlingManufacturer: updated }));
                          await persistSectionToDatabase('bowlingManufacturer', updated);
                          setStatusMsg('Pins graphic image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {(formData.bowlingManufacturer?.mainImgUrl || formData.bowlingManufacturer?.imgUrl) && (
                    <button
                      type="button"
                      onClick={async () => {
                        const updated = { ...(formData.bowlingManufacturer || {}), mainImgUrl: '', imgUrl: '' };
                        setFormData(prev => ({ ...prev, bowlingManufacturer: updated }));
                        await persistSectionToDatabase('bowlingManufacturer', updated);
                      }}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
              </div>

              {/* Pins Graphic Alt Tag */}
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  🏷️ Pins Graphic Image Alt Text (SEO Keyword)
                </label>
                <input
                  type="text"
                  value={formData.bowlingManufacturer?.mainImgAlt || formData.bowlingManufacturer?.imgAlt || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    const updated = { ...(formData.bowlingManufacturer || {}), mainImgAlt: val, imgAlt: val };
                    setFormData(prev => ({ ...prev, bowlingManufacturer: updated }));
                  }}
                  placeholder="e.g. Exploding Bowling Pins - Commercial Bowling Lanes Setup"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('bowlingManufacturer', formData.bowlingManufacturer || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Premium Manufacturer Section
                </button>
              </div>
            </div>
          )}

          {/* FREE-FALL BOWLING FORM */}
          {activeSection === 'bowlingFreeFall' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Free-Fall Bowling Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Heading Title (Use *word* for Cyan Accent)
                </label>
                <input
                  type="text"
                  value={formData.bowlingFreeFall?.title || '*Free-Fall Bowling:*<br/>Give the Full Professional Experience'}
                  onChange={(e) => handleFieldChange('bowlingFreeFall', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Paragraph 1 Description"
                  rows={4}
                  value={formData.bowlingFreeFall?.p1 !== undefined && formData.bowlingFreeFall.p1 !== '' ? formData.bowlingFreeFall.p1 : "Free-fall bowling is the traditional game you'll find in professional bowling centers worldwide. When the ball hits the pins, they fall freely and naturally, and a pinsetter machine clears and resets them for the next throw. It delivers the true feel of real bowling, the satisfying strike and the competition-grade experience serious players expect."}
                  onChange={(val) => handleFieldChange('bowlingFreeFall', 'p1', val)}
                  placeholder="Enter Paragraph 1 description..."
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Paragraph 2 Description"
                  rows={4}
                  value={formData.bowlingFreeFall?.p2 !== undefined && formData.bowlingFreeFall.p2 !== '' ? formData.bowlingFreeFall.p2 : "We specialise in refurbished Brunswick GS98 and GS-X equipment, restored to perform like new and enhanced with the latest Frameworx or Vector scoring systems based on your specific requirements. Our approach is simple — offer the best bowling solutions to match both your budget and venue dimensions, ensuring an outstanding bowling experience. It's the ideal choice for dedicated bowling centers and premium venues where bowling is the main attraction."}
                  onChange={(val) => handleFieldChange('bowlingFreeFall', 'p2', val)}
                  placeholder="Enter Paragraph 2 description..."
                />
              </div>

              {/* Graphic Photo Upload */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                  Free-Fall Pinsetter Graphic Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 520 × 460 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img
                    src={getAdminValidImageUrl(formData.bowlingFreeFall?.mainImgUrl || formData.bowlingFreeFall?.imgUrl, maskGroupImg)}
                    alt="Free Fall Graphic Preview"
                    style={{ width: '80px', height: '60px', borderRadius: '10px', border: '1.5px solid #38bdf8', objectFit: 'contain', background: '#0f172a', padding: '2px' }}
                  />
                  <label style={{ background: '#38bdf8', color: '#fff', padding: '10px 18px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Graphic Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading Free-Fall graphic image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.bowlingFreeFall || {}), mainImgUrl: res.url, imgUrl: res.url };
                          setFormData(prev => ({ ...prev, bowlingFreeFall: updated }));
                          await persistSectionToDatabase('bowlingFreeFall', updated);
                          setStatusMsg('Free-Fall graphic image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {(formData.bowlingFreeFall?.mainImgUrl || formData.bowlingFreeFall?.imgUrl) && (
                    <button
                      type="button"
                      onClick={async () => {
                        const updated = { ...(formData.bowlingFreeFall || {}), mainImgUrl: '', imgUrl: '' };
                        setFormData(prev => ({ ...prev, bowlingFreeFall: updated }));
                        await persistSectionToDatabase('bowlingFreeFall', updated);
                      }}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                    🏷️ Free-Fall Graphic Image Alt Text (SEO Keyword)
                  </label>
                  <input
                    type="text"
                    value={formData.bowlingFreeFall?.mainImgAlt || formData.bowlingFreeFall?.imgAlt || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      const updated = { ...(formData.bowlingFreeFall || {}), mainImgAlt: val, imgAlt: val };
                      setFormData(prev => ({ ...prev, bowlingFreeFall: updated }));
                    }}
                    placeholder="e.g. Free Fall Bowling Pinsetter - Commercial Bowling Setup"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Watch Video Button Label</label>
                  <input
                    type="text"
                    value={formData.bowlingFreeFall?.btnText || 'Watch Video'}
                    onChange={(e) => handleFieldChange('bowlingFreeFall', 'btnText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    Watch Video URL Link <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>🎬 Video Ratio: 16:9 Landscape (YouTube / MP4)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.bowlingFreeFall?.videoUrl || 'https://wa.me/919157873576'}
                    onChange={(e) => handleFieldChange('bowlingFreeFall', 'videoUrl', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Lane Length Spec</label>
                  <input
                    type="text"
                    value={formData.bowlingFreeFall?.specLaneLength || '89 feet per lane'}
                    onChange={(e) => handleFieldChange('bowlingFreeFall', 'specLaneLength', e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Lane Width Spec</label>
                  <input
                    type="text"
                    value={formData.bowlingFreeFall?.specLaneWidth || '6 feet per lane'}
                    onChange={(e) => handleFieldChange('bowlingFreeFall', 'specLaneWidth', e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Pinsetter Spec</label>
                  <input
                    type="text"
                    value={formData.bowlingFreeFall?.specPinsetter || 'Free-fall (gravity-based)'}
                    onChange={(e) => handleFieldChange('bowlingFreeFall', 'specPinsetter', e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Experience Spec</label>
                  <input
                    type="text"
                    value={formData.bowlingFreeFall?.specExperience || 'Professional / competition-grade'}
                    onChange={(e) => handleFieldChange('bowlingFreeFall', 'specExperience', e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Best For Spec</label>
                <input
                  type="text"
                  value={formData.bowlingFreeFall?.specBestFor || 'Dedicated bowling centers, premium venues'}
                  onChange={(e) => handleFieldChange('bowlingFreeFall', 'specBestFor', e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('bowlingFreeFall', formData.bowlingFreeFall || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Free-Fall Section
                </button>
              </div>
            </div>
          )}

          {/* STRING BOWLING FORM */}
          {activeSection === 'bowlingString' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>String Bowling Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Heading Title (Use *word* for Cyan Accent)
                </label>
                <input
                  type="text"
                  value={formData.bowlingString?.title || 'String Bowling Machines:<br/>*Affordable Bowling Setup*<br/>*for Every Venue*'}
                  onChange={(e) => handleFieldChange('bowlingString', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Paragraph 1 Description"
                  rows={4}
                  value={formData.bowlingString?.p1 !== undefined && formData.bowlingString.p1 !== '' ? formData.bowlingString.p1 : "Add a complete, ready-to-play bowling setup to your venue at a lower upfront cost than a traditional free-fall system. We supply and install full string bowling lanes pins, strings, scoring screens, and commissioning so you get a finished attraction, not just a machine."}
                  onChange={(val) => handleFieldChange('bowlingString', 'p1', val)}
                  placeholder="Enter Paragraph 1 description..."
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Paragraph 2 Description"
                  rows={4}
                  value={formData.bowlingString?.p2 !== undefined && formData.bowlingString.p2 !== '' ? formData.bowlingString.p2 : "String systems have fewer moving parts, which means quieter lanes, easier maintenance your own team can handle, and a compact footprint that fits where a full 89 ft lane won't. That's why family entertainment centers, malls, resorts, and cafés choose them. Lower to set up, lower to run, and quick to start earning."}
                  onChange={(val) => handleFieldChange('bowlingString', 'p2', val)}
                  placeholder="Enter Paragraph 2 description..."
                />
              </div>

              {/* Graphic Photo Upload */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                  String Bowling Graphic Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 520 × 460 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img
                    src={getAdminValidImageUrl(formData.bowlingString?.mainImgUrl || formData.bowlingString?.imgUrl, maskGroup01Img)}
                    alt="String Bowling Graphic Preview"
                    style={{ width: '80px', height: '60px', borderRadius: '10px', border: '1.5px solid #38bdf8', objectFit: 'contain', background: '#0f172a', padding: '2px' }}
                  />
                  <label style={{ background: '#38bdf8', color: '#fff', padding: '10px 18px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Graphic Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading String Bowling graphic image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.bowlingString || {}), mainImgUrl: res.url, imgUrl: res.url };
                          setFormData(prev => ({ ...prev, bowlingString: updated }));
                          await persistSectionToDatabase('bowlingString', updated);
                          setStatusMsg('String Bowling graphic image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {(formData.bowlingString?.mainImgUrl || formData.bowlingString?.imgUrl) && (
                    <button
                      type="button"
                      onClick={async () => {
                        const updated = { ...(formData.bowlingString || {}), mainImgUrl: '', imgUrl: '' };
                        setFormData(prev => ({ ...prev, bowlingString: updated }));
                        await persistSectionToDatabase('bowlingString', updated);
                      }}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                    🏷️ String Bowling Graphic Image Alt Text (SEO Keyword)
                  </label>
                  <input
                    type="text"
                    value={formData.bowlingString?.mainImgAlt || formData.bowlingString?.imgAlt || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      const updated = { ...(formData.bowlingString || {}), mainImgAlt: val, imgAlt: val };
                      setFormData(prev => ({ ...prev, bowlingString: updated }));
                    }}
                    placeholder="e.g. String Bowling Friends - Commercial String Bowling Machine"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Brochure Button Label</label>
                  <input
                    type="text"
                    value={formData.bowlingString?.brochureBtnText || 'Download Our Brochure'}
                    onChange={(e) => handleFieldChange('bowlingString', 'brochureBtnText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    Brochure PDF File URL / Link <span style={{ fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '6px' }}>📄 PDF Document</span>
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={formData.bowlingString?.brochureUrl || '/pdf/Bowling Catalogue.pdf'}
                      onChange={(e) => handleFieldChange('bowlingString', 'brochureUrl', e.target.value)}
                      placeholder="e.g. /pdf/Bowling Catalogue.pdf or Cloudinary URL..."
                      style={{ flex: 1, padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                    />
                    <label style={{ background: '#38bdf8', color: '#fff', padding: '12px 16px', borderRadius: '14px', fontWeight: '800', fontSize: '12.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                      <Upload style={{ width: '15px', height: '15px' }} /> Upload PDF
                      <input
                        type="file"
                        accept="application/pdf,.pdf"
                        onChange={(e) => handleBrochureUpload(e, 'bowlingString', 'brochureUrl')}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                  <div style={{ marginTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>
                      💡 Cloudinary Free plan limit: <strong>10 MB</strong> (Allows larger files automatically with a Cloudinary Pro plan). Compress via <a href="https://www.ilovepdf.com/compress_pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#0284c7', textDecoration: 'underline', fontWeight: '700' }}>iLovePDF</a> if needed.
                    </span>
                    {(() => {
                      const activePdf = formData.bowlingString?.brochureUrl || '/pdf/Bowling Catalogue.pdf';
                      return activePdf && activePdf !== '#' ? (
                        <a
                          href={activePdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: '11.5px', color: '#0284c7', fontWeight: '700', textDecoration: 'underline' }}
                        >
                          📄 Test & Preview Bowling Brochure
                        </a>
                      ) : null;
                    })()}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Pin Reset Spec</label>
                  <input
                    type="text"
                    value={formData.bowlingString?.specPinReset || 'Overhead string mechanism'}
                    onChange={(e) => handleFieldChange('bowlingString', 'specPinReset', e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Footprint Spec</label>
                  <input
                    type="text"
                    value={formData.bowlingString?.specFootprint || 'Shorter than a full 89 ft free-fall lane'}
                    onChange={(e) => handleFieldChange('bowlingString', 'specFootprint', e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Lane Width Spec</label>
                  <input
                    type="text"
                    value={formData.bowlingString?.specLaneWidth || '6 feet per lane'}
                    onChange={(e) => handleFieldChange('bowlingString', 'specLaneWidth', e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Maintenance Spec</label>
                  <input
                    type="text"
                    value={formData.bowlingString?.specMaintenance || 'Low — fewer parts, easy servicing'}
                    onChange={(e) => handleFieldChange('bowlingString', 'specMaintenance', e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Best For Spec</label>
                  <input
                    type="text"
                    value={formData.bowlingString?.specBestFor || 'FECs, malls, resorts, cafés, gaming zones'}
                    onChange={(e) => handleFieldChange('bowlingString', 'specBestFor', e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('bowlingString', formData.bowlingString || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save String Bowling Section
                </button>
              </div>
            </div>
          )}

          {/* INVESTMENT & ROI FORM */}
          {activeSection === 'bowlingRoi' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Investment & ROI Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Heading Title (Use *word* for Cyan Accent)
                </label>
                <input
                  type="text"
                  value={formData.bowlingRoi?.title || '*Investment* & ROI'}
                  onChange={(e) => handleFieldChange('bowlingRoi', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Paragraph 1 Description"
                  rows={4}
                  value={formData.bowlingRoi?.p1 !== undefined && formData.bowlingRoi.p1 !== '' ? formData.bowlingRoi.p1 : "Setting up a bowling center is a significant investment which is why we don't just sell you equipment and walk away. We're India's ROI-First Game Zone Developer. Before you commit to a project, every client receives a complete report covering product costing, maintenance costs, and projected revenue timeline, so your investment decision is based on real numbers, not estimates."}
                  onChange={(val) => handleFieldChange('bowlingRoi', 'p1', val)}
                  placeholder="Enter Paragraph 1 description..."
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Paragraph 2 Description"
                  rows={4}
                  value={formData.bowlingRoi?.p2 !== undefined && formData.bowlingRoi.p2 !== '' ? formData.bowlingRoi.p2 : "By choosing our refurbished bowling systems, you can create a high-end bowling center at a cost-effective budget. With reliable machinery that's been expertly restored, you'll enjoy top-tier performance, low maintenance, and durability without the cost of brand-new equipment."}
                  onChange={(val) => handleFieldChange('bowlingRoi', 'p2', val)}
                  placeholder="Enter Paragraph 2 description..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Action Button Label</label>
                  <input
                    type="text"
                    value={formData.bowlingRoi?.btnText || 'Talk to an ROI Expert'}
                    onChange={(e) => handleFieldChange('bowlingRoi', 'btnText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Action Button Target Link URL</label>
                  <input
                    type="text"
                    value={(formData.bowlingRoi?.videoUrl && formData.bowlingRoi.videoUrl.split('?')[0]) || 'https://wa.me/919157873576'}
                    onChange={(e) => {
                      const baseLink = e.target.value;
                      const msg = formData.bowlingRoi?.waMessage || "Hello Winera International! I want to get custom Bowling ROI calculation & setup guidance. Please share details. [Ref: Bowling Alley Page]";
                      const updatedLink = msg ? `${baseLink.split('?')[0]}?text=${encodeURIComponent(msg)}` : baseLink;
                      handleFieldChange('bowlingRoi', 'videoUrl', updatedLink);
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
                    if (formData.bowlingRoi?.waMessage !== undefined && formData.bowlingRoi?.waMessage !== '') return formData.bowlingRoi.waMessage;
                    if (formData.bowlingRoi?.videoUrl && formData.bowlingRoi.videoUrl.includes('text=')) {
                      try {
                        const match = formData.bowlingRoi.videoUrl.match(/text=([^&]+)/);
                        if (match && match[1]) return decodeURIComponent(match[1]);
                      } catch (err) { }
                    }
                    return "Hello Winera International! I want to get custom Bowling ROI calculation & setup guidance. Please share details. [Ref: Bowling Alley Page]";
                  })()}
                  onChange={(e) => {
                    const newMsg = e.target.value;
                    const baseLink = (formData.bowlingRoi?.videoUrl && formData.bowlingRoi.videoUrl.split('?')[0]) || 'https://wa.me/919157873576';
                    const updatedLink = newMsg ? `${baseLink}?text=${encodeURIComponent(newMsg)}` : baseLink;
                    const updated = {
                      ...(formData.bowlingRoi || {}),
                      waMessage: newMsg,
                      videoUrl: updatedLink
                    };
                    setFormData(prev => ({ ...prev, bowlingRoi: updated }));
                  }}
                  placeholder="e.g. Hello Winera International! I want to get custom Bowling ROI..."
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontWeight: '500', lineHeight: 1.5 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                  Right Column Image (High-Tech Bowling Alley Graphic) <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 400 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img
                    src={getAdminValidImageUrl(formData.bowlingRoi?.mainImgUrl || formData.bowlingRoi?.imgUrl, bowlingImage)}
                    alt="ROI Graphic Preview"
                    style={{ width: '90px', height: '60px', borderRadius: '10px', border: '1.5px solid #38bdf8', objectFit: 'cover' }}
                  />
                  <label style={{ background: '#38bdf8', color: '#fff', padding: '10px 18px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload ROI Section Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading ROI section image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.bowlingRoi || {}), mainImgUrl: res.url, imgUrl: res.url };
                          setFormData(prev => ({ ...prev, bowlingRoi: updated }));
                          await persistSectionToDatabase('bowlingRoi', updated);
                          setStatusMsg('ROI section image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {(formData.bowlingRoi?.mainImgUrl || formData.bowlingRoi?.imgUrl) && (
                    <button
                      type="button"
                      onClick={async () => {
                        const updated = { ...(formData.bowlingRoi || {}), mainImgUrl: '', imgUrl: '' };
                        setFormData(prev => ({ ...prev, bowlingRoi: updated }));
                        await persistSectionToDatabase('bowlingRoi', updated);
                      }}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                    🏷️ Investment & ROI Image Alt Text (SEO Keyword)
                  </label>
                  <input
                    type="text"
                    value={formData.bowlingRoi?.mainImgAlt || formData.bowlingRoi?.imgAlt || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      const updated = { ...(formData.bowlingRoi || {}), mainImgAlt: val, imgAlt: val };
                      setFormData(prev => ({ ...prev, bowlingRoi: updated }));
                    }}
                    placeholder="e.g. Bowling Alley Lanes ROI - High Profit Game Zone Equipment"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('bowlingRoi', formData.bowlingRoi || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Investment & ROI Section
                </button>
              </div>
            </div>
          )}

          {/* BOWLING WHY CHOOSE WINERA FORM */}
          {activeSection === 'bowlingWhyUs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Why Choose Winera Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Heading Title (Use *word* for Cyan Accent)
                </label>
                <input
                  type="text"
                  value={formData.bowlingWhyUs?.title || 'Why Choose *Winera International*'}
                  onChange={(e) => handleFieldChange('bowlingWhyUs', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Paragraph 1 Description"
                  rows={4}
                  value={formData.bowlingWhyUs?.p1 !== undefined && formData.bowlingWhyUs.p1 !== '' ? formData.bowlingWhyUs.p1 : "At Winera International, we bring over 15 years of industry experience as a trusted bowling alley manufacturer in India. We are the largest bowling alley supplier in the country, with more than 30 complete setups delivered successfully."}
                  onChange={(val) => handleFieldChange('bowlingWhyUs', 'p1', val)}
                  placeholder="Enter Paragraph 1 description..."
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Paragraph 2 Description"
                  rows={4}
                  value={formData.bowlingWhyUs?.p2 !== undefined && formData.bowlingWhyUs.p2 !== '' ? formData.bowlingWhyUs.p2 : "Our equipment is sourced from the USA/China, ensuring proven quality. We provide affordable refurbished options along with installation, maintenance, and support across India with low failure rates and easy servicing, tailored to your budget and space."}
                  onChange={(val) => handleFieldChange('bowlingWhyUs', 'p2', val)}
                  placeholder="Enter Paragraph 2 description..."
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                  Left Side Graphic Image (Blue Ball & Pins Graphic) <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 500 × 500 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img
                    src={getAdminValidImageUrl(formData.bowlingWhyUs?.mainImgUrl || formData.bowlingWhyUs?.graphicUrl || formData.bowlingWhyUs?.imgUrl, bowlingBallPinsBlue)}
                    alt="Why Choose Us Graphic Preview"
                    style={{ width: '80px', height: '60px', borderRadius: '10px', border: '1.5px solid #38bdf8', objectFit: 'contain', background: '#ffffff', padding: '2px' }}
                  />
                  <label style={{ background: '#38bdf8', color: '#fff', padding: '10px 18px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Blue Ball & Pins Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading graphic image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.bowlingWhyUs || {}), mainImgUrl: res.url, graphicUrl: res.url, imgUrl: res.url };
                          setFormData(prev => ({ ...prev, bowlingWhyUs: updated }));
                          await persistSectionToDatabase('bowlingWhyUs', updated);
                          setStatusMsg('Graphic image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {(formData.bowlingWhyUs?.mainImgUrl || formData.bowlingWhyUs?.graphicUrl || formData.bowlingWhyUs?.imgUrl) && (
                    <button
                      type="button"
                      onClick={async () => {
                        const updated = { ...(formData.bowlingWhyUs || {}), mainImgUrl: '', graphicUrl: '', imgUrl: '' };
                        setFormData(prev => ({ ...prev, bowlingWhyUs: updated }));
                        await persistSectionToDatabase('bowlingWhyUs', updated);
                      }}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                    🏷️ Why Choose Winera Image Alt Text (SEO Keyword)
                  </label>
                  <input
                    type="text"
                    value={formData.bowlingWhyUs?.mainImgAlt || formData.bowlingWhyUs?.imgAlt || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      const updated = { ...(formData.bowlingWhyUs || {}), mainImgAlt: val, imgAlt: val };
                      setFormData(prev => ({ ...prev, bowlingWhyUs: updated }));
                    }}
                    placeholder="e.g. Blue Bowling Ball and Pins - Winera Game Zone Manufacturer"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('bowlingWhyUs', formData.bowlingWhyUs || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Why Choose Section
                </button>
              </div>
            </div>
          )}


          {/* BOWLING CTA BANNER FORM */}
          {activeSection === 'bowlingCta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Bowling CTA Banner Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>
                  Main Title Heading
                </label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Use <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> for Yellow, <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>&lt;cyan&gt;word&lt;/cyan&gt;</code> for Cyan.</p>
                <input
                  type="text"
                  value={formData.bowlingCta?.title !== undefined ? formData.bowlingCta.title : "Need Any Consultations?"}
                  onChange={(e) => handleFieldChange('bowlingCta', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '700' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Description Paragraph"
                  rows={2}
                  value={formData.bowlingCta?.description !== undefined ? formData.bowlingCta.description : "Invest in our quality bowling equipment and elevate your venue with long-lasting, world-class bowling gear without overspending."}
                  onChange={(val) => handleFieldChange('bowlingCta', 'description', val)}
                  placeholder="Enter CTA description paragraph..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>CTA Button Label</label>
                  <input
                    type="text"
                    value={formData.bowlingCta?.buttonText !== undefined ? formData.bowlingCta.buttonText : "Request a Quote"}
                    onChange={(e) => handleFieldChange('bowlingCta', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>CTA Button Link</label>
                  <input
                    type="text"
                    value={formData.bowlingCta?.buttonLink !== undefined ? formData.bowlingCta.buttonLink : "https://wa.me/919157873576"}
                    onChange={(e) => handleFieldChange('bowlingCta', 'buttonLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Background Banner Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <img
                    src={getAdminValidImageUrl(formData.bowlingCta?.bgUrl, trampolineParkCtaBg)}
                    alt="CTA Banner Preview"
                    style={{ width: '120px', height: '55px', borderRadius: '10px', border: '1.5px solid #38bdf8', objectFit: 'cover' }}
                  />
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
                        setStatusMsg('Uploading CTA banner image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.bowlingCta || {}), bgUrl: res.url };
                          setFormData(prev => ({ ...prev, bowlingCta: updated }));
                          await persistSectionToDatabase('bowlingCta', updated);
                          setStatusMsg('CTA banner image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                    />
                  </label>
                  {formData.bowlingCta?.bgUrl && (
                    <button
                      type="button"
                      onClick={async () => {
                        const updated = { ...(formData.bowlingCta || {}), bgUrl: '' };
                        setFormData(prev => ({ ...prev, bowlingCta: updated }));
                        await persistSectionToDatabase('bowlingCta', updated);
                      }}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
              </div>

              {/* Bowling CTA Banner Image Alt Tag */}
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  🏷️ Background Banner Image Alt Text (SEO Keyword)
                </label>
                <input
                  type="text"
                  value={formData.bowlingCta?.bgAlt || ''}
                  onChange={(e) => handleFieldChange('bowlingCta', 'bgAlt', e.target.value)}
                  placeholder="e.g. Bowling Alley Setup Consultation & Equipment - Winera International"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('bowlingCta', formData.bowlingCta || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Bowling CTA Banner
                </button>
              </div>
            </div>
          )}

          {/* BOWLING PAGE FAQS FORM */}
          {activeSection === 'bowlingFaqs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Bowling Page FAQs</h3>
                  <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0' }}>Manage custom FAQs specific to Bowling Alley page.</p>
                </div>
                <button
                  onClick={() => openModal('add', null, null, 'bowlingFaqs')}
                  style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)' }}
                >
                  <Plus style={{ width: '16px', height: '16px' }} /> Add Bowling FAQ
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
                    {(formData.bowlingFaqs && formData.bowlingFaqs.length >= 8 ? formData.bowlingFaqs : defaultBowlingFaqs).map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                        <td style={{ padding: '14px 18px', fontWeight: '700', color: '#64748b' }}>{idx + 1}</td>
                        <td style={{ padding: '14px 18px', fontWeight: '800', color: '#0f172a' }}>{item.q || item.question}</td>
                        <td style={{ padding: '14px 18px', color: '#475569', fontSize: '12.5px', lineHeight: '1.4' }}>{item.a || item.answer}</td>
                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                          <button
                            onClick={() => openModal('edit', idx, item, 'bowlingFaqs')}
                            style={{ background: '#e0f2fe', color: '#0284c7', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', marginRight: '8px', fontWeight: '700', fontSize: '12px' }}
                          >
                            <Edit2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Edit
                          </button>
                          <button
                            onClick={async () => {
                              const list = formData.bowlingFaqs && formData.bowlingFaqs.length >= 8 ? formData.bowlingFaqs : defaultBowlingFaqs;
                              const updated = list.filter((_, i) => i !== idx);
                              setFormData(prev => ({ ...prev, bowlingFaqs: updated }));
                              await persistSectionToDatabase('bowlingFaqs', updated);
                            }}
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

    </>
  );
}
