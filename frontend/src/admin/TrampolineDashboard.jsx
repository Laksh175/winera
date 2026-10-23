import React from 'react';
import { Upload } from 'lucide-react';
import RichTextareaWithEditor from '../components/RichTextareaWithEditor';
import { uploadImageFile } from '../services/api';

const trampolineParkBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345688/winera_uploads/nri2vtjcndonajowvvqw.png";
const trampolineMobileHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345500/winera_uploads/dkzoc8fluvnby5coqgjp.png";
const trampolineParkImg1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345688/winera_uploads/gy34ivaldlm7ia55iwci.png";
const trampolineParkImg2 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345688/winera_uploads/za8k8euyryqqt3r7xsbw.png";
const trampolineImg3 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345688/winera_uploads/qhy9p0wnfrckyk0balq8.png";
const tampolineImg5 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345686/winera_uploads/ceb9kp4t9y89jdwmc01v.png";
const tampolineImage6 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345686/winera_uploads/yxrlmzeeordrutqtvbcj.png";
const trampolineParkCtaBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345688/winera_uploads/l1grqnreps9stov1wrta.png";

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

const defaultTrampolineHero = {
  bgUrl: trampolineParkBg,
  bgAlt: 'Commercial Trampoline Park Manufacturer & Setup - Winera International',
  mobileBgUrl: trampolineMobileHeroBg,
  mobileBgAlt: 'Commercial Trampoline Park Mobile Banner - Winera International',
  breadcrumbText: 'Trampoline Park'
};

const defaultTrampolineIntro = {
  title: 'Trampoline Park *Manufacturer in India*',
  desc: "India's trusted trampoline park manufacturer safety-certified equipment, custom-designed layouts, and installed by our own team across India.",
  buttonText: 'Get Quote From Expert',
  buttonLink: 'https://wa.me/919157873576',
  waMessage: 'Hello Winera International! I want to get a quote and design details for a Trampoline Park setup. Please share details. [Ref: Trampoline Park Page]',
  mainImgUrl: trampolineParkImg1
};

const defaultTrampolineCustom = {
  title1: 'Custom Trampoline Parks',
  title2: 'by Winera',
  title3: 'International',
  paragraph: "At Winera International, we specialize in creating custom-built trampoline parks tailored to your space, budget, and activity preferences. As a leading trampoline manufacturer in India we ensure top-quality design, safety, and durability in every project. Whether you're envisioning a compact jump zone or a large-scale interactive entertainment center, we are the trampoline park manufacturer that delivers complete turnkey solutions to bring your vision to life. We have been designing and supplying commercial trampoline parks for malls, hotels, schools, resorts, and family entertainment centres since 2014.",
  imgUrl: trampolineParkImg2
};

const defaultTrampolineSpecs = {
  title: '*Technical* Specifications',
  bgUrl: trampolineImg3,
  imgUrl: trampolineImg3,
  buttonText: 'Download Our Brochure',
  buttonLink: '/pdf/Trampoline Catalogue.pdf',
  specsData: [
    { label: "Minimum space required", value: "2,000 sq ft" },
    { label: "Ceiling height required", value: "4.5 m minimum" },
    { label: "Weight capacity", value: "150 kg per mat" },
    { label: "Frame", value: "Hot-dip galvanized steel" },
    { label: "Jump mats", value: "UV-stabilized polypropylene mesh" },
    { label: "Springs", value: "Zinc-coated carbon steel" },
    { label: "Expected lifespan", value: "8–12 years" }
  ]
};

const defaultTrampolineInside = {
  title: '*What is inside a* custom<br />trampoline park?',
  subtitle: 'A Winera trampoline park is built around your available space and visitor profile. Below are the zones you can include each can be combined in any configuration based on your floor area and budget.',
  zones: [
    {
      id: "free-jump",
      name: "Free Jump Zones",
      title: "Free Jump Zones",
      desc: "Free jump zones are open trampoline areas where visitors of all ages jump freely without restrictions. They are the primary attraction of any trampoline park — simple to supervise, high throughput, and effective at keeping visitors active throughout their session. Suitable for all age groups from 3 years upward.",
      img: "https://res.cloudinary.com/achfsmlm/image/upload/v1792386747/winera_trampoline_park/yknrmsmvy1aacscicymv.jpg"
    },
    {
      id: "dunk-hoops",
      name: "Dunk Hoops",
      title: "Dunk Hoops",
      desc: "Dunk hoops are basketball hoops mounted above trampolines so visitors can jump and slam-dunk — something impossible at standard court height. A consistently popular zone with teenagers and young adults that extends session time. Low maintenance and easy to integrate into any free jump area.",
      img: "https://res.cloudinary.com/achfsmlm/image/upload/v1792386746/winera_trampoline_park/u0hyusapnoejpkit0xho.webp"
    },
    {
      id: "zip-line",
      name: "Zip Line",
      title: "Zip Line",
      desc: "An indoor zip line where visitors glide from an elevated platform to a foam landing pit. The zip line is an aerial experience that most standard trampoline parks do not include, making it a strong differentiator for venues wanting a premium attraction mix. Suitable for visitors aged 6 and above.",
      img: "https://res.cloudinary.com/achfsmlm/image/upload/v1792386748/winera_trampoline_park/o0pgd5vemckew8ki1xxo.jpg"
    },
    {
      id: "obstacle-courts",
      name: "Obstacle Courts",
      title: "Obstacle Courts",
      desc: "Obstacle courts are connected physical challenge courses built across trampoline surfaces jumping, dodging, climbing, and balancing in a single run. They work particularly well for school group bookings, birthday parties, and corporate team events, where structured activity rather than open jumping is preferred.",
      img: "https://res.cloudinary.com/achfsmlm/image/upload/v1792386748/winera_trampoline_park/ridg0hj2y1xy6vwgyrsj.webp"
    },
    {
      id: "air-bags",
      name: "Air Bags",
      title: "Air Bags",
      desc: "Large soft inflatable bags where visitors land after jumping from a height. Safe and exciting visitors can try flips and aerial jumps without worrying about hard landings. Very popular with teenagers.",
      img: "https://res.cloudinary.com/achfsmlm/image/upload/v1792386744/winera_trampoline_park/udv5wncmkw7oav7berkx.webp"
    },
    {
      id: "climbing-wall",
      name: "Climbing Wall",
      title: "Climbing Wall",
      desc: "Indoor climbing walls where visitors use fixed grips to climb to the top. Winera International is a trusted Climbing Wall Manufacturer in India — offering options from beginner-friendly bouldering walls to more challenging rope climb routes, suitable for all ages and fitness levels.",
      img: "https://res.cloudinary.com/achfsmlm/image/upload/v1792386745/winera_trampoline_park/wgd3f1fult5ojkvwpuy5.jpg"
    },
    {
      id: "ninja-courses",
      name: "Ninja Courses",
      title: "Ninja Courses",
      desc: "A set of physical obstacles warped walls, balance beams, hanging bars, rope bridges, and timed speed courses. Winera International is a leading Ninja Course Equipment Manufacturer in India, designing courses for ages 6 and above. Visitors come back again and again to beat their own time and improve their skills.",
      img: "https://res.cloudinary.com/achfsmlm/image/upload/v1792386750/winera_trampoline_park/cle2bmqr4wyb7b4ancgt.webp"
    },
    {
      id: "foam-cubes",
      name: "Foam Cubes",
      title: "Foam Cubes",
      desc: "A large pit filled with soft foam cubes where visitors jump in and land safely. One of the most popular attractions is that children especially love it and tend to spend more time here than any other zone.",
      img: "https://res.cloudinary.com/achfsmlm/image/upload/v1792386749/winera_trampoline_park/goz913jmxtrozb7ha3tx.webp"
    }
  ]
};

