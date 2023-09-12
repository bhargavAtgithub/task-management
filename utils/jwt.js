import jwt from "jsonwebtoken";

const generateToken = (user) => {
    console.log(user);
    const token = jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password
    }, process.env.JWT_SECRET);
    return token;
}

const verifyToken = (token) => {
    if(!token) return null;
    return  jwt.verify(token, process.env.JWT_SECRET);
}

export default { generateToken, verifyToken };
