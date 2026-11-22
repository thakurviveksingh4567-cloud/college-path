import College from '../models/College.js';
import { memoryStore, getDBStatus } from '../config/db.js';
import { evaluateCollegeMatch } from '../utils/recommendationRuleEngine.js';

// @desc    Predict college admission eligibility based on student profile
// @route   POST /api/recommendations/predict
export const predictAdmission = async (req, res) => {
  try {
    const studentProfile = req.body;

    // Validate essential fields
    if (!studentProfile.stream) {
      studentProfile.stream = 'PCM';
    }
    if (typeof studentProfile.class12Percentage !== 'number') {
      studentProfile.class12Percentage = Number(studentProfile.class12Percentage) || 0;
    }

    const { isDemoMode } = getDBStatus();
    let colleges = [];
    if (isDemoMode) {
      colleges = memoryStore.colleges;
    } else {
      colleges = await College.find({}).lean();
    }

    const evaluations = colleges.map(college => evaluateCollegeMatch(college, studentProfile));

    // Sort by match score descending
    evaluations.sort((a, b) => b.matchScore - a.matchScore);

    const eligible = evaluations.filter(e => e.matchStatus === 'Eligible');
    const potential = evaluations.filter(e => e.matchStatus === 'Potential Match');
    const notEligible = evaluations.filter(e => e.matchStatus === 'Not Eligible');

    res.json({
      success: true,
      summary: {
        totalEvaluated: evaluations.length,
        eligibleCount: eligible.length,
        potentialCount: potential.length,
        notEligibleCount: notEligible.length
      },
      results: {
        all: evaluations,
        eligible,
        potential,
        notEligible
      },
      studentInput: {
        stream: studentProfile.stream,
        class12Percentage: studentProfile.class12Percentage,
        category: studentProfile.category || 'General',
        homeState: studentProfile.homeState || 'Not Specified',
        preferredCourse: studentProfile.preferredCourse || 'All Courses',
        annualBudget: studentProfile.annualBudget,
        jeeMainPercentile: studentProfile.entranceExams?.jeeMain?.percentile || null,
        cuetScore: studentProfile.entranceExams?.cuet?.score || null
      },
      disclaimer: 'DISCLAIMER: Recommendations and admission probabilities are strictly rule-based estimates using previous session counselling cutoff trends. They DO NOT guarantee admission. Official seat allocation is determined solely by authorized counselling bodies (e.g., JoSAA, CSAS, State CETs) based on live verified merit ranks.'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
