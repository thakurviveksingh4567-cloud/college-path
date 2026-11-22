import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const DEMO_PROFILES = [
  {
    name: "Aarav Sharma",
    label: "PCM & JEE Aspirant",
    email: "aarav.pcm@collegepath.in",
    password: "Password123!",
    badge: "91.5% in 12th | JEE 98.4%",
    profile: {
      stream: "PCM",
      class12Percentage: 91.5,
      passingYear: 2026,
      category: "General",
      homeState: "Delhi",
      preferredCourse: "B.Tech Computer Science & Engineering",
      annualBudget: 250000,
      needHostel: true,
      preferredLocations: ["Delhi", "Punjab", "Haryana", "Chandigarh"],
      entranceExams: {
        jeeMain: { taken: true, percentile: 98.4, rank: 14200, year: 2026 },
        cuet: { taken: false },
        neet: { taken: false }
      }
    }
  },
  {
    name: "Priya Patel",
    label: "Commerce & CUET Aspirant",
    email: "priya.commerce@collegepath.in",
    password: "Password123!",
    badge: "95% in 12th | CUET 755",
    profile: {
      stream: "Commerce",
      class12Percentage: 95.0,
      passingYear: 2026,
      category: "OBC-NCL",
      homeState: "Rajasthan",
      preferredCourse: "B.Com (Hons)",
      annualBudget: 150000,
      needHostel: true,
      preferredLocations: ["Delhi", "Rajasthan"],
      entranceExams: {
        jeeMain: { taken: false },
        cuet: { taken: true, score: 755, percentile: 99.1, year: 2026 },
        neet: { taken: false }
      }
    }
  },
  {
    name: "System Administrator",
    label: "Platform Admin",
    email: "admin@collegepath.in",
    password: "AdminPassword123!",
    badge: "Full Admin Privileges",
    role: "admin",
    profile: {
      stream: "PCM",
      class12Percentage: 90,
      homeState: "Delhi",
      annualBudget: 500000
    }
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('collegepath_token'));
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('collegepath_token');
      const storedUser = localStorage.getItem('collegepath_user');

      if (storedToken) {
        try {
          const res = await authAPI.getMe();
          if (res.success && res.user) {
            setUser(res.user);
            localStorage.setItem('collegepath_user', JSON.stringify(res.user));
          }
        } catch (err) {
          console.warn('[Auth] Remote profile fetch failed, using stored session:', err.message);
          if (storedUser) {
            try {
              setUser(JSON.parse(storedUser));
            } catch (e) {
              localStorage.removeItem('collegepath_user');
            }
          }
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authAPI.login({ email, password });
      if (res.success) {
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem('collegepath_token', res.token);
        localStorage.setItem('collegepath_user', JSON.stringify(res.user));
        showToast(`Welcome back, ${res.user.name}!`, 'success');
        setAuthModalOpen(false);
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed';
      showToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  const register = async (name, email, password, profile) => {
    try {
      const res = await authAPI.register({ name, email, password, profile });
      if (res.success) {
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem('collegepath_token', res.token);
        localStorage.setItem('collegepath_user', JSON.stringify(res.user));
        showToast(`Account created successfully! Welcome, ${res.user.name}.`, 'success');
        setAuthModalOpen(false);
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Registration failed';
      showToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  const demoLogin = async (demoIndex = 0) => {
    const demo = DEMO_PROFILES[demoIndex] || DEMO_PROFILES[0];
    const demoUser = {
      id: 'demo_' + demoIndex,
      name: demo.name,
      email: demo.email,
      role: demo.role || 'student',
      profile: demo.profile,
      savedColleges: demoIndex === 0 ? [
        { collegeId: 'uiet-panjab-university-chandigarh', notes: 'Top state college with high ROI', applicationStatus: 'Shortlisted' },
        { collegeId: 'nit-kurukshetra', notes: 'Close to Delhi, top CSE placements', applicationStatus: 'Applied' }
      ] : [
        { collegeId: 'srcc-delhi-university', notes: 'Dream college for B.Com (Hons)', applicationStatus: 'Applied' }
      ]
    };
    const demoToken = 'demo_jwt_token_' + Date.now();
    setToken(demoToken);
    setUser(demoUser);
    localStorage.setItem('collegepath_token', demoToken);
    localStorage.setItem('collegepath_user', JSON.stringify(demoUser));
    showToast(`Signed in as ${demo.name} (${demo.label})`, 'success');
    setAuthModalOpen(false);
  };

  const updateProfile = async (newProfileData) => {
    try {
      if (token && !token.startsWith('demo_')) {
        await authAPI.updateProfile(newProfileData);
      }
      setUser(prev => {
        const updated = {
          ...prev,
          profile: {
            ...prev.profile,
            ...newProfileData
          }
        };
        localStorage.setItem('collegepath_user', JSON.stringify(updated));
        return updated;
      });
      showToast('Profile updated successfully!', 'success');
      return { success: true };
    } catch (err) {
      showToast('Could not update profile', 'error');
      return { success: false };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('collegepath_token');
    localStorage.removeItem('collegepath_user');
    showToast('You have been signed out.', 'info');
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      register,
      demoLogin,
      logout,
      updateProfile,
      authModalOpen,
      setAuthModalOpen,
      showToast,
      toastMessage
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
