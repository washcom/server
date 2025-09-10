import mongoose from 'mongoose';

const FilesFromCountySchema = new mongoose.Schema({
  dateReceived: {
    type: Date,
    required: true
  },
  payrollNo: {
    type: mongoose.Schema.Types.ObjectId,
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
  fileType: {
    type: String,
    enum: ['Temporary', 'Main']
  },
  comments: {
    type: String
  }
}, {
  timestamps: true
});
// 🔎 Add text index for search
FilesFromCountySchema.index({
  whereFrom: "text",
  fileType: "text",
  comments: "text"
});

// Virtual to get Employee details easily
FilesFromCountySchema.virtual("employeeDetails", {
  ref: "Employee",
  localField: "payrollNo",
  foreignField: "_id",
  justOne: true
});

// Static search helper
FilesFromCountySchema.statics.searchFiles = function (q) {
  return this.find({
    $or: [
      { whereFrom: { $regex: q, $options: "i" } },
      { fileType: { $regex: q, $options: "i" } },
      { comments: { $regex: q, $options: "i" } }
    ]
  }).populate("payrollNo");
};

export default mongoose.model('FilesFromCounty', FilesFromCountySchema);
