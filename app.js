import express, { json } from "express";
import userroute from "./routes/user.js"; 
import {config} from "dotenv";      

export const app = express();
config({
    path:'./data/config.env',
})


app.use(express.json());
app.use("/users", userroute);






app.get('/', (req, res) => {
    res.send("Nice Working");
});



