import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { authAPI } from '../services/api';
import { SAMPLE_COLLEGES } from '../data/mockData';

const SavedCollegesContext = createContext();

export const SavedCollegesProvider = ({ children }) => {
  const { user, token, showToast } = useAuth();
  const [savedColleges, setSavedColleges] = useState(() => {
    try {
      const local = localStorage.getItem('collegepath_saved_colleges');
      return local ? JSON.parse(local) : [];
    } catch (e) {
      return [];
    }
  });

  // Sync with user's saved colleges when user changes
  useEffect(() => {
    if (user && user.savedColleges) {
      setSavedColleges(user.savedColleges);
      localStorage.setItem('collegepath_saved_colleges', JSON.stringify(user.savedColleges));
    }
  }, [user]);

  const isSaved = (collegeId) => {
    return savedColleges.some(sc => sc.collegeId === collegeId);
  };

  const getSavedItem = (collegeId) => {
    return savedColleges.find(sc => sc.collegeId === collegeId);
  };

  const toggleSave = async (college, notes = '', applicationStatus = 'Shortlisted') => {
    const slug = college.slug || college.collegeId || college._id;
    const exists = isSaved(slug);

    if (exists) {
      // Remove
      const filtered = savedColleges.filter(sc => sc.collegeId !== slug);
      setSavedColleges(filtered);
      localStorage.setItem('collegepath_saved_colleges', JSON.stringify(filtered));

      if (token && !token.startsWith('demo_')) {
        authAPI.removeSavedCollege(slug).catch(console.error);
      }
      showToast(`${college.shortName || college.name} removed from saved list`, 'info');
    } else {
      // Add
      const newItem = {
        collegeId: slug,
        notes: notes || '',
        applicationStatus: applicationStatus || 'Shortlisted',
        savedAt: new Date().toISOString(),
        college: college
      };
      const updated = [newItem, ...savedColleges];
      setSavedColleges(updated);
      localStorage.setItem('collegepath_saved_colleges', JSON.stringify(updated));

      if (token && !token.startsWith('demo_')) {
        authAPI.saveCollege({ collegeId: slug, notes, applicationStatus }).catch(console.error);
      }
      showToast(`Added ${college.shortName || college.name} to your Saved Colleges!`, 'success');
    }
  };

  const updateStatus = async (collegeId, applicationStatus, notes) => {
    setSavedColleges(prev => {
      const updated = prev.map(item => {
        if (item.collegeId === collegeId) {
          return {
            ...item,
            applicationStatus: applicationStatus !== undefined ? applicationStatus : item.applicationStatus,
            notes: notes !== undefined ? notes : item.notes
          };
        }
        return item;
      });
      localStorage.setItem('collegepath_saved_colleges', JSON.stringify(updated));
      return updated;
    });

    if (token && !token.startsWith('demo_')) {
      authAPI.saveCollege({ collegeId, notes, applicationStatus }).catch(console.error);
    }
    showToast('Application status updated', 'success');
  };

  return (
    <SavedCollegesContext.Provider value={{
      savedColleges,
      isSaved,
      getSavedItem,
      toggleSave,
      updateStatus,
      savedCount: savedColleges.length
    }}>
      {children}
    </SavedCollegesContext.Provider>
  );
};

export const useSavedColleges = () => useContext(SavedCollegesContext);
