import mongoose from "mongoose";
import logger from "../logger/winston.logger";
import {
    BadRequestError,
    UnauthorizedError,
    NotFoundError,
    InternalServerError,
    AppError
} from '../helpers/errorHandler'
import { ProductRepository } from "../repositories/ProductRepository";


interface IProduct {
    name: string;
    description: string;
    price: string;
    image: string;
}

const productRepository = new ProductRepository();
export class ProductService {

    async createProduct(data: IProduct){
        try {
            const product = await productRepository.createProduct(data);
            return product;
        } catch (error) {
            logger.error('Error creating product', error)
        } 
    }
}