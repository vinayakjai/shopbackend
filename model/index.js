const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define the schema
const productSchema = new Schema({
  name: { type: String, required: true },
  info: [
    {
      price: { type: Number, required: true },
      weight: { type: Number, required: true },
      weightInBill:{type:String,required:true},
      sodexo_rate:{type:Number,required:true}
    },
   
  ],
  tax:{type:Number,required:true},
  HSN_CODE:{type:String,required:true},
  purchaseRate:{type:String},
  minimum_sell_rate:{type:String}
});

// Create the model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
