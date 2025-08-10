import mongoose from 'mongoose';

const DigitEightSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    unique: true, // optional: remove this if duplicates are allowed
  },
  fileName: {
    type: String,
    required: true
  },
  payrollNo: {
    type: String,
    ref: 'Employee',
    required: true
  },
  status: {
    type: String,
    required: true
  },
  shelveNumber: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Digit_8', DigitEightSchema );
