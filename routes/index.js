const express = require("express");
const {
  createProduct,
  searchProductInfo,
  searchProductName,
  getAllProducts,
  updateNameOfProduct,
  updatePurchaseRate,
  updateMinimum_Sel_Rate,
  updatePriceOfGivenWeight,
  addNewWeightItemOgGivenProduct,
  updateTax,
  updateHsncode,
  updatePurchaseRateOfGivenWeight,
} = require("../controller");
const router = express.Router();

// Sample route: Get all products
router.post("/", createProduct);
router.get("/search/info/:name", searchProductInfo);
router.get("/search", searchProductName);
router.get("/", getAllProducts);
router.put("/productname/:nameToBeUpdated", updateNameOfProduct);

router.put("/minimum_sell_rate", updateMinimum_Sel_Rate);
router.put("/addnewitemofgivenproduct", addNewWeightItemOgGivenProduct);
router.put("/updatepriceofproductofgivenweight", updatePriceOfGivenWeight);
router.put("/tax", updateTax);
router.put("/hsncode", updateHsncode);
router.put("/purchase_rate",updatePurchaseRateOfGivenWeight);

module.exports = router;
