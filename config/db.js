import mongoose from "mongoose";

const connectDB = async (retries = 3) => {
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("Connection to MongoDB failed.", err);
        if(retries){
            connectDB(retries - 1);
        }
    }
}

export default connectDB;