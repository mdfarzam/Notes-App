import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URL
let isConnected = false;

async function dbConnect() {
    if(isConnected) {
        console.log("Mongo db is already connected!!");
    }
    try {
        const db = await mongoose.connect(MONGODB_URI)
        isConnected = db.connection.readyState === 1 
        console.log("Connected to mongo db", db);
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        throw error;
    }
}
export default dbConnect;
