import React, { useState } from 'react';
import { Upload, Plus, Trash2, Edit2, Clock, Calendar } from 'lucide-react';
import RichTextareaWithEditor from '../components/RichTextareaWithEditor';
import AdminAltInput from '../components/AdminAltInput';
import StatusDropdown from '../components/StatusDropdown';
import WineraDateTimePicker from '../components/WineraDateTimePicker';
import { uploadImageFile, updateSectionContent, mutateContentItem, deleteProjectApi } from '../services/api';

const projectBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/a42izbmfkrylnroo3i7g.png";
const yellowStrokeLine = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345696/winera_uploads/kllqvzchxecftuxi6zdn.png";
const projectImagesBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345677/winera_uploads/kp4vrfwgnohju6x2hlae.png";
const projectSectionVideo = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345677/winera_uploads/nd79kzv2qshsmkkeeun3.png";
const projectImage01 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345677/winera_uploads/igg4yrl7xhnxllqifpj7.jpg";
const projectBlock1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/vxfee3fxtxt09nu04bd8.png";
const projectBlock2 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/vqhjjj1ruclhqyadhdso.png";
const defaultGameZoneMobileBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345677/winera_uploads/eqjkboeokagpaus2ifxa.png";
const ctaMainBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345648/winera_uploads/ei16uczeuelaabtue4bs.jpg";

