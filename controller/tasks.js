import asyncHandler from "express-async-handler"
import TaskModel from "../modals/task.js";
import validator from 'validator';
import ERRORS from "../utils/errors.js";

const getAllTasks = asyncHandler(async (req, res) => {
    const {user} = req;
    
    try {
        const allTasks = await TaskModel.find({
            user: user._id
        }).sort({ createdAt: -1 });


        res.status(200).json({
            tasks: allTasks
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error });
    }
});
  
const createAndUpdateTask = asyncHandler(async (req, res) => {
    const { user, body, params } = req;
    const { task } = body;

    try {

        if(!task.title){
            throw Error(ERRORS.MISSING_TASK_TITLE.message)
        }

        if(task.dueDate){
            const isDueDateValid = validator.isAfter(task.dueDate);
            if(!isDueDateValid) throw Error(ERRORS.INVALID_DUE_DATE.message)
        }


        if(params.id){

            const validFields = ["title", "description", "dueDate", "user"];
            const filteredObject = {};

            Object.keys(task).forEach(key => {
                if (validFields.includes(key)) {
                  filteredObject[key] = task[key]; 
                }
              });

            const updatedTask = await TaskModel.updateOne({
                "user": user._id,
                _id: params.id
            }, {
                $set: {
                    ...filteredObject
                }
            })

            if(updatedTask.modifiedCount == 1){
                res.status(200).json(updatedTask);
            } else {
                throw Error("Error updating the task")
            }

        } else {
            const newTask = await TaskModel.create({
                title: task.title,
                description: task.description || "",
                dueDate: task.dueDate ? new Date(task.dueDate) : '',
                user: user._id,
            })
        
            res.status(200).json(newTask);
        }

    } catch (error) {
        res.status(400).json({error: {
            message: error.message
        }});
    }
});

const deleteTask = asyncHandler(async (req, res) => {
    const { user, params } = req;

    try {
        const deletedTask = await TaskModel.deleteOne({
            "user": user._id,
            _id: params.id
        });

        if(deletedTask.deletedCount == 1){
            res.status(200).json(deletedTask);
        }
        else {
            throw Error("Error deleting the task")
        }
    } catch (error) {
        res.status(400).json({error: {
            message: error.message
        }});
    } 
});
  
export default {
    getAllTasks,
    createAndUpdateTask,
    deleteTask
}