import mongoose from "mongoose";
const {Schema} = mongoose;

const productSchema = new Schema({
    name : String,
    description : String,
    price : Number,
    filename : String
});

export const productModel = mongoose.model('productModel', productSchema);