import Semiactve from '../models/semi_active_files.js'
import Employees from '../models/Employees.js'

export const createSemiActive = async (req, res) => {
    const { payrollNo,
        jobGroup,
        comments,
        status } = req.body;
    if (!payrollNo || !jobGroup || !comments || !status) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    const employeesExists = await Employees.findOne({ payrollNo });
    if (!employeesExists) {
        return res.status(404).json({ message: 'PayrollNo does not Exist in the system!!!' });
    }
    const semiActiveFileExists = await Semiactve.findOne({ payrollNo });
    if (semiActiveFileExists) {
        return res.status(400).json({ message: 'Semi Active File already exists for this payroll number' });
        console.log(semiActiveFileExists);
    }
    try {
        const newSemiActive = new Semiactve({
            payrollNo,
            jobGroup,
            comments,
            status
        });
        await newSemiActive.save();
        res.status(201).json({ message: 'Semi Active File Created Successfully', semiActiveFile: newSemiActive });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const allSemiActive = async(req,res)=>{
    try {
        const allFiles =  await Semiactve.find()
        return res.status(200).json(allFiles);
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
    }
}