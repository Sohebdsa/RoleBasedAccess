import mongoose from "mongoose";
import { config } from "dotenv";

config();
const uri = process.env.MONGODBURI;

export async function ConnectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Database Connected Successfully..");
  } catch (error) {
    console.error("CONNECTION FAILED", error);
  }
}
