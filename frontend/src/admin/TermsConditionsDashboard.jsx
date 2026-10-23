import React from 'react';
import { Upload } from 'lucide-react';
import RichTextareaWithEditor from '../components/RichTextareaWithEditor';
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

const defaultTermsHero = {
  title: "Terms & *Conditions*",
  breadcrumbHome: "Home",
  breadcrumbText: "Terms & Conditions",
  bgUrl: aboutHeroBg,
  bgAlt: "Terms & Conditions - Winera International",
  mobileBgUrl: defaultGameZoneMobileBanner,
  mobileBgAlt: "Terms & Conditions Mobile Banner - Winera International"
};


const defaultTermsSections = [
  {
    number: "1",
    title: "About Winera International Pvt. Ltd.",
    intro: "Winera International Pvt. Ltd., incorporated under the Companies Act, 1956, with registered office at 1011, 10th floor, Millennium Business Hub, opp., Bhagavan Nagar, Sarthana Jakat Naka, Nature Park and Zoo, Nana Varachha, Surat, Gujarat 395006, India, is a leading B2B turnkey entertainment solutions provider. Our services include:",
    bulletsText: [
      "Indoor soft play zones",
      "Trampoline parks and ninja courses",
      "Arcade and video game machine installations",
      "VR/AR entertainment zones",
      "Bowling alleys, bumper cars, laser tag setups",
      "Customized commercial play and recreation areas"
    ]
  },
  {
    number: "2",
    title: "Scope of Agreement",
    content: [
      "These Terms apply to all interactions, transactions, proposals, quotations, and contracts made through the Site or directly with the Company. These Terms do not override signed project-specific contracts; however, in case of conflict, the mutually signed agreement shall take precedence."
    ]
  },
  {
    number: "3",
    title: "Use of the Website",
    bulletsText: [
      "You agree to access this Site lawfully and only for legitimate business purposes.",
      "Unauthorized use of this Site may give rise to claims for damages and/or be a criminal offense.",
      "You may not attempt to gain unauthorized access to our systems or data, use this Site to copy, store, transmit, or distribute malicious software, or scrape, crawl, or collect user data without permission."
    ]
  },
  {
    number: "4",
    title: "Quotations, Proposals & Pricing",
    bulletsText: [
      "All quotations are non-binding until confirmed through a signed purchase/work order.",
      "Quotes are valid for 30 days unless otherwise stated in writing.",
      "All pricing is in Indian Rupees (INR) and exclusive of applicable taxes, duties, and levies.",
      "Price revisions may occur due to changes in raw material costs, design alterations, or import duties."
    ]
  },
  {
    number: "5",
    title: "Project Process & Order Confirmation",
    intro: "Projects commence only after receiving signed approval on quotation/design/BOQ and advance payment as per agreed terms.",
    bulletsText: [
      "The project is broken into phases: Design → Production → Dispatch → Installation → Handover.",
      "Project-specific responsibilities (like flooring, lighting, or electrical setup) must be completed by the client before installation begins."
    ]
  },
  {
    number: "6",
    title: "Payment Terms",
    intro: "Unless otherwise specified, standard payment milestones are:",
    bulletsText: [
      "50% of the total project value is payable in advance.",
      "40% before shipment or dispatch from factory.",
      "10% upon final handover and acceptance.",
      "No shipment or site work will begin without receipt of due payments.",
      "Delay in payment will lead to additional storage, demurrage, or interest charges (typically 1.5% per month).",
      "Payments must be made to official bank accounts listed on company invoices."
    ]
  },
  {
    number: "7",
    title: "Delivery & Logistics",
    bulletsText: [
      "Delivery timelines are indicative and commence only after design approval and advance receipt.",
      "Unexpected delays (strikes, customs clearance, shipping issues, etc.) will be communicated but shall not be grounds for penalty unless otherwise agreed.",
      "Risk of goods passes to the client upon dispatch from our warehouse.",
      "Insurance, if required, must be arranged by the client or requested in writing."
    ]
  },
  {
    number: "8",
    title: "Installation & Site Readiness",
    intro: "Winera provides installation services as part of turnkey projects.",
    bulletsText: [
      "Client responsibilities: Ensure access to the site during business hours, provide civil-ready conditions (flooring, walls, electric points, etc.), and provide accommodation or local logistics for installation crew in remote locations (as per mutual agreement).",
      "Any re-visits or delays due to client-side unpreparedness will be chargeable."
    ]
  },
  {
    number: "9",
    title: "Warranty & Maintenance",
    intro: "A standard 12-month manufacturer’s warranty is provided from date of installation.",
    bullets: [
      { label: "Coverage includes", text: "Structural integrity, weld failures, and manufacturing defects in supplied components." },
      { label: "Exclusions include", text: "Misuse, vandalism, natural disasters, water/fire/electrical damage, third-party installations or repairs, and consumables / wear-and-tear parts (nets, ropes, foam padding, etc.)." },
      { label: "AMC", text: "Post-warranty AMC (Annual Maintenance Contract) is available for a fee." }
    ]
  },
  {
    number: "10",
    title: "Design, Drawing & Intellectual Property",
    bulletsText: [
      "All designs, layouts, 3D renders, and proposals remain the intellectual property of Winera unless transferred by written agreement.",
      "No reuse, reproduction, or sharing is permitted without our written consent.",
      "Breach of this clause may result in legal action and claims for damages."
    ]
  },
  {
    number: "11",
    title: "Modifications & Customization",
    bulletsText: [
      "Clients may request minor customizations post-design approval; these will be accommodated if feasible.",
      "Major changes post-approval may involve additional cost and timeline revisions.",
      "Requests must be made in writing and approved by both parties."
    ]
  },
  {
    number: "12",
    title: "Cancellation & Refund Policy",
    bulletsText: [
      "Cancellation before production begins will attract a minimum 10% administrative fee.",
      "Once manufacturing or procurement has commenced, no refund will be issued.",
      "Refunds (where applicable) will be processed within 30 working days after due verification."
    ]
  },
  {
    number: "13",
    title: "Limitation of Liability",
    intro: "Winera shall not be liable for indirect or consequential losses, loss of business, revenue, or reputation, or delays due to force majeure or third-party vendors.",
    content: [
      "Maximum liability is capped at the total value of the product/service provided in the dispute."
    ]
  },
  {
    number: "14",
    title: "Subcontractors & Third Parties",
    content: [
      "We may use subcontractors or third-party service providers for part of the project (e.g., transport, electrical work). While we take care in selection, Winera is not liable for direct performance of subcontractors unless contractually stated."
    ]
  },
  {
    number: "15",
    title: "Confidentiality & Data Protection",
    bulletsText: [
      "All discussions, documents, drawings, client lists, and pricing details shared between Winera and the client are confidential.",
      "Each party agrees to use such data only for the intended project and not disclose to third parties without consent.",
      "Winera maintains strict cybersecurity and GDPR-compliant (where applicable) data handling protocols."
    ]
  },
  {
    number: "16",
    title: "Force Majeure",
    content: [
      "Winera shall not be liable for failure or delay in performance due to causes beyond its reasonable control, including but not limited to acts of God, war, fire, pandemics, strikes, shipping delays, embargoes, or government orders."
    ]
  },
  {
    number: "17",
    title: "Termination",
    subtitle: "Winera reserves the right to terminate any contract if:",
    bulletsText: [
      "The client breaches material terms of the agreement.",
      "Payments are withheld or delayed beyond agreed terms.",
      "The client is found engaging in fraudulent, unethical, or harmful business practices."
    ]
  },
  {
    number: "18",
    title: "Governing Law & Jurisdiction",
    bulletsText: [
      "These Terms shall be governed by and construed in accordance with the laws of the Republic of India.",
      "Any disputes or legal claims shall be subject to the exclusive jurisdiction of the courts in Surat, Gujarat."
    ]
  },
  {
    number: "19",
    title: "Revisions and Updates",
    content: [
      "These Terms may be updated periodically to reflect changes in law or business operations. Continued use of the Site or Services after updates will constitute acceptance of the revised Terms."
    ]
  },
  {
    number: "20",
    title: "Contact Us",
    content: [
      "Winera International Pvt. Ltd.",
      "📍 1011, 10th floor, Millennium Business Hub, opp., Bhagavan Nagar, Sarthana Jakat Naka, Nature Park and Zoo, Nana Varachha, Surat, Gujarat-395006, India"
    ],
    bulletsText: [
      "Email: info@winera.in",
      "Phone: +91 91578 73576 / +91 95123 56766",
      "Website: www.winera.in"
    ]
  }
];

