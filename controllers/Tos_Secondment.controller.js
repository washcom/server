import TOS_secondment from "../models/TOS_secondment.js";
import Employees from "../models/Employees.js";
import express from 'express';
export const createSecondment = async (req, res) => {
    const { payrollNo, fileName, jobGroup, dateOfBirth, secondmentOfficer, status } = req.body;
    if (!payrollNo || !fileName || !jobGroup || !dateOfBirth || !secondmentOfficer || !status) {
        return res.status(400).json({ message: 'All fields are required' });   
    } 
    const EmployeeExist = await Employees.findOne({ payrollNo });
    if (!EmployeeExist) {
        return res.status(404).json({ message: 'PayRollNo does not exist in the system !!' });
    }
    try {
        const newSecondment = new TOS_secondment({
            payrollNo,
            fileName,
            jobGroup,
            dateOfBirth,
            secondmentOfficer,
            status
        });
        const savedSecondment = await newSecondment.save();
        res.status(201).json(savedSecondment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}