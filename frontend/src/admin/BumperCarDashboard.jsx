import React from 'react';
import { Upload } from 'lucide-react';
import RichTextareaWithEditor from '../components/RichTextareaWithEditor';
import { uploadImageFile } from '../services/api';

const bumpercarHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345643/winera_uploads/d0pjhjvz9xnbyggqy1lh.png";
const bumpercarMobileHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345487/winera_uploads/euuvj5czlmbwfxazwcy8.png";
const bumpercarOptionsCollage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345640/winera_uploads/pg9vfwcztmuh1loeexhl.png";
const bumpercarInvestmentCollage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345640/winera_uploads/q6jdfhs7ac4pxs7rk75n.png";
const bumpercar3dNeon = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345643/winera_uploads/zilfiijzb4arwuspyfwa.png";
const bumpercarCollageFrame = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345643/winera_uploads/bcia8d2o3cekiuknvaqv.png";
const bumpercarSpecsBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345643/winera_uploads/ytjiaogminatt3ggybat.jpg";
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

const defaultBumperCarThrillCards = [
  {
    title: "The Perfect Blend of Thrill and Safety:",
    desc: "When it comes to bumper cars, safety is paramount. At Winera International, we’ve made it our unwavering commitment to ensure the safety of every rider. Our bumper cars are equipped with state-of-the-art safety features and technology, making the bumper car experience a thrilling yet secure adventure. Visitors can enjoy the excitement of collisions without compromising their well-being."
  },
  {
    title: "A Long-Term, Low-Maintenance Investment:",
    desc: "Choosing Winera International’s bumper cars means investing in a long-term, low-maintenance attraction that guarantees maximum fun for your visitors. Our bumper cars are built to withstand the rigors of continuous use, which means less downtime for maintenance and more ride time for your guests. The reliability and durability of our bumper cars ensure that your investment pays off year after year."
  },
  {
    title: "Customization Options from India’s Trusted Bumper Car Manufacturer:",
    desc: "We recognize that every amusement park has its own unique theme and ambiance. That’s why we offer a wide array of designs and features for you to choose from. Our customization options allow you to tailor your bumper car attraction to seamlessly align with the overall look and feel of your park. Whether you’re aiming for a classic, nostalgic atmosphere or a modern, futuristic vibe, our range of choices ensures you can create the perfect fit."
  },
  {
    title: "Elevating Entertainment and Safety Standards:",
    desc: "At Winera International, we’re dedicated to supplying amusement park products that not only enhance the entertainment factor but also raise the bar for safety standards. Our bumper cars exemplify this commitment, where the pursuit of fun is always in harmony with ensuring the safety and well-being of your guests. By investing in our high-quality bumper cars, you’re not just providing memorable experiences; you’re also guaranteeing a secure environment for all riders."
  },
  {
    title: "Contact India’s Leading Bumper Car Manufacturer:",
    desc: "If you’re looking to elevate your amusement park to new heights, Winera International is your partner in making it happen. Our comprehensive range of offerings includes bumper cars designed to capture the hearts of visitors. As a reputed Bumper Car manufacturer in India, we’re ready to assist you in creating an attraction that draws families, friends, and thrill-seekers alike to your park. Contact us today to explore our extensive catalog and discover how our bumper cars can be the highlight of your amusement park."
  }
];

