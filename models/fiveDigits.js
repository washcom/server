import mongoose from "mongoose";
import Employee from "./Employees.js";

// Common schema for all digit collections
const FiveDigitsSchema = new mongoose.Schema(
  {
    serialNumber: {
      type: Number,
      required: true,
      // Uniqueness enforced per digit collection
      unique: true,
    },
    payrollNo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    shelveLocation: {
      type: String,
      required: true, // comes from req.body
      trim: true,
    },
    status: {
      type: String,
      enum: ["5-digit"], // only allowed value
      default: "5-digit",
      required: true,
    },
  },
  { timestamps: true }
);

// Cache models by digit to avoid recompilation
const modelsByDigit = {};

// Get or create model for a given last digit
export function getFiveDigitModel(lastDigit) {
  const modelName = `FiveDigits_${lastDigit}`;
  if (!modelsByDigit[modelName]) {
    modelsByDigit[modelName] = mongoose.model(
      modelName,
      FiveDigitsSchema,
      `five_digits_${lastDigit}` // actual collection name in DB
    );
  }
  return modelsByDigit[modelName];
}
