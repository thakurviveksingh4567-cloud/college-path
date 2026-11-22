/**
 * Rule-based Recommendation & Eligibility Predictor Engine for Indian Colleges
 * Evaluates student Class 12 marks, Stream, JEE Main / CUET scores, Category, Domicile, and Budget.
 */

export const evaluateCollegeMatch = (college, studentProfile) => {
  const {
    stream = 'PCM',
    class12Percentage = 0,
    category = 'General',
    homeState = '',
    preferredCourse = '',
    annualBudget = 500000,
    needHostel = true,
    preferredLocations = [],
    entranceExams = {}
  } = studentProfile;

  const reasons = [];
  const warnings = [];
  let isStreamEligible = false;
  let isAcademicEligible = false;
  let isExamEligible = false;
  let isExamBorderline = false;
  let hasRelevantExam = false;
  let bestCourseMatch = null;
  let highestScore = 0;

  // Evaluate each course offered by the college
  const relevantCourses = college.courses.filter(course => {
    if (!preferredCourse || preferredCourse === 'All' || preferredCourse === 'any') return true;
    const pCourseLower = preferredCourse.toLowerCase();
    const cNameLower = course.name.toLowerCase();
    return cNameLower.includes(pCourseLower) || pCourseLower.includes(cNameLower) ||
      (pCourseLower.includes('cse') && cNameLower.includes('computer')) ||
      (pCourseLower.includes('ai') && cNameLower.includes('artificial')) ||
      (pCourseLower.includes('bca') && cNameLower.includes('bca')) ||
      (pCourseLower.includes('mca') && cNameLower.includes('mca')) ||
      (pCourseLower.includes('mba') && cNameLower.includes('mba')) ||
      (pCourseLower.includes('b.com') && cNameLower.includes('b.com'));
  });

  const coursesToEvaluate = relevantCourses.length > 0 ? relevantCourses : college.courses;

  for (const course of coursesToEvaluate) {
    let courseScore = 40;
    const courseReasons = [];
    const courseWarnings = [];

    // 1. Stream Check
    const streamAllowed = course.streamRequired.includes(stream) || 
      course.streamRequired.includes('Any') || 
      course.streamRequired.includes('All');

    if (!streamAllowed) {
      courseWarnings.push(`Stream mismatch: ${course.name} requires ${course.streamRequired.join('/')}, but your stream is ${stream}.`);
    } else {
      isStreamEligible = true;
      courseReasons.push(`Eligible Stream: Your stream (${stream}) meets the prerequisite for ${course.name}.`);
      courseScore += 15;
    }

    // 2. Class 12 Percentage Check with Category Relaxation
    let minPercentage = course.minClass12Percentage || 60;
    if (category !== 'General' && course.categoryRelaxation && course.categoryRelaxation[category]) {
      minPercentage = course.categoryRelaxation[category];
      courseReasons.push(`Category Benefit: Applied relaxed 12th criteria of ${minPercentage}% for ${category} category.`);
    }

    if (class12Percentage >= minPercentage) {
      isAcademicEligible = true;
      courseReasons.push(`Class 12 Marks: Your score of ${class12Percentage}% exceeds the minimum requirement of ${minPercentage}%.`);
      courseScore += 20;
    } else if (class12Percentage >= minPercentage - 3) {
      courseWarnings.push(`Borderline Class 12 score: ${class12Percentage}% is slightly below standard ${minPercentage}%, check university concession norms.`);
      courseScore += 5;
    } else {
      courseWarnings.push(`Class 12 percentage criteria not met: Required ${minPercentage}%, your score is ${class12Percentage}%.`);
      courseScore -= 20;
    }

    // 3. Entrance Exam Cutoff Check
    const jeeInfo = entranceExams?.jeeMain;
    const cuetInfo = entranceExams?.cuet;

    let examPassed = false;
    let examBorderlineLocal = false;

    for (const exam of course.acceptedExams || []) {
      const eName = exam.examName.toLowerCase();

      // Check JEE Main
      if (eName.includes('jee main') || eName.includes('jee')) {
        if (jeeInfo?.taken && typeof jeeInfo.percentile === 'number') {
          hasRelevantExam = true;
          let expectedPercentile = exam.expectedPercentileGeneral || 90;
          if (category !== 'General' && exam.categoryCutoffs && exam.categoryCutoffs[category]) {
            expectedPercentile = exam.categoryCutoffs[category];
          }

          if (jeeInfo.percentile >= expectedPercentile) {
            examPassed = true;
            courseReasons.push(`JEE Main Percentile: Your ${jeeInfo.percentile}% matches/exceeds the estimated cutoff of ${expectedPercentile}% (${category}).`);
            courseScore += 25;
          } else if (jeeInfo.percentile >= expectedPercentile - 3.5) {
            examBorderlineLocal = true;
            courseReasons.push(`JEE Main Borderline: ${jeeInfo.percentile}% is competitive for later counselling rounds or spot rounds (cutoff approx ${expectedPercentile}%).`);
            courseScore += 10;
          } else {
            courseWarnings.push(`JEE Main score (${jeeInfo.percentile}%) is below expected cutoff (${expectedPercentile}%).`);
          }
        }
      }

      // Check CUET UG
      if (eName.includes('cuet')) {
        if (cuetInfo?.taken && (typeof cuetInfo.score === 'number' || typeof cuetInfo.percentile === 'number')) {
          hasRelevantExam = true;
          let expectedScore = exam.expectedScoreCUET || 650;
          if (category !== 'General' && exam.categoryCutoffs && exam.categoryCutoffs[category]) {
            expectedScore = exam.categoryCutoffs[category];
          }

          if (cuetInfo.score && cuetInfo.score >= expectedScore) {
            examPassed = true;
            courseReasons.push(`CUET Score: Your score (${cuetInfo.score}) satisfies the estimated cutoff (${expectedScore}).`);
            courseScore += 25;
          } else if (cuetInfo.score && cuetInfo.score >= expectedScore - 40) {
            examBorderlineLocal = true;
            courseReasons.push(`CUET Borderline: Score (${cuetInfo.score}) is close to cutoff (${expectedScore}); eligible for sliding rounds.`);
            courseScore += 10;
          }
        }
      }

      // Direct / Merit based check
      if (eName.includes('merit') || eName.includes('direct') || eName.includes('12th')) {
        hasRelevantExam = true;
        if (class12Percentage >= (exam.expectedPercentileGeneral || 70)) {
          examPassed = true;
          courseReasons.push(`Merit Route: High Class 12 score makes you a strong candidate via direct merit admission.`);
          courseScore += 20;
        }
      }
    }

    if (examPassed) isExamEligible = true;
    if (examBorderlineLocal) isExamBorderline = true;

    // 4. Budget & Hostel Evaluation
    const annualTuition = course.tuitionFeePerYear || 0;
    const annualHostel = needHostel ? (college.hostelFacilities?.feePerYear || 0) : 0;
    const totalAnnualCost = annualTuition + annualHostel;

    if (totalAnnualCost <= annualBudget) {
      courseReasons.push(`Budget Friendly: Total annual cost (₹${totalAnnualCost.toLocaleString('en-IN')}) is within your budget of ₹${Number(annualBudget).toLocaleString('en-IN')}.`);
      courseScore += 10;
    } else {
      const difference = totalAnnualCost - annualBudget;
      courseWarnings.push(`Budget Alert: Annual cost exceeds budget by ₹${difference.toLocaleString('en-IN')} (Scholarships available).`);
    }

    // 5. Domicile / Home State Advantage
    if (homeState && college.location?.state?.toLowerCase() === homeState.toLowerCase()) {
      courseReasons.push(`Home State Advantage: 50% reservation quota applies for ${homeState} domicile candidates with relaxed rank cutoffs.`);
      courseScore += 10;
    }

    // Location preference bonus
    if (preferredLocations && preferredLocations.length > 0) {
      const stateMatch = preferredLocations.some(loc => 
        college.location?.state?.toLowerCase().includes(loc.toLowerCase()) ||
        college.location?.city?.toLowerCase().includes(loc.toLowerCase())
      );
      if (stateMatch) {
        courseReasons.push(`Location Match: Located in your preferred region (${college.location.city}, ${college.location.state}).`);
        courseScore += 5;
      }
    }

    if (courseScore > highestScore) {
      highestScore = courseScore;
      bestCourseMatch = course;
      reasons.length = 0;
      reasons.push(...courseReasons);
      warnings.length = 0;
      warnings.push(...courseWarnings);
    }
  }

  // Determine Overall Match Status
  let matchStatus = 'Not Eligible';
  let badgeColor = 'red';

  if (isStreamEligible && isAcademicEligible) {
    if (isExamEligible || (!hasRelevantExam && isAcademicEligible)) {
      matchStatus = 'Eligible';
      badgeColor = 'green';
    } else if (isExamBorderline) {
      matchStatus = 'Potential Match';
      badgeColor = 'amber';
    } else if (hasRelevantExam && !isExamEligible) {
      matchStatus = 'Potential Match';
      badgeColor = 'amber';
      reasons.push('Can be considered in subsequent spot rounds, institutional quota, or management seats.');
    }
  } else if (isStreamEligible && !isAcademicEligible) {
    matchStatus = 'Not Eligible';
    badgeColor = 'red';
  } else {
    matchStatus = 'Not Eligible';
    badgeColor = 'red';
  }

  const finalMatchPercentage = Math.min(Math.max(highestScore, 20), 98);

  return {
    collegeId: college.slug || college._id,
    collegeName: college.name,
    shortName: college.shortName,
    collegeType: college.collegeType,
    city: college.location?.city,
    state: college.location?.state,
    matchStatus,
    badgeColor,
    matchScore: finalMatchPercentage,
    matchedCourse: bestCourseMatch ? bestCourseMatch.name : (college.courses[0]?.name || 'All Programs'),
    tuitionFeePerYear: bestCourseMatch?.tuitionFeePerYear || college.courses[0]?.tuitionFeePerYear || 'Not Available',
    hostelFeePerYear: college.hostelFacilities?.feePerYear || 0,
    medianCTC: college.placements?.medianCTC ? `${college.placements.medianCTC} LPA` : 'Not Available',
    nirfRank: college.accreditation?.nirfRank || 'Not Available',
    reasons,
    warnings,
    lastVerifiedDate: college.lastVerifiedDate || '2026-11-15',
    admissionYear: '2026-2027',
    officialWebsite: college.officialLinks?.website,
    admissionPortal: college.officialLinks?.admissionPortal,
    disclaimer: 'DISCLAIMER: Recommendations and admission probabilities are strictly rule-based estimates using previous session counselling cutoff trends. They DO NOT guarantee admission. Official seat allocation is determined solely by authorized counselling bodies (e.g., JoSAA, CSAS, State CETs) based on live verified merit ranks.'
  };
};
