const ErrorHandler = (err, req, res, next) => {
    const statusCode = req.statusCode ? req.statusCode : 500;

    res.status(statusCode);

    if(statusCode === 500){
        res.json({
            message: err.message,
            stack: err.stack,
        });
    
        console.log(err);
    } else {
        next();
    }
}

export default ErrorHandler;