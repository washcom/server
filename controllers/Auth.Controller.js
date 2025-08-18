import users from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendResetEmail } from "../utilis/sendResetEmail.js";

export const AuthRegister = async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All input fields are required!!!" });
    }
    try {
        const userExists = await users.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: "User already exists with that Email" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new users({
            name,
            email,
            role,
            password: hashedPassword
        });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2hr' });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 2 * 60 * 60 * 1000
        });

        return res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
};
export const Authsignin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "please provide all the fields" });
    }
    try {
        const user = await users.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid user email" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Incorrect user password" });
        }
        const token = jwt.sign({ id: user._id, role: user.role, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '2hr' });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // false for localhost
            sameSite: "strict",
            maxAge: 2 * 60 * 60 * 1000 // 2hr
        });
        // **Send the token in the response**
        return res.status(200).json({ success: true, message: "User logged in successfully", token: token, role: user.role });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const requestReset = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email);

        const user = await users.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "Email provided is not in our system. Try creating an account with us.",
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "15m",
        });

        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
        await user.save();

        const resetLink = `${process.env.C_URL}/reset-password/${token}`;
        await sendResetEmail(email, resetLink);

        return res.status(201).json({ message: "Reset link sent to email" });
    } catch (error) {
        console.error("❌ Error in requestReset:", error);
        return res.status(500).json({
            message: "Something went wrong while processing your request. Please try again later.",
        });
    }
};


export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await users.findOne({
            _id: decoded.id,
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() },
        });

        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        const hashed = await bcrypt.hash(password, 12);
        user.password = hashed;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();

        res.json({ message: "Password has been reset" });
    } catch (err) {
        res.status(400).json({ message: "Token error or expired" });
    }
}
export const Me = async (req, res)=>{
    res.json({
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
    });
}