export default function TermsConditionsDashboard({
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
          {activeSection === 'termsHero' && (() => {
            const currentHero = formData.termsHero || defaultTermsHero;
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Terms & Conditions Hero Banner</h3>

                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    Hero Title (Use *word* for Yellow Highlight)
                  </label>
                  <input
                    type="text"
                    value={currentHero.title || 'Terms & *Conditions*'}
                    onChange={(e) => handleFieldChange('termsHero', 'title', e.target.value)}
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
                      onChange={(e) => handleFieldChange('termsHero', 'breadcrumbHome', e.target.value)}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                      Breadcrumb Active Page Text
                    </label>
                    <input
                      type="text"
                      value={currentHero.breadcrumbText || 'Terms & Conditions'}
                      onChange={(e) => handleFieldChange('termsHero', 'breadcrumbText', e.target.value)}
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
                      onChange={(e) => handleFieldChange('termsHero', 'bgUrl', e.target.value)}
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
                            handleFieldChange('termsHero', 'bgUrl', res.url);
                          }
                        }}
                      />
                    </label>
                    <img
                      src={getAdminValidImageUrl(currentHero.bgUrl, aboutHeroBg)}
                      alt="Terms Hero Preview"
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
                      onChange={(e) => handleFieldChange('termsHero', 'bgAlt', e.target.value)}
                      placeholder="e.g. Terms & Conditions - Winera International"
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
                      onChange={(e) => handleFieldChange('termsHero', 'mobileBgUrl', e.target.value)}
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
                            handleFieldChange('termsHero', 'mobileBgUrl', res.url);
                          }
                        }}
                      />
                    </label>
                    <img
                      src={getAdminValidImageUrl(currentHero.mobileBgUrl, defaultGameZoneMobileBanner)}
                      alt="Terms Mobile Hero Preview"
                      style={{ width: '100px', height: '70px', borderRadius: '10px', objectFit: 'cover', background: '#f8fafc', border: '1.5px solid #38bdf8', padding: '2px' }}
                    />
                    {currentHero.mobileBgUrl && (
                      <button
                        type="button"
                        onClick={() => handleFieldChange('termsHero', 'mobileBgUrl', '')}
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
                      onChange={(e) => handleFieldChange('termsHero', 'mobileBgAlt', e.target.value)}
                      placeholder="e.g. Terms & Conditions Mobile Banner - Winera International"
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                    />
                  </div>
                </div>

                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                  <button
                    onClick={() => persistSectionToDatabase('termsHero', formData.termsHero || defaultTermsHero)}
                    style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                  >
                    Save Terms Hero Banner
                  </button>
                </div>
              </div>
            );
          })()}

          {/* TERMS & CONDITIONS SECTIONS EDITOR */}
          {activeSection === 'termsSections' && (() => {
            const sectionsList = formData.termsSections || defaultTermsSections;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>Terms & Conditions Content & Sections</h3>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0', fontWeight: '500' }}>
                      Edit all Terms & Conditions sections, titles, paragraphs, and bullet points displayed on the website.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newSec = {
                        number: String(sectionsList.length + 1),
                        title: "New Terms Section",
                        content: ["Enter section content here..."]
                      };
                      const updated = [...sectionsList, newSec];
                      setFormData(prev => ({ ...prev, termsSections: updated }));
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
                            setFormData(prev => ({ ...prev, termsSections: updated }));
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
                              setFormData(prev => ({ ...prev, termsSections: updated }));
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
                              setFormData(prev => ({ ...prev, termsSections: updated }));
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
                            setFormData(prev => ({ ...prev, termsSections: updated }));
                          }}
                          placeholder="e.g. Standard payment milestones are:"
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
                            setFormData(prev => ({ ...prev, termsSections: updated }));
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
                            setFormData(prev => ({ ...prev, termsSections: updated }));
                          }}
                          placeholder="Enter each bullet point on a new line..."
                        />
                      </div>
                    </div>
                  ))}

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('termsSections', formData.termsSections || defaultTermsSections)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Terms & Conditions Content
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

    </>
  );
}
