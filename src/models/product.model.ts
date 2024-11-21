import mongoose, {Schema, Document} from 'mongoose'

interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    image: string;
}

const productSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: [1, 'Price cannot be less than 1']
        },
        image: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {timestamps: true}
)


const productModel = mongoose.model('Product', productSchema);
export default productModel;