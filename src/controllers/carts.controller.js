import {
    getCartsService,
    createCartsService,
    addProdCartsService,
    searchProdCartsService,
    updateProdCartsService
} from '../services/carts.service.js'

import {
    getProdUidService
} from '../services/products.service.js'

const getCartsController = async (req, res) => {
    try {
        let cid = req.params.cid;
        let cart = await getCartsService(cid);
        res.json({ status: true, data: cart });
    } catch (error) {
        res.status(500).json({ "status": false, "message": `${error}` });
    }
}

const createCartsController = async (req, res) => {
    try {
        let cid = await createCartsService();
        res.json({ status: true, data: cid });
    } catch (error) {
        res.status(500).json({ "status": false, "message": `${error}` });
    }
}

const addProdCartsController = async (req, res) => {
    try {
        let idCart = req.params.cid;
        let idProd = req.params.uid;
        let product = await getProdUidService(idProd);
        if (product) {
            if (product[0].stock > 0) {
                let prodCart = await searchProdCartsService(idCart, idProd);
                let quantity = 0;
                if (prodCart) {
                    prodCart.products.forEach(element => {
                        if (element.product === idProd) {
                            quantity = element.quantity;
                        }
                    });
                }
                quantity++;
                let result = await addProdCartsService(idCart, idProd, quantity);
                res.json({ status: true, data: result });
            } else {
                res.status(400).json({ "status": false, "message": `product out of stock` });
            }
        } else {
            res.status(400).json({ "status": false, "message": `product does not exist` });
        }
    } catch (error) {
        res.status(500).json({ "status": false, "message": `${error}` });
    }
}

const deleteProdCartsController = async (req, res) => {
    try {
        let idCart = req.params.cid;
        let idProd = req.params.pid;
        let prodCart = await searchProdCartsService(idCart, idProd);
        let arrayProducts = prodCart.products;
        let indexArray = arrayProducts.findIndex(pid => pid.product === idProd);
        if (indexArray === -1) {
            res.status(400).json({ "status": "error", "message": `product not found` });
        } 
        else {
            arrayProducts.splice(indexArray, 1);
            let response = await updateProdCartsService(idCart, {products: arrayProducts})
            res.json({ status: "success", result: response });
        }
    } catch (error) {
        res.status(500).json({ "status": "error", "result": `${error}` });
    }
}

const updproductCartController = async (req, res) =>{
    try {
        let idCart = req.params.cid;
        let products = req.body;
        let response = await updateProdCartsService(idCart, {products: products})
        res.json({ status: "success", result: response });
    } catch (error) {
        res.status(500).json({ "status": "error", "result": `${error}` });
    }
}

const updCantProductCartController = async (req, res) =>{
    try {
        let idCart = req.params.cid;
        let idProd = req.params.pid;
        let { quantity } = req.body;
        if(!quantity){
            res.status(400).json({ "status": "error", "result": `required quantity` });
        }
        else {
            let resProducts = await searchProdCartsService(idCart, idProd);
            let products = resProducts.products;
            let index = products.findIndex(pid => pid.product === idProd);
            if (index === -1) {
                res.status(400).json({ "status": "error", "message": `product not found` });
            } 
            else {
                products[index].quantity = quantity;
                let response = await updateProdCartsService(idCart, {products: products})
                res.json({ status: "success", result: response });
            }
        }
    } catch (error) {
        res.status(500).json({ "status": "error", "result": `${error}` });
    }
}

const deleteCartsController = async (req, res) =>{
    try {
        let idCart = req.params.cid;
        let response = await updateProdCartsService(idCart, {products: []})
        res.json({ status: "success", result: response });
    } catch (error) {
        res.status(500).json({ "status": "error", "result": `${error}` });
    }
}


export { getCartsController, createCartsController, addProdCartsController, deleteProdCartsController, updproductCartController, updCantProductCartController, deleteCartsController };