import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from './config/db.js';

import ErrorHandler from './middlewares/errors.js';
import InitialiseTaskRoutes from './routes/tasks.js';
import InitialiseAuthRoutes from './routes/auth.js';

const PORT = 3000;

dotenv.config();
connectDB(3);

const app = express();
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
app.use(json());
app.use(cookieParser());

const whitelist = ["http://localhost:3000", "https://next-task-management-phi.vercel.app"]
const corsOptions = {
  origin:  (origin, callback) => {
    console.log(origin);
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions));
app.use(ErrorHandler);


InitialiseTaskRoutes(app);
InitialiseAuthRoutes(app);



