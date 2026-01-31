// import mongoose from 'mongoose';

// const connectDB = async () =>{
//     try {
//         mongoose.connection.on('connected', ()=> console.log('Database connected'));
//         await mongoose.connect(`${process.env.MONGODB_URI}/quickshow`)
//     } catch (error) {
//         console.log(error.message);
        
//     }
// }

// export default connectDB;



import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB is connected successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
