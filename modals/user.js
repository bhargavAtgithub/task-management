import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            requred: true,
            unique: true
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        }
    }, 
    {
    
        timestamps: true
    }
);


const UserModal = mongoose.modal('User', UserSchema);
export default UserModal;