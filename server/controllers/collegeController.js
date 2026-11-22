import College from '../models/College.js';
import { memoryStore, getDBStatus } from '../config/db.js';
import { sampleColleges } from '../config/seedData.js';

// @desc    Get all colleges with search, filters, and sorting
// @route   GET /api/colleges
export const getColleges = async (req, res) => {
  try {
    const { 
      search, 
      state, 
      course, 
      stream, 
      collegeType, 
      maxFee, 
      sortBy = 'nirf', 
      limit = 50 
    } = req.query;

    const { isDemoMode } = getDBStatus();

    let collegesList = [];
    if (isDemoMode) {
      collegesList = [...memoryStore.colleges];
    } else {
      collegesList = await College.find({}).lean();
    }

    // Apply Search
    if (search) {
      const q = search.trim().toLowerCase();
      collegesList = collegesList.filter(c => 
        c.name.toLowerCase().includes(q) ||
        c.shortName.toLowerCase().includes(q) ||
        c.location.city.toLowerCase().includes(q) ||
        c.location.state.toLowerCase().includes(q) ||
        c.courses.some(crs => crs.name.toLowerCase().includes(q) || crs.specializations.some(s => s.toLowerCase().includes(q)))
      );
    }

    // Filter by State
    if (state && state !== 'All') {
      collegesList = collegesList.filter(c => 
        c.location.state.toLowerCase() === state.toLowerCase()
      );
    }

    // Filter by College Type (IIT, NIT, Central University, State Government, etc.)
    if (collegeType && collegeType !== 'All') {
      collegesList = collegesList.filter(c => 
        c.collegeType.toLowerCase() === collegeType.toLowerCase()
      );
    }

    // Filter by Stream
    if (stream && stream !== 'All') {
      collegesList = collegesList.filter(c => 
        c.streamsSupported.includes(stream)
      );
    }

    // Filter by Course
    if (course && course !== 'All') {
      const cLower = course.toLowerCase();
      collegesList = collegesList.filter(c => 
        c.courses.some(crs => 
          crs.name.toLowerCase().includes(cLower) ||
          crs.degree.toLowerCase().includes(cLower)
        )
      );
    }

    // Filter by Max Fee (Annual Tuition)
    if (maxFee) {
      const feeLimit = Number(maxFee);
      collegesList = collegesList.filter(c => 
        c.courses.some(crs => crs.tuitionFeePerYear <= feeLimit)
      );
    }

    // Sorting
    if (sortBy === 'nirf') {
      collegesList.sort((a, b) => (a.accreditation?.nirfRank || 999) - (b.accreditation?.nirfRank || 999));
    } else if (sortBy === 'fee-low-high') {
      collegesList.sort((a, b) => {
        const minA = Math.min(...a.courses.map(c => c.tuitionFeePerYear));
        const minB = Math.min(...b.courses.map(c => c.tuitionFeePerYear));
        return minA - minB;
      });
    } else if (sortBy === 'placement') {
      collegesList.sort((a, b) => (b.placements?.medianCTC || 0) - (a.placements?.medianCTC || 0));
    } else if (sortBy === 'name') {
      collegesList.sort((a, b) => a.name.localeCompare(b.name));
    }

    res.json({
      success: true,
      count: collegesList.length,
      isDemoMode,
      data: collegesList.slice(0, Number(limit))
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get single college by slug or id
// @route   GET /api/colleges/:slug
export const getCollegeBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const { isDemoMode } = getDBStatus();

    let college = null;
    if (isDemoMode) {
      college = memoryStore.colleges.find(c => c.slug === slug || c._id === slug);
    } else {
      college = await College.findOne({ $or: [{ slug }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }] }).lean();
    }

    if (!college) {
      return res.status(404).json({ success: false, message: 'College not found' });
    }

    res.json({ success: true, data: college });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Compare up to 3 colleges side by side
// @route   POST /api/colleges/compare
export const compareColleges = async (req, res) => {
  try {
    const { slugs } = req.body;
    if (!Array.isArray(slugs) || slugs.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide an array of college slugs' });
    }

    const { isDemoMode } = getDBStatus();
    let colleges = [];

    if (isDemoMode) {
      colleges = memoryStore.colleges.filter(c => slugs.includes(c.slug));
    } else {
      colleges = await College.find({ slug: { $in: slugs } }).lean();
    }

    res.json({ success: true, count: colleges.length, data: colleges });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Create new college (Admin only)
// @route   POST /api/colleges
export const createCollege = async (req, res) => {
  try {
    const collegeData = req.body;
    if (!collegeData.name || !collegeData.slug) {
      return res.status(400).json({ success: false, message: 'Name and slug are required' });
    }

    const { isDemoMode } = getDBStatus();
    if (isDemoMode) {
      const existing = memoryStore.colleges.find(c => c.slug === collegeData.slug);
      if (existing) {
        return res.status(400).json({ success: false, message: 'College with this slug already exists' });
      }
      collegeData._id = 'demo_' + Date.now();
      collegeData.createdAt = new Date().toISOString();
      memoryStore.colleges.unshift(collegeData);
      return res.status(201).json({ success: true, message: 'College created in demo mode', data: collegeData });
    } else {
      const college = await College.create(collegeData);
      return res.status(201).json({ success: true, data: college });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update college (Admin only)
// @route   PUT /api/colleges/:slug
export const updateCollege = async (req, res) => {
  try {
    const { slug } = req.params;
    const updateData = req.body;
    const { isDemoMode } = getDBStatus();

    if (isDemoMode) {
      const index = memoryStore.colleges.findIndex(c => c.slug === slug);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'College not found' });
      }
      memoryStore.colleges[index] = { ...memoryStore.colleges[index], ...updateData };
      return res.json({ success: true, message: 'Updated in demo store', data: memoryStore.colleges[index] });
    } else {
      const updated = await College.findOneAndUpdate({ slug }, updateData, { new: true });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'College not found' });
      }
      return res.json({ success: true, data: updated });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Delete college (Admin only)
// @route   DELETE /api/colleges/:slug
export const deleteCollege = async (req, res) => {
  try {
    const { slug } = req.params;
    const { isDemoMode } = getDBStatus();

    if (isDemoMode) {
      const initialLength = memoryStore.colleges.length;
      memoryStore.colleges = memoryStore.colleges.filter(c => c.slug !== slug);
      if (memoryStore.colleges.length === initialLength) {
        return res.status(404).json({ success: false, message: 'College not found' });
      }
      return res.json({ success: true, message: 'College deleted from demo store' });
    } else {
      const deleted = await College.findOneAndDelete({ slug });
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'College not found' });
      }
      return res.json({ success: true, message: 'College deleted successfully' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Reset colleges to default seed data (Admin)
// @route   POST /api/colleges/reset
export const resetColleges = async (req, res) => {
  try {
    const { isDemoMode } = getDBStatus();
    if (isDemoMode) {
      memoryStore.colleges = JSON.parse(JSON.stringify(sampleColleges));
      return res.json({ success: true, message: 'Reset to default sample colleges successfully' });
    } else {
      await College.deleteMany({});
      await College.insertMany(sampleColleges);
      return res.json({ success: true, message: 'MongoDB reset to verified default colleges' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
