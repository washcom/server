import mongoose from 'mongoose';

const SecondmentSchema = new mongoose.Schema({
  payrollNo: {
    type: String,
    ref: 'Employee',
    required: true
  },
  fileName: {
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
  secondmentOfficer: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['TOS', 'Secondment'],
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Secondment', SecondmentSchema);
