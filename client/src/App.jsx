import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SavedCollegesProvider } from './context/SavedCollegesContext';
import { ComparisonProvider } from './context/ComparisonContext';

// Components
import { DemoBanner } from './components/DemoBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ComparisonDrawer } from './components/ComparisonDrawer';
import { AuthModal } from './components/AuthModal';

// Pages
import { HomePage } from './pages/HomePage';
import { CollegeExplorerPage } from './pages/CollegeExplorerPage';
import { CollegeDetailPage } from './pages/CollegeDetailPage';
import { PredictorPage } from './pages/PredictorPage';
import { ComparePage } from './pages/ComparePage';
import { ScholarshipsPage } from './pages/ScholarshipsPage';
import { AdmissionCalendarPage } from './pages/AdmissionCalendarPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top on page change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Global Toast Banner
const ToastAlert = () => {
  const { toastMessage } = useAuth();
  if (!toastMessage) return null;

  const isSuccess = toastMessage.type === 'success';
  const isError = toastMessage.type === 'error';

  return (
    <div className="fixed top-20 right-4 z-50 animate-slideDown">
      <div className={`px-4 py-3 rounded-xl shadow-soft-xl border text-xs font-bold flex items-center gap-2 ${
        isSuccess
          ? 'bg-emerald-600 text-white border-emerald-500'
          : isError
          ? 'bg-rose-600 text-white border-rose-500'
          : 'bg-navy-900 text-white border-navy-700'
      }`}>
        <span>{toastMessage.message}</span>
      </div>
    </div>
  );
};

export function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      <ScrollToTop />
      <ToastAlert />
      <DemoBanner />
      <Navbar />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/colleges" element={<CollegeExplorerPage />} />
          <Route path="/colleges/:slug" element={<CollegeDetailPage />} />
          <Route path="/predictor" element={<PredictorPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/scholarships" element={<ScholarshipsPage />} />
          <Route path="/calendar" element={<AdmissionCalendarPage />} />
          <Route path="/dashboard" element={<StudentDashboardPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <ComparisonDrawer />
      <AuthModal />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <SavedCollegesProvider>
          <ComparisonProvider>
            <AppContent />
          </ComparisonProvider>
        </SavedCollegesProvider>
      </AuthProvider>
    </Router>
  );
}
