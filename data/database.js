import mongoose from "mongoose";

export const connectionDB = ()=>{
    mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("connected to database");
    })
    .catch((err) => {
        console.log(err);
    });
};