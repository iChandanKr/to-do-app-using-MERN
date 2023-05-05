import errorHandler from "../middlewares/errorMiddleware.js";
import { Task } from "../model/task.js";

export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        await Task.create({
            title,
            description,
            user: req.user,

        });
        res.status(201).json({
            success: true,
            message: "task added successfully",
        });
    } catch (error) {
        next(error);
    }

};
export const myAllTasks = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const tasks = await Task.find({ user: userId });
        res.status(200).json({
            success: true,
            tasks,
        }); 
    } catch (error) {
        next(error);
    }

};
export const updateTask = async (req, res, next) => {
    try { // const {taskId} = req.params;
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task)
            return next(new errorHandler("Task not found", 404));
        task.isCompleted = !task.isCompleted;
        await task.save();
        res.status(200).json({
            success: true,
            message: "task is updated",
        });

    } catch (error) {
        next(error);
    }


};
export const deleteTask = async (req, res, next) => {
    try {
        // const {taskId} = req.params;
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task)
            return next(new errorHandler("Task not found", 404));
        await task.deleteOne();
        res.status(200).json({
            success: true,
            message: "task is deleted",     
        });

    } catch (error) {
        next(error);
    }


};
