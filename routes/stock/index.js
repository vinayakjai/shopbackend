
const express = require('express');
const { findStockOfGivenProduct, findMinimalStock, addProductToStock, updateStockOfProducts } = require('../../controller/stock');
const router = express.Router();

router.get('/',findStockOfGivenProduct);
router.get('/products',findMinimalStock);
router.post('/product',addProductToStock);
router.put('/products',updateStockOfProducts);

module.exports=router;