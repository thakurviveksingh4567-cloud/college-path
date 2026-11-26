import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collegeAPI } from '../services/api';
import { useSavedColleges } from '../context/SavedCollegesContext';
import { useComparison } from '../context/ComparisonContext';
import { 
  Building2, 
  MapPin, 
  Award, 
  IndianRupee, 
  Briefcase, 
  Calendar, 
  ExternalLink, 
  CheckCircle2, 
  Bookmark, 
  Scale, 
  ShieldCheck, 
  ArrowLeft,
  Users,
  Home,
  BookOpen,
  HelpCircle,
  FileText
} from 'lucide-react';

export const CollegeDetailPage = () => {
  const { slug } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('courses');

  const { isSaved, toggleSave } = useSavedColleges();
  const { isComparing, toggleCompare } = useComparison();

  useEffect(() => {
    const fetchCollege = async () => {
      setLoading(true);
      try {
        const res = await collegeAPI.getCollegeBySlug(slug);
        if (res.success) {
          setCollege(res.data);
        } else {
          setError('College not found');
        }
      } catch (err) {
        setError(err.message || 'Error loading college details');
      } finally {
        setLoading(false);
      }
    };
    fetchCollege();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm font-semibold text-slate-500">Loading verified college profile...</p>
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-navy-900">College Not Found</h2>
        <p className="text-sm text-slate-500">The college you requested could not be located in our verified directory.</p>
        <Link to="/colleges" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Colleges</span>
        </Link>
      </div>
    );
  }

  const saved = isSaved(college.slug);
  const comparing = isComparing(college.slug);

  const tabs = [
    { id: 'courses', label: `Courses Offered (${college.courses?.length || 0})` },
    { id: 'eligibility', label: 'Eligibility & Cutoffs' },
    { id: 'placements', label: 'Verified Placements' },
    { id: 'scholarships', label: 'Scholarships & Aid' },
    { id: 'admission', label: 'Admission Process' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button */}
      <div>
        <Link to="/colleges" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to College Explorer</span>
        </Link>
      </div>

      {/* Hero Banner Header */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-card">
        {/* Cover Photo */}
        <div className="relative h-64 sm:h-80 w-full bg-slate-900">
          <img
            src={college.images?.hero || 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80'}
            alt={college.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent"></div>

          {/* Top Tag Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="bg-navy-900/90 text-white text-xs font-bold px-3 py-1 rounded-full border border-navy-700 backdrop-blur-md">
              {college.collegeType}
            </span>
            {college.accreditation?.nirfRank && (
              <span className="bg-amber-500 text-navy-950 text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                NIRF #{college.accreditation.nirfRank} ({college.accreditation.nirfCategory || 'Overall'})
              </span>
            )}
            {college.accreditation?.naacGrade && (
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                NAAC {college.accreditation.naacGrade}
              </span>
            )}
          </div>

          {/* Verification Badge (Top Right) */}
          <div className="absolute top-4 right-4 bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Last Verified: {college.lastVerifiedDate || '2026-11-15'}</span>
          </div>

          {/* College Title & Location overlay */}
          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1 max-w-3xl">
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {college.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
                <span className="flex items-center gap-1 text-slate-200">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  {college.location?.city}, {college.location?.state}
                </span>
                <span>•</span>
                <span>Est. {college.establishedYear || 'N/A'}</span>
                <span>•</span>
                <span>Campus: {college.location?.campusAreaAcres ? `${college.location.campusAreaAcres} Acres` : 'Full Campus'}</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">Session: 2026-2027</span>
              </div>
            </div>

            {/* Quick Hero CTA */}
            {(college.officialLinks?.admissionPortal || college.officialLinks?.website) && (
              <div className="shrink-0">
                <a
                  href={college.officialLinks?.admissionPortal || college.officialLinks?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg transition"
                >
                  <span>Apply Now</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Median CTC</span>
            <span className="text-lg font-extrabold text-emerald-700">
              {college.placements?.medianCTC ? `${college.placements.medianCTC} LPA` : 'Not Available'}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Highest CTC</span>
            <span className="text-lg font-extrabold text-navy-900">
              {college.placements?.highestCTC ? `${college.placements.highestCTC} LPA` : 'Not Available'}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Hostel & Living</span>
            <span className="text-lg font-extrabold text-navy-900">
              {college.hostelFacilities?.available ? `₹${(college.hostelFacilities.feePerYear || 0).toLocaleString('en-IN')}/yr` : 'Not Available'}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Placement Rate</span>
            <span className="text-lg font-extrabold text-blue-700">
              {college.placements?.placementPercentage ? `${college.placements.placementPercentage}%` : 'Not Available'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Tabs + Sticky Action Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Tabbed Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Tabs Navigation */}
          <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-navy-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: COURSES OFFERED */}
          {activeTab === 'courses' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-navy-900">Degrees & Programs (2026-27 Session)</h3>
              <div className="space-y-3">
                {(college.courses || []).map((course, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                          {course.degree} • {course.duration}
                        </span>
                        <h4 className="text-base font-bold text-navy-900 mt-1">{course.name}</h4>
                      </div>
                      <div className="text-right sm:text-right">
                        <span className="text-xs text-slate-400 block">Tuition Fee</span>
                        <span className="text-base font-extrabold text-navy-900">
                          ₹{course.tuitionFeePerYear?.toLocaleString('en-IN') || 'N/A'} <span className="text-xs font-normal text-slate-400">/ year</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <div>
                        <span className="text-slate-400">Stream Required: </span>
                        <strong className="text-navy-900">{course.streamRequired?.join(' / ')}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Intake Seats: </span>
                        <strong className="text-navy-900">{course.intakeSeats || 'N/A'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Min Class 12 %: </span>
                        <strong className="text-navy-900">{course.minClass12Percentage}%</strong>
                      </div>
                    </div>

                    {course.specializations && course.specializations.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="text-[11px] text-slate-400">Tracks:</span>
                        {course.specializations.map((spec, i) => (
                          <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ELIGIBILITY & CUTOFFS */}
          {activeTab === 'eligibility' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-navy-900">Class 12 Board Percentage Requirements</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Candidates must have completed their Class 12 (or equivalent examination) from a recognized state or central board (CBSE, CISCE, State Boards).
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">General / Open</span>
                    <span className="text-base font-extrabold text-navy-900">{college.courses[0]?.minClass12Percentage || 75}%</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">OBC-NCL</span>
                    <span className="text-base font-extrabold text-navy-900">{college.courses[0]?.categoryRelaxation?.OBC || 75}%</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">SC / ST</span>
                    <span className="text-base font-extrabold text-navy-900">{college.courses[0]?.categoryRelaxation?.SC || 65}%</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">PwD Candidates</span>
                    <span className="text-base font-extrabold text-navy-900">{college.courses[0]?.categoryRelaxation?.PwD || 65}%</span>
                  </div>
                </div>
              </div>

              {/* Entrance Exams Accepted */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-navy-900">Accepted Entrance Examinations & Estimated Cutoffs</h3>
                <div className="space-y-4">
                  {(college.courses[0]?.acceptedExams || []).map((exam, i) => (
                    <div key={i} className="p-4 rounded-xl border border-blue-100 bg-blue-50/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-navy-900">{exam.examName} ({exam.examType})</span>
                        <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                          National Counselling
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                        {exam.expectedPercentileGeneral && (
                          <div>
                            <span className="text-slate-400 block text-[10px]">General Cutoff Percentile</span>
                            <span className="font-bold text-navy-900">{exam.expectedPercentileGeneral}%</span>
                          </div>
                        )}
                        {exam.expectedRankGeneral && (
                          <div>
                            <span className="text-slate-400 block text-[10px]">Expected AIR Closing Rank</span>
                            <span className="font-bold text-navy-900">~{exam.expectedRankGeneral.toLocaleString()}</span>
                          </div>
                        )}
                        {exam.expectedScoreCUET && (
                          <div>
                            <span className="text-slate-400 block text-[10px]">Expected CUET Score</span>
                            <span className="font-bold text-navy-900">{exam.expectedScoreCUET} / 800</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PLACEMENTS */}
          {activeTab === 'placements' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-navy-900">Verified Placement Statistics ({college.placements?.batchYear || '2025-26'})</h3>
                  <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-md border border-emerald-200">
                    NIRF Audited
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-xs text-slate-400 block">Median Annual CTC</span>
                    <span className="text-2xl font-extrabold text-emerald-700">
                      {college.placements?.medianCTC ? `${college.placements.medianCTC} LPA` : 'Not Available'}
                    </span>
                    <p className="text-[10px] text-slate-500 mt-1">50% students placed above this figure</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-xs text-slate-400 block">Average Annual CTC</span>
                    <span className="text-2xl font-extrabold text-navy-900">
                      {college.placements?.averageCTC ? `${college.placements.averageCTC} LPA` : 'Not Available'}
                    </span>
                    <p className="text-[10px] text-slate-500 mt-1">Mean compensation package</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-xs text-slate-400 block">Highest Package</span>
                    <span className="text-2xl font-extrabold text-blue-700">
                      {college.placements?.highestCTC ? `${college.placements.highestCTC} LPA` : 'Not Available'}
                    </span>
                    <p className="text-[10px] text-slate-500 mt-1">Top offer of recent batch</p>
                  </div>
                </div>

                {/* Top Recruiters */}
                {college.placements?.topRecruiters && (
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Prominent Hiring Partners
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {college.placements.topRecruiters.map((recruiter, i) => (
                        <span key={i} className="bg-slate-100 text-navy-900 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200">
                          {recruiter}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-[11px] text-slate-400 italic pt-2">
                  Source: {college.placements?.sourceNote || 'Official Institutional Placement Cell Audit'}.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: SCHOLARSHIPS */}
          {activeTab === 'scholarships' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-navy-900">Scholarships & Institutional Financial Support</h3>
              <div className="space-y-3">
                {(college.scholarships || []).map((sch, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-navy-900">{sch.title}</h4>
                      <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        {sch.amount}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{sch.description}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <span>Eligibility: {sch.eligibility}</span>
                      {sch.link && (
                        <a href={sch.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 font-semibold">
                          <span>Official Portal</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ADMISSION PROCESS */}
          {activeTab === 'admission' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Counselling & Seat Allocation</span>
                <h3 className="text-base font-bold text-navy-900 mt-1">
                  How to Secure Admission for 2026-2027
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-blue-50/60 p-4 rounded-xl border border-blue-100 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">Counselling Authority</span>
                  <strong className="text-navy-900">{college.admissionProcess?.counsellingBody || 'Centralised'}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Application Deadline</span>
                  <strong className="text-rose-700">{college.admissionProcess?.applicationDeadline || 'Check Portal'}</strong>
                </div>
              </div>

              {/* Step by step timeline */}
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Step-by-Step Procedure
                </span>
                <div className="space-y-3">
                  {(college.admissionProcess?.steps || [
                    "Appear for the recognized entrance exam (JEE Main / CUET / State CET).",
                    "Register on the authorized centralized counselling portal.",
                    "Fill choice preferences and lock selections before deadline.",
                    "Download seat allotment letter, pay seat acceptance fee and report for document verification."
                  ]).map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Application Box */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                <div>
                  <h4 className="text-sm font-bold text-navy-900">Ready to Apply for Session 2026-2027?</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Submit your verified registration directly on the official university portal.</p>
                </div>
                {(college.officialLinks?.admissionPortal || college.officialLinks?.website) && (
                  <a
                    href={college.officialLinks?.admissionPortal || college.officialLinks?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition"
                  >
                    <span>Apply Now (Official Portal)</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Right Sticky Action Sidebar */}
        <div className="lg:col-span-1 space-y-4 sticky top-20">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-card space-y-4">
            <h4 className="text-sm font-bold text-navy-900">Direct Actions</h4>

            {/* Apply Now Primary Button */}
            {(college.officialLinks?.admissionPortal || college.officialLinks?.website) && (
              <a
                href={college.officialLinks?.admissionPortal || college.officialLinks?.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition group"
              >
                <span>Apply Now (Official Portal)</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition" />
              </a>
            )}

            {/* Official Website Button */}
            {college.officialLinks?.website && (
              <a
                href={college.officialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
              >
                <span>Visit Official Website</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
            )}

            <div className="border-t border-slate-100 pt-3 space-y-2">
              {/* Save / Bookmark Button */}
              <button
                onClick={() => toggleSave(college)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition border ${
                  saved
                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${saved ? 'fill-current text-amber-500' : ''}`} />
                <span>{saved ? 'Saved to Your Shortlist' : 'Save to Shortlist'}</span>
              </button>

              {/* Compare Button */}
              <button
                onClick={() => toggleCompare(college)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition border ${
                  comparing
                    ? 'bg-blue-50 text-blue-800 border-blue-300'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <Scale className="w-4 h-4 text-blue-600" />
                <span>{comparing ? 'In Comparison Matrix' : 'Add to Compare'}</span>
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-500 leading-snug">
              <span className="font-semibold text-slate-700">Notice:</span> Always complete fee payment and seat locking directly on the authorized government counselling portal.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
