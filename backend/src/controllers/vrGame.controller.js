import VrGame from '../models/VrGame.js';
import Content from '../models/Content.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let isSeedingVr = false;
const ensureVrGamesSeeded = async () => {
  try {
    const count = await VrGame.countDocuments();
    if (count === 0 && !isSeedingVr) {
      isSeedingVr = true;
      const backupPath = path.join(__dirname, '../data/allVrGames.json');
      if (fs.existsSync(backupPath)) {
        console.log('🔄 Auto-seeding VrGame collection in MongoDB from backup...');
        const raw = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
        const cards = raw.cards || [];
        if (cards.length > 0) {
          const docs = cards.map((p, idx) => {
            const cleanSlug = p.slug || (p.title || p.name || `vr-game-${idx}`).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            return {
              ...p,
              slug: cleanSlug,
              name: p.name || p.title,
              title: p.title || p.name,
              imageUrl: p.img || p.imageUrl || '',
              gallery: Array.isArray(p.gallery) ? p.gallery : (p.img ? [p.img] : [])
            };
          });
          await VrGame.insertMany(docs);
          console.log(`✅ Auto-seeded ${docs.length} VR games into MongoDB!`);
        }
      }
    }
  } catch (err) {
    console.warn('Auto-seed VR games notice:', err?.message);
  } finally {
    isSeedingVr = false;
  }
};

export const getVrGames = async (req, res) => {
  try {
    await ensureVrGamesSeeded();
    const { category, search, page = 1, limit = 50 } = req.query;
    const query = {};

    if (category && category !== 'All VR Games' && category !== 'All') {
      const escapedCat = category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.$or = [
        { category: { $regex: new RegExp(escapedCat, 'i') } },
        { tag: { $regex: new RegExp(escapedCat, 'i') } },
        { specsCategory: { $regex: new RegExp(escapedCat, 'i') } }
      ];
    }

    if (search && search.trim() !== '') {
      const q = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const searchOr = [
        { title: { $regex: q, $options: 'i' } },
        { name: { $regex: q, $options: 'i' } },
        { desc: { $regex: q, $options: 'i' } },
        { tag: { $regex: q, $options: 'i' } }
      ];
      if (query.$or) {
        query.$and = [{ $or: query.$or }, { $or: searchOr }];
        delete query.$or;
      } else {
        query.$or = searchOr;
      }
    }

    const isAll = limit === 'all' || limit === '0' || limit === 0 || limit === '-1';
    const total = await VrGame.countDocuments(query);

    let gamesQuery = VrGame.find(query).sort({ createdAt: 1 });
    if (!isAll) {
      const pageNum = parseInt(page, 10) || 1;
      const limitNum = parseInt(limit, 10) || 50;
      gamesQuery = gamesQuery.skip((pageNum - 1) * limitNum).limit(limitNum);
    }
    const games = await gamesQuery;

    const categories = await VrGame.distinct('category');
    const ORDERED_CATEGORIES = [
      "All VR Games",
      "VR 9D Cinema",
      "VR Racing Simulator",
      "VR Shooting Simulator",
      "VR Flying Simulator",
      "Movie Experience",
      "VR 360 Simulator",
      "Kids' Interactive Equipment"
    ];
    const categoriesList = [
      'All VR Games',
      ...ORDERED_CATEGORIES.filter(c => c !== 'All VR Games' && categories.includes(c)),
      ...categories.filter(c => !ORDERED_CATEGORIES.includes(c))
    ];

    const pageNum = isAll ? 1 : (parseInt(page, 10) || 1);
    const limitNum = isAll ? total : (parseInt(limit, 10) || 50);

    res.json({
      success: true,
      total,
      page: pageNum,
      pages: isAll ? 1 : Math.ceil(total / limitNum),
      categoriesList,
      cards: games,
      games
    });
  } catch (error) {
    console.error('Error fetching VR games:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getVrGameBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const cleanSlug = (slug || '').trim();
    const cleanName = cleanSlug.replace(/-/g, ' ');
    const escapedSlug = cleanSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedName = cleanName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    let game = await VrGame.findOne({
      $or: [
        { slug: cleanSlug },
        { slug: { $regex: new RegExp(`^${escapedSlug}$`, 'i') } },
        { name: { $regex: new RegExp(`^${escapedName}$`, 'i') } },
        { title: { $regex: new RegExp(`^${escapedName}$`, 'i') } }
      ]
    });

    if (!game) {
      // Check CMS vrCategories
      const contentDoc = await Content.findOne({ sectionKey: 'vrCategories' });
      if (contentDoc?.data?.cards && Array.isArray(contentDoc.data.cards)) {
        game = contentDoc.data.cards.find(c =>
          c && (
            c.slug === cleanSlug ||
            (c.name && c.name.toLowerCase().trim() === cleanName.toLowerCase()) ||
            (c.title && c.title.toLowerCase().trim() === cleanName.toLowerCase())
          )
        );
      }
    }

    if (!game) {
      return res.status(404).json({ success: false, message: 'VR Game not found' });
    }

    res.json({ success: true, game, product: game });
  } catch (error) {
    console.error('Error fetching VR game by slug:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin CRUD operations for VR Games
export const createVrGame = async (req, res) => {
  try {
    const data = req.body;
    if (!data.slug) {
      data.slug = (data.title || data.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    const created = await VrGame.create(data);
    res.json({ success: true, game: created });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateVrGame = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await VrGame.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'VR Game not found' });
    }
    res.json({ success: true, game: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteVrGame = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await VrGame.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'VR Game not found' });
    }
    res.json({ success: true, message: 'VR Game deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
