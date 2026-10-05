import mongoose from 'mongoose';

const arcadeProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  name: { type: String, required: true },
  nameBase: { type: String, default: '' },
  nameHighlight: { type: String, default: '' },
  category: { type: String, default: 'Arcade Games', index: true },
  tag: { type: String, default: 'Commercial' },
  tagline: { type: String, default: '' },
  desc: { type: String, default: '' },
  slug: { type: String, required: true, unique: true, index: true },
  power: { type: String, default: '' },
  voltage: { type: String, default: '220v' },
  specsCategory: { type: String, default: 'Arcade Games' },
  players: { type: String, default: '1-2 Players' },
  weight: { type: String, default: '' },
  material: { type: String, default: 'Commercial Steel & Acrylic Finish' },
  width: { type: String, default: '' },
  depth: { type: String, default: '' },
  height: { type: String, default: '' },
  img: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  gallery: [{ type: String }],
  quoteUrl: { type: String, default: '' },
  feature1Title: { type: String, default: '12+ Years of Expertise' },
  feature1Desc: { type: String, default: 'Proven experience delivering game zone projects across malls, hotels, schools, and resorts since 2014.' },
  feature2Title: { type: String, default: 'Quality & Safety Standards' },
  feature2Desc: { type: String, default: 'Every product sourced from global manufacturers and tested for commercial-grade safety and durability.' },
  feature3Title: { type: String, default: 'ROI-First Approach' },
  feature3Desc: { type: String, default: 'Every project begins with a free ROI report, revenue and break-even calculated before you invest.' },
  feature4Title: { type: String, default: 'Reliable Pan-India Service' },
  feature4Desc: { type: String, default: 'Our own team installs and supports every project across 50+ cities on time, every time.' }
}, { timestamps: true });

const ArcadeProduct = mongoose.model('ArcadeProduct', arcadeProductSchema);
export default ArcadeProduct;
