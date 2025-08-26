import files_to_counties from "../models/files_to_counties.js";
import Employees from "../models/Employees.js";
import express from 'express';

export const addFilesToCounty = async (req, res) => {
    const { payrollNo, engagementDate, detachmentDate, stationName } = req.body;

    if (!payrollNo || !engagementDate || !detachmentDate || !stationName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const employeeExists = await Employees.findOne({ payrollNo });
    if (!employeeExists) {
        return res.status(404).json({ message: 'Payroll no does not exist' });
    }

    try {
        // Create new record in files_to_counties
        const newFileToCounty = new files_to_counties({
            payrollNo: employeeExists._id,
            engagement: engagementDate,
            detachmentDate,
            stationName
        });
        await newFileToCounty.save();

        // Update Employee status to "County"
        employeeExists.status = "County";
        await employeeExists.save();

        res.status(201).json({ 
            message: 'File added to county successfully, employee status updated to County', 
            fileToCounty: newFileToCounty,
            updatedEmployee: employeeExists
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const allToCounty = async(req,res)=>{
    try {
        const allFiles = await files_to_counties.find().populate('payrollNo', 'officerName payrollNo jobGroup DOB status');
        return res.status(200).json(allFiles);
    } catch (error) {
    return res.status(500).json({message:"Internal Server Error"});
    }
}