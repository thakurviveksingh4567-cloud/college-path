import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSavedColleges } from '../context/SavedCollegesContext';
import { useComparison } from '../context/ComparisonContext';
import { recommendationAPI } from '../services/api';
import { MatchBadge } from '../components/MatchBadge';
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
  ArrowRight,
  Scale,
  Search,
  History,
  FolderHeart,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

export const StudentDashboardPage = () => {
  const { user, updateProfile, setAuthModalOpen, demoLogin } = useAuth();
  const { savedColleges, updateStatus, toggleSave } = useSavedColleges();
  const { toggleCompare, isComparing, savedComparisons, loadSavedComparison, deleteSavedComparison } = useComparison();

  // Tabs: 'saved' | 'shortlisted' | 'recommended' | 'searches' | 'comparisons'
  const [activeTab, setActiveTab] = useState('saved'); 
  const [recommended, setRecommended] = useState({
    bestMatch: [],
    safeChoice: [],
    potential: [],
    all: []
  });
  const [loadingRecs, setLoadingRecs] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  // Edit Profile Form State
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    stream: user?.profile?.stream || 'PCM',
    class12Percentage: user?.profile?.class12Percentage || 85,
    category: user?.profile?.category || 'General',
    homeState: user?.profile?.homeState || 'Delhi',
    preferredCourse: user?.profile?.preferredCourse || 'B.Tech Computer Science and Engineering',
    annualBudget: user?.profile?.annualBudget || 300000,
    needHostel: user?.profile?.needHostel !== undefined ? user.profile.needHostel : true,
    collegePreference: user?.profile?.collegePreference || 'All'
  });

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('collegepath_recent_searches');
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      } else {
        // Initial sample searches for realistic UX
        const initial = [
          {
            id: '1',
            type: 'explorer',
            title: 'Top NIRF Colleges for PCM Stream',
            query: 'Computer Science',
            state: 'All States',
            stream: 'PCM',
            date: 'Today',
            link: '/colleges?stream=PCM'
          },
          {
            id: '2',
            type: 'predictor',
            title: 'Admission Predictor: JEE 98%tile & 92% Class 12',
            query: 'B.Tech Computer Science',
            state: 'Maharashtra',
            stream: 'PCM',
            date: 'Yesterday',
            link: '/predictor'
          },
          {
            id: '3',
            type: 'explorer',
            title: 'Colleges in Delhi NCR under ₹2.5 LPA Budget',
            query: 'Engineering',
            state: 'Delhi',
            stream: 'PCM',
            date: 'Nov 24',
            link: '/colleges?state=Delhi'
          }
        ];
        setRecentSearches(initial);
      }
    } catch (e) {
      setRecentSearches([]);
    }
  }, []);

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
        preferredCourse: user.profile.preferredCourse || 'B.Tech Computer Science and Engineering',
        annualBudget: user.profile.annualBudget || 300000,
        needHostel: user.profile.needHostel !== undefined ? user.profile.needHostel : true,
        collegePreference: user.profile.collegePreference || 'All'
      });

      // Fetch dynamic personalized recommendations
      const fetchRecs = async () => {
        setLoadingRecs(true);
        try {
          const res = await recommendationAPI.predictAdmission({
            ...user.profile,
            class12Percentage: Number(user.profile.class12Percentage || 85),
            annualBudget: Number(user.profile.annualBudget || 300000)
          });
          if (res.success && res.results) {
            setRecommended({
              bestMatch: res.results.bestMatch || [],
              safeChoice: res.results.safeChoice || [],
              potential: res.results.potential || [],
              all: res.results.all || []
            });
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

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('collegepath_recent_searches');
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

  // Filter shortlisted colleges specifically
  const shortlistedColleges = savedColleges.filter(
    item => item.applicationStatus === 'Shortlisted' || !item.applicationStatus
  );

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
            <span>Update Student Academic Credentials</span>
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

      {/* Main Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-2 sm:gap-4 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('saved')}
          className={`py-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'saved'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-navy-900'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Colleges ({savedColleges.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('shortlisted')}
          className={`py-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'shortlisted'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-navy-900'
          }`}
        >
          <Award className="w-4 h-4 text-emerald-600" />
          <span>Shortlisted Colleges ({shortlistedColleges.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('recommended')}
          className={`py-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'recommended'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-navy-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Personalized Recommendations</span>
        </button>

        <button
          onClick={() => setActiveTab('searches')}
          className={`py-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'searches'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-navy-900'
          }`}
        >
          <History className="w-4 h-4 text-blue-500" />
          <span>Previous Searches ({recentSearches.length})</span>
        </button>

        {savedComparisons.length > 0 && (
          <button
            onClick={() => setActiveTab('comparisons')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'comparisons'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-navy-900'
            }`}
          >
            <Scale className="w-4 h-4 text-indigo-500" />
            <span>Saved Comparisons ({savedComparisons.length})</span>
          </button>
        )}
      </div>

      {/* TAB 1: SAVED COLLEGES & APPLICATION TRACKER */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          {savedColleges.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-card space-y-4 max-w-lg mx-auto">
              <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-navy-900">Your College Tracker is Empty</h3>
              <p className="text-xs text-slate-500">
                Explore verified colleges or predict your admission chances to bookmark your target institutions.
              </p>
              <Link
                to="/colleges"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition"
              >
                <span>Browse Colleges</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {savedColleges.map((item) => {
                const slug = item.collegeId;
                const comparing = isComparing(slug);
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
                        <span className="text-xs font-semibold text-slate-500">Application Stage:</span>
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

                    {/* Notes & Actions Bar */}
                    <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="w-full sm:flex-1">
                        <input
                          type="text"
                          defaultValue={item.notes || ''}
                          onBlur={(e) => updateStatus(slug, item.applicationStatus, e.target.value)}
                          placeholder="Add private note (e.g. choice #1 in JoSAA counselling, entrance date June 20)..."
                          className="w-full text-xs text-slate-700 bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => toggleCompare(item.college || { slug, name: item.college?.name || slug })}
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg border transition ${
                            comparing
                              ? 'bg-blue-50 text-blue-700 border-blue-300'
                              : 'text-slate-600 hover:bg-slate-100 border-slate-200'
                          }`}
                        >
                          {comparing ? 'In Compare' : '+ Compare'}
                        </button>
                        <Link
                          to={`/colleges/${slug}`}
                          className="text-xs font-bold text-blue-600 hover:underline px-2 py-1"
                        >
                          Full Profile
                        </Link>
                        <button
                          onClick={() => toggleSave({ slug, name: item.college?.name || slug })}
                          className="text-xs text-slate-400 hover:text-rose-600 p-1 transition"
                          title="Remove from tracker"
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

      {/* TAB 2: SHORTLISTED COLLEGES */}
      {activeTab === 'shortlisted' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-navy-900">Your Priority Shortlist</h3>
              <p className="text-xs text-slate-500">
                Colleges marked as high priority candidates for your seat allotment and counselling choice-filling.
              </p>
            </div>
            {shortlistedColleges.length > 1 && (
              <Link
                to="/compare"
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition shrink-0"
              >
                <Scale className="w-4 h-4" />
                <span>Open Comparison Matrix</span>
              </Link>
            )}
          </div>

          {shortlistedColleges.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-card space-y-4 max-w-lg mx-auto">
              <Award className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-navy-900">No Priority Shortlisted Colleges</h3>
              <p className="text-xs text-slate-500">
                Mark colleges as 'Shortlisted' in your Saved list to organize your top preferences.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shortlistedColleges.map((item) => {
                const slug = item.collegeId;
                const col = item.college || {};
                const comparing = isComparing(slug);
                return (
                  <div key={slug} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Shortlisted Choice
                        </span>
                        <span className="text-[10px] font-bold text-navy-900 bg-slate-100 px-2 py-0.5 rounded">
                          {col.collegeType || 'Institute'}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-navy-900 mt-2 line-clamp-1">
                        <Link to={`/colleges/${slug}`} className="hover:text-blue-600 transition">
                          {col.name || slug.replace(/-/g, ' ').toUpperCase()}
                        </Link>
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">{col.location?.city || 'India'}, {col.location?.state}</p>

                      {item.notes && (
                        <div className="mt-3 p-2 bg-amber-50 rounded-lg border border-amber-200/60 text-[11px] text-amber-900">
                          <strong>Note:</strong> {item.notes}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => toggleCompare(col.slug ? col : { slug, name: col.name || slug })}
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border transition ${
                          comparing
                            ? 'bg-blue-50 text-blue-700 border-blue-300'
                            : 'text-slate-600 hover:bg-slate-100 border-slate-200'
                        }`}
                      >
                        {comparing ? 'In Compare' : '+ Compare'}
                      </button>

                      <Link
                        to={`/colleges/${slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                      >
                        <span>View Profile</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PERSONALIZED RECOMMENDATIONS */}
      {activeTab === 'recommended' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-navy-900">Personalized College Recommendations</h3>
              <p className="text-xs text-slate-500">
                Rule-matched for your profile: {user.profile?.stream || 'PCM'} • {user.profile?.class12Percentage || 85}% Class 12 • Budget ₹{Number(user.profile?.annualBudget || 300000).toLocaleString('en-IN')}/yr.
              </p>
            </div>
            <Link
              to="/predictor"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3.5 py-2 rounded-xl transition shrink-0"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Full Admission Predictor</span>
            </Link>
          </div>

          {loadingRecs ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(n => <div key={n} className="h-64 bg-slate-100 rounded-2xl animate-pulse"></div>)}
            </div>
          ) : recommended.all.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500 space-y-3">
              <p>No direct rule matches found for your exact current credentials.</p>
              <Link to="/predictor" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-xl font-bold">
                Run Predictor with Custom Inputs
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Best Matches */}
              {recommended.bestMatch.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <h4 className="text-sm font-bold text-navy-900">Best Matches ({recommended.bestMatch.length})</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {recommended.bestMatch.map(match => (
                      <div key={match.collegeId} className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-card flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <MatchBadge status={match.matchStatus} score={match.matchScore} size="sm" />
                            <span className="text-[10px] font-bold text-navy-900 bg-slate-100 px-2 py-0.5 rounded">
                              {match.collegeType}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-navy-900 mt-2 line-clamp-1">{match.collegeName}</h4>
                          <p className="text-xs text-slate-500">{match.city}, {match.state}</p>

                          <div className="mt-3 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100 text-xs space-y-1">
                            <strong className="text-emerald-950 block">{match.matchedCourse}</strong>
                            <p className="text-[11px] text-emerald-800 leading-tight">
                              ✓ {match.reasons?.[0] || 'Eligible based on academic prerequisites'}
                            </p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-extrabold text-navy-900">
                            {match.tuitionFeePerYear}/yr
                          </span>
                          <Link
                            to={`/colleges/${match.collegeId}`}
                            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                          >
                            <span>Explore Specs</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Safe Choices */}
              {recommended.safeChoice.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                    <h4 className="text-sm font-bold text-navy-900">Safe Choices ({recommended.safeChoice.length})</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {recommended.safeChoice.map(match => (
                      <div key={match.collegeId} className="bg-white p-5 rounded-2xl border border-teal-200 shadow-card flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <MatchBadge status={match.matchStatus} score={match.matchScore} size="sm" />
                            <span className="text-[10px] font-bold text-navy-900 bg-slate-100 px-2 py-0.5 rounded">
                              {match.collegeType}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-navy-900 mt-2 line-clamp-1">{match.collegeName}</h4>
                          <p className="text-xs text-slate-500">{match.city}, {match.state}</p>

                          <div className="mt-3 bg-teal-50/50 p-2.5 rounded-xl border border-teal-100 text-xs space-y-1">
                            <strong className="text-teal-950 block">{match.matchedCourse}</strong>
                            <p className="text-[11px] text-teal-800 leading-tight">
                              ✓ {match.reasons?.[0] || 'High admission confidence'}
                            </p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-extrabold text-navy-900">
                            {match.tuitionFeePerYear}/yr
                          </span>
                          <Link
                            to={`/colleges/${match.collegeId}`}
                            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                          >
                            <span>Explore Specs</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PREVIOUS SEARCHES */}
      {activeTab === 'searches' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-navy-900">Previous Search History</h3>
              <p className="text-xs text-slate-500">
                Quickly re-run previous explorer searches, stream queries, and predictor evaluations.
              </p>
            </div>
            {recentSearches.length > 0 && (
              <button
                onClick={clearRecentSearches}
                className="text-xs text-slate-400 hover:text-rose-600 font-semibold"
              >
                Clear Search History
              </button>
            )}
          </div>

          {recentSearches.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-card space-y-4 max-w-lg mx-auto">
              <History className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-navy-900">No Recent Searches</h3>
              <p className="text-xs text-slate-500">
                Your college exploration queries and predictor sessions will appear here for fast access.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentSearches.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-blue-400 shadow-xs flex flex-col justify-between gap-3 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {item.type === 'predictor' ? 'Predictor' : 'Explorer'}
                      </span>
                      <span className="text-[10px] text-slate-400">{item.date}</span>
                    </div>
                    <h4 className="text-sm font-bold text-navy-900">{item.title}</h4>
                    <p className="text-xs text-slate-500">
                      State: {item.state} • Stream: {item.stream}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to={item.link || '/colleges'}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                    >
                      <span>Re-run Query</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: SAVED COMPARISONS */}
      {activeTab === 'comparisons' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-bold text-navy-900">Saved College Comparisons</h3>
            <p className="text-xs text-slate-500">
              Restore and inspect side-by-side matrices you saved during your exploration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedComparisons.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {item.colleges?.length || 0} Colleges
                    </span>
                    <span className="text-[10px] text-slate-400">{item.savedAt}</span>
                  </div>
                  <h4 className="text-sm font-bold text-navy-900 mt-2">{item.label}</h4>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.colleges?.map((c, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                        {c.shortName || c.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      loadSavedComparison(item.id);
                      window.location.href = '/compare';
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    <span>Load Matrix</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => deleteSavedComparison(item.id)}
                    className="text-slate-400 hover:text-rose-600 transition"
                    title="Delete saved comparison"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
