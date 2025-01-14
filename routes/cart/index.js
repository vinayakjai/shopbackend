
const express = require('express');
const { createCart, addToCart, deleteItem, updateQuantity, getCart, deleteCartItems } = require('../../controller/cart');
const router = express.Router();

router.get('/initiate/:name',createCart);
router.post('/item/:name',addToCart);
router.delete('/item/:name',deleteItem);
router.put('/item/quantity/:name',updateQuantity);
router.get('/:name',getCart);
router.delete('/items/:name',deleteCartItems);


module.exports=router;