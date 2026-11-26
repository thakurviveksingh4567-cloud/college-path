import React, { useState, useEffect } from 'react';
import { scholarshipAPI } from '../services/api';
import { 
  Award, 
  ExternalLink, 
  Search, 
  Calendar, 
  IndianRupee, 
  ShieldCheck, 
  CheckCircle2, 
  Users,
  Filter,
  GraduationCap,
  Building,
  Info
} from 'lucide-react';

export const ScholarshipsPage = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [stream, setStream] = useState('All');
  const [type, setType] = useState('All');
  const [gender, setGender] = useState('All');

  useEffect(() => {
    const fetchScholarships = async () => {
      setLoading(true);
      try {
        const query = {};
        if (search) query.search = search;
        if (stream !== 'All') query.stream = stream;
        if (gender !== 'All') query.gender = gender;

        const res = await scholarshipAPI.getScholarships(query);
        if (res.success) {
          let data = res.data;
          if (type !== 'All') {
            data = data.filter(s => s.type === type);
          }
          setScholarships(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarships();
  }, [search, stream, type, gender]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white rounded-3xl p-6 sm:p-10 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-400/30">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Government & Corporate Financial Aid Finder</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Verified Scholarships for Class 12 Students
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Discover legitimate merit-based and need-based scholarships, full tuition fee waivers, and central sector schemes for the 2026-2027 academic session.
          </p>
        </div>

        <div className="bg-navy-800/80 p-4 rounded-2xl border border-navy-700 text-xs space-y-2 shrink-0 text-slate-300 max-w-xs">
          <p className="font-bold text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Verified Official Portals</span>
          </p>
          <p className="text-[11px] text-slate-400 leading-normal">
            CollegePath only indexes genuine government and corporate foundation programs (NSP, AICTE, DST INSPIRE, Tata, Reliance). No unverified or fabricated listings.
          </p>
        </div>
      </div>

      {/* Filters & Search Row */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-card flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="w-full lg:w-96 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by scholarship title, provider, or scheme..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          <div>
            <select
              value={stream}
              onChange={(e) => setStream(e.target.value)}
              className="py-2 px-3 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Streams</option>
              <option value="PCM">PCM (Engineering/Tech)</option>
              <option value="PCB">PCB (Medical/Sciences)</option>
              <option value="Commerce">Commerce & Business</option>
              <option value="Arts">Arts & Humanities</option>
            </select>
          </div>

          <div>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="py-2 px-3 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Providers</option>
              <option value="Government Central">Government Central (NSP/Ministry)</option>
              <option value="Corporate CSR">Corporate CSR Foundations</option>
            </select>
          </div>

          <div>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="py-2 px-3 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Candidates</option>
              <option value="Female Only">Female Students Only</option>
            </select>
          </div>

          {(search || stream !== 'All' || type !== 'All' || gender !== 'All') && (
            <button
              onClick={() => {
                setSearch('');
                setStream('All');
                setType('All');
                setGender('All');
              }}
              className="text-xs text-rose-600 hover:text-rose-700 font-bold px-2 py-1"
            >
              Reset Filters
            </button>
          )}
        </div>

      </div>

      {/* Authenticity Disclaimer Pill */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 flex items-start sm:items-center gap-3 text-xs text-blue-900">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5 sm:mt-0" />
        <p className="leading-relaxed">
          <strong>Direct Official Access:</strong> All links direct you to official National Scholarship Portal (NSP) or registered foundation systems. Never pay any fee or broker for scholarship applications.
        </p>
      </div>

      {/* Scholarships Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-64 bg-slate-100 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : scholarships.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-card space-y-3">
          <Award className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-navy-900">No Scholarships Matching Filters</h3>
          <p className="text-xs text-slate-500">Try broadening your stream or clear the search criteria to view all available aid schemes.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scholarships.map((sch) => (
            <div
              key={sch.slug}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-card hover:shadow-soft-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                    {sch.type || 'Government Scheme'}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                    sch.applicationPeriod?.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {sch.applicationPeriod?.status || 'Active'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-navy-900 line-clamp-2">
                  {sch.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Provided by: <strong className="text-slate-700">{sch.provider}</strong>
                </p>

                {/* Amount Highlight */}
                <div className="mt-4 bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">Financial Grant / Benefit</span>
                    <span className="text-sm sm:text-base font-extrabold text-emerald-900">{sch.amountDetails?.amount || sch.amount}</span>
                  </div>
                  <Award className="w-6 h-6 text-emerald-600 shrink-0" />
                </div>

                {/* Eligibility Summary */}
                <div className="mt-4 space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-700 block">Eligibility Criteria:</span>
                    <p className="leading-relaxed text-[11px] text-slate-600 mt-0.5">
                      {sch.eligibility?.summary || sch.eligibility?.criteria || 'Class 12 passout with verified income criteria.'}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                    {sch.eligibility?.minClass12Percentage && (
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                        Min 12th: <strong>{sch.eligibility.minClass12Percentage}%</strong>
                      </span>
                    )}
                    {sch.eligibility?.maxFamilyIncomePerYear > 0 && (
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                        Income: ≤ <strong>₹{(sch.eligibility.maxFamilyIncomePerYear / 100000).toFixed(1)} LPA</strong>
                      </span>
                    )}
                    {sch.applicableStreams && (
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                        Stream: <strong>{sch.applicableStreams.join(', ')}</strong>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer: Deadline & Direct Apply Link */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Deadline: <strong className="text-rose-600">{sch.applicationPeriod?.deadline || 'Dec 31, 2026'}</strong></span>
                </div>

                <a
                  href={sch.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition shrink-0"
                >
                  <span>Apply on Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
