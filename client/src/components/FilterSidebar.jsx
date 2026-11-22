import React from 'react';
import { INDIAN_STATES, POPULAR_COURSES, COLLEGE_TYPES, STREAMS } from '../data/mockData';
import { Filter, RotateCcw, Search, IndianRupee } from 'lucide-react';

export const FilterSidebar = ({ filters, setFilters, onReset, totalCount }) => {
  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-bold text-navy-900">Filters</h3>
          <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
            {totalCount} Colleges
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-slate-400 hover:text-blue-600 text-xs flex items-center gap-1 transition"
          title="Reset all filters"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Stream Selector */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Stream Prerequisite
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {['All', 'PCM', 'PCB', 'Commerce', 'Arts'].map((st) => (
            <button
              key={st}
              onClick={() => handleChange('stream', st)}
              className={`text-xs py-1.5 px-2.5 rounded-lg font-semibold transition text-center ${
                filters.stream === st
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* State / Location */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          State / Territory
        </label>
        <select
          value={filters.state || 'All States'}
          onChange={(e) => handleChange('state', e.target.value)}
          className="w-full py-2 px-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
        >
          {INDIAN_STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Course Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Target Course
        </label>
        <select
          value={filters.course || 'All Courses'}
          onChange={(e) => handleChange('course', e.target.value)}
          className="w-full py-2 px-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
        >
          {POPULAR_COURSES.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>

      {/* College Type */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Institution Type
        </label>
        <div className="space-y-1.5">
          {COLLEGE_TYPES.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 text-xs text-slate-700 hover:text-navy-900 cursor-pointer font-medium"
            >
              <input
                type="radio"
                name="collegeType"
                checked={filters.collegeType === type}
                onChange={() => handleChange('collegeType', type)}
                className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Max Annual Fee Slider */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
          <span>Max Tuition Fee / Year</span>
          <span className="text-blue-600 font-bold normal-case">
            {filters.maxFee ? `₹${Number(filters.maxFee).toLocaleString('en-IN')}` : 'Any Budget'}
          </span>
        </div>
        <input
          type="range"
          min="20000"
          max="500000"
          step="20000"
          value={filters.maxFee || 500000}
          onChange={(e) => handleChange('maxFee', e.target.value)}
          className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>₹20K</span>
          <span>₹2.5L</span>
          <span>₹5L+</span>
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Sort Results By
        </label>
        <select
          value={filters.sortBy || 'nirf'}
          onChange={(e) => handleChange('sortBy', e.target.value)}
          className="w-full py-2 px-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
        >
          <option value="nirf">NIRF Ranking (Top First)</option>
          <option value="placement">Highest Median CTC</option>
          <option value="fee-low-high">Annual Fee (Low to High)</option>
          <option value="name">College Name (A-Z)</option>
        </select>
      </div>

    </div>
  );
};