export default function BumperCarDashboard({
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
          {activeSection === 'bumpercarHero' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Bumper Car Hero Banner</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Main Title Heading Text</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Yellow accent.</p>
                <input
                  type="text"
                  value={formData.bumpercarHero?.title || '*Bumper* Car'}
                  onChange={(e) => handleFieldChange('bumpercarHero', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Breadcrumb Text</label>
                <input
                  type="text"
                  value={formData.bumpercarHero?.breadcrumbText || 'Bumper Car'}
                  onChange={(e) => handleFieldChange('bumpercarHero', 'breadcrumbText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Hero Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img
                    src={getAdminValidImageUrl(formData.bumpercarHero?.bgUrl, bumpercarHeroBg)}
                    alt="Hero Background Preview"
                    style={{ width: '120px', height: '60px', borderRadius: '10px', border: '1.5px solid #38bdf8', objectFit: 'cover' }}
                  />
                  <input
                    type="text"
                    value={formData.bumpercarHero?.bgUrl || ''}
                    onChange={(e) => handleFieldChange('bumpercarHero', 'bgUrl', e.target.value)}
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
                        setStatusMsg('Uploading hero background image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.bumpercarHero || {}), bgUrl: res.url };
                          setFormData(prev => ({ ...prev, bumpercarHero: updated }));
                          await persistSectionToDatabase('bumpercarHero', updated);
                          setStatusMsg('Image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {formData.bumpercarHero?.bgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('bumpercarHero', 'bgUrl', '')}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Reset Image
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  🏷️ Background Image Alt Text (SEO Keyword)
                </label>
                <input
                  type="text"
                  value={formData.bumpercarHero?.bgAlt || ''}
                  onChange={(e) => handleFieldChange('bumpercarHero', 'bgAlt', e.target.value)}
                  placeholder="e.g. Commercial Bumper Cars Arena Setup - Winera"
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
                    src={getAdminValidImageUrl(formData.bumpercarHero?.mobileBgUrl, bumpercarMobileHeroBg)}
                    alt="Mobile Hero Bg Preview"
                    style={{ width: '120px', height: '65px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                  />
                  <input
                    type="text"
                    value={formData.bumpercarHero?.mobileBgUrl || ''}
                    onChange={(e) => handleFieldChange('bumpercarHero', 'mobileBgUrl', e.target.value)}
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
                            const updated = { ...(formData.bumpercarHero || {}), mobileBgUrl: res.url };
                            setFormData(prev => ({ ...prev, bumpercarHero: updated }));
                            await persistSectionToDatabase('bumpercarHero', updated);
                            setStatusMsg('Mobile banner uploaded successfully!');
                          } catch (err) {
                            setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                          }
                        }
                      }}
                    />
                  </label>
                  {formData.bumpercarHero?.mobileBgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('bumpercarHero', 'mobileBgUrl', '')}
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
                    value={formData.bumpercarHero?.mobileBgAlt || ''}
                    onChange={(e) => handleFieldChange('bumpercarHero', 'mobileBgAlt', e.target.value)}
                    placeholder="e.g. Commercial Bumper Cars Arena Setup Mobile Banner - Winera"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('bumpercarHero', formData.bumpercarHero || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Bumper Car Hero Banner
                </button>
              </div>
            </div>
          )}

          {/* BUMPER CAR MANUFACTURER IN INDIA SECTION FORM */}
          {activeSection === 'bumpercarIntro' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Bumper Car Manufacturer in India Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue, and use <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>&lt;br/&gt;</code> for line breaks.</p>
                <input
                  type="text"
                  value={formData.bumpercarIntro?.title || '*Bumper Car* Manufacturer<br/>in India'}
                  onChange={(e) => handleFieldChange('bumpercarIntro', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Subtitle Description Paragraph"
                  rows={3}
                  value={formData.bumpercarIntro?.desc !== undefined ? formData.bumpercarIntro.desc : "India's ROI-first bumper car manufacturer — electric floor and battery-operated cars, installed by our own team across 50+ cities, with a free ROI report before you invest."}
                  onChange={(val) => handleFieldChange('bumpercarIntro', 'desc', val)}
                  placeholder="Enter subtitle description..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.bumpercarIntro?.buttonText || 'Get Quote From Expert'}
                    onChange={(e) => handleFieldChange('bumpercarIntro', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                  <input
                    type="text"
                    value={(formData.bumpercarIntro?.buttonLink && formData.bumpercarIntro.buttonLink.split('?')[0]) || 'https://wa.me/919157873576'}
                    onChange={(e) => {
                      const baseLink = e.target.value;
                      const msg = formData.bumpercarIntro?.waMessage || "Hello Winera International! I want to get a quote and details for Bumper Car setup. Please share details. [Ref: Bumper Car Page]";
                      const updatedLink = msg ? `${baseLink.split('?')[0]}?text=${encodeURIComponent(msg)}` : baseLink;
                      setFormData(prev => ({ ...prev, bumpercarIntro: { ...(prev.bumpercarIntro || {}), buttonLink: updatedLink } }));
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
                    if (formData.bumpercarIntro?.waMessage !== undefined && formData.bumpercarIntro.waMessage !== '') return formData.bumpercarIntro.waMessage;
                    if (formData.bumpercarIntro?.buttonLink && formData.bumpercarIntro.buttonLink.includes('text=')) {
                      try {
                        const match = formData.bumpercarIntro.buttonLink.match(/text=([^&]+)/);
                        if (match && match[1]) return decodeURIComponent(match[1]);
                      } catch (err) { }
                    }
                    return "Hello Winera International! I want to get a quote and details for Bumper Car setup. Please share details. [Ref: Bumper Car Page]";
                  })()}
                  onChange={(e) => {
                    const newMsg = e.target.value;
                    const baseLink = (formData.bumpercarIntro?.buttonLink && formData.bumpercarIntro.buttonLink.split('?')[0]) || 'https://wa.me/919157873576';
                    const updatedLink = newMsg ? `${baseLink}?text=${encodeURIComponent(newMsg)}` : baseLink;
                    setFormData(prev => ({
                      ...prev,
                      bumpercarIntro: {
                        ...(prev.bumpercarIntro || {}),
                        waMessage: newMsg,
                        buttonLink: updatedLink
                      }
                    }));
                  }}
                  placeholder="e.g. Hello Winera International! I want to get a quote..."
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', lineHeight: 1.5, color: '#0f172a', fontWeight: '500' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Right Collage Graphic Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                </label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <label style={{ background: '#38bdf8', color: '#fff', padding: '10px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '12.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Collage Graphic
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading collage image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          handleFieldChange('bumpercarIntro', 'mainImgUrl', res.url);
                          setStatusMsg('Collage graphic uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <img src={getAdminValidImageUrl(formData.bumpercarIntro?.mainImgUrl, bumpercarCollageFrame)} alt="Intro Preview" style={{ height: '45px', width: '75px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                    🏷️ Section Right Collage Graphic Image Alt Text (SEO Keyword)
                  </label>
                  <input
                    type="text"
                    value={formData.bumpercarIntro?.mainImgAlt || formData.bumpercarIntro?.imgAlt || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleFieldChange('bumpercarIntro', 'mainImgAlt', val);
                      handleFieldChange('bumpercarIntro', 'imgAlt', val);
                    }}
                    placeholder="e.g. Bumper Car Manufacturer in India - Winera Commercial Turnkey Setup"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('bumpercarIntro', formData.bumpercarIntro || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Bumper Car Manufacturer Section
                </button>
              </div>
            </div>
          )}

          {/* BUMPER CAR DESCRIPTION & 3D NEON CAR SECTION FORM */}
          {activeSection === 'bumpercarBanner' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Bumper Car Description & 3D Neon Car Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue, and use <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>&lt;br/&gt;</code> for line breaks.</p>
                <input
                  type="text"
                  value={formData.bumpercarBanner?.title || '*Bumper Car* Manufacturer in India'}
                  onChange={(e) => handleFieldChange('bumpercarBanner', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Description Paragraph"
                  rows={4}
                  value={formData.bumpercarBanner?.desc !== undefined ? formData.bumpercarBanner.desc : "Bumper cars have long held a special place in the hearts of amusement park enthusiasts, and at Winera International, we take immense pride in delivering high-quality options that enhance the overall park experience. As a leading Bumper Car manufacturer in India and trusted Bumper Car manufacturer, our creations are not just rides; they're an exhilarating blend of thrilling collisions and smooth handling, designed with a laser focus on safety and durability."}
                  onChange={(val) => handleFieldChange('bumpercarBanner', 'desc', val)}
                  placeholder="Enter description..."
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Right 3D Neon Bumper Car Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                </label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <label style={{ background: '#38bdf8', color: '#fff', padding: '10px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '12.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload 3D Neon Bumper Car Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading 3D Neon Bumper Car image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          handleFieldChange('bumpercarBanner', 'imgUrl', res.url);
                          setStatusMsg('3D Bumper Car image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <img src={getAdminValidImageUrl(formData.bumpercarBanner?.imgUrl, bumpercar3dNeon)} alt="3D Neon Preview" style={{ height: '45px', width: '75px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                    🏷️ Right 3D Neon Bumper Car Image Alt Text (SEO Keyword)
                  </label>
                  <input
                    type="text"
                    value={formData.bumpercarBanner?.imgAlt || ''}
                    onChange={(e) => handleFieldChange('bumpercarBanner', 'imgAlt', e.target.value)}
                    placeholder="e.g. 3D Neon Bumper Car Commercial Ride - Winera"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('bumpercarBanner', formData.bumpercarBanner || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Bumper Car Description Section
                </button>
              </div>
            </div>
          )}

          {/* BUMPER CAR THRILL & SAFETY CAROUSEL CARDS FORM */}
          {activeSection === 'bumpercarThrill' && (() => {
            const currentSec = formData.bumpercarThrill || {};
            const currentCards = Array.isArray(currentSec.cards) ? currentSec.cards : defaultBumperCarThrillCards;
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>The Perfect Blend Of Thrill And Safety Carousel Cards</h3>

                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <label style={{ fontWeight: '800', fontSize: '14px', color: '#0369a1' }}>Carousel Cards List ({currentCards.length})</label>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...currentCards, { title: 'New Thrill & Safety Card', desc: 'Description of the card here...' }];
                        const updatedSec = { ...currentSec, cards: updated };
                        setFormData(prev => ({ ...prev, bumpercarThrill: updatedSec }));
                      }}
                      style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}
                    >
                      + Add New Card
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {currentCards.map((card, idx) => (
                      <div key={idx} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: '800', fontSize: '12.5px', color: '#0f172a' }}>Card #{idx + 1}: {card.title}</span>
                          <button
                            type="button"
                            onClick={async () => {
                              const updated = currentCards.filter((_, i) => i !== idx);
                              const updatedSec = { ...currentSec, cards: updated };
                              setFormData(prev => ({ ...prev, bumpercarThrill: updatedSec }));
                              await persistSectionToDatabase('bumpercarThrill', updatedSec);
                            }}
                            style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '800', fontSize: '12px' }}
                          >
                            Delete Card
                          </button>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#475569', marginBottom: '4px' }}>Card Title</label>
                          <input
                            type="text"
                            value={card.title || ''}
                            onChange={(e) => {
                              const updated = [...currentCards];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              const updatedSec = { ...currentSec, cards: updated };
                              setFormData(prev => ({ ...prev, bumpercarThrill: updatedSec }));
                            }}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                          />
                        </div>
                        <div>
                          <RichTextareaWithEditor
                            label="Card Description"
                            rows={3}
                            value={card.desc || ''}
                            onChange={(val) => {
                              const updated = [...currentCards];
                              updated[idx] = { ...updated[idx], desc: val };
                              const updatedSec = { ...currentSec, cards: updated };
                              setFormData(prev => ({ ...prev, bumpercarThrill: updatedSec }));
                            }}
                            placeholder="Card Description"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                  <button
                    onClick={() => persistSectionToDatabase('bumpercarThrill', { ...(formData.bumpercarThrill || {}), cards: currentCards })}
                    style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                  >
                    Save Thrill & Safety Carousel Cards
                  </button>
                </div>
              </div>
            );
          })()}

          {/* BUMPER CAR TECHNICAL SPECIFICATIONS CARD FORM */}
          {activeSection === 'bumpercarSpecs' && (() => {
            const defaultBumpercarSpecs = [
              { spec: "Drive Type", details: "Electric floor type or battery-powered" },
              { spec: "Body Material", details: "High-density polyethylene (HDPE) — impact resistant" },
              { spec: "Power Source", details: "Conductive floor grid (electric) or rechargeable battery" },
              { spec: "Weight Capacity", details: "Up to 150 kg per car — commercial grade" },
              { spec: "Minimum Area Required", details: "400 sq ft" },
              { spec: "Expected Lifespan", details: "8–12 years with proper maintenance" }
            ];
            const currentSec = formData.bumpercarSpecs || {};
            const specsList = Array.isArray(currentSec.specsList) ? currentSec.specsList : defaultBumpercarSpecs;

            const handleAddRow = () => {
              const updated = [...specsList, { spec: '', details: '' }];
              const updatedSec = { ...currentSec, specsList: updated };
              setFormData(prev => ({ ...prev, bumpercarSpecs: updatedSec }));
            };

            const handleRowChange = (index, field, value) => {
              const updated = specsList.map((row, i) => i === index ? { ...row, [field]: value } : row);
              const updatedSec = { ...currentSec, specsList: updated };
              setFormData(prev => ({ ...prev, bumpercarSpecs: updatedSec }));
            };

            const handleDeleteRow = async (index) => {
              const updated = specsList.filter((_, i) => i !== index);
              const updatedSec = { ...currentSec, specsList: updated };
              setFormData(prev => ({ ...prev, bumpercarSpecs: updatedSec }));
              await persistSectionToDatabase('bumpercarSpecs', updatedSec);
            };

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Technical Specifications Card</h3>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Yellow accent.</p>
                  <input
                    type="text"
                    value={currentSec.title !== undefined ? currentSec.title : '*Technical* Specifications'}
                    onChange={(e) => handleFieldChange('bumpercarSpecs', 'title', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1200 × 600 px (2:1)</span>
                  </label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <label style={{ background: '#38bdf8', color: '#fff', padding: '10px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '12.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Upload style={{ width: '16px', height: '16px' }} /> Upload Background Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          setStatusMsg('Uploading specs background image...');
                          try {
                            const res = await uploadImageFile(file, admin.token);
                            handleFieldChange('bumpercarSpecs', 'bgUrl', res.url);
                            setStatusMsg('Specs background image uploaded successfully!');
                          } catch (err) {
                            setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <img src={getAdminValidImageUrl(currentSec.bgUrl, bumpercarSpecsBg)} alt="Specs Preview" style={{ height: '45px', width: '75px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                      🏷️ Background Image Alt Text (SEO Keyword)
                    </label>
                    <input
                      type="text"
                      value={currentSec.bgAlt || ''}
                      onChange={(e) => handleFieldChange('bumpercarSpecs', 'bgAlt', e.target.value)}
                      placeholder="e.g. Technical Specifications - Commercial Bumper Car System Winera"
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Brochure Button Label</label>
                    <input
                      type="text"
                      value={currentSec.btnText || currentSec.buttonText || 'Download Our Brochure'}
                      onChange={(e) => {
                        handleFieldChange('bumpercarSpecs', 'btnText', e.target.value);
                        handleFieldChange('bumpercarSpecs', 'buttonText', e.target.value);
                      }}
                      placeholder="Download Our Brochure"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                      Brochure PDF Document / Link URL <span style={{ fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '6px' }}>📄 PDF Document</span>
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        value={(currentSec.brochureUrl && currentSec.brochureUrl !== '#') ? currentSec.brochureUrl : ''}
                        onChange={(e) => handleFieldChange('bumpercarSpecs', 'brochureUrl', e.target.value)}
                        placeholder="e.g. /uploads/bumpercar_brochure.pdf or Cloudinary URL"
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                      />
                      <label style={{ background: '#38bdf8', color: '#fff', padding: '12px 16px', borderRadius: '14px', fontWeight: '800', fontSize: '12.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                        <Upload style={{ width: '15px', height: '15px' }} /> Upload PDF
                        <input
                          type="file"
                          accept="application/pdf,.pdf"
                          onChange={(e) => handleBrochureUpload(e, 'bumpercarSpecs', 'brochureUrl', { specsList })}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                    <div style={{ marginTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>
                        💡 Cloudinary Free plan limit: <strong>10 MB</strong> (Allows larger files automatically with a Cloudinary Pro plan). Compress via <a href="https://www.ilovepdf.com/compress_pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#0284c7', textDecoration: 'underline', fontWeight: '700' }}>iLovePDF</a> if needed.
                      </span>
                      {(() => {
                        const activePdf = (currentSec.brochureUrl && currentSec.brochureUrl !== '#') ? currentSec.brochureUrl : '';
                        return activePdf ? (
                          <a
                            href={activePdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: '11.5px', color: '#0284c7', fontWeight: '700', textDecoration: 'underline' }}
                          >
                            📄 Test & Preview Bumper Car Brochure
                          </a>
                        ) : null;
                      })()}
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <label style={{ fontWeight: '800', fontSize: '13px', color: '#0f172a' }}>Specifications Table Rows</label>
                    <button
                      type="button"
                      onClick={handleAddRow}
                      style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      + Add Row
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {specsList.map((item, idx) => (
                      <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', alignItems: 'center', background: '#F5F5F9', padding: '10px', borderRadius: '10px' }}>
                        <input
                          type="text"
                          placeholder="Specification"
                          value={item.spec}
                          onChange={(e) => handleRowChange(idx, 'spec', e.target.value)}
                          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                        />
                        <input
                          type="text"
                          placeholder="Details"
                          value={item.details}
                          onChange={(e) => handleRowChange(idx, 'details', e.target.value)}
                          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteRow(idx)}
                          style={{ background: '#ef4444', color: '#fff', border: 'none', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer' }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                  <button
                    onClick={() => persistSectionToDatabase('bumpercarSpecs', { ...currentSec, specsList })}
                    style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                  >
                    Save Technical Specifications Card
                  </button>
                </div>
              </div>
            );
          })()}

          {/* INDOOR BUMPER CAR OPTIONS FOR YOUR VENUE FORM */}
          {activeSection === 'bumpercarOptions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Indoor Bumper Car Options for Your Venue</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue.</p>
                <input
                  type="text"
                  value={formData.bumpercarOptions?.title || 'Indoor Bumper Car Options *for Your Venue*'}
                  onChange={(e) => handleFieldChange('bumpercarOptions', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Intro Description"
                  rows={2}
                  value={formData.bumpercarOptions?.desc !== undefined ? formData.bumpercarOptions.desc : "We supply two drive types for indoor bumper car attractions. The right choice depends on your floor infrastructure, venue flexibility, and operational model."}
                  onChange={(val) => handleFieldChange('bumpercarOptions', 'desc', val)}
                  placeholder="Intro Description"
                />
              </div>

              {/* Option 1 Controls */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '800', color: '#0369a1' }}>Option 1: Electric Floor Bumper Cars</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Option 1 Title"
                    value={formData.bumpercarOptions?.option1Title || 'Electric Floor Bumper Cars'}
                    onChange={(e) => handleFieldChange('bumpercarOptions', 'option1Title', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: '700' }}
                  />
                  <RichTextareaWithEditor
                    label="Option 1 Description"
                    rows={3}
                    placeholder="Option 1 Description"
                    value={formData.bumpercarOptions?.option1Desc !== undefined ? formData.bumpercarOptions.option1Desc : "Powered through a conductive floor grid and ceiling contact system. Delivers consistent, uninterrupted power throughout operating hours with zero battery management. Best suited for permanent, fixed installations in amusement parks, large FECs, and dedicated entertainment venues where the infrastructure investment is justified by high daily footfall."}
                    onChange={(val) => handleFieldChange('bumpercarOptions', 'option1Desc', val)}
                  />
                </div>
              </div>

              {/* Option 2 Controls */}
              <div style={{ background: '#FEFCE8', padding: '16px', borderRadius: '16px', border: '1px solid #fef08a' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '800', color: '#a16207' }}>Option 2: Battery-Operated Bumper Cars</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Option 2 Title"
                    value={formData.bumpercarOptions?.option2Title || 'Battery-Operated Bumper Cars'}
                    onChange={(e) => handleFieldChange('bumpercarOptions', 'option2Title', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: '700' }}
                  />
                  <RichTextareaWithEditor
                    label="Option 2 Description"
                    rows={3}
                    placeholder="Option 2 Description"
                    value={formData.bumpercarOptions?.option2Desc !== undefined ? formData.bumpercarOptions.option2Desc : "Self-contained rides running on rechargeable batteries — no floor grid or ceiling rig required. Ideal for malls, gaming zones, and temporary event setups where floor modification is not possible or where the operator wants the flexibility to relocate the attraction."}
                    onChange={(val) => handleFieldChange('bumpercarOptions', 'option2Desc', val)}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Right Collage Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                </label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <label style={{ background: '#38bdf8', color: '#fff', padding: '10px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '12.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Right Collage Graphic
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading options collage graphic...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          handleFieldChange('bumpercarOptions', 'imgUrl', res.url);
                          setStatusMsg('Options collage graphic uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <img src={getAdminValidImageUrl(formData.bumpercarOptions?.imgUrl, bumpercarOptionsCollage)} alt="Collage Preview" style={{ height: '45px', width: '75px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                    🏷️ Right Collage Image Alt Text (SEO Keyword)
                  </label>
                  <input
                    type="text"
                    value={formData.bumpercarOptions?.imgAlt || formData.bumpercarOptions?.rightImgAlt || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleFieldChange('bumpercarOptions', 'imgAlt', val);
                      handleFieldChange('bumpercarOptions', 'rightImgAlt', val);
                    }}
                    placeholder="e.g. Indoor Bumper Car Options for Your Venue - Winera"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('bumpercarOptions', formData.bumpercarOptions || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Indoor Bumper Car Options Section
                </button>
              </div>
            </div>
          )}

          {/* QUICK COMPARISON TABLE SECTION FORM */}
          {activeSection === 'bumpercarComparison' && (() => {
            const defaultFeatures = [
              "Installation",
              "Power management",
              "Best for",
              "Relocation",
              "Setup cost",
              "Operating cost"
            ];
            const defaultElectric = [
              { text: "Conductive floor + ceiling grid" },
              { text: "None — continuous supply" },
              { text: "Permanent amusement parks, FECs" },
              { text: "Fixed installation" },
              { text: "Higher (floor infrastructure)" },
              { text: "Lower per session" }
            ];
            const defaultBattery = [
              { text: "Flat surface only — no modification needed" },
              { text: "Recharge between sessions" },
              { text: "Malls, gaming zones, events" },
              { text: "Can be moved to new venues" },
              { text: "Lower initial investment" },
              { text: "Battery replacement over time" }
            ];

            const currentSec = formData.bumpercarComparison || {};
            const features = Array.isArray(currentSec.features) ? currentSec.features : defaultFeatures;
            const electricPoints = Array.isArray(currentSec.electricPoints) ? currentSec.electricPoints : defaultElectric;
            const batteryPoints = Array.isArray(currentSec.batteryPoints) ? currentSec.batteryPoints : defaultBattery;

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Quick Comparison Table Section</h3>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue.</p>
                  <input
                    type="text"
                    value={currentSec.title !== undefined ? currentSec.title : '*QUICK COMPARISON* TABLE'}
                    onChange={(e) => {
                      const updatedSec = { ...currentSec, title: e.target.value };
                      setFormData(prev => ({ ...prev, bumpercarComparison: updatedSec }));
                    }}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>

                {/* Center Comparison Labels Manager */}
                <div style={{ background: '#ECFDF5', padding: '16px', borderRadius: '16px', border: '1px solid #a7f3d0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#047857' }}>Center Comparison Labels (Middle Column)</h4>
                    <button
                      onClick={() => {
                        const updated = [...features, ''];
                        const updatedSec = { ...currentSec, features: updated };
                        setFormData(prev => ({ ...prev, bumpercarComparison: updatedSec }));
                      }}
                      style={{ background: '#10b981', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      + Add Label
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {features.map((itemText, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          value={itemText}
                          onChange={(e) => {
                            const updated = [...features];
                            updated[idx] = e.target.value;
                            const updatedSec = { ...currentSec, features: updated };
                            setFormData(prev => ({ ...prev, bumpercarComparison: updatedSec }));
                          }}
                          style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                        />
                        <button
                          onClick={async () => {
                            const updated = features.filter((_, i) => i !== idx);
                            const updatedSec = { ...currentSec, features: updated };
                            setFormData(prev => ({ ...prev, bumpercarComparison: updatedSec }));
                            await persistSectionToDatabase('bumpercarComparison', updatedSec);
                          }}
                          style={{ background: '#ef4444', color: '#fff', border: 'none', width: '32px', borderRadius: '8px', cursor: 'pointer' }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Electric Points Manager */}
                <div style={{ background: '#FEFCE8', padding: '16px', borderRadius: '16px', border: '1px solid #fef08a' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#a16207' }}>Electric Floor Points (Yellow Points)</h4>
                    <button
                      onClick={() => {
                        const updated = [...electricPoints, { text: '' }];
                        const updatedSec = { ...currentSec, electricPoints: updated };
                        setFormData(prev => ({ ...prev, bumpercarComparison: updatedSec }));
                      }}
                      style={{ background: '#ca8a04', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      + Add Electric Point
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {electricPoints.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          value={item.text || ''}
                          onChange={(e) => {
                            const updated = [...electricPoints];
                            updated[idx] = { text: e.target.value };
                            const updatedSec = { ...currentSec, electricPoints: updated };
                            setFormData(prev => ({ ...prev, bumpercarComparison: updatedSec }));
                          }}
                          style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                        />
                        <button
                          onClick={async () => {
                            const updated = electricPoints.filter((_, i) => i !== idx);
                            const updatedSec = { ...currentSec, electricPoints: updated };
                            setFormData(prev => ({ ...prev, bumpercarComparison: updatedSec }));
                            await persistSectionToDatabase('bumpercarComparison', updatedSec);
                          }}
                          style={{ background: '#ef4444', color: '#fff', border: 'none', width: '32px', borderRadius: '8px', cursor: 'pointer' }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Battery Points Manager */}
                <div style={{ background: '#F0F9FF', padding: '16px', borderRadius: '16px', border: '1px solid #bae6fd' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0369a1' }}>Battery-Operated Points (Cyan Points)</h4>
                    <button
                      onClick={() => {
                        const updated = [...batteryPoints, { text: '' }];
                        const updatedSec = { ...currentSec, batteryPoints: updated };
                        setFormData(prev => ({ ...prev, bumpercarComparison: updatedSec }));
                      }}
                      style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      + Add Battery Point
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {batteryPoints.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          value={item.text || ''}
                          onChange={(e) => {
                            const updated = [...batteryPoints];
                            updated[idx] = { text: e.target.value };
                            const updatedSec = { ...currentSec, batteryPoints: updated };
                            setFormData(prev => ({ ...prev, bumpercarComparison: updatedSec }));
                          }}
                          style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                        />
                        <button
                          onClick={async () => {
                            const updated = batteryPoints.filter((_, i) => i !== idx);
                            const updatedSec = { ...currentSec, batteryPoints: updated };
                            setFormData(prev => ({ ...prev, bumpercarComparison: updatedSec }));
                            await persistSectionToDatabase('bumpercarComparison', updatedSec);
                          }}
                          style={{ background: '#ef4444', color: '#fff', border: 'none', width: '32px', borderRadius: '8px', cursor: 'pointer' }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                  <button
                    onClick={() => {
                      const updatedSec = {
                        ...currentSec,
                        features,
                        electricPoints,
                        batteryPoints
                      };
                      persistSectionToDatabase('bumpercarComparison', updatedSec);
                    }}
                    style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                  >
                    Save Quick Comparison Table
                  </button>
                </div>
              </div>
            );
          })()}

          {/* BUMPER CAR RIDE SMART INVESTMENT FORM */}
          {activeSection === 'bumpercarInvestment' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Is a Bumper Car Ride a Smart Investment Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue.</p>
                <input
                  type="text"
                  value={formData.bumpercarInvestment?.title || 'Is a Bumper Car Ride a Smart *Investment for Your Venue?*'}
                  onChange={(e) => handleFieldChange('bumpercarInvestment', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Intro Paragraph"
                  rows={3}
                  value={formData.bumpercarInvestment?.introText !== undefined ? formData.bumpercarInvestment.introText : "Most bumper car suppliers in India provide a catalogue price and leave the financial decision to you. As India's ROI-First Game Zone Developer, Winera International works differently."}
                  onChange={(val) => handleFieldChange('bumpercarInvestment', 'introText', val)}
                  placeholder="Intro Paragraph"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Subheading Text</label>
                <input
                  type="text"
                  value={formData.bumpercarInvestment?.subtitleText || 'Before confirming any bumper car ride setup, our team prepares a complete return-on-investment report specific to your venue. It covers:'}
                  onChange={(e) => handleFieldChange('bumpercarInvestment', 'subtitleText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontWeight: '600' }}
                />
              </div>

              {/* Bullet Points Manager */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0369a1' }}>Chevron Bullet Items</h4>
                  <button
                    onClick={() => {
                      const cur = formData.bumpercarInvestment?.bullets || [
                        "Equipment and installation cost breakdown",
                        "Projected daily and monthly rider capacity based on your floor size",
                        "Estimated revenue per session at your pricing",
                        "Annual maintenance cost estimate"
                      ];
                      handleFieldChange('bumpercarInvestment', 'bullets', [...cur, '']);
                    }}
                    style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    + Add Bullet Item
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(formData.bumpercarInvestment?.bullets || [
                    "Equipment and installation cost breakdown",
                    "Projected daily and monthly rider capacity based on your floor size",
                    "Estimated revenue per session at your pricing",
                    "Annual maintenance cost estimate"
                  ]).map((bText, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        value={bText}
                        onChange={(e) => {
                          const list = [...(formData.bumpercarInvestment?.bullets || [])];
                          list[idx] = e.target.value;
                          handleFieldChange('bumpercarInvestment', 'bullets', list);
                        }}
                        style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                      />
                      <button
                        type="button"
                        onClick={async () => {
                          const list = [...(formData.bumpercarInvestment?.bullets || [
                            "Equipment and installation cost breakdown",
                            "Projected daily and monthly rider capacity based on your floor size",
                            "Estimated revenue per session at your pricing",
                            "Annual maintenance cost estimate"
                          ])];
                          const updated = list.filter((_, i) => i !== idx);
                          const updatedSec = { ...(formData.bumpercarInvestment || {}), bullets: updated };
                          setFormData(prev => ({ ...prev, bumpercarInvestment: updatedSec }));
                          await persistSectionToDatabase('bumpercarInvestment', updatedSec);
                        }}
                        style={{ background: '#ef4444', color: '#fff', border: 'none', width: '32px', borderRadius: '8px', cursor: 'pointer' }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Footnote Paragraph"
                  rows={2}
                  value={formData.bumpercarInvestment?.footerText !== undefined ? formData.bumpercarInvestment.footerText : "Every figure is calculated around your actual floor size, daily footfall, and local entry pricing — not an industry average. This report is provided free, before you commit to anything."}
                  onChange={(val) => handleFieldChange('bumpercarInvestment', 'footerText', val)}
                  placeholder="Footnote Paragraph"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>CTA Button Text</label>
                  <input
                    type="text"
                    value={formData.bumpercarInvestment?.btnText || 'Plan Your Game Zone'}
                    onChange={(e) => handleFieldChange('bumpercarInvestment', 'btnText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>CTA Button Link</label>
                  <input
                    type="text"
                    value={(formData.bumpercarInvestment?.btnLink && formData.bumpercarInvestment.btnLink.split('?')[0]) || 'https://wa.me/919157873576'}
                    onChange={(e) => {
                      const baseLink = e.target.value;
                      const msg = formData.bumpercarInvestment?.waMessage || "Hello Winera International! I want to talk to an ROI Expert for Bumper Car setup & commercial ROI calculation. Please share details. [Ref: Bumper Car Page]";
                      const updatedLink = msg ? `${baseLink.split('?')[0]}?text=${encodeURIComponent(msg)}` : baseLink;
                      setFormData(prev => ({ ...prev, bumpercarInvestment: { ...(prev.bumpercarInvestment || {}), btnLink: updatedLink } }));
                    }}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ marginTop: '4px' }}>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  WhatsApp Auto Pre-filled Message (Readable Text) <span style={{ fontSize: '11px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '6px' }}>💬 Sent when user clicks Plan Your Game Zone</span>
                </label>
                <textarea
                  rows={2}
                  value={(() => {
                    if (formData.bumpercarInvestment?.waMessage !== undefined && formData.bumpercarInvestment.waMessage !== '') return formData.bumpercarInvestment.waMessage;
                    if (formData.bumpercarInvestment?.btnLink && formData.bumpercarInvestment.btnLink.includes('text=')) {
                      try {
                        const match = formData.bumpercarInvestment.btnLink.match(/text=([^&]+)/);
                        if (match && match[1]) return decodeURIComponent(match[1]);
                      } catch (err) { }
                    }
                    return "Hello Winera International! I want to talk to an ROI Expert for Bumper Car setup & commercial ROI calculation. Please share details. [Ref: Bumper Car Page]";
                  })()}
                  onChange={(e) => {
                    const newMsg = e.target.value;
                    const baseLink = (formData.bumpercarInvestment?.btnLink && formData.bumpercarInvestment.btnLink.split('?')[0]) || 'https://wa.me/919157873576';
                    const updatedLink = newMsg ? `${baseLink}?text=${encodeURIComponent(newMsg)}` : baseLink;
                    setFormData(prev => ({
                      ...prev,
                      bumpercarInvestment: {
                        ...(prev.bumpercarInvestment || {}),
                        waMessage: newMsg,
                        btnLink: updatedLink
                      }
                    }));
                  }}
                  placeholder="e.g. Hello Winera International! I want to talk to an ROI Expert..."
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', lineHeight: 1.5, color: '#0f172a', fontWeight: '500' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Left Collage Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                </label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <label style={{ background: '#38bdf8', color: '#fff', padding: '10px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '12.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Left Collage Graphic
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading investment collage graphic...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          handleFieldChange('bumpercarInvestment', 'imgUrl', res.url);
                          setStatusMsg('Investment collage graphic uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <img src={getAdminValidImageUrl(formData.bumpercarInvestment?.imgUrl, bumpercarInvestmentCollage)} alt="Collage Preview" style={{ height: '45px', width: '75px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                    🏷️ Left Collage Image Alt Text (SEO Keyword)
                  </label>
                  <input
                    type="text"
                    value={formData.bumpercarInvestment?.imgAlt || formData.bumpercarInvestment?.leftImgAlt || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleFieldChange('bumpercarInvestment', 'imgAlt', val);
                      handleFieldChange('bumpercarInvestment', 'leftImgAlt', val);
                    }}
                    placeholder="e.g. Is a Bumper Car Ride a Smart Investment for Your Venue - Winera"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('bumpercarInvestment', formData.bumpercarInvestment || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Smart Investment Section
                </button>
              </div>
            </div>
          )}

          {/* WHY CHOOSE WINERA INTERNATIONAL FORM */}
          {activeSection === 'bumpercarWhyChoose' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Why Choose Winera International Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue.</p>
                <input
                  type="text"
                  value={formData.bumpercarWhyChoose?.title || 'Why Choose *Winera International*'}
                  onChange={(e) => handleFieldChange('bumpercarWhyChoose', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              {/* Dynamic Feature Cards Manager */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0369a1' }}>Why Choose Feature Cards</h4>
                  <button
                    onClick={() => {
                      const cur = formData.bumpercarWhyChoose?.cardsList || (
                        Array.isArray(formData.bumpercarWhyChoose?.topCards)
                          ? [...formData.bumpercarWhyChoose.topCards, ...(formData.bumpercarWhyChoose?.bottomCards || [])]
                          : [
                            { title: "Free ROI Report Before You Invest", desc: "See Your Real Costs, Revenue, And<br />Break-Even Before You Commit" },
                            { title: "Own Installation Team", desc: "Our Own Team Install And Commission<br />Every Project Across 50+ Cities" },
                            { title: "Reliable After-Sales Support", desc: "We Stay On After Handover With<br />Servicing And Maintenance So Your<br />Setup Keeps Running." },
                            { title: "Proven Track Record", desc: "Take A Look At What We've Built<br />And Hear From The Venues We've<br />Worked With." },
                            { title: "Honest, Transparent Pricing", desc: "One Clear Quote Covering Everything,<br />No Hidden Costs Added Later." }
                          ]
                      );
                      handleFieldChange('bumpercarWhyChoose', 'cardsList', [...cur, { title: '', desc: '' }]);
                    }}
                    style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    + Add Card
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {(formData.bumpercarWhyChoose?.cardsList || (
                    Array.isArray(formData.bumpercarWhyChoose?.topCards)
                      ? [...formData.bumpercarWhyChoose.topCards, ...(formData.bumpercarWhyChoose?.bottomCards || [])]
                      : [
                        { title: "Free ROI Report Before You Invest", desc: "See Your Real Costs, Revenue, And<br />Break-Even Before You Commit" },
                        { title: "Own Installation Team", desc: "Our Own Team Install And Commission<br />Every Project Across 50+ Cities" },
                        { title: "Reliable After-Sales Support", desc: "We Stay On After Handover With<br />Servicing And Maintenance So Your<br />Setup Keeps Running." },
                        { title: "Proven Track Record", desc: "Take A Look At What We've Built<br />And Hear From The Venues We've<br />Worked With." },
                        { title: "Honest, Transparent Pricing", desc: "One Clear Quote Covering Everything,<br />No Hidden Costs Added Later." }
                      ]
                  )).map((card, idx) => (
                    <div key={idx} style={{ background: '#ffffff', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <input
                          type="text"
                          placeholder="Card Title"
                          value={card.title}
                          onChange={(e) => {
                            const list = [...(formData.bumpercarWhyChoose?.cardsList || [])];
                            list[idx] = { ...list[idx], title: e.target.value };
                            handleFieldChange('bumpercarWhyChoose', 'cardsList', list);
                          }}
                          style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                        />
                        <RichTextareaWithEditor
                          label="Card Description"
                          rows={2}
                          placeholder="Card Description"
                          value={card.desc || ''}
                          onChange={(val) => {
                            const list = [...(formData.bumpercarWhyChoose?.cardsList || (
                              Array.isArray(formData.bumpercarWhyChoose?.topCards)
                                ? [...formData.bumpercarWhyChoose.topCards, ...(formData.bumpercarWhyChoose?.bottomCards || [])]
                                : [
                                  { title: "Free ROI Report Before You Invest", desc: "See Your Real Costs, Revenue, And<br />Break-Even Before You Commit" },
                                  { title: "Own Installation Team", desc: "Our Own Team Install And Commission<br />Every Project Across 50+ Cities" },
                                  { title: "Reliable After-Sales Support", desc: "We Stay On After Handover With<br />Servicing And Maintenance So Your<br />Setup Keeps Running." },
                                  { title: "Proven Track Record", desc: "Take A Look At What We've Built<br />And Hear From The Venues We've<br />Worked With." },
                                  { title: "Honest, Transparent Pricing", desc: "One Clear Quote Covering Everything,<br />No Hidden Costs Added Later." }
                                ]
                            ))];
                            list[idx] = { ...list[idx], desc: val };
                            handleFieldChange('bumpercarWhyChoose', 'cardsList', list);
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={async () => {
                          const list = [...(formData.bumpercarWhyChoose?.cardsList || (
                            Array.isArray(formData.bumpercarWhyChoose?.topCards)
                              ? [...formData.bumpercarWhyChoose.topCards, ...(formData.bumpercarWhyChoose?.bottomCards || [])]
                              : [
                                { title: "Free ROI Report Before You Invest", desc: "See Your Real Costs, Revenue, And<br />Break-Even Before You Commit" },
                                { title: "Own Installation Team", desc: "Our Own Team Install And Commission<br />Every Project Across 50+ Cities" },
                                { title: "Reliable After-Sales Support", desc: "We Stay On After Handover With<br />Servicing And Maintenance So Your<br />Setup Keeps Running." },
                                { title: "Proven Track Record", desc: "Take A Look At What We've Built<br />And Hear From The Venues We've<br />Worked With." },
                                { title: "Honest, Transparent Pricing", desc: "One Clear Quote Covering Everything,<br />No Hidden Costs Added Later." }
                              ]
                          ))];
                          const updated = list.filter((_, i) => i !== idx);
                          const updatedSec = { ...(formData.bumpercarWhyChoose || {}), cardsList: updated };
                          setFormData(prev => ({ ...prev, bumpercarWhyChoose: updatedSec }));
                          await persistSectionToDatabase('bumpercarWhyChoose', updatedSec);
                        }}
                        style={{ background: '#ef4444', color: '#fff', border: 'none', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', flexShrink: 0, marginTop: '4px' }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('bumpercarWhyChoose', formData.bumpercarWhyChoose || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Why Choose Section
                </button>
              </div>
            </div>
          )}

          {/* BUMPER CAR FAQS FORM */}
          {activeSection === 'bumpercarFaqs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Bumper Car FAQs Management</h3>
                <button
                  onClick={() => {
                    const currentList = Array.isArray(formData.bumpercarFaqs) && formData.bumpercarFaqs.length > 0
                      ? formData.bumpercarFaqs
                      : [
                        {
                          question: "Where can I buy bumper cars in India?",
                          answer: "Winera International manufactures and supplies electric floor and battery-operated bumper cars across India for amusement parks, malls, FECs, and gaming zones. We have completed installations in 50+ cities since 2014 and handle setup through our own engineering team."
                        },
                        {
                          question: "What does the bumper car arena setup cost India?",
                          answer: "Bumper car price in India depends on drive type, car count, arena size, and customisation. Winera provides a complete cost breakdown — equipment, installation, and maintenance — before you confirm anything. Contact us for a venue-specific quote."
                        },
                        {
                          question: "What is the difference between electric floor and battery-operated bumper cars?",
                          answer: "Electric floor bumper cars are powered through a conductive floor grid and ceiling contact system; they run continuously without battery management and suit permanent amusement park installations. Battery-operated bumper cars need no floor modification and can be relocated, making them ideal for malls, gaming zones, and flexible setups."
                        },
                        {
                          question: "Do bumper cars require special flooring?",
                          answer: "Electric floor bumper cars require a conductive floor grid installation. Battery-operated bumper cars work on any flat surface with no floor modification needed. Our team assesses your existing floor and recommends the right type based on your infrastructure and venue goals."
                        },
                        {
                          question: "How much floor area do I need for a bumper car attraction?",
                          answer: "The minimum floor area required is 400 sq ft. A standard 6–8 car setup runs well in 500–700 sq ft. Larger venues with 12–15 cars typically use 1,000 sq ft or more. Our team calculates exact requirements based on your car count and traffic flow during the ROI planning stage."
                        },
                        {
                          question: "What ROI can I expect from a bumper car ride?",
                          answer: "ROI varies by venue size, daily footfall, session pricing, and operating hours. Winera prepares a free, venue-specific ROI report for every project covering projected rider capacity, estimated daily revenue, and break-even timeline — calculated against your actual floor size and local pricing, not a generic average."
                        },
                        {
                          question: "Can bumper cars be used outdoors?",
                          answer: "Our bumper cars are designed for indoor commercial use. Outdoor setups require a covered structure (shed or canopy) to protect the electrical components and floor systems from weather exposure. We advise on suitable outdoor setup configurations during the venue assessment."
                        },
                        {
                          question: "What maintenance do bumper cars require?",
                          answer: "Winera bumper cars are built for continuous commercial use with an expected lifespan of 8–12 years. Routine maintenance includes periodic inspection of bumpers, motors, and electrical contacts typically once or twice annually. Battery-operated models require regular battery health checks. We provide a maintenance schedule with every installation."
                        },
                        {
                          question: "Why choose Winera International as your bumper car supplier in India?",
                          answer: "Three reasons: first, we provide a free ROI report for your venue before you commit to any purchase. Second, our own engineering team installs and commissions every ride across 50+ cities in India with no third-party contractors. Third, as a direct manufacturer, you receive manufacturer pricing with no distributor markup."
                        }
                      ];
                    const updated = [...currentList, { question: '', answer: '' }];
                    setFormData((prev) => ({ ...prev, bumpercarFaqs: updated }));
                  }}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                >
                  + Add FAQ Item
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(Array.isArray(formData.bumpercarFaqs) && formData.bumpercarFaqs.length > 0
                  ? formData.bumpercarFaqs
                  : [
                    {
                      question: "Where can I buy bumper cars in India?",
                      answer: "Winera International manufactures and supplies electric floor and battery-operated bumper cars across India for amusement parks, malls, FECs, and gaming zones. We have completed installations in 50+ cities since 2014 and handle setup through our own engineering team."
                    },
                    {
                      question: "What does the bumper car arena setup cost India?",
                      answer: "Bumper car price in India depends on drive type, car count, arena size, and customisation. Winera provides a complete cost breakdown — equipment, installation, and maintenance — before you confirm anything. Contact us for a venue-specific quote."
                    },
                    {
                      question: "What is the difference between electric floor and battery-operated bumper cars?",
                      answer: "Electric floor bumper cars are powered through a conductive floor grid and ceiling contact system; they run continuously without battery management and suit permanent amusement park installations. Battery-operated bumper cars need no floor modification and can be relocated, making them ideal for malls, gaming zones, and flexible setups."
                    },
                    {
                      question: "Do bumper cars require special flooring?",
                      answer: "Electric floor bumper cars require a conductive floor grid installation. Battery-operated bumper cars work on any flat surface with no floor modification needed. Our team assesses your existing floor and recommends the right type based on your infrastructure and venue goals."
                    },
                    {
                      question: "How much floor area do I need for a bumper car attraction?",
                      answer: "The minimum floor area required is 400 sq ft. A standard 6–8 car setup runs well in 500–700 sq ft. Larger venues with 12–15 cars typically use 1,000 sq ft or more. Our team calculates exact requirements based on your car count and traffic flow during the ROI planning stage."
                    },
                    {
                      question: "What ROI can I expect from a bumper car ride?",
                      answer: "ROI varies by venue size, daily footfall, session pricing, and operating hours. Winera prepares a free, venue-specific ROI report for every project covering projected rider capacity, estimated daily revenue, and break-even timeline — calculated against your actual floor size and local pricing, not a generic average."
                    },
                    {
                      question: "Can bumper cars be used outdoors?",
                      answer: "Our bumper cars are designed for indoor commercial use. Outdoor setups require a covered structure (shed or canopy) to protect the electrical components and floor systems from weather exposure. We advise on suitable outdoor setup configurations during the venue assessment."
                    },
                    {
                      question: "What maintenance do bumper cars require?",
                      answer: "Winera bumper cars are built for continuous commercial use with an expected lifespan of 8–12 years. Routine maintenance includes periodic inspection of bumpers, motors, and electrical contacts typically once or twice annually. Battery-operated models require regular battery health checks. We provide a maintenance schedule with every installation."
                    },
                    {
                      question: "Why choose Winera International as your bumper car supplier in India?",
                      answer: "Three reasons: first, we provide a free ROI report for your venue before you commit to any purchase. Second, our own engineering team installs and commissions every ride across 50+ cities in India with no third-party contractors. Third, as a direct manufacturer, you receive manufacturer pricing with no distributor markup."
                    }
                  ]
                ).map((faq, idx) => (
                  <div key={idx} style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '800', fontSize: '13px', color: '#0369a1' }}>FAQ #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={async () => {
                          const currentList = Array.isArray(formData.bumpercarFaqs) && formData.bumpercarFaqs.length > 0
                            ? [...formData.bumpercarFaqs]
                            : [
                              {
                                question: "Where can I buy bumper cars in India?",
                                answer: "Winera International manufactures and supplies electric floor and battery-operated bumper cars across India for amusement parks, malls, FECs, and gaming zones. We have completed installations in 50+ cities since 2014 and handle setup through our own engineering team."
                              },
                              {
                                question: "What does the bumper car arena setup cost India?",
                                answer: "Bumper car price in India depends on drive type, car count, arena size, and customisation. Winera provides a complete cost breakdown — equipment, installation, and maintenance — before you confirm anything. Contact us for a venue-specific quote."
                              },
                              {
                                question: "What is the difference between electric floor and battery-operated bumper cars?",
                                answer: "Electric floor bumper cars are powered through a conductive floor grid and ceiling contact system; they run continuously without battery management and suit permanent amusement park installations. Battery-operated bumper cars need no floor modification and can be relocated, making them ideal for malls, gaming zones, and flexible setups."
                              },
                              {
                                question: "Do bumper cars require special flooring?",
                                answer: "Electric floor bumper cars require a conductive floor grid installation. Battery-operated bumper cars work on any flat surface with no floor modification needed. Our team assesses your existing floor and recommends the right type based on your infrastructure and venue goals."
                              },
                              {
                                question: "How much floor area do I need for a bumper car attraction?",
                                answer: "The minimum floor area required is 400 sq ft. A standard 6–8 car setup runs well in 500–700 sq ft. Larger venues with 12–15 cars typically use 1,000 sq ft or more. Our team calculates exact requirements based on your car count and traffic flow during the ROI planning stage."
                              },
                              {
                                question: "What ROI can I expect from a bumper car ride?",
                                answer: "ROI varies by venue size, daily footfall, session pricing, and operating hours. Winera prepares a free, venue-specific ROI report for every project covering projected rider capacity, estimated daily revenue, and break-even timeline — calculated against your actual floor size and local pricing, not a generic average."
                              },
                              {
                                question: "Can bumper cars be used outdoors?",
                                answer: "Our bumper cars are designed for indoor commercial use. Outdoor setups require a covered structure (shed or canopy) to protect the electrical components and floor systems from weather exposure. We advise on suitable outdoor setup configurations during the venue assessment."
                              },
                              {
                                question: "What maintenance do bumper cars require?",
                                answer: "Winera bumper cars are built for continuous commercial use with an expected lifespan of 8–12 years. Routine maintenance includes periodic inspection of bumpers, motors, and electrical contacts typically once or twice annually. Battery-operated models require regular battery health checks. We provide a maintenance schedule with every installation."
                              },
                              {
                                question: "Why choose Winera International as your bumper car supplier in India?",
                                answer: "Three reasons: first, we provide a free ROI report for your venue before you commit to any purchase. Second, our own engineering team installs and commissions every ride across 50+ cities in India with no third-party contractors. Third, as a direct manufacturer, you receive manufacturer pricing with no distributor markup."
                              }
                            ];
                          const updated = currentList.filter((_, i) => i !== idx);
                          setFormData((prev) => ({ ...prev, bumpercarFaqs: updated }));
                          await persistSectionToDatabase('bumpercarFaqs', updated);
                        }}
                        style={{ background: '#ef4444', color: '#fff', border: 'none', width: '28px', height: '28px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '900' }}
                      >
                        ×
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="Question"
                      value={faq.question || ''}
                      onChange={(e) => {
                        const currentList = [...(formData.bumpercarFaqs || [])];
                        currentList[idx] = { ...currentList[idx], question: e.target.value };
                        setFormData((prev) => ({ ...prev, bumpercarFaqs: currentList }));
                      }}
                      style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: '700' }}
                    />

                    <RichTextareaWithEditor
                      label="Answer"
                      rows={3}
                      placeholder="Answer"
                      value={faq.answer || faq.a || ''}
                      onChange={(val) => {
                        const currentList = [...(formData.bumpercarFaqs || [])];
                        currentList[idx] = { ...currentList[idx], answer: val, a: val };
                        setFormData((prev) => ({ ...prev, bumpercarFaqs: currentList }));
                      }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('bumpercarFaqs', formData.bumpercarFaqs || [])}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Bumper Car FAQs
                </button>
              </div>
            </div>
          )}

          {/* BUMPER CAR CTA BANNER FORM */}
          {activeSection === 'bumpercarCta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Bumper Car CTA Banner Settings</h3>

              {/* Banner Background Image Upload */}
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  1. Banner Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img
                    src={getAdminValidImageUrl(formData.bumpercarCta?.bgUrl, ctaMainBanner)}
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
                          const updated = { ...(formData.bumpercarCta || {}), bgUrl: res.url };
                          setFormData(prev => ({ ...prev, bumpercarCta: updated }));
                          await persistSectionToDatabase('bumpercarCta', updated);
                          setStatusMsg('Background image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {formData.bumpercarCta?.bgUrl && (
                    <button
                      type="button"
                      onClick={async () => {
                        const updated = { ...(formData.bumpercarCta || {}), bgUrl: '' };
                        setFormData(prev => ({ ...prev, bumpercarCta: updated }));
                        await persistSectionToDatabase('bumpercarCta', updated);
                        setStatusMsg('Banner reset to default successfully!');
                      }}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Reset to Default Banner
                    </button>
                  )}
                </div>
                <div style={{ marginTop: '14px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                    🏷️ Banner Background Image Alt Text (SEO Keyword)
                  </label>
                  <input
                    type="text"
                    value={formData.bumpercarCta?.bgAlt || ''}
                    onChange={(e) => handleFieldChange('bumpercarCta', 'bgAlt', e.target.value)}
                    placeholder="e.g. Ready to Explore a Bumper Car Attraction for Your Venue - Winera"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>



              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Main Title Heading</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Yellow.</p>
                <input
                  type="text"
                  value={formData.bumpercarCta?.title || 'READY TO EXPLORE A *BUMPER CAR*<br />ATTRACTION *FOR YOUR VENUE?*'}
                  onChange={(e) => handleFieldChange('bumpercarCta', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <RichTextareaWithEditor
                  label="Subtitle Description Text"
                  rows={2}
                  value={formData.bumpercarCta?.subtitle !== undefined ? formData.bumpercarCta.subtitle : (formData.bumpercarCta?.whiteText !== undefined ? formData.bumpercarCta.whiteText : "Our team will assess your space, prepare a free ROI report,<br/>and recommend the right setup before you spend anything.")}
                  onChange={(val) => {
                    handleFieldChange('bumpercarCta', 'subtitle', val);
                    handleFieldChange('bumpercarCta', 'whiteText', val);
                  }}
                  placeholder="Enter subtitle description text..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.bumpercarCta?.buttonText || 'Get a Quote From an Expert'}
                    onChange={(e) => handleFieldChange('bumpercarCta', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                  <input
                    type="text"
                    value={formData.bumpercarCta?.buttonLink || 'https://wa.me/919157873576'}
                    onChange={(e) => handleFieldChange('bumpercarCta', 'buttonLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('bumpercarCta', formData.bumpercarCta || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Bumper Car CTA Banner
                </button>
              </div>
            </div>
          )}
    </>
  );
}
