import VrGame from '../models/VrGame.js';
import Content from '../models/Content.js';

export const getVrGames = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 50 } = req.query;
    const query = {};

    if (category && category !== 'All VR Games' && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
        { desc: { $regex: search, $options: 'i' } },
        { tag: { $regex: search, $options: 'i' } }
      ];
    }

    const total = await VrGame.countDocuments(query);
    const games = await VrGame.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: 1 });

    const categories = await VrGame.distinct('category');

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      categoriesList: ['All VR Games', ...categories.filter(c => c !== 'All VR Games')],
      cards: games
    });
  } catch (error) {
    console.error('Error fetching VR games:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getVrGameBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const game = await VrGame.findOne({ slug });

    if (!game) {
      return res.status(404).json({ success: false, message: 'VR Game not found' });
    }

    res.json({ success: true, game });
  } catch (error) {
    console.error('Error fetching VR game by slug:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
