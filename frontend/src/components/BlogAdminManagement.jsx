import React, { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Edit,
  Upload,
  Eye,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Search,
  CheckCircle,
  AlertCircle,
  MoveUp,
  MoveDown
} from 'lucide-react';
import RichTextareaWithEditor from './RichTextareaWithEditor';
import { BLOG_POSTS as DEFAULT_BLOG_POSTS } from '../data/blogData';
import { sanitizeAndFormatHtml } from '../pages/BlogDetail';
import blogCardImg from '../assets/blog-images.webp';

const getValidImageUrl = (url, fallback, postId = null, postIdx = null) => {
  if (url && typeof url === 'string' && !url.includes('/src/assets/') && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:'))) {
    return url;
  }
  if (url && typeof url === 'string' && (url.startsWith('/uploads/') || url.startsWith('uploads/'))) {
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    const apiUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '').replace(/\/$/, '') : '';
    if (apiUrl) {
      return `${apiUrl}${cleanUrl}`;
    }
    const hostname = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';
    return `http://${hostname}:5001${cleanUrl}`;
  }
  if (url && typeof url === 'string' && !url.includes('/src/assets/') && (url.startsWith('/assets/') || url.startsWith('/@fs/'))) {
    return url;
  }
  if (url && typeof url === 'object' && url.src) {
    return url.src;
  }
  if (postId !== null && postId !== undefined) {
    const match = DEFAULT_BLOG_POSTS.find(p => String(p.id) === String(postId) || (p.slug && p.slug === String(postId)));
    if (match?.image) return match.image;
  }
  if (typeof postIdx === 'number' && DEFAULT_BLOG_POSTS[postIdx]?.image) {
    return DEFAULT_BLOG_POSTS[postIdx].image;
  }
  return fallback || blogCardImg;
};

