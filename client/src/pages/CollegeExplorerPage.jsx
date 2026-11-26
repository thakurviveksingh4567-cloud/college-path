import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collegeAPI } from '../services/api';
import { CollegeCard } from '../components/CollegeCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { Search, SlidersHorizontal, X, RotateCcw } from 'lucide-react';

export const CollegeExplorerPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filters state initialized from URL params
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    state: searchParams.get('state') || 'All States',
    course: searchParams.get('course') || 'All Courses',
    stream: searchParams.get('stream') || 'All',
    collegeType: searchParams.get('collegeType') || 'All',
    maxFee: searchParams.get('maxFee') || '',
    sortBy: searchParams.get('sortBy') || 'nirf'
  });

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const query = {};
      if (filters.search) query.search = filters.search;
      if (filters.state && filters.state !== 'All States' && filters.state !== 'All') query.state = filters.state;
      if (filters.course && filters.course !== 'All Courses' && filters.course !== 'All') query.course = filters.course;
      if (filters.stream && filters.stream !== 'All') query.stream = filters.stream;
      if (filters.collegeType && filters.collegeType !== 'All') query.collegeType = filters.collegeType;
      if (filters.maxFee) query.maxFee = filters.maxFee;
      if (filters.sortBy) query.sortBy = filters.sortBy;

      const res = await collegeAPI.getColleges(query);
      if (res.success) {
        setColleges(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
    if (filters.search || (filters.stream && filters.stream !== 'All') || (filters.state && filters.state !== 'All States')) {
      try {
        const history = JSON.parse(localStorage.getItem('collegepath_recent_searches') || '[]');
        const title = filters.search
          ? `Search: "${filters.search}"`
          : `Colleges in ${filters.state !== 'All States' ? filters.state : ''} ${filters.stream !== 'All' ? `(${filters.stream})` : ''}`.trim();
        const entry = {
          id: Date.now().toString(),
          type: 'explorer',
          title,
          query: filters.search || '',
          state: filters.state || 'All States',
          stream: filters.stream || 'All',
          date: 'Just now',
          link: `/colleges?search=${encodeURIComponent(filters.search || '')}&state=${encodeURIComponent(filters.state || 'All States')}&stream=${encodeURIComponent(filters.stream || 'All')}`
        };
        const updated = [entry, ...history.filter(h => h.title !== entry.title)].slice(0, 10);
        localStorage.setItem('collegepath_recent_searches', JSON.stringify(updated));
      } catch (e) {}
    }
  }, [filters]);

  const handleReset = () => {
    setFilters({
      search: '',
      state: 'All States',
      course: 'All Courses',
      stream: 'All',
      collegeType: 'All',
      maxFee: '',
      sortBy: 'nirf'
    });
    setSearchParams({});
  };

  const removeFilterTag = (key) => {
    setFilters(prev => ({
      ...prev,
      [key]: key === 'state' ? 'All States' : (key === 'course' ? 'All Courses' : (key === 'stream' || key === 'collegeType' ? 'All' : ''))
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">College Discovery</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Explore Verified Colleges Across India
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Compare cutoffs, fees, NIRF rankings, and placement stats across central, state, and deemed universities for the 2026-2027 academic session.
          </p>
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="md:hidden flex items-center justify-center gap-2 bg-blue-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>{mobileFilterOpen ? 'Hide Filters' : 'Show Filters & Sort'}</span>
        </button>
      </div>

      {/* Main Grid: Sidebar + Results */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        
        {/* Filter Sidebar (Desktop) */}
        <div className={`md:block ${mobileFilterOpen ? 'block' : 'hidden'} md:col-span-1 sticky top-20`}>
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            onReset={handleReset}
            totalCount={colleges.length}
          />
        </div>

        {/* Results Column */}
        <div className="md:col-span-3 space-y-4">
          
          {/* Top Search Input & Active Tags Bar */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-card space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                placeholder="Search by college name, city or state..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>

            {/* Active Filter Tags */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Active Filters:</span>
              {filters.state && filters.state !== 'All States' && (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-semibold border border-blue-200">
                  State: {filters.state}
                  <button onClick={() => removeFilterTag('state')}><X className="w-3 h-3 hover:text-blue-900" /></button>
                </span>
              )}
              {filters.course && filters.course !== 'All Courses' && (
                <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full font-semibold border border-indigo-200">
                  Course: {filters.course}
                  <button onClick={() => removeFilterTag('course')}><X className="w-3 h-3 hover:text-indigo-900" /></button>
                </span>
              )}
              {filters.stream && filters.stream !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200">
                  Stream: {filters.stream}
                  <button onClick={() => removeFilterTag('stream')}><X className="w-3 h-3 hover:text-emerald-900" /></button>
                </span>
              )}
              {filters.collegeType && filters.collegeType !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-full font-semibold border border-purple-200">
                  Type: {filters.collegeType}
                  <button onClick={() => removeFilterTag('collegeType')}><X className="w-3 h-3 hover:text-purple-900" /></button>
                </span>
              )}
              {filters.maxFee && (
                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full font-semibold border border-amber-200">
                  Max Fee: ₹{Number(filters.maxFee).toLocaleString('en-IN')}
                  <button onClick={() => removeFilterTag('maxFee')}><X className="w-3 h-3 hover:text-amber-900" /></button>
                </span>
              )}
            </div>
          </div>

          {/* Colleges Listing Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className="h-80 bg-slate-100 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : colleges.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-card space-y-4">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-navy-900">No Colleges Match Your Current Filters</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try widening your fee budget, switching states, or clearing specific course constraints to explore more institutions.
              </p>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {colleges.map(college => (
                <CollegeCard key={college.slug} college={college} />
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
