import { Response } from 'express'
import logger from "../logger/winston.logger";

export function sendSuccessReponse(res: Response, data: any, message: string = "Success"){
    logger.info('Sending success response with message: %s', message);
    return res.status(200).json({
        success: true,
        message,
        data
    });
}

export function sendCreatedResponse(res: Response, data: any, message: string = "Resource created successfully"){
    logger.info('Sending created response with message: %s', message);
    return res.status(201).json({
        success: true,
        message,
        data
    });
}