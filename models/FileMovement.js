import mongoose from 'mongoose';

const FileMovementSchema = new mongoose.Schema({
  // Reference to the Employee document
  payrollNo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // links to Employee model
    required: true
  },
  destination: {
    type: String,
    required: [true, 'Destination is required']
  },
  collectedBy: {
    type: String,
    required: [true, 'Collected By is required']
  },
  dateCollected: {
    type: Date,
    default: Date.now,
    required: true
  },
  dateReturned: {
    type: Date,
    default: null
  },
  returnedBy: {
    type: String,
    default: null
  },
  receivedBy: {
    type: String,
    default: null
  },
  fileType: {
    type: String,
    enum: ['Temporary', 'Main'],
    default: 'Main'
  }
}, {
  timestamps: true // automatically adds createdAt and updatedAt
});
FileMovementSchema.index({
  destination: "text",
  collectedBy: "text",
  returnedBy: "text",
  receivedBy: "text",
  fileType: "text"
});
export default mongoose.model('FileMovement', FileMovementSchema);
