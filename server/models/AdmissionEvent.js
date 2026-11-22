import mongoose from 'mongoose';

const admissionEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  examOrBody: { type: String, required: true }, // JEE Main, CUET UG, JoSAA, CSAB, BITSAT, NEET UG, JAC Delhi
  eventType: { 
    type: String, 
    enum: ['Application Window', 'Admit Card', 'Exam Date', 'Result Declaration', 'Counselling Registration', 'Seat Allotment', 'Fee Payment Deadline'],
    required: true 
  },
  streamsApplicable: [{ type: String, enum: ['PCM', 'PCB', 'Commerce', 'Arts', 'All'] }],
  startDate: { type: String, required: true },
  endDate: { type: String },
  sessionYear: { type: String, default: '2026-2027' },
  status: { type: String, enum: ['Upcoming', 'Live Now', 'Closed', 'Tentative'], default: 'Upcoming' },
  description: { type: String },
  officialPortal: { type: String, required: true },
  importantInstructions: [String],
  verifiedDate: { type: String, default: '2026-11-15' }
}, {
  timestamps: true
});

const AdmissionEvent = mongoose.model('AdmissionEvent', admissionEventSchema);
export default AdmissionEvent;
