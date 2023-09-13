import jwt from "../utils/jwt.js";

const isUserLoggedIn = async (req, res, next) => {
    const jwtToken = req.cookies.token;

    if(!jwtToken) return res.status(404).json({
        error: {
            message: "sign-in"
        }
    });

    try {
        const user = jwt.verifyToken(jwtToken);
        if(!user){
            return res.status(404).json({
                error: {
                    message: "sign-in"
                }
            });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(404).json({
            error: {
                message: "sign-in"
            }
        });
    }


}

export default {
    isUserLoggedIn
}