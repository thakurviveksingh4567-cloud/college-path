import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, ExternalLink, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-navy-900 text-slate-300 border-t border-navy-800 mt-auto">
      {/* Top Banner */}
      <div className="border-b border-navy-800 bg-navy-900/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Unbiased & Data-Backed Guidance</h4>
              <p className="text-xs text-slate-400">
                Rule-based matching on official cutoffs, NIRF rankings, and verified tuition/hostel fee data.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Session Covered:</span>
            <span className="bg-navy-800 text-emerald-400 border border-emerald-500/20 text-xs font-semibold px-2.5 py-1 rounded-md">
              2026 - 2027 Admission Cycle
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                College<span className="text-blue-400">Path</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed pr-6">
              CollegePath empowers Class 12 students across India to make smart, data-driven college decisions. Discover colleges based on your Board percentage, stream, JEE Main/CUET percentiles, state quota, and family budget.
            </p>
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-300 mb-1">Coverage States Highlighted:</p>
              <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-400">
                {['Punjab', 'Uttar Pradesh', 'Delhi', 'Haryana', 'Chandigarh', 'Rajasthan', 'Maharashtra', 'Karnataka'].map(s => (
                  <span key={s} className="bg-navy-800 px-2 py-0.5 rounded border border-navy-700/60 text-slate-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Popular Courses */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Popular Courses</h5>
            <ul className="space-y-2 text-xs">
              {['B.Tech CSE', 'B.Tech AI & ML', 'BCA', 'BCA AI & ML', 'BCA Data Science', 'MCA', 'MBA', 'B.Com (Hons)'].map(c => (
                <li key={c}>
                  <Link to={`/colleges?course=${encodeURIComponent(c)}`} className="hover:text-blue-400 transition">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Tools */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Guidance Tools</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/predictor" className="hover:text-blue-400 transition flex items-center gap-1">
                  <span>Admission Predictor</span>
                  <span className="bg-blue-600 text-[9px] text-white px-1 rounded">HOT</span>
                </Link>
              </li>
              <li>
                <Link to="/colleges" className="hover:text-blue-400 transition">College Explorer</Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-blue-400 transition">3-College Side-by-Side</Link>
              </li>
              <li>
                <Link to="/scholarships" className="hover:text-blue-400 transition">Scholarship Finder</Link>
              </li>
              <li>
                <Link to="/calendar" className="hover:text-blue-400 transition">Admission Deadlines 2026-27</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-blue-400 transition">Student Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Official Portals */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Official Portals</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="https://josaa.nic.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition flex items-center gap-1">
                  <span>JoSAA / CSAB (IITs/NITs)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://ugadmission.uod.ac.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition flex items-center gap-1">
                  <span>Delhi Univ CSAS</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://jeemain.nta.ac.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition flex items-center gap-1">
                  <span>NTA JEE Main</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://cuetug.ntaonline.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition flex items-center gap-1">
                  <span>CUET UG Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://scholarships.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition flex items-center gap-1">
                  <span>National Scholarship Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Clear Mandatory Disclaimer */}
        <div className="mt-10 pt-6 border-t border-navy-800 text-[11px] text-slate-400/90 leading-relaxed bg-navy-800/40 p-4 rounded-xl border">
          <p className="font-semibold text-slate-300 mb-1">LEGAL & REGULATORY DISCLAIMER:</p>
          <p>
            CollegePath is an independent higher education discovery and informational guidance platform. It is not affiliated with, endorsed by, or representing the Ministry of Education, National Testing Agency (NTA), JoSAA, CSAS, or any state university. All cutoff trends, fee structures, and placement figures are compiled from officially verified institutional reports and NIRF public audits. Match status (Eligible, Potential Match, Not Eligible) is an algorithmic estimate intended solely for preliminary shortlisting and DOES NOT guarantee seat allocation or admission. Final admission decisions rest exclusively with the respective university counselling bodies based on verified ranks and documentation.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-navy-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© 2026 CollegePath. Designed for Indian Class 12 Students & Parents.</p>
          <div className="flex items-center gap-4">
            <Link to="/colleges" className="hover:text-slate-200">Colleges</Link>
            <Link to="/predictor" className="hover:text-slate-200">Predictor</Link>
            <Link to="/scholarships" className="hover:text-slate-200">Scholarships</Link>
            <Link to="/calendar" className="hover:text-slate-200">Updates</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
