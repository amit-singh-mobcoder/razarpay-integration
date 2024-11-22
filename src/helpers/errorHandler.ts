import { Response } from 'express'
import logger from '../logger/winston.logger'

class AppError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor)
    }
}

class BadRequestError extends AppError {
    constructor(message: string = 'Bad Request'){
        super(message, 400)
    }
}

class UnauthorizedError extends AppError {
    constructor(message: string = 'Unauthorized'){
        super(message, 401)
    }
}

class NotFoundError extends AppError {
    constructor(message: string = 'Not Found'){
        super(message, 404)
    }
}

class InternalServerError extends AppError {
    constructor(message: string = 'Internal Server Error'){
        super(message, 500)
    }
}

export function handleError(res: Response, error: AppError){
    logger.error('Error occurred: %s', error.message);
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message
    })
}

export { AppError, BadRequestError, UnauthorizedError, NotFoundError, InternalServerError}