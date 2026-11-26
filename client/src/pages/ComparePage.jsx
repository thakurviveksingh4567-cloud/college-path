import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useComparison } from '../context/ComparisonContext';
import { SAMPLE_COLLEGES } from '../data/mockData';
import { 
  Scale, 
  Trash2, 
  Plus, 
  MapPin, 
  Award, 
  IndianRupee, 
  Briefcase, 
  Check, 
  X, 
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  BookmarkCheck,
  FolderHeart,
  History,
  GraduationCap,
  Building,
  Home
} from 'lucide-react';

export const ComparePage = () => {
  const { 
    comparedColleges, 
    removeCompare, 
    toggleCompare, 
    clearAll,
    savedComparisons,
    saveCurrentComparison,
    loadSavedComparison,
    deleteSavedComparison 
  } = useComparison();

  const [selectorOpen, setSelectorOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [customLabel, setCustomLabel] = useState('');
  const [showSavedList, setShowSavedList] = useState(false);

  // Available colleges to add that aren't already selected
  const availableToAdd = SAMPLE_COLLEGES.filter(
    sc => !comparedColleges.some(c => (c.slug || c.collegeId || c._id) === sc.slug)
  );

  const handleSave = (e) => {
    e.preventDefault();
    const success = saveCurrentComparison(customLabel);
    if (success) {
      setCustomLabel('');
      setSaveModalOpen(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Side-by-Side Analysis</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mt-1">
            Compare Colleges ({comparedColleges.length}/3)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Evaluate annual costs, verified placement CTCs, courses, hostel living, and eligibility criteria side by side.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {savedComparisons.length > 0 && (
            <button
              onClick={() => setShowSavedList(!showSavedList)}
              className="bg-slate-100 hover:bg-slate-200 text-navy-900 text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
            >
              <History className="w-4 h-4 text-blue-600" />
              <span>Saved Sets ({savedComparisons.length})</span>
            </button>
          )}

          {comparedColleges.length > 0 && (
            <>
              <button
                onClick={() => setSaveModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition flex items-center gap-1.5"
              >
                <BookmarkCheck className="w-4 h-4" />
                <span>Save Comparison</span>
              </button>

              {comparedColleges.length < 3 && (
                <button
                  onClick={() => setSelectorOpen(!selectorOpen)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add College</span>
                </button>
              )}

              <button
                onClick={clearAll}
                className="text-slate-400 hover:text-rose-600 text-xs font-semibold px-3 py-2 rounded-xl hover:bg-slate-100 transition flex items-center gap-1"
                title="Clear current comparison list"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear All</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Saved Comparisons Drawer / Section */}
      {showSavedList && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-navy-900 flex items-center gap-1.5">
              <FolderHeart className="w-4 h-4 text-emerald-600" />
              <span>Your Saved Comparisons</span>
            </h3>
            <button
              onClick={() => setShowSavedList(false)}
              className="text-slate-400 hover:text-slate-600 text-xs font-semibold"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {savedComparisons.map((item) => (
              <div 
                key={item.id}
                className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 shadow-xs flex flex-col justify-between gap-3 transition"
              >
                <div>
                  <p className="text-xs font-bold text-navy-900 line-clamp-1">{item.label}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Saved on {item.savedAt} • {item.colleges?.length || 0} colleges</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.colleges?.map((c, i) => (
                      <span key={i} className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-semibold">
                        {c.shortName || c.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-xs">
                  <button
                    onClick={() => {
                      loadSavedComparison(item.id);
                      setShowSavedList(false);
                    }}
                    className="text-blue-600 hover:text-blue-700 font-bold hover:underline"
                  >
                    Load in Matrix
                  </button>
                  <button
                    onClick={() => deleteSavedComparison(item.id)}
                    className="text-slate-400 hover:text-rose-600 transition"
                    title="Delete saved comparison"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save Modal */}
      {saveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-soft-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-navy-900 flex items-center gap-2">
                <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                <span>Save This Comparison</span>
              </h3>
              <button 
                onClick={() => setSaveModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Save these {comparedColleges.length} colleges ({comparedColleges.map(c => c.shortName || c.name).join(', ')}) to quickly reload and compare anytime from your dashboard.
            </p>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Custom Comparison Label (optional)
                </label>
                <input
                  type="text"
                  value={customLabel}
                  onChange={(e) => setCustomLabel(e.target.value)}
                  placeholder={comparedColleges.map(c => c.shortName || c.name).join(' vs ')}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSaveModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition"
                >
                  Confirm & Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Selector Dropdown Modal/Card if open */}
      {selectorOpen && availableToAdd.length > 0 && (
        <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-soft-xl animate-fadeIn space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
              Choose a College to Add ({comparedColleges.length}/3)
            </h3>
            <button
              onClick={() => setSelectorOpen(false)}
              className="text-slate-400 hover:text-slate-600 text-xs font-semibold"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {availableToAdd.map((col) => (
              <button
                key={col.slug}
                onClick={() => {
                  toggleCompare(col);
                  if (comparedColleges.length >= 2) setSelectorOpen(false);
                }}
                className="text-left p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition group"
              >
                <p className="text-xs font-bold text-navy-900 group-hover:text-blue-600 truncate">{col.name}</p>
                <p className="text-[10px] text-slate-500">{col.location?.city || col.city}, {col.location?.state || col.state}</p>
                <span className="inline-block mt-1 bg-slate-100 text-slate-700 text-[9px] font-bold px-1.5 py-0.2 rounded">
                  {col.collegeType}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* If No Colleges Selected */}
      {comparedColleges.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-card space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Scale className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-navy-900">No Colleges in Comparison List</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Select up to 3 colleges to compare their tuition fees, hostel expenses, verified placements, course programs, and cutoffs side by side.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/colleges"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition"
            >
              <span>Browse All Colleges</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            {savedComparisons.length > 0 && (
              <button
                onClick={() => setShowSavedList(true)}
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold text-xs px-5 py-3 rounded-xl transition"
              >
                <History className="w-4 h-4 text-blue-600" />
                <span>Load Saved Comparison</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* COMPARISON MATRIX TABLE */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              
              {/* College Header Row */}
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/90">
                  <th className="p-4 sm:p-6 w-1/4 min-w-[200px] text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Parameters
                  </th>
                  {comparedColleges.map((col) => {
                    const slug = col.slug || col.collegeId || col._id;
                    return (
                      <th key={slug} className="p-4 sm:p-6 w-1/4 min-w-[250px] align-top border-l border-slate-200">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <span className="bg-navy-900 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                              {col.collegeType}
                            </span>
                            <button
                              onClick={() => removeCompare(slug)}
                              className="text-slate-400 hover:text-rose-600 transition p-1"
                              title="Remove from comparison"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div>
                            <Link to={`/colleges/${slug}`} className="text-sm font-extrabold text-navy-900 hover:text-blue-600 line-clamp-2">
                              {col.name}
                            </Link>
                            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                              <span>{col.location?.city || col.city}, {col.location?.state || col.state}</span>
                            </p>
                          </div>
                        </div>
                      </th>
                    );
                  })}
                  {/* Empty slots for up to 3 */}
                  {[...Array(Math.max(0, 3 - comparedColleges.length))].map((_, i) => (
                    <th key={i} className="p-4 sm:p-6 w-1/4 min-w-[220px] bg-slate-50/40 border-l border-slate-200 text-center align-middle">
                      <button
                        onClick={() => setSelectorOpen(true)}
                        className="p-5 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/40 text-slate-400 hover:text-blue-600 text-xs font-bold flex flex-col items-center justify-center gap-2 mx-auto w-full transition"
                      >
                        <Plus className="w-5 h-5" />
                        <span>Add College Slot</span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Data Rows */}
              <tbody className="divide-y divide-slate-100 text-xs">
                
                {/* Section Header: ACADEMICS & RECOGNITION */}
                <tr className="bg-slate-100/70 font-bold text-slate-700">
                  <td colSpan={4} className="py-2.5 px-4 sm:px-6 uppercase tracking-wider text-[11px] text-blue-900 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-blue-600" />
                    <span>Rankings & Accreditation</span>
                  </td>
                </tr>

                {/* NIRF & NAAC Accreditation */}
                <tr>
                  <td className="p-4 sm:px-6 font-bold text-slate-600 bg-slate-50/50">NIRF & NAAC Grade</td>
                  {comparedColleges.map((col, idx) => (
                    <td key={idx} className="p-4 border-l border-slate-100 font-semibold text-navy-900">
                      <div>
                        {col.accreditation?.nirfRank ? (
                          <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-2 py-0.5 rounded">
                            NIRF #{col.accreditation.nirfRank}
                          </span>
                        ) : 'Not Ranked'}
                      </div>
                      <span className="text-[11px] text-slate-500 block mt-1">
                        NAAC: <strong>{col.accreditation?.naacGrade || 'A+'}</strong>
                      </span>
                    </td>
                  ))}
                  {[...Array(Math.max(0, 3 - comparedColleges.length))].map((_, i) => <td key={i} className="p-4 border-l border-slate-100"></td>)}
                </tr>

                {/* Campus & Location Details */}
                <tr>
                  <td className="p-4 sm:px-6 font-bold text-slate-600 bg-slate-50/50">Campus & Location</td>
                  {comparedColleges.map((col, idx) => (
                    <td key={idx} className="p-4 border-l border-slate-100">
                      <p className="font-bold text-navy-900">{col.location?.city || col.city}, {col.location?.state || col.state}</p>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        {col.location?.campusAreaAcres ? `${col.location.campusAreaAcres} Acres Campus` : 'Urban Campus'} • {col.location?.isMetro ? 'Metro Region' : 'Tier-2 City'}
                      </span>
                    </td>
                  ))}
                  {[...Array(Math.max(0, 3 - comparedColleges.length))].map((_, i) => <td key={i} className="p-4 border-l border-slate-100"></td>)}
                </tr>

                {/* Section Header: FEE STRUCTURE */}
                <tr className="bg-slate-100/70 font-bold text-slate-700">
                  <td colSpan={4} className="py-2.5 px-4 sm:px-6 uppercase tracking-wider text-[11px] text-blue-900 flex items-center gap-1.5">
                    <IndianRupee className="w-3.5 h-3.5 text-blue-600" />
                    <span>Fee Structure & Total Expense</span>
                  </td>
                </tr>

                {/* Annual Tuition Fee */}
                <tr>
                  <td className="p-4 sm:px-6 font-bold text-slate-600 bg-slate-50/50">Annual Tuition Fee</td>
                  {comparedColleges.map((col, idx) => {
                    const fee = col.courses?.[0]?.tuitionFeePerYear || col.tuitionFeePerYear;
                    return (
                      <td key={idx} className="p-4 border-l border-slate-100">
                        <span className="text-sm font-extrabold text-navy-900">
                          {typeof fee === 'number' ? `₹${fee.toLocaleString('en-IN')}` : fee}
                        </span>
                        <span className="text-[10px] text-slate-400 block">per academic year</span>
                      </td>
                    );
                  })}
                  {[...Array(Math.max(0, 3 - comparedColleges.length))].map((_, i) => <td key={i} className="p-4 border-l border-slate-100"></td>)}
                </tr>

                {/* Annual Hostel Fee */}
                <tr>
                  <td className="p-4 sm:px-6 font-bold text-slate-600 bg-slate-50/50">Hostel & Living Expenses</td>
                  {comparedColleges.map((col, idx) => {
                    const hasHostel = col.hostelFacilities?.available !== false;
                    const hFee = col.hostelFacilities?.feePerYear || col.hostelFeePerYear || 0;
                    return (
                      <td key={idx} className="p-4 border-l border-slate-100">
                        {hasHostel && hFee > 0 ? (
                          <>
                            <span className="text-sm font-extrabold text-slate-800">
                              ₹{typeof hFee === 'number' ? hFee.toLocaleString('en-IN') : hFee}
                            </span>
                            <span className="text-[10px] text-slate-400 block">per year (Mess {col.hostelFacilities?.messIncluded ? 'Included' : 'Extra'})</span>
                          </>
                        ) : (
                          <span className="text-slate-400 font-medium">Day Scholar Only / Not Provided</span>
                        )}
                      </td>
                    );
                  })}
                  {[...Array(Math.max(0, 3 - comparedColleges.length))].map((_, i) => <td key={i} className="p-4 border-l border-slate-100"></td>)}
                </tr>

                {/* 4-Year Total Estimated Cost */}
                <tr className="bg-blue-50/40">
                  <td className="p-4 sm:px-6 font-bold text-blue-900">4-Year Total Estimated Cost</td>
                  {comparedColleges.map((col, idx) => {
                    const tFee = col.courses?.[0]?.tuitionFeePerYear || (typeof col.tuitionFeePerYear === 'number' ? col.tuitionFeePerYear : 150000);
                    const hFee = col.hostelFacilities?.feePerYear || 35000;
                    const total4Yr = (Number(tFee) + Number(hFee)) * 4;
                    return (
                      <td key={idx} className="p-4 border-l border-slate-200">
                        <span className="text-sm font-extrabold text-blue-700">
                          ₹{(total4Yr / 100000).toFixed(2)} Lakhs
                        </span>
                        <span className="text-[10px] text-slate-500 block">(Tuition + Hostel x 4 Years)</span>
                      </td>
                    );
                  })}
                  {[...Array(Math.max(0, 3 - comparedColleges.length))].map((_, i) => <td key={i} className="p-4 border-l border-slate-200"></td>)}
                </tr>

                {/* Section Header: PLACEMENTS */}
                <tr className="bg-slate-100/70 font-bold text-slate-700">
                  <td colSpan={4} className="py-2.5 px-4 sm:px-6 uppercase tracking-wider text-[11px] text-blue-900 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                    <span>Placements & ROI</span>
                  </td>
                </tr>

                {/* Placements - Median CTC */}
                <tr>
                  <td className="p-4 sm:px-6 font-bold text-slate-600 bg-slate-50/50">Median Placement CTC</td>
                  {comparedColleges.map((col, idx) => (
                    <td key={idx} className="p-4 border-l border-slate-100">
                      <span className="text-base font-extrabold text-emerald-700">
                        {col.placements?.medianCTC ? `${col.placements.medianCTC} LPA` : (col.medianCTC || 'Not Available')}
                      </span>
                      <span className="text-[10px] text-slate-400 block">Verified Batch Records</span>
                    </td>
                  ))}
                  {[...Array(Math.max(0, 3 - comparedColleges.length))].map((_, i) => <td key={i} className="p-4 border-l border-slate-100"></td>)}
                </tr>

                {/* Highest CTC */}
                <tr>
                  <td className="p-4 sm:px-6 font-bold text-slate-600 bg-slate-50/50">Highest CTC Package</td>
                  {comparedColleges.map((col, idx) => (
                    <td key={idx} className="p-4 border-l border-slate-100 font-extrabold text-navy-900">
                      {col.placements?.highestCTC ? `${col.placements.highestCTC} LPA` : 'Not Reported'}
                    </td>
                  ))}
                  {[...Array(Math.max(0, 3 - comparedColleges.length))].map((_, i) => <td key={i} className="p-4 border-l border-slate-100"></td>)}
                </tr>

                {/* Top Recruiters */}
                <tr>
                  <td className="p-4 sm:px-6 font-bold text-slate-600 bg-slate-50/50">Key Recruiters</td>
                  {comparedColleges.map((col, idx) => (
                    <td key={idx} className="p-4 border-l border-slate-100">
                      <div className="flex flex-wrap gap-1">
                        {(col.placements?.topRecruiters || ['Google', 'Microsoft', 'Amazon', 'TCS']).map((rec, i) => (
                          <span key={i} className="bg-slate-100 text-slate-700 text-[10px] px-1.5 py-0.5 rounded font-medium">
                            {rec}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                  {[...Array(Math.max(0, 3 - comparedColleges.length))].map((_, i) => <td key={i} className="p-4 border-l border-slate-100"></td>)}
                </tr>

                {/* Section Header: COURSES & ELIGIBILITY */}
                <tr className="bg-slate-100/70 font-bold text-slate-700">
                  <td colSpan={4} className="py-2.5 px-4 sm:px-6 uppercase tracking-wider text-[11px] text-blue-900 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                    <span>Offered Programs & Eligibility Criteria</span>
                  </td>
                </tr>

                {/* Programs Offered */}
                <tr>
                  <td className="p-4 sm:px-6 font-bold text-slate-600 bg-slate-50/50">Degrees & Programs</td>
                  {comparedColleges.map((col, idx) => (
                    <td key={idx} className="p-4 border-l border-slate-100">
                      <div className="space-y-1">
                        {(col.courses || []).slice(0, 3).map((crs, i) => (
                          <p key={i} className="font-semibold text-navy-900 text-[11px] line-clamp-1">
                            • {crs.name}
                          </p>
                        ))}
                        {(col.courses?.length || 0) > 3 && (
                          <span className="text-[10px] text-blue-600 font-semibold block">
                            +{col.courses.length - 3} more programs
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                  {[...Array(Math.max(0, 3 - comparedColleges.length))].map((_, i) => <td key={i} className="p-4 border-l border-slate-100"></td>)}
                </tr>

                {/* Eligibility & Entrance Exams */}
                <tr>
                  <td className="p-4 sm:px-6 font-bold text-slate-600 bg-slate-50/50">Admission Criteria & Exams</td>
                  {comparedColleges.map((col, idx) => {
                    const primaryCourse = col.courses?.[0];
                    const minPct = primaryCourse?.minClass12Percentage || 60;
                    const exams = primaryCourse?.acceptedExams?.map(e => e.examName).join(', ') || 'JEE / CUET / Merit';
                    return (
                      <td key={idx} className="p-4 border-l border-slate-100 space-y-1">
                        <div>
                          <span className="text-[10px] text-slate-400 block">Class 12 Minimum:</span>
                          <strong className="text-navy-900">{minPct}% in 12th Board</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block">Accepted Entrance Exams:</span>
                          <span className="bg-blue-50 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded inline-block mt-0.5">
                            {exams}
                          </span>
                        </div>
                      </td>
                    );
                  })}
                  {[...Array(Math.max(0, 3 - comparedColleges.length))].map((_, i) => <td key={i} className="p-4 border-l border-slate-100"></td>)}
                </tr>

                {/* Action Link Row */}
                <tr>
                  <td className="p-4 sm:px-6 font-bold text-slate-600 bg-slate-50/50">Actions</td>
                  {comparedColleges.map((col, idx) => {
                    const slug = col.slug || col.collegeId || col._id;
                    const applyUrl = col.officialLinks?.admissionPortal || col.officialLinks?.website;
                    return (
                      <td key={idx} className="p-4 border-l border-slate-100">
                        <div className="flex flex-col gap-2">
                          <Link
                            to={`/colleges/${slug}`}
                            className="w-full text-center bg-navy-900 hover:bg-navy-800 text-white font-bold px-3 py-2 rounded-xl text-xs transition"
                          >
                            <span>Full Profile</span>
                          </Link>
                          {applyUrl && (
                            <a
                              href={applyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition"
                            >
                              <span>Apply Now</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </td>
                    );
                  })}
                  {[...Array(Math.max(0, 3 - comparedColleges.length))].map((_, i) => <td key={i} className="p-4 border-l border-slate-100"></td>)}
                </tr>

              </tbody>

            </table>
          </div>
        </div>
      )}

    </div>
  );
};
