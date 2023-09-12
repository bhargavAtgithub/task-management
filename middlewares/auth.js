import jwt from "../utils/jwt.js";

const isUserLoggedIn = async (req, res, next) => {
    const jwtToken = req.cookies.token;

    if(!jwtToken) return res.redirect('/login');

    try {
        const user = jwt.verifyToken(jwtToken);
        if(!user){
            return res.redirect('/login');
        }
        req.user = user;
        next();
    } catch (error) {
        res.redirect('/login');
    }


}

export default {
    isUserLoggedIn
}