import Employee from '../models/Employees.js';
import express from 'express';

export const addemployee = async (req, res) => {
  const { payrollNo, oldpayrollNo, officerName, jobGroup, designation, status } = req.body;
  if (!payrollNo || !officerName || !jobGroup || !designation) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const EmployeeExists = await Employee.findOne({ payrollNo });
    if (EmployeeExists) {
      return res.status(400).json({ message: 'Employee with this payroll number already exists' });
    }
    const newEmployee = new Employee({
      oldpayrollNo,
      payrollNo,
      officerName,
      jobGroup,
      designation,
      status
    });
    await newEmployee.save();
    res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });

  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }

}
// controllers/Employees.controller.js
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch employees.' });
  }
};
