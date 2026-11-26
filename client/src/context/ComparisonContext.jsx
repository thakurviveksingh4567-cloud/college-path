import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
  const { showToast } = useAuth();
  const [comparedColleges, setComparedColleges] = useState(() => {
    try {
      const stored = localStorage.getItem('collegepath_compare');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Saved comparisons state
  const [savedComparisons, setSavedComparisons] = useState(() => {
    try {
      const stored = localStorage.getItem('collegepath_saved_comparisons');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  const saveCurrentComparison = (customLabel = '') => {
    if (comparedColleges.length === 0) {
      showToast('Select at least one college to save a comparison.', 'error');
      return false;
    }
    const label = customLabel.trim() || comparedColleges.map(c => c.shortName || c.name).join(' vs ');
    const newEntry = {
      id: Date.now().toString(),
      label,
      colleges: [...comparedColleges],
      savedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    const updated = [newEntry, ...savedComparisons.filter(s => s.label !== label)].slice(0, 10);
    setSavedComparisons(updated);
    localStorage.setItem('collegepath_saved_comparisons', JSON.stringify(updated));
    showToast(`Saved comparison: "${label}"`, 'success');
    return true;
  };

  const loadSavedComparison = (id) => {
    const item = savedComparisons.find(s => s.id === id);
    if (item && item.colleges) {
      setComparedColleges(item.colleges);
      localStorage.setItem('collegepath_compare', JSON.stringify(item.colleges));
      showToast(`Loaded comparison: "${item.label}"`, 'info');
      return true;
    }
    return false;
  };

  const deleteSavedComparison = (id) => {
    const updated = savedComparisons.filter(s => s.id !== id);
    setSavedComparisons(updated);
    localStorage.setItem('collegepath_saved_comparisons', JSON.stringify(updated));
    showToast('Saved comparison removed', 'info');
  };

  const isComparing = (slug) => {
    return comparedColleges.some(c => (c.slug || c.collegeId || c._id) === slug);
  };

  const toggleCompare = (college) => {
    const slug = college.slug || college.collegeId || college._id;
    if (isComparing(slug)) {
      const filtered = comparedColleges.filter(c => (c.slug || c.collegeId || c._id) !== slug);
      setComparedColleges(filtered);
      localStorage.setItem('collegepath_compare', JSON.stringify(filtered));
      showToast(`${college.shortName || college.name} removed from comparison`, 'info');
    } else {
      if (comparedColleges.length >= 3) {
        showToast('You can compare a maximum of 3 colleges simultaneously. Remove one to add another.', 'error');
        setDrawerOpen(true);
        return false;
      }
      const updated = [...comparedColleges, college];
      setComparedColleges(updated);
      localStorage.setItem('collegepath_compare', JSON.stringify(updated));
      showToast(`Added ${college.shortName || college.name} to comparison (${updated.length}/3)`, 'success');
      setDrawerOpen(true);
      return true;
    }
  };

  const removeCompare = (slug) => {
    const filtered = comparedColleges.filter(c => (c.slug || c.collegeId || c._id) !== slug);
    setComparedColleges(filtered);
    localStorage.setItem('collegepath_compare', JSON.stringify(filtered));
    showToast('Removed from comparison', 'info');
  };

  const clearAll = () => {
    setComparedColleges([]);
    localStorage.removeItem('collegepath_compare');
    setDrawerOpen(false);
    showToast('Comparison cleared', 'info');
  };

  return (
    <ComparisonContext.Provider value={{
      comparedColleges,
      isComparing,
      toggleCompare,
      removeCompare,
      clearAll,
      drawerOpen,
      setDrawerOpen,
      compareCount: comparedColleges.length,
      savedComparisons,
      saveCurrentComparison,
      loadSavedComparison,
      deleteSavedComparison
    }}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => useContext(ComparisonContext);
