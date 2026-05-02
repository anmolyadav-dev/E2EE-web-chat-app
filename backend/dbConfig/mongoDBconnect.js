import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connect = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/chat-app';
    console.log(`Attempting to connect to MongoDB...`);
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Unable to connect to MongoDB:", error.message);
    // In production, we might want to throw the error to prevent the server from starting with a broken DB
    if (process.env.NODE_ENV === 'production') {
      throw error;
    }
  }
};

export default connect;
