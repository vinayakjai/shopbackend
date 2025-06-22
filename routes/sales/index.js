const express = require("express");
const {
  createsale,
  updatesSales,
  fetchsale
} = require("../../controller/sales");
const router = express.Router();

router.get("/", createsale);
router.put("/sales/:incrementValue", updatesSales);
router.get("/sales",fetchsale);


module.exports = router;