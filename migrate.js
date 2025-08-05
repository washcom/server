import fs from 'fs';
import csv from 'csv-parser';
import Employee from './models/Employees.js';   
import connectDB from './config/dbConnection.js';

async function importCSV(filePath) {
    await connectDB();
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      results.push({
        payrollNo: data['Payroll No'],
        officerName: data['Officer Name'],
        jobGroup: data['Job Group'],
        designation: data['Designation'],
        status: data['Status']
      });
    })
    .on('end', async () => {
      try {
        const inserted = await Employee.insertMany(results);
        console.log(`✅ Successfully inserted ${inserted.length} employees`);
        process.exit(0);
      } catch (err) {
        console.error('❌ Insertion failed:', err.message);
        process.exit(1);
      }
    });
}
importCSV('employees.csv');
