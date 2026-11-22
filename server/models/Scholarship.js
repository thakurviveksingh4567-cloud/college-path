import mongoose from 'mongoose';

const scholarshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  provider: { type: String, required: true }, // e.g. Ministry of Education, Reliance Foundation, Tata Trust, AICTE
  type: { 
    type: String, 
    enum: ['Government Central', 'State Government', 'Private Foundation', 'Corporate CSR', 'Merit-based', 'Need-based'],
    default: 'Government Central'
  },
  applicableStreams: [{ type: String, enum: ['PCM', 'PCB', 'Commerce', 'Arts', 'All'] }],
  amountDetails: {
    amount: { type: String, required: true }, // e.g. "₹50,000 per year" or "Full Tuition Waiver"
    maxLumpsum: { type: Number },
    isPerYear: { type: Boolean, default: true }
  },
  eligibility: {
    minClass12Percentage: { type: Number, default: 60 },
    maxFamilyIncomePerYear: { type: Number }, // in INR e.g. 600000 (6 Lakhs)
    categoriesEligible: [{ type: String }],
    gender: { type: String, enum: ['All', 'Female Only', 'Transgender & Female'], default: 'All' },
    domicileState: { type: String, default: 'All India' },
    summary: { type: String, required: true }
  },
  applicationPeriod: {
    startDate: { type: String },
    deadline: { type: String, required: true },
    academicYear: { type: String, default: '2026-2027' },
    status: { type: String, enum: ['Active', 'Upcoming', 'Closed'], default: 'Active' }
  },
  officialLink: { type: String, required: true },
  requiredDocuments: [String],
  verifiedDate: { type: String, default: '2026-11-10' }
}, {
  timestamps: true
});

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);
export default Scholarship;
