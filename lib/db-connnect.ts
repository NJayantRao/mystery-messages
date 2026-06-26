import mongoose from "mongoose";

const connection: any = {};

export const dbConnnect = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("Already Connected to MongoDB");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI as string);
    connection.isConnected = db.connections[0].readyState;

    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("DB Connection failed", error);
    process.exit(1);
  }
};
