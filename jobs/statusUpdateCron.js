import cron from 'node-cron';
import Employee from '../models/Employees.js';

// Run daily at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running daily employee status update at 00:23...');
  try {
    await Employee.updateEmployeeStatuses();
    console.log('Employee statuses updated successfully.');
  } catch (err) {
    console.error('Error updating employee statuses:', err);
  }
});
