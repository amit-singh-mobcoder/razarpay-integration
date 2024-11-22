import mongoose from "mongoose";
import productModel from "../models/product.model";

interface IProduct {
    name: string;
    description: string;
    price: string;
    image: string;
}

export class ProductRepository {

    async createProduct(data: IProduct){
        const product = await productModel.create({
            name: data.name,
            description: data.description,
            price: data.description,
            image: data.image
        })

        return product;
    }

}

