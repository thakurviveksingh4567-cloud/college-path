import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, DEMO_PROFILES } from '../context/AuthContext';
import { Lock, Mail, Eye, EyeOff, Sparkles, GraduationCap } from 'lucide-react';

export const LoginPage = () => {
  const { login, demoLogin, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (user) {
    navigate('/dashboard');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-soft-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white p-8 text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mx-auto shadow-md">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Sign In to CollegePath</h2>
          <p className="text-xs text-slate-300">
            Access your saved colleges, personalized predictions & counselling notes.
          </p>
        </div>

        {/* 1-Click Demo Profiles Banner */}
        <div className="bg-blue-50/70 p-4 border-b border-blue-100 space-y-2">
          <p className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Fast Demo Sign-In (Instant Test Access)</span>
          </p>
          <div className="grid grid-cols-3 gap-2">
            {DEMO_PROFILES.map((p, idx) => (
              <button
                key={p.email}
                type="button"
                onClick={async () => {
                  await demoLogin(idx);
                  navigate('/dashboard');
                }}
                className="bg-white hover:bg-blue-600 hover:text-white text-navy-900 border border-blue-200 text-left p-2 rounded-xl transition text-[11px] shadow-2xs group"
              >
                <div className="font-bold group-hover:text-white truncate">{p.name.split(' ')[0]}</div>
                <div className="text-[10px] text-slate-500 group-hover:text-blue-100 truncate">{p.label.split(' ')[0]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>

          <div className="text-center pt-2">
            <span className="text-xs text-slate-500">Don't have an account yet? </span>
            <Link to="/register" className="text-xs font-bold text-blue-600 hover:underline">
              Register as Student
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
};
