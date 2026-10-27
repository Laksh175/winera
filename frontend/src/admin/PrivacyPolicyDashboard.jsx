import React from 'react';
import { Upload } from 'lucide-react';
import RichTextareaWithEditor from '../components/RichTextareaWithEditor';
import AdminAltInput from '../components/AdminAltInput';
import { uploadImageFile } from '../services/api';

const defaultGameZoneMobileBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345484/winera_uploads/cjhcvoxksmptc84yslh2.png";
const aboutHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345517/winera_uploads/wa3oylkwg39op9yozk90.png";

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

const defaultPrivacyHero = {
  title: "Privacy *Policy*",
  breadcrumbHome: "Home",
  breadcrumbText: "Privacy Policy",
  bgUrl: aboutHeroBg,
  bgAlt: "Privacy Policy - Winera International",
  mobileBgUrl: defaultGameZoneMobileBanner,
  mobileBgAlt: "Privacy Policy Mobile Banner - Winera International"
};


const defaultPrivacySections = [
  {
    number: "1",
    title: "Introduction",
    content: [
      "Winera International Pvt. Ltd. ('Winera', 'Company', 'we', 'our', or 'us') is committed to protecting your personal and business information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.winera.in, interact with us online, or use our services. By using our website, you consent to the practices described in this policy."
    ]
  },
  {
    number: "2",
    title: "Information We Collect",
    subtitle: "We collect the following types of information:",
    bullets: [
      { label: "Personal Information", text: "Your name, email address, phone number, business name, designation, and other contact details." },
      { label: "Business Information", text: "Project details, site drawings, requirements, order history." },
      { label: "Technical Data", text: "IP address, browser type, device information, operating system, referring URLs, date/time stamps." },
      { label: "Cookies and Usage Data", text: "We use cookies to collect anonymous usage statistics and user behavior data." }
    ]
  },
  {
    number: "3",
    title: "How We Use Your Information",
    subtitle: "We use your information for purposes including:",
    bulletsText: [
      "Responding to inquiries and sending quotes",
      "Processing and managing your orders",
      "Delivering customer service and support",
      "Improving our website and services",
      "Sending transactional and promotional communications (with your consent)",
      "Legal compliance and dispute resolution"
    ]
  },
  {
    number: "4",
    title: "Legal Basis for Processing",
    subtitle: "We process your data based on:",
    bulletsText: [
      "Your consent",
      "The necessity to perform a contract",
      "Our legal obligations",
      "Legitimate business interests"
    ]
  },
  {
    number: "5",
    title: "Sharing and Disclosure of Information",
    subtitle: "We do not sell your data. We may share information with:",
    bulletsText: [
      "Internal teams for project fulfillment",
      "Logistics providers for delivery",
      "IT and analytics partners (e.g., Google Analytics)",
      "Legal or regulatory authorities when required"
    ]
  },
  {
    number: "6",
    title: "Data Retention",
    content: [
      "We retain your personal and business data only for as long as necessary to fulfill the purposes outlined in this policy. This includes compliance with legal obligations, resolving disputes, and enforcing agreements."
    ]
  },
  {
    number: "7",
    title: "Your Data Rights",
    subtitle: "You have the right to:",
    bulletsText: [
      "Access and review your data",
      "Correct or update inaccurate information",
      "Withdraw consent at any time",
      "Request data deletion, subject to legal limits",
      "Object to processing or request data portability"
    ]
  },
  {
    number: "8",
    title: "Security of Your Data",
    content: [
      "We implement appropriate technical and organizational measures to safeguard your data. This includes secure servers, firewalls, encryption, and access controls. While we strive for security, no method is fully secure."
    ]
  },
  {
    number: "9",
    title: "Cookies and Tracking",
    content: [
      "We use cookies to understand user behavior and improve site performance. You can manage your cookie preferences in your browser settings. Blocking cookies may impact your experience."
    ]
  },
  {
    number: "10",
    title: "Third-Party Links",
    content: [
      "Our website may contain links to other websites. We are not responsible for their privacy practices or content. Please review their policies before interacting with them."
    ]
  },
  {
    number: "11",
    title: "Children’s Privacy",
    content: [
      "Our services are intended for individuals 18 years and older. We do not knowingly collect data from children. If you believe we have inadvertently collected such data, contact us for deletion."
    ]
  },
  {
    number: "12",
    title: "International Data Transfers",
    content: [
      "If you are accessing our website from outside India, you consent to the transfer and processing of your data in accordance with Indian law."
    ]
  },
  {
    number: "13",
    title: "Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. The latest version will be posted on this page. Continued use of our website means you accept the updated terms."
    ]
  },
  {
    number: "14",
    title: "Contact Information",
    subtitle: "For any questions or concerns, contact us at:",
    content: [
      "Winera International Pvt. Ltd.",
      "1011, 10th floor, Millennium Business Hub, opp. Bhagavan Nagar, Sarthana Jakat Naka, Nature Park and Zoo, Nana Varachha, Surat, Gujarat-395006, India"
    ],
    bulletsText: [
      "Email: info@winera.in",
      "Phone: +91 91578 73576 / +91 95123 56766"
    ]
  }
];


