import SemiActive from '../models/semi_active_files.js';
import Employees from '../models/Employees.js';

// Create Semi Active File
export const createSemiActive = async (req, res) => {
    try {
        console.log("📥 Incoming request to create Semi Active File:", req.body);

        const { payrollNo, comment, status } = req.body;

        if (!payrollNo || !comment) {
            console.warn("⚠️ Missing required fields:", { payrollNo, comment });
            return res.status(400).json({ message: "Payroll No and Comments are required" });
        }

        // 1. Find employee by payrollNo
        console.log("🔍 Searching for employee with payrollNo:", payrollNo);
        const employee = await Employees.findOne({ payrollNo });

        if (!employee) {
            console.warn("❌ Employee not found with payrollNo:", payrollNo);
            return res.status(404).json({ message: "Employee not found" });
        }

        console.log("✅ Employee found:", employee);

        // 2. Create semi-active file referencing the employee
        const semiActiveFile = new SemiActive({
            payrollNo: employee._id,
            comment,
            status: status || "processing", // default to processing
        });

        console.log("📝 New Semi Active File object created:", semiActiveFile);

        await semiActiveFile.save();
        console.log("💾 Semi Active File saved successfully:", semiActiveFile._id);         
        employee.status = "Semi-active"; // MUST match enum in schema
        await employee.save();
        console.log(`🔄 Employee status updated to 'Semi-active' for payrollNo: ${payrollNo}`);

        // 3. Populate employee details
        const populatedFile = await SemiActive.findById(semiActiveFile._id)
            .populate("payrollNo", "payrollNo officerName jobGroup");

        console.log("📤 Returning populated Semi Active File:", populatedFile);

        return res.status(201).json(populatedFile);
    } catch (error) {
        console.error("🔥 Error creating Semi Active File:", error.message);
        console.error(error.stack); // Full stack trace
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Fetch All Semi Active Files
export const allSemiActive = async (req, res) => {
    try {
        console.log("📥 Fetching all Semi Active Files...");

        const allFiles = await SemiActive.find()
            .populate("payrollNo", "payrollNo officerName jobGroup");

        console.log(`📊 Found ${allFiles.length} semi-active files`);

        return res.status(200).json({ files: allFiles, count: allFiles.length });
    } catch (error) {
        console.error("🔥 Error fetching Semi Active Files:", error.message);
        console.error(error.stack);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
