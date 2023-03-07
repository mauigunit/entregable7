import { Router } from 'express';
import {
    getCartsController,
    createCartsController,
    addProdCartsController,
    deleteProdCartsController,
    updproductCartController,
    updCantProductCartController,
    deleteCartsController
} from '../controllers/carts.controller.js';

const cartsRouter = Router();

cartsRouter.get('/:cid', getCartsController);
cartsRouter.post('/', createCartsController);
cartsRouter.post('/:cid/product/:uid', addProdCartsController);
cartsRouter.delete('/:cid/product/:pid', deleteProdCartsController);
cartsRouter.put('/:cid', updproductCartController);
cartsRouter.put('/:cid/product/:pid', updCantProductCartController);
cartsRouter.delete('/:cid', deleteCartsController);

export default cartsRouter;