export default function PrivacyPolicyDashboard({
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
          {activeSection === 'privacyHero' && (() => {
            const currentHero = formData.privacyHero || defaultPrivacyHero;
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Privacy Policy Hero Banner</h3>

                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    Hero Title (Use *word* for Yellow Highlight)
                  </label>
                  <input
                    type="text"
                    value={currentHero.title || 'Privacy *Policy*'}
                    onChange={(e) => handleFieldChange('privacyHero', 'title', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                      Breadcrumb Home Label
                    </label>
                    <input
                      type="text"
                      value={currentHero.breadcrumbHome || 'Home'}
                      onChange={(e) => handleFieldChange('privacyHero', 'breadcrumbHome', e.target.value)}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                      Breadcrumb Active Page Text
                    </label>
                    <input
                      type="text"
                      value={currentHero.breadcrumbText || 'Privacy Policy'}
                      onChange={(e) => handleFieldChange('privacyHero', 'breadcrumbText', e.target.value)}
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
                      onChange={(e) => handleFieldChange('privacyHero', 'bgUrl', e.target.value)}
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
                            handleFieldChange('privacyHero', 'bgUrl', res.url);
                          }
                        }}
                      />
                    </label>
                    <img
                      src={getAdminValidImageUrl(currentHero.bgUrl, aboutHeroBg)}
                      alt="Privacy Hero Preview"
                      style={{ width: '100px', height: '70px', borderRadius: '10px', objectFit: 'cover', background: '#f8fafc', border: '1.5px solid #38bdf8', padding: '2px' }}
                    />
                  </div>
                  <AdminAltInput
                    compact
                    label="🏷️ Hero Banner Alt Text (SEO Keyword)"
                    value={currentHero.bgAlt || ''}
                    onChange={(e) => handleFieldChange('privacyHero', 'bgAlt', e.target.value)}
                    placeholder="e.g. Privacy Policy - Winera International"
                  />
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
                      onChange={(e) => handleFieldChange('privacyHero', 'mobileBgUrl', e.target.value)}
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
                            handleFieldChange('privacyHero', 'mobileBgUrl', res.url);
                          }
                        }}
                      />
                    </label>
                    <img
                      src={getAdminValidImageUrl(currentHero.mobileBgUrl, defaultGameZoneMobileBanner)}
                      alt="Privacy Mobile Hero Preview"
                      style={{ width: '100px', height: '70px', borderRadius: '10px', objectFit: 'cover', background: '#f8fafc', border: '1.5px solid #38bdf8', padding: '2px' }}
                    />
                    {currentHero.mobileBgUrl && (
                      <button
                        type="button"
                        onClick={() => handleFieldChange('privacyHero', 'mobileBgUrl', '')}
                        style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
                      >
                        Reset Image
                      </button>
                    )}
                  </div>
                  <AdminAltInput
                    compact
                    label="🏷️ Mobile Background Image Alt Text (SEO Keyword)"
                    value={currentHero.mobileBgAlt || ''}
                    onChange={(e) => handleFieldChange('privacyHero', 'mobileBgAlt', e.target.value)}
                    placeholder="e.g. Privacy Policy Mobile Banner - Winera International"
                  />
                </div>

                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                  <button
                    onClick={() => persistSectionToDatabase('privacyHero', formData.privacyHero || defaultPrivacyHero)}
                    style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                  >
                    Save Privacy Hero Banner
                  </button>
                </div>
              </div>
            );
          })()}

          {/* PRIVACY POLICY SECTIONS EDITOR */}
          {activeSection === 'privacySections' && (() => {
            const sectionsList = formData.privacySections || defaultPrivacySections;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>Privacy Policy Content & Sections</h3>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0', fontWeight: '500' }}>
                      Edit all Privacy Policy sections, titles, paragraphs, and bullet points displayed on the website.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newSec = {
                        number: String(sectionsList.length + 1),
                        title: "New Policy Section",
                        content: ["Enter section content here..."]
                      };
                      const updated = [...sectionsList, newSec];
                      setFormData(prev => ({ ...prev, privacySections: updated }));
                    }}
                    style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    + Add New Section
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {sectionsList.map((sec, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '800', color: '#0284c7', background: '#e0f2fe', padding: '4px 10px', borderRadius: '8px' }}>
                          Section #{sec.number || idx + 1}
                        </span>
                        <button
                          onClick={() => {
                            const updated = sectionsList.filter((_, i) => i !== idx);
                            setFormData(prev => ({ ...prev, privacySections: updated }));
                          }}
                          style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fca5a5', padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                        >
                          Delete
                        </button>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '14px', marginBottom: '14px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>Number</label>
                          <input
                            type="text"
                            value={sec.number || ''}
                            onChange={(e) => {
                              const updated = [...sectionsList];
                              updated[idx] = { ...updated[idx], number: e.target.value };
                              setFormData(prev => ({ ...prev, privacySections: updated }));
                            }}
                            style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>Section Title</label>
                          <input
                            type="text"
                            value={sec.title || ''}
                            onChange={(e) => {
                              const updated = [...sectionsList];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setFormData(prev => ({ ...prev, privacySections: updated }));
                            }}
                            style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px' }}
                          />
                        </div>
                      </div>

                      <div style={{ marginBottom: '14px' }}>
                        <RichTextareaWithEditor
                          label="Subtitle / Intro (Optional)"
                          rows={2}
                          value={sec.subtitle || sec.intro || ''}
                          onChange={(val) => {
                            const updated = [...sectionsList];
                            updated[idx] = { ...updated[idx], subtitle: val, intro: val };
                            setFormData(prev => ({ ...prev, privacySections: updated }));
                          }}
                          placeholder="e.g. We collect the following types of information:"
                        />
                      </div>

                      <div style={{ marginBottom: '14px' }}>
                        <RichTextareaWithEditor
                          label="Paragraph Content (Paragraphs separated by line breaks)"
                          rows={4}
                          value={Array.isArray(sec.content) ? sec.content.join('\n\n') : (sec.content || '')}
                          onChange={(val) => {
                            const updated = [...sectionsList];
                            const paragraphs = val.includes('\n\n')
                              ? val.split(/\n\s*\n/).filter(Boolean)
                              : (val.trim() ? [val] : []);
                            updated[idx] = { ...updated[idx], content: paragraphs };
                            setFormData(prev => ({ ...prev, privacySections: updated }));
                          }}
                          placeholder="Section main paragraph content..."
                        />
                      </div>

                      <div>
                        <RichTextareaWithEditor
                          label="Bullet Points (1 point per line)"
                          rows={4}
                          value={
                            sec.bulletsText
                              ? sec.bulletsText.join('\n')
                              : sec.bullets
                                ? sec.bullets.map(b => `${b.label ? b.label + ': ' : ''}${b.text}`).join('\n')
                                : ''
                          }
                          onChange={(val) => {
                            const updated = [...sectionsList];
                            const lines = val.split('\n').filter(l => l.trim().length > 0);
                            updated[idx] = { ...updated[idx], bulletsText: lines, bullets: undefined };
                            setFormData(prev => ({ ...prev, privacySections: updated }));
                          }}
                          placeholder="Enter each bullet point on a new line..."
                        />
                      </div>
                    </div>
                  ))}

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('privacySections', formData.privacySections || defaultPrivacySections)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Privacy Policy Content
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

    </>
  );
}
