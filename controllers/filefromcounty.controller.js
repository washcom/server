import FilefromCounty from '../models/files_from_counties.js';
import Employees from '../models/Employees.js';
import files_from_counties from '../models/files_from_counties.js';

export const addFileFromCounty = async (req, res) => {
  const {
    dateReceived,
    payrollNo,
    officerName,
    volumeCount,
    county,
    comments,
  } = req.body;

  // Basic validation
  if (!dateReceived || !payrollNo || !officerName || !volumeCount || !county) {
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

    // Create new file
    const newFileFromCounty = new FilefromCounty({
      dateReceived,
      payrollNo, 
      officerName,
      volumeCount,
      county,
      comments,
    });

    await newFileFromCounty.save();

    res.status(201).json({
      message: 'File from county added successfully',
      fileFromCounty: newFileFromCounty,
    });
  } catch (error) {
    console.error('Error adding file from county:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const allFromCounty = async (req, res) => {
  try {
    const allFiles = await files_from_counties.find();
    return res.status(200).json(allFiles);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}