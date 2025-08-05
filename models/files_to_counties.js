import mongoose from 'mongoose';

const FilesToCountySchema = new mongoose.Schema({
  payrollNo: {
    type: String,
    ref: 'Employee',
    required: true
  },
  officerName: {
    type: String,
    required: true
  },
  jobGroup: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  engagement: {
    type: Date,
    required: true
  },
  detachmentDate: {
    type: Date,
    required: true
  },
  stationName: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('FilesToCounty', FilesToCountySchema);
