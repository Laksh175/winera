import mongoose from 'mongoose';

const vrGameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  name: { type: String, required: true },
  nameBase: { type: String, default: '' },
  nameHighlight: { type: String, default: '' },
  category: { type: String, default: 'VR Games', index: true },
  tag: { type: String, default: 'VR Games' },
  tagline: { type: String, default: '' },
  desc: { type: String, default: '' },
  slug: { type: String, required: true, unique: true, index: true },
  power: { type: String, default: '' },
  voltage: { type: String, default: '220V / 110V' },
  specsCategory: { type: String, default: 'VR Games' },
  players: { type: String, default: '1 Player' },
  weight: { type: String, default: '' },
  dimensions: { type: String, default: '' },
  width: { type: String, default: '' },
  depth: { type: String, default: '' },
  height: { type: String, default: '' },
  maxLoad: { type: String, default: '' },
  games: { type: String, default: '' },
  helmet: { type: String, default: '' },
  material: { type: String, default: 'Commercial Heavy-Duty Steel & High-Gloss Fiberglass' },
  img: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  imgAlt: { type: String, default: '' },
  gallery: [{ type: String }],
  galleryAlt: [{ type: String }],
  quoteUrl: { type: String, default: '' }
}, { timestamps: true });

const VrGame = mongoose.model('VrGame', vrGameSchema);
export default VrGame;
