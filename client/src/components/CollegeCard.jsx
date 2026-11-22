import React from 'react';
import { Link } from 'react-router-dom';
import { useSavedColleges } from '../context/SavedCollegesContext';
import { useComparison } from '../context/ComparisonContext';
import { MatchBadge } from './MatchBadge';
import { 
  MapPin, 
  Award, 
  IndianRupee, 
  Briefcase, 
  Check, 
  Bookmark, 
  Scale, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const CollegeCard = ({ college, matchInfo }) => {
  const { isSaved, toggleSave } = useSavedColleges();
  const { isComparing, toggleCompare } = useComparison();

  const slug = college.slug || college.collegeId || college._id;
  const saved = isSaved(slug);
  const comparing = isComparing(slug);

  // Extract key metrics
  const minTuition = college.courses && college.courses.length > 0 
    ? Math.min(...college.courses.map(c => c.tuitionFeePerYear || 0))
    : (college.tuitionFeePerYear || 0);

  const hostelCost = college.hostelFacilities?.feePerYear || college.hostelFeePerYear || 0;
  const medianCTC = college.placements?.medianCTC ? `${college.placements.medianCTC} LPA` : (college.medianCTC || 'Not Available');
  const nirfRank = college.accreditation?.nirfRank || college.nirfRank;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-soft-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group">
      
      {/* College Image Banner */}
      <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
        <img
          src={college.images?.hero || 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80'}
          alt={college.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent"></div>

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="bg-navy-900/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-navy-700 backdrop-blur-xs">
            {college.collegeType}
          </span>
          {college.accreditation?.naacGrade && (
            <span className="bg-blue-600/90 text-white text-[11px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
              NAAC {college.accreditation.naacGrade}
            </span>
          )}
        </div>

        {/* Top Right Save & Compare Buttons */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleCompare(college);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition shadow-sm ${
              comparing
                ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                : 'bg-white/80 text-slate-700 hover:bg-white hover:text-blue-600'
            }`}
            title={comparing ? 'Remove from comparison' : 'Compare college'}
          >
            <Scale className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              toggleSave(college);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition shadow-sm ${
              saved
                ? 'bg-amber-500 text-white ring-2 ring-amber-300'
                : 'bg-white/80 text-slate-700 hover:bg-white hover:text-amber-500'
            }`}
            title={saved ? 'Remove from saved' : 'Save to shortlist'}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Location & NIRF Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1 text-slate-200 truncate">
            <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="truncate">{college.location?.city || college.city}, {college.location?.state || college.state}</span>
          </div>
          {nirfRank && nirfRank !== 'Not Available' && (
            <span className="bg-amber-500/90 text-navy-950 font-bold px-2 py-0.5 rounded text-[10px] shrink-0">
              NIRF #{nirfRank}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Match Info Badge if present */}
          {matchInfo && (
            <div className="mb-3">
              <MatchBadge status={matchInfo.matchStatus} score={matchInfo.matchScore} size="sm" />
            </div>
          )}

          {/* College Name */}
          <Link to={`/colleges/${slug}`} className="block">
            <h3 className="text-base font-bold text-navy-900 group-hover:text-blue-600 transition-colors line-clamp-1">
              {college.name}
            </h3>
            <p className="text-xs text-slate-500 font-medium line-clamp-1 mt-0.5">
              {college.shortName} • Est. {college.establishedYear || 'N/A'}
            </p>
          </Link>

          {/* Popular Courses Pills */}
          <div className="mt-3 flex flex-wrap gap-1">
            {(college.courses || []).slice(0, 3).map((c, i) => (
              <span
                key={i}
                className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200/60"
              >
                {c.name.split(' ')[0]} {c.name.includes('CSE') ? 'CSE' : (c.name.includes('AI') ? 'AI' : c.degree)}
              </span>
            ))}
            {(college.courses || []).length > 3 && (
              <span className="text-[10px] text-slate-400 font-medium px-1 py-0.5">
                +{college.courses.length - 3} more
              </span>
            )}
          </div>

          {/* Match Reason highlights if in Predictor mode */}
          {matchInfo && matchInfo.reasons && matchInfo.reasons.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
              {matchInfo.reasons.slice(0, 2).map((r, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-[11px] text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{r}</span>
                </div>
              ))}
              {matchInfo.warnings && matchInfo.warnings.length > 0 && (
                <div className="flex items-start gap-1.5 text-[11px] text-amber-800">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{matchInfo.warnings[0]}</span>
                </div>
              )}
            </div>
          )}

          {/* Key Stats Grid */}
          <div className="mt-4 grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
            <div>
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">Tuition / Year</span>
              <span className="font-bold text-navy-900 flex items-center">
                <IndianRupee className="w-3 h-3 text-slate-400" />
                {typeof minTuition === 'number' ? minTuition.toLocaleString('en-IN') : minTuition}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">Median Placement</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <Briefcase className="w-3 h-3 text-emerald-500" />
                {medianCTC}
              </span>
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Verified 2026</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/colleges/${slug}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline py-1 px-2 rounded-md hover:bg-blue-50 transition"
            >
              <span>Explore Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
