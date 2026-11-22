import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 text-center">
      <div className="max-w-md space-y-4">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-navy-900">404</h1>
        <h2 className="text-lg font-bold text-slate-800">Page Not Found</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          The admission portal or page you are looking for has moved or does not exist.
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/colleges"
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-xl transition"
          >
            <span>Explore Colleges</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
