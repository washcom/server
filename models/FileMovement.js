import mongoose from 'mongoose';

const FileMovementSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now // Current date
  },
  payrollNo: {  // Using payrollNo as a foreign key reference
    type: String,
    required: true,
    ref: 'Employee'
  },
  officerName: {
    type: String,
    required: true
  },
  destination: {
    type: String, // Department or office
    required: true
  },
  receivingOfficer: {
    type: String,
    required: true
  },
  dateCollected: {
    type: Date,
    required: true // Date when the file was collected
  },
  dateReturned: {
    type: Date,
    required: true // Date when the file was returned
  },
  whereTo: {
    type: String ,// Next destination
    required: true
  },
  receivedBy: {
    type: String ,// Name of the person who received
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('FileMovement', FileMovementSchema);
