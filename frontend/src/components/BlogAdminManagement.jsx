import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Upload, Eye, ArrowLeft, Calendar, Clock, User, PenTool, Search, CheckCircle, AlertCircle, MoveUp, MoveDown } from 'lucide-react';
import BlogRichEditor from './BlogRichEditor';
import AdminAltInput from './AdminAltInput';
import ConfirmModal from './ConfirmModal';
import StatusDropdown from './StatusDropdown';
import WineraDateTimePicker from './WineraDateTimePicker';
import { sanitizeAndFormatHtml } from '../pages/BlogDetail';
import { fetchBlogs, createBlogApi, updateBlogApi, deleteBlogApi, clearBlogCache } from '../services/api';
import { calculateReadTime, getWordCount } from '../utils/readTime';
const blogCardImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345635/winera_uploads/ltwinrzpqitg4s8znfel.png";

const getValidImageUrl = (url, fallback) => {
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
  return fallback || blogCardImg;
};

const getMinDateTimeLocal = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
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
      readTime: '1 min read',
      author: 'Divyang Mandani',
      category: 'INSIGHTS',
      image: '',
      imageAlt: '',
      description: '',
      fullContent: '',
      metaTitle: '',
      metaDescription: '',
      canonicalUrl: '',
      sections: [],
      isManualReadTime: false,
      isActive: true,
      status: 'active',
      isPublished: true
    };
  }

  // 1. If post already has fullContent, use it directly
  let fullContent = (post.fullContent || post.content || '').trim();

  // 2. If fullContent is empty, combine legacy description and sections
  if (!fullContent) {
    const parts = [];
    if (post.description && post.description.trim()) {
      parts.push(post.description.trim());
    }
    if (Array.isArray(post.sections) && post.sections.length > 0) {
      post.sections.forEach(s => {
        const t = (s.title || '').trim();
        const p = (s.paragraph || s.content || '').trim();
        if (t && p) parts.push(`<h3>${t}</h3>\n<p>${p}</p>`);
        else if (t) parts.push(`<h3>${t}</h3>`);
        else if (p) parts.push(`<p>${p}</p>`);
      });
    }
    fullContent = parts.join('\n\n');
  }

  const computedReadTime = calculateReadTime(fullContent);
  const initialReadTime = post.readTime && post.readTime.trim() ? post.readTime : computedReadTime;
  const isPostScheduled = post.status === 'scheduled';
  const isPostActive = !isPostScheduled && post.isActive !== false && post.status !== 'inactive' && post.isPublished !== false;

  return {
    ...post,
    imageAlt: post.imageAlt || '',
    description: post.description || post.excerpt || '',
    fullContent: fullContent,
    readTime: initialReadTime,
    metaTitle: post.metaTitle || '',
    metaDescription: post.metaDescription || '',
    canonicalUrl: post.canonicalUrl || '',
    sections: [],
    isManualReadTime: Boolean(post.readTime && post.readTime.trim() && post.readTime !== computedReadTime && post.readTime !== '4 min read'),
    isActive: isPostActive,
    status: isPostScheduled ? 'scheduled' : (isPostActive ? 'active' : 'inactive'),
    isPublished: isPostActive,
    scheduledAt: post.scheduledAt || null
  };
};

