import mongoose from "mongoose";
import * as logger from "../helpers/logger.js";
import Exception from "../errorhandle/Exception.js";

async function connectToMongo() {
  try {
    const connection =  await mongoose.connect(process.env.MONGO_URI);
    logger.success('MongoDB connect success...');
    return connection;
  } catch (error) {
    throw new Exception(Exception.MONGODB_CONNECT_ERROR);
  }
}

export default connectToMongo;