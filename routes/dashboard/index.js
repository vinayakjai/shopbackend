const express = require("express");
const { storeData,get_today_sales } = require("../../controller/dashboard");

const dashboard_router = express.Router();

dashboard_router.post("/", storeData);
dashboard_router.get('/',get_today_sales)

module.exports = dashboard_router;