const defaultTrampolineRoi = {
  title: 'What Will Your *Trampoline<br />Park Actually Earn?*',
  subtitle: 'Most trampoline park suppliers in India send a price list and wait for you to decide.',
  paragraph1: "As India's ROI-First Game Zone Developer, Winera International works differently. Before a single design is drawn, our team prepares a complete ROI report for your specific venue covering your exact trampoline park setup cost, projected daily footfall, estimated monthly revenue, maintenance costs, and break-even timeline. Every figure is calculated around your location, your venue type, and your visitor profile, not an industry average.",
  paragraph2: "Very few indoor trampoline park suppliers in India include this as a standard part of their process. For Winera, the ROI report is not an add-on, it is how every project starts.",
  buttonText: 'Talk to an ROI Expert',
  buttonLink: 'https://wa.me/919157873576',
  waMessage: 'Hello Winera International! I want to talk to an ROI Expert for Trampoline Park setup & commercial ROI calculation. Please share details. [Ref: Trampoline Park Page]',
  imgUrl: tampolineImage6
};

const defaultTrampolineWhyChoose = {
  title: 'Why Choose *Winera International*',
  items: [
    { title: "Premium Quality", desc: "Commercial-Grade Materials Built To Survive Years Of Heavy Daily Jumping." },
    { title: "Safety First", desc: "Foam-Padded Frames, Safety Nets, And Certified Equipment On Every Build." },
    { title: "Custom Solutions", desc: "Layouts And Zone Mixes Designed Around Your Space, Budget, And Visitors." },
    { title: "Competitive Pricing", desc: "Factory-Direct Pricing With No Distributor Markup, Plus A Free ROI Report." },
    { title: "Prompt Delivery", desc: "Manufactured In-House And Installed On Schedule By Our Own Team." }
  ]
};

const defaultTrampolineFaqs = [
  {
    q: "Why does Winera International stand out as the best trampoline park manufacturer in India?",
    a: "Winera International manufactures every trampoline park in-house, offers a free ROI report before every project, and installs across 50+ cities through our own team, not a third-party contractor. One partner, from 3D design to after-sales support."
  },
  {
    q: "What is the trampoline park setup cost in India?",
    a: "Trampoline park setup cost in India depends on the facility size, number of attractions, and materials selected. Winera provides a complete cost breakdown — equipment, installation, and maintenance — before confirming any project. Contact our team for a quote specific to your space."
  },
  {
    q: "Is a trampoline park a profitable business in India?",
    a: "Yes, when located in a suitable venue with the right zone mix and pricing model. Trampoline parks generate revenue through entry fees, birthday party packages, school group bookings, corporate events, and membership plans. Winera prepares a free ROI report before every project showing your specific venue's projected daily capacity, estimated monthly revenue, and break-even timeline."
  },
  {
    q: "What licenses or permissions are required to open a trampoline park in India?",
    a: "Requirements vary by state and municipality but typically include a trade license, fire safety NOC, building use permission, and public liability insurance. Winera's team can guide you on general requirements based on your city and consult a local legal advisor for state-specific compliance."
  },
  {
    q: "What maintenance does a commercial trampoline park require?",
    a: "Winera trampoline parks are designed for 8–12 years of commercial operation with regular maintenance. Routine checks include: jump mat tension and condition, spring integrity, foam padding wear, safety net inspection, and frame connection points. A standard maintenance schedule and checklist is provided with every installation. Annual professional servicing is recommended."
  },
  {
    q: "What is the ideal target audience for a trampoline park in India?",
    a: "Children aged 5–15 years form the core audience, but modern trampoline parks increasingly serve teenagers, young adults, and corporate groups through ninja courses, dodgeball arenas, and team-building packages — making them viable for a much wider demographic than traditional play zones."
  }
];

const defaultTrampolineCta = {
  titleLine1: "Plan Your Trampoline",
  titleLine2: "Park With Winera",
  descLine1: "Our team will assess your venue, prepare a free ROI report, and",
  descLine2: "recommend the right zone mix for your space.",
  buttonText: "Get Quote Now",
  buttonLink: "https://wa.me/919157873576",
  bgUrl: trampolineParkCtaBg
};