// Helper to parse blog post into structured fields
const parseBlogToForm = (post) => {
  if (!post) {
    return {
      id: Date.now(),
      slug: '',
      title: '',
      subtitle: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase(),
      readTime: '4 min read',
      author: 'Divyang Mandani',
      category: 'INSIGHTS',
      image: '',
      description: '',
      sections: [
        { title: '', paragraph: '' }
      ]
    };
  }

  // If already has structured sections array
  if (Array.isArray(post.sections) && post.sections.length > 0) {
    return {
      ...post,
      description: post.description || post.excerpt || '',
      sections: post.sections.map(s => ({
        title: s.title || '',
        paragraph: s.paragraph || s.content || ''
      }))
    };
  }

  // Parse from fullContent markdown stream
  const raw = post.fullContent || post.content || '';
  if (!raw) {
    return {
      ...post,
      description: post.description || post.excerpt || '',
      sections: [{ title: '', paragraph: '' }]
    };
  }

  const parts = raw.split(/\n(?=###\s+)/);
  let description = '';
  let sections = [];

  parts.forEach((part, index) => {
    const trimmed = part.trim();
    if (trimmed.startsWith('###')) {
      const lines = trimmed.split('\n');
      const title = lines[0].replace(/^###\s*/, '').trim();
      const paragraph = lines.slice(1).join('\n').trim();
      sections.push({ title, paragraph });
    } else if (index === 0) {
      description = trimmed;
    } else {
      sections.push({ title: '', paragraph: trimmed });
    }
  });

  if (sections.length === 0) {
    sections = [{ title: '', paragraph: '' }];
  }

  return {
    ...post,
    description: description || post.excerpt || '',
    sections
  };
};

export default function BlogAdminManagement({
  formData,
  setFormData,
  persistSectionToDatabase,
  uploadImageFile,
  adminToken
}) {
  const isDummyPosts = Array.isArray(formData.blogPosts) && formData.blogPosts.length > 0 && (
    formData.blogPosts[0]?.title === 'Blog 1' ||
    (formData.blogPosts[0]?.title?.includes('Soft Play vs Trampoline Park: Which') && formData.blogPosts.length < 15) ||
    formData.blogPosts[0]?.image === '/src/assets/blog-images.png'
  );

  const rawList = (Array.isArray(formData.blogPosts) && formData.blogPosts.length > 0 && !isDummyPosts)
    ? formData.blogPosts
    : DEFAULT_BLOG_POSTS;

  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState('list'); // 'list' | 'create' | 'edit'
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTabPreview, setActiveTabPreview] = useState(false);

  // Initialize or synchronize posts in formData if empty or dummy
  useEffect(() => {
    if (!Array.isArray(formData.blogPosts) || formData.blogPosts.length === 0 || isDummyPosts) {
      setFormData(prev => ({
        ...prev,
        blogPosts: DEFAULT_BLOG_POSTS
      }));
    }
  }, [formData.blogPosts]);

  const handleStartCreate = () => {
    const newBlog = parseBlogToForm(null);
    setEditingBlog(newBlog);
    setCurrentEditIndex(null);
    setActiveView('create');
    setActiveTabPreview(false);
  };

  const handleStartEdit = (index) => {
    const post = rawList[index];
    setEditingBlog(parseBlogToForm(post));
    setCurrentEditIndex(index);
    setActiveView('edit');
    setActiveTabPreview(false);
  };

  const handleDeletePost = (index) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const updated = rawList.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, blogPosts: updated }));
      persistSectionToDatabase('blogPosts', updated);
    }
  };

  const handleAddSection = () => {
    setEditingBlog(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        sections: [...(prev.sections || []), { title: '', paragraph: '' }]
      };
    });
  };

  const handleRemoveSection = (secIndex) => {
    setEditingBlog(prev => {
      if (!prev) return prev;
      if ((prev.sections || []).length <= 1) {
        alert('At least one section is required. You can leave it empty if not needed.');
        return prev;
      }
      const updated = prev.sections.filter((_, i) => i !== secIndex);
      return { ...prev, sections: updated };
    });
  };

  const handleSectionChange = (secIndex, field, val) => {
    setEditingBlog(prev => {
      if (!prev) return prev;
      const list = [...(prev.sections || [])];
      list[secIndex] = { ...(list[secIndex] || {}), [field]: val };
      return { ...prev, sections: list };
    });
  };

  const handleMoveSection = (secIndex, direction) => {
    setEditingBlog(prev => {
      if (!prev) return prev;
      const list = [...(prev.sections || [])];
      const targetIdx = direction === 'up' ? secIndex - 1 : secIndex + 1;
      if (targetIdx < 0 || targetIdx >= list.length) return prev;
      const temp = list[secIndex];
      list[secIndex] = list[targetIdx];
      list[targetIdx] = temp;
      return { ...prev, sections: list };
    });
  };

  const handleSaveBlogForm = async () => {
    if (!editingBlog) return;
    if (!editingBlog.title || !editingBlog.title.trim()) {
      alert('Please enter a Main Heading / Title for the blog.');
      return;
    }

    // Synthesize fullContent markdown stream
    const contentParts = [];
    if (editingBlog.description && editingBlog.description.trim()) {
      contentParts.push(editingBlog.description.trim());
    }
    if (Array.isArray(editingBlog.sections)) {
      editingBlog.sections.forEach(sec => {
        const t = (sec.title || '').trim();
        const p = (sec.paragraph || '').trim();
        if (t && p) {
          contentParts.push(`### ${t}\n\n${p}`);
        } else if (t) {
          contentParts.push(`### ${t}`);
        } else if (p) {
          contentParts.push(p);
        }
      });
    }

    const fullContent = contentParts.join('\n\n');
    const slug = editingBlog.slug?.trim() || editingBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const rawDesc = (editingBlog.description || '').replace(/<[^>]+>/g, '').trim();
    const excerpt = rawDesc ? (rawDesc.substring(0, 160).replace(/\n/g, ' ') + '...') : '';

    const finalizedPost = {
      ...editingBlog,
      slug,
      excerpt: editingBlog.excerpt || excerpt,
      fullContent,
      sections: editingBlog.sections
    };

    let updatedList = [...rawList];
    if (activeView === 'create' || currentEditIndex === null) {
      updatedList = [finalizedPost, ...updatedList];
    } else {
      updatedList[currentEditIndex] = finalizedPost;
    }

    setFormData(prev => ({ ...prev, blogPosts: updatedList }));
    await persistSectionToDatabase('blogPosts', updatedList);
    setActiveView('list');
    setEditingBlog(null);
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    setIsUploading(true);
    try {
      const res = await uploadImageFile(file, adminToken);
      if (res && res.url) {
        setEditingBlog(prev => ({ ...prev, image: res.url }));
      }
    } catch (err) {
      alert('Image upload failed: ' + (err.message || 'Unknown error'));
    } finally {
      setIsUploading(false);
    }
  };

  const filteredPosts = rawList.filter(p => {
    const query = searchQuery.toLowerCase();
    const title = (p.title || '').toLowerCase();
    const author = (p.author || '').toLowerCase();
    return title.includes(query) || author.includes(query);
  });

  return (
    <div style={{ background: '#ffffff', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', fontFamily: "'Open Sans', sans-serif" }}>
      
      {/* ─── VIEW 1: BLOGS LIST VIEW ─── */}
      {activeView === 'list' && (
        <div>
          {/* Top Bar: Title, Search, and Add Blog Button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '28px', paddingBottom: '20px', borderBottom: '1.5px solid #f1f5f9' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                Manage All Blog Posts ({rawList.length})
              </h3>
              <p style={{ fontSize: '13.5px', color: '#64748b', margin: '4px 0 0' }}>
                View, edit default blog articles, or publish new blogs with formatted sections.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {/* Search Bar */}
              <div style={{ position: 'relative', width: '260px' }}>
                <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#94a3b8' }} />
                <input
                  type="text"
                  placeholder="Search blogs by title, author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 36px',
                    borderRadius: '12px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '13px',
                    outline: 'none',
                    background: '#f8fafc'
                  }}
                />
              </div>

              {/* Add Blog Button */}
              <button
                type="button"
                onClick={handleStartCreate}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  padding: '11px 22px',
                  borderRadius: '12px',
                  fontWeight: '800',
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(2, 132, 199, 0.3)',
                  transition: 'all 0.2s ease'
                }}
              >
                <Plus style={{ width: '17px', height: '17px' }} />
                Add Blog
              </button>
            </div>
          </div>

          {/* Blog Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredPosts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 20px', background: '#f8fafc', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
                <p style={{ fontSize: '15px', color: '#64748b', fontWeight: '600' }}>No blogs found matching "{searchQuery}"</p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', marginTop: '8px' }}
                >
                  Clear Search
                </button>
              </div>
            ) : (
              filteredPosts.map((post, index) => {
                const originalIndex = rawList.findIndex(p => p.id === post.id || p.title === post.title);
                const postImg = getValidImageUrl(post.image || post.imgUrl, blogCardImg, post.id, originalIndex >= 0 ? originalIndex : index);

                return (
                  <div
                    key={post.id || index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '20px',
                      background: '#f8fafc',
                      borderRadius: '18px',
                      padding: '18px 20px',
                      border: '1.5px solid #e2e8f0',
                      transition: 'all 0.2s ease',
                      flexWrap: 'wrap'
                    }}
                  >
                    {/* Left: Defined 16:9 Thumbnail Image + Title & Meta */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flex: '1 1 500px', minWidth: '280px' }}>
                      <div style={{
                        width: '120px',
                        height: '75px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: '#0f172a',
                        flexShrink: 0,
                        border: '1.5px solid #cbd5e1',
                        position: 'relative'
                      }}>
                        <img
                          src={postImg}
                          alt={post.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => { e.currentTarget.src = blogCardImg; }}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                        <div style={{ fontSize: '15.5px', fontWeight: '800', color: '#0f172a', lineHeight: 1.35 }}>
                          {post.title} {post.subtitle ? `– ${post.subtitle}` : ''}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12.5px', color: '#64748b', fontWeight: '600', flexWrap: 'wrap' }}>
                          <span>📅 {post.date || 'SEP 12, 2026'}</span>
                          <span>•</span>
                          <span>⏱️ {post.readTime || '4 min read'}</span>
                          <span>•</span>
                          <span style={{ color: '#0284c7', fontWeight: '700' }}>✍️ {post.author || 'Divyang Mandani'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Action Buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        type="button"
                        onClick={() => handleStartEdit(originalIndex >= 0 ? originalIndex : index)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: '#0284c7',
                          color: '#ffffff',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '10px',
                          fontWeight: '800',
                          fontSize: '13px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <Edit style={{ width: '14px', height: '14px' }} />
                        Edit Blog
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeletePost(originalIndex >= 0 ? originalIndex : index)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          background: '#fee2e2',
                          color: '#dc2626',
                          border: 'none',
                          padding: '8px 12px',
                          borderRadius: '10px',
                          fontWeight: '800',
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 style={{ width: '14px', height: '14px' }} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ─── VIEW 2: ADD / EDIT BLOG FORM ─── */}
      {(activeView === 'create' || activeView === 'edit') && editingBlog && (
        <div>
          {/* Header Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '26px', paddingBottom: '16px', borderBottom: '1.5px solid #f1f5f9', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Discard unsaved changes?')) {
                    setActiveView('list');
                    setEditingBlog(null);
                  }
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#f1f5f9',
                  color: '#334155',
                  border: 'none',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                <ArrowLeft style={{ width: '15px', height: '15px' }} />
                Back to Blogs
              </button>

              <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                {activeView === 'create' ? 'Add New Blog' : 'Edit Blog Post'}
              </h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setActiveTabPreview(!activeTabPreview)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: activeTabPreview ? '#0284c7' : '#f0f9ff',
                  color: activeTabPreview ? '#ffffff' : '#0284c7',
                  border: '1.5px solid #0284c7',
                  padding: '9px 16px',
                  borderRadius: '10px',
                  fontWeight: '800',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                <Eye style={{ width: '14px', height: '14px' }} />
                {activeTabPreview ? 'Back to Editor' : 'Live Preview'}
              </button>

              <button
                type="button"
                onClick={handleSaveBlogForm}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#38bdf8',
                  color: '#0f172a',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '12px',
                  fontWeight: '900',
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)'
                }}
              >
                <CheckCircle style={{ width: '15px', height: '15px' }} />
                Save & Publish Blog
              </button>
            </div>
          </div>

          {/* LIVE PREVIEW MODE */}
          {activeTabPreview ? (
            <div style={{ background: '#F5F5F9', borderRadius: '20px', padding: '35px 25px', maxWidth: '850px', margin: '0 auto', textAlign: 'left' }}>
              {/* Blog Title (font-size 38px, font-weight 600) */}
              <h1 style={{ fontSize: '36px', fontWeight: '600', color: '#0f172a', lineHeight: 1.25, margin: '0 0 16px' }}>
                {editingBlog.title || 'Untitled Blog Post'}
              </h1>

              {/* Meta bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#64748b', fontWeight: '600', marginBottom: '22px', paddingBottom: '14px', borderBottom: '1.5px solid #cbd5e1' }}>
                <span>📅 {editingBlog.date || 'SEP 12, 2026'}</span>
                <span>•</span>
                <span>⏱️ {editingBlog.readTime || '4 min read'}</span>
                <span>•</span>
                <span style={{ color: '#0284c7', fontWeight: '700' }}>✍️ {editingBlog.author || 'Divyang Mandani'}</span>
              </div>

              {/* Defined 16:9 Image */}
              {editingBlog.image && (
                <div style={{ width: '100%', maxHeight: '420px', borderRadius: '18px', overflow: 'hidden', marginBottom: '28px', background: '#0f172a' }}>
                  <img src={getValidImageUrl(editingBlog.image, blogCardImg, editingBlog.id, currentEditIndex)} alt="" style={{ width: '100%', height: 'auto', maxHeight: '420px', objectFit: 'cover', display: 'block' }} />
                </div>
              )}

              {/* Description */}
              {editingBlog.description && (
                <div
                  className="winera-admin-blog-preview"
                  style={{ fontSize: '17px', color: '#334155', lineHeight: 1.85, fontWeight: '400', marginBottom: '24px' }}
                  dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(editingBlog.description.replace(/\n/g, '<br>')) }}
                />
              )}

              {/* Sub-sections */}
              {editingBlog.sections?.map((sec, idx) => (
                <div key={idx} style={{ marginBottom: '28px' }}>
                  {sec.title && (
                    <h3
                      className="winera-admin-blog-preview"
                      style={{ fontSize: '22px', fontWeight: '600', color: '#0f172a', margin: '28px 0 12px', lineHeight: 1.35 }}
                      dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(sec.title) }}
                    />
                  )}
                  {sec.paragraph && (
                    <div
                      className="winera-admin-blog-preview"
                      style={{ fontSize: '17px', color: '#334155', lineHeight: 1.85, fontWeight: '400' }}
                      dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(sec.paragraph.replace(/\n/g, '<br>')) }}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* EDITOR FORM */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              
              {/* 1. MAIN HEADING (TITLE) */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                  Main Heading (Blog Title) <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. What Can Indoor Playground Equipment Do for Our Kids?"
                  value={editingBlog.title || ''}
                  onChange={(e) => setEditingBlog(prev => ({ ...prev, title: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* 2. META BAR: DATE, READ TIME, FOUNDER/AUTHOR */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                {/* Date */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                    <Calendar style={{ width: '14px', height: '14px', color: '#0284c7' }} />
                    Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SEP 12, 2026"
                    value={editingBlog.date || ''}
                    onChange={(e) => setEditingBlog(prev => ({ ...prev, date: e.target.value }))}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                  />
                </div>

                {/* Read Time */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                    <Clock style={{ width: '14px', height: '14px', color: '#0284c7' }} />
                    Read Text
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4 min read"
                    value={editingBlog.readTime || ''}
                    onChange={(e) => setEditingBlog(prev => ({ ...prev, readTime: e.target.value }))}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                  />
                </div>

                {/* Founder / Author Name */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                    <User style={{ width: '14px', height: '14px', color: '#0284c7' }} />
                    Founder / Author Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Divyang Mandani / Mr. Unnit Jogani"
                    value={editingBlog.author || ''}
                    onChange={(e) => setEditingBlog(prev => ({ ...prev, author: e.target.value }))}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* 3. FEATURED IMAGE WITH DEFINED RATIO */}
              <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '18px 20px', border: '1.5px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>
                    Featured Image <span style={{ fontSize: '12px', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', marginLeft: '6px' }}>📐 Defined Aspect Ratio: 16:9 (600×400 px)</span>
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  {/* Image URL Input & Upload Button */}
                  <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input
                        type="text"
                        placeholder="Paste Image URL or upload file..."
                        value={editingBlog.image || ''}
                        onChange={(e) => setEditingBlog(prev => ({ ...prev, image: e.target.value }))}
                        style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px' }}
                      />

                      <label style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#0f172a',
                        color: '#ffffff',
                        padding: '10px 18px',
                        borderRadius: '10px',
                        fontWeight: '700',
                        fontSize: '13px',
                        cursor: isUploading ? 'not-allowed' : 'pointer',
                        whiteSpace: 'nowrap'
                      }}>
                        <Upload style={{ width: '14px', height: '14px', marginRight: '6px' }} />
                        {isUploading ? 'Uploading...' : 'Upload Image'}
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          disabled={isUploading}
                          onChange={(e) => {
                            if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                          }}
                        />
                      </label>
                    </div>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      Tip: Supported formats include PNG, JPG, WebP. Auto-optimizes to WebP format.
                    </span>
                  </div>

                  {/* Live Defined Ratio Preview */}
                  <div style={{
                    width: '180px',
                    height: '105px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: '#0f172a',
                    border: '1.5px solid #cbd5e1',
                    position: 'relative',
                    flexShrink: 0
                  }}>
                    <img
                      src={getValidImageUrl(editingBlog.image, blogCardImg, editingBlog.id, currentEditIndex)}
                      alt="Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.currentTarget.src = blogCardImg; }}
                    />
                    <div style={{ position: 'absolute', bottom: '4px', right: '6px', background: 'rgba(0,0,0,0.65)', color: '#fff', fontSize: '10px', padding: '1px 6px', borderRadius: '4px', fontWeight: '700' }}>
                      16:9
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. DESCRIPTION (INTRODUCTORY PARAGRAPHS) */}
              <div>
                <RichTextareaWithEditor
                  label="Description (Introductory Overview Paragraphs)"
                  placeholder="Enter introductory paragraphs before sub-sections (e.g. Kids today spend too much time inside...)"
                  rows={4}
                  value={editingBlog.description || ''}
                  onChange={(val) => setEditingBlog(prev => ({ ...prev, description: val }))}
                  fontSize="15px"
                  lineHeight={1.75}
                  color="#334155"
                />
              </div>

              {/* 5. DYNAMIC SECTIONS (TITLE + PARAGRAPH BOXES) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                    Blog Content Sub-Sections ({editingBlog.sections?.length || 0})
                  </h4>
                  <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0' }}>
                    Each section contains a Sub-Heading (Title) and Paragraph with rich text formatting.
                  </p>
                </div>

                {/* List of Dynamic Sub-Sections */}
                {editingBlog.sections?.map((sec, secIdx) => (
                  <div
                    key={secIdx}
                    style={{
                      background: '#f8fafc',
                      borderRadius: '16px',
                      padding: '20px',
                      border: '1.5px solid #cbd5e1',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                      position: 'relative'
                    }}
                  >
                    {/* Section Top Bar: Section Number & Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13px', fontWeight: '800', color: '#0284c7', background: '#e0f2fe', padding: '3px 10px', borderRadius: '8px' }}>
                        Section #{secIdx + 1}
                      </span>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {secIdx > 0 && (
                          <button
                            type="button"
                            title="Move Up"
                            onClick={() => handleMoveSection(secIdx, 'up')}
                            style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '4px', cursor: 'pointer', color: '#475569' }}
                          >
                            <MoveUp style={{ width: '13px', height: '13px' }} />
                          </button>
                        )}
                        {secIdx < (editingBlog.sections.length - 1) && (
                          <button
                            type="button"
                            title="Move Down"
                            onClick={() => handleMoveSection(secIdx, 'down')}
                            style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '4px', cursor: 'pointer', color: '#475569' }}
                          >
                            <MoveDown style={{ width: '13px', height: '13px' }} />
                          </button>
                        )}
                        {editingBlog.sections.length > 1 && (
                          <button
                            type="button"
                            title="Remove Section"
                            onClick={() => handleRemoveSection(secIdx)}
                            style={{ background: '#fee2e2', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', color: '#dc2626', fontSize: '12px', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Trash2 style={{ width: '13px', height: '13px' }} />
                            Remove
                          </button>
                        )}
                      </div>
                    </div>

                    {/* 1. Sub-Heading (Title) Box */}
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                        1] Sub-Heading / Section Title
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Physical Development Through Play"
                        value={sec.title || ''}
                        onChange={(e) => handleSectionChange(secIdx, 'title', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '1.5px solid #cbd5e1',
                          fontSize: '15px',
                          fontWeight: '600',
                          color: '#0f172a',
                          background: '#ffffff',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* 2. Paragraph (Content) Box with Rich Editor */}
                    <div>
                      <RichTextareaWithEditor
                        label="2] Paragraph / Section Content"
                        placeholder="Enter paragraph content for this section... Use Bold, Italic, Underline, Bullet Lists from toolbar above."
                        rows={4}
                        value={sec.paragraph || ''}
                        onChange={(val) => handleSectionChange(secIdx, 'paragraph', val)}
                        fontSize="15px"
                        lineHeight={1.8}
                        color="#334155"
                      />
                    </div>
                  </div>
                ))}

                {/* Bottom Add More Button */}
                <div style={{ textAlign: 'center', marginTop: '6px' }}>
                  <button
                    type="button"
                    onClick={handleAddSection}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: '#f0f9ff',
                      color: '#0284c7',
                      border: '1.5px dashed #0284c7',
                      padding: '10px 24px',
                      borderRadius: '12px',
                      fontWeight: '800',
                      fontSize: '13.5px',
                      cursor: 'pointer'
                    }}
                  >
                    <Plus style={{ width: '16px', height: '16px' }} />
                    + Add Another Sub-Heading & Paragraph Box
                  </button>
                </div>
              </div>

              {/* Save / Cancel Footer Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', marginTop: '20px', paddingTop: '20px', borderTop: '1.5px solid #f1f5f9' }}>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Discard unsaved changes?')) {
                      setActiveView('list');
                      setEditingBlog(null);
                    }
                  }}
                  style={{
                    background: '#f1f5f9',
                    color: '#475569',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '13.5px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSaveBlogForm}
                  style={{
                    background: '#38bdf8',
                    color: '#0f172a',
                    border: 'none',
                    padding: '12px 32px',
                    borderRadius: '12px',
                    fontWeight: '900',
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(56, 189, 248, 0.35)'
                  }}
                >
                  Save & Publish Blog
                </button>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
