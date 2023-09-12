import { Schema, model } from "mongoose";
import ERRORS from "../utils/errors.js";

const TaskSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, ERRORS.MISSING_TASK_TITLE.code],
        },
        description: {
            type: String,
        },
        dueDate: {
            type: Date,
        },
        completed: {
            type: Boolean,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {strict: false}
);

const TaskModel = model('Task', TaskSchema);
export default TaskModel;