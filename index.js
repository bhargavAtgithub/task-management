import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from './config/db.js';

import InitialiseTaskRoutes from './routes/tasks.js';

const PORT = 3001;

dotenv.config();
connectDB();

const app = express();
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
app.use(json());
app.use(cookieParser());
app.use(cors());

InitialiseTaskRoutes(app);



