import React, { useState } from 'react';
import { recommendationAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CollegeCard } from '../components/CollegeCard';
import { MatchBadge } from '../components/MatchBadge';
import { INDIAN_STATES, POPULAR_COURSES, STREAMS } from '../data/mockData';
import { 
  SlidersHorizontal, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Info, 
  GraduationCap, 
  IndianRupee, 
  ShieldCheck, 
  ArrowRight,
  RotateCcw,
  BookOpen
} from 'lucide-react';

export const PredictorPage = () => {
  const { user } = useAuth();

  // Form State initialized from authenticated user profile if available
  const [stream, setStream] = useState(user?.profile?.stream || 'PCM');
  const [class12Percentage, setClass12Percentage] = useState(user?.profile?.class12Percentage || 88.5);
  const [category, setCategory] = useState(user?.profile?.category || 'General');
  const [homeState, setHomeState] = useState(user?.profile?.homeState || 'Delhi');
  const [preferredCourse, setPreferredCourse] = useState(user?.profile?.preferredCourse || 'B.Tech CSE');
  const [annualBudget, setAnnualBudget] = useState(user?.profile?.annualBudget || 300000);
  const [needHostel, setNeedHostel] = useState(user?.profile?.needHostel !== undefined ? user.profile.needHostel : true);

  // Entrance Exams
  const [jeeTaken, setJeeTaken] = useState(true);
  const [jeePercentile, setJeePercentile] = useState(96.5);
  const [jeeRank, setJeeRank] = useState(35000);

  const [cuetTaken, setCuetTaken] = useState(false);
  const [cuetScore, setCuetScore] = useState(720);

  // Results State
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      stream,
      class12Percentage: Number(class12Percentage),
      category,
      homeState,
      preferredCourse,
      annualBudget: Number(annualBudget),
      needHostel,
      entranceExams: {
        jeeMain: {
          taken: jeeTaken,
          percentile: jeeTaken ? Number(jeePercentile) : null,
          rank: jeeTaken ? Number(jeeRank) : null
        },
        cuet: {
          taken: cuetTaken,
          score: cuetTaken ? Number(cuetScore) : null
        }
      }
    };

    try {
      const res = await recommendationAPI.predictAdmission(payload);
      if (res.success) {
        setResults(res);
        // Scroll to results
        setTimeout(() => {
          document.getElementById('prediction-results')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStream('PCM');
    setClass12Percentage(85);
    setCategory('General');
    setHomeState('Delhi');
    setPreferredCourse('B.Tech CSE');
    setAnnualBudget(300000);
    setNeedHostel(true);
    setJeeTaken(false);
    setCuetTaken(false);
    setResults(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Page Title Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white rounded-3xl p-6 sm:p-10 shadow-soft text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Rule-Based Indian College Admission Predictor</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Predict Your College Admission Chances
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Enter your academic profile below. We match your Class 12 percentage, category relaxation rules, domicile quota, and entrance exam percentiles against officially verified college cutoff trends.
          </p>
        </div>

        <div className="bg-navy-800/80 p-4 rounded-2xl border border-navy-700 text-xs space-y-2 shrink-0 max-w-xs text-slate-300">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Unbiased Algorithm</span>
          </div>
          <p className="text-[11px] text-slate-400">
            No paid promotions. Calculations are based strictly on previous session counselling rounds and seat matrix rules.
          </p>
        </div>
      </div>

      {/* Main Predictor Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-card space-y-8">
        
        {/* Section 1: Academic Stream & Class 12 Marks */}
        <div>
          <h3 className="text-base font-bold text-navy-900 flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
            Class 12 Academic Foundation
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Stream Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Class 12 Stream Prerequisite *
              </label>
              <div className="space-y-2">
                {STREAMS.map((st) => (
                  <label
                    key={st.id}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                      stream === st.id
                        ? 'bg-blue-50/80 border-blue-500 ring-1 ring-blue-500'
                        : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/70'
                    }`}
                  >
                    <input
                      type="radio"
                      name="stream"
                      checked={stream === st.id}
                      onChange={() => setStream(st.id)}
                      className="mt-0.5 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <p className="text-xs font-bold text-navy-900">{st.id}</p>
                      <p className="text-[11px] text-slate-500">{st.name}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Class 12 Percentage Slider & Input */}
            <div className="space-y-4">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Class 12 Aggregate Percentage *
              </label>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Your Score:</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="35"
                      max="100"
                      step="0.1"
                      value={class12Percentage}
                      onChange={(e) => setClass12Percentage(e.target.value)}
                      className="w-20 text-right py-1 px-2 text-lg font-extrabold text-blue-600 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm font-bold text-slate-600">%</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  step="0.5"
                  value={class12Percentage}
                  onChange={(e) => setClass12Percentage(e.target.value)}
                  className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <p className="text-[11px] text-slate-500 italic">
                  Note: Top IITs and NITs require 75% in PCM (65% for SC/ST).
                </p>
              </div>

              {/* Social Category for Reservation Relaxations */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Social Category (Reservation Status)
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full py-2.5 px-3 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                >
                  <option value="General">General / Open (CRL)</option>
                  <option value="OBC-NCL">OBC-NCL (Other Backward Class - Non-Creamy Layer)</option>
                  <option value="SC">SC (Scheduled Caste)</option>
                  <option value="ST">ST (Scheduled Tribe)</option>
                  <option value="EWS">GEN-EWS (Economically Weaker Section)</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Applies official cutoff relaxations and quota reservations.
                </p>
              </div>
            </div>

            {/* Target Course & Home State */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Preferred Target Program / Course
                </label>
                <select
                  value={preferredCourse}
                  onChange={(e) => setPreferredCourse(e.target.value)}
                  className="w-full py-2.5 px-3 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                >
                  <option value="All">All Eligible Programs</option>
                  {POPULAR_COURSES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Home State for Domicile Quota */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Home State / Domicile
                </label>
                <select
                  value={homeState}
                  onChange={(e) => setHomeState(e.target.value)}
                  className="w-full py-2.5 px-3 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                >
                  {INDIAN_STATES.filter(s => s !== 'All States').map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <span className="inline-block bg-emerald-50 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-md mt-1 border border-emerald-200">
                  Enables 50% Home-State Quota advantage for NITs & State Univs.
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Section 2: Entrance Exams (JEE Main & CUET) */}
        <div className="pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-navy-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</span>
              National Entrance Exams (Skip if not taken)
            </h3>
            <span className="text-xs text-slate-500 italic hidden sm:inline">
              Leave disabled if seeking 12th board merit seats
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* JEE Main Card */}
            <div className={`p-5 rounded-2xl border transition ${
              jeeTaken ? 'bg-blue-50/50 border-blue-300' : 'bg-slate-50 border-slate-200/80'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="jeeTaken"
                    checked={jeeTaken}
                    onChange={(e) => setJeeTaken(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-slate-300"
                  />
                  <label htmlFor="jeeTaken" className="text-sm font-bold text-navy-900 cursor-pointer">
                    JEE Main 2026 / 2027
                  </label>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  Engineering / Architecture
                </span>
              </div>

              {jeeTaken ? (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">NTA Percentile</label>
                    <input
                      type="number"
                      step="0.01"
                      min="1"
                      max="100"
                      value={jeePercentile}
                      onChange={(e) => setJeePercentile(e.target.value)}
                      placeholder="e.g. 97.5"
                      className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Estimated AIR Rank</label>
                    <input
                      type="number"
                      min="1"
                      max="1000000"
                      value={jeeRank}
                      onChange={(e) => setJeeRank(e.target.value)}
                      placeholder="e.g. 28000"
                      className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">
                  Not taken. CollegePath will match you with state colleges and deemed universities admitting through 12th marks or direct tests.
                </p>
              )}
            </div>

            {/* CUET UG Card */}
            <div className={`p-5 rounded-2xl border transition ${
              cuetTaken ? 'bg-indigo-50/50 border-indigo-300' : 'bg-slate-50 border-slate-200/80'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="cuetTaken"
                    checked={cuetTaken}
                    onChange={(e) => setCuetTaken(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-slate-300"
                  />
                  <label htmlFor="cuetTaken" className="text-sm font-bold text-navy-900 cursor-pointer">
                    CUET UG (Central & State Univs)
                  </label>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                  DU, BHU, BCA, B.Com
                </span>
              </div>

              {cuetTaken ? (
                <div className="pt-2">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Normalized CUET Score (out of 800)
                  </label>
                  <input
                    type="number"
                    min="100"
                    max="800"
                    value={cuetScore}
                    onChange={(e) => setCuetScore(e.target.value)}
                    placeholder="e.g. 740"
                    className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Used for Delhi University CSAS, BHU, and Central University cutoffs.
                  </p>
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">
                  Not taken. You can still discover colleges that offer direct merit admission.
                </p>
              )}
            </div>

          </div>
        </div>

        {/* Section 3: Budget & Hostel Preferences */}
        <div className="pt-6 border-t border-slate-200">
          <h3 className="text-base font-bold text-navy-900 flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">3</span>
            Annual Budget & Living Preferences
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                <span>Maximum Annual Budget (Tuition + Living)</span>
                <span className="text-blue-600 font-bold normal-case text-sm">
                  ₹{Number(annualBudget).toLocaleString('en-IN')} / year
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="800000"
                step="25000"
                value={annualBudget}
                onChange={(e) => setAnnualBudget(e.target.value)}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>₹50,000 (Govt Subsidized)</span>
                <span>₹3,00,000</span>
                <span>₹8,00,000+ (Private)</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200">
              <div>
                <p className="text-xs font-bold text-navy-900">Hostel Accommodation Required</p>
                <p className="text-[11px] text-slate-500">Include estimated hostel & mess fees in budget evaluation</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={needHostel}
                  onChange={(e) => setNeedHostel(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1.5 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Values</span>
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{loading ? 'Evaluating Rules & Cutoffs...' : 'Evaluate Admission Eligibility'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

      {/* RESULTS DISPLAY SECTION */}
      {results && (
        <div id="prediction-results" className="space-y-6 pt-4 animate-fadeIn">
          
          {/* Results Summary Header */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Evaluation Results</span>
                <h2 className="text-2xl font-extrabold text-navy-900 mt-1">
                  Your College Admission Matches (2026-27 Session)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Calculated for {results.studentInput.stream} stream candidate with {results.studentInput.class12Percentage}% in Class 12 ({results.studentInput.category} Category, {results.studentInput.homeState} Domicile).
                </p>
              </div>

              {/* Status Counters */}
              <div className="flex items-center gap-2">
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {results.summary.eligibleCount} Eligible
                </span>
                <span className="bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  {results.summary.potentialCount} Potential
                </span>
                <span className="bg-rose-50 text-rose-800 border border-rose-200 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  {results.summary.notEligibleCount} Excluded
                </span>
              </div>
            </div>

            {/* Official Non-Guarantee Disclaimer Callout */}
            <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-2xl flex items-start gap-3 text-xs text-blue-900 leading-relaxed">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-blue-950">Important Notice & Non-Guarantee Disclaimer:</p>
                <p className="text-slate-600 mt-0.5">
                  {results.disclaimer} Seat allotments vary dynamically based on total applicant volume, normalization in JEE/CUET, and subsequent sliding rounds.
                </p>
              </div>
            </div>

            {/* Match Filter Tabs */}
            <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
              {[
                { id: 'all', label: `All Colleges (${results.summary.totalEvaluated})` },
                { id: 'eligible', label: `Eligible Only (${results.summary.eligibleCount})` },
                { id: 'potential', label: `Potential / Borderline (${results.summary.potentialCount})` },
                { id: 'notEligible', label: `Not Eligible (${results.summary.notEligibleCount})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-4 text-xs font-bold rounded-t-xl transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Matches Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {(results.results[activeTab] || []).map((match) => (
                <div key={match.collegeId} className="flex flex-col">
                  {/* Detailed Match Reasons Card */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card hover:shadow-soft transition flex flex-col justify-between h-full space-y-4">
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {match.collegeType} • {match.city}, {match.state}
                        </span>
                        <MatchBadge status={match.matchStatus} score={match.matchScore} size="sm" />
                      </div>

                      <h4 className="text-base font-bold text-navy-900 line-clamp-1">
                        {match.collegeName}
                      </h4>
                      <p className="text-xs font-semibold text-blue-600 mt-0.5">
                        Matched Course: {match.matchedCourse}
                      </p>

                      {/* Reasons Box */}
                      <div className="mt-4 bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2">
                        <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          Why You Match:
                        </p>
                        {match.reasons && match.reasons.map((r, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-snug">{r}</span>
                          </div>
                        ))}
                        {match.warnings && match.warnings.map((w, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs text-amber-700">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <span className="leading-snug">{w}</span>
                          </div>
                        ))}
                      </div>

                      {/* Fee & Placement Details */}
                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
                        <div>
                          <span className="text-[10px] text-slate-400 block">Est. Annual Tuition</span>
                          <span className="font-bold text-navy-900">
                            {typeof match.tuitionFeePerYear === 'number' 
                              ? `₹${match.tuitionFeePerYear.toLocaleString('en-IN')}` 
                              : match.tuitionFeePerYear}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block">Median CTC</span>
                          <span className="font-bold text-emerald-700">{match.medianCTC}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">
                        Verified {match.lastVerifiedDate}
                      </span>
                      <a
                        href={`/colleges/${match.collegeId}`}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      >
                        <span>Full College Specs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
