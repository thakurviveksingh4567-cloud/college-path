import AdmissionEvent from '../models/AdmissionEvent.js';
import { memoryStore, getDBStatus } from '../config/db.js';

// @desc    Get admission events and calendar updates
// @route   GET /api/calendar
export const getAdmissionEvents = async (req, res) => {
  try {
    const { exam, stream, status, search } = req.query;
    const { isDemoMode } = getDBStatus();

    let list = isDemoMode ? [...memoryStore.events] : await AdmissionEvent.find({}).lean();

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(e => 
        e.title.toLowerCase().includes(q) ||
        e.examOrBody.toLowerCase().includes(q) ||
        e.description?.toLowerCase().includes(q)
      );
    }

    if (exam && exam !== 'All') {
      list = list.filter(e => e.examOrBody.toLowerCase().includes(exam.toLowerCase()));
    }

    if (stream && stream !== 'All') {
      list = list.filter(e => e.streamsApplicable.includes('All') || e.streamsApplicable.includes(stream));
    }

    if (status && status !== 'All') {
      list = list.filter(e => e.status.toLowerCase() === status.toLowerCase());
    }

    // Sort by start date
    list.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    res.json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