export default function BlogAdminManagement({
  formData,
  setFormData,
  persistSectionToDatabase,
  uploadImageFile,
  adminToken,
  setStatusMsg
}) {
  const [toast, setToast] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);
  const [scheduleModal, setScheduleModal] = useState(null);

  const openScheduleModal = (index, post) => {
    const initialSched = post?.scheduledAt
      ? new Date(post.scheduledAt).toISOString().slice(0, 16)
      : new Date(Date.now() + 3600000).toISOString().slice(0, 16);
    setScheduleModal({
      index,
      post,
      scheduledAt: initialSched
    });
  };

  const showToast = (message, type = 'success') => {
    if (typeof setStatusMsg === 'function') {
      setStatusMsg(message);
    }
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const isDummyPosts = Array.isArray(formData.blogPosts) && formData.blogPosts.length > 0 && (
    formData.blogPosts[0]?.title === 'Blog 1' ||
    formData.blogPosts[0]?.image === '/src/assets/blog-images.png'
  );

  const rawList = (Array.isArray(formData.blogPosts) && formData.blogPosts.length > 0 && !isDummyPosts)
    ? formData.blogPosts
    : [];

  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState('list'); // 'list' | 'create' | 'edit'
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTabPreview, setActiveTabPreview] = useState(false);

  // Initialize or synchronize posts in formData if empty or dummy
  useEffect(() => {
    if (!Array.isArray(formData.blogPosts) || formData.blogPosts.length === 0 || isDummyPosts) {
      fetchBlogs({ limit: 'all', includeInactive: 'true' })
        .then(res => {
          if (res?.success && Array.isArray(res.blogs || res.posts)) {
            setFormData(prev => ({
              ...prev,
              blogPosts: res.blogs || res.posts
            }));
          }
        })
        .catch(err => console.warn('Dynamic blogs fetch in admin error:', err));
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

  const handleToggleBlogStatus = async (index, newStatus, isAct, schedAt) => {
    const post = rawList[index];
    if (!post) return;

    const isScheduled = newStatus === 'scheduled';
    const updatedPost = {
      ...post,
      isActive: newStatus === 'active',
      status: newStatus,
      isPublished: newStatus === 'active',
      scheduledAt: isScheduled ? (schedAt || post.scheduledAt) : (newStatus === 'active' ? null : post.scheduledAt)
    };

    const updatedList = [...rawList];
    updatedList[index] = updatedPost;

    setFormData(prev => ({
      ...prev,
      blogPosts: updatedList
    }));

    clearBlogCache();

    try {
      const idToUpdate = post._id || post.id || post.slug;
      if (idToUpdate) {
        await updateBlogApi(idToUpdate, updatedPost, adminToken);
      }
      if (typeof persistSectionToDatabase === 'function') {
        await persistSectionToDatabase('blogPosts', updatedList);
      }
      if (isScheduled) {
        const dateDisplay = updatedPost.scheduledAt ? new Date(updatedPost.scheduledAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }) : 'scheduled time';
        showToast(
          `⏰ '${post.title || 'Blog'}' is scheduled for ${dateDisplay}! It will automatically publish without any manual action.`,
          'success'
        );
      } else {
        showToast(
          `'${post.title || 'Blog'}' is now ${isAct ? '🟢 Active (Visible on website)' : '🔴 Inactive (Hidden on website)'}!`,
          'success'
        );
      }
    } catch (err) {
      console.error('Failed to update blog status:', err);
      showToast(`Failed to update status: ${err?.message || 'Server error'}`, 'error');
    }
  };

  const handleDeletePost = (index) => {
    const postToDelete = rawList[index];
    setConfirmModal({
      title: 'Delete Blog Post?',
      message: `Are you sure you want to permanently delete '${postToDelete?.title || 'this blog post'}'? This action cannot be undone.`,
      iconType: 'delete',
      confirmText: 'Yes, Delete Blog',
      onConfirm: async () => {
        const updated = rawList.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, blogPosts: updated }));
        clearBlogCache();
        if (postToDelete?._id || postToDelete?.id || postToDelete?.slug) {
          try {
            await deleteBlogApi(postToDelete._id || postToDelete.id || postToDelete.slug, adminToken);
          } catch (delErr) {
            console.warn('Direct blog delete notice:', delErr);
          }
        }
        await persistSectionToDatabase('blogPosts', updated);
        clearBlogCache();
        showToast(`Blog post '${postToDelete?.title || 'item'}' deleted successfully!`, 'delete');
      }
    });
  };


  const handleSaveBlogForm = async () => {
    if (!editingBlog) return;
    if (!editingBlog.title || !editingBlog.title.trim()) {
      showToast('Please enter a Main Heading / Title for the blog.', 'warning');
      return;
    }

    const fullContent = (editingBlog.fullContent || '').trim();
    if (!fullContent) {
      showToast('Please enter content for the blog article.', 'warning');
      return;
    }

    const slug = editingBlog.slug?.trim() || editingBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const cleanText = fullContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const excerpt = editingBlog.excerpt || (cleanText ? `${cleanText.substring(0, 160)}...` : '');
    const description = editingBlog.description || (cleanText ? cleanText.substring(0, 300) : '');
    const autoRead = calculateReadTime(fullContent);
    const isScheduled = editingBlog.status === 'scheduled';
    const isAct = !isScheduled && editingBlog.isActive !== false && editingBlog.status !== 'inactive' && editingBlog.isPublished !== false;

    const finalizedPost = {
      ...editingBlog,
      isActive: isAct,
      status: isScheduled ? 'scheduled' : (isAct ? 'active' : 'inactive'),
      isPublished: isAct,
      scheduledAt: isScheduled ? editingBlog.scheduledAt : (isAct ? null : editingBlog.scheduledAt),
      readTime: editingBlog.readTime?.trim() || autoRead,
      slug,
      excerpt,
      fullContent,
      description,
      sections: []
    };

    let updatedList = [...rawList];
    let savedApiPost = null;
    let saveFailed = false;

    try {
      if (activeView === 'create' || currentEditIndex === null) {
        const res = await createBlogApi(finalizedPost, adminToken);
        savedApiPost = res?.blog || res?.post || null;
      } else {
        const idToUpdate = finalizedPost._id || finalizedPost.id || finalizedPost.slug;
        const res = await updateBlogApi(idToUpdate, finalizedPost, adminToken);
        savedApiPost = res?.blog || res?.post || null;
      }
    } catch (apiErr) {
      console.error('Direct blog API sync error:', apiErr);
      const errMsg = apiErr?.response?.data?.message || apiErr?.message || 'Unknown server error';
      showToast(`⚠️ Blog save error: ${errMsg}\nPlease check your network or login session and try again.`, 'error');
      saveFailed = true;
    }

    if (saveFailed) {
      return; // Stop here so form contents are not lost and fake success message is not displayed!
    }

    const postWithDbIds = savedApiPost ? { ...finalizedPost, ...savedApiPost } : finalizedPost;

    if (activeView === 'create' || currentEditIndex === null) {
      updatedList = [postWithDbIds, ...updatedList];
    } else {
      updatedList[currentEditIndex] = postWithDbIds;
    }

    setFormData(prev => ({ ...prev, blogPosts: updatedList }));
    clearBlogCache();
    await persistSectionToDatabase('blogPosts', updatedList);
    clearBlogCache();
    const actionLabel = activeView === 'create' || currentEditIndex === null ? 'created' : 'updated';
    showToast(`Blog post ${actionLabel} successfully! Changes are live on the website.`, 'success');
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
        showToast('Blog image uploaded successfully!', 'success');
      }
    } catch (err) {
      showToast('Image upload failed: ' + (err.message || 'Unknown error'), 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDiscardChanges = () => {
    setConfirmModal({
      title: 'Discard Unsaved Changes?',
      message: 'Are you sure you want to discard your edits and return to the blog list?',
      iconType: 'discard',
      confirmText: 'Yes, Discard',
      onConfirm: () => {
        setActiveView('list');
        setEditingBlog(null);
      }
    });
  };

  const filteredPosts = rawList.filter(p => {
    const query = searchQuery.toLowerCase();
    const title = (p.title || '').toLowerCase();
    const author = (p.author || '').toLowerCase();
    return title.includes(query) || author.includes(query);
  });

  return (
    <div style={{ background: '#ffffff', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', fontFamily: "'Open Sans', sans-serif" }}>
      {/* ─── COMMON REUSABLE CONFIRMATION MODAL ─── */}
      <ConfirmModal
        modal={confirmModal}
        onClose={() => setConfirmModal(null)}
      />

      {/* Professional Toast Notification for Blog Dashboard */}
      {toast && (() => {
        const isErr = toast.type === 'error';
        const isWarn = toast.type === 'warning';
        const isDel = toast.type === 'delete';
        const badgeTitle = isErr ? 'Action Failed' : (isWarn ? 'Attention Required' : (isDel ? 'Deleted Successfully' : 'Saved Successfully'));
        const bgGrad = isErr
          ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.98), rgba(220, 38, 38, 0.98))'
          : (isWarn
            ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.98), rgba(217, 119, 6, 0.98))'
            : (isDel
              ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.98), rgba(234, 88, 12, 0.98))'
              : 'linear-gradient(135deg, rgba(16, 185, 129, 0.98), rgba(5, 150, 105, 0.98))'));
        const shadowCol = isErr ? 'rgba(239, 68, 68, 0.35)' : (isWarn ? 'rgba(245, 158, 11, 0.35)' : 'rgba(16, 185, 129, 0.35)');

        return (
          <>
            <style>{`
              @keyframes blogToastSlide {
                0% { transform: translateY(-24px) scale(0.92); opacity: 0; }
                100% { transform: translateY(0) scale(1); opacity: 1; }
              }
            `}</style>
            <div style={{
              position: 'fixed',
              top: '26px',
              right: '26px',
              zIndex: 99999,
              background: bgGrad,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              color: '#ffffff',
              padding: '16px 22px',
              borderRadius: '18px',
              boxShadow: `0 20px 45px -10px ${shadowCol}, 0 0 0 1px rgba(255, 255, 255, 0.22)`,
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              maxWidth: '460px',
              minWidth: '320px',
              animation: 'blogToastSlide 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              pointerEvents: 'auto'
            }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {isErr || isWarn ? (
                  <AlertCircle style={{ width: '22px', height: '22px', color: '#ffffff' }} />
                ) : (
                  <CheckCircle style={{ width: '22px', height: '22px', color: '#ffffff' }} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: '10.5px',
                  fontWeight: '900',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  opacity: 0.9,
                  marginBottom: '2px'
                }}>
                  {badgeTitle}
                </div>
                <div style={{
                  fontSize: '13.5px',
                  fontWeight: '700',
                  lineHeight: '1.45',
                  wordBreak: 'break-word',
                  color: '#ffffff'
                }}>
                  {toast.message}
                </div>
              </div>
              <button
                onClick={() => setToast(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.22)',
                  border: 'none',
                  color: '#ffffff',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: '900',
                  marginLeft: '4px',
                  flexShrink: 0,
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.35)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)'}
                title="Close"
              >
                ✕
              </button>
            </div>
          </>
        );
      })()}
      
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
                const isPostActive = post.isActive !== false && post.status !== 'inactive' && post.isPublished !== false;

                return (
                  <div
                    key={post.id || index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '20px',
                      background: isPostActive ? '#f8fafc' : '#fff1f2',
                      borderRadius: '18px',
                      padding: '18px 20px',
                      border: isPostActive ? '1.5px solid #e2e8f0' : '1.5px solid #fecdd3',
                      transition: 'all 0.2s ease',
                      flexWrap: 'wrap',
                      opacity: isPostActive ? 1 : 0.92
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
                        border: isPostActive ? '1.5px solid #cbd5e1' : '1.5px solid #fca5a5',
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
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <Calendar style={{ width: '13px', height: '13px', color: '#0284c7' }} />
                            {post.date || 'SEP 12, 2026'}
                          </span>
                          <span>•</span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <Clock style={{ width: '13px', height: '13px', color: '#0284c7' }} />
                            {post.readTime || calculateReadTime(post.fullContent || post.content) || '1 min read'}
                          </span>
                          <span>•</span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#0284c7', fontWeight: '700' }}>
                            <PenTool style={{ width: '13px', height: '13px', color: '#0284c7' }} />
                            {post.author || 'Divyang Mandani'}
                          </span>
                        </div>
                        <div style={{ marginTop: '3px', fontSize: '12px', color: '#0284c7', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span>🔗 <span style={{ color: '#64748b' }}>/blog/</span>{post.slug || post.id}</span>
                          {!isPostActive && post.status !== 'scheduled' && (
                            <span style={{
                              background: '#fee2e2',
                              color: '#b91c1c',
                              border: '1px solid #fca5a5',
                              padding: '2px 8px',
                              borderRadius: '6px',
                              fontSize: '11px',
                              fontWeight: '800',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              ● Inactive (Hidden on website)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Action Buttons with StatusDropdown */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <StatusDropdown
                        isActive={isPostActive}
                        status={post.status || (isPostActive ? 'active' : 'inactive')}
                        scheduledAt={post.scheduledAt}
                        direction={index >= filteredPosts.length - 2 && filteredPosts.length > 2 ? 'up' : 'down'}
                        onChange={async (newStatus, isAct, schedAt) => {
                          await handleToggleBlogStatus(originalIndex >= 0 ? originalIndex : index, newStatus, isAct, schedAt);
                        }}
                      />

                      {!isPostActive && (
                        <button
                          type="button"
                          onClick={() => {
                            const originalIndex = rawList.findIndex(p => p._id === post._id || (p.slug && p.slug === post.slug) || p.title === post.title);
                            openScheduleModal(originalIndex >= 0 ? originalIndex : index, post);
                          }}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: (post.status === 'scheduled' && post.scheduledAt) ? '#fffbeb' : '#f0f9ff',
                            color: (post.status === 'scheduled' && post.scheduledAt) ? '#b45309' : '#0284c7',
                            border: (post.status === 'scheduled' && post.scheduledAt) ? '1.5px solid #fde68a' : '1.5px solid #bae6fd',
                            padding: '8px 14px',
                            borderRadius: '10px',
                            fontWeight: '800',
                            fontSize: '12.5px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          title="Set specific Date & Time to auto-publish"
                        >
                          <Clock style={{ width: '14px', height: '14px' }} />
                          {(post.status === 'scheduled' && post.scheduledAt) ? 'Change Time' : '⏰ Set Time'}
                        </button>
                      )}

                      {isPostActive ? (
                        <a
                          href={`/blog/${post.slug || post.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: '#f0f9ff',
                            color: '#0284c7',
                            border: '1.5px solid #bae6fd',
                            padding: '8px 14px',
                            borderRadius: '10px',
                            fontWeight: '800',
                            fontSize: '12.5px',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          title="View live blog on website"
                        >
                          <Eye style={{ width: '14px', height: '14px' }} />
                          View Live
                        </a>
                      ) : (
                        <button
                          type="button"
                          disabled
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: '#f8fafc',
                            color: '#94a3b8',
                            border: '1.5px solid #e2e8f0',
                            padding: '8px 14px',
                            borderRadius: '10px',
                            fontWeight: '800',
                            fontSize: '12.5px',
                            cursor: 'not-allowed',
                            opacity: 0.45,
                            transition: 'all 0.15s ease'
                          }}
                          title="Blog is currently Inactive/Hidden from website"
                        >
                          <Eye style={{ width: '14px', height: '14px' }} />
                          View Live
                        </button>
                      )}

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
                onClick={handleDiscardChanges}
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
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Calendar style={{ width: '14px', height: '14px', color: '#0284c7' }} />
                  {editingBlog.date || 'SEP 12, 2026'}
                </span>
                <span>•</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Clock style={{ width: '14px', height: '14px', color: '#0284c7' }} />
                  {editingBlog.readTime || calculateReadTime(editingBlog.fullContent) || '1 min read'}
                </span>
                <span>•</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#0284c7', fontWeight: '700' }}>
                  <PenTool style={{ width: '14px', height: '14px', color: '#0284c7' }} />
                  {editingBlog.author || 'Divyang Mandani'}
                </span>
              </div>

              {/* Defined 16:9 Image */}
              {editingBlog.image && (
                <div style={{ width: '100%', maxHeight: '420px', borderRadius: '18px', overflow: 'hidden', marginBottom: '28px', background: '#0f172a' }}>
                  <img src={getValidImageUrl(editingBlog.image, blogCardImg, editingBlog.id, currentEditIndex)} alt="" style={{ width: '100%', height: 'auto', maxHeight: '420px', objectFit: 'cover', display: 'block' }} />
                </div>
              )}

              {/* Blog Article Content Preview */}
              {editingBlog.fullContent ? (
                <div
                  className="winera-blog-article-content winera-admin-blog-preview"
                  style={{ fontSize: '16.5px', color: '#334155', lineHeight: 1.85, fontWeight: '400', marginBottom: '24px', overflowX: 'auto', maxWidth: '100%' }}
                  dangerouslySetInnerHTML={{
                    __html: sanitizeAndFormatHtml(editingBlog.fullContent)
                      .replace(/<div[^>]*class=["'][^"']*winera-blog-table-responsive[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi, '$1')
                      .replace(/(<table[\s\S]*?<\/table>)/gi, '<div class="winera-blog-table-responsive">$1</div>')
                  }}
                />
              ) : (
                <>
                  {editingBlog.description && (
                    <div
                      className="winera-admin-blog-preview"
                      style={{ fontSize: '17px', color: '#334155', lineHeight: 1.85, fontWeight: '400', marginBottom: '24px' }}
                      dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(editingBlog.description.replace(/\n/g, '<br>')) }}
                    />
                  )}
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
                </>
              )}
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

              {/* 1.5. SEO URL SLUG */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                  SEO Friendly URL Slug
                </label>
                <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden' }}>
                  <span style={{ padding: '0 12px', color: '#0284c7', fontSize: '13.5px', fontWeight: '800', background: '#f1f5f9', height: '42px', display: 'flex', alignItems: 'center', borderRight: '1.5px solid #cbd5e1', whiteSpace: 'nowrap' }}>
                    https://winera.in/blog/
                  </span>
                  <input
                    type="text"
                    placeholder="auto-generated-from-title"
                    value={editingBlog.slug || ''}
                    onChange={(e) => setEditingBlog(prev => ({
                      ...prev,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '')
                    }))}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      border: 'none',
                      background: 'transparent',
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#0f172a',
                      outline: 'none'
                    }}
                  />
                </div>
                <p style={{ fontSize: '11.5px', color: '#64748b', margin: '4px 0 0' }}>
                  💡 Leave empty to auto-generate from Title. This gives clean SEO links like <code>/blog/how-to-start-a-game-zone</code> instead of numeric IDs like <code>/1</code>.
                </p>
              </div>

              {/* 2. META BAR: STATUS, DATE, READ TIME, FOUNDER/AUTHOR */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                {/* Visibility Status */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                    <CheckCircle style={{ width: '14px', height: '14px', color: '#0284c7' }} />
                    Visibility Status
                  </label>
                  <StatusDropdown
                    isActive={editingBlog.status !== 'scheduled' && editingBlog.isActive !== false && editingBlog.status !== 'inactive' && editingBlog.isPublished !== false}
                    status={editingBlog.status || (editingBlog.isActive === false ? 'inactive' : 'active')}
                    scheduledAt={editingBlog.scheduledAt}
                    size="md"
                    align="left"
                    onChange={(newStatus, isAct, schedAt) => {
                      setEditingBlog(prev => ({
                        ...prev,
                        isActive: newStatus === 'active',
                        status: newStatus,
                        isPublished: newStatus === 'active',
                        scheduledAt: newStatus === 'scheduled' ? (schedAt || prev.scheduledAt) : (newStatus === 'active' ? null : prev.scheduledAt)
                      }));
                    }}
                  />
                  {editingBlog.status === 'scheduled' && (
                    <div style={{ marginTop: '8px', background: '#fffbeb', border: '1.5px solid #fcd34d', borderRadius: '10px', padding: '10px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#b45309', marginBottom: '4px' }}>
                        Auto-Publish Date & Time
                      </label>
                      <WineraDateTimePicker
                        minDate={getMinDateTimeLocal()}
                        value={editingBlog.scheduledAt}
                        onChange={(val) => {
                          setEditingBlog(prev => ({ ...prev, scheduledAt: val }));
                        }}
                        onSave={(val) => {
                          setEditingBlog(prev => ({ ...prev, scheduledAt: val }));
                          handleSaveBlogForm();
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleSaveBlogForm}
                        style={{
                          marginTop: '8px',
                          width: '100%',
                          background: 'linear-gradient(135deg, #10b981, #059669)',
                          color: '#ffffff',
                          border: 'none',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          fontWeight: '800',
                          fontSize: '13px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          boxShadow: '0 3px 10px rgba(16, 185, 129, 0.35)'
                        }}
                      >
                        💾 Save Scheduled Time Now
                      </button>
                    </div>
                  )}

                  <div style={{ marginTop: '8px' }}>
                    {(() => {
                      const isBlogActive = editingBlog.status === 'active' || (editingBlog.isActive !== false && editingBlog.status !== 'inactive' && editingBlog.status !== 'scheduled');
                      const isBlogScheduled = editingBlog.status === 'scheduled';
                      if (isBlogActive) return null;
                      return (
                        <button
                          type="button"
                          onClick={() => {
                            const nextScheduled = !isBlogScheduled;
                            const tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(10, 0, 0, 0);
                            setEditingBlog(prev => ({
                              ...prev,
                              isActive: !nextScheduled,
                              status: nextScheduled ? 'scheduled' : 'inactive',
                              isPublished: !nextScheduled,
                              scheduledAt: nextScheduled ? (prev.scheduledAt || tomorrow.toISOString()) : null
                            }));
                          }}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: isBlogScheduled ? '#fef3c7' : '#f0f9ff',
                            color: isBlogScheduled ? '#b45309' : '#0284c7',
                            border: isBlogScheduled ? '1.5px solid #fcd34d' : '1.5px solid #bae6fd',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            fontSize: '12px',
                            fontWeight: '800',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          title="Set Auto-Publish Date & Time"
                        >
                          <Clock style={{ width: '13px', height: '13px' }} />
                          {isBlogScheduled ? '⏰ Auto-Publish is Enabled' : '⏰ Set Auto-Publish Time'}
                        </button>
                      );
                    })()}
                  </div>
                </div>

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

                {/* Read Time with Auto-Detection & Word Count */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px', flexWrap: 'wrap', gap: '6px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                      <Clock style={{ width: '14px', height: '14px', color: '#0284c7' }} />
                      Read Text
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const auto = calculateReadTime(editingBlog.fullContent);
                        const words = getWordCount(editingBlog.fullContent);
                        setEditingBlog(prev => ({ ...prev, readTime: auto, isManualReadTime: false }));
                        showToast(`⚡ Auto-detected: '${auto}' based on ${words} words!`, 'info');
                      }}
                      title="Click to recalculate reading time based on total word count"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11px',
                        color: '#0284c7',
                        background: '#e0f2fe',
                        border: '1px solid #bae6fd',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      ⚡ Auto: {calculateReadTime(editingBlog.fullContent)} ({getWordCount(editingBlog.fullContent)} words)
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. 4 min read"
                    value={editingBlog.readTime || ''}
                    onChange={(e) => setEditingBlog(prev => ({ ...prev, readTime: e.target.value, isManualReadTime: true }))}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>
                      {editingBlog.isManualReadTime ? '✏️ Custom manual value entered' : '⚡ Auto-syncs with content length (~200 words/min)'}
                    </span>
                    {editingBlog.isManualReadTime && (
                      <button
                        type="button"
                        onClick={() => {
                          const auto = calculateReadTime(editingBlog.fullContent);
                          setEditingBlog(prev => ({ ...prev, readTime: auto, isManualReadTime: false }));
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#0284c7',
                          fontSize: '11px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          padding: 0
                        }}
                      >
                        Reset to Auto
                      </button>
                    )}
                  </div>
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

                      {editingBlog.image && (
                        <button
                          type="button"
                          onClick={() => {
                            setConfirmModal({
                              title: 'Delete Featured Image?',
                              message: 'Are you sure you want to remove the featured image of this blog post?',
                              iconType: 'delete',
                              confirmText: 'Yes, Delete Image',
                              onConfirm: () => {
                                setEditingBlog(prev => ({ ...prev, image: '', imageAlt: '' }));
                                showToast('Featured image removed.', 'delete');
                              }
                            });
                          }}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#fee2e2',
                            color: '#dc2626',
                            border: '1.5px solid #fca5a5',
                            padding: '10px 14px',
                            borderRadius: '10px',
                            fontWeight: '700',
                            fontSize: '13px',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            transition: 'background 0.15s ease'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#fecaca'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = '#fee2e2'; }}
                          title="Delete / Remove Featured Image"
                        >
                          <Trash2 style={{ width: '14px', height: '14px', marginRight: '6px' }} />
                          Delete Image
                        </button>
                      )}
                    </div>
                    <AdminAltInput
                      compact
                      label="🏷️ Image Alt Text (SEO Keyword)"
                      placeholder="e.g. Game Zone Setup and ROI Planning - Winera International"
                      value={editingBlog.imageAlt || ''}
                      onChange={(e) => setEditingBlog(prev => ({ ...prev, imageAlt: e.target.value }))}
                    />
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
                    {editingBlog.image && (
                      <button
                        type="button"
                        onClick={() => {
                          setConfirmModal({
                            title: 'Delete Featured Image?',
                            message: 'Are you sure you want to remove the featured image of this blog post?',
                            iconType: 'delete',
                            confirmText: 'Yes, Delete Image',
                            onConfirm: () => {
                              setEditingBlog(prev => ({ ...prev, image: '', imageAlt: '' }));
                              showToast('Featured image removed.', 'delete');
                            }
                          });
                        }}
                        style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          background: 'rgba(239, 68, 68, 0.92)',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '3px 8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '10px',
                          fontWeight: '800',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.4)'
                        }}
                        title="Delete Featured Image"
                      >
                        <Trash2 style={{ width: '11px', height: '11px' }} /> Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* 4. FULL BLOG CONTENT (ALL-IN-ONE WYSIWYG EDITOR) */}
              <div style={{ marginTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                      Blog Article Content (Rich WYSIWYG Editor) <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                  </div>
                  <span style={{ fontSize: '11px', color: '#0284c7', fontWeight: '800', background: '#e0f2fe', padding: '3px 10px', borderRadius: '8px' }}>
                    All-in-One Editor
                  </span>
                </div>

                <BlogRichEditor
                  value={editingBlog.fullContent || ''}
                  onChange={(val) => {
                    const autoRead = calculateReadTime(val);
                    setEditingBlog(prev => ({
                      ...prev,
                      fullContent: val,
                      readTime: !prev?.isManualReadTime ? autoRead : prev.readTime
                    }));
                  }}
                  uploadImageFile={uploadImageFile}
                  adminToken={adminToken}
                  showNotification={showToast}
                  onRequestConfirm={setConfirmModal}
                  minHeight="520px"
                />
              </div>

              {/* 5. PER-BLOG SEO META SETTINGS (Google Search Preview, Meta Title & Description) */}
              <div style={{
                marginTop: '32px',
                padding: '26px 28px',
                borderRadius: '24px',
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>🔍</span> SEO Meta Title & Description Settings
                    </h3>
                    <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0, fontWeight: '500' }}>
                      Configure custom search engine title, meta description, and canonical URL specifically for this blog post.
                    </p>
                  </div>
                  <span style={{ fontSize: '12px', background: '#e0f2fe', color: '#0284c7', padding: '5px 14px', borderRadius: '20px', fontWeight: '800' }}>
                    Google Search Preview
                  </span>
                </div>

                {/* Google Search Result Live Preview Card */}
                <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '18px 22px', marginBottom: '24px', border: '1px solid #cbd5e1' }}>
                  <div style={{ fontSize: '12px', color: '#475569', marginBottom: '4px', wordBreak: 'break-all', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>🌐</span>
                    <span>{editingBlog.canonicalUrl || `https://winera.in/blog/${editingBlog.slug || 'blog-slug'}`}</span>
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#1a0dab', marginBottom: '6px', lineHeight: 1.3, cursor: 'pointer' }}>
                    {editingBlog.metaTitle || (editingBlog.title ? `${editingBlog.title} | Winera International` : 'Blog Article Title | Winera International')}
                  </div>
                  <div style={{ fontSize: '13px', color: '#4d5156', lineHeight: 1.5 }}>
                    {editingBlog.metaDescription || editingBlog.description || (editingBlog.fullContent ? editingBlog.fullContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').substring(0, 160) + '...' : 'Read expert insights on game zone setup and indoor entertainment on Winera International.')}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {/* Page Title Tag */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <label style={{ fontSize: '12.5px', fontWeight: '800', color: '#0f172a' }}>
                        Page Title Tag (<code>&lt;title&gt;</code>)
                      </label>
                      <span style={{ fontSize: '11px', color: (editingBlog.metaTitle || '').length > 60 ? '#ef4444' : '#64748b', fontWeight: '600' }}>
                        {(editingBlog.metaTitle || '').length} / 60 characters
                      </span>
                    </div>
                    <input
                      type="text"
                      value={editingBlog.metaTitle || ''}
                      onChange={(e) => setEditingBlog(prev => ({ ...prev, metaTitle: e.target.value }))}
                      placeholder={editingBlog.title ? `${editingBlog.title} | Winera International` : 'e.g. 10 Trampoline Park Trends in 2026 | Winera International'}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        outline: 'none',
                        transition: 'border-color 0.15s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#0284c7'}
                      onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                    />
                  </div>

                  {/* Meta Description Tag */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <label style={{ fontSize: '12.5px', fontWeight: '800', color: '#0f172a' }}>
                        Meta Description Tag (<code>&lt;meta name="description"&gt;</code>)
                      </label>
                      <span style={{ fontSize: '11px', color: (editingBlog.metaDescription || '').length > 160 ? '#ef4444' : '#64748b', fontWeight: '600' }}>
                        {(editingBlog.metaDescription || '').length} / 160 characters
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={editingBlog.metaDescription || ''}
                      onChange={(e) => setEditingBlog(prev => ({ ...prev, metaDescription: e.target.value }))}
                      placeholder="e.g. Discover expert tips on setting up a high-ROI trampoline park and game zone in India. Complete equipment, layout, and budget guide."
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '13.5px',
                        lineHeight: 1.6,
                        fontFamily: 'inherit',
                        outline: 'none',
                        transition: 'border-color 0.15s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#0284c7'}
                      onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                    />
                  </div>

                  {/* Canonical URL Tag */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <label style={{ fontSize: '12.5px', fontWeight: '800', color: '#0f172a' }}>
                        🔗 Canonical URL Tag (<code>&lt;link rel="canonical"&gt;</code>)
                      </label>
                    </div>
                    <input
                      type="url"
                      value={editingBlog.canonicalUrl || ''}
                      onChange={(e) => setEditingBlog(prev => ({ ...prev, canonicalUrl: e.target.value }))}
                      placeholder={`https://winera.in/blog/${editingBlog.slug || 'your-blog-slug'}`}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        outline: 'none',
                        transition: 'border-color 0.15s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#0284c7'}
                      onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                    />
                    <div style={{ marginTop: '6px', fontSize: '11.5px', color: '#64748b', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', lineHeight: 1.5 }}>
                      💡 <strong>Tip:</strong> Sets the primary official URL for search engines. Leave blank to default to <code>https://winera.in/blog/{editingBlog.slug || 'your-blog-slug'}</code>.
                    </div>
                  </div>
                </div>
              </div>

              {/* Save / Cancel Footer Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', marginTop: '20px', paddingTop: '20px', borderTop: '1.5px solid #f1f5f9' }}>
                <button
                  type="button"
                  onClick={handleDiscardChanges}
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
                  {scheduleModal.post?.title || 'Blog Post'}
                </p>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.55, margin: '0 0 18px 0', background: '#f8fafc', padding: '12px 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              Select the exact future date and time. Winera system will automatically publish this blog post on the website even if you are not available.
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
                  setScheduleModal(null);
                  await handleToggleBlogStatus(targetIdx, 'scheduled', false, schedIso);
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

    </div>
  );
}
