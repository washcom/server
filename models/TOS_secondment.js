import mongoose from 'mongoose';

const SecondmentSchema = new mongoose.Schema({
  payrollNo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  fileType: {
    type: String,
    enum: ['Main', 'Temporary'],
    required: true,
    default: 'Main'

  },
  institution: {
    type: String,
    required: true
  },
  shelveLocation: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['TOS', 'Secondment'],
    required: true,
    default: 'TOS'
  },
  comment: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model('Secondment', SecondmentSchema);
