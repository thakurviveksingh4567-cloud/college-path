import React, { useState } from 'react';
import { useAuth, DEMO_PROFILES } from '../context/AuthContext';
import { X, Eye, EyeOff, Lock, Mail, User as UserIcon, Sparkles, CheckCircle2 } from 'lucide-react';

export const AuthModal = () => {
  const { authModalOpen, setAuthModalOpen, login, register, demoLogin } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stream, setStream] = useState('PCM');
  const [class12Percentage, setClass12Percentage] = useState(85);
  const [category, setCategory] = useState('General');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!authModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    if (isRegister) {
      if (!name) {
        setError('Please enter your full name.');
        setLoading(false);
        return;
      }
      const res = await register(name, email, password, {
        stream,
        class12Percentage: Number(class12Percentage),
        category
      });
      if (!res.success) setError(res.message);
    } else {
      const res = await login(email, password);
      if (!res.success) setError(res.message);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white w-full max-w-md rounded-2xl shadow-soft-xl border border-slate-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full p-1.5 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white p-6 pb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-xs">
              CP
            </span>
            <span className="text-xl font-bold tracking-tight">CollegePath</span>
          </div>
          <h3 className="text-lg font-semibold text-white">
            {isRegister ? 'Create Student Account' : 'Welcome to CollegePath'}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {isRegister 
              ? 'Find colleges matching your Class 12 marks & entrance percentiles'
              : 'Sign in to access your saved colleges, predictions & application tracker'}
          </p>
        </div>

        {/* Demo Fast Login Buttons */}
        <div className="bg-blue-50/70 border-b border-blue-100 p-4">
          <p className="text-xs font-semibold text-blue-900 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            1-Click Demo Profiles (Instant Sign In)
          </p>
          <div className="grid grid-cols-3 gap-2">
            {DEMO_PROFILES.map((p, idx) => (
              <button
                key={p.email}
                type="button"
                onClick={() => demoLogin(idx)}
                className="bg-white hover:bg-blue-600 hover:text-white text-navy-800 border border-blue-200 hover:border-blue-600 text-left p-2 rounded-lg transition group shadow-2xs"
              >
                <div className="text-[11px] font-bold group-hover:text-white truncate">{p.name.split(' ')[0]}</div>
                <div className="text-[10px] text-slate-500 group-hover:text-blue-100 truncate">{p.label.split(' ')[0]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200">
          <button
            type="button"
            onClick={() => { setIsRegister(false); setError(''); }}
            className={`flex-1 py-3 text-sm font-semibold text-center transition ${
              !isRegister ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsRegister(true); setError(''); }}
            className={`flex-1 py-3 text-sm font-semibold text-center transition ${
              isRegister ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Register Student
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-lg flex items-center gap-2">
              <span className="font-semibold">Error:</span> {error}
            </div>
          )}

          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full pl-9 pr-10 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isRegister && (
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Class 12 Stream</label>
                <select
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="PCM">PCM (Engineering/Math)</option>
                  <option value="PCB">PCB (Medical/Bio)</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts">Arts / Humanities</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Class 12 %</label>
                <input
                  type="number"
                  min="35"
                  max="100"
                  step="0.1"
                  value={class12Percentage}
                  onChange={(e) => setClass12Percentage(e.target.value)}
                  className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm shadow-md transition disabled:opacity-50 mt-2"
          >
            {loading ? 'Please wait...' : (isRegister ? 'Complete Registration' : 'Sign In')}
          </button>
        </form>
      </div>
    </div>
  );
};
