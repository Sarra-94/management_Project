const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("database is connected");
  } catch (error) {
    console.log("database is not connected", error);
  }
};

module.exports = connectDB;
