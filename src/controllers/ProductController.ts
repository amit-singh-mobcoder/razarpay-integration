import logger from "../logger/winston.logger";
import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import {
    sendCreatedResponse,
    sendSuccessReponse
} from '../helpers/responseHandler'
import {
    handleError,
    InternalServerError
} from '../helpers/errorHandler'

const productService = new ProductService();
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, image} = req.body;
        const product = await productService.createProduct({name, description, price, image});
        return sendCreatedResponse(res, product, 'Product created');
    } catch (error) {
        logger.error('Error creating product:', error);
        return handleError(res, new InternalServerError('Error creating product'))

    }
}