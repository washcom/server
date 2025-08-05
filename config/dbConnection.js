import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri || typeof uri !== 'string') {
    console.error('❌ MONGO_URI is not defined or invalid in .env');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri
    );
    console.log(`✅ MongoDB connected`);
  } catch (err) {
    console.error(`❌ MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
