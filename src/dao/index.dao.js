import mongoose from 'mongoose'
mongoose.connect('mongodb+srv://coderhouse:coderEcom.45*794@ecommerce.7wg20uz.mongodb.net/ecommerce?retryWrites=true&w=majority', error => {
    if(error) {
        console.log(`cannot connect to db: ${error}`);
        process.exit();
    }
});

class containerMongoDB {
    constructor(collection, schema) {
        this.collections = mongoose.model(collection, schema);
    }

    async getProducts(limit, page, sort) {
        //let products = await this.collections.find().limit(limit);
        let products;
        if(sort !== 0){
            products = await this.collections.paginate({}, {limit: limit, page: page, sort: {price: sort}})
        } else {
            products = await this.collections.paginate({}, { limit: limit, page: page })
        }
        return products;
    }

    async getUidProducts(uid) {
        let products = await this.collections.findOne({ _id: uid });
        return products;
    }

    async createProducts(newProduct) {
        let result = await this.collections.create(newProduct);
        return result;
    }

    async updateProducts(uid, product) {
        let result = await this.collections.updateOne({ _id: uid }, product);
        return result;
    }

    async deleteProducts(uid) {
        let result = await this.collections.deleteOne({ _id: uid });
        return result;
    }

    /***************************** carts ****************************************/
    async getCart(cid) {
        let result = await this.collections.find({ _id: cid });
        return result;
    }

    async createCart() {
        let result = await this.collections.create({products:[]});
        return result;
    }

    async addProdCart(cid, uid, quantity) {
        let result;
        if(quantity === 1){
            console.log(`pase por creacion ${quantity}`);
            result = await this.collections.updateOne({ _id: cid }, { $push: {products: {product: uid, quantity: quantity}}});
        }
        else{
            console.log(`pase por actualizacion cantidad: ${quantity} uid: ${uid}`);
            result = await this.collections.updateOne({ _id: cid, 'products.product': uid}, { $set: { 'products.$.quantity': quantity }});
        }
        return result;
    }

    async searchProdCart(cid, uid) {
        let result = await this.collections.findOne({_id: cid});
        return result;
    }

    async updateCart(cid, products) {
        let result = await this.collections.updateOne({ _id: cid }, products);
        return result;
    }
}

export default containerMongoDB;