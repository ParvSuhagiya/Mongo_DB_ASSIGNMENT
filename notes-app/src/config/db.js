import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017"

async function connectDB(){
    await mongoose.connect(mongoURI)
    console.log("Connected to DB...");
}

export default connectDB;