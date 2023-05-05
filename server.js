import{app} from "./app.js";
import { connectionDB } from "./data/database.js";

connectionDB();
// console.log(process.env.PORT);
const port = process.env.PORT

app.listen(port, () => {
    console.log(`server is listening on ${port} in ${process.env.NODE_ENV} mode`);

});     