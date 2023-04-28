import express from "express";
import { deleteTask, myAllTasks, newTask, updateTask }
 from "../controllers/taskController.js";
import { isAutheticated } from "../middlewares/auth.js";
const router = express.Router();
router.post('/new', isAutheticated, newTask);
router.get('/mytasks', isAutheticated, myAllTasks);
router.route('/:id').put(isAutheticated, updateTask)
.delete(isAutheticated, deleteTask)
export default router;  