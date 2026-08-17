import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateSectionContent, uploadImageFile } from '../services/api';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import {
  Save,
  LogOut,
  ExternalLink,
  RefreshCw,
  CheckCircle,
  Home,
  Gamepad2,
  Info,
  Layout,
  MessageSquare,
  HelpCircle,
  List,
  Sliders,
  PhoneCall,
  ShieldCheck,
  Building,
  Plus,
  Trash2,
  FileText,
  Upload,
  Image as ImageIcon,
  Edit2,
  X,
  Star,
  Video,
  Trophy,
  Sparkles
} from 'lucide-react';
import yellowBrushAccent from '../assets/yellow-stroke-line.png';
import ctaConsultationsBanner from '../assets/cta-consultations-banner.png';

export default function AdminDashboard({ siteData, refreshContent }) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  // Selected page context in sidebar: 'home' | 'arcade' | 'about' | 'header_footer'
  const [selectedPage, setSelectedPage] = useState('home');
  // Selected section tab within the page - default to 'stats' (first available Home section)
  const [activeSection, setActiveSection] = useState('stats');

  const [formData, setFormData] = useState(siteData || {});
  const [statusMsg, setStatusMsg] = useState('');
  const [loadingSection, setLoadingSection] = useState('');
  const [adminSelectedCat, setAdminSelectedCat] = useState('Sports Simulators');
  const [newCategoryInput, setNewCategoryInput] = useState('');

  // Modal State for Add / Edit Operations
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [editingIndex, setEditingIndex] = useState(null);
  const [modalItemData, setModalItemData] = useState({});
  const [modalTargetSection, setModalTargetSection] = useState(null);

  // Keep formData in sync when siteData is fetched or refreshed from MongoDB API
  useEffect(() => {
    if (siteData) {
      setFormData(siteData);
    }
  }, [siteData]);

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }



  // Sidebar navigation structure by page
  const navigationMenu = {
    home: {
      label: 'Home Page',
      icon: <Home style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'hero', name: 'Hero Banner' },
        { id: 'stats', name: 'Company Stats' },
        { id: 'aboutHome', name: 'About Winera Section' },
        { id: 'productsHome', name: 'Our Best Products' },
        { id: 'partnerHome', name: 'Your Partner Section' },
        { id: 'industries', name: 'Industries We Serve' },
        { id: 'processHome', name: 'Our Working Process' },
        { id: 'clientLogos', name: 'Our Clients Logos' },
        { id: 'builtProjects', name: 'Game Zones Built' },
        { id: 'channelPartners', name: 'Channel Partners Logos' },
        { id: 'whyChooseUs', name: 'Why Choose Us Section' },
        { id: 'testimonials', name: 'Client Testimonials' },
        { id: 'faqs', name: 'FAQ Accordions' },
        { id: 'ctaBanner', name: 'CTA Consultation Banner' }
      ]
    },
    arcade: {
      label: 'Arcade Game Page',
      icon: <Gamepad2 style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'arcadeHero', name: 'Arcade Hero Banner' },
        { id: 'arcadeIntro', name: 'Arcade Intro & Specs' },
        { id: 'arcadeCategories', name: 'Game Categories & Cards' },
        { id: 'arcadeCommercial', name: 'Commercial Features' },
        { id: 'arcadeWhyUs', name: 'Why Choose Winera' },
        { id: 'arcadeRelated', name: 'Related Products Carousel' },
        { id: 'arcadeFaqs', name: 'Arcade Page FAQs' },
        { id: 'arcadeCta', name: 'Arcade CTA Banner' }
      ]
    },
    bowling: {
      label: 'Bowling Alley Page',
      icon: <Trophy style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'bowlingHero', name: 'Hero Banner' },
        { id: 'bowlingIntro', name: 'Bowling Manufacturers Section' },
        { id: 'bowlingManufacturer', name: 'Premium Bowling Manufacturer' },
        { id: 'bowlingFreeFall', name: 'Free-Fall Bowling Section' },
        { id: 'bowlingString', name: 'String Bowling Section' },
        { id: 'bowlingRoi', name: 'Investment & ROI Section' },
        { id: 'bowlingWhyUs', name: 'Why Choose Winera' },
        { id: 'bowlingFaqs', name: 'Bowling Page FAQs' },
        { id: 'bowlingCta', name: 'Bowling CTA Banner' }
      ]
    },
    softplay: {
      label: 'Soft Play Page',
      icon: <Sparkles style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'softplayHero', name: 'Soft Play Hero Banner' },
        { id: 'softplayIntro', name: 'Indoor Soft Play Manufacturer' },
        { id: 'softplayManufacture', name: 'Soft Play Equipment Manufacture' },
        { id: 'softplaySpecs', name: 'Technical Specifications Card' },
        { id: 'softplayMaterials', name: 'Materials Quality & Durability' },
        { id: 'softplayTypes', name: 'Types of Soft Play Zones Timeline' },
        { id: 'softplayRoi', name: 'Know Your Returns & ROI Section' },
        { id: 'softplayWhyUs', name: 'Why Choose Winera Section' },
        { id: 'softplayFaqs', name: 'Soft Play Page FAQs' },
        { id: 'softplayCta', name: 'Soft Play CTA Banner' }
      ]
    },
    bumpercar: {
      label: 'Bumper Car Page',
      icon: <Gamepad2 style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'bumpercarHero', name: 'Bumper Car Hero Banner' },
        { id: 'bumpercarIntro', name: 'Bumper Car Manufacturer in India' },
        { id: 'bumpercarBanner', name: 'Bumper Car Description & 3D Car' },
        { id: 'bumpercarThrill', name: 'Thrill & Safety Card Slider' },
        { id: 'bumpercarSpecs', name: 'Technical Specifications Card' },
        { id: 'bumpercarOptions', name: 'Indoor Bumper Car Options' },
        { id: 'bumpercarComparison', name: 'Quick Comparison Table' },
        { id: 'bumpercarInvestment', name: 'Bumper Car Ride Smart Investment' },
        { id: 'bumpercarWhyChoose', name: 'Why Choose Winera International' },
        { id: 'bumpercarFaqs', name: 'Bumper Car FAQs' },
        { id: 'bumpercarCta', name: 'Bumper Car CTA Banner' },
        { id: 'bumpercarSeo', name: 'SEO Meta Title & Description' }
      ]
    },
    vrgames: {
      label: 'VR Games Page',
      icon: <Gamepad2 style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'vrHero', name: 'VR Games Hero Banner' },
        { id: 'vrSupplier', name: 'VR Gaming Machine Supplier' },
        { id: 'vrMatchedVenue', name: 'Commercial VR Machines Matched Venue' },
        { id: 'vrRange', name: 'Our VR Gaming Machine Range' },
        { id: 'vrReliability', name: 'Commercial-Grade Quality & Reliability' },
        { id: 'vrEarn', name: 'What Will Your VR Zone Earn' },
        { id: 'vrWhyUs', name: 'Why Choose Winera Section' },
        { id: 'vrFaqs', name: 'VR Games FAQs' },
        { id: 'vrCta', name: 'VR Games CTA Banner' }
      ]
    },
    argames: {
      label: 'AR Games Page',
      icon: <Gamepad2 style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'arHero', name: 'AR Games Hero Banner' },
        { id: 'arIntro', name: 'AR Games Supplier in India' },
        { id: 'arCategoriesData', name: 'Categories & Games Catalog' },
        { id: 'arMatchedVenue', name: 'Interactive AR Attractions' },
        { id: 'arFeatures', name: 'AR Features & Highlights' },
        { id: 'arEarn', name: 'Know Your Returns Section' },
        { id: 'arWhyUs', name: 'Why Choose Winera Section' },
        { id: 'arFaqs', name: 'AR Games FAQs' },
        { id: 'arCta', name: 'CTA Consultations Banner' }
      ]
    },
    about: {
      label: 'About Us Page',
      icon: <Info style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'aboutHero', name: 'About Hero Banner' },
        { id: 'aboutWelcome', name: 'Welcome To Winera Section' },
        { id: 'aboutMissionVision', name: 'Our Purpose & Promise' },
        { id: 'aboutWhyUsDetail', name: 'Why Choose Us Mindmap' },
        { id: 'founder', name: 'Founder Profile Data' },
        { id: 'ctaBanner', name: 'CTA Consultation Banner' }
      ]
    },
    header_footer: {
      label: 'Header & Footer',
      icon: <Layout style={{ width: '18px', height: '18px' }} />,
      sections: [
        { id: 'header', name: 'Navigation Header' },
        { id: 'footer', name: 'Footer & Links' }
      ]
    }
  };

  const handleSaveSection = async (sectionKey) => {
    setLoadingSection(sectionKey);
    setStatusMsg('');
    try {
      await updateSectionContent(sectionKey, formData[sectionKey], admin.token);
      await refreshContent();
      setStatusMsg(`'${sectionKey.toUpperCase()}' updated successfully!`);
    } catch (err) {
      setStatusMsg(`Error saving ${sectionKey}: ` + (err.response?.data?.message || err.message));
    } finally {
      setLoadingSection('');
    }
  };

  const handleFieldChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value
      }
    }));
  };

  const handleArrayFieldChange = (section, index, field, value) => {
    setFormData(prev => {
      const list = [...(prev[section] || [])];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, [section]: list };
    });
  };

  const handleFileUpload = async (e, section, index, field) => {
    const file = e.target.files[0];
    if (!file) return;

    setStatusMsg('Uploading file to server...');
    try {
      const res = await uploadImageFile(file, admin.token);
      handleArrayFieldChange(section, index, field, res.url);
      setStatusMsg('File uploaded successfully to server!');
    } catch (err) {
      setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
    }
  };

  // Direct update helper function to save section to MongoDB
  const persistSectionToDatabase = async (sectionKey, updatedData) => {
    setLoadingSection(sectionKey);
    setStatusMsg('');
    try {
      await updateSectionContent(sectionKey, updatedData, admin.token);
      await refreshContent();
      setStatusMsg(`Saved directly to MongoDB database!`);
    } catch (err) {
      setStatusMsg(`Database Save Error: ` + (err.response?.data?.message || err.message));
    } finally {
      setLoadingSection('');
    }
  };

  // Delete item from table & save directly to MongoDB
  const handleDeleteItem = async (sectionKey, index) => {
    const currentList = [...(formData[sectionKey] || [])];
    const updatedList = currentList.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [sectionKey]: updatedList }));
    await persistSectionToDatabase(sectionKey, updatedList);
  };

  // Open Modal Handler (Add or Edit)
  const openModal = (mode, index = null, currentItem = {}, targetSec = null) => {
    const sec = targetSec || activeSection;
    setModalTargetSection(sec);
    setModalMode(mode);
    setEditingIndex(index);
    if (mode === 'edit') {
      setModalItemData({ ...currentItem });
    } else {
      // Default empty structure based on active section
      if (sec === 'stats') setModalItemData({ number: '', label: '' });
      else if (sec === 'clientLogos') setModalItemData({ name: '', logoUrl: '' });
      else if (sec === 'channelPartners') setModalItemData({ name: '', logoUrl: '' });
      else if (sec === 'builtProjects') setModalItemData({ name: '', city: '', imageUrl: '' });
      else if (sec === 'faqs' || sec === 'arcadeFaqs' || sec === 'bowlingFaqs' || sec === 'softplayFaqs') setModalItemData({ q: '', a: '' });
      else if (sec === 'testimonials') setModalItemData({ founderImage: '', gameZoneName: '', reviewerRole: '', starRating: 5, youtubeVideoUrl: '', quote: '' });
      else setModalItemData({});
    }
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalItemData({});
    setEditingIndex(null);
    setModalTargetSection(null);
  };

  // Save Modal Item DIRECTLY to MongoDB Database
  const saveModalItem = async () => {
    const secKey = modalTargetSection || activeSection;
    let currentList = [...(formData[secKey] || [])];

    if (secKey === 'stats') {
      const defaultHomeStats = [
        { number: "14+", label: "YEARS OF EXPERIENCE" },
        { number: "200+", label: "Project Completed" },
        { number: "98%", label: "Happy Clients" },
        { number: "50+", label: "Cities Covered" }
      ];
      currentList = defaultHomeStats.map((def, i) => {
        const existing = currentList[i] || {};
        return {
          number: existing.number || existing.num || def.number,
          label: existing.label || existing.title || def.label
        };
      });
    }

    if (modalMode === 'add') {
      currentList.push(modalItemData);
    } else if (modalMode === 'edit' && editingIndex !== null) {
      currentList[editingIndex] = modalItemData;
    }
    setFormData(prev => ({ ...prev, [secKey]: currentList }));
    closeModal();
    await persistSectionToDatabase(secKey, currentList);
  };


  // Handle File Upload inside Modal
  const handleModalFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    setStatusMsg('Uploading image to server...');
    try {
      const res = await uploadImageFile(file, admin.token);
      setModalItemData(prev => ({ ...prev, [field]: res.url }));
      setStatusMsg('Image uploaded successfully to server!');
    } catch (err) {
      setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
    }
  };



  return (
    <div style={{ height: '100vh', backgroundColor: '#F5F5F9', color: '#0f172a', display: 'flex', overflow: 'hidden' }}>
      {/* SIDEBAR NAVIGATION (FIXED ON SCREEN) */}
      <aside style={{
        width: '280px',
        height: '100vh',
        backgroundColor: '#0f172a',
        color: '#ffffff',
        borderRight: '1px solid #1e293b',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexShrink: 0,
        overflowY: 'auto'
      }}>
        <div>
          {/* Brand Logo & Title Header */}
          <div style={{ padding: '28px 24px', borderBottom: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: '#38bdf8',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '900',
                fontSize: '18px'
              }}>
                W
              </div>
              <div>
                <h2 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#ffffff', margin: 0, letterSpacing: '-0.3px' }}>
                  Winera Admin
                </h2>
                <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: '700' }}>
                  CMS Content Manager
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div style={{ padding: '20px 16px' }}>
            <div style={{
              fontSize: '11px',
              fontWeight: '900',
              color: '#64748b',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              marginBottom: '12px',
              paddingLeft: '12px'
            }}>
              Pages & Sections
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {Object.keys(navigationMenu).map((pageKey) => {
                const item = navigationMenu[pageKey];
                const isSelected = selectedPage === pageKey;

                return (
                  <div key={pageKey} style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* Main Page Category Switcher */}
                    <button
                      onClick={() => {
                        setSelectedPage(pageKey);
                        if (item.sections && item.sections.length > 0) {
                          setActiveSection(item.sections[0].id);
                        }
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: '14px',
                        border: 'none',
                        background: isSelected ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                        color: isSelected ? '#38bdf8' : '#94a3b8',
                        fontWeight: isSelected ? '800' : '600',
                        fontSize: '13.5px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      <span style={{
                        fontSize: '11px',
                        background: isSelected ? '#38bdf8' : '#1e293b',
                        color: isSelected ? '#ffffff' : '#64748b',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        fontWeight: '800'
                      }}>
                        {item.sections.length}
                      </span>
                    </button>

                    {/* Sub-sections accordions */}
                    {isSelected && (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        marginTop: '6px',
                        marginBottom: '12px',
                        paddingLeft: '38px',
                        borderLeft: '2px solid rgba(56, 189, 248, 0.3)',
                        marginLeft: '24px'
                      }}>
                        {item.sections.map((sec) => {
                          const isSecActive = activeSection === sec.id;
                          return (
                            <button
                              key={sec.id}
                              onClick={() => setActiveSection(sec.id)}
                              style={{
                                width: '100%',
                                textAlign: 'left',
                                padding: '8px 12px',
                                borderRadius: '10px',
                                border: 'none',
                                background: isSecActive ? '#38bdf8' : 'transparent',
                                color: isSecActive ? '#ffffff' : '#cbd5e1',
                                fontWeight: isSecActive ? '800' : '500',
                                fontSize: '12.5px',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              {sec.name}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Footer Details & Quick Action Controls */}
        <div style={{ padding: '20px 16px', borderTop: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link
            to="/"
            target="_blank"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '12px',
              background: '#1e293b',
              color: '#38bdf8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '12.5px',
              fontWeight: '800',
              textDecoration: 'none'
            }}
          >
            <ExternalLink style={{ width: '16px', height: '16px' }} />
            <span>View Live Website</span>
          </Link>

          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '12px',
              background: '#fef2f2',
              border: '1px solid #fca5a5',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '12.5px',
              fontWeight: '800',
              cursor: 'pointer'
            }}
          >
            <LogOut style={{ width: '16px', height: '16px' }} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT EDIT AREA */}
      <main style={{ flex: 1, height: '100vh', padding: '40px 48px', overflowY: 'auto' }}>
        {/* Top Header Card */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '28px',
          background: '#ffffff',
          padding: '24px 32px',
          borderRadius: '24px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
          border: '1px solid #e2e8f0'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{
                background: '#e0f2fe',
                color: '#0284c7',
                fontSize: '11px',
                fontWeight: '900',
                padding: '4px 12px',
                borderRadius: '12px',
                textTransform: 'uppercase'
              }}>
                {selectedPage.replace('_', ' ')}
              </span>
              <h1 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                Manage Section: <span style={{ color: '#38bdf8' }}>{activeSection}</span>
              </h1>
            </div>
            <p style={{ color: '#64748b', fontSize: '12.5px', fontWeight: '500', marginTop: '4px' }}>
              Add, edit, or delete items. Changes save automatically directly into MongoDB database.
            </p>
          </div>
        </div>

        {/* Success / Status Message Notification Banner */}
        {statusMsg && (
          <div style={{
            background: statusMsg.includes('Error') ? '#fef2f2' : '#f0fdf4',
            border: statusMsg.includes('Error') ? '1.5px solid #fca5a5' : '1.5px solid #86efac',
            color: statusMsg.includes('Error') ? '#dc2626' : '#166534',
            padding: '14px 20px',
            borderRadius: '16px',
            fontSize: '13.5px',
            fontWeight: '700',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <CheckCircle style={{ width: '18px', height: '18px' }} />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* DYNAMIC EDIT FORM PANELS */}
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '36px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
          border: '1px solid #e2e8f0'
        }}>
          {/* 1. HERO SECTION FORM */}
          {activeSection === 'hero' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Hero Main Heading Title
                </label>
                <input
                  type="text"
                  value={formData.hero?.title || ''}
                  onChange={(e) => handleFieldChange('hero', 'title', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    border: '1.5px solid #e2e8f0',
                    background: '#F5F5F9',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Hero Subtitle Paragraph
                </label>
                <textarea
                  rows={3}
                  value={formData.hero?.subtitle || ''}
                  onChange={(e) => handleFieldChange('hero', 'subtitle', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    border: '1.5px solid #e2e8f0',
                    background: '#F5F5F9',
                    fontSize: '13.5px',
                    fontWeight: '500',
                    lineHeight: 1.5
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  CTA Button Text
                </label>
                <input
                  type="text"
                  placeholder="e.g. Plan Your Game Zone"
                  value={formData.hero?.ctaPrimaryText || ''}
                  onChange={(e) => handleFieldChange('hero', 'ctaPrimaryText', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    border: '1.5px solid #e2e8f0',
                    background: '#F5F5F9',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  CTA Button Link / URL
                </label>
                <input
                  type="text"
                  placeholder="e.g. https://wa.me/919428989488 or /contact"
                  value={formData.hero?.ctaPrimaryLink || ''}
                  onChange={(e) => handleFieldChange('hero', 'ctaPrimaryLink', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    border: '1.5px solid #e2e8f0',
                    background: '#F5F5F9',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('hero', formData.hero || {})}
                  style={{
                    background: '#38bdf8',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '12px',
                    fontWeight: '900',
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)'
                  }}
                >
                  Save Hero Banner
                </button>
              </div>
            </div>
          )}

          {/* ABOUT WINERA SECTION FORM */}
          {activeSection === 'aboutHome' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>About Winera Section</h3>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '3px 0 0' }}>Manage text and feature bullet list for About section on Home page.</p>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Heading Title (Use *word* for cyan highlight color)
                </label>
                <input
                  type="text"
                  value={formData.aboutHome?.title || "*About* Winera International"}
                  onChange={(e) => handleFieldChange('aboutHome', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Paragraph 1
                </label>
                <textarea
                  rows={4}
                  value={formData.aboutHome?.paragraph1 || "Winera International Pvt. Ltd. is a dynamic force in the gaming and indoor amusement industry, headquartered in Surat, India. Since our establishment in 2014, we have focused exclusively on delivering project-based gaming solutions to the B2B sector nationwide. Our unwavering commitment to excellence and tailored approach sets us apart. We're dedicated to understanding our client's unique needs and providing the most suitable gaming solutions for each project."}
                  onChange={(e) => handleFieldChange('aboutHome', 'paragraph1', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', lineHeight: 1.6 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Paragraph 2
                </label>
                <textarea
                  rows={3}
                  value={formData.aboutHome?.paragraph2 || "Our team calculates a complete ROI Blueprint for your space, covering projected footfall, revenue potential, and break-even timeline. At Winera International Pvt. Ltd, we've built a reputation for efficiency and reliability, making us the go-to choice for exceptional gaming experiences in the B2B sector."}
                  onChange={(e) => handleFieldChange('aboutHome', 'paragraph2', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', lineHeight: 1.6 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Feature Checkmark List (One item per line)
                </label>
                <textarea
                  rows={7}
                  value={
                    Array.isArray(formData.aboutHome?.features)
                      ? formData.aboutHome.features.join('\n')
                      : (formData.aboutHome?.features || "Game Zone Setup\nFEC Equipment & Setup\nBowling Alley Equipment\nArcade & Amusement Equipment\nKids Entertainment Solutions\nVR Gaming Equipment\nConcept to Installation")
                  }
                  onChange={(e) => {
                    const list = e.target.value.split('\n');
                    handleFieldChange('aboutHome', 'features', list);
                  }}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', lineHeight: 1.6, fontFamily: 'monospace' }}
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('aboutHome', formData.aboutHome || {})}
                  style={{
                    background: '#38bdf8',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '12px',
                    fontWeight: '900',
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)'
                  }}
                >
                  Save About Section
                </button>
              </div>
            </div>
          )}

          {/* OUR BEST PRODUCTS SECTION FORM */}
          {activeSection === 'productsHome' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Our Best Products Section</h3>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '3px 0 0' }}>Manage section title and subtitle for Products on Home page.</p>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Heading Title (Use *word* for cyan highlight color)
                </label>
                <input
                  type="text"
                  value={formData.productsHome?.title || "Take a look At *Our Best Products*"}
                  onChange={(e) => handleFieldChange('productsHome', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Subtitle Paragraph
                </label>
                <input
                  type="text"
                  value={formData.productsHome?.subtitle || "Our Complete Game Zone Equipment & Setup Solutions"}
                  onChange={(e) => handleFieldChange('productsHome', 'subtitle', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontWeight: '500' }}
                />
              </div>

              {/* Cards List Manager */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0369a1' }}>Product Cards List</h4>
                  <button
                    onClick={() => {
                      const defaultCards = [
                        { id: "arcade", title: "Arcade Game", desc: "Discover endless fun with our innovative indoor arcade games, merging excitement and fitness seamlessly.", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80", link: "/products/arcade-games" },
                        { id: "vr", title: "VR GAME", desc: "Immersive commercial VR gaming machines delivering thrilling virtual reality experiences.", img: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=800&q=80", link: "/products/vr-games" },
                        { id: "ar", title: "AR GAME", desc: "Interactive AR gaming solutions blending technology and entertainment — sports simulators and more.", img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80", link: "/products/ar-games" },
                        { id: "bowling", title: "Bowling Alley", desc: "The Brunswick bowling equipment with stable mechanical capacity popular across global entertainment hubs.", img: "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=800&q=80", link: "/products/bowling-alley" },
                        { id: "softplay", title: "Soft Play", desc: "Indoor playgrounds designed specifically for children aged 3-15 years of indoor game venues.", img: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=800&q=80", link: "/products/soft-play" },
                        { id: "trampoline", title: "Trampoline", desc: "Physical fitness and active fun combined in safe high-capacity commercial trampoline layouts.", img: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?auto=format&fit=crop&w=800&q=80", link: "/products/trampoline-park" },
                        { id: "hypergrid", title: "Hyper Grid", desc: "Interactive LED floor game where players compete across pressure-sensitive glowing tiles.", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", link: "/products/hypergrid" },
                        { id: "lasertag", title: "Laser Tag & Spy", desc: "High-adrenaline commercial laser tag arena setup delivering competitive team battles for malls & venues.", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80", link: "/products/laser-tag" },
                        { id: "ride", title: "Amusement Ride", desc: "Exhilarating blend of collisions and smooth handling designed with top commercial safety.", img: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80", link: "/products/amusement-park" },
                        { id: "decorative", title: "Decorative Items", desc: "Custom themed lights, sculptures, reception desks, and ambient furniture to elevate your game zone.", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", link: "/products/lights" }
                      ];
                      const cur = (Array.isArray(formData.productsHome?.cardsList) && formData.productsHome.cardsList.length > 0)
                        ? formData.productsHome.cardsList
                        : defaultCards;
                      const updated = [...cur, { title: 'New Product', desc: 'Short description.', img: '', link: '/products/new' }];
                      handleFieldChange('productsHome', 'cardsList', updated);
                    }}
                    style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    + Add Product Card
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {((Array.isArray(formData.productsHome?.cardsList) && formData.productsHome.cardsList.length > 0)
                    ? formData.productsHome.cardsList
                    : [
                      { id: "arcade", title: "Arcade Game", desc: "Discover endless fun with our innovative indoor arcade games, merging excitement and fitness seamlessly.", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80", link: "/products/arcade-games" },
                      { id: "vr", title: "VR GAME", desc: "Immersive commercial VR gaming machines delivering thrilling virtual reality experiences.", img: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=800&q=80", link: "/products/vr-games" },
                      { id: "ar", title: "AR GAME", desc: "Interactive AR gaming solutions blending technology and entertainment — sports simulators and more.", img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80", link: "/products/ar-games" },
                      { id: "bowling", title: "Bowling Alley", desc: "The Brunswick bowling equipment with stable mechanical capacity popular across global entertainment hubs.", img: "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=800&q=80", link: "/products/bowling-alley" },
                      { id: "softplay", title: "Soft Play", desc: "Indoor playgrounds designed specifically for children aged 3-15 years of indoor game venues.", img: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=800&q=80", link: "/products/soft-play" },
                      { id: "trampoline", title: "Trampoline", desc: "Physical fitness and active fun combined in safe high-capacity commercial trampoline layouts.", img: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?auto=format&fit=crop&w=800&q=80", link: "/products/trampoline-park" },
                      { id: "hypergrid", title: "Hyper Grid", desc: "Interactive LED floor game where players compete across pressure-sensitive glowing tiles.", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", link: "/products/hypergrid" },
                      { id: "lasertag", title: "Laser Tag & Spy", desc: "High-adrenaline commercial laser tag arena setup delivering competitive team battles for malls & venues.", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80", link: "/products/laser-tag" },
                      { id: "ride", title: "Amusement Ride", desc: "Exhilarating blend of collisions and smooth handling designed with top commercial safety.", img: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80", link: "/products/amusement-park" },
                      { id: "decorative", title: "Decorative Items", desc: "Custom themed lights, sculptures, reception desks, and ambient furniture to elevate your game zone.", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", link: "/products/lights" }
                    ]
                  ).map((card, idx) => {
                    const getList = () => (Array.isArray(formData.productsHome?.cardsList) && formData.productsHome.cardsList.length > 0)
                      ? formData.productsHome.cardsList
                      : [
                        { id: "arcade", title: "Arcade Game", desc: "Discover endless fun with our innovative indoor arcade games, merging excitement and fitness seamlessly.", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80", link: "/products/arcade-games" },
                        { id: "vr", title: "VR GAME", desc: "Immersive commercial VR gaming machines delivering thrilling virtual reality experiences.", img: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=800&q=80", link: "/products/vr-games" },
                        { id: "ar", title: "AR GAME", desc: "Interactive AR gaming solutions blending technology and entertainment — sports simulators and more.", img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80", link: "/products/ar-games" },
                        { id: "bowling", title: "Bowling Alley", desc: "The Brunswick bowling equipment with stable mechanical capacity popular across global entertainment hubs.", img: "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=800&q=80", link: "/products/bowling-alley" },
                        { id: "softplay", title: "Soft Play", desc: "Indoor playgrounds designed specifically for children aged 3-15 years of indoor game venues.", img: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=800&q=80", link: "/products/soft-play" },
                        { id: "trampoline", title: "Trampoline", desc: "Physical fitness and active fun combined in safe high-capacity commercial trampoline layouts.", img: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?auto=format&fit=crop&w=800&q=80", link: "/products/trampoline-park" },
                        { id: "hypergrid", title: "Hyper Grid", desc: "Interactive LED floor game where players compete across pressure-sensitive glowing tiles.", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", link: "/products/hypergrid" },
                        { id: "lasertag", title: "Laser Tag & Spy", desc: "High-adrenaline commercial laser tag arena setup delivering competitive team battles for malls & venues.", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80", link: "/products/laser-tag" },
                        { id: "ride", title: "Amusement Ride", desc: "Exhilarating blend of collisions and smooth handling designed with top commercial safety.", img: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80", link: "/products/amusement-park" },
                        { id: "decorative", title: "Decorative Items", desc: "Custom themed lights, sculptures, reception desks, and ambient furniture to elevate your game zone.", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", link: "/products/lights" }
                      ];

                    return (
                      <div key={idx} style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: '800', fontSize: '13px', color: '#0284c7' }}>Card #{idx + 1} - {card.title}</span>
                          <button
                            onClick={() => {
                              const list = [...getList()];
                              list.splice(idx, 1);
                              handleFieldChange('productsHome', 'cardsList', list);
                            }}
                            style={{ background: '#ef4444', color: '#fff', border: 'none', width: '28px', height: '28px', borderRadius: '6px', cursor: 'pointer', fontWeight: '900' }}
                          >
                            ×
                          </button>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#475569', marginBottom: '4px' }}>Card Title</label>
                          <input
                            type="text"
                            placeholder="Card Title"
                            value={card.title || ''}
                            onChange={(e) => {
                              const list = [...getList()];
                              list[idx] = { ...list[idx], title: e.target.value };
                              handleFieldChange('productsHome', 'cardsList', list);
                            }}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#475569', marginBottom: '4px' }}>Short Description</label>
                          <textarea
                            rows={2}
                            placeholder="Short Description"
                            value={card.desc || ''}
                            onChange={(e) => {
                              const list = [...getList()];
                              list[idx] = { ...list[idx], desc: e.target.value };
                              handleFieldChange('productsHome', 'cardsList', list);
                            }}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontFamily: 'inherit' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#475569', marginBottom: '4px' }}>Card Image</label>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            {card.img && (
                              <img
                                src={card.img}
                                alt="Card Preview"
                                style={{ width: '80px', height: '50px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #cbd5e1' }}
                              />
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  try {
                                    const res = await uploadImageFile(file, admin.token);
                                    if (res.url) {
                                      const list = [...getList()];
                                      list[idx] = { ...list[idx], img: res.url };
                                      handleFieldChange('productsHome', 'cardsList', list);
                                    }
                                  } catch (err) {
                                    console.error('Image upload failed', err);
                                  }
                                }
                              }}
                              style={{ fontSize: '12px' }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('productsHome', formData.productsHome || {})}
                  style={{
                    background: '#38bdf8',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '12px',
                    fontWeight: '900',
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)'
                  }}
                >
                  Save Products Section
                </button>
              </div>
            </div>
          )}

          {/* YOUR PARTNER SECTION FORM */}
          {activeSection === 'partnerHome' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Your Partner Section</h3>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '3px 0 0' }}>Manage main title, subtitle, and feature boxes for Your Partner section.</p>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Heading Title (Use *word* for cyan highlight color)
                </label>
                <input
                  type="text"
                  value={formData.partnerHome?.title || "*Your Partner* in Building a Profitable Game Zone"}
                  onChange={(e) => handleFieldChange('partnerHome', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Subtitle Paragraph
                </label>
                <textarea
                  rows={3}
                  value={formData.partnerHome?.subtitle || "Discover how Winera International helps you plan, build, and launch a successful game zone from free ROI consultation to safety-certified equipment and complete installation support."}
                  onChange={(e) => handleFieldChange('partnerHome', 'subtitle', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', lineHeight: 1.6 }}
                />
              </div>

              {/* Box 1 Inputs */}
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Feature Card 1 (ROI Consultancy)</h4>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#475569', marginBottom: '6px' }}>Card 1 Title</label>
                  <input
                    type="text"
                    value={formData.partnerHome?.box1Title || "Free ROI Consultancy"}
                    onChange={(e) => handleFieldChange('partnerHome', 'box1Title', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#475569', marginBottom: '6px' }}>Card 1 Description</label>
                  <textarea
                    rows={2}
                    value={formData.partnerHome?.box1Desc || "Before you invest a single rupee, our team consults with you on layout, equipment mix, and budget and hands you a complete ROI report covering projected revenue, footfall, and break-even timeline."}
                    onChange={(e) => handleFieldChange('partnerHome', 'box1Desc', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
              </div>

              {/* Box 2 Inputs */}
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Feature Card 2 (Safety Installation)</h4>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#475569', marginBottom: '6px' }}>Card 2 Title</label>
                  <input
                    type="text"
                    value={formData.partnerHome?.box2Title || "Safety-Certified Installation"}
                    onChange={(e) => handleFieldChange('partnerHome', 'box2Title', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#475569', marginBottom: '6px' }}>Card 2 Description</label>
                  <textarea
                    rows={2}
                    value={formData.partnerHome?.box2Desc || "Every product we install meets commercial safety standards tested for high-footfall environments, assembled by our own trained team, and handed over only after a full on-site safety inspection."}
                    onChange={(e) => handleFieldChange('partnerHome', 'box2Desc', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('partnerHome', formData.partnerHome || {})}
                  style={{
                    background: '#38bdf8',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '12px',
                    fontWeight: '900',
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)'
                  }}
                >
                  Save Partner Section
                </button>
              </div>
            </div>
          )}

          {/* INDUSTRIES WE SERVE HEADER FORM */}
          {activeSection === 'industries' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Industries We Serve Section</h3>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '3px 0 0' }}>Manage section title and subtitle for Industries We Serve on Home page.</p>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Heading Title (Use *word* for cyan highlight color)
                </label>
                <input
                  type="text"
                  value={formData.industriesHeader?.title || "INDUSTRIES *WE SERVE*"}
                  onChange={(e) => handleFieldChange('industriesHeader', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Subtitle Paragraph
                </label>
                <input
                  type="text"
                  value={formData.industriesHeader?.subtitle || "We deliver complete game zone setup solutions for businesses across India"}
                  onChange={(e) => handleFieldChange('industriesHeader', 'subtitle', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontWeight: '500' }}
                />
              </div>

              {/* Industries Items Manager */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0369a1' }}>Industries List</h4>
                  <button
                    onClick={() => {
                      const defaultItems = [
                        { title: "Shopping Malls", img: "" },
                        { title: "Hotels & Resorts", img: "" },
                        { title: "Schools & Academies", img: "" },
                        { title: "Commercial Spaces", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80" },
                        { title: "Residential Projects", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80" },
                        { title: "Sports Centres", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80" },
                        { title: "Entertainment Hubs", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80" },
                        { title: "Airports & Terminals", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80" },
                        { title: "Hospitals & Clinics", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80" },
                        { title: "Food and Beverage", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80" }
                      ];

                      const getList = () => (Array.isArray(formData.industriesHeader?.items) && formData.industriesHeader.items.length > 0)
                        ? formData.industriesHeader.items
                        : defaultItems;

                      const updated = [...getList(), { title: 'New Industry', img: '' }];
                      handleFieldChange('industriesHeader', 'items', updated);
                    }}
                    style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    + Add Industry
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {((Array.isArray(formData.industriesHeader?.items) && formData.industriesHeader.items.length > 0)
                    ? formData.industriesHeader.items
                    : [
                      { title: "Shopping Malls", img: "" },
                      { title: "Hotels & Resorts", img: "" },
                      { title: "Schools & Academies", img: "" },
                      { title: "Commercial Spaces", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80" },
                      { title: "Residential Projects", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80" },
                      { title: "Sports Centres", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80" },
                      { title: "Entertainment Hubs", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80" },
                      { title: "Airports & Terminals", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80" },
                      { title: "Hospitals & Clinics", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80" },
                      { title: "Food and Beverage", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80" }
                    ]
                  ).map((item, idx) => {
                    const getList = () => (Array.isArray(formData.industriesHeader?.items) && formData.industriesHeader.items.length > 0)
                      ? formData.industriesHeader.items
                      : [
                        { title: "Shopping Malls", img: "" },
                        { title: "Hotels & Resorts", img: "" },
                        { title: "Schools & Academies", img: "" },
                        { title: "Commercial Spaces", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80" },
                        { title: "Residential Projects", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80" },
                        { title: "Sports Centres", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80" },
                        { title: "Entertainment Hubs", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80" },
                        { title: "Airports & Terminals", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80" },
                        { title: "Hospitals & Clinics", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80" },
                        { title: "Food and Beverage", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80" }
                      ];

                    return (
                      <div key={idx} style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: '800', fontSize: '13px', color: '#0284c7' }}>Industry #{idx + 1} - {item.title}</span>
                          <button
                            onClick={() => {
                              const list = [...getList()];
                              list.splice(idx, 1);
                              handleFieldChange('industriesHeader', 'items', list);
                            }}
                            style={{ background: '#ef4444', color: '#fff', border: 'none', width: '28px', height: '28px', borderRadius: '6px', cursor: 'pointer', fontWeight: '900' }}
                          >
                            ×
                          </button>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#475569', marginBottom: '4px' }}>Industry Title</label>
                          <input
                            type="text"
                            placeholder="Industry Title"
                            value={item.title || ''}
                            onChange={(e) => {
                              const list = [...getList()];
                              list[idx] = { ...list[idx], title: e.target.value };
                              handleFieldChange('industriesHeader', 'items', list);
                            }}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#475569', marginBottom: '4px' }}>Industry Image</label>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            {item.img && (
                              <img
                                src={item.img}
                                alt="Industry Preview"
                                style={{ width: '80px', height: '50px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #cbd5e1' }}
                              />
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  try {
                                    const res = await uploadImageFile(file, admin.token);
                                    if (res.url) {
                                      const list = [...getList()];
                                      list[idx] = { ...list[idx], img: res.url };
                                      handleFieldChange('industriesHeader', 'items', list);
                                    }
                                  } catch (err) {
                                    console.error('Image upload failed', err);
                                  }
                                }
                              }}
                              style={{ fontSize: '12px' }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('industriesHeader', formData.industriesHeader || {})}
                  style={{
                    background: '#38bdf8',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '12px',
                    fontWeight: '900',
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)'
                  }}
                >
                  Save Industries Header
                </button>
              </div>
            </div>
          )}

          {/* OUR WORKING PROCESS HEADER FORM */}
          {activeSection === 'processHome' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Our Working Process Section</h3>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '3px 0 0' }}>Manage section title and subtitle for Our Working Process on Home page.</p>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Heading Title (Use *word* for cyan highlight color)
                </label>
                <input
                  type="text"
                  value={formData.processHome?.title || "*OUR WORKING* PROCESS"}
                  onChange={(e) => handleFieldChange('processHome', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Subtitle Paragraph
                </label>
                <input
                  type="text"
                  value={formData.processHome?.subtitle || "How We Setup Your Game Zone"}
                  onChange={(e) => handleFieldChange('processHome', 'subtitle', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontWeight: '500' }}
                />
              </div>

              {/* Working Process Dynamic Step Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0 0' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Process Step Cards</h4>
                  <button
                    type="button"
                    onClick={() => {
                      const defaultInitial = [
                        { num: "01", title: "Consultation & Concept", points: ["Initial Project Discussion", "ROI & Business Feasibility Analysis", "Space & Budget Evaluation"] },
                        { num: "02", title: "2D/3D Layout & Planning", points: ["Custom Game Zone Layout Design", "Equipment Mix Selection", "Electrical & Interior Planning Guidance"] },
                        { num: "03", title: "Equipment Sourcing & Manufacturing", points: ["High-Grade Commercial Amusement Machines", "Quality Inspection Before Shipping", "Branding & Theme Customization"] },
                        { num: "04", title: "Installation & Setup", points: ["On-Site Assembly by Expert Technicians", "Safety & Operational Testing", "Card System Integration"] },
                        { num: "05", title: "Handover & Support", points: ["Staff Operations Training", "Go-Live Assistance", "Lifetime Technical & Spare Parts Support"] }
                      ];
                      const currentCards = (Array.isArray(formData.processHome?.cards) && formData.processHome.cards.length > 0)
                        ? [...formData.processHome.cards]
                        : [...defaultInitial];

                      const newStepNum = currentCards.length < 9 ? `0${currentCards.length + 1}` : `${currentCards.length + 1}`;
                      currentCards.push({
                        num: newStepNum,
                        title: "New Process Step",
                        points: ["Feature Detail 1", "Feature Detail 2"]
                      });
                      handleFieldChange('processHome', 'cards', currentCards);
                    }}
                    style={{
                      background: '#00a8ff',
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontWeight: '800',
                      fontSize: '12.5px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0, 168, 255, 0.3)'
                    }}
                  >
                    + Add New Card
                  </button>
                </div>

                {(() => {
                  const defaultInitial = [
                    { num: "01", title: "Consultation & Concept", points: ["Initial Project Discussion", "ROI & Business Feasibility Analysis", "Space & Budget Evaluation"] },
                    { num: "02", title: "2D/3D Layout & Planning", points: ["Custom Game Zone Layout Design", "Equipment Mix Selection", "Electrical & Interior Planning Guidance"] },
                    { num: "03", title: "Equipment Sourcing & Manufacturing", points: ["High-Grade Commercial Amusement Machines", "Quality Inspection Before Shipping", "Branding & Theme Customization"] },
                    { num: "04", title: "Installation & Setup", points: ["On-Site Assembly by Expert Technicians", "Safety & Operational Testing", "Card System Integration"] },
                    { num: "05", title: "Handover & Support", points: ["Staff Operations Training", "Go-Live Assistance", "Lifetime Technical & Spare Parts Support"] }
                  ];

                  const cardsList = (Array.isArray(formData.processHome?.cards) && formData.processHome.cards.length > 0)
                    ? formData.processHome.cards
                    : defaultInitial;

                  return cardsList.map((cardItem, cardIdx) => {
                    const cardData = {
                      num: cardItem?.num || `0${cardIdx + 1}`,
                      title: cardItem?.title || '',
                      points: Array.isArray(cardItem?.points) ? cardItem.points : (cardItem?.points ? [cardItem.points] : [])
                    };

                    const updateSingleCard = (updated) => {
                      const updatedCards = [...cardsList];
                      updatedCards[cardIdx] = updated;
                      handleFieldChange('processHome', 'cards', updatedCards);
                    };

                    const deleteSingleCard = () => {
                      const updatedCards = cardsList.filter((_, idx) => idx !== cardIdx);
                      handleFieldChange('processHome', 'cards', updatedCards);
                    };

                    return (
                      <div key={cardIdx} style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                          <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748b' }}>Card #{cardIdx + 1}</span>
                          {cardsList.length > 1 && (
                            <button
                              type="button"
                              onClick={deleteSingleCard}
                              style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
                            >
                              Delete Card
                            </button>
                          )}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '12px' }}>
                          <div>
                            <label style={{ display: 'block', fontWeight: '800', fontSize: '11.5px', color: '#475569', marginBottom: '4px' }}>Step #</label>
                            <input
                              type="text"
                              value={cardData.num}
                              onChange={(e) => updateSingleCard({ ...cardData, num: e.target.value })}
                              style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '800', color: '#00a8ff' }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontWeight: '800', fontSize: '11.5px', color: '#475569', marginBottom: '4px' }}>Step Title</label>
                            <input
                              type="text"
                              value={cardData.title}
                              onChange={(e) => updateSingleCard({ ...cardData, title: e.target.value })}
                              style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontWeight: '800', fontSize: '11.5px', color: '#475569', marginBottom: '4px' }}>Bullet Points (One per line)</label>
                          <textarea
                            rows={3}
                            value={cardData.points.join('\n')}
                            onChange={(e) => updateSingleCard({ ...cardData, points: e.target.value.split('\n') })}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '12.5px', fontFamily: 'monospace' }}
                          />
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('processHome', formData.processHome || {})}
                  style={{
                    background: '#38bdf8',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '12px',
                    fontWeight: '900',
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)'
                  }}
                >
                  Save Process Header
                </button>
              </div>
            </div>
          )}

          {/* WHY CHOOSE US SECTION FORM */}
          {activeSection === 'whyChooseUs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Why Choose Us Section</h3>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '3px 0 0' }}>Manage section title, subtitle, and key feature cards for Why Choose Us on Home page.</p>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Heading Title (Use *word* for cyan highlight color)
                </label>
                <input
                  type="text"
                  value={formData.whyChooseUs?.title || "*WHY* CHOOSE US"}
                  onChange={(e) => handleFieldChange('whyChooseUs', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Subtitle Paragraph
                </label>
                <input
                  type="text"
                  value={formData.whyChooseUs?.subtitle || "We deliver complete game zone setup solutions for businesses across India"}
                  onChange={(e) => handleFieldChange('whyChooseUs', 'subtitle', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontWeight: '500' }}
                />
              </div>

              {/* Dynamic Feature List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0 0' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Why Choose Us Feature Items</h4>
                  <button
                    type="button"
                    onClick={() => {
                      const defaultItems = [
                        { title: "ROI-Focused, From Day One", desc: "We consult on ROI first every client receives a complete report covering footfall, revenue, and payback period before we plan or select equipment." },
                        { title: "Industry Expertise", desc: "Our team recommends the right entertainment attractions based on your space, budget, and business goals." },
                        { title: "Premium Quality Equipment", desc: "We supply high-grade amusement equipment designed for reliable performance and durability." },
                        { title: "Customized Planning", desc: "Our team recommends the right entertainment attractions based on your space, budget, and business goals." },
                        { title: "Complete Turnkey Solutions", desc: "We provide end-to-end support from project planning and equipment selection to installation and execution" },
                        { title: "Pan-India Execution", desc: "We support projects across India with professional installation, project management, and execution services." }
                      ];
                      const currentItems = (Array.isArray(formData.whyChooseUs?.items) && formData.whyChooseUs.items.length > 0)
                        ? [...formData.whyChooseUs.items]
                        : [...defaultItems];

                      currentItems.push({
                        title: "New Feature Title",
                        desc: "Detailed description of feature point."
                      });
                      handleFieldChange('whyChooseUs', 'items', currentItems);
                    }}
                    style={{
                      background: '#00a8ff',
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontWeight: '800',
                      fontSize: '12.5px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0, 168, 255, 0.3)'
                    }}
                  >
                    + Add Feature
                  </button>
                </div>

                {(() => {
                  const defaultItems = [
                    { title: "ROI-Focused, From Day One", desc: "We consult on ROI first every client receives a complete report covering footfall, revenue, and payback period before we plan or select equipment." },
                    { title: "Industry Expertise", desc: "Our team recommends the right entertainment attractions based on your space, budget, and business goals." },
                    { title: "Premium Quality Equipment", desc: "We supply high-grade amusement equipment designed for reliable performance and durability." },
                    { title: "Customized Planning", desc: "Our team recommends the right entertainment attractions based on your space, budget, and business goals." },
                    { title: "Complete Turnkey Solutions", desc: "We provide end-to-end support from project planning and equipment selection to installation and execution" },
                    { title: "Pan-India Execution", desc: "We support projects across India with professional installation, project management, and execution services." }
                  ];

                  const itemsList = (Array.isArray(formData.whyChooseUs?.items) && formData.whyChooseUs.items.length > 0)
                    ? formData.whyChooseUs.items
                    : defaultItems;

                  return itemsList.map((item, itemIdx) => {
                    const itemData = {
                      title: item?.title || '',
                      desc: item?.desc || ''
                    };

                    const updateSingleItem = (updated) => {
                      const updatedItems = [...itemsList];
                      updatedItems[itemIdx] = updated;
                      handleFieldChange('whyChooseUs', 'items', updatedItems);
                    };

                    const deleteSingleItem = () => {
                      const updatedItems = itemsList.filter((_, idx) => idx !== itemIdx);
                      handleFieldChange('whyChooseUs', 'items', updatedItems);
                    };

                    return (
                      <div key={itemIdx} style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748b' }}>Feature #{itemIdx + 1}</span>
                          {itemsList.length > 1 && (
                            <button
                              type="button"
                              onClick={deleteSingleItem}
                              style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                        <div>
                          <label style={{ display: 'block', fontWeight: '800', fontSize: '11.5px', color: '#475569', marginBottom: '4px' }}>Feature Title</label>
                          <input
                            type="text"
                            value={itemData.title}
                            onChange={(e) => updateSingleItem({ ...itemData, title: e.target.value })}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontWeight: '800', fontSize: '11.5px', color: '#475569', marginBottom: '4px' }}>Feature Description</label>
                          <textarea
                            rows={2}
                            value={itemData.desc}
                            onChange={(e) => updateSingleItem({ ...itemData, desc: e.target.value })}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                          />
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('whyChooseUs', formData.whyChooseUs || {})}
                  style={{
                    background: '#38bdf8',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '12px',
                    fontWeight: '900',
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)'
                  }}
                >
                  Save Why Choose Us
                </button>
              </div>
            </div>
          )}

          {/* 2. STATS SECTION - TABLE FORMAT */}
          {activeSection === 'stats' && (() => {
            const defaultHomeStats = [
              { number: "14+", label: "YEARS OF EXPERIENCE" },
              { number: "200+", label: "Project Completed" },
              { number: "98%", label: "Happy Clients" },
              { number: "50+", label: "Cities Covered" }
            ];

            const rawHomeStats = Array.isArray(formData.stats) ? formData.stats : [];
            const homeStatsList = defaultHomeStats.map((def, idx) => {
              const current = rawHomeStats[idx] || {};
              return {
                number: current.number || current.num || def.number,
                label: current.label || current.title || def.label
              };
            });

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Company Stats</h3>
                    <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0' }}>Manage statistics heading, description, numbers, and labels displayed on the website.</p>
                  </div>
                </div>

                {/* Section Header Controls */}
                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>
                      Section Heading Title (Use *word* for cyan highlight color)
                    </label>
                    <input
                      type="text"
                      value={formData.statsHeader?.title || "DISCOVER OUR *COMPANY STATS*"}
                      onChange={(e) => handleFieldChange('statsHeader', 'title', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '600' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>
                      Section Subtitle Paragraph
                    </label>
                    <input
                      type="text"
                      value={formData.statsHeader?.description || "Helping businesses build profitable, safe, and unforgettable entertainment destinations with precision and luxury in mind."}
                      onChange={(e) => handleFieldChange('statsHeader', 'description', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '500' }}
                    />
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => persistSectionToDatabase('statsHeader', formData.statsHeader || {})}
                      style={{
                        background: '#38bdf8',
                        color: '#ffffff',
                        border: 'none',
                        padding: '8px 20px',
                        borderRadius: '10px',
                        fontWeight: '800',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      Save Section Header
                    </button>
                  </div>
                </div>

                <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ background: '#0F172B', color: '#ffffff', borderBottom: '2px solid #1e293b' }}>
                        <th style={{ padding: '14px 18px', fontWeight: '800' }}>#</th>
                        <th style={{ padding: '14px 18px', fontWeight: '800' }}>Number</th>
                        <th style={{ padding: '14px 18px', fontWeight: '800' }}>Label Text</th>
                        <th style={{ padding: '14px 18px', fontWeight: '800', textAlign: 'right' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {homeStatsList.map((item, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                          <td style={{ padding: '14px 18px', fontWeight: '700', color: '#64748b' }}>{idx + 1}</td>
                          <td style={{ padding: '14px 18px', fontWeight: '900', color: '#38bdf8', fontSize: '14px' }}>{item.number}</td>
                          <td style={{ padding: '14px 18px', fontWeight: '700', color: '#0f172a' }}>{item.label}</td>
                          <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                            <button
                              onClick={() => openModal('edit', idx, item)}
                              title="Edit Stat"
                              style={{ background: '#e0f2fe', color: '#0284c7', border: 'none', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px' }}
                            >
                              <Edit2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })()}

          {/* 3. CLIENT LOGOS - TABLE FORMAT */}
          {activeSection === 'clientLogos' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Our Clients Logos</h3>
                  <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0' }}>Manage brand logos shown on the clients marquee.</p>
                </div>
                <button
                  onClick={() => openModal('add')}
                  style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)' }}
                >
                  <Plus style={{ width: '16px', height: '16px' }} /> Add Client Logo
                </button>
              </div>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>
                    Section Heading Title (Use *word* for cyan highlight color)
                  </label>
                  <input
                    type="text"
                    value={formData.clientsHeader?.title || "*Our Clients* Section"}
                    onChange={(e) => handleFieldChange('clientsHeader', 'title', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>
                    Section Subtitle Paragraph
                  </label>
                  <input
                    type="text"
                    value={formData.clientsHeader?.subtitle || "Our Complete Game Zone Equipment & Setup Solutions"}
                    onChange={(e) => handleFieldChange('clientsHeader', 'subtitle', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '500' }}
                  />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => persistSectionToDatabase('clientsHeader', formData.clientsHeader || {})}
                    style={{
                      background: '#38bdf8',
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 20px',
                      borderRadius: '10px',
                      fontWeight: '800',
                      fontSize: '13px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)'
                    }}
                  >
                    Save Section Header
                  </button>
                </div>
              </div>

              <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: '#0F172B', color: '#ffffff', borderBottom: '2px solid #1e293b' }}>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>#</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>Logo Preview</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>Company Name</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(formData.clientLogos || []).map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                        <td style={{ padding: '14px 18px', fontWeight: '700', color: '#64748b' }}>{idx + 1}</td>
                        <td style={{ padding: '14px 18px' }}>
                          {item.logoUrl ? (
                            <img src={item.logoUrl} alt="" style={{ height: '40px', maxWidth: '100px', objectFit: 'contain' }} />
                          ) : (
                            <span style={{ color: '#94a3b8', fontSize: '12px' }}>No image</span>
                          )}
                        </td>
                        <td style={{ padding: '14px 18px', fontWeight: '800', color: '#0f172a' }}>{item.name || 'Unnamed Client'}</td>
                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                          <button
                            onClick={() => openModal('edit', idx, item)}
                            style={{ background: '#e0f2fe', color: '#0284c7', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', marginRight: '8px', fontWeight: '700', fontSize: '12px' }}
                          >
                            <Edit2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteItem(activeSection, idx)}
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

          {/* 4. CHANNEL PARTNERS - TABLE FORMAT */}
          {activeSection === 'channelPartners' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Channel Partners Logos</h3>
                  <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0' }}>Manage channel partner logos.</p>
                </div>
                <button
                  onClick={() => openModal('add')}
                  style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)' }}
                >
                  <Plus style={{ width: '16px', height: '16px' }} /> Add Channel Partner
                </button>
              </div>

              {/* Section Header Controls */}
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>
                    Section Heading Title (Use *word* for cyan highlight color)
                  </label>
                  <input
                    type="text"
                    value={formData.channelPartnersHeader?.title || "*Our Channel* partners"}
                    onChange={(e) => handleFieldChange('channelPartnersHeader', 'title', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '600' }}
                  />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => persistSectionToDatabase('channelPartnersHeader', formData.channelPartnersHeader || {})}
                    style={{
                      background: '#38bdf8',
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 20px',
                      borderRadius: '10px',
                      fontWeight: '800',
                      fontSize: '13px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)'
                    }}
                  >
                    Save Section Header
                  </button>
                </div>
              </div>

              <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: '#0F172B', color: '#ffffff', borderBottom: '2px solid #1e293b' }}>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>#</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>Partner Logo</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>Partner Name</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(formData.channelPartners || []).map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                        <td style={{ padding: '14px 18px', fontWeight: '700', color: '#64748b' }}>{idx + 1}</td>
                        <td style={{ padding: '14px 18px' }}>
                          {item.logoUrl ? (
                            <img src={item.logoUrl} alt="" style={{ height: '40px', maxWidth: '100px', objectFit: 'contain' }} />
                          ) : (
                            <span style={{ color: '#94a3b8', fontSize: '12px' }}>No image</span>
                          )}
                        </td>
                        <td style={{ padding: '14px 18px', fontWeight: '800', color: '#0f172a' }}>{item.name || 'Unnamed Partner'}</td>
                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                          <button
                            onClick={() => openModal('edit', idx, item)}
                            style={{ background: '#e0f2fe', color: '#0284c7', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', marginRight: '8px', fontWeight: '700', fontSize: '12px' }}
                          >
                            <Edit2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteItem(activeSection, idx)}
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

          {/* 5. GAME ZONES BUILT - TABLE FORMAT */}
          {activeSection === 'builtProjects' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Game Zones We Have Built Across India</h3>
                  <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0' }}>Manage game zone projects, images, and locations.</p>
                </div>
                <button
                  onClick={() => openModal('add')}
                  style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)' }}
                >
                  <Plus style={{ width: '16px', height: '16px' }} /> Add Game Zone
                </button>
              </div>

              {/* Section Header Controls */}
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>
                    Section Heading Title (Use *word* for cyan highlight color)
                  </label>
                  <input
                    type="text"
                    value={formData.builtProjectsHeader?.title || "GAME ZONES WE HAVE *BUILT ACROSS INDIA*"}
                    onChange={(e) => handleFieldChange('builtProjectsHeader', 'title', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>
                    Secondary Subtext Paragraph
                  </label>
                  <textarea
                    rows={2}
                    value={formData.builtProjectsHeader?.subtext || "Explore our successfully completed projects delivered across India from small indoor game zones to large family entertainment centers."}
                    onChange={(e) => handleFieldChange('builtProjectsHeader', 'subtext', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px' }}
                  />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => persistSectionToDatabase('builtProjectsHeader', formData.builtProjectsHeader || {})}
                    style={{
                      background: '#38bdf8',
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 20px',
                      borderRadius: '10px',
                      fontWeight: '800',
                      fontSize: '13px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)'
                    }}
                  >
                    Save Section Header
                  </button>
                </div>
              </div>

              <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: '#0F172B', color: '#ffffff', borderBottom: '2px solid #1e293b' }}>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>#</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>Venue Photo</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>Name of Game Zone</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>City</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(formData.builtProjects || []).map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                        <td style={{ padding: '14px 18px', fontWeight: '700', color: '#64748b' }}>{idx + 1}</td>
                        <td style={{ padding: '14px 18px' }}>
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt="" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
                          ) : (
                            <span style={{ color: '#94a3b8', fontSize: '12px' }}>No image</span>
                          )}
                        </td>
                        <td style={{ padding: '14px 18px', fontWeight: '800', color: '#0f172a' }}>{item.name || 'Unnamed Game Zone'}</td>
                        <td style={{ padding: '14px 18px', fontWeight: '700', color: '#38bdf8' }}>{item.city || 'N/A'}</td>
                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                          <button
                            onClick={() => openModal('edit', idx, item)}
                            style={{ background: '#e0f2fe', color: '#0284c7', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', marginRight: '8px', fontWeight: '700', fontSize: '12px' }}
                          >
                            <Edit2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Edit
                          </button>
                          <button
                            onClick={() => setFormData(prev => ({ ...prev, builtProjects: prev.builtProjects.filter((_, i) => i !== idx) }))}
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

          {/* 6. FAQS - TABLE FORMAT */}
          {activeSection === 'faqs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>FAQ (Questions & Answers)</h3>
                  <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0' }}>Manage frequent questions and answers.</p>
                </div>
                <button
                  onClick={() => openModal('add')}
                  style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)' }}
                >
                  <Plus style={{ width: '16px', height: '16px' }} /> Add FAQ
                </button>
              </div>

              {/* Section Header Controls */}
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>
                    Section Heading Title (Use *word* for cyan highlight color)
                  </label>
                  <input
                    type="text"
                    value={formData.faqsHeader?.title || "Frequently Asked *Questions*"}
                    onChange={(e) => handleFieldChange('faqsHeader', 'title', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>
                    Secondary Subtitle Paragraph
                  </label>
                  <input
                    type="text"
                    value={formData.faqsHeader?.subtitle || "Got questions about setting up your game zone? We've got answers."}
                    onChange={(e) => handleFieldChange('faqsHeader', 'subtitle', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px' }}
                  />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => persistSectionToDatabase('faqsHeader', formData.faqsHeader || {})}
                    style={{
                      background: '#38bdf8',
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 20px',
                      borderRadius: '10px',
                      fontWeight: '800',
                      fontSize: '13px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)'
                    }}
                  >
                    Save Section Header
                  </button>
                </div>
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
                    {(formData.faqs || []).map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                        <td style={{ padding: '14px 18px', fontWeight: '700', color: '#64748b' }}>{idx + 1}</td>
                        <td style={{ padding: '14px 18px', fontWeight: '800', color: '#0f172a' }}>{item.q}</td>
                        <td style={{ padding: '14px 18px', color: '#475569', fontSize: '12.5px', lineHeight: '1.4' }}>{item.a}</td>
                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                          <button
                            onClick={() => openModal('edit', idx, item)}
                            style={{ background: '#e0f2fe', color: '#0284c7', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', marginRight: '8px', fontWeight: '700', fontSize: '12px' }}
                          >
                            <Edit2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Edit
                          </button>
                          <button
                            onClick={() => setFormData(prev => ({ ...prev, faqs: prev.faqs.filter((_, i) => i !== idx) }))}
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

          {/* 7. TESTIMONIALS - TABLE FORMAT */}
          {activeSection === 'testimonials' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Client Testimonials</h3>
                  <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0' }}>Manage client feedback, ratings, and video links.</p>
                </div>
                <button
                  onClick={() => openModal('add')}
                  style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)' }}
                >
                  <Plus style={{ width: '16px', height: '16px' }} /> Add Testimonial
                </button>
              </div>

              {/* Section Header Controls */}
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>
                    Section Heading Title (Use *word* for cyan highlight color)
                  </label>
                  <input
                    type="text"
                    value={formData.testimonialsHeader?.title || "*What Our* Clients Say"}
                    onChange={(e) => handleFieldChange('testimonialsHeader', 'title', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>
                    Secondary Subtitle Paragraph (Optional default override)
                  </label>
                  <input
                    type="text"
                    value={formData.testimonialsHeader?.subtitle || ""}
                    placeholder="Leave empty to display individual client quote per active card"
                    onChange={(e) => handleFieldChange('testimonialsHeader', 'subtitle', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px' }}
                  />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => persistSectionToDatabase('testimonialsHeader', formData.testimonialsHeader || {})}
                    style={{
                      background: '#38bdf8',
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 20px',
                      borderRadius: '10px',
                      fontWeight: '800',
                      fontSize: '13px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)'
                    }}
                  >
                    Save Section Header
                  </button>
                </div>
              </div>

              <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: '#0F172B', color: '#ffffff', borderBottom: '2px solid #1e293b' }}>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>#</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>Founder Photo</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>Game Zone Name</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>Role / Post</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>Rating</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(formData.testimonials || []).map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                        <td style={{ padding: '14px 18px', fontWeight: '700', color: '#64748b' }}>{idx + 1}</td>
                        <td style={{ padding: '14px 18px' }}>
                          {item.founderImage ? (
                            <img src={item.founderImage} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                          ) : (
                            <span style={{ color: '#94a3b8', fontSize: '12px' }}>No photo</span>
                          )}
                        </td>
                        <td style={{ padding: '14px 18px', fontWeight: '800', color: '#0f172a' }}>{item.gameZoneName || 'Unnamed Game Zone'}</td>
                        <td style={{ padding: '14px 18px', color: '#64748b', fontWeight: '600' }}>{item.reviewerRole || 'Reviewer'}</td>
                        <td style={{ padding: '14px 18px', fontWeight: '900', color: '#ffcd00' }}>
                          {item.starRating || 5} ★
                        </td>
                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                          <button
                            onClick={() => openModal('edit', idx, item)}
                            style={{ background: '#e0f2fe', color: '#0284c7', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', marginRight: '8px', fontWeight: '700', fontSize: '12px' }}
                          >
                            <Edit2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteItem(activeSection, idx)}
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

          {/* CTA CONSULTATION BANNER SECTION FORM */}
          {activeSection === 'ctaBanner' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>CTA Consultation Banner</h3>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '3px 0 0' }}>Manage top subtitle tag, main heading title, CTA button label, link, and background banner image.</p>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Top Tagline (e.g. READY TO GET STARTED?)
                </label>
                <input
                  type="text"
                  value={formData.ctaBanner?.tagline || "READY TO GET STARTED?"}
                  onChange={(e) => handleFieldChange('ctaBanner', 'tagline', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Banner Main Title Heading
                </label>
                <input
                  type="text"
                  value={formData.ctaBanner?.title || "Start Your Game Zone Journey"}
                  onChange={(e) => handleFieldChange('ctaBanner', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '700' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Yellow Highlight Subtitle
                </label>
                <input
                  type="text"
                  value={formData.ctaBanner?.subtitle || "Game Zones Are India's Fastest Growing Business Are You In?"}
                  onChange={(e) => handleFieldChange('ctaBanner', 'subtitle', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Description Paragraph
                </label>
                <textarea
                  rows={2}
                  value={formData.ctaBanner?.description || "Get expert guidance, custom layout design and complete installation support from India's trusted game zone setup company"}
                  onChange={(e) => handleFieldChange('ctaBanner', 'description', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13px', fontFamily: 'inherit' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  CTA Button Text
                </label>
                <input
                  type="text"
                  value={formData.ctaBanner?.buttonText || "Talk to an Expert"}
                  onChange={(e) => handleFieldChange('ctaBanner', 'buttonText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  CTA Button Link / URL
                </label>
                <input
                  type="text"
                  value={formData.ctaBanner?.buttonLink || "https://wa.me/919428989488"}
                  onChange={(e) => handleFieldChange('ctaBanner', 'buttonLink', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Background Banner Image
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  {formData.ctaBanner?.bgUrl && (
                    <div style={{ position: 'relative', width: '180px', height: '60px', borderRadius: '12px', overflow: 'hidden', border: '2px solid #cbd5e1' }}>
                      <img src={formData.ctaBanner.bgUrl} alt="Banner Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
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
                        setStatusMsg('Uploading banner image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          handleFieldChange('ctaBanner', 'bgUrl', res.url);
                          setStatusMsg('Banner image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                    />
                  </label>
                  {formData.ctaBanner?.bgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('ctaBanner', 'bgUrl', '')}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Remove Custom Banner
                    </button>
                  )}
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('ctaBanner', formData.ctaBanner || {})}
                  style={{
                    background: '#38bdf8',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '12px',
                    fontWeight: '900',
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)'
                  }}
                >
                  Save CTA Banner
                </button>
              </div>
            </div>
          )}

          {/* ARCADE HERO BANNER FORM */}
          {activeSection === 'arcadeHero' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Arcade Hero Banner</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Hero Title (Use *word* for Yellow Highlight)
                </label>
                <input
                  type="text"
                  value={formData.arcadeHero?.title || '*Arcade* Game'}
                  onChange={(e) => handleFieldChange('arcadeHero', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Breadcrumb Active Page Text
                </label>
                <input
                  type="text"
                  value={formData.arcadeHero?.breadcrumbText || 'Arcade Game'}
                  onChange={(e) => handleFieldChange('arcadeHero', 'breadcrumbText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>
              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arcadeHero', formData.arcadeHero || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Arcade Hero Banner
                </button>
              </div>
            </div>
          )}

          {/* ARCADE INTRO & SPECS FORM */}
          {activeSection === 'arcadeIntro' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Arcade Game Machines In India Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Main Section Title (Use *word* for Cyan Accent)
                </label>
                <input
                  type="text"
                  value={formData.arcadeIntro?.title || '*Arcade Game* Machines in India'}
                  onChange={(e) => handleFieldChange('arcadeIntro', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              {/* Image 1 Upload: Main Top-Left Image */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Main Top-Left Image (Racing/Boy Photo)</label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <label style={{
                    background: '#38bdf8',
                    color: '#fff',
                    padding: '10px 18px',
                    borderRadius: '12px',
                    fontWeight: '800',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Main Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading main image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.arcadeIntro || {}), mainImgUrl: res.url };
                          setFormData(prev => ({ ...prev, arcadeIntro: updated }));
                          await persistSectionToDatabase('arcadeIntro', updated);
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {formData.arcadeIntro?.mainImgUrl && (
                    <img src={formData.arcadeIntro.mainImgUrl} alt="" style={{ width: '50px', height: '50px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #38bdf8' }} />
                  )}
                </div>
              </div>

              {/* Image 2 Upload: Secondary Bottom-Right Image */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Secondary Bottom-Right Image (Arcade Arena Overview)</label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <label style={{
                    background: '#38bdf8',
                    color: '#fff',
                    padding: '10px 18px',
                    borderRadius: '12px',
                    fontWeight: '800',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Secondary Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading secondary image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.arcadeIntro || {}), secondaryImgUrl: res.url };
                          setFormData(prev => ({ ...prev, arcadeIntro: updated }));
                          await persistSectionToDatabase('arcadeIntro', updated);
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {formData.arcadeIntro?.secondaryImgUrl && (
                    <img src={formData.arcadeIntro.secondaryImgUrl} alt="" style={{ width: '50px', height: '50px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #38bdf8' }} />
                  )}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Floating Pill Tag Text
                </label>
                <input
                  type="text"
                  value={formData.arcadeIntro?.floatingTag || 'Set Up Arcade Arena Now !'}
                  onChange={(e) => handleFieldChange('arcadeIntro', 'floatingTag', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Description Paragraph
                </label>
                <textarea
                  rows={4}
                  value={formData.arcadeIntro?.desc || ''}
                  onChange={(e) => handleFieldChange('arcadeIntro', 'desc', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontWeight: '500' }}
                />
              </div>

              {/* Feature 1: Commercial Durability */}
              <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Feature 1 Control</h4>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Feature 1 Title</label>
                  <input
                    type="text"
                    value={formData.arcadeIntro?.feature1Title || 'Commercial Durability'}
                    onChange={(e) => handleFieldChange('arcadeIntro', 'feature1Title', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Feature 1 Description</label>
                  <textarea
                    rows={2}
                    value={formData.arcadeIntro?.feature1Desc || ''}
                    onChange={(e) => handleFieldChange('arcadeIntro', 'feature1Desc', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              {/* Feature 2: Installation Network */}
              <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Feature 2 Control</h4>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Feature 2 Title</label>
                  <input
                    type="text"
                    value={formData.arcadeIntro?.feature2Title || 'Installation Network'}
                    onChange={(e) => handleFieldChange('arcadeIntro', 'feature2Title', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Feature 2 Description</label>
                  <textarea
                    rows={2}
                    value={formData.arcadeIntro?.feature2Desc || ''}
                    onChange={(e) => handleFieldChange('arcadeIntro', 'feature2Desc', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    Watch Video Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.arcadeIntro?.videoBtnText || 'Watch Video'}
                    onChange={(e) => handleFieldChange('arcadeIntro', 'videoBtnText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    Watch Video Link URL
                  </label>
                  <input
                    type="text"
                    value={formData.arcadeIntro?.videoLink || 'https://youtube.com'}
                    onChange={(e) => handleFieldChange('arcadeIntro', 'videoLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    Get Quote Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.arcadeIntro?.quoteBtnText || 'Get a Quote'}
                    onChange={(e) => handleFieldChange('arcadeIntro', 'quoteBtnText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    Get Quote Link URL
                  </label>
                  <input
                    type="text"
                    value={formData.arcadeIntro?.quoteLink || 'https://wa.me/919428989488'}
                    onChange={(e) => handleFieldChange('arcadeIntro', 'quoteLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arcadeIntro', formData.arcadeIntro || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Arcade Intro Section
                </button>
              </div>
            </div>
          )}

          {/* BUILT FOR COMMERCIAL USE SECTION FORM */}
          {activeSection === 'arcadeCommercial' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Built for Commercial Use Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Title (Use *word* for Cyan Highlight)
                </label>
                <input
                  type="text"
                  value={formData.arcadeCommercial?.title || 'Built for *Commercial Use*'}
                  onChange={(e) => handleFieldChange('arcadeCommercial', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>



              {/* Team Photo Upload */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Team Photo (Right Graphic Frame)</label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <label style={{
                    background: '#38bdf8',
                    color: '#fff',
                    padding: '10px 18px',
                    borderRadius: '12px',
                    fontWeight: '800',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Team Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading team photo...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.arcadeCommercial || {}), teamImgUrl: res.url };
                          setFormData(prev => ({ ...prev, arcadeCommercial: updated }));
                          await persistSectionToDatabase('arcadeCommercial', updated);
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {formData.arcadeCommercial?.teamImgUrl && (
                    <img src={formData.arcadeCommercial.teamImgUrl} alt="" style={{ width: '50px', height: '50px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #38bdf8' }} />
                  )}
                </div>
              </div>

              {/* Point 1 Control */}
              <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Checkmark Block 1</h4>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Title</label>
                  <input
                    type="text"
                    value={formData.arcadeCommercial?.point1Title || 'Built for Real Commercial Footfall'}
                    onChange={(e) => handleFieldChange('arcadeCommercial', 'point1Title', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Description Paragraphs</label>
                  <textarea
                    rows={4}
                    value={formData.arcadeCommercial?.point1Text || ''}
                    onChange={(e) => handleFieldChange('arcadeCommercial', 'point1Text', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              {/* Point 2 Control */}
              <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Checkmark Block 2</h4>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Title</label>
                  <input
                    type="text"
                    value={formData.arcadeCommercial?.point2Title || 'What Will Your Arcade Game Zone Actually Earn?'}
                    onChange={(e) => handleFieldChange('arcadeCommercial', 'point2Title', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Description Paragraphs</label>
                  <textarea
                    rows={4}
                    value={formData.arcadeCommercial?.point2Text || ''}
                    onChange={(e) => handleFieldChange('arcadeCommercial', 'point2Text', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              {/* WhatsApp Action Button Controls */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    WhatsApp Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.arcadeCommercial?.ctaBtnText || 'Talk to an ROI Expert'}
                    onChange={(e) => handleFieldChange('arcadeCommercial', 'ctaBtnText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    WhatsApp Link URL
                  </label>
                  <input
                    type="text"
                    value={formData.arcadeCommercial?.ctaLink || 'https://wa.me/919428989488'}
                    onChange={(e) => handleFieldChange('arcadeCommercial', 'ctaLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arcadeCommercial', formData.arcadeCommercial || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Commercial Use Section
                </button>
              </div>
            </div>
          )}

          {/* WHY CHOOSE WINERA ARCADE FORM */}
          {activeSection === 'arcadeWhyUs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Why Choose Winera Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Title (Use *word* for Cyan Accent)
                </label>
                <input
                  type="text"
                  value={formData.arcadeWhyUs?.title || 'Why Choose *Winera International*'}
                  onChange={(e) => handleFieldChange('arcadeWhyUs', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              {/* Dynamic Feature Cards List */}
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                    Why Choose Us Feature Items ({((Array.isArray(formData.arcadeWhyUs?.items) && formData.arcadeWhyUs.items.length > 0) ? formData.arcadeWhyUs.items : [
                      { title: "15+ Years In The Industry", desc: "Supplying And Supporting Indoor Amusement Equipment Across India" },
                      { title: "Successful Installations", desc: "From Malls To Resorts, Our Track Record Speaks Through Completed Projects, Not Just Promises." },
                      { title: "Direct Sourcing", desc: "We Work Straight With Global Manufacturers — Consistent Quality, No Unnecessary Markup." },
                      { title: "Pricing That Makes Sense", desc: "No Hidden Costs, No Inflated Resale Pricing — Fair Rates Backed By Direct Sourcing" },
                      { title: "Local Support In 50+ Cities", desc: "Our Own Technicians Install And Service Every Machine — No Waiting On Overseas Suppliers." },
                      { title: "Easy To Maintain", desc: "Equipment Rated For Heavy Daily Commercial Use — Fewer Breakdowns, More Consistent Revenue" },
                      { title: "Solutions That Fit Your Space", desc: "Every Recommendation Based On Your Venue Size, Footfall, And Budget — Never One-Size-Fits-All." }
                    ]).length} Items)
                  </h4>

                  <button
                    onClick={() => {
                      const defaultItems = [
                        { title: "15+ Years In The Industry", desc: "Supplying And Supporting Indoor Amusement Equipment Across India" },
                        { title: "Successful Installations", desc: "From Malls To Resorts, Our Track Record Speaks Through Completed Projects, Not Just Promises." },
                        { title: "Direct Sourcing", desc: "We Work Straight With Global Manufacturers — Consistent Quality, No Unnecessary Markup." },
                        { title: "Pricing That Makes Sense", desc: "No Hidden Costs, No Inflated Resale Pricing — Fair Rates Backed By Direct Sourcing" },
                        { title: "Local Support In 50+ Cities", desc: "Our Own Technicians Install And Service Every Machine — No Waiting On Overseas Suppliers." },
                        { title: "Easy To Maintain", desc: "Equipment Rated For Heavy Daily Commercial Use — Fewer Breakdowns, More Consistent Revenue" },
                        { title: "Solutions That Fit Your Space", desc: "Every Recommendation Based On Your Venue Size, Footfall, And Budget — Never One-Size-Fits-All." }
                      ];
                      const currentItems = (Array.isArray(formData.arcadeWhyUs?.items) && formData.arcadeWhyUs.items.length > 0)
                        ? formData.arcadeWhyUs.items
                        : defaultItems;

                      const updatedItems = [...currentItems, { title: "New Feature Title", desc: "Description text..." }];
                      setFormData(prev => ({
                        ...prev,
                        arcadeWhyUs: { ...(prev.arcadeWhyUs || {}), items: updatedItems }
                      }));
                    }}
                    style={{
                      background: '#38bdf8',
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontSize: '12.5px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Plus style={{ width: '14px', height: '14px' }} /> Add Feature Item
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {(() => {
                    const defaultItems = [
                      { title: "15+ Years In The Industry", desc: "Supplying And Supporting Indoor Amusement Equipment Across India" },
                      { title: "Successful Installations", desc: "From Malls To Resorts, Our Track Record Speaks Through Completed Projects, Not Just Promises." },
                      { title: "Direct Sourcing", desc: "We Work Straight With Global Manufacturers — Consistent Quality, No Unnecessary Markup." },
                      { title: "Pricing That Makes Sense", desc: "No Hidden Costs, No Inflated Resale Pricing — Fair Rates Backed By Direct Sourcing" },
                      { title: "Local Support In 50+ Cities", desc: "Our Own Technicians Install And Service Every Machine — No Waiting On Overseas Suppliers." },
                      { title: "Easy To Maintain", desc: "Equipment Rated For Heavy Daily Commercial Use — Fewer Breakdowns, More Consistent Revenue" },
                      { title: "Solutions That Fit Your Space", desc: "Every Recommendation Based On Your Venue Size, Footfall, And Budget — Never One-Size-Fits-All." }
                    ];

                    const itemsList = (Array.isArray(formData.arcadeWhyUs?.items) && formData.arcadeWhyUs.items.length > 0)
                      ? formData.arcadeWhyUs.items
                      : (Array.isArray(formData.arcadeWhyUs?.topItems) && formData.arcadeWhyUs.topItems.length > 0)
                        ? [...formData.arcadeWhyUs.topItems, ...(formData.arcadeWhyUs.bottomItems || [])]
                        : defaultItems;

                    return itemsList.map((item, idx) => (
                      <div key={idx} style={{ background: '#ffffff', padding: '14px 18px', borderRadius: '14px', border: '1px solid #cbd5e1', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontWeight: '800', fontSize: '12px', color: '#38bdf8' }}>Feature Item #{idx + 1}</span>
                          <button
                            onClick={() => {
                              const updated = itemsList.filter((_, i) => i !== idx);
                              setFormData(prev => ({
                                ...prev,
                                arcadeWhyUs: { ...(prev.arcadeWhyUs || {}), items: updated }
                              }));
                            }}
                            style={{
                              background: '#fee2e2',
                              color: '#ef4444',
                              border: 'none',
                              padding: '4px 10px',
                              borderRadius: '8px',
                              fontSize: '11px',
                              fontWeight: '800',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Trash2 style={{ width: '12px', height: '12px' }} /> Delete
                          </button>
                        </div>

                        <input
                          type="text"
                          placeholder="Feature Title"
                          value={item.title || ''}
                          onChange={(e) => {
                            const updated = [...itemsList];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            setFormData(prev => ({
                              ...prev,
                              arcadeWhyUs: { ...(prev.arcadeWhyUs || {}), items: updated }
                            }));
                          }}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}
                        />
                        <textarea
                          rows={2}
                          placeholder="Feature Description"
                          value={item.desc || ''}
                          onChange={(e) => {
                            const updated = [...itemsList];
                            updated[idx] = { ...updated[idx], desc: e.target.value };
                            setFormData(prev => ({
                              ...prev,
                              arcadeWhyUs: { ...(prev.arcadeWhyUs || {}), items: updated }
                            }));
                          }}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                        />
                      </div>
                    ));
                  })()}
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arcadeWhyUs', formData.arcadeWhyUs || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Why Choose Section
                </button>
              </div>
            </div>
          )}

          {/* RELATED PRODUCTS SECTION FORM */}
          {activeSection === 'arcadeRelated' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Related Products Carousel Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Title (Use *word* for Cyan Highlight)
                </label>
                <input
                  type="text"
                  value={formData.arcadeRelated?.title || '*Related* Products'}
                  onChange={(e) => handleFieldChange('arcadeRelated', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              {/* Product Cards List (14 Category Cards) */}
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', marginBottom: '14px' }}>Product Category Cards & Cover Images</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {(() => {
                    const defaultList = [
                      { title: "Arcade Games", link: "/products/arcade-games", img: "" },
                      { title: "VR Games", link: "/products/vr-games", img: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80" },
                      { title: "AR Games", link: "/products/ar-games", img: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=600&q=80" },
                      { title: "Bowling Alley", link: "/products/bowling-alley", img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80" },
                      { title: "Trampoline Park", link: "/products/trampoline-park", img: "" },
                      { title: "Soft Play", link: "/products/soft-play", img: "" },
                      { title: "Bumper Cars", link: "/products/bumper-cars", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80" },
                      { title: "Hypergrid", link: "/products/hypergrid", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80" },
                      { title: "Laser Tag", link: "/products/laser-tag", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80" },
                      { title: "Amusement Park", link: "/products/amusement-park", img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80" },
                      { title: "Lights", link: "/products/lights", img: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80" },
                      { title: "Sculpture", link: "/products/sculpture", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80" },
                      { title: "Reception Table", link: "/products/reception-table", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80" },
                      { title: "Other Furniture", link: "/products/other-furniture", img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80" }
                    ];

                    const itemsList = (Array.isArray(formData.arcadeRelated?.items) && formData.arcadeRelated.items.length > 0)
                      ? formData.arcadeRelated.items
                      : defaultList;

                    return itemsList.map((item, idx) => (
                      <div key={idx} style={{ background: '#ffffff', padding: '16px', borderRadius: '14px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: '800', fontSize: '13px', color: '#38bdf8' }}>Category Card #{idx + 1}</span>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Card Title</label>
                          <input
                            type="text"
                            value={item.title || ''}
                            onChange={(e) => {
                              const updated = [...itemsList];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setFormData(prev => ({
                                ...prev,
                                arcadeRelated: { ...(prev.arcadeRelated || {}), items: updated }
                              }));
                            }}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                          />
                        </div>

                        {/* Image Upload Input */}
                        <div>
                          <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Category Cover Photo</label>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <label style={{
                              background: '#38bdf8',
                              color: '#fff',
                              padding: '8px 14px',
                              borderRadius: '8px',
                              fontWeight: '700',
                              fontSize: '12px',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}>
                              <Upload style={{ width: '14px', height: '14px' }} /> Upload Cover Photo
                              <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                  const file = e.target.files[0];
                                  if (!file) return;
                                  setStatusMsg(`Uploading photo for ${item.title}...`);
                                  try {
                                    const res = await uploadImageFile(file, admin.token);
                                    const updated = [...itemsList];
                                    updated[idx] = { ...updated[idx], img: res.url };
                                    const updatedSection = { ...(formData.arcadeRelated || {}), items: updated };
                                    setFormData(prev => ({ ...prev, arcadeRelated: updatedSection }));
                                    await persistSectionToDatabase('arcadeRelated', updatedSection);
                                  } catch (err) {
                                    setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                                  }
                                }}
                                style={{ display: 'none' }}
                              />
                            </label>
                            {item.img && (
                              <img src={item.img} alt="" style={{ width: '50px', height: '36px', borderRadius: '6px', objectFit: 'cover', border: '1.5px solid #38bdf8' }} />
                            )}
                          </div>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arcadeRelated', formData.arcadeRelated || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Related Products Section
                </button>
              </div>
            </div>
          )}

          {/* ARCADE CTA BANNER SECTION FORM */}
          {activeSection === 'arcadeCta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Arcade CTA Banner Section</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Yellow Highlighted Words (e.g. "NEED ANY")
                </label>
                <input
                  type="text"
                  value={formData.arcadeCta?.yellowText ?? "NEED ANY"}
                  onChange={(e) => handleFieldChange('arcadeCta', 'yellowText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Cyan Highlighted Words (e.g. "CONSULTATIONS ?")
                </label>
                <input
                  type="text"
                  value={formData.arcadeCta?.cyanText ?? "CONSULTATIONS ?"}
                  onChange={(e) => handleFieldChange('arcadeCta', 'cyanText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  White Main Subtitle Text
                </label>
                <input
                  type="text"
                  value={formData.arcadeCta?.whiteText ?? "WE'RE READY TO GIVE ANSWERS TO YOUR QUESTION."}
                  onChange={(e) => handleFieldChange('arcadeCta', 'whiteText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    CTA Button Label Text
                  </label>
                  <input
                    type="text"
                    value={formData.arcadeCta?.buttonText ?? "Get Quote Now"}
                    onChange={(e) => handleFieldChange('arcadeCta', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                    CTA Button Target Link URL
                  </label>
                  <input
                    type="text"
                    value={formData.arcadeCta?.buttonLink ?? "https://wa.me/919428989488"}
                    onChange={(e) => handleFieldChange('arcadeCta', 'buttonLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              {/* Background Banner Image Upload */}
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Background Banner Image
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  {formData.arcadeCta?.bgUrl && (
                    <div style={{ position: 'relative', width: '180px', height: '60px', borderRadius: '12px', overflow: 'hidden', border: '2px solid #cbd5e1' }}>
                      <img src={formData.arcadeCta.bgUrl} alt="Banner Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
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
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)'
                  }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Banner Image
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading banner image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          handleFieldChange('arcadeCta', 'bgUrl', res.url);
                          setStatusMsg('Banner image uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                    />
                  </label>
                  {formData.arcadeCta?.bgUrl && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('arcadeCta', 'bgUrl', '')}
                      style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                    >
                      Remove Custom Banner
                    </button>
                  )}
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arcadeCta', formData.arcadeCta || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Arcade CTA Banner
                </button>
              </div>
            </div>
          )}

          {/* ARCADE PAGE FAQS FORM */}
          {activeSection === 'arcadeFaqs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Arcade Page FAQs</h3>
                  <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0' }}>Manage custom FAQs specific to Arcade Games page.</p>
                </div>
                <button
                  onClick={() => openModal('add', null, null, 'arcadeFaqs')}
                  style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)' }}
                >
                  <Plus style={{ width: '16px', height: '16px' }} /> Add Arcade FAQ
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
                    {(formData.arcadeFaqs || []).map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                        <td style={{ padding: '14px 18px', fontWeight: '700', color: '#64748b' }}>{idx + 1}</td>
                        <td style={{ padding: '14px 18px', fontWeight: '800', color: '#0f172a' }}>{item.q}</td>
                        <td style={{ padding: '14px 18px', color: '#475569', fontSize: '12.5px', lineHeight: '1.4' }}>{item.a}</td>
                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                          <button
                            onClick={() => openModal('edit', idx, item, 'arcadeFaqs')}
                            style={{ background: '#e0f2fe', color: '#0284c7', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', marginRight: '8px', fontWeight: '700', fontSize: '12px' }}
                          >
                            <Edit2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Edit
                          </button>
                          <button
                            onClick={async () => {
                              const updated = (formData.arcadeFaqs || []).filter((_, i) => i !== idx);
                              setFormData(prev => ({ ...prev, arcadeFaqs: updated }));
                              await persistSectionToDatabase('arcadeFaqs', updated);
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

          {/* SOFT PLAY HERO BANNER FORM */}
          {activeSection === 'softplayHero' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Soft Play Hero Banner</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Hero Title (Use *word* for Yellow Highlight)
                </label>
                <input
                  type="text"
                  value={formData.softplayHero?.title || '*Soft* Play'}
                  onChange={(e) => handleFieldChange('softplayHero', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Breadcrumb Active Page Text
                </label>
                <input
                  type="text"
                  value={formData.softplayHero?.breadcrumbText || 'Soft Play'}
                  onChange={(e) => handleFieldChange('softplayHero', 'breadcrumbText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Custom Background Image
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {formData.softplayHero?.bgUrl && (
                    <img src={formData.softplayHero.bgUrl} alt="Preview" style={{ height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                  )}
                  <label style={{ background: '#38bdf8', color: '#fff', padding: '10px 18px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Custom Background
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading background image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          handleFieldChange('softplayHero', 'bgUrl', res.url);
                          setStatusMsg('Background image uploaded!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('softplayHero', formData.softplayHero || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Soft Play Hero Banner
                </button>
              </div>
            </div>
          )}

          {/* INDOOR SOFT PLAY MANUFACTURER SECTION FORM */}
          {activeSection === 'softplayIntro' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Indoor Soft Play Equipment Manufacturer Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue, and use <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>&lt;br/&gt;</code> for line breaks.</p>
                <input
                  type="text"
                  value={formData.softplayIntro?.title || '*Indoor Soft Play*<br/>Equipment Manufacturer in India'}
                  onChange={(e) => handleFieldChange('softplayIntro', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Description Paragraph</label>
                <textarea
                  rows={3}
                  value={formData.softplayIntro?.desc || ''}
                  onChange={(e) => handleFieldChange('softplayIntro', 'desc', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Label Text</label>
                  <input
                    type="text"
                    value={formData.softplayIntro?.buttonText || 'Get Quote From Expert'}
                    onChange={(e) => handleFieldChange('softplayIntro', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link URL</label>
                  <input
                    type="text"
                    value={formData.softplayIntro?.buttonLink || 'https://wa.me/919428989488'}
                    onChange={(e) => handleFieldChange('softplayIntro', 'buttonLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              {/* Photo Collage Uploads */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Section Photo Uploads</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  {[
                    { label: 'Main Top Play Area Photo', field: 'mainImgUrl' },
                    { label: 'Secondary Bottom Overlapping Photo', field: 'secondaryImgUrl' }
                  ].map((imgItem, iIdx) => (
                    <div key={iIdx} style={{ background: '#ffffff', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                      <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>{imgItem.label}</label>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <label style={{ background: '#38bdf8', color: '#fff', padding: '6px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '11.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Upload style={{ width: '13px', height: '13px' }} /> Upload Photo
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (!file) return;
                              setStatusMsg('Uploading photo...');
                              try {
                                const res = await uploadImageFile(file, admin.token);
                                handleFieldChange('softplayIntro', imgItem.field, res.url);
                                setStatusMsg('Photo uploaded!');
                              } catch (err) {
                                setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                              }
                            }}
                            style={{ display: 'none' }}
                          />
                        </label>
                        {formData.softplayIntro?.[imgItem.field] && (
                          <img src={formData.softplayIntro[imgItem.field]} alt="" style={{ height: '35px', width: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('softplayIntro', formData.softplayIntro || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Soft Play Intro Section
                </button>
              </div>
            </div>
          )}

          {/* SOFT PLAY EQUIPMENT MANUFACTURE SECTION FORM */}
          {activeSection === 'softplayManufacture' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Soft Play Equipment Manufacture Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue, and use <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>&lt;br/&gt;</code> for line breaks.</p>
                <input
                  type="text"
                  value={formData.softplayManufacture?.title || 'Soft Play *Equipment Manufacture*'}
                  onChange={(e) => handleFieldChange('softplayManufacture', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 1 Description</label>
                <textarea
                  rows={3}
                  value={formData.softplayManufacture?.p1 || ''}
                  onChange={(e) => handleFieldChange('softplayManufacture', 'p1', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 2 Description</label>
                <textarea
                  rows={3}
                  value={formData.softplayManufacture?.p2 || ''}
                  onChange={(e) => handleFieldChange('softplayManufacture', 'p2', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Watch Video Button Label</label>
                  <input
                    type="text"
                    value={formData.softplayManufacture?.btnText || 'Watch Video'}
                    onChange={(e) => handleFieldChange('softplayManufacture', 'btnText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Watch Video URL Link</label>
                  <input
                    type="text"
                    value={formData.softplayManufacture?.videoUrl || 'https://wa.me/919428989488'}
                    onChange={(e) => handleFieldChange('softplayManufacture', 'videoUrl', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              {/* 3D Castle Image Upload */}
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>3D Castle Render Image Upload</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <label style={{ background: '#38bdf8', color: '#fff', padding: '10px 18px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload 3D Render Image
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading 3D castle render...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          handleFieldChange('softplayManufacture', 'imgUrl', res.url);
                          setStatusMsg('3D Castle render uploaded!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                    />
                  </label>
                  {formData.softplayManufacture?.imgUrl && (
                    <img src={formData.softplayManufacture.imgUrl} alt="" style={{ height: '50px', objectFit: 'contain' }} />
                  )}
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('softplayManufacture', formData.softplayManufacture || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Soft Play Equipment Manufacture Section
                </button>
              </div>
            </div>
          )}

          {/* TECHNICAL SPECIFICATIONS SECTION FORM */}
          {activeSection === 'softplaySpecs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Technical Specifications Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Yellow, and use <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>&lt;br/&gt;</code> for line breaks.</p>
                <input
                  type="text"
                  value={formData.softplaySpecs?.title || '*Technical* Specifications'}
                  onChange={(e) => handleFieldChange('softplaySpecs', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              {/* Dynamic Specifications Rows Manager */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Specification Table Rows</h4>
                  <button
                    type="button"
                    onClick={() => {
                      const currentSpecs = Array.isArray(formData.softplaySpecs?.specsList) && formData.softplaySpecs.specsList.length > 0
                        ? [...formData.softplaySpecs.specsList]
                        : [
                          { spec: 'Target age group', details: '2–12 years' },
                          { spec: 'Minimum space required', details: '500 sq ft' },
                          { spec: 'Maximum height', details: 'Customisable to your venue' },
                          { spec: 'Construction', details: 'Galvanized steel frame, imported LLDPE, soft PVC cover' },
                          { spec: 'Safety', details: 'Padded surfaces, rounded edges — commercial grade' },
                          { spec: 'Customisation', details: 'Theme, colour, layout, activities' },
                          { spec: 'Installation', details: "Pan-India by Winera's own team" },
                          { spec: 'Expected lifespan', details: '10+ years with proper maintenance' }
                        ];
                      currentSpecs.push({ spec: '', details: '' });
                      handleFieldChange('softplaySpecs', 'specsList', currentSpecs);
                    }}
                    style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Plus style={{ width: '14px', height: '14px' }} /> Add Row
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(Array.isArray(formData.softplaySpecs?.specsList) && formData.softplaySpecs.specsList.length > 0
                    ? formData.softplaySpecs.specsList
                    : [
                      { spec: 'Target age group', details: '2–12 years' },
                      { spec: 'Minimum space required', details: '500 sq ft' },
                      { spec: 'Maximum height', details: 'Customisable to your venue' },
                      { spec: 'Construction', details: 'Galvanized steel frame, imported LLDPE, soft PVC cover' },
                      { spec: 'Safety', details: 'Padded surfaces, rounded edges — commercial grade' },
                      { spec: 'Customisation', details: 'Theme, colour, layout, activities' },
                      { spec: 'Installation', details: "Pan-India by Winera's own team" },
                      { spec: 'Expected lifespan', details: '10+ years with proper maintenance' }
                    ]
                  ).map((sRow, rIdx) => (
                    <div key={rIdx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', alignItems: 'center', background: '#ffffff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                      <input
                        type="text"
                        placeholder="Specification Name"
                        value={sRow.spec}
                        onChange={(e) => {
                          const currentSpecs = Array.isArray(formData.softplaySpecs?.specsList) && formData.softplaySpecs.specsList.length > 0
                            ? [...formData.softplaySpecs.specsList]
                            : [
                              { spec: 'Target age group', details: '2–12 years' },
                              { spec: 'Minimum space required', details: '500 sq ft' },
                              { spec: 'Maximum height', details: 'Customisable to your venue' },
                              { spec: 'Construction', details: 'Galvanized steel frame, imported LLDPE, soft PVC cover' },
                              { spec: 'Safety', details: 'Padded surfaces, rounded edges — commercial grade' },
                              { spec: 'Customisation', details: 'Theme, colour, layout, activities' },
                              { spec: 'Installation', details: "Pan-India by Winera's own team" },
                              { spec: 'Expected lifespan', details: '10+ years with proper maintenance' }
                            ];
                          currentSpecs[rIdx] = { ...currentSpecs[rIdx], spec: e.target.value };
                          handleFieldChange('softplaySpecs', 'specsList', currentSpecs);
                        }}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                      />
                      <input
                        type="text"
                        placeholder="Details Value"
                        value={sRow.details}
                        onChange={(e) => {
                          const currentSpecs = Array.isArray(formData.softplaySpecs?.specsList) && formData.softplaySpecs.specsList.length > 0
                            ? [...formData.softplaySpecs.specsList]
                            : [
                              { spec: 'Target age group', details: '2–12 years' },
                              { spec: 'Minimum space required', details: '500 sq ft' },
                              { spec: 'Maximum height', details: 'Customisable to your venue' },
                              { spec: 'Construction', details: 'Galvanized steel frame, imported LLDPE, soft PVC cover' },
                              { spec: 'Safety', details: 'Padded surfaces, rounded edges — commercial grade' },
                              { spec: 'Customisation', details: 'Theme, colour, layout, activities' },
                              { spec: 'Installation', details: "Pan-India by Winera's own team" },
                              { spec: 'Expected lifespan', details: '10+ years with proper maintenance' }
                            ];
                          currentSpecs[rIdx] = { ...currentSpecs[rIdx], details: e.target.value };
                          handleFieldChange('softplaySpecs', 'specsList', currentSpecs);
                        }}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const currentSpecs = Array.isArray(formData.softplaySpecs?.specsList) && formData.softplaySpecs.specsList.length > 0
                            ? [...formData.softplaySpecs.specsList]
                            : [
                              { spec: 'Target age group', details: '2–12 years' },
                              { spec: 'Minimum space required', details: '500 sq ft' },
                              { spec: 'Maximum height', details: 'Customisable to your venue' },
                              { spec: 'Construction', details: 'Galvanized steel frame, imported LLDPE, soft PVC cover' },
                              { spec: 'Safety', details: 'Padded surfaces, rounded edges — commercial grade' },
                              { spec: 'Customisation', details: 'Theme, colour, layout, activities' },
                              { spec: 'Installation', details: "Pan-India by Winera's own team" },
                              { spec: 'Expected lifespan', details: '10+ years with proper maintenance' }
                            ];
                          currentSpecs.splice(rIdx, 1);
                          handleFieldChange('softplaySpecs', 'specsList', currentSpecs);
                        }}
                        style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                      >
                        <Trash2 style={{ width: '15px', height: '15px' }} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Background Banner Image Upload */}
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Background Card Image Upload</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <label style={{ background: '#38bdf8', color: '#fff', padding: '10px 18px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Background Image
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading background...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          handleFieldChange('softplaySpecs', 'bgUrl', res.url);
                          setStatusMsg('Background uploaded!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                    />
                  </label>
                  {formData.softplaySpecs?.bgUrl && (
                    <img src={formData.softplaySpecs.bgUrl} alt="" style={{ height: '40px', borderRadius: '6px' }} />
                  )}
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('softplaySpecs', formData.softplaySpecs || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Technical Specifications Section
                </button>
              </div>
            </div>
          )}

          {/* MATERIALS QUALITY SECTION FORM */}
          {activeSection === 'softplayMaterials' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Materials Quality & Durability Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue, and use <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>&lt;br/&gt;</code> for line breaks.</p>
                <input
                  type="text"
                  value={formData.softplayMaterials?.title || '*Materials Quality That Defines a* Trusted Soft Play Manufacturer'}
                  onChange={(e) => handleFieldChange('softplayMaterials', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Subtitle Intro Description</label>
                <textarea
                  rows={3}
                  value={formData.softplayMaterials?.desc || ''}
                  onChange={(e) => handleFieldChange('softplayMaterials', 'desc', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px' }}
                />
              </div>

              {/* Photo Upload */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Left Kids Play Area Photo Upload</h4>
                <div style={{ background: '#ffffff', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>Play Area Photo</label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <label style={{ background: '#38bdf8', color: '#fff', padding: '6px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '11.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Upload style={{ width: '13px', height: '13px' }} /> Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          setStatusMsg('Uploading photo...');
                          try {
                            const res = await uploadImageFile(file, admin.token);
                            handleFieldChange('softplayMaterials', 'imgUrl', res.url);
                            setStatusMsg('Photo uploaded!');
                          } catch (err) {
                            setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                    </label>
                    {formData.softplayMaterials?.imgUrl && (
                      <img src={formData.softplayMaterials.imgUrl} alt="" style={{ height: '35px', width: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                    )}
                  </div>
                </div>
              </div>

              {/* Subpoints Manager */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Materials Subpoints (e.g. Plastic Parts, Post Structure)</h4>
                  <button
                    type="button"
                    onClick={() => {
                      const currentSubs = Array.isArray(formData.softplayMaterials?.subpoints) && formData.softplayMaterials.subpoints.length > 0
                        ? [...formData.softplayMaterials.subpoints]
                        : [
                          { title: 'Plastic Parts', desc: 'Crafted from high-quality imported LLDPE (Linear Low-Density Polyethylene) anti-UV, anti-static, and impact-resistant.' },
                          { title: 'Post Structure', desc: 'Constructed from national standard galvanized steel pipes providing structural backbone.' },
                          { title: 'Metal Components', desc: 'All metal parts are galvanized to resist corrosion.' },
                          { title: 'Deck, Stair & Bridge', desc: 'Features a robust wood core padded with high-density sponge.' },
                          { title: 'Outer Cover', desc: 'Finished with a soft PVC covering that is pleasant to touch.' }
                        ];
                      currentSubs.push({ title: '', desc: '' });
                      handleFieldChange('softplayMaterials', 'subpoints', currentSubs);
                    }}
                    style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Plus style={{ width: '14px', height: '14px' }} /> Add Subpoint
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(Array.isArray(formData.softplayMaterials?.subpoints) && formData.softplayMaterials.subpoints.length > 0
                    ? formData.softplayMaterials.subpoints
                    : [
                      { title: 'Plastic Parts', desc: 'Crafted from high-quality imported LLDPE (Linear Low-Density Polyethylene) anti-UV, anti-static, and impact-resistant.' },
                      { title: 'Post Structure', desc: 'Constructed from national standard galvanized steel pipes providing structural backbone.' },
                      { title: 'Metal Components', desc: 'All metal parts are galvanized to resist corrosion.' },
                      { title: 'Deck, Stair & Bridge', desc: 'Features a robust wood core padded with high-density sponge.' },
                      { title: 'Outer Cover', desc: 'Finished with a soft PVC covering that is pleasant to touch.' }
                    ]
                  ).map((mSub, subIdx) => (
                    <div key={subIdx} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '10px', alignItems: 'center', background: '#ffffff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                      <input
                        type="text"
                        placeholder="Subpoint Title (e.g. Plastic Parts)"
                        value={mSub.title}
                        onChange={(e) => {
                          const currentSubs = Array.isArray(formData.softplayMaterials?.subpoints) && formData.softplayMaterials.subpoints.length > 0
                            ? [...formData.softplayMaterials.subpoints]
                            : [
                              { title: 'Plastic Parts', desc: 'Crafted from high-quality imported LLDPE (Linear Low-Density Polyethylene) anti-UV, anti-static, and impact-resistant.' },
                              { title: 'Post Structure', desc: 'Constructed from national standard galvanized steel pipes providing structural backbone.' },
                              { title: 'Metal Components', desc: 'All metal parts are galvanized to resist corrosion.' },
                              { title: 'Deck, Stair & Bridge', desc: 'Features a robust wood core padded with high-density sponge.' },
                              { title: 'Outer Cover', desc: 'Finished with a soft PVC covering that is pleasant to touch.' }
                            ];
                          currentSubs[subIdx] = { ...currentSubs[subIdx], title: e.target.value };
                          handleFieldChange('softplayMaterials', 'subpoints', currentSubs);
                        }}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                      />
                      <input
                        type="text"
                        placeholder="Subpoint Description"
                        value={mSub.desc}
                        onChange={(e) => {
                          const currentSubs = Array.isArray(formData.softplayMaterials?.subpoints) && formData.softplayMaterials.subpoints.length > 0
                            ? [...formData.softplayMaterials.subpoints]
                            : [
                              { title: 'Plastic Parts', desc: 'Crafted from high-quality imported LLDPE (Linear Low-Density Polyethylene) anti-UV, anti-static, and impact-resistant.' },
                              { title: 'Post Structure', desc: 'Constructed from national standard galvanized steel pipes providing structural backbone.' },
                              { title: 'Metal Components', desc: 'All metal parts are galvanized to resist corrosion.' },
                              { title: 'Deck, Stair & Bridge', desc: 'Features a robust wood core padded with high-density sponge.' },
                              { title: 'Outer Cover', desc: 'Finished with a soft PVC covering that is pleasant to touch.' }
                            ];
                          currentSubs[subIdx] = { ...currentSubs[subIdx], desc: e.target.value };
                          handleFieldChange('softplayMaterials', 'subpoints', currentSubs);
                        }}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const currentSubs = Array.isArray(formData.softplayMaterials?.subpoints) && formData.softplayMaterials.subpoints.length > 0
                            ? [...formData.softplayMaterials.subpoints]
                            : [
                              { title: 'Plastic Parts', desc: 'Crafted from high-quality imported LLDPE (Linear Low-Density Polyethylene) anti-UV, anti-static, and impact-resistant.' },
                              { title: 'Post Structure', desc: 'Constructed from national standard galvanized steel pipes providing structural backbone.' },
                              { title: 'Metal Components', desc: 'All metal parts are galvanized to resist corrosion.' },
                              { title: 'Deck, Stair & Bridge', desc: 'Features a robust wood core padded with high-density sponge.' },
                              { title: 'Outer Cover', desc: 'Finished with a soft PVC covering that is pleasant to touch.' }
                            ];
                          currentSubs.splice(subIdx, 1);
                          handleFieldChange('softplayMaterials', 'subpoints', currentSubs);
                        }}
                        style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                      >
                        <Trash2 style={{ width: '15px', height: '15px' }} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('softplayMaterials', formData.softplayMaterials || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Materials Quality Section
                </button>
              </div>
            </div>
          )}

          {/* TYPES OF SOFT PLAY ZONES TIMELINE FORM */}
          {activeSection === 'softplayTypes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Types of Soft Play Zones Timeline Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue, and use <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>&lt;br/&gt;</code> for line breaks.</p>
                <input
                  type="text"
                  value={formData.softplayTypes?.title || 'Types of Soft Play Zones *We<br />Design & Install*'}
                  onChange={(e) => handleFieldChange('softplayTypes', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Brochure Button Label</label>
                  <input
                    type="text"
                    value={formData.softplayTypes?.buttonText || 'Download Our Brochure'}
                    onChange={(e) => handleFieldChange('softplayTypes', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Brochure PDF File / Link URL</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={formData.softplayTypes?.brochureUrl || '#'}
                      onChange={(e) => handleFieldChange('softplayTypes', 'brochureUrl', e.target.value)}
                      placeholder="e.g. /assets/brochure.pdf or upload PDF..."
                      style={{ flex: 1, padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                    />
                    <label style={{ background: '#38bdf8', color: '#fff', padding: '12px 16px', borderRadius: '14px', fontWeight: '800', fontSize: '12.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                      <Upload style={{ width: '15px', height: '15px' }} /> Upload PDF
                      <input
                        type="file"
                        accept="application/pdf,.pdf"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          setStatusMsg('Uploading PDF brochure...');
                          try {
                            const res = await uploadImageFile(file, admin.token);
                            handleFieldChange('softplayTypes', 'brochureUrl', res.url);
                            setStatusMsg('PDF Brochure uploaded successfully!');
                          } catch (err) {
                            setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Types of Soft Play Zones List Manager */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Soft Play Zone Types (Title, Description & Image)</h4>
                  <button
                    type="button"
                    onClick={() => {
                      const currentTypes = Array.isArray(formData.softplayTypes?.typesList) && formData.softplayTypes.typesList.length > 0
                        ? [...formData.softplayTypes.typesList]
                        : [
                          { title: 'Themed Soft Play Zones', desc: 'A Fully Designed Play Environment Built Around A Visual Theme — Jungle, Ocean, Space, Or A Custom Branded Concept Tailored To Your Venue. Every Element From Colours And Structures To Signage Works Together, Creating A Space Visitors Photograph, Share, And Return To. Ideal For Malls, Hotels, And Family Entertainment Centres Looking To Build A Recognisable, Destination-Worthy Indoor Play Area For Kids.', img: formData.softplayTypes?.step1Img || '' },
                          { title: 'Toddler & Junior Play Areas', desc: 'Age-Segmented Zones Designed For Children Aged 2–5 And 6–12 Years Separately Ensure The Right Structure Height, Challenge Level, And Safety Padding For Each Group. Allows Venues Serving Mixed-Age Families To Keep Younger Toddlers Safe Without Restricting Older Children. Popular In Hospitals, Airports, And Hotel Recreation Zones Where The Play Area Must Serve A Wide Visitor Demographic.', img: formData.softplayTypes?.step2Img || '' },
                          { title: 'Multi-Level Play Structures', desc: 'Vertical Installations That Use Your Full Ceiling Height — Slides, Climbing Walls, Rope Bridges, Tunnels, And Elevated Platforms Across Multiple Levels. Delivers Large Play Capacity In A Smaller Floor Footprint, Making It The Preferred Format For Venues Where Floor Space Is Limited But Ceiling Height Is Available. Commonly Installed In Malls And Standalone Soft Play Centres Across India.', img: formData.softplayTypes?.step3Img || '' },
                          { title: 'Ball Pit & Sensory Zones', desc: 'Foam-Filled Ball Pits And Sensory Play Areas Built For Children Aged 2–6 Years — Fully Padded, Rounded Edges, And Commercial-Grade Foam Throughout. These Zones Generate Some Of The Highest Dwell Times Of Any Soft Play Equipment Category, Keeping Young Visitors Engaged While Parents Relax Nearby. Works Well As A Standalone Addition Or As Part Of A Larger Play Zone Setup.', img: formData.softplayTypes?.step4Img || '' }
                        ];
                      currentTypes.push({ title: '', desc: '', img: '' });
                      handleFieldChange('softplayTypes', 'typesList', currentTypes);
                    }}
                    style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Plus style={{ width: '14px', height: '14px' }} /> Add Zone Type
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {(Array.isArray(formData.softplayTypes?.typesList) && formData.softplayTypes.typesList.length > 0
                    ? formData.softplayTypes.typesList
                    : [
                      { title: 'Themed Soft Play Zones', desc: 'A Fully Designed Play Environment Built Around A Visual Theme — Jungle, Ocean, Space, Or A Custom Branded Concept Tailored To Your Venue. Every Element From Colours And Structures To Signage Works Together, Creating A Space Visitors Photograph, Share, And Return To. Ideal For Malls, Hotels, And Family Entertainment Centres Looking To Build A Recognisable, Destination-Worthy Indoor Play Area For Kids.', img: formData.softplayTypes?.step1Img || '' },
                      { title: 'Toddler & Junior Play Areas', desc: 'Age-Segmented Zones Designed For Children Aged 2–5 And 6–12 Years Separately Ensure The Right Structure Height, Challenge Level, And Safety Padding For Each Group. Allows Venues Serving Mixed-Age Families To Keep Younger Toddlers Safe Without Restricting Older Children. Popular In Hospitals, Airports, And Hotel Recreation Zones Where The Play Area Must Serve A Wide Visitor Demographic.', img: formData.softplayTypes?.step2Img || '' },
                      { title: 'Multi-Level Play Structures', desc: 'Vertical Installations That Use Your Full Ceiling Height — Slides, Climbing Walls, Rope Bridges, Tunnels, And Elevated Platforms Across Multiple Levels. Delivers Large Play Capacity In A Smaller Floor Footprint, Making It The Preferred Format For Venues Where Floor Space Is Limited But Ceiling Height Is Available. Commonly Installed In Malls And Standalone Soft Play Centres Across India.', img: formData.softplayTypes?.step3Img || '' },
                      { title: 'Ball Pit & Sensory Zones', desc: 'Foam-Filled Ball Pits And Sensory Play Areas Built For Children Aged 2–6 Years — Fully Padded, Rounded Edges, And Commercial-Grade Foam Throughout. These Zones Generate Some Of The Highest Dwell Times Of Any Soft Play Equipment Category, Keeping Young Visitors Engaged While Parents Relax Nearby. Works Well As A Standalone Addition Or As Part Of A Larger Play Zone Setup.', img: formData.softplayTypes?.step4Img || '' }
                    ]
                  ).map((tItem, tIdx) => (
                    <div key={tIdx} style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', fontWeight: '800', color: '#38bdf8' }}>Zone Type #{tIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const currentTypes = Array.isArray(formData.softplayTypes?.typesList) && formData.softplayTypes.typesList.length > 0
                              ? [...formData.softplayTypes.typesList]
                              : [
                                { title: 'Themed Soft Play Zones', desc: 'A Fully Designed Play Environment...' },
                                { title: 'Toddler & Junior Play Areas', desc: 'Age-Segmented Zones...' },
                                { title: 'Multi-Level Play Structures', desc: 'Vertical Installations...' },
                                { title: 'Ball Pit & Sensory Zones', desc: 'Foam-Filled Ball Pits...' }
                              ];
                            currentTypes.splice(tIdx, 1);
                            handleFieldChange('softplayTypes', 'typesList', currentTypes);
                          }}
                          style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '3px' }}
                        >
                          <Trash2 style={{ width: '13px', height: '13px' }} /> Remove Card
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Zone Title (e.g. Themed Soft Play Zones)"
                        value={tItem.title}
                        onChange={(e) => {
                          const currentTypes = Array.isArray(formData.softplayTypes?.typesList) && formData.softplayTypes.typesList.length > 0
                            ? [...formData.softplayTypes.typesList]
                            : [
                              { title: 'Themed Soft Play Zones', desc: 'A Fully Designed Play Environment...' },
                              { title: 'Toddler & Junior Play Areas', desc: 'Age-Segmented Zones...' },
                              { title: 'Multi-Level Play Structures', desc: 'Vertical Installations...' },
                              { title: 'Ball Pit & Sensory Zones', desc: 'Foam-Filled Ball Pits...' }
                            ];
                          currentTypes[tIdx] = { ...currentTypes[tIdx], title: e.target.value };
                          handleFieldChange('softplayTypes', 'typesList', currentTypes);
                        }}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                      />
                      <textarea
                        rows={2}
                        placeholder="Zone Description"
                        value={tItem.desc}
                        onChange={(e) => {
                          const currentTypes = Array.isArray(formData.softplayTypes?.typesList) && formData.softplayTypes.typesList.length > 0
                            ? [...formData.softplayTypes.typesList]
                            : [
                              { title: 'Themed Soft Play Zones', desc: 'A Fully Designed Play Environment...' },
                              { title: 'Toddler & Junior Play Areas', desc: 'Age-Segmented Zones...' },
                              { title: 'Multi-Level Play Structures', desc: 'Vertical Installations...' },
                              { title: 'Ball Pit & Sensory Zones', desc: 'Foam-Filled Ball Pits...' }
                            ];
                          currentTypes[tIdx] = { ...currentTypes[tIdx], desc: e.target.value };
                          handleFieldChange('softplayTypes', 'typesList', currentTypes);
                        }}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12.5px', fontFamily: 'inherit' }}
                      />

                      {/* Integrated Zone Card Image Upload */}
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <label style={{ background: '#38bdf8', color: '#fff', padding: '6px 12px', borderRadius: '6px', fontWeight: '700', fontSize: '11.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Upload style={{ width: '13px', height: '13px' }} /> Upload Card Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (!file) return;
                              setStatusMsg(`Uploading image for Zone #${tIdx + 1}...`);
                              try {
                                const res = await uploadImageFile(file, admin.token);
                                const currentTypes = Array.isArray(formData.softplayTypes?.typesList) && formData.softplayTypes.typesList.length > 0
                                  ? [...formData.softplayTypes.typesList]
                                  : [
                                    { title: 'Themed Soft Play Zones', desc: 'A Fully Designed Play Environment...' },
                                    { title: 'Toddler & Junior Play Areas', desc: 'Age-Segmented Zones...' },
                                    { title: 'Multi-Level Play Structures', desc: 'Vertical Installations...' },
                                    { title: 'Ball Pit & Sensory Zones', desc: 'Foam-Filled Ball Pits...' }
                                  ];
                                currentTypes[tIdx] = { ...currentTypes[tIdx], img: res.url };
                                handleFieldChange('softplayTypes', 'typesList', currentTypes);
                                setStatusMsg('Image uploaded!');
                              } catch (err) {
                                setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                              }
                            }}
                            style={{ display: 'none' }}
                          />
                        </label>
                        {tItem.img && (
                          <img src={tItem.img} alt="" style={{ height: '35px', width: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                        )}
                        <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: '500' }}>
                          {tItem.img ? 'Custom Image Uploaded' : 'Using default image'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('softplayTypes', formData.softplayTypes || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Soft Play Types Timeline Section
                </button>
              </div>
            </div>
          )}

          {/* KNOW YOUR RETURNS & ROI SECTION FORM */}
          {activeSection === 'softplayRoi' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Know Your Returns & ROI Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue, and use <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>&lt;br/&gt;</code> for line breaks.</p>
                <input
                  type="text"
                  value={formData.softplayRoi?.title || 'Know Your Returns<br />*Before You Invest*'}
                  onChange={(e) => handleFieldChange('softplayRoi', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 1 Description</label>
                <textarea
                  rows={2}
                  value={formData.softplayRoi?.p1 || ''}
                  onChange={(e) => handleFieldChange('softplayRoi', 'p1', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 2 Description</label>
                <textarea
                  rows={3}
                  value={formData.softplayRoi?.p2 || ''}
                  onChange={(e) => handleFieldChange('softplayRoi', 'p2', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 3 Description</label>
                <textarea
                  rows={2}
                  value={formData.softplayRoi?.p3 || ''}
                  onChange={(e) => handleFieldChange('softplayRoi', 'p3', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Label Text</label>
                  <input
                    type="text"
                    value={formData.softplayRoi?.buttonText || 'Talk to an ROI Expert'}
                    onChange={(e) => handleFieldChange('softplayRoi', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link URL</label>
                  <input
                    type="text"
                    value={formData.softplayRoi?.buttonLink || 'https://wa.me/919428989488'}
                    onChange={(e) => handleFieldChange('softplayRoi', 'buttonLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              {/* Photo Collage Uploads */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Collage Photos Upload</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  {[
                    { label: 'Top Large Photo', field: 'topImgUrl' },
                    { label: 'Bottom Left Photo', field: 'bottomLeftImgUrl' },
                    { label: 'Bottom Right Photo', field: 'bottomRightImgUrl' }
                  ].map((rItem, rIdx) => (
                    <div key={rIdx} style={{ background: '#ffffff', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                      <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>{rItem.label}</label>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <label style={{ background: '#38bdf8', color: '#fff', padding: '6px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '11.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Upload style={{ width: '13px', height: '13px' }} /> Upload Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (!file) return;
                              setStatusMsg('Uploading image...');
                              try {
                                const res = await uploadImageFile(file, admin.token);
                                handleFieldChange('softplayRoi', rItem.field, res.url);
                                setStatusMsg('Image uploaded!');
                              } catch (err) {
                                setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                              }
                            }}
                            style={{ display: 'none' }}
                          />
                        </label>
                        {formData.softplayRoi?.[rItem.field] && (
                          <img src={formData.softplayRoi[rItem.field]} alt="" style={{ height: '35px', width: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('softplayRoi', formData.softplayRoi || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Soft Play ROI Section
                </button>
              </div>
            </div>
          )}

          {/* WHY CHOOSE WINERA SECTION FORM */}
          {activeSection === 'softplayWhyUs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Why Choose Winera Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue, and use <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>&lt;br/&gt;</code> for line breaks.</p>
                <input
                  type="text"
                  value={formData.softplayWhyUs?.title || 'Why Choose *Winera International*'}
                  onChange={(e) => handleFieldChange('softplayWhyUs', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              {/* Why Choose Winera Cards Manager */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Feature Cards (Title, Description & Icon)</h4>
                  <button
                    type="button"
                    onClick={() => {
                      const currentCards = Array.isArray(formData.softplayWhyUs?.cardsList) && formData.softplayWhyUs.cardsList.length > 0
                        ? [...formData.softplayWhyUs.cardsList]
                        : [
                          { title: 'Expertise', desc: 'Building Commercial Soft Play Zones Since 2014, Made To Survive Heavy Daily Use.' },
                          { title: 'Customized Solutions', desc: 'Every Project Starts With A Custom 3D Design, Never An Off-The-Shelf Kit.' },
                          { title: 'Proven Track Record', desc: 'Trusted By Malls, Hotels, And Schools Across 50+ Cities In India.' },
                          { title: 'Competitive Pricing', desc: 'Factory-Direct Pricing With No Distributor Markup, Plus A Free ROI Report.' },
                          { title: 'Single Point Of Contact', desc: 'One Team From 3D Design To Installation With No Third-Party Contractors.' }
                        ];
                      currentCards.push({ title: '', desc: '', iconUrl: '' });
                      handleFieldChange('softplayWhyUs', 'cardsList', currentCards);
                    }}
                    style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Plus style={{ width: '14px', height: '14px' }} /> Add Card
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {(Array.isArray(formData.softplayWhyUs?.cardsList) && formData.softplayWhyUs.cardsList.length > 0
                    ? formData.softplayWhyUs.cardsList
                    : [
                      { title: 'Expertise', desc: 'Building Commercial Soft Play Zones Since 2014, Made To Survive Heavy Daily Use.' },
                      { title: 'Customized Solutions', desc: 'Every Project Starts With A Custom 3D Design, Never An Off-The-Shelf Kit.' },
                      { title: 'Proven Track Record', desc: 'Trusted By Malls, Hotels, And Schools Across 50+ Cities In India.' },
                      { title: 'Competitive Pricing', desc: 'Factory-Direct Pricing With No Distributor Markup, Plus A Free ROI Report.' },
                      { title: 'Single Point Of Contact', desc: 'One Team From 3D Design To Installation With No Third-Party Contractors.' }
                    ]
                  ).map((wCard, wIdx) => (
                    <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', fontWeight: '800', color: '#38bdf8' }}>Card #{wIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const currentCards = Array.isArray(formData.softplayWhyUs?.cardsList) && formData.softplayWhyUs.cardsList.length > 0
                              ? [...formData.softplayWhyUs.cardsList]
                              : [
                                { title: 'Expertise', desc: 'Building Commercial Soft Play Zones...' },
                                { title: 'Customized Solutions', desc: 'Every Project Starts With A Custom 3D Design...' },
                                { title: 'Proven Track Record', desc: 'Trusted By Malls...' },
                                { title: 'Competitive Pricing', desc: 'Factory-Direct Pricing...' },
                                { title: 'Single Point Of Contact', desc: 'One Team From 3D Design...' }
                              ];
                            currentCards.splice(wIdx, 1);
                            handleFieldChange('softplayWhyUs', 'cardsList', currentCards);
                          }}
                          style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '3px' }}
                        >
                          <Trash2 style={{ width: '13px', height: '13px' }} /> Remove Card
                        </button>
                      </div>

                      <input
                        type="text"
                        placeholder="Card Title (e.g. Expertise)"
                        value={wCard.title}
                        onChange={(e) => {
                          const currentCards = Array.isArray(formData.softplayWhyUs?.cardsList) && formData.softplayWhyUs.cardsList.length > 0
                            ? [...formData.softplayWhyUs.cardsList]
                            : [
                              { title: 'Expertise', desc: 'Building Commercial Soft Play Zones...' },
                              { title: 'Customized Solutions', desc: 'Every Project Starts...' },
                              { title: 'Proven Track Record', desc: 'Trusted By Malls...' },
                              { title: 'Competitive Pricing', desc: 'Factory-Direct Pricing...' },
                              { title: 'Single Point Of Contact', desc: 'One Team From 3D Design...' }
                            ];
                          currentCards[wIdx] = { ...currentCards[wIdx], title: e.target.value };
                          handleFieldChange('softplayWhyUs', 'cardsList', currentCards);
                        }}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                      />

                      <textarea
                        rows={2}
                        placeholder="Card Description"
                        value={wCard.desc}
                        onChange={(e) => {
                          const currentCards = Array.isArray(formData.softplayWhyUs?.cardsList) && formData.softplayWhyUs.cardsList.length > 0
                            ? [...formData.softplayWhyUs.cardsList]
                            : [
                              { title: 'Expertise', desc: 'Building Commercial Soft Play Zones...' },
                              { title: 'Customized Solutions', desc: 'Every Project Starts...' },
                              { title: 'Proven Track Record', desc: 'Trusted By Malls...' },
                              { title: 'Competitive Pricing', desc: 'Factory-Direct Pricing...' },
                              { title: 'Single Point Of Contact', desc: 'One Team From 3D Design...' }
                            ];
                          currentCards[wIdx] = { ...currentCards[wIdx], desc: e.target.value };
                          handleFieldChange('softplayWhyUs', 'cardsList', currentCards);
                        }}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12.5px', fontFamily: 'inherit' }}
                      />

                      {/* Custom Icon Image Upload */}
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <label style={{ background: '#38bdf8', color: '#fff', padding: '6px 12px', borderRadius: '6px', fontWeight: '700', fontSize: '11.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Upload style={{ width: '13px', height: '13px' }} /> Upload Custom Icon
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (!file) return;
                              setStatusMsg(`Uploading icon for Card #${wIdx + 1}...`);
                              try {
                                const res = await uploadImageFile(file, admin.token);
                                const currentCards = Array.isArray(formData.softplayWhyUs?.cardsList) && formData.softplayWhyUs.cardsList.length > 0
                                  ? [...formData.softplayWhyUs.cardsList]
                                  : [
                                    { title: 'Expertise', desc: 'Building Commercial Soft Play Zones...' },
                                    { title: 'Customized Solutions', desc: 'Every Project Starts...' },
                                    { title: 'Proven Track Record', desc: 'Trusted By Malls...' },
                                    { title: 'Competitive Pricing', desc: 'Factory-Direct Pricing...' },
                                    { title: 'Single Point Of Contact', desc: 'One Team From 3D Design...' }
                                  ];
                                currentCards[wIdx] = { ...currentCards[wIdx], iconUrl: res.url };
                                handleFieldChange('softplayWhyUs', 'cardsList', currentCards);
                                setStatusMsg('Icon uploaded!');
                              } catch (err) {
                                setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                              }
                            }}
                            style={{ display: 'none' }}
                          />
                        </label>
                        {wCard.iconUrl && (
                          <img src={wCard.iconUrl} alt="" style={{ height: '30px', width: '30px', objectFit: 'contain' }} />
                        )}
                        <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: '500' }}>
                          {wCard.iconUrl ? 'Custom Icon Uploaded' : 'Using default SVG icon'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('softplayWhyUs', formData.softplayWhyUs || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Why Choose Winera Section
                </button>
              </div>
            </div>
          )}

          {/* SOFT PLAY FAQS FORM */}
          {activeSection === 'softplayFaqs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Soft Play Page FAQs</h3>
                <button
                  onClick={() => openModal('add')}
                  style={{ background: '#38bdf8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Plus style={{ width: '16px', height: '16px' }} /> Add New Soft Play FAQ
                </button>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue.</p>
                <input
                  type="text"
                  value={formData.faqsHeader?.title || 'Frequently Asked *Questions*'}
                  onChange={(e) => handleFieldChange('faqsHeader', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Subtitle (Optional)</label>
                <input
                  type="text"
                  value={formData.faqsHeader?.subtitle || ''}
                  onChange={(e) => handleFieldChange('faqsHeader', 'subtitle', e.target.value)}
                  placeholder="e.g. Find answers to common questions about our soft play equipment..."
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(Array.isArray(formData.softplayFaqs) ? formData.softplayFaqs : []).map((faq, index) => (
                  <div key={index} style={{ background: '#F5F5F9', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>Q: {faq.q || faq.question}</h4>
                      <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>A: {faq.a || faq.answer}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => openModal('edit', index, { q: faq.q || faq.question, a: faq.a || faq.answer })}
                        style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '6px', borderRadius: '8px', cursor: 'pointer', color: '#38bdf8' }}
                      >
                        <Edit2 style={{ width: '15px', height: '15px' }} />
                      </button>
                      <button
                        onClick={() => handleDeleteItem('softplayFaqs', index)}
                        style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '6px', borderRadius: '8px', cursor: 'pointer', color: '#ef4444' }}
                      >
                        <Trash2 style={{ width: '15px', height: '15px' }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={async () => {
                    await persistSectionToDatabase('softplayFaqs', formData.softplayFaqs || []);
                    if (formData.faqsHeader) {
                      await persistSectionToDatabase('faqsHeader', formData.faqsHeader);
                    }
                  }}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Soft Play FAQs
                </button>
              </div>
            </div>
          )}

          {/* SOFT PLAY CTA BANNER FORM */}
          {activeSection === 'softplayCta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Soft Play CTA Banner</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Main Title Heading Text (White Color)</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Use <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>&lt;br/&gt;</code> for line breaks.</p>
                <input
                  type="text"
                  value={formData.softplayCta?.mainTitle || formData.softplayCta?.whiteText || 'READY TO BUILD YOUR SOFT PLAY ZONE?'}
                  onChange={(e) => handleFieldChange('softplayCta', 'mainTitle', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Subtitle Text</label>
                <textarea
                  rows={2}
                  value={formData.softplayCta?.subtitle ?? "Get in touch with India's trusted soft play equipment manufacturer for a free 3D design, complete ROI report, and project quote tailored to your exact space and budget"}
                  onChange={(e) => handleFieldChange('softplayCta', 'subtitle', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.softplayCta?.buttonText ?? 'Get Quote Now'}
                    onChange={(e) => handleFieldChange('softplayCta', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                  <input
                    type="text"
                    value={formData.softplayCta?.buttonLink ?? 'https://wa.me/919428989488'}
                    onChange={(e) => handleFieldChange('softplayCta', 'buttonLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('softplayCta', formData.softplayCta || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Soft Play CTA Banner
                </button>
              </div>
            </div>
          )}

          {/* BUMPER CAR SEO META TAGS FORM */}
          {activeSection === 'bumpercarSeo' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Bumper Car Page SEO Settings</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>Page Title Tag (&lt;title&gt;)</label>
                <input
                  type="text"
                  value={formData.bumpercarSeo?.pageTitle || 'Bumper Car Manufacturer in India | Electric & Battery Cars | Winera International'}
                  onChange={(e) => handleFieldChange('bumpercarSeo', 'pageTitle', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>Meta Description (&lt;meta name="description"&gt;)</label>
                <textarea
                  rows={4}
                  value={formData.bumpercarSeo?.metaDescription || 'As a leading Bumper Car Manufacturer in India, Winera International Pvt Ltd crafts exhilarating, safe, and durable bumper cars that are a favorite at amusement parks.'}
                  onChange={(e) => handleFieldChange('bumpercarSeo', 'metaDescription', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '500', lineHeight: 1.5 }}
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('bumpercarSeo', formData.bumpercarSeo || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Bumper Car SEO Settings
                </button>
              </div>
            </div>
          )}

          {/* BUMPER CAR HERO BANNER FORM */}
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
                  value={formData.bumpercarIntro?.title || '*Bumper Car*<br/>Manufacturer in India'}
                  onChange={(e) => handleFieldChange('bumpercarIntro', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Subtitle Description Paragraph</label>
                <textarea
                  rows={3}
                  value={formData.bumpercarIntro?.desc || "India's ROI-first bumper car manufacturer — electric floor and battery-operated cars, installed by our own team across 50+ cities, with a free ROI report before you invest."}
                  onChange={(e) => handleFieldChange('bumpercarIntro', 'desc', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontFamily: 'inherit' }}
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
                    value={formData.bumpercarIntro?.buttonLink || 'https://wa.me/919428989488'}
                    onChange={(e) => handleFieldChange('bumpercarIntro', 'buttonLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Section Right Collage Graphic Image</label>
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
                  {formData.bumpercarIntro?.mainImgUrl && (
                    <img src={formData.bumpercarIntro.mainImgUrl} alt="" style={{ height: '45px', width: '75px', objectFit: 'cover', borderRadius: '6px' }} />
                  )}
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
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Description Paragraph</label>
                <textarea
                  rows={4}
                  value={formData.bumpercarBanner?.desc || "Bumper cars have long held a special place in the hearts of amusement park enthusiasts, and at Winera International, we take immense pride in delivering high-quality options that enhance the overall park experience. As a leading Bumper Car manufacturer in India and trusted Bumper Car manufacturer, our creations are not just rides; they're an exhilarating blend of thrilling collisions and smooth handling, designed with a laser focus on safety and durability."}
                  onChange={(e) => handleFieldChange('bumpercarBanner', 'desc', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontFamily: 'inherit' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Right 3D Neon Bumper Car Image</label>
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
                  {formData.bumpercarBanner?.imgUrl && (
                    <img src={formData.bumpercarBanner.imgUrl} alt="" style={{ height: '45px', width: '75px', objectFit: 'cover', borderRadius: '6px' }} />
                  )}
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
          {activeSection === 'bumpercarThrill' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>The Perfect Blend Of Thrill And Safety Carousel Cards</h3>
              
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <label style={{ fontWeight: '800', fontSize: '14px', color: '#0369a1' }}>Carousel Cards List</label>
                  <button
                    onClick={() => {
                      const cur = formData.bumpercarThrill?.cards || [
                        {
                          title: "The Perfect Blend Of Thrill And Safety:",
                          desc: "Bumper Cars Have Long Held A Special Place In The Hearts Of Amusement Park Enthusiasts, And At Winera International, We Take Immense Pride In Delivering High-Quality Options That Enhance The Overall Park Experience. As A Leading Bumper Car Manufacturer In India And Trusted Bumper Car Manufacturer, Our Creations Are Not Just Rides; They're An Exhilarating Blend Of Thrilling Collisions And Smooth Handling, Designed With A Laser Focus On Safety And Durability."
                        }
                      ];
                      handleFieldChange('bumpercarThrill', 'cards', [...cur, { title: '', desc: '' }]);
                    }}
                    style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}
                  >
                    + Add New Card
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {(formData.bumpercarThrill?.cards || [
                    {
                      title: formData.bumpercarThrill?.title || "The Perfect Blend Of Thrill And Safety:",
                      desc: formData.bumpercarThrill?.desc || "Bumper Cars Have Long Held A Special Place In The Hearts Of Amusement Park Enthusiasts, And At Winera International, We Take Immense Pride In Delivering High-Quality Options That Enhance The Overall Park Experience. As A Leading Bumper Car Manufacturer In India And Trusted Bumper Car Manufacturer, Our Creations Are Not Just Rides; They're An Exhilarating Blend Of Thrilling Collisions And Smooth Handling, Designed With A Laser Focus On Safety And Durability."
                    }
                  ]).map((card, idx) => (
                    <div key={idx} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '800', fontSize: '12.5px', color: '#0f172a' }}>Card #{idx + 1}</span>
                        <button
                          onClick={() => {
                            const list = [...(formData.bumpercarThrill?.cards || [])];
                            list.splice(idx, 1);
                            handleFieldChange('bumpercarThrill', 'cards', list);
                          }}
                          style={{ background: '#ef4444', color: '#fff', border: 'none', width: '28px', height: '28px', borderRadius: '6px', cursor: 'pointer', fontWeight: '800' }}
                        >
                          ×
                        </button>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#475569', marginBottom: '4px' }}>Card Title</label>
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) => {
                            const list = [...(formData.bumpercarThrill?.cards || [])];
                            list[idx] = { ...list[idx], title: e.target.value };
                            handleFieldChange('bumpercarThrill', 'cards', list);
                          }}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#475569', marginBottom: '4px' }}>Card Description</label>
                        <textarea
                          rows={3}
                          value={card.desc}
                          onChange={(e) => {
                            const list = [...(formData.bumpercarThrill?.cards || [])];
                            list[idx] = { ...list[idx], desc: e.target.value };
                            handleFieldChange('bumpercarThrill', 'cards', list);
                          }}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12.5px', fontFamily: 'inherit' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('bumpercarThrill', formData.bumpercarThrill || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Thrill & Safety Carousel Cards
                </button>
              </div>
            </div>
          )}

          {/* BUMPER CAR TECHNICAL SPECIFICATIONS CARD FORM */}
          {activeSection === 'bumpercarSpecs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Technical Specifications Card</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Yellow accent.</p>
                <input
                  type="text"
                  value={formData.bumpercarSpecs?.title || '*Technical* Specifications'}
                  onChange={(e) => handleFieldChange('bumpercarSpecs', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Background Image</label>
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
                  {formData.bumpercarSpecs?.bgUrl && (
                    <img src={formData.bumpercarSpecs.bgUrl} alt="" style={{ height: '45px', width: '75px', objectFit: 'cover', borderRadius: '6px' }} />
                  )}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Brochure PDF Document</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <label style={{ background: '#0284c7', color: '#fff', padding: '10px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '12.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Brochure PDF
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading brochure PDF...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          handleFieldChange('bumpercarSpecs', 'brochureUrl', res.url);
                          setStatusMsg('Brochure PDF uploaded successfully!');
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {formData.bumpercarSpecs?.brochureUrl && (
                    <a
                      href={formData.bumpercarSpecs.brochureUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: '12.5px', color: '#0284c7', fontWeight: '700', textDecoration: 'underline' }}
                    >
                      View Uploaded PDF
                    </a>
                  )}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <label style={{ fontWeight: '800', fontSize: '13px', color: '#0f172a' }}>Specifications Table Rows</label>
                  <button
                    onClick={() => {
                      const cur = formData.bumpercarSpecs?.specsList || [
                        { spec: "Drive Type", details: "Electric Grid / Battery Operated" },
                        { spec: "Body Material", details: "High-density FRP / Polyethylene" },
                        { spec: "Power Source", details: "48V DC / Ceiling Floor Grid" },
                        { spec: "Frame", details: "Hot-dip galvanized steel chassis" },
                        { spec: "Safety Ring", details: "Heavy-duty PVC / Rubber Bumper" },
                        { spec: "Controls", details: "Dual pedal & steering wheel" },
                        { spec: "Expected lifespan", details: "8-12 years" }
                      ];
                      handleFieldChange('bumpercarSpecs', 'specsList', [...cur, { spec: '', details: '' }]);
                    }}
                    style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    + Add Row
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(formData.bumpercarSpecs?.specsList || [
                    { spec: "Drive Type", details: "Electric Grid / Battery Operated" },
                    { spec: "Body Material", details: "High-density FRP / Polyethylene" },
                    { spec: "Power Source", details: "48V DC / Ceiling Floor Grid" },
                    { spec: "Frame", details: "Hot-dip galvanized steel chassis" },
                    { spec: "Safety Ring", details: "Heavy-duty PVC / Rubber Bumper" },
                    { spec: "Controls", details: "Dual pedal & steering wheel" },
                    { spec: "Expected lifespan", details: "8-12 years" }
                  ]).map((item, idx) => (
                    <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', alignItems: 'center', background: '#F5F5F9', padding: '10px', borderRadius: '10px' }}>
                      <input
                        type="text"
                        placeholder="Specification"
                        value={item.spec}
                        onChange={(e) => {
                          const list = [...(formData.bumpercarSpecs?.specsList || [])];
                          list[idx] = { ...list[idx], spec: e.target.value };
                          handleFieldChange('bumpercarSpecs', 'specsList', list);
                        }}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                      />
                      <input
                        type="text"
                        placeholder="Details"
                        value={item.details}
                        onChange={(e) => {
                          const list = [...(formData.bumpercarSpecs?.specsList || [])];
                          list[idx] = { ...list[idx], details: e.target.value };
                          handleFieldChange('bumpercarSpecs', 'specsList', list);
                        }}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                      />
                      <button
                        onClick={() => {
                          const list = [...(formData.bumpercarSpecs?.specsList || [])];
                          list.splice(idx, 1);
                          handleFieldChange('bumpercarSpecs', 'specsList', list);
                        }}
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
                  onClick={() => persistSectionToDatabase('bumpercarSpecs', formData.bumpercarSpecs || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Technical Specifications Card
                </button>
              </div>
            </div>
          )}

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
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Intro Description</label>
                <textarea
                  rows={2}
                  value={formData.bumpercarOptions?.desc || "We supply two drive types for indoor bumper car attractions. The right choice depends on your floor infrastructure, venue flexibility, and operational model."}
                  onChange={(e) => handleFieldChange('bumpercarOptions', 'desc', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontFamily: 'inherit' }}
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
                  <textarea
                    rows={3}
                    placeholder="Option 1 Description"
                    value={formData.bumpercarOptions?.option1Desc || "Powered through a conductive floor grid and ceiling contact system. Delivers consistent, uninterrupted power throughout operating hours with zero battery management. Best suited for permanent, fixed installations in amusement parks, large FECs, and dedicated entertainment venues where the infrastructure investment is justified by high daily footfall."}
                    onChange={(e) => handleFieldChange('bumpercarOptions', 'option1Desc', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px' }}
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
                  <textarea
                    rows={3}
                    placeholder="Option 2 Description"
                    value={formData.bumpercarOptions?.option2Desc || "Self-contained rides running on rechargeable batteries — no floor grid or ceiling rig required. Ideal for malls, gaming zones, and temporary event setups where floor modification is not possible or where the operator wants the flexibility to relocate the attraction."}
                    onChange={(e) => handleFieldChange('bumpercarOptions', 'option2Desc', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
              </div>



              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Right Collage Image</label>
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
                  {formData.bumpercarOptions?.imgUrl && (
                    <img src={formData.bumpercarOptions.imgUrl} alt="" style={{ height: '45px', width: '75px', objectFit: 'cover', borderRadius: '6px' }} />
                  )}
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
          {activeSection === 'bumpercarComparison' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Quick Comparison Table Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue.</p>
                <input
                  type="text"
                  value={formData.bumpercarComparison?.title || '*QUICK COMPARISON* TABLE'}
                  onChange={(e) => handleFieldChange('bumpercarComparison', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              {/* Electric Points Manager */}
              <div style={{ background: '#FEFCE8', padding: '16px', borderRadius: '16px', border: '1px solid #fef08a' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#a16207' }}>Electric Floor Points (Yellow Points)</h4>
                  <button
                    onClick={() => {
                      const cur = formData.bumpercarComparison?.electricPoints || [
                        { text: "Conductive floor + ceiling grid" },
                        { text: "None — continuous supply" },
                        { text: "Permanent amusement parks, FECs" },
                        { text: "Fixed installation" },
                        { text: "Higher (floor infrastructure)" },
                        { text: "Lower per session" }
                      ];
                      handleFieldChange('bumpercarComparison', 'electricPoints', [...cur, { text: '' }]);
                    }}
                    style={{ background: '#ca8a04', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    + Add Electric Point
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(formData.bumpercarComparison?.electricPoints || [
                    { text: "Conductive floor + ceiling grid" },
                    { text: "None — continuous supply" },
                    { text: "Permanent amusement parks, FECs" },
                    { text: "Fixed installation" },
                    { text: "Higher (floor infrastructure)" },
                    { text: "Lower per session" }
                  ]).map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        value={item.text}
                        onChange={(e) => {
                          const list = [...(formData.bumpercarComparison?.electricPoints || [])];
                          list[idx] = { text: e.target.value };
                          handleFieldChange('bumpercarComparison', 'electricPoints', list);
                        }}
                        style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                      />
                      <button
                        onClick={() => {
                          const list = [...(formData.bumpercarComparison?.electricPoints || [])];
                          list.splice(idx, 1);
                          handleFieldChange('bumpercarComparison', 'electricPoints', list);
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
                      const cur = formData.bumpercarComparison?.batteryPoints || [
                        { text: "Flat surface only — no modification needed" },
                        { text: "Recharge between sessions" },
                        { text: "Malls, gaming zones, events" },
                        { text: "Can be moved to new venues" },
                        { text: "Lower initial investment" },
                        { text: "Battery replacement over time" }
                      ];
                      handleFieldChange('bumpercarComparison', 'batteryPoints', [...cur, { text: '' }]);
                    }}
                    style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    + Add Battery Point
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(formData.bumpercarComparison?.batteryPoints || [
                    { text: "Flat surface only — no modification needed" },
                    { text: "Recharge between sessions" },
                    { text: "Malls, gaming zones, events" },
                    { text: "Can be moved to new venues" },
                    { text: "Lower initial investment" },
                    { text: "Battery replacement over time" }
                  ]).map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        value={item.text}
                        onChange={(e) => {
                          const list = [...(formData.bumpercarComparison?.batteryPoints || [])];
                          list[idx] = { text: e.target.value };
                          handleFieldChange('bumpercarComparison', 'batteryPoints', list);
                        }}
                        style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                      />
                      <button
                        onClick={() => {
                          const list = [...(formData.bumpercarComparison?.batteryPoints || [])];
                          list.splice(idx, 1);
                          handleFieldChange('bumpercarComparison', 'batteryPoints', list);
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
                  onClick={() => persistSectionToDatabase('bumpercarComparison', formData.bumpercarComparison || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Quick Comparison Table
                </button>
              </div>
            </div>
          )}

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
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Intro Paragraph</label>
                <textarea
                  rows={3}
                  value={formData.bumpercarInvestment?.introText || "Most bumper car suppliers in India provide a catalogue price and leave the financial decision to you. As India's ROI-First Game Zone Partner, Winera International works differently."}
                  onChange={(e) => handleFieldChange('bumpercarInvestment', 'introText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontFamily: 'inherit' }}
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
                        onClick={() => {
                          const list = [...(formData.bumpercarInvestment?.bullets || [])];
                          list.splice(idx, 1);
                          handleFieldChange('bumpercarInvestment', 'bullets', list);
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
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Footnote Paragraph</label>
                <textarea
                  rows={2}
                  value={formData.bumpercarInvestment?.footerText || "Every figure is calculated around your actual floor size, daily footfall, and local entry pricing — not an industry average. This report is provided free, before you commit to anything."}
                  onChange={(e) => handleFieldChange('bumpercarInvestment', 'footerText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontFamily: 'inherit' }}
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
                    value={formData.bumpercarInvestment?.btnLink || 'https://wa.me/919428989488'}
                    onChange={(e) => handleFieldChange('bumpercarInvestment', 'btnLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Left Collage Image</label>
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
                  {formData.bumpercarInvestment?.imgUrl && (
                    <img src={formData.bumpercarInvestment.imgUrl} alt="" style={{ height: '45px', width: '75px', objectFit: 'cover', borderRadius: '6px' }} />
                  )}
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
                            { title: "Free ROI Report Before You Invest", desc: "See Your Real Costs, Revenue, And Break-Even Before You Commit" },
                            { title: "Own Installation Team", desc: "Our Own Team Install And Commission Every Project Across 50+ Cities" },
                            { title: "Reliable After-Sales Support", desc: "We Stay On After Handover With Servicing And Maintenance So Your Setup Keeps Running." },
                            { title: "Proven Track Record", desc: "Take A Look At What We've Built And Hear From The Venues We've Worked With." },
                            { title: "Honest, Transparent Pricing", desc: "One Clear Quote Covering Everything, No Hidden Costs Added Later." }
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
                        { title: "Free ROI Report Before You Invest", desc: "See Your Real Costs, Revenue, And Break-Even Before You Commit" },
                        { title: "Own Installation Team", desc: "Our Own Team Install And Commission Every Project Across 50+ Cities" },
                        { title: "Reliable After-Sales Support", desc: "We Stay On After Handover With Servicing And Maintenance So Your Setup Keeps Running." },
                        { title: "Proven Track Record", desc: "Take A Look At What We've Built And Hear From The Venues We've Worked With." },
                        { title: "Honest, Transparent Pricing", desc: "One Clear Quote Covering Everything, No Hidden Costs Added Later." }
                      ]
                  )).map((card, idx) => (
                    <div key={idx} style={{ background: '#ffffff', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
                        <input
                          type="text"
                          placeholder="Card Description"
                          value={card.desc}
                          onChange={(e) => {
                            const list = [...(formData.bumpercarWhyChoose?.cardsList || [])];
                            list[idx] = { ...list[idx], desc: e.target.value };
                            handleFieldChange('bumpercarWhyChoose', 'cardsList', list);
                          }}
                          style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                        />
                      </div>
                      <button
                        onClick={() => {
                          const list = [...(formData.bumpercarWhyChoose?.cardsList || [])];
                          list.splice(idx, 1);
                          handleFieldChange('bumpercarWhyChoose', 'cardsList', list);
                        }}
                        style={{ background: '#ef4444', color: '#fff', border: 'none', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', flexShrink: 0 }}
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
                          question: "What is the difference between electric floor and battery-operated bumper cars?",
                          answer: "Electric floor grid bumper cars draw continuous power from a conductive floor and ceiling contact rig, ideal for high-throughput fixed venues. Battery-operated bumper cars run on rechargeable batteries, requiring no specialized floor modifications, making them perfect for malls, gaming zones, and flexible setups."
                        },
                        {
                          question: "What minimum space is required for an indoor bumper car arena?",
                          answer: "A standard indoor bumper car arena typically requires between 800 sq ft to 3,000+ sq ft depending on the number of bumper cars operating simultaneously and safety perimeter fencing."
                        },
                        {
                          question: "Do you offer installation and commissioning services across India?",
                          answer: "Yes! Winera International has its own in-house installation team that conducts complete site preparation, grid setup, testing, and commissioning in 50+ cities across India."
                        },
                        {
                          question: "Can we receive a free ROI projection report before ordering?",
                          answer: "Absolutely. Before finalizing any purchase, our experts provide a free custom ROI report detailing equipment breakdown, rider capacity, revenue projections, and payback timelines specific to your venue."
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
                      question: "What is the difference between electric floor and battery-operated bumper cars?",
                      answer: "Electric floor grid bumper cars draw continuous power from a conductive floor and ceiling contact rig, ideal for high-throughput fixed venues. Battery-operated bumper cars run on rechargeable batteries, requiring no specialized floor modifications, making them perfect for malls, gaming zones, and flexible setups."
                    },
                    {
                      question: "What minimum space is required for an indoor bumper car arena?",
                      answer: "A standard indoor bumper car arena typically requires between 800 sq ft to 3,000+ sq ft depending on the number of bumper cars operating simultaneously and safety perimeter fencing."
                    },
                    {
                      question: "Do you offer installation and commissioning services across India?",
                      answer: "Yes! Winera International has its own in-house installation team that conducts complete site preparation, grid setup, testing, and commissioning in 50+ cities across India."
                    },
                    {
                      question: "Can we receive a free ROI projection report before ordering?",
                      answer: "Absolutely. Before finalizing any purchase, our experts provide a free custom ROI report detailing equipment breakdown, rider capacity, revenue projections, and payback timelines specific to your venue."
                    }
                  ]
                ).map((faq, idx) => (
                  <div key={idx} style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '800', fontSize: '13px', color: '#0369a1' }}>FAQ #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const currentList = [...(formData.bumpercarFaqs || [])];
                          currentList.splice(idx, 1);
                          setFormData((prev) => ({ ...prev, bumpercarFaqs: currentList }));
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

                    <textarea
                      rows={3}
                      placeholder="Answer"
                      value={faq.answer || ''}
                      onChange={(e) => {
                        const currentList = [...(formData.bumpercarFaqs || [])];
                        currentList[idx] = { ...currentList[idx], answer: e.target.value };
                        setFormData((prev) => ({ ...prev, bumpercarFaqs: currentList }));
                      }}
                      style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontFamily: 'inherit' }}
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

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Banner Background Image</label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  {formData.bumpercarCta?.bgUrl && (
                    <img
                      src={formData.bumpercarCta.bgUrl}
                      alt="Banner Background Preview"
                      style={{ width: '120px', height: '60px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #cbd5e1' }}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        handleImageUpload(file, (url) => handleFieldChange('bumpercarCta', 'bgUrl', url));
                      }
                    }}
                    style={{ fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Yellow Title Text</label>
                  <input
                    type="text"
                    value={formData.bumpercarCta?.yellowText || 'NEED ANY'}
                    onChange={(e) => handleFieldChange('bumpercarCta', 'yellowText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>White/Cyan Title Text</label>
                  <input
                    type="text"
                    value={formData.bumpercarCta?.cyanText || 'BUMPER CAR CONSULTATIONS ?'}
                    onChange={(e) => handleFieldChange('bumpercarCta', 'cyanText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Subtitle Description (White Subtitle Text)</label>
                <textarea
                  rows={3}
                  value={formData.bumpercarCta?.whiteText || formData.bumpercarCta?.subtitle || "Get in touch with India's trusted bumper car equipment manufacturer for a free 3D layout design, complete ROI report, and project quote tailored to your venue."}
                  onChange={(e) => {
                    handleFieldChange('bumpercarCta', 'whiteText', e.target.value);
                    handleFieldChange('bumpercarCta', 'subtitle', e.target.value);
                  }}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.bumpercarCta?.buttonText || 'Get Quote Now'}
                    onChange={(e) => handleFieldChange('bumpercarCta', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                  <input
                    type="text"
                    value={formData.bumpercarCta?.buttonLink || 'https://wa.me/919428989488'}
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

          {/* AR GAMES HERO BANNER FORM */}
          {activeSection === 'arHero' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>AR Games Hero Banner Settings</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Hero Background Image</label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  {formData.arHero?.bgUrl && (
                    <img
                      src={formData.arHero.bgUrl}
                      alt="AR Hero Background Preview"
                      style={{ width: '120px', height: '70px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #cbd5e1' }}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          if (res.url) {
                            handleFieldChange('arHero', 'bgUrl', res.url);
                          }
                        } catch (err) {
                          console.error('Image upload failed', err);
                        }
                      }
                    }}
                    style={{ fontSize: '13px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Main Hero Title (Use *word* for yellow highlight)</label>
                <input
                  type="text"
                  value={formData.arHero?.title || '*AR* Games'}
                  onChange={(e) => handleFieldChange('arHero', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Breadcrumb Label</label>
                <input
                  type="text"
                  value={formData.arHero?.breadcrumbText || 'AR Games'}
                  onChange={(e) => handleFieldChange('arHero', 'breadcrumbText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arHero', formData.arHero || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save AR Hero Banner Section
                </button>
              </div>
            </div>
          )}

                    {/* CATEGORIES & GAMES CATALOG FORM */}
          {activeSection === 'arCategoriesData' && (() => {
            const defaultCategoriesData = {
  "Sports Simulators": [
    {
      "name": "Soccer Simulator",
      "img": "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Penalty Shootout",
      "img": "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Tennis Simulator",
      "img": "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Interactive Basketball",
      "img": "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Archery Simulator",
      "img": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Shooting Simulator",
      "img": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Cycling Simulator",
      "img": "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Skiing Simulator",
      "img": "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Ski Simulator",
      "img": "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Boxing Simulator",
      "img": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Running Simulator",
      "img": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Rowing Simulator",
      "img": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Curling Simulator",
      "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Crazy Slingshot",
      "img": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Super Rolling Ball",
      "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Dynamic Styling",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Motion Sensing Game",
      "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Golf Simulator",
      "img": "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Golf Plus",
      "img": "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Smart Soccer Wall",
      "img": "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80"
    }
  ],
  "Interactive Games": [
    {
      "name": "SAIO All-in-One 2.0",
      "img": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "SAIO (LED Version)",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Omniball LED Version",
      "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Omniball",
      "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Combat 6",
      "img": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Cyber Dunk Reality",
      "img": "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Interactive Running Wall",
      "img": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Interactive Curling",
      "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Cyber AR Boxing",
      "img": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "AR Spin Bike",
      "img": "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "AR Spin Bikes — Luxe",
      "img": "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Interactive Rock Climbing",
      "img": "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Magic Billiard",
      "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Dynamic Kayaking",
      "img": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Interactive Billiards",
      "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Whac-a-Mole on Wall",
      "img": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Wonder Wall",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Interactive Slide",
      "img": "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "AR Magic Swing",
      "img": "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Music Wall",
      "img": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Legend Archery",
      "img": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Roll Action",
      "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Particle Man",
      "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Super Grid",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Laser Maze",
      "img": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Motion Master Console",
      "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
    }
  ],
  "AR & VR Experiences": [
    {
      "name": "AR Bumper Car",
      "img": "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "AR Garden",
      "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "AR Spin Bike",
      "img": "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "AR Spin Bikes — Luxe",
      "img": "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Immersive Laser Shooting",
      "img": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "10M High Range High Accuracy Laser Shooting",
      "img": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Hunting Storm Realistic",
      "img": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Wireless Laser Tag",
      "img": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "7D Imax Cinema",
      "img": "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Immersive Dynamic Cinema",
      "img": "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Immersive Room",
      "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Immersive Restaurant",
      "img": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "AI Holographic Bot",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Fog Screen Machine",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Radar",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    }
  ],
  "Interactive Floor & Walls": [
    {
      "name": "Magic Floor — Integrated",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Magic Floor — Outdoor",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Magic Floor — Indoor",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Active Game LED Floor",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Digital Display Wall",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Wonderful World",
      "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Magical Waterfall",
      "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Wonder Wall",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Projection Lamp",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Projection Mapping Software",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Electronic Whiteboard",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    }
  ],
  "Kids & Family Attractions": [
    {
      "name": "Interactive Trampoline",
      "img": "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Interactive Sandbox",
      "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Magic Egg Fort",
      "img": "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Interactive Slide",
      "img": "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "AR Garden",
      "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Gesture Interactive Book",
      "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Draw2Life (Scan)",
      "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Draw2Life (Screen)",
      "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "GymBuster",
      "img": "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?auto=format&fit=crop&w=600&q=80"
    }
  ],
  "Fitness & Education": [
    {
      "name": "Gym Education Interactive Training System",
      "img": "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "AR Spin Bike",
      "img": "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "AR Spin Bikes — Luxe",
      "img": "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Interactive Rock Climbing",
      "img": "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Cyber AR Boxing",
      "img": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Combat 6",
      "img": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Roll Action",
      "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Motion Master Console",
      "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
    }
  ],
  "Bowling & Ball Games": [
    {
      "name": "Top Bowling",
      "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Bowling",
      "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Mini Bowling",
      "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Interactive Bowling",
      "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Magic Billiard",
      "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Interactive Billiards",
      "img": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Super Rolling Ball",
      "img": "https://images.unsplash.com/photo-1545232979-fbf582f05a9d?auto=format&fit=crop&w=600&q=80"
    }
  ],
  "Themed & Immersive Zones": [
    {
      "name": "Immersive Room",
      "img": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Immersive Restaurant",
      "img": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Immersive Dynamic Cinema",
      "img": "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "7D Imax Cinema",
      "img": "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Themed Sports Bar",
      "img": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Whole Site Planning",
      "img": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
    }
  ],
  "Technology & Infrastructure": [
    {
      "name": "Projection Mapping Software",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "AI Holographic Bot",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Electronic Whiteboard",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Fog Screen Machine",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Projection Lamp",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Radar",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Digital Display Wall",
      "img": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      "name": "Whole Site Planning",
      "img": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
    }
  ]
};

            const categoriesData = (formData.arCategoriesData && typeof formData.arCategoriesData === 'object' && Object.keys(formData.arCategoriesData).length > 0)
              ? formData.arCategoriesData
              : defaultCategoriesData;

            const categoryNames = Object.keys(categoriesData);
            const selectedCat = categoryNames.includes(adminSelectedCat) ? adminSelectedCat : (categoryNames[0] || 'Sports Simulators');
            const gamesList = Array.isArray(categoriesData[selectedCat]) ? categoriesData[selectedCat] : [];

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Categories & Games Catalog Manager</h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 10px 0' }}>Manage all game categories and individual games displayed on the AR Games Page.</p>

                {/* Category Selection & Add Category Control */}
                <div style={{ background: '#F8FAFC', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0369a1' }}>Select Category ({categoryNames.length} Categories Total)</h4>

                    {/* Add Category Input & Button */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="text"
                        placeholder="New Category Name..."
                        value={newCategoryInput}
                        onChange={(e) => setNewCategoryInput(e.target.value)}
                        style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                      />
                      <button
                        onClick={() => {
                          if (!newCategoryInput.trim()) return;
                          const catName = newCategoryInput.trim();
                          const updated = { ...categoriesData, [catName]: [] };
                          setFormData(prev => ({ ...prev, arCategoriesData: updated }));
                          setAdminSelectedCat(catName);
                          setNewCategoryInput('');
                        }}
                        style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: '800', cursor: 'pointer' }}
                      >
                        + Add Category
                      </button>
                    </div>
                  </div>

                  {/* Category Selection Pills */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '6px' }}>
                    {categoryNames.map((cat, idx) => {
                      const isSel = cat === selectedCat;
                      return (
                        <button
                          key={idx}
                          onClick={() => setAdminSelectedCat(cat)}
                          style={{
                            padding: '8px 14px',
                            borderRadius: '10px',
                            border: isSel ? '2px solid #0284c7' : '1px solid #cbd5e1',
                            background: isSel ? '#0284c7' : '#ffffff',
                            color: isSel ? '#ffffff' : '#475569',
                            fontSize: '12.5px',
                            fontWeight: isSel ? '800' : '600',
                            cursor: 'pointer',
                            boxShadow: isSel ? '0 4px 12px rgba(2, 132, 199, 0.25)' : 'none'
                          }}
                        >
                          {cat} ({categoriesData[cat]?.length || 0})
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Category Header, Rename & Delete */}
                <div style={{ background: '#ffffff', padding: '16px 20px', borderRadius: '16px', border: '1.5px solid #38bdf8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                  <div style={{ flex: 1, display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <label style={{ fontWeight: '800', fontSize: '13px', color: '#0f172a', whiteSpace: 'nowrap' }}>Active Category Name:</label>
                    <input
                      type="text"
                      value={selectedCat}
                      onChange={(e) => {
                        const newTitle = e.target.value;
                        if (!newTitle) return;
                        const updated = {};
                        Object.keys(categoriesData).forEach(key => {
                          if (key === selectedCat) {
                            updated[newTitle] = categoriesData[selectedCat];
                          } else {
                            updated[key] = categoriesData[key];
                          }
                        });
                        setFormData(prev => ({ ...prev, arCategoriesData: updated }));
                        setAdminSelectedCat(newTitle);
                      }}
                      style={{ padding: '8px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: '800', color: '#0284c7', flex: 1 }}
                    />
                  </div>

                  <button
                    onClick={() => {
                      if (categoryNames.length <= 1) {
                        alert('Cannot delete the last remaining category!');
                        return;
                      }
                      if (window.confirm(`Are you sure you want to delete category "${selectedCat}" and all its games?`)) {
                        const updated = { ...categoriesData };
                        delete updated[selectedCat];
                        setFormData(prev => ({ ...prev, arCategoriesData: updated }));
                        setAdminSelectedCat(Object.keys(updated)[0]);
                      }
                    }}
                    style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', padding: '8px 16px', borderRadius: '10px', fontSize: '12.5px', fontWeight: '800', cursor: 'pointer' }}
                  >
                    Delete Category
                  </button>
                </div>

                {/* Games Manager for Selected Category */}
                <div style={{ background: '#F8FAFC', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0369a1' }}>Games under "${selectedCat}" ({gamesList.length} Games)</h4>
                    <button
                      onClick={() => {
                        const newGame = { name: 'New Game', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80' };
                        const updatedCatList = [...gamesList, newGame];
                        const updated = { ...categoriesData, [selectedCat]: updatedCatList };
                        setFormData(prev => ({ ...prev, arCategoriesData: updated }));
                      }}
                      style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '8px', fontSize: '12.5px', fontWeight: '800', cursor: 'pointer' }}
                    >
                      + Add New Game
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                    {gamesList.map((game, gIdx) => (
                      <div key={gIdx} style={{ background: '#ffffff', padding: '14px', borderRadius: '14px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: '800', fontSize: '12.5px', color: '#0284c7' }}>Game #{gIdx + 1}</span>
                          <button
                            onClick={() => {
                              const updatedCatList = gamesList.filter((_, i) => i !== gIdx);
                              const updated = { ...categoriesData, [selectedCat]: updatedCatList };
                              setFormData(prev => ({ ...prev, arCategoriesData: updated }));
                            }}
                            style={{ background: '#ef4444', color: '#fff', border: 'none', width: '26px', height: '26px', borderRadius: '6px', cursor: 'pointer', fontWeight: '900' }}
                          >
                            ×
                          </button>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>Game Title</label>
                          <input
                            type="text"
                            value={game.name || ''}
                            onChange={(e) => {
                              const updatedCatList = [...gamesList];
                              updatedCatList[gIdx] = { ...updatedCatList[gIdx], name: e.target.value };
                              const updated = { ...categoriesData, [selectedCat]: updatedCatList };
                              setFormData(prev => ({ ...prev, arCategoriesData: updated }));
                            }}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>Game Image</label>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            {game.img && <img src={game.img} alt="" style={{ width: '50px', height: '36px', objectFit: 'cover', borderRadius: '6px' }} />}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  try {
                                    const res = await uploadImageFile(file, admin.token);
                                    if (res.url) {
                                      const updatedCatList = [...gamesList];
                                      updatedCatList[gIdx] = { ...updatedCatList[gIdx], img: res.url };
                                      const updated = { ...categoriesData, [selectedCat]: updatedCatList };
                                      setFormData(prev => ({ ...prev, arCategoriesData: updated }));
                                    }
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }
                              }}
                              style={{ fontSize: '12px' }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                  <button
                    onClick={() => persistSectionToDatabase('arCategoriesData', categoriesData)}
                    style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                  >
                    Save Categories & Games Catalog
                  </button>
                </div>
              </div>
            );
          })()}

{/* AR GAMES SUPPLIER FORM */}
          {activeSection === 'arIntro' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>AR Games Supplier in India Section</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Right Collage Graphic Image</label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  {formData.arIntro?.mainImgUrl && (
                    <img
                      src={formData.arIntro.mainImgUrl}
                      alt="AR Supplier Collage Preview"
                      style={{ width: '120px', height: '70px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #cbd5e1' }}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          if (res.url) {
                            handleFieldChange('arIntro', 'mainImgUrl', res.url);
                          }
                        } catch (err) {
                          console.error('Image upload failed', err);
                        }
                      }
                    }}
                    style={{ fontSize: '13px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Section Title (Use *word* for cyan highlight & &lt;br/&gt; for linebreaks)</label>
                <input
                  type="text"
                  value={formData.arIntro?.title || '*AR Games* Supplier in India'}
                  onChange={(e) => handleFieldChange('arIntro', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Section Description</label>
                <textarea
                  rows={3}
                  value={formData.arIntro?.desc || "India's ROI-first AR games supplier — we source, install, and service interactive gaming attractions that draw crowds."}
                  onChange={(e) => handleFieldChange('arIntro', 'desc', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.arIntro?.buttonText || 'Get Quote From Expert'}
                    onChange={(e) => handleFieldChange('arIntro', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                  <input
                    type="text"
                    value={formData.arIntro?.buttonLink || 'https://wa.me/919428989488'}
                    onChange={(e) => handleFieldChange('arIntro', 'buttonLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arIntro', formData.arIntro || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save AR Supplier Section
                </button>
              </div>
            </div>
          )}

          {/* INTERACTIVE AR ATTRACTIONS FORM */}
          {activeSection === 'arMatchedVenue' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Interactive AR Attractions Section</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Left Column Image Graphic</label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  {formData.arMatchedVenue?.imgUrl && (
                    <img
                      src={formData.arMatchedVenue.imgUrl}
                      alt="AR Attractions Image Preview"
                      style={{ width: '120px', height: '70px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #cbd5e1' }}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          if (res.url) {
                            handleFieldChange('arMatchedVenue', 'imgUrl', res.url);
                          }
                        } catch (err) {
                          console.error('Image upload failed', err);
                        }
                      }
                    }}
                    style={{ fontSize: '13px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Title (Use *word* for cyan highlight & &lt;br/&gt; for linebreaks)</label>
                <input
                  type="text"
                  value={formData.arMatchedVenue?.title || 'Interactive AR Attractions,<br/>*Built for Your Venue*'}
                  onChange={(e) => handleFieldChange('arMatchedVenue', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 1</label>
                <textarea
                  rows={3}
                  value={formData.arMatchedVenue?.p1 || "Winera International is a trusted AR games supplier in India sourcing and installing commercial sports simulators, interactive floor systems, AR experiences, and immersive gaming equipment for malls, hotels, schools, resorts, and family entertainment centres for more than 15 Years. Every product is sourced from established global manufacturers and configured for sustained commercial use"}
                  onChange={(e) => handleFieldChange('arMatchedVenue', 'p1', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13px', fontFamily: 'inherit' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 2</label>
                <textarea
                  rows={3}
                  value={formData.arMatchedVenue?.p2 || "As a direct AR entertainment setup partner, our own team manages everything from space planning and product selection to installation and after-sales support — one team, zero third-party contractors."}
                  onChange={(e) => handleFieldChange('arMatchedVenue', 'p2', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13px', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.arMatchedVenue?.buttonText || 'Get Quote From Expert'}
                    onChange={(e) => handleFieldChange('arMatchedVenue', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                  <input
                    type="text"
                    value={formData.arMatchedVenue?.buttonLink || 'https://wa.me/919428989488'}
                    onChange={(e) => handleFieldChange('arMatchedVenue', 'buttonLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arMatchedVenue', formData.arMatchedVenue || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Interactive AR Attractions Section
                </button>
              </div>
            </div>
          )}

          {/* AR FEATURES & HIGHLIGHTS FORM */}
          {activeSection === 'arFeatures' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>AR Features & Highlights Settings</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Tech Frame Background Image</label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  {formData.arFeatures?.bgUrl && (
                    <img
                      src={formData.arFeatures.bgUrl}
                      alt="Bg Preview"
                      style={{ width: '120px', height: '60px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #cbd5e1' }}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          if (res.url) {
                            handleFieldChange('arFeatures', 'bgUrl', res.url);
                          }
                        } catch (err) {
                          console.error('Image upload failed', err);
                        }
                      }
                    }}
                    style={{ fontSize: '13px' }}
                  />
                </div>
              </div>

              {/* Feature 1 */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0284c7' }}>Feature Row #1</h4>
                <input
                  type="text"
                  placeholder="Row 1 Title"
                  value={formData.arFeatures?.f1Title || "*Exciting* Attractions"}
                  onChange={(e) => handleFieldChange('arFeatures', 'f1Title', e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                />
                <textarea
                  rows={3}
                  placeholder="Row 1 Description"
                  value={formData.arFeatures?.f1Desc || "Bumper Cars Have Long Held A Special Place In The Hearts Of Amusement Park Enthusiasts..."}
                  onChange={(e) => handleFieldChange('arFeatures', 'f1Desc', e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontFamily: 'inherit' }}
                />
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>Row 1 Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          if (res.url) {
                            handleFieldChange('arFeatures', 'f1Img', res.url);
                          }
                        } catch (err) {
                          console.error('Upload error', err);
                        }
                      }
                    }}
                    style={{ fontSize: '12px' }}
                  />
                </div>
              </div>

              {/* Feature 2 */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0284c7' }}>Feature Row #2</h4>
                <input
                  type="text"
                  placeholder="Row 2 Title"
                  value={formData.arFeatures?.f2Title || "High-Quality *Equipment*"}
                  onChange={(e) => handleFieldChange('arFeatures', 'f2Title', e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                />
                <textarea
                  rows={3}
                  placeholder="Row 2 Description"
                  value={formData.arFeatures?.f2Desc || "Bumper Cars Have Long Held A Special Place In The Hearts Of Amusement Park Enthusiasts..."}
                  onChange={(e) => handleFieldChange('arFeatures', 'f2Desc', e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontFamily: 'inherit' }}
                />
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>Row 2 Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          if (res.url) {
                            handleFieldChange('arFeatures', 'f2Img', res.url);
                          }
                        } catch (err) {
                          console.error('Upload error', err);
                        }
                      }
                    }}
                    style={{ fontSize: '12px' }}
                  />
                </div>
              </div>

              {/* Feature 3 */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0284c7' }}>Feature Row #3</h4>
                <input
                  type="text"
                  placeholder="Row 3 Title"
                  value={formData.arFeatures?.f3Title || "*Budget-Friendly AR*<br/>Entertainment Setup"}
                  onChange={(e) => handleFieldChange('arFeatures', 'f3Title', e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                />
                <textarea
                  rows={3}
                  placeholder="Row 3 Description"
                  value={formData.arFeatures?.f3Desc || "Bumper Cars Have Long Held A Special Place In The Hearts Of Amusement Park Enthusiasts..."}
                  onChange={(e) => handleFieldChange('arFeatures', 'f3Desc', e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontFamily: 'inherit' }}
                />
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>Row 3 Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          if (res.url) {
                            handleFieldChange('arFeatures', 'f3Img', res.url);
                          }
                        } catch (err) {
                          console.error('Upload error', err);
                        }
                      }
                    }}
                    style={{ fontSize: '12px' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arFeatures', formData.arFeatures || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save AR Features
                </button>
              </div>
            </div>
          )}

          {/* KNOW YOUR RETURNS SECTION FORM */}
          {activeSection === 'arEarn' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Know Your Returns Section Settings</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Section Title (Use *word* for cyan highlight & &lt;br/&gt; for linebreaks)</label>
                <input
                  type="text"
                  value={formData.arEarn?.title || '*Know Your Returns Before* You Invest in<br/>AR Gaming Equipment'}
                  onChange={(e) => handleFieldChange('arEarn', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 1</label>
                <textarea
                  rows={3}
                  value={formData.arEarn?.p1 || "Most AR games suppliers in India present a product catalogue and a price list the financial planning is left entirely to you. As India's ROI-First Game Zone Developer, Winera International works differently. Before recommending any product or configuration, our team prepares a complete ROI report for your specific venue covering equipment cost, projected daily sessions, estimated revenue per attraction, maintenance costs, and break-even timeline."}
                  onChange={(e) => handleFieldChange('arEarn', 'p1', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13px', fontFamily: 'inherit' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 2</label>
                <textarea
                  rows={3}
                  value={formData.arEarn?.p2 || "Every figure is calculated around your venue type, available floor space, and visitor demographic, not an industry benchmark that may have no relevance to your actual situation. Very few interactive gaming setup suppliers in India include this as a standard part of their process. For Winera, it is where every project starts"}
                  onChange={(e) => handleFieldChange('arEarn', 'p2', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13px', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.arEarn?.buttonText || 'Talk to an ROI Expert'}
                    onChange={(e) => handleFieldChange('arEarn', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                  <input
                    type="text"
                    value={formData.arEarn?.buttonLink || 'https://wa.me/919428989488'}
                    onChange={(e) => handleFieldChange('arEarn', 'buttonLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Right Side Gamers Image Graphic</label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  {formData.arEarn?.imgUrl && (
                    <img
                      src={formData.arEarn.imgUrl}
                      alt="Gamers Graphic Preview"
                      style={{ width: '100px', height: '70px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #cbd5e1' }}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          if (res.url) {
                            handleFieldChange('arEarn', 'imgUrl', res.url);
                          }
                        } catch (err) {
                          console.error('Image upload failed', err);
                        }
                      }
                    }}
                    style={{ fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arEarn', formData.arEarn || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Know Your Returns Section
                </button>
              </div>
            </div>
          )}

          {/* AR GAMES WHY CHOOSE US FORM */}
          {activeSection === 'arWhyUs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Why Choose Winera International Section</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Section Title (Use *word* for cyan highlight)</label>
                <input
                  type="text"
                  value={formData.arWhyUs?.title || 'Why Choose *Winera International*'}
                  onChange={(e) => handleFieldChange('arWhyUs', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              {/* Cards List Manager */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0369a1' }}>Feature Cards (6 Cards Layout)</h4>
                  <button
                    onClick={() => {
                      const cur = formData.arWhyUs?.cardsList || [
                        { title: "Right Product, Right Venue", desc: "We Recommend What Actually Fits Your Space And Footfall." },
                        { title: "ROI Before You Invest", desc: "We Show You The Real Numbers Before You Commit." },
                        { title: "Operational From Day One", desc: "We Install And Configure Everything, So You Open Without The Headaches." },
                        { title: "Support Beyond Installation", desc: "Our Own Technicians Handle Servicing And Updates After Handover." },
                        { title: "Age-Inclusive Entertainment", desc: "We Choose A Mix That Entertains All Ages, So More Visitors Walk In." },
                        { title: "Trusted Across Venue Types", desc: "From Malls And Hotels To Schools And Resorts Across India Trust Us." }
                      ];
                      handleFieldChange('arWhyUs', 'cardsList', [...cur, { title: 'New Feature Card', desc: 'Card description goes here.' }]);
                    }}
                    style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    + Add Feature Card
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {(formData.arWhyUs?.cardsList || [
                    { title: "Right Product, Right Venue", desc: "We Recommend What Actually Fits Your Space And Footfall." },
                    { title: "ROI Before You Invest", desc: "We Show You The Real Numbers Before You Commit." },
                    { title: "Operational From Day One", desc: "We Install And Configure Everything, So You Open Without The Headaches." },
                    { title: "Support Beyond Installation", desc: "Our Own Technicians Handle Servicing And Updates After Handover." },
                    { title: "Age-Inclusive Entertainment", desc: "We Choose A Mix That Entertains All Ages, So More Visitors Walk In." },
                    { title: "Trusted Across Venue Types", desc: "From Malls And Hotels To Schools And Resorts Across India Trust Us." }
                  ]).map((card, idx) => (
                    <div key={idx} style={{ background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '800', fontSize: '13px', color: '#0284c7' }}>Card #{idx + 1}</span>
                        <button
                          onClick={() => {
                            const list = [...(formData.arWhyUs?.cardsList || [])];
                            list.splice(idx, 1);
                            handleFieldChange('arWhyUs', 'cardsList', list);
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
                          const list = [...(formData.arWhyUs?.cardsList || [])];
                          list[idx] = { ...list[idx], title: e.target.value };
                          handleFieldChange('arWhyUs', 'cardsList', list);
                        }}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                      />

                      <textarea
                        rows={2}
                        placeholder="Card Description"
                        value={card.desc || ''}
                        onChange={(e) => {
                          const list = [...(formData.arWhyUs?.cardsList || [])];
                          list[idx] = { ...list[idx], desc: e.target.value };
                          handleFieldChange('arWhyUs', 'cardsList', list);
                        }}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontFamily: 'inherit' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arWhyUs', formData.arWhyUs || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Why Choose Section
                </button>
              </div>
            </div>
          )}

          {/* AR GAMES FAQS FORM */}
          {activeSection === 'arFaqs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>AR Games FAQs Management</h3>
                <button
                  onClick={() => {
                    const currentList = Array.isArray(formData.arFaqs) && formData.arFaqs.length > 0
                      ? formData.arFaqs
                      : [
                        { question: "What is an AR Gaming Setup and how does it work?", answer: "Augmented Reality (AR) gaming combines physical play spaces with interactive digital projections, sensors, and motion tracking to create immersive experiences for players without needing heavy headsets." },
                        { question: "What type of venues are AR games best suited for?", answer: "AR games are ideal for Family Entertainment Centres (FECs), shopping malls, amusement parks, sports bars, resorts, trampoline parks, and indoor play zones." },
                        { question: "Do you provide installation and technical support across India?", answer: "Yes, Winera International provides end-to-end site inspection, custom installation, game software setup, staff training, and nationwide maintenance support." },
                        { question: "What is the expected ROI for an AR gaming setup?", answer: "With high repeat play rates and low operator maintenance, most commercial venue operators achieve full break-even within 6 to 12 months depending on footfall." }
                      ];
                    const updated = [...currentList, { question: '', answer: '' }];
                    setFormData((prev) => ({ ...prev, arFaqs: updated }));
                  }}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                >
                  + Add FAQ Item
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(Array.isArray(formData.arFaqs) && formData.arFaqs.length > 0
                  ? formData.arFaqs
                  : [
                    { question: "What is an AR Gaming Setup and how does it work?", answer: "Augmented Reality (AR) gaming combines physical play spaces with interactive digital projections, sensors, and motion tracking to create immersive experiences for players without needing heavy headsets." },
                    { question: "What type of venues are AR games best suited for?", answer: "AR games are ideal for Family Entertainment Centres (FECs), shopping malls, amusement parks, sports bars, resorts, trampoline parks, and indoor play zones." },
                    { question: "Do you provide installation and technical support across India?", answer: "Yes, Winera International provides end-to-end site inspection, custom installation, game software setup, staff training, and nationwide maintenance support." },
                    { question: "What is the expected ROI for an AR gaming setup?", answer: "With high repeat play rates and low operator maintenance, most commercial venue operators achieve full break-even within 6 to 12 months depending on footfall." }
                  ]
                ).map((faq, idx) => (
                  <div key={idx} style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '800', fontSize: '13px', color: '#0369a1' }}>FAQ #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const currentList = Array.isArray(formData.arFaqs) ? [...formData.arFaqs] : [];
                          currentList.splice(idx, 1);
                          setFormData((prev) => ({ ...prev, arFaqs: currentList }));
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
                        const currentList = Array.isArray(formData.arFaqs) ? [...formData.arFaqs] : [];
                        currentList[idx] = { ...currentList[idx], question: e.target.value, q: e.target.value };
                        setFormData((prev) => ({ ...prev, arFaqs: currentList }));
                      }}
                      style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                    />

                    <textarea
                      rows={3}
                      placeholder="Answer"
                      value={faq.answer || faq.a || ''}
                      onChange={(e) => {
                        const currentList = Array.isArray(formData.arFaqs) ? [...formData.arFaqs] : [];
                        currentList[idx] = { ...currentList[idx], answer: e.target.value, a: e.target.value };
                        setFormData((prev) => ({ ...prev, arFaqs: currentList }));
                      }}
                      style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontFamily: 'inherit' }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arFaqs', formData.arFaqs || [])}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save AR FAQs
                </button>
              </div>
            </div>
          )}

          {/* AR GAMES CTA BANNER FORM */}
          {activeSection === 'arCta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>CTA Consultations Banner Settings</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Banner Background Image</label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  {formData.arCta?.bgUrl && (
                    <img
                      src={formData.arCta.bgUrl}
                      alt="Banner Preview"
                      style={{ width: '120px', height: '60px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #cbd5e1' }}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          if (res.url) {
                            handleFieldChange('arCta', 'bgUrl', res.url);
                          }
                        } catch (err) {
                          console.error('Image upload failed', err);
                        }
                      }
                    }}
                    style={{ fontSize: '13px' }}
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Yellow Text</label>
                  <input
                    type="text"
                    value={formData.arCta?.yellowText || 'NEED ANY '}
                    onChange={(e) => handleFieldChange('arCta', 'yellowText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Cyan Text</label>
                  <input
                    type="text"
                    value={formData.arCta?.cyanText || 'CONSULTATIONS?'}
                    onChange={(e) => handleFieldChange('arCta', 'cyanText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>White Heading Text</label>
                <input
                  type="text"
                  value={formData.arCta?.whiteText || "WE'RE READY TO GIVE ANSWERS TO YOUR QUESTIONS."}
                  onChange={(e) => handleFieldChange('arCta', 'whiteText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.arCta?.buttonText || 'Talk to an ROI Expert'}
                    onChange={(e) => handleFieldChange('arCta', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link (Redirect URL)</label>
                  <input
                    type="text"
                    value={formData.arCta?.buttonLink || 'https://wa.me/919428989488'}
                    onChange={(e) => handleFieldChange('arCta', 'buttonLink', e.target.value)}
                    placeholder="https://wa.me/919428989488"
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>
              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('arCta', formData.arCta || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save CTA Banner
                </button>
              </div>
            </div>
          )}

          {/* VR GAMES HERO BANNER FORM */}
          {activeSection === 'vrHero' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>VR Games Hero Banner Settings</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Hero Background Image</label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  {formData.vrHero?.bgUrl && (
                    <img
                      src={formData.vrHero.bgUrl}
                      alt="Hero Background Preview"
                      style={{ width: '120px', height: '70px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #cbd5e1' }}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          if (res.url) {
                            handleFieldChange('vrHero', 'bgUrl', res.url);
                          }
                        } catch (err) {
                          console.error('Image upload failed', err);
                        }
                      }
                    }}
                    style={{ fontSize: '13px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Main Hero Title (Use *word* for yellow highlight)</label>
                <input
                  type="text"
                  value={formData.vrHero?.title || '*VR* Games'}
                  onChange={(e) => handleFieldChange('vrHero', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Breadcrumb Label</label>
                <input
                  type="text"
                  value={formData.vrHero?.breadcrumbText || 'VR Games'}
                  onChange={(e) => handleFieldChange('vrHero', 'breadcrumbText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('vrHero', formData.vrHero || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Hero Banner Section
                </button>
              </div>
            </div>
          )}

          {/* VR GAMING MACHINE SUPPLIER FORM */}
          {activeSection === 'vrSupplier' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>VR Gaming Machine Supplier Section</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Left Image Graphic</label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  {formData.vrIntro?.mainImgUrl && (
                    <img
                      src={formData.vrIntro.mainImgUrl}
                      alt="Supplier Left Image Preview"
                      style={{ width: '120px', height: '70px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #cbd5e1' }}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          if (res.url) {
                            handleFieldChange('vrIntro', 'mainImgUrl', res.url);
                          }
                        } catch (err) {
                          console.error('Image upload failed', err);
                        }
                      }
                    }}
                    style={{ fontSize: '13px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Section Title (Use *word* for cyan highlight & &lt;br/&gt; for linebreaks)</label>
                <input
                  type="text"
                  value={formData.vrIntro?.title || '*VR Gaming Machine*<br/>supplier in India'}
                  onChange={(e) => handleFieldChange('vrIntro', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Section Description</label>
                <textarea
                  rows={3}
                  value={formData.vrIntro?.desc || "India's ROI-first VR gaming supplier commercial-grade machines sourced, configured, and serviced by our own team across 50+ cities"}
                  onChange={(e) => handleFieldChange('vrIntro', 'desc', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.vrIntro?.buttonText || 'Get Quote From Expert'}
                    onChange={(e) => handleFieldChange('vrIntro', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                  <input
                    type="text"
                    value={formData.vrIntro?.buttonLink || 'https://wa.me/919428989488'}
                    onChange={(e) => handleFieldChange('vrIntro', 'buttonLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('vrIntro', formData.vrIntro || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Supplier Section
                </button>
              </div>
            </div>
          )}

          {/* COMMERCIAL VR MACHINES MATCHED VENUE FORM */}
          {activeSection === 'vrMatchedVenue' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Commercial VR Machines Matched Venue Section</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Right Image Graphic</label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  {formData.vrMatchedVenue?.imgUrl && (
                    <img
                      src={formData.vrMatchedVenue.imgUrl}
                      alt="Right Image Preview"
                      style={{ width: '120px', height: '70px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #cbd5e1' }}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          if (res.url) {
                            handleFieldChange('vrMatchedVenue', 'imgUrl', res.url);
                          }
                        } catch (err) {
                          console.error('Image upload failed', err);
                        }
                      }
                    }}
                    style={{ fontSize: '13px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Title (Use *word* for cyan highlight & &lt;br/&gt; for linebreaks)</label>
                <input
                  type="text"
                  value={formData.vrMatchedVenue?.title || '*Commercial VR Machines,*<br/>Matched to Your Venue'}
                  onChange={(e) => handleFieldChange('vrMatchedVenue', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 1</label>
                <textarea
                  rows={2}
                  value={formData.vrMatchedVenue?.p1 || "Winera International Pvt. Ltd. is a trusted VR gaming machine supplier in India sourcing and servicing commercial virtual reality machines end-to-end across India."}
                  onChange={(e) => handleFieldChange('vrMatchedVenue', 'p1', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13px', fontFamily: 'inherit' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 2</label>
                <textarea
                  rows={2}
                  value={formData.vrMatchedVenue?.p2 || "With over 15 years of industry expertise, we source every VR gaming machine from established global manufacturers and configure it with the right game library, payment system, and safety setup to match your venue's requirements."}
                  onChange={(e) => handleFieldChange('vrMatchedVenue', 'p2', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13px', fontFamily: 'inherit' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 3</label>
                <textarea
                  rows={2}
                  value={formData.vrMatchedVenue?.p3 || "Before delivery, each unit goes through a commercial-grade durability check — built for high-footfall environments like malls, hotels, and family entertainment centres."}
                  onChange={(e) => handleFieldChange('vrMatchedVenue', 'p3', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13px', fontFamily: 'inherit' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 4</label>
                <textarea
                  rows={2}
                  value={formData.vrMatchedVenue?.p4 || "From sourcing to installation and after-sales support, our own team manages the entire process."}
                  onChange={(e) => handleFieldChange('vrMatchedVenue', 'p4', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13px', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.vrMatchedVenue?.buttonText || 'Get Quote From Expert'}
                    onChange={(e) => handleFieldChange('vrMatchedVenue', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                  <input
                    type="text"
                    value={formData.vrMatchedVenue?.buttonLink || 'https://wa.me/919428989488'}
                    onChange={(e) => handleFieldChange('vrMatchedVenue', 'buttonLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('vrMatchedVenue', formData.vrMatchedVenue || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Matched Venue Section
                </button>
              </div>
            </div>
          )}

          {/* OUR VR GAMING MACHINE RANGE FORM */}
          {activeSection === 'vrRange' && (() => {
            const defaultVrRangeItems = [
              { title: "VR4 Seated", subtitle: "Multiplayer Ride", category: "ACTIVE SIMULATION", name: "VR Wings Experience", img: "/src/assets/vr-range-theater.png", status: "ONLINE", latency: "4ms", icon: "plane" },
              { title: "VR Wings", subtitle: "Immersive Flight", category: "FLIGHT SIMULATION", name: "VR Wings Flight Arena", img: "/src/assets/about-3.png", status: "ONLINE", latency: "2ms", icon: "users" },
              { title: "VR UFO 5 player", subtitle: "Multiplayer Ride", category: "THEATER SIMULATION", name: "VR UFO 5 Player Motion Pod", img: "/src/assets/arcade-hall.png", status: "ONLINE", latency: "5ms", icon: "radio" },
              { title: "VR UFO 4 player", subtitle: "Multiplayer Ride", category: "ARCADE SIMULATION", name: "VR UFO 4 Player Battle Station", img: "/src/assets/about-4.png", status: "ONLINE", latency: "3ms", icon: "gamepad" },
              { title: "VR Thunder Dual 360", subtitle: "Combat Station", category: "ACTION SIMULATION", name: "VR Thunder Dual 360 Platform", img: "/src/assets/cta-arcade.png", status: "ONLINE", latency: "4ms", icon: "zap" },
              { title: "VR 360 Egg Chair", subtitle: "Dual Seat Pod", category: "MOTION CINEMA", name: "VR 360 Egg Chair Simulator", img: "/src/assets/about-3.png", status: "ONLINE", latency: "3ms", icon: "sparkles" },
              { title: "VR Racing Motorbike", subtitle: "Speed Simulation", category: "RACING SIMULATION", name: "VR Moto Racing Simulator", img: "/src/assets/about-4.png", status: "ONLINE", latency: "2ms", icon: "flame" },
              { title: "VR Standing Arena", subtitle: "360 Platform", category: "ACTIVE SIMULATION", name: "VR Standing Flight Arena", img: "/src/assets/cta-arcade.png", status: "ONLINE", latency: "4ms", icon: "target" }
            ];

            const vrItemsList = (Array.isArray(formData.vrRange?.items) && formData.vrRange.items.length > 0)
              ? formData.vrRange.items
              : defaultVrRangeItems;

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Our VR Gaming Machine Range Section</h3>

                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue.</p>
                  <input
                    type="text"
                    value={formData.vrRange?.title || '*Our VR Gaming* Machine Range'}
                    onChange={(e) => handleFieldChange('vrRange', 'title', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Section Subtitle Paragraph</label>
                  <textarea
                    rows={2}
                    value={formData.vrRange?.subtitle || "Every model in our VR gaming set is sourced from established global manufacturers and configured for sustained commercial operation."}
                    onChange={(e) => handleFieldChange('vrRange', 'subtitle', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontFamily: 'inherit' }}
                  />
                </div>

                {/* Range Items Manager */}
                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0369a1' }}>VR Range Machine Models ({vrItemsList.length} items)</h4>
                    <button
                      onClick={() => {
                        handleFieldChange('vrRange', 'items', [...vrItemsList, { title: 'New VR Model', subtitle: 'Category', category: 'SIMULATION', name: 'VR Model Name', img: '', status: 'ONLINE', latency: '4ms', icon: 'gamepad' }]);
                      }}
                      style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      + Add VR Model
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {vrItemsList.map((item, idx) => (
                      <div key={idx} style={{ background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: '800', fontSize: '13px', color: '#0284c7' }}>VR Model #{idx + 1}</span>
                          <button
                            onClick={() => {
                              const list = [...vrItemsList];
                              list.splice(idx, 1);
                              handleFieldChange('vrRange', 'items', list);
                            }}
                            style={{ background: '#ef4444', color: '#fff', border: 'none', width: '28px', height: '28px', borderRadius: '6px', cursor: 'pointer', fontWeight: '900' }}
                          >
                            ×
                          </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          <input
                            type="text"
                            placeholder="Tab Title (e.g. VR4 Seated)"
                            value={item.title || ''}
                            onChange={(e) => {
                              const list = [...vrItemsList];
                              list[idx] = { ...list[idx], title: e.target.value };
                              handleFieldChange('vrRange', 'items', list);
                            }}
                            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                          />
                          <input
                            type="text"
                            placeholder="Tab Subtitle (e.g. Multiplayer Ride)"
                            value={item.subtitle || ''}
                            onChange={(e) => {
                              const list = [...vrItemsList];
                              list[idx] = { ...list[idx], subtitle: e.target.value };
                              handleFieldChange('vrRange', 'items', list);
                            }}
                            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                          <input
                            type="text"
                            placeholder="Category Badge (e.g. ACTIVE SIMULATION)"
                            value={item.category || ''}
                            onChange={(e) => {
                              const list = [...vrItemsList];
                              list[idx] = { ...list[idx], category: e.target.value };
                              handleFieldChange('vrRange', 'items', list);
                            }}
                            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                          />
                          <input
                            type="text"
                            placeholder="Full Machine Name"
                            value={item.name || ''}
                            onChange={(e) => {
                              const list = [...vrItemsList];
                              list[idx] = { ...list[idx], name: e.target.value };
                              handleFieldChange('vrRange', 'items', list);
                            }}
                            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                          />
                          <input
                            type="text"
                            placeholder="Icon (plane, users, radio, gamepad, zap, sparkles, flame, target)"
                            value={item.icon || 'gamepad'}
                            onChange={(e) => {
                              const list = [...vrItemsList];
                              list[idx] = { ...list[idx], icon: e.target.value };
                              handleFieldChange('vrRange', 'items', list);
                            }}
                            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>Machine Image</label>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            {item.img && <img src={item.img} alt="" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  try {
                                    const res = await uploadImageFile(file, admin.token);
                                    if (res.url) {
                                      const list = [...vrItemsList];
                                      list[idx] = { ...list[idx], img: res.url };
                                      handleFieldChange('vrRange', 'items', list);
                                    }
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }
                              }}
                              style={{ fontSize: '12px' }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                  <button
                    onClick={() => persistSectionToDatabase('vrRange', { ...formData.vrRange, items: vrItemsList })}
                    style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                  >
                    Save Range Section
                  </button>
                </div>
              </div>
            );
          })()}

          {/* COMMERCIAL-GRADE QUALITY AND RELIABILITY FORM */}
          {activeSection === 'vrReliability' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Commercial-Grade Quality & Reliability Section</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue.</p>
                <input
                  type="text"
                  value={formData.vrReliability?.title || '*Commercial-Grade* Quality<br/>and Reliability'}
                  onChange={(e) => handleFieldChange('vrReliability', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Right Column Image</label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  {formData.vrReliability?.imgUrl && (
                    <img
                      src={formData.vrReliability.imgUrl}
                      alt="Reliability Image Preview"
                      style={{ width: '120px', height: '70px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #cbd5e1' }}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          if (res.url) {
                            handleFieldChange('vrReliability', 'imgUrl', res.url);
                          }
                        } catch (err) {
                          console.error(err);
                        }
                      }
                    }}
                    style={{ fontSize: '13px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Main Paragraph Description</label>
                <textarea
                  rows={3}
                  value={formData.vrReliability?.mainP || "Most VR machines look impressive in a showroom. What matters for your venue is how they perform after six months of daily public use. Every unit we supply is built specifically for commercial cycling not consumer hardware repackaged for public environments. The difference shows up in your maintenance bills, not the spec sheet."}
                  onChange={(e) => handleFieldChange('vrReliability', 'mainP', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontFamily: 'inherit' }}
                />
              </div>

              {/* Feature 1 */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0284c7' }}>Feature Checkmark 1</h4>
                <input
                  type="text"
                  placeholder="Feature 1 Title"
                  value={formData.vrReliability?.f1Title || "Right Machine for Every Venue Type"}
                  onChange={(e) => handleFieldChange('vrReliability', 'f1Title', e.target.value)}
                  style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: '700' }}
                />
                <textarea
                  rows={2}
                  placeholder="Feature 1 Description"
                  value={formData.vrReliability?.f1Desc || "A 5-player group ride suits a high-footfall mall. A solo seated simulator suits a hotel lobby. Getting this match wrong is the most common reason VR zones underperform. We assess your space, footfall, and visitors before recommending anything — not from a catalogue."}
                  onChange={(e) => handleFieldChange('vrReliability', 'f1Desc', e.target.value)}
                  style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontFamily: 'inherit' }}
                />
              </div>

              {/* Feature 2 */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0284c7' }}>Feature Checkmark 2</h4>
                <input
                  type="text"
                  placeholder="Feature 2 Title"
                  value={formData.vrReliability?.f2Title || "End-to-End Support and Service"}
                  onChange={(e) => handleFieldChange('vrReliability', 'f2Title', e.target.value)}
                  style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: '700' }}
                />
                <textarea
                  rows={2}
                  placeholder="Feature 2 Description"
                  value={formData.vrReliability?.f2Desc || "The same team that recommends your machine mix sources it, installs it, and supports it after handover. No separate vendors, no subcontractors, no waiting on overseas manufacturers. When something needs attention, one call reaches the right person."}
                  onChange={(e) => handleFieldChange('vrReliability', 'f2Desc', e.target.value)}
                  style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('vrReliability', formData.vrReliability || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Reliability Section
                </button>
              </div>
            </div>
          )}

          {/* WHAT WILL YOUR VR GAMING ZONE ACTUALLY EARN FORM */}
          {activeSection === 'vrEarn' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>What Will Your VR Gaming Zone Earn Section</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue.</p>
                <input
                  type="text"
                  value={formData.vrEarn?.title || 'What Will Your VR Gaming<br/>*Zone Actually Earn?*'}
                  onChange={(e) => handleFieldChange('vrEarn', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 1</label>
                <textarea
                  rows={3}
                  value={formData.vrEarn?.p1 || "Most VR machine suppliers in India quote a price and leave the financial decision entirely to you. As India's ROI-First Game Zone Developer, Winera International works differently. Before confirming any order, our team prepares a complete ROI report for your specific venue covering machine cost, projected daily sessions, estimated revenue per player, maintenance costs, and break-even timeline."}
                  onChange={(e) => handleFieldChange('vrEarn', 'p1', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13px', fontFamily: 'inherit' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 2</label>
                <textarea
                  rows={3}
                  value={formData.vrEarn?.p2 || "Every figure is calculated around your venue type, footfall, and machine selection, not an industry average pulled from a brochure. Very few VR gaming suppliers in India include this as a standard part of their process. For Winera, it is where every project starts"}
                  onChange={(e) => handleFieldChange('vrEarn', 'p2', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13px', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.vrEarn?.buttonText || 'Get Quote From Expert'}
                    onChange={(e) => handleFieldChange('vrEarn', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                  <input
                    type="text"
                    value={formData.vrEarn?.buttonLink || 'https://wa.me/919428989488'}
                    onChange={(e) => handleFieldChange('vrEarn', 'buttonLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('vrEarn', formData.vrEarn || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save ROI Earn Section
                </button>
              </div>
            </div>
          )}

          {/* WHY CHOOSE WINERA SECTION */}
          {activeSection === 'vrWhyUs' && (() => {
            const defaultVrWhyUsCards = [
              { title: "We Turn Down Weak Machines", desc: "If A Machine Won't Survive Heavy Public Use, We Won't Sell It To You." },
              { title: "One Supplier, Full Setup", desc: "Your Entire Machine Mix Is Sourced, Installed, And Serviced By One Team." },
              { title: "We Know The Footfall", desc: "Years Of Real Venues Tell Us What Works Where And What Doesn't." },
              { title: "Transparent Pricing", desc: "A Clear Cost Breakdown Up Front, With No Surprises Later." },
              { title: "Built Around Your Space", desc: "We Recommend Machines That Fit Your Actual Floor, Not A Catalogue." }
            ];

            const cardsList = (Array.isArray(formData.vrWhyUs?.cardsList) && formData.vrWhyUs.cardsList.length > 0)
              ? formData.vrWhyUs.cardsList
              : defaultVrWhyUsCards;

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Why Choose Winera International Section</h3>

                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Section Heading Title</label>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Tip: Wrap words with <code style={{ background: '#e2e8f0', padding: '2px 5px', borderRadius: '4px' }}>*word*</code> to make them Cyan blue.</p>
                  <input
                    type="text"
                    value={formData.vrWhyUs?.title || 'Why Choose *Winera International*'}
                    onChange={(e) => handleFieldChange('vrWhyUs', 'title', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>

                {/* Feature Cards List */}
                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0369a1' }}>Feature Cards ({cardsList.length} cards)</h4>
                    <button
                      onClick={() => {
                        handleFieldChange('vrWhyUs', 'cardsList', [...cardsList, { title: '', desc: '' }]);
                      }}
                      style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      + Add Card
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {cardsList.map((card, idx) => (
                      <div key={idx} style={{ background: '#ffffff', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <input
                            type="text"
                            placeholder="Card Title"
                            value={card.title || ''}
                            onChange={(e) => {
                              const list = [...cardsList];
                              list[idx] = { ...list[idx], title: e.target.value };
                              handleFieldChange('vrWhyUs', 'cardsList', list);
                            }}
                            style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700' }}
                          />
                          <input
                            type="text"
                            placeholder="Card Description"
                            value={card.desc || ''}
                            onChange={(e) => {
                              const list = [...cardsList];
                              list[idx] = { ...list[idx], desc: e.target.value };
                              handleFieldChange('vrWhyUs', 'cardsList', list);
                            }}
                            style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                          />
                        </div>
                        <button
                          onClick={() => {
                            const list = [...cardsList];
                            list.splice(idx, 1);
                            handleFieldChange('vrWhyUs', 'cardsList', list);
                          }}
                          style={{ background: '#ef4444', color: '#fff', border: 'none', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', flexShrink: 0 }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section CTA Button Controls */}
                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0369a1' }}>Call To Action (CTA) Button Settings</h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>CTA Button Text</label>
                      <input
                        type="text"
                        value={formData.vrWhyUs?.ctaText || 'Get Free Consultation'}
                        onChange={(e) => handleFieldChange('vrWhyUs', 'ctaText', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '600' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>CTA Button Link (URL or WhatsApp)</label>
                      <input
                        type="text"
                        value={formData.vrWhyUs?.ctaLink || 'https://wa.me/919428989488'}
                        onChange={(e) => handleFieldChange('vrWhyUs', 'ctaLink', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '600' }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                  <button
                    onClick={() => persistSectionToDatabase('vrWhyUs', { ...formData.vrWhyUs, cardsList })}
                    style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                  >
                    Save Why Choose Section
                  </button>
                </div>
              </div>
            );
          })()}

          {/* VR GAMES FAQS FORM */}
          {activeSection === 'vrFaqs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>VR Games FAQs Management</h3>
                <button
                  onClick={() => {
                    const currentList = Array.isArray(formData.vrFaqs) && formData.vrFaqs.length > 0
                      ? formData.vrFaqs
                      : [
                        {
                          q: "1. What Is A VR Game Setup For Game Zones?",
                          a: "VR games combine 9D/3D motion platforms, VR headsets, 360-degree rotation seats, and interactive shooting/racing gear to deliver fully immersive virtual reality experiences for visitors of all age groups."
                        },
                        {
                          q: "2. How Much Space Is Required For VR Machines?",
                          a: "Compact single VR simulators start from as little as 30 sq ft, while multi-player VR arenas or VR motion platforms require 100-300 sq ft depending on the model."
                        },
                        {
                          q: "3. What VR Machines Are Best For Commercial Venues?",
                          a: "Popular choices include VR Egg Cinema Chairs, VR 360 Flight Simulators, VR Racing Motorbikes, VR Standing Flight Platforms, and Multi-Player VR Target Arenas."
                        },
                        {
                          q: "4. Does Winera Provide Turnkey VR Setup & Maintenance In India?",
                          a: "Yes! We offer complete turnkey solutions including venue 3D layout planning, equipment installation, game library configuration, card reader integration, and lifetime technical support across 50+ cities in India."
                        }
                      ];
                    const updated = [...currentList, { q: '', a: '' }];
                    setFormData((prev) => ({ ...prev, vrFaqs: updated }));
                  }}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                >
                  + Add FAQ Item
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(Array.isArray(formData.vrFaqs) && formData.vrFaqs.length > 0
                  ? formData.vrFaqs
                  : [
                    {
                      q: "1. What Is A VR Game Setup For Game Zones?",
                      a: "VR games combine 9D/3D motion platforms, VR headsets, 360-degree rotation seats, and interactive shooting/racing gear to deliver fully immersive virtual reality experiences for visitors of all age groups."
                    },
                    {
                      q: "2. How Much Space Is Required For VR Machines?",
                      a: "Compact single VR simulators start from as little as 30 sq ft, while multi-player VR arenas or VR motion platforms require 100-300 sq ft depending on the model."
                    },
                    {
                      q: "3. What VR Machines Are Best For Commercial Venues?",
                      a: "Popular choices include VR Egg Cinema Chairs, VR 360 Flight Simulators, VR Racing Motorbikes, VR Standing Flight Platforms, and Multi-Player VR Target Arenas."
                    },
                    {
                      q: "4. Does Winera Provide Turnkey VR Setup & Maintenance In India?",
                      a: "Yes! We offer complete turnkey solutions including venue 3D layout planning, equipment installation, game library configuration, card reader integration, and lifetime technical support across 50+ cities in India."
                    }
                  ]
                ).map((faq, idx) => (
                  <div key={idx} style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '800', fontSize: '13px', color: '#0369a1' }}>FAQ #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const currentList = [...(formData.vrFaqs || [])];
                          currentList.splice(idx, 1);
                          setFormData((prev) => ({ ...prev, vrFaqs: currentList }));
                        }}
                        style={{ background: '#ef4444', color: '#fff', border: 'none', width: '28px', height: '28px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '900' }}
                      >
                        ×
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="Question"
                      value={faq.q || faq.question || ''}
                      onChange={(e) => {
                        const currentList = [...(formData.vrFaqs || [])];
                        currentList[idx] = { ...currentList[idx], q: e.target.value, question: e.target.value };
                        setFormData((prev) => ({ ...prev, vrFaqs: currentList }));
                      }}
                      style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13.5px', fontWeight: '700' }}
                    />

                    <textarea
                      rows={3}
                      placeholder="Answer"
                      value={faq.a || faq.answer || ''}
                      onChange={(e) => {
                        const currentList = [...(formData.vrFaqs || [])];
                        currentList[idx] = { ...currentList[idx], a: e.target.value, answer: e.target.value };
                        setFormData((prev) => ({ ...prev, vrFaqs: currentList }));
                      }}
                      style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontFamily: 'inherit' }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('vrFaqs', formData.vrFaqs || [])}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save VR Games FAQs
                </button>
              </div>
            </div>
          )}
          {activeSection === 'vrCta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>VR Games CTA Banner Settings</h3>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Banner Background Image</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <img
                      src={formData.vrCta?.bgUrl || formData.vrCta?.bg || ctaConsultationsBanner}
                      alt="Banner Background Preview"
                      style={{ width: '160px', height: '70px', borderRadius: '10px', objectFit: 'cover', border: '1.5px solid #cbd5e1' }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          try {
                            const res = await uploadImageFile(file, admin.token);
                            if (res.url) {
                              handleFieldChange('vrCta', 'bgUrl', res.url);
                              handleFieldChange('vrCta', 'bg', res.url);
                            }
                          } catch (err) {
                            console.error('Image upload failed', err);
                          }
                        }
                      }}
                      style={{ fontSize: '13px' }}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Or enter Image URL (e.g. /src/assets/... or http://...)"
                    value={formData.vrCta?.bgUrl || ''}
                    onChange={(e) => {
                      handleFieldChange('vrCta', 'bgUrl', e.target.value);
                      handleFieldChange('vrCta', 'bg', e.target.value);
                    }}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13px', fontWeight: '500' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Yellow Title Text</label>
                  <input
                    type="text"
                    value={formData.vrCta?.yellowText || 'NEED ANY '}
                    onChange={(e) => handleFieldChange('vrCta', 'yellowText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Cyan Title Text</label>
                  <input
                    type="text"
                    value={formData.vrCta?.cyanText || 'CONSULTATIONS?'}
                    onChange={(e) => handleFieldChange('vrCta', 'cyanText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>White Subtitle Text</label>
                <textarea
                  rows={3}
                  value={formData.vrCta?.whiteText || "WE'RE READY TO GIVE ANSWERS TO YOUR QUESTIONS."}
                  onChange={(e) => handleFieldChange('vrCta', 'whiteText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontFamily: 'inherit' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Description Text</label>
                <textarea
                  rows={3}
                  value={formData.vrCta?.description || "Partner with India's trusted VR gaming machine supplier for a complete VR zone setup across India."}
                  onChange={(e) => handleFieldChange('vrCta', 'description', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.vrCta?.buttonText || 'Talk to an ROI Expert'}
                    onChange={(e) => handleFieldChange('vrCta', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link</label>
                  <input
                    type="text"
                    value={formData.vrCta?.buttonLink || 'https://wa.me/919428989488'}
                    onChange={(e) => handleFieldChange('vrCta', 'buttonLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('vrCta', formData.vrCta || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save VR Games CTA Banner
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
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Description Paragraph</label>
                <textarea
                  rows={3}
                  value={formData.bowlingIntro?.desc || ''}
                  onChange={(e) => handleFieldChange('bowlingIntro', 'desc', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Main Front Image (Group Friends Photo)</label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <label style={{ background: '#38bdf8', color: '#fff', padding: '10px 18px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Main Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading main image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.bowlingIntro || {}), mainImgUrl: res.url };
                          setFormData(prev => ({ ...prev, bowlingIntro: updated }));
                          await persistSectionToDatabase('bowlingIntro', updated);
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {formData.bowlingIntro?.mainImgUrl && (
                    <img src={formData.bowlingIntro.mainImgUrl} alt="" style={{ width: '60px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                  )}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Top-Right Frame Image (Dark Neon Lanes Photo)</label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <label style={{ background: '#38bdf8', color: '#fff', padding: '10px 18px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Upload style={{ width: '16px', height: '16px' }} /> Upload Top-Right Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setStatusMsg('Uploading top-right image...');
                        try {
                          const res = await uploadImageFile(file, admin.token);
                          const updated = { ...(formData.bowlingIntro || {}), secondaryImgUrl: res.url };
                          setFormData(prev => ({ ...prev, bowlingIntro: updated }));
                          await persistSectionToDatabase('bowlingIntro', updated);
                        } catch (err) {
                          setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {formData.bowlingIntro?.secondaryImgUrl && (
                    <img src={formData.bowlingIntro.secondaryImgUrl} alt="" style={{ width: '60px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                  )}
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('bowlingIntro', formData.bowlingIntro || {})}
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
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 1 Description</label>
                <textarea
                  rows={3}
                  value={formData.bowlingManufacturer?.p1 || ''}
                  onChange={(e) => handleFieldChange('bowlingManufacturer', 'p1', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 2 Description</label>
                <textarea
                  rows={3}
                  value={formData.bowlingManufacturer?.p2 || ''}
                  onChange={(e) => handleFieldChange('bowlingManufacturer', 'p2', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Watch Video Target Link URL</label>
                <input
                  type="text"
                  value={formData.bowlingManufacturer?.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
                  onChange={(e) => handleFieldChange('bowlingManufacturer', 'videoUrl', e.target.value)}
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
                  value={formData.bowlingFreeFall?.title || '*Free-Fall Bowling:* Give the Full Professional Experience'}
                  onChange={(e) => handleFieldChange('bowlingFreeFall', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 1 Description</label>
                <textarea
                  rows={3}
                  value={formData.bowlingFreeFall?.p1 || ''}
                  onChange={(e) => handleFieldChange('bowlingFreeFall', 'p1', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 2 Description</label>
                <textarea
                  rows={3}
                  value={formData.bowlingFreeFall?.p2 || ''}
                  onChange={(e) => handleFieldChange('bowlingFreeFall', 'p2', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px' }}
                />
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
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Watch Video URL Link</label>
                  <input
                    type="text"
                    value={formData.bowlingFreeFall?.videoUrl || 'https://wa.me/919428989488'}
                    onChange={(e) => handleFieldChange('bowlingFreeFall', 'videoUrl', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Download Brochure Button Label</label>
                  <input
                    type="text"
                    value={formData.bowlingFreeFall?.brochureBtnText || 'Download Brochure'}
                    onChange={(e) => handleFieldChange('bowlingFreeFall', 'brochureBtnText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Brochure PDF / Link URL</label>
                  <input
                    type="text"
                    value={formData.bowlingFreeFall?.brochureUrl || '#'}
                    onChange={(e) => handleFieldChange('bowlingFreeFall', 'brochureUrl', e.target.value)}
                    placeholder="e.g. /assets/brochure.pdf or https://..."
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
                  value={formData.bowlingString?.title || 'String Bowling Machines: *Affordable Bowling Setup for Every Venue*'}
                  onChange={(e) => handleFieldChange('bowlingString', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 1 Description</label>
                <textarea
                  rows={3}
                  value={formData.bowlingString?.p1 || ''}
                  onChange={(e) => handleFieldChange('bowlingString', 'p1', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 2 Description</label>
                <textarea
                  rows={3}
                  value={formData.bowlingString?.p2 || ''}
                  onChange={(e) => handleFieldChange('bowlingString', 'p2', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Watch Video Button Label</label>
                  <input
                    type="text"
                    value={formData.bowlingString?.btnText || 'Watch Video'}
                    onChange={(e) => handleFieldChange('bowlingString', 'btnText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Watch Video URL Link</label>
                  <input
                    type="text"
                    value={formData.bowlingString?.videoUrl || 'https://wa.me/919428989488'}
                    onChange={(e) => handleFieldChange('bowlingString', 'videoUrl', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
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
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Maintenance Spec</label>
                  <input
                    type="text"
                    value={formData.bowlingString?.specMaintenance || 'Low — fewer parts, easy servicing'}
                    onChange={(e) => handleFieldChange('bowlingString', 'specMaintenance', e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
                <div>
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
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 1 Description</label>
                <textarea
                  rows={3}
                  value={formData.bowlingRoi?.p1 || ''}
                  onChange={(e) => handleFieldChange('bowlingRoi', 'p1', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 2 Description</label>
                <textarea
                  rows={3}
                  value={formData.bowlingRoi?.p2 || ''}
                  onChange={(e) => handleFieldChange('bowlingRoi', 'p2', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px' }}
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
                    value={formData.bowlingRoi?.videoUrl || 'https://wa.me/919428989488'}
                    onChange={(e) => handleFieldChange('bowlingRoi', 'videoUrl', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
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
                  value={formData.bowlingWhyUs?.title || '*Why Choose* Winera International?'}
                  onChange={(e) => handleFieldChange('bowlingWhyUs', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 1 Description</label>
                <textarea
                  rows={3}
                  value={formData.bowlingWhyUs?.p1 || ''}
                  onChange={(e) => handleFieldChange('bowlingWhyUs', 'p1', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Paragraph 2 Description</label>
                <textarea
                  rows={3}
                  value={formData.bowlingWhyUs?.p2 || ''}
                  onChange={(e) => handleFieldChange('bowlingWhyUs', 'p2', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px' }}
                />
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

          {/* BOWLING RELATED PRODUCTS FORM */}
          {activeSection === 'bowlingRelated' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Related Products Carousel Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Title (Use *word* for Cyan Highlight)
                </label>
                <input
                  type="text"
                  value={formData.bowlingRelated?.title || '*Related* Products'}
                  onChange={(e) => handleFieldChange('bowlingRelated', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('bowlingRelated', formData.bowlingRelated || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Related Products Section
                </button>
              </div>
            </div>
          )}

          {/* BOWLING CTA BANNER FORM */}
          {activeSection === 'bowlingCta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Bowling CTA Banner Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Yellow Highlighted Words
                </label>
                <input
                  type="text"
                  value={formData.bowlingCta?.yellowText ?? "NEED ANY"}
                  onChange={(e) => handleFieldChange('bowlingCta', 'yellowText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Cyan Highlighted Words
                </label>
                <input
                  type="text"
                  value={formData.bowlingCta?.cyanText ?? "BOWLING CONSULTATIONS ?"}
                  onChange={(e) => handleFieldChange('bowlingCta', 'cyanText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  White Subtitle Text
                </label>
                <input
                  type="text"
                  value={formData.bowlingCta?.whiteText ?? "Invest in our quality bowling equipment and elevate your venue with long-lasting, world-class bowling gear without overspending."}
                  onChange={(e) => handleFieldChange('bowlingCta', 'whiteText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>CTA Button Label</label>
                  <input
                    type="text"
                    value={formData.bowlingCta?.buttonText ?? "Get Quote Now"}
                    onChange={(e) => handleFieldChange('bowlingCta', 'buttonText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>CTA Button Link</label>
                  <input
                    type="text"
                    value={formData.bowlingCta?.buttonLink ?? "https://wa.me/919428989488"}
                    onChange={(e) => handleFieldChange('bowlingCta', 'buttonLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
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
                    {(formData.bowlingFaqs || []).map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                        <td style={{ padding: '14px 18px', fontWeight: '700', color: '#64748b' }}>{idx + 1}</td>
                        <td style={{ padding: '14px 18px', fontWeight: '800', color: '#0f172a' }}>{item.q}</td>
                        <td style={{ padding: '14px 18px', color: '#475569', fontSize: '12.5px', lineHeight: '1.4' }}>{item.a}</td>
                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                          <button
                            onClick={() => openModal('edit', idx, item, 'bowlingFaqs')}
                            style={{ background: '#e0f2fe', color: '#0284c7', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', marginRight: '8px', fontWeight: '700', fontSize: '12px' }}
                          >
                            <Edit2 style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }} /> Edit
                          </button>
                          <button
                            onClick={async () => {
                              const updated = (formData.bowlingFaqs || []).filter((_, i) => i !== idx);
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

          {/* ABOUT HERO BANNER FORM */}
          {activeSection === 'aboutHero' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>About Us Hero Banner</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Hero Title (Use *word* for Yellow Highlight)
                </label>
                <input
                  type="text"
                  value={formData.aboutHero?.title || '*About* Us'}
                  onChange={(e) => handleFieldChange('aboutHero', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Breadcrumb Active Page Text
                </label>
                <input
                  type="text"
                  value={formData.aboutHero?.breadcrumbText || 'About Us'}
                  onChange={(e) => handleFieldChange('aboutHero', 'breadcrumbText', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>
              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('aboutHero', formData.aboutHero || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save About Hero Banner
                </button>
              </div>
            </div>
          )}

          {/* WELCOME TO WINERA FORM */}
          {activeSection === 'aboutWelcome' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Welcome To Winera Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Main Title (Use *word* for Cyan Accent)
                </label>
                <input
                  type="text"
                  value={formData.aboutWelcome?.title || 'Welcome to *Winera International*'}
                  onChange={(e) => handleFieldChange('aboutWelcome', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Main Description Paragraph
                </label>
                <textarea
                  rows={4}
                  value={formData.aboutWelcome?.desc || ''}
                  onChange={(e) => handleFieldChange('aboutWelcome', 'desc', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '13.5px' }}
                />
              </div>

              {/* Photo Collage Uploads */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Photo Collage Uploads (4 Photos)</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  {[
                    { label: 'Main Big Background Photo', field: 'mainImgUrl' },
                    { label: 'Top Right Small Photo', field: 'topRightImgUrl' },
                    { label: 'Middle Right Small Photo', field: 'midRightImgUrl' },
                    { label: 'Bottom Left Small Photo', field: 'bottomLeftImgUrl' }
                  ].map((imgItem, iIdx) => (
                    <div key={iIdx} style={{ background: '#ffffff', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                      <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>{imgItem.label}</label>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <label style={{ background: '#38bdf8', color: '#fff', padding: '6px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '11.5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Upload style={{ width: '13px', height: '13px' }} /> Upload Photo
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (!file) return;
                              setStatusMsg(`Uploading ${imgItem.label}...`);
                              try {
                                const res = await uploadImageFile(file, admin.token);
                                const updated = { ...(formData.aboutWelcome || {}), [imgItem.field]: res.url };
                                setFormData(prev => ({ ...prev, aboutWelcome: updated }));
                                await persistSectionToDatabase('aboutWelcome', updated);
                              } catch (err) {
                                setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                              }
                            }}
                            style={{ display: 'none' }}
                          />
                        </label>
                        {formData.aboutWelcome?.[imgItem.field] && (
                          <img src={formData.aboutWelcome[imgItem.field]} alt="" style={{ width: '40px', height: '30px', borderRadius: '6px', objectFit: 'cover', border: '1.5px solid #38bdf8' }} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2 Feature Cards */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Feature Boxes</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div style={{ background: '#ffffff', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                    <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Box 1 Title</label>
                    <input
                      type="text"
                      value={formData.aboutWelcome?.box1Title || 'Quality Assurance'}
                      onChange={(e) => handleFieldChange('aboutWelcome', 'box1Title', e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}
                    />
                    <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Box 1 Description</label>
                    <textarea
                      rows={3}
                      value={formData.aboutWelcome?.box1Desc || ''}
                      onChange={(e) => handleFieldChange('aboutWelcome', 'box1Desc', e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12px' }}
                    />
                  </div>

                  <div style={{ background: '#ffffff', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                    <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Box 2 Title</label>
                    <input
                      type="text"
                      value={formData.aboutWelcome?.box2Title || 'Your Success, Our Commitment'}
                      onChange={(e) => handleFieldChange('aboutWelcome', 'box2Title', e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}
                    />
                    <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Box 2 Description</label>
                    <textarea
                      rows={3}
                      value={formData.aboutWelcome?.box2Desc || ''}
                      onChange={(e) => handleFieldChange('aboutWelcome', 'box2Desc', e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Text</label>
                  <input
                    type="text"
                    value={formData.aboutWelcome?.btnText || 'Contact Us Now'}
                    onChange={(e) => handleFieldChange('aboutWelcome', 'btnText', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>Button Link URL</label>
                  <input
                    type="text"
                    value={formData.aboutWelcome?.btnLink || 'https://wa.me/919428989488'}
                    onChange={(e) => handleFieldChange('aboutWelcome', 'btnLink', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('aboutWelcome', formData.aboutWelcome || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Welcome Section
                </button>
              </div>
            </div>
          )}

          {/* COMPANY ACHIEVEMENTS STATS FORM */}
          {activeSection === 'aboutStats' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Company Achievements Stats Section</h3>

              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', marginBottom: '14px' }}>4 Achievement Counter Stats</h4>
                {(() => {
                  const defaultStatsList = [
                    { defaultNum: "14+", defaultTitle: "YEARS EXPERIENCE" },
                    { defaultNum: "200+", defaultTitle: "Installation" },
                    { defaultNum: "50+", defaultTitle: "Country Served" },
                    { defaultNum: "98%", defaultTitle: "CUSTOMER SATISFACTION" }
                  ];

                  const rawStatsList = Array.isArray(formData.aboutStats?.items)
                    ? formData.aboutStats.items
                    : (Array.isArray(formData.stats) ? formData.stats : []);

                  const fullStatsList = defaultStatsList.map((def, idx) => {
                    const current = rawStatsList[idx] || {};
                    return {
                      num: current.num || current.number || def.defaultNum,
                      title: current.title || current.label || def.defaultTitle
                    };
                  });

                  return (
                    <>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        {fullStatsList.map((currentStat, sIdx) => (
                          <div key={sIdx} style={{ background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                            <div style={{ fontWeight: '800', fontSize: '12px', color: '#38bdf8', marginBottom: '8px' }}>Stat Box #{sIdx + 1}</div>
                            <input
                              type="text"
                              placeholder="Stat Number (e.g. 14+)"
                              value={currentStat.num}
                              onChange={(e) => {
                                const newStats = [...fullStatsList];
                                newStats[sIdx] = { ...newStats[sIdx], num: e.target.value };
                                setFormData(prev => ({
                                  ...prev,
                                  aboutStats: { ...(prev.aboutStats || {}), items: newStats }
                                }));
                              }}
                              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}
                            />
                            <input
                              type="text"
                              placeholder="Stat Title Label"
                              value={currentStat.title}
                              onChange={(e) => {
                                const newStats = [...fullStatsList];
                                newStats[sIdx] = { ...newStats[sIdx], title: e.target.value };
                                setFormData(prev => ({
                                  ...prev,
                                  aboutStats: { ...(prev.aboutStats || {}), items: newStats }
                                }));
                              }}
                              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12.5px', fontWeight: '600' }}
                            />
                          </div>
                        ))}
                      </div>

                      <div style={{ textAlign: 'right', marginTop: '20px' }}>
                        <button
                          onClick={() => {
                            const updatedObj = { ...(formData.aboutStats || {}), items: fullStatsList };
                            setFormData(prev => ({ ...prev, aboutStats: updatedObj }));
                            persistSectionToDatabase('aboutStats', updatedObj);
                          }}
                          style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                        >
                          Save Stats Section
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          )}

          {/* MISSION & VISION FORM */}
          {activeSection === 'aboutMissionVision' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Our Purpose & Promise Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Heading Title (Use *word* for Cyan Highlight)
                </label>
                <input
                  type="text"
                  value={formData.aboutMissionVision?.title || '*Our Purpose* & Promise'}
                  onChange={(e) => handleFieldChange('aboutMissionVision', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              {/* Mission Control */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Mission Block</h4>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Mission Badge Label</label>
                  <input
                    type="text"
                    value={formData.aboutMissionVision?.missionLabel || 'Mission'}
                    onChange={(e) => handleFieldChange('aboutMissionVision', 'missionLabel', e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Mission Statement</label>
                  <textarea
                    rows={3}
                    value={formData.aboutMissionVision?.missionText || ''}
                    onChange={(e) => handleFieldChange('aboutMissionVision', 'missionText', e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              {/* Vision Control */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Vision Block</h4>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Vision Badge Label</label>
                  <input
                    type="text"
                    value={formData.aboutMissionVision?.visionLabel || 'Vision'}
                    onChange={(e) => handleFieldChange('aboutMissionVision', 'visionLabel', e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Vision Statement</label>
                  <textarea
                    rows={3}
                    value={formData.aboutMissionVision?.visionText || ''}
                    onChange={(e) => handleFieldChange('aboutMissionVision', 'visionText', e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('aboutMissionVision', formData.aboutMissionVision || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Mission & Vision Section
                </button>
              </div>
            </div>
          )}

          {/* WHY CHOOSE US MINDMAP DETAIL FORM */}
          {activeSection === 'aboutWhyUsDetail' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Why Choose Us Mindmap Section</h3>
              <div>
                <label style={{ display: 'block', fontWeight: '800', fontSize: '13px', color: '#0f172a', marginBottom: '8px' }}>
                  Section Heading Title (Use *word* for Cyan Highlight)
                </label>
                <input
                  type="text"
                  value={formData.aboutWhyUsDetail?.title || 'Why *Choose Us?*'}
                  onChange={(e) => handleFieldChange('aboutWhyUsDetail', 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: '#F5F5F9', fontSize: '14px', fontWeight: '600' }}
                />
              </div>

              {/* 6 Mindmap Pills */}
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', marginBottom: '14px' }}>6 Mindmap Feature Pills</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  {[
                    "Rich Vendor Base",
                    "Transparent Project Pricing",
                    "International-Grade Quality Equipment",
                    "On-Time Delivery & Installation",
                    "End-to-End Project Ownership",
                    "Competitive Pricing with High ROI"
                  ].map((defText, pIdx) => {
                    const pillsList = Array.isArray(formData.aboutWhyUsDetail?.pills) ? formData.aboutWhyUsDetail.pills : [];
                    const currentPill = pillsList[pIdx] || defText;

                    return (
                      <div key={pIdx} style={{ background: '#ffffff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                        <label style={{ display: 'block', fontWeight: '700', fontSize: '11.5px', color: '#38bdf8', marginBottom: '4px' }}>Pill #{pIdx + 1}</label>
                        <input
                          type="text"
                          value={currentPill || ''}
                          onChange={(e) => {
                            const newPills = [...pillsList];
                            newPills[pIdx] = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              aboutWhyUsDetail: { ...(prev.aboutWhyUsDetail || {}), pills: newPills }
                            }));
                          }}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12.5px', fontWeight: '600' }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3 Bottom Cards (Sales, Service, Satisfaction) */}
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', marginBottom: '14px' }}>3 Bottom Cards (Sales, Service, Satisfaction)</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { defaultTitle: "Sales", defaultDesc: "From the moment you choose Winera International, our dedicated sales team works closely with you to discuss your game zone needs in detail." },
                    { defaultTitle: "Service", defaultDesc: "Our professional installation team takes complete ownership of your project. We ensure smooth assembly, safety compliance, and zero compromise on quality." },
                    { defaultTitle: "Satisfaction", defaultDesc: "Our team manages everything from delivery to live handover. Every game zone we install is set up with precision and care." }
                  ].map((cDef, cIdx) => {
                    const cardsList = Array.isArray(formData.aboutWhyUsDetail?.cards) ? formData.aboutWhyUsDetail.cards : [];
                    const currentCard = cardsList[cIdx] || cDef;

                    return (
                      <div key={cIdx} style={{ background: '#ffffff', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                        <div style={{ fontWeight: '800', fontSize: '12px', color: '#38bdf8', marginBottom: '6px' }}>Card #{cIdx + 1}</div>
                        <input
                          type="text"
                          placeholder="Title"
                          value={currentCard.title || ''}
                          onChange={(e) => {
                            const newCards = [...cardsList];
                            newCards[cIdx] = { ...(newCards[cIdx] || cDef), title: e.target.value };
                            setFormData(prev => ({
                              ...prev,
                              aboutWhyUsDetail: { ...(prev.aboutWhyUsDetail || {}), cards: newCards }
                            }));
                          }}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}
                        />
                        <textarea
                          rows={2}
                          placeholder="Description"
                          value={currentCard.desc || ''}
                          onChange={(e) => {
                            const newCards = [...cardsList];
                            newCards[cIdx] = { ...(newCards[cIdx] || cDef), desc: e.target.value };
                            setFormData(prev => ({
                              ...prev,
                              aboutWhyUsDetail: { ...(prev.aboutWhyUsDetail || {}), cards: newCards }
                            }));
                          }}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

                            {/* CTA Buttons Management */}
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '18px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Call To Action (CTA) Buttons</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#0f172a', marginBottom: '4px' }}>Primary Button Text</label>
                    <input
                      type="text"
                      value={formData.aboutWhyUsDetail?.ctaPrimaryText || 'Get Started'}
                      onChange={(e) => handleFieldChange('aboutWhyUsDetail', 'ctaPrimaryText', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#0f172a', marginBottom: '4px' }}>Primary Button Link (URL or WhatsApp)</label>
                    <input
                      type="text"
                      value={formData.aboutWhyUsDetail?.ctaPrimaryLink || 'https://wa.me/919428989488'}
                      onChange={(e) => handleFieldChange('aboutWhyUsDetail', 'ctaPrimaryLink', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#0f172a', marginBottom: '4px' }}>Secondary Button Text</label>
                    <input
                      type="text"
                      value={formData.aboutWhyUsDetail?.ctaSecondaryText || 'View Our Products'}
                      onChange={(e) => handleFieldChange('aboutWhyUsDetail', 'ctaSecondaryText', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: '800', fontSize: '12.5px', color: '#0f172a', marginBottom: '4px' }}>Secondary Button Link</label>
                    <input
                      type="text"
                      value={formData.aboutWhyUsDetail?.ctaSecondaryLink || '/arcade-game'}
                      onChange={(e) => handleFieldChange('aboutWhyUsDetail', 'ctaSecondaryLink', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: '600' }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  onClick={() => persistSectionToDatabase('aboutWhyUsDetail', formData.aboutWhyUsDetail || {})}
                  style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)' }}
                >
                  Save Why Choose Us Mindmap Section
                </button>
              </div>
            </div>
          )}
          {activeSection === 'founder' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Founder Profile Details</h3>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '3px 0 0' }}>Manage Founder details shown on the About Us page.</p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                {/* Founder Heading Title */}
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                    Section Heading Title (Use *word* for Cyan Accent)
                  </label>
                  <input
                    type="text"
                    value={formData.founder?.headingTitle || 'OUR *FOUNDER*'}
                    onChange={(e) => handleFieldChange('founder', 'headingTitle', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: '600' }}
                  />
                </div>

                {/* Founder Image Upload */}
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Founder Photo (Saved on Server)</label>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <label style={{
                      background: '#38bdf8',
                      color: '#fff',
                      padding: '10px 18px',
                      borderRadius: '12px',
                      fontWeight: '800',
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <Upload style={{ width: '16px', height: '16px' }} /> Choose Founder Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          setStatusMsg('Uploading founder photo...');
                          try {
                            const res = await uploadImageFile(file, admin.token);
                            const updatedFounder = { ...(formData.founder || {}), image: res.url };
                            setFormData(prev => ({ ...prev, founder: updatedFounder }));
                            await persistSectionToDatabase('founder', updatedFounder);
                          } catch (err) {
                            setStatusMsg('Upload error: ' + (err.response?.data?.message || err.message));
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                    </label>
                    {formData.founder?.image && (
                      <img src={formData.founder.image} alt="Founder Preview" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #38bdf8' }} />
                    )}
                  </div>
                </div>

                {/* Founder Name & Experience */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Founder Name</label>
                    <input
                      type="text"
                      value={formData.founder?.name || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, founder: { ...(prev.founder || {}), name: e.target.value } }))}
                      placeholder="e.g. Mr. Unnit Jogani"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '700', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Years of Experience</label>
                    <input
                      type="text"
                      value={formData.founder?.yearsOfExperience || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, founder: { ...(prev.founder || {}), yearsOfExperience: e.target.value } }))}
                      placeholder="e.g. 14+"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '700', fontSize: '14px' }}
                    />
                  </div>
                </div>

                {/* LinkedIn Profile Link */}
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>LinkedIn Profile Link</label>
                  <input
                    type="text"
                    value={formData.founder?.linkedinUrl || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, founder: { ...(prev.founder || {}), linkedinUrl: e.target.value } }))}
                    placeholder="https://linkedin.com/in/..."
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '600', fontSize: '14px' }}
                  />
                </div>

                {/* Founder About Details */}
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Founder's About Details</label>
                  <textarea
                    rows={5}
                    value={formData.founder?.aboutDetails || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, founder: { ...(prev.founder || {}), aboutDetails: e.target.value } }))}
                    placeholder="Enter founder biography & details..."
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', lineHeight: 1.6 }}
                  />
                </div>

                {/* Save Button */}
                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                  <button
                    onClick={() => persistSectionToDatabase('founder', formData.founder || {})}
                    style={{
                      background: '#38bdf8',
                      color: '#ffffff',
                      border: 'none',
                      padding: '12px 28px',
                      borderRadius: '12px',
                      fontWeight: '900',
                      fontSize: '14px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)'
                    }}
                  >
                    Save Founder Profile
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FALLBACK FOR OTHER UNCHECKED SECTIONS */}
          {!['stats', 'clientLogos', 'channelPartners', 'builtProjects', 'faqs', 'testimonials', 'founder'].includes(activeSection) && (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <FileText style={{ width: '48px', height: '48px', color: '#38bdf8', marginBottom: '14px' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                Section: '{activeSection}' Configuration
              </h3>
              <div style={{ textAlign: 'left', maxWidth: '650px', margin: '0 auto' }}>
                <textarea
                  rows={8}
                  value={JSON.stringify(formData[activeSection] || {}, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      setFormData(prev => ({ ...prev, [activeSection]: parsed }));
                    } catch (err) { }
                  }}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '14px',
                    border: '1.5px solid #e2e8f0',
                    background: '#0f172a',
                    color: '#38bdf8',
                    fontFamily: 'monospace',
                    fontSize: '12.5px'
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* PROFESSIONAL POPUP MODAL DIALOG */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '560px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              background: '#0F172B',
              color: '#ffffff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '900', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#38bdf8' }}>{modalMode === 'add' ? 'Add New' : 'Edit'}</span> {activeSection.toUpperCase()} Item
              </h3>
              <button
                onClick={closeModal}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>

            {/* Modal Form Body */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '70vh', overflowY: 'auto' }}>
              {/* 1. STATS FIELDS */}
              {activeSection === 'stats' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Number (e.g., 14+, 200+)</label>
                    <input
                      type="text"
                      value={modalItemData.number || ''}
                      onChange={(e) => setModalItemData(prev => ({ ...prev, number: e.target.value }))}
                      placeholder="e.g. 14+"
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '700', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Label Text</label>
                    <input
                      type="text"
                      value={modalItemData.label || ''}
                      onChange={(e) => setModalItemData(prev => ({ ...prev, label: e.target.value }))}
                      placeholder="e.g. YEARS OF EXPERIENCE"
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '600', fontSize: '14px' }}
                    />
                  </div>
                </>
              )}

              {/* 2. CLIENT LOGOS & CHANNEL PARTNERS FIELDS */}
              {(activeSection === 'clientLogos' || activeSection === 'channelPartners') && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Name / Brand Title</label>
                    <input
                      type="text"
                      value={modalItemData.name || ''}
                      onChange={(e) => setModalItemData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter brand name"
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '700', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Upload Logo File (Saved on Server)</label>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <label style={{
                        background: '#38bdf8',
                        color: '#fff',
                        padding: '10px 16px',
                        borderRadius: '12px',
                        fontWeight: '800',
                        fontSize: '12.5px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <Upload style={{ width: '16px', height: '16px' }} /> Choose Logo File
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleModalFileUpload(e, 'logoUrl')}
                          style={{ display: 'none' }}
                        />
                      </label>
                      {modalItemData.logoUrl && (
                        <img src={modalItemData.logoUrl} alt="" style={{ height: '40px', maxWidth: '100px', objectFit: 'contain', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '2px' }} />
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* 3. GAME ZONES BUILT FIELDS */}
              {activeSection === 'builtProjects' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Name of Game Zone</label>
                    <input
                      type="text"
                      value={modalItemData.name || ''}
                      onChange={(e) => setModalItemData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Hulaboo Game Zone"
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '700', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>City Location</label>
                    <input
                      type="text"
                      value={modalItemData.city || ''}
                      onChange={(e) => setModalItemData(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="e.g. Surat"
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '600', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Upload Venue Image File</label>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <label style={{
                        background: '#38bdf8',
                        color: '#fff',
                        padding: '10px 16px',
                        borderRadius: '12px',
                        fontWeight: '800',
                        fontSize: '12.5px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <Upload style={{ width: '16px', height: '16px' }} /> Choose Photo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleModalFileUpload(e, 'imageUrl')}
                          style={{ display: 'none' }}
                        />
                      </label>
                      {modalItemData.imageUrl && (
                        <img src={modalItemData.imageUrl} alt="" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* 4. FAQ FIELDS */}
              {(activeSection === 'faqs' || activeSection === 'arcadeFaqs' || activeSection === 'bowlingFaqs' || activeSection === 'softplayFaqs' || modalTargetSection === 'arcadeFaqs' || modalTargetSection === 'bowlingFaqs' || modalTargetSection === 'softplayFaqs') && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Question Text</label>
                    <input
                      type="text"
                      value={modalItemData.q || ''}
                      onChange={(e) => setModalItemData(prev => ({ ...prev, q: e.target.value }))}
                      placeholder="Enter question..."
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '700', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Answer Text</label>
                    <textarea
                      rows={4}
                      value={modalItemData.a || ''}
                      onChange={(e) => setModalItemData(prev => ({ ...prev, a: e.target.value }))}
                      placeholder="Enter detailed answer..."
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', lineHeight: 1.5 }}
                    />
                  </div>
                </>
              )}

              {/* 5. TESTIMONIAL FIELDS */}
              {activeSection === 'testimonials' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Game Zone Name</label>
                      <input
                        type="text"
                        value={modalItemData.gameZoneName || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, gameZoneName: e.target.value }))}
                        placeholder="e.g. Hulaboo"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontWeight: '700', fontSize: '13px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Reviewer Role</label>
                      <input
                        type="text"
                        value={modalItemData.reviewerRole || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, reviewerRole: e.target.value }))}
                        placeholder="e.g. Founder & Owner"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Star Rating ({modalItemData.starRating || 5} Stars)</label>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', padding: '6px 0' }}>
                        {[1, 2, 3, 4, 5].map((starVal) => {
                          const isFilled = starVal <= (modalItemData.starRating || 5);
                          return (
                            <button
                              key={starVal}
                              type="button"
                              onClick={() => setModalItemData(prev => ({ ...prev, starRating: starVal }))}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '2px',
                                transition: 'transform 0.15s ease'
                              }}
                            >
                              <Star
                                style={{
                                  width: '26px',
                                  height: '26px',
                                  color: isFilled ? '#ffcd00' : '#cbd5e1',
                                  fill: isFilled ? '#ffcd00' : 'none',
                                  strokeWidth: 2
                                }}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>YouTube Link</label>
                      <input
                        type="text"
                        value={modalItemData.youtubeVideoUrl || ''}
                        onChange={(e) => setModalItemData(prev => ({ ...prev, youtubeVideoUrl: e.target.value }))}
                        placeholder="https://youtube.com/..."
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Upload Founder Photo</label>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <label style={{
                        background: '#38bdf8',
                        color: '#fff',
                        padding: '8px 14px',
                        borderRadius: '10px',
                        fontWeight: '800',
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <Upload style={{ width: '14px', height: '14px' }} /> Upload Photo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleModalFileUpload(e, 'founderImage')}
                          style={{ display: 'none' }}
                        />
                      </label>
                      {modalItemData.founderImage && (
                        <img src={modalItemData.founderImage} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                      )}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>Review Quote</label>
                    <textarea
                      rows={3}
                      value={modalItemData.quote || ''}
                      onChange={(e) => setModalItemData(prev => ({ ...prev, quote: e.target.value }))}
                      placeholder="Enter review quote..."
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '13px', lineHeight: 1.5 }}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Modal Actions Footer */}
            <div style={{
              padding: '16px 24px',
              borderTop: '1px solid #e2e8f0',
              background: '#f8fafc',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px'
            }}>
              <button
                onClick={closeModal}
                style={{
                  padding: '10px 20px',
                  borderRadius: '12px',
                  background: '#ffffff',
                  border: '1.5px solid #cbd5e1',
                  color: '#475569',
                  fontWeight: '800',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={saveModalItem}
                style={{
                  padding: '10px 24px',
                  borderRadius: '12px',
                  background: '#38bdf8',
                  border: 'none',
                  color: '#ffffff',
                  fontWeight: '900',
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)'
                }}
              >
                Save Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

