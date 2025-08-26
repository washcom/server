import FilefromCounty from '../models/files_from_counties.js';
import Employees from '../models/Employees.js';
import files_from_counties from '../models/files_from_counties.js';
import semi_active_files from '../models/semi_active_files.js';
import files_to_counties from '../models/files_to_counties.js';
export const addFileFromCounty = async (req, res) => {
  const {
    dateReceived,
    payrollNo,
    volume,
    whereFrom,
    fileType,
    comments,
  } = req.body;

  // Basic validation
  if (!dateReceived || !payrollNo || !volume || !whereFrom || !fileType || !comments) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if employee exists using payrollNo
    const employeeExists = await Employees.findOne({ payrollNo });

    if (!employeeExists) {
      return res.status(404).json({
        message: 'Payroll No does not exist in the system!',
      });
    }

    const existingFile = await files_to_counties.findOne({ payrollNo: employeeExists._id });
    if (existingFile) {
      // Create new file
      const newFileFromCounty = new FilefromCounty({
        dateReceived,
        payrollNo: employeeExists._id,
        fileType,
        volume,
        whereFrom,
        comments,
      });
      await newFileFromCounty.save();
      // Update employee status 
      employeeExists.status = 'Semi-active'; // MUST match enum in schema
      await employeeExists.save();
      // Also create a semi-active file entry
      const semiActiveFile = new semi_active_files({
        payrollNo: employeeExists._id,
        comment: `File from county received: ${comments}`,
        status: 'processing',
      });
      await semiActiveFile.save();

      res.status(201).json({
        message: 'File from county added successfully',
        fileFromCounty: newFileFromCounty,
      });
    }
    else {
      return res.status(400).json({
        message: 'Cannot add file from county. No corresponding file to county found for this employee.',
      });
      console.log('No corresponding file to county found for this employee.');  
    }
  } catch (error) {
    console.error('Error adding file from county:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const allFromCounty = async (req, res) => {
  try {
    const allFiles = await files_from_counties.find().populate('payrollNo', 'payrollNo officerName');
    return res.status(200).json(allFiles);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}