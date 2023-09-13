import asyncHandler from "express-async-handler"
import validator from 'validator';
import ERRORS from "../utils/errors.js";
import utils from "../utils/jwt.js";

import UserModel from "../modals/user.js";

const handleErrors = (error) => {
    let errors = {
        email: "",
        password: ""
    }
    console.log(error.message)

    if(error.message === ERRORS.INVALID_EMAIL.code){
        errors.email = ERRORS.INVALID_EMAIL.message;
    } 
    
    if(error.message === ERRORS.MISSING_PASSWORD.code) {
        errors.password = ERRORS.MISSING_PASSWORD.message;
    }
    
    if(error.code === 11000) {
        errors.email = "This email already exists";
        return errors;
    }

    if(error.message.includes('user validation failed')){
        Object.values(error.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    console.log(errors);
    return errors;
}

const SignUp = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    let message = '';

    // validations
    if(!name){
        message= "Please enter a valid name";
    }
    else if(!validator.isEmail(email)){
        message= ERRORS.INVALID_EMAIL.message;
    } else if(!validator.isStrongPassword(password, {
        minLength: 6,
        minLowercase: 0, 
        minUppercase: 0, 
        minNumbers: 0, 
        minSymbols: 0,
    })){
        message= ERRORS.INVALID_PASSWORD.message;
    }

    if(message !== ''){
        res.status(400).json({
            errors: {
                message
            }
        })
    }

    // Create a new user
    try {
        const user = await UserModel.create({
            name, email, password
        });

        const jwtToken = utils.generateToken(user);
        const expirydate = new Date();
        expirydate.setDate(expirydate.getDate() + 2);
        res.cookie("token", jwtToken, { expires: expirydate });
        res.status(200).json({ user: user });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({errors});
    }
});

const SignIn = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) return res.status(400).json({
        errors: {
            message: ERRORS.MISSING_CREDENTIALS.message
        }
    });

    try {
        const user = await UserModel.login(email, password);
        const jwtToken = utils.generateToken(user);
        const expirydate = new Date();
        expirydate.setDate(expirydate.getDate() + 2);
        res.cookie("token", jwtToken, { expires: expirydate, sameSite: 'none', secure: true });
        res.status(200).json({ user: user._id });
    } catch(error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
});
    
export default {
    SignUp,
    SignIn,
}