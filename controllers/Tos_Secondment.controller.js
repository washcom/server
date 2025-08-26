import TOS_secondment from "../models/TOS_secondment.js";
import Employees from "../models/Employees.js";
import express from 'express';
export const createSecondment = async (req, res) => {
    const { payrollNo, status, fileType, institution, shelveLocation } = req.body;
    if (!payrollNo || !status || !fileType || !institution || !shelveLocation) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const EmployeeExist = await Employees.findOne({ payrollNo });
    if (!EmployeeExist) {
        return res.status(404).json({ message: 'PayrollNo does not exist in the system !!' });
    }
    try {
        const newSecondment = new TOS_secondment({
            payrollNo: EmployeeExist._id,
            fileType,
            institution,
            shelveLocation,
            status
        });
        const savedSecondment = await newSecondment.save();
        res.status(201).json(savedSecondment.populate ('payrollNo', 'officerName payrollNo jobGroup DOB'));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const allSecondments = async (req, res) => {
    try {
        const allFiles = await TOS_secondment.find().populate('payrollNo', 'officerName payrollNo jobGroup DOB');
        return res.status(200).json(allFiles);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}