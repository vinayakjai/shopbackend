const mongoose = require("mongoose");

const Sales_Schema = new mongoose.Schema({
 
  amount: {
    type: Number,
    required:true
  },
});

const Sale = mongoose.model("Sale", Sales_Schema);

module.exports = Sale