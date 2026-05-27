import mongoose from "mongoose";

//connect to mongodb 
const connectDB = async () => {
  try{
    const connectionInstance = await mongoose.connect(process.env.MONGO_URL,{dbName:process.env.DB_NAME});

    console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);

  }catch(error){
    console.error("MongoDB Connection FAILED:", error);
    process.exit(1);
  }
}
export default connectDB; 

