import { Router } from 'express';
import {
    getProdController,
    getProdUidController,
    createProdController,
    updateProdController, 
    deleteProdController
} from '../controllers/products.controller.js';

const prodRouter = Router();

prodRouter.get('/', getProdController);
prodRouter.get('/:uid', getProdUidController);
prodRouter.post('/', createProdController);
prodRouter.put('/:uid', updateProdController);
prodRouter.delete('/:uid', deleteProdController);

export default prodRouter;