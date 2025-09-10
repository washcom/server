import mongoose from 'mongoose';
import SemiActiveFile from './semi_active_files.js';

const EmployeeSchema = new mongoose.Schema({
  payrollNo: {
    type: Number,
    required: true,
    unique: true
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
    enum: ['Active', 'Semi-active', 'Stamped', 'Dormant','County',"5-digit"],
  },
  special: {
    type: Boolean,
    default: false,
    required: true
  },
  DOB: {
    type: Date,
    required: true
  },
  termsOfService: {
    type: String,
    required: true,
    enum: [
      'Permanent and pensionable',
      'Permanent',
      'Probation',
      'Temporary',
      'Local contract',
      'Supernumerary',
      'ESP'
    ]
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for age calculation
EmployeeSchema.virtual('age').get(function () {
  if (!this.DOB) return null;

  const today = new Date();
  let age = today.getFullYear() - this.DOB.getFullYear();
  const m = today.getMonth() - this.DOB.getMonth();

  // Adjust age if birthday hasn’t occurred yet this year
  if (m < 0 || (m === 0 && today.getDate() < this.DOB.getDate())) {
    age--;
  }

  return age;
});

// Static method to update statuses and create SemiActiveFile
EmployeeSchema.statics.updateEmployeeStatuses = async function () {
  const employees = await this.find();
  const today = new Date();

  for (const emp of employees) {
    let age = today.getFullYear() - emp.DOB.getFullYear();
    const m = today.getMonth() - emp.DOB.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < emp.DOB.getDate())) age--;

    let newStatus = emp.status;

    if (!emp.special && age >= 60 && emp.status === 'Active') newStatus = 'Semi-active';
    if (emp.special && age >= 65 && emp.status === 'Active') newStatus = 'Semi-active';

    if (newStatus !== emp.status) {
      emp.status = newStatus;
      await emp.save();
      console.log(`Updated ${emp.officerName} to Semi-active.`);

      // Create SemiActiveFile if it doesn't exist
      const existingFile = await SemiActiveFile.findOne({ payrollNo: emp._id });
      if (!existingFile) {
        await SemiActiveFile.create({
          payrollNo: emp._id,
          comment: 'Automatically moved to semi-active due to age.',
          status: 'processing'
        });
        console.log(`Created SemiActiveFile for ${emp.officerName}.`);
      }
    }
  }
};
// Text index for search functionality
EmployeeSchema.index({
  payrollNo: "text",   // numeric but stored as text index for search
  officerName: "text",
  jobGroup: "text",
  designation: "text",
  status: "text",
  termsOfService: "text"
});

export default mongoose.model('Employee', EmployeeSchema);
