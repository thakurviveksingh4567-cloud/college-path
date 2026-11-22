import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSavedColleges } from '../context/SavedCollegesContext';
import { recommendationAPI } from '../services/api';
import { CollegeCard } from '../components/CollegeCard';
import { INDIAN_STATES, POPULAR_COURSES, STREAMS } from '../data/mockData';
import { 
  User, 
  Bookmark, 
  SlidersHorizontal, 
  Sparkles, 
  Edit3, 
  CheckCircle2, 
  Trash2, 
  Save, 
  ExternalLink,
  MapPin,
  Calendar,
  Briefcase,
  Award,
  ArrowRight
} from 'lucide-react';

export const StudentDashboardPage = () => {
  const { user, updateProfile, setAuthModalOpen, demoLogin } = useAuth();
  const { savedColleges, updateStatus, toggleSave } = useSavedColleges();

  const [activeTab, setActiveTab] = useState('saved'); // 'saved' | 'recommended' | 'profile'
  const [recommended, setRecommended] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(false);

  // Edit Profile Form State
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    stream: user?.profile?.stream || 'PCM',
    class12Percentage: user?.profile?.class12Percentage || 85,
    category: user?.profile?.category || 'General',
    homeState: user?.profile?.homeState || 'Delhi',
    preferredCourse: user?.profile?.preferredCourse || 'B.Tech CSE',
    annualBudget: user?.profile?.annualBudget || 300000,
    needHostel: user?.profile?.needHostel !== undefined ? user.profile.needHostel : true
  });

  // Calculate profile completion percentage
  const calcCompletion = () => {
    let score = 20; // registered
    if (user?.profile?.stream) score += 20;
    if (user?.profile?.class12Percentage) score += 20;
    if (user?.profile?.homeState) score += 15;
    if (user?.profile?.preferredCourse) score += 15;
    if (user?.profile?.annualBudget) score += 10;
    return Math.min(score, 100);
  };

  useEffect(() => {
    if (user?.profile) {
      setProfileForm({
        stream: user.profile.stream || 'PCM',
        class12Percentage: user.profile.class12Percentage || 85,
        category: user.profile.category || 'General',
        homeState: user.profile.homeState || 'Delhi',
        preferredCourse: user.profile.preferredCourse || 'B.Tech CSE',
        annualBudget: user.profile.annualBudget || 300000,
        needHostel: user.profile.needHostel !== undefined ? user.profile.needHostel : true
      });

      // Fetch dynamic recommendations for this student
      const fetchRecs = async () => {
        setLoadingRecs(true);
        try {
          const res = await recommendationAPI.predictAdmission(user.profile);
          if (res.success) {
            setRecommended(res.results.eligible.slice(0, 6));
          }
        } catch (e) {
          console.error(e);
        } finally {
          setLoadingRecs(false);
        }
      };
      fetchRecs();
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(profileForm);
    setIsEditing(false);
  };

  const statusOptions = [
    'Shortlisted',
    'Applied',
    'Entrance Scheduled',
    'Counselling Registered',
    'Admitted',
    'Archived'
  ];

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-navy-900">Student Dashboard Sign In</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Sign in to access your saved college tracker, personal application status notes, and custom cutoff predictions.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setAuthModalOpen(true)}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition"
          >
            Sign In / Register
          </button>
          <button
            onClick={() => demoLogin(0)}
            className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold rounded-xl text-sm transition"
          >
            1-Click PCM Demo Profile
          </button>
        </div>
      </div>
    );
  }

  const completionPercent = calcCompletion();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Profile Summary Card */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white rounded-3xl p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-extrabold shadow-md shrink-0">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">{user.name}</h1>
              {user.role === 'admin' && (
                <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Admin</span>
              )}
            </div>
            <p className="text-xs text-slate-300 mt-0.5">{user.email}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
              <span className="bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-400/30 font-semibold">
                {user.profile?.stream || 'PCM'} Stream
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-400/30 font-semibold">
                Class 12: {user.profile?.class12Percentage || 'N/A'}%
              </span>
              <span className="bg-slate-700 text-slate-300 px-2.5 py-0.5 rounded-full font-medium">
                Home State: {user.profile?.homeState || 'Delhi'}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Completion Bar */}
        <div className="bg-navy-800/80 p-4 rounded-2xl border border-navy-700 w-full md:w-64 space-y-2 shrink-0">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-semibold">Profile Completion</span>
            <span className="text-blue-400 font-extrabold">{completionPercent}%</span>
          </div>
          <div className="w-full bg-navy-950 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            ></div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 mt-2"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Close Profile Editor' : 'Edit Academic Profile'}</span>
          </button>
        </div>
      </div>

      {/* Profile Edit Drawer / Form if expanded */}
      {isEditing && (
        <form onSubmit={handleProfileSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-blue-200 shadow-soft-xl animate-fadeIn space-y-4">
          <h3 className="text-base font-bold text-navy-900 flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-blue-600" />
            Update Student Academic Credentials
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Class 12 Stream</label>
              <select
                value={profileForm.stream}
                onChange={(e) => setProfileForm({ ...profileForm, stream: e.target.value })}
                className="w-full py-2 px-3 rounded-lg border border-slate-300 bg-white"
              >
                <option value="PCM">PCM (Engineering/Math)</option>
                <option value="PCB">PCB (Medical/Bio)</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts / Humanities</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Class 12 Marks (%)</label>
              <input
                type="number"
                step="0.1"
                min="35"
                max="100"
                value={profileForm.class12Percentage}
                onChange={(e) => setProfileForm({ ...profileForm, class12Percentage: e.target.value })}
                className="w-full py-2 px-3 rounded-lg border border-slate-300"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Category</label>
              <select
                value={profileForm.category}
                onChange={(e) => setProfileForm({ ...profileForm, category: e.target.value })}
                className="w-full py-2 px-3 rounded-lg border border-slate-300 bg-white"
              >
                <option value="General">General</option>
                <option value="OBC-NCL">OBC-NCL</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Home State (Domicile)</label>
              <select
                value={profileForm.homeState}
                onChange={(e) => setProfileForm({ ...profileForm, homeState: e.target.value })}
                className="w-full py-2 px-3 rounded-lg border border-slate-300 bg-white"
              >
                {INDIAN_STATES.filter(s => s !== 'All States').map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Annual Budget (₹)</label>
              <input
                type="number"
                step="25000"
                value={profileForm.annualBudget}
                onChange={(e) => setProfileForm({ ...profileForm, annualBudget: e.target.value })}
                className="w-full py-2 px-3 rounded-lg border border-slate-300"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Course</label>
              <select
                value={profileForm.preferredCourse}
                onChange={(e) => setProfileForm({ ...profileForm, preferredCourse: e.target.value })}
                className="w-full py-2 px-3 rounded-lg border border-slate-300 bg-white"
              >
                {POPULAR_COURSES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="py-2 px-4 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* Main Tabs Navigation */}
      <div className="flex border-b border-slate-200 gap-3">
        <button
          onClick={() => setActiveTab('saved')}
          className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'saved'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-navy-900'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Colleges & Application Tracker ({savedColleges.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('recommended')}
          className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'recommended'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-navy-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Personalized College Matches</span>
        </button>
      </div>

      {/* TAB 1: SAVED COLLEGES & APPLICATION TRACKER */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          {savedColleges.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-card space-y-4 max-w-lg mx-auto">
              <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-navy-900">Your College Shortlist is Empty</h3>
              <p className="text-xs text-slate-500">
                Browse our verified college explorer or use the admission predictor to bookmark your dream colleges.
              </p>
              <Link
                to="/colleges"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition"
              >
                <span>Browse Verified Colleges</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {savedColleges.map((item) => {
                const slug = item.collegeId;
                return (
                  <div
                    key={slug}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {item.college?.collegeType || 'Higher Education Institution'}
                        </span>
                        <h4 className="text-base font-extrabold text-navy-900">
                          <Link to={`/colleges/${slug}`} className="hover:text-blue-600 transition">
                            {item.college?.name || slug.replace(/-/g, ' ').toUpperCase()}
                          </Link>
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {item.college?.location?.city || 'India'}, {item.college?.location?.state}
                        </p>
                      </div>

                      {/* Application Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500">Status:</span>
                        <select
                          value={item.applicationStatus || 'Shortlisted'}
                          onChange={(e) => updateStatus(slug, e.target.value, item.notes)}
                          className="text-xs font-bold py-1.5 px-3 rounded-xl border border-slate-300 bg-blue-50/50 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {statusOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Notes Field */}
                    <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="w-full sm:flex-1">
                        <input
                          type="text"
                          defaultValue={item.notes || ''}
                          onBlur={(e) => updateStatus(slug, item.applicationStatus, e.target.value)}
                          placeholder="Add private note (e.g. choice #2 in JoSAA, registration deadline June 15)..."
                          className="w-full text-xs text-slate-700 bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          to={`/colleges/${slug}`}
                          className="text-xs font-bold text-blue-600 hover:underline px-2 py-1"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => toggleSave({ slug, name: item.college?.name || slug })}
                          className="text-xs text-slate-400 hover:text-rose-600 p-1 transition"
                          title="Remove from shortlisted"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PERSONALIZED RECOMMENDATIONS */}
      {activeTab === 'recommended' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-navy-900">Recommended Based on Your Marks</h3>
              <p className="text-xs text-slate-500">
                Rule-matched for {user.profile?.stream || 'PCM'} ({user.profile?.class12Percentage}% in 12th) within ₹{Number(user.profile?.annualBudget || 300000).toLocaleString('en-IN')}/yr budget.
              </p>
            </div>
            <Link to="/predictor" className="text-xs font-bold text-blue-600 hover:underline">
              Re-run Predictor
            </Link>
          </div>

          {loadingRecs ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(n => <div key={n} className="h-64 bg-slate-100 rounded-2xl animate-pulse"></div>)}
            </div>
          ) : recommended.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
              No direct matches found. Try widening your budget or running the full Admission Predictor.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommended.map(match => (
                <div key={match.collegeId} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ● {match.matchScore}% Match Fit
                    </span>
                    <h4 className="text-base font-bold text-navy-900 mt-2 line-clamp-1">{match.collegeName}</h4>
                    <p className="text-xs text-slate-500">{match.city}, {match.state}</p>

                    <div className="mt-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Program</span>
                      <strong className="text-navy-900">{match.matchedCourse}</strong>
                      <div className="pt-1 text-[11px] text-emerald-800">
                        ✓ {match.reasons?.[0] || 'Eligible based on stream and Class 12 criteria'}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-navy-900">
                      ₹{typeof match.tuitionFeePerYear === 'number' ? match.tuitionFeePerYear.toLocaleString('en-IN') : match.tuitionFeePerYear}/yr
                    </span>
                    <Link
                      to={`/colleges/${match.collegeId}`}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
