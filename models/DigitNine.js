import mongoose from 'mongoose';

const DigitNineSchema = new mongoose.Schema({
  serialNumber: {
    type: Number,  // changed from String to Number
    unique: true,
    required: true, // enforce validation
  },
  payrollNo: {
    type: mongoose.Schema.Types.ObjectId,  // changed from String to ObjectId
    ref: 'Employee', // references the Employee collection
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

export default mongoose.model('Digit_9', DigitNineSchema);
