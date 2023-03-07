import {
    getProdService,
    getProdUidService,
    createProdService,
    updateProdService, 
    deleteProdService
} from '../services/products.service.js'
    
    const getSort = (sort) => {
        if(!sort) { return 0 }
        if(sort==='asc') { return 1 }
        if(sort==='desc') { return -1 }
        return 0;
    }

    const getProdController = async (req, res) => {
        try {
            let limit  = req.query.limit || 10;
            let page  = req.query.page || 1;
            let sort = getSort(req.query.sort);
            let { status, category } = req.query;

            let products = await getProdService(limit, page, sort, status, category);
            res.json(
            {
                status: 'success', 
                payload: products.docs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: null,
                nextLink: null
            });
        } catch (error) {
            res.status(500).json({ "status": 'error', "message": `${error}`});
        }
    }

    const getProdUidController = async (req, res) => {
        try {
            let uid = req.params.uid;
            let products = await getProdUidService(uid);
            res.json(
                {
                    status: 'success', 
                    payload: products
                });
        } catch (error) {
            res.status(500).json({ "status": 'error', "message": `${error}`});
        }
    }

    const createProdController = async (req, res) => {
        try {
            let {title, description, code, price, status, stock, category, thumbnails} = req.body;
            if(!req.body.title || !req.body.description || !req.body.code || !req.body.price || !req.body.stock || !req.body.category) {
                res.status(400).json({ "status": false, "message": `All fields required`});
            } else {
                let result = await createProdService(req.body);
                res.json({status: true, data: result});
            }
        } catch (error) {
            res.status(500).json({ "status": false, "message": `${error}`});
        }
    }

    const updateProdController = async (req, res) => {
        try {
            let uid = req.params.uid;
            let {title, description, code, price, status, stock, category, thumbnails} = req.body;
            if(!req.body.title || !req.body.description || !req.body.code || !req.body.price || !req.body.stock || !req.body.category) {
                res.status(400).json({ "status": false, "message": `All fields required`});
            } else {
                let result = await updateProdService(uid, req.body);
                res.json({status: true, data: result});
            }
        } catch (error) {
            res.status(500).json({ "status": false, "message": `${error}`});
        }
    }

    const deleteProdController = async (req, res) => {
        try {
            let uid = req.params.uid;
            let result = await deleteProdService(uid);
            res.json({status: true, data: result});
        } catch (error) {
            res.status(500).json({ "status": false, "message": `${error}`});
        }
    }

    export {getProdController, getProdUidController, createProdController, updateProdController, deleteProdController};