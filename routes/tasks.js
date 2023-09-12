import {Router}  from "express";
import tasks from "../controller/tasks.js";

const router = Router();

router.get('/get-all', tasks.getAllTasks);
router.post('/create', tasks.createTask);
router.put('/:id', tasks.updateTask);
router.delete('/:id', tasks.deleteTask);

const InitialiseTaskRoutes = (app) => app.use('/task', router);

export default InitialiseTaskRoutes;