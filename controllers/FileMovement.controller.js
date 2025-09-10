import FileMovement from "../models/FileMovement.js";
import Employee from "../models/Employees.js";
import express from 'express';

// Add new file movement
export const addFileMovement = async (req, res) => {
  const { payrollNo, destination, collectedBy, dateCollected, fileType } = req.body;

  if (!payrollNo || !destination || !collectedBy || !fileType) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Find employee by payrollNo
    const employee = await Employee.findOne({ payrollNo });

    if (!employee) {
      return res.status(404).json({ message: 'The payroll number does not exist in the system' });
    }

    const newFileMovement = new FileMovement({
      payrollNo: employee._id, // save ObjectId reference
      destination,
      collectedBy,
      dateCollected: dateCollected || new Date(),
      fileType
    });

    await newFileMovement.save();

    return res.status(201).json({
      message: 'File movement added successfully',
      data: await newFileMovement.populate('payrollNo', 'officerName payrollNo')
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all file movements
export const allMovements = async (req, res) => {
  try {
    const movements = await FileMovement.find()
      .populate({ path: 'payrollNo', select: 'officerName payrollNo status' })
      .sort({ dateCollected: -1 });

    return res.status(200).json({ message: 'All file movements retrieved', data: movements });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Edit a movement
export const editMovement = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!updateData.destination || !updateData.collectedBy) {
    return res.status(400).json({ message: 'Destination and Collected By are required' });
  }

  try {
    const updatedMovement = await FileMovement.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('payrollNo', 'officerName payrollNo');

    if (!updatedMovement) {
      return res.status(404).json({ message: 'File movement not found' });
    }

    return res.status(200).json({
      message: 'File movement updated successfully',
      data: updatedMovement
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Return a movement
export const returnMovement = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!updateData || Object.keys(updateData).length === 0) {
    return res.status(400).json({ message: 'No update data provided' });
  }

  try {
    const updatedMovement = await FileMovement.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('payrollNo', 'officerName payrollNo');

    if (!updatedMovement) {
      return res.status(404).json({ message: 'File movement not found' });
    }

    return res.status(200).json({
      message: 'File movement updated successfully',
      data: updatedMovement
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error updating file movement' });
  }
};
