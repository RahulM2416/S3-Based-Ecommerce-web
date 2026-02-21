import mongoose from "mongoose";
import "dotenv/config";

export async function connectToDB(){
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
    } catch(err) {
        console.log(`${err} in connecting to DB..!`);
    }
}