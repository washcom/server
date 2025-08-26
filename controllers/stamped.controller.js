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
import semi_active_model from "../models/semi_active_files.js";

export const addStampedFile = async (req, res) => {
    const { serialNumber, payrollNo, status, lastDigit, shelveNumber } = req.body;

    if (!serialNumber || !payrollNo || !status || !shelveNumber) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const Employee = await Employees.findOne({ payrollNo });
        if (!Employee) {
            return res.status(404).json({ message: 'No employee registered with that payroll No' });
        }

        if (lastDigit === '0') {
            const serialNumberExist = await Stamped.findOne({ serialNumber });
            if (serialNumberExist) {
                return res.status(400).json({ message: "Can't duplicate serialNumber; already exists" });
            }
            const payrollNoExists = await Stamped.findOne({ payrollNo: Employee._id });
            if (payrollNoExists) {
                return res.status(400).json({ message: "Stamped file already exists for this payroll number" });
            }
            const newStampedFile = new Stamped({
                serialNumber,
                payrollNo: Employee._id,
                status,
                shelveNumber
            });
            await newStampedFile.save();

            // Update employee status
            await Employees.findByIdAndUpdate(Employee._id, { status: 'Stamped' });

            // Update semi-active file status
            await semi_active_model.findOneAndUpdate(
                { payrollNo: Employee._id, status: 'processing' },
                { status: 'processed' }
            );

            res.status(201).json({ message: 'Stamped file added successfully', stampedFile: await newStampedFile.populate('payrollNo', 'officerName payrollNo') });
        }
        else if (lastDigit === '1') {
            const serialNumberExist = await DigitOne.findOne({ serialNumber });
            if (serialNumberExist) {
                return res.status(400).json({ message: "Can't duplicate serialNumber; already exists" });
            }
            const payrollNoExists = await DigitOne.findOne({ payrollNo: Employee._id });
            if (payrollNoExists) {
                return res.status(400).json({ message: "Stamped file already exists for this payroll number" });
            }
            const newStampedFile = new DigitOne({
                serialNumber,
                payrollNo: Employee._id,
                status,
                shelveNumber
            });
            await newStampedFile.save();

            // Update employee status
            await Employees.findByIdAndUpdate(Employee._id, { status: 'Stamped' });

            // Update semi-active file status
            await semi_active_model.findOneAndUpdate(
                { payrollNo: Employee._id, status: 'processing' },
                { status: 'processed' }
            );

            res.status(201).json({ message: 'Stamped file added successfully', stampedFile: await newStampedFile.populate('payrollNo', 'officerName payrollNo') });
        }
        else if (lastDigit === '2') {
            const serialNumberExist = await DigitTwo.findOne({ serialNumber });
            if (serialNumberExist) {
                return res.status(400).json({ message: "Can't duplicate serialNumber; already exists" });
            }
            const payrollNoExists = await DigitTwo.findOne({ payrollNo: Employee._id });
            if (payrollNoExists) {
                return res.status(400).json({ message: "Stamped file already exists for this payroll number" });
            }
            const newStampedFile = new DigitTwo({
                serialNumber,
                payrollNo: Employee._id,
                status,
                shelveNumber
            });
            await newStampedFile.save();

            // Update employee status
            await Employees.findByIdAndUpdate(Employee._id, { status: 'Stamped' });

            // Update semi-active file status
            await semi_active_model.findOneAndUpdate(
                { payrollNo: Employee._id, status: 'processing' },
                { status: 'processed' }
            );

            res.status(201).json({ message: 'Stamped file added successfully', stampedFile: await newStampedFile.populate('payrollNo', 'officerName payrollNo') });
        }
        else if (lastDigit === '3') {
            const serialNumberExist = await DigitThree.findOne({ serialNumber });
            if (serialNumberExist) {
                return res.status(400).json({ message: "Can't duplicate serialNumber; already exists" });
            }
            const payrollNoExists = await DigitThree.findOne({ payrollNo: Employee._id });
            if (payrollNoExists) {
                return res.status(400).json({ message: "Stamped file already exists for this payroll number" });
            }
            const newStampedFile = new DigitThree({
                serialNumber,
                payrollNo: Employee._id,
                status,
                shelveNumber
            });
            await newStampedFile.save();

            // Update employee status
            await Employees.findByIdAndUpdate(Employee._id, { status: 'Stamped' });

            // Update semi-active file status
            await semi_active_model.findOneAndUpdate(
                { payrollNo: Employee._id, status: 'processing' },
                { status: 'processed' }
            );

            res.status(201).json({ message: 'Stamped file added successfully', stampedFile: await newStampedFile.populate('payrollNo', 'officerName payrollNo') });
        }
        else if (lastDigit === '4') {
            const serialNumberExist = await DigitFour.findOne({ serialNumber });
            if (serialNumberExist) {
                return res.status(400).json({ message: "Can't duplicate serialNumber; already exists" });
            }
            const payrollNoExists = await DigitFour.findOne({ payrollNo: Employee._id });
            if (payrollNoExists) {
                return res.status(400).json({ message: "Stamped file already exists for this payroll number" });
            }
            const newStampedFile = new DigitFour({
                serialNumber,
                payrollNo: Employee._id,
                status,
                shelveNumber
            });
            await newStampedFile.save();

            // Update employee status
            await Employees.findByIdAndUpdate(Employee._id, { status: 'Stamped' });

            // Update semi-active file status
            await semi_active_model.findOneAndUpdate(
                { payrollNo: Employee._id, status: 'processing' },
                { status: 'processed' }
            );

            res.status(201).json({ message: 'Stamped file added successfully', stampedFile: await newStampedFile.populate('payrollNo', 'officerName payrollNo') });
        }
        else if (lastDigit === '5') {
            const serialNumberExist = await DigitFive.findOne({ serialNumber });
            if (serialNumberExist) {
                return res.status(400).json({ message: "Can't duplicate serialNumber; already exists" });
            }
            const payrollNoExists = await DigitFive.findOne({ payrollNo: Employee._id });
            if (payrollNoExists) {
                return res.status(400).json({ message: "Stamped file already exists for this payroll number" });
            }
            const newStampedFile = new DigitFive({
                serialNumber,
                payrollNo: Employee._id,
                status,
                shelveNumber
            });
            await newStampedFile.save();

            // Update employee status
            await Employees.findByIdAndUpdate(Employee._id, { status: 'Stamped' });

            // Update semi-active file status
            await semi_active_model.findOneAndUpdate(
                { payrollNo: Employee._id, status: 'processing' },
                { status: 'processed' }
            );

            res.status(201).json({ message: 'Stamped file added successfully', stampedFile: await newStampedFile.populate('payrollNo', 'officerName payrollNo') });
        }
        else if (lastDigit === '6') {
            const serialNumberExist = await DigitSix.findOne({ serialNumber });
            if (serialNumberExist) {
                return res.status(400).json({ message: "Can't duplicate serialNumber; already exists" });
            }
            const payrollNoExists = await DigitSix.findOne({ payrollNo: Employee._id });
            if (payrollNoExists) {
                return res.status(400).json({ message: "Stamped file already exists for this payroll number" });
            }
            const newStampedFile = new DigitSix({
                serialNumber,
                payrollNo: Employee._id,
                status,
                shelveNumber
            });
            await newStampedFile.save();

            // Update employee status
            await Employees.findByIdAndUpdate(Employee._id, { status: 'Stamped' });

            // Update semi-active file status
            await semi_active_model.findOneAndUpdate(
                { payrollNo: Employee._id, status: 'processing' },
                { status: 'processed' }
            );

            res.status(201).json({ message: 'Stamped file added successfully', stampedFile: await newStampedFile.populate('payrollNo', 'officerName payrollNo') });
        }
        else if (lastDigit === '7') {
            const serialNumberExist = await DigitSeven.findOne({ serialNumber });
            if (serialNumberExist) {
                return res.status(400).json({ message: "Can't duplicate serialNumber; already exists" });
            }
            const payrollNoExists = await DigitSeven.findOne({ payrollNo: Employee._id });
            if (payrollNoExists) {
                return res.status(400).json({ message: "Stamped file already exists for this payroll number" });
            }
            const newStampedFile = new DigitSeven({
                serialNumber,
                payrollNo: Employee._id,
                status,
                shelveNumber
            });
            await newStampedFile.save();

            // Update employee status
            await Employees.findByIdAndUpdate(Employee._id, { status: 'Stamped' });

            // Update semi-active file status
            await semi_active_model.findOneAndUpdate(
                { payrollNo: Employee._id, status: 'processing' },
                { status: 'processed' }
            );

            res.status(201).json({ message: 'Stamped file added successfully', stampedFile: await newStampedFile.populate('payrollNo', 'officerName payrollNo') });
        }
        else if (lastDigit === '8') {
            const serialNumberExist = await DigitEight.findOne({ serialNumber });
            if (serialNumberExist) {
                return res.status(400).json({ message: "Can't duplicate serialNumber; already exists" });
            }
            const payrollNoExists = await DigitEight.findOne({ payrollNo: Employee._id });
            if (payrollNoExists) {
                return res.status(400).json({ message: "Stamped file already exists for this payroll number" });
            }
            const newStampedFile = new DigitEight({
                serialNumber,
                payrollNo: Employee._id,
                status,
                shelveNumber
            });
            await newStampedFile.save();

            // Update employee status
            await Employees.findByIdAndUpdate(Employee._id, { status: 'Stamped' });

            // Update semi-active file status
            await semi_active_model.findOneAndUpdate(
                { payrollNo: Employee._id, status: 'processing' },
                { status: 'processed' }
            );

            res.status(201).json({ message: 'Stamped file added successfully', stampedFile: await newStampedFile.populate('payrollNo', 'officerName payrollNo') });
        }
        else {
            const serialNumberExist = await DigitNine.findOne({ serialNumber });
            if (serialNumberExist) {
                return res.status(400).json({ message: "Can't duplicate serialNumber; already exists" });
            }
            const payrollNoExists = await DigitNine.findOne({ payrollNo: Employee._id });
            if (payrollNoExists) {
                return res.status(400).json({ message: "Stamped file already exists for this payroll number" });
            }
            const newStampedFile = new DigitNine({
                serialNumber,
                payrollNo: Employee._id,
                status,
                shelveNumber
            });
            await newStampedFile.save();

            // Update employee status
            await Employees.findByIdAndUpdate(Employee._id, { status: 'Stamped' });

            // Update semi-active file status
            await semi_active_model.findOneAndUpdate(
                { payrollNo: Employee._id, status: 'processing' },
                { status: 'processed' }
            );

            res.status(201).json({ message: 'Stamped file added successfully', stampedFile: await newStampedFile.populate('payrollNo', 'officerName payrollNo') });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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
            Stamped.find().populate('payrollNo', 'officerName payrollNo'),
            DigitOne.find().populate('payrollNo', 'officerName payrollNo'),
            DigitTwo.find().populate('payrollNo', 'officerName payrollNo'),
            DigitThree.find().populate('payrollNo', 'officerName payrollNo'),
            DigitFour.find().populate('payrollNo', 'officerName payrollNo'),
            DigitFive.find().populate('payrollNo', 'officerName payrollNo'),
            DigitSix.find().populate('payrollNo', 'officerName payrollNo'),
            DigitSeven.find().populate('payrollNo', 'officerName payrollNo'),
            DigitEight.find().populate('payrollNo', 'officerName payrollNo'),
            DigitNine.find().populate('payrollNo', 'officerName payrollNo')
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

export const lastDigit = async (req, res) => {
    const models = {
        '0': Stamped,
        '1': DigitOne,
        '2': DigitTwo,
        '3': DigitThree,
        '4': DigitFour,
        '5': DigitFive,
        '6': DigitSix,
        '7': DigitSeven,
        '8': DigitEight,
        '9': DigitNine,
    };
    const { lastDigit } = req.params;
    const Model = models[lastDigit] || null;
    if (!Model) return res.status(400).json({ message: 'Invalid digit' });

    try {
        const lastFile = await Model.findOne().sort({ serialNumber: -1 });
        res.json(lastFile || null);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
