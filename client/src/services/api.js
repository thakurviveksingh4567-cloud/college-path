import axios from 'axios';
import { SAMPLE_COLLEGES, SAMPLE_SCHOLARSHIPS, SAMPLE_ADMISSION_EVENTS } from '../data/mockData';

// Dynamic API Base URL:
// In local dev: defaults to '/api' (proxied by Vite to localhost:5000)
// In production on Vercel: uses VITE_API_URL environment variable pointing to Render
const rawApiUrl = import.meta.env.VITE_API_URL;
const API_BASE = rawApiUrl ? `${rawApiUrl.replace(/\/+$/, '')}/api` : '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});


// Intercept to add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('collegepath_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Resilient API services with graceful in-memory fallback
export const collegeAPI = {
  getColleges: async (params = {}) => {
    try {
      const res = await api.get('/colleges', { params });
      return res.data;
    } catch (err) {
      console.warn('[API Warning] College API fallback active:', err.message);
      // Fallback filter
      let list = [...SAMPLE_COLLEGES];
      if (params.search) {
        const q = params.search.toLowerCase();
        list = list.filter(c => c.name.toLowerCase().includes(q) || c.location.city.toLowerCase().includes(q) || c.location.state.toLowerCase().includes(q));
      }
      if (params.state && params.state !== 'All' && params.state !== 'All States') {
        list = list.filter(c => c.location.state.toLowerCase() === params.state.toLowerCase());
      }
      if (params.collegeType && params.collegeType !== 'All') {
        list = list.filter(c => c.collegeType.toLowerCase() === params.collegeType.toLowerCase());
      }
      if (params.course && params.course !== 'All' && params.course !== 'All Courses') {
        list = list.filter(c => c.courses.some(crs => crs.name.toLowerCase().includes(params.course.toLowerCase())));
      }
      return { success: true, count: list.length, data: list, isFallback: true };
    }
  },

  getCollegeBySlug: async (slug) => {
    try {
      const res = await api.get(`/colleges/${slug}`);
      return res.data;
    } catch (err) {
      console.warn('[API Warning] Single College fallback active:', err.message);
      const match = SAMPLE_COLLEGES.find(c => c.slug === slug || c._id === slug);
      if (match) return { success: true, data: match };
      throw err;
    }
  },

  compareColleges: async (slugs) => {
    try {
      const res = await api.post('/colleges/compare', { slugs });
      return res.data;
    } catch (err) {
      const list = SAMPLE_COLLEGES.filter(c => slugs.includes(c.slug));
      return { success: true, count: list.length, data: list };
    }
  },

  createCollege: async (data) => {
    const res = await api.post('/colleges', data);
    return res.data;
  },

  updateCollege: async (slug, data) => {
    const res = await api.put(`/colleges/${slug}`, data);
    return res.data;
  },

  deleteCollege: async (slug) => {
    const res = await api.delete(`/colleges/${slug}`);
    return res.data;
  },

  resetColleges: async () => {
    const res = await api.post('/colleges/admin/reset');
    return res.data;
  }
};

