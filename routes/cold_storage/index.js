
const express = require("express");
const {
  addItemInColdStorage,
  getColdStorageInfo
} = require("../../controller/cold_storage");
const router = express.Router();

router.get("/info/:name",getColdStorageInfo);
router.post("/", addItemInColdStorage);
module.exports=router;