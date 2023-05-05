import mongoose from "mongoose";

export const connectionDB = ()=>{
    mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((c) => {
        console.log(`Database is connected with ${c.connection.host}`);
    })
    .catch((err) => {
        console.log(err);
    });
};