import express, { json } from "express";
import userroute from "./routes/user.js"; 
import taskroute from "./routes/taskRoute.js"; 
import {config} from "dotenv";      
import cookieParser from "cookie-parser";
import { errMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";

export const app = express();
config({
    path:'./data/config.env',
})

// using middlewares
app.use(express.json());
app.use(cookieParser())


//using routes
app.use("/api/v1/users", userroute);
app.use("/api/v1/task",taskroute)

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true,
}));






app.get('/', (req, res) => {
    res.send("Nice Working");
});


// using errorMiddleware
app.use(errMiddleware);


