const express = require("express");
const {
  findStockOfGivenProduct,
  findMinimalStock,
  addProductToStock,
  updateStockOfProducts,
  findTodayStockConsumption,
  updateTodayStartStock,
} = require("../../controller/stock");
const router = express.Router();

router.get("/:name", findStockOfGivenProduct);
router.post("/products", findMinimalStock);
router.post("/product", addProductToStock);
router.put("/products", updateStockOfProducts);
router.get("/product/consumption/:name", findTodayStockConsumption);
router.put('/stock_pointer',updateTodayStartStock);

module.exports = router;
