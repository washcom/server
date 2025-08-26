import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbConnection.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import usersRoutes  from './routes/Users.routes.js'
import EmployeesRoutes from './routes/Employees.routes.js';
import FileMovementRoutes from './routes/FileMovements.routes.js';
import files_to_counties from './routes/filesToConties.routes.js';
import filesfromcounty from './routes/filesfromcounty.routes.js';
import StampedFiles from './routes/stamped.routes.js';
import TOS_secondmentRoutes from './routes/Tos_Secondment.routes.js';
import DormantRoutes from './routes/Dormant.routes.js';
import semiActiveRoutes from './routes/semiActi.routes.js';
import AuthRoutes from './routes/Auth.routes.js';
import StatRoutes from './routes/statistics.routes.js';
import searchRoutes from'./routes/Search.routes.js';
import './jobs/statusUpdateCron.js'

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware
app.use(express.json());
app.use('/api/users', usersRoutes);
app.use('/api/employees',EmployeesRoutes);
app.use('/api/file-movements', FileMovementRoutes);
app.use('/api/files-to-counties', files_to_counties);
app.use('/api/files-from-county', filesfromcounty);
app.use('/api/stamped-files', StampedFiles);
app.use('/api/tos-secondment', TOS_secondmentRoutes);
app.use('/api/dormant-files', DormantRoutes);
app.use('/api/semi-active-files', semiActiveRoutes);
app.use('/api/auth',AuthRoutes);
app.use('/api/stats',StatRoutes);
app.use('/api/search',searchRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
