import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collegeAPI } from '../services/api';
import { CollegeCard } from '../components/CollegeCard';
import { INDIAN_STATES, POPULAR_COURSES, STREAMS } from '../data/mockData';
import { 
  Search, 
  SlidersHorizontal, 
  GraduationCap, 
  Award, 
  Briefcase, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  ChevronRight, 
  ChevronDown, 
  Sparkles,
  Zap,
  TrendingUp,
  HelpCircle,
  FileText
} from 'lucide-react';

export const HomePage = () => {
  const navigate = useNavigate();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search Bar State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedCourse, setSelectedCourse] = useState('All Courses');

  // FAQ state
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await collegeAPI.getColleges({ limit: 6 });
        if (res.success) {
          setColleges(res.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append('search', searchQuery.trim());
    if (selectedState !== 'All States') params.append('state', selectedState);
    if (selectedCourse !== 'All Courses') params.append('course', selectedCourse);
    navigate(`/colleges?${params.toString()}`);
  };

  const faqs = [
    {
      q: "How does CollegePath predict my admission eligibility?",
      a: "Our rule-based recommendation engine compares your Class 12 percentage, chosen stream (PCM/PCB/Commerce/Arts), category reservation rules, domicile state, and entrance scores (JEE Main percentile, CUET) against the official previous session cutoffs of each institution. It accounts for category cutoffs (OBC, SC, ST, EWS) and home-state quotas."
    },
    {
      q: "Are the college fee and placement figures verified?",
      a: "Yes. All tuition and hostel fee details are cross-referenced with officially published institutional brochures and NIRF audit reports for the 2026-2027 cycle. Placement figures like median CTC are compiled from official Training & Placement reports. Unverified figures are marked 'Not Available'."
    },
    {
      q: "Can I use CollegePath if I haven't appeared for JEE Main or CUET?",
      a: "Absolutely! Many prestigious universities and colleges admit students strictly based on Class 12 board marks or state CETs. You can skip the entrance exam inputs in our Admission Predictor, and the engine will automatically filter colleges that offer merit-based admissions."
    },
    {
      q: "Does CollegePath charge any fee or promote private colleges?",
      a: "No. CollegePath is 100% free and unbiased. We do not accept sponsored rankings or hidden placement commissions. All recommendations are generated strictly based on transparent rules and verified data."
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 text-blue-300 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI & Rule-Based Admission Guidance for Class 12 Students</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Find Your Best College in India <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Based on Marks, Stream & Budget
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg max-w-3xl mx-auto font-normal leading-relaxed">
            Eliminate admission anxiety. Match your Class 12 marks, JEE Main percentile, or CUET score with verified cutoffs, accurate fee breakdowns, and real placement records across top Indian universities.
          </p>

          {/* Smart Search Form */}
          <div className="pt-4 max-w-4xl mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white p-3 sm:p-4 rounded-2xl shadow-soft-xl border border-slate-200 text-slate-800 flex flex-col md:flex-row items-center gap-3"
            >
              {/* College Name / Keyword */}
              <div className="flex-1 w-full relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search college name, city or branch..."
                  className="w-full pl-11 pr-3 py-3 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              {/* State Dropdown */}
              <div className="w-full md:w-48 relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full pl-9 pr-6 py-3 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700 appearance-none"
                >
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
              </div>

              {/* Course Dropdown */}
              <div className="w-full md:w-48 relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full pl-9 pr-6 py-3 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700 appearance-none"
                >
                  {POPULAR_COURSES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 shrink-0"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Stream Shortcuts */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Quick Explore by Stream:</span>
            {STREAMS.map((st) => (
              <Link
                key={st.id}
                to={`/colleges?stream=${st.id}`}
                className="bg-navy-700/70 hover:bg-blue-600 text-slate-200 hover:text-white px-3 py-1.5 rounded-lg border border-navy-600/50 transition font-medium flex items-center gap-1.5"
              >
                <span>{st.id}</span>
                <span className="text-[10px] text-slate-400">({st.name.split(' ')[0]})</span>
              </Link>
            ))}
          </div>

          {/* Trust Highlights */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center max-w-3xl mx-auto border-t border-navy-700/60">
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-blue-400">100%</p>
              <p className="text-xs text-slate-400 mt-0.5">Verified NIRF Data</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-emerald-400">0%</p>
              <p className="text-xs text-slate-400 mt-0.5">Hidden Commission</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-amber-400">8+ States</p>
              <p className="text-xs text-slate-400 mt-0.5">Comprehensive Datasets</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-purple-400">2026-27</p>
              <p className="text-xs text-slate-400 mt-0.5">Admission Cycle Active</p>
            </div>
          </div>

        </div>
      </section>

      {/* POPULAR COURSES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Top Degree Programs</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mt-1">
              Explore Popular Courses After Class 12
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Direct pathways into engineering, software development, AI & data science, and business management.
            </p>
          </div>
          <Link
            to="/colleges"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { name: "B.Tech CSE", tag: "Most In-Demand", desc: "Computer Science & Engineering", icon: Zap, link: "B.Tech CSE" },
            { name: "B.Tech AI & ML", tag: "High Growth", desc: "Artificial Intelligence & Robotics", icon: TrendingUp, link: "B.Tech AI & ML" },
            { name: "BCA", tag: "Top ROI", desc: "Bachelor of Computer Applications", icon: GraduationCap, link: "BCA" },
            { name: "BCA AI & ML", tag: "Emerging", desc: "BCA with Artificial Intelligence", icon: Sparkles, link: "BCA AI & ML" },
            { name: "BCA Data Science", tag: "Analytics", desc: "Big Data & Business Intelligence", icon: FileText, link: "BCA Data Science" },
            { name: "MCA", tag: "Postgrad", desc: "Master of Computer Applications", icon: Briefcase, link: "MCA" },
            { name: "MBA", tag: "Leadership", desc: "Master of Business Administration", icon: Award, link: "MBA" },
            { name: "B.Com (Hons)", tag: "Commerce Top", desc: "Finance, Tax & Capital Markets", icon: ShieldCheck, link: "B.Com (Hons)" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={`/colleges?course=${encodeURIComponent(item.link)}`}
                className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-card hover:border-blue-500 hover:shadow-soft-xl hover:-translate-y-1 transition group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-800 px-2 py-0.5 rounded-full transition">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-navy-900 group-hover:text-blue-600 transition">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {item.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ADMISSION PREDICTOR CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-navy-900 rounded-3xl p-8 sm:p-12 text-white shadow-soft-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="bg-white/10 text-blue-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
              Free Smart Predictor
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Know Which Colleges You Qualify For in 60 Seconds
            </h2>
            <p className="text-slate-200 text-sm leading-relaxed">
              Enter your Class 12 marks, JEE Main percentile, CUET score, category, and budget. Our rule engine will classify matching colleges as <strong className="text-emerald-300">Eligible</strong>, <strong className="text-amber-300">Potential Match</strong>, or <strong className="text-rose-300">Not Eligible</strong> with detailed match reasons.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/predictor"
                className="bg-white hover:bg-slate-100 text-blue-900 font-bold px-6 py-3 rounded-xl text-sm shadow-md transition flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                <span>Launch Admission Predictor</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-xs text-blue-200">
                ✓ No registration required for instant test
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED VERIFIED COLLEGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Top Ranked & Verified</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mt-1">
              Featured Indian Colleges (2026-27)
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Featuring IITs, NITs, Central Universities, and leading state & deemed institutions.
            </p>
          </div>
          <Link
            to="/colleges"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
          >
            <span>Explore All Colleges</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 bg-slate-100 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college) => (
              <CollegeCard key={college.slug} college={college} />
            ))}
          </div>
        )}
      </section>

      {/* HOW COLLEGEPATH WORKS */}
      <section className="bg-slate-100/70 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Simple 4-Step Process</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mt-1">
              How CollegePath Works For You
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Transparent, data-backed guidance designed specifically for the Indian admission ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Enter Academic Profile",
                desc: "Provide your Class 12 percentage, stream (PCM, PCB, Commerce, Arts), and optional entrance scores (JEE/CUET).",
                icon: FileText
              },
              {
                step: "02",
                title: "Apply Quotas & Budget",
                desc: "Specify your home state for domicile quota advantages, category (OBC/SC/ST/EWS), and annual budget.",
                icon: SlidersHorizontal
              },
              {
                step: "03",
                title: "Instant Rule Evaluation",
                desc: "Our engine checks your eligibility across courses, cutoffs, and budgets, clearly tagging why you qualify.",
                icon: CheckCircle2
              },
              {
                step: "04",
                title: "Compare & Apply Direct",
                desc: "Compare up to 3 colleges side by side, track application deadlines, and link directly to official portals.",
                icon: GraduationCap
              }
            ].map((st) => {
              const Icon = st.icon;
              return (
                <div key={st.step} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card relative">
                  <span className="text-3xl font-extrabold text-blue-100 absolute top-4 right-4">
                    {st.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-navy-900">{st.title}</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{st.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQS SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Common Questions</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Everything you need to know about college shortlisting and admission rules.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full p-4 sm:p-5 text-left font-bold text-sm text-navy-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
