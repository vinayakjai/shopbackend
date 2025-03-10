const express = require("express");
const { addCustomerInfo, getCustomerInfo, save_customer_info } = require("../../controller/customer_info");

const router = express.Router();

router.post("/", addCustomerInfo);
router.post("/info", getCustomerInfo);
router.post("/save", save_customer_info);

module.exports = router;
