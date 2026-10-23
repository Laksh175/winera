import React from 'react';
import { Upload } from 'lucide-react';
import RichTextareaWithEditor from '../components/RichTextareaWithEditor';
import { uploadImageFile } from '../services/api';

const defaultGameZoneMobileBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345484/winera_uploads/cjhcvoxksmptc84yslh2.png";
const contactUsHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345647/winera_uploads/z2qo5dtx8u7tyfvzjhmr.png";

const defaultContactHero = {
  breadcrumbHome: "Home",
  breadcrumbText: "Contact Us",
  bgUrl: contactUsHeroBg,
  bgAlt: "Contact Winera International - Commercial Game Zone Setup & Turnkey Solutions",
  mobileBgUrl: defaultGameZoneMobileBanner,
  mobileBgAlt: "Contact Winera International Mobile Banner - Commercial Game Zone Setup & Turnkey Solutions"
};

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

export default function ContactDashboard({
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
          {activeSection === 'contactHero' && (() => {
            const currentHero = formData.contactHero || defaultContactHero;
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Contact Us Hero Banner</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                      Breadcrumb Home Label
                    </label>
                    <input
                      type="text"
                      value={currentHero.breadcrumbHome || 'Home'}
                      onChange={(e) => handleFieldChange('contactHero', 'breadcrumbHome', e.target.value)}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                      Breadcrumb Active Page Text
                    </label>
                    <input
                      type="text"
                      value={currentHero.breadcrumbText || 'Contact Us'}
                      onChange={(e) => handleFieldChange('contactHero', 'breadcrumbText', e.target.value)}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                    />
                  </div>
                </div>

                {/* Desktop Screen Hero Banner */}
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    Hero Banner Background Image (Desktop) <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                  </label>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={currentHero.bgUrl || ''}
                      onChange={(e) => handleFieldChange('contactHero', 'bgUrl', e.target.value)}
                      placeholder="Image URL or Asset Path"
                      style={{ flex: 1, padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px' }}
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
                            handleFieldChange('contactHero', 'bgUrl', res.url);
                          }
                        }}
                      />
                    </label>
                    <img
                      src={getAdminValidImageUrl(currentHero.bgUrl, contactUsHeroBg)}
                      alt="Contact Hero Preview"
                      style={{ width: '100px', height: '70px', borderRadius: '10px', objectFit: 'cover', background: '#f8fafc', border: '1.5px solid #38bdf8', padding: '2px' }}
                    />
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                      🏷️ Hero Banner Alt Text (SEO Keyword)
                    </label>
                    <input
                      type="text"
                      value={currentHero.bgAlt || ''}
                      onChange={(e) => handleFieldChange('contactHero', 'bgAlt', e.target.value)}
                      placeholder="e.g. Contact Winera International - Commercial Game Zone Setup & Turnkey Solutions"
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                    />
                  </div>
                </div>

                {/* Mobile Screen Hero Banner */}
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    Mobile Screen Hero Banner <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📱 Recommended Size: 941 × 550 px</span>
                  </label>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={currentHero.mobileBgUrl || ''}
                      onChange={(e) => handleFieldChange('contactHero', 'mobileBgUrl', e.target.value)}
                      placeholder="Mobile Background Image URL"
                      style={{ flex: 1, padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px' }}
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
                            handleFieldChange('contactHero', 'mobileBgUrl', res.url);
                          }
                        }}
                      />
                    </label>
                    <img
                      src={getAdminValidImageUrl(currentHero.mobileBgUrl, defaultGameZoneMobileBanner)}
                      alt="Contact Mobile Hero Preview"
                      style={{ width: '100px', height: '70px', borderRadius: '10px', objectFit: 'cover', background: '#f8fafc', border: '1.5px solid #38bdf8', padding: '2px' }}
                    />
                    {currentHero.mobileBgUrl && (
                      <button
                        type="button"
                        onClick={() => handleFieldChange('contactHero', 'mobileBgUrl', '')}
                        style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
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
                      value={currentHero.mobileBgAlt || ''}
                      onChange={(e) => handleFieldChange('contactHero', 'mobileBgAlt', e.target.value)}
                      placeholder="e.g. Contact Winera International Mobile Banner - Commercial Game Zone Setup & Turnkey Solutions"
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                    />
                  </div>
                </div>

                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                  <button
                    onClick={() => persistSectionToDatabase('contactHero', formData.contactHero || defaultContactHero)}
                    style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                  >
                    Save Contact Hero Banner
                  </button>
                </div>
              </div>
            );
          })()}

          {/* CONTACT INFO & FORM SECTION */}
          {activeSection === 'contactPage' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Contact Us Info & Form Details</h3>

              {/* Heading Title & Subtext */}
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Main Section Title (Use *word* for Dark Text accent)
                </label>
                <input
                  type="text"
                  value={formData.contactPage?.title || 'Get in Touch with *Winera International*'}
                  onChange={(e) => handleFieldChange('contactPage', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <RichTextareaWithEditor
                label="Main Description Paragraph"
                rows={4}
                value={formData.contactPage?.desc !== undefined ? formData.contactPage.desc : "Looking for reliable game zone equipment, soft play solutions, or indoor amusement park installations for your business? Our team is here to help you with product details, project pricing, and complete service support. Connect with us to discuss your space requirements and see how Winera International transforms ordinary spaces into extraordinary entertainment destinations."}
                onChange={(val) => handleFieldChange('contactPage', 'desc', val)}
                placeholder="Enter main description paragraph..."
              />

              {/* Call Us & Email Cards */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Call Us & Email Contact Cards</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div style={{ background: '#ffffff', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                    <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Call Card Title</label>
                    <input
                      type="text"
                      value={formData.contactPage?.callTitle || 'CALL US DIRECTLY'}
                      onChange={(e) => handleFieldChange('contactPage', 'callTitle', e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}
                    />
                    <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Phone Number 1</label>
                    <input
                      type="text"
                      value={formData.contactPage?.phone1 || '+91 91578 73576'}
                      onChange={(e) => handleFieldChange('contactPage', 'phone1', e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}
                    />
                    <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Phone Number 2</label>
                    <input
                      type="text"
                      value={formData.contactPage?.phone2 || '+91 95123 56766'}
                      onChange={(e) => handleFieldChange('contactPage', 'phone2', e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                    />
                  </div>

                  <div style={{ background: '#ffffff', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                    <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Email Card Title</label>
                    <input
                      type="text"
                      value={formData.contactPage?.emailTitle || 'EMAIL OUR TEAM'}
                      onChange={(e) => handleFieldChange('contactPage', 'emailTitle', e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}
                    />
                    <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Support Email Address</label>
                    <input
                      type="text"
                      value={formData.contactPage?.email || 'info@winera.in'}
                      onChange={(e) => handleFieldChange('contactPage', 'email', e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                    />
                  </div>
                </div>
              </div>

              {/* Form Title & Submit Button Text */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Inquiry Form Settings</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Form Card Title</label>
                    <input
                      type="text"
                      value={formData.contactPage?.formTitle || 'Let’s Start Your Project'}
                      onChange={(e) => handleFieldChange('contactPage', 'formTitle', e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Submit Button Text</label>
                    <input
                      type="text"
                      value={formData.contactPage?.formBtnText || 'Request Free Consultation'}
                      onChange={(e) => handleFieldChange('contactPage', 'formBtnText', e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                    />
                  </div>
                </div>
              </div>

              {/* Global Locations (Surat HQ & China Facility) */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Global Locations (Surat HQ & China Facility)</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div style={{ background: '#ffffff', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                    <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Location 1 Name</label>
                    <input
                      type="text"
                      value={formData.contactPage?.hq1Name || 'Surat Headquarters (India)'}
                      onChange={(e) => handleFieldChange('contactPage', 'hq1Name', e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}
                    />
                    <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Location 1 Badge</label>
                    <input
                      type="text"
                      value={formData.contactPage?.hq1Badge || 'Corporate & Sales Office'}
                      onChange={(e) => handleFieldChange('contactPage', 'hq1Badge', e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px', fontWeight: '600', marginBottom: '6px' }}
                    />
                    <RichTextareaWithEditor
                      label="Location 1 Full Address"
                      rows={3}
                      value={formData.contactPage?.hq1Address !== undefined ? formData.contactPage.hq1Address : "Winera International Pvt. Ltd.\nSurat, Gujarat, India.\nHotline: +91 91578 73576 / +91 95123 56766"}
                      onChange={(val) => handleFieldChange('contactPage', 'hq1Address', val)}
                      placeholder="Enter Location 1 full address..."
                    />
                  </div>

                  <div style={{ background: '#ffffff', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                    <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Location 2 Name</label>
                    <input
                      type="text"
                      value={formData.contactPage?.hq2Name || 'China Manufacturing Facility'}
                      onChange={(e) => handleFieldChange('contactPage', 'hq2Name', e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}
                    />
                    <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Location 2 Badge</label>
                    <input
                      type="text"
                      value={formData.contactPage?.hq2Badge || 'Sourcing & Assembly Hub'}
                      onChange={(e) => handleFieldChange('contactPage', 'hq2Badge', e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px', fontWeight: '600', marginBottom: '6px' }}
                    />
                    <RichTextareaWithEditor
                      label="Location 2 Full Address"
                      rows={3}
                      value={formData.contactPage?.hq2Address !== undefined ? formData.contactPage.hq2Address : "Winera International Global Assembly Base\nGuangzhou / Panyu Amusement Equipment Zone,\nGuangdong Province, China."}
                      onChange={(val) => handleFieldChange('contactPage', 'hq2Address', val)}
                      placeholder="Enter Location 2 full address..."
                    />
                  </div>
                </div>
              </div>

              {/* Google Map iFrame Embed URL */}
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Google Map Embed iFrame Source URL (src)
                </label>
                <input
                  type="text"
                  value={formData.contactPage?.mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238130.15372332616!2d72.68220805!3d21.1591425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"}
                  onChange={(e) => handleFieldChange('contactPage', 'mapUrl', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13px', fontWeight: '500' }}
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('contactPage', formData.contactPage || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Contact Page Details
                </button>
              </div>
            </div>
          )}
    </>
  );
}
