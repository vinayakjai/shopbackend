const express = require("express");
const { storeData,get_today_sales, make_dryfruits_perday_zero } = require("../../controller/dashboard");

const dashboard_router = express.Router();

dashboard_router.post("/", storeData);
dashboard_router.get('/',get_today_sales);
dashboard_router.put("/",make_dryfruits_perday_zero);

module.exports = dashboard_router;
