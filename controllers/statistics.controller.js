import Employees from "../models/Employees.js"
import DormamtFlies from "../models/DormantFile.js"
import users from "../models/users.js"
import StampedFile from "../models/StampedFile.js"
import FileMovement from "../models/FileMovement.js"
import files_from_counties from "../models/files_from_counties.js"
import files_to_counties from "../models/files_to_counties.js"
import TOS_secondment from "../models/TOS_secondment.js"
import semi_active_files from "../models/semi_active_files.js"
export const allStats = async (req, res) => {
    try {
        const allUsers = await users.countDocuments();
        const allDormants = await DormamtFlies.countDocuments();
        const allEmployees = await Employees.countDocuments();
        const allStamped = await StampedFile.countDocuments();
        const allMovements = await FileMovement.countDocuments();
        const allFromCounties = await files_from_counties.countDocuments();
        const allTocounty = await files_to_counties.countDocuments();
        const allTosSecondment = await TOS_secondment.countDocuments();
        const allSemi = await semi_active_files.countDocuments();
        return res.status(200).json({ allUsers,allDormants,allEmployees,allStamped,allMovements,allFromCounties,allSemi,allTocounty,allTosSecondment});
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
}
