import React, { useState, useEffect } from 'react';
import { calendarAPI } from '../services/api';
import { 
  Calendar, 
  ExternalLink, 
  Clock, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  BellRing,
  ShieldCheck,
  Tag
} from 'lucide-react';

export const AdmissionCalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [examFilter, setExamFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const query = {};
        if (examFilter !== 'All') query.exam = examFilter;
        if (statusFilter !== 'All') query.status = statusFilter;
        if (search) query.search = search;

        const res = await calendarAPI.getAdmissionEvents(query);
        if (res.success) {
          setEvents(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [examFilter, statusFilter, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title Header */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white rounded-3xl p-6 sm:p-10 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold border border-blue-400/30">
            <BellRing className="w-3.5 h-3.5 text-amber-400" />
            <span>Real-Time Admission & Counselling Tracker 2026-27</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Admission Calendar & Deadlines
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Never miss an application deadline, admit card release, or seat allotment counselling round across JEE Main, CUET, JoSAA, and state authorities.
          </p>
        </div>

        <div className="bg-navy-800/80 p-4 rounded-2xl border border-navy-700 text-xs text-slate-300 shrink-0 max-w-xs space-y-1">
          <span className="font-bold text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>NTA & JoSAA Monitored</span>
          </span>
          <p className="text-[11px] text-slate-400">
            Dates and links are regularly checked against official gazette notifications.
          </p>
        </div>
      </div>

      {/* Filter Row */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-96 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search exam, counselling round or body..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={examFilter}
            onChange={(e) => setExamFilter(e.target.value)}
            className="py-2 px-3 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Exams & Portals</option>
            <option value="JEE Main">JEE Main</option>
            <option value="CUET UG">CUET UG</option>
            <option value="JoSAA">JoSAA / CSAB</option>
            <option value="Delhi University">Delhi University (DU)</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Live Now">Live Now</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Events Timeline / Listing */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-32 bg-slate-100 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-card space-y-2">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-navy-900">No Admission Events Found</h3>
          <p className="text-xs text-slate-500">Try adjusting your exam or status filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((evt, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card hover:shadow-soft transition flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="bg-navy-900 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {evt.examOrBody}
                  </span>
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200">
                    {evt.eventType}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    evt.status === 'Live Now'
                      ? 'bg-emerald-100 text-emerald-800 animate-pulse'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    ● {evt.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-navy-900">
                  {evt.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {evt.description}
                </p>

                {evt.importantInstructions && evt.importantInstructions.length > 0 && (
                  <div className="pt-2 text-xs text-slate-500 space-y-1">
                    {evt.importantInstructions.slice(0, 2).map((inst, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span>{inst}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Date Box & Link */}
              <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-left md:text-right">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">
                    Timeline Window
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-navy-900">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>{evt.startDate}</span>
                    {evt.endDate && <span>→ {evt.endDate}</span>}
                  </div>
                </div>

                <a
                  href={evt.officialPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-navy-900 hover:bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-xs"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
