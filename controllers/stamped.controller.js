import Employees from "../models/Employees.js";
import express from 'express';
import Stamped from "../models/StampedFile.js";
import DigitOne from '../models/DigitOne.js';
import DigitTwo from '../models/DigitTwo.js';
import DigitThree from '../models/DigitThree.js';
import DigitFour from '../models/DigitFour.js';
import DigitFive from '../models/DigitFive.js';
import DigitSix from '../models/DigitSix.js';
import DigitSeven from '../models/DigitSeven.js';
import DigitEight from '../models/DigitEight.js';
import DigitNine from '../models/DigitNine.js';

export const addStampedFile = async (req, res) => {
    const {
        serialNumber,
        fileName,
        payrollNo,
        status,
        lastDigit,
        shelveNumber } = req.body;
    if (!serialNumber || !fileName || !payrollNo || !status || !shelveNumber) {
        return res.status(400).json({ message: 'All fields are required' });

    }
    const stampedFileExists = await Stamped.findOne({ payrollNo });
    if (stampedFileExists) {
        return res.status(400).json({ message: 'Stamped file already exists for this payroll number' });
    }
    try {
        if (lastDigit === '0') {
            const newStampedFile = new Stamped({
                serialNumber,
                fileName,
                payrollNo,
                status,
                shelveNumber
            });
            await newStampedFile.save();
            res.status(201).json({ message: 'Stamped file added successfully', stampedFile: newStampedFile });
        }
        else if (lastDigit === '7') {
            const serialNumberExist = await DigitSeven.findOne({ serialNumber });
            if (serialNumberExist) {
                return res.status(400).json({ message: "Cant Duplicate serialNumber already exist" });
            }
            const payrollNoExists = await DigitSeven.findOne({ payrollNo });
            if (payrollNoExists) {
                return res.status(400).json({ message: "Stamped file already exists for this payroll number" });
            }
            const newStampedFile = new DigitSeven({
                serialNumber,
                fileName,
                payrollNo,
                status,
                shelveNumber
            });
            await newStampedFile.save();
            res.status(201).json({ message: 'Stamped file added successfully', stampedFile: newStampedFile });
        }
        else if (lastDigit === '1') {
            const serialNumberExist = await DigitOne.findOne({ serialNumber });
            if (serialNumberExist) {
                return res.status(400).json({ message: "Cant Duplicate serialNumber already exist" });
            }
            const payrollNoExists = await DigitOne.findOne({ payrollNo });
            if (payrollNoExists) {
                return res.status(400).json({ message: "Stamped file already exists for this payroll number" });
            }
            const newStampedFile = new DigitOne({
                serialNumber,
                fileName,
                payrollNo,
                status,
                shelveNumber
            });
            await newStampedFile.save();
            res.status(201).json({ message: 'Stamped file added successfully', stampedFile: newStampedFile });
        }
        else if (lastDigit === '2') {
            const serialNumberExist = await DigitTwo.findOne({ serialNumber });
            if (serialNumberExist) {
                return res.status(400).json({ message: "Cant Duplicate serialNumber already exist" });
            }
            const payrollNoExists = await DigitTwo.findOne({ payrollNo });
            if (payrollNoExists) {
                return res.status(400).json({ message: "Stamped file already exists for this payroll number" });
            }
            const newStampedFile = new DigitTwo({
                serialNumber,
                fileName,
                payrollNo,
                status,
                shelveNumber
            });
            await newStampedFile.save();
            res.status(201).json({ message: 'Stamped file added successfully', stampedFile: newStampedFile });
        }
        else if (lastDigit === '3') {
            const serialNumberExist = await DigitThree.findOne({ serialNumber });
            if (serialNumberExist) {
                return res.status(400).json({ message: "Cant Duplicate serialNumber already exist" });
            }
            const payrollNoExists = await DigitThree.findOne({ payrollNo });
            if (payrollNoExists) {
                return res.status(400).json({ message: "Stamped file already exists for this payroll number" });
            }
            const newStampedFile = new DigitThree({
                serialNumber,
                fileName,
                payrollNo,
                status,
                shelveNumber
            });
            await newStampedFile.save();
            res.status(201).json({ message: 'Stamped file added successfully', stampedFile: newStampedFile });
        }
        else if (lastDigit === '4') {
            const serialNumberExist = await DigitFour.findOne({ serialNumber });
            if (serialNumberExist) {
                return res.status(400).json({ message: "Cant Duplicate serialNumber already exist" });
            }
            const payrollNoExists = await DigitFour.findOne({ payrollNo });
            if (payrollNoExists) {
                return res.status(400).json({ message: "Stamped file already exists for this payroll number" });
            }
            const newStampedFile = new DigitFour({
                serialNumber,
                fileName,
                payrollNo,
                status,
                shelveNumber
            });
            await newStampedFile.save();
            res.status(201).json({ message: 'Stamped file added successfully', stampedFile: newStampedFile });
        }
        else if (lastDigit === '5') {
            const serialNumberExist = await DigitFive.findOne({ serialNumber });
            if (serialNumberExist) {
                return res.status(400).json({ message: "Cant Duplicate serialNumber already exist" });
            }
            const payrollNoExists = await DigitFive.findOne({ payrollNo });
            if (payrollNoExists) {
                return res.status(400).json({ message: "Stamped file already exists for this payroll number" });
            }
            const newStampedFile = new DigitFive({
                serialNumber,
                fileName,
                payrollNo,
                status,
                shelveNumber
            });
            await newStampedFile.save();
            res.status(201).json({ message: 'Stamped file added successfully', stampedFile: newStampedFile });
        }
        else if (lastDigit === '6') {
            const serialNumberExist = await DigitSix.findOne({ serialNumber });
            if (serialNumberExist) {
                return res.status(400).json({ message: "Cant Duplicate serialNumber already exist" });
            }
            const payrollNoExists = await DigitSix.findOne({ payrollNo });
            if (payrollNoExists) {
                return res.status(400).json({ message: "Stamped file already exists for this payroll number" });
            }
            const newStampedFile = new DigitSix({
                serialNumber,
                fileName,
                payrollNo,
                status,
                shelveNumber
            });
            await newStampedFile.save();
            res.status(201).json({ message: 'Stamped file added successfully', stampedFile: newStampedFile });
        }
        else if (lastDigit === '8') {
            const serialNumberExist = await DigitEight.findOne({ serialNumber });
            if (serialNumberExist) {
                return res.status(400).json({ message: "Cant Duplicate serialNumber already exist" });
            }
            const payrollNoExists = await DigitEight.findOne({ payrollNo });
            if (payrollNoExists) {
                return res.status(400).json({ message: "Stamped file already exists for this payroll number" });
            }
            const newStampedFile = new DigitEight({
                serialNumber,
                fileName,
                payrollNo,
                status,
                shelveNumber
            });
            await newStampedFile.save();
            res.status(201).json({ message: 'Stamped file added successfully', stampedFile: newStampedFile });
        }
        else {
            const serialNumberExist = await DigitNine.findOne({ serialNumber });
            if (serialNumberExist) {
                return res.status(400).json({ message: "Cant Duplicate serialNumber already exist" });
            }
            const payrollNoExists = await DigitNine.findOne({ payrollNo });
            if (payrollNoExists) {
                return res.status(400).json({ message: "Stamped file already exists for this payroll number" });
            }
            const newStampedFile = new DigitNine({
                serialNumber,
                fileName,
                payrollNo,
                status,
                shelveNumber
            });
            await newStampedFile.save();
            res.status(201).json({ message: 'Stamped file added successfully', stampedFile: newStampedFile });
        }


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const allStamped = async (req, res) => {
    try {
        // Query all collections in parallel
        const [
            zeroFiles,
            oneFiles,
            twoFiles,
            threeFiles,
            fourFiles,
            fiveFiles,
            sixFiles,
            sevenFiles,
            eightFiles,
            nineFiles
        ] = await Promise.all([
            Stamped.find(),
            DigitOne.find(),
            DigitTwo.find(),
            DigitThree.find(),
            DigitFour.find(),
            DigitFive.find(),
            DigitSix.find(),
            DigitSeven.find(),
            DigitEight.find(),
            DigitNine.find()
        ]);

        // Combine all results
        const allFiles = [
            ...zeroFiles,
            ...oneFiles,
            ...twoFiles,
            ...threeFiles,
            ...fourFiles,
            ...fiveFiles,
            ...sixFiles,
            ...sevenFiles,
            ...eightFiles,
            ...nineFiles
        ];

        return res.status(200).json(allFiles);
    } catch (error) {
        console.error('Error fetching all stamped files:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
