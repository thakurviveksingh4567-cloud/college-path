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
  Filter
} from 'lucide-react';

export const ScholarshipsPage = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [stream, setStream] = useState('All');
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
          setScholarships(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarships();
  }, [search, stream, gender]);

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
            Scholarships for Class 12 Students
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Discover merit-based and need-based scholarships, full fee waivers, and central sector schemes for the 2026-2027 academic session.
          </p>
        </div>

        <div className="bg-navy-800/80 p-4 rounded-2xl border border-navy-700 text-xs space-y-1 shrink-0 text-slate-300 max-w-xs">
          <p className="font-bold text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Direct Official Applications</span>
          </p>
          <p className="text-[11px] text-slate-400">
            All listings direct you to official National Scholarship Portal (NSP) or corporate foundation portals.
          </p>
        </div>
      </div>

      {/* Filters & Search Row */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="w-full md:w-96 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by scholarship title or provider..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div>
            <select
              value={stream}
              onChange={(e) => setStream(e.target.value)}
              className="py-2 px-3 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Streams</option>
              <option value="PCM">PCM (Engineering)</option>
              <option value="PCB">PCB (Medical/Bio)</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts / Humanities</option>
            </select>
          </div>

          <div>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="py-2 px-3 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Genders</option>
              <option value="Female Only">Female Students Only</option>
            </select>
          </div>
        </div>

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
          <h3 className="text-base font-bold text-navy-900">No Scholarships Found</h3>
          <p className="text-xs text-slate-500">Try broadening your stream or search query.</p>
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
                    <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">Financial Grant</span>
                    <span className="text-sm font-extrabold text-emerald-900">{sch.amountDetails?.amount || sch.amount}</span>
                  </div>
                  <Award className="w-6 h-6 text-emerald-600" />
                </div>

                {/* Eligibility Summary */}
                <div className="mt-3 space-y-1 text-xs text-slate-600">
                  <p className="font-semibold text-slate-700">Eligibility Criteria:</p>
                  <p className="leading-relaxed text-[11px] text-slate-500">
                    {sch.eligibility?.summary || sch.eligibility?.criteria || 'Class 12 passout with verified income criteria.'}
                  </p>
                </div>
              </div>

              {/* Card Footer: Deadline & Direct Apply */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Deadline: <strong className="text-rose-600">{sch.applicationPeriod?.deadline || 'Dec 31, 2026'}</strong></span>
                </div>

                <a
                  href={sch.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition"
                >
                  <span>Official Apply Link</span>
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
