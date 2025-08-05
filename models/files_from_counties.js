import mongoose from 'mongoose';

const FilesFromCountySchema = new mongoose.Schema({
  dateReceived: {
    type: Date,
    required: true
  },
  payrollNo: {
    type: String,
    ref: 'Employee',
    required: true
  },
  officerName: {
    type: String,
    required: true
  },
  volumeCount: {
    type: Number,
    required: true
  },
  county: {
    type: String,
    required: true
  },
  comments: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model('FilesFromCounty', FilesFromCountySchema);
