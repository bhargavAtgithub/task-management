import asyncHandler from "express-async-handler"

import isEmail from "validator/lib/isEmail.js";

const VALIDATION_ERRORS = {
    INVALID_EMAIL: "Please enter a valid email",
    INVALID_PASSWORD: "Please enter a valid password"
}

const getAllTasks = asyncHandler((req, res) => {
    res.status(200).json({message: 'Get todos'})
});
  
const createTask = asyncHandler((req, res) => {
  res.status(200).json({message: 'Set todo'})
});

const updateTask = asyncHandler((req, res) => {
  res.status(200).json({message: `Update todo ${req.params.id}`})
});

const deleteTask = asyncHandler((req, res) => {
  res.status(200).json({message: `Delete todo ${req.params.id}`})
});
  
export default {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
}