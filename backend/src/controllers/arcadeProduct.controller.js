import ArcadeProduct from '../models/ArcadeProduct.js';
import VrGame from '../models/VrGame.js';
import Content from '../models/Content.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let isSeeding = false;
const ensureArcadeProductsSeeded = async () => {
  try {
    const count = await ArcadeProduct.countDocuments();
    if (count === 0 && !isSeeding) {
      isSeeding = true;
      const backupPath = path.join(__dirname, '../data/allArcadeProducts.json');
      if (fs.existsSync(backupPath)) {
        console.log('🔄 Auto-seeding ArcadeProduct collection in MongoDB from backup...');
        const raw = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
        const cards = raw.cards || [];
        if (cards.length > 0) {
          const seen = new Set();
          const docs = cards.map((p, idx) => {
            let slug = p.slug || (p.title || `product-${idx}`).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            if (seen.has(slug)) slug = `${slug}-${idx + 1}`;
            seen.add(slug);
            return {
              ...p,
              slug,
              name: p.name || p.title,
              title: p.title || p.name,
              imageUrl: p.img || p.imageUrl || '',
              category: p.category || 'Arcade Games',
              gallery: Array.isArray(p.gallery) ? p.gallery : (p.img ? [p.img] : [])
            };
          });
          await ArcadeProduct.insertMany(docs);
          console.log(`✅ Auto-seeded ${docs.length} products into MongoDB!`);
        }
      }
    }
  } catch (err) {
    console.warn('Auto-seed arcade products notice:', err?.message);
  } finally {
    isSeeding = false;
  }
};

