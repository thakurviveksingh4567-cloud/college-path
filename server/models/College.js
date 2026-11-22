import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  degree: { type: String, required: true }, // B.Tech, B.Com, B.A., MBBS, B.Sc, BBA, B.Des, etc.
  duration: { type: String, default: '4 Years' },
  streamRequired: [{ type: String, enum: ['PCM', 'PCB', 'Commerce', 'Arts', 'Any'] }],
  tuitionFeePerYear: { type: Number, required: true },
  hostelFeePerYear: { type: Number, default: 0 },
  intakeSeats: { type: Number, default: 60 },
  minClass12Percentage: { type: Number, required: true },
  categoryRelaxation: {
    OBC: { type: Number },
    SC: { type: Number },
    ST: { type: Number },
    EWS: { type: Number },
    PwD: { type: Number }
  },
  acceptedExams: [{
    examName: { type: String, required: true }, // JEE Main, CUET, NEET, BITSAT, State CET, Direct/Merit
    examType: { type: String, default: 'National' },
    expectedPercentileGeneral: { type: Number },
    expectedRankGeneral: { type: Number },
    expectedScoreCUET: { type: Number },
    categoryCutoffs: {
      OBC: { type: Number },
      SC: { type: Number },
      ST: { type: Number },
      EWS: { type: Number }
    }
  }],
  specializations: [String],
  verifiedDate: { type: String, default: '2026-11-01' }
});

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  shortName: { type: String, required: true },
  collegeType: { 
    type: String, 
    required: true, 
    enum: ['IIT', 'NIT', 'IIIT', 'Central University', 'State Government', 'Deemed University', 'Top Private'] 
  },
  location: {
    city: { type: String, required: true },
    state: { type: String, required: true },
    address: { type: String },
    isMetro: { type: Boolean, default: false },
    campusAreaAcres: { type: Number }
  },
  accreditation: {
    naacGrade: { type: String, default: 'A+' },
    nirfRank: { type: Number },
    nirfCategory: { type: String, default: 'Overall' }
  },
  establishedYear: { type: Number },
  streamsSupported: [{ type: String, enum: ['PCM', 'PCB', 'Commerce', 'Arts'] }],
  courses: [courseSchema],
  hostelFacilities: {
    available: { type: Boolean, default: true },
    feePerYear: { type: Number, default: 45000 },
    messIncluded: { type: Boolean, default: true },
    details: { type: String }
  },
  placements: {
    verified: { type: Boolean, default: true },
    batchYear: { type: String, default: '2025-2026' },
    averageCTC: { type: Number }, // In LPA
    medianCTC: { type: Number }, // In LPA
    highestCTC: { type: Number }, // In LPA
    placementPercentage: { type: Number },
    topRecruiters: [String],
    sourceNote: { type: String, default: 'Verified via NIRF & Official Placement Cell Report' }
  },
  scholarships: [{
    title: { type: String, required: true },
    description: { type: String },
    amount: { type: String },
    eligibility: { type: String },
    link: { type: String }
  }],
  admissionProcess: {
    counsellingBody: { type: String, required: true }, // JoSAA, CSAB, CUET NTA CSAS, JAC Delhi, etc.
    counsellingLink: { type: String },
    sessionYear: { type: String, default: '2026-2027' },
    applicationDeadline: { type: String },
    steps: [String]
  },
  officialLinks: {
    website: { type: String, required: true },
    admissionPortal: { type: String, required: true },
    brochureUrl: { type: String }
  },
  description: { type: String, required: true },
  featured: { type: Boolean, default: false },
  lastVerifiedDate: { type: String, default: '2026-11-15' },
  images: {
    hero: { type: String },
    logo: { type: String },
    gallery: [String]
  }
}, {
  timestamps: true
});

const College = mongoose.model('College', collegeSchema);
export default College;
