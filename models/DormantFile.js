import mongoose from "mongoose";

const dormantFileSchema = new mongoose.Schema({
  serialNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  oldPayrollNo: {
    type: Number,
    
  },
  newPayrollNo: {
    type: Number,    
    required: true,
  },
  officerName: {
    type: String,
    required: true,
  },
  shelveLocation: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Dormant", 
    immutable: true,    
  }
}, { timestamps: true });

// Generate models for each year (1970–2016)
const dormantFileModels = {};

for (let year = 1970; year <= 2016; year++) {
  dormantFileModels[year] = mongoose.model(
    `DormantFile_${year}`,   
    dormantFileSchema,       
    `dormantfiles_${year}`   
  );
}

export default dormantFileModels;
