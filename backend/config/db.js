const mongoose = require("mongoose");

// Connect to MongoDB Compass
const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.MONGO_URI, () => {
            console.log("MongoDB connected");
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectDB;
