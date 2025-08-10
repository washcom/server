import DormantFile from "../models/DormantFile.js";
import Employees from "../models/Employees.js";

export const CreateDormantFile = async (req, res) => {
    const { serialNumber, oldPayrollNo, PayrollNo, fileName, shelveNumber, comments } = req.body;
    if (!serialNumber || !fileName || !shelveNumber) {
        return res.status(400).json({ message: 'Serial number, file name, and shelve number are required.' });
    }
    const serialNumberExists = await DormantFile.findOne({ serialNumber });
    if (serialNumberExists) {
        return res.status(400).json({ message: 'Serial number already exists.' });
    }
    const dormantFileExists = await DormantFile.findOne({ PayrollNo });
    if (dormantFileExists) {
        return res.status(400).json({ message: 'Dormant file already exists for this payroll number.' });
    }
    const EmployeeExists = await Employees.findOne({ payrollNo: PayrollNo });
    const OldEmployeeExists = await Employees.findOne({ payrollNo: oldPayrollNo });
    if (!EmployeeExists && !OldEmployeeExists) {
        return res.status(404).json({ message: 'Employee not found.' });
    }
    else if(EmployeeExists || OldEmployeeExists) {
        try {
            const dormantFile = new DormantFile({
                serialNumber,
                oldPayrollNo,
                PayrollNo,
                fileName,
                shelveNumber,
                comments
            });
            const savedFile = await dormantFile.save();
            res.status(201).json(savedFile);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
export const allDormant =async(req,res)=>{
    try {
        const allFiles = await DormantFile.find();
        return res.status(200).json(allFiles);
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
    }
}