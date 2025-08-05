import FileMovement from "../models/FileMovement.js";
import Employee from '../models/Employees.js'
import express from 'express';
export const addFileMovement = async (req, res) => {
  const { payrollNo, officerName, destination, receivingOfficer, dateCollected, dateReturned, whereTo, receivedBy } = req.body;

  if (!payrollNo || !officerName || !destination || !receivingOfficer) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const EmployeeExists = await Employee.findOne({payrollNo});
    if (EmployeeExists) {
    const newFileMovement = new FileMovement({
      payrollNo,
      officerName,
      destination,
      receivingOfficer,
      dateCollected,
      dateReturned,
      whereTo,
      receivedBy
    });
    await newFileMovement.save();
    res.status(201).json({ message: 'File movement added successfully', fileMovement: newFileMovement });
    } else {
      return res.status(404).json({ message: 'The payroll no does not exist in the system' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}