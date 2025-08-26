import mongoose from 'mongoose';

const FilesFromCountySchema = new mongoose.Schema({
  dateReceived: {
    type: Date,
    required: true
  },
  payrollNo: {
    type: mongoose.Schema.Types.ObjectId ,
    ref: 'Employee',
    required: true
  },
  volume: {
    type: Number,
    required: true
  },
  whereFrom: {
    type: String,
    required: true
  },
  fileType:{
    type: String,
    enum: ['Temporary', 'Main']
  },
  comments: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model('FilesFromCounty', FilesFromCountySchema);