export default function TrampolineDashboard({
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
          {activeSection === 'trampolineHero' && (() => {
            const currentSec = formData.trampolineHero || defaultTrampolineHero;
            const heroImg = currentSec.bgUrl || defaultTrampolineHero.bgUrl;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Trampoline Park Hero Banner</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Hero Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={getAdminValidImageUrl(heroImg, trampolineParkBg)} alt="Hero Preview" style={{ width: '120px', height: '65px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.bgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineHero: { ...(prev.trampolineHero || defaultTrampolineHero), bgUrl: e.target.value } }))}
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
                              setFormData(prev => ({ ...prev, trampolineHero: { ...(prev.trampolineHero || defaultTrampolineHero), bgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                      {currentSec.bgUrl && (
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, trampolineHero: { ...(prev.trampolineHero || defaultTrampolineHero), bgUrl: '' } }))}
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
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineHero: { ...(prev.trampolineHero || defaultTrampolineHero), bgAlt: e.target.value } }))}
                        placeholder="e.g. Commercial Trampoline Park Setup & Equipment - Winera"
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
                        src={getAdminValidImageUrl(currentSec.mobileBgUrl, trampolineMobileHeroBg)}
                        alt="Mobile Hero Preview"
                        style={{ width: '120px', height: '65px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                      />
                      <input
                        type="text"
                        value={currentSec.mobileBgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineHero: { ...(prev.trampolineHero || defaultTrampolineHero), mobileBgUrl: e.target.value } }))}
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
                              setFormData(prev => ({ ...prev, trampolineHero: { ...(prev.trampolineHero || defaultTrampolineHero), mobileBgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                      {currentSec.mobileBgUrl && (
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, trampolineHero: { ...(prev.trampolineHero || defaultTrampolineHero), mobileBgUrl: '' } }))}
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
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineHero: { ...(prev.trampolineHero || defaultTrampolineHero), mobileBgAlt: e.target.value } }))}
                        placeholder="e.g. Commercial Trampoline Park Setup Mobile Banner - Winera International"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Breadcrumb Active Page Text</label>
                    <input
                      type="text"
                      value={currentSec.breadcrumbText !== undefined ? currentSec.breadcrumbText : defaultTrampolineHero.breadcrumbText}
                      onChange={(e) => setFormData(prev => ({ ...prev, trampolineHero: { ...(prev.trampolineHero || defaultTrampolineHero), breadcrumbText: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('trampolineHero', formData.trampolineHero || defaultTrampolineHero)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Hero Banner
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* TRAMPOLINE INTRO FORM */}
          {activeSection === 'trampolineIntro' && (() => {
            const currentSec = formData.trampolineIntro || defaultTrampolineIntro;
            const mainImg = currentSec.mainImgUrl || defaultTrampolineIntro.mainImgUrl;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Trampoline Park Manufacturer Intro Section</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Section Title (*word* for cyan, &lt;br/&gt; for linebreaks)</label>
                    <input
                      type="text"
                      value={currentSec.title !== undefined ? currentSec.title : defaultTrampolineIntro.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, trampolineIntro: { ...(prev.trampolineIntro || defaultTrampolineIntro), title: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <RichTextareaWithEditor
                      label="Description Paragraph"
                      rows={3}
                      value={currentSec.desc !== undefined ? currentSec.desc : defaultTrampolineIntro.desc}
                      onChange={(val) => setFormData(prev => ({ ...prev, trampolineIntro: { ...(prev.trampolineIntro || defaultTrampolineIntro), desc: val } }))}
                      placeholder="Enter description paragraph..."
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                      <input
                        type="text"
                        value={currentSec.buttonText !== undefined ? currentSec.buttonText : defaultTrampolineIntro.buttonText}
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineIntro: { ...(prev.trampolineIntro || defaultTrampolineIntro), buttonText: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                      <input
                        type="text"
                        value={(currentSec.buttonLink && currentSec.buttonLink.split('?')[0]) || defaultTrampolineIntro.buttonLink}
                        onChange={(e) => {
                          const baseLink = e.target.value;
                          const msg = currentSec.waMessage || "Hello Winera International! I want to get a quote and design details for a Trampoline Park setup. Please share details. [Ref: Trampoline Park Page]";
                          const updatedLink = msg ? `${baseLink.split('?')[0]}?text=${encodeURIComponent(msg)}` : baseLink;
                          setFormData(prev => ({ ...prev, trampolineIntro: { ...(prev.trampolineIntro || defaultTrampolineIntro), buttonLink: updatedLink } }));
                        }}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
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
                        if (currentSec.waMessage !== undefined && currentSec.waMessage !== '') return currentSec.waMessage;
                        if (currentSec.buttonLink && currentSec.buttonLink.includes('text=')) {
                          try {
                            const match = currentSec.buttonLink.match(/text=([^&]+)/);
                            if (match && match[1]) return decodeURIComponent(match[1]);
                          } catch (err) { }
                        }
                        return "Hello Winera International! I want to get a quote and design details for a Trampoline Park setup. Please share details. [Ref: Trampoline Park Page]";
                      })()}
                      onChange={(e) => {
                        const newMsg = e.target.value;
                        const baseLink = (currentSec.buttonLink && currentSec.buttonLink.split('?')[0]) || defaultTrampolineIntro.buttonLink;
                        const updatedLink = newMsg ? `${baseLink}?text=${encodeURIComponent(newMsg)}` : baseLink;
                        setFormData(prev => ({
                          ...prev,
                          trampolineIntro: {
                            ...(prev.trampolineIntro || defaultTrampolineIntro),
                            waMessage: newMsg,
                            buttonLink: updatedLink
                          }
                        }));
                      }}
                      placeholder="e.g. Hello Winera International! I want to get a quote..."
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontWeight: '500', lineHeight: 1.5 }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Main Graphic Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={getAdminValidImageUrl(mainImg, trampolineParkImg1)} alt="Graphic Preview" style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.mainImgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineIntro: { ...(prev.trampolineIntro || defaultTrampolineIntro), mainImgUrl: e.target.value } }))}
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
                              setFormData(prev => ({ ...prev, trampolineIntro: { ...(prev.trampolineIntro || defaultTrampolineIntro), mainImgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                        🏷️ Main Graphic Alt Text (SEO Keyword)
                      </label>
                      <input
                        type="text"
                        value={currentSec.mainImgAlt || currentSec.imgAlt || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineIntro: { ...(prev.trampolineIntro || defaultTrampolineIntro), mainImgAlt: e.target.value } }))}
                        placeholder="e.g. Trampoline Park Manufacturer in India - Winera International"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('trampolineIntro', formData.trampolineIntro || defaultTrampolineIntro)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Intro Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* TRAMPOLINE CUSTOM FORM */}
          {activeSection === 'trampolineCustom' && (() => {
            const currentSec = formData.trampolineCustom || defaultTrampolineCustom;
            const mascotImg = currentSec.imgUrl || defaultTrampolineCustom.imgUrl;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Custom Trampoline Parks Section</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Part 1 (Black)</label>
                      <input
                        type="text"
                        value={currentSec.title1 !== undefined ? currentSec.title1 : defaultTrampolineCustom.title1}
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineCustom: { ...(prev.trampolineCustom || defaultTrampolineCustom), title1: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Part 2 (Cyan)</label>
                      <input
                        type="text"
                        value={currentSec.title2 !== undefined ? currentSec.title2 : defaultTrampolineCustom.title2}
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineCustom: { ...(prev.trampolineCustom || defaultTrampolineCustom), title2: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Part 3 (Cyan Line 2)</label>
                      <input
                        type="text"
                        value={currentSec.title3 !== undefined ? currentSec.title3 : defaultTrampolineCustom.title3}
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineCustom: { ...(prev.trampolineCustom || defaultTrampolineCustom), title3: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                  <div>
                    <RichTextareaWithEditor
                      label="Paragraph Content"
                      rows={4}
                      value={currentSec.paragraph !== undefined ? currentSec.paragraph : defaultTrampolineCustom.paragraph}
                      onChange={(val) => setFormData(prev => ({ ...prev, trampolineCustom: { ...(prev.trampolineCustom || defaultTrampolineCustom), paragraph: val } }))}
                      placeholder="Enter paragraph content..."
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Panda Mascot / Graphic Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 500 × 500 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={getAdminValidImageUrl(mascotImg, trampolineParkImg2)} alt="Mascot Preview" style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.imgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineCustom: { ...(prev.trampolineCustom || defaultTrampolineCustom), imgUrl: e.target.value } }))}
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
                              setFormData(prev => ({ ...prev, trampolineCustom: { ...(prev.trampolineCustom || defaultTrampolineCustom), imgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                        🏷️ Panda Mascot Graphic Alt Text (SEO Keyword)
                      </label>
                      <input
                        type="text"
                        value={currentSec.imgAlt || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineCustom: { ...(prev.trampolineCustom || defaultTrampolineCustom), imgAlt: e.target.value } }))}
                        placeholder="e.g. Custom Trampoline Parks Setup Mascot - Winera"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('trampolineCustom', formData.trampolineCustom || defaultTrampolineCustom)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Custom Parks Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* TRAMPOLINE SPECS FORM */}
          {activeSection === 'trampolineSpecs' && (() => {
            const currentSec = formData.trampolineSpecs || defaultTrampolineSpecs;
            const specsList = currentSec.specsData || defaultTrampolineSpecs.specsData;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Technical Specifications Card</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Specs Card Title (*word* for yellow highlight)</label>
                    <input
                      type="text"
                      value={currentSec.title !== undefined ? currentSec.title : defaultTrampolineSpecs.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, trampolineSpecs: { ...(prev.trampolineSpecs || defaultTrampolineSpecs), title: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <label style={{ fontSize: '12.5px', fontWeight: '800', color: '#0f172a' }}>Specifications Table Rows ({specsList.length})</label>
                      <button
                        onClick={() => {
                          const updatedRows = [...specsList, { label: 'New Parameter', value: 'Details here' }];
                          setFormData(prev => ({ ...prev, trampolineSpecs: { ...(prev.trampolineSpecs || defaultTrampolineSpecs), specsData: updatedRows } }));
                        }}
                        style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}
                      >
                        + Add Spec Row
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {specsList.map((row, idx) => (
                        <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 40px', gap: '10px', alignItems: 'center' }}>
                          <input
                            type="text"
                            value={row.label}
                            onChange={(e) => {
                              const updatedRows = [...specsList];
                              updatedRows[idx] = { ...updatedRows[idx], label: e.target.value };
                              setFormData(prev => ({ ...prev, trampolineSpecs: { ...(prev.trampolineSpecs || defaultTrampolineSpecs), specsData: updatedRows } }));
                            }}
                            placeholder="Label (e.g. Frame)"
                            style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                          />
                          <input
                            type="text"
                            value={row.value}
                            onChange={(e) => {
                              const updatedRows = [...specsList];
                              updatedRows[idx] = { ...updatedRows[idx], value: e.target.value };
                              setFormData(prev => ({ ...prev, trampolineSpecs: { ...(prev.trampolineSpecs || defaultTrampolineSpecs), specsData: updatedRows } }));
                            }}
                            placeholder="Specification detail"
                            style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                          />
                          <button
                            onClick={async () => {
                              const updatedRows = specsList.filter((_, i) => i !== idx);
                              const updatedSec = { ...(formData.trampolineSpecs || defaultTrampolineSpecs), specsData: updatedRows };
                              setFormData(prev => ({ ...prev, trampolineSpecs: updatedSec }));
                              await persistSectionToDatabase('trampolineSpecs', updatedSec);
                            }}
                            style={{ background: '#fef2f2', color: '#dc2626', border: 'none', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', fontWeight: '800' }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Background Image Upload */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Card Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1200 × 600 px (2:1)</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={getAdminValidImageUrl(currentSec.bgUrl || currentSec.imgUrl, trampolineImg3)} alt="Specs Preview" style={{ width: '120px', height: '65px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.bgUrl || currentSec.imgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineSpecs: { ...(prev.trampolineSpecs || defaultTrampolineSpecs), bgUrl: e.target.value, imgUrl: e.target.value } }))}
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
                              setFormData(prev => ({ ...prev, trampolineSpecs: { ...(prev.trampolineSpecs || defaultTrampolineSpecs), bgUrl: res.url, imgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                        🏷️ Card Background Alt Text (SEO Keyword)
                      </label>
                      <input
                        type="text"
                        value={currentSec.bgAlt || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineSpecs: { ...(prev.trampolineSpecs || defaultTrampolineSpecs), bgAlt: e.target.value } }))}
                        placeholder="e.g. Technical Specifications Trampoline Park Equipment - Winera"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>

                  {/* Action Button Controls for Specs */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                      <input
                        type="text"
                        value={currentSec.buttonText !== undefined ? currentSec.buttonText : 'Download Our Brochure'}
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineSpecs: { ...(prev.trampolineSpecs || defaultTrampolineSpecs), buttonText: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Brochure PDF File / Link URL</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          value={currentSec.buttonLink !== undefined ? currentSec.buttonLink : (currentSec.brochureLink || defaultTrampolineSpecs.buttonLink)}
                          onChange={(e) => setFormData(prev => ({ ...prev, trampolineSpecs: { ...(prev.trampolineSpecs || defaultTrampolineSpecs), buttonLink: e.target.value } }))}
                          placeholder="e.g. /uploads/trampoline_brochure.pdf"
                          style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                        />
                        <label style={{ background: '#38bdf8', color: '#fff', padding: '12px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '12.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                          <Upload style={{ width: '15px', height: '15px' }} /> Upload PDF
                          <input
                            type="file"
                            accept="application/pdf,.pdf"
                            onChange={(e) => handleBrochureUpload(e, 'trampolineSpecs', 'buttonLink', {}, defaultTrampolineSpecs)}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </div>
                      <div style={{ marginTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>
                          💡 Cloudinary Free plan limit: <strong>10 MB</strong> (Allows larger files automatically with a Cloudinary Pro plan). Compress via <a href="https://www.ilovepdf.com/compress_pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#0284c7', textDecoration: 'underline', fontWeight: '700' }}>iLovePDF</a> if needed.
                        </span>
                        {(() => {
                          const activePdf = currentSec.buttonLink !== undefined ? currentSec.buttonLink : (currentSec.brochureLink || defaultTrampolineSpecs.buttonLink);
                          return activePdf && activePdf !== '#' ? (
                            <a
                              href={activePdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ fontSize: '11.5px', color: '#0284c7', fontWeight: '700', textDecoration: 'underline' }}
                            >
                              📄 Test & Preview Trampoline Brochure
                            </a>
                          ) : null;
                        })()}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('trampolineSpecs', formData.trampolineSpecs || defaultTrampolineSpecs)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Technical Specifications
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* TRAMPOLINE INSIDE ZONES FORM */}
          {activeSection === 'trampolineInside' && (() => {
            const currentSec = formData.trampolineInside || defaultTrampolineInside;
            const zonesList = Array.isArray(currentSec.zones) ? currentSec.zones : defaultTrampolineInside.zones;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>What is inside a Custom Trampoline Park (Zones Carousel)</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Section Title (*word* for cyan, &lt;br/&gt; for linebreaks)</label>
                    <input
                      type="text"
                      value={currentSec.title !== undefined ? currentSec.title : defaultTrampolineInside.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, trampolineInside: { ...(prev.trampolineInside || defaultTrampolineInside), title: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <RichTextareaWithEditor
                      label="Subtitle"
                      rows={2}
                      value={currentSec.subtitle !== undefined ? currentSec.subtitle : defaultTrampolineInside.subtitle}
                      onChange={(val) => setFormData(prev => ({ ...prev, trampolineInside: { ...(prev.trampolineInside || defaultTrampolineInside), subtitle: val } }))}
                      placeholder="Enter subtitle..."
                    />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <label style={{ fontSize: '12.5px', fontWeight: '800', color: '#0f172a' }}>
                        Park Attractions & Zones ({zonesList.length}) <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Card Image: 600 × 400 px (3:2)</span>
                      </label>
                      <button
                        onClick={() => {
                          const updated = [...zonesList, { id: `zone-${Date.now()}`, name: 'New Zone', title: 'New Zone', desc: 'Zone description here.', img: tampolineImg5 }];
                          setFormData(prev => ({ ...prev, trampolineInside: { ...(prev.trampolineInside || defaultTrampolineInside), zones: updated } }));
                        }}
                        style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}
                      >
                        + Add Zone Card
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {zonesList.map((z, idx) => {
                        const zoneCloudMap = {
                          'free-jump': 'https://res.cloudinary.com/achfsmlm/image/upload/v1792386747/winera_trampoline_park/yknrmsmvy1aacscicymv.jpg',
                          'free jump zones': 'https://res.cloudinary.com/achfsmlm/image/upload/v1792386747/winera_trampoline_park/yknrmsmvy1aacscicymv.jpg',
                          'dunk-hoops': 'https://res.cloudinary.com/achfsmlm/image/upload/v1792386746/winera_trampoline_park/u0hyusapnoejpkit0xho.webp',
                          'dunk hoops': 'https://res.cloudinary.com/achfsmlm/image/upload/v1792386746/winera_trampoline_park/u0hyusapnoejpkit0xho.webp',
                          'zip-line': 'https://res.cloudinary.com/achfsmlm/image/upload/v1792386748/winera_trampoline_park/o0pgd5vemckew8ki1xxo.jpg',
                          'zip line': 'https://res.cloudinary.com/achfsmlm/image/upload/v1792386748/winera_trampoline_park/o0pgd5vemckew8ki1xxo.jpg',
                          'obstacle-courts': 'https://res.cloudinary.com/achfsmlm/image/upload/v1792386748/winera_trampoline_park/ridg0hj2y1xy6vwgyrsj.webp',
                          'obstacle courts': 'https://res.cloudinary.com/achfsmlm/image/upload/v1792386748/winera_trampoline_park/ridg0hj2y1xy6vwgyrsj.webp',
                          'air-bags': 'https://res.cloudinary.com/achfsmlm/image/upload/v1792386744/winera_trampoline_park/udv5wncmkw7oav7berkx.webp',
                          'air bags': 'https://res.cloudinary.com/achfsmlm/image/upload/v1792386744/winera_trampoline_park/udv5wncmkw7oav7berkx.webp',
                          'climbing-wall': 'https://res.cloudinary.com/achfsmlm/image/upload/v1792386745/winera_trampoline_park/wgd3f1fult5ojkvwpuy5.jpg',
                          'climbing wall': 'https://res.cloudinary.com/achfsmlm/image/upload/v1792386745/winera_trampoline_park/wgd3f1fult5ojkvwpuy5.jpg',
                          'ninja-courses': 'https://res.cloudinary.com/achfsmlm/image/upload/v1792386750/winera_trampoline_park/cle2bmqr4wyb7b4ancgt.webp',
                          'ninja courses': 'https://res.cloudinary.com/achfsmlm/image/upload/v1792386750/winera_trampoline_park/cle2bmqr4wyb7b4ancgt.webp',
                          'foam-cubes': 'https://res.cloudinary.com/achfsmlm/image/upload/v1792386749/winera_trampoline_park/goz913jmxtrozb7ha3tx.webp',
                          'foam cubes': 'https://res.cloudinary.com/achfsmlm/image/upload/v1792386749/winera_trampoline_park/goz913jmxtrozb7ha3tx.webp'
                        };
                        const idKey = (z.id || '').toLowerCase().trim();
                        const titleKey = (z.name || z.title || '').toLowerCase().trim();
                        const defaultImgForZone = zoneCloudMap[idKey] || zoneCloudMap[titleKey] || defaultTrampolineInside.zones[idx]?.img || tampolineImg5;
                        const effectiveImg = (z.img && !z.img.includes('tampoline-img-5') && !z.img.includes('/src/assets/')) ? z.img : defaultImgForZone;

                        return (
                          <div key={idx} style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontWeight: '800', fontSize: '13px', color: '#0284c7' }}>Zone #{idx + 1} Tab: {z.name || z.title}</span>
                              <button
                                onClick={async () => {
                                  const updated = zonesList.filter((_, i) => i !== idx);
                                  const updatedSec = { ...(formData.trampolineInside || defaultTrampolineInside), zones: updated };
                                  setFormData(prev => ({ ...prev, trampolineInside: updatedSec }));
                                  await persistSectionToDatabase('trampolineInside', updatedSec);
                                }}
                                style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '800', fontSize: '12px' }}
                              >
                                Delete Zone
                              </button>
                            </div>
                            <input
                              type="text"
                              value={z.name || z.title || ''}
                              onChange={(e) => {
                                const updated = [...zonesList];
                                updated[idx] = { ...updated[idx], name: e.target.value, title: e.target.value };
                                setFormData(prev => ({ ...prev, trampolineInside: { ...(prev.trampolineInside || defaultTrampolineInside), zones: updated } }));
                              }}
                              placeholder="Zone Name (e.g. Free Jump Zones)"
                              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', width: '100%', fontWeight: '700' }}
                            />
                            <RichTextareaWithEditor
                              label="Zone Description"
                              rows={3}
                              value={z.desc}
                              onChange={(val) => {
                                const updated = [...zonesList];
                                updated[idx] = { ...updated[idx], desc: val };
                                setFormData(prev => ({ ...prev, trampolineInside: { ...(prev.trampolineInside || defaultTrampolineInside), zones: updated } }));
                              }}
                              placeholder="Zone Description"
                            />
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                              <img src={getAdminValidImageUrl(effectiveImg, tampolineImg5)} alt="" style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                              <input
                                type="text"
                                value={effectiveImg}
                                onChange={(e) => {
                                  const updated = [...zonesList];
                                  updated[idx] = { ...updated[idx], img: e.target.value };
                                  setFormData(prev => ({ ...prev, trampolineInside: { ...(prev.trampolineInside || defaultTrampolineInside), zones: updated } }));
                                }}
                                placeholder="Image URL or Asset Path"
                                style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                              />
                              <label style={{ background: '#38bdf8', color: '#fff', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <Upload style={{ width: '14px', height: '14px' }} /> Upload
                                <input
                                  type="file"
                                  accept="image/*"
                                  style={{ display: 'none' }}
                                  onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      const res = await uploadImageFile(file, admin.token);
                                      const updated = [...zonesList];
                                      updated[idx] = { ...updated[idx], img: res.url };
                                      setFormData(prev => ({ ...prev, trampolineInside: { ...(prev.trampolineInside || defaultTrampolineInside), zones: updated } }));
                                    }
                                  }}
                                />
                              </label>
                            </div>
                            <div style={{ marginTop: '4px' }}>
                              <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '3px' }}>
                                🏷️ Zone Card Alt Text (SEO Keyword)
                              </label>
                              <input
                                type="text"
                                value={z.imgAlt || ''}
                                onChange={(e) => {
                                  const updated = [...zonesList];
                                  updated[idx] = { ...updated[idx], imgAlt: e.target.value };
                                  setFormData(prev => ({ ...prev, trampolineInside: { ...(prev.trampolineInside || defaultTrampolineInside), zones: updated } }));
                                }}
                                placeholder="e.g. Free Jump Zones Commercial Trampoline Setup - Winera"
                                style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('trampolineInside', formData.trampolineInside || defaultTrampolineInside)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Park Zones Carousel
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* TRAMPOLINE ROI FORM */}
          {activeSection === 'trampolineRoi' && (() => {
            const currentSec = formData.trampolineRoi || defaultTrampolineRoi;
            const mainImg = currentSec.imgUrl || defaultTrampolineRoi.imgUrl;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>What Will Your Trampoline Park Earn (ROI Section)</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Section Title (*word* for cyan highlight, &lt;br/&gt; for linebreak)</label>
                    <input
                      type="text"
                      value={currentSec.title !== undefined ? currentSec.title : defaultTrampolineRoi.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, trampolineRoi: { ...(prev.trampolineRoi || defaultTrampolineRoi), title: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Subtitle</label>
                    <input
                      type="text"
                      value={currentSec.subtitle !== undefined ? currentSec.subtitle : defaultTrampolineRoi.subtitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, trampolineRoi: { ...(prev.trampolineRoi || defaultTrampolineRoi), subtitle: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <RichTextareaWithEditor
                      label="Paragraph 1"
                      rows={3}
                      value={currentSec.paragraph1 !== undefined ? currentSec.paragraph1 : defaultTrampolineRoi.paragraph1}
                      onChange={(val) => setFormData(prev => ({ ...prev, trampolineRoi: { ...(prev.trampolineRoi || defaultTrampolineRoi), paragraph1: val } }))}
                      placeholder="Enter Paragraph 1..."
                    />
                  </div>
                  <div>
                    <RichTextareaWithEditor
                      label="Paragraph 2"
                      rows={3}
                      value={currentSec.paragraph2 !== undefined ? currentSec.paragraph2 : defaultTrampolineRoi.paragraph2}
                      onChange={(val) => setFormData(prev => ({ ...prev, trampolineRoi: { ...(prev.trampolineRoi || defaultTrampolineRoi), paragraph2: val } }))}
                      placeholder="Enter Paragraph 2..."
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                      <input
                        type="text"
                        value={currentSec.buttonText !== undefined ? currentSec.buttonText : defaultTrampolineRoi.buttonText}
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineRoi: { ...(prev.trampolineRoi || defaultTrampolineRoi), buttonText: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                      <input
                        type="text"
                        value={(currentSec.buttonLink && currentSec.buttonLink.split('?')[0]) || defaultTrampolineRoi.buttonLink}
                        onChange={(e) => {
                          const baseLink = e.target.value;
                          const msg = currentSec.waMessage || "Hello Winera International! I want to talk to an ROI Expert for Trampoline Park setup & commercial ROI calculation. Please share details. [Ref: Trampoline Park Page]";
                          const updatedLink = msg ? `${baseLink.split('?')[0]}?text=${encodeURIComponent(msg)}` : baseLink;
                          setFormData(prev => ({ ...prev, trampolineRoi: { ...(prev.trampolineRoi || defaultTrampolineRoi), buttonLink: updatedLink } }));
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
                        return "Hello Winera International! I want to talk to an ROI Expert for Trampoline Park setup & commercial ROI calculation. Please share details. [Ref: Trampoline Park Page]";
                      })()}
                      onChange={(e) => {
                        const newMsg = e.target.value;
                        const baseLink = (currentSec.buttonLink && currentSec.buttonLink.split('?')[0]) || defaultTrampolineRoi.buttonLink;
                        const updatedLink = newMsg ? `${baseLink}?text=${encodeURIComponent(newMsg)}` : baseLink;
                        setFormData(prev => ({
                          ...prev,
                          trampolineRoi: {
                            ...(prev.trampolineRoi || defaultTrampolineRoi),
                            waMessage: newMsg,
                            buttonLink: updatedLink
                          }
                        }));
                      }}
                      placeholder="e.g. Hello Winera International! I want to talk to an ROI Expert..."
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontWeight: '500', lineHeight: 1.5 }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Right Image Graphic <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 400 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={getAdminValidImageUrl(mainImg, tampolineImage6)} alt="Graphic Preview" style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.imgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineRoi: { ...(prev.trampolineRoi || defaultTrampolineRoi), imgUrl: e.target.value } }))}
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
                              setFormData(prev => ({ ...prev, trampolineRoi: { ...(prev.trampolineRoi || defaultTrampolineRoi), imgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                        🏷️ Right Image Graphic Alt Text (SEO Keyword)
                      </label>
                      <input
                        type="text"
                        value={currentSec.imgAlt || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineRoi: { ...(prev.trampolineRoi || defaultTrampolineRoi), imgAlt: e.target.value } }))}
                        placeholder="e.g. Trampoline Park ROI Report - Winera Turnkey Setup"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('trampolineRoi', formData.trampolineRoi || defaultTrampolineRoi)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save ROI Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* TRAMPOLINE WHY CHOOSE FORM */}
          {activeSection === 'trampolineWhyChoose' && (() => {
            const currentSec = formData.trampolineWhyChoose || defaultTrampolineWhyChoose;
            const itemsList = Array.isArray(currentSec.items) ? currentSec.items : defaultTrampolineWhyChoose.items;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Why Choose Winera International Section</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Section Title (*word* for cyan highlight)</label>
                    <input
                      type="text"
                      value={currentSec.title !== undefined ? currentSec.title : defaultTrampolineWhyChoose.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, trampolineWhyChoose: { ...(prev.trampolineWhyChoose || defaultTrampolineWhyChoose), title: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <label style={{ fontSize: '12.5px', fontWeight: '800', color: '#0f172a' }}>Value Proposition Cards ({itemsList.length})</label>
                      <button
                        onClick={() => {
                          const updated = [...itemsList, { title: 'New Value', desc: 'Description here.' }];
                          setFormData(prev => ({ ...prev, trampolineWhyChoose: { ...(prev.trampolineWhyChoose || defaultTrampolineWhyChoose), items: updated } }));
                        }}
                        style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}
                      >
                        + Add Card
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {itemsList.map((item, idx) => (
                        <div key={idx} style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '800', fontSize: '12.5px', color: '#0284c7' }}>Item #{idx + 1}</span>
                            <button
                              onClick={async () => {
                                const updated = itemsList.filter((_, i) => i !== idx);
                                const updatedSec = { ...(formData.trampolineWhyChoose || defaultTrampolineWhyChoose), items: updated };
                                setFormData(prev => ({ ...prev, trampolineWhyChoose: updatedSec }));
                                await persistSectionToDatabase('trampolineWhyChoose', updatedSec);
                              }}
                              style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '3px 8px', borderRadius: '6px', cursor: 'pointer', fontWeight: '800', fontSize: '11px' }}
                            >
                              Delete
                            </button>
                          </div>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const updated = [...itemsList];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setFormData(prev => ({ ...prev, trampolineWhyChoose: { ...(prev.trampolineWhyChoose || defaultTrampolineWhyChoose), items: updated } }));
                            }}
                            placeholder="Card Title"
                            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                          />
                          <RichTextareaWithEditor
                            label="Card Description"
                            rows={2}
                            value={item.desc}
                            onChange={(val) => {
                              const updated = [...itemsList];
                              updated[idx] = { ...updated[idx], desc: val };
                              setFormData(prev => ({ ...prev, trampolineWhyChoose: { ...(prev.trampolineWhyChoose || defaultTrampolineWhyChoose), items: updated } }));
                            }}
                            placeholder="Card Description"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('trampolineWhyChoose', formData.trampolineWhyChoose || defaultTrampolineWhyChoose)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Why Choose Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* TRAMPOLINE FAQS FORM */}
          {activeSection === 'trampolineFaqs' && (() => {
            const currentFaqs = (formData.trampolineFaqs && formData.trampolineFaqs.length > 0) ? formData.trampolineFaqs : defaultTrampolineFaqs;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>Trampoline Park FAQs Management ({currentFaqs.length})</h3>
                  <button
                    onClick={() => {
                      const updated = [...currentFaqs, { q: 'New Question?', a: 'Answer here.' }];
                      setFormData(prev => ({ ...prev, trampolineFaqs: updated }));
                    }}
                    style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}
                  >
                    + Add New FAQ
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {currentFaqs.map((faq, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '800', fontSize: '13px', color: '#0284c7' }}>FAQ #{idx + 1}</span>
                        <button
                          onClick={async () => {
                            const updated = currentFaqs.filter((_, i) => i !== idx);
                            setFormData(prev => ({ ...prev, trampolineFaqs: updated }));
                            await persistSectionToDatabase('trampolineFaqs', updated);
                          }}
                          style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '800', fontSize: '12px' }}
                        >
                          Delete
                        </button>
                      </div>
                      <input
                        type="text"
                        value={faq.q}
                        onChange={(e) => {
                          const updated = [...currentFaqs];
                          updated[idx] = { ...updated[idx], q: e.target.value };
                          setFormData(prev => ({ ...prev, trampolineFaqs: updated }));
                        }}
                        placeholder="Question"
                        style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: '700' }}
                      />
                      <RichTextareaWithEditor
                        label="Answer"
                        rows={3}
                        value={faq.a}
                        onChange={(val) => {
                          const updated = [...currentFaqs];
                          updated[idx] = { ...updated[idx], a: val };
                          setFormData(prev => ({ ...prev, trampolineFaqs: updated }));
                        }}
                        placeholder="Answer"
                      />
                    </div>
                  ))}
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('trampolineFaqs', formData.trampolineFaqs || defaultTrampolineFaqs)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save FAQs List
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* TRAMPOLINE CTA FORM */}
          {activeSection === 'trampolineCta' && (() => {
            const currentSec = formData.trampolineCta || defaultTrampolineCta;
            const bgImg = currentSec.bgUrl || defaultTrampolineCta.bgUrl;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Plan Trampoline Park CTA Banner</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Line 1</label>
                      <input
                        type="text"
                        value={currentSec.titleLine1 !== undefined ? currentSec.titleLine1 : defaultTrampolineCta.titleLine1}
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineCta: { ...(prev.trampolineCta || defaultTrampolineCta), titleLine1: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Line 2</label>
                      <input
                        type="text"
                        value={currentSec.titleLine2 !== undefined ? currentSec.titleLine2 : defaultTrampolineCta.titleLine2}
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineCta: { ...(prev.trampolineCta || defaultTrampolineCta), titleLine2: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                  <div>
                    <RichTextareaWithEditor
                      label="CTA Banner Description"
                      rows={2}
                      value={(() => {
                        if (currentSec.description !== undefined && currentSec.description !== '') return currentSec.description;
                        const l1 = currentSec.descLine1 !== undefined ? currentSec.descLine1 : defaultTrampolineCta.descLine1;
                        const l2 = currentSec.descLine2 !== undefined ? currentSec.descLine2 : defaultTrampolineCta.descLine2;
                        return `${l1} ${l2}`.trim();
                      })()}
                      onChange={(val) => setFormData(prev => ({ ...prev, trampolineCta: { ...(prev.trampolineCta || defaultTrampolineCta), description: val } }))}
                      placeholder="Enter CTA banner description..."
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Description Line 1</label>
                      <input
                        type="text"
                        value={currentSec.descLine1 !== undefined ? currentSec.descLine1 : defaultTrampolineCta.descLine1}
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineCta: { ...(prev.trampolineCta || defaultTrampolineCta), descLine1: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Description Line 2</label>
                      <input
                        type="text"
                        value={currentSec.descLine2 !== undefined ? currentSec.descLine2 : defaultTrampolineCta.descLine2}
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineCta: { ...(prev.trampolineCta || defaultTrampolineCta), descLine2: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                      <input
                        type="text"
                        value={currentSec.buttonText !== undefined ? currentSec.buttonText : defaultTrampolineCta.buttonText}
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineCta: { ...(prev.trampolineCta || defaultTrampolineCta), buttonText: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                      <input
                        type="text"
                        value={currentSec.buttonLink !== undefined ? currentSec.buttonLink : defaultTrampolineCta.buttonLink}
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineCta: { ...(prev.trampolineCta || defaultTrampolineCta), buttonLink: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={getAdminValidImageUrl(bgImg, trampolineParkCtaBg)} alt="CTA Preview" style={{ width: '100px', height: '55px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.bgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineCta: { ...(prev.trampolineCta || defaultTrampolineCta), bgUrl: e.target.value } }))}
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
                              setFormData(prev => ({ ...prev, trampolineCta: { ...(prev.trampolineCta || defaultTrampolineCta), bgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                        🏷️ Banner Background Alt Text (SEO Keyword)
                      </label>
                      <input
                        type="text"
                        value={currentSec.bgAlt || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, trampolineCta: { ...(prev.trampolineCta || defaultTrampolineCta), bgAlt: e.target.value } }))}
                        placeholder="e.g. Plan Your Trampoline Park with Winera International"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('trampolineCta', formData.trampolineCta || defaultTrampolineCta)}
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
