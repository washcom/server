import mongoose from 'mongoose';

const SemiActiveFileSchema = new mongoose.Schema(
  {
    payrollNo: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Employee',
      required: true,
    },   
    comment: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'processing',
      enum: ['processing','processed'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('SemiActiveFile', SemiActiveFileSchema);
