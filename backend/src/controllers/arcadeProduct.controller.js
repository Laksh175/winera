import ArcadeProduct from '../models/ArcadeProduct.js';

// @desc    Get all arcade products with filter, search & pagination
// @route   GET /api/arcade-products
export const getArcadeProducts = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 24 } = req.query;
    const query = {};

    if (category && category !== 'All' && category !== 'All Categories') {
      query.category = { $regex: new RegExp(category, 'i') };
    }

    if (search && search.trim() !== '') {
      const q = search.trim();
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { title: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
        { desc: { $regex: q, $options: 'i' } }
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 24;
    const skip = (pageNum - 1) * limitNum;

    const total = await ArcadeProduct.countDocuments(query);
    const products = await ArcadeProduct.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
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
    const product = await ArcadeProduct.findOne({
      $or: [
        { slug },
        { name: { $regex: new RegExp(`^${slug.replace(/-/g, ' ')}$`, 'i') } },
        { title: { $regex: new RegExp(`^${slug.replace(/-/g, ' ')}$`, 'i') } }
      ]
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error('Error fetching single arcade product:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