const getAdminValidImageUrl = (url, fallback) => {
  if (!url) return fallback;
  if (typeof url === 'object' && url.default) return url.default;
  if (typeof url !== 'string' || url.trim() === '') return fallback;
  if (url.includes('eqjkboeokagpaus2ifxa') || url.includes('project-page-mobile-banner') || url.includes('mobile-banner')) {
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

const getMinDateTimeLocal = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
};

const defaultProjectHero = {
  bannerImg: projectBanner,
  mobileBgUrl: defaultGameZoneMobileBanner,
  mobileBgAlt: "Commercial Game Zone Projects Portfolio Mobile Banner - Winera International",
  breadcrumbHome: 'Home',
  breadcrumbPage: 'Project'
};

const defaultProjectBlock = {
  strokeImg: yellowStrokeLine,
  titleLine1: 'FifthAlley Sport Bowling: A',
  titleLine2: 'Complete ',
  titleLine2Black: 'Bowling Alley Setup',
  titleLine3: 'in the Heart of Surat',
  description: 'How we designed and installed a professional-grade bowling alley across 3,000 sq. ft., transforming an empty space in Katargam into a destination entertainment venue in Surat.',
  buttonText: 'Get A Quote',
  buttonLink: 'https://wa.me/919157873576',
  image: '/assets/FifthAlley-Sport-Bowling/fifthalley-sport-bowling.jpg'
};

const defaultProjectBasicInfo = {
  bgImg: '/assets/FifthAlley-Sport-Bowling/basic-information.jpg',
  yellowTitle: 'Basic ',
  whiteTitle: 'Information',
  rows: [
    { label: 'Project Name', val: 'FifthAlley Sport Bowling' },
    { label: 'Project Type', val: 'Bowling Alley Setup' },
    { label: 'Location', val: 'Surat, Gujarat' },
    { label: 'Total Area', val: '3,000 sq. ft.' }
  ]
};

const defaultProjectClientWanted = {
  titlePrefix: 'What the ',
  titleCyan: 'Client Wanted',
  paragraph1: 'The client had an empty 3,000 sq. ft. space in Katargam and a clear goal: to open a professional bowling venue.',
  paragraph2: "They didn't want a supplier who only supplied the equipment. They wanted one partner to handle everything, plan the space, install the lanes, and hand over a venue that was ready for opening day. In short, they needed one team they could trust from start to finish.",
  image: '/assets/FifthAlley-Sport-Bowling/what-the-client-wanted.jpg'
};

const defaultProjectSolution = {
  titleCyan: 'What Solution ',
  titleSuffix: 'We Provide',
  paragraph1: 'We delivered FifthAlley Sport Bowling as a complete, ready-to-open venue. Across the 3,000 sq. ft. space in Katargam, we planned the layout so the professional lanes had enough room around them for people to walk, sit, and relax.',
  paragraph2: 'The result is a venue that is fun to play in and comfortable to spend time in — just like a good family entertainment center should feel.',
  image: '/assets/FifthAlley-Sport-Bowling/what-solution-we-provide.jpg'
};

const defaultProjectGallery = {
  titleCyan: 'Project ',
  titleDark: 'Gallery',
  bgImg: projectImagesBg,
  images: [
    "/assets/FifthAlley-Sport-Bowling/gallery-1.jpg",
    "/assets/FifthAlley-Sport-Bowling/gallery-2.webp",
    "/assets/FifthAlley-Sport-Bowling/gallery-3.jpg",
    "/assets/FifthAlley-Sport-Bowling/gallery-4.jpg",
    "/assets/FifthAlley-Sport-Bowling/gallery-5.webp",
    "/assets/FifthAlley-Sport-Bowling/gallery-6.webp"
  ]
};

const defaultProjectVideo = {
  image: projectSectionVideo,
  videoUrl: 'https://wa.me/919157873576'
};


export default function ProjectsDashboard({
  activeSection,
  formData = {},
  setFormData,
  handleFieldChange,
  persistSectionToDatabase,
  openModal,
  handleDeleteItem,
  admin,
  setStatusMsg,
  setSelectedPage = () => {},
  setActiveSection = () => {},
  setDeleteConfirmModal = () => {},
  refreshContent = () => {}
}) {
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [adminProjectFilterCat, setAdminProjectFilterCat] = useState('All');
  const [scheduleModal, setScheduleModal] = useState(null);

  const openScheduleModal = (index, item) => {
    let initialDateTime = '';
    if (item.scheduledAt) {
      try {
        const d = new Date(item.scheduledAt);
        if (!isNaN(d.getTime())) {
          const pad = (n) => String(n).padStart(2, '0');
          initialDateTime = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
        }
      } catch (_) {}
    }
    if (!initialDateTime) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(10, 0, 0, 0);
      const pad = (n) => String(n).padStart(2, '0');
      initialDateTime = `${tomorrow.getFullYear()}-${pad(tomorrow.getMonth() + 1)}-${pad(tomorrow.getDate())}T${pad(tomorrow.getHours())}:${pad(tomorrow.getMinutes())}`;
    }
    setScheduleModal({ index, item, scheduledAt: initialDateTime, status: item.status === 'scheduled' ? 'scheduled' : 'scheduled' });
  };

  return (
    <>
          {activeSection === 'projectHero' && (() => {
            const currentSec = formData.projectHero || defaultProjectHero;
            const headerSec = formData.projectHeader || { title: "Crafting *India's Best Play Destinations*" };
            const heroImg = getAdminValidImageUrl(currentSec.bannerImg, projectBanner);
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Projects Hero Banner & Title</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Hero Banner Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={heroImg} alt="Hero Preview" style={{ width: '120px', height: '65px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.bannerImg || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectHero: { ...(prev.projectHero || defaultProjectHero), bannerImg: e.target.value } }))}
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
                              setFormData(prev => ({ ...prev, projectHero: { ...(prev.projectHero || defaultProjectHero), bannerImg: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <AdminAltInput
                      compact
                      label="🏷️ Hero Banner Background Image Alt Text (SEO Keyword)"
                      value={currentSec.bannerImgAlt !== undefined ? currentSec.bannerImgAlt : (currentSec.bgAlt || '')}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectHero: { ...(prev.projectHero || defaultProjectHero), bannerImgAlt: e.target.value, bgAlt: e.target.value } }))}
                      placeholder="e.g. Completed Commercial Game Zone Projects Portfolio - Winera International"
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
                        alt="Projects Mobile Hero Preview"
                        style={{ width: '120px', height: '65px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                      />
                      <input
                        type="text"
                        value={currentSec.mobileBgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectHero: { ...(prev.projectHero || defaultProjectHero), mobileBgUrl: e.target.value } }))}
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
                              setFormData(prev => ({ ...prev, projectHero: { ...(prev.projectHero || defaultProjectHero), mobileBgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                      {currentSec.mobileBgUrl && (
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, projectHero: { ...(prev.projectHero || defaultProjectHero), mobileBgUrl: '' } }))}
                          style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '12px 18px', borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
                        >
                          Reset Image
                        </button>
                      )}
                    </div>
                    <AdminAltInput
                      compact
                      label="🏷️ Mobile Background Image Alt Text (SEO Keyword)"
                      value={currentSec.mobileBgAlt !== undefined ? currentSec.mobileBgAlt : ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectHero: { ...(prev.projectHero || defaultProjectHero), mobileBgAlt: e.target.value } }))}
                      placeholder="e.g. Completed Commercial Game Zone Projects Portfolio Mobile Banner - Winera International"
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Breadcrumb Home Label</label>
                      <input
                        type="text"
                        value={currentSec.breadcrumbHome !== undefined ? currentSec.breadcrumbHome : defaultProjectHero.breadcrumbHome}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectHero: { ...(prev.projectHero || defaultProjectHero), breadcrumbHome: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Breadcrumb Current Page</label>
                      <input
                        type="text"
                        value={currentSec.breadcrumbPage !== undefined ? currentSec.breadcrumbPage : defaultProjectHero.breadcrumbPage}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectHero: { ...(prev.projectHero || defaultProjectHero), breadcrumbPage: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  {/* Section Heading Title Field */}
                  <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0', marginTop: '4px' }}>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Main Section Heading Title (Use *word* for Cyan accent color)
                    </label>
                    <input
                      type="text"
                      value={headerSec.title !== undefined ? headerSec.title : "Crafting *India's Best Play Destinations*"}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectHeader: { ...(prev.projectHeader || {}), title: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: '700', background: '#ffffff' }}
                    />
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={async () => {
                        await persistSectionToDatabase('projectHero', formData.projectHero || defaultProjectHero);
                        await persistSectionToDatabase('projectHeader', formData.projectHeader || { title: "Crafting *India's Best Play Destinations*" });
                      }}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Hero Banner & Title
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* MANAGE PORTFOLIO PROJECTS LIST & CATEGORIES SECTION */}
          {activeSection === 'projectItems' && (() => {
            const defaultProjectCategories = [
              "Game Zones",
              "Bowling",
              "Soft Play",
              "Arcade & VR",
              "Hospitality"
            ];
            const categoriesList = (Array.isArray(formData.projectCategories) && formData.projectCategories.length > 0)
              ? Array.from(new Set([...formData.projectCategories, "Hospitality"]))
              : defaultProjectCategories;

            const handleAddProjectCategory = async () => {
              let val = (newCategoryInput || '').trim();
              if (!val) {
                const promptVal = window.prompt('Enter new category name:');
                if (!promptVal || !promptVal.trim()) return;
                val = promptVal.trim();
              }
              if (categoriesList.some(c => c.toLowerCase() === val.toLowerCase())) {
                alert(`Category "${val}" already exists.`);
                return;
              }
              const newCats = [...categoriesList, val];
              setFormData(prev => ({ ...prev, projectCategories: newCats }));
              await persistSectionToDatabase('projectCategories', newCats);
              setStatusMsg(`Category "${val}" added successfully!`);
              setNewCategoryInput('');
            };

            const rawList = Array.isArray(formData.projectItems) ? formData.projectItems : [];

            const fifthAlleyItem = { id: 'fifthalley', name: 'FifthAlley Sport Bowling', category: 'Bowling', city: 'Surat', state: 'Gujarat', area: '3,000 sq. ft.', type: 'Bowling Alley Setup', slug: 'fifthalley-sport-bowling', img: '/assets/FifthAlley-Sport-Bowling/fifthalley-sport-bowling.jpg' };
            const hasFA = rawList.some(p => p.slug === "fifthalley-sport-bowling" || (p.name || "").toLowerCase().includes("fifthalley"));
            const currentList = hasFA ? rawList : [fifthAlleyItem, ...rawList];

            const filterCat = adminProjectFilterCat || "All";
            const filteredDisplayList = filterCat === "All"
              ? currentList
              : currentList.filter(item => (item.category || "").toLowerCase().includes(filterCat.toLowerCase()));

            return (
              <div className="winera-admin-card" style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '24px' }}>

                {/* Header & Add Project Button */}
                <div className="winera-admin-flex-header" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '14px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>Categories & Portfolio Projects Manager</h3>
                    <p style={{ fontSize: '12.5px', color: '#64748b', margin: '4px 0 0' }}>Manage category tabs, filter by category, add new projects, or edit case study details.</p>
                  </div>
                  <button
                    onClick={() => openModal('add')}
                    style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)' }}
                  >
                    <Plus style={{ width: '16px', height: '16px' }} /> Add New Project Card
                  </button>
                </div>

                {/* CATEGORY FILTER & MANAGEMENT BAR */}
                <div style={{ background: '#f8fafc', padding: '18px 22px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '14px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>Filter Category Table:</label>
                      <select
                        value={filterCat}
                        onChange={(e) => setAdminProjectFilterCat(e.target.value)}
                        style={{ padding: '8px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '700', background: '#ffffff', color: '#0284c7', maxWidth: '100%' }}
                      >
                        <option value="All">All Categories ({currentList.length})</option>
                        {categoriesList.map((cat, idx) => {
                          const count = currentList.filter(item => (item.category || "").toLowerCase().includes(cat.toLowerCase())).length;
                          return (
                            <option key={idx} value={cat}>{cat} ({count})</option>
                          );
                        })}
                      </select>
                    </div>

                    {/* Add New Category Control */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="Type new category name..."
                        value={newCategoryInput}
                        onChange={(e) => setNewCategoryInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddProjectCategory();
                          }
                        }}
                        style={{ padding: '8px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', width: '220px', maxWidth: '100%' }}
                      />
                      <button
                        type="button"
                        onClick={handleAddProjectCategory}
                        style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: '800', fontSize: '12.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Plus style={{ width: '15px', height: '15px' }} /> Add Category
                      </button>
                    </div>
                  </div>

                  {/* Active Categories List with 1-Click Delete (✕) Buttons */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748b', marginRight: '4px' }}>Active Categories (Click ✕ to delete):</span>
                    {categoriesList.map((cat, cIdx) => (
                      <span key={cIdx} style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#ffffff',
                        border: '1.5px solid #cbd5e1',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12.5px',
                        fontWeight: '700',
                        color: '#0f172a',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                      }}>
                        {cat}
                        <button
                          title={`Delete '${cat}' category`}
                          onClick={() => {
                            setDeleteConfirmModal({
                              title: 'Delete Category?',
                              message: `Are you sure you want to delete category '${cat}'? It will be removed from both Admin and User-side site.`,
                              onConfirm: () => {
                                const updatedCats = categoriesList.filter(c => c !== cat);
                                setFormData(prev => ({ ...prev, projectCategories: updatedCats }));
                                persistSectionToDatabase('projectCategories', updatedCats);
                              }
                            });
                          }}
                          style={{
                            background: '#fee2e2',
                            color: '#ef4444',
                            border: 'none',
                            borderRadius: '50%',
                            width: '18px',
                            height: '18px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            padding: 0,
                            fontSize: '10px',
                            fontWeight: '900'
                          }}
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* PROJECTS LIST TABLE */}
                <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ background: '#0F172B', color: '#ffffff', borderBottom: '2px solid #1e293b' }}>
                        <th style={{ padding: '14px 18px', fontWeight: '800' }}>#</th>
                        <th style={{ padding: '14px 18px', fontWeight: '800' }}>Photo</th>
                        <th style={{ padding: '14px 18px', fontWeight: '800' }}>Project Name</th>
                        <th style={{ padding: '14px 18px', fontWeight: '800' }}>Category</th>
                        <th style={{ padding: '14px 18px', fontWeight: '800' }}>Location</th>
                        <th style={{ padding: '14px 18px', fontWeight: '800' }}>Total Area</th>
                        <th style={{ padding: '14px 18px', fontWeight: '800' }}>Slug URL</th>
                        <th style={{ padding: '14px 18px', fontWeight: '800', textAlign: 'center' }}>Status</th>
                        <th style={{ padding: '14px 18px', fontWeight: '800', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDisplayList.map((item, idx) => {
                        const origIndex = currentList.findIndex(x => (x.slug && item.slug && x.slug === item.slug) || (x.id && item.id && x.id === item.id) || (x.name && item.name && x.name === item.name));
                        const targetIdx = origIndex !== -1 ? origIndex : idx;
                        const isItemActive = item.isActive !== false && item.status !== 'inactive';
                        return (
                          <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                            <td style={{ padding: '14px 18px', fontWeight: '700', color: '#64748b' }}>{idx + 1}</td>
                            <td style={{ padding: '14px 18px' }}>
                              <img src={getAdminValidImageUrl(item.img || item.imageUrl, projectImage01)} alt="" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
                            </td>
                            <td style={{ padding: '14px 18px', fontWeight: '800', color: '#0f172a' }}>{item.name || 'Unnamed Project'}</td>
                            <td style={{ padding: '14px 18px', fontWeight: '700', color: '#38bdf8' }}>{item.category || 'Game Zones'}</td>
                            <td style={{ padding: '14px 18px', fontWeight: '600', color: '#475569' }}>{item.city ? `${item.city}${item.state ? `, ${item.state}` : ''}` : 'N/A'}</td>
                            <td style={{ padding: '14px 18px', fontWeight: '600', color: '#64748b' }}>{item.area || 'N/A'}</td>
                            <td style={{ padding: '14px 18px', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>/project/{item.slug || 'detail'}</td>
                            <td style={{ padding: '14px 18px', textAlign: 'center', position: 'relative' }}>
                              <StatusDropdown
                                isActive={isItemActive && item.status !== 'scheduled'}
                                status={item.status || (isItemActive ? 'active' : 'inactive')}
                                scheduledAt={item.scheduledAt}
                                direction={idx >= filteredDisplayList.length - 2 && filteredDisplayList.length > 2 ? 'up' : 'down'}
                                onChange={async (newStatus, isAct, schedAt) => {
                                  setSelectedPage('projectPage');
                                  setActiveSection('projectItems');
                                  if (typeof window !== 'undefined') {
                                    try {
                                      localStorage.setItem('admin_selected_page', 'projectPage');
                                      localStorage.setItem('admin_active_section', 'projectItems');
                                    } catch (_) { }
                                  }

                                  const isScheduled = newStatus === 'scheduled';
                                  const updatedItem = {
                                    ...item,
                                    isActive: newStatus === 'active',
                                    status: newStatus,
                                    scheduledAt: isScheduled ? (schedAt || item.scheduledAt) : (newStatus === 'active' ? null : item.scheduledAt)
                                  };
                                  const updatedList = [...currentList];
                                  updatedList[targetIdx] = updatedItem;
                                  let updatedBuilt = Array.isArray(formData.builtProjects) ? [...formData.builtProjects] : [];
                                  const bpMatchIdx = updatedBuilt.findIndex(b => (b.slug && item.slug && b.slug === item.slug) || (b.name && item.name && b.name.toLowerCase() === item.name.toLowerCase()));
                                  if (bpMatchIdx !== -1) {
                                    updatedBuilt[bpMatchIdx] = {
                                      ...updatedBuilt[bpMatchIdx],
                                      isActive: newStatus === 'active',
                                      status: newStatus,
                                      scheduledAt: isScheduled ? (schedAt || item.scheduledAt) : (newStatus === 'active' ? null : item.scheduledAt)
                                    };
                                  }
                                  setFormData(prev => ({ ...prev, projectItems: updatedList, builtProjects: updatedBuilt }));

                                  try {
                                    await updateSectionContent('projectItems', updatedList, admin.token);
                                    await refreshContent();
                                    if (isScheduled) {
                                      const dateDisplay = updatedItem.scheduledAt ? new Date(updatedItem.scheduledAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }) : 'scheduled time';
                                      setStatusMsg(`⏰ Project '${item.name || 'item'}' scheduled for ${dateDisplay}! It will auto-publish automatically.`);
                                    } else {
                                      setStatusMsg(`Project '${item.name || 'item'}' status set to ${isAct ? 'Active' : 'Inactive'}!`);
                                    }
                                  } catch (err) {
                                    console.error("Status update error:", err);
                                    setStatusMsg('Error updating status: ' + (err.response?.data?.message || err.message));
                                  }
                                }}
                              />
                            </td>
                            <td style={{ padding: '14px 18px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                              {(() => {
                                const isItemActive = item.status === 'active' || (item.isActive !== false && item.status !== 'inactive' && item.status !== 'scheduled');
                                const isItemScheduled = item.status === 'scheduled';
                                if (isItemActive) return null;
                                return (
                                  <button
                                    type="button"
                                    onClick={() => openScheduleModal(targetIdx, item)}
                                    style={{
                                      background: isItemScheduled ? '#fffbeb' : '#f0f9ff',
                                      color: isItemScheduled ? '#b45309' : '#0284c7',
                                      border: isItemScheduled ? '1.5px solid #fde68a' : '1.5px solid #bae6fd',
                                      padding: '6px 12px',
                                      borderRadius: '8px',
                                      cursor: 'pointer',
                                      marginRight: '8px',
                                      fontWeight: '800',
                                      fontSize: '12px',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '4px',
                                      transition: 'all 0.15s ease'
                                    }}
                                    title={isItemScheduled ? "Change auto-publish Date & Time" : "Set Date & Time for automatic publishing"}
                                  >
                                    <Clock style={{ width: '13px', height: '13px' }} />
                                    {isItemScheduled ? 'Change Time' : '⏰ Set Time'}
                                  </button>
                                );
                              })()}
                              <button
                                onClick={() => openModal('edit', targetIdx, item)}
                                style={{ background: '#e0f2fe', color: '#0284c7', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', marginRight: '8px', fontWeight: '700', fontSize: '12px' }}
                              >
                                <Edit2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Edit Details
                              </button>
                              <button
                                onClick={() => {
                                  setDeleteConfirmModal({
                                    title: 'Delete Project Card?',
                                    message: `Are you sure you want to delete project '${item.name || 'this item'}'?`,
                                    onConfirm: async () => {
                                      const newList = currentList.filter((_, i) => i !== targetIdx);
                                      setFormData(prev => ({ ...prev, projectItems: newList }));
                                      try {
                                        await mutateContentItem({
                                          sectionKey: 'projectItems',
                                          action: 'delete',
                                          matchKey: 'slug',
                                          matchValue: item.slug || item.id,
                                          item: item,
                                          index: targetIdx
                                        }, admin.token);
                                        const projIdentifier = item.id || item.slug;
                                        if (projIdentifier) {
                                          await deleteProjectApi(projIdentifier, admin.token).catch(() => {});
                                        }
                                        await refreshContent();
                                        setStatusMsg(`Project '${item.name || 'item'}' deleted successfully!`);
                                      } catch (err) {
                                        console.error("Delete project error:", err);
                                        if (err.response?.status === 404) {
                                          try {
                                            await updateSectionContent('projectItems', newList, admin.token);
                                            await refreshContent();
                                            setStatusMsg(`Project '${item.name || 'item'}' deleted successfully!`);
                                            return;
                                          } catch (fbErr) {
                                            setStatusMsg('Delete error: ' + (fbErr.response?.data?.message || fbErr.message));
                                            return;
                                          }
                                        }
                                        setStatusMsg('Delete error: ' + (err.response?.data?.message || err.message));
                                      }
                                    }
                                  });
                                }}
                                style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px' }}
                              >
                                <Trash2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })()}

          {/* MAIN PROJECT DETAILS SECTION */}
          {activeSection === 'projectBlock' && (() => {
            const currentSec = formData.projectBlock || defaultProjectBlock;
            const mainImg = getAdminValidImageUrl(currentSec.image, projectImage01);
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Main Project Details Section</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Line 1 (Cyan Highlighted)</label>
                    <input
                      type="text"
                      value={currentSec.titleLine1 !== undefined ? currentSec.titleLine1 : defaultProjectBlock.titleLine1}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectBlock: { ...(prev.projectBlock || defaultProjectBlock), titleLine1: e.target.value } }))}
                      placeholder="FifthAlley Sport Bowling: A"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Line 2 (Cyan Part)</label>
                      <input
                        type="text"
                        value={currentSec.titleLine2 !== undefined ? currentSec.titleLine2 : defaultProjectBlock.titleLine2}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectBlock: { ...(prev.projectBlock || defaultProjectBlock), titleLine2: e.target.value } }))}
                        placeholder="Complete "
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Line 2 (Dark Part)</label>
                      <input
                        type="text"
                        value={currentSec.titleLine2Black !== undefined ? currentSec.titleLine2Black : defaultProjectBlock.titleLine2Black}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectBlock: { ...(prev.projectBlock || defaultProjectBlock), titleLine2Black: e.target.value } }))}
                        placeholder="Bowling Alley Setup"
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Line 3 (Dark Part)</label>
                    <input
                      type="text"
                      value={currentSec.titleLine3 !== undefined ? currentSec.titleLine3 : defaultProjectBlock.titleLine3}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectBlock: { ...(prev.projectBlock || defaultProjectBlock), titleLine3: e.target.value } }))}
                      placeholder="in the Heart of Surat"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Description Paragraph</label>
                    <RichTextareaWithEditor
                      rows={3}
                      value={currentSec.description !== undefined ? currentSec.description : defaultProjectBlock.description}
                      onChange={(val) => setFormData(prev => ({ ...prev, projectBlock: { ...(prev.projectBlock || defaultProjectBlock), description: val } }))}
                      placeholder="Enter project summary description..."
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                      <input
                        type="text"
                        value={currentSec.buttonText !== undefined ? currentSec.buttonText : defaultProjectBlock.buttonText}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectBlock: { ...(prev.projectBlock || defaultProjectBlock), buttonText: e.target.value } }))}
                        placeholder="Get A Quote"
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Button Link / WhatsApp URL</label>
                      <input
                        type="text"
                        value={(currentSec.buttonLink && currentSec.buttonLink.split('?')[0]) || defaultProjectBlock.buttonLink}
                        onChange={(e) => {
                          const baseLink = e.target.value;
                          const msg = currentSec.waMessage || 'Hello Winera International! I want to get a project quote. Please share details. [Ref: Project Detail Page]';
                          const updatedLink = msg ? `${baseLink.split('?')[0]}?text=${encodeURIComponent(msg)}` : baseLink;
                          setFormData(prev => ({ ...prev, projectBlock: { ...(prev.projectBlock || defaultProjectBlock), buttonLink: updatedLink } }));
                        }}
                        placeholder="https://wa.me/919157873576"
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
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
                        return 'Hello Winera International! I want to get a project quote. Please share details. [Ref: Project Detail Page]';
                      })()}
                      onChange={(e) => {
                        const newMsg = e.target.value;
                        const baseLink = (currentSec.buttonLink && currentSec.buttonLink.split('?')[0]) || 'https://wa.me/919157873576';
                        const updatedLink = newMsg ? `${baseLink}?text=${encodeURIComponent(newMsg)}` : baseLink;
                        setFormData(prev => ({
                          ...prev,
                          projectBlock: {
                            ...(prev.projectBlock || defaultProjectBlock),
                            waMessage: newMsg,
                            buttonLink: updatedLink
                          }
                        }));
                      }}
                      placeholder="e.g. Hello Winera International! I want to get a project quote..."
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', lineHeight: 1.5, color: '#0f172a', fontWeight: '500' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Main Card Image</label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={mainImg} alt="Card Preview" style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.image || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectBlock: { ...(prev.projectBlock || defaultProjectBlock), image: e.target.value } }))}
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
                              setFormData(prev => ({ ...prev, projectBlock: { ...(prev.projectBlock || defaultProjectBlock), image: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <AdminAltInput
                      compact
                      label="🏷️ Main Project Image Alt Text (SEO Keyword)"
                      value={currentSec.imageAlt || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectBlock: { ...(prev.projectBlock || defaultProjectBlock), imageAlt: e.target.value } }))}
                      placeholder="e.g. FifthAlley Sport Bowling Setup in Surat - Winera International"
                    />
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('projectBlock', formData.projectBlock || defaultProjectBlock)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Main Project Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* BASIC INFORMATION TABLE SECTION */}
          {activeSection === 'projectBasicInfo' && (() => {
            const currentSec = formData.projectBasicInfo || defaultProjectBasicInfo;
            const bgImg = getAdminValidImageUrl(currentSec.bgImg, projectImagesBg);
            const rowsList = Array.isArray(currentSec.rows) && currentSec.rows.length > 0 ? currentSec.rows : defaultProjectBasicInfo.rows;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Basic Information Table Section</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Card Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1200 × 800 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={bgImg} alt="BG Preview" style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.bgImg || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectBasicInfo: { ...(prev.projectBasicInfo || defaultProjectBasicInfo), bgImg: e.target.value } }))}
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
                              setFormData(prev => ({ ...prev, projectBasicInfo: { ...(prev.projectBasicInfo || defaultProjectBasicInfo), bgImg: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <AdminAltInput
                      compact
                      label="🏷️ Background Image Alt Text (SEO Keyword)"
                      value={currentSec.bgAlt || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectBasicInfo: { ...(prev.projectBasicInfo || defaultProjectBasicInfo), bgAlt: e.target.value } }))}
                      placeholder="e.g. FifthAlley Sport Bowling Setup Details - Winera International"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title (Yellow Text)</label>
                      <input
                        type="text"
                        value={currentSec.yellowTitle !== undefined ? currentSec.yellowTitle : defaultProjectBasicInfo.yellowTitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectBasicInfo: { ...(prev.projectBasicInfo || defaultProjectBasicInfo), yellowTitle: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title (White Text)</label>
                      <input
                        type="text"
                        value={currentSec.whiteTitle !== undefined ? currentSec.whiteTitle : defaultProjectBasicInfo.whiteTitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectBasicInfo: { ...(prev.projectBasicInfo || defaultProjectBasicInfo), whiteTitle: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  {/* Table Data Rows */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>Table Data Rows</label>
                      <button
                        onClick={() => {
                          const currentRows = [...rowsList];
                          currentRows.push({ label: 'New Field', val: 'New Value' });
                          setFormData(prev => ({ ...prev, projectBasicInfo: { ...(prev.projectBasicInfo || defaultProjectBasicInfo), rows: currentRows } }));
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
                            value={row.label || ''}
                            placeholder="Field Name"
                            onChange={(e) => {
                              const newRows = [...rowsList];
                              newRows[rIdx] = { ...(newRows[rIdx] || row), label: e.target.value };
                              setFormData(prev => ({ ...prev, projectBasicInfo: { ...(prev.projectBasicInfo || defaultProjectBasicInfo), rows: newRows } }));
                            }}
                            style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                          />
                          <input
                            type="text"
                            value={row.val || ''}
                            placeholder="Field Value"
                            onChange={(e) => {
                              const newRows = [...rowsList];
                              newRows[rIdx] = { ...(newRows[rIdx] || row), val: e.target.value };
                              setFormData(prev => ({ ...prev, projectBasicInfo: { ...(prev.projectBasicInfo || defaultProjectBasicInfo), rows: newRows } }));
                            }}
                            style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                          />
                          <button
                            onClick={() => {
                              const newRows = rowsList.filter((_, i) => i !== rIdx);
                              setFormData(prev => ({ ...prev, projectBasicInfo: { ...(prev.projectBasicInfo || defaultProjectBasicInfo), rows: newRows } }));
                            }}
                            style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                          >
                            <Trash2 style={{ width: '16px', height: '16px' }} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('projectBasicInfo', formData.projectBasicInfo || defaultProjectBasicInfo)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Basic Info Table
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* WHAT THE CLIENT WANTED SECTION */}
          {activeSection === 'projectClientWanted' && (() => {
            const currentSec = formData.projectClientWanted || defaultProjectClientWanted;
            const clientImg = getAdminValidImageUrl(currentSec.image, projectBlock1);
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>What the Client Wanted Section</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Prefix (Dark)</label>
                      <input
                        type="text"
                        value={currentSec.titlePrefix !== undefined ? currentSec.titlePrefix : defaultProjectClientWanted.titlePrefix}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectClientWanted: { ...(prev.projectClientWanted || defaultProjectClientWanted), titlePrefix: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Cyan Highlight</label>
                      <input
                        type="text"
                        value={currentSec.titleCyan !== undefined ? currentSec.titleCyan : defaultProjectClientWanted.titleCyan}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectClientWanted: { ...(prev.projectClientWanted || defaultProjectClientWanted), titleCyan: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Paragraph 1</label>
                    <RichTextareaWithEditor
                      rows={3}
                      value={currentSec.paragraph1 !== undefined ? currentSec.paragraph1 : defaultProjectClientWanted.paragraph1}
                      onChange={(val) => setFormData(prev => ({ ...prev, projectClientWanted: { ...(prev.projectClientWanted || defaultProjectClientWanted), paragraph1: val } }))}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Paragraph 2</label>
                    <RichTextareaWithEditor
                      rows={3}
                      value={currentSec.paragraph2 !== undefined ? currentSec.paragraph2 : defaultProjectClientWanted.paragraph2}
                      onChange={(val) => setFormData(prev => ({ ...prev, projectClientWanted: { ...(prev.projectClientWanted || defaultProjectClientWanted), paragraph2: val } }))}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Section Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={clientImg} alt="Preview" style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.image || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectClientWanted: { ...(prev.projectClientWanted || defaultProjectClientWanted), image: e.target.value } }))}
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
                              setFormData(prev => ({ ...prev, projectClientWanted: { ...(prev.projectClientWanted || defaultProjectClientWanted), image: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <AdminAltInput
                      compact
                      label="🏷️ Section Image Alt Text (SEO Keyword)"
                      value={currentSec.imageAlt || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectClientWanted: { ...(prev.projectClientWanted || defaultProjectClientWanted), imageAlt: e.target.value } }))}
                      placeholder="e.g. Client Bowling Setup Requirements - Winera International"
                    />
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('projectClientWanted', formData.projectClientWanted || defaultProjectClientWanted)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Client Wanted Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* WHAT SOLUTION WE PROVIDE SECTION */}
          {activeSection === 'projectSolution' && (() => {
            const currentSec = formData.projectSolution || defaultProjectSolution;
            const solutionImg = getAdminValidImageUrl(currentSec.image, projectBlock2);
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>What Solution We Provide Section</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Cyan Highlight</label>
                      <input
                        type="text"
                        value={currentSec.titleCyan !== undefined ? currentSec.titleCyan : defaultProjectSolution.titleCyan}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectSolution: { ...(prev.projectSolution || defaultProjectSolution), titleCyan: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title Suffix (Dark)</label>
                      <input
                        type="text"
                        value={currentSec.titleSuffix !== undefined ? currentSec.titleSuffix : defaultProjectSolution.titleSuffix}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectSolution: { ...(prev.projectSolution || defaultProjectSolution), titleSuffix: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Paragraph 1</label>
                    <RichTextareaWithEditor
                      rows={3}
                      value={currentSec.paragraph1 !== undefined ? currentSec.paragraph1 : defaultProjectSolution.paragraph1}
                      onChange={(val) => setFormData(prev => ({ ...prev, projectSolution: { ...(prev.projectSolution || defaultProjectSolution), paragraph1: val } }))}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Paragraph 2</label>
                    <RichTextareaWithEditor
                      rows={3}
                      value={currentSec.paragraph2 !== undefined ? currentSec.paragraph2 : defaultProjectSolution.paragraph2}
                      onChange={(val) => setFormData(prev => ({ ...prev, projectSolution: { ...(prev.projectSolution || defaultProjectSolution), paragraph2: val } }))}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Section Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={solutionImg} alt="Preview" style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.image || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectSolution: { ...(prev.projectSolution || defaultProjectSolution), image: e.target.value } }))}
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
                              setFormData(prev => ({ ...prev, projectSolution: { ...(prev.projectSolution || defaultProjectSolution), image: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <AdminAltInput
                      compact
                      label="🏷️ Section Image Alt Text (SEO Keyword)"
                      value={currentSec.imageAlt || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectSolution: { ...(prev.projectSolution || defaultProjectSolution), imageAlt: e.target.value } }))}
                      placeholder="e.g. Winera International Custom Solution Implementation"
                    />
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('projectSolution', formData.projectSolution || defaultProjectSolution)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Solution Section
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* PROJECT GALLERY GRID SECTION */}
          {activeSection === 'projectGallery' && (() => {
            const currentSec = formData.projectGallery || defaultProjectGallery;
            const bgImg = getAdminValidImageUrl(currentSec.bgImg, projectImagesBg);
            const galleryImgs = Array.isArray(currentSec.images) && currentSec.images.length > 0 ? currentSec.images : defaultProjectGallery.images;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Project Gallery Grid Section</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Section Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={bgImg} alt="BG Preview" style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.bgImg || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectGallery: { ...(prev.projectGallery || defaultProjectGallery), bgImg: e.target.value } }))}
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
                              setFormData(prev => ({ ...prev, projectGallery: { ...(prev.projectGallery || defaultProjectGallery), bgImg: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <AdminAltInput
                      compact
                      label="🏷️ Gallery Section Background Alt Text (SEO Keyword)"
                      value={currentSec.bgAlt || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectGallery: { ...(prev.projectGallery || defaultProjectGallery), bgAlt: e.target.value } }))}
                      placeholder="e.g. Commercial Entertainment Center Gallery & Installation - Winera"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title (Cyan Word)</label>
                      <input
                        type="text"
                        value={currentSec.titleCyan !== undefined ? currentSec.titleCyan : defaultProjectGallery.titleCyan}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectGallery: { ...(prev.projectGallery || defaultProjectGallery), titleCyan: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Title (Dark Word)</label>
                      <input
                        type="text"
                        value={currentSec.titleDark !== undefined ? currentSec.titleDark : defaultProjectGallery.titleDark}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectGallery: { ...(prev.projectGallery || defaultProjectGallery), titleDark: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  {/* Gallery Images List */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>
                        Gallery Images List ({galleryImgs.length} Images) <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 600 × 500 px</span>
                      </label>
                      <label style={{ background: '#38bdf8', color: '#ffffff', padding: '8px 16px', borderRadius: '10px', fontWeight: '800', fontSize: '12.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Plus style={{ width: '16px', height: '16px' }} /> Upload New Image
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const res = await uploadImageFile(file, admin.token);
                              const newImgs = [...galleryImgs, res.url];
                              setFormData(prev => ({ ...prev, projectGallery: { ...(prev.projectGallery || defaultProjectGallery), images: newImgs } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                      {galleryImgs.map((imgUrl, iIdx) => (
                        <div key={iIdx} style={{ position: 'relative', background: '#f8fafc', padding: '10px', borderRadius: '14px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                          <img src={getAdminValidImageUrl(imgUrl, projectBlock1)} alt={`Gallery item ${iIdx + 1}`} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '10px', marginBottom: '8px', display: 'block' }} />
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748b' }}>Image #{iIdx + 1}</span>
                            <button
                              onClick={() => {
                                const newImgs = galleryImgs.filter((_, i) => i !== iIdx);
                                setFormData(prev => ({ ...prev, projectGallery: { ...(prev.projectGallery || defaultProjectGallery), images: newImgs } }));
                              }}
                              style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '5px 10px', borderRadius: '8px', fontWeight: '800', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                            >
                              <Trash2 style={{ width: '13px', height: '13px' }} /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('projectGallery', formData.projectGallery || defaultProjectGallery)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Project Gallery
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* PROJECT VIDEO SHOWCASE SECTION */}
          {activeSection === 'projectVideo' && (() => {
            const currentSec = formData.projectVideo || defaultProjectVideo;
            const videoImg = currentSec.image || defaultProjectVideo.image;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Project Video Showcase Section</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Video Thumbnail Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1280 × 720 px (16:9)</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={videoImg} alt="Thumbnail Preview" style={{ width: '120px', height: '65px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.image || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectVideo: { ...(prev.projectVideo || defaultProjectVideo), image: e.target.value } }))}
                        placeholder="Image URL or Asset Path"
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                      <label style={{ padding: '12px 20px', background: '#38bdf8', color: '#ffffff', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Upload style={{ width: '16px', height: '16px' }} /> Upload Thumbnail
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const res = await uploadImageFile(file, admin.token);
                              setFormData(prev => ({ ...prev, projectVideo: { ...(prev.projectVideo || defaultProjectVideo), image: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Video Target Link / WhatsApp Link</label>
                    <input
                      type="text"
                      value={currentSec.videoUrl !== undefined ? currentSec.videoUrl : defaultProjectVideo.videoUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectVideo: { ...(prev.projectVideo || defaultProjectVideo), videoUrl: e.target.value } }))}
                      placeholder="https://wa.me/919157873576 or Youtube link"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('projectVideo', formData.projectVideo || defaultProjectVideo)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Project Video Showcase
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* PROJECT PAGE CTA BANNER SECTION */}
          {activeSection === 'projectCta' && (() => {
            const currentSec = formData.projectCta || {};
            const bgImg = (currentSec.bgUrl && !currentSec.bgUrl.includes('project-lastbg'))
              ? getAdminValidImageUrl(currentSec.bgUrl, ctaMainBanner)
              : ctaMainBanner;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Project Page CTA Banner Section</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      CTA Banner Background Image <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={bgImg} alt="CTA Banner Preview" style={{ width: '180px', height: '60px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <input
                        type="text"
                        value={currentSec.bgUrl || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectCta: { ...(prev.projectCta || {}), bgUrl: e.target.value } }))}
                        placeholder="Image URL or Asset Path"
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                      <label style={{ padding: '12px 20px', background: '#38bdf8', color: '#ffffff', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Upload style={{ width: '16px', height: '16px' }} /> Upload Banner
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const res = await uploadImageFile(file, admin.token);
                              setFormData(prev => ({ ...prev, projectCta: { ...(prev.projectCta || {}), bgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <AdminAltInput
                      compact
                      label="🏷️ CTA Banner Background Image Alt Text (SEO Keyword)"
                      value={currentSec.bgAlt || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectCta: { ...(prev.projectCta || {}), bgAlt: e.target.value } }))}
                      placeholder="e.g. Planning a Game Zone of Your Own? Winera Setup Consultation"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Main Title Heading</label>
                    <input
                      type="text"
                      value={currentSec.title !== undefined ? currentSec.title : "Planning a Game Zone of Your Own?"}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectCta: { ...(prev.projectCta || {}), title: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: '600' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Description Paragraph</label>
                    <RichTextareaWithEditor
                      rows={2}
                      value={currentSec.description !== undefined ? currentSec.description : "Give us the space, and we'll deliver a complete game zone — planned, built, and ready to play. Your only job is to open the doors."}
                      onChange={(val) => setFormData(prev => ({ ...prev, projectCta: { ...(prev.projectCta || {}), description: val } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>CTA Button Label</label>
                      <input
                        type="text"
                        value={currentSec.buttonText !== undefined ? currentSec.buttonText : "Get a Free Consultation"}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectCta: { ...(prev.projectCta || {}), buttonText: e.target.value } }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>CTA Button Link (WhatsApp URL)</label>
                      <input
                        type="text"
                        value={currentSec.buttonLink !== undefined ? currentSec.buttonLink : 'https://wa.me/919157873576'}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectCta: { ...(prev.projectCta || {}), buttonLink: e.target.value } }))}
                        placeholder="https://wa.me/919157873576"
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('projectCta', formData.projectCta || {})}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Project CTA Banner
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

      {/* Schedule Auto-Publish Date & Time Modal */}
      {scheduleModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(5px)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '30px',
            maxWidth: '460px',
            width: '100%',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
            border: '1.5px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock style={{ width: '24px', height: '24px', color: '#0284c7' }} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: '#0f172a' }}>
                  ⏰ Set Auto-Publish Time
                </h3>
                <p style={{ margin: '2px 0 0', fontSize: '12.5px', color: '#64748b', fontWeight: '700' }}>
                  {scheduleModal.item?.name || 'Project Card'}
                </p>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.55, margin: '0 0 18px 0', background: '#f8fafc', padding: '12px 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              Select the exact future date and time. Winera system will automatically publish this project on the website even if you are not available.
            </p>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                📅 Select Date & Time:
              </label>
              <WineraDateTimePicker
                minDate={getMinDateTimeLocal()}
                value={scheduleModal.scheduledAt || ''}
                onChange={(val) => setScheduleModal(prev => ({ ...prev, scheduledAt: val }))}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                type="button"
                onClick={async () => {
                  if (!scheduleModal.scheduledAt) {
                    alert('Please select a date & time');
                    return;
                  }
                  if (new Date(scheduleModal.scheduledAt).getTime() <= Date.now()) {
                    alert('Please select a future date & time. Past dates cannot be selected.');
                    return;
                  }
                  const schedIso = new Date(scheduleModal.scheduledAt).toISOString();
                  const targetIdx = scheduleModal.index;
                  const item = scheduleModal.item;
                  const updatedItem = {
                    ...item,
                    isActive: false,
                    status: 'scheduled',
                    scheduledAt: schedIso
                  };
                  const currentList = Array.isArray(formData.projectItems) ? [...formData.projectItems] : [];
                  currentList[targetIdx] = updatedItem;

                  let updatedBuilt = Array.isArray(formData.builtProjects) ? [...formData.builtProjects] : [];
                  const bpMatchIdx = updatedBuilt.findIndex(b => (b.slug && item.slug && b.slug === item.slug) || (b.name && item.name && b.name.toLowerCase() === item.name.toLowerCase()));
                  if (bpMatchIdx !== -1) {
                    updatedBuilt[bpMatchIdx] = { ...updatedBuilt[bpMatchIdx], isActive: false, status: 'scheduled', scheduledAt: schedIso };
                  }

                  setFormData(prev => ({ ...prev, projectItems: currentList, builtProjects: updatedBuilt }));
                  setScheduleModal(null);

                  try {
                    await updateSectionContent('projectItems', currentList, admin.token);
                    await refreshContent();
                    const dateDisplay = new Date(schedIso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
                    setStatusMsg(`⏰ Project '${item.name}' scheduled for ${dateDisplay}! It will automatically publish.`);
                  } catch (err) {
                    console.error("Status update error:", err);
                    setStatusMsg('Error updating status: ' + (err.response?.data?.message || err.message));
                  }
                }}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '13px 18px',
                  borderRadius: '12px',
                  fontWeight: '800',
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                💾 Save & Confirm Schedule
              </button>

              <button
                type="button"
                onClick={() => setScheduleModal(null)}
                style={{
                  width: '100%',
                  background: '#f1f5f9',
                  color: '#475569',
                  border: '1px solid #cbd5e1',
                  padding: '11px 18px',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  marginTop: '4px'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
