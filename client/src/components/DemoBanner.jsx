import React from 'react';
import { useAuth, DEMO_PROFILES } from '../context/AuthContext';
import { Sparkles, ShieldCheck, UserCheck, ArrowRight } from 'lucide-react';

export const DemoBanner = () => {
  const { user, demoLogin, setAuthModalOpen } = useAuth();

  return (
    <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white border-b border-navy-700/50 text-xs py-2 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-emerald-400 tracking-wide uppercase text-[10px]">Verified Session 2026-27</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300">
            Rule-based college discovery & cutoff analysis across India. Realistic sample dataset active.
          </span>
        </div>

        {!user ? (
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-slate-400 font-medium hidden lg:inline">Quick Demo Login:</span>
            {DEMO_PROFILES.map((profile, idx) => (
              <button
                key={profile.email}
                onClick={() => demoLogin(idx)}
                className="bg-navy-700/80 hover:bg-blue-600 text-slate-200 hover:text-white px-2.5 py-1 rounded-md transition text-[11px] font-medium border border-navy-600/50 flex items-center gap-1 shadow-xs"
                title={`Login as ${profile.name} (${profile.badge})`}
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{profile.name.split(' ')[0]} ({profile.label.split(' ')[0]})</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-slate-300">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Logged in as <strong className="text-white font-semibold">{user.name}</strong></span>
            {user.role === 'admin' && (
              <span className="bg-purple-600/30 text-purple-300 px-2 py-0.5 rounded text-[10px] border border-purple-500/30 font-semibold">ADMIN</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
