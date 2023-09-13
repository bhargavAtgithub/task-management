import mongoose from "mongoose";

const connectDB = async (retries = 3) => {
    try{
        await mongoose.connect('mongodb+srv://bhargav:7sB8GI9A8lRjfnxe@cluster0.if7lqqw.mongodb.net/tasks_db?retryWrites=true&w=majority', {
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