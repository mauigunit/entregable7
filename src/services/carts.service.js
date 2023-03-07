import containerMongoDB from "../dao/index.dao.js";
import {cartsCollection, cartsSchema} from '../dao/models/index.models.js';

const cartsModel = new containerMongoDB(cartsCollection, cartsSchema);

const getCartsService = async (cid) => {
    let cart = await cartsModel.getCart(cid);
    return cart
}

const createCartsService = async () => {
    let cid = await cartsModel.createCart();
    return cid
}

const addProdCartsService = async (cid, uid, quantity) => {
    let result = await cartsModel.addProdCart(cid, uid, quantity);
    return result
}

const searchProdCartsService = async (cid, uid) => {
    let result = await cartsModel.searchProdCart(cid, uid);
    return result
}

const updateProdCartsService = async (cid, products) => {
    let result = await cartsModel.updateCart(cid, products);
    return result
}

export {getCartsService, createCartsService, addProdCartsService, searchProdCartsService, updateProdCartsService};