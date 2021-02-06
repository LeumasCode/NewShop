import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.DATABASE, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log("DB CONNECTED".cyan.underline);
  } catch (error) {
    console.log(error.message.red.bold.underline);
    process.exit(1);
  }
};


export default connectDB;