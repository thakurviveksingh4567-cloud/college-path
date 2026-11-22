import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { INDIAN_STATES } from '../data/mockData';
import { User, Mail, Lock, Eye, EyeOff, GraduationCap } from 'lucide-react';

export const RegisterPage = () => {
  const { register, user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [stream, setStream] = useState('PCM');
  const [class12Percentage, setClass12Percentage] = useState(85);
  const [homeState, setHomeState] = useState('Delhi');
  const [category, setCategory] = useState('General');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (user) {
    navigate('/dashboard');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const res = await register(name, email, password, {
      stream,
      class12Percentage: Number(class12Percentage),
      homeState,
      category,
      preferredCourse: stream === 'PCM' ? 'B.Tech CSE' : (stream === 'Commerce' ? 'B.Com (Hons)' : 'BCA'),
      annualBudget: 300000,
      needHostel: true
    });

    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-200 shadow-soft-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white p-8 text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mx-auto shadow-md">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Create Student Profile</h2>
          <p className="text-xs text-slate-300">
            Join thousands of Class 12 students finding their best-fit colleges across India.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aditya Verma"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address *
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
              Create Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
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

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Stream Prerequisite
              </label>
              <select
                value={stream}
                onChange={(e) => setStream(e.target.value)}
                className="w-full py-2.5 px-3 text-xs rounded-xl border border-slate-300 bg-white"
              >
                <option value="PCM">PCM (Engineering/Math)</option>
                <option value="PCB">PCB (Medical/Bio)</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts / Humanities</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Class 12 % Marks
              </label>
              <input
                type="number"
                step="0.1"
                min="35"
                max="100"
                value={class12Percentage}
                onChange={(e) => setClass12Percentage(e.target.value)}
                className="w-full py-2.5 px-3 text-xs rounded-xl border border-slate-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Home State (Domicile)
              </label>
              <select
                value={homeState}
                onChange={(e) => setHomeState(e.target.value)}
                className="w-full py-2.5 px-3 text-xs rounded-xl border border-slate-300 bg-white"
              >
                {INDIAN_STATES.filter(s => s !== 'All States').map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full py-2.5 px-3 text-xs rounded-xl border border-slate-300 bg-white"
              >
                <option value="General">General</option>
                <option value="OBC-NCL">OBC-NCL</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition disabled:opacity-50 mt-4"
          >
            {loading ? 'Creating Account...' : 'Complete Registration'}
          </button>

          <div className="text-center pt-2">
            <span className="text-xs text-slate-500">Already registered? </span>
            <Link to="/login" className="text-xs font-bold text-blue-600 hover:underline">
              Sign In to Your Account
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
};
