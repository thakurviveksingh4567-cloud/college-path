import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { collegeAPI } from '../services/api';
import { INDIAN_STATES, COLLEGE_TYPES } from '../data/mockData';
import { 
  ShieldAlert, 
  Plus, 
  Trash2, 
  Edit, 
  RotateCcw, 
  CheckCircle2, 
  X, 
  Search, 
  Building2, 
  GraduationCap, 
  IndianRupee,
  Briefcase
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const { user, showToast } = useAuth();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    shortName: '',
    collegeType: 'IIT',
    city: '',
    state: 'Delhi',
    nirfRank: '',
    naacGrade: 'A+',
    tuitionFeePerYear: 150000,
    hostelFeePerYear: 40000,
    medianCTC: 12.0,
    highestCTC: 45.0,
    counsellingBody: 'JoSAA / CSAB',
    applicationDeadline: '2026-06-30',
    website: 'https://example.edu.in',
    admissionPortal: 'https://josaa.nic.in',
    courseName: 'B.Tech Computer Science & Engineering',
    degree: 'B.Tech',
    streamRequired: 'PCM',
    minClass12Percentage: 75
  });

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const res = await collegeAPI.getColleges({ limit: 100 });
      if (res.success) {
        setColleges(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const handleOpenAdd = () => {
    setEditingSlug(null);
    setFormData({
      name: '',
      slug: '',
      shortName: '',
      collegeType: 'NIT',
      city: 'Chandigarh',
      state: 'Punjab',
      nirfRank: '45',
      naacGrade: 'A+',
      tuitionFeePerYear: 140000,
      hostelFeePerYear: 35000,
      medianCTC: 11.5,
      highestCTC: 42.0,
      counsellingBody: 'JoSAA / CSAB',
      applicationDeadline: '2026-06-25',
      website: 'https://example.ac.in',
      admissionPortal: 'https://josaa.nic.in',
      courseName: 'B.Tech Computer Science & Engineering',
      degree: 'B.Tech',
      streamRequired: 'PCM',
      minClass12Percentage: 75
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (college) => {
    setEditingSlug(college.slug);
    const primaryCourse = college.courses?.[0] || {};
    setFormData({
      name: college.name || '',
      slug: college.slug || '',
      shortName: college.shortName || '',
      collegeType: college.collegeType || 'IIT',
      city: college.location?.city || '',
      state: college.location?.state || 'Delhi',
      nirfRank: college.accreditation?.nirfRank || '',
      naacGrade: college.accreditation?.naacGrade || 'A+',
      tuitionFeePerYear: primaryCourse.tuitionFeePerYear || 150000,
      hostelFeePerYear: college.hostelFacilities?.feePerYear || 40000,
      medianCTC: college.placements?.medianCTC || 10.0,
      highestCTC: college.placements?.highestCTC || 40.0,
      counsellingBody: college.admissionProcess?.counsellingBody || 'JoSAA',
      applicationDeadline: college.admissionProcess?.applicationDeadline || '2026-06-30',
      website: college.officialLinks?.website || '',
      admissionPortal: college.officialLinks?.admissionPortal || '',
      courseName: primaryCourse.name || 'B.Tech CSE',
      degree: primaryCourse.degree || 'B.Tech',
      streamRequired: primaryCourse.streamRequired?.[0] || 'PCM',
      minClass12Percentage: primaryCourse.minClass12Percentage || 75
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      shortName: formData.shortName || formData.name,
      collegeType: formData.collegeType,
      location: {
        city: formData.city,
        state: formData.state,
      },
      accreditation: {
        nirfRank: Number(formData.nirfRank) || null,
        naacGrade: formData.naacGrade
      },
      streamsSupported: [formData.streamRequired],
      courses: [
        {
          name: formData.courseName,
          degree: formData.degree,
          duration: '4 Years',
          streamRequired: [formData.streamRequired],
          tuitionFeePerYear: Number(formData.tuitionFeePerYear),
          minClass12Percentage: Number(formData.minClass12Percentage),
          acceptedExams: [
            {
              examName: 'JEE Main / Direct Entrance',
              expectedPercentileGeneral: 90
            }
          ]
        }
      ],
      hostelFacilities: {
        available: true,
        feePerYear: Number(formData.hostelFeePerYear)
      },
      placements: {
        verified: true,
        medianCTC: Number(formData.medianCTC),
        highestCTC: Number(formData.highestCTC),
        topRecruiters: ['Amazon', 'Microsoft', 'TCS', 'Infosys']
      },
      admissionProcess: {
        counsellingBody: formData.counsellingBody,
        applicationDeadline: formData.applicationDeadline
      },
      officialLinks: {
        website: formData.website,
        admissionPortal: formData.admissionPortal
      },
      lastVerifiedDate: '2026-11-20',
      description: `${formData.name} is a leading educational institution located in ${formData.city}, ${formData.state}.`
    };

    try {
      if (editingSlug) {
        await collegeAPI.updateCollege(editingSlug, payload);
        showToast('College record updated successfully', 'success');
      } else {
        await collegeAPI.createCollege(payload);
        showToast('New college added to database', 'success');
      }
      setModalOpen(false);
      fetchColleges();
    } catch (err) {
      showToast(err.response?.data?.message || err.message, 'error');
    }
  };

  const handleDelete = async (slug) => {
    if (!window.confirm(`Are you sure you want to delete this college?`)) return;
    try {
      await collegeAPI.deleteCollege(slug);
      showToast('College deleted', 'info');
      fetchColleges();
    } catch (err) {
      showToast('Failed to delete college', 'error');
    }
  };

  const handleResetColleges = async () => {
    if (!window.confirm('Reset all colleges back to the verified default dataset? Any manual additions will be reverted.')) return;
    try {
      await collegeAPI.resetColleges();
      showToast('Reset to default verified dataset', 'success');
      fetchColleges();
    } catch (err) {
      showToast('Failed to reset dataset', 'error');
    }
  };

  const filtered = colleges.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.location?.city?.toLowerCase().includes(search.toLowerCase()) ||
    c.location?.state?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Title Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-navy-900 to-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4 border border-purple-900/50">
        <div>
          <span className="bg-purple-600/40 text-purple-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider border border-purple-500/30">
            Platform Administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            College & Course Data Manager
          </h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Manage colleges across India, update tuition/hostel fees, cutoff percentiles, and application deadlines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetColleges}
            className="bg-navy-800 hover:bg-navy-700 text-slate-300 hover:text-white px-3.5 py-2.5 rounded-xl text-xs font-semibold border border-navy-700 flex items-center gap-1.5 transition"
            title="Reset to default seed data"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Dataset</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New College</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Colleges</span>
          <span className="text-2xl font-extrabold text-navy-900">{colleges.length}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">States Covered</span>
          <span className="text-2xl font-extrabold text-blue-600">8+ States</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Session</span>
          <span className="text-2xl font-extrabold text-emerald-600">2026-27</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Access Role</span>
          <span className="text-2xl font-extrabold text-purple-600">Admin</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter colleges by name or location..."
          className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
        />
      </div>

      {/* Colleges Management Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px] tracking-wider">
                <th className="p-4">College Name</th>
                <th className="p-4">Location</th>
                <th className="p-4">Type</th>
                <th className="p-4">NIRF Rank</th>
                <th className="p-4">Tuition Fee</th>
                <th className="p-4">Median CTC</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((college) => {
                const slug = college.slug || college.collegeId || college._id;
                const fee = college.courses?.[0]?.tuitionFeePerYear || college.tuitionFeePerYear;
                return (
                  <tr key={slug} className="hover:bg-slate-50/80 transition">
                    <td className="p-4">
                      <strong className="text-navy-900 block font-bold">{college.name}</strong>
                      <span className="text-[10px] text-slate-400 font-normal">{college.shortName}</span>
                    </td>
                    <td className="p-4">
                      {college.location?.city || college.city}, {college.location?.state || college.state}
                    </td>
                    <td className="p-4">
                      <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[10px] font-bold">
                        {college.collegeType}
                      </span>
                    </td>
                    <td className="p-4">
                      {college.accreditation?.nirfRank ? (
                        <span className="text-amber-700 font-bold">#{college.accreditation.nirfRank}</span>
                      ) : 'N/A'}
                    </td>
                    <td className="p-4 font-bold text-navy-900">
                      {typeof fee === 'number' ? `₹${fee.toLocaleString('en-IN')}` : fee}
                    </td>
                    <td className="p-4 font-bold text-emerald-700">
                      {college.placements?.medianCTC ? `${college.placements.medianCTC} LPA` : (college.medianCTC || 'N/A')}
                    </td>
                    <td className="p-4 text-right space-x-1">
                      <button
                        onClick={() => handleOpenEdit(college)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit College"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(slug)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Delete College"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit College Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-soft-xl border border-slate-200 overflow-hidden my-8">
            <div className="bg-purple-950 text-white p-5 flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-purple-400" />
                <span>{editingSlug ? 'Edit College Record' : 'Add New Indian College'}</span>
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">College Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Punjab Engineering College"
                    className="w-full py-2 px-3 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Short Name / Acronym</label>
                  <input
                    type="text"
                    value={formData.shortName}
                    onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                    placeholder="e.g. PEC Chandigarh"
                    className="w-full py-2 px-3 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">College Type</label>
                  <select
                    value={formData.collegeType}
                    onChange={(e) => setFormData({ ...formData, collegeType: e.target.value })}
                    className="w-full py-2 px-3 rounded-lg border border-slate-300 bg-white"
                  >
                    {COLLEGE_TYPES.filter(t => t !== 'All').map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">State / Territory</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full py-2 px-3 rounded-lg border border-slate-300 bg-white"
                  >
                    {INDIAN_STATES.filter(s => s !== 'All States').map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Chandigarh"
                    className="w-full py-2 px-3 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">NIRF Overall / Engg Rank</label>
                  <input
                    type="number"
                    value={formData.nirfRank}
                    onChange={(e) => setFormData({ ...formData, nirfRank: e.target.value })}
                    placeholder="e.g. 42"
                    className="w-full py-2 px-3 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Annual Tuition Fee (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.tuitionFeePerYear}
                    onChange={(e) => setFormData({ ...formData, tuitionFeePerYear: e.target.value })}
                    className="w-full py-2 px-3 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Annual Hostel Fee (₹)</label>
                  <input
                    type="number"
                    value={formData.hostelFeePerYear}
                    onChange={(e) => setFormData({ ...formData, hostelFeePerYear: e.target.value })}
                    className="w-full py-2 px-3 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Median CTC (LPA)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.medianCTC}
                    onChange={(e) => setFormData({ ...formData, medianCTC: e.target.value })}
                    placeholder="e.g. 11.5"
                    className="w-full py-2 px-3 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Highest CTC (LPA)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.highestCTC}
                    onChange={(e) => setFormData({ ...formData, highestCTC: e.target.value })}
                    placeholder="e.g. 45.0"
                    className="w-full py-2 px-3 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Counselling Authority</label>
                  <input
                    type="text"
                    value={formData.counsellingBody}
                    onChange={(e) => setFormData({ ...formData, counsellingBody: e.target.value })}
                    placeholder="e.g. JoSAA / CSAB / JAC"
                    className="w-full py-2 px-3 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Application Deadline</label>
                  <input
                    type="date"
                    value={formData.applicationDeadline}
                    onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                    className="w-full py-2 px-3 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md transition"
                >
                  {editingSlug ? 'Update College' : 'Add to Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
