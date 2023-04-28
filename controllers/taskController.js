import { Task } from "../model/task.js";

export const newTask = async(req,res)=>{
    const {title,description} = req.body;
    await Task.create({
        title,
        description,
        user:req.user,

    }); 
    res.status(201).json({
        success:true,
        message:"task added successfully",
    });

};
export const myAllTasks = async(req,res)=>{
    const userId = req.user._id;
    const tasks = await Task.find({user:userId});
    res.status(200).json({
        success:true,
        tasks,
    });


};
export const updateTask = async(req,res)=>{
    // const {taskId} = req.params;
    const {id} = req.params;
    const task = await Task.findById(id);
    if(!task)
        return res.status(404).json({
            success:false,
            message:"Invalid ID"
        });
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({  
        success:true,       
        message:"task is updated",
    });


};
export const deleteTask = async(req,res)=>{
    const {id} = req.params;
   const task = await Task.findById(id);
   if(!task)
   return res.status(404).json({
       success:false,
       message:"Invalid ID"
   });
   await task.deleteOne();  
    res.status(200).json({
        success:true,
        message:"task deleted",
    });


};
