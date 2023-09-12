import {Router}  from "express";
import tasks from "../controller/tasks.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get('/get-all', tasks.getAllTasks);
router.post('/create', tasks.createAndUpdateTask);
router.put('/:id', tasks.createAndUpdateTask);
router.delete('/:id', tasks.deleteTask);

const InitialiseTaskRoutes = (app) => app.use('/task', auth.isUserLoggedIn, router);

export default InitialiseTaskRoutes;