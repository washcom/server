import mongoose from 'mongoose';

const DormantFileSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true
  },
  oldPayrollNo: {
    type: String,      
  },
  PayrollNo: {
    type:String,
    ref: 'Employee',
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  shelveNumber: {
    type: String,
    required: true
  },
  comments: {
    type: String
  },
  status: {
    type: String,
    default: 'Dormant',
    enum: ['Dormant']
  }
}, {
  timestamps: true
});

export default mongoose.model('DormantFile', DormantFileSchema);
