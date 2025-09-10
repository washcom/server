import dormantFileModels from "../models/DormantFile.js";
import Employees from "../models/Employees.js";
// 📌 Create Dormant File and auto-create Employee
export const createDormantFileAndEmployee = async (req, res) => {
  try {
    let {
      serialNumber,
      oldPayrollNo,
      newPayrollNo,
      officerName,
      shelveLocation,
      year,
      jobGroup,
      designation,
      DOB,
      termsOfService,
      special,
      status,
    } = req.body;

    // ✅ Validate required fields
    if (!serialNumber || !newPayrollNo || !officerName || !shelveLocation || !year) {
      return res.status(400).json({
        message:
          "Serial number, payroll number, officer name, shelve location, and year are required.",
      });
    }

    // 🔢 Cast to numbers (avoid CastErrors)
    serialNumber = Number(serialNumber);
    newPayrollNo = Number(newPayrollNo);
    if (oldPayrollNo) oldPayrollNo = Number(oldPayrollNo);

    // ✅ Validate year and select correct model
    const DormantFile = dormantFileModels[year];
    if (!DormantFile) {
      return res
        .status(400)
        .json({ message: `Invalid year: ${year}. Only 1970–2016 allowed.` });
    }

    // ✅ Check uniqueness in Dormant files
    const serialExists = await DormantFile.findOne({ serialNumber });
    if (serialExists) {
      return res
        .status(400)
        .json({ message: `Serial number already exists for year ${year}.` });
    }

    const payrollExists = await DormantFile.findOne({ newPayrollNo });
    if (payrollExists) {
      return res.status(400).json({
        message: `Dormant file already exists for payroll number ${newPayrollNo} in year ${year}.`,
      });
    }

    // ✅ Create Dormant File
    const dormantFile = new DormantFile({
      serialNumber,
      oldPayrollNo,
      newPayrollNo,
      officerName,
      shelveLocation,
    });
    const savedFile = await dormantFile.save();

    // ✅ Ensure Employee is created (or update if already exists)
    let employee = await Employees.findOne({ payrollNo: newPayrollNo });

    if (!employee) {
      employee = new Employees({
        payrollNo: newPayrollNo,
        officerName,
        jobGroup: jobGroup || "Unknown",
        designation: designation || "Unknown",
        DOB: DOB || "1900-01-01",
        termsOfService: termsOfService || "Dormant auto-created",
        status: status || "Dormant",
        special: special || false,
      });
      await employee.save();
    } else {
      // 🔄 Update existing employee with latest details (optional)
      employee.officerName = officerName || employee.officerName;
      employee.jobGroup = jobGroup || employee.jobGroup;
      employee.designation = designation || employee.designation;
      employee.DOB = DOB || employee.DOB;
      employee.termsOfService = termsOfService || employee.termsOfService;
      employee.status = status || employee.status || "Dormant";
      employee.special = special ?? employee.special;
      await employee.save();
    }

    return res.status(201).json({
      message: "Dormant file and employee created/updated successfully",
      dormantFile: savedFile,
      employee,
    });
  } catch (error) {
    console.error("Error creating dormant file & employee:", error);
    return res.status(500).json({
      message: "Server error while creating dormant file & employee",
      error: error.message,
    });
  }
};
// 📌 Get all dormant files across all years
export const allDormant = async (req, res) => {
    try {
        let allFiles = [];
        for (let year = 1970; year <= 2016; year++) {
            const DormantFile = dormantFileModels[year];
            const files = await DormantFile.find();
            allFiles = allFiles.concat(files);
        }
        return res.status(200).json(allFiles);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
