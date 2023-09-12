const ERRORS = {
    INVALID_EMAIL: {
        code: "invalid_email",
        message: "Please enter a valid email",
    },
    INVALID_PASSWORD: {
        code: "invalid_password",
        message: "Please enter a strong password."
    },
    MISSING_PASSWORD: {
        code: "missing_password",
        message: "Please enter the correct password",
    },
    MISSING_CREDENTIALS: {
        code: "missing_credentials",
        message: "Please enter all the required credentials",
    },
    MISSING_TASK_TITLE: {
        code: "missing_task_title",
        message: "Add title to create a task",
    },
    INVALID_DUE_DATE: {
        code: 'invalid_due_date',
        message: "Due date has to be greater than current date"
    }
}

export default ERRORS;