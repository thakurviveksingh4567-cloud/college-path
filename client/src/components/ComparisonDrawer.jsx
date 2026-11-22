import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useComparison } from '../context/ComparisonContext';
import { Scale, X, ArrowRight, Trash2 } from 'lucide-react';

export const ComparisonDrawer = () => {
  const { comparedColleges, removeCompare, clearAll, compareCount } = useComparison();
  const location = useLocation();

  // Hide on compare page itself
  if (compareCount === 0 || location.pathname === '/compare') return null;

  return (
    <aside 
      aria-label="College Comparison Tray"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-2xl bg-navy-900/95 text-white backdrop-blur-md rounded-2xl shadow-soft-xl border border-navy-700 p-3 sm:p-4 animate-slideUp"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left Info & Items */}
        <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold leading-tight">Compare Colleges</p>
              <p className="text-[10px] text-slate-400">{compareCount}/3 Selected</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {comparedColleges.map((c) => {
              const slug = c.slug || c.collegeId || c._id;
              return (
                <div
                  key={slug}
                  className="flex items-center gap-1.5 bg-navy-800 text-slate-200 text-xs px-2.5 py-1 rounded-lg border border-navy-700 shrink-0"
                >
                  <span className="font-medium max-w-[100px] truncate">{c.shortName || c.name}</span>
                  <button
                    onClick={() => removeCompare(slug)}
                    className="text-slate-400 hover:text-rose-400 p-0.5 rounded transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
          <button
            onClick={clearAll}
            className="text-slate-400 hover:text-slate-200 text-xs px-2.5 py-1.5 rounded-lg hover:bg-navy-800 transition"
            title="Clear all selected"
          >
            Clear
          </button>

          <Link
            to="/compare"
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md transition flex items-center gap-1.5 shrink-0"
          >
            <span>Compare Side-by-Side</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
};
