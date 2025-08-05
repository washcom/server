import Employees from "../models/Employees.js";
import express from 'express';
import Stamped from "../models/StampedFile.js"

export const addStampedFile = async (req, res) => {
    const {
        serialNumber,
        fileName,
        payrollNo,
        status,
        shelveNumber } = req.body;
    if (!serialNumber || !fileName || !payrollNo || !status || !shelveNumber) {
        return res.status(400).json({ message: 'All fields are required' });

    }
    const employeeExists = await Employees.findOne({ payrollNo });
    if (!employeeExists) {
        return res.status(404).json({ message: 'The payroll number does not exist in the system' });
    }
    const stampedFileExists = await Stamped.findOne({ payrollNo});
    if (stampedFileExists) {
        return res.status(400).json({ message: 'Stamped file already exists for this payroll number' });
    }
    try {
        const newStampedFile = new Stamped({
            serialNumber,
            fileName,
            payrollNo,
            status,
            shelveNumber
        });
        await newStampedFile.save();
        res.status(201).json({ message: 'Stamped file added successfully', stampedFile: newStampedFile });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
