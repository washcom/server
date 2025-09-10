// controllers/fiveDigitController.js
import { getFiveDigitModel } from "../models/fiveDigits.js";
import Employee from "../models/Employees.js";

export const createFiveDigitEmployee = async (req, res) => {
  try {
    const {
      serialNumber,
      officerName,
      jobGroup,
      designation,
      status,
      special,
      DOB,
      termsOfService,
      shelveLocation,
      payrollNo, // numeric payroll no from req.body
    } = req.body;

    if (!payrollNo) {
      return res.status(400).json({ message: "Payroll number is required" });
    }

    // 1. Check if Employee already exists by payrollNo
    const existingEmployee = await Employee.findOne({ payrollNo });
    if (existingEmployee) {
      return res
        .status(400)
        .json({ message: "Employee with this Payroll No already exists ❌" });
    }

    // 2. Create & Save Employee
    const employee = new Employee({
      payrollNo,
      officerName,
      jobGroup,
      designation,
      status,
      special,
      DOB,
      termsOfService,
    });

    await employee.save();

    // 3. Get last digit of payrollNo
    const payrollStr = String(payrollNo);
    const lastDigit = payrollStr[payrollStr.length - 1];

    // 4. Pick correct FiveDigits collection
    const FiveDigitModel = getFiveDigitModel(lastDigit);

    // 5. Check duplicates in FiveDigits
    const existingFiveDigit = await FiveDigitModel.findOne({
      $or: [
        { payrollNo: employee._id }, // same employee already exists
        { serialNumber }, // same serial number already exists
      ],
    });

    if (existingFiveDigit) {
      // rollback employee creation if duplicate found in 5-digit
      await Employee.findByIdAndDelete(employee._id);
      return res.status(400).json({
        message:
          "Duplicate detected ❌ (Employee already linked or Serial Number already exists)",
      });
    }

    // 6. Save 5-digit record
    const newRecord = new FiveDigitModel({
      serialNumber,
      payrollNo: employee._id,
      shelveLocation,
      status: "5-digit",
    });

    await newRecord.save();

    res.status(201).json({
      message: "Employee & 5-digit file saved successfully ✅",
      employee,
      fiveDigitRecord: newRecord,
    });
  } catch (error) {
    console.error("❌ Error creating record:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllFiveDigitFiles = async (req, res) => {
  try {
    const allFiles = [];

    for (let i = 0; i < 10; i++) {
      const FiveDigitModel = getFiveDigitModel(i);
      const files = await FiveDigitModel.find()
        .populate("payrollNo", "officerName payrollNo") // populate from Employee
        .lean();

      allFiles.push(...files);
    }
    res.status(200).json(allFiles);
  } catch (error) {
    console.error("❌ Error fetching 5-digit files:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};