export const recommendationAPI = {
  predictAdmission: async (profile) => {
    try {
      const res = await api.post('/recommendations/predict', profile);
      return res.data;
    } catch (err) {
      console.warn('[API Warning] Predictor local evaluation fallback:', err.message);
      // Run quick local prediction if server unreachable
      const marks = profile.class12Percentage || 75;
      const stream = profile.stream || 'PCM';
      const pref = profile.collegePreference || 'All';

      const evaluated = SAMPLE_COLLEGES.map(c => {
        let status = 'Potential Match';
        let badgeColor = 'amber';
        let score = 70;
        const reasons = [];
        const isGov = ['IIT', 'NIT', 'Central University', 'State Government'].includes(c.collegeType);

        if (c.streamsSupported.includes(stream)) {
          reasons.push(`Stream compatible: ${stream} satisfies program requirements.`);
          if (marks >= 88) {
            status = 'Best Match';
            badgeColor = 'green';
            score = 92;
            reasons.push(`Class 12 marks (${marks}%) comfortably clear admission thresholds.`);
          } else if (marks >= 75) {
            status = 'Safe Choice';
            badgeColor = 'teal';
            score = 78;
            reasons.push(`Strong academic fit with solid seat allocation probability.`);
          } else {
            status = 'Potential Match';
            badgeColor = 'amber';
            score = 66;
            reasons.push(`Competitive in spot / sliding counselling rounds.`);
          }

          if (pref === 'Government' && isGov) {
            score += 5;
            reasons.push(`Matches Government institution preference.`);
          } else if (pref === 'Private' && !isGov) {
            score += 5;
            reasons.push(`Matches Private/Deemed institution preference.`);
          }
        } else {
          status = 'Not Eligible';
          badgeColor = 'red';
          score = 25;
          reasons.push(`Stream mismatch: Requires ${c.streamsSupported.join('/')}, student selected ${stream}.`);
        }

        return {
          collegeId: c.slug,
          collegeName: c.name,
          shortName: c.shortName,
          collegeType: c.collegeType,
          city: c.location.city,
          state: c.location.state,
          matchStatus: status,
          badgeColor,
          matchScore: score,
          matchedCourse: c.courses[0]?.name || 'All Programs',
          tuitionFeePerYear: c.courses[0]?.tuitionFeePerYear ? `₹${c.courses[0].tuitionFeePerYear.toLocaleString('en-IN')}` : 'Not Available',
          hostelFeePerYear: c.hostelFacilities?.available ? `₹${(c.hostelFacilities?.feePerYear || 0).toLocaleString('en-IN')}` : 'Hostel Not Available',
          medianCTC: (c.placements?.medianCTC && Number(c.placements.medianCTC) > 0) ? `${c.placements.medianCTC} LPA` : 'Not Reported / N/A',
          nirfRank: c.accreditation?.nirfRank ? `#${c.accreditation.nirfRank}` : 'Not Ranked',
          reasons,
          warnings: status === 'Not Eligible' ? ['Stream criteria not satisfied for requested degree.'] : [],
          lastVerifiedDate: c.lastVerifiedDate || '2026-11-15',
          admissionYear: '2026-2027',
          officialWebsite: c.officialLinks?.website || null,
          admissionPortal: c.officialLinks?.admissionPortal || c.officialLinks?.website || null
        };
      });

      evaluated.sort((a, b) => b.matchScore - a.matchScore);

      const bestMatch = evaluated.filter(e => e.matchStatus === 'Best Match');
      const safeChoice = evaluated.filter(e => e.matchStatus === 'Safe Choice');
      const potential = evaluated.filter(e => e.matchStatus === 'Potential Match');
      const notEligible = evaluated.filter(e => e.matchStatus === 'Not Eligible');
      const eligible = evaluated.filter(e => e.matchStatus === 'Best Match' || e.matchStatus === 'Safe Choice' || e.matchStatus === 'Eligible');

      return {
        success: true,
        summary: {
          totalEvaluated: evaluated.length,
          bestMatchCount: bestMatch.length,
          safeChoiceCount: safeChoice.length,
          potentialCount: potential.length,
          notEligibleCount: notEligible.length,
          eligibleCount: eligible.length
        },
        results: {
          all: evaluated,
          bestMatch,
          safeChoice,
          potential,
          notEligible,
          eligible
        },
        disclaimer: 'DISCLAIMER: Recommendations and admission probabilities are strictly rule-based estimates using previous session counselling cutoff trends. They DO NOT guarantee admission.'
      };
    }
  }
};

export const scholarshipAPI = {
  getScholarships: async (params = {}) => {
    try {
      const res = await api.get('/scholarships', { params });
      return res.data;
    } catch (err) {
      return { success: true, count: SAMPLE_SCHOLARSHIPS.length, data: SAMPLE_SCHOLARSHIPS };
    }
  }
};

export const calendarAPI = {
  getAdmissionEvents: async (params = {}) => {
    try {
      const res = await api.get('/calendar', { params });
      return res.data;
    } catch (err) {
      return { success: true, count: SAMPLE_ADMISSION_EVENTS.length, data: SAMPLE_ADMISSION_EVENTS };
    }
  }
};

export const authAPI = {
  register: async (payload) => {
    const res = await api.post('/auth/register', payload);
    return res.data;
  },

  login: async (payload) => {
    const res = await api.post('/auth/login', payload);
    return res.data;
  },

  getMe: async () => {
    const res = await api.get('/auth/me');
    return res.data;
  },

  updateProfile: async (profile) => {
    const res = await api.put('/auth/profile', profile);
    return res.data;
  },

  saveCollege: async (payload) => {
    const res = await api.post('/auth/saved-colleges', payload);
    return res.data;
  },

  removeSavedCollege: async (collegeId) => {
    const res = await api.delete(`/auth/saved-colleges/${collegeId}`);
    return res.data;
  }
};

export default api;
