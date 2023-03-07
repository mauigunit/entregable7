import containerMongoDB from "../dao/index.dao.js";
import {productsCollection, productsSchema} from '../dao/models/index.models.js';

const productsModel = new containerMongoDB(productsCollection, productsSchema);

const getProdService = async (limit, page, sort, status, category) => {
    let products = await productsModel.getProducts(limit, page, sort, status, category);
    return products
}

const getProdUidService = async (uid) => {
    let products = await productsModel.getUidProducts(uid);
    return products
}

const createProdService = async (newProduct) => {
    let result = await productsModel.createProducts(newProduct);
    return result
}

const updateProdService = async (uid, product) => {
    let result = await productsModel.updateProducts(uid, product);
    return result
}

const deleteProdService = async (uid) => {
    let result = await productsModel.deleteProducts(uid);
    return result
}

export {getProdService, getProdUidService, createProdService, updateProdService, deleteProdService};