const mongoose = require("mongoose");

const customerInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    
  },
  sodexo: {
    type: String,
    enum: ["yes", "no"],
    default: "no"
  },
  products: {
    type: [String],
    default: []
  }
});

const CustomerInfo = mongoose.model("CustomerInfo", customerInfoSchema);

module.exports = CustomerInfo;
