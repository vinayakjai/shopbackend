
const express = require('express');
const { createCart, addToCart, deleteItem, updateQuantity, getCart } = require('../../controller/cart');
const router = express.Router();

router.get('/initiate/:name',createCart);
router.post('/item',addToCart);
router.delete('/item',deleteItem);
router.put('/item/quantity',updateQuantity);
router.get('/:name',getCart)


module.exports=router;