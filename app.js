import express, { json } from "express";
import userroute from "./routes/user.js"; 
import taskroute from "./routes/taskRoute.js"; 
import {config} from "dotenv";      
import cookieParser from "cookie-parser";

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






app.get('/', (req, res) => {
    res.send("Nice Working");
});



