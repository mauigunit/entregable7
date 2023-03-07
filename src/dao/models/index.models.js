import mongoose from 'mongoose';
const productsCollection = 'products';
const cartsCollection = 'carts';

import mongoosePaginate from 'mongoose-paginate-v2'


const productsSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    code: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    status: {type: Boolean, required: false, default: true},
    stock: {type: Number, required: true},
    category: {type: String, required: true},
    thumbnails: []
})

const productsCartsSchema = mongoose.Schema({
    product: {type: String, required: false},
    quantity: {type: Number, default: 1}
})

const cartsSchema = mongoose.Schema({
    products: {type: [productsCartsSchema], default: []}
})

productsSchema.plugin(mongoosePaginate);
cartsSchema.plugin(mongoosePaginate);

export {productsCollection, cartsCollection, productsSchema, cartsSchema};