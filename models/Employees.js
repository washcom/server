import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  payrollNo: {
    type: String,
    required: true,
    unique: true,    
  },
  oldPayrollNo:{
    type:'String',
    unique:true,
  },
  officerName: {
    type: String,
    required: true
  },
  jobGroup: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Active',
    enum: ['Active', 'Inactive', 'Retired', 'Deceased']
  }
}, {
  timestamps: true
});

export default mongoose.model('Employee', EmployeeSchema);
