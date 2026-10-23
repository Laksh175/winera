import React from 'react';
import { Upload } from 'lucide-react';
import BlogAdminManagement from '../components/BlogAdminManagement';
import { uploadImageFile } from '../services/api';

const blogHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345630/winera_uploads/tj7ke5cpufz9t41c4d7v.png";
const defaultGameZoneMobileBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345484/winera_uploads/cjhcvoxksmptc84yslh2.png";

const getAdminValidImageUrl = (url, fallback) => {
  if (!url) return fallback;
  if (typeof url === 'object' && url.default) return url.default;
  if (typeof url !== 'string' || url.trim() === '') return fallback;
  if (url.includes('mobile') || url.includes('Mobile')) {
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

const defaultBlogHero = {
  breadcrumbText: "Blog",
  bgUrl: blogHeroBg,
  bgAlt: "Winera International Game Zone & Entertainment Industry Blog",
  mobileBgUrl: defaultGameZoneMobileBanner,
  mobileBgAlt: "Winera International Game Zone & Entertainment Industry Blog Mobile Banner"
};


export default function BlogDashboard({
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
          {activeSection === 'blogHero' && (() => {
            const currentSec = formData.blogHero || defaultBlogHero;
            return (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Blog Hero Banner</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Breadcrumb Text</label>
                    <input
                      type="text"
                      value={currentSec.breadcrumbText !== undefined ? currentSec.breadcrumbText : defaultBlogHero.breadcrumbText}
                      onChange={(e) => setFormData(prev => ({ ...prev, blogHero: { ...(prev.blogHero || defaultBlogHero), breadcrumbText: e.target.value } }))}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Background Image URL <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📐 Recommended Size: 1920 × 600 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={currentSec.bgUrl !== undefined ? currentSec.bgUrl : defaultBlogHero.bgUrl}
                        onChange={(e) => setFormData(prev => ({ ...prev, blogHero: { ...(prev.blogHero || defaultBlogHero), bgUrl: e.target.value } }))}
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px' }}
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
                              setFormData(prev => ({ ...prev, blogHero: { ...(prev.blogHero || defaultBlogHero), bgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                      <img
                        src={getAdminValidImageUrl(currentSec.bgUrl, blogHeroBg)}
                        alt="Blog Hero Preview"
                        style={{ width: '100px', height: '70px', borderRadius: '10px', objectFit: 'cover', background: '#f8fafc', border: '1.5px solid #38bdf8', padding: '2px' }}
                      />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                        🏷️ Background Image Alt Text (SEO Keyword)
                      </label>
                      <input
                        type="text"
                        value={currentSec.bgAlt !== undefined ? currentSec.bgAlt : (defaultBlogHero.bgAlt || '')}
                        onChange={(e) => setFormData(prev => ({ ...prev, blogHero: { ...(prev.blogHero || defaultBlogHero), bgAlt: e.target.value } }))}
                        placeholder="e.g. Winera International Game Zone & Entertainment Industry Insights"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>

                  {/* Mobile Screen Hero Banner Upload & Preview */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                      Mobile Screen Hero Banner <span style={{ fontSize: '11.5px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '8px' }}>📱 Recommended Size: 941 × 550 px</span>
                    </label>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={currentSec.mobileBgUrl !== undefined ? currentSec.mobileBgUrl : ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, blogHero: { ...(prev.blogHero || defaultBlogHero), mobileBgUrl: e.target.value } }))}
                        placeholder="Mobile Background Image URL"
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '14px', background: '#F5F5F9' }}
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
                              setFormData(prev => ({ ...prev, blogHero: { ...(prev.blogHero || defaultBlogHero), mobileBgUrl: res.url } }));
                            }
                          }}
                        />
                      </label>
                      <img
                        src={getAdminValidImageUrl(currentSec.mobileBgUrl, defaultGameZoneMobileBanner)}
                        alt="Blog Mobile Hero Preview"
                        style={{ width: '100px', height: '70px', borderRadius: '10px', objectFit: 'cover', background: '#f8fafc', border: '1.5px solid #38bdf8', padding: '2px' }}
                      />
                      {currentSec.mobileBgUrl && (
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, blogHero: { ...(prev.blogHero || defaultBlogHero), mobileBgUrl: '' } }))}
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
                        value={currentSec.mobileBgAlt !== undefined ? currentSec.mobileBgAlt : ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, blogHero: { ...(prev.blogHero || defaultBlogHero), mobileBgAlt: e.target.value } }))}
                        placeholder="e.g. Winera International Game Zone & Entertainment Industry Insights Mobile Banner"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '12.5px' }}
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => persistSectionToDatabase('blogHero', formData.blogHero || defaultBlogHero)}
                      style={{ background: '#38bdf8', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
                    >
                      Save Hero Banner
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {activeSection === 'blogPosts' && (
            <BlogAdminManagement
              formData={formData}
              setFormData={setFormData}
              persistSectionToDatabase={persistSectionToDatabase}
              uploadImageFile={uploadImageFile}
              adminToken={admin?.token}
            />
          )}
    </>
  );
}
