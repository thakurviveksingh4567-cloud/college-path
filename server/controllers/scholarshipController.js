import Scholarship from '../models/Scholarship.js';
import { memoryStore, getDBStatus } from '../config/db.js';

// @desc    Get all scholarships with filters
// @route   GET /api/scholarships
export const getScholarships = async (req, res) => {
  try {
    const { stream, category, gender, search, maxIncome } = req.query;
    const { isDemoMode } = getDBStatus();

    let list = isDemoMode ? [...memoryStore.scholarships] : await Scholarship.find({}).lean();

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(s => 
        s.title.toLowerCase().includes(q) ||
        s.provider.toLowerCase().includes(q) ||
        s.eligibility?.summary?.toLowerCase().includes(q)
      );
    }

    if (stream && stream !== 'All') {
      list = list.filter(s => 
        s.applicableStreams.includes('All') || s.applicableStreams.includes(stream)
      );
    }

    if (gender && gender !== 'All') {
      list = list.filter(s => s.eligibility?.gender === 'All' || s.eligibility?.gender === gender);
    }

    if (maxIncome) {
      const incomeLimit = Number(maxIncome);
      list = list.filter(s => !s.eligibility?.maxFamilyIncomePerYear || s.eligibility.maxFamilyIncomePerYear >= incomeLimit);
    }

    res.json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get single scholarship
// @route   GET /api/scholarships/:slug
export const getScholarshipBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const { isDemoMode } = getDBStatus();

    let item = null;
    if (isDemoMode) {
      item = memoryStore.scholarships.find(s => s.slug === slug);
    } else {
      item = await Scholarship.findOne({ slug }).lean();
    }

    if (!item) {
      return res.status(404).json({ success: false, message: 'Scholarship not found' });
    }

    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
