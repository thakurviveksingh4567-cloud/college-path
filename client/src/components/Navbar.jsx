import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSavedColleges } from '../context/SavedCollegesContext';
import { useComparison } from '../context/ComparisonContext';
import { 
  GraduationCap, 
  Search, 
  SlidersHorizontal, 
  Scale, 
  Award, 
  Calendar, 
  Bookmark, 
  User, 
  Menu, 
  X, 
  LogOut, 
  LayoutDashboard,
  ShieldAlert
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout, setAuthModalOpen } = useAuth();
  const { savedCount } = useSavedColleges();
  const { compareCount } = useComparison();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Explore Colleges', path: '/colleges', icon: Search },
    { name: 'Admission Predictor', path: '/predictor', icon: SlidersHorizontal, badge: 'Popular' },
    { name: 'Compare', path: '/compare', icon: Scale, count: compareCount },
    { name: 'Scholarships', path: '/scholarships', icon: Award },
    { name: 'Admission Updates', path: '/calendar', icon: Calendar },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-navy-900 group-hover:text-blue-600 transition-colors">
                  College<span className="text-blue-600">Path</span>
                </span>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  India
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium -mt-1 hidden sm:block">
                Post-Class 12 Admission Guidance
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition ${
                      isActive
                        ? 'text-blue-600 bg-blue-50/80 font-bold'
                        : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/70'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-0.5">
                      {link.badge}
                    </span>
                  )}
                  {link.count !== undefined && link.count > 0 && (
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full ml-0.5 animate-pulse">
                      {link.count}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Saved Colleges Button */}
            <Link
              to="/dashboard"
              className="relative p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition"
              title="Saved Colleges"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {savedCount}
                </span>
              )}
            </Link>

            {/* User Profile or Sign In */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2.5 rounded-full border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 transition"
                >
                  <span className="text-xs font-semibold text-navy-900 max-w-[120px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    {user.name.charAt(0)}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-soft-xl border border-slate-200 py-1.5 z-50 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                      <p className="text-xs font-bold text-navy-900 truncate">{user.email}</p>
                      <span className="inline-block bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded-md mt-1">
                        {user.role === 'admin' ? 'Administrator' : `${user.profile?.stream || 'PCM'} Student`}
                      </span>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition"
                    >
                      <LayoutDashboard className="w-4 h-4 text-slate-400" />
                      Student Dashboard
                    </Link>

                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-purple-700 hover:bg-purple-50 transition"
                      >
                        <ShieldAlert className="w-4 h-4 text-purple-600" />
                        Admin College Manager
                      </Link>
                    )}

                    <div className="border-t border-slate-100 mt-1"></div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition flex items-center gap-1.5"
              >
                <User className="w-4 h-4" />
                <span>Sign In / Demo</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/dashboard"
              className="relative p-2 text-slate-600"
              title="Saved Colleges"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute 0 right-0 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between p-3 rounded-lg text-sm font-semibold ${
                    isActive ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-slate-400" />
                  <span>{link.name}</span>
                </div>
                {link.count !== undefined && link.count > 0 && (
                  <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {link.count}
                  </span>
                )}
              </NavLink>
            );
          })}

          <div className="border-t border-slate-100 pt-3">
            {user ? (
              <div className="space-y-2">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <LayoutDashboard className="w-5 h-5 text-slate-400" />
                  <span>Student Dashboard</span>
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg text-sm font-semibold text-purple-700 bg-purple-50"
                  >
                    <ShieldAlert className="w-5 h-5 text-purple-600" />
                    <span>Admin College Manager</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModalOpen(true);
                }}
                className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg text-sm shadow-sm"
              >
                Sign In / Demo Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
