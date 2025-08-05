import Employees from '../models/Employees.js';
import express from 'express';
import bcrypt from 'bcrypt';
import Users from '../models/users.js';
import mongoose from 'mongoose';
import crypto from "crypto";

export const allUsers = async (req, res) => {
    try {
        const users = await Users.find();
        return res.status(200).json({ users });
    }
    catch (error) {
        console.log("errror!!!!!");
        return res.status(500).json({ message: "Internal server error" });
    }

};
export const getOneuser = async (req, res) => {
    const FindPayrollno = req.params.payrollNo;
    try {
        const user = await Employees.findOne({ payrollNo: FindPayrollno });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ name: user.officerName, jobGroup: user.jobGroup });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const addUser = async (req, res) => {
    const { name,
        email,
        role,
        password } = req.body;
    if (!name || !email || !role || !password) {
        return res.status(200).json({ message: "All fields are required" });
    }
    const userExists = await Users.findOne({ email });
    if (userExists) {
        return res.status(404).json({ message: "User with this email already exist !!" });
    }
    try {
        const saltRound = 12;
        const hashedPassword = await bcrypt.hash(password, saltRound);
        const newUser = new Users({
            name,
            email,
            role,
            password: hashedPassword,
        });
        await newUser.save();
        const { _id, name: savedName, email: savedEmail, role: savedRole } = newUser;
        return res.status(201).json({
            _id,
            name: savedName,
            email: savedEmail,
            role: savedRole, message: "User created successfully !!"
        });
    }
    catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }

};
export const changeRole = async (req, res) => {
    const userId = req.params.userId;
    const { role } = req.body;

    console.log("User ID:", userId);

    try {
        const updatedUser = await Users.findByIdAndUpdate(
            userId,
            { role },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const deleteUser = await Users.findByIdAndDelete(userId);
        if (!deleteUser) {
            return res.status(404).json({ message: "user not found" });
        }
        return res.status(200).json({ message: "User deleted" });
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });

    }
};

