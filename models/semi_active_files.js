import mongoose from 'mongoose';

const SemiActiveFileSchema = new mongoose.Schema({
  payrollNo: {
    type: String,
    ref: 'Employee',
    required: true
  },
  jobGroup: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    required: true 
  },
  status: {
    type: String,
    default: 'Semi-Active',
    enum: ['Semi-Active']
  }
}, {
  timestamps: true
});

export default mongoose.model('SemiActiveFile', SemiActiveFileSchema);
