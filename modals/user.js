import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import ERRORS from "../constants/errors.js";

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: [true, "This email is already in use."],
        },
        password: {
            type: String,
            required: true,
            minLength: 6 
        }
    }, 
    {
        timestamps: true
    }
);

// By using mongose hooks, hash password.
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();

    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({email});

    if(user){
        const authSuccessful = await bcrypt.compare(password, user.password);
        if(authSuccessful){
            return user;
        } 
        throw Error(ERRORS.MISSING_PASSWORD.code);
    }
    throw Error(ERRORS.INVALID_EMAIL.code);
};


const UserModal = model('User', UserSchema);
export default UserModal;