// @desc    Get all arcade products with filter, search & pagination (supports limit=all)
// @route   GET /api/arcade-products
export const getArcadeProducts = async (req, res) => {
  try {
    await ensureArcadeProductsSeeded();
    const { category, search, page = 1, limit = 24 } = req.query;
    const query = {};

    if (category && category !== 'All' && category !== 'All Categories' && category !== 'Arcade Games') {
      const isRacingTarget = category.toLowerCase().trim() === "bike & car racing games" ||
        (category.toLowerCase().includes("racing") && (category.toLowerCase().includes("bike") || category.toLowerCase().includes("car")));
      if (isRacingTarget) {
        query.$or = [
          { category: { $regex: /racing/i } },
          { tag: { $regex: /racing/i } },
          { specsCategory: { $regex: /racing/i } }
        ];
      } else {
        const escapedCat = category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        query.$or = [
          { category: { $regex: new RegExp(escapedCat, 'i') } },
          { tag: { $regex: new RegExp(escapedCat, 'i') } },
          { specsCategory: { $regex: new RegExp(escapedCat, 'i') } }
        ];
      }
    }

    if (search && search.trim() !== '') {
      const q = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const searchOr = [
        { name: { $regex: q, $options: 'i' } },
        { title: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
        { desc: { $regex: q, $options: 'i' } }
      ];
      if (query.$or) {
        query.$and = [{ $or: query.$or }, { $or: searchOr }];
        delete query.$or;
      } else {
        query.$or = searchOr;
      }
    }

    const isAll = limit === 'all' || limit === '0' || limit === 0 || limit === '-1';
    const total = await ArcadeProduct.countDocuments(query);
    
    let productsQuery = ArcadeProduct.find(query).sort({ createdAt: -1 });
    if (!isAll) {
      const pageNum = parseInt(page, 10) || 1;
      const limitNum = parseInt(limit, 10) || 24;
      const skip = (pageNum - 1) * limitNum;
      productsQuery = productsQuery.skip(skip).limit(limitNum);
    }
    const products = await productsQuery;

    // Fetch CMS categoriesList and overrides
    const contentDoc = await Content.findOne({ sectionKey: 'arcadeCategories' });
    const defaultCats = [
      "Arcade Games", "Claw Machine", "Redemption Game", "Kiddy Ride",
      "Bike & Car Racing Games", "Shooting Games", "Strength Based Games"
    ];
    const categoriesList = (Array.isArray(contentDoc?.data?.categoriesList) && contentDoc.data.categoriesList.length > 0)
      ? contentDoc.data.categoriesList
      : defaultCats;

    const pageNum = isAll ? 1 : (parseInt(page, 10) || 1);
    const limitNum = isAll ? total : (parseInt(limit, 10) || 24);

    res.json({
      success: true,
      total,
      page: pageNum,
      totalPages: isAll ? 1 : Math.ceil(total / limitNum),
      categoriesList,
      cards: products,
      products
    });
  } catch (error) {
    console.error('Error fetching arcade products:', error);
    res.status(500).json({ success: false, message: 'Server error fetching products' });
  }
};

// @desc    Get single arcade product by slug
// @route   GET /api/arcade-products/:slug
export const getArcadeProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const cleanSlug = (slug || '').trim();
    const cleanName = cleanSlug.replace(/-/g, ' ');
    const escapedSlug = cleanSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedName = cleanName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // 1. Try finding in ArcadeProduct
    let product = await ArcadeProduct.findOne({
      $or: [
        { slug: cleanSlug },
        { slug: { $regex: new RegExp(`^${escapedSlug}$`, 'i') } },
        { name: { $regex: new RegExp(`^${escapedName}$`, 'i') } },
        { title: { $regex: new RegExp(`^${escapedName}$`, 'i') } }
      ]
    });

    // 2. Also check VrGame collection (VR games have high-res 4-image galleries)
    const vrProduct = await VrGame.findOne({
      $or: [
        { slug: cleanSlug },
        { slug: { $regex: new RegExp(`^${escapedSlug}$`, 'i') } },
        { name: { $regex: new RegExp(`^${escapedName}$`, 'i') } },
        { title: { $regex: new RegExp(`^${escapedName}$`, 'i') } }
      ]
    });

    if (vrProduct) {
      if (!product) {
        product = vrProduct.toObject ? vrProduct.toObject() : vrProduct;
      } else {
        const prodObj = product.toObject ? product.toObject() : product;
        const vrObj = vrProduct.toObject ? vrProduct.toObject() : vrProduct;
        const vrGallery = Array.isArray(vrObj.gallery) ? vrObj.gallery.filter(Boolean) : [];
        const prodGallery = Array.isArray(prodObj.gallery) ? prodObj.gallery.filter(Boolean) : [];
        if (vrGallery.length > prodGallery.length || !prodObj.dimensions) {
          product = { ...prodObj, ...vrObj, gallery: vrGallery.length > 0 ? vrGallery : prodGallery };
        }
      }
    }

    // 3. Check CMS vrCategories & arcadeCategories for overrides
    const [vrContent, arcadeContent] = await Promise.all([
      Content.findOne({ sectionKey: 'vrCategories' }),
      Content.findOne({ sectionKey: 'arcadeCategories' })
    ]);

    const vrCmsCard = (Array.isArray(vrContent?.data?.cards) ? vrContent.data.cards : []).find(c =>
      c && (
        c.slug === cleanSlug ||
        (c.name && c.name.toLowerCase().trim() === cleanName.toLowerCase()) ||
        (c.title && c.title.toLowerCase().trim() === cleanName.toLowerCase())
      )
    );

    const arcadeCmsCard = (Array.isArray(arcadeContent?.data?.cards) ? arcadeContent.data.cards : []).find(c =>
      c && (
        c.slug === cleanSlug ||
        (c.name && c.name.toLowerCase().trim() === cleanName.toLowerCase()) ||
        (c.title && c.title.toLowerCase().trim() === cleanName.toLowerCase())
      )
    );

    const currentObj = product ? (product.toObject ? product.toObject() : product) : {};
    const cmsCard = vrCmsCard || arcadeCmsCard;
    if (cmsCard) {
      product = {
        ...currentObj,
        ...cmsCard
      };
    }

    // Always choose the richest gallery with the most image angles
    const allGalleryCandidates = [
      Array.isArray(vrProduct?.gallery) ? vrProduct.gallery.filter(Boolean) : [],
      Array.isArray(vrCmsCard?.gallery) ? vrCmsCard.gallery.filter(Boolean) : [],
      Array.isArray(arcadeCmsCard?.gallery) ? arcadeCmsCard.gallery.filter(Boolean) : [],
      Array.isArray(currentObj?.gallery) ? currentObj.gallery.filter(Boolean) : [],
      Array.isArray(product?.gallery) ? product.gallery.filter(Boolean) : []
    ];
    let richestGallery = [];
    for (const gal of allGalleryCandidates) {
      if (gal.length > richestGallery.length) {
        richestGallery = gal;
      }
    }
    if (richestGallery.length > 0) {
      product.gallery = richestGallery;
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error('Error fetching single arcade product:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create new arcade product
// @route   POST /api/arcade-products
export const createArcadeProduct = async (req, res) => {
  try {
    const data = req.body;
    if (!data.slug) {
      data.slug = (data.title || data.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    const created = await ArcadeProduct.create(data);
    res.json({ success: true, product: created });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update arcade product
// @route   PUT /api/arcade-products/:id
export const updateArcadeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updated = await ArcadeProduct.findByIdAndUpdate(id, data, { new: true });
    res.json({ success: true, product: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete arcade product
// @route   DELETE /api/arcade-products/:id
export const deleteArcadeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await ArcadeProduct.findByIdAndDelete(id);
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
