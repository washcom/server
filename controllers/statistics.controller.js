import Employees from "../models/Employees.js";
import DormamtFlies from "../models/DormantFile.js";
import users from "../models/users.js";
import StampedFile from "../models/StampedFile.js";
import FileMovement from "../models/FileMovement.js";
import files_from_counties from "../models/files_from_counties.js";
import files_to_counties from "../models/files_to_counties.js";
import TOS_secondment from "../models/TOS_secondment.js";
import semi_active_files from "../models/semi_active_files.js";
import { getFiveDigitModel } from "../models/fiveDigits.js";

export const allStats = async (req, res) => {
  try {
    const allUsers = await users.countDocuments();
    const activeEmployees = await Employees.countDocuments({ status: "Active" });
    const allEmployees = await Employees.countDocuments();
    const allStamped = await StampedFile.countDocuments();
    const allMovements = await FileMovement.countDocuments();
    const allFromCounties = await files_from_counties.countDocuments();
    const allTocounty = await files_to_counties.countDocuments();
    const allTosSecondment = await TOS_secondment.countDocuments();
    const allSemi = await semi_active_files.countDocuments();

    // Count all dormant files across all year-based collections
    const dormantCounts = await Promise.all(
      Object.values(DormamtFlies).map((model) => model.countDocuments())
    );
    const allDormants = dormantCounts.reduce((sum, count) => sum + count, 0);

    // Count all five-digit files across digits 0-9
    const fiveDigitCounts = await Promise.all(
      Array.from({ length: 10 }, (_, i) => getFiveDigitModel(i).countDocuments())
    );
    const allFivedigits = fiveDigitCounts.reduce((sum, count) => sum + count, 0);

    return res.status(200).json({
      allUsers,
      allEmployees,
      activeEmployees,
      allDormants,
      allFivedigits,        
      allStamped,
      allMovements,
      allFromCounties,
      allSemi,
      allTocounty,
      allTosSecondment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
