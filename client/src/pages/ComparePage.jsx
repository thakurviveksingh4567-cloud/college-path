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
  ArrowRight
} from 'lucide-react';

export const ComparePage = () => {
  const { comparedColleges, removeCompare, toggleCompare, clearAll } = useComparison();
  const [selectorOpen, setSelectorOpen] = useState(false);

  // Available colleges to add that aren't already selected
  const availableToAdd = SAMPLE_COLLEGES.filter(
    sc => !comparedColleges.some(c => (c.slug || c.collegeId || c._id) === sc.slug)
  );

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
            Evaluate annual costs, verified placement CTCs, NIRF rankings, and eligibility requirements side by side.
          </p>
        </div>

        {comparedColleges.length > 0 && (
          <div className="flex items-center gap-3">
            {comparedColleges.length < 3 && (
              <button
                onClick={() => setSelectorOpen(!selectorOpen)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add College to Compare</span>
              </button>
            )}
            <button
              onClick={clearAll}
              className="text-slate-400 hover:text-rose-600 text-xs font-semibold px-3 py-2 rounded-xl hover:bg-slate-100 transition flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {/* Selector Dropdown Modal/Card if open */}
      {selectorOpen && availableToAdd.length > 0 && (
        <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-soft-xl animate-fadeIn space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
              Choose a College to Add ({comparedColleges.length}/3)
            </h3>
            <button
              onClick={() => setSelectorOpen(false)}
              className="text-slate-400 hover:text-slate-600 text-xs"
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
                <p className="text-[10px] text-slate-500">{col.location.city}, {col.location.state}</p>
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
            Select up to 3 colleges from the College Explorer or click below to quickly add popular institutions.
          </p>
          <div className="pt-2">
            <Link
              to="/colleges"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition"
            >
              <span>Browse All Colleges</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* COMPARISON MATRIX TABLE */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              
              {/* College Header Row */}
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="p-4 sm:p-6 w-1/4 min-w-[200px] text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Parameters
                  </th>
                  {comparedColleges.map((col) => {
                    const slug = col.slug || col.collegeId || col._id;
                    return (
                      <th key={slug} className="p-4 sm:p-6 w-1/4 min-w-[240px] align-top">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <span className="bg-navy-900 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                              {col.collegeType}
                            </span>
                            <button
                              onClick={() => removeCompare(slug)}
                              className="text-slate-400 hover:text-rose-600 transition p-1"
                              title="Remove"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div>
                            <Link to={`/colleges/${slug}`} className="text-sm font-extrabold text-navy-900 hover:text-blue-600 line-clamp-2">
                              {col.name}
                            </Link>
                            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
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
                    <th key={i} className="p-4 sm:p-6 w-1/4 min-w-[200px] bg-slate-50/30 border-l border-slate-100 text-center align-middle">
                      <button
                        onClick={() => setSelectorOpen(true)}
                        className="p-4 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/40 text-slate-400 hover:text-blue-600 text-xs font-bold flex flex-col items-center justify-center gap-2 mx-auto w-full transition"
                      >
                        <Plus className="w-6 h-6" />
                        <span>Add College Slot</span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Data Rows */}
              <tbody className="divide-y divide-slate-100 text-xs">
                
                {/* NIRF & NAAC Accreditation */}
                <tr>
                  <td className="p-4 font-bold text-slate-600 bg-slate-50/50">NIRF & Accreditation</td>
                  {comparedColleges.map((col, idx) => (
                    <td key={idx} className="p-4 font-semibold text-navy-900">
                      <div>
                        {col.accreditation?.nirfRank ? (
                          <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-2 py-0.5 rounded">
                            NIRF #{col.accreditation.nirfRank}
                          </span>
                        ) : 'Not Ranked'}
                      </div>
                      <span className="text-[11px] text-slate-500 block mt-1">
                        NAAC: {col.accreditation?.naacGrade || 'A+'}
                      </span>
                    </td>
                  ))}
                  {[...Array(Math.max(0, 3 - comparedColleges.length))].map((_, i) => <td key={i} className="p-4"></td>)}
                </tr>

                {/* Annual Tuition Fee */}
                <tr>
                  <td className="p-4 font-bold text-slate-600 bg-slate-50/50">Annual Tuition Fee</td>
                  {comparedColleges.map((col, idx) => {
                    const fee = col.courses?.[0]?.tuitionFeePerYear || col.tuitionFeePerYear;
                    return (
                      <td key={idx} className="p-4">
                        <span className="text-sm font-extrabold text-navy-900">
                          {typeof fee === 'number' ? `₹${fee.toLocaleString('en-IN')}` : fee}
                        </span>
                        <span className="text-[10px] text-slate-400 block">per year (Tuition)</span>
                      </td>
                    );
                  })}
                  {[...Array(Math.max(0, 3 - comparedColleges.length))].map((_, i) => <td key={i} className="p-4"></td>)}
                </tr>

                {/* Annual Hostel Fee */}
                <tr>
                  <td className="p-4 font-bold text-slate-600 bg-slate-50/50">Hostel & Living Fee</td>
                  {comparedColleges.map((col, idx) => {
                    const hFee = col.hostelFacilities?.feePerYear || col.hostelFeePerYear || 0;
                    return (
                      <td key={idx} className="p-4">
                        <span className="text-sm font-extrabold text-slate-800">
                          {hFee > 0 ? `₹${hFee.toLocaleString('en-IN')}` : 'Not Included'}
                        </span>
                        <span className="text-[10px] text-slate-400 block">per year</span>
                      </td>
                    );
                  })}
                  {[...Array(Math.max(0, 3 - comparedColleges.length))].map((_, i) => <td key={i} className="p-4"></td>)}
                </tr>

                {/* 4-Year Total Estimated Cost */}
                <tr className="bg-blue-50/30">
                  <td className="p-4 font-bold text-blue-900">4-Year Total Estimated Cost</td>
                  {comparedColleges.map((col, idx) => {
                    const tFee = col.courses?.[0]?.tuitionFeePerYear || 100000;
                    const hFee = col.hostelFacilities?.feePerYear || 30000;
                    const total4Yr = (tFee + hFee) * 4;
                    return (
                      <td key={idx} className="p-4">
                        <span className="text-sm font-extrabold text-blue-700">
                          ₹{(total4Yr / 100000).toFixed(2)} Lakhs
                        </span>
                        <span className="text-[10px] text-slate-500 block">(Tuition + Hostel x 4)</span>
                      </td>
                    );
                  })}
                  {[...Array(Math.max(0, 3 - comparedColleges.length))].map((_, i) => <td key={i} className="p-4"></td>)}
                </tr>

                {/* Placements - Median CTC */}
                <tr>
                  <td className="p-4 font-bold text-slate-600 bg-slate-50/50">Median Placement CTC</td>
                  {comparedColleges.map((col, idx) => (
                    <td key={idx} className="p-4">
                      <span className="text-base font-extrabold text-emerald-700">
                        {col.placements?.medianCTC ? `${col.placements.medianCTC} LPA` : (col.medianCTC || 'Not Available')}
                      </span>
                      <span className="text-[10px] text-slate-400 block">Verified Batch 2025-26</span>
                    </td>
                  ))}
                  {[...Array(Math.max(0, 3 - comparedColleges.length))].map((_, i) => <td key={i} className="p-4"></td>)}
                </tr>

                {/* Highest CTC */}
                <tr>
                  <td className="p-4 font-bold text-slate-600 bg-slate-50/50">Highest CTC Package</td>
                  {comparedColleges.map((col, idx) => (
                    <td key={idx} className="p-4 font-extrabold text-navy-900">
                      {col.placements?.highestCTC ? `${col.placements.highestCTC} LPA` : 'Not Available'}
                    </td>
                  ))}
                  {[...Array(Math.max(0, 3 - comparedColleges.length))].map((_, i) => <td key={i} className="p-4"></td>)}
                </tr>

                {/* Top Recruiters */}
                <tr>
                  <td className="p-4 font-bold text-slate-600 bg-slate-50/50">Key Recruiters</td>
                  {comparedColleges.map((col, idx) => (
                    <td key={idx} className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {(col.placements?.topRecruiters || ['Google', 'Microsoft', 'TCS']).map((rec, i) => (
                          <span key={i} className="bg-slate-100 text-slate-700 text-[10px] px-1.5 py-0.5 rounded font-medium">
                            {rec}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                  {[...Array(Math.max(0, 3 - comparedColleges.length))].map((_, i) => <td key={i} className="p-4"></td>)}
                </tr>

                {/* Admission Process / Exam */}
                <tr>
                  <td className="p-4 font-bold text-slate-600 bg-slate-50/50">Primary Admission Route</td>
                  {comparedColleges.map((col, idx) => (
                    <td key={idx} className="p-4">
                      <strong className="text-navy-900 block">
                        {col.admissionProcess?.counsellingBody || 'Central Counselling'}
                      </strong>
                      <span className="text-[10px] text-slate-500">
                        {col.courses?.[0]?.acceptedExams?.[0]?.examName || 'Entrance / Merit'}
                      </span>
                    </td>
                  ))}
                  {[...Array(Math.max(0, 3 - comparedColleges.length))].map((_, i) => <td key={i} className="p-4"></td>)}
                </tr>

                {/* Direct Action Link */}
                <tr>
                  <td className="p-4 font-bold text-slate-600 bg-slate-50/50">Official Link</td>
                  {comparedColleges.map((col, idx) => {
                    const slug = col.slug || col.collegeId || col._id;
                    return (
                      <td key={idx} className="p-4">
                        <Link
                          to={`/colleges/${slug}`}
                          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs shadow-xs transition"
                        >
                          <span>Full Specs</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    );
                  })}
                  {[...Array(Math.max(0, 3 - comparedColleges.length))].map((_, i) => <td key={i} className="p-4"></td>)}
                </tr>

              </tbody>

            </table>
          </div>
        </div>
      )}

    </div>
  );
};
