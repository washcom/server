import Employee from '../models/Employees.js';
import express from 'express';

export const addemployee = async (req, res) => {
  const { payrollNo, officerName, jobGroup, designation, status, special, DOB, termsOfService } = req.body;

  // Validate required fields
  if (!payrollNo || !officerName || !jobGroup || !designation || !DOB) {
    return res.status(400).json({ message: 'All fields are required including DOB' });
  }

  try {
    // Check if employee already exists by payroll number
    const EmployeeExists = await Employee.findOne({ payrollNo });
    if (EmployeeExists) {
      return res.status(400).json({ message: 'Employee with this payroll number already exists' });
    }

    // Create new employee
    const newEmployee = new Employee({
      payrollNo,
      officerName,
      jobGroup,
      designation,
      status,
      special,
      DOB,
      termsOfService
    });

    await newEmployee.save();

    res.status(201).json({
      message: 'Employee added successfully',
      employee: newEmployee
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// controllers/Employees.controller.js
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch employees.' });
  }
};
export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, {
      new: true,          // return the updated document
      runValidators: true // enforce schema validators
    });

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({
      message: 'Employee updated successfully',
      data: updatedEmployee
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
}
