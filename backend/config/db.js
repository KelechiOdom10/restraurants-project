const mongoose = require("mongoose");

const isProduction = process.env.NODE_ENV === "production";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      !isProduction ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PROD,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
