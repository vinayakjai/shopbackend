const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define the schema
const stockSchema = new Schema({
  name: { type: String, required: true },
 
  current_stock:{type:Number,required:true},
  minimum_stock_signal:{type:Number,required:true},
  today_start_stock:{type:Number,required:true},
  unit:{type:String,required:true},
  varients:{type:String,required:true},
  product_varients:[
    {
      weightOfProduct:{type:Number,required:true},
      current_stock:{type:Number,required:true},
      minimum_stock_signal:{type:Number,required:true},
   
      unit:{type:String,required:true},
    }
  ]
});

// Create the model
const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
