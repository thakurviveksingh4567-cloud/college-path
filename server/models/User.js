import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const savedCollegeSchema = new mongoose.Schema({
  collegeId: { type: String, required: true },
  notes: { type: String, default: '' },
  applicationStatus: { 
    type: String, 
    enum: ['Shortlisted', 'Applied', 'Entrance Scheduled', 'Counselling Registered', 'Admitted', 'Archived'],
    default: 'Shortlisted'
  },
  savedAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  avatar: { type: String },
  profile: {
    stream: { type: String, enum: ['PCM', 'PCB', 'Commerce', 'Arts', ''], default: 'PCM' },
    class12Percentage: { type: Number, min: 0, max: 100 },
    passingYear: { type: Number, default: 2026 },
    category: { type: String, enum: ['General', 'OBC-NCL', 'SC', 'ST', 'EWS'], default: 'General' },
    homeState: { type: String, default: 'Delhi' },
    preferredCourse: { type: String, default: 'B.Tech Computer Science & Engineering' },
    annualBudget: { type: Number, default: 300000 }, // in INR
    needHostel: { type: Boolean, default: true },
    preferredLocations: [String],
    entranceExams: {
      jeeMain: {
        taken: { type: Boolean, default: true },
        percentile: { type: Number },
        rank: { type: Number },
        year: { type: Number, default: 2026 }
      },
      cuet: {
        taken: { type: Boolean, default: false },
        score: { type: Number }, // out of 800
        percentile: { type: Number },
        subjects: [String],
        year: { type: Number, default: 2026 }
      },
      neet: {
        taken: { type: Boolean, default: false },
        score: { type: Number },
        rank: { type: Number }
      }
    }
  },
  savedColleges: [savedCollegeSchema]
}, {
  timestamps: true
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
