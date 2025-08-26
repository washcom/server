import mongoose from 'mongoose';

const FilesToCountySchema = new mongoose.Schema({
  payrollNo: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'Employee',                       
    required: true,
  },
  engagement: {
    type: Date,
    required: true,
  },
  detachmentDate: {
    type: Date,
    required: true,
  },
  stationName: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

export default mongoose.model('FilesToCounty', FilesToCountySchema);
