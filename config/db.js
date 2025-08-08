const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "LMS"
    });
    console.log("MongoDB Connected to LMS database");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;