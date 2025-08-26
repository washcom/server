import mongoose from 'mongoose';

const StampedFileSchema = new mongoose.Schema({
  serialNumber: {
    type: Number,  // changed from String to Number
    unique: true,
    required: true, // add required to enforce validation
  },  
  payrollNo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // references the Employee collection
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  shelveNumber: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('StampedFile', StampedFileSchema);
