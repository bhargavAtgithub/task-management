import {Router}  from "express";
import auth from "../controller/auth.js";

const router = Router();

router.post('/sign-up', auth.SignUp);
router.post('/sign-in', auth.SignIn);

const InitialiseAuthRoutes = (app) => app.use('/auth', router);

export default InitialiseAuthRoutes;