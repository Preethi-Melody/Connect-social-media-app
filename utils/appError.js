class AppError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode=statusCode;
        this.status=`${statusCode}`.startsWith('4')?'fail':'success'
        this.isOperational=true;
        Error.captureStackTrace(this,this.constructor);
    }
}
module.exports=AppError;

//js classes
// super()
// captureStackTrace()
//Error class in node