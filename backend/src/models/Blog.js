import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  id: { type: Number },
  slug: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  excerpt: { type: String, default: '' },
  fullContent: { type: String, default: '' },
  date: { type: String, default: 'SEP 12, 2026' },
  author: { type: String, default: 'Divyang Mandani' },
  category: { type: String, default: 'INSIGHTS', index: true },
  readTime: { type: String, default: '4 min read' },
  image: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  metaKeywords: [{ type: String }],
  isPublished: { type: Boolean, default: